function setMinCoinStats()
{
    $.getJSON("https://mincoin.io/api/stats.php", function(stats)
    {
        var badge = "";
        if (stats.price_usd) {
            localStorage["mnc_usd"] = stats.price_usd;
        }
        if (localStorage["mnc_usd"]) {
            badge = localStorage["mnc_usd"];
            badge = roundForBadge(badge);
        }

        chrome.browserAction.setBadgeBackgroundColor({color: [0, 0, 0, 255]});
        chrome.browserAction.setBadgeText({"text": "" + badge});
    });
}

$.ajaxSetup({ cache: false });
setInterval(setMinCoinStats, 5 * 60 * 1000);
setMinCoinStats();

chrome.browserAction.onClicked.addListener(function(tab)
{
  chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});
  chrome.browserAction.setBadgeText({"text": "..."});
  setMinCoinStats();
});

function roundNumber(num, dec)
{
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
}

function roundForBadge(num)
{
    if (num < 10) {
        return roundNumber(num, 2);
    } else if (num < 100) {
        return roundNumber(num, 1);
    } else {
        return roundNumber(num, 0);
    }
}