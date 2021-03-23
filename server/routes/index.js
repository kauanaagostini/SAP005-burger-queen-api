const { Router } = require('express')
const ExampleRouter = require("./ExampleRouter")
const UsersRouter = require("./UsersRouter")

const router = Router()

// aqui vai todas as rotas
router.use('/example', ExampleRouter);
router.use('/users', UsersRouter)

module.exports = router
