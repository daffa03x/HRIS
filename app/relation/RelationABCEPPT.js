const sequelize = require("../../db/sequelize");
const Employee = require("../employee/model");
const Attendance = require("../attendance/model");
const Payroll = require("../payroll/model");
const Benefit = require("../benefit/model");

const models = {
  Employee,
  Attendance,
  Payroll,
  Benefit,
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
