var mongoose = require('mongoose');
var fs = require('fs');
require('dotenv').config();


//In order for the following connection to work, I had to set the bind_ip variable
//inside the etc/mongo.config file (on the remote server) to 0.0.0.0.
//This allows the database to accept connections from networks outside of the local machine.


var uri = 'mongodb://localhost/mapper';

if(process.env.DBUSERNAME && process.env.DBPASSWORD) {
  uri = 'ds159180.mlab.com:59180/mapperlocations';
  var options = {user: process.env.DBUSERNAME, pass: process.env.DBPASSWORD};
}
// ds159180.mlab.com:59180/mapperlocations
mongoose.connect(uri, options || null , function(err, db) {
  if (err) {
    throw err;
  } else {
    console.log('successfully connected to database');
  }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));



//CREATE A MONGOOSE SCHEMA FOR THE ENTRYSCHEMA DOCUMENT
var entrySchema = new mongoose.Schema({

  city_name: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  poi: {
    type: String,
    required: true
  },
  heading: {
    type: Number,
    required: true
  },
  pitch: {
    type: Number,
    required: true
  },
  state: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});

//CREATE A MONGOOSE SCHEMA FOR THE CITY DOCUMENTS - THIS TABLE WILL JUST
//STORE THE CITY NAMES WITH A UNIQUE ID
var citylistSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  city_name: {
    type: String,
    required: true,
    unique: true
  }
});

//CREATE A MONGOOSE SCHEMA FOR THE HIGH SCORE VIEW - THIS TABLE WILL JUST
//STORE USER NAME INITIALS WITH THEIR SCORES.

var highScoreSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    maxLength: 3
  },
  score: {
    type: Number,
    required: true
  }

})

//ASSIGN THE MODEL CONSTRUCTOR TO A VARIABLE
var entry = mongoose.model('entrySchema', entrySchema);
var city = mongoose.model('citylistSchema', citylistSchema);
var scores = mongoose.model('highScoreSchema', highScoreSchema);
module.exports.data = entry;
module.exports.cityList = city;
module.exports.scores = scores;
module.exports.db = db;
