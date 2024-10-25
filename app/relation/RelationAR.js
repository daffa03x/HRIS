const sequelize = require("../../db/sequelize");
const Application = require("../application/model");
const Recruitment = require("../recruitment/model");

const models = {
  Application,
  Recruitment,
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
