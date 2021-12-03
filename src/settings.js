(function () {
    var defaultPatterns = [
        "*://www.google-analytics.com/*",
        "*://google-analytics.com/*",
        "*://ssl.google-analytics.com/*",
        "*://*.g.doubleclick.net/*"
    ];

    var patterns = localStorage['pattern'];
    if (patterns === undefined) {
        localStorage['pattern'] = JSON.stringify(defaultPatterns);
        patterns = localStorage['pattern'];
    }
    var txt = document.getElementById("requst-patterns");
    txt.value = patterns;

    document.getElementById("save").onclick = function () {
        localStorage['pattern'] = txt.value;
        document.getElementById("msg").textContent = "Save successful. Restart Browser to take effect.";
        setTimeout(clearMessage, 1000);
    }

    function clearMessage() {
        document.getElementById("msg").textContent = "";
    }
})();
