const { DataTypes } = require("sequelize");
const sequelize = require("../../db/sequelize"); // Your sequelize configuration

const Benefit = sequelize.define(
  "Benefit",
  {
    benefit_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Employee", // Name of the target model (table name or model name in the database)
        key: "employee_id", // Key in the target model that you're referencing
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    benefit_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "benefits", // Name of the table in the database
    timestamps: false, // Set false if the table does not have createdAt and updatedAt columns
  }
);

// Define the association
Benefit.associate = function (models) {
  Benefit.belongsTo(models.Employee, { foreignKey: "employee_id" });
};

module.exports = Benefit;
