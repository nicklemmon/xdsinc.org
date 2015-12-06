$( document ).ready(function() {

    $(".submit").click(function() { /* moves .results from the right after the user selects their county of residence */
        $(".results").css('left', '60%');
        $(".results").show();
    });
    
    $(window).resize(function() {
        
        if( $(this).width() < 768 ) { /* if the browser/device width is less than 768px, then change the animation of .results when the user selects their county of residence */

            $(".submit").click(function() {
                $(".results").css('margin-top', '180px');
                $(".results").show();
            });

        };

        /*else {

            $(".submit").click(function() {
                $(".results").css('left', '60%');
                $(".results").show();   
            });

        };*/

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
    
});