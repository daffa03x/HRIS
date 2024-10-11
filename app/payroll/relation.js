const sequelize = require("../../db/sequelize");
const Employee = require("../employee/model");
const Attendance = require("../attendance/model");
const Payroll = require("./model");

const models = {
  Employee,
  Attendance,
  Payroll,
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
