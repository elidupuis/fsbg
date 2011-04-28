/*!
 * jQuery fsbg plugin
 * Copyright (c) Eli Dupuis
 * Version: 0.1
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL (http://creativecommons.org/licenses/GPL/2.0/) licenses.
 * Requires: jQuery v1.4.2 or later?
 * Based on Fullscreenr by Jan Schneiders (www.nanotux.com) and Backstrech by Scott Robbin (http://srobbin.com/jquery-plugins/jquery-backstretch/)
 *	TODO:
		-add option for loading graphic to appear in top left corner? or specified corner.
		-add slideshow functionality (and next/back functionality)
		-add option to specify how to handle portrait images. (fill browser or letterbox the image)
*/

(function($) {
  
  var internals = {
    resize: function(theImg){
      var w = theImg.width(),
          h = theImg.height(),
          ratio = h / w,
          browserwidth = $(window).width(), 
          browserheight = $(window).height();

      // Scale the image
      if ( (browserheight/browserwidth) > ratio ) {
        theImg.height(browserheight).width(browserheight / ratio);
      } else {
        theImg.width(browserwidth).height(browserwidth * ratio);
      }
      
      // center the image
      theImg.css({
        left: (browserwidth - theImg.width())/2,
        top: (browserheight - theImg.height())/2
      });
    }
  };
  
  var methods = {
    init: function( options ) {
  		var $body = $('body'),
  		    opts = $.extend({}, $.fsbg.defaults, options),
          data = $body.data('fsbg');

      // If the plugin hasn't been initialized yet
      if ( ! data ) {
        
        if (opts.image === null) {
      		if(window.console) window.console.info("[jquery.fsbg] You must specify an image path in the options to continue.");
      		return;
      	};
        
        //	wrap body content so we can z-index above image
      	$body.wrapInner( $('<div/>', {
        	  id: opts.wrapID,
        	  css: {
        	    position: 'relative',
        	    zIndex: 2
        	  }
        	})
        );
        
        var $fsbg = $('<div/>', {
      	  id: opts.bgID,
      	  css:{
      	    position: 'fixed',
            zIndex: 1,
            top: 0,
            left: 0
      	  }
      	}).prependTo($body).append(
      	  $('<img/>', {
        		src: opts.image,
        		css: {
        		  position: 'absolute'
        		},
        		load: function(){
        			$(this).fadeIn(); //fadeIn();
              internals.resize( $(this) );
        		}
        	}).hide()
      	);

      	//	event handlers
        $(window).bind("resize.fsbg", function() {
         internals.resize( $fsbg.children('img') );
        });
        

        //  attach
        $body.data('fsbg', {
          opts: opts
        });

      };
      return this;  // For chaining
    },
    update: function() {
      if(window.console) window.console.log('update called.');
    }
  };

  // main plugin declaration:
  $.fsbg = function( method ) {
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.fsbg' );
    };
  };

  //	defaults
  $.fsbg.defaults = {
    image: null,
  	wrapID: 'fsbgBodyWrap',
    bgID: 'fsbg'
  };

})(jQuery);