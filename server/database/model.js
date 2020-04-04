const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  rank: { type: Number, required: true }, // not unique: could have ties
  points: { type: Number, required: true }, 
  name: { type: String, required: true }, 
  age: { type: Number, required: true } 
});

const Record = mongoose.model('Record', recordSchema);
module.exports = Record;