const { Router } = require('express')
const ProductsController = require('../controller/ProductsController')

const router = Router()

// aqui vai as requisições
router.get("/", ProductsController.getAllProducts)
router.get("/:id", ProductsController.getProductsById)
router.post("/", ProductsController.createProduct)
router.put("/:id", ProductsController.updateProduct)
router.delete("/:id", ProductsController.deleteProduct)

module.exports = router