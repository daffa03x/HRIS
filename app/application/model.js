const { DataTypes } = require("sequelize");
const sequelize = require("../../db/sequelize"); // Your sequelize configuration

const Application = sequelize.define(
  "Application",
  {
    application_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    job_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Recruitment", // Name of the target model (table name or model name in the database)
        key: "job_id", // Key in the target model that you're referencing
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    candidate_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    application_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "applications", // Name of the table in the database
    timestamps: false, // Set false if the table does not have createdAt and updatedAt columns
  }
);

// Define the association
Application.associate = function (models) {
  Application.belongsTo(models.Recruitment, { foreignKey: "job_id" });
};

module.exports = Application;
