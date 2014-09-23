/*global $: false, kanso: true*/

/**
 * Widgets define the way a Field object is displayed when rendered as part of a
 * Form. Changing a Field's widget will be reflected in the admin app.
 *
 * @module
 */

/**
 * Module dependencies
 */

var sanitize = require('sanitize'),
    session = require('session'),
    _ = require('underscore')._,
		_s = require('underscore-string'),
		h = sanitize.escapeHtml;
		
		// Mix in non-conflict functions to Underscore namespace if you want
		_.mixin(_s.exports());


/**
 * Widget constructor, creates a new Widget object.
 *
 * @name Widget(type, [options])
 * @param {String} type
 * @param {Object} options
 * @constructor
 * @returns {Widget Object}
 * @api public
 */

var Widget = exports.Widget = function Widget(type, options) {
    options = (options || {});
    this.classes = (options.classes || []);
    this.options = options;
    this.id = options.id;
    this.type = type;
};

/**
 * Generates an id string for a widget.
 *
 * @param {String} name - field name on the HTML form
 * @param {String} extension - optional; a string to be added
 *                  to the generated identifier. Use this when you
 *                  want to make an identifier that is related to
 *                  an existing identifier, but is still unique.
 * @returns {String}
 */

Widget.prototype._id = function (name /* , ... */) {
    return sanitize.generateDomIdentifier.apply(
        this, [ this.id || name ].concat(
            Array.prototype.slice.call(arguments, 1)
        )
    );
};

/**
 * Generates a name string for a widget.
 *
 * @param {String} name - field name on the HTML form
 * @param {String} extension - optional; a string to be added
 *                  to the generated identifier. Use this when you
 *                  want to make an identifier that is related to
 *                  an existing identifier, but is still unique.
 * @returns {String}
 */

Widget.prototype._name = function (name /* , ... */) {
    return sanitize.generateDomName.apply(
        this, [ name ].concat(
            Array.prototype.slice.call(arguments, 1)
        )
    );
};

/**
 * Converts an input element's value attribute to a valid
 * in-memory representation of the document or document fragment.
 * This function tries to interpret the string as JSON if it's
 * appropriate; otherwise the string is left alone.
 *
 * @name _parse_value(value)
 * @param {String} value The string value to parse. If value is
 *          already an object, it it returned with no modifications.
 * @returns {Object}
 */

Widget.prototype._parse_value = function (value)
{
    var rv = value;

    if (typeof(rv) === 'string') {
        rv = JSON.parse(rv);
    }

    return rv;
};

/**
 * Converts an in-memory representation of the document or
 * document fragment in to an encoded string. If the value
 * passed is already encoded, this function does nothing.
 *
 * @name _stringify_value(value)
 * @param {String} value The value to encode. If value is already
 *          a string, it is returned with no modifications.
 * @returns {Object}
 */

Widget.prototype._stringify_value = function (value)
{
    var rv = value;

    if (typeof(rv) !== 'string') {
        rv = JSON.stringify(rv);
    }

    return rv;
};

/**
 * Converts a widget to HTML using the provided name and parsed and raw values
 *
 * @name Widget.toHTML(name, value, raw, field, options)
 * @param {String} name
 * @param value
 * @param raw
 * @param field
 * @param options
 * @returns {String}
 * @api public
 */

Widget.prototype.toHTML = function (name, value, raw, field, options) {
	//log("name\n" + JSON.stringify(name) + "\n\nvalue\n" + JSON.stringify(value) + "\n\nraw\n" + JSON.stringify(raw) + "\n\nfield\n" + JSON.stringify(field) + "\n\noptions\n" + JSON.stringify(options) + "\n\n");
	
    if (raw === undefined) {
        raw = (value === undefined) ? '': '' + value;
    }
    if (raw === null || raw === undefined) {
        raw = '';
    }
    var html = '<input';
    html += (this.type ? ' type="' + h(this.type) + '"': '');
	if (typeof raw === "object") {
		raw = JSON.stringify(raw);
	}
    html += ' value="' + h(raw) + '"';
    html += ' name="' + this._name(name, options.offset) + '" id="';
    html += this._id(name, options.offset, options.path_extra) + '"';

    // additionaly parameters optionally passed to widget
    if ('maxlength' in this.options) {
        html += ' maxlength="' + h(this.options.maxlength) + '"';
    }
    if ('size' in this.options) {
        html += ' size="' + h(this.options.size) + '"';
    }
    if ('disabled' in this.options) {
        html += ' disabled="' + h(this.options.disabled) + '"';
    }
    if ('readonly' in this.options) {
        html += ' readonly="' + h(this.options.readonly) + '"';
    }
		if ('placeholder' in this.options) {
        html += ' placeholder="' + h(this.options.placeholder) + '"';
    }
    return html + ' />';
};

