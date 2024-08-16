const { DataTypes } = require("sequelize");
const sequelize = require("../../db/sequelize"); // Your sequelize configuration

const Attendance = sequelize.define(
  "Attendance",
  {
    attendance_id: {
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
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    check_in: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    check_out: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "attendance", // Name of the table in the database
    timestamps: false, // Set false if the table does not have createdAt and updatedAt columns
  }
);

// Define the association
Attendance.associate = function (models) {
  Attendance.belongsTo(models.Employee, { foreignKey: "employee_id" });
};

module.exports = Attendance;
