const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  rank: { // not unique: could have ties
    type: Number, 
    required: true,
    min: 1
  }, 
  points: { 
    type: Number, 
    required: true 
  }, 
  name: { 
    type: String, 
    required: true,
    trim: true 
  }, 
  age: { 
    type: Number, 
    required: true 
  } 
});

const Record = mongoose.model('Record', recordSchema);
module.exports = Record;