'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  products.init({
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
  return products;
};