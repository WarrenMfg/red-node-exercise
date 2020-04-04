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
  await model.create({ ...req.body, rank: ++count })
    .then(() => getMany(model)(req, res))
    .catch(() => res.sendStatus(400));
};

const deleteOne = model => async (req, res) => {
  await model.findOneAndDelete({ rank: req.body.rank })
    .catch(() => res.sendStatus(400));
 
  model.updateMany({ rank: { $gte: req.body.rank } }, { $inc: { rank: -1 } })
    .then(() => getMany(model)(req, res))
    .catch(() => res.sendStatus(400))
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