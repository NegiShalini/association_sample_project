'use strict';
const {
  Model
} = require('sequelize');
const address = require('./address');
module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    static associate(models) {
      student.belongsTo(address)
    }
  }
  student.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      isEmail: true
    },
    phone: {
      type: DataTypes.STRING,
      isNumeric: true
    },
    date_of_birth: DataTypes.DATE,
    password: {
      type: DataTypes.STRING,
      set(value) {
        const hashedPassword = bcrypt.hashSync(value, 7);
        this.setDataValue('password', hashedPassword);
      }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'student',
  });
  return student;
};