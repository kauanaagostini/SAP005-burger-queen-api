'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductsOrders extends Model {
    static associate(models) {
      // ProductOrders.belongsTo(models.Orders, {
      //   foreignKey: 'order_id',
      // });
      // ProductOrders.belongsTo(models.Products, {
      //   foreignKey: 'product_id',
      // });
    }
  };
  ProductsOrders.init({
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    qtd: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductsOrders',
  });
  return ProductsOrders;
};