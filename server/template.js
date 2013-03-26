/**
 * Responsible for rendering templates, minifying CSS and JS and rendering snippets
 */

var kiwi = require('kiwi');

exports.Template = function (kiwi, tpl) {

   this.load = function (res, page) {
      res.render(tpl, page.data);
   };

   this.basePage = function (res) {
      res.render(tpl, {
         meta: {
            title: "New Page | Tikapot 3.0",
            author: "Tikapot 3.0",
            description: "Create a new page."
         },
         content: "This page does not exist, create it?"
      });
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