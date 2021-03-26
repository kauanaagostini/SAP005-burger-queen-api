const { Router } = require('express')
const ExampleRouter = require("./ExampleRouter")
const UsersRouter = require("./UsersRouter")
const ProductsController = require("./ProductsRouter")

const router = Router()

// aqui vai todas as rotas
router.use('/example', ExampleRouter);
router.use('/users', UsersRouter);
router.use('/products', ProductsController)

module.exports = router
