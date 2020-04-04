const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  rank: { type: Number, required: true, unique: true }, 
  points: { type: Number, required: true }, 
  name: { type: String, required: true }, 
  age: { type: Number, required: true } 
});

const Record = mongoose.model('Record', recordSchema);
module.exports = Record;