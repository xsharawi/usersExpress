"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const db = new typeorm_1.DataSource({
    type: 'mysql',
    port: Number(process.env.DB_PORT),
    host: 'localhost',
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    username: process.env.DB_USER,
    entities: [User_1.User],
    logging: true,
    synchronize: true,
});
const init = () => db.initialize().then(() => { console.log("db connected"); }).catch((err) => console.log(`error connecting ${err}`));
exports.default = { db, init };
