const { DataTypes } = require("sequelize");
const sequelize = require("../../db/sequelize"); // Your sequelize configuration

const Payroll = sequelize.define(
  "Payroll",
  {
    payroll_id: {
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
    salary: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    bonus: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    deductions: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    pay_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "payroll", // Name of the table in the database
    timestamps: false, // Set false if the table does not have createdAt and updatedAt columns
  }
);

// Define the association
Payroll.associate = function (models) {
  Payroll.belongsTo(models.Employee, { foreignKey: "employee_id" });
};

module.exports = Payroll;
