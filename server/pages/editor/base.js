var fs = require("fs")

exports.Page = {}
exports.Page.data = {
   meta: {
      title: "New Page | Tikapot 3.0",
      author: "Tikapot 3.0",
      description: "Create a new page."
   },
   content: "This page does not exist, create it?"
}

fs.readFile(__dirname + '/base.html', {
   encoding: 'UTF-8'
}, function (err, data) {
   if (!err) {
      exports.Page.data.content = data;
   } else {
      console.log(err);
   }
});