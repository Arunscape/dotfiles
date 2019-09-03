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
    for (var key in this.listeners) {
      if (this.listeners.hasOwnProperty(key)) {
          var listener = this.listeners[key];
          console.log("listener: ", listener);
          listener(message, "sender", responseCallback);
      }
    }
  },
  listeners: []
};

window.emojiOneSettingsController = window.emojiOneSettingsController || {
  // constants
  webRequestURL: "http://emojione/settings",
  settingsMessage: "settingsMessage",
  // variables
  settings: {},
  shouldAutoReplaceEmojis: false,
  autoReplaceSize: '100',
  blacklistedDomains: '',
  // init
  initRunOnce: false,
  init: function () {
    if (this.initRunOnce) {
      return;
    }
    else {
      this.initRunOnce = true;
    }

    if (location.protocol == 'chrome-extension:' || location.protocol == 'moz-extension:') {
      // Background code
      // this.installXMLHttpRequestIntercept();
      this.installMessageRequestHandler();
    } else {
      // Content script code
      // this.synchronousLoad();
      // this.asynchronousLoadWithIntercept();
      this.asynchronousLoadWithExtensionMessage();
    }

  }, // init
  // settings update callbacks
  settingsUpdateListeners: [],
  addSettingsUpdateListener: function (listener) {
    this.settingsUpdateListeners.push(listener);
  },
  notifyUpdateListeners: function () {
    for (var key in this.settingsUpdateListeners) {
      if (this.settingsUpdateListeners.hasOwnProperty(key)) {
          var listener = this.settingsUpdateListeners[key];
          listener(this);
      }
    }
  },
  hydrateSettings: function() {
    var settings = this.settings;
    if (typeof settings.autoReplace == "string") {
      if (settings.autoReplace == "off") {
        this.shouldAutoReplaceEmojis = false;
      }
    }
    this.blacklistedDomains = settings.blacklistedDomains;
    this.autoReplaceSize = settings.autoReplaceSize;
    this.notifyUpdateListeners();
  }, // hydrateSettings

  // load settings synchronously with local storage
  synchronousLoad: function () {
    this.synchronousLoadWithInterceptedXMLHTTPRequest();
    this.hydrateSettings();
  }, // synchronousLoad

  synchronousLoadWithInterceptedXMLHTTPRequest: function () {
    // we use chrome.webRequest.onBeforeRequest to intercept
    // an XMLHttpRequest, redirect with a URL.createObjectURL of
    // the settings in JSON format
    // and then revoke the object

    var request = new XMLHttpRequest();
    var isAsynchronous = false;
    var url = this.webRequestURL;
    request.open('GET', url, isAsynchronous);
    try {
      request.send(null);
    }
    catch (exception) {
      console.log("exception in web request: ", exception);
      return;
    }
    var blobURL = request.responseURL;
    var blobResponse = request.response;
    var response = JSON.parse(blobResponse);

    this.settings = response;
    window.URL.revokeObjectURL(blobURL);
    console.log("loaded settings: ", this.settings);
  }, // synchronousLoadWithInterceptedXMLHTTPRequest
  // read settings while running in background script
  backgroundScriptSettings: function () {
    var settings = "{}";
    if (typeof localStorage['settings'] == "string") {
      settings = localStorage['settings'];
    }

    return settings;
  }, // backgroundScriptSettings
  installXMLHttpRequestIntercept: function () {
    var callback = function(details) {
      var response = {};
      console.log("matches settings url!");
      var settings = this.backgroundScriptSettings();
      console.log("settings: ", settings);
      var blob = new Blob([settings], {type: "application/json"});
      console.log("blob: ", blob);
      var blobURL = window.URL.createObjectURL(blob);
      response.redirectUrl = blobURL;

      console.log("response: ", response);

      return response;
    };
    var filter = {
      urls: [
        this.webRequestURL
      ]
    };
    var opt_extraInfoSpec = [ 'blocking' ];
    chrome.webRequest.onBeforeRequest.addListener(callback, filter, opt_extraInfoSpec);
    console.log("added webrequest listener: ", filter);
  }, // installXMLHttpRequestIntercept

  installMessageRequestHandler: function() {
    var callback = function(message, sender, sendResponse) {
      if (message == this.settingsMessage) {
        var settings = this.backgroundScriptSettings();
        sendResponse(settings);
      }
    }
    callback = callback.bind(this);

    window.monoExtension.addListener(callback);
  }, // installMessageRequestHandler

  asynchronousLoadWithExtensionMessage: function() {
    var message = this.settingsMessage;
    var responseCallback = function (response) {
      var settings = JSON.parse(response);
      this.settings = settings;
      this.hydrateSettings();
    }

    responseCallback = responseCallback.bind(this);
    window.monoExtension.sendMessage(message, responseCallback);
  }, // asynchronousLoadWithExtensionMessage

  // Loading settings asynchronously can be done in a few different way
  // Refresh Method
  asynchronousLoadWithRefresh: function() {
    // we remove everything from the page, do an asychronous request for data,
    // store it into localStorage, and then refresh the page
  }, // asynchronousLoadWithRefresh

  asynchronousLoadWithIntercept: function() {
    var request = new XMLHttpRequest();
    var isAsynchronous = true;
    var url = this.webRequestURL;
    console.log("loading: ", url);
    request.onload = function (event) {
      var blobURL = request.responseURL;
      console.log("url: ", blobURL);
      var blobResponse = request.response;
      console.log("response: ", blobResponse);
      var response = JSON.parse(blobResponse);

      this.settings = response;
      window.URL.revokeObjectURL(blobURL);
      console.log("loaded settings: ", this.settings);
    };
    request.open('GET', url, isAsynchronous);
    request.responseType = 'blob';
    request.send(null);
  }
}

