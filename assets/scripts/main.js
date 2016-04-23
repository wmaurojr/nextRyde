/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {
        // JavaScript to be fired on all pages

        // Fire jQuery mmenu
        $(".nav-primary").mmenu({
      }, {
         // configuration
         offCanvas: {
            pageSelector: "#mmenu-wrapper"
         }
      });

        // Toggle Menu Icon 

        $('#navToggle').on('click', function(){
          var $navToggle = $('#navToggle');
          var $ifa = $(this).find('i.fa');
          
          $ifa.toggleClass('fa-bars fa-times');

        });

      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page

        $('.allwayround').borderContinuous(0.8, "1px", "onhover", "white"); 

        // set variable for spectrum time
        var time = 500;

        function spectrum() {  
          var colors = Array('#007e87', '#ded000', '#d1451d');
          var color = colors[Math.floor(Math.random()*colors.length)];  
          $('.dynamicBorder').find('.border-continuous').children().animate({
                backgroundColor: color
            }, time);
           
        }

        setInterval(spectrum, time);

        setInterval(function () {
        textSlider();
    }, 6500);
  
    function textSlider(){

      var $width = $('.sliderBody').width();
      var $body = $('body');
      
      $('.sliderBody ul li').css('width', $width);
      
      $('.slider-ul').animate({
        left: -$width
      }, 1500, function(){
        $('.slider-ul li:last').after($('.slider-ul li:first'));
        $('.slider-ul').css('left', '0');

        var $width = $('.sliderBody').width();
        
    });
  };


        


      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    // About us page, note the change from about-us to about_us.
    'about_us': {
      init: function() {
        // JavaScript to be fired on the about us page
      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
