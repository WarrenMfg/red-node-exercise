const crud = require('../database/crud');
const Record = require('../database/model');

// create closure over crud.js
module.exports = crud(Record);