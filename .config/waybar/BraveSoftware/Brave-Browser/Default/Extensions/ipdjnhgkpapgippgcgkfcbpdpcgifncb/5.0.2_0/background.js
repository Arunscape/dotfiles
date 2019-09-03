(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.app = window.app || {
    views: {},
    models: {}
  };

  window.app.models.Icon = (function(superClass) {
    extend(Icon, superClass);

    function Icon() {
      return Icon.__super__.constructor.apply(this, arguments);
    }

    Icon.prototype["default"] = {
      'unicode': '',
      'unicode_alternates': [],
      'name': '',
      'shortname': '',
      'category': '',
      'order': '',
      'diversity': null,
      'aliases': [],
      'aliases_ascii': [],
      'keywords': [],
      'count': 0,
      'tones': [],
      'tones_models': [],
      'hidden': false,
      'output': '',
      skip: false
    };

    Icon.prototype.initialize = function() {
      return this.bind('change:count', (function(_this) {
        return function() {};
      })(this));
    };

    return Icon;

  })(Backbone.Model);

  window.app.models.Categories = (function(superClass) {
    extend(Categories, superClass);

    function Categories() {
      return Categories.__super__.constructor.apply(this, arguments);
    }

    Categories.prototype.model = Backbone.Model;

    return Categories;

  })(Backbone.Collection);

  window.app.models.Icons = (function(superClass) {
    extend(Icons, superClass);

    function Icons() {
      return Icons.__super__.constructor.apply(this, arguments);
    }

    Icons.prototype.model = window.app.models.Icon;

    Icons.prototype.search = function(q) {
      var models, searchQuery, tone;
      searchQuery = q.toLowerCase();
      tone = window.app.models.settings.get('skin');
      models = [];
      models = this.filter((function(_this) {
        return function(model) {
          var eachWord, j, keywords, len, name, searchWords, shortname, toneKey, unicode;
          if (!model) {
            return false;
          }
          unicode = model.get('unicode');
          keywords = model.get('keywords');
          shortname = model.get('shortname');
          name = model.get('name');
          toneKey = model.get('tone_key');
          if (!unicode) {
            unicode = "";
          }
          if (!keywords) {
            keywords = "";
          }
          if (!shortname) {
            shortname = "";
          }
          if (!name) {
            name = "";
          }
          unicode = unicode.toLowerCase();
          keywords = keywords.toLowerCase();
          shortname = shortname.toLowerCase();
          name = name.toLowerCase();
          if (searchQuery === 'diversity') {
            if (tone > 0) {
              if (toneKey === tone) {
                return true;
              }
            }
          } else {
            searchWords = searchQuery.split(' ');
            for (j = 0, len = searchWords.length; j < len; j++) {
              eachWord = searchWords[j];
              if (!unicode.includes(eachWord) && !keywords.includes(eachWord) && !shortname.includes(eachWord) && !name.includes(eachWord)) {
                return false;
              }
            }
            return true;
          }
        };
      })(this));
      return window.app.models.searchResults.reset(models);
    };

    Icons.prototype.byCategory = function(category) {
      return this.where({
        'category': category
      });
    };

    Icons.prototype.categories = function() {
      return _.uniq(this.pluck('category'));
    };

    Icons.prototype.updateTones = function() {
      return _.each(this.where({
        skinnable: true
      }), (function(_this) {
        return function(item) {
          return item.set({
            tones: _this.where({
              skinnable_group: item.get('unicode')
            })
          });
        };
      })(this));
    };

    return Icons;

  })(Backbone.Collection);

  window.app.models.FreqIcons = (function(superClass) {
    extend(FreqIcons, superClass);

    function FreqIcons() {
      return FreqIcons.__super__.constructor.apply(this, arguments);
    }

    FreqIcons.prototype.model = window.app.models.Icon;

    FreqIcons.prototype.comparator = function(count) {
      return -count.get('count');
    };

    FreqIcons.prototype.initialize = function() {
      this.bind('add', this.save, this);
      return this.bind('change', this.save, this);
    };

    FreqIcons.prototype.load = function(icons) {
      var loaded, maxRecents, savedData;
      savedData = JSON.parse(localStorage.getItem('FreqIcons'));
      maxRecents = parseInt(localStorage.getItem('numRecents'));
      loaded = [];
      if (maxRecents > 0) {
        _.each(savedData, (function(_this) {
          return function(icon, i) {
            var savedIcon;
            savedIcon = icons.findWhere({
              unicode: icon.unicode
            });
            if (savedIcon) {
              savedIcon.set({
                count: -i
              });
              if (loaded.length < maxRecents) {
                return loaded.push(savedIcon);
              }
            }
          };
        })(this));
        return this.reset(loaded, {
          silent: true
        });
      } else {
        return this.reset(loaded, {
          silent: true
        });
      }
    };

    FreqIcons.prototype.save = function() {
      if (this.models.length > 70) {
        this.models.splice(70);
      }
      return localStorage.setItem('FreqIcons', JSON.stringify(this.models));
    };

    return FreqIcons;

  })(Backbone.Collection);

  window.app.models.FilteredIcons = (function(superClass) {
    extend(FilteredIcons, superClass);

    function FilteredIcons() {
      return FilteredIcons.__super__.constructor.apply(this, arguments);
    }

    FilteredIcons.prototype.model = app.models.Icon;

    FilteredIcons.prototype.byCategory = function(category) {
      return this.where({
        'category': 'objects_symbols'
      });
    };

    return FilteredIcons;

  })(Backbone.Collection);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.app = window.app || {
    views: {},
    models: {}
  };

  window.app.models.Data = (function(superClass) {
    extend(Data, superClass);

    function Data() {
      return Data.__super__.constructor.apply(this, arguments);
    }

    Data.prototype.initialize = function(eData) {
      var error, getResourceURL;
      try {
        getResourceURL = function(URI) {
          if (chrome.extension !== void 0) {
            return chrome.extension.getURL(URI);
          } else {
            return "./" + URI;
          }
        };
        this.set({
          emojiUrl: getResourceURL('data/emoji.json'),
          browser: 'chrome'
        });
        return $.ajax({
          url: this.get('emojiUrl'),
          dataType: 'json',
          success: (function(_this) {
            return function(data) {
              _this.set({
                data: _this.parseEmoji(data)
              });
              _this.prepareDict(data);
              if (window.emojiPanel) {
                return _this.trigger('ready');
              } else {
                return _this.trigger('ready');
              }
            };
          })(this)
        });
      } catch (error) {
        window.addon.port.emit("ready", "ready");
        return window.addon.port.once("data", (function(_this) {
          return function(data) {
            var JSONdata, div;
            div = $('<div/>').html(data.svgData).css('display', 'none');
            JSONdata = JSON.parse(data.emojiData);
            _this.set({
              emojiUrl: 'data/emoji.json',
              browser: 'ff',
              data: _this.parseEmoji(JSONdata),
              svg: div
            });
            _this.prepareDict(JSONdata);
            return _this.trigger('ready');
          };
        })(this));
      }
    };

    Data.prototype.colorize = function(e) {
      var code, key, toneMap, ucStripped;
      this.skinnable = [];
      toneMap = ['null', '1f3fb', '1f3fc', '1f3fd', '1f3fe', '1f3ff'];
      for (key in e) {
        if (!e.hasOwnProperty(key)) {
          continue;
        }
        code = e[key].code_points.base.toUpperCase();
        e[key].output = e[key].code_points.output;
        if (e[key].diversity_base === 1) {
          this.dict[key].skinnable = true;
        }
        if (e[key].diversity !== null) {
          e[key].tone_key = toneMap.indexOf(e[key].diversity.toLowerCase());
          ucStripped = code.replace('-' + e[key].diversity.toUpperCase(), '');
          if (e[key].code_points.diversity_parent !== null) {
            ucStripped = e[key].code_points.diversity_parent.toUpperCase();
          }
          this.dict[ucStripped] = [];
          e[key].skinnable_group = ucStripped;
          this.dict[ucStripped].tones = [];
          this.dict[ucStripped].tones.push(e[key]);
          e[key].skip = true;
        }
        if (e[key].display === 0) {
          e[key].hidden = true;
        }
      }
      return this.skinnable;
    };

    Data.prototype.prepareDict = function(e) {
      var ch, codes, excluded, key, reqPrep;
      excluded = ["tm", "registered", "copyright"];
      this.dict = {};
      this.keys = [];
      reqPrep = [];
      for (key in e) {
        if (excluded.indexOf(key) > -1 || !e.hasOwnProperty(key)) {
          continue;
        }
        if (e[key].code_points.base.toLowerCase() === '1f9b0' || e[key].code_points.base.toLowerCase() === '1f9b1' || e[key].code_points.base.toLowerCase() === '1f9b2' || e[key].code_points.base.toLowerCase() === '1f9b3') {
          console.log('found');
          continue;
        } else {
          ch = '';
          codes = [e[key].code_points.base];
          _.each(codes, (function(_this) {
            return function(code) {
              var unicodes;
              unicodes = code.split('-');
              ch = punycode.ucs2.encode(_.map(unicodes, function(code) {
                return parseInt(code, 16);
              }));
              _this.dict[ch] = e[key];
              _this.keys.push(ch);
              return reqPrep.push(_this.escape(ch));
            };
          })(this));
          this.dict[key] = e[key];
          this.keys.push(e[key].code_points.base);
        }
        this.reg = _.sortBy(reqPrep, (function(_this) {
          return function(key) {
            return -key.length;
          };
        })(this)).join('|');
      }
      this.colorize(e);
      return true;
    };

    Data.prototype.escape = function(text) {
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };

    Data.prototype.parseEmoji = function(e) {
      var models;
      models = [];
      _.each(_.sortBy(e, function(i) {
        return parseInt(i.order);
      }), function(icon, i) {
        icon.keyboard = i;
        icon.unicode = icon.code_points.base.toUpperCase();
        icon.keywords = icon.keywords.join(' ');
        return models.push(icon);
      });
      return models;
    };

    Data.prototype.defaults = {
      categories: [
        {
          name: 'people',
          caption: 'Smileys & People'
        }, {
          name: 'nature',
          caption: 'Animals & Nature'
        }, {
          name: 'food',
          caption: 'Food & Drink'
        }, {
          name: 'activity',
          caption: 'Activity'
        }, {
          name: 'travel',
          caption: 'Travel & Places'
        }, {
          name: 'objects',
          caption: 'Objects'
        }, {
          name: 'symbols',
          caption: 'Symbols'
        }, {
          name: 'flags',
          caption: 'Flags'
        }
      ]
    };

    return Data;

  })(Backbone.Model);

}).call(this);

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

