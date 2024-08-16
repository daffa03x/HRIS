const { DataTypes } = require("sequelize");
const sequelize = require("../../db/sequelize");

const Recruitment = sequelize.define(
  "Recruitment",
  {
    job_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    job_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posted_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "recruitment", // Name of the table in the database
    timestamps: false, // Set false if the table does not have createdAt and updatedAt columns
  }
);

// Define the association
Recruitment.associate = function (models) {
  Recruitment.hasMany(models.Application, { foreignKey: "job_id" });
};

module.exports = Recruitment;
