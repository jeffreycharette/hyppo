/* 
	Author: wearecharette.com
*/

// fetch all the meta data to populate lookups in editor window. //

// workaround to preload templates
var designdoc = [
  "static/templates/1_column.html",
  "static/templates/3_column-image-top.html",
  "static/templates/3_column-offset.html",
  "static/templates/3_column.html",
  "static/templates/3_column_typekit.html",
  "static/templates/404.html",
  "static/templates/_bar-table-alt.html",
  "static/templates/_bar-table-emphasis.html",
  "static/templates/_bar-table-row-alt.html",
  "static/templates/_bar-table-row.html",
  "static/templates/_bar-table.html",
  "static/templates/_category-centered.html",
  "static/templates/_category-classes.html",
  "static/templates/_category-description.html",
  "static/templates/_category-feature-2-column.html",
  "static/templates/_category-logo.html",
  "static/templates/_category-slideshow.html",
  "static/templates/_category.html",
  "static/templates/_contact.html",
  "static/templates/_description-column.html",
  "static/templates/_event.html",
  "static/templates/_image-category.html",
  "static/templates/_image-wrapped.html",
  "static/templates/_image.html",
  "static/templates/_instagram.html",
  "static/templates/_item-description-sameline.html",
  "static/templates/_item-feature-slideshow.html",
  "static/templates/_item-feature.html",
  "static/templates/_item-full-width-description.html",
  "static/templates/_item-inline.html",
  "static/templates/_item-legend-title.html",
  "static/templates/_item-row-image.html",
  "static/templates/_item-row.html",
  "static/templates/_item-slide.html",
  "static/templates/_item-table.html",
  "static/templates/_item-title.html",
  "static/templates/_item-violator-description.html",
  "static/templates/_item-flavor.html",
  "static/templates/_item.html",
  "static/templates/_showtime.html",
  "static/templates/_slide.html",
  "static/templates/_tweet.html",
  "static/templates/_vcard.vcf",
  "static/templates/_wbeer.html",
	"static/templates/_wspecials.html",
	"static/templates/_wshooter.html",
	"static/templates/_wsunday.html",
	"static/templates/_whappy.html",
	"static/templates/_wdrinks.html",
	"static/templates/_wslide.html",
  "static/templates/about.html",
  "static/templates/cache.manifest",
  "static/templates/coffeebard.html",
  "static/templates/contact.html",
  "static/templates/create_doc.html",
  "static/templates/ct.html",
  "static/templates/dashboard.html",
  "static/templates/demo.html",
  "static/templates/demoone.html",
  "static/templates/demotwo.html",
  "static/templates/everwood-columns.html",
  "static/templates/faq.html",
  "static/templates/form.html",
  "static/templates/hero-static.html",
  "static/templates/legend.html",
  "static/templates/index.html",
  "static/templates/menu-columns-scripts.html",
  "static/templates/menu-columns-typekit.html",
  "static/templates/menu-columns.html",
  "static/templates/menu.html",
  "static/templates/press.html",
  "static/templates/showtimes.html",
  "static/templates/site.html",
  "static/templates/slideshow.html",
  "static/templates/support.html",
  "static/templates/violator.html",
	"static/templates/wingdepot.html",
  "static/css/themes/augustine.css",
  "static/css/themes/bar.css",
  "static/css/themes/chalk.css",
  "static/css/themes/chalk2.css",
  "static/css/themes/chalk3.css",
  "static/css/themes/chalk4.css",
  "static/css/themes/chalk5.css",
  "static/css/themes/classic.css",
  "static/css/themes/ct.css",
  "static/css/themes/default.css",
  "static/css/themes/demo.css",
  "static/css/themes/demotwo.css",
  "static/css/themes/dev.css",
  "static/css/themes/fudginnuts.css",
  "static/css/themes/illy.css",
  "static/css/themes/legend.css",
  "static/css/themes/parchment.css",
  "static/css/themes/pulp.css",
  "static/css/themes/showtime.css",
  "static/css/themes/staugamp.css",
  "static/css/themes/wingdepot.css",
  "static/css/themes/fonts/bard.css",
  "static/css/themes/fonts/beerlist.css",
  "static/css/themes/fonts/handwriting.css",
  "static/css/themes/fonts/handwritingbold.css",
  "static/css/themes/fonts/kaushan-cabin_condensed_sketch.css",
  "static/css/themes/fonts/medula-one_robato-condensed_cabin.css",
  "static/css/themes/fonts/modern.css",
  "static/css/themes/fonts/modern2.css",
  "static/css/themes/fonts/offline-bard.css",
  "static/css/themes/fonts/offline-handwriting.css",
  "static/css/themes/fonts/offline-handwritingbold.css",
  "static/css/themes/fonts/offline-medula-one_robato-condensed_cabin.css",
  "static/css/themes/fonts/offline-modern.css",
  "static/css/themes/fonts/offline-modern2.css",
  "static/css/themes/fonts/typekit-museo.css"
];
$('.lookup').each(function(i) {
	var that = $(this),
		view = that.find('.view').text(),
		selected = that.find('.selected').text();
	if (view === '_views' || view === '_templates' || view === '_themes' || view === '_fonts') {
		if (view === '_templates') {
			that.find('select').append("<option value=''>no template</option>");
			_.each(designdoc, function(key, val) {
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
			_.each(designdoc, function(key, val) {
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
			_.each(designdoc, function(key, val) {
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

/*$.ajax({
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
});*/

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