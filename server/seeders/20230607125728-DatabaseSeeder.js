'use strict';

/** @type {import('sequelize-cli').Migration} */

const {User, Order, Honey} = require("../models");
const {faker} = require("@faker-js/faker");

module.exports = {
    async up(queryInterface, Sequelize) {
        try {
            const defaultUser = await User.create({
                username: "bumblebee",
                password: "IloveHon3y"
            });

            /*
            const honeys = await Honey.bulkCreate([
                {type: "Akác", remaining: faker.number.int({min: 0, max: 100})},
                {type: "Gyógy", remaining: faker.number.int({min: 0, max: 100})},
                {type: "Hárs", remaining: faker.number.int({min: 0, max: 100})},
                {type: "Virág", remaining: faker.number.int({min: 0, max: 100})},
                {type: "Repce", remaining: faker.number.int({min: 0, max: 100})}
            ]); */

            // test
            const honeys = await Honey.bulkCreate([
                {type: "Akác", remaining: 100},
                {type: "Gyógy", remaining: 100},
                {type: "Hárs", remaining: 100},
                {type: "Virág", remaining: 100},
                {type: "Repce", remaining: 100}
            ]);

            const orders = await Order.bulkCreate([
                {UserId: defaultUser.id}
            ]);

            for (const order of orders) {
                // honey plural is honey
                await order.setHoney(faker.helpers.arrayElements(honeys, faker.number.int({min: 1, max: 5})));
            }

        } catch (error) {
            // részletesebb hibaüzenet
            console.log(error);
        }
    },

    // tiszta db-t kapunk, nincs szükség a downra
    async down(queryInterface, Sequelize) {

    }
};
