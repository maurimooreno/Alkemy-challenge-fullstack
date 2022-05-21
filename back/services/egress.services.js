const boom = require('@hapi/boom');
const { Egress } = require('../db/models/egress.model')

class EgressService {

    async findOne(id) {
        const find = await Egress.findByPk(id)
        if (!find) {
            throw boom.notFound('The income you are looking for does not exist')
        }
        return find
    }

    async findAll() {
        const all = await Egress.findAll()
        if (!all) {
            throw boom.notFound('There is no register in the db')
        }
        return all
    }

    async create(data) {
        const { concept, amount, date, type, state } = data
        Egress.create({
            concept,
            amount,
            type,
            state,
            date
        })
            .catch((error) => {
                throw boom.badData(error)
            })

        return { msg: 'successfully created' }
    }

    async update(data) {
        const { id, concept, date, amount, type, state } = data
        const find = await Egress.findByPk(id)
        if (!find) {
            throw boom.notFound('The income you are looking for does not exist')
        } else {
            await Egress.update(
                {
                    concept,
                    amount,
                    date,
                    type,
                    state
                },
                {
                    where: { id: id }
                }
            )
            return { msg: 'Updated successfully' }
        }
    }

    async delete(id) {
        const find = await Egress.findByPk(id)
        if (!find) {
            throw boom.notFound('There is no register with that id')
        }else{
            await Egress.destroy({ where: {id: id} })
            return { msg: 'Register deleted successfully' }
        }
    }
}

module.exports = EgressService