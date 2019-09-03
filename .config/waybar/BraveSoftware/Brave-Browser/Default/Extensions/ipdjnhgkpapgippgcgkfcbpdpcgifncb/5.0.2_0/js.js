this["JST"] = this["JST"] || {};

this["JST"]["FreqTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if (collection.length > 0){
;
__p += '\r\n    <h1 name="recent">\r\n        <i class="icon-recent"></i>\r\n        <a name="recent" id="category-heading-recent">Recents</a>\r\n    </h1>\r\n';
} else {;
__p += '\r\n    <a id="category-heading-recent"></a>\r\n';
};
__p += '\r\n';

_.each(collection.models,function(item,key,list){
var f = item.attributes;
if ( !f.diversity || f.diversity == null ) {
    var thisCat = f.category;
} else {
    var thisCat = 'diversity';
}

;
__p += '\r\n<div class="icon ' +
((__t = ( f.unicode )) == null ? '' : __t) +
' ' +
((__t = ( f.skinnable ? 'skinnable' : '')) == null ? '' : __t) +
'" id="' +
((__t = ( f.unicode )) == null ? '' : __t) +
'" data-index="' +
((__t = ( item.cid )) == null ? '' : __t) +
'">\r\n    <div data-cat="' +
((__t = ( thisCat )) == null ? '' : __t) +
'" data-uc="' +
((__t = ( f.unicode.toLowerCase() )) == null ? '' : __t) +
'" class="icon-img _' +
((__t = ( f.unicode.toLowerCase() )) == null ? '' : __t) +
'">\r\n    </div>\r\n</div>\r\n\r\n';

});
;
__p += '\r\n';

}
return __p
};

this["JST"]["FreqTemplatePreload"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if (collection.length > 0){
;
__p += '\r\n    <h1 name="recent">\r\n        <i class="icon-recent"></i>\r\n        <a name="recent">Recents</a>\r\n    </h1>\r\n    <div style="position: absolute; top: 50px; left: 175px; color: #CCCCCC;">Loading recent emoji...</div>\r\n';
} else {;
__p += '\r\n    <a id="category-heading-recent"></a>\r\n';
};
__p += '\r\n';

_.each(collection.models,function(item,key,list){
var f = item.attributes;

;
__p += '\r\n<div class="icon ' +
((__t = ( f.unicode )) == null ? '' : __t) +
' ' +
((__t = ( f.skinnable ? 'skinnable' : '')) == null ? '' : __t) +
'" id="' +
((__t = ( f.unicode )) == null ? '' : __t) +
'" data-index="' +
((__t = ( item.cid )) == null ? '' : __t) +
'">\r\n    <!--<div class="icon-img emojiIcon _' +
((__t = ( f.unicode.toUpperCase() )) == null ? '' : __t) +
'">\r\n    </div>-->\r\n</div>\r\n\r\n';

});
;
__p += '\r\n';

}
return __p
};

this["JST"]["headerTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<a class="btn" title="Frequently Used" href="#recent"><i class="icon-recent"></i></a>\r\n';

    _.each(models,function(item,key,list){
    var f = item;
;
__p += '\r\n        <a class="btn" title="' +
((__t = ( f.caption )) == null ? '' : __t) +
'" href="#' +
((__t = ( f.name )) == null ? '' : __t) +
'"><i class="icon-' +
((__t = (f.name.toLowerCase())) == null ? '' : __t) +
'"></i></a>\r\n';

    });
;
__p += '\r\n';

}
return __p
};

this["JST"]["iconsTemplate_old"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<link rel="stylesheet" href="emojione-sprite-32.css">\r\n<link rel="stylesheet" href="emojione-sprite-64.css">\r\n';

_.each(categories,function(category,key,list){
;
__p += '\r\n<div class="icons-category ' +
((__t = ( category.name  )) == null ? '' : __t) +
'">\r\n    ';

      if (!category.skip_header){
    ;
__p += '\r\n        <h1 name="' +
((__t = ( category.name )) == null ? '' : __t) +
'">\r\n            <i class="icon-' +
((__t = (category.name.toLowerCase())) == null ? '' : __t) +
'"></i>\r\n            <a name="' +
((__t = ( category.name  )) == null ? '' : __t) +
'">' +
((__t = ( category.caption )) == null ? '' : __t) +
'</a>\r\n        </h1>\r\n    ';

      }
    ;
__p += '\r\n\r\n\r\n    ';
 var x = 0;
    _.each(collection.byCategory(category.name),function(item,key,list){
    if (item.attributes.skip || item.attributes.hidden)
        return true;
    var f = item.attributes;
    ;
__p += '\r\n        <div class="icon ' +
((__t = ( f.unicode )) == null ? '' : __t) +
' ' +
((__t = ( f.skinnable ? 'skinnable' : '')) == null ? '' : __t) +
'" id="' +
((__t = ( f.unicode )) == null ? '' : __t) +
'" data-index="' +
((__t = ( item.cid )) == null ? '' : __t) +
'">\r\n            <div class="icon-img emojiIcon _' +
((__t = ( f.unicode.toUpperCase() )) == null ? '' : __t) +
'">\r\n            </div>\r\n        </div>\r\n        ';

          if (f.tones && f.tones.length > 0)
            _.each(f.tones,function(tone,key,list){
                var t = tone.attributes;
        ;
__p += '\r\n                <div class="icon ' +
((__t = ( t.unicode )) == null ? '' : __t) +
' ' +
((__t = ( t.skinnable ? 'skinnable' : '')) == null ? '' : __t) +
'" id="' +
((__t = ( t.unicode )) == null ? '' : __t) +
'" data-index="' +
((__t = ( tone.cid )) == null ? '' : __t) +
'">\r\n                    <div class="icon-img emojiIcon _' +
((__t = ( t.unicode.toUpperCase() )) == null ? '' : __t) +
'">\r\n                    </div>\r\n                </div>\r\n\r\n\r\n        ';

        })
        ;
__p += '\r\n\r\n    ';

    });
    ;
__p += '\r\n</div>\r\n';

});
;
__p += '\r\n';

}
return __p
};

this["JST"]["iconsTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 _.each(categories,function(category,key,list){ ;
__p += '\r\n<div class="icons-category ' +
((__t = (iconCategorySize)) == null ? '' : __t) +
' ' +
((__t = (iconCategoryTone)) == null ? '' : __t) +
' ' +
((__t = (category.name)) == null ? '' : __t) +
'">\r\n    ';
 if (!category.skip_header){ ;
__p += '\r\n        <h1 name="' +
((__t = ( category.name )) == null ? '' : __t) +
'">\r\n            <i class="icon-' +
((__t = (category.name.toLowerCase())) == null ? '' : __t) +
'"></i>\r\n            <a name="' +
((__t = ( category.name  )) == null ? '' : __t) +
'" id="category-heading-' +
((__t = ( category.name )) == null ? '' : __t) +
'">' +
((__t = ( category.caption )) == null ? '' : __t) +
'</a>\r\n        </h1>\r\n    ';
 } ;
__p += '\r\n\r\n    ';
 var x = 0;
    _.each(collection.byCategory(category.name),function(item,key,list){
    if (item.attributes.skip || item.attributes.hidden)
        return true;
    var f = item.attributes; ;
__p += '\r\n        <div class="icon ' +
((__t = (f.unicode)) == null ? '' : __t) +
' ' +
((__t = (f.skinnable ? 'skinnable' : '')) == null ? '' : __t) +
'" id="' +
((__t = (f.unicode)) == null ? '' : __t) +
'" data-index="' +
((__t = (item.cid)) == null ? '' : __t) +
'">\r\n            <div class="icon-img _' +
((__t = (f.unicode.toLowerCase())) == null ? '' : __t) +
' joypixels-' +
((__t = (iconCategorySizeConverted)) == null ? '' : __t) +
'-' +
((__t = (category.name)) == null ? '' : __t) +
'" data-uc="' +
((__t = (f.unicode.toLowerCase())) == null ? '' : __t) +
'" data-cat="' +
((__t = (category.name)) == null ? '' : __t) +
'"></div>\r\n        </div>\r\n        ';
 if (f.tones && f.tones.length > 0)
            _.each(f.tones,function(tone,key,list){
                var t = tone.attributes; ;
__p += '\r\n                <div class="icon ' +
((__t = (t.unicode)) == null ? '' : __t) +
' ' +
((__t = (t.skinnable ? 'skinnable' : '')) == null ? '' : __t) +
'" id="' +
((__t = (t.unicode)) == null ? '' : __t) +
'" data-index="' +
((__t = (tone.cid)) == null ? '' : __t) +
'">\r\n                    <div class="icon-img _' +
((__t = (t.unicode.toLowerCase())) == null ? '' : __t) +
' joypixels-' +
((__t = (iconCategorySizeConverted)) == null ? '' : __t) +
'-diversity" data-uc="' +
((__t = (t.unicode.toLowerCase())) == null ? '' : __t) +
'" data-cat="diversity"></div>\r\n                </div>\r\n        ';
 }) ;
__p += '\r\n    ';
 }); ;
__p += '\r\n</div>\r\n';
 }); ;
__p += '\r\n';

}
return __p
};

this["JST"]["iconsTemplatePreload"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {


_.each(categories,function(category,key,list){
;
__p += '\r\n<div class="icons-category ' +
((__t = ( category.name  )) == null ? '' : __t) +
'">\r\n    ';

      if (!category.skip_header){
    ;
__p += '\r\n        <h1 name="' +
((__t = ( category.name )) == null ? '' : __t) +
'">\r\n            <i class="icon-' +
((__t = (category.name.toLowerCase())) == null ? '' : __t) +
'"></i>\r\n            <a name="' +
((__t = ( category.name  )) == null ? '' : __t) +
'">' +
((__t = ( category.caption )) == null ? '' : __t) +
'</a>\r\n        </h1>\r\n    ';

      }
    ;
__p += '\r\n\r\n    <div style="width: 100%; text-align: center; padding: 50px 0px; color: #CCCCCC;">Loading emoji...</div>\r\n\r\n</div>\r\n';

});
;
__p += '\r\n';

}
return __p
};

this["JST"]["previewInnerTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {


_.each(models,function(item,key,list){
var f = item.attributes;
if ( !f.diversity || f.diversity == null ) {
    var thisCat = f.category;
} else {
    var thisCat = 'diversity';
}
;
__p += '\r\n\r\n<div class="preview-icon icon-img">\r\n    <div data-cat="' +
((__t = ( thisCat )) == null ? '' : __t) +
'" data-uc="' +
((__t = ( f.unicode.toLowerCase() )) == null ? '' : __t) +
'" class="icon-img _' +
((__t = ( f.unicode.toLowerCase() )) == null ? '' : __t) +
'">\r\n    </div>\r\n</div>\r\n\r\n';

});
;
__p += '\r\n';

}
return __p
};

this["JST"]["previewTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="preview-text"></div>\r\n<div class="preview-field small" style="width: calc(100% - 110px) !important;">\r\n    <div class="text"></div>\r\n    <a href="#" class="cancel">\r\n        <img src="/images/close.svg" alt=""/>\r\n    </a>\r\n</div>\r\n\r\n<button id="preview--copy-button" type="button" class="btn btn-default"  data-val="small" data-param="size" ' +
((__t = ( autoClipboard == 'on' ? 'disabled' : '')) == null ? '' : __t) +
' > ' +
((__t = ( autoClipboard == 'on' ? '' : 'Copy')) == null ? '' : __t) +
' </button>\r\n<input id="copyInput" type="text" class="copy" />\r\n';

}
return __p
};

