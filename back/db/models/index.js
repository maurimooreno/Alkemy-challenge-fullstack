const {Transaction, TransactionSchema} = require('./transaction.model')

function setupModels(sequelize){
    Transaction.init(TransactionSchema, Transaction.config(sequelize))
}

module.exports = setupModels;