/**
 * Initializes a widget on the client-side only, using the browser's
 * script interpreter. This function is guaranteed to be called
 * after toHTML, and any DOM elements created by toHTML are
 * guaranteed to be accessible
 *
 * @name Widget.clientInit(path, value, raw, field, options)
 * @param {Array} path
 * @param value
 * @param raw
 * @param field
 * @param options
 * @returns {Boolean}
 * @api public
 */

Widget.prototype.clientInit = function (path, value, raw, field, options) {
    return true;
};

/**
 * Called by CouchTypes when it becomes necessary to rename this widget
 * instance. The widget should respond by updating the id and name
 * attributes.
 *
 * @name Widget.updateName(path)
 * @param {String} elt An element that contains one or
 *          more instances of the widget referenced by `this'.
 * @param {String} path The widget's new path; combine this using
 *          the _name or _id function to generate a usable string.
 * @param {Object} options A new set of toHTML/clientInit options.
 *          This may or may not influence the widget's name.
 * @api public
 */

Widget.prototype.updateName = function (elt, path, options) {
    var e = $('input[type=hidden]', elt);
    e.attr('id', this._id(path, options.offset, options.path_extra));
    e.attr('name', this._name(path, options.offset, options.path_extra));
};

/**
 * Called by CouchTypes when it becomes necessary to rename this widget
 * instance. The widget should respond by updating the value attribute.
 *
 * @name Widget.updateValue(elt, path, value, options)
 * @param {String} elt An element that contains one or
 *          more instances of the widget referenced by `this'.
 * @param {String} path The path to the widget.
 * @param {Object} value The new value for the widget, unencoded.
 * @param {Object} options An up-to-date set of toHTML/clientInit options.
 * @api public
 */

Widget.prototype.updateValue = function (elt, path, value, options) {
    elt = $(elt).closestChild('input[type=hidden]');
    elt.val(this._stringify_value(value));
};

/**
 * Called by CouchTypes when it becomes necessary to interrogate this
 * widget to determine its value. The widget should respond by
 * returning an unencoded value (typically as an object).
 *
 * @name Widget.getValue(elt, path, options)
 * @param {String} elt An element that contains one or
 *          more instances of the widget referenced by `this'.
 * @param {String} path The path to the widget.
 * @param {Object} options An up-to-date set of toHTML/clientInit options.
 * @api public
 */

Widget.prototype.getValue = function (elt, path, options) {
    return this._parse_value(
        $(elt).closestChild('input[type=hidden]').val()
    );
};

/**
 * Called by CouchTypes when it becomes necessary to validate the
 * contents of this widget -- i.e. to ensure it's in a consistent
 * state before using its value or proceeding. Most widgets will
 * not implement this method; its primary use is complex widgets
 * that host validation-enabled forms and/or types. Returns true
 * if the contents is consistent and valid; false otherwise.
 *
 * @name Widget.validate(elt, path, options)
 * @param {String} elt An element that contains one or
 *          more instances of the widget referenced by `this'.
 * @param {String} path The path to the widget.
 * @param {Object} options An up-to-date set of toHTML/clientInit options.
 * @api public
 */

Widget.prototype.validate = function (elt, path, options) {
    return true;
};

/**
 * Creates a new text input widget.
 *
 * @name text([options])
 * @param options
 * @returns {Widget Object}
 * @api public
 */

exports.text = function (options) {
    return new Widget('text', options);
};

/**
 * Creates a new query input widget.
 *
 * @name text([options])
 * @param options
 * @returns {Widget Object}
 * @api public
 */

exports.query = function (options) {
    return new Widget('query', options);
};

/**
 * Creates a new password input widget.
 *
 * @name password([options])
 * @param options
 * @returns {Widget Object}
 * @api public
 */

exports.password = function (options) {
    return new Widget('password', options);
};

/**
 * Creates a new hidden input widget.
 *
 * @name hidden([options])
 * @param options
 * @returns {Widget Object}
 * @api public
 */

exports.hidden = function (options) {
    return new Widget('hidden', options);
};

/**
 * Creates a new textarea widget.
 *
 * @name textarea([options])
 * @param options
 * @returns {Widget Object}
 * @api public
 */

