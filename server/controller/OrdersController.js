const { restart } = require("nodemon");
const dataBase = require("../db/models");


class OrdersController {

  static async getAllOrders(req, res, next) {
    try {
      const allOrders = await dataBase.Orders.findAll({
        include: [{
          model: dataBase.Products,
          as: 'products',
          required: false,
          attributes: [
            'id', 'name', 'type', 'price', 'flavor', 'complement'
          ],
          through: {
            model: dataBase.ProductsOrders,
            as: 'productsOrders',
            attributes: ['qtd']
          }
        }]
      })
      return res.status(200).json({allOrders})
    } catch(err){
      return res.status(400).json({ error : err.message })
    }
  }

  static async getOrderById(req, res, next){
    const { id } = req.params
    try {
      const byId = await dataBase.Orders.findAll({
        where: {
          id: Number(id)
        },
        include: [{
          model: dataBase.Products,
          as: 'products',
          required: false,
          attributes: [
            'id', 'name', 'type', 'price', 'flavor', 'complement'
          ],
          through: {
            model: dataBase.ProductsOrders,
            as: 'productsOrders',
            attributes: ['qtd']
          }
        }]
      })
      return res.status(200).json(byId)
    } catch(err) {
      return res.status(400).json({ error: err.message })
    }
  }

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