window.emojiOneSettingsController.init();

// define(function() {
/* Key Simulators */
 window.emojiOneKeySynthesizer = window.emojiOneKeySynthesizer ||  {
simulatePasteKeysDown: function simulatePasteKeysDown() {
  this.simulateKeyDown({
    code: "ControlLeft",
    location: KeyboardEvent.DOM_KEY_LOCATION_LEFT,
    keyCode: 17,
    ctrlKey: true
  });
  this.simulateKeyDown({
    code: "KeyV",
    ctrlKey: true,
    keyCode: 86
  });
  this.simulateKeyPress({
    code: "KeyV",
    ctrlKey: true,
    keyCode: 86
  });

},
simulatePasteKeysUp: function simulatePasteKeysUp() {
  this.simulateKeyUp({
    key: "KeyV",
    location: KeyboardEvent.DOM_KEY_LOCATION_LEFT,
    ctrlKey: true,
    keyCode: 86
  });
  this.simulateKeyUp({
    key: "ControlLeft",
    location: KeyboardEvent.DOM_KEY_LOCATION_LEFT,
    keyCode: 17
  });
},

simulateKeyDown: function simulateKeyDown(KeyboardEventInit) {
  var activeElement = document.activeElement;
  var keyboardEvent = new KeyboardEvent('keydown', KeyboardEventInit);
  activeElement.dispatchEvent(keyboardEvent);
},

simulateKeyUp: function simulateKeyUp(KeyboardEventInit) {
  var activeElement = document.activeElement;
  var keyboardEvent = new KeyboardEvent('keyup', KeyboardEventInit);
  activeElement.dispatchEvent(keyboardEvent);
},
simulateKeyPress: function simulateKeyPress(KeyboardEventInit) {
  var activeElement = document.activeElement;
  var keyboardEvent = new KeyboardEvent('keypress', KeyboardEventInit);
  activeElement.dispatchEvent(keyboardEvent);
}
};
// return module;
// });

// check if HMR is enabled
// if (module && module.hot) {
//     // accept itself
//     module.hot.accept();
//     console.log("HMRInjectionKit: change accepted!");
// }

