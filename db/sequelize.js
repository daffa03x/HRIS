const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("hris", "root", "", {
  host: "localhost",
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
