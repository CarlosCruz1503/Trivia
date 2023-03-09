"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (res, message, status) => {
    res.status(status).send(`${message}`);
};
exports.handleError = handleError;
