/**
 * The primary server application
 */

var express = require('express');
var http = require('http');

/**
 * Run Tikapot 3.0
 * 
 * @param  integer port The port to run on (e.g. 80)
 * @param  function callback The callback to run
 */
exports.run = function(port, callback) {

	if (typeof callback == "undefined") {
		callback = function(){};
	}

	var app = express();
	var httpServer = http.createServer(app);

	// Begin with our client folder as a file store
	app.use(express.static(__dirname + '/../client/'));

	// Start the HTTP server
	httpServer.listen(port);

	// Callback when we are listening
	httpServer.on("listening", callback);

}