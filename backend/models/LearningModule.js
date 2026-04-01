const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const LearningModule = sequelize.define('LearningModule', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  lessonsCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

module.exports = LearningModule;