this["JST"]["searchTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!--<p class=\'no-results-caption\'>No emoji found</p>-->\n<div class="search-scroll-wrapper" name="search">\n    <div class="icons-category search_results">\n        <h1>\n            ';

            var matches = 0;
            for (var key in collection.models) {
              var item = collection.models[key];
                if (!item.attributes.hidden) {
                  matches++;
                }
            } ;
__p += '\n            <a name="search_results">\n            ';
 if(matches > 0) { ;
__p += '\n            ';
 } ;
__p += '\n            </a>\n        </h1>\n        ';
 if (matches == 0) { ;
__p += '\n            <p style="margin-top: 50px; color: #CCCCCC; width: 100%; text-align: center;">No results found</p>\n        ';
 } else {
            _.each(collection.models,function(item,key,list){
                var f = item.attributes;
                if (!f.hidden) {
                    var f = item.attributes;
                    if ( !f.diversity || f.diversity == null ) {
                        var thisCat = f.category;
                    } else {
                        var thisCat = 'diversity';
                    }
                    ;
__p += '\n                    <div class="icon ' +
((__t = ( f.unicode )) == null ? '' : __t) +
' ' +
((__t = ( f.skinnable ? 'skinnable' : '')) == null ? '' : __t) +
'" id="' +
((__t = ( f.unicode )) == null ? '' : __t) +
'" data-index="' +
((__t = ( item.cid )) == null ? '' : __t) +
'">\n                        <div data-cat="' +
((__t = ( thisCat )) == null ? '' : __t) +
'" data-uc="' +
((__t = ( f.unicode.toLowerCase() )) == null ? '' : __t) +
'" class="icon-img _' +
((__t = ( f.unicode.toLowerCase() )) == null ? '' : __t) +
'">\n                        </div>\n                    </div>\n                ';
 }
            });
        } ;
__p += '\n    </div>\n</div>\n';

}
return __p
};

this["JST"]["SettingsTemplate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="settings-header">\r\n    <a class="go-back">&lt; GO BACK</a>\r\n</div>\r\n<div class="container">\r\n  <div class="inner settings-container-scroll">\r\n    <div class="scroll-wrapper">\r\n\r\n        ';
 var thisBrowser = 'browser'; if (browserProtocol == 'moz-extension:') { thisBrowser = 'Firefox'; } else { thisBrowser = browserType; } ;
__p += '\r\n\r\n        <h3>Auto-Copy\r\n            <small>Copy emoji to clipboard as you click on them.</small></h3>\r\n        <div class="btn-group" role="group" aria-label="...">\r\n            <button type="button" class="btn ' +
((__t = ( autoClipboard == 'on' ? 'active' : '')) == null ? '' : __t) +
'" data-val="on"\r\n                    data-param="autoClipboard">on\r\n            </button>\r\n            <button type="button" class="btn ' +
((__t = ( autoClipboard == 'off' ? 'active' : '')) == null ? '' : __t) +
'" data-val="off"\r\n                    data-param="autoClipboard">off\r\n            </button>\r\n        </div>\r\n\r\n        <h3>Panel Icon Size\r\n            <small>Size of the emoji icons within this extension panel.</small></h3>\r\n        <div class="btn-group" role="group" aria-label="...">\r\n            <button type="button" class="btn btn-default btn--size ' +
((__t = ( size == 'small' ? 'active' : '')) == null ? '' : __t) +
'" data-val="small"\r\n                    data-param="size">small\r\n            </button>\r\n            <button type="button" class="btn btn--size btn-default ' +
((__t = ( size == 'normal' ? 'active' : '')) == null ? '' : __t) +
'" data-val="normal"\r\n                    data-param="size">normal\r\n            </button>\r\n            <button type="button" class="btn btn--size btn-default ' +
((__t = ( size == 'large' ? 'active' : '')) == null ? '' : __t) +
'" data-val="large"\r\n                    data-param="size">large\r\n            </button>\r\n        </div>\r\n\r\n        <h3>Panel Display\r\n            <small>Panel display type (re-open for updated display).</small></h3>\r\n        <div class="btn-group" role="group" aria-label="...">\r\n            <button type="button" class="btn ' +
((__t = ( localStorage.getItem('panelState') == 'popup' ? 'active' : '')) == null ? '' : __t) +
'" data-val="popup"\r\n                    data-param="panelState">docked\r\n            </button>\r\n            <button type="button" class="btn ' +
((__t = ( localStorage.getItem('panelState') == 'persist' ? 'active' : '')) == null ? '' : __t) +
'" data-val="persist"\r\n                    data-param="panelState">undocked\r\n            </button>\r\n        </div>\r\n\r\n        <h3>Recents\r\n            <small>Number of recently used emoji to display.</small></h3>\r\n        <div class="btn-group" role="group" aria-label="...">\r\n            <button type="button" class="btn btn-sm ' +
((__t = ( localStorage.getItem('numRecents') == '0' ? 'active' : '')) == null ? '' : __t) +
'" data-val="0" data-param="numRecents">\r\n                none\r\n            </button>\r\n            <button type="button" class="btn btn-sm ' +
((__t = ( localStorage.getItem('numRecents') == '10' ? 'active' : '')) == null ? '' : __t) +
'" data-val="10" data-param="numRecents">\r\n                10\r\n            </button>\r\n            <button type="button" class="btn btn-sm ' +
((__t = ( localStorage.getItem('numRecents') == '20' ? 'active' : '')) == null ? '' : __t) +
'" data-val="20" data-param="numRecents">\r\n                20\r\n            </button>\r\n            <button type="button" class="btn btn-sm ' +
((__t = ( localStorage.getItem('numRecents') == '30' ? 'active' : '')) == null ? '' : __t) +
'" data-val="30" data-param="numRecents">\r\n                30\r\n            </button>\r\n            <button type="button" class="btn btn-sm ' +
((__t = ( localStorage.getItem('numRecents') == '40' ? 'active' : '')) == null ? '' : __t) +
'" data-val="40" data-param="numRecents">\r\n                40\r\n            </button>\r\n            <button type="button" class="btn btn-sm ' +
((__t = ( localStorage.getItem('numRecents') == '50' ? 'active' : '')) == null ? '' : __t) +
'" data-val="50" data-param="numRecents">\r\n                50\r\n            </button>\r\n        </div>\r\n\r\n        <h3>Keyboard Shortcut\r\n            <small>Use this keyboard combo to open this panel.</small></h3>\r\n        <div class="input">\r\n            <input type="text" class="hotkey" readonly value="CTRL+SHIFT+E">\r\n        </div>\r\n        <small style="margin-top: 20px; display: block; user-select: all !important;">\r\n            Shortcut not working or need to change? Paste this url into your browser:<br>\r\n            <input style="user-select: text !important; font-size: 12px; border: none !important; width: 350px; text-transform: none !important;" type="text" readonly value="chrome://extensions/configureCommands"> <br>\r\n            and click this extension\'s shortcut key to update.\r\n        </small>\r\n\r\n        <br><br>\r\n        <!--<h3>Connect with us</h3>-->\r\n\r\n        <!--<div class="social-links">-->\r\n        <!--<a href="https://www.facebook.com/emojione"><img src="images/fb.png" alt="Facebook"/></a>-->\r\n        <!--<a href="https://twitter.com/emojione"><img src="images/tw.png" alt="Twitter"/></a>-->\r\n        <!--<a href="https://instagram.com/emojione"><img src="images/in.png" alt="Instagram"/></a>-->\r\n        <!--<a class="brand" href="http://www.emojione.com">www.emojione.com</a>-->\r\n        <!--</div>-->\r\n        <div class="settings-bottom">\r\n            <div class="social-links">\r\n                <a href="https://www.facebook.com/joypixelsinc" class="social-button"><img src="images/fb.png" alt="Facebook"/></a>\r\n                <a href="https://twitter.com/joypixels" class="social-button"><img src="images/tw.png" alt="Twitter"/></a>\r\n                <!-- <a href="https://instagram.com/emojione" class="social-button"><img src="images/in.png" alt="Instagram"/></a> -->\r\n                <!--<a class="brand" href="http://www.emojione.com">www.emojione.com</a>-->\r\n                ';
 if ( browserProtocol == 'moz-extension:' ) { ;
__p += '\r\n                    <p class="copy">JoyPixels<sup>TM</sup> for Firefox <sup>beta</sup>, version 0.26</p><br>\r\n                ';
 } else { ;
__p += '\r\n                    <p class="copy">JoyPixels<sup>TM</sup> for ' +
((__t = ( thisBrowser )) == null ? '' : __t) +
', version ' +
((__t = ( version )) == null ? '' : __t) +
'</p><br>\r\n                ';
 } ;
__p += '\r\n                <p class="copy small-copy">Download and license our emoji at <a class="brand" href="https://www.joypixels.com"><span class="link">joypixels.com</span></a>\r\n            </div>\r\n\r\n        </div>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n';

}
return __p
};

