$(document).ready(function ($) {
	/*var height = $(window).height();
	$('.section, #map, .menu, #section1 .container-fluid').css({
		'height': height
	});
	$(window).resize(function () {
		var navActive = $('#nav .active');
	    waitForFinalEvent(function() {
				height = $(window).height();
				if (height > 600) {
		      $('.section, #map, .menu, #section1 .container-fluid').css({
						'height': height 
					});
					setTimeout(function() {
						navActive.click();
					}, 500);
				}
	    }, 500, "kookaburra");
	});*/
	
	var $jcarousel = $('#section6').jcarousel({ 
    wrap: 'circular',
    list: '.jcarousel-list'
  });
  var $jcarouselNext= $('.jcarousel-control-next').jcarouselControl({ target: '+=1', carousel: $jcarousel });
  var $jcarouselPrev= $('.jcarousel-control-prev').jcarouselControl({ target: '-=1', carousel: $jcarousel });

	setTimeout(function() {
		var $jcarousel2 = $('#section3').jcarousel({ 
	    wrap: 'circular',
	    list: '.jcarousel-list2'
	  });
	  var $jcarouselNext2= $('.jcarousel-control-next2').jcarouselControl({ target: '+=1', carousel: $jcarousel2 });
	  var $jcarouselPrev2= $('.jcarousel-control-prev2').jcarouselControl({ target: '-=1', carousel: $jcarousel2 });
		$jcarousel2.swipe( {
			//Generic swipe handler for all directions
			swipeLeft:function(event, direction, distance, duration, fingerCount) {
				$jcarousel2.jcarousel('scroll', '+=1'); 
			},
			swipeRight:function(event, direction, distance, duration, fingerCount) {
				$jcarousel2.jcarousel('scroll', '-=1'); 
			},
			//Default is 75px, set to 0 for demo so any distance triggers swipe
			threshold:0
	   });
	}, 500);
	$jcarousel.swipe( {
		//Generic swipe handler for all directions
		swipeLeft:function(event, direction, distance, duration, fingerCount) {
			$jcarousel.jcarousel('scroll', '+=1'); 
		},
		swipeRight:function(event, direction, distance, duration, fingerCount) {
			$jcarousel.jcarousel('scroll', '-=1'); 
		},
		//Default is 75px, set to 0 for demo so any distance triggers swipe
		threshold:0
   });

	if ("ontouchstart" in document.documentElement){
	$('#section2').addClass('touch');
	}
  
    // Sidebar Toggle
    
    $('.btn-navbar').click( function() {
	    $('html').toggleClass('expanded');
    });
    
	
	$('#section4 .article-tags li').on('click', function () {
	    
	    var section = $(this).parents('.span4');
	    var category = $(this).attr('data-blog');
	    var articles = section.siblings();
	    
	    // Change Tab BG's
	    $(this).siblings('.current').removeClass('current');
	    $(this).addClass('current');
		
		// Hide/Show other articles
	    section.siblings('.current').removeClass('current').hide();
	    
    	$(articles).each(function (index) {
	    	
	    	var newCategory = $(this).attr('data-blog');
	    	
	    	if ( newCategory == category ) {
		    	$(this).slideDown('1000', "easeInQuart").addClass('current');
	    	}
	    });

	});
	
	
		
	// Waypoints Scrolling
	
	var links = $('.navigation').find('li');
	var button = $('.intro button');
    var section = $('section');
    var mywindow = $(window);
    var htmlbody = $('html,body');

    
    section.waypoint(function (direction) {

        var datasection = $(this).attr('data-section');

        if (direction === 'down') {
            $('.navigation li[data-section="' + datasection + '"]').addClass('active').siblings().removeClass('active');
        }
        else {
        	var newsection = parseInt(datasection) - 1;
            $('.navigation li[data-section="' + newsection + '"]').addClass('active').siblings().removeClass('active');
        }

    });
    
    mywindow.scroll(function () {
        if (mywindow.scrollTop() == 0) {
            $('.navigation li[data-section="1"]').addClass('active');
            $('.navigation li[data-section="2"]').removeClass('active');
        }
    });
    
    function goToByScroll(datasection) {
        
        if (datasection == 1) {
	        htmlbody.animate({
	            scrollTop: $('.section[data-section="' + datasection + '"]').offset().top
	        }, 500, 'easeOutQuart');
        }
        else {
	        htmlbody.animate({
	            scrollTop: $('.section[data-section="' + datasection + '"]').offset().top
	        }, 500, 'easeOutQuart');
        }
        
    }

    links.click(function (e) {
        var datasection = $(this).attr('data-section');
        goToByScroll(datasection);
    });
    
    button.click(function (e) {
        e.preventDefault();
        var datasection = $(this).attr('data-section');
        goToByScroll(datasection);
    });
  
    // Snap to scroll (optional)
    
    /*

    section.waypoint(function (direction) {

        var nextpos = $(this).attr('data-section');
        var prevpos = $(this).prev().attr('data-section');

        if (nextpos != 1) {
	        if (direction === 'down') {
	            htmlbody.animate({
		            scrollTop: $('.section[data-section="' + nextpos + '"]').offset().top
		        }, 750, 'easeOutQuad');
	        }
	        else {
	            htmlbody.animate({
		            scrollTop: $('.section[data-section="' + prevpos + '"]').offset().top
		        }, 750, 'easeOutQuad');
	        }
        }
        

    }, { offset: '60%' });	
    
    */
   
       
    
    
    // Redirect external links
	
	$("a[rel='external']").click(function(){
		this.target = "_blank";
	}); 	
	
	
	// Modernizr SVG backup
	
	if(!Modernizr.svg) {
	    $('img[src*="svg"]').attr('src', function() {
	        return $(this).attr('src').replace('.svg', '.png');
	    });
	}    
	    
    

    
    


});


var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();