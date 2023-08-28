'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: { args: true, msg: "username already exists" },
      validate : {
        notEmpty : {
          args: true,
          msg : "Username should not be empty"
        }
      }
    },
    fullname: {
      type: DataTypes.STRING,
      unique: { args: true, msg: "fullname already exists" },
      validate : {
        notEmpty : {
          args: true,
          msg : "fullname should not be empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          args: true,
          msg : "Password should not be empty"
        },
        min: 8
      }
    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};