/**
 * The primary server application
 */

var express = require('express');
var http = require('http');
var db = require("./db.js");
var api = require("./api.js")

/** DB Settings */
var mongodb_host = "localhost";
var mongodb_port = 27017;
var mongodb_name = "tp3";

/**
 * Run Tikapot 3.0
 * 
 * @param  integer port The port to run on (e.g. 80)
 * @param  function callback The callback to run
 */
exports.run = function(port, callback) {

	console.log("Loading Express Server...");

	var app = express();
	var httpServer = http.createServer(app);

	// Begin with our client folder as a file store
	app.use(express.static(__dirname + '/../client/'));

	// Database handles all pages
	app.use(function(req, res) {
		api.getPage(req.originalUrl, function(err, page) {
			if (err) {
				res.send(404);
			} else {
				// Send to render engine (eventually)
				res.send(page.data.content);
			}
		});
	})

	// Start the HTTP server
	httpServer.listen(port);

	// Callback when we are listening
	httpServer.on("listening", function() {
		console.log("Connected and listening on port " + port);

		console.log("Loading Database...");

		// Load up mongo db
		db.connect(mongodb_host, mongodb_port, mongodb_name, function(mongoose) {
			console.log("Ready to serve!");
		});


		if (typeof callback != "undefined") {
			return callback();
		}
	});

};

/**
 * Run Tikapot 3.0 in test mode
 * 
 * @param  integer port The port to run on (e.g. 80)
 * @param  function callback The callback to run
 */
exports.runTest = function(port, callback) {
	console.log("DEBUG BUILD");
	mongodb_name = "tps_test";
	exports.run(port, callback);
};


exports.api = api;