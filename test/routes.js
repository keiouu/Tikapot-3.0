/**
 * Tests various default URLS that must be supplied with Tikapot 3.0
 */

var request = require('request');
var assert = require("assert");
var app = require("../server/app.js");

test_port = 9090
app.run(test_port)

describe('Tikapot Default Routes', function(){

    /**
     * Test there is a default home page
     */
    describe('GET /', function(){
        it("should respond with a homepage", function(done){
            request('127.0.0.1:' + test_port, function(err,resp,body){
                assert(!err);
                done(); 
            }); 
        }); 
    });

});