this["JST"]["skinSelector"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="search-input active" style="width: calc(100% - 188px);">\r\n    <input id="searchInput" type="search" placeholder="SEARCH" autofocus>\r\n</div>\r\n<div class="skin-tones">\r\n    <!--<button class="btn btn-tone btn-tone-0 active" data-skin="0"></button>-->\r\n    <!--<button class="btn btn-tone btn-tone-1" data-skin="1"></button>-->\r\n    <!--<button class="btn btn-tone btn-tone-2" data-skin="2" ></button>-->\r\n    <!--<button class="btn btn-tone btn-tone-3" data-skin="3"></button>-->\r\n    <!--<button class="btn btn-tone btn-tone-4" data-skin="4"></button>-->\r\n    <!--<button class="btn btn-tone btn-tone-5" data-skin="5"></button>-->\r\n    <button class="btn btn-tone btn-tone-0 ' +
((__t = ( skin == 0 ? 'active' : '')) == null ? '' : __t) +
'" data-skin="0"></button>\r\n    <button class="btn btn-tone btn-tone-1 ' +
((__t = ( skin == 1 ? 'active' : '')) == null ? '' : __t) +
'" data-skin="1"></button>\r\n    <button class="btn btn-tone btn-tone-2 ' +
((__t = ( skin == 2 ? 'active' : '')) == null ? '' : __t) +
'" data-skin="2"></button>\r\n    <button class="btn btn-tone btn-tone-3 ' +
((__t = ( skin == 3 ? 'active' : '')) == null ? '' : __t) +
'" data-skin="3"></button>\r\n    <button class="btn btn-tone btn-tone-4 ' +
((__t = ( skin == 4 ? 'active' : '')) == null ? '' : __t) +
'" data-skin="4"></button>\r\n    <button class="btn btn-tone btn-tone-5 ' +
((__t = ( skin == 5 ? 'active' : '')) == null ? '' : __t) +
'" data-skin="5"></button>\r\n\r\n</div>\r\n<button class="close active"></button>\r\n';

}
return __p
};
(function() {
  var c_id, cid, e, error, generateUUID, getCookie, hash, hashTag, t_id,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.emojiPanel = true;

  window.app = window.app || {
    views: {},
    models: {}
  };

  getCookie = function(cname) {
    var c, ca, i, name;
    name = cname + '=';
    ca = document.cookie.split(';');
    i = 0;
    while (i < ca.length) {
      c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
      i++;
    }
    return '';
  };

  generateUUID = function() {
    var d, uuid;
    d = (new Date).getTime();
    uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r;
      r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
    return uuid;
  };

  t_id = 'UA-68326861-1';

  c_id = '';

  cid = '';

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

  window.sendGA = function(type, param) {
    var e, error, message, request;
    try {
      request = new XMLHttpRequest;
      message = '';
      switch (type) {
        case 'pageview':
          message = 'v=1&tid=' + t_id + '&cid=' + c_id + '&aip=1' + '&ds=extension&t=pageview&p=' + param;
          break;
        case 'event':
          message = 'v=1&tid=' + t_id + '&cid=' + c_id + '&aip=1' + '&ds=extension&t=event&ec=emoji&ea=click&el=' + param;
          break;
        case 'event-de':
          message = 'v=1&tid=' + t_id + '&cid=' + c_id + '&aip=1' + '&ds=extension&t=event&ec=emoji&ea=dead-end&el=' + param;
      }
      request.open('POST', 'https://www.google-analytics.com/collect', true);
      request.send(message);
    } catch (error) {
      e = error;
    }
  };

  window.app.views.PanelView = (function(superClass) {
    extend(PanelView, superClass);

    function PanelView() {
      return PanelView.__super__.constructor.apply(this, arguments);
    }

    PanelView.prototype.el = '.panel';

    return PanelView;

  })(Backbone.View);

  window.app.views.FilterView = (function(superClass) {
    extend(FilterView, superClass);

    function FilterView() {
      return FilterView.__super__.constructor.apply(this, arguments);
    }

    FilterView.prototype.el = '.filters';

    FilterView.prototype.template = JST['headerTemplate'];

    FilterView.prototype.events = {
      "click .btn": "scrollTo"
    };

    FilterView.prototype.scrollTo = function(e) {
      var name, target;
      e.preventDefault();
      name = $(e.currentTarget).attr('href').slice(1);
      target = $('#category-heading-' + name).parent()[0];
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
      return false;
    };

    FilterView.prototype.scrollSpy = function(name) {
      var btn;
      if (name == null) {
        name = false;
      }
      btn = this.$('.btn[href="#' + name + '"]');
      if (btn) {
        return btn.addClass('active').siblings().removeClass('active');
      }
    };

    FilterView.prototype.render = function() {
      var html;
      html = this.template({
        models: this.collection
      });
      $(this.el).html(html);
      return this.el;
    };

    return FilterView;

  })(Backbone.View);

  window.app.views.initApp = function() {
    var e, error;
    try {
      $(document).keyup(function(e) {
        if (e.keyCode === 27) {
          return window.close();
        }
      });
      window.app.views.filter = new window.app.views.FilterView({
        collection: window.bgApp.models.data.get('categories')
      });
      window.app.views.filter.render();
      window.app.views.header = new window.app.Header({
        model: window.bgApp.models.settings
      });
      window.app.models.selected = new window.app.models.SelectedCollection;
      window.bgApp.models.freqIcons.load(window.bgApp.models.icons);
      window.app.views.icons = new window.app.views.IconsView({
        collection: window.bgApp.models.icons,
        categories: window.bgApp.models.data.get('preLoadCat'),
        searchCollection: window.bgApp.models.searchResults,
        freqIcons: window.bgApp.models.freqIcons
      });

      /*Current status (03/25/19)
      - it seems that there's a massive memory leak within the rendering process.
      - specifically, loading the full "reRender" function causes about 100MB data consumption
      - the issue seems to be strongly correlated to the quantity of emoji
      - potentially all this rendering and rerendering of components is eating the memory consumption alive
       */
      window.app.views.icons.render();
      window.setTimeout((function() {
        window.app.views.icons.categories = window.bgApp.models.data.get('categories');
        window.app.views.icons.reRender();
        return window.app.views.search = new window.app.views.SearchView({
          collection: window.app.views.icons.collection
        });
      }), 100);
      window.app.views.container = new window.app.views.ContainerView;
      if (window.settingsOnly) {
        $(".btn-settings").click();
        $(".go-back").hide();
        $(".btn-settings").hide();
        $(".header").hide();
        return $("#settingsPanel .container").css("top", "0px");
      }
    } catch (error) {
      e = error;
    }
  };

  try {
    hash = window.location.hash.substring(1);
    if (!hash || hash === '') {
      hashTag = '#docked';
    } else if (hash === 'init' || hash === 'popup') {
      hashTag = '#docked';
    } else {
      hashTag = '#undocked';
    }
    window.sendGA('pageview', '/panel.html' + hashTag);
    setTimeout((function(_this) {
      return function() {
        return window.app.views.initApp();
      };
    })(this));
  } catch (error) {
    e = error;
    window.bgApp = window.app;
    window.bgApp.models.icons.bind('ready', window.app.views.initApp, this);
  }

}).call(this);

(function() {
  window.reactApp = window.reactApp || {
    views: {},
    models: {},
    controllers: {}
  };

}).call(this);

(function() {
  window.arrowSelection = {
    isRecentEmoji: function(emoji) {
      var cached, isRecent;
      cached = $(emoji).attr('isrecent');
      if (cached !== void 0) {
        if (cached === "true") {
          return true;
        } else {
          return false;
        }
      }
      isRecent = $(emoji).parents('#recentIcons').length > 0;
      $(emoji).attr('isrecent', isRecent);
      return isRecent;
    },
    isSearchEmoji: function(emoji) {
      var cached, isSearch;
      cached = $(emoji).attr('isSearch');
      if (cached !== void 0) {
        if (cached === "true") {
          return true;
        } else {
          return false;
        }
      }
      isSearch = $(emoji).parents('.search_results').length > 0;
      $(emoji).attr('isSearch', isSearch);
      return isSearch;
    },
    allSearchEmojis: function() {
      var searchEmojis;
      searchEmojis = $(".search_results .icon:visible");
      return $.makeArray(searchEmojis);
    },
    allRecentIcons: function() {
      var containerHeight, recentEmojis;
      containerHeight = this.recentEmojisContainerHeight();
      recentEmojis = $("#recentIcons .icon:visible").filter(function(index) {
        var position;
        position = $(this).position();
        if (position.top >= containerHeight) {
          return false;
        } else {
          return true;
        }
      });
      return $.makeArray(recentEmojis);
    },
    inSearchMode: function() {
      var inSearchMode, searchResults;
      searchResults = $(".search-results");
      inSearchMode = false;
      if (searchResults.length > 0) {
        searchResults = searchResults.first();
        if (searchResults.hasClass("active")) {
          inSearchMode = true;
        }
      }
      return inSearchMode;
    },
    recentEmojisContainerHeight: function() {
      var containerHeight, iconSize;
      iconSize = window.bgApp.models.settings.get('size');
      containerHeight = 0;
      switch (iconSize) {
        case "large":
          containerHeight = 250;
          break;
        case "normal":
          containerHeight = 160;
          break;
        case "small":
          containerHeight = 90;
      }
      return containerHeight;
    },
    scrollToSelectedEmojiIfAppropriate: function(emoji, direction) {
      return emoji.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });

      /*scrollHandler = app.views.container.myScroll
      wrapperOffset = Math.abs(scrollHandler.wrapperOffset.top)
      wrapperHeight = scrollHandler.wrapperHeight
      maxScrollY = Math.abs(scrollHandler.maxScrollY)
      scrollOffsetY = Math.abs(scrollHandler.y)
      minY = wrapperOffset
      maxY = minY + wrapperHeight
      emojiY = $(emoji).offset().top
      emojiYMidPoint = $(emoji).offset().top + ($(emoji).outerHeight()/2.0)
      emojiHeight = $(emoji).outerHeight() + 3
      scroll = false
      
      minimumScrollPercent = 0.3
      if emojiY < (minY - emojiHeight)
        scroll = true
      else if (emojiY + emojiHeight) > (maxY + emojiHeight)
        scroll = true
      else
         * see if we're more than halfway down
        percent = (emojiYMidPoint - minY)/(maxY - minY)
         * console.log("offset percent: ", percent);
         * console.log "minY, maxY, emojiY, percent, height: ", minY, maxY, emojiY, percent, emojiHeight
        if (percent - 0.1) >= (1 - minimumScrollPercent) && direction == @directionDown # scroll down
           * find the next emoji up
          nextEmojiUp = @closestEmoji(emoji, @directionUp)
          if (nextEmojiUp)
            nextEmojiUpY = $(nextEmojiUp).offset().top
            scrollPixels = emojiY - nextEmojiUpY
            scrollPosition = scrollOffsetY + scrollPixels
            if (scrollPosition <= maxScrollY)
              scrollHandler.scrollBy(0, 0 - scrollPixels)
            else
               * scroll to element instead of by offset
              scrollHandler.scrollToElement(emoji, 200, 0, true)
        else if percent <= minimumScrollPercent && direction == @directionUp # scroll up
           * find the next emoji up
          nextEmojiDown = @closestEmoji(emoji, @directionDown)
          if (nextEmojiDown)
            nextEmojiDownY = $(nextEmojiDown).offset().top
            scrollPixels = nextEmojiDownY - emojiY
            scrollPosition = scrollOffsetY - scrollPixels
            if (scrollPosition > 0)
              scrollHandler.scrollBy(0, scrollPixels)
            else
               * scroll to element instead of by offset
              scrollHandler.scrollToElement(emoji, 200, 0, true)
      
           * scrollHandler.scrollBy(0, 0 - emojiHeight)
      
      if scroll
        app.views.container.scrollToSelectedIcon()
      else
        app.views.container.didScrollToEmoji(emoji)
       */
    },
    cachedNormalEmojis: null,
    cachedRecentEmojis: null,
    cachedSearchEmojis: null,
    invalidateSearchEmojisCache: function() {
      return this.cachedSearchEmojis = null;
    },
    invalidateRecentEmojisCache: function() {
      return this.cachedRecentEmojis = null;
    },
    allEmojis: function() {
      var containerHeight, emojis, filtered, inSearchMode, isRecentEmoji, isSearchEmoji, normalEmojis, recentEmojis;
      emojis = $(".icon:visible");
      inSearchMode = this.inSearchMode();
      isSearchEmoji = this.isSearchEmoji;
      isRecentEmoji = this.isRecentEmoji;
      if (inSearchMode) {
        if (this.cachedSearchEmojis) {
          return $(this.cachedSearchEmojis);
        }
        this.cachedSearchEmojis = this.allSearchEmojis();
        return $(this.cachedSearchEmojis);
      }
      if (this.cachedNormalEmojis) {
        if (!this.cachedRecentEmojis) {
          this.cachedRecentEmojis = this.allRecentIcons();
        }
        return $(this.cachedRecentEmojis.concat(this.cachedNormalEmojis));
      }
      recentEmojis = [];
      normalEmojis = [];
      containerHeight = this.recentEmojisContainerHeight();
      filtered = $(".icon:visible").filter(function(index) {
        var isRecent, isSearch, position;
        isSearch = isSearchEmoji(this);
        if (inSearchMode && !isSearch) {
          return false;
        } else if (!inSearchMode && isSearch) {
          return false;
        }
        isRecent = isRecentEmoji(this);
        if (!inSearchMode && isRecent) {
          position = $(this).position();
          if (position.top >= containerHeight) {
            return false;
          }
        }
        if (isRecent) {
          recentEmojis.push(this);
        }
        if (!isRecent && !isSearch) {
          normalEmojis.push(this);
        }
        return true;
      });
      this.cachedRecentEmojis = recentEmojis;
      this.cachedNormalEmojis = normalEmojis;
      return $(filtered);
    },
    directionLeft: 37,
    directionUp: 38,
    directionRight: 39,
    directionDown: 40,
    keyEnter: 13,
    closestEmoji: function(sourceEmoji, direction) {
      var closer, closest, emoji, emojis, i, leftDifference, len, offset, sourceOffset, topDifference;
      emojis = this.allEmojis();
      closest = null;
      sourceOffset = $(sourceEmoji).offset();
      for (i = 0, len = emojis.length; i < len; i++) {
        emoji = emojis[i];
        offset = $(emoji).offset();
        leftDifference = offset.left - sourceOffset.left;
        topDifference = offset.top - sourceOffset.top;
        closer = false;
        if (!closer) {
          switch (direction) {
            case this.directionLeft:
              if (leftDifference > 0) {
                continue;
              }
              if (topDifference !== 0) {
                continue;
              }
              if (leftDifference === 0 && topDifference === 0) {
                continue;
              }
              if (!closest) {
                closer = true;
              } else if (leftDifference > closest.leftDifference) {
                closer = true;
              }
              break;
            case this.directionUp:
              if (topDifference >= 0) {
                continue;
              }
              if (leftDifference === 0 && topDifference === 0) {
                continue;
              }
              if (!closest) {
                closer = true;
              } else if (topDifference > closest.topDifference) {
                closer = true;
              } else if (topDifference === closest.topDifference) {
                if (Math.abs(leftDifference) < Math.abs(closest.leftDifference)) {
                  closer = true;
                }
              }
              break;
            case this.directionRight:
              if (leftDifference < 0) {
                continue;
              }
              if (topDifference !== 0) {
                continue;
              }
              if (leftDifference === 0 && topDifference === 0) {
                continue;
              }
              if (!closest) {
                closer = true;
              } else if (leftDifference < closest.leftDifference) {
                closer = true;
              }
              break;
            case this.directionDown:
              if (topDifference <= 0) {
                continue;
              }
              if (leftDifference === 0 && topDifference === 0) {
                continue;
              }
              if (!closest) {
                closer = true;
              } else if (topDifference < closest.topDifference) {
                closer = true;
              } else if (topDifference === closest.topDifference) {
                if (Math.abs(leftDifference) < Math.abs(closest.leftDifference)) {
                  closer = true;
                }
              }
              break;
          }
        }
        if (!closer) {
          continue;
        }
        closest = {
          emoji: emoji,
          leftDifference: leftDifference,
          topDifference: topDifference
        };
      }
      if (!closest) {
        return null;
      }
      return closest.emoji;
    }
  };

}).call(this);

