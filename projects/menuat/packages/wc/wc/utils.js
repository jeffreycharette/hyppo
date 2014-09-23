var handlebars = require('handlebars'),
	settings = require('settings/root');

/**
 * Synchronously render template and return result, automatically adding
 * baseURL to the template's context. The request object is required so we
 * can determine the value of baseURL.
 *
 * @name render(name, req, context)
 * @param {String} name
 * @param {Object} req
 * @param {Object} context
 * @returns {String}
 * @api public
 */

/**
 * Quick utility function for testing if running in the browser, since
 * these functions won't run on CouchDB server-side
 */

function isBrowser() {
    return (typeof(window) !== 'undefined');
}

exports.render = function (name, req, context) {
    if (isBrowser()) {
        throw new Error('Render cannot be called client-side.');
    }
	handlebars.registerHelper('baseURL', function() {
		var host = (settings.host) ? settings.host : 'http://localhost:5984';
		if (!req.headers['x-couchdb-vhost-path']) {
			return  host + '/' + req.path[0] + '/' + req.path[1] + '/' + req.path[2];
		}
		else {
			return  host;
		}
	});
	handlebars.registerHelper('host', function() {
		var host = (settings.host) ? settings.host : 'http://localhost:5984';
		return host;
	});
	handlebars.registerHelper('basePath', function() {
		return '/' + req.path[0] + '/' + context._id;
	});
	handlebars.registerHelper('db', function() {
		return '/' + req.path[0];
	});
    context.userCtx = req.userCtx;
    if (!handlebars.templates[name]) {
        throw new Error('Template Not Found: ' + name);
    }
    return handlebars.templates[name](context);
};

exports.partial = function (name, context) {
    if (!isBrowser()) {
        throw new Error('Partial cannot be called client-side');
    }
	handlebars.registerPartial(name, context.toString());
    return;
};