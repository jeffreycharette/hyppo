/**
 * List functions to be exported from the design doc.
 */
var m = "LIST+++++++++++++++=========================++++++++++++++++";
var wc = require('wc/utils'),
	utils = require('couchtypes/utils'),
	_ = require('underscore')._,
	_s = require('underscore-string');

	// Mix in non-conflict functions to Underscore namespace if you want
	_.mixin(_s.exports()),
	globalKeys = ['_id', '_rev', 'template', 'type', 'permissions'];
	
	function isNumber(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	}
	Number.prototype.between = function(first,last){
	    return (first < last ? this >= first && this <= last : this >= last && this <= first);
	}
	
	exports.query = function(head, req) {
		if (!req.query.key && !req.query.keys) {
			start({code: 400, headers: {'Content-Type': 'text/html'}})
			return '';
		}
		var doc = [],
			raw = {},
			partial = {},
			row = [],
			className = "",
			push = false,
			template = (typeof req.query.template !== 'undefined') ? req.query.template : '',
			contentType = req.query.format || 'html',
			sort = req.query.sort || false,
			reverse = !!req.query.reverse || false,
			limit = parseInt(req.query.number) || '',
			range = ( !!req.query.range ) ? req.query.range.split(',') : false,
			shift = parseInt(req.query.shift) || '',
			user = req.query.user || false,
			id = req.query.id || false,
			editor = req.query.editor || false,
			exclude = req.query.exclude || false,
			excludeValue = req.query.exclude_value || false,
			group_by = req.query.group_by || false,
			instock = req.query.instock || false;

		/* set content type before getRow or couch it will stream json by default */
		if (contentType === 'html') {
			start({code: 200, headers: {'Content-Type': 'text/html'}})
		}
		else if (contentType === 'vcf') {
			template = "_vcard.vcf";
			start({code: 200, headers: {'Content-Type': 'text/x-vcard'}});
		}
		else {
			start({code: 200, headers: {'Content-Type': 'application/json'}});
		}
		req.userCtx.name = req.userCtx.name || req.cookie['wc_guest'];

		while (row = getRow()) {
			if (!!user) {
				push = ((row.doc.permissions.owner === req.userCtx.name)) ? true : false;
				/* only admins can see other user docs */
				if (req.userCtx.roles.indexOf('_admin') !== -1) {
					push = true;
				}
				if (user !== 'true' && req.userCtx.roles.indexOf('_admin') !== -1) {
					push = ((row.doc.permissions.owner === user)) ? true : false;
				}
			}
			else {
				push = true;
			}
			if (!!id) {
				push = (row.doc._id === id) ? true : false;
			}
			if (!!push) {
				doc.push(row);
			}
		}
		
		/* whether to exclude if not in stock */
		if (!!instock) {
			doc = _.filter(doc, function(v, k) {
				return v.doc.stock.value > 0;
			});
		}

		/* sort here because we cannot sort in couch by type and an arbitrary key */
		//issue when sort is left blank
		//sort = (sort == "") ? false : sort;
		if (sort) {
			/* note: _.sortBy is overly complicated for reversal and slow so we use array sort */
			doc.sort(function(a, b) {
				a = a.doc[req.query.sort].value;
				b = b.doc[req.query.sort].value;
				if (!isNumber(a)) {
					a = 1;
				}
				if (!isNumber(b)) {
					b = 1;
				}
				if (reverse) {
					var c = a;
					a = b;
					b = c;
				}
				//if (isNumber(a.doc[req.query.sort].value)) {
				return a - b;
				/* string ordering needs some work
				}
				else {
					return a.doc[req.query.sort].value.toLowerCase().localeCompare(b.doc[req.query.sort].value.toLowerCase());
				}*/
			});
		}
		
		/* limit items here because couch will not work with sort and may leave out docs */
		if (isNumber(limit)) {
			var cnt = doc.length;
			doc = _.filter(doc, function(v, k) {
				if (limit < 0) {
					return ( k+1 > (cnt + limit) );
				}
				else {
					return k < limit;
				}
			});
		}
				
		/* ranges, we can fold this into limits later so you can just say range = 1 or range = 0,1 */
		/* also may try negative ranges ex: -1,1 would return the first and last with last first */
		if (!!range) {
			doc = _.filter(doc, function(v, k) {
				k++;
				return ( k.between(range[0], range[1]) );
			});
		}
		/* shift to start from an offset */
		if (isNumber(shift)) {
			doc = _.filter(doc, function(v, k) {
				return k >= shift;
			});
		}
		/* group by */
		if (!!group_by) {
			var lastValue = "";
			doc = _.filter(doc, function(v, k) {
				if (lastValue !== v.doc[group_by].value) {
					lastValue = v.doc[group_by].value;
					return true;
				}
			});
		}
		
		if (!!exclude) {
			if (!!excludeValue) {
				doc = _.filter(doc, function(v, k) {
					return v.doc[exclude].value !== excludeValue;
				});
			}
			else {
				doc = _.filter(doc, function(v, k) {
					return typeof v.doc[exclude] !== 'undefined';
				});
			}
		}
		/* rendering only top level documents and only parsing base array */
		_.each(doc, function(v, k) {
			/* flattern the value of the document to the key */
			_.each(v.doc, function(val, key) {
				if (globalKeys.indexOf(key) === -1 || key === 'template') {
					className = (typeof val.options === 'undefined') ? '' : val.options.widget.type.replace('-','_').replace(/ /g,'_');
					if (typeof val.value === 'object') {
				        doc[k][key] = (className !== "query") ? _.flatten(val.value) : '<span class="wc-query">' + JSON.stringify(val.value) + '</span>';
				  	}
				 	else {
				  		doc[k][key] = val.value;
				  	}
					if (val.type === 'array') {
						doc[k][key] = utils.parseCSV(val.value.toString() || '')[0] || [];
						doc[k][key + '-offset'] = 12 - (doc[k][key].length * 2);
					}
				}
				else {
					doc[k][key] = val;
				}
			});
			if (typeof v.doc != 'undefined') {
				if (v.doc['category']) {
					doc[k]['classname'] = v.doc['category'].value.toLowerCase().replace('&','').replace(/-/g, '').replace(/ /g,'');
				}
			}
			delete v.doc;

			/* validate document access */
			if (!!v.permissions.owner) {
				if (req.userCtx.name !== v.permissions.owner && req.userCtx.roles.indexOf('_admin') === -1 && !v.permissions.add) {
					template = "wc-login.html";
					contentType = "html";
				}
			}
			/* prefer passed template then document template then go to json */
			if (!template) {
				if (doc[k]['template'] !== '') {
					doc[k] = wc.render(doc[k]['template'], req, v);
				}
				else {
					contentType = 'json';
				}
			}
			else if (template == 'raw') {
				contentType = 'json';
			}
			else {
				doc[k] = wc.render(template, req, v);
			}
			if (!!editor && contentType === 'html') {
				doc[k] = '<span class="wc_editable" id="' + v.id.replace('-','_').replace(/ /g,'_') + '">' + doc[k] + '</span>';
			}
		});
		
		if (!!user && doc.length < 1) {
			//doc[0] = wc.render('_login-modal.html', req, {});
		}

		if (contentType === 'html') {
			return doc;
		}
		else if (contentType === 'vcf') {
			return doc;
		}
		else {
			return JSON.stringify(doc);
		}
	};
	
	exports.queryedit = function(head, req) {
		var doc = [],
			raw = {},
			partial = {},
			row = [],
			template = (typeof req.query.template !== 'undefined') ? req.query.template : '',
			contentType = req.query.format || 'json',
			sort = req.query.sort || false,
			reverse = !!req.query.reverse || false,
			limit = parseInt(req.query.number) || '',
			range = ( !!req.query.range ) ? req.query.range.split(',') : false,
			className = '',
			typeName = '',
			shift = parseInt(req.query.shift) || '',
			user = req.query.user || false;

		/* set content type before getRow or couch it will stream json by default */
		(contentType === 'html') ? start({code: 200, headers: {'Content-Type': 'text/html'}}) : start({code: 200, headers: {'Content-Type': 'application/json'}});
		
		while (row = getRow()) {
			if (!!user) {
				if (row.doc.permissions.owner === req.userCtx.name) {
					doc.push(row);
				}
			}
			else {
				doc.push(row);
			}
		}

		/* sort here because we cannot sort in couch by type and an arbitrary key */
		if (sort) {
			/* note: _.sortBy is overly complicated for reversal and slow so we use array sort */
			doc.sort(function(a, b) {
				a = a.doc[req.query.sort].value;
				b = b.doc[req.query.sort].value;
				if (!isNumber(a)) {
					a = 1;
				}
				if (!isNumber(b)) {
					b = 1;
				}
				if (reverse) {
					var c = a;
					a = b;
					b = c;
				}
				//if (isNumber(a.doc[req.query.sort].value)) {
				return a - b;
				/* string ordering needs some work
				}
				else {
					return a.doc[req.query.sort].value.toLowerCase().localeCompare(b.doc[req.query.sort].value.toLowerCase());
				}*/
			});
		}
		
		/* limit items here because couch will not work with sort and may leave out docs */
		if (isNumber(limit)) {
			var cnt = doc.length;
			doc = _.filter(doc, function(v, k) {
				if (limit < 0) {
					return ( k+1 > (cnt + limit) );
				}
				else {
					return k < limit;
				}
			});
		}
		
		/* ranges, we can fold this into limits later so you can just say range = 1 or range = 0,1 */
		/* also may try negative ranges ex: -1,1 would return the first and last with last first */
		if (!!range) {
			doc = _.filter(doc, function(v, k) {
				k++;
				return ( k.between(range[0], range[1]) );
			});
		}
		
		/* shift to start from an offset */
		if (isNumber(shift)) {
			doc = _.filter(doc, function(v, k) {
				return k >= shift;
			});
		}
		
		/* rendering only top level documents and only parsing base array */
		_.each(doc, function(v, k) {
			/* flattern the value of the document to the key */
			_.each(v.doc, function(val, key) {
				if (globalKeys.indexOf(key) === -1 || key === 'template') {
					typeName = (typeof val.type === 'undefined') ? '' : val.type.replace(/ /g,'_');
					className = (typeof val.options === 'undefined') ? '' : val.options.widget.type.replace('-','_').replace(/ /g,'_');
					if (typeName === "boolean" || val.value === "" || key === 'template' || typeName === "meta") {
						doc[k][key] = val.value;
					}
					else if (typeof val.value === 'object') {
				        doc[k][key] = (className !== "query") ? _.flatten(val.value) : '<span class="wc-query">' + JSON.stringify(val.value) + '</span>';
				    }
				 	else {
				        doc[k][key] = '<span class="wc_editable ' + 'wc-' + typeName + '-' + className + '" id="' + v.id.replace('-','_').replace(/ /g,'_') + '-' + key.replace('-','_').replace(/ /g,'_') + '">' + val.value + '</span>';
				    }
					if (val.type === 'array') {
						doc[k][key] = utils.parseCSV(val.value.toString() || '')[0] || [];
						doc[k][key + '-offset'] = 12 - (doc[k][key].length * 2);
					}
				}
				else if (key !== 'permissions') {
					doc[k][key] = val;
				}
				else {
					//delete row.doc[key];
				}
			});

			/* validate document access */
			if (!!v.doc.permissions.owner) {
				if (req.userCtx.name !== v.doc.permissions.owner && req.userCtx.roles.indexOf('_admin') === -1) {
					template = "wc-login.html";
					contentType = "html";
				}
			}
			if (v.doc['category']) {
				doc[k]['classname'] = v.doc['category'].value.toLowerCase().replace('&','').replace(/-/g, '').replace(/ /g,'');
			}
			doc[k]['pin'] = '<div class="wc_editable wc-text-pin" style="position:relative;" id="' + v.id.replace('-','_').replace(/ /g,'_') + '-pin"> </div>';
			
			delete v.doc;

			/* prefer passed template then document template then go to json */
			if (!template) {
				if (doc[k]['template'] !== '') {
					doc[k] = wc.render(doc[k]['template'], req, v);
				}
				else {
					contentType = 'json';
				}
			}
			else if (template == 'raw') {
				contentType = 'json';
			}
			else {
				doc[k] = wc.render(template, req, v);
			}
		});
		
		if (!!user && doc.length < 1) {
			doc[0] = wc.render('wc-login.html', req, {});
		}
		
		if (contentType === 'html') {
			return doc;
		}
		else {
			return JSON.stringify(doc);
		}
	};
	
	exports.update_owner = function(head, req) {
		var doc = [];
		start({code: 200, headers: {'Content-Type': 'application/json'}});
			while (row = getRow()) {
				if (row.value.permissions.owner.length > 1 && req.query.location.length > 1) {
					if (row.value._id === row.value.permissions.owner + 'poll') {
						row.value._id = req.query.location + 'poll';
					}
					else {
						row.value._id = req.uuid;
					}
					row.value.permissions.owner = req.query.location;
					delete row.value._rev;
					delete row.value._revisions;
					doc.push(row.value);
				}
			}
			return JSON.stringify(doc);
	};
	
