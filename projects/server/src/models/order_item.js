"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order_item.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: 'product', 
      });
      Order_item.belongsTo(models.Order_detail, {
        foreignKey: "orderDetail_id",
      });
    }
  }
  Order_item.init(
    {
      orderDetail_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order_item",
    }
  );
  return Order_item;
};
