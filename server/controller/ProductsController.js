const dataBase = require("../db/models")


class ProductsController {
  static async getAllProducts(req, res, next) {
    try {
      const allProducts = await dataBase.Products.findAll();
      return res.status(200).json(allProducts);
    } catch (err) {  //verificar a questão do next
      return res.status(400).json({ error : err.message })
    }
  }

  static async getProductsById(req, res, next) {
    const { id } = req.params
    try {
      const byId = await dataBase.Products.findAll({
        where: {
          id: Number(id)
        }
      });
      return res.status(200).json(byId)
    } catch(err){
      return res.status(400).json({ error: err.message })
    }
  }

  static async createProduct(req, res, next) {
    const newProduct = req.body;
    try {
      const createdProduct = await dataBase.Products.create(newProduct);
      return res.status(201).json(createdProduct)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

  static async updateProduct(req, res, next) {
    const { id } = req.params
    try {
      const updatedProduct = await dataBase.Products.update(
        { price: req.body.price, image: req.body.image }, {
        where: {
          id: Number(id)
        }
      });
      return res.status(201).json({ status: "produto alterado com sucesso"})
    } catch(err) {
      return res.status(400).json({ error: err.message })
    }
  }

  static async deleteProduct(req, res, next) {
    const { id } = req.params
    try {
      const deletedProduct =  await dataBase.Products.destroy({
        where: {
          id: Number(id)
        }
      });
      return res.status(201).json({ status: "produto deletado com sucesso"})
    } catch(err) {
      return res.status(400).json({ error: err.message })
    }
  }

}

module.exports = ProductsController;