(function() {
  window.app = window.app || {
    views: {},
    models: {}
  };

  window.app.views.ContainerView = Backbone.View.extend({
    el: '.inner-container',
    initialize: function() {
      return setTimeout((function(_this) {
        return function() {

          /*haveScrollbars = false
          if window.settingsOnly
            haveScrollbars = false
          @myScroll = new IScroll '.inner-container',
            scrollbars: haveScrollbars
            mouseWheel: true
            probeType: 2
            momentum: true
            bindToWrapper: true
            eventPassthrough: true,
            disableMouse: false
            disablePointer: false
            click: true
            tap: true
            interactiveScrollbars: haveScrollbars
            keyBindings: {
              pageUp: 33,
              pageDown: 34,
              end: 35,
              home: 36,
              left: 1,
              up: 1,
              right: 1,
              down: 1
            }
          #@myScroll = null;
          getCurrentHeader = @getCurrentHeader
          myScroll = @myScroll
          
           * test scroll!
           * setTimeout((=> @testScroll()), 80)
          
          @myScroll.on 'scroll', () ->
            event = this
            h = getCurrentHeader()
            window.app.views.search.selectBestEmojiAtScrollPosition(event)
           * page up/down
          @myScroll.on 'keyScroll', () ->
            event = this
            h = getCurrentHeader()
            window.app.views.search.selectBestEmojiAtScrollPosition(event)
          
          app.views.container.on 'scroll', () ->
            console.log 'scrolling!!!'
          
          setInterval(=>
            @myScroll.refresh()
          ,
            1000
          )
          setTimeout =>
            #$('#searchInput')[0].scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'})
            #app.views.container.scrollTo('search')
           */
        };
      })(this));
    },
    testScroll: function() {
      this.myScroll.scrollTo(0, -500);
      return window.app.views.search.selectBestEmojiAtScrollPosition(this.myScroll);
    },
    getCurrentHeader: function() {
      var cat, cats;
      cats = this.$('.scroll>.icons-category').not('.search_results');
      cat = cats[0];
      cats.each((function(_this) {
        return function(index, el) {
          if ($(cats[index]).offset().top > 90) {
            return false;
          }
          return cat = cats[index];
        };
      })(this));
      this.visibleCategory = $(cat).find('h1');
      return app.views.filter.scrollSpy(this.visibleCategory.attr('name'));
    },
    didScrollToEmoji: function(emoji) {
      var collection, index, model;
      this.getCurrentHeader();
      index = $(emoji).data('index');
      collection = window.app.views.icons.collection;
      model = collection.get(index);
      return window.app.views.preview.show(model);
    },
    scrollToSelectedIcon: function() {
      var collection, index, model, selectedIcon, selectedIcons;
      selectedIcons = this.$(".icon--selected");
      if (selectedIcons.length === 0) {
        return;
      }
      if (this.myScroll) {
        selectedIcon = selectedIcons.first();
        this.myScroll.scrollToElement(".icon--selected", 200, 0, true);
        index = $(selectedIcon).data('index');
        collection = window.app.views.icons.collection;
        model = collection.get(index);
        return window.app.views.preview.show(model);
      }
    },
    scrollToSelectedIconBottom: function() {
      var collection, index, model, selectedIcon, selectedIcons;
      selectedIcons = this.$(".icon--selected");
      if (selectedIcons.length === 0) {
        return;
      }
      if (this.myScroll) {
        selectedIcon = selectedIcons.first();
        this.myScroll.scrollToElement(".icon--selected", 400, 0, true);
        index = $(selectedIcon).data('index');
        collection = window.app.views.icons.collection;
        model = collection.get(index);
        return window.app.views.preview.show(model);
      }
    },
    scrollTo: function(name) {

      /*@myScroll.scrollToElement(@$('[name="' + name + '"]')[0], 200)
      @preview.scrollSpy(@$('h1[name="' + name + '"]').text().trim())
      app.views.filter.scrollSpy(name)
       */
    }
  });

}).call(this);

(function() {
  window.reactApp = window.reactApp || {
    views: {},
    models: {},
    controllers: {}
  };

  window.reactApp.controllers = {};

  window.reactApp.controllers.copyManager = {
    sendTextToActiveTab: function(text) {},
    copyText: function(text) {}
  };

}).call(this);

(function() {
  var EmojiIcon;

  EmojiIcon = React.createClass({displayName: "EmojiIcon",
    render: function() {
      return React.createElement("div", {
        "className": "preview-icon icon-img"
      }, React.createElement("div", {
        "className": "icon-img emojiIcon"
      }));
    }
  });

}).call(this);

