"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../db/entities/User");
const validRegister_1 = __importDefault(require("../middlewares/validRegister"));
const route = (0, express_1.default)();
route.get('/', async (req, res) => {
    try {
        const users = await User_1.User.find();
        res.send(users);
    }
    catch (err) {
        res.status(500).send('something went wrong');
        console.error(err);
    }
});
route.post('/register', validRegister_1.default, (req, res) => {
    try {
        const newUser = new User_1.User();
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        newUser.fullName = req.body.fullName || "unnamed";
        newUser.type = req.body.type || 'normal';
        newUser.save();
        res.status(200).send('user created');
    }
    catch (err) {
        res.status(500).send('something went wrong');
        console.error(err);
    }
});
exports.default = route;
