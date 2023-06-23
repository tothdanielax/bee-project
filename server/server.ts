const express = require('express');
const cors = require('cors');
const {expressjwt} = require('express-jwt');
const jwt = require('jsonwebtoken');
const config = require('./config.json');
const _ = require('lodash');
const bcrypt = require('bcrypt');

// sequelize
const db = require("./models");
const {Sequelize, sequelize} = db;
const {ValidationError, DatabaseError, Op} = Sequelize;
const {User, Order, Honey} = db;

const host = config.host;
const port = config.port;
const secret = config.authentication.secret;

const app = express();

app.use(cors());
app.use(express.json());

// commonjs miatt
interface Auth {
    id: number,
    username: string,
    password: string
}

interface OrderRequest {
    body: {
        elements: { honey: string, quantity: number }[]
    }
    auth: Auth
}


interface ErrorResponse {
    error: string
}

interface AuthRequest {
    body: {
        username: string,
        password: string
    },
    auth: Auth
}

app.post('/api/login', async function (req: AuthRequest, res: any) {

    if (req.auth) return res.status(200).send({authenticated: true, token: req.auth});

    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(403).send({error: "unauthorized"} as ErrorResponse);
    }

    const user = await User.findOne({where: {username: username}});
    if (!user) return res.status(403).send({error: "unauthorized"} as ErrorResponse);

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(403).send({error: "unauthorized"} as ErrorResponse);
    }

    const token = jwt.sign({...req.body, id: user.id}, secret);
    return res.status(200).send({authenticated: true, token: token});
});

app.post('/api/register', async function (req: AuthRequest, res: any) {

    if (req.auth) return res.status(200).send({authenticated: true, token: req.auth});

    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).send({error: "username or password is missing"} as ErrorResponse);
    }

    const userExists = await User.findOne({where: {username: username}});
    if (userExists) return res.status(400).send({error: "user already existing"} as ErrorResponse);

    const user = await User.create({username: username, password: password});

    const token = jwt.sign({...req.body, id: user.id}, secret);
    return res.status(200).send({authenticated: true, token: token});
});

app.post('/api/order', expressjwt({
    secret: secret,
    algorithms: ["HS256"]
}), async function (req: OrderRequest, res: any) {

    const elements: {honey: string, quantity: number}[] = req.body.elements;
    if (!elements || !Array.isArray(elements) || elements.length < 1) return res.status(400).send({error: "no orders"} as ErrorResponse);

    for (const element of elements) {
        const {honey: key, quantity: value}: {honey: string, quantity: number} = element;
        console.log(key, value, typeof (value as unknown as number))

        if (!key?.trim()) return res.status(400).send({error: "honey name cannot be empty/missing"} as ErrorResponse);
        if (typeof key !== 'string') return res.status(400).send({error: `"${key}" is not a string`} as ErrorResponse);
        if (!Number.isInteger(Number(value))) {
            return res.status(400).send({error: `"${key}" item's quantity is not an integer`} as ErrorResponse);
        }
        if (value < 1) return res.status(400).send({error: `"${key}" item's quantity is less than 1`} as ErrorResponse);
        if (value > 100) return res.status(400).send({error: `"${key}" item's quantity is more than 100, please contact us for bulk orders`} as ErrorResponse);

        const honey = await Honey.findOne({where: {type: key}});

        if(!honey) return res.status(400).send({error: `"${key}" item is not available`} as ErrorResponse);
        if (honey.remaining < value) return res.status(400).send({error: `"${key}" item's quantity is more than the available quantity`} as ErrorResponse);
        honey.update({remaining: honey.remaining - value});
    }

    console.log('Order successful');
    console.log(elements);

    const order = await Order.create({UserId: req.auth.id});
    const honeyList = await Honey.findAll({where: {type: {[Op.in]: elements.map(e => e.honey)}}});
    order.setHoney(honeyList);

    return res.status(200).send({status: "order successful"});
});

app.get('/api/order', expressjwt({
    secret: secret,
    algorithms: ["HS256"]
}), async function (req: any, res: any) {
    const orders = await Order.findAll({where: {UserId: req.auth.id}, include: Honey, order: [['createdAt', 'DESC']]});

    if (!orders) return res.status(400).send({error: "no orders"} as ErrorResponse);
    return res.status(200).send(orders);
});


const listener = app.listen(port, host, function () {
    console.log('Listening on port ' + port);
});

module.exports = {config}