(function() {
  var convertSize,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.app = window.app || {
    views: {},
    models: {}
  };

  convertSize = {
    'small': 24,
    'normal': 32,
    'large': 40
  };

  window.app.views.IconsView = (function(superClass) {
    extend(IconsView, superClass);

    function IconsView() {
      return IconsView.__super__.constructor.apply(this, arguments);
    }

    IconsView.prototype.el = '.icons-list .scroll';

    IconsView.prototype.preTemplate = JST['iconsTemplatePreload'];

    IconsView.prototype.template = JST['iconsTemplate'];

    IconsView.prototype.events = {
      "mouseover .icon": function(e) {
        $(".icon--selected").removeClass("icon--selected");
        $(e.currentTarget).addClass("icon--selected");
        window.app.views.search.storeSelectedEmoji(e.currentTarget);
        return this.preview.show(this.collection.get($(e.currentTarget).data('index')));
      },
      "mouseout .icon": function() {
        return this.preview.reset();
      },
      "click .icon": function(e) {
        var emoji;
        e.preventDefault();
        e.stopPropagation();
        emoji = e.currentTarget;
        if (!emoji) {
          emoji = e.target;
        }
        if (window.arrowSelection.isRecentEmoji(emoji)) {
          this.handleRecentEmojiClick(emoji);
          return;
        }
        return this.handleEmojiClick(emoji);
      }
    };

    IconsView.prototype.initialize = function(opts) {
      this.collection = opts.collection;
      this.freqIcons = opts.freqIcons;
      this.categories = opts.categories;
      this.freqIconsView = new window.app.views.FreqIconsView({
        collection: this.freqIcons
      });
      this.searchCollection = opts.searchCollection;
      return window.bgApp.models.settings.bind('change', this.trackSettings, this);
    };

    IconsView.prototype.handleRecentEmojiClick = function(emoji) {
      $(".icon--selected").removeClass("icon--selected");
      $(emoji).addClass("icon--selected");
      $(emoji).addClass('icon--pulse');
      return setTimeout(((function(_this) {
        return function() {
          $(emoji).removeClass('icon--pulse');
          return _this.handleEmojiClick(emoji);
        };
      })(this)), 150);
    };

    IconsView.prototype.handleEmojiClick = function(emoji) {
      var bgAdminMessage, date, emojiShortname, fIcon, icon, isRecentIcon, lastCheck, param, searchTerm, searchVal, timeNow, tracking;
      $(".icon--selected").removeClass("icon--selected");
      $(emoji).addClass("icon--selected");
      window.app.views.search.storeSelectedEmoji(emoji);
      window.app.views.search.invalidateRecentEmojisCache();
      setTimeout(((function(_this) {
        return function() {
          return window.app.views.search.reselectStoredEmoji();
        };
      })(this)), 150);
      icon = this.collection.get($(emoji).data('index'));
      window.app.models.selected.add(icon.attributes);
      bgAdminMessage = chrome.runtime.connect({
        name: 'emoji_admin'
      });
      bgAdminMessage.postMessage({
        unicode: icon
      });
      fIcon = this.freqIcons.findWhere({
        shortname: icon.get('shortname')
      });
      if (fIcon) {
        fIcon.set({
          count: this.freqIcons.models.length > 0 ? this.freqIcons.models[0].get('count') + 1 : 0
        });
      } else {
        icon.set({
          count: this.freqIcons.models.length > 0 ? this.freqIcons.models[0].get('count') + 1 : 0
        });
        this.freqIcons.add(icon);
      }
      this.freqIcons.sort();
      this.freqIcons.save();
      searchTerm = $("#searchInput").val();
      if (searchTerm === '') {
        searchVal = 'no_search_term';
      } else {
        searchVal = searchTerm;
      }
      if ($(emoji).attr('isrecent') === 'true') {
        isRecentIcon = '-recent';
      } else {
        isRecentIcon = '';
      }
      emojiShortname = icon.attributes.shortname.toLowerCase().replace(':', '');
      emojiShortname = emojiShortname.replace(':', '');
      tracking = searchVal + "" + isRecentIcon + ":" + emojiShortname;
      window.sendGA('event', tracking);

      /*=========dead end search->click tracking===================
        -when search leads to no results, search term is stored
        -when subsequent searches are performed, search term is stored as alt (overwritten for each subsequent search)
        -when emoji is clicked, search and alt search vals are sent as emoji-de event and then cleared
        -if last search is more than 30 seconds ago and user clicks emoji, no dead end search needs recorded
       */
      if (!localStorage.getItem('search_no_results') || localStorage.getItem('search_no_results') === '') {

      } else {
        if (localStorage.getItem('last_search_time') !== '') {
          lastCheck = parseInt(localStorage.getItem('last_search_time'));
          date = new Date();
          timeNow = date.getTime();
          if (timeNow - lastCheck > 60 * 30 * 1000) {
            localStorage.setItem('search_no_results', '');
            localStorage.setItem('search_no_results_alt', '');
          } else {
            if (localStorage.getItem('search_no_results') && localStorage.getItem('search_no_results') !== '') {
              param = localStorage.getItem('search_no_results');
              if (localStorage.getItem('search_no_results_alt') && localStorage.getItem('search_no_results_alt') !== '') {
                param += '-->' + localStorage.getItem('search_no_results_alt');
              }
              param += '==>' + emojiShortname;
              window.sendGA('event-de', param);
              localStorage.setItem('search_no_results', '');
              localStorage.setItem('search_no_results_alt', '');
            } else {

            }
          }
        } else {

        }
      }
      $(emoji).addClass('icon--pulse');
      return setTimeout((function() {
        return $(emoji).removeClass('icon--pulse');
      }), 150);
    };

    IconsView.prototype.getCurrentHeader = function() {
      var cats, header;
      cats = this.$('.icons-category');
      header = cats[0];
      cats.each((function(_this) {
        return function(index, el) {
          if ($(cats[index]).position().top < 0) {
            return header = cats[index];
          }
        };
      })(this));
      this.visibleCategory = $(header);
      return $(header).find('h1');
    };

    IconsView.prototype.trackSettings = function(model, val) {
      this.$('.icons-category').removeClass(model._previousAttributes.size).addClass(model.get('size'));
      this.$('.icons-category').removeClass("skin-" + model._previousAttributes.skin).addClass("skin-" + model.get('skin'));
      return this.$('.icon-img').each(function() {
        return $(this).removeClass().addClass("icon-img").addClass("_" + $(this).attr('data-uc')).addClass("joypixels-" + convertSize[window.bgApp.models.settings.get('size')] + "-" + $(this).attr('data-cat'));
      });
    };

    IconsView.prototype.render = function() {
      var html;
      html = this.preTemplate({
        collection: this.collection,
        categories: this.categories,
        iconCategorySize: window.bgApp.models.settings.get('size'),
        iconCategorySizeConverted: convertSize[window.bgApp.models.settings.get('size')],
        iconCategoryTone: "skin-" + window.bgApp.models.settings.get('skin')
      });
      $(this.el).html(html);
      this.$el.prepend(this.freqIconsView.preRender());
      this.preview = new window.app.views.IconPreview({
        collection: window.app.models.selected
      });
      window.app.views.preview = this.preview;
      this.search = new window.app.views.SearchResultsView({
        collection: this.searchCollection,
        preview: this.preview,
        freqIcons: this.freqIcons,
        freqIconsView: this.freqIconsView
      });
      this.search.render();
      this.preview.render();
      return this.$('.icons-category').addClass(window.bgApp.models.settings.get('size')).addClass("skin-" + window.bgApp.models.settings.get('skin'));
    };

    IconsView.prototype.reRender = function() {
      var html;
      html = this.template({
        collection: this.collection,
        categories: this.categories,
        iconCategorySize: window.bgApp.models.settings.get('size'),
        iconCategorySizeConverted: convertSize[window.bgApp.models.settings.get('size')],
        iconCategoryTone: "skin-" + window.bgApp.models.settings.get('skin')
      });
      $(this.el).html(html);
      return this.$el.prepend(this.freqIconsView.reRender());
    };

    IconsView.prototype.remove = function() {
      this.collection.remove();
      this.stopListening();
      return this;
    };

    return IconsView;

  })(Backbone.View);

  window.app.views.FreqIconsView = (function(superClass) {
    extend(FreqIconsView, superClass);

    function FreqIconsView() {
      return FreqIconsView.__super__.constructor.apply(this, arguments);
    }

    FreqIconsView.prototype.preTemplate = JST['FreqTemplatePreload'];

    FreqIconsView.prototype.template = JST['FreqTemplate'];

    FreqIconsView.prototype.id = "recentIcons";

    FreqIconsView.prototype.className = 'icons-category recent';

    FreqIconsView.prototype.preRender = function() {
      return this.$el.html(this.preTemplate({
        collection: this.collection
      }));
    };

    FreqIconsView.prototype.reRender = function() {
      var html;
      html = this.template({
        collection: this.collection
      });
      $(this.el).html(html);
      this.$('.icon-img').each(function() {
        return $(this).removeClass().addClass("icon-img").addClass("_" + $(this).attr('data-uc')).addClass("joypixels-" + convertSize[window.bgApp.models.settings.get('size')] + "-" + $(this).attr('data-cat'));
      });
      return this.el;

      /*return @$el.html(@template
          collection: @collection
      )
       */
    };

    return FreqIconsView;

  })(Backbone.View);

  window.app.views.SearchResultsView = (function(superClass) {
    extend(SearchResultsView, superClass);

    function SearchResultsView() {
      return SearchResultsView.__super__.constructor.apply(this, arguments);
    }

    SearchResultsView.prototype.template = JST['searchTemplate'];

    SearchResultsView.prototype.el = '.search-results';

    SearchResultsView.prototype.initialize = function(opts) {
      this.$el.hide();
      this.freqIcons = opts.freqIcons;
      this.freqIconsView = opts.freqIconsView;
      this.collection = opts.collection;
      this.preview = opts.preview;
      this.render();
      this.collection.bind('reset', this.dispatchRender, this);
      return window.bgApp.models.settings.bind('change', this.trackSettings, this);
    };

    SearchResultsView.prototype.reRender = function() {
      var html;
      html = this.template({
        collection: this.collection
      });
      $(this.el).html(html);
      if (this.collection.length === 0) {
        return this.$el.addClass('no-results');
      } else {
        return this.$el.removeClass('no-results');
      }
    };

    SearchResultsView.prototype.dispatchRender = function() {
      var e, error;
      if (this.pendingDispatch) {
        clearTimeout(this.pendingDispatch);
      }
      try {
        return this.pendingDispatch = setTimeout(((function(_this) {
          return function() {
            return _this.dispatchRenderRun();
          };
        })(this)), 200);
      } catch (error) {
        e = error;
      }
    };

    SearchResultsView.prototype.dispatchRenderRun = function() {
      this.pendingDispatch = null;
      this.render();
      return setTimeout(((function(_this) {
        return function() {
          return window.app.views.search.selectBestEmoji();
        };
      })(this)), 30);
    };

    SearchResultsView.prototype.render = function() {
      var html;
      html = this.template({
        collection: this.collection
      });
      $(this.el).html(html);
      if (this.collection.length === 0) {
        this.$el.addClass('no-results');
      } else {
        this.$el.removeClass('no-results');
      }
      this.$('.icons-category').addClass(window.bgApp.models.settings.get('size')).addClass("skin-" + window.bgApp.models.settings.get('skin'));
      this.$('.icon-img').each(function() {
        return $(this).removeClass().addClass("icon-img").addClass("_" + $(this).attr('data-uc')).addClass("joypixels-" + convertSize[window.bgApp.models.settings.get('size')] + "-" + $(this).attr('data-cat'));
      });
      return this;
    };

    return SearchResultsView;

  })(window.app.views.IconsView);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.app = window.app || {
    views: {},
    models: {}
  };

  window.app.views.IconPreview = (function(superClass) {
    extend(IconPreview, superClass);

    function IconPreview() {
      return IconPreview.__super__.constructor.apply(this, arguments);
    }

    IconPreview.prototype.el = '.preview';

    IconPreview.prototype.template = JST['previewTemplate'];

    IconPreview.prototype.innerTemplate = JST['previewInnerTemplate'];

    IconPreview.prototype.events = {
      'click .cancel': function() {
        if (window.useReact) {
          this.collection.reset();
          this.reactRender();
          return;
        }
        this.collection.reset();
        return this.renderSelected();
      },
      'click .btn': function(e) {
        var ch;
        ch = this.collection.CBCopy();
        setTimeout(((function(_this) {
          return function() {
            return $('#searchInput').focus();
          };
        })(this)), 30);
        if (this.collection.length > 0) {
          $(e.currentTarget).text('COPIED');
          setTimeout((function(_this) {
            return function() {
              return $(e.currentTarget).text('COPY');
            };
          })(this), 500);
          return this.collection.reset();
        }
      }
    };

    IconPreview.prototype.initialize = function() {
      var e, error;
      this.history = [];
      this.collection.on('update', this.renderSelected, this);
      this.collection.on('reset', this.renderSelected, this);
      this.collection.on('add', this.sendToContent, this);
      try {
        return window.addon.port.on('panelShown', (function(_this) {
          return function() {
            _this.collection.reset();
            return _this.$('.preview-field .text').html('');
          };
        })(this));
      } catch (error) {
        e = error;
      }
    };

    IconPreview.prototype.sendToContent = function(model) {
      var ch, e, error, unicodes;
      if (window.useReact) {
        if (window.bgApp.models.settings.get('autoClipboard') === 'on') {
          this.collection.CBCopy();
          $("#preview--copy-button").html("Copied!");
          $("#preview--copy-button").removeClass("preview-button--disable").addClass("preview-button--activate");
          if (this.hideCopiedAnimation) {
            clearTimeout(this.hideCopiedAnimation);
          }
          this.hideCopiedAnimation = setTimeout(((function(_this) {
            return function() {
              _this.hideCopiedAnimation = null;
              return $("#preview--copy-button").addClass("preview-button--disable").removeClass('preview-button--activate');
            };
          })(this)), 800);
        }
        return;
      }
      ch = '';
      unicodes = model.get('output').split('-');
      ch += punycode.ucs2.encode(_.map(unicodes, (function(_this) {
        return function(code) {
          return parseInt(code, 16);
        };
      })(this)));
      try {
        if (typeof chrome === "undefined") {
          throw "firefox";
        }
        if (typeof chrome.tabs === "undefined") {

        } else {
          if (localStorage.getItem('panelState') === 'persist') {
            chrome.tabs.query({
              active: true,
              currentWindow: false
            }, (function(_this) {
              return function(tabs) {
                return chrome.tabs.sendMessage(tabs[0].id, {
                  emoji: ch
                });
              };
            })(this));
          } else {
            chrome.tabs.query({
              active: true,
              currentWindow: true
            }, (function(_this) {
              return function(tabs) {
                return chrome.tabs.sendMessage(tabs[0].id, {
                  emoji: ch
                });
              };
            })(this));
          }
        }
        if (window.bgApp.models.settings.get('autoClipboard') === 'on') {
          this.collection.CBCopy();
          $("#preview--copy-button").html("Copied!");
          $("#preview--copy-button").removeClass("preview-button--disable").addClass("preview-button--activate");
          if (this.hideCopiedAnimation) {
            clearTimeout(this.hideCopiedAnimation);
          }
          return this.hideCopiedAnimation = setTimeout(((function(_this) {
            return function() {
              _this.hideCopiedAnimation = null;
              return $("#preview--copy-button").addClass("preview-button--disable").removeClass('preview-button--activate');
            };
          })(this)), 800);
        }
      } catch (error) {
        e = error;
        console.log("error: " + e);
        return window.addon.port.emit("emoji", ch);
      }
    };

    IconPreview.prototype.show = function(model) {
      if (window.useReact) {
        if (this.previewTextIcon === model) {
          return;
        }
        this.previewTextIcon = model;
        this.reactRender();
        return;
      }
      return this.$('.preview-text').text(model.get('name') + " (" + model.get('output').toLowerCase() + ")");
    };

    IconPreview.prototype.revert = function() {
      debugger;
      return this.render(this.history[0]);
    };

    IconPreview.prototype.reset = function() {
      if (window.useReact) {
        return;
      }
      return this.$('.preview-inner').html('');
    };

    IconPreview.prototype.previewTextIcon = null;

    IconPreview.prototype.reactRender = function() {
      var Preview, container, element, props, selectedIcons;
      selectedIcons = this.collection.models;
      Preview = window.reactApp.views.preview;
      container = document.getElementById("preview--container");
      props = {
        selectedIcons: selectedIcons,
        previewTextIcon: this.previewTextIcon
      };
      element = React.createElement(Preview, props);
      return ReactDOM.render(element, container);
    };

    IconPreview.prototype.renderSelected = function() {
      if (window.useReact) {
        this.reactRender();
        return;
      }
      this.$('.preview-field .text').html(this.innerTemplate({
        models: this.collection.models
      }));
      return this.$('.preview-field .text .icon-img').each(function() {
        var innerDiv;
        innerDiv = $(this).find('div');
        return $(innerDiv).removeClass().addClass("icon-img").addClass("_" + $(innerDiv).attr('data-uc')).addClass("joypixels-24-" + $(innerDiv).attr('data-cat'));
      });
    };

    IconPreview.prototype.render = function(o) {
      var attributes;
      if (window.useReact) {
        console.log("not rendering backbone preview");
        this.el = 'asdf';
        return;
      }
      attributes = {};
      attributes.autoClipboard = window.bgApp.models.settings.get('autoClipboard');
      return $(this.el).html(this.template(attributes));
    };

    return IconPreview;

  })(Backbone.View);

}).call(this);

