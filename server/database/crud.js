const utils = require('./utils');


const getMany = model => (req, res) => {
  model.find({}).lean().exec()
    .then(data => {
      const { sortBy, order } = req.params;

      // if sortBy string
      if (sortBy === 'name') {

        // if order by ascending
        if (order === 'asc') {
          // const sortedData = utils.sortByFirstNameAsc(data); // alternate
          const sortedData = utils.sortByLastNameAsc(data);
          res.send(sortedData);
          return;

        // if order by descending
        } else if (order === 'desc') {
          // const sortedData = utils.sortByFirstNameDesc(data); // alternate
          const sortedData = utils.sortByLastNameDesc(data); 
          res.send(sortedData);
          return;
        }

      // if sortBy number
      } else if (sortBy === 'rank' || sortBy === 'points' || sortBy === 'age') {

        // if order by ascending
        if (order === 'asc') {
          data.sort((a, b) => a[sortBy] - b[sortBy]);
          res.send(data);
          return;
        
        // if order by descending
        } else if (order === 'desc') {
          data.sort((a, b) => b[sortBy] - a[sortBy]);
          res.send(data);
          return;
        }
      }
    })

    // 500: internal server error
    .catch(() => res.sendStatus(500)); 
};


const createOne = model => async (req, res) => {
  // check if bad record
  if (!utils.isValidRecord(req.body)) {
    // 400: bad request
    res.sendStatus(400); 
    return;
  }

  // get count--used in else block below
  let count = await model.countDocuments({});

  // increment rank of all records with points less than new record.points 
  await model.updateMany({ points: { $lte: req.body.points } }, { $inc: { rank: 1 } })
    // 500: internal server error
    .catch(() => res.sendStatus(500));

  // find the records that were just incremented (see above)
  await model.find({ points: { $lte: req.body.points } })
    .then(docs => {

      // if any records were incremented
      if (docs.length) {

        // find the lowest rank
        let rank = docs[0].rank;
        docs.forEach(doc => {
          if (doc.rank < rank) {
            rank = doc.rank;
          }
        });

        // assign rank property to new record
        req.body.rank = rank - 1;

      // but if no records were incremented (see above)
      } else {

        // assign rank property to new record using count
        req.body.rank = ++count;
      }
    });
  
  // finally, store new record in database
  model.create(req.body)
    // respond with all records in case they were updated by another client
    .then(() => getMany(model)(req, res))
    // 500: internal server error
    .catch(() => res.sendStatus(500));
};


const deleteOne = model => async (req, res) => {
  // delete record
  await model.findOneAndDelete(req.body)
    // 500: internal server error
    .catch(() => res.sendStatus(500));

  // determine if deleted record tied with another rank
  let tie = [];
  await model.findOne({ rank: req.body.rank })
    .then(doc => {
      if (doc) {
        tie = doc;
      }
    })
    // 500: internal server error
    .catch(() => res.sendStatus(500));

  // if no tie, proceed with decrementing all ranks greater than rank of deleted record
  if (!tie.length) {
    model.updateMany({ rank: { $gte: req.body.rank } }, { $inc: { rank: -1 } })
      // respond with all records in case they were updated by another client
      .then(() => getMany(model)(req, res))
      // 500: internal server error
      .catch(() => res.sendStatus(500))
  } else {
    // if there was a tie, just respond with all records in case they were updated by another client 
    getMany(model)(req, res);
  }

};


const seedOne = model => (req, res) => {
  // create new record for seeder.js
  model.create(req.body)
    // 200: OK
    .then(() => res.sendStatus(200))
    // 500: internal server error
    .catch(() => res.sendStatus(500));
};

// property values create closure over req/res functions
module.exports = model => ({
  getMany: getMany(model),
  createOne: createOne(model),
  deleteOne: deleteOne(model),
  seedOne: seedOne(model)
});