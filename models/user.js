var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

// # USER SCHEMA # //
var UserSchema = new Schema({
               userName: String,
               firstName: String,
               lastName: String,
               email: String,
               passwordDigest: String,
               dateCreated: {
                 type: Date,
                 default: Date.now()
               }
            //   submissions: [Submission]
            });                // ^ Embedded


// *** STATICS *** //

   // * Create User w/ Hashed Password * //
UserSchema.statics.createSecure = function(userName, firstName, lastName, email, password, callback){
   console.log("In createSec");
   var _this = this;
   bcrypt.genSalt(function (err, salt){
      bcrypt.hash(password, salt, function (err, hash){
         var user = {
         userName: userName,
         firstName: firstName,
         lastName: lastName,
         email: email,
         passwordDigest: hash,
         dateCreated: Date.now()
         };
         //create new user with now hashed password
         _this.create(user, callback);
      });
   });
};

   // * Authenticate User (@ login) * //
UserSchema.statics.authenticate = function (email, password, callback){
   console.log("Email: " + email + ", Pass: " + password);

   this.findOne({email: email}, function (err, user){
      if (user === null) {
         console.log("It was null");
         callback("Sorry, no user was found with that email", null);
      } else if (user.checkPassword(password)){
         console.log("Worked");
         callback(null, user);
      } else {
         console.log("Wrong Pass");
         callback("Password Incorrect", user);
      }
   });
};


// *** METHODS *** //

   // * Compare Entered Password against passwordDigest * //
UserSchema.methods.checkPassword = function (password){
    //compares password, returns true or false
  return bcrypt.compareSync(password, this.passwordDigest);
};


// *** DEFINE & EXPORT *** //

var User = mongoose.model("User", UserSchema);
module.exports = User;





////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


// // Submission Schema (Embedded)
// var Submission = new Schema({
//       title: String,
//       genre: String,
//       content: String,
//       timestamp: {type: Date, default: Date.now()},
//       suggestedEdits: [String]
//       });
