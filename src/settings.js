import defaultPatterns from './patterns.js';

(function () {
    const txt = document.getElementById("requst-patterns");

    // Load patterns from storage
    chrome.storage.local.get(['pattern'], function(result) {
        if (!result.pattern) {
            // Initialize with default patterns
            chrome.storage.local.set({
                pattern: JSON.stringify(defaultPatterns)
            }, function() {
                txt.value = JSON.stringify(defaultPatterns, null, 2);
            });
        } else {
            try {
                // Parse and re-stringify to ensure proper formatting
                const patterns = JSON.parse(result.pattern);
                txt.value = JSON.stringify(patterns, null, 2);
            } catch (e) {
                // Fallback to raw value if JSON parsing fails
                txt.value = result.pattern;
            }
        }
    });

    document.getElementById("save").onclick = function () {
        chrome.storage.local.set({
            pattern: txt.value
        }, function() {
            document.getElementById("msg").textContent = "Save successful";
            setTimeout(clearMessage, 1000);
        });
    }

    function clearMessage() {
        document.getElementById("msg").textContent = "";
    }
})();
