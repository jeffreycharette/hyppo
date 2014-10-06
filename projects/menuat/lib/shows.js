/**
 * Show functions to be exported from the design doc.
 */
var m = "SHOW+++++++++++++++=========================++++++++++++++++";
var wc = require('wc/utils'),
	fields = require('couchtypes/fields'),
	Form = require('couchtypes/forms').Form,
	widgets = require('couchtypes/widgets'),
	_ = require('underscore')._,
	_s = require('underscore-string'),
	docs = require('./types').docs;
	
	// Mix in non-conflict functions to Underscore namespace if you want
	_.mixin(_s.exports()),
	
	/* global keys for docs */
	globalKeys = ['_id', '_rev', 'template', 'type', 'permissions'];

/* parse cache file with handlebars helpers */
/* make this a document and expose to CMS or make it automagic */
exports.cache = function(doc, req) {
	return {
		code: 200,
		headers: {
			'Content-Type': 'text/cache-manifest'
		},
		body: wc.render("cache.manifest", req, {timestamp:new Date().getTime()})
	}
};

exports.inspector = function(doc, req) {
	_.each(doc, function(val, key) {
		log(val);
		try {
			doc[key] = JSON.parse(val);
		} catch (e) {
			doc[key] = val;
		}
	});
	doc['timestamp'] = new Date().getTime();
	log(doc);
	return {
		code: 200,
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(doc)
	}
};


/*events.once('afterResponse', function(err) {
    db.getView('view_name', {}, function(err, data) {
        if (err) { return alert(err); }
        for (var i in data.rows) {
            var row = data.rows[i];
            // do stuff with view data
        }
    });
});*/

exports.edit = function (doc, req) {
	/* transform document into form definition */
	var data = new docs(doc),
		template = "form.html";
	
	/* create form and render to template */
	var editForm = new Form(data);
		
	if (req.userCtx.roles.indexOf('_admin') === -1 && req.userCtx.name !== doc.permissions.owner) {
		template = "wc-login.html";
	}
	
	var title = doc.title || doc.category;
	return wc.render(template, req, {
		form_title : 'edit ' + doc.type + ' - ' + title.value,
		thetype : doc.type,
		method : 'POST',
		edit_action: '/_update/edit/',
		remove_action: '/_update/remove/',
		duplicate_action: '/_update/create/',
		id: doc._id,
		rev: doc._rev,
		roles: req.userCtx.roles,
		form : editForm.toHTML(req),
		owner : doc.permissions.owner,
		button: 'Validate'
	});
};

exports.form = function (doc, req) {
	var messages = "";
	
	if (!req.userCtx.name) {
		if (doc.permissions.add) {
			messages += "<br />You cannot add unless logged in. <br />";
		}
		if (doc.permissions.update) {
			messages += "You cannot update unless logged in. <br />";
		}
		if (doc.permissions.remove) {
			messages += "You cannot remove unless logged in. <br /><br />";
		}
	}
	
	/* transform document into form definition */
	var data = new docs(doc),
		template = 'create_doc.html';

	_.each(data.fields, function(val, key) {
		if (key.charAt(key.length-2) === '_') {
			data.fields[key]['className'] += ' row' + key.substr(-2);
		}
	});
	/* create form and render to template */
	var editForm = new Form(data);
	
	if (req.userCtx.roles.indexOf('_admin') === -1 && req.userCtx.name !== doc.permissions.owner) {
		template = "wc-login.html";
	}
	
	return wc.render(template, req, {
		form_title : 'create document',
		method : 'POST',
		action : '/_update/new_doc/create_doc',
		form : editForm.toHTML(req),
		owner : doc.permissions.owner,
		messages: messages
	});
};

