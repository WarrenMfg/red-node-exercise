const crud = require('../database/crud');
const Record = require('../database/model');

module.exports = crud(Record);