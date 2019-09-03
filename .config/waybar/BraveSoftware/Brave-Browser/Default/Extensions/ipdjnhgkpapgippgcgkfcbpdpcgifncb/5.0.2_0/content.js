
(function ($) {
    $.fn.sendkeys = function (x) {
        //x = x.replace(/([^{])\n/g, '$1{enter}'); // turn line feeds into explicit break insertions, but not if escaped
        return this.each(function () {
            bililiteRange(this).bounds('selection').sendkeys(x).select();
            this.focus();
        });
    };
})(jQuery);

var textDebugging = false;
if (textDebugging) {
  textDebugging = function () {
      console.log.apply(console, arguments)
    }
}
else {
  textDebugging = function () {}
}


function elementIsInput(element) {
  if (element.nodeName == "INPUT" && element.type == "text") {
    return true;
  }

  if (element.nodeName == "TEXTAREA") {
    return true;
  }

  if (element.isContentEditable) {
    return true;
  }

  return false;
}

function insertTextAtCursor(text) {
  var activeElement = document.activeElement;
  var previousOnFocus = null;
  function onFocus(event) {
    textDebugging("on focus!");
    if (previousOnFocus) {
      previousOnFocus(event);
    }
    activeElement.onfocus = previousOnFocus;
    // clear waiting timer
    clearTimeout(focusTimer);
    textDebugging("active element: ", {element: activeElement});
    if (activeElement.isContentEditable) {
        var selection = getSelection()

        // insertTextWithInserHTMLExecCommand(text);
        // insertTextWithRangeReplacement(text);
        insertTextWithTextInputEvent(text);
        return;
			} // isContentEditable

      var selectionIndex = activeElement.selectionStart;
      var value = activeElement.value;
			var pre = value.slice(0, selectionIndex);
			var post  = value.slice(selectionIndex);
			var replacement  = pre + text + post;
      // console.log("replacement: ", replacement);
			activeElement.value = replacement;

			// move cursor after the new emoticon
			var selection = selectionIndex + text.length;
			activeElement.setSelectionRange(selection, selection);

      // send ctrl event
      var keyboardEvent = document.createEvent("KeyboardEvent");
      keyboardEvent.initKeyboardEvent("keydown", true, true, window, true, false, false, false, 17, 0 );
    	activeElement.dispatchEvent(keyboardEvent);

			// set active position
			setTimeout(function () {
				activeElement.blur();
				activeElement.focus();
			}, 1);
  } // onFocus

  previousOnFocus = activeElement.onfocus;
	activeElement.onfocus = onFocus;
  activeElement.blur();
	activeElement.focus();

  // in case onfocus doesn't fire
	var focusTimer = setTimeout(onFocus, 1);
}

function simulateKeyDown(KeyboardEventInit) {
  var activeElement = document.activeElement;
  var keyboardEvent = new KeyboardEvent('keydown', KeyboardEventInit);
  activeElement.dispatchEvent(keyboardEvent);
}

function simulateKeyUp(KeyboardEventInit) {
  var activeElement = document.activeElement;
  var keyboardEvent = new KeyboardEvent('keyup', KeyboardEventInit);
  activeElement.dispatchEvent(keyboardEvent);
}
function simulateKeyPress(KeyboardEventInit) {
  var activeElement = document.activeElement;
  var keyboardEvent = new KeyboardEvent('keypress', KeyboardEventInit);
  activeElement.dispatchEvent(keyboardEvent);
}


function simulatePasteKeysDown() {
  simulateKeyDown({
    code: "ControlLeft",
    location: KeyboardEvent.DOM_KEY_LOCATION_LEFT,
    keyCode: 17,
    ctrlKey: true
  });
  simulateKeyDown({
    code: "KeyV",
    ctrlKey: true,
    keyCode: 86
  });
  simulateKeyPress({
    code: "KeyV",
    ctrlKey: true,
    keyCode: 86
  });

}
function simulatePasteKeysUp() {
  simulateKeyUp({
    key: "KeyV",
    location: KeyboardEvent.DOM_KEY_LOCATION_LEFT,
    ctrlKey: true,
    keyCode: 86
  });
  simulateKeyUp({
    key: "ControlLeft",
    location: KeyboardEvent.DOM_KEY_LOCATION_LEFT,
    keyCode: 17
  });
}

