var p = localStorage['pattern'];
var patterns = p !== undefined ? JSON.parse(p) : [];

if (patterns !== undefined && patterns.length > 0) {
    chrome.webRequest.onBeforeRequest.addListener(
        function (details) {
            return { cancel: true };
        },
        {
            urls: patterns
        },
        [
            "blocking"
        ]
    );
}

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        if (details.url.indexOf('cdnjs.cloudflare.com/ajax/libs/') > -1) {
            return { redirectUrl: details.url.replace('cdnjs.cloudflare.com/ajax/libs/', 'cdn.staticfile.org/') }
        } else if (details.url.indexOf('www.google.com/recaptcha/') > -1) {
            return { redirectUrl: details.url.replace("www.google.com", "www.recaptcha.net") };
        }
        var m = details.url.match(/([0-9][0-9\.]*[0-9])/g);
        return { redirectUrl: "https://ajax.aspnetcdn.com/ajax/jQuery/jquery-"+m[0]+".min.js" };
    },
    {
        urls: [
            "*://ajax.googleapis.com/ajax/libs/jquery/*",
            "*://code.jquery.com/jquery*.js",
            "*://www.google.com/recaptcha/*",
            "*://cdnjs.cloudflare.com/ajax/libs/*"
        ]
    },
    [
        "blocking"
    ]
);
