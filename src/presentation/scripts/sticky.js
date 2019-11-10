
function setupSticky() {

   var sideMenu = $('.side-menu');
   var sandBox = $('.sandbox-area');
   var footer = $('footer');

   var margin = 0;

   var offtop = sideMenu.offset().top - margin;
   var offbtm = footer.offset().top - (margin + sideMenu.height());

   $(window).scroll(function () {
      var scroll = $(window).scrollTop();
      handleSideMenu(scroll);
      handleSandBox(scroll);
   });

   function handleSideMenu(scroll) {
      if (scroll > offtop && sideMenu.hasClass('natural')) {
         sideMenu.removeClass('natural').addClass('fixed').css('top', margin);
      }
      if (offtop > scroll && sideMenu.hasClass('fixed')) {
         sideMenu.removeClass('fixed').addClass('natural').css('top', 'auto');
      }
   }

   function handleSandBox(scroll) {
      if (scroll > offtop && sandBox.hasClass('natural-sb')) {
         sandBox.removeClass('natural-sb').addClass('fixed-sb').css('top', margin);
      }
      if (offtop > scroll && sandBox.hasClass('fixed-sb')) {
         sandBox.removeClass('fixed-sb').addClass('natural-sb').css('top', 'auto');
      }
      if (scroll > offbtm && sandBox.hasClass('fixed-sb')) {
         sandBox.removeClass('fixed-sb').addClass('bottom-sb').css('top', offbtm + margin);
      }
      if (offbtm > scroll && sandBox.hasClass('bottom-sb')) {
         sandBox.removeClass('bottom-sb').addClass('fixed-sb').css('top', margin);
      }
   }
}