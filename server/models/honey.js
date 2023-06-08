'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Honey extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsToMany(models.Order, {through: 'HoneyOrder'})
        }
    }

    Honey.init({
        type: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isIn: [
                    ['Akác', 'Virág', 'Gyógy', 'Hárs', 'Repce']
                ]
            }
        },
        remaining: {
            type: DataTypes.INTEGER,
            defaultValue: 100,
            validate: {
                min: 0,
                max: 100
            },
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Honey',
    });
    return Honey;
};