var keySynthesize = window.emojiOneKeySynthesizer;
/* Debugging */
var textDebugging = false;
if (textDebugging) {
  textDebugging = function () {
      delete console.log;
      //console.log.apply(console, arguments)
    };
  window.textDebugging = textDebugging;
}
else {
  textDebugging = function () {}
}

if (window.serializedRunLoop) {
  if (window.serializedRunLoop.callbackTimer) {
    clearTimeout(window.serializedRunLoop.callbackTimer);
  }
  delete window.serializedRunLoop;
}

/* Serialized Run Loop */
window.serializedRunLoop = {
  queue: [],
  callbackTimer: null,
  running: true,
  resume: function () {
    this.running = true;
  },
  pause: function () {
    this.running = false;
  },
  scheduledCallback: function () {
    // delete exception handler
    delete window.onerror;
    //console.log("scheduled callback!");
    var self = this;
    self.callbackTimer = null;

    if (!self.running) {
      //console.log("NOT RUNNING");
      self.scheduleTimer();
      return;
    }

    //console.timeEnd('queueRun');

    var queueItem = self.queue.shift();
    var targetFunction = queueItem.targetFunction;
    targetFunction();
    var promise = queueItem.promise;

    // queue promise next
    if (promise) {
      self.insertAtBeginningOfQueue(promise);
    }

    if (self.queue.length > 0) {
      self.scheduleTimer();
    }
    else {
      self.callbackTimer = null;
    }
  },
  insertAtBeginningOfQueue: function (targetFunction, configuration) {
    delete window.onerror;
    var self = this;
    var queueItem = self.queueItemFromFunction(targetFunction, configuration);
    self.queue.unshift(queueItem);
    self.scheduleTimer();
  },
  addToQueue: function (targetFunction, configuration) {
    //console.log("addToQueue");
    console.time('queueRun');
    var self = this;
    var queueItem = self.queueItemFromFunction(targetFunction, configuration);
    self.queue.push(queueItem);
    self.scheduleTimer();
  },
  queueItemFromFunction: function (targetFunction, configuration) {
    var queueItem = {
      targetFunction: targetFunction
    };
    //console.log("queue item!");
    if (configuration != undefined) {
      var promise = configuration.promise;
      if (promise != undefined) {
          queueItem.promise = promise;
      }
    }

    return queueItem;
  },
  scheduleTimer: function() {
    var self = this;
    if (self.callbackTimer == null) {
      var milliseconds = 1;
      // don't take up CPU if we're not running
      if (self.running == false) {
        milliseconds = 100;
      }
      self.callbackTimer = setTimeout(self.scheduledCallback, milliseconds);
      //console.log("timer scheduled");
      // self.callbackTimer = window.requestAnimationFrame(self.scheduledCallback);
      // console.log("callback: ", self.callbackTimer)

    }
  },
  setup: function () {
    // bind self to functions
    var self = window.serializedRunLoop;
    self.insertAtBeginningOfQueue = self.insertAtBeginningOfQueue.bind(self);
    self.addToQueue = self.addToQueue.bind(self);
    self.scheduledCallback = self.scheduledCallback.bind(self);
    self.scheduleTimer = self.scheduleTimer.bind(self);
    self.pause = self.pause.bind(self);
    self.resume = self.resume.bind(self);
  }
};
// perform bindings
window.serializedRunLoop.setup();

