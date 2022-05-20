const {Ingress, IngressSchema} = require('./ingress.model')
const {Egress, EgressSchema} = require('./egress.model')

function setupModels(sequelize){
    Ingress.init(IngressSchema, Ingress.config(sequelize)),
    Egress.init(EgressSchema, Egress.config(sequelize))
}

module.exports = setupModels;