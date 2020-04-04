const data = require('./dataForSeeder.js');
const axios = require('axios');
const Promise = require('bluebird');
const Record = require('./model');

const posts = [];
const seed = (post) => {
  return axios.post('http://localhost:50000/api/data/seed', post)
    .catch(err => console.log(err));
};

data.sort((a, b) => b.points - a.points);

data.forEach((record, i) => {
  record.rank = i + 1;
  posts.push(seed(new Record(record)));
  console.log(i + 1, 'posts added');
});

Promise.all(posts)
  .then(() => console.log('Finished seeding!'))
  .catch(err => err);