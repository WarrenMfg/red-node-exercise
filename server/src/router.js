const dataRouter = require('express').Router();
const controller = require('./controller');
require('../database/index.js');

// many
dataRouter.route('/many/:sortBy/:order')
  .get(controller.getMany);

// one
dataRouter.route('/one/:sortBy/:order')
  .post(controller.createOne)
  .delete(controller.deleteOne);

// seed
dataRouter.route('/seed')
  .post(controller.seedOne)

module.exports = dataRouter;