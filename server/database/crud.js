const utils = require('./utils');

const getMany = model => (req, res) => {
  model.find({}).lean().exec()
    .then(data => {
      const { sortBy, order } = req.params;
      if (sortBy === 'name') { // sort by string
        if (order === 'asc') {
          // const sortedData = utils.sortByFirstNameAsc(data); // alternate
          const sortedData = utils.sortByLastNameAsc(data);
          res.send(sortedData);
          return;
        } else if (order === 'desc') {
          // const sortedData = utils.sortByFirstNameDesc(data); // alternate
          const sortedData = utils.sortByLastNameDesc(data); 
          res.send(sortedData);
          return;
        }

      } else if (sortBy === 'rank' || sortBy === 'points' || sortBy === 'age') { // sort by number
        if (order === 'asc') {
          data.sort((a, b) => a[sortBy] - b[sortBy]);
          res.send(data);
          return;
        } else if (order === 'desc') {
          data.sort((a, b) => b[sortBy] - a[sortBy]);
          res.send(data);
          return;
        }
      }
    })
    .catch(() => res.sendStatus(400));
};

const createOne = model => async (req, res) => {
  let count = await model.countDocuments({});

  await model.updateMany({ points: { $lte: req.body.points } }, { $inc: { rank: 1 } })
    .catch(() => res.sendStatus(400));
  await model.find({ points: { $lte: req.body.points } })
    .then(docs => {
      if (docs.length) {
        let rank = docs[0].rank;
        docs.forEach(doc => {
          if (doc.rank < rank) {
            rank = doc.rank;
          }
        });
        req.body.rank = rank - 1;
      } else {
        req.body.rank = ++count;
      }
    });
  
  model.create(req.body)
    .then(() => getMany(model)(req, res))
    .catch(() => res.sendStatus(400));
};

const deleteOne = model => async (req, res) => {
  await model.findOneAndDelete(req.body)
    .catch(() => res.sendStatus(400));

  let tie = [];
  await model.findOne({ rank: req.body.rank })
    .then(doc => {
      if (doc) {
        tie = doc;
      }
    })
    .catch(() => res.sendStatus(400));

  if (!tie.length) {
    model.updateMany({ rank: { $gte: req.body.rank } }, { $inc: { rank: -1 } })
      .then(() => getMany(model)(req, res))
      .catch(() => res.sendStatus(400))
  } else {
    getMany(model)(req, res);
  }

};

const seedOne = model => (req, res) => {
  model.create(req.body)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(400));
};

module.exports = model => ({
  getMany: getMany(model),
  createOne: createOne(model),
  deleteOne: deleteOne(model),
  seedOne: seedOne(model)
});