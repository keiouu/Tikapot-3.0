var fs = require("fs")

exports.getBasePage = function (callback) {
   var page = {}
   page.data = {
      meta: {
         title: "New Page | Tikapot 3.0",
         author: "Tikapot 3.0",
         description: "Create a new page."
      },
      content: "This page does not exist, create it?"
   }

   // Read page content
   fs.readFile(__dirname + '/base.html', {
      encoding: 'UTF-8'
   }, function (err, data) {
      if (!err) {
         page.data.content = data;
      } else {
         console.log(err);
      }

      // Notify
      callback(page);
   });
};