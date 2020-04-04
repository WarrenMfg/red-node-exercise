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
const router = require('./router');

const PORT = 50000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/data', router);
app.use('/', express.static(path.resolve(__dirname, '../../client/public')));

app.listen(process.env.PORT || PORT, () => console.log(`Listening on port ${PORT}`));
