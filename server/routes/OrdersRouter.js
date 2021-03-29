const { Router } = require('express')
const OrdersController = require('../controller/OrdersController')

const router = Router()

// aqui vai as requisições
// router.get("/", UsersController.getAllUsers)
// router.get("/:id", UsersController.getUserById)
router.post("/", OrdersController.createOrder)
// router.put("/:id", UsersController.updateUser)
// router.delete("/:id", UsersController.deleteUser)

module.exports = router