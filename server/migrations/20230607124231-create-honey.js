'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Honey', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            type: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isIn: [
                        ['Akác', 'Virág', 'Gyógy', 'Hárs', 'Repce']
                    ]
                }
            },
            remaining: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false,
                validate: {
                    min: 0,
                    max: 100
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Honey');
    }
};