(function() {
  var Preview, PreviewIcon, container, element, selectedIcons;

  window.useReact = false;

  window.reactApp = window.reactApp || {
    views: {},
    models: {},
    controllers: {}
  };

  window.reactApp.views.previewIcon = PreviewIcon = React.createClass({displayName: "PreviewIcon",
    render: function() {
      var classNames;
      classNames = "icon-img emojiIcon _" + this.props.unicode.toUpperCase();
      return React.createElement("div", {
        "className": "preview-icon icon-img"
      }, React.createElement("div", {
        "className": classNames
      }));
    }
  });

  window.reactApp.views.preview = Preview = React.createClass({displayName: "Preview",
    handleClearClick: function() {},
    getInitialState: function() {
      return {
        selectedIcons: []
      };
    },
    render: function() {
      var buttonAttributes, buttonContent, children, previewText, settingAutoClipboard;
      settingAutoClipboard = window.bgApp.models.settings.get('autoClipboard');
      buttonAttributes = {};
      buttonContent = '';
      if (settingAutoClipboard === 'on') {
        buttonAttributes['disabled'] = true;
      } else {
        buttonContent = 'Copy';
      }
      children = this.props.selectedIcons.map(function(model, index) {
        return React.createElement(PreviewIcon, {
          "key": index,
          "unicode": model.attributes.unicode
        });
      });
      PreviewIcon = window.reactApp.views.previewIcon;
      if (this.props.previewTextIcon) {
        previewText = this.props.previewTextIcon.get('name');
      } else {
        previewText = '';
      }
      return React.createElement("div", null, React.createElement("div", {
        "className": "preview-text"
      }, previewText), React.createElement("div", {
        "className": "preview-field small"
      }, React.createElement("div", {
        "className": "text"
      }, children), React.createElement("a", {
        "href": "#",
        "className": "cancel",
        "onClick": this.handleClearClick
      }, React.createElement("img", {
        "src": "/images/close.svg",
        "alt": ""
      }))), React.createElement("button", Object.assign({}, buttonAttributes, {
        "id": "preview--copy-button",
        "type": "button",
        "className": "btn btn-default",
        "data-val": "small",
        "data-param": "size"
      }), " "), React.createElement("input", {
        "id": "copyInput",
        "type": "text",
        "className": "copy"
      }));
    }
  });

  if (window.useReact) {
    container = document.getElementById("preview--container");
    selectedIcons = [];
    element = React.createElement(Preview, {
      "selectedIcons": selectedIcons
    });
    ReactDOM.render(element, container);
    console.log("reactApp: ", window.reactApp);
  }

}).call(this);

(function() {
  window.app = window.app || {
    views: {},
    models: {}
  };

  window.app.views.SearchView = Backbone.View.extend({
    el: '.search',
    template: JST['skinSelector'],
    setDiversity: false,
    events: {
      "focus input": function() {
        return this.$el.addClass('active');
      },
      "click .btn-tone": function(e) {
        $('.preview-text').text('');
        $(e.currentTarget).addClass('active').siblings().removeClass('active');
        window.bgApp.models.settings.set({
          skin: $(e.currentTarget).data('skin')
        });
        if (parseInt($(e.currentTarget).data('skin')) > 0) {
          if ($("#searchInput").val() === "" || $("#searchInput").val() === "diversity") {
            this.setDiversity = true;
          }
        }
        return window.app.views.icons.reRender();
      },
      "click .close": function(e) {
        this.$('#searchInput').val('');
        this.$('#searchInput').blur();
        this.$('#searchInput').keyup();
        this.$('#searchInput').focus();
        return $('.preview-text').text('');
      },
      "keydown input": function(e) {
        $('.preview-text').text('');
        if (this.handleArrow(e)) {

        }
      },
      "keyup input": function(e) {
        var date, numResults, val;
        $('.preview-text').text('');
        if (this.handleArrow(e)) {
          return;
        }
        switch (e.which) {
          case 33:
          case 34:
          case 35:
          case 36:
            return;
        }
        val = $(e.currentTarget).val();
        if (val.length) {
          this.invalidateSearchEmojisCache();
          $(".icon--selected").removeClass("icon--selected");
          if (!window.app.views.icons.search.$el.hasClass('active')) {
            window.app.views.icons.search.$el.addClass('active').fadeIn('fast');
            window.app.views.icons.$el.addClass('hidden');
            this.$el.addClass('active');
          }
          numResults = this.collection.search(val).length;
          if (val.length > 3) {
            window.sendGA('pageview', '/search.php?q=' + val.toLowerCase());
            if (numResults === 0) {
              window.sendGA('event-de', 'NO_RESULTS==>' + val);
            }
          }
          date = new Date();
          localStorage.setItem('last_search_time', date.getTime());
          if (numResults === 0) {
            if (!localStorage.getItem('search_no_results') || localStorage.getItem('search_no_results') === '') {
              if (val.length > 4) {
                return localStorage.setItem('search_no_results', val);
              }
            } else {
              return localStorage.setItem('search_no_results_alt', val);
            }
          } else {
            return localStorage.setItem('search_no_results_alt', val);
          }
        } else {
          $(".icon--selected").removeClass("icon--selected");
          window.app.views.icons.search.$el.removeClass('active').fadeOut('fast');
          window.app.views.icons.$el.removeClass('hidden');
          this.$el.removeClass('active');
          if (this.selectBestEmojiTimeout) {
            clearTimeout(this.selectBestEmojiTimeout);
          }
          return this.selectBestEmojiTimeout = setTimeout(((function(_this) {
            return function() {
              return _this.selectBestEmoji();
            };
          })(this)), 80);
        }
      }
    },
    selectBestEmojiTimeout: null,
    directionLeft: 37,
    directionUp: 38,
    directionRight: 39,
    directionDown: 40,
    keyEnter: 13,
    storedSelectedEmoji: null,
    typeRecent: "recent",
    typeNormal: "normal",
    typeSearch: "search",
    storeSelectedEmoji: function(emoji) {
      var isRecent, isSearch, type;
      isRecent = $(emoji).parents('#recentIcons').length;
      isSearch = $(emoji).parents('.search_results').length;
      type = this.typeNormal;
      if (isRecent) {
        type = this.typeRecent;
      } else if (isSearch) {
        type = this.typeSearch;
      }
      return this.storedSelectedEmoji = {
        emojiID: $(emoji).attr("id"),
        type: type
      };
    },
    reselectStoredEmoji: function() {
      var emoji, foundEmojiToSelect, inSearchMode, selectEmoji, selectedEmoji, selector, type;
      if (!this.storedSelectedEmoji) {
        return false;
      }
      emoji = this.storedSelectedEmoji;
      selectedEmoji = this.selectedEmoji();
      if (selectedEmoji) {
        return true;
      }
      selector = "[id='" + emoji.emojiID + "']";
      type = this.storedSelectedEmoji.type;
      foundEmojiToSelect = false;
      inSearchMode = this.inSearchMode();
      selectEmoji = ((function(_this) {
        return function(emoji) {
          return _this.selectEmoji(emoji);
        };
      })(this));
      $(selector).each(function() {
        var isNormal, isRecent, isSearch;
        isRecent = $(this).parents('#recentIcons').length > 0;
        isSearch = $(this).parents('.search_results').length > 0;
        isNormal = !isRecent && !isSearch;
        if ((inSearchMode === true) && isSearch === false) {
          return true;
        } else if ((inSearchMode === false) && isSearch === true) {
          return true;
        }
        if (isRecent && type === "recent") {
          selectEmoji(this);
          foundEmojiToSelect = true;
          return false;
        } else if (isSearch && type === "search") {
          selectEmoji(this);
          foundEmojiToSelect = true;
          return false;
        } else if (isNormal && type === "normal") {
          selectEmoji(this);
          foundEmojiToSelect = true;
          return false;
        }
        return true;
      });
      return foundEmojiToSelect;
    },
    selectBestEmoji: function() {
      var selected, topMost;
      this.selectBestEmojiTimeout = null;
      if (this.reselectStoredEmoji()) {
        return true;
      }
      selected = this.selectedEmoji();
      if (!selected) {
        topMost = this.topMostEmoji();
        if (!topMost) {
          return;
        }
        return this.selectEmoji(topMost);
      }
    },
    selectEmoji: function(emoji) {
      $(".icon--selected").removeClass("icon--selected");
      $(emoji).addClass("icon--selected");
      return this.storeSelectedEmoji(emoji);
    },
    inSearchMode: function() {
      return window.arrowSelection.inSearchMode();
    },
    lastArrowTimestamp: null,
    shouldHandleKeyDown: false,
    shouldHandleKeyUp: true,
    resetHandleState: function() {
      var currentTime;
      currentTime = Date.now();
      if (currentTime - this.lastArrowTimestamp > 1000) {
        this.shouldHandleKeyDown = false;
        return this.shouldHandleKeyUp = true;
      }
    },
    simulateClick: function(elem) {
      var canceled, evt;
      evt = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      canceled = !elem.dispatchEvent(evt);
    },
    handleArrow: function(event) {
      var closest, direction, previousTimestamp, selected, topMost;
      direction = event.which;
      switch (direction) {
        case this.directionLeft:
        case this.directionUp:
        case this.directionRight:
        case this.directionDown:
        case this.keyEnter:
          event.preventDefault();
          event.stopPropagation();
          break;
        default:
          return false;
      }
      if (event.which === this.keyEnter) {
        if (event.type === "keyup") {
          $(".icon--selected").click();
        }
        return true;
      }
      if (event.type === "keydown" && !this.shouldHandleKeyDown) {
        this.shouldHandleKeyDown = true;
        return true;
      } else if (event.type === "keydown" && this.shouldHandleKeyDown) {
        this.shouldHandleKeyUp = false;
      } else if (event.type === "keyup" && !this.shouldHandleKeyUp) {
        this.shouldHandleKeyDown = false;
        this.shouldHandleKeyUp = true;
        return true;
      }
      if (!this.lastArrowTimestamp) {
        this.lastArrowTimestamp = event.timeStamp;
      } else {
        previousTimestamp = this.lastArrowTimestamp;
        if (event.timeStamp - previousTimestamp < 40) {
          return true;
        }
        this.lastArrowTimestamp = event.timeStamp;
        if (event.type === "keyup") {
          this.lastArrowTimestamp = null;
        }
        setTimeout(((function(_this) {
          return function() {
            return _this.resetHandleState();
          };
        })(this)), 300);
      }
      selected = this.selectedEmoji();
      if (!selected) {
        topMost = this.topMostEmoji();
        if (!topMost) {
          return true;
        }
        this.selectEmoji(topMost);
        $(topMost).addClass("icon--selected");
        selected = topMost;
        app.views.container.scrollToSelectedIcon();
        return true;
      }
      closest = this.closestEmoji(selected, direction);
      if (closest) {
        this.selectEmoji(closest);
        this.scrollToSelectedEmojiIfAppropriate(closest, direction);
      }
      return true;
    },
    scrollToSelectedEmojiIfAppropriate: function(emoji, direction) {
      return window.arrowSelection.scrollToSelectedEmojiIfAppropriate(emoji, direction);
    },
    closestEmoji: function(sourceEmoji, direction) {
      return window.arrowSelection.closestEmoji(sourceEmoji, direction);
    },
    selectedEmojiIsVisibleInScrollConstraints: function(scrollConstraints) {
      var maxY, minY, offset, selectedEmoji, wrapperHeight, wrapperOffset;
      selectedEmoji = this.selectedEmoji();
      if (!selectedEmoji) {
        return false;
      }
      wrapperOffset = Math.abs(scrollConstraints.y);
      wrapperHeight = scrollConstraints.wrapperHeight;
      minY = wrapperOffset;
      maxY = minY + wrapperHeight;
      offset = $(selectedEmoji).offset();
      if (offset.top < minY) {
        return false;
      }
      if (offset.top > maxY) {
        return false;
      }
      return true;
    },
    topMostEmoji: function(scrollConstraints) {
      var emoji, emojis, i, len, maxY, minY, offset, topLeftEmoji, wrapperHeight, wrapperOffset;
      if (scrollConstraints == null) {
        scrollConstraints = null;
      }
      emojis = this.allEmojis();
      minY = null;
      maxY = null;
      if (scrollConstraints) {
        wrapperOffset = Math.abs(scrollConstraints.wrapperOffset.top);
        wrapperHeight = scrollConstraints.wrapperHeight;
        minY = wrapperOffset;
        maxY = minY + wrapperHeight;
      }
      topLeftEmoji = null;
      for (i = 0, len = emojis.length; i < len; i++) {
        emoji = emojis[i];
        if (emojis.hasOwnProperty(emoji)) {
          continue;
        }
        offset = $(emoji).offset();
        if (minY && maxY) {
          if (offset.top < minY) {
            continue;
          }
          if (offset.top > maxY) {
            continue;
          }
        }
        if (!topLeftEmoji) {
          topLeftEmoji = {
            emoji: emoji,
            offset: offset
          };
          continue;
        }
        if (offset.left < topLeftEmoji.offset.left && offset.top < topLeftEmoji.offset.top) {
          topLeftEmoji = {
            emoji: emoji,
            offset: offset
          };
        }
      }
      if (!topLeftEmoji) {
        return null;
      }
      return topLeftEmoji.emoji;
    },
    selectedEmoji: function() {
      var selected;
      selected = this.allEmojis().filter(".icon--selected");
      if (selected.length === 0) {
        return null;
      } else {
        return selected.first();
      }
    },
    invalidateSearchEmojisCache: function() {
      return window.arrowSelection.invalidateSearchEmojisCache();
    },
    invalidateRecentEmojisCache: function() {
      return window.arrowSelection.invalidateRecentEmojisCache();
    },
    allEmojis: function() {
      return window.arrowSelection.allEmojis();
    },
    allSearchEmojis: function() {
      return window.arrowSelection.allSearchEmojis();
    },
    allRecentIcons: function() {
      return window.arrowSelection.allRecentIcons();
    },
    recentEmojisContainerHeight: function() {
      return window.arrowSelection.recentEmojisContainerHeight();
    },
    isSearchEmoji: function(emoji) {
      return window.arrowSelection.isSearchEmoji(emoji);
    },
    isRecentEmoji: function(emoji) {
      return window.arrowSelection.isRecentEmoji(emoji);
    },
    selectBestEmojiAtScrollPosition: function(scrollHandler) {
      var topMostEmoji;
      if (this.selectedEmojiIsVisibleInScrollConstraints(scrollHandler)) {
        return;
      }
      topMostEmoji = this.topMostEmoji(scrollHandler);
      if (topMostEmoji) {
        return this.selectEmoji(topMostEmoji);
      }
    },
    reset: function() {
      return this.collection.search();
    },
    reactRender: function() {
      return setTimeout((function(_this) {
        return function() {
          return _this.$('#searchInput').focus();
        };
      })(this), 1000);
    },
    initialize: function() {
      var e, error;
      if (window.useReact) {
        this.reactRender();
        return;
      }
      setTimeout(((function(_this) {
        return function() {
          return _this.selectBestEmoji();
        };
      })(this)), 80);
      this.$el.html(this.template(window.bgApp.models.settings.attributes));
      $(document).on('click', function(event) {
        return $('#searchInput').focus();
      });
      try {
        return window.addon.port.on('panelShown', (function(_this) {
          return function() {
            return _this.$('#searchInput').focus();
          };
        })(this));
      } catch (error) {
        e = error;
        return setTimeout((function(_this) {
          return function() {
            return _this.$('#searchInput').focus();
          };
        })(this), 1000);
      }
    }
  });

}).call(this);

