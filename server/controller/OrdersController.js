const dataBase = require("../db/models")


class OrdersController {

  static async createOrder(req, res, next) {
    try {

      const createdOrder = await dataBase.Orders.create(req.body);
      req.body.products.map(async(item) => {
        const product = await dataBase.Products.findByPk(item.id);
        if (!product) {
          return res.status(400).json({ "error": "deu ruim"})
        }
      
        const itemProductOrder = {
          order_id: createdOrder.id,
          product_id: item.id,
          qtd: item.qtd
        }
        console.log(itemProductOrder)

        const createdProductOrder = await dataBase.ProductsOrders.create(itemProductOrder)
      })
      // return res.status(201).json(createdOrder)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

}

module.exports = OrdersController;