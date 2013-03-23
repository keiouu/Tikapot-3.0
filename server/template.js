/**
 * Responsible for rendering templates, minifying CSS and JS and rendering snippets
 */

exports.Template = function() {

	this.render = function (res, page) {
		res.send(page.data.content);
	};

	this.basePage = function (res) {
		res.send("This page does not exist, create it?");
	};

};