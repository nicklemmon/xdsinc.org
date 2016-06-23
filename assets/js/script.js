$( document ).ready(function() {

  $('.MenuOpen').click(function() { // after the user click the menu hamburger icon...
    $('.MainNavigation').toggleClass('open'); // toggle the navigation menu when clicking the menu icon
  });

    $('a[href*=#]:not([href=#])').click(function() { /* smooth scrolling function from https://css-tricks.com/snippets/jquery/smooth-scrolling/ */
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 700);
        return false;
      }
    }
  });

  var windowWidth = $(window).width();
  if(windowWidth > 700){
    var biggestHeight = "0";
    // Loop through elements children to find & set the biggest height
    $(".Section--media *").each(function(){
     // If this elements height is bigger than the biggestHeight
     if ($(this).height() > biggestHeight ) {
       // Set the biggestHeight to this Height
       biggestHeight = $(this).height();
     }
    });
    // Set the container height
    $(".Section--media").height(biggestHeight);
  }

  $('.Accordion-header').click(function() {
    $accordionHeader = $(this);
    $accordionContent = $(this).next('.Accordion-content');

    if ($accordionContent.hasClass('is-collapsed')) {
      $accordionContent.slideDown(400);
      $accordionContent.toggleClass('is-expanded is-collapsed');
      $accordionHeader.toggleClass('is-expanded is-collapsed');
    }
    else {
      $accordionContent.slideUp(400);
      $accordionContent.toggleClass('is-expanded is-collapsed');
      $accordionHeader.toggleClass('is-expanded is-collapsed');
    }
    
    
  });

    

});
