/**
 * This is a bunch of API functions that we use to edit pages and perform
 * all other client functions
 */

var db = require("./db.js");

exports.createPage = function (location, author, template, content) {

	if (location.substr(-1) === "/") {
		location = location + "index.html";
	}

	var page = new db.models.Page({
		version: 1,
		url: location,
		author: author,
		template: template,
		data: content,
		live: false
	});

	page.save(function (err) {
		if (err) {
			console.log("Error saving page: " + location);
		} else {
			console.log("Created page: " + location);
		}
	});

};

exports.getPage = function (location, callback) {

	if (location.substr(-1) === "/") {
		location = location + "index.html";
	}

	var query = db.models.Page.findOne({
		url: location
	});

	query.exec(function (err, data) {
		if (!err && !data) {
			err = "404 - Page cannot be found";
		}
		callback(err, data);
	});

};