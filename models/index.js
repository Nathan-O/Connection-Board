var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/connection_board_app");

// *** REQUIREMENTS *** //
module.exports.User = require("./user.js");


// process.env.MONGOLAB_URI ||
//                       process.env.MONGOHQ_URL ||
