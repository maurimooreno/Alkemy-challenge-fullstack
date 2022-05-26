const express = require('express')
const router = express.Router()
const { createTransactionSchema, getTransactionSchema, updateTransactionSchema } = require('../schemas/transaction.schema')
const validatorHandler = require('../middleware/validator.handler')
const TransactionService = require('../services/transaction.services')
const service = new TransactionService()

//Get all
router.get('/',
    async (req, res, next) => {
        try {
            const findAll = await service.findAll()
            res.status(200).json(findAll)
        } catch (error) {
            next(error)
        }
    }
)

//Get one
router.get('/:id',
    validatorHandler(getTransactionSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const findOne = await service.findOne(id)
            res.status(200).json(findOne)
        } catch (error) {
            next(error)
        }
    }
)

//Post
router.post('/',
    validatorHandler(createTransactionSchema, 'body'),
    async (req, res, next) => {
        try {
            const data = req.body
            const transaction = await service.create(data)
            res.status(201).json(transaction)
        } catch (error) {
            next(error)
        }
    }
)

//Patch
router.patch('/',
    validatorHandler(updateTransactionSchema, 'body'),
    async (req, res, next) => {
        try {
            const data = req.body
            const transactionUpdate = await service.update(data)
            res.status(200).json(transactionUpdate)
        } catch (error) {
            next(error)
        }

    }
)

//Delete
router.delete('/:id',
    validatorHandler(getTransactionSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const transactionDelete = await service.delete(id)
            res.status(200).json(transactionDelete)
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router