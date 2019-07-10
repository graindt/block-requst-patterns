//var patterns = [];
// chrome.storage.local.get("pattern", function (result) {
//     patterns = JSON.parse(result.pattern);
// });

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
        var m = details.url.match(/([0-9][0-9\.]*[0-9])/g);
        return { redirectUrl: "https://ajax.aspnetcdn.com/ajax/jQuery/jquery-"+m[0]+".min.js" };
    },
    {
        urls: [
            "*://ajax.googleapis.com/ajax/libs/jquery/*"
        ]
    },
    [
        "blocking"
    ]
);