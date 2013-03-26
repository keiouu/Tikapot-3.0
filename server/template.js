/**
 * Responsible for rendering templates, minifying CSS and JS and rendering snippets
 */

var basePage = require("./pages/editor/base.js").Page;

exports.Template = function (kiwi, tpl) {

   this.load = function (res, page) {
      res.render(tpl, page.data);
   };

   this.basePage = function (res) {
      basePage = require("./pages/editor/base.js").Page;
      res.render(tpl, basePage);
   };

   this.loadCSS = function (res, page) {
      res.render(tpl, page.data);
   };

   /** Setup kiwi */

   kiwi.tools.createFilter('prepend', function (str, thing) {
      return thing + str;
   });

   kiwi.tools.createSimpleTag('css', function (context, name) {
      return kiwi.tools.safe('<link rel="stylesheet" type="text/css" href="/static/' + name + '">');
   });

};