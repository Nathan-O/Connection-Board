var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

// # PROJECT SCHEMA # //
var ProjectSchema = new Schema({
                  // code              // Belongs to user
                  title: String,
                  description: String,
                  dateCreated: {
                              type: Date,
                              default: Date.now()
                           }
                  // CONNECTION LOGIC //
                  // boards: [Board]
               });


// # BOARD SCHEMA # //
var BoardSchema = new Schema({
                  // code              // Belongs to project
                  name: String,
                  type: String, // (Ex: Default, Family Tree, Map, Timeline, Portfolio, etc…)
                  // CONNECTION LOGIC //
                  // cards: [Card]
               });


// # CARD SCHEMA # //
var CardSchema = new Schema({
                  // code              // Belongs to board
                  name: String,
                  type: String, // (Ex: Person, Organization, Location, etc…)
                  // CONNECTION LOGIC //
               });


// # STRING SCHEMA # //
var StringSchema = new Schema({
                  // code              // Has many cards (min. 2 [more like join table])
                  name: String,
                  type: String // (Ex: Event type [capture, battle, death, birth, etc...])
                  // CONNECTION LOGIC //
               });