/* Timeout Clearing */
function clearAllTimeouts() {
  // Set a fake timeout to get the highest timeout id
  var highestTimeoutId = setTimeout(";");
  for (var i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
  }
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

/* Text Inserters */
function insertTextWithTextInputEvent(text) {

  var activeElement = document.activeElement;
  if ( location.hostname.indexOf('twitter.com') > -1 ) {
    if ( activeElement.classList.contains("tweet-box") ) {
      //grab inner div as active element
      activeElement = activeElement.firstChild;
      //grab cursor pos
      var selection = getSelection();
      var pos = selection.anchorOffset;
      var content = activeElement.textContent;
      //define new content
      //if the last char is a space character (&nbsp;) AND cursor is at last position, we need to move cursor up 5 positions
      if (content.substring(content.length - 6, content.length) == "&nbsp;") {
        if(pos == content.length - 5)
          pos = pos + 6;
      }
      var newContent = content.substr(0, pos) + text + content.substr(pos);
      activeElement.textContent = newContent;
      //increment cursor pos
      $(activeElement).selectRange(pos + 1);
    }
  } else if ( location.hostname.indexOf('slack.com') > -1 ) {
    //console.log('this is SLACKKKK');
  }
  else {
    //initialize the input event
    console.log('input event');
    var inputEvent = document.createEvent('TextEvent');
    inputEvent.initTextEvent('textInput', true, true, window, text);
    keySynthesize.simulatePasteKeysDown();
    activeElement.dispatchEvent(inputEvent);
    keySynthesize.simulatePasteKeysUp();
  }

    /**/
  /*ANOTHER WAY TO DO THE SAME THING AS ABOVE
  function dispatch(target, eventType, char) {
    var evt = document.createEvent("TextEvent");
    evt.initTextEvent (eventType, true, true, window, char, 0, "en-US");
    target.focus();
    target.dispatchEvent(evt);
  }
  dispatch(document.activeElement.firstChild, "textInput", text);*/
}

function getCaretCharOffsetInDiv(element) {
  var caretOffset = 0;
  if (typeof window.getSelection != "undefined") {
    var range = window.getSelection().getRangeAt(0);
    var preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    caretOffset = preCaretRange.toString().length;
  }
  else if (typeof document.selection != "undefined" && document.selection.type != "Control")
  {
    var textRange = document.selection.createRange();
    var preCaretTextRange = document.body.createTextRange();
    preCaretTextRange.moveToElementText(element);
    preCaretTextRange.setEndPoint("EndToEnd", textRange);
    caretOffset = preCaretTextRange.text.length;
  }
  return caretOffset;
}

function getCaretPosition() {
  var x = 0;
  var y = 0;
  var sel = window.getSelection();

  if ( sel.rangeCount ){
    var range = sel.getRangeAt(0).cloneRange();
    if ( range.getClientRects() ) {
      range.collapse(true);
      var rect = range.getClientRects()[0];
      if ( rect ) {
        x = rect.left;
        y = rect.top;
      }
    }
  }

  return  {
    x: x,
    y: y
  };
}

(function ($, undefined) {
  $.fn.getCursorPosition = function () {
    var el = $(this).get(0);
    var pos = 0;
    if ('selectionStart' in el) {
      pos = el.selectionStart;
    } else if ('selection' in document) {
      el.focus();
      var Sel = document.selection.createRange();
      var SelLength = document.selection.createRange().text.length;
      Sel.moveStart('character', -el.value.length);
      pos = Sel.text.length - SelLength;
    }
    return pos;
  }
})(jQuery);

$.fn.selectRange = function(start, end) {
  if(end === undefined) {
    end = start;
  }
  return this.each(function() {
    if('selectionStart' in this) {
      this.selectionStart = start;
      this.selectionEnd = end;
    } else if(this.setSelectionRange()) {
      this.setSelectionRange(start, end);
    } else if(this.createTextRange) {
      var range = this.createTextRange();
      range.collapse(true);
      range.moveEnd('character', end);
      range.moveStart('character', start);
      range.select();
    }
  });
};

function insertTextWithInsertHTMLExecCommand(text) {
  document.execCommand("insertHTML", false, text);
}

function insertTextWithRangeReplacement(text) {
  var activeElement = document.activeElement;
  var ownerDocument = activeElement.ownerDocument;
  activeElement.focus();
  var selection = ownerDocument.getSelection();
  var range = ownerDocument.createRange();
  range.collapse(false);
  range.text = text;
}

function clone(object) {
  clone = {};
  for (var p in object) {
      if (object.hasOwnProperty(p)) {
          clone[p] = object[p];
      }
  }
  return clone
}
window.clone = clone;

// on focus callback
function insertTextOnFocusEvent(text) {
  var activeElement = document.activeElement;
  window.setTimeout(function() { activeElement.focus(); }, 0);
  if (activeElement.isContentEditable) {
      var selection = getSelection();
      //var focusOffset = 0;
      //console.log("focus event");
      var focusNode = null;
      if (selection != undefined) {
        focusNode = selection.focusNode;
        //focusOffset = focusNode.focusOffset;
        if (focusNode) {
          // baseNode.nodeType == Node.TEXT_NODE
          //console.log("cloning window");
          var clone = window.clone;
          textDebugging("selection:", selection);
          textDebugging("focusNode: ", {node:focusNode});
          //textDebugging("focus offset:", selection.focusOffset);
          /*console.log("selection: ", selection);
          console.log("focusNode: ", {node:focusNode});
          console.log("focus offset:", selection.focusOffset);*/
          //console.log(focusNode);
          var nodeValue = focusNode.nodeValue;
          if (nodeValue) {
            // var length = nodeValue.length;
            // var range = document.createRange()
            // range.setStart(currentNode, length);
            // range.setEnd(currentNode, length);
            // selection.removeAllRanges();
            // selection.addRange(range);
            // textDebugging("set range:", range);
          }
        }
        else {
          textDebugging("current node:", focusNode);
          textDebugging("selection: ", selection);
        }
      }
      else {
        textDebugging("selection undefined, active element: ", {activeElement: activeElement});
      }
      // insertTextWithInserHTMLExecCommand(text);
      // insertTextWithRangeReplacement(text);

      if (location.hostname.indexOf('slack') !== false) {
        //console.log('slack, yes.');
      } else {
          insertTextWithTextInputEvent(text);
      }

      // fix Facebook bug of first insertion not getting insertion caret advanced
      // correctly
      if (focusNode != null) {
        var listenerWrapper = {};
        listenerWrapper.focusListener = function (event) {
          // delete exception handler
          delete window.onerror;

          activeElement.removeEventListener("focus", listenerWrapper.focusListener, true);

          textDebugging("this: ", this);
          var selection = getSelection();
          if (!selection) {
            textDebugging("no selection", selection);
            return;
          }
          var focusNode = selection.focusNode;
          textDebugging("advancing selection", selection);

          if (focusNode) {
            var range = document.createRange();
            var length = 0;
            if (focusNode.nodeValue) {
              length = focusNode.nodeValue.length;
              textDebugging("focus node length: ", length);
            }
            else if (focusNode.textContent) {
              length = focusNode.textContent.length;
            }


            textDebugging("node:", {node:focusNode});
            // range.setStart(focusNode, length);
            // range.setEnd(focusNode, length);
            range.setStartAfter(focusNode);
            range.setEndAfter(focusNode);

            selection.removeAllRanges();
            selection.addRange(range);
            textDebugging("setting range start to: ", length);
          }

        };
        textDebugging("setting focus listener");
        // activeElement.addEventListener("focus", listenerWrapper.focusListener, true);
        window.serializedRunLoop.insertAtBeginningOfQueue(function () {
          activeElement.blur();
          activeElement.focus();
          window.serializedRunLoop.insertAtBeginningOfQueue(function () {
            listenerWrapper.focusListener();

          });
        });

      }
      return;
    } // isContentEditable


    if ( location.hostname.indexOf('tweetdeck.twitter') > -1 ) {
      console.log("Emoji input currently disabled for Tweetdeck.");
    } else {
      if (activeElement) {
        if (location.hostname.indexOf('slack.com') > -1) {
          //console.log('okay, it. is. SLACK');
        }
        var selectionIndex = activeElement.selectionStart;
        if (activeElement.value) {
          var value = activeElement.value;
          var pre = value.slice(0, selectionIndex);
          var post = value.slice(selectionIndex);
          var replacement = pre + '' + text + '' + post;
          activeElement.value = replacement;
        }

        // move cursor after the new emoticon
        var selection = selectionIndex + text.length;
        activeElement.setSelectionRange(selection, selection);

        // set active position
        window.serializedRunLoop.insertAtBeginningOfQueue(function () {
          activeElement.blur();
          activeElement.focus();
        });
      }
    }
}

function getCaretPositionInText(editableDiv) {
  var caretPos = 0,
      sel, range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      if (range.commonAncestorContainer.parentNode == editableDiv) {
        caretPos = range.endOffset;
      }
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    if (range.parentElement() == editableDiv) {
      var tempEl = document.createElement("span");
      editableDiv.insertBefore(tempEl, editableDiv.firstChild);
      var tempRange = range.duplicate();
      tempRange.moveToElementText(tempEl);
      tempRange.setEndPoint("EndToEnd", range);
      caretPos = tempRange.text.length;
    }
  }
  return caretPos;
}

