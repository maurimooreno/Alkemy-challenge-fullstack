const boom = require('@hapi/boom');
const { Transaction } = require('../db/models/transaction.model')

class TransactionService {

    async findOne(id) {
        const find = await Transaction.findByPk(id)
        if (!find) {
            throw boom.notFound('The income you are looking for does not exist')
        }
        return find
    }

    async findAll() {
        const all = await Transaction.findAll()
        return all
    }

    async create(data) {
        const { concept, amount, date, type } = data
        const transaction = await Transaction.create({
            concept,
            amount,
            type,
            date
        })
        return transaction.toJSON()
    }

    async update(data) {
        const { id, concept, date, amount, type } = data
        const find = await Transaction.findByPk(id)
        if (!find) {
            throw boom.notFound('The income you are looking for does not exist')
        } else {
            await Transaction.update(
                {
                    concept,
                    amount,
                    date,
                    type
                },
                {
                    where: { id: id }
                }
            )
            const transactionUpdate = await Transaction.findByPk(id)
            return transactionUpdate
        }
    }

    async delete(id) {
        const find = await Transaction.findByPk(id)
        if (!find) {
            throw boom.notFound('There is no register with that id')
        }else{
            await Transaction.destroy({ where: {id: id} })
            return find
        }
    }
}

module.exports = TransactionService