/* using only shows and getting rid of globals */
/*	exports.page = function(head, req) {
		var doc = {},
			partial = {},
			row = [],
			className = "";

		if (typeof req.query.id !== 'undefined') {
			var reqID = req.query.id.split(".", 2)[0] || 'index',
				contentType = req.query.id.split(".", 2)[1] || 'html';
		}
		if (typeof req.query.template !== 'undefined') {
			var template = req.query.template || '';
		}

		if (contentType === 'json') {
			start({code: 200, headers: {'Content-Type': 'application/json'}});
		}
		else if (contentType === 'html') {
			start({code: 200, headers: {'Content-Type': 'text/html'}});
		}

		while (row = getRow()) {
			_.each(row.doc, function(val, key) {
				if (globalKeys.indexOf(key) === -1 || key === 'template') {
					className = (typeof val.options === 'undefined') ? '' : val.options.widget.type.replace('-','_').replace(/ /g,'_');
					if (typeof val.value === 'object' && className !== "query") {
				        row.doc[key] = _.flatten(val.value);
				    }
					else if (className == "query") {
						row.doc[key] = '<span class="wc-query">' + JSON.stringify(val.value) + '</span>';
				    }
				 	else {
				        row.doc[key] = val.value;
				    }
				}
				else if (key !== 'permissions') {
					row.doc[key] = val;
				}
				else {
					//delete row.doc[key];
				}
			});
			
			if (row.doc._id === reqID) {
				_.defaults(doc, row.doc);
			}
			else if (row.doc.type !== 'page') {
				if (typeof doc[row.doc.type] === 'undefined') {
					doc[row.doc.type] = [];
				}
				if (typeof partial[row.doc.type] === 'undefined') {
					partial[row.doc.type] = [];
				}
				
				if (!row.doc.template) {
					partial[row.doc.type].push(row.doc);
				}
				else {
					partial[row.doc.type].push(wc.render(row.doc.template, req, row.doc));
				}
				
				doc[row.doc.type].push(row.doc);
			}
		}
		_.each(doc, function(v, k) {
			if (typeof v === 'object' && k !== 'permissions') {
				_.each(v, function(val, key) {
					if (typeof partial[k] !== 'undefined') {
						if (typeof partial[k][0] === 'object' || typeof val.template === "undefined" || val.template === '') {
							doc[k][key] = _.defaults(val, partial);
						}
						else {
							doc[k][key] = wc.render(val.template, req, _.defaults(val, partial));
						}
					}
				});
			}
		});*/
		
		/* validate document access */
