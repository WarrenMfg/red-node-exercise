/**
 * @module Server
 *
 * @todo Configure app (express?, FeathersJS?)
 * @todo Configure local MongoDB connection and data models (mongoose?)
 * @todo Create the API routes to use with the client app (REST?)
 * @todo Modify the client/api.js so the client app can use your server
 * @todo Create/Structure server unit tests
 */

/**
  * DB MODEL FORMAT
  * 
    {
        rank: number, 
        points: number,           
        name: string, 
        age: number  
    }

    example:
    {
        rank: 3,
        points: 3123,
        name: "Marlana J. Huff",
        age: 41
    }
  */
// console.log("Not Implemented");

const express = require('express');
const cors = require('cors'); // for tests
const morgan = require('morgan');
const path = require('path');
const zlib = require('zlib');
const fs = require('fs');
const router = require('./router');

const PORT = process.env.PORT || 50000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// spy
app.use('/api/data', (req, res, next) => {
  next();
  
  const date = new Date();
  const obj = {
    date: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
    method: req.method,
    url: req.url
  };

  fs.writeFile(path.resolve(__dirname, './spy.txt'), `${JSON.stringify(obj, null, 2)},\n`, {flag: 'a+'}, (err) => {
    if (err) {
      console.log('fs.writeFile error:', err);
    }
  });

});

// routes and middleware
app.use('/api/data', router);

app.get('/bundle.js', (req, res) => {
  const gzip = zlib.createGzip();
  const bundle = fs.createReadStream(path.resolve(__dirname, '../../client/public/bundle.js'));
  res.set({ 'Content-Encoding': 'gzip', 'Cache-Control': 'max-age=86400' });
  bundle.pipe(gzip).pipe(res);
});

app.use('/', express.static(path.resolve(__dirname, '../../client/public')));


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
