/**
 * The primary server application
 */

var express = require("express");
var http = require("http");
var fs = require("fs");
var db = require("./db.js");
var api = require("./api.js");
var Template = require("./template.js").Template;

/** Exports */
exports.api = api;

/** DB Settings */
var mongodb_host = "localhost";
var mongodb_port = 27017;
var mongodb_name = "tp3";

/** Misc. */
var setup = false;
var servers = [];

/**
 * Setup Tikapot 3.0
 */
exports.setup = function () {
	if (setup) {
		return;
	}

	// Load up mongo db
	console.log("Loading Database...");
	db.connect(mongodb_host, mongodb_port, mongodb_name, function (mongoose) {});

	setup = true;
};

/**
 * Run Tikapot 3.0
 *
 * @param  integer   port     The port to run on (e.g. 80)
 * @param  boolean   isLive     Should this be treated as a live server?
 * @param  function callback   The callback to run
 */
exports.run = function (port, isLive, callback) {

	exports.setup();

	console.log("Loading Express Server...");

	var app = express();

	// Load kiwi
	var kiwi = require('kiwi');
	app.engine('kiwi', kiwi.__express);
	app.set('view engine', 'kiwi');

	// Load and store the HTTP server
	var httpServer = http.createServer(app);
	servers.push(httpServer);

	// Start templating engine
	var templating = new Template(kiwi, '../client/editor/templates/html5.kiwi');

	// Templating engine handles all pages
	app.use(function (req, res) {

		var isCss = req.path.substr(-3);
		if (isCss === "css" || req.path.substr(-2) === "js") {
			var file = req.path;
			fs.readFile("." + file, function (err, data) {
				if (err) {
					console.log(err);
					res.send(404);
					return;
				}
				res.setHeader('Content-Type', isCss ? 'text/css' : 'text/javascript');
				res.setHeader('Content-Length', data.length);
				res.send(data);
			});
			return;
		}

		api.getPage(req.originalUrl, function (err, page) {
			if (err || !page) {
				if (isLive) {
					res.send(404);
				} else {
					templating.basePage(res);
				}
			} else {
				// Send to render engine
				templating.load(res, page);
			}
		});

	});

	// Start the HTTP server
	httpServer.listen(port);

	// Callback when we are listening
	httpServer.on("listening", function () {

		console.log("Connected and listening on port " + port);
		console.log("Ready to serve!");

		if (callback !== undefined) {
			return callback();
		}

	});

};

/**
 * Shutdown the application
 *   - Closes http servers
 *   - Closes DB connection
 */
exports.shutdown = function () {
	for (var i = 0; i < servers.length; i++) {
		servers[i].close();
	}
	db.close();
	process.exit();
};

/**
 * Run Tikapot 3.0 in test mode
 *
 * @param  integer   port     The port to run on (e.g. 80)
 * @param  boolean   isLive     Should this be treated as a live server?
 * @param  function callback   The callback to run
 */
exports.runTest = function (port, isLive, callback) {
	console.log("");
	console.log("TEST BUILD");
	mongodb_name = "tps_test";
	exports.run(port, isLive, callback);
};

/**
 * Handle system events properly
 */
process.on('SIGTERM', exports.shutdown);
process.on('SIGINT', exports.shutdown);