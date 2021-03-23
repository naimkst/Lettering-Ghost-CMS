// ================================
// Theme Options
// ================================
if (typeof themeConfig == "undefined") {
  themeConfig = {};
}

var ghosthunter_key = themeConfig.ghostSearchKey;
(function ($) {
    "use strict";
// =====================
// Koenig Gallery
// =====================
  var gallery_images = document.querySelectorAll('.kg-gallery-image img');
  gallery_images.forEach(function (image) {
    var container = image.closest('.kg-gallery-image');
    var width = image.attributes.width.value;
    var height = image.attributes.height.value;
    var ratio = width / height;
    container.style.flex = ratio + ' 1 0%';
  });
  
  // =====================
  // owl-carousel
  // =====================	
  
    if ('.banner-slider'.length > 0) {
        $(".banner-slider").owlCarousel({
            autoplay: true,
            dots: false,
            nav: true,
            loop: true,
            margin: 30,
            lazyLoad: true,
            center: true,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 1
                },
                1200: {
                    items: 1
                }
            }
        });
    }

	
	
  // =====================
  // Decode HTML entities returned by Ghost translations
  // =====================

  function decoding_translation_chars(string) {
    return $('<textarea/>').html(string).text();
  } 
  // =====================
  // Ajax Load More
  // =====================

  var pagination_next_url = $('link[rel=next]').attr('href'),
    $load_posts_button = $('.js-load-posts');

  $load_posts_button.click(function(e) {
    e.preventDefault();

    var request_next_link =
      pagination_next_url.split(/page/)[0] +
      'page/' +
      pagination_next_page_number +
      '/';

    $.ajax({
      url: request_next_link,
      beforeSend: function() {
        $load_posts_button.text(decoding_translation_chars(pagination_loading_text));
        $load_posts_button.addClass('c-btn--loading');
      }
    }).done(function(data) {
      var posts = $('.infinite-post', data);
      $('.infinite-scroll').append(posts); 

      $load_posts_button.text(decoding_translation_chars(pagination_more_posts_text));
      $load_posts_button.removeClass('c-btn--loading');

      pagination_next_page_number++;

      // If you are on the last pagination page, hide the load more button
      if (pagination_next_page_number > pagination_available_pages_number) {
        $load_posts_button.addClass('c-btn--disabled').attr('disabled', true);
      }
    });
  });
  
  // =====================
  // Slim Menu
  // =====================

    if ('#main-menu'.length > 0) {
        $('#main-menu').slimmenu({
            resizeWidth: '991',
            collapserTitle: '',
            animSpeed: 'medium',
            indentChildren: true
        });
    }

  // =====================
  // Scroll Up
  // =====================
    jQuery.scrollUp({
        scrollName: 'scrollUp', // Element ID
        topDistance: '300', // Distance from top before showing element (px)
        topSpeed: 8000, // Speed back to top (ms)
        animation: 'fade', // Fade, slide, none
        animationInSpeed: 2000, // Animation in speed (ms)
        animationOutSpeed: 2000, // Animation out speed (ms)
        scrollText: '<i class="fa fa-angle-up" aria-hidden="true"></i></br>Back to top', // Text for element
        activeOverlay: false // Set CSS color to display scrollUp active point, e.g '#00FFFF'
    });

  // =====================
  // AOS
  // =====================
    AOS.init({
        offset: 120,
        delay: 0,
        duration: 400,
        easing: 'ease',
        once: true,
        mirror: false,
        anchorPlacement: 'top-bottom'

    });
    $(window).on('load', function () {

  // =====================
  // Preloader
  // =====================
        var preLoder = $(".overlay-loader");
        preLoder.fadeOut(1000);
    });
  // =====================
  // fitvids
  // =====================	
	$(".entry-content").fitVids();
 
// ================================
// Search
// ================================
 
  var searchHint = '';
  if (typeof themeConfig.searchHint !== 'undefined' && themeConfig.searchHint != '') {
    $('#gh-search-input').attr('placeholder', themeConfig.searchHint);
  }

  var includeBodyInSearch = false;
  if (typeof themeConfig.includeBodyInSearch !== 'undefined' && themeConfig.includeBodyInSearch != '' && typeof themeConfig.includeBodyInSearch === "boolean") {
    includeBodyInSearch = themeConfig.includeBodyInSearch;
  }

  var searchField = $('#gh-search-input').ghostHunter({
    results: '#gh-search-results',
    onKeyUp: true,
    displaySearchInfo: false,
    zeroResultsInfo: true,
    includebodysearch: includeBodyInSearch,
    result_template: "<a id='gh-id-{{ref}}' class='gh-search-item' href='{{link}}'><h2 class='search-post-title'>{{title}}</h2> </a>",
    onComplete: function(results) {
      $('#gh-search-results').fadeIn();
    }
  });
  $(document).keyup(function(e) {
    if (e.keyCode === 27) {
      searchField.clear();
      $('#gh-search-input').val('').blur();
      $('#gh-search-results').fadeOut();
	  
    }
  });
  

})(jQuery);