function simulatePasteEvent(input) {
    //console.log('simulating paste event');
    var activeElement = document.activeElement;
    $(activeElement).focus();
    var inputEvent = document.createEvent('TextEvent');
    inputEvent.initTextEvent('textInput', true, true, window, input);
    keySynthesize.simulatePasteKeysDown();
    activeElement.dispatchEvent(inputEvent);
    keySynthesize.simulatePasteKeysUp();

    //many inputs still not getting cursor position advanced after insert
}
function insertIntoInput(input) {
    //console.log('inserting into input');
    var activeElement = document.activeElement;
    activeElement.setAttribute("tabindex", "0");
    var thisVal = $(activeElement).val();
    var newVal = thisVal + ' ' + input;
    $(activeElement).val(newVal);
}

function insertTextAtCursor(text) {

  if (document.activeElement.id == 'extension_promo_ad_emoji') {
    var bgAdminMessage = chrome.runtime.connect({
      name: 'emoji_admin_set'
    });
    bgAdminMessage.postMessage({
      doc: document
    });
    bgAdminMessage.onMessage.addListener(function(msg) {
      document.getElementById('extension_promo_ad_emoji').setAttribute('data-id', msg.unicode);
    });
    document.activeElement.value = text;
  } else {

      var activeElement = document.activeElement;
      var isTweetBox = false;
      var isTweetReply = false;
      var isTwitterSearch = false;
      var isTweetDeck = false;

      var stillRunInsert = true;

      if($(activeElement).is(':input')) {
          insertIntoInput(text);
      } else {

          if (location.hostname.indexOf('twitter.com') > -1) {
              if (location.hostname.indexOf('tweetdeck.twitter') > -1) {
                  isTweetDeck = true;
              } else if (activeElement.classList.contains("tweet-box")) {
                  if (activeElement.innerHTML.indexOf('twitter-atreply') !== -1) {
                      isTweetReply = true;
                  } else {
                      isTweetBox = true;
                  }
              } else {
                  isTwitterSearch = true;
              }
          }

          if (location.hostname.indexOf('slack.com') > -1) {
              if (activeElement.textContent == '') { //message is blank
                  activeElement.textContent = text;
              } else { //message not blank
                  activeElement.setAttribute("tabindex", "0");
                  var elem = $(activeElement).find('p').last();
                  var lineText = elem.text();
                  $(elem).html(lineText + text + ' '); //replace original contents with itself plus the emoji (spaced)
              }
              stillRunInsert = false;
          }

          if (location.hostname.indexOf('mail.google.com') > -1 || location.hostname.indexOf('youtube.com') > -1) {
              console.log(activeElement);
              if($(activeElement).attr('contenteditable') === 'true') {
                  stillRunInsert = false;
                  var current = activeElement.textContent;
                  $(activeElement).html(current + text);
              }
          }
          if (isTweetBox) { //specific actions for tweetbox
              if (activeElement.textContent == '') { //tweet is blank
                  activeElement.textContent = text;
                  stillRunInsert = false;
              } else { //tweet is not blank
                  //to overcome the fact that twitter now replaces native unicode with twemoji, we'll now append
                  // all inserted emoji as span elements AFTER all other message box content
                  activeElement.setAttribute("tabindex", "0");
                  var eSpan = $('<span/>').html(text);
                  $(activeElement).find('div').append(eSpan);
                  stillRunInsert = false;
              }
          } else if (isTweetReply) { //specific actions for tweet reply
              activeElement.setAttribute("tabindex", "0");
              var eSpan = $('<span/>').html(text);
              $(activeElement).find('div').append(eSpan);
              stillRunInsert = false;
          } else if (isTwitterSearch) { //specific actions for twitter search
              //console.log('twitter search');
              activeElement.setAttribute("tabindex", "0");
              var currentValue = activeElement.value;
              activeElement.value = currentValue + text;
          } else { //most other input boxes work fine with standard logic
              if (activeElement.value == '') { //if it's blank, set value to current emoji
                  activeElement.value = text;
                  stillRunInsert = false;
              }
          }

          if (stillRunInsert) {
              simulatePasteEvent(text);
          }
      }


      /*if (stillRunInsert) {
        console.log('do some insert!!!');
        var previousOnFocus = null;
        var fireOnce = false;

        //initialize onFocus event
        function onFocus(event) {

          if (isTweetBox) {
            //Tweet-box specific focusing event
            function addEvent(elem, event, fn) {
              if (elem.addEventListener) {
                elem.addEventListener(event, fn, false);
              } else {
                elem.attachEvent("on" + event,
                    function () {
                      return (fn.call(elem, window.event));
                    });
              }
            }

            addEvent(activeElement, 'focus', function () {
              //set focus to end:
              this.selectionStart = this.selectionEnd = 0;
            });
          }
          else {
            if (fireOnce) {
              return;
            }
            fireOnce = true;

            if (previousOnFocus) {
              //textDebugging("previous on focus!");
              previousOnFocus(event);
            }
            activeElement.onfocus = previousOnFocus;
            // clear waiting timer
            //clearTimeout(focusTimer);
          }

          window.serializedRunLoop.insertAtBeginningOfQueue(function () {
            if (location.href.indexOf('calendar.google.com') > -1) {
              insertTextWithTextInputEvent(text);
            } else {
              insertTextOnFocusEvent(text);
            }
          });
          // resume execution queue
          window.serializedRunLoop.resume();

        } // onFocus

        // pause execution queue so the next insertion doesn't bind
        window.serializedRunLoop.pause();

        if (!isTweetBox) {
          previousOnFocus = activeElement.onfocus;
          //activeElement.onfocus = onFocus;
          activeElement.blur();
          activeElement.focus();
          insertTextOnFocusEvent(text);
        }
        // in case onfocus doesn't fire
        //var focusTimer = setTimeout(onFocus, 1);
      } //if still run insert
        else {
          //console.log('do not run insert');
      }*/

  } //unique case within emoji.one admin

} // insertTextAtCursor
// delete overridden console.log!
//delete console.log;
// delete exception handler
delete window.onerror;


// clearAllTimeouts();

//   var module = {
//     insertTextAtCursor: insertTextAtCursor,
//     elementIsInput: elementIsInput
//   };
//   return module;
// });
/*
import keySynthesize from './keySynthesize'
import inputInsertion from './inputInsertion'
import messageHandler from './messageHandler'
import emojiReplacement from './emojiReplacement'
import emojiData from './emojiData'
*/

var textDebugging = true;
if (textDebugging) {
  textDebugging = function () {
      console.log.apply(console, arguments)
    }
}
else {
  textDebugging = function () {}
}

window.monoExtension.addListener(function (request, sender, sendResponse) {
        if (request && request.autoReplace) {
            if (request.autoReplace == 'off') {
                // disconnect()
            } else {
                // queue.push(document.getElementsByTagName("body")[0]);
            }
        }
        if (request && request.emoji) {
            insertTextAtCursor(request.emoji)
        }
    }
);
