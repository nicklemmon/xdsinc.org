$(document).ready(function() {
  $('.MenuOpen').click(function() { // after the user click the menu hamburger icon...
    $('.MainNavigation')
      .toggleClass('open')
      .attr('aria-expanded', function (i, attr) {
        return attr == 'true' ? 'false' : 'true'
      });
  });

  $('.Accordion-header').click( function() {
    $accordionHeader = $(this);
    $accordionContent = $(this).next('.Accordion-content');

    if ( $accordionContent.hasClass('is-collapsed')) {
      $accordionContent
        .slideDown(700)
        .removeClass('is-collapsed')
        .addClass('is-expanded');

      $accordionHeader
        .removeClass('is-collapsed')
        .addClass('is-expanded')
        .attr('aria-expanded', 'true');
    }
    else {
      $accordionContent
        .slideUp( 700)
        .removeClass('is-expanded')
        .addClass('is-collapsed');

      $accordionHeader
        .removeClass('is-expanded')
        .addClass('is-collapsed')
        .attr('aria-expanded', 'false');
    }
  });

  const $donateModal = $('#donate-modal');

  if ($($donateModal).length) {
    setTimeout(function() {
      $($donateModal).modal({ fadeDuration: 250 });
    }, 1000);
  }
});
