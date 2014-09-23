$(document).ready(function() {
	/* hide blank prices */
	$('body').bind('queryDone', function() {
		$('.price .amount').filter(function () {
	    	return $(this).text() == '-';
			}).parent().css('visibility', 'hidden');
	});
	
	var min = $('#minutes').text();
	/*$('#bg-slideshow').cycle({
		timeout: (1000 * 60) * min
	});
		$(".navbar").hide();
		var i = null;
		$("body").mousemove(function(e) {
			var mX = e.pageX;
			var mY = e.pageY;
		    clearTimeout(i);
		    $(".navbar").slideDown('fast');
		    i = setTimeout('$(".navbar").fadeOut("slow");', 4000);
		}).mouseleave(function() {
		    clearTimeout(i);
		    $(".navbar").slideUp('fast');  
		});*/
});