/*		if (!!doc.permissions.owner) {
			if (req.userCtx.name !== doc.permissions.owner && req.userCtx.roles.indexOf('_admin') === -1) {
				doc['template'] = "login.html";
				contentType = "html";
			}
		}

		if (contentType === 'json') {
			return JSON.stringify(doc);
		}
		else if (contentType === 'html') {
			return wc.render(doc.template || "404.html", req, doc);
		}
	};
	
	exports.edit = function(head, req) {
		start({code: 200, headers: {'Content-Type': 'text/html'}});
		
		var doc = {},
			partial = {},
			row = [],
			contentType = req.query.id.split(".", 2)[1] || 'html',
			reqID = req.query.id.split(".", 2)[0] || 'index',
			className = "",
			typeName = "",
			header = new RegExp(/<body(.*?)>/gi);

		while (row = getRow()) {
			_.each(row.doc, function(val, key) {
				if (globalKeys.indexOf(key) === -1) {
					typeName = (typeof val.type === 'undefined') ? '' : val.type.replace(/ /g,'_');
					className = (typeof val.options === 'undefined') ? '' : '-' + val.options.widget.type.replace('-','_').replace(/ /g,'_');
					if (typeof val.value === 'object' && className !== "-query") {
				        row.doc[key] = _.flatten(val.value);
				    }
				 	else if (className == "-query") {
						row.doc[key] = '<span class="wc_editable ' + 'wc-' + typeName + className + '" id="' + row.doc._id.replace('-','_').replace(/ /g,'_') + '-' + key.replace('-','_').replace(/ /g,'_') + '"><span class="wc-query">' + JSON.stringify(val.value) + '</span></span>';
				    }
				 	else {
						row.doc[key] = '<span class="wc_editable ' + 'wc-' + typeName + className + '" id="' + row.doc._id.replace('-','_').replace(/ /g,'_') + '-' + key.replace('-','_').replace(/ /g,'_') + '">' + val.value + '</span>';
				    }
				}
				else if (key === 'template') {
					row.doc[key] = val.value;
				}
				else if (key !== 'permissions') {
					row.doc[key] = val;
				}
				else {
					//delete row.doc[key];
				}
			});

			if (row.doc._id === reqID) {
				_.defaults(doc, row.doc);
			}
			else if (row.doc.type !== 'page') {
				if (typeof doc[row.doc.type] === 'undefined') {
					doc[row.doc.type] = [];
				}
				if (typeof partial[row.doc.type] === 'undefined') {
					partial[row.doc.type] = [];
				}
				
				if (!row.doc.template) {
					partial[row.doc.type].push(row.doc);
				}
				else {
					partial[row.doc.type].push(wc.render(row.doc.template, req, row.doc));
				}
				
				doc[row.doc.type].push(row.doc);
			}
		}

		_.each(doc, function(v, k) {
			if (typeof v === 'object' && k !== 'permissions') {
				_.each(v, function(val, key) {
					if (typeof partial[k] !== 'undefined') {
						if (typeof partial[k][0] === 'object' || typeof val.template === "undefined" || val.template === '') {
							doc[k][key] = _.defaults(val, partial);
						}
						else {
							doc[k][key] = wc.render(val.template, req, _.defaults(val, partial));
						}
					}
				});
			}
		});
		
		_.each(doc, function(val, key) {*/
		/* see if we have any values otherwise link to */
/*			if (val.toString().indexOf('wc_editable') === -1 && globalKeys.indexOf(key) === -1 && typeof(val[0]) !== 'object') {
				if (header.test(val.toString())) {
					doc[key] = val.toString().replace(header, '<body$1><span style="float:left;width:36px;height:36px;" class="wc_editable wc-' + key.replace(' ','_') + '-document" id="' + key.replace(' ','_') + '-document">&nbsp;</span>');
				}
				else {
					doc[key] = '<span class="wc_editable wc-' + key.replace(' ','_') + '-document" id="' + key.replace(' ','_') + '-document">' + val + '</span>';
				}
			}
		});*/
		
		/* validate document access */
/*		if (!!doc.permissions.owner) {
			if (req.userCtx.name !== doc.permissions.owner && req.userCtx.roles.indexOf('_admin') === -1) {
				doc['template'] = "login.html";
				contentType = "html";
			}
		}*/
		
		/* render template with all documents */
/*		doc = wc.render(doc.template || "404.html", req, doc);
		
		return doc.toString().replace(header, '<body$1><span style="float:left;width:36px;height:36px;" class="wc_editable wc_global wc-' + reqID + '-document" id="' + reqID + '-document">&nbsp;</span>');
	};*/