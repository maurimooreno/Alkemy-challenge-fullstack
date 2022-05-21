const joi = require('joi')

const concept = joi.string().min(2).max(50)
const amount = joi.number()
const state = joi.string().valid('registered', 'created')
const type = joi.string().valid('ingress', 'egress')
const date = joi.date()
const id = joi.string().guid({
    version: [
        'uuidv4',
        'uuidv5'
    ]
})

const getIngressSchema = joi.object({
    id: id.required()
})

const createIngressSchema = joi.object({
    concept: concept.required(),
    amount: amount.required(),
    state: state.required(),
    type: type.required(),
    date
})

const updateIngressSchema = joi.object({
    id: id.required(),
    concept,
    amount,
    state,
    type,
    date
})

module.exports = {
    createIngressSchema,
    getIngressSchema,
    updateIngressSchema
}