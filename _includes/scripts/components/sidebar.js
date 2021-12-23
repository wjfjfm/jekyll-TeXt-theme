(function() {
  var SOURCES = window.TEXT_VARIABLES.sources;

  window.Lazyload.js(SOURCES.jquery, function() {
    var $pageMask = $('.js-page-mask');
    var $pageRoot = $('.js-page-root');
    var $sidebarShow = $('.js-sidebar-show');
    var $sidebarHide = $('.js-sidebar-hide');

    function freeze(e) {
      if (e.target === $pageMask[0]) {
        e.preventDefault();
      }
    }
    function stopBodyScrolling(bool) {
      if (bool === true) {
        window.addEventListener('touchmove', freeze, { passive: false });
      } else {
        window.removeEventListener('touchmove', freeze, { passive: false });
      }
    }

    $sidebarShow.on('click', function() {
      stopBodyScrolling(true); $pageRoot.addClass('show-sidebar');
    });
    $sidebarHide.on('click', function() {
      stopBodyScrolling(false); $pageRoot.removeClass('show-sidebar');
    });

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


