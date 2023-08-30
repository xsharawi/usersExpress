"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let validRegister = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        res.status(404).send('not enough info email and passowrd are required');
        return;
    }
    next();
};
exports.default = validRegister;
