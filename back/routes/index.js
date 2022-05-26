const transactionRouter = require('./transaction.route')

function routerApi (app) {
  app.use('/transaction', transactionRouter);
}

module.exports = routerApi;