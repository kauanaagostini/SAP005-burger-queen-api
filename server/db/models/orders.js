'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate(models) {
      Orders.belongsToMany(models.Products, {
        through: 'ProductsOrders',
        as: 'products',
        foreignKey: 'order_id',
        otherKey: 'product_id'
      });
    }
  };
  Orders.init({
    user_id: DataTypes.INTEGER,
    client: DataTypes.STRING,
    table: DataTypes.INTEGER,
    status: DataTypes.STRING,
    comments: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};