
var mongoose = require('mongoose');

/**
 * Connect to mongodb
 */
exports.connect = function(host, port, dbName, callback) {

	mongoose.connect("mongodb://" + host + ":" + port + "/" + dbName, function(err, db) {
		if (err) {
			console.dir(err);
		}

		if (typeof callback != "undefined") {
			return callback(mongoose);
		}
	});

	return mongoose
};

/**
 * These are the models we use for everything
 */

exports.models = {}

/** Page Schema */
exports.models.Page = mongoose.model('Page', mongoose.Schema({
	version: Number,
	url: String,
	author: String,
	template: String,
	data:  mongoose.Schema.Types.Mixed,
	created: { type: Date, default: Date.now },
	live: Boolean
}));