function insertTextWithTextInputEvent(text) {
  var activeElement = document.activeElement;
  var inputEvent = document.createEvent('TextEvent');
  inputEvent.initTextEvent('textInput', true, true, window, text);
  simulatePasteKeysDown()
  activeElement.dispatchEvent(inputEvent);
  simulatePasteKeysUp();
}

function insertEmoji(emoji) {
  // Facebook insertion is buggy, disable
  // var isFacebook = /facebook\.com/.test(document.domain);
  // if (isFacebook) {
  //   return;
  // }

    var el = document.activeElement;
    //console.log("FROM CONTENT", emoji, el)
    if (el.nodeName == 'INPUT' || el.nodeName == 'TEXTAREA') {
        for (var i = 0; i < emoji.length; i++) {
            $(el).sendkeys(emoji[i]);
        }
    }
    else if (el.isContentEditable) {
        insertTextAtCursor(emoji)
    }
}

var matchText = function (node, regex, callback, excludeElements) {
    excludeElements || (excludeElements = ['script', 'style', 'iframe', 'canvas', 'noscript', 'img', 'textarea', 'input']);
    var child = node.firstChild;
    while (child) {
        switch (child.nodeType) {
            case 1:
                //console.log("Other node");
                if (excludeElements.indexOf(child.tagName.toLowerCase()) > -1)
                    break;
                if (child.isContentEditable) {
                    //console.log("Skip contentEditable element");
                    break;
                }
                if (location.hostname.indexOf('twitter') > -1)
                    replaceTwEmoji(child);
                if (location.hostname.indexOf('google') > -1) {
                    replaceGoogleEmoji(child);
                    replaceGoogleHangoutsEmoji(child);
                    break
                }
                matchText(child, regex, callback, excludeElements);
                break;
            case 3:
                replaceEmoji(child);
                break;
        }
        child = child.nextSibling;
    }

    return node;
};

function replaceTwEmoji(node) {
    var twEmoji = node.querySelectorAll('.Emoji.Emoji--forText');
    var match = '';
    if (twEmoji.length > 0) {
        for (var t = 0; t < twEmoji.length; t++) {
            match = twEmoji[t].alt;
            if (dict[match])
                twEmoji[t].parentNode.replaceChild(createIcon(match), twEmoji[t]);
        }
    }
}
function replaceGoogleEmoji(node) {
    iconSize = {width: '24px', height: '24px', toqp: '-0.2px', padding: "0 .05em 0 .1em"};
    var twEmoji = node.querySelectorAll('[goomoji]');
    var match = '';
    if (twEmoji.length > 0) {
        for (var t = 0; t < twEmoji.length; t++) {
            match = twEmoji[t].alt;
            if (dict[match])
                twEmoji[t].parentNode.replaceChild(createIcon(match), twEmoji[t]);
        }
    }
}
/*function replaceGoogleHangoutsEmoji(node) {
    iconSize = {width: '1.2em', height: '1.2em', top: '-0.2em', padding: "0"};
    var twEmoji = node.querySelectorAll('[data-emo]');
    var match = '';
    if (twEmoji.length > 0) {
        for (var t = 0; t < twEmoji.length; t++) {
            match = twEmoji[t].getAttribute('data-emo');
            if (dict[match]){
                twEmoji[t].innerHTML = '';
                twEmoji[t].appendChild( createIcon(match) );
            }

        }
    }
}*/
function replaceEmoji(node) {

    if (node.nodeType != 3) {

        return false;
    }
    if (node.parentNode && node.parentNode.isContentEditable) {
        //console.log("Skip text because of contentEditable parent");
        return true
    }

    if (node.parentNode && node.parentNode.nodeName.toLowerCase() == 'emoji-description'){
      return true;
    }


    var text = node.data;
    if (text.trim().length > 1) {
        var bk = 0;
        var parent = node.parentNode;
        var scale = 0;
        text.replace(regExp, function (match, p1, offset, string) {
            var newTextNode = node.splitText(offset + bk);
            bk -= node.data.length + match.length;
            newTextNode.data = newTextNode.data.substr(match.length);
            var nodeToInsert;
            if (match[0] == ':') {
                nodeToInsert = createIcon(match.toLowerCase(), scale);
                parent.insertBefore(nodeToInsert, newTextNode);
            }
            else {
                nodeToInsert = createIcon(match, scale);
                parent.insertBefore(nodeToInsert, newTextNode);
            }
            node = newTextNode;
            //setTimeout(function () {
            //    //console.log("new node ",nodeToInsert, nodeToInsert.clientHeight);
            //    h = (nodeToInsert.clientHeight + 4) + 'px';
            //    nodeToInsert.style.height = h;
            //    nodeToInsert.style.width = h;
            //
            //})
        });

    }
    return true
}


