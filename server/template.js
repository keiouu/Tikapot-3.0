/**
 * Responsible for rendering templates, minifying CSS and JS and rendering snippets
 */

var basePage = require("./pages/editor/base.js").Page;

exports.Template = function (kiwi, tpl) {

   this.load = function (res, page) {
      res.render(tpl, page);
   };

   /** Setup kiwi */

   kiwi.tools.createFilter('prepend', function (str, thing) {
      return thing + str;
   });

   kiwi.tools.createFilter('loadTime', function (startDate) {
      return ((Date.now() - parseInt(startDate)) / 1000.0) + "ms";
   });

   kiwi.tools.createSimpleTag('css', function (context, name) {
      return kiwi.tools.safe('<link rel="stylesheet" type="text/css" href="/static/' + name + '">');
   });

};