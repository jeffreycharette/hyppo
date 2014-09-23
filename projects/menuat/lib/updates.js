/**
 * Update functions to be exported from the design doc.
 */
var m = "UPDATE+++++++++++++++=========================++++++++++++++++";
var wc = require('wc/utils'),
	fields = require('couchtypes/fields'),
	Form = require('couchtypes/forms').Form,
	widgets = require('couchtypes/widgets'),
	_ = require('underscore')._,
	_s = require('underscore-string'),
	session = require('session'),
	utils = require('couchtypes/utils'),
	docs = require('./types').docs;
	
	// Mix in non-conflict functions to Underscore namespace if you want
	_.mixin(_s.exports());

/*exports.in_place = function(doc, req) {
    var field = req.form.field;
    var value = req.form.value;
    var message = 'set '+field+' to '+value;
    doc[field] = value;
    return [doc, message];
  };*/

exports.contact = function (doc, req) {
	var errors = "";
	req.form['created_at'] = new Date();
	_.each(req.form, function(val, key) {
		if (typeof doc[key] === 'object') {
			try {
			   val = JSON.parse(val);
			}
			catch(e) {
			}
			if ( !!doc[key]['options']['required'] && val.length < 1 ) {
				errors += key + ':' + 'blank,';
			}
			doc[key]['value'] = val;
			doc[key]['options']['default_value'] = val;
		}
	});
	doc._id = req.uuid;
	doc.type = 'contact';
	doc.permissions.owner = '';
	delete doc._rev;
	delete doc._revisions;
	delete doc.add;
	delete doc.save;
	if ( errors.length > 0 ) {
		return [null, {
			code: 400,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				body: 'error',
				error: errors
			})
		}];
	}
	else {
		return [doc, {
			code: 200,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				_id: doc._id,
				body: 'success'
			})
		}];
	}
};

exports.create_profile = function (doc, req) {
	_.each(req.form, function(val, key) {
		if (typeof doc[key] === 'object' && key !== 'userCtx') {
			doc[key]['value'] = val;
			doc[key]['options']['default_value'] = val;
		}
	});
	doc.permissions.owner = req.form.name;
	doc.type = 'account';
	doc._id = req.uuid;
	delete doc._rev;
	delete doc._revisions;

    return [doc, wc.render('_account.html', req, doc)];
}

exports.poll = function (doc, req) {
	_.each(req.form, function(val, key) {
		doc[key] = parseInt(val);
	});
	return [doc, {
		code: 200,
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({success: doc._id})
	}];
};