(function() {
  var SearchView, container, element;

  window.reactApp = window.reactApp || {
    views: {},
    models: {},
    controllers: {}
  };

  window.reactApp.views.searchView = SearchView = React.createClass({displayName: "SearchView",
    render: function() {
      return React.createElement("div", null, React.createElement("div", {
        "className": "search-input"
      }, React.createElement("input", {
        "id": "searchInput",
        "type": "search",
        "placeholder": "SEARCH",
        "autofocus": true
      })), React.createElement("div", {
        "className": "skin-tones"
      }, React.createElement("button", {
        "className": "btn btn-tone btn-tone-0 <%= skin == 0 ? 'active' : ''%>",
        "data-skin": "0"
      }), React.createElement("button", {
        "className": "btn btn-tone btn-tone-1 <%= skin == 1 ? 'active' : ''%>",
        "data-skin": "1"
      }), React.createElement("button", {
        "className": "btn btn-tone btn-tone-2 <%= skin == 2 ? 'active' : ''%>",
        "data-skin": "2"
      }), React.createElement("button", {
        "className": "btn btn-tone btn-tone-3 <%= skin == 3 ? 'active' : ''%>",
        "data-skin": "3"
      }), React.createElement("button", {
        "className": "btn btn-tone btn-tone-4 <%= skin == 4 ? 'active' : ''%>",
        "data-skin": "4"
      }), React.createElement("button", {
        "className": "btn btn-tone btn-tone-5 <%= skin == 5 ? 'active' : ''%>",
        "data-skin": "5"
      })), React.createElement("button", {
        "className": "close"
      }));
    }
  });

  if (window.useReact) {
    container = document.getElementById("searchContainer");
    element = React.createElement(SearchView, null);
    ReactDOM.render(element, container);
  }

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.app = window.app || {
    views: {},
    models: {}
  };

  window.app.models.SelectedCollection = (function(superClass) {
    extend(SelectedCollection, superClass);

    function SelectedCollection() {
      return SelectedCollection.__super__.constructor.apply(this, arguments);
    }

    SelectedCollection.prototype.model = Backbone.Model;

    SelectedCollection.prototype.CBCopy = function() {
      var ch, error, error1, input;
      ch = '';
      _.each(this.models, function(icon) {
        var unicodes;
        unicodes = icon.get('output').split('-');
        return ch += punycode.ucs2.encode(_.map(unicodes, (function(_this) {
          return function(code) {
            return parseInt(code, 16);
          };
        })(this)));
      });
      ch;
      if (location.protocol === 'moz-extension:') {
        input = document.getElementById('copyInput');
        input.value = ch;
        input.select();
        try {
          return document.execCommand('Copy');
        } catch (error1) {
          error = error1;
        }
      } else {
        return setTimeout(((function(_this) {
          return function() {
            return _this.copyToClipboard(ch);
          };
        })(this)), 150);
      }
    };

    SelectedCollection.prototype.copyToClipboard = function(text) {
      var error, error1, input;
      try {
        window.addon.port.emit("clipboard", ch);
        return;
      } catch (error1) {
        error = error1;
      }
      input = document.getElementById('copyInput');
      input.value = text;
      input.select();
      document.execCommand('Copy');
      $('#searchInput').focus();
      return $('.icon--selected')[0].scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'nearest'
      });
    };

    SelectedCollection.prototype.CBPaste = function() {
      var error1;
      try {
        return document.execCommand('Paste');
      } catch (error1) {
        return error;
      }
    };

    return SelectedCollection;

  })(Backbone.Collection);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.app = window.app || {
    views: {},
    models: {}
  };

  window.bgApp = chrome.extension.getBackgroundPage().app;

  window.app.Header = (function(superClass) {
    var getCookie;

    extend(Header, superClass);

    function Header() {
      return Header.__super__.constructor.apply(this, arguments);
    }

    Header.prototype.el = '.header';

    Header.prototype.events = {
      'click .btn-settings': 'showSettings',
      'click .btn-search': 'startSearch',
      'click .logo-topbar': function(el) {
        var e, error1;
        el.preventDefault();
        try {
          return chrome.tabs.create({
            url: $(el.currentTarget).attr('href')
          });
        } catch (error1) {
          e = error1;
          return window.addon.port.emit("opentab", {
            url: $(el.currentTarget).attr('href')
          });
        }
      }
    };

    getCookie = function(cname) {
      var c, ca, i, name;
      name = cname + '=';
      ca = document.cookie.split(';');
      i = 0;
      while (i < ca.length) {
        c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
        i++;
      }
      return '';
    };

    Header.prototype.shouldShowPromo = function(e) {
      var lastClosedPromo;
      if (getCookie('promo_last_closed') && getCookie('promo_last_closed') !== 'undefined' && getCookie('promo_last_closed') !== '') {
        console.log('should show!!');
        lastClosedPromo = parseInt(getCookie('promo_last_closed'));
      } else {
        lastClosedPromo = 0;
      }
      console.log(lastClosedPromo);
      if (lastClosedPromo === parseInt(getCookie('promo_active_id'))) {
        return false;
      }
      return true;
    };

    Header.prototype.startSearch = function() {
      app.views.container.scrollTo('search');
      return setTimeout((function(_this) {
        return function() {
          return app.views.container.$('.search-input input').focus();
        };
      })(this));
    };

    Header.prototype.showSettings = function(e) {
      if (!$(e.currentTarget).hasClass('active')) {
        this.settings = new window.app.views.Settings({
          model: this.model
        });
        this.settings.show();
        $('.filters').addClass('settings');
        $('.btn-search').addClass('settings');
        $('.tooltip').css('right', '90px');
        if (location.protocol === 'moz-extension:') {
          this.model.set({
            'autoReplace': 'off'
          });
        }
        $('.ad_wrapper').hide();
      } else {
        window.app.views.icons.preview.render();
        window.bgApp.models.freqIcons.load(window.bgApp.models.icons);
        window.app.views.icons.freqIconsView.reRender();
        window.app.views.preview.collection.reset();
        this.settings.$el.hide();
        $('.filters').removeClass('settings');
        $('.btn-search').removeClass('settings');
        $('.tooltip').css('right', '131px');
        if (this.shouldShowPromo()) {
          $('.ad_wrapper').show();
        }
      }
      return $(e.currentTarget).toggleClass('active');
    };

    return Header;

  })(Backbone.View);

  window.app.views.Settings = (function(superClass) {
    var getCookie;

    extend(Settings, superClass);

    function Settings() {
      return Settings.__super__.constructor.apply(this, arguments);
    }

    Settings.prototype.el = '#settingsPanel';

    Settings.prototype.template = JST['SettingsTemplate'];

    Settings.prototype.events = {
      'click .btn--size': function(el) {
        return setTimeout(((function(_this) {
          return function() {
            return _this.hideSettings();
          };
        })(this)), 10);
      },
      'click .go-back': 'hideSettings',
      'click .btn-group .btn': 'setSettings',
      'click .social-links a': function(el) {
        var e, error1;
        el.preventDefault();
        try {
          return chrome.tabs.create({
            url: $(el.currentTarget).attr('href')
          });
        } catch (error1) {
          e = error1;
          return window.addon.port.emit("opentab", {
            url: $(el.currentTarget).attr('href')
          });
        }
      },
      'click .hotkey': function() {
        var e, error1;
        try {
          return chrome.tabs.create({
            url: 'chrome://extensions/configureCommands'
          });
        } catch (error1) {
          e = error1;
        }
      }
    };

    getCookie = function(cname) {
      var c, ca, i, name;
      name = cname + '=';
      ca = document.cookie.split(';');
      i = 0;
      while (i < ca.length) {
        c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
        i++;
      }
      return '';
    };

    Settings.prototype.shouldShowPromo = function(e) {
      var lastClosedPromo;
      if (getCookie('promo_last_closed') && getCookie('promo_last_closed') !== 'undefined' && getCookie('promo_last_closed') !== '') {
        console.log('should show!!');
        lastClosedPromo = parseInt(getCookie('promo_last_closed'));
      } else {
        lastClosedPromo = 0;
      }
      console.log(lastClosedPromo);
      if (lastClosedPromo === parseInt(getCookie('promo_active_id'))) {
        return false;
      }
      return true;
    };

    Settings.prototype.hideSettings = function(e) {
      window.app.views.icons.preview.render();
      window.bgApp.models.freqIcons.load(window.bgApp.models.icons);
      window.app.views.icons.freqIconsView.reRender();
      window.app.views.preview.collection.reset();
      $('#settingsPanel').hide();
      $('button.btn-settings').removeClass('active');
      $('.filters').removeClass('settings');
      $('.btn-search').removeClass('settings');
      if (this.shouldShowPromo()) {
        return $('.ad_wrapper').show();
      }
    };

    Settings.prototype.setSettings = function(e) {
      var blacklistTab, error, error1, thisModel;
      thisModel = this.model;
      try {
        chrome.tabs.query({
          active: true,
          lastFocusedWindow: true
        }, function(tabs) {
          var thisURL;
          thisURL = tabs[0].url;
          setTimeout(blacklistTab(thisURL, thisModel), 50);
        });
      } catch (error1) {
        error = error1;
      }
      return blacklistTab = function(tab, thisModel) {
        var error2, params;
        error = void 0;
        params = {};
        $(e.currentTarget).addClass('active').siblings().removeClass('active');
        if ($(e.currentTarget).data('param') === 'panelState') {
          localStorage.setItem('panelState', $(e.currentTarget).data('val'));
        }
        if ($(e.currentTarget).data('param') === 'numRecents') {
          localStorage.setItem('numRecents', $(e.currentTarget).data('val'));
        }
        params[$(e.currentTarget).data('param')] = $(e.currentTarget).data('val');
        thisModel.set(params);
        try {
          return chrome.tabs.query({
            active: true,
            currentWindow: true
          }, (function(_this) {
            return function(tabs) {
              return chrome.tabs.sendMessage(tabs[0].id, params);
            };
          })(this));
        } catch (error2) {
          error = error2;
        }
      };
    };

    Settings.prototype.show = function() {
      var e, error1;
      this.$el.show();
      if (!chrome.commands) {

      } else {
        try {
          return chrome.commands.getAll(function(a) {
            if (a.length > 0 && a[0].shortcut.length) {
              return $('.hotkey').val(a[0].shortcut);
            }
          });
        } catch (error1) {
          e = error1;
        }
      }
    };

    Settings.prototype.initialize = function() {
      return this.render();
    };

    Settings.prototype.reactRender = function() {
      var SettingsView, container, element;
      SettingsView = window.reactApp.views.settingsView;
      container = document.getElementById("settingsPanel");
      element = React.createElement(SettingsView);
      return ReactDOM.render(element, container);
    };

    Settings.prototype.render = function() {
      if (window.useReact) {
        this.reactRender();
        return;
      }
      this.v = $('version').data('version');
      this.b = $('version').data('browser');
      this.model.set({
        version: this.v,
        browser: this.b
      });
      $(this.el).html(this.template(this.model.attributes));
      return setTimeout((function(_this) {
        return function() {
          var haveScrollbars;
          haveScrollbars = true;
          if (window.settingsOnly) {
            haveScrollbars = false;
          }
          return _this.myScroll = new IScroll('#settingsPanel .settings-container-scroll', {
            scrollbars: haveScrollbars,
            mouseWheel: true,
            probeType: 2,
            momentum: false,
            bindToWrapper: true,
            disableMouse: false,
            disablePointer: false,
            interactiveScrollbars: haveScrollbars,
            keyBindings: true,
            click: true,
            tap: true
          });
        };
      })(this));
    };

    return Settings;

  })(Backbone.View);

}).call(this);

