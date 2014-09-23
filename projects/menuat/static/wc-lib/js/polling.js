if (window.EventSource) {
  var dataId = '',
		opts = {};
	var source = new EventSource("/menuat/_changes?feed=eventsource&limit=2&descending=true"),
  sourceListener = function(e) {
  	var data = JSON.parse(e.data);
		if (data.id.charAt(0) !== '_' && data.id.indexOf('/') == -1) {
			if ( ( hash.indexOf("menu") > -1 || hash.indexOf("screen") > -1 ) && data.id == property ) {
				checkSave(hash);
			}
			dataId = $('#'+data.id);
			if (dataId.length > 0) {
				if (data.deleted) {
					dataId.fadeOut();
				}
				else {
					opts["elem"] = dataId.parent();
					opts["query"] = $.parseJSON(opts.elem.attr('data-json'));
					opts.req = ( $('.wc_editable:first').length > 0 ) ? "/queryedit" : "/query";
					opts.query["keys"] = JSON.stringify(opts.query["keys"]);
					opts.query["_"] = +new Date().getTime();
					query(opts);
					if (property === 'staugamp') {
						$('.message, #lean_overlay:first').show();
						$('.message').addClass('animated bounceInDown');
						setTimeout(function() {
							$('.message, #lean_overlay').fadeOut();
							$('.message').removeClass('animated bounceInDown');
							}, duration);
					}
				}
			}
		}
  };

	// start listening for events
	source.addEventListener('message', sourceListener , false);
}
else {
	if ( hash.indexOf("menu") > -1 || hash.indexOf("screen") > -1 ) {
		if (typeof $.urlParam("random") !== "string") {
			timeout = 10000;
		}
		setInterval(function() {
			checkSave(hash);
		}, timeout);
	}
}
if (hash.indexOf("menu2") > -1 && property === 'pulp') {
	$('body').bind('queryDone', function() {
		$('.coffee, .tea, .frozenyogurt, .breakfast, .kombucha, .organicbeer, .organicwine, .freshpremiumjuices, .supersmoothies, .freshjuiceshots, .freshpremiumjuices, .extras').hide();
	});
}
else if (hash.indexOf("menu3") > -1 && property === 'pulp') {
	$('body').bind('queryDone', function() {
		$('.coffee, .tea, .frozenyogurt, .breakfast, .kombucha, .organicbeer, .organicwine, .smoothies, .logo').hide();
	});
}
else if (hash.indexOf("menu1") > -1 && property === 'pulp') {
	$('body').bind('queryDone', function() {
		$('.smoothies, .logo, .freshpremiumjuices, .smoothies, .supersmoothies, .freshjuiceshots, .freshpremiumjuices, .extras').hide();
	});
}
if ( hash.indexOf("menu1") > -1  || hash.indexOf("screen") > -1 ) {
	if (property === 'staugamp') {
		$('body').bind('queryDone', function() {
			$('.message, #lean_overlay').hide();
		});
	}
	setTimeout(function() {
		window.scrollTo(0, 0);
	}, 1000);
}
else if ( hash.indexOf("menu2") > -1 ) {
	setTimeout(function() {
		var pos = parseInt($('#position').text());
		window.scrollTo(pos, 0);
	}, 1000);
}
else if ( hash.indexOf("menu3") > -1 ) {
	setTimeout(function() {
		var pos = parseInt($('#position').text());
		window.scrollTo(pos * 2, 0);
	}, 1000);
}
else if ( hash.indexOf("menu4") > -1 ) {
	setTimeout(function() {
		var pos = parseInt($('#position').text());
		window.scrollTo((pos * 3)+5, 0);
	}, 1000);
}

var checkSave = function(hash) {
	//var h = new Date().getHours();
	//if (h >= 6) {
		$.getJSON('/menuat/' + property + 'poll', function(doc) {
			if (typeof $.urlParam("random") !== "string") {
				window.location = '/' + property + '?random=' + random1 + urlVars + '#' + hash;
			}
			if(doc[hash] === 1) {
				$.ajax({
			    url: '/_update/poll/' + property + 'poll',
					type: 'POST',
					data: JSON.parse('{"'+hash+'": 0}'),
					success: function (data) {
						window.location = '/' + property + '?random=' + random1 + urlVars + '#' + hash;
			    },
			    error: function(status) {
						if (status.statusText == 'Conflict') {
							setTimeout(function() {
								$.ajax({
							    url: '/_update/poll/' + property + 'poll',
									type: 'POST',
									data: JSON.parse('{"'+hash+'": 0}'),
									success: function (data) {
										window.location = '/' + property + '?random=' + random1 + urlVars + '#' + hash;
							    },
							    error: function(status) {
							    }
								});
							}, randomIntFromInterval(1000,5000));
						}
			    }
				});
			}
		}).error(function() {
			//window.location = 'http://menuat.com/' + property + '#' + hash;
		});
	//}
}
function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}