$(document).ready(function(){
    window.setTimeout(function() {

        var getNewPromo = false;

        //should we check for new promo?
        if (!getCookie('promo_last_check') || getCookie('promo_last_check') == 'undefined' || getCookie('promo_last_check') == '' || !getCookie('promo_emoji_id') || getCookie('promo_emoji_id') == 'undefined' || getCookie('promo_emoji_id') == '' || !getCookie('promo_active_id') || getCookie('promo_active_id') == 'undefined' || getCookie('promo_active_id') == '') {
            //no cookie was defined
            getNewPromo = true;
        } else {
            //cookie is found, was it last checked more than 3 hours ago?
            var lastCheck = getCookie('promo_last_check');
            var timeNow = new Date().getTime() / 1000;
            if (timeNow - lastCheck > 60 * 60 * 3) {
                getNewPromo = true;
            }
        }

        //did user previously choose to hide a promo?
        if (getCookie('promo_last_closed') && getCookie('promo_last_closed') != 'undefined' && getCookie('promo_last_closed') != '') {
            var lastClosedPromo = parseInt(getCookie('promo_last_closed'));
        } else {
            var lastClosedPromo = 0;
        }

        //should we check for a new promo?
        if (getNewPromo == true) {
            setNewPromo();
        } else {
            //if the user chose to close this promo, don't show
            if (lastClosedPromo == parseInt(getCookie('promo_active_id'))) {
                $('.ad_wrapper').hide();
            } else {
                //update view with existing promo data

                //do we have an emoji category?
                if (getCookie('promo_category') && getCookie('promo_category') != 'undefined' && getCookie('promo_category') != '') {
                    var emojiCategory = getCookie('promo_category');
                    $('.ad_icon_popout').attr('data-id', getCookie('promo_active_id'));
                    $('.ad_text').attr('href', getCookie('promo_link_url')).html(getCookie('promo_link_title')).css('color', getCookie('promo_link_color'));
                    $('.inner_ad').css('background-color', getCookie('promo_bar_color'));
                    $('#ad_emoji').removeClass('_1f984').removeClass('joypixels-24-nature').addClass('_' + getCookie('promo_emoji_id').toLowerCase()).addClass('joypixels-24-' + emojiCategory);
                } else {
                    setNewPromo();
                }
            }
        }

        //in case panel happens to remain open in undocked state, check for new promo every 3 hours
        window.setInterval(function () {
            setNewPromo();
        }, 60 * 60 * 3 * 1000);

    }, 1);

    $('.ad_icon_popout').click(function(){
        //hide this promo
        $('.ad_wrapper').hide();

        //set last close promo id to this promo so that it doesn't show again
        setCookie('promo_last_closed', $(this).attr('data-id'))
    });

});

function setNewPromo() {
    var cacheBust = new Date().getTime() / 1000;
    if (localStorage.getItem('browserType') == 'Chrome') {
        var url = 'https://d1j8pt39hxlh3d.cloudfront.net/browser-extensions/promo-chrome.txt?v=' + cacheBust;
    } else if (localStorage.getItem('browserType') == 'Opera') {
        var url = 'https://d1j8pt39hxlh3d.cloudfront.net/browser-extensions/promo-opera.txt?v=' + cacheBust;
    } else {
        var url = '';
    }
    $.ajax({
        url: url,
        dataType: 'json',
        success: function(data) {
            if (data === null || Object.getOwnPropertyNames(data).length === 0) {
                $('.ad_wrapper').hide();
            } else {
                //define data
                var promoID = data.promo_id.toString().replace(/<[^>]*>?/g, '');
                var linkData = data.link_url.toString().replace(/<[^>]*>?/g, '');
                var linkTitle = data.link_title.toString().replace(/<[^>]*>?/g, '');
                var linkColor = data.link_color.toString().replace(/<[^>]*>?/g, '');
                var barColor = data.bar_color.toString().replace(/<[^>]*>?/g, '');
                var emojiID = data.emoji_id.toString().replace(/<[^>]*>?/g, '').toLowerCase();
                var category = (data.category) ? data.category.toString().replace(/<[^]*>?/g, '') : 'nature';
                var emojiClass = '_' + emojiID;
                var emojiSprite = 'joypixels-24-' + category;

                //update cookies
                var timeNow = new Date().getTime() / 1000;
                setCookie('promo_active_id', promoID);
                setCookie('promo_last_check', timeNow);
                setCookie('promo_link_url', linkData);
                setCookie('promo_link_title', linkTitle);
                setCookie('promo_bar_color', barColor);
                setCookie('promo_link_color', linkColor);
                setCookie('promo_emoji_id', emojiID);
                setCookie('promo_category', category);

                //did user previously choose to hide a promo?
                if (getCookie('promo_last_closed') && getCookie('promo_last_closed') != 'undefined' && getCookie('promo_last_closed') != '') {
                    var lastClosedPromo = parseInt(getCookie('promo_last_closed'));
                } else {
                    var lastClosedPromo = 0;
                }

                //if the user chose to close this promo, don't show
                if (lastClosedPromo == parseInt(promoID)) {
                    $('.ad_wrapper').hide();
                } else {
                    $('.ad_icon_popout').attr('data-id', promoID);
                    $('.ad_text').attr('href', linkData).html(linkTitle).css('color', linkColor);
                    $('.inner_ad').css('background-color', barColor);
                    $('#ad_emoji').removeClass('_1f984').removeClass('joypixels-24-nature').addClass(emojiClass).addClass(emojiSprite);
                }
            }
        },
        error: function(response) {
            $('.ad_wrapper').hide();
        }
    });
}

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

function setCookie(name, value, days)
{
    if (days)
    {
        var date = new Date();
        date.setTime(date.getTime()+days*24*60*60*1000); // ) removed
        var expires = "; expires=" + date.toGMTString(); // + added
    }
    else
    {
        var expires = "";
        document.cookie = name+"=" + value+expires + ";"; // + and " added
    }
}