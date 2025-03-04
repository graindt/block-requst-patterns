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
                txt.value = JSON.stringify(defaultPatterns);
            });
        } else {
            txt.value = result.pattern;
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
