$( document ).ready(function() {
  $('.MenuOpen').click(function() { // after the user click the menu hamburger icon...
    $('.MainNavigation')
      .toggleClass('open')
      .attr('aria-expanded', function (i, attr) {
        return attr == 'true' ? 'false' : 'true'
      });
  });

  $('.Accordion-header').click(function() {
    $accordionHeader = $(this);
    $accordionContent = $(this).next('.Accordion-content');

    if ($accordionContent.hasClass('is-collapsed')) {
      $accordionContent.slideDown(700);
      $accordionContent.toggleClass('is-expanded is-collapsed');
      $accordionHeader.toggleClass('is-expanded is-collapsed');
    }
    else {
      $accordionContent.slideUp(700);
      $accordionContent.toggleClass('is-expanded is-collapsed');
      $accordionHeader.toggleClass('is-expanded is-collapsed');
    }
  });
});