(function() {
  var browserType, closePopupPanel, createNewEmojiWindow, emoji_win_id, initEmojiPanel, removePersistentWindow, removePersistentWindowThenOpenPopup, setNewEmojiPopup,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.app = window.app || {
    views: {},
    models: {}
  };

  browserType = navigator.userAgent.indexOf('OPR') > -1 ? 'Opera' : navigator.userAgent.indexOf('Chrome') > -1 ? 'Chrome' : 'Firefox';

  localStorage.setItem('browserType', browserType);

  if (browserType === 'Firefox') {
    window.bgApp = browser.runtime.getBackgroundPage().app;
  } else {
    window.bgApp = chrome.extension.getBackgroundPage().app;
  }

  if (!localStorage.getItem('numRecents')) {
    localStorage.setItem('numRecents', '30');
  }

  emoji_win_id = !localStorage.getItem('emoji_win_id') ? 0 : parseInt(localStorage.getItem('emoji_win_id'));

  if (!localStorage.getItem('panelState')) {
    localStorage.setItem('panelState', 'popup');
  }

  if (browserType === 'Firefox') {
    chrome.runtime.onConnect.addListener(function(port) {
      return port.onMessage.addListener(function(msg) {
        var id;
        if (port.name === 'generic_message') {
          if (msg.msg === 'attempt_close') {
            removePersistentWindow();
          } else if (msg.msg === 'attempt_close_then_open_popup') {
            return removePersistentWindowThenOpenPopup();
          }
        } else if (port.name === 'open_panel') {
          if (msg.panel_type === 'persist') {
            initEmojiPanel();
          } else {
            setNewEmojiPopup();
          }
        } else if (port.name === 'emoji_admin') {
          id = msg.unicode;
          localStorage.setItem('lastUnicodeID', id.unicode);
        } else if (port.name === 'emoji_admin_set') {
          return port.postMessage({
            unicode: localStorage.getItem('lastUnicodeID')
          });
        }
      });
    });
  } else {
    chrome.extension.onConnect.addListener(function(port) {
      return port.onMessage.addListener(function(msg) {
        var id;
        if (port.name === 'generic_message') {
          if (msg.msg === 'attempt_close') {
            removePersistentWindow();
          } else if (msg.msg === 'attempt_close_then_open_popup') {
            return removePersistentWindowThenOpenPopup();
          }
        } else if (port.name === 'open_panel') {
          if (msg.panel_type === 'persist') {
            initEmojiPanel();
          } else {
            setNewEmojiPopup();
          }
        } else if (port.name === 'emoji_admin') {
          id = msg.unicode;
          localStorage.setItem('lastUnicodeID', id.unicode);
        } else if (port.name === 'emoji_admin_set') {
          console.log('received message about setting');
          return port.postMessage({
            unicode: localStorage.getItem('lastUnicodeID')
          });
        }
      });
    });
  }

  chrome.extension.onConnect.addListener(function(port) {
    return port.onMessage.addListener(function(msg) {
      if (port.name === 'background_paste_request') {
        console.log('received message about background paste');
        return document.execCommand('paste');
      }
    });
  });

  createNewEmojiWindow = function() {
    var initial_height, initial_left, initial_top, initial_width;
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, (function(_this) {
      return function(tabs) {
        localStorage.setItem('rootTab', tabs[0].id);
      };
    })(this));
    initial_width = !localStorage.getItem('panelWidth') ? 515 : parseInt(localStorage.getItem('panelWidth'));
    initial_height = !localStorage.getItem('panelHeight') ? 700 : parseInt(localStorage.getItem('panelHeight'));
    initial_left = !localStorage.getItem('panelXPos') || localStorage.getItem('panelXPos') === 'undefined' ? 0 : parseInt(localStorage.getItem('panelXPos'));
    initial_top = !localStorage.getItem('panelYPos') || localStorage.getItem('panelYPos') === 'undefined' ? 0 : parseInt(localStorage.getItem('panelYPos'));
    return chrome.windows.create({
      'url': chrome.runtime.getURL('panel.html#persist'),
      'type': 'popup',
      'top': Math.round(initial_top),
      'left': Math.round(initial_left),
      'height': Math.round(initial_height),
      'width': Math.round(initial_width)
    }, function(sidewin) {
      localStorage.setItem('emoji_win_id', sidewin.id);
    });
  };

  removePersistentWindow = function() {
    emoji_win_id = parseInt(localStorage.getItem('emoji_win_id'));
    return chrome.windows.remove(emoji_win_id, function() {
      localStorage.setItem('emoji_win_id', 0);
      return true;
    });
  };

  removePersistentWindowThenOpenPopup = function() {
    emoji_win_id = parseInt(localStorage.getItem('emoji_win_id'));
    return chrome.windows.remove(emoji_win_id, function() {
      localStorage.setItem('emoji_win_id', 0);
      setNewEmojiPopup();
    });
  };

  setNewEmojiPopup = function() {
    var updateProperties;
    updateProperties = {
      'active': true
    };
    return chrome.tabs.update(parseInt(localStorage.getItem('rootTab')), updateProperties, function(tab) {
      chrome.browserAction.setPopup({
        tabId: parseInt(localStorage.getItem('rootTab')),
        popup: 'panel.html#popup'
      });
    });
  };

  closePopupPanel = function() {};

  initEmojiPanel = function() {
    emoji_win_id = parseInt(localStorage.getItem('emoji_win_id'));
    closePopupPanel();
    if (emoji_win_id > 0) {
      return chrome.windows.get(emoji_win_id, function(window) {
        if (!window) {
          createNewEmojiWindow();
        } else {
          removePersistentWindow();
        }
      });
    } else {
      createNewEmojiWindow();
    }
  };

  window.app.models.Settings = (function(superClass) {
    extend(Settings, superClass);

    function Settings() {
      return Settings.__super__.constructor.apply(this, arguments);
    }

    Settings.prototype.defaults = {
      size: "normal",
      numRecents: 30,
      skin: 0,
      autoReplace: 'off',
      autoClipboard: 'on',
      blacklistedDomains: '',
      browserProtocol: location.protocol,
      browserType: browserType,
      autoReplaceSize: '100',
      panelState: 'persist',
      panelWidth: '515',
      panelHeight: '700',
      panelXPos: 0,
      panelYPos: 0
    };

    Settings.prototype.initialize = function() {
      this.load();
      return this.on('change', this.save, this);
    };

    Settings.prototype.save = function() {
      return localStorage.setItem('settings', JSON.stringify(this.attributes));
    };

    Settings.prototype.load = function() {
      var key, o, ref, results, s, value;
      s = localStorage.getItem('settings');
      if (s) {
        ref = JSON.parse(s);
        results = [];
        for (key in ref) {
          value = ref[key];
          if (value !== void 0 && JSON.parse(s).hasOwnProperty(key)) {
            o = {};
            o[key] = value;
            results.push(this.set(o));
          } else {
            results.push(void 0);
          }
        }
        return results;
      }
    };

    return Settings;

  })(Backbone.Model);

}).call(this);

