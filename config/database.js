// module.exports = {
//       url : 'mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu'
//   };


var mongoose = require("mongoose");


// mongoose.connect( process.env.MONGOLAB_URI ||
// 				process.env.MONGOHQ_URL ||
// 				"mongodb://localhost/connection-board-app");

mongoose.connect("mongodb://localhost/connection-board-app");
