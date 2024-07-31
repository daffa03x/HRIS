const { DataTypes } = require("sequelize");
const sequelize = require("../../db/sequelize"); // Konfigurasi sequelize Anda

const Employee = sequelize.define(
  "Employee",
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
    tableName: "recruitment", // Nama tabel di database
    timestamps: false, // Set false jika tabel tidak memiliki kolom createdAt dan updatedAt
  }
);

module.exports = Employee;
