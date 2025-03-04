// Dynamic rules for patterns stored in chrome.storage.local
let nextRuleId = 1;

// Initialize rule ID counter from storage to maintain consistency across restarts
async function initializeRuleCounter() {
    try {
        // Get existing rules to determine the highest ID currently in use
        const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
        if (existingRules.length > 0) {
            // Set nextRuleId to one more than the highest existing rule ID
            nextRuleId = Math.max(...existingRules.map(rule => rule.id)) + 1;
        }

        // Now load and apply patterns
        loadAndApplyPatterns();
    } catch (error) {
        console.error("Error initializing rule counter:", error);
    }
}

// Load patterns from storage and apply them
function loadAndApplyPatterns() {
    chrome.storage.local.get(['pattern'], function(result) {
        try {
            const patterns = result.pattern ? JSON.parse(result.pattern) : [];
            if (patterns && patterns.length > 0) {
                updateMyDynamicRules(patterns);
            }
        } catch (error) {
            console.error("Error loading patterns:", error);
        }
    });
}

// Listen for storage changes to update rules
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.pattern) {
        try {
            const patterns = changes.pattern.newValue ? JSON.parse(changes.pattern.newValue) : [];
            updateMyDynamicRules(patterns);
        } catch (error) {
            console.error("Error processing pattern changes:", error);
        }
    }
});

// Create static redirect rules
function createStaticRedirectRules() {
    return [
        {
            id: nextRuleId++,
            priority: 2,
            action: {
                type: 'redirect',
                redirect: {
                    transform: {
                        host: 'cdn.staticfile.org',
                        path: '/ajax/libs/${path}'
                    }
                }
            },
            condition: {
                urlFilter: '*://cdnjs.cloudflare.com/ajax/libs/*',
                resourceTypes: ['script', 'stylesheet']
            }
        },
        {
            id: nextRuleId++,
            priority: 2,
            action: {
                type: 'redirect',
                redirect: {
                    transform: {
                        host: 'www.recaptcha.net'
                    }
                }
            },
            condition: {
                urlFilter: '*://www.google.com/recaptcha/*',
                resourceTypes: ['main_frame', 'sub_frame', 'script']
            }
        },
        {
            id: nextRuleId++,
            priority: 2,
            action: {
                type: 'redirect',
                redirect: {
                    regexSubstitution: 'https://ajax.aspnetcdn.com/ajax/jQuery/jquery-\\1.min.js'
                }
            },
            condition: {
                regexFilter: '.*jquery-([0-9][0-9\\.]*[0-9])\\..*\\.js',
                resourceTypes: ['script']
            }
        }
    ];
}

async function updateMyDynamicRules(patterns) {
    try {
        // Remove existing dynamic rules
        const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
        const existingRuleIds = existingRules.map(rule => rule.id);
        await chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: existingRuleIds
        });

        // Add new rules for each pattern
        const rules = patterns.map((pattern, index) => ({
            id: nextRuleId + index,
            priority: 1,
            action: {
                type: 'block'
            },
            condition: {
                urlFilter: pattern,
                resourceTypes: ['main_frame', 'sub_frame', 'stylesheet', 'script', 'image', 'font', 'object', 'xmlhttprequest', 'ping', 'csp_report', 'media', 'websocket', 'other']
            }
        }));

        nextRuleId += patterns.length;

        // Add static redirect rules
        const staticRules = createStaticRedirectRules();

        // Add all rules
        await chrome.declarativeNetRequest.updateDynamicRules({
            addRules: [...rules, ...staticRules]
        });

        // Store the current nextRuleId value for persistence
        chrome.storage.local.set({nextRuleIdState: nextRuleId});

    } catch (error) {
        console.error("Error updating dynamic rules:", error);
    }
}

// Service worker setup
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
    // Initialize rule counter on activation
    event.waitUntil(initializeRuleCounter());
});

// Start initialization
initializeRuleCounter();
