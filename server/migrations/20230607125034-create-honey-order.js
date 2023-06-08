'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('HoneyOrder', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            OrderId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Orders",
                    key: "id",
                },
                onDelete: "cascade",
            },
            HoneyId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Honey",
                    key: "id",
                },
                onDelete: "cascade",
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            }
        })

        await queryInterface.addConstraint("HoneyOrder", {
            fields: ["HoneyId", "OrderId"],
            type: "unique",
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable('HoneyOrder');
    }
};
