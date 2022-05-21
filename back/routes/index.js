const ingressRouter = require('./ingress.route')
const egressRouter = require('./egress.router')

function routerApi (app) {
  app.use('/ingress', ingressRouter);
  app.use('/egress', egressRouter)
}

module.exports = routerApi;