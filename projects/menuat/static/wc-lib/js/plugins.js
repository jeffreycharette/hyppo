/* serialize form to json object */
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

/* basic notifier */
(function($) {
  $.fn.notify = function(options, callback) {
	
		var opts = $.extend({}, $.fn.notify.defaults, options);
		
    return this.each(function() {
			$(this).find('.noty_text').text(opts.message);
			$(this).addClass('noty_'+opts.type).animate({top:'0'},'fast').delay(opts.delay).animate({top:'-40px'},'slow', function() {
				if (typeof callback == 'function') { // make sure the callback is a function
					callback.call(this); // brings the scope to the callback
				}
			});
			$(this).click(onClick);
    });
		
		// events
		function onClick() {
      		$(this).stop().animate({top:'-40px'},'fast', function() {
				if (typeof callback == 'function') { // make sure the callback is a function
					callback.call(this); // brings the scope to the callback
				}
			});
      return false;
    }
  }

	// defaults
	/*
		{
			message: "your message", 
			type: "alert | error | information | success"
		}
	*/
	$.fn.notify.defaults = {message: "Success", type: "success", delay: 4000};
	
})(jQuery);