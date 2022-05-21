const express = require('express')
const router = express.Router()
const { createIngressSchema, getIngressSchema, updateIngressSchema } = require('../schemas/ingress.schema')
const validatorHandler = require('../middleware/validator.handler')
const IngressService = require('../services/ingress.services')
const service = new IngressService()

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
    validatorHandler(getIngressSchema, 'params'),
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
    validatorHandler(createIngressSchema, 'body'),
    async (req, res, next) => {
        try {
            const data = req.body
            const ingress = await service.create(data)
            res.status(201).json(ingress)
        } catch (error) {
            next(error)
        }
    }
)

//Patch
router.patch('/',
    validatorHandler(updateIngressSchema, 'body'),
    async (req, res, next) => {
        try {
            const data = req.body
            const ingressUpdate = await service.update(data)
            res.status(200).json(ingressUpdate)
        } catch (error) {
            next(error)
        }

    }
)

//Delete
router.delete('/:id',
    validatorHandler(getIngressSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const ingressDelete = await service.delete(id)
            res.status(200).json(ingressDelete)
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router