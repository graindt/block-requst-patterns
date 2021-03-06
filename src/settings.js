(function () {
    // chrome.storage.local.get("pattern", function (result) {
    //     var txt = document.getElementById("requst-patterns");
    //     console.log(JSON.parse(result.pattern));
    //     txt.value = result.pattern;
    // });

    // document.getElementById("save").onclick = function () {
    //     var txt = document.getElementById("requst-patterns");
    //     console.log(txt.value);
    //     var items = {"pattern": txt.value};
    //     console.log(items);
    //     chrome.storage.local.set(items, function(){
    //         console.log("saved"); 
    //     });
    // }

    var defaultPatterns = [
        "*://www.google-analytics.com/*",
        "*://google-analytics.com/*",
        "*://ssl.google-analytics.com/*",
        "*://*.g.doubleclick.net/*",

        "*://engine.adzerk.net/*",

        "*://hm.baidu.com/*",
        "*://eclick.baidu.com/*",
        "*://pos.baidu.com/*",
        "*://drmcmm.baidu.com/*",
        "*://cpro.baidu.com/*",
        "*://datax.baidu.com/*",
        "*://nsclick.baidu.com/*",
        "*://cpro.baidustatic.com/*",
        "*://dup.baidustatic.com/*",

        "*://pss.alicdn.com/*",
        "*://afptrack.alimama.com/*",
        "*://afpeng.alimama.com/*",
        "*://dsp.simba.taobao.com/*",
        "*://m.simba.taobao.com/*",
        "*://textlink.simba.taobao.com/*",
        "*://show.re.taobao.com/*",

        "*://sax.sina.com.cn/*",
        "*://beacon.sina.com.cn/*",

        "*://btrace.qq.com/*",
        "*://btrace.video.qq.com/*",

        "*://api.growingio.com/*",
        "*://g.cn.miaozhen.com/*",
        "*://t.cr-nielsen.com/*",
        "*://yt.mmstat.com/*",

        "*://gm.mmstat.com/*",
        "*://atm.youku.com /*",
        "*://fvid.atm.youku.com/*",
        "*://html.atm.youku.com/*",
        "*://valb.atm.youku.com/*",
        "*://valf.atm.youku.com/*",
        "*://valo.atm.youku.com/*",
        "*://valp.atm.youku.com/*",
        "*://Lstat.youku.com/*",
        "*://speed.lstat.youku.com/*",
        "*://urchin.lstat.youku.com/*",
        "*://stat.youku.com/*",
        "*://static.lstat.youku.com/*",
        "*://valc.atm.youku.com/*",
        "*://vid.atm.youku.com/*",
        "*://walp.atm.youku.com/*",
        "*://count.atm.youku.com/*",

        "*://cl.webterren.com/*",
        "*://sb.scorecardresearch.com/*",
        "*://mon.xtgreat.com/*",
        "*://m.reachmax.cn/*",

        "*://cm.cn.miaozhen.com/*",
        "*://cm.masky.biddingx.com/*",
        "*://ana.masky.biddingx.com/*",
        "*://shunfei-cm.cn.miaozhen.com/*",
        "*://cms.tanx.com/*",
        "*://ana.stg8.com/*",
        "*://pcookie.tanx.com/*",

        "*://163.wrating.com/*",
        "*://webzj.reg.163.com/*",
        "*://web.stat.ws.126.net/*",

        "*://ads.csdn.net/*"
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
