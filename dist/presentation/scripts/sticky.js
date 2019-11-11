"use strict";
function setupSticky() {
    var sideMenu = $('.side-menu');
    var sandBox = $('.sandbox-area');
    var footer = $('footer');
    var margin = 0;
    var offtop1 = sideMenu.offset().top;
    var offtop2 = sandBox.offset().top;
    var offbtm = footer.offset().top - sandBox.height();
    $(window).scroll(x => {
        var scroll = $(window).scrollTop();
        handleSideMenu(scroll);
        handleSandBox(scroll);
    });
    sandBox.css('top', offbtm);
    function handleSideMenu(scroll) {
        if (scroll > offtop1 && sideMenu.hasClass('natural')) {
            sideMenu.removeClass('natural').addClass('fixed').css('top', 0);
        }
        if (offtop1 > scroll && sideMenu.hasClass('fixed')) {
            sideMenu.removeClass('fixed').addClass('natural').css('top', 'auto');
        }
    }
    function handleSandBox(scroll) {
        if (scroll > offtop2 && sandBox.hasClass('natural-sb')) {
            sandBox.removeClass('natural-sb').addClass('fixed-sb').css('top', 0);
        }
        if (offtop2 > scroll && sandBox.hasClass('fixed-sb')) {
            sandBox.removeClass('fixed-sb').addClass('natural-sb').css('top', 'auto');
        }
        if (scroll > offbtm && sandBox.hasClass('fixed-sb')) {
            sandBox.removeClass('fixed-sb').addClass('bottom-sb').css('top', offbtm);
        }
        if (offbtm > scroll && sandBox.hasClass('bottom-sb')) {
            sandBox.removeClass('bottom-sb').addClass('fixed-sb').css('top', 0);
        }
    }
}
