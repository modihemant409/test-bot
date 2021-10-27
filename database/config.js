const { Sequelize } = require("sequelize");

const connection = new Sequelize("bot", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

connection
  .authenticate()
  .then((res) => {
    console.log("Connection established with database.");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = connection;
