/**
 * Indexes to be exported from the design doc.
 */

exports.tags = {
	index: function(doc) {
		index("default", doc.type);
		if (doc.title.value) {
			index("title", doc.title.value);
		}
		if (doc.description.value) {
			index("desc", doc.description.value);
		}
	}
}