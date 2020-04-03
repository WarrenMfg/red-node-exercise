const data = require('./dataForSeeder.js');
const axios = require('axios');
const Promise = require('bluebird');
const Record = require('./model');

const posts = [];
const seed = (post) => {
  return axios.post('http://localhost:50000/api/data/one', post)
    .catch(err => console.log(new Error(err)));
};

let counter = 1;
data.forEach(record => {
  posts.push(seed(new Record(record)));
  console.log(counter, 'posts added');
  counter++;
});

Promise.all(posts)
  .then(() => console.log('Finished seeding!'))
  .catch(err => new Error(err));