exports.edit_content = function (doc, req) {
	var messages = "";
	
	if (!req.userCtx.name) {
		if (doc.permissions.add) {
			messages += "<br />You cannot add unless logged in. <br />";
		}
		if (doc.permissions.update) {
			messages += "You cannot update unless logged in. <br />";
		}
		if (doc.permissions.remove) {
			messages += "You cannot remove unless logged in. <br /><br />";
		}
	}
	
	/* transform document into form definition */
	var data = new docs(doc);
	
	/* create form and render to template */
	var editForm = new Form(data);
	var title = doc.title || doc.category;
	return wc.render('form.html', req, {
		form_title: 'edit ' + doc.type + ' - ' + title.value,
		method : 'POST',
		edit_action: '/_update/edit/',
		remove_action: '/_update/remove/',
		duplicate_action: '/_update/create/',
		id: doc._id,
		form : editForm.toHTML(req),
		messages: messages
	});
};

exports.page = function(doc, req) {
	var className = "",
		contentType = (typeof req.query.format !== 'undefined') ? req.query.format : 'html',
		template = (typeof req.query.template !== 'undefined') ? req.query.template : '';
		
	/* set content type before getRow or couch it will stream json by default */
	(contentType === 'html') ? start({code: 200, headers: {'Content-Type': 'text/html'}}) : start({code: 200, headers: {'Content-Type': 'application/json'}});

	_.each(doc, function(val, key) {
		if (globalKeys.indexOf(key) === -1 || key === 'template') {
			className = (typeof val.options === 'undefined') ? '' : val.options.widget.type.replace('-','_').replace(/ /g,'_');
			if (typeof val.value === 'object' && className !== "query") {
		        doc[key] = _.flatten(val.value);
		    }
			else if (className == "query") {
				doc[key] = '<span class="wc-query">' + JSON.stringify(val.value) + '</span>';
		    }
		 	else {
				doc[key] = (className === "partial") ? {template: val.value, type: 'partial'} : val.value;
		    }
		}
		else if (key !== 'permissions') {
			doc[key] = val;
		}
		else {
			//delete doc[key];
		}
	});

	_.each(doc, function(val, key) {
		if (typeof val === "object") {
			if (typeof val.type === "string") {
				doc[key] = (!!val.template) ? wc.render(val.template, req, doc) : val.template;
			}
		}
	});
	
	/* validate document access */
	if (!!doc.permissions.owner) {
		if (req.userCtx.name !== doc.permissions.owner && req.userCtx.roles.indexOf('_admin') === -1 && !doc.permissions.add) {
			doc['template'] = "wc-login.html";
			contentType = "html";
		}
		doc['owner'] = doc.permissions.owner;
	}

	if (contentType === 'json') {
		return JSON.stringify(doc);
	}
	else if (contentType === 'html') {
		return wc.render(doc.template || "404.html", req, doc);
	}
}

exports.edit_page = function(doc, req) {
	var className = "",
		typeName = "",
		wrapper = "",
		contentType = (typeof req.query.format !== 'undefined') ? req.query.format : 'html',
		template = (typeof req.query.template !== 'undefined') ? req.query.template : '',
		header = new RegExp(/<body(.*?)>/gi);
		
	if (contentType === 'json') {
		start({code: 200, headers: {'Content-Type': 'application/json'}});
	}
	else if (contentType === 'html') {
		start({code: 200, headers: {'Content-Type': 'text/html'}});
	}

	_.each(doc, function(val, key) {
		if (globalKeys.indexOf(key) === -1) {
			typeName = (typeof val.type === 'undefined') ? '' : val.type.replace(/ /g,'_');
			className = (typeof val.options === 'undefined') ? '' : val.options.widget.type.replace('-','_').replace(/ /g,'_');
			wrapper = '<span class="wc_editable ' + 'wc-' + typeName + '-' + className + '" id="' + doc._id.replace('-','_').replace(/ /g,'_') + '-' + key.replace('-','_').replace(/ /g,'_') + '">';
			if (typeof val.value === 'object' && className !== "query" && typeName !== "meta") {
			    doc[key] = _.flatten(val.value);
			}
			else if (typeName === "meta") {
				doc[key] = val.value;
			}
			else if (className === "query") {
				doc[key] = wrapper + '<span class="wc-query">' + JSON.stringify(val.value) + '</span></span>';
			}
			else {
				doc[key] = (className === "partial") ? {template: val.value, type: 'partial', 'wrapper': wrapper} : wrapper + val.value + '</span>';
			}
		}
		else if (key === 'template') {
			doc[key] = val.value;
		}
		else if (key !== 'permissions') {
			doc[key] = val;
		}
		else {
			//delete doc[key];
		}
	});
	_.each(doc, function(val, key) {
		if (typeof val === "object") {
			if (typeof val.type === "string") {
				doc[key] = (!!val.template) ? val.wrapper + wc.render(val.template, req, doc) + '</span>' : val.wrapper + val.template + '</span>';
			}
		}
	});
	
	/* validate document access */
	if (!!doc.permissions.owner) {
		if (req.userCtx.name !== doc.permissions.owner && req.userCtx.roles.indexOf('_admin') === -1) {
			doc['template'] = "wc-login.html";
			contentType = "html";
		}
		doc['owner'] = doc.permissions.owner;
	}

	if (contentType === 'json') {
		return JSON.stringify(doc);
	}
	else if (contentType === 'html') {
		return wc.render(doc.template || "404.html", req, doc).toString().replace(header, '<body$1><span class="settings-global wc_editable wc_global wc-' + doc._id.replace(' ','_') + '-document" id="' + doc._id.replace(' ','_') + '-document">&nbsp;</span>');
	}
}

