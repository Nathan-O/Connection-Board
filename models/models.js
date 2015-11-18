var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

// # PROJECT SCHEMA # //
var ProjectSchema = new Schema({
                  // code
                  title: String,
                  description: String,
                  dateCreated: {
                              type: Date,
                              default: Date.now()
                           }
                  // CONNECTION LOGIC //
               });


// # BOARD SCHEMA # //
var BoardSchema = new Schema({
                  // code
                  name: String,
                  type: String, // (Ex: Default, Map, Timeline, Portfolio, etc…)
                  // CONNECTION LOGIC //
               });


// # CARD SCHEMA # //
var CardSchema = new Schema({
                  // code
                  name: String,
                  type: String, // (Ex: Person, Event, Location, etc…)
                  // CONNECTION LOGIC //
               });


// # STRING SCHEMA # //
var StringSchema = new Schema({
                  // code
                  name: String,
                  type: String // (Ex: Event type [capture, battle, death, birth, etc...])
                  // CONNECTION LOGIC //
               });
