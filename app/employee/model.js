const { DataTypes } = require("sequelize");
const sequelize = require("../../db/sequelize"); // Konfigurasi sequelize Anda

const Employee = sequelize.define(
  "Employee",
  {
    employee_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_of_joining: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "employee", // Nama tabel di database
    timestamps: false, // Set false jika tabel tidak memiliki kolom createdAt dan updatedAt
  }
);

// Define the association
Employee.associate = function (models) {
  Employee.hasMany(models.Attendance, { foreignKey: "employee_id" });
};

module.exports = Employee;
