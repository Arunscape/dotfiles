//init possible opening of persistent panel
var panelState = localStorage.getItem('panelState');
var hash = window.location.hash.substring(1);
var browserType = localStorage.getItem('browserType');
if (browserType != 'Firefox') {
    //'init connection for Chrome/Opera'
    var bgMessage = chrome.extension.connect({
        name: 'generic_message'
    });
    var openPanel = chrome.extension.connect({
        name: 'open_panel'
    });
}
var panelOpenCount = !localStorage.getItem('panelOpenCount') ? 0 : parseInt(localStorage.getItem('panelOpenCount'));
if (panelOpenCount < 3) {
    $('.tooltip--popout').show();
}
localStorage.setItem('panelOpenCount', panelOpenCount + 1);
if (hash != 'persist') {
    if (panelState == 'persist') {
        window.close(); //remove popup
        if (browserType == 'Firefox') {
            var bgMessage = browser.runtime.connect({name: 'generic_message'});
        }
        bgMessage.postMessage({msg: 'does_persist'});
        bgMessage.postMessage({msg: 'attempt_close'});

        //send message to background to trigger
        if (browserType == 'Firefox') {
            var openPanel = browser.runtime.connect({name: 'open_panel'});
        }
        openPanel.postMessage({panel_type: 'persist'});
    } else {
        //standard popup panel action
    }
}

$(document).ready(function () {

    if (localStorage.getItem('panelState') == 'persist') {

        $('#panel-state').addClass('btn-panel-persist').attr('title', 'Re-Open Panel in Popup');

        window.onresize = function () {
            localStorage.setItem('panelWidth', window.innerWidth);
            localStorage.setItem('panelHeight', window.innerHeight);
        };

        window.setInterval(function () {
            check_window_pos()
        }, 500);

    } else {
        $('#panel-state').addClass('btn-panel-popup').attr('title', 'Re-Open Panel in New Window');
    }

    $('#panel-state').click(function () {
        //set the panel count to 3 so that the tool tip will no longer display
        localStorage.setItem('panelOpenCount', 3);

        if (!localStorage.getItem('panelXPos')) {
            localStorage.setItem('panelXPos', window.screenLeft);
        }
        if (!localStorage.getItem('panelYPos')) {
            localStorage.setItem('panelYPos', window.screenTop);
        }
        if ($(this).hasClass('btn-panel-popup')) {
            localStorage.setItem('panelState', 'persist');
            window.close();
            if (browserType == 'Firefox') {
                var bgMessage = browser.runtime.connect({name: 'generic_message'});
            } else {
                var bgMessage = chrome.extension.connect({name: 'generic_message'});
            }
            bgMessage.postMessage({msg: 'attempt_close'});
            if (browserType == 'Firefox') {
                var openPanel = browser.runtime.connect({name: 'open_panel'});
            } else {
                var openPanel = chrome.extension.connect({name: 'open_panel'});
            }
            openPanel.postMessage({panel_type: 'persist'});
        } else {
            localStorage.setItem('panelState', 'popup');
            if (browserType == 'Firefox') {
                var bgMessage = browser.runtime.connect({name: 'generic_message'});
            } else {
                var bgMessage = chrome.extension.connect({name: 'generic_message'});
            }
            bgMessage.postMessage({msg: 'attempt_close_then_open_popup'});
        }
    });

});

var win_pos_x = get_window_x_pos();
var win_pos_y = get_window_y_pos();

function check_window_pos()
{
    var new_win_pos_x = get_window_x_pos();
    var new_win_pos_y = get_window_y_pos();

    if (new_win_pos_x != win_pos_x || new_win_pos_y != win_pos_y) {
        localStorage.setItem('panelXPos', new_win_pos_x);
        localStorage.setItem('panelYPos', new_win_pos_y);
        win_pos_x = new_win_pos_x;
        win_pos_y = new_win_pos_y;
    }
}

function get_window_x_pos()
{
    var winx;

    if(window.screenX) {
        winx = window.screenX;
    } else if(window.screenLeft) {
        winx = window.screenLeft;
    }
    return winx;
}

function get_window_y_pos()
{
    var winy;

    if(window.screenY) {
        winy = window.screenY;
    } else if(window.screenTop) {
        winy = window.screenTop;
    }
    return winy;
}