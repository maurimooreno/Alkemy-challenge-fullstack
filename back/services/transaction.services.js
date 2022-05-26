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
        const { concept, amount, date, type, state } = data
        Transaction.create({
            concept,
            amount,
            type,
            date
        })
            .catch((error) => {
                throw boom.badData(error)
            })

        return { msg: 'successfully created' }
    }

    async update(data) {
        const { id, concept, date, amount, type, state } = data
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
            return { msg: 'Updated successfully' }
        }
    }

    async delete(id) {
        const find = await Transaction.findByPk(id)
        if (!find) {
            throw boom.notFound('There is no register with that id')
        }else{
            await Transaction.destroy({ where: {id: id} })
            return { msg: 'Register deleted successfully' }
        }
    }
}

module.exports = TransactionService