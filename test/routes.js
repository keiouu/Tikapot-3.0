/**
 * Tests various default URLS that must be supplied with Tikapot 3.0
 */

var http = require('http');
var assert = require("assert");
var app = require("../server/app.js");

// Start the app
app.run(9090);

// Start the tests

describe('Tikapot Default Routes', function () {
    it('should return 200', function (done) {
        http.get('http://localhost:9090', function (res) {
            assert.equal(200, res.statusCode);
            done();
        });
    });
});