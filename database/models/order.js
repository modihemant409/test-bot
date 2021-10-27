const { Sequelize, DataTypes } = require("sequelize");
const connection = require("../config");
const Orders = connection.define("orders", {
  userId: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Orders;