exports.textarea = function (_options) {
    var w = new Widget('textarea', _options || {});
    w.options = _options;
    w.toHTML = function (name, value, raw, field, options) {
        if (raw === undefined) {
            raw = (value === undefined) ? '': '' + value;
        }
        if (raw === null || raw === undefined) {
            raw = '';
        }
        var html = '<textarea';
        html += ' name="' + this._name(name, options.offset) + '" id="';
        html += this._id(name, options.offset, options.path_extra) + '"';

        if (this.options.hasOwnProperty('cols')) {
            html += ' cols="' + h(this.options.cols) + '"';
        }
        if (this.options.hasOwnProperty('rows')) {
            html += ' rows="' + h(this.options.rows) + '"';
        }
        html += '>' + h(raw);
        html += '</textarea>';
        return html;
    };
    return w;
};

/**
 * Creates a new datetime widget.
 *
 * @name datetime([options])
 * @param options
 * @returns {Widget Object}
 * @api public
 */

exports.datetime = function (_options) {
    var w = new Widget('datetime', _options || {}),
		hours = _.range(1,13),
		minutes = _.range(0,46,15),
		meridiem = ['am', 'pm'],
		dow = ['everyday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
		
    w.options = _options;
    w.toHTML = function (name, value, raw, field, options) {
        if (raw === undefined) {
            raw = (value === undefined) ? '': +value;
        }
        if (raw === null || raw === undefined) {
            raw = '';
        }

				var html = '<h3>Show</h3><label>Day of Week</label>';
        html += '<select multiple';
        html += ' name="' + this._name(name, options.offset) + '-dow-start" id="';
        html += this._id(name, options.offset, options.path_extra) + '">';
        for (var i = 0; i < dow.length; i++) {
            html += '<option value="' + dow[i] + '"';
            if (dow[i] === value) {
                html += ' selected="selected"';
            }
            html += '>';
            html += dow[i];
            html += '</option>';
        }
        html += '</select>';
				
				html += '<label>Time</label>';
        html += '<select';
        html += ' name="' + this._name(name, options.offset) + '-hours-start" id="';
        html += this._id(name, options.offset, options.path_extra) + '">';
        for (var i = 0; i < hours.length; i++) {
            html += '<option value="' + hours[i] + '"';
            if (hours[i] === value) {
                html += ' selected="selected"';
            }
            html += '>';
            html += hours[i];
            html += '</option>';
        }
        html += '</select>';
        
				html += '<select';
        html += ' name="' + this._name(name, options.offset) + '-minutes-start" id="';
        html += this._id(name, options.offset, options.path_extra) + '">';
        for (var i = 0; i < minutes.length; i++) {
            html += '<option value="' + minutes[i] + '"';
            if (minutes[i] === value) {
                html += ' selected="selected"';
            }
            html += '>';
            html += _.pad(minutes[i], 2, '0');
            html += '</option>';
        }
        html += '</select>';

				html += '<select';
        html += ' name="' + this._name(name, options.offset) + '-meridiem-start" id="';
        html += this._id(name, options.offset, options.path_extra) + '">';
        for (var i = 0; i < meridiem.length; i++) {
            html += '<option value="' + meridiem[i] + '"';
            if (meridiem[i] === value) {
                html += ' selected="selected"';
            }
            html += '>';
            html += meridiem[i];
            html += '</option>';
        }
        html += '</select>';

				html += '<h3>Hide</h3><label>Day of Week</label>';
        html += '<select multiple';
        html += ' name="' + this._name(name, options.offset) + '-dow-end" id="';
        html += this._id(name, options.offset, options.path_extra) + '">';
        for (var i = 0; i < dow.length; i++) {
            html += '<option value="' + dow[i] + '"';
            if (dow[i] === value) {
                html += ' selected="selected"';
            }
            html += '>';
            html += dow[i];
            html += '</option>';
        }
        html += '</select>';
				
				html += '<label>Time</label>';
        html += '<select';
        html += ' name="' + this._name(name, options.offset) + '-hours-end" id="';
        html += this._id(name, options.offset, options.path_extra) + '">';
        for (var i = 0; i < hours.length; i++) {
            html += '<option value="' + hours[i] + '"';
            if (hours[i] === value) {
                html += ' selected="selected"';
            }
            html += '>';
            html += hours[i];
            html += '</option>';
        }
        html += '</select>';
        
				html += '<select';
        html += ' name="' + this._name(name, options.offset) + '-minutes-end" id="';
        html += this._id(name, options.offset, options.path_extra) + '">';
        for (var i = 0; i < minutes.length; i++) {
            html += '<option value="' + minutes[i] + '"';
            if (minutes[i] === value) {
                html += ' selected="selected"';
            }
            html += '>';
            html += _.pad(minutes[i], 2, '0');
            html += '</option>';
        }
        html += '</select>';

				html += '<select';
        html += ' name="' + this._name(name, options.offset) + '-meridiem-end" id="';
        html += this._id(name, options.offset, options.path_extra) + '">';
        for (var i = 0; i < meridiem.length; i++) {
            html += '<option value="' + meridiem[i] + '"';
            if (meridiem[i] === value) {
                html += ' selected="selected"';
            }
            html += '>';
            html += meridiem[i];
            html += '</option>';
        }
        html += '</select>';

        html += '<input type="text"';
        html += ' name="' + this._name(name, options.offset) + '" id="';
        html += this._id(name, options.offset, options.path_extra) + '"';
				html += ' class="hide"';
        html += 'value="' + h(raw) + '">';

        return html;
    };
    return w;
};

/**
 * Creates a new checkbox widget.
 *
 * @name checkbox([options])
 * @param options
 * @returns {Widget Object}
 * @api public
 */

exports.checkbox = function (_options) {
    var w = new Widget('checkbox', _options || {});
    w.toHTML = function (name, value, raw, field, options) {
        var html = '<input type="checkbox"';
        html += ' name="' + this._name(name, options.offset) + '" id="';
        html += this._id(name, options.offset, options.path_extra) + '"';
        html += (value ? ' checked="checked"': '');
        return (html + ' />');
    };
    return w;
};

/**
 * Creates a new select widget.
 *
 * @name select([options])
 * @param options
 * @returns {Widget Object}
 * @api public
 */

exports.select = function (_options) {
    var w = new Widget('select', _options || {});
    w.values = _options.values;
    w.toHTML = function (name, value, raw, field, options) {
        if (value === null || value === undefined) {
            value = '';
        }

        var html = '<select';
        html += ' name="' + this._name(name, options.offset) + '" id="';
        html += this._id(name, options.offset, options.path_extra) + '">';
        for (var i = 0; i < this.values.length; i++) {
            var opt = this.values[i];
            html += '<option value="' + h(opt[0]) + '"';
            if (opt[0] === value) {
                html += ' selected="selected"';
            }
            html += '>';
            html += h(opt[1]);
            html += '</option>';
        }
        html += '</select>';
        return html;
    };
    return w;
};

/**
 * wearecharette.com - 11-21-2012
 * Creates a new selectlookup widget.
 *
 * @name select([options])
 * @param options
 * @returns {Widget Object}
 * @api public
 */

exports.selectlookup = function (_options) {
    var w = new Widget('selectlookup', _options || {});
    w.values = _options.values;
    w.toHTML = function (name, value, raw, field, options) {
        if (value === null || value === undefined) {
            value = '';
        }

        var html = '<select';
        html += ' name="' + this._name(name, options.offset) + '" id="';
        html += this._id(name, options.offset, options.path_extra) + '">';
        html += '</select><div class="view">'+w.options.view+'</div><div class="selected">'+value+'</div>';
        return html;
    };
    return w;
};

/**
 * Creates a new computed widget. Computed widgets display a string, but are
 * uneditable, working as a hidden field behind the scenes.
 *
 * @name computed([options])
 * @param options
 * @returns {Widget Object}
 * @api public
 */

exports.computed = function (_options) {
    var w = new Widget('computed', _options);
    w.toHTML = function (name, value, raw, field, options) {
        if (raw === undefined) {
            raw = (value === undefined) ? '': '' + value;
        }
        if (raw === null || raw === undefined) {
            raw = '';
        }
        var html = '<div id="';
        html += this._id(name, options.offset, options.path_extra) + '">';
        html += '<input type="hidden" value="' + h(raw) + '"';
        html += ' name="' + this._name(name, options.offset) + '" />';
        html += '<span>' + h(raw) + '</span>';
        html += '</div>';
        return html;
    };
    return w;
};

/**
 * Creates a new computed input widget which sets the value of the field to
 * the current user on new documents, responding to sessionChange events
 *
 * @name creator([options])
 * @param options
 * @returns {Widget Object}
 * @api public
 */

exports.creator = function (options) {
    var w = exports.computed(options);
    var _toHTML = w.toHTML;
    var el_name; // store input name provided by renderer
    var el; // store reference to element so we can detect when its been removed

    w.toHTML = function (name/*, ...*/) {
        el_name = name;
        return _toHTML.apply(this, arguments);
    };
    w.clientInit = function (field, path, value, raw, errors, options) {
        if (options.operation === 'add') {

            var id = w._id(el_name, options.offset, options.path_extra);

            // store reference to container element
            el = $('#' + id)[0];

            var update_val = function (userCtx, req) {
                var container = $('#' + id)[0];
                if (el !== container) {
                    // element has been removed
                    session.removeListener('change', update_val);
                    return;
                }
                if (container) {
                    $('input', container).val(userCtx.name || '');
                    $('span', container).text(userCtx.name || '');
                }
                else {
                    // element has been removed from page (or was never there?)
                    session.removeListener('change', update_val);
                }
            };
            session.on('change', update_val);
        }
    };
    return w;
};


/**
 * Creates a new file input widget.
 *
 * @name file([options])
 * @param options
 * @returns {Widget Object}
 * @api public
 */

exports.file = function (options) {
    var w = new Widget('file', options);
    w.name;
    w.val = {};

    w.toHTML = function (name, value, raw, field, options) {
        this.name = name;
        this.val = value || {};

        var id = this._id(name, options.offset, options.path_extra);
        var html = '<div id="' + id + '">';
				var isChecked = '';
        html += '<input type="hidden" class="file_array" value="' + h(JSON.stringify(value)) + '"';
        html += ' name="' + this._name(name, options.offset) + '" />';

        html += '<ul class="wc-files sortable">';
				var i = 0;
        for (var k in this.val) {
			if (typeof this.val[k].type !== 'undefined') {
            	html += '<li sortorder="' + i + '">';
				if (this.val[k].type.indexOf("image") !== -1) {
					html += '<img class="left" src="/menuat/' + field.id + '/' + this.val[k].name + '" width="60" height="107" /> ' + '<div class="wc-image-meta">' + this.val[k].name + '<br/> (' + bytesToSize(this.val[k].size, 2) + ') <br />' + this.val[k].width + ' X ' + this.val[k].height;
				}
				else if (this.val[k].type.indexOf("text") !== -1 || this.val[k].type.indexOf("application") !== -1) {
					html += this.val[k].name + '<div class="wc-image-meta">' + h(' (' + bytesToSize(this.val[k].size, 2) + ') ' + this.val[k].type);
				}
				else {
					html += this.val[k].name + '<div class="wc-image-meta">' + h(' (' + bytesToSize(this.val[k].size, 2) + ') unsupported type ' + this.val[k].type);
				}
				if (typeof this.val[k].hidden) {
					isChecked = (this.val[k].hidden) ? ' checked' : '';
				}
        html += '<br /><label for="hide">hidden</label><input' + isChecked + ' class="ishidden" type="checkbox" value="hide" /></div><a class="remove" href="#" rel="' + k + '"></a></li>';
			}
				i++;
        }
        html += '</ul>';

        html += '<input name="_attachments" multiple="" type="file" />';
        html += '</div>';
        return html;
    };
    w.updateValue = function (options) {
        var str = JSON.stringify(this.val);
        var id = this._id(this.name, options.offset, options.path_extra);
        $('input[name="' + this.name + '"]').val(str);
        var html = '';
        for (var k in this.val) {
            html += '<li>';
            html += this.val[k].name + '<div class="wc-image-meta">' + h(' (' + bytesToSize(this.val[k].size, 2) + ') ' + this.val[k].width + ' X ' + this.val[k].height) + '</div>';
            html += ' <a class="remove" href="#" rel="' + k + '"></a>';
            html += '</li>';
        }
        $('#' + id + ' ul.files').html(html);
    };
    w.addFile = function (name, obj, options) {
        this.val[name] = obj;
        this.updateValue(options);
    };
    w.removeFile = function (name, options) {
        delete this.val[name];
        this.updateValue(options);
    };
    w.clientInit = function (path, value, raw, field, options) {
        var id = this._id(this.name, options.offset, options.path_extra);
        $('#' + id + ' :file').change(function () {
            var att = {};
            _.each(this.files, function (f) {
                var reader = new FileReader();
                reader.onloadend = function (ev) {
                    var result = ev.target.result;
                    var data = result.slice(result.indexOf(',') + 1);
                    var obj = {
                        content_type: f.type,
                        length: f.size,
                        data: data
                    };
                    w.addFile(f.name, obj, options);
                };
                reader.readAsDataURL(f);
            });
            w.updateValue(att, options);
        });
        $('#' + id + ' ul.files li a.remove').click(function (ev) {
            ev.preventDefault();
            var filename = unescape($(this).attr('rel'));
            w.removeFile(filename, options);
            return false;
        });
    };
    return w;
};

function bytesToSize(bytes, precision)
{  
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