(function() {
  var SettingsView;

  window.reactApp = window.reactApp || {
    views: {},
    models: {},
    controllers: {}
  };

  window.reactApp.views.settingsView = SettingsView = React.createClass({displayName: "SettingsView",
    render: function() {
      var autoClipboard, autoReplace, autoReplaceOffClass, autoReplaceOnClass, browser, buttonClass, size, version;
      version = $('version').data('version');
      browser = $('version').data('browser');
      autoClipboard = window.bgApp.models.settings.get('autoClipboard');
      autoReplace = window.bgApp.models.settings.get('autoReplace');
      size = window.bgApp.models.settings.get('size');
      buttonClass = 'btn';
      autoReplaceOnClass = buttonClass;
      autoReplaceOffClass = buttonClass;
      if (autoReplace === 'on') {
        autoReplaceOnClass = autoReplaceOnClass + ' active';
      } else {
        autoReplaceOffClass = autoReplaceOnClass + ' active';
      }
      return React.createElement("div", null, React.createElement("div", {
        "className": "settings-header"
      }, React.createElement("a", {
        "className": "go-back"
      }, "\x3C GO BACK")), React.createElement("div", {
        "className": "container"
      }, React.createElement("div", {
        "className": "inner settings-container-scroll"
      }, React.createElement("div", {
        "className": "scroll-wrapper"
      }, React.createElement("h3", null, "Auto-replace", React.createElement("small", null, "Replace all emoji in Chrome to Emoji One.")), React.createElement("div", {
        "className": "btn-group",
        "role": "group",
        "aria-label": "..."
      }, React.createElement("button", {
        "type": "button",
        "className": autoReplaceOnClass,
        "data-val": "on",
        "data-param": "autoReplace"
      }, "on"), React.createElement("button", {
        "type": "button",
        "className": autoReplaceOffClass,
        "data-val": "off",
        "data-param": "autoReplace"
      }, "off")), React.createElement("h3", null, "Auto-copy", React.createElement("small", null, "Copy emojis to clipboard as you click on them.")), React.createElement("div", {
        "className": "btn-group",
        "role": "group",
        "aria-label": "..."
      }, React.createElement("button", {
        "type": "button",
        "className": "btn {autoClipboard == 'on' ? 'active' :  ''}",
        "data-val": "on",
        "data-param": "autoClipboard"
      }, "on"), React.createElement("button", {
        "type": "button",
        "className": "btn  {autoClipboard == 'off' ? 'active' :  ''}",
        "data-val": "off",
        "data-param": "autoClipboard"
      }, "off")), React.createElement("h3", null, "Emoji size", React.createElement("small", null, "Size of the emoji icons within this extension panel.")), React.createElement("div", {
        "className": "btn-group",
        "role": "group",
        "aria-label": "..."
      }, React.createElement("button", {
        "type": "button",
        "className": "btn btn-default btn--size <%= size == 'small' ? 'active' : ''%>",
        "data-val": "small",
        "data-param": "size"
      }, "small"), React.createElement("button", {
        "type": "button",
        "className": "btn btn--size btn-default <%= size == 'normal' ? 'active' : ''%>",
        "data-val": "normal",
        "data-param": "size"
      }, "normal"), React.createElement("button", {
        "type": "button",
        "className": "btn btn--size btn-default <%= size == 'large' ? 'active' : ''%>",
        "data-val": "large",
        "data-param": "size"
      }, "large")), React.createElement("h3", null, "keyboard shortcut", React.createElement("small", null, "Use this keyboard combo to open this panel.")), React.createElement("div", {
        "className": "input"
      }, "\x3Cinput type=\"text\" className=\"hotkey\" readonly value=\"CTRL+SHIFT+E\"\x3E"), "\n\x3Cbr\x3E\x3Cbr\x3E"))), React.createElement("div", {
        "className": "settings-bottom"
      }, React.createElement("div", {
        "className": "social-links"
      }, React.createElement("a", {
        "href": "https://www.facebook.com/joypixelsinc",
        "className": "social-button"
      }, React.createElement("img", {
        "src": "images/fb.png",
        "alt": "Facebook"
      })), React.createElement("a", {
        "href": "https://twitter.com/joypixels",
        "className": "social-button"
      }, React.createElement("img", {
        "src": "images/tw.png",
        "alt": "Twitter"
      })), React.createElement("p", {
        "className": "copy"
      }, "JoyPixels", React.createElement("sup", null, "TM"), " for ", browser, " version  ", version, " "), React.createElement("p", {
        "className": "copy small-copy"
      }, "View our newest emoji at ", React.createElement("a", {
        "className": "brand",
        "href": "http://www.joypixels.com"
      }, React.createElement("span", {
        "className": "link"
      }, "joypixels.com"))))));
    }
  });

}).call(this);
