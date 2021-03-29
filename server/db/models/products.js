'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {
      Products.belongsToMany(models.Orders, {
        through: 'ProductsOrders',
        as: 'orders',
        foreignKey: 'product_id',
        otherKey: 'order_id'
      });
    }
  };
  Products.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    flavor: DataTypes.STRING,
    complement: DataTypes.STRING,
    image: DataTypes.STRING,
    menuType: DataTypes.STRING,
    menuSubType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};