const express = require('express')
const router = express.Router()
const { createEgressSchema, getEgressSchema, updateEgressSchema } = require('../schemas/egress.schema')
const validatorHandler = require('../middleware/validator.handler')
const EgressService = require('../services/egress.services')
const service = new EgressService()

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
    validatorHandler(getEgressSchema, 'params'),
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
    validatorHandler(createEgressSchema, 'body'),
    async (req, res, next) => {
        try {
            const data = req.body
            const Egress = await service.create(data)
            res.status(201).json(Egress)
        } catch (error) {
            next(error)
        }
    }
)

//Patch
router.patch('/',
    validatorHandler(updateEgressSchema, 'body'),
    async (req, res, next) => {
        try {
            const data = req.body
            const EgressUpdate = await service.update(data)
            res.status(200).json(EgressUpdate)
        } catch (error) {
            next(error)
        }

    }
)

//Delete
router.delete('/:id',
    validatorHandler(getEgressSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const EgressDelete = await service.delete(id)
            res.status(200).json(EgressDelete)
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router