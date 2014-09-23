/**
 * Filter functions to be exported from the design doc.
 */

exports.items = function(doc, req) {
	var s = ',';
	if ( doc._deleted !== true && doc.type.indexOf(s) !== -1 && typeof doc.permissions !== 'undefined' ) {
		return ( doc.permissions.owner == req.query.owner ) ? true : false;
	}
	return false;
};

exports.type = function(doc, req) {
	if ( typeof doc.permissions !== 'undefined' ) {
		return ( doc.permissions.owner == req.query.owner ) ? true : false;
	}
	return false;
};