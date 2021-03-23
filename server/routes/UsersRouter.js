const { Router } = require('express')
const ExampleController = require('../controller/ExampleController')

const router = Router()

// aqui vai as requisições
router.get("/", ExampleController.getAllUsers)

module.exports = router