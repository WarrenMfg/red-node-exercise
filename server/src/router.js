const dataRouter = require('express').Router();
const controller = require('./controller');
require('../database/index.js');

dataRouter.route('/many/:sortBy/:order')
  .get(controller.getMany);

dataRouter.route('/one')
  .post(controller.createOne);

module.exports = dataRouter;