exports.new_doc = function (doc, req) {
	/* transform document into form definition */
	var theDoc = doc;
	var doc = {};
	var opts = {};
	var i = 0;

	_.each(req.form, function(val, key) {
		if (_(key).startsWith('name_')) {
			i++;
			
			/* set global widget options */
			opts = {};

			if (req.form['placeholder_'+i]) {
				opts['placeholder'] = req.form['placeholder_'+i];
			}
			if (req.form['size_'+i]) {
				opts['size'] = req.form['size_'+i];
			}
			if (req.form['maxlength_'+i]) {
				opts['maxlength'] = req.form['maxlength_'+i];
			}
			if (req.form['readonly_'+i]) {
				opts['readonly'] = true;
			}

			/* set options based on type */
			if (req.form['widgettype_'+i] == "textarea") {
				opts['cols'] = req.form['cols_'+i];
				opts['rows'] = req.form['rows_'+i];
			}
			else if (req.form['widgettype_'+i] == "select") {
				opts['values'] = req.form['values_'+i];
			}
			else if (req.form['widgettype_'+i] == "selectlookup") {
				opts['view'] = req.form['view_'+i];
				opts['values'] = [];
			}
			
			if (req.form['default_value_'+i] === "false" || req.form['default_value_'+i] === "0") {
				req.form['default_value_'+i] = false;
			}
			if (req.form['default_value_'+i] === "true" || req.form['default_value_'+i] === "1") {
				req.form['default_value_'+i] = true;
			}
			
			/* create document object */
			doc[val] = {
				value: (req.form['default_value_'+i]) ? req.form['default_value_'+i] : "",
				type: req.form['fieldtype_'+i],
				options: {
					className: (req.form['widgettype_'+i] == "selectlookup") ? 'lookup' : req.form['classname_'+i],
					label: req.form['label_'+i],
					/* set boolean options to boolean values */
					required: (req.form['required_'+i]) ? true : false,
					omit_empty: (req.form['omit_empty_'+i]) ? true : false,
					default_value: (req.form['default_value_'+i]) ? req.form['default_value_'+i] : "",
					widget: {
						type: req.form['widgettype_'+i],
						options: opts
					}
				}
			};
		}
		else if (key == 'wc-type') {
			doc['type'] = req.form['wc-type'];
		}
		else if (key == 'template') {
			doc['template'] = {
				       "value": req.form['template'],
				       "type": "string",
				       "options": {
				           "className": "lookup",
				           "label": "template",
				           "required": false,
				           "default_value": req.form['template'],
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
		}
	});
	doc['permissions'] = {};
	doc.permissions['add'] = (req.form['add']) ? true : false;
	doc.permissions['update'] = (req.form['update']) ? true : false;
	doc.permissions['remove'] = (req.form['remove']) ? true : false;
	doc.permissions['owner'] = (req.form['owner']) ? req.form['owner'] : "";
	
	/* create form and render to template */

	var data = new docs(doc),
		form = new Form(data);
		
	/* validate the request against the document in storage */
	doc._id = req.form._id;
	//form.validate(req);

	if (form.isValid()) {
		/* to create a document */
		delete doc._rev;
		delete doc._revisions;

	    return [doc, wc.render('form.html', req, {
			form_title: 'edit ' + doc.type + ' - ' + doc._id,
			method : 'POST',
			edit_action: '/_update/edit/',
			remove_action: '/_update/remove/',
			duplicate_action: '/_update/create/',
			id: doc._id,
			form : 'Created by ' + req.userCtx.name + ' on ' + new Date() + '<br /><br />' + form.toHTML(req),
			messages: messages
		})];
	}
	else {
		var messages, docKey, className = "";
		
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
				
		/* hydrate request with doc definition */
		_.each(req.form, function(val, key) {
			if (!_(key).startsWith("_")) {
				docKey = (key.charAt(key.length-2) === '_') ? key.slice(0, -2)+'_1' : key;
				if (theDoc[docKey].type == "boolean") {
					val = (val) ? true : false;
				}
				req.form[key] = {
					value: val,
					type: theDoc[docKey].type,
					options: theDoc[docKey].options
				};
				_.defaults(req.form, theDoc);
			}
		});
		
		if (typeof req.form.type === "object") {
			req.form['type'] = req.form.type.value;
		}
		
		data = new docs(req.form);
		
		//data = new docs(req.form);
		/* 
		 * have no idea why I couldn't put this above
		 * the classname kept getting overridden to row_2
		*/
		_.each(data.fields, function(val, key) {
			if (key.charAt(key.length-2) === '_') {
				className = data.fields[key]['className'].replace(/ row_([0-9]+)/g, '');
				data.fields[key]['className'] += ' row' + key.substr(-2);
			}
		});

		editForm = new Form (data);
		
		return [null, wc.render('create_doc.html', req, {
			form_title : 'create document',
			method : 'POST',
			action : '/_update/new_doc/create_doc',
			form : editForm.toHTML(req),
			messages: messages
		})];
	}
};

exports.save_definition = function (doc, req) {
	
	/* transform document into form definition */
	var theDoc = doc;
	var doc = {};
	var opts = {};
	var i = 0;
	_.each(req.form, function(val, key) {
		if (_(key).startsWith('name_')) {
			i++;
			
			/* set global widget options */
			opts = {};

			if (req.form['placeholder_'+i]) {
				opts['placeholder'] = req.form['placeholder_'+i];
			}
			if (req.form['size_'+i]) {
				opts['size'] = req.form['size_'+i];
			}
			if (req.form['maxlength_'+i]) {
				opts['maxlength'] = req.form['maxlength_'+i];
			}
			if (req.form['readonly_'+i]) {
				opts['readonly'] = true;
			}

			/* set options based on type */
			if (req.form['widgettype_'+i] == "textarea") {
				opts['cols'] = req.form['cols_'+i];
				opts['rows'] = req.form['rows_'+i];
			}
			else if (req.form['widgettype_'+i] == "select") {
				opts['values'] = req.form['values_'+i];
			}
			else if (req.form['widgettype_'+i] == "selectlookup") {
				opts['view'] = req.form['view_'+i];
				opts['values'] = [];
			}
			
			if (req.form['default_value_'+i] === "false" || req.form['default_value_'+i] === "0") {
				req.form['default_value_'+i] = false;
			}
			if (req.form['default_value_'+i] === "true" || req.form['default_value_'+i] === "1") {
				req.form['default_value_'+i] = true;
			}
			/*if (typeof req.form['default_value_'+i] === 'object') {
		        req.form['default_value_'+i] = _.flatten(req.form['default_value_'+i]);
		    }*/
			
			/* create document object */
			doc[val] = {
				value: (req.form['default_value_'+i]) ? req.form['default_value_'+i] : "",
				type: req.form['fieldtype_'+i],
				options: {
					className: (req.form['widgettype_'+i] == "selectlookup") ? 'lookup' : req.form['classname_'+i],
					label: req.form['label_'+i],
					/* set boolean options to boolean values */
					required: (req.form['required_'+i]) ? true : false,
					omit_empty: (req.form['omit_empty_'+i]) ? true : false,
					default_value: (req.form['default_value_'+i]) ? req.form['default_value_'+i] : "",
					widget: {
						type: req.form['widgettype_'+i],
						options: opts
					}
				}
			};
		}
		else if (key == 'wc-type') {
			doc['type'] = req.form['wc-type'];
		}
		else if (key == 'template') {
			doc['template'] = {
				       "value": req.form['template'],
				       "type": "string",
				       "options": {
				           "className": "lookup",
				           "label": "template",
				           "required": false,
				           "default_value": req.form['template'],
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
		}
	});
	
	/* create form and render to template */
	var data = new docs(doc),
		form = new Form(data);
		
	/* validate the request against the document in storage */
	//form.validate(req);

	if (form.isValid()) {
		
		doc['permissions'] = {};
		doc.permissions['add'] = (req.form['add']) ? true : false;
		doc.permissions['update'] = (req.form['update']) ? true : false;
		doc.permissions['remove'] = (req.form['remove']) ? true : false;
		doc.permissions['owner'] = req.form['owner'] || '';
		
		doc['_id'] = req.form._id;
		doc['_rev'] = req.form._rev;

	    return [doc, wc.render('form.html', req, {
			form_title: 'edit ' + doc.type + ' - ' + doc._id,
			method : 'POST',
			edit_action: '/_update/edit/',
			remove_action: '/_update/remove/',
			duplicate_action: '/_update/create/',
			id: doc._id,
			form : 'Created by ' + req.userCtx.name + ' on ' + new Date() + '<br /><br />' + form.toHTML(req),
			messages: messages
		})];
	}
	else {
		var messages, docKey, className = "";
		
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
				
		/* hydrate request with doc definition */
		_.each(req.form, function(val, key) {
			if (!_(key).startsWith("_")) {
				docKey = (key.charAt(key.length-2) === '_') ? key.slice(0, -2)+'_1' : key;
				if (theDoc[docKey].type == "boolean") {
					val = (val) ? true : false;
				}
				req.form[key] = {
					value: val,
					type: theDoc[docKey].type,
					options: theDoc[docKey].options
				};
				_.defaults(req.form, theDoc);
			}
		});
		
		if (typeof req.form.type === "object") {
			req.form['type'] = req.form.type.value;
		}
		
		data = new docs(req.form);
		
		//data = new docs(req.form);
		/* 
		 * have no idea why I couldn't put this above
		 * the classname kept getting overridden to row_2
		*/
		_.each(data.fields, function(val, key) {
			if (key.charAt(key.length-2) === '_') {
				className = data.fields[key]['className'].replace(/ row_([0-9]+)/g, '');
				data.fields[key]['className'] += ' row' + key.substr(-2);
			}
		});

		editForm = new Form (data);
		
		return [null, wc.render('create_doc.html', req, {
			form_title : 'create document',
			method : 'POST',
			action : '/_update/new_doc/create_doc',
			form : editForm.toHTML(req),
			messages: messages
		})];
	}
};

exports.create = function (doc, req) {
	
	var messages = "",
		globalKeys = ['add', 'update', 'remove', 'permissions', '_attachment'];
	
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

	/* add values from request */
	_.each(req.form, function(val, key) {
		if (!_(key).startsWith("_") && key != "type" && globalKeys.indexOf(key) === -1) {
				if ( req.form[key] == '{}' ) {
					req.form[key] = '';
				}
    		doc[key].value = req.form[key];
		}
	});
	
	/* transform document into form definition */
	var data = new docs(doc),
	
	/* create form and render to template */
		form = new Form(data);
		
	/* validate the request against the document in storage */
	form.validate(req);

	if (form.isValid()) {
		/* to create a document */
		var docId = doc._id;
		doc._id = req.uuid;
		delete doc._rev;
		delete doc._revisions;
		delete doc._attachments;
		var title = doc.title || doc.category;
	    return [doc, wc.render('form.html', req, {
			form_title: 'edit ' + doc.type + ' - ' + title.value,
			method : 'POST',
			edit_action: '/_update/edit/',
			remove_action: '/_update/remove/',
			duplicate_action: '/_update/create/',
			id: doc._id,
			form : 'Created by ' + req.userCtx.name + ' on ' + new Date() + '<br /><br />' + form.toHTML(req),
			messages: messages
		})];
	}
	else {
		var title = doc.title || doc.category;
		var content = wc.render('form.html', req, {
			form_title: 'edit' + doc.type + ' - ' + title.value,
			method : 'POST',
			edit_action: '/_update/edit/',
			remove_action: '/_update/remove/',
			duplicate_action: '/_update/create/',
			form : form.toHTML(req),
			id : docId,
			messages: messages
		});
		return [null, content];
	}
};

/* Delete by revision */
exports.del_blank = function(doc, req) {
  var doc = {_id:'', _rev:req._rev, _deleted:true};
  return [doc, 'Trying to delete blank doc @'+doc._rev];
}

exports.edit = function (doc, req) {
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
	
	/* always have a value for boolean */
	_.each(doc, function(val, key) {
		if (!_(key).startsWith("_") && key != "type" && key !== 'permissions' && key !== 'add' && key !== 'update' && key !== 'remove') {
			if (doc[key].type === "boolean") {
				req.form[key] = (!!req.form[key]) ? true : false;
			}
		}
	});

	/* add values from request */
	_.each(req.form, function(val, key) {
		if (!_(key).startsWith("_") && key != "type" && key !== 'permissions' && key !== 'add' && key !== 'update' && key !== 'remove') {
			try {
				if (doc[key].type === "array") {
					throw "array";
				}
				doc[key].value = JSON.parse(req.form[key]);
		  } catch (e) {
		  	doc[key].value = req.form[key];
		  }
		}
	});
	
	/* transform document into form definition */
	var data = new docs(doc);

	/* create form and render to template */
	var form = new Form(data);
	
	/* validate the request against the document in storage */
	form.validate(req);

	if (form.isValid()) {
		
		/* to create a document */
		//delete form.values._rev;
		//doc._id = req.uuid;

		/* update does not accept deleted key unless false or true */
		//delete form.values._deleted;
		// or
		//doc._deleted = false;
		
		/* set to true to delete a document */
		//doc._deleted = true;
		var title = doc.title || doc.category;
    return [doc, wc.render('form.html', req, {
			form_title: 'edit ' + doc.type + ' - ' + title.value,
			thetype : doc.type,
			method : 'POST',
			edit_action: '/_update/edit/',
			remove_action: '/_update/remove/',
			duplicate_action: '/_update/create/',
			owner : doc.permissions.owner,
			id: doc._id,
			form : 'Edited by ' + req.userCtx.name + ' on ' + new Date() + '<br /><br />' + form.toHTML(req),
			messages: messages
		})];
	}
	else {
		var title = doc.title || doc.category;
		var content = wc.render('form.html', req, {
			form_title: 'edit' + doc.type + ' - ' + title.value,
			thetype : doc.type,
			method : 'POST',
			edit_action: '/_update/edit/',
			remove_action: '/_update/remove/',
			duplicate_action: '/_update/create/',
			owner : doc.permissions.owner,
			form : form.toHTML(req),
			id: doc._id,
			rev: doc._rev,
			messages: messages
		});
		return [null, content];
	}
};

exports.remove = function (doc, req) {
	
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

	/* add values from request */
	_.each(req.form, function(val, key) {
		if (!_(key).startsWith("_") && key != "type" && key !== 'permissions' && key !== 'add' && key !== 'update' && key !== 'remove' && key !== 'wc-type') {
			try {
		        doc[key].value = JSON.parse(req.form[key]);
		    } catch (e) {
		        doc[key].value = req.form[key];
		    }
		}
	});
	
	/* transform document into form definition */
	var data = new docs(doc);

	/* create form and render to template */
	var form = new Form(data);

	/* validate the request against the document in storage */
	form.validate(req);

	//if (form.isValid()) {
		/* set to true to delete a document */
		doc._deleted = true;
		var title = doc.title || doc.category;
    	return [doc, wc.render('form.html', req, {
			form_title: 'edit ' + doc.type + ' - ' + title.value,
			method : 'POST',
			edit_action: '/_update/edit/',
			remove_action: '/_update/remove/',
			duplicate_action: '/_update/create/',
			id: doc._id,
			form : 'Deleted by ' + req.userCtx.name + ' on ' + new Date() + '<br /><br />' + form.toHTML(req),
			messages: messages
		})];
	/*}
	else {
		log('invalid');
		var content = wc.render('form.html', req, {
			form_title: 'edit' + doc.type + ' - ' + doc._id,
			method : 'POST',
			edit_action: '/_update/edit/',
			remove_action: '/_update/remove/',
			duplicate_action: '/_update/create/',
			form : form.toHTML(req),
			id: doc._id,
			rev: doc._rev,
			messages: messages
		});
		return [null, content];
	}*/
};
