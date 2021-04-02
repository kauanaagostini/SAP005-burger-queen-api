const dataBase = require("../db/models");


class OrdersController {

  static async getAllOrders(req, res) {
    try {
      let allOrders = await dataBase.Orders.findAll({
        order: [['id', 'ASC']],
        include: [{
          model: dataBase.Products,
          as: 'products',
          attributes: [
            'id', 'name', 'type', 'price', 'flavor', 'complement', 'image', 'menuType', 'menuSubType'
          ],
          through: {
            model: dataBase.ProductsOrders,
            as: 'qtd',
            attributes: ['qtd']
          }
        }]
      });

      allOrders = JSON.parse(JSON.stringify(allOrders));

      const returnedAllOrders = allOrders.map((order) => {
        const productsOrder = order.products.map((item) => ({
          ...item,
          qtd: item.qtd.qtd
        }))
        return {
          ...order,
          products: productsOrder
        }
      });

      return res.status(200).json(returnedAllOrders)
    } catch(err){
      return res.status(400).json({ error : err.message })
    }
  }

  static async getOrderById(req, res){
    const { id } = req.params

    const handleValidateOrder = await dataBase.Orders.findByPk(id);
    if(!handleValidateOrder){
      return res.status(404).json({ status: `Ordem não existe. ID informado ${id}`})
    }

    try {
      let byId = await dataBase.Orders.findOne({
        where: {
          id: Number(id)
        },
        include: [{
          model: dataBase.Products,
          as: 'products',
          attributes: [
            'id', 'name', 'type', 'price', 'flavor', 'complement', 'image', 'menuType', 'menuSubType'
          ],
          through: {
            model: dataBase.ProductsOrders,
            as: 'qtd',
            attributes: ['qtd']
          }
        }]
      })

      byId = byId.toJSON()

      const productsOrder = byId.products.map((item) => ({
        ...item,
        qtd: item.qtd.qtd,
      }))
      
      const returnById = {
        ...byId,
        products: productsOrder,
      }

      return res.status(200).json(returnById)
    } catch(err) {
      return res.status(400).json({ error: err.message })
    }
  }

  static async createOrder(req, res) {
    const { user_id, client, table, products } = req.body;

    if( user_id.length < 1 || client.length < 1 || table.length < 1 || products.length < 1){
      return res.status(400).json({ status: "Campos de preenchimento obrigatório vazios." })
    }

    products.map(async(item) => {
      const product = await dataBase.Products.findByPk(item.id);
      if (!product) {
        return res.status(404).json({ "error": "produto não existe"})
      }
    });

    try {

      const createdOrder = await dataBase.Orders.create({ user_id, client, table, products });
      products.map(async(item) => {
        const product = await dataBase.Products.findByPk(item.id);
        const itemProductOrder = {
          order_id: createdOrder.id,
          product_id: item.id,
          qtd: item.qtd
        }

        const createdProductOrder = await dataBase.ProductsOrders.create(itemProductOrder)
      })
      return res.status(201).json(createdOrder)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

  static async updateOrder(req, res) {
    const { id } = req.params
    const { user_id, client, table, status, comments, products } = req.body;

    if(user_id != undefined || client != undefined || table != undefined || comments != undefined || products != undefined) {
      return res.status(400).json({ status: "Os parametros informados não podem ser alterados. Verifique a documentação."})
    }

    try {
      const upedateOrder = await dataBase.Orders.update(
        { status }, {
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