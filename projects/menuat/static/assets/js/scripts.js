$(document).ready( function() {
	$.pnotify.defaults.history = false;
	$('.contact-form').ajaxForm({
		delegation: true,
		success: function() {
			$.pnotify({
			    title: 'Thank you',
			    text: 'We received your request and will get back with you within 24 hours.',
					type: 'success',
					delay: 3000,
			    after_open: function(pnotify) {
			    	$('.contact-form').clearForm();
			    }
			});
		},
		error: function() {
			$.pnotify({
			    title: 'Oops, we need more info!',
			    text: 'Check that all fields are filled in.',
					type: 'error',
					delay: 3000
			});
		}
	});
});