function createIcon(match, scale) {
    var span = document.createElement("span");
    span.style.display = 'inline-block';
    span.style.lineHeight = 'normal';
    span.style.fontSize = 'inherit';
    span.style.verticalAlign = 'middle';
    //span.style.overflow = 'hidden';
    span.style.position = 'relative';
    span.style.width = iconSize.width;
    span.style.height = iconSize.height;
    if (iconSize.top)
        span.style.top = iconSize.top;
    if (iconSize.padding)
        span.style.padding = iconSize.padding;
    $(span).append('<svg style="padding: 0; margin: 0; width:100%; height:100%;" ><use xlink:href= "#emoji-' + dict[match].unicode.toLowerCase() + '"></use></svg><emoji-description style="width:0px;height:0px;font-size:0;line-height:0;">'+match+'</desc>');
    return span;
}


var connect = function () {
    observer.observe(document.getElementsByTagName("body")[0], {
        childList: true,
        subtree: true,
        characterData: true
    });
};
var disconnect = function () {
    observer.disconnect()
};

var observer = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
        if (queue.indexOf(mutations[i].target) == -1) {
            queue.push(mutations[i].target)
        }

    }
});
var queue = [];
var processQueue = function () {
    disconnect();
    var body = document.getElementsByTagName("body")[0];
    if (queue.indexOf(body) > -1) {
        matchText(body, regExp);
        queue = [];
    } else {
        var count = 0;
        while (queue.length > 0 && count < 500) {
            var el = queue.pop();
            if (!replaceEmoji(el)) {
                matchText(el, regExp);
            }
            count += 1;
        }
    }
    connect();
};
var dict = {};
var keys = [];
var regExp;
var iconSize = {width: '1.1em', height: '1.1em', top: '-0.1em'};
if (location.hostname.indexOf('facebook.com') > -1)
    iconSize = {width: '17px', height: '17px'};
if (location.hostname.indexOf('nstagram.com') > -1)
    iconSize = {width: '1.25em', height: '1.25em', top: '-0.2em'};
if (location.hostname.indexOf('twitter.com') > -1)
    iconSize = {width: '1.25em', height: '1.3em', toqp: '-0.2em', padding: "0 .05em 0 .1em"};

//$(function () {
//var css = '[class*=emojione-] {width:0.9em;height:0.9em;zoom:1;background-image: url("' + chrome.extension.getURL('data/emojione.sprites.png') + '") !important}';
//var style = document.createElement("style");
//var styleText = document.createTextNode(css);
//style.appendChild(styleText);
//document.querySelector('head').appendChild(style);

window.monoExtension = window.monoExtension || {
  addListener: function(listener) {
    if (chrome != undefined && chrome.runtime != undefined && chrome.runtime.onMessage != undefined) {
      chrome.runtime.onMessage.addListener(listener);
      return;
    }
    else {
      window.monoExtension.listeners.push(listener);
    }
  },

  sendMessage: function(message, responseCallback) {
    if (chrome != undefined && chrome.runtime != undefined && chrome.runtime.onMessage != undefined) {
      // console.log("sendMessage " + chrome.runtime);
      chrome.runtime.sendMessage(message, responseCallback);
      return;
    }
    for (key in this.listeners) {
      var listener = this.listeners[key];
      listener(message, "sender", responseCallback);
    }
  },
  listeners: []
};

window.monoExtension.sendMessage({query: "data"}, function (response) {
    //console.log("Response from bg", response);
    dict = response.dict;
    keys = response.keys;
    var div = $('<div/>').html(response.svgData).css('display', 'none');
    $(document.querySelector('body')).append(div);
    regExp = new RegExp("(" + response.reg + ")", 'ig');
    if (response.enabled){
        queue.push(document.getElementsByTagName("html")[0]);
        connect();

    }

    setInterval(function () {
            if (queue.length > 0)
                processQueue();
        }, 400
    );
});

//});

window.monoExtension.addListener(function (request, sender, sendResponse) {
        if (request && request.autoReplace) {
            if (request.autoReplace == 'off') {
                disconnect()
            } else {
                queue.push(document.getElementsByTagName("body")[0]);
            }
        }
        if (request && request.emoji) {
            insertEmoji(request.emoji)
        }
    }
);
