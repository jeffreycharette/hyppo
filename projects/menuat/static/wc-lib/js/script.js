/* 
	Author: wearecharette.com
*/
log = function() { return console.log.apply(console, arguments); };

$.urlParam = function(name){
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

var random1 = getRandomInt(1000, 9999),
	hash = hash || '',
	orientation = orientation || 'landscape',
	property = property || '',
	columns = parseInt(columns) || 0,
	zoom = parseInt(zoom) || 0,
	resolution = parseInt(resolution) || 1920,
	urlVars = '',
	orientURL = $.urlParam("orientation"),
	propURL = $.urlParam("property"),
	colURL = parseInt($.urlParam("columns")),
	zoomURL = parseInt($.urlParam("zoom")),
	resURL = parseInt($.urlParam("resolution"));
	
	if (orientURL) {
		orientation = orientURL;
		urlVars += '&orientation=' + orientation;
	}
	if (propURL) {
		property = propURL;
		urlVars += '&property=' + property;
	}
	if (colURL) {
		columns = colURL;
		urlVars += '&columns=' + columns;
	}
	if (zoomURL) {
		zoom = zoomURL;
		urlVars += '&zoom=' + zoom;
	}
	if (resURL) {
		resolution = resURL;
		urlVars += '&resolution=' + resolution;
	}

$(function() {
	
	//stashing global state here, should be moved to backbone eventually
	$(".navbar-form").submit(function(e) {
     e.preventDefault();
     var query = $("#search").val();
		$.ajax({
			url: '/search/tags?q=title:' + query + ' OR desc:' + query + '&include_docs=true',
			type: 'GET',
			expect_json: true,
			dataType: 'json',
			error: function (data) {
			},
			success: function (data) {
				$('.root').hide();
				$.each(data.rows, function(k, v) {
					$('#'+v.id).fadeIn();
				});
				$('.container-fluid').unhighlight();
				$('.container-fluid').highlight(query);
			}
		});
  });
	$("#search").keyup(function(){$('.container-fluid').unhighlight();$('.root').fadeIn();});
	
	/* group start to end elements with div */
	$('[class*="row_"]').each(function(i){
		if (!$(this).parent().hasClass('row')) {
			$('.'+$(this).attr('class').match(/row_[\d]+/gi).toString()).wrapAll('<div class="row"/>');
		}
	});
	$('.render .row').append('<a class="destroy"></a>');
	$('.destroy').click(function(e) {
		$(this).parent().remove();
	})
	$('.permissions').wrapAll('<div class="perm"/>');

	var id = $('#id__id').val();
	var val = $('#id_wc_type').val();
	$('#id__id').remove();
	$('#id_wc_type').closest('.field').after('<div class="field required left"><div class="form-label"><label for="id__id">url</label></div><div class="form-content"><div class="inner"><input size="30" type="text" placeholder="unique url" value="' + id + '" id="id__id" name="_id"/></div><div class="hint"></div><div class="errors"></div><div class="clear"></div></div></div>');

	/*if (val != 'page') {
		$('#id__id').prop('disabled', true);
	}
	else {
		$('#id__id').prop('disabled', false).closest('.field').addClass('required');
	}

	$('#id_wc_type').change(function(e) {
		val = $(this).val();
	
		if (val == 'page') {
			$('#id__id').prop('disabled', false).closest('.field').addClass('required');
		}
		else {
			$('#id__id').prop('disabled', true).closest('.field').removeClass('required');
		}
	});*/

	$('#id__id').change(function(e) {
		var that = $(this);
		val = that.val();
	
		db.getDoc(val, '', function (err, data) {
			if (err) {
		        that.closest('.field').removeClass('error').find('.errors').text('');
		    }
			else {
				that.focus();
				that.closest('.field').addClass('error').find('.errors').text('This url is already taken.');
			}
		});
	});

	/*$.couch.info({
	    success: function(data) {
	        console.log(data);
	    }
	});*/

	/**************** NOT SECURE ******************/
	/* session */
	$.couch.session({
	    success: function(data) {
					if (data.userCtx.name) {
						$('.wrc-user-out').show();
						$('.wrc-user-in').hide();
					}
					else {
						$('.wrc-user-in').show();
						$('.wrc-user-out').hide();
					}
	    }
	});

	$('form[name="edit"] input.save').bind("click", function(e) {
		e.stopPropagation();
		e.preventDefault();
		if ( property === 'staugamp' ) {
			$.ajax({
		    url: '/_update/poll/' + property + 'poll',
				type: 'POST',
				data: { screen1:1, screen2:1, screen3:1, screen4:1 },
				success: function (data) {
		    	$('form[name="edit"]').submit();
		    },
		    error: function(status) {
		    }
			});	
		}
		else {
			$.ajax({
		    url: '/_update/poll/' + property + 'poll',
				type: 'POST',
				data: { menu1:1, menu2:1, menu3:1, menu4:1 },
				success: function (data) {
		    	$('form[name="edit"]').submit();
		    },
		    error: function(status) {
		    }
			});
		}
	});

	/* login */

	/* open modal */
	$('.wrc-user-out').leanModal({ top : 100, closeButton: ".modal_close", ignore: "wrc-user-in" });

	$('.fieldtype').after('<a href="#fieldoptions" id="leanmodal" class="gear wrc-open-fieldoptions">options</a>');
	$('.widgettype').after('<a href="#widgetoptions" id="leanmodal" class="gear wrc-open-widgetoptions">options</a>');
	$('.wrc-open-fieldoptions').leanModal({ top : 100, closeButton: ".wrc-close-fieldoptions" });
	$('.wrc-open-widgetoptions').leanModal({ top : 100, closeButton: ".wrc-close-widgetoptions" });

	var form, scopeClass, formContent, that, isChecked, selectValue = "";
	$('.wrc-open-fieldoptions').click(function(e) {
		form = $('#fieldoptions .options');
		scopeClass = 'scope' + $('.wrc-open-fieldoptions').index(this);
		formContent = $(this).parent().find('.options_field').clone(true);
	
		form.removeClass().addClass('options ' + scopeClass).html('').append(formContent).find('.options_field').fadeIn();
	});

	$('.wrc-open-widgetoptions').click(function(e) {
		form = $('#widgetoptions .options');
		scopeClass = 'scope' + $('.wrc-open-widgetoptions').index(this);
		// get value of select
		selectValue = $(this).parent().find('[name^="widgettype_"]').val();
		formContent = $(this).parent().find('.options_widget, .options_widget_' + selectValue).clone(true);

		form.removeClass().addClass('options ' + scopeClass).html('').append(formContent).find('.options_widget, .options_widget_' + selectValue).fadeIn();
	});

	var name, idx, clone = "";
	/* add entity input */
	$('.wrc-add-input').click( function(e) {
		idx = $('.row').length + 1;
		clone = $('.row:eq(0)').clone(true);
	
		$(clone).find('input[name], select[name]').each(function(i) {
			name = $(this).attr('name');
			name = name.substring(0, name.length - 1) + idx;
			$(this).attr({"name": name});
		});
	
		$(clone).find('input[id], select[id]').each(function(i) {
			name = $(this).attr('id');
			name = name.substring(0, name.length - 1) + idx;
			$(this).attr({"id": name});
		});
	
		$(clone).find('.wrc-open-fieldoptions').leanModal({ top : 100, closeButton: ".wrc-close-fieldoptions" });
		$(clone).find('.wrc-open-widgetoptions').leanModal({ top : 100, closeButton: ".wrc-close-widgetoptions" });
		$(clone).find('input, :checked').not("select, option").val('').prop({'checked': false});
		$(clone).find('select > option:first').attr({'selected': 'selected'});
		$('.final').before(clone);
		e.preventDefault();
	});

	/*$('.wrc-open-fieldoptions').leanModal({ top : 100, closeButton: ".wrc-close-fieldoptions" });
	$('.wrc-open-widgetoptions').leanModal({ top : 100, closeButton: ".wrc-close-widgetoptions" });*/

	$('#signinform').submit(function() {
		var data = $(this).serializeObject();
		$.couch.login({
		    name: data.username,
		    password: data.password,
		    success: function(data) {
						$('.wrc-user-out').show();
						$('.wrc-user-in').hide();
						$('.modal_close').trigger('click');
						$('.noty_bar').notify({type: "success", message: "Sign in successful.  Thank you!", delay: 1000}, function() {
							window.location.reload(true);
						});
		    },
		    error: function(status) {
						$('#signin-header p').text('Try again - that didn\'t work!');
						$('.noty_bar').notify({type: "error", message: status + " Try again - that didn\'t work!"});
		    }
		});
		return false;
	});

	$('#fieldoptions').submit(function(e) {
		that = $(this);
		scope = parseInt($(this).find('.options').attr('class').replace("options", "").replace("scope", "").replace(" ", ""));
	
		$('.row:eq(' + scope + ') .options_field').each(function(i) {
			$(this).find('input').val(that.find('.options_field:eq(' + i + ') input').val());
			isChecked = !!that.find('.options_field:eq(' + i + ') [type="checkbox"]').attr('checked');
			$(this).find('[type="checkbox"]').prop({'checked': isChecked});
		});
	
		$('.wrc-close-fieldoptions').trigger('click');
		$('.noty_bar').notify({type: "success", message: "Remember to save document!"});
		return false;
	});

	$('#widgetoptions').submit(function(e) {
		that = $(this);
		scope = parseInt($(this).find('.options').attr('class').replace("options", "").replace("scope", "").replace(" ", ""));
		selectValue = $('.row:eq(' + scope + ') [name^="widgettype_"]').val();
	
		$('.row:eq(' + scope + ') .options_widget').each(function(i) {
			$(this).find('input').val(that.find('.options_widget:eq(' + i + ') input').val());
			isChecked = !!that.find('.options_widget:eq(' + i + ') [type="checkbox"]').attr('checked');
			$(this).find('[type="checkbox"]').prop({'checked': isChecked})
		});
	
		$('.row:eq(' + scope + ') .options_widget_' + selectValue).each(function(i) {
			$(this).find('input').val(that.find('.options_widget_' + selectValue + ':eq(' + i + ') input').val());
			isChecked = !!that.find('.options_widget_' + selectValue + ':eq(' + i + ') [type="checkbox"]').attr('checked');
			$(this).find('[type="checkbox"]').prop({'checked': isChecked})
		});
	
		$('.wrc-close-widgetoptions').trigger('click');
		$('.noty_bar').notify({type: "success", message: "Remember to save document!"});
		return false;
	});


	/* logout */
	$(document).on('click', '.wrc-user-out', function() {
		$.couch.logout({
		    success: function(data) {
						$('.wrc-user-out').hide();
						$('.wrc-user-in').show();
						$('.noty_bar').notify({type: "success", message: "Bye bye!", delay: 1000}, function() {
							location.reload(true);
						});
		    }
		});
		return false;
	});

	/* remove all docs */
/*
	var mapFunction = function(doc) {
		if (doc) {
	    emit(doc, null);
		}
	};
	$.couch.db("edit").query(mapFunction, "_all_docs", "javascript", {
		startKey: 'abc',
		endKey: 'abcZZZZZZZZZ',
		descending: true,
	  success: function(data) {
			$.each(data.rows, function(k, v) {
				var doc = {
					_id : v.key._id,
					_rev : v.key._rev
				}
			$.couch.db("edit").removeDoc(doc, {
			     success: function(data) {
			         console.log(data);
			    },
			    error: function(status) {
			        console.log(status);
			    }
			});
			});
	  },
	  error: function(status) {
	      console.log(status);
	  },
	  reduce: false
	});*/
	
	$('form[name="edit"] textarea').addClass('mceEditor');
	tinyMCE.init({
		mode : "specific_textareas",
		editor_selector : "mceEditor",

		// General options
		theme : "advanced",
		skin : "thebigreason",
		plugins : "autolink,lists,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist,codemagic",

		// Theme options
		theme_advanced_buttons1 : "fullscreen,|,undo,redo,|,search,|,pastetext,pasteword,|,bold,italic,underline,strikethrough,|,formatselect,styleselect,|,bullist,|,link,unlink,anchor,|,cleanup,codemagic,|,sub,sup,charmap,|,print",
		theme_advanced_toolbar_location : "top",
		theme_advanced_toolbar_align : "left",
		theme_advanced_statusbar_location : "bottom",
		theme_advanced_resizing : true,
		remove_linebreaks : false,
		force_br_newlines : false,
		force_p_newlines : false,
		forced_root_block : '',
		width: "100%",
		height: "200",

		// Example content CSS (should be your site CSS)
		content_css : "/static/wc-lib/css/editor.css",

		// Drop lists for link/image/media/template dialogs
		template_external_list_url : "lists/template_list.js",
		external_link_list_url : "lists/link_list.js",
		external_image_list_url : "lists/image_list.js",
		media_external_list_url : "lists/media_list.js"
	});

	if ($('#uploader #revision').val() == '') {
		$.getJSON($('#uploader').attr('action'), function(data) {
			$('#uploader #revision').val(data._rev);
		});
	}

	var form = $('#uploader'),
		file_array = {},
		_URL = window.URL || window.webkitURL,
		file_list = filenames = img = parentCloned = parentForm = "";
	
	$(document).on('click', '.wc-files li .remove', function(e) {
		e.preventDefault();
		var uploader = $('#uploader'),
			file = $(this).attr('rel').toString(),
			url = uploader.attr('action') + '/' + file + '?rev=' + uploader.find('#revision').val(),
			file_list = $(this).closest('.field').find('.file_array'),
			file_array = JSON.parse(file_list.val());

		/* remove from input */
		delete file_array[file];
		file_list.val(JSON.stringify(_.map(file_array, function(o) { return o; })));
	
		/* remove from dom */
		$(this).parent().remove();
	
		$.ajax({
			url: url,
			type: 'DELETE',
			success: function(resp) {
				$('[name="edit"]').ajaxSubmit({
					success: function(resp) {
						$.getJSON($('#uploader').attr('action'), function(data) {
							$('#uploader #revision').val(data._rev);
						});
					}
				});
			},
			error: function(resp) {
			}
		});
		return false;
	});
	
	$(document).on('change', 'input[type="file"]', function(e) {
		/* clone parent objects */
		filenames = "";
		parentCloned = $(this).parent();
		parentForm = parentCloned.closest('form');
	
		/* set filenames and data */
		file_list = parentCloned.find('.file_array');
		file_array = JSON.parse(file_list.val());
		_.each(this.files, function(val) {
			filenames += val.name + ', ';
			if(val.type.indexOf("image") !== -1) {
				img = new Image();
		    img.onload = function() {
	      	val['width'] = this.width;
					val['height'] = this.height;
					file_array[val.name] = val;
	      };
	      img.src = _URL.createObjectURL(val);
			}
			else {
				file_array[val.name] = val;
			}
		});
	
		/* upload form */
		$('#uploader').append($(this));
		$('#uploader').ajaxSubmit({
			success: function(resp) {
				file_list.val(JSON.stringify(_.map(file_array, function(o) { return o; })));
				/* update list */
				var html = "";
				var i =0;
				_.each(file_array, function(val, key) {
					html += '<li sortorder="' + i + '">';
					if (val.type.indexOf("image") !== -1) {
						html += '<img class="left" src="/menuat/' + property + '/' + val.name + '" width="60" height="107" /> ' + '<div class="wc-image-meta">' + val.name + '<br/> (' + bytesToSize(val.size, 2) + ') <br />' + val.width + ' X ' + val.height;
					}
					else if (val.type.indexOf("text") !== -1 || val.type.indexOf("application") !== -1) {
						html += val.name + ' <div class="wc-image-meta">(' + bytesToSize(val.size, 2) + ') ' + val.type;
					}
					else {
						html += val.name + ' <div class="wc-image-meta">(' + bytesToSize(val.size, 2) + ') ' + 'unsupported type' + val.type;
					}
					if (typeof val.hidden) {
						if (val.hidden) {
							var isChecked = ' checked';
						}
					}
					html += '<br /><label for="hide">hidden</label><input' + isChecked + ' class="ishidden" type="checkbox" value="hide" /></div><a class="remove" href="#" rel="' + key + '"></a></li>';
					i++;
				});
				parentCloned.find('.wc-files').html(html);
			
				$('.noty_bar').notify({type: "success", message: filenames + " uploaded successfully."});
				$('#uploader [name="_attachments"]').remove();
				//$('#uploader #revision').val(resp.rev);
				parentCloned.append('<input name="_attachments" multiple="" type="file" />');
				parentForm.ajaxSubmit({
					success: function(resp) {
						$.getJSON($('#uploader').attr('action'), function(data) {
							$('#uploader #revision').val(data._rev);
						});
					}
				});
			},
			error: function(data) {
		  		$('.noty_bar').notify({type: "error", message: filenames + " failed to upload!"});
				$('#uploader [name="_attachments"]').remove();
				parentCloned.append('<input name="_attachments" multiple="" type="file" />');
			}
		});
		return false;
	});

	$('body').bind('query', function(e) {
		var opts = {};
		opts.elem = $('.wc-query:not(.processing):first');
		opts.elem.addClass('processing');
		if (opts.elem.length) {
			try {
				opts.query = $.parseJSON(opts.elem.text());
				opts.elem.attr({'data-json': opts.elem.text()});
			}
			catch(e) {
				return;
			}
			if (typeof $.urlParam("random") === "string") {
				opts.query['random'] = random1;
			}
			if (!!opts.query.lookup) {
				opts.req = opts.query.lookup;
				opts.query = "";
				opts.key = "";
			}
			else if (!!opts.query.keys) {
				opts.req = ( $('.wc_editable:first').length > 0 ) ? "/queryedit" : "/query";
				opts.query["keys"] = JSON.stringify(opts.query["keys"]);
			}
			else {
				opts.req = ( $('.wc_editable:first').length > 0 ) ? "/queryedit" : "/query";
				opts.key = opts.query["key"];
				opts.query["key"] = '"' + decodeURI(opts.query["key"]) + '"';
			}
			query(opts);
		}
		else {
			if ($('.wc_editable:first').length > 0) {
				editor();
			}
			else {
				$('body').trigger('queryDone');
			}
		}
	});

	/* parse queries - make this simpler!*/
	if ($('.wc-query:not(.processing)').length <= 0 && $('.wc_editable:first').length > 0) {
		editor();
	}
	else {
		$('body').trigger('query');
	}
});

var supportsOrientationChange = "onorientationchange" in window,
    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

window.addEventListener(orientationEvent, function() {
		if (hash === "menu1" || hash.indexOf("screen") > -1) {
			setTimeout(function() {
				window.scrollTo(0, 0);
			}, 500);
		}
		else if (hash === "menu2") {
			setTimeout(function() {
				var pos = parseInt($('#position').text());
				window.scrollTo(pos, 0);
			}, 500);
		}
		else if (hash === "menu3") {
			setTimeout(function() {
				var pos = parseInt($('#position').text());
				window.scrollTo(pos * 2, 0);
			}, 500);
		}
		else if (hash === "menu4") {
			setTimeout(function() {
				var pos = parseInt($('#position').text());
				window.scrollTo(pos * 3, 0);
			}, 500);
		}
}, false);

//if it is a menu url then do the below
/*var timeServer = startHide = endHide = 0,
		itemArray = '',
		actionTimer = [];
		timeout = 10000;*/
/*if (hash === "menu1" || hash === "menu2" || hash === "menu3" || hash === "menu4") {
	if (typeof $.urlParam("random") !== "string") {
		timeout = 10000;
	}
	var timer = setInterval(function() {
		checkSave(hash);
		if (typeof $.urlParam("random") === "string") {
			$('.schedule').filter(function() {
			    return !!this.value;
			}).each(function() {
				itemArray = $(this).parent().attr('id') + '-' + $(this).val();
				actionTimer.push( itemArray.split('-') ); 
			});
			$.getJSON('/spacetime', function(doc) {
				console.log(doc.timestamp);
				if ( doc.timestamp ) {
					timeServer = doc.timestamp;
					_.each(actionTimer, function(val, key) {
						
						startHide = parseInt(val[1]) - timeServer;
						if ( startHide >= 0 && startHide <= timeout ) {
							console.log(startHide);
							window.setTimeout(function() {
								console.log('hide');
								console.log( +new Date().getTime() );
								$('#' + val[0]).fadeOut('fast');
							}, startHide);
						}
						
						endHide = parseInt(val[2]) - timeServer;
						if ( endHide >= 0 && endHide <= timeout ) {
							console.log(endHide);
							window.setTimeout(function() {
								console.log('show');
								console.log( +new Date().getTime() );
								$('#' + val[0]).fadeIn('fast');
							}, endHide);
						}
						
					});
				}
			});
		}
	}, timeout);
}*/

/* make this async when you get smart */
function query(opts) {
	$.ajax({
    url: opts.req,
		data: opts.query,
    method: 'GET',
		async: false,
		cache: true,
		error: function (data) {
			$('body').trigger('query');
		},
		success: function(data) {
			if ($('#'+opts.key+'-tpl').length > 0) {
				data = Handlebars.compile($('#'+opts.key+'-tpl').html().replace('<!--value-->', '{{{value}}}'))({value: data});                         
			}
			opts.elem.html(data).hide().fadeIn();
			$('body').trigger('query');
		}
	});
}

function editor() {
	$('.wc_editable').each(function(i) {
		if ( $(this).attr('id') ) {
			$(this).attr('id', $(this).attr('id').replace('.','dot').replace('/','forwardslash'));
			var el = $(this),
				eid = el.attr('id'),
				elm = el,
				w = el.width(),
				h = el.height(),
				mostLeft = 100000,
				mostTop = 100000,
				tid = $(this).attr('id').split('-')[0] + '-' + $(this).attr('id').split('-')[1]  + '-modal',
				image = '<img class="fold" style="border:none;padding:0;margin:0;" src="/static/wc-lib/img/pin.png" />';

			if ($('[href="#' + tid + '"]').length > 0) {
				return;
			}
			if (elm.hasClass('wc_global')) {
				image = '<img class="fold" style="border:none;padding:0;margin:0;" src="/static/wc-lib/img/fold.png" />';
			}

			el.children().each(function(i){
				if ($(this).position().left < mostLeft) {
					mostLeft = $(this).position().left;
					elm = $(this);
					if (elm.height() > h) {
						h = elm.height();
					}
					if (elm.width() > w) {
						w = elm.width();
					}
				}
			});
			if (elm.is(':empty')) {
				elm.before('<a class="leanmodal" href="#' + tid + '">' + image + '</a>');
			}
			else {
				if (elm.hasClass('wc-query')) {
					elm = elm.parent();
				}
				if (elm.prop("tagName") === 'UL') {
					elm.before('<a class="leanmodal" href="#' + tid + '">' + image + '</a>');
				}
				else {
					elm.prepend('<a class="leanmodal" href="#' + tid + '">' + image + '</a>');
				}
			}
			$('body').append('<div class="wc_edit_modal" id="' + tid + '"></div>');

			$(this).click(function(e) {
				if ($(window).height() < 636) {
					$('#' + tid).html('<a class="modal_close" href="#close"></a><iframe src="/_show/edit/' + $(this).attr('id').split('-')[0].replace('dot','.').replace('forwardslash','/') + '?#id_' + $(this).attr('id').split('-')[1] + '" class="wc_edit_content" style="height: 465px;top:0;"></iframe>');
				}
				else {
					$('#' + tid).html('<a class="modal_close" href="#close"></a><iframe src="/_show/edit/' + $(this).attr('id').split('-')[0].replace('dot','.').replace('forwardslash','/') + '?#id_' + $(this).attr('id').split('-')[1] + '" class="wc_edit_content"></iframe>');
				}
				e.preventDefault();
				$('.modal_close').click(function(e) {
					e.preventDefault();
					$('#lean_overlay').click();
				});
				$('#lean_overlay').click(function(e) {
					e.preventDefault();
					//location.reload();
				});
			});
		}	
	});
	$('a.leanmodal').leanModal({ top : 30 });
	$('body').trigger('queryDone');
}

function bytesToSize(bytes, precision) {  
    var kilobyte = 1024;
    var megabyte = kilobyte * 1024;
    var gigabyte = megabyte * 1024;
    var terabyte = gigabyte * 1024;
   
    if ((bytes >= 0) && (bytes < kilobyte)) {
        return bytes + ' B';
 
    } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
        return (bytes / kilobyte).toFixed(precision) + ' KB';
 
    } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
        return (bytes / megabyte).toFixed(precision) + ' MB';
 
    } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
        return (bytes / gigabyte).toFixed(precision) + ' GB';
 
    } else if (bytes >= terabyte) {
        return (bytes / terabyte).toFixed(precision) + ' TB';
 
    } else {
        return bytes + ' B';
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$.fn.serializeObject = function() {
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
$(document).ready(function() {
	if ( orientation == 'portrait' ) {
		$('body').addClass('flip');
		if ( resolution == 720 ) {
			$('.flip').css('width',resolution);
		}
	}
	if ( resolution != 1920 ) {
		var screenHeight = 1000;
		if ( resolution == 720 && orientation == 'portrait' ) {
			screenHeight = 1280;
		}
		document.querySelector('style').textContent +=
		    "@media (min-width:" + resolution + "px){body{padding-top:10px}.row-fluid{column-gap:20px;-webkit-column-gap:20px;min-height:"+screenHeight+"px}.root,.wrapper>.row{display:block;column-break-inside:avoid;-webkit-column-break-inside:avoid}.processing>.row,.title{column-break-inside:avoid;-webkit-column-break-inside:avoid}.navbar{display:none}}";
	}
	if ( columns > 0 ) {
		document.querySelector('style').textContent +=
		    "@media (min-width: " + resolution + "px) { .row-fluid { column-count:" + columns + " !important;-moz-column-count:" + columns + " !important;-webkit-column-count:" + columns + " !important; }}";
	}
	if ( zoom !== 0 ) {
		var fontSize = parseInt($('body').css('font-size')) + zoom;
		$('body').css('font-size', fontSize);
	}
});