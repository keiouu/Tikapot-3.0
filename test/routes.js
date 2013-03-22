/**
 * Tests various default URLS that must be supplied with Tikapot 3.0
 */

var http = require('http');
var assert = require("assert");
var db = require("../server/db.js");
var app = require("../server/app.js");

// Start the app
app.runTest(9090);

// Start the tests

describe('Tikapot Routing Tests', function () {

    before(function () {
    	// Wipe out all pages
    	var pages = new db.models.Page();
    	pages.collection.drop();

    	// Create a home page
    	app.api.createPage("/", "Example Author", "default", {
    		"content": "<h1>Test</h1>"
    	});
    });

    it('should have a valid page in the database', function (done) {
        app.api.getPage("/", function(err, page) {
            assert.ifError(err);
            done();
        });
    });

    it('should have an author called: Example Author', function (done) {
        app.api.getPage("/", function(err, page) {
            assert.ifError(err);
            assert.equal(page.author, "Example Author");
            done();
        });
    });

    it('should have a default template', function (done) {
        app.api.getPage("/", function(err, page) {
            assert.ifError(err);
            assert.equal(page.template, "default");
            done();
        });
    });

    it('should not be live', function (done) {
        app.api.getPage("/", function(err, page) {
            assert.ifError(err);
            assert.equal(page.live, false);
            done();
        });
    });

    it('should have some html', function (done) {
        app.api.getPage("/", function(err, page) {
            assert.ifError(err);
            assert.equal(page.data.content, "<h1>Test</h1>");
            done();
        });
    });

    it('should return 200', function (done) {
        http.get('http://localhost:9090', function (res) {
            assert.equal(200, res.statusCode);
            done();
        });
    });

});