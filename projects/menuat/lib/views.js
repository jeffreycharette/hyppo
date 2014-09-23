/**
 * Views to be exported from the design doc.
 */
exports.all_docs = {
	map : function(doc) {
		if (doc.permissions.read !== false) {
			emit(doc._id, null);
		}
	}
}

/*exports.by_type = {
	map: function (doc) {
		if (doc.type !== "app" && doc.permissions.read !== false) {
			var type = (typeof doc.type !== "object") ? doc.type.split(",") : doc.type.value.split(",");
			for (var i=0;i < type.length;i++) {
				emit(type[i].replace(/(^\s+|\s+$)/g, ''), doc);
			}
		}
	}
};*/

exports.by_type = {
	map: function (doc) {
		var tags = doc.type.split(',').map( function(tag) { return tag.toLowerCase().trim(); } );
		if (tags.length > 1 && doc.permissions.read !== false) {
			tags.forEach(function(tag) {
				emit(tag, null);
			});
			emit(tags, null);
		}
		else {
			emit(doc.type.toLowerCase().trim(), null);
		}
	}
};

exports.user_docs = {
	map: function (doc) {
		if (!!doc.permissions.owner) {
			emit(doc._id, null);
		}
	}
};

exports.by_owner = {
	map: function (doc) {
		if (!!doc.permissions.owner) {
			emit(doc.permissions.owner, null);
		}
	}
};

exports.by_page = {
	map : function(doc) {
		if (doc.type !== "app" && doc.permissions.read !== false) {
			//if (doc.type === "global") {
				emit(doc._id, {_id: doc._id});
			//}
			if (doc.type === "page") {
				emit(doc._id, null);
			}
		}
	}
}

/*exports.search = {
	indexes: {
	  tags: {
	    index: function(doc){
	      index("default", doc.type);
	    }
	  }
	}
}*/