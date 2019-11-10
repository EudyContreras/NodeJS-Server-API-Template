

$('.menu-item').click(function(){
 
  const subMenu = $(this).next('.sub-menu');
  const expanded = subMenu.hasClass('sm-expanded');

  if (expanded) {
    collapse(this, subMenu)
  } else {
    expand(this, subMenu)
  }
});

function expand(source, subMenu) {
  $(source).addClass('active');
  
  subMenu.css({
    height: 'auto',
    position: 'absolute', 
    visibility: 'hidden',
  });

  const height = subMenu.height();

  subMenu.css({
    height: '0px',
    position: 'relative', 
    visibility: 'visible',
  });

  subMenu.addClass('sm-expanded');

  setTimeout(()=>{
    subMenu.css({ height: height });
  }, 20);
}

function collapse(source, subMenu) {
  $(source).removeClass('active');
  
  subMenu.css({ height: 0 });
  setTimeout(() => {
    subMenu.removeClass('sm-expanded');
  },250);

  // console.log('collapsing')
  // subMenu.animate({ height: '0px'}, 300, "linear", function() {
  //   subMenu.removeClass('sm-expanded');
  //   console.log('collapsed')
  //   subMenu.css({
  //     display: 'none',
  //     position: 'relative', 
  //     visibility: 'visinible',
  //     heigth: height
  //   });
  //});
}