'use strict';
const {
    Model
} = require('sequelize');

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Order, {foreignKey: 'UserId'});
        }
    }

    User.init({
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: [4, 20]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4, 200]
            },
            set(value) {
                this.setDataValue('password', bcrypt.hashSync(value, 10));
            }
        }
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
