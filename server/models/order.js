'use strict';
const {
    Model
} = require('sequelize');
const {Sequelize} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, {foreignKey: 'UserId'});
            this.belongsToMany(models.Honey, {through: 'HoneyOrder'})
        }
    }

    Order.init({
        UserId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            },
            onDelete: 'cascade',
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};