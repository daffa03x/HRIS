const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("bpvd3qwphxrkmsqmynfk", "ugmhnsddjdsz5ins", "91lMQvHqYFEniedHvSU6", {
  host: "bpvd3qwphxrkmsqmynfk-mysql.services.clever-cloud.com",
  dialect: "mysql",
});
// Sync database
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

module.exports = sequelize;
