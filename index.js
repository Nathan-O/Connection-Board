/*
/////////////////////////////////////////////////////////

					Server-Side js

/////////////////////////////////////////////////////////
*/

// # [TITLE] # //

////////////////////////
//  # REQUIREMENTS  # //
////////////////////////

var express = require("express");
var session = require("express-session");
var db = require("./models");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var methodOverride = require("method-override");
var keygen = require("keygenerator");
var path = require("path");
var _ = require("underscore");
var app = express();


////////////////////////
/////  # CONFIG #  /////
////////////////////////

app.use("/static", express.static("Public"));
app.use("/vender", express.static("bower_components"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extend: true}));
app.use(cookieParser());
// app.set("view engine", "ejs");
var views = path.join(process.cwd(), "/Public/views");
var userViews = path.join(process.cwd(), "/Public/views/user");

   // * Create Session * //
app.use(
	session({
		secret: keygen._({specials: true}),
		resave: false,
		saveUninitialized: true
	})
);

   // * Exentend req Param * //
app.use(function (req, res, next){
	// for login
	req.login = function (user){
		req.session.userId = user._id;
	};

	// get current user for profile
	req.currentUser = function (callback){
		db.User.findOne({ _id: req.session.userId }, function (err, user) {
        req.user = user;
        callback(null, user);
      });
	};

	// log out user
	req.logout = function(){
		req.session.userId = null;
		req.user = null;
		console.log("Session id: " + req.session.userId);
		console.log("User: " + req.user);
		res.clearCookie("guid");
	};
	next();
});


////////////////////////
/////  # ROUTES #  /////
////////////////////////

   // * Root * //
app.get("/", function (req, res){
   // res.send("Hello World");
   var homePath = path.join(views, "index.html");
   res.sendFile(homePath);
});

   // * User Routes * //
app.get("/signup", function(req, res){
   var signUpPath = path.join(userViews, "sign_up.html");
   res.sendFile(signUpPath);
});

app.get("/login", function(req, res){
   var loginPath = path.join(userViews, "login.html");
   res.sendFile(loginPath);
});

app.get("/profile", function (req, res){
   var profilePath = path.join(userViews, "show.html");
   var loginPath = path.join(userViews, "login.html");
	//
	req.currentUser(function (err, user){
		if (user === null){
			res.redirect(loginPath);
		}
		res.sendFile(profilePath);
	});
});

app.post(["/login", "/api/session"], function (req, res){
   var user = req.body.user;
   var email = user.email;
   var password = user.password;

   db.User.authenticate(email, password, function (err, user) {
      if (err) {
         console.log(err);
         var signUpPath = path.join(userViews, "sign_up.html");
         res.redirect(signUpPath);
      } else {
         var profilePath = path.join(userViews, "show.html");
         req.login(user);
         res.cookie("guid", user._id);
         res.redirect("/profile");
         // res.send(email + " is logged in\n");/
      }
   });
});

// where the user submits the sign-up form
app.post(["/signup", "/api/users"], function signup(req, res) {
	// grab the user from the params
	var user = req.body.user;
	console.log(user);
	// pull out their info
	var firstName = user.firstName;
	var lastName = user.lastName;		//need to do something about "remember me" being checked
	var userName = user.userName;
	var email = user.email;
	var password = user.password;
	var date = Date.now();

	// create the new user
	db.User.createSecure(userName, firstName, lastName, email, password, function (err, user) {
		console.log("Created Secure");
		if (err) {
			console.log(err);
		}
		req.login(user);
		res.cookie("guid", user._id);
		console.log("logged In");
		res.redirect("/profile");
	});
});

app.delete(["/logout", "api/session"], function (req, res) {
   /* Logout */
	console.log("clicked");
	req.logout();
	console.log("logged out");
	res.redirect("/");
});


////////////////////////
/////  # SERVER #  /////
////////////////////////

app.listen(process.env.PORT || 3000, function(){
	console.log("We're running wild!");
});





