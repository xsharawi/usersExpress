"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const os_1 = __importDefault(require("os"));
const dataSource_1 = __importDefault(require("./db/dataSource"));
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const HOSTNAME = os_1.default.hostname();
const userRoute_1 = __importDefault(require("./routes/userRoute"));
app.use(express_1.default.json());
app.use('/user', userRoute_1.default);
app.all('*', (req, res) => {
    res.status(404).send('where you going blud?');
});
app.listen(PORT, () => {
    dataSource_1.default.init();
    console.log(`server currently running on http://${HOSTNAME}:${PORT} `);
});
