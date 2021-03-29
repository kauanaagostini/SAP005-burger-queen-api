const { Router } = require('express')
const OrdersController = require('../controller/OrdersController')

const router = Router()

// aqui vai as requisições
router.get("/", OrdersController.getAllOrders)
router.get("/:id", OrdersController.getOrderById)
router.post("/", OrdersController.createOrder)
// router.put("/:id", UsersController.updateUser)
// router.delete("/:id", UsersController.deleteUser)

module.exports = router