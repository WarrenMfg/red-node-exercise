const dataRouter = require('express').Router();
const controller = require('./controller');
require('../database/index.js');

dataRouter.route('/many/:sortBy/:order')
  .get(controller.getMany);

dataRouter.route('/one/:sortBy/:order')
  .post(controller.createOne);

module.exports = dataRouter;