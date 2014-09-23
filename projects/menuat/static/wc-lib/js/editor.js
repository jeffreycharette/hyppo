/* 
	Author: wearecharette.com
*/

// fetch all the meta data to populate lookups in editor window. //

$.ajax({
   url: '/_design',
   expect_json: true,
	dataType: 'json',
	error: function (data) {
		$('.save').show();
		$('.duplicate').show();
	},
	success: function (data) {
		$('.lookup').each(function(i) {
			var that = $(this),
				view = that.find('.view').text(),
				selected = that.find('.selected').text();
			if (view === '_views' || view === '_templates' || view === '_themes' || view === '_fonts') {
				if (view === '_templates') {
					that.find('select').append("<option value=''>no template</option>");
					_.each(data._attachments, function(val, key) {
						if (key.indexOf('static/templates/') !== -1) {
							key = key.replace('static/templates/', '');
							if (selected == key) {
								that.find('select').append("<option selected=\"selected\" value='" + key + "'>" + key + "</option>");
							}
							else {
								that.find('select').append("<option value='" + key + "'>" + key + "</option>");
							}
						}
					});
					//that.show();
				}
				else if (view === '_themes') {
					that.find('select').append("<option value=''>default theme</option>");
					_.each(data._attachments, function(val, key) {
						if (key.indexOf('static/css/themes/') !== -1) {
							key = key.replace('static/css/themes/', '');
							if (selected == key) {
								that.find('select').append("<option selected=\"selected\" value='" + key + "'>" + key + "</option>");
							}
							else {
								that.find('select').append("<option value='" + key + "'>" + key + "</option>");
							}
						}
					});
				}
				else if (view === '_fonts') {
					that.find('select').append("<option value=''>default fonts</option>");
					_.each(data._attachments, function(val, key) {
						if (key.indexOf('static/css/themes/fonts/') !== -1) {
							key = key.replace('static/css/themes/fonts/', '');
							if (selected == key) {
								that.find('select').append("<option selected=\"selected\" value='" + key + "'>" + key + "</option>");
							}
							else {
								that.find('select').append("<option value='" + key + "'>" + key + "</option>");
							}
						}
					});
				}
				else {
					that.find('select').append("<option value=''>no view</option>");
					_.each(data.views, function(val, key) {
						if (selected == key) {
							that.find('select').append("<option selected=\"selected\" value='" + key + "'>" + key + "</option>");
						}
						else {
							that.find('select').append("<option value='" + key + "'>" + key + "</option>");
						}
					});
				}
				$('.save').show();
				$('.duplicate').show();
			}
			else {	
				db.getView('edit', view, function (err, data) {
				  if (err) {
				        // an error occurred
				        throw(err);
				  }
					else {
						that.find('select').append("<option value=''>no view</option>");
						_.each(data.rows, function(val, key) {
							if (selected == val.key) {
								that.find('select').append("<option selected=\"selected\" value='"+val.key+"'>"+val.value+"</option>");
							}
							else {
								that.find('select').append("<option value='"+val.key+"'>"+val.value+"</option>");
							}
						});
					}
					$('.save').show();
					$('.duplicate').show();
				});
			}
		});
	}
});

$(document).on('click', '.wc-files li .ishidden', function(e) {
	var uploader = $('#uploader'),
		isChecked = $(this).is(":checked"),
		file_list = $(this).closest('.field').find('.file_array'),
		file_array = JSON.parse(file_list.val());

	var order = parseInt($(this).parent().parent().attr('sortorder'));
	file_array[order]['hidden'] = isChecked;
	file_list.val(JSON.stringify(_.map(file_array, function(o) { return o; })));

	$('[name="edit"]').ajaxSubmit({
		success: function(resp) {
			$.getJSON($('#uploader').attr('action'), function(data) {
				$('#uploader #revision').val(data._rev);
			});
		}
	});
});

$('#id_slideshow .wc-files').sortable().bind('sortupdate', function(t) {
	var file_list = $(this).parent().find('.file_array'),
	file_array = JSON.parse(file_list.val()),
	newFileArray = [],
	order = 0;
	$(this).find('li').each(function(i) {
		order = parseInt($(this).attr('sortorder'));
		newFileArray[i] = file_array[order];
	});
	file_list.val(JSON.stringify(_.map(newFileArray, function(o) { return o; })));

	$('[name="edit"]').ajaxSubmit({
		success: function(resp) {
			$.getJSON($('#uploader').attr('action'), function(data) {
				$('#uploader #revision').val(data._rev);
			});
		}
	});
});