/*

/
/////////////////////////////////////////////////////////

					Server-Side js

/////////////////////////////////////////////////////////
/

// * REQUIREMENTS * //


// * CONFIG * //



// * Create Session * //





// * ROUTES * //

app.get("/", function (req, res){	// <-- needs to have a find all db function that renders usersinfo to the page
	//
	db.User.find({}, function (err, users){
		if (err){
			console.log(err);
		}
		var writing = {stories: []};
		//console.log(users);
		users.forEach(function (user){
			user.submissions.forEach(function (submission){
				writing.stories.push(submission);
			});
		});
		res.render("index.ejs", {storyInfo: writing});
	});
});




app.post("/editor", function (req, res){
	var submissionID = req.body.id;
	/ Only receiving submissionID from ajax request located in app.js /

	console.log(submissionID);
	db.User.findOne({_id: submissionID}, function (err, submission){
		if (err){
			console.log(err);
			res.redirect("/not-found"); // <-- will have page.
		}
		console.log("Submission: " , submission);
		/// We're hitting user-profile.ejs /
		// res.render("editor.ejs");
	});
});


app.get("/just...why", function (req, res){
	res.render("nope.ejs");
});

/////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////



//
// app.get("/fileTest", function (req, res){
// 	res.sendFile(path.join(views + "fileTest.html"));
// });
//
// app.post(["/fileTest", "/api/files"], function (req, res){
// 	//code
// 	console.log("req = " + req);
// 	console.log("req.body = " + req.body);
// 	console.log("req[0] = " + req[0]);
// 	//console.log("req.body.submission.text = " + req.body.submission.text)
// 	console.log("Test file submitted as: " + req.body.submission);
// 	var testOb = req.body;
// 	console.log(testOb);
// 	res.send(req);
// });

// app.get("/fileTest", function (req, res){
// 	res.sendFile(path.join(views + "fileTest.html"));
// });
//
// app.post(["/fileTest", "/api/files"], function (req, res){
// 	//code
// 	console.log("req = " + req);
// 	console.log("req.body = " + req.body);
// 	console.log("req[0] = " + req[0]);
// 	//console.log("req.body.submission.text = " + req.body.submission.text)
// 	console.log("Test file submitted as: " + req.body.submission);
// 	var testOb = req.body;
// 	console.log(testOb)
// 	res.send(req);
// });
>>>>>>> 2e3751c9234d5f1fb557a785cdcdd6bb80fe621c

app.get("/users", function (req, res){
    db.User.find({}, function (err, users) {
		res.send(users);
	});
});

app.get("/logged", function (req, res){
	db.User.find({ _id: req.session.userId }, function (err, user) {
		if (err){
			console.log(err);
			res.send("No One");
		}
    	res.send(user);
	});
});

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////


//  POST ROUTES  //

// New Story submission is aces ! /
app.post(["/submissions", "/api/submissions"], function (req, res) {
	newSubmission = req.body;
	console.log("Received Submission: " , newSubmission);

	db.User.findOne({ _id: req.session.userId}, function (err, user){
		if (err){
			return console.log("findOne ERR = " + err);
<<<<<<< HEAD
		}
=======
		};
		console.log("Entering story model for " + user.firstName);
>>>>>>> 2e3751c9234d5f1fb557a785cdcdd6bb80fe621c
		user.submissions.push(newSubmission);

		user.save(function (err, success) {
			if (err){
<<<<<<< HEAD
				return console.log("During Save ERR = " + err);
			}
			console.log("It worked?");
=======
				return console.log("db save ERR = " + err);
			};
			console.log("Successfully saved " + newSubmission.title);
>>>>>>> 2e3751c9234d5f1fb557a785cdcdd6bb80fe621c
		});
		res.redirect("/profile");
	});
});

// * DELETE ROUTE * //
app.delete(["/logout", "api/session"], function (req, res) {
	console.log("clicked");
	req.logout();
	console.log("logged out");
	res.redirect("/");
});

<<<<<<< HEAD
app.delete("/story", function (req, res) {
	console.log(req.body); //<-- equals right stuff
	var ids = req.body;

	db.User.findOne({_id: ids.data[0]}, function (err, user) {
        if (err) {
            return console.log(err);
        }
        for (var i = 0; i < user.submissions.length; i++) {
        	if (user.submissions[i]._id.toString() === ids[1]) {
            	user.submissions[i].remove();
           		break;
           	}
	    }
	});
    user.save(function(err, success) {
        if (err) {
        	return console.log(err);
        }
        res.send(success);
    });
});

// * SERVER * //


app.post("/deleteStory", function (req, res) {
	//console.log(req.body); //<-- equals right stuff
	//var deleteId = req.session.id;
	var deleteID  = req.body.id.split(' ');
	var storyID = deleteID[0];
	var userID = deleteID[1];

	db.User.findOne({_id: userID}, function (err, user) {
	  if (err) { return console.log(err); res.sendStatus(400)};

		console.log("Accessing User " + user.firstName);

		index = 0;
		count =0;
		user.submissions.forEach( function(submission) {
			(storyID.toString() ===  submission._id.toString())?
				index = count: count += 1;
		});
		var deadTitle = user.submissions[index].title;
		console.log('Removing the title "'
			+ deadTitle + '" from ')
			+ (user.firstName+'\'s story db');

		user.submissions[index].remove();
		user.save(function(err, success) {
		    if (err) {
		    	return console.log(err);
		    };
		    res.send("Successfully Deleted " + deadTitle);
		});
});

		//res.send("Deleted " + deleteID[0]);
});


*/
