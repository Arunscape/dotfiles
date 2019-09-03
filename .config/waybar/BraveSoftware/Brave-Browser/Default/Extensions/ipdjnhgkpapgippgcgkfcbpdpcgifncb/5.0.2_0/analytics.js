function getCookie(cname)
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

var t_id_v = 'UA-68326861-1';
var t_id = 'UA-68326861-5';
var c_id = '';
var cid = '';
if (localStorage.getItem('ga_uuid')) {
    c_id = localStorage.getItem('ga_uuid');
} else {
    if (getCookie('_ga') && getCookie('_ga') !== '') {
        cid = getCookie('_ga');
        cid = cid.replace('GA1.1.', '');
    } else {
        cid = generateUUID();
    }
    localStorage.setItem('ga_uuid', cid);
    c_id = cid;
}

function sendGA(type, param) {
    try {
        var request = new XMLHttpRequest();
        var message = '';
        switch (type) {
            case 'pageview':
                message =
                    "v=1&tid=" + t_id + "&cid=" + c_id + "&aip=1" +
                    "&ds=extension&t=pageview&p=" + param;
                break;
            case 'event-settings':
                message =
                    "v=1&tid=" + t_id + "&cid=" + c_id + "&aip=1" +
                    "&ds=extension&t=event&ec=settings&ea=send_settings&el=" + param;
            break;
        }

        request.open("POST", "https://www.google-analytics.com/collect", true);
        request.send(message);
    } catch (e) {
        console.log("sendGA failure");
    }
}

//for each page load, send pageview
//this.sendGA('pageview', '/bg.html');

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-68326861-5', 'auto');
ga('require', 'displayfeatures');
ga('set', 'checkProtocolTask', function(){ /* nothing */ });
ga('send', 'pageview', 'bg.html');

//every month, send anonymous settings-usage data
if (!localStorage.getItem('settings_last_send') || localStorage.getItem('settings_last_send') == 'undefined' || localStorage.getItem('settings_last_send') == '') {
    sendSettings();
} else {
    var lastSend = parseInt(localStorage.getItem('settings_last_send'));
    var date = new Date();
    var timeNow = date.getTime();
    if (timeNow - lastSend > 60*60*24*30) {
        sendSettings();
    }
}

function sendSettings() {
    //update last send
    var date = new Date();
    localStorage.setItem('settings_last_send', date.getTime());

    //init settings array
    var aSettings = [];
    //get bulk of settings in local storage
    var s = localStorage.getItem('settings');
    if (s) {
        s = JSON.parse(s);
        aSettings['autoReplace'] = s.autoReplace;
        aSettings['usesBlacklist'] = s.blacklistedDomains == '' ? 'no' : 'yes';
        aSettings['autoReplaceSize'] = s.autoReplaceSize;
        aSettings['autoCopy'] =  s.autoClipboard;
        aSettings['panelIconSize'] = s.size;
        aSettings['panelDisplay'] = localStorage.getItem('panelState') == 'persist' ? 'undocked' : 'docked';
        aSettings['numRecents'] = localStorage.getItem('numRecents') ? localStorage.getItem('numRecents') : '30';

    } else {
        //indicates user is new or has never updated settings, send defaults
        aSettings['autoReplace'] = 'on';
        aSettings['usesBlacklist'] = 'no';
        aSettings['autoReplaceSize'] = '100';
        aSettings['autoCopy'] = 'on';
        aSettings['panelIconSize'] = 'normal';
        aSettings['panelDisplay'] = 'docked';
        aSettings['numRecents'] = '30';
    }

    for (var k in aSettings) {
        if (aSettings.hasOwnProperty(k)) {
            //this.sendGA('event-settings', k + ':' + aSettings[k]);
        }
    }
}