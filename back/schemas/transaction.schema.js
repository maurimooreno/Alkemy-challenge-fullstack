const joi = require('joi')

const concept = joi.string().min(2).max(50)
const amount = joi.number()
const type = joi.string().valid('income', 'costs')
const date = joi.date()
const id = joi.string().guid({
    version: [
        'uuidv4',
        'uuidv5'
    ]
})

const getTransactionSchema = joi.object({
    id: id.required()
})

const createTransactionSchema = joi.object({
    concept: concept.required(),
    amount: amount.required(),
    type: type.required(),
    date
})

const updateTransactionSchema = joi.object({
    id: id.required(),
    concept,
    amount,
    type,
    date
})

module.exports = {
    createTransactionSchema,
    getTransactionSchema,
    updateTransactionSchema
}