(function() {
  var a, error;

  window.monoExtension = window.monoExtension || {
    addListener: function(listener) {
      if (chrome) {
        if (chrome !== void 0 && chrome.runtime !== void 0 && chrome.runtime.onMessage !== void 0) {
          chrome.runtime.onMessage.addListener(listener);
        } else {
          return window.monoExtension.listeners.push(listener);
        }
      } else {
        return window.monoExtension.listeners.push(listener);
      }
    },
    sendMessage: function(message, responseCallback) {
      var j, key, len, listener, ref, results;
      if (chrome) {
        if (chrome !== void 0 && chrome.runtime !== void 0 && chrome.runtime.onMessage !== void 0) {
          chrome.runtime.sendMessage(message, responseCallback);
          return;
        }
      }
      ref = this.listeners;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        key = ref[j];
        listener = this.listeners[key];
        results.push(listener(message, "sender", responseCallback));
      }
      return results;
    },
    listeners: []
  };

  chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
    sendResponse({
      is_active: window.app.models.settings.get('autoReplace')
    });
  });

  chrome.commands.onCommand.addListener(function(command) {
    return console.log(command);
  });

  window.app = window.app || {
    views: {},
    models: {}
  };

  a = window.app;

  a.init = function() {
    var categories, error;
    try {

    } catch (error) {
      window.addon.port.emit("dataReady", {
        dict: a.models.data.dict,
        keys: a.models.data.keys,
        reg: a.models.data.reg,
        enabled: a.models.settings.get('autoReplace') === 'off' ? false : true
      });
    }
    a.models.icons.reset(a.models.data.get('data'));
    a.models.icons.updateTones();
    a.models.searchResults = new app.models.Icons();
    categories = new app.models.Categories(_.map(a.models.data.get('categories'), function(i) {
      return new Backbone.Model(i);
    }));
    a.models.icons.categories = categories;
    return a.models.icons.trigger('ready');
  };

  a.models.settings = new a.models.Settings;

  a.models.icons = new a.models.Icons;

  a.models.freqIcons = new a.models.FreqIcons;

  try {
    window.addon.port.emit("test", "ready");
    a.models.data = new a.models.Data(data);
    a.models.data.bind('ready', a.init, this);
  } catch (error) {
    a.models.data = new a.models.Data;
    a.models.data.bind('ready', a.init, this);
  }

}).call(this);
