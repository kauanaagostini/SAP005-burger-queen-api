const dataBase = require("../db/models")


class ProductsController {
  static async getAllProducts(req, res) {
    try {
      const allProducts = await dataBase.Products.findAll({
        order: [["id", "ASC"]],
      });
      return res.status(200).json(allProducts);
    } catch (err) {
      return res.status(400).json({ error : err.message })
    }
  }

  static async getProductsById(req, res) {
    const { id } = req.params

    const handleValidateProduct = await dataBase.Products.findByPk(id);
    if(!handleValidateProduct){
      return res.status(404).json({ status: `Produto não existe. ID informado ${id}`})
    }

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

  static async createProduct(req, res) {
    const { name, type, price, flavor, complement, image, menuType, menuSubType } = req.body;

    if( name.length < 1 || price.length < 1 || menuType.length < 1 || menuSubType.length < 1 ) {
      return res.status(400).json({ status: "Campos de preenchimento obrigatório vazios." })
    }

    try {
      const createdProduct = await dataBase.Products.create({
        name, type, price, flavor, complement, image, menuType, menuSubType
      });
      return res.status(201).json(createdProduct)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

  static async updateProduct(req, res) {
    const { id } = req.params
    const { name, type, price, flavor, complement, image, menuType, menuSubType } = req.body

    if (name != undefined || type != undefined || flavor != undefined || complement != undefined || menuType != undefined || menuSubType != undefined) {
      return res.status(400).json({ status: "Os parametros informados não podem ser alterados. Verifique a documentação."})
    }

    try {
      const updatedProduct = await dataBase.Products.update(
        { price, image }, {
        where: {
          id: Number(id)
        }
      });
      return res.status(201).json({ status: "Produto alterado com sucesso"})
    } catch(err) {
      return res.status(400).json({ error: err.message })
    }
  }

  static async deleteProduct(req, res) {
    const { id } = req.params
    try {
      const deletedProduct =  await dataBase.Products.destroy({
        where: {
          id: Number(id)
        }
      });
      return res.status(201).json({ status: "Produto deletado com sucesso"})
    } catch(err) {
      return res.status(400).json({ error: err.message })
    }
  }

}

module.exports = ProductsController;