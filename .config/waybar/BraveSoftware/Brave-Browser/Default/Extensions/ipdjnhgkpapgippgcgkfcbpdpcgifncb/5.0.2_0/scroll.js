$('*').scroll(function() {
    determineActiveCategoryFilter();
});

var determineActiveCategoryFilter = function () {
    //var scrollOffset = $('.inner-container')[0].getBoundingClientRect().top;

    $('.filters').find('a').each(function() {
        //first remove the active state from this filter
        $(this).removeClass('active');

        var slug = $(this).attr('href').split('#')[1];
        var categoryTop = $('.' + slug).offset().top;
        var height = $('.' + slug).height();

        if (categoryTop <  100 && categoryTop > -1 * (height - 100)) {
            $('.icon-' + slug).parent().addClass('active');
        }
    });
};