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
      return res.status(200).json(allOrders)
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

        const createdProductOrder = await dataBase.ProductsOrders.create(itemProductOrder)
      })
      // return res.status(201).json(createdOrder)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

  static async updateOrder(req, res, next) {
    const { id } = req.params
    try {
      const upedateOrder = await dataBase.Orders.update(
        { status: req.body.status }, {
          where: {
            id: Number(id)
          }
        });
      return res.status(201).json({ status: "ordem alterada com sucesso!"})
    } catch(err) {
      return res.status(400).json({ error: err.message })
    }
  }

  static async deleteOrder(req, res, next) {
    const { id } = req.params
    try {
      const deleteOrder = await dataBase.ProductsOrders.destroy({
        where: {
          order_id: Number(id)
        }
      });
      const deleteProductOrder = await dataBase.Orders.destroy({
        where: {
          id: Number(id)
        }
      });
      return res.status(200).json({ status: "Ordem deletada com sucesso!"})
    } catch(err) {
      return res.status(400).json({ error: err.message })
    }
  }

}

module.exports = OrdersController;