exports.dashboard = function(doc, req) {
	var className = "",
		typeName = "",
		wrapper = "",
		contentType = (typeof req.query.format !== 'undefined') ? req.query.format : 'html',
		template = (typeof req.query.template !== 'undefined') ? req.query.template : '',
		header = new RegExp(/<body(.*?)>/gi);
		
	if (contentType === 'json') {
		start({code: 200, headers: {'Content-Type': 'application/json'}});
	}
	else if (contentType === 'html') {
		start({code: 200, headers: {'Content-Type': 'text/html'}});
	}

	_.each(doc, function(val, key) {
		if (globalKeys.indexOf(key) === -1) {
			typeName = (typeof val.type === 'undefined') ? '' : val.type.replace(/ /g,'_');
			className = (typeof val.options === 'undefined') ? '' : val.options.widget.type.replace('-','_').replace(/ /g,'_');
			wrapper = '<span class="wc_editable ' + 'wc-' + typeName + '-' + className + '" id="' + doc._id.replace('-','_').replace(/ /g,'_') + '-' + key.replace('-','_').replace(/ /g,'_') + '">';
			if (typeof val.value === 'object' && className !== "query" && typeName !== "meta") {
			    doc[key] = _.flatten(val.value);
			}
			else if (typeName === "meta") {
				doc[key] = val.value;
			}
			else if (className === "query") {
				doc[key] = wrapper + '<span class="wc-query">' + JSON.stringify(val.value) + '</span></span>';
			}
			else {
				doc[key] = (className === "partial") ? {template: val.value, type: 'partial', 'wrapper': wrapper} : wrapper + val.value + '</span>';
			}
		}
		else if (key === 'template') {
			doc[key] = val.value;
		}
		else if (key !== 'permissions') {
			doc[key] = val;
		}
		else {
			//delete doc[key];
		}
	});
	_.each(doc, function(val, key) {
		if (typeof val === "object") {
			if (typeof val.type === "string") {
				doc[key] = (!!val.template) ? val.wrapper + wc.render(val.template, req, doc) + '</span>' : val.wrapper + val.template + '</span>';
			}
		}
	});
	
	/* validate document access */
	doc['template'] = "dashboard.html";
	if (!!doc.permissions.owner) {
		if ( doc.permissions.owner === 'member' && req.userCtx.roles.indexOf('member') === -1 ) {
			doc['template'] = "wc-login.html";
			contentType = "html";
		}
		log(req);
		doc['owner'] = req.userCtx.name;
		doc['user'] = req;
		doc['name'] = req.userCtx.first + ' ' + req.userCtx.last;
	}

	return wc.render(doc.template || "404.html", req, doc);
}

