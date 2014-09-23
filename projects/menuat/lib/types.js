/**
 * Kanso document types to export
 */

var m = "+++++++++++++++=========================++++++++++++++++";
var Type = require('couchtypes/types').Type,
	fields = require('couchtypes/fields'),
	actions = require('couchtypes/actions'),
	Form = require('couchtypes/forms').Form,
	widgets = require('couchtypes/widgets'),
	permissions = require('couchtypes/permissions');
	_ = require('underscore')._,
	_s = require('underscore-string');

	exports.docs = function (doc) {
		var data = {};
		_.each(doc, function(val, key) {
			var opts = widget = widgetOptions = {};
			
			// not a reserved key
			if (!_(key).startsWith("_") && key != "permissions" && (typeof val === 'object')) {
				
				/* map all values to correct structure in storage */
				if (typeof val.value === 'undefined') {
					val = {'value': val};
				}
				if (typeof val.options !== 'undefined') {
					val.options['id'] = doc._id;
					opts = val.options;
				}				
				
				// use default value for hinting at some point

				opts['default_value'] = val.value;
				
				// set time to current time for createdTime
				if (val.type == 'createdTime') {
					opts['default_value'] = Math.round((new Date()).getTime() / 1000);
				}
				
				// has a widget defined
				if (typeof opts.widget !== 'undefined') {
					opts['widget'] = widgets[opts.widget.type](opts.widget.options);
				}

				// set the field type and options
				data[key] = fields[val.type](opts);
			}
		});
		
		/* set permissions */
		var perm = {};
		_.each(doc.permissions, function(val, key) {
			if (val && key !== 'owner') {
				perm[key] = permissions.loggedIn();
			}
		});
		
		doc['type'] = (typeof doc.type === 'string') ? doc.type : 'global';

		return new Type(doc.type, {fields: data, permissions: perm});
	};