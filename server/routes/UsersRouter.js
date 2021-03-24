const { Router } = require('express')
const UsersController = require('../controller/UsersController')

const router = Router()

// aqui vai as requisições
router.get("/", UsersController.getAllUsers)
router.get("/:id", UsersController.getUserById)
router.post("/", UsersController.createUser)

module.exports = router