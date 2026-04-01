const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const LearningModule = require('./LearningModule');

const Submission = sequelize.define('Submission', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  moduleId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// Relationships
User.hasMany(Submission, { foreignKey: 'userId' });
Submission.belongsTo(User, { foreignKey: 'userId' });

LearningModule.hasMany(Submission, { foreignKey: 'moduleId' });
Submission.belongsTo(LearningModule, { foreignKey: 'moduleId' });

module.exports = Submission;