exports.edit_definition = function (doc, req) {
	var messages = "";
	var i = 0;
	
	if (!req.userCtx.name) {
		if (doc.permissions.add) {
			messages += "<br />You cannot add unless logged in. <br />";
		}
		if (doc.permissions.update) {
			messages += "You cannot update unless logged in. <br />";
		}
		if (doc.permissions.remove) {
			messages += "You cannot remove unless logged in. <br /><br />";
		}
	}
	
	/* set permissions from document */
	_.each(doc.permissions, function(val, key) {
		if (key === 'owner') {
			doc[key] = {
					"value": doc.permissions[key],
					"type": "string",
					"options": {
						"className": "permissions",
					    "required": false,
					    "default_value": doc.permissions[key],
					    "label": "owner",
						"omit_empty": false,
					    "widget": {
					        "classes": [
					        ],
					        "options": {
					            "placeholder": "owner name"
					        },
					        "type": "text"
					    }
			   		}
			   	};
		}
		else {
			doc[key] = {
		       "value": (doc.permissions[key]) ? true : false,
		       "type": "boolean",
		       "options": {
		           "className": "permissions",
		           "default_value": (doc.permissions[key]) ? true : false,
		           "omit_empty": false
		       }
		   };
		}
	});
	
	/* set the type */
	doc['wc-type'] = {
			"value": doc.type,
			"type": "string",
			"options": {
				"className": "left",
			    "hidden": true,
			    "required": true,
			    "default_value": doc.type,
			    "label": "tag name",
			    "widget": {
			        "classes": [
			        ],
			        "options": {
			            "placeholder": "type of collection"
			        },
			        "type": "text"
			    }
	   		}
	   	};
	
	/* set template for document */
	doc['template'] = {
		       "value": doc.template.value,
		       "type": "string",
		       "options": {
		           "className": "lookup clearboth",
		           "label": "template",
		           "required": false,
		           "default_value": doc.template.value,
		           "omit_empty": false,
		           "widget": {
		               "classes": [
		               ],
		               "options": {
		                   "values": [
		                   ],
		                   "view": "_templates"
		               },
		               "type": "selectlookup"
		           }
		       }
		   };
	
	_.each(doc, function(val, key) {
		if (!_(key).startsWith("_") && key !== 'type' && key !== 'template' && key !== 'permissions' && key !== 'add' && key !== 'update' && key !== 'remove' && key !== 'owner' && key !== 'wc-type') {
			i++;
			doc['name_'+i] = {
			       "value": key,
			       "type": "string",
			       "options": {
			           "className": "fields row_"+i,
			           "label": "field name",
			           "required": true,
			           "default_value": key,
			           "widget": {
			               "classes": [
			               ],
			               "options": {
			                   "placeholder": "name of field"
			               },
			               "type": "text"
			           },
			           "omit_empty": false
			       }
			   };
			doc['fieldtype_'+i] = {
			    "value": doc[key].type,
			    "type": "string",
			    "options": {
			        "required": true,
			        "label": "field type",
			        "className": "fields fieldtype row_"+i,
			        "default_value": doc[key].type,
			        "validators": [],
			        "omit_empty": false,
			        "permissions": {
			        },
			        "widget": {
			            "classes": [
			            ],
			            "options": {
			                "values": [
			                    [
			                        "string",
			                        "string"
			                    ],
													[
													    "meta",
													    "meta"
													],
			                    [
			                        "number",
			                        "number"
			                    ],
			                    [
			                        "boolean",
			                        "boolean"
			                    ],
			                    [
			                        "email",
			                        "email"
			                    ],
			                    [
			                        "url",
			                        "url"
			                    ],
			                    [
			                        "createdTime",
			                        "createdTime"
			                    ],
			                    [
			                        "creator",
			                        "creator"
			                    ],
			                    [
			                        "array",
			                        "array"
			                    ],
			                    [
			                        "numberArray",
			                        "numberArray"
			                    ],
													[
													    "attachments",
													    "attachments"
													]
			                ]
			            },
			            "type": "select"
			        }
			    }
			};
			doc['label_'+i] = {
			    "value": doc[key].options.label,
			    "type": "string",
			    "options": {
			        "className": "fields options_field row_"+i,
			        "label": "label",
			        "required": false,
			        "default_value": doc[key].options.label,
			        "omit_empty": false
			    }
			};
			doc['default_value_'+i] = {
			    "value": (doc[key].options.default_value) ? doc[key].options.default_value : "",
			    "type": "string",
			    "options": {
			        "className": "fields options_field row_"+i,
			        "label": "default value",
			        "required": false,
			        "default_value": (doc[key].options.default_value) ? doc[key].options.default_value : "",
			        "omit_empty": false
			    }
			};
			doc['classname_'+i] = {
			    "value": doc[key].options.className,
			    "type": "string",
			    "options": {
			        "className": "fields options_field row_"+i,
			        "label": "class name",
			        "required": false,
			        "default_value": doc[key].options.className,
			        "omit_empty": false
			    }
			};
			doc['required_'+i] = {
			    "value": doc[key].options.required,
			    "type": "boolean",
			    "options": {
			        "className": "fields options_field row_"+i,
			        "label": "required",
			        "required": false,
			        "default_value": doc[key].options.required,
			        "omit_empty": false
			    }
			};
			doc['omit_empty_'+i] = {
			    "value": doc[key].options.omit_empty,
			    "type": "boolean",
			    "options": {
			        "className": "fields options_field row_"+i,
			        "label": "omit empty",
			        "required": false,
			        "default_value": doc[key].options.omit_empty,
			        "omit_empty": false
			    }
			};
			/* this may not be needed */
			if (typeof doc[key].options.widget === 'undefined') {
				doc[key]['options']['widget'] = {
				               "classes": [
				               ],
				               "options": {
				               },
				               "type": "text"
				           };
			}
			doc['widgettype_'+i] = {
			    "value": (typeof doc[key].options.widget !== 'undefined') ? doc[key].options.widget.type : "",
			    "type": "string",
			    "options": {
			        "className": "fields widgettype row_"+i,
			        "label": "widget type",
			        "required": true,
			        "default_value": (typeof doc[key].options.widget !== 'undefined') ? doc[key].options.widget.type : "",
			        "validators": [],
			        "omit_empty": false,
			        "permissions": {
			        },
			        "widget": {
			            "classes": [
			            ],
			            "options": {
			                "values": [
			                    [
			                        "text",
			                        "text"
			                    ],
			                    [
			                        "textarea",
			                        "textarea"
			                    ],
			                    [
			                        "checkbox",
			                        "checkbox"
			                    ],
			                    [
			                        "select",
			                        "select"
			                    ],
								[
			                        "selectlookup",
			                        "selectLookup"
			                    ],
			                    [
			                        "hidden",
			                        "hidden"
			                    ],
			                    [
			                        "file",
			                        "file"
			                    ],
			                    [
			                        "password",
			                        "password"
			                    ],
			                    [
			                        "creator",
			                        "creator"
			                    ],
			                    [
			                        "computed",
			                        "comparative"
			                    ],
								[
			                        "query",
			                        "query"
			                    ],
								[
			                        "partial",
			                        "partial"
			                    ]
			                ]
			            },
			            "type": "select"
			        }
			    }
			};
			doc['placeholder_'+i] = {
			    "value": (typeof doc[key].options.widget.options.placeholder !== 'undefined') ? doc[key].options.widget.options.placeholder : "",
			    "type": "string",
			    "options": {
			        "className": "fields options_widget row_"+i,
			        "label": "placeholder text",
			        "required": false,
			        "default_value": (typeof doc[key].options.widget.options.placeholder !== 'undefined') ? doc[key].options.widget.options.placeholder : "",
			        "omit_empty": false
			    }
			};
			doc['size_'+i] = {
			    "value": (typeof doc[key].options.widget.options.size !== 'undefined') ? doc[key].options.widget.options.size : "",
			    "type": "number",
			    "options": {
			        "className": "fields options_widget row_"+i,
			        "label": "size",
			        "required": false,
			        "default_value": (typeof doc[key].options.widget.options.size !== 'undefined') ? doc[key].options.widget.options.size : "",
			        "omit_empty": false
			    }
			};
			doc['maxlength_'+i] = {
			    "value": (typeof doc[key].options.widget.options.maxlength !== 'undefined') ? doc[key].options.widget.options.maxlength : "",
			    "type": "number",
			    "options": {
			        "className": "fields options_widget row_"+i,
			        "label": "maximum length",
			        "required": false,
			        "default_value": (typeof doc[key].options.widget.options.maxlength !== 'undefined') ? doc[key].options.widget.options.maxlength : "",
			        "omit_empty": false
			    }
			};
			doc['readonly_'+i] = {
			    "value": (typeof doc[key].options.widget.options.readonly !== 'undefined') ? doc[key].options.widget.options.readonly : "",
			    "type": "boolean",
			    "options": {
			        "className": "fields options_widget row_"+i,
			        "label": "read only",
			        "required": false,
			        "default_value": (typeof doc[key].options.widget.options.readonly !== 'undefined') ? doc[key].options.widget.options.readonly : "",
			        "omit_empty": false
			    }
			};
			doc['cols_'+i] = {
			    "value": (typeof doc[key].options.widget.options.cols !== 'undefined') ? doc[key].options.widget.options.cols : "",
			    "type": "number",
			    "options": {
			        "className": "fields options_widget_textarea row_"+i,
			        "label": "columns",
			        "required": false,
			        "default_value": (typeof doc[key].options.widget.options.cols !== 'undefined') ? doc[key].options.widget.options.cols : "",
			        "omit_empty": false
			    }
			};
			doc['rows_'+i] = {
			    "value": (typeof doc[key].options.widget.options.rows !== 'undefined') ? doc[key].options.widget.options.rows : "",
			    "type": "number",
			    "options": {
			        "className": "fields options_widget_textarea row_"+i,
			        "label": "rows",
			        "required": (typeof doc[key].options.widget.options.rows !== 'undefined') ? doc[key].options.widget.options.rows : "",
			        "default_value": 5,
			        "omit_empty": false
			    }
			};
			doc['values_'+i] = {
			    "value": (typeof doc[key].options.widget.options.values !== 'undefined') ? doc[key].options.widget.options.values : "",
			    "type": "string",
			    "options": {
			        "className": "fields options_widget_select row_"+i,
			        "label": "array",
			        "required": false,
			        "default_value": (typeof doc[key].options.widget.options.values !== 'undefined') ? doc[key].options.widget.options.values : "",
			        "omit_empty": false
			    }
			};
			doc['view_'+i] = {
			       "value": (typeof doc[key].options.widget.options.view !== 'undefined') ? doc[key].options.widget.options.view : "",
			       "type": "string",
			       "options": {
			           "className": "fields options_widget_selectlookup lookup row_"+i,
			           "label": "view name",
			           "required": false,
			           "default_value": (typeof doc[key].options.widget.options.view !== 'undefined') ? doc[key].options.widget.options.view : "",
			           "omit_empty": false,
			           	"widget": {
			               "classes": [
			               ],
			               "options": {
			                   "values": [
			                   ],
			                   "view": "_views"
			               },
			               "type": "selectlookup"
			       		}
			       }
			   };
			delete doc[key];
		}
	});
	
	/* transform document into form definition */
	var data = new docs(doc),
		template = 'create_doc.html';
	data.fields._id['default_value'] = doc._id;
	data.fields._rev['default_value'] = doc._rev;
	delete data.fields._deleted;
	
	/* create form and render to template */
	var editForm = new Form(data);
	
	if (req.userCtx.roles.indexOf('_admin') === -1 && req.userCtx.name !== doc.permissions.owner) {
		template = "wc-login.html";
	}
	
	return wc.render(template, req, {
		form_title : 'edit ' + doc.type + ' definition - ' + doc._id,
		method : 'POST',
		action : '/_update/save_definition/create_doc',
		form : editForm.toHTML(req),
		messages: messages
	});
};
