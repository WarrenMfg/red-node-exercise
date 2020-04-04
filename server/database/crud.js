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
    .catch(err => console.log(err));
};

const createOne = model => async (req, res) => {
  let count = await model.countDocuments({});
  await model.create({ ...req.body, rank: ++count })
    .catch(() => res.sendStatus(400));
  getMany(model)(req, res);
};

module.exports = model => ({
  getMany: getMany(model),
  createOne: createOne(model)
});