/**
 * The primary server application
 */

var express = require('express');
var http = require('http');
var db = require("./db.js")

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

	// Start the HTTP server
	httpServer.listen(port);

	// Callback when we are listening
	httpServer.on("listening", function() {
		console.log("Connected and listening on port " + port);

		console.log("Loading Database...");

		// Load up mongo db
		db.connect("localhost", 27017, "tp3", function(mongoose) {
			console.log("Ready to serve!");
		});


		if (typeof callback != "undefined") {
			return callback();
		}
	});


}