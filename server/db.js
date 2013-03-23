var mongoose = require('mongoose');

var connected = false;

/**
 * Connect to mongodb
 */
exports.connect = function (host, port, dbName, callback) {

	if (connected) {
		if (typeof callback != "undefined") {
			callback(mongoose);
		}
	} else {
		mongoose.connect("mongodb://" + host + ":" + port + "/" + dbName, function (err, db) {
			if (err) {
				console.dir(err);
			} else {
				connected = true;
			}

			if (typeof callback != "undefined") {
				callback(mongoose);
			}
		});
	}

	return mongoose;
};

exports.close = function () {
	if (connected) {
		mongoose.disconnect();
	}
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
	data: mongoose.Schema.Types.Mixed,
	created: {
		type: Date,
		default: Date.now
	},
	live: Boolean
}));