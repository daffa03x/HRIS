const sequelize = require("../../db/sequelize");
const Attendance = require("./model");
const Employee = require("../employee/model");

const models = {
  Attendance,
  Employee,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = {
  sequelize,
  ...models,
};
