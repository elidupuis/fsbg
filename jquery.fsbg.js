/*!
 * jQuery fsbg plugin
 * Copyright (c) 2010 Eli Dupuis
 * Version: 0.2
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL (http://creativecommons.org/licenses/GPL/2.0/) licenses.
 * Requires: jQuery v1.4.2 or later
 * Based on Fullscreenr by Jan Schneiders (www.nanotux.com)
 *	TODO:
    -fade image in. options for different effects?
		-add option for loading graphic to appear in top left corner? or specified corner.
		-add slideshow functionality (and next/back functionality)
		-add option to specify how to handle portrait images. (fill browser or letterbox the image)

*/
(function($) {

  var internals = {
    resize: function(theImg){
      var w = theImg.width(),
          h = theImg.height();

      // Set bg size
      var ratio = h / w,
      // Get browser window size
          browserwidth = $(window).width(), 
          browserheight = $(window).height();
      // Scale the image
      if ( (browserheight/browserwidth) > ratio ) {
        theImg.height(browserheight).width(browserheight / ratio);
      } else {
        theImg.width(browserwidth).height(browserwidth * ratio);
      }
      // Center the image
      theImg.css('left', (browserwidth - theImg.width())/2).css('top', (browserheight - theImg.height())/2);
    }
  };

  var methods = {
    init: function( options ) {
      // iterate and reformat each matched element
    	return this.each(function() {
    		var $this = $(this),
    		    opts = $.extend({}, $.fn.fsbg.defaults, options),
            data = $this.data('fsbg');

        // If the plugin hasn't been initialized yet
        if ( ! data ) {
          
        	var context = $this;
          
          if(window.console) window.console.log(context);

        	if (opts.image === null) {
        		if(window.console) window.console.info("[jquery.fsbg] You must specify an image path in the options to continue.");
        		return;
        	};

        	//	wrap body content so we can z-index above image
        	context.wrapInner($('<div/>').attr({ id: opts.wrapID }));

        	var theImg = $('<img/>', {
        		src: opts.image,
        		id: opts.bgID,
        		load: function(){
        			$(this).hide().appendTo(context).show(); //fadeIn();
              internals.resize( $(this) );
        		}
        	});

        	//	event handlers
          $(window).bind("resize.fsbg", function() {
           internals.resize( theImg );
          });
        	

          //  attach
          $(this).data('fsbg', {
            target: $this,
            bg: theImg,
            opts: opts
          });

        };
      });
    },
    update: function() {
      // each method must loop through all selected elements and return 'this'.
      return this.each(function() {
        if(window.console) window.console.log('update called.');
      });
    },
    destroy: function() {
      // each method must loop through all selected elements and return 'this'.
      return this.each(function() {
        if(window.console) window.console.log('destroy called.');
      });
    }
  };

  // main plugin declaration:
  $.fn.fsbg = function( method ) {
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.fsbg' );
    };
  };

  //	defaults
  $.fn.fsbg.defaults = {
  	image: null,
  	wrapID: 'fullbgBodyWrap',
    bgID: 'fullbgImg'
  };

  // $.fn.fsbg.publicfunc = function() { return "jquery.fsbg public function."; };

})(jQuery);