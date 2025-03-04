// Dynamic rules for patterns stored in chrome.storage.local
let nextRuleId = 1;

// Initialize and set up dynamic rules
chrome.storage.local.get(['pattern'], function(result) {
    const patterns = result.pattern ? JSON.parse(result.pattern) : [];
    if (patterns && patterns.length > 0) {
        updateMyDynamicRules(patterns);
    }
});

// Listen for storage changes to update rules
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.pattern) {
        const patterns = changes.pattern.newValue ? JSON.parse(changes.pattern.newValue) : [];
        updateMyDynamicRules(patterns);
    }
});

async function updateMyDynamicRules(patterns) {
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
    const staticRules = [
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

    // Add all rules
    await chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [...rules, ...staticRules]
    });
}

// Service worker setup
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});
