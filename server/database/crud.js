const getMany = model => (req, res) => {
  model.find({}).lean().exec()
    .then(data => {
      const { sortBy, order } = req.params;
      if (sortBy === 'name') { // sort by string
        if (order === 'asc') {
          data.sort((a, b) => a.name.toLowerCase() - b.name.toLowerCase());
          res.send(data);
          return;
        } else if (order === 'desc') {
          data.sort((a, b) => b.name.toLowerCase() - a.name.toLowerCase());
          res.send(data);
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
    .catch(err => console.log(new Error(err)));
};

const createOne = model => (req, res) => {
  model.create(req.body)
    .then(doc => res.send(doc))
    .catch(err => console.log(new Error(err)));
};

module.exports = model => ({
  getMany: getMany(model),
  createOne: createOne(model)
});