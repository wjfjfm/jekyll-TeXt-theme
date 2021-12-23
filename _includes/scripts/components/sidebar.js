(function() {
  var SOURCES = window.TEXT_VARIABLES.sources;

  window.Lazyload.js(SOURCES.jquery, function() {
    var toc     = $('.toc-link'),
        sidebar = $('#sidebar'),
        main    = $('#main'),
        menu    = $('#menu'),
        posttoc = $('#post-toc-menu'),
        x1, y1;

    // Tags Filter
      $('#sidebar-tags').on('click', '.sidebar-tag', function() {
        var filter = $(this).data('filter');
        toc.hide();
        if (filter === 'recent') {
          toc.slice(0, {{ site.recent_num }}).fadeIn(350);
        } else {
          $('.toc-link[data-tags~=' + filter + ']').fadeIn(350);
        }
        $(this).addClass('active').siblings().removeClass('active');
      });
      // Only show recent
      toc.hide();
      toc.slice(0, {{ site.recent_num }}).fadeIn(350);

      // Menu
      menu.on('click', function() {
        $(this).add(sidebar).add(menu).add(main).toggleClass('open');
      });

      // right toc
      posttoc.on('click', function() {
        $('#post-toc').toggleClass('open');
      });
  });

})();


