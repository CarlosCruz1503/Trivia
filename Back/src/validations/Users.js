"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUserValidator = exports.loginValidator = exports.createUserValidator = void 0;
const express_validator_1 = require("express-validator");
const handleValidations_1 = require("../utils/handleValidations");
exports.createUserValidator = [
    (0, express_validator_1.check)("name")
        .exists()
        .notEmpty(),
    (0, express_validator_1.check)("email")
        .exists()
        .notEmpty()
        .isEmail(),
    (0, express_validator_1.check)("password")
        .exists()
        .notEmpty()
        .isLength({ min: 8 }),
    (0, express_validator_1.check)("image")
        .exists()
        .isMongoId(),
    (req, res, next) => {
        return (0, handleValidations_1.validateResults)(req, res, next);
    }
];
exports.loginValidator = [
    (0, express_validator_1.check)("email")
        .exists()
        .notEmpty()
        .isEmail(),
    (0, express_validator_1.check)("password")
        .exists()
        .notEmpty()
        .isLength({ min: 8 }),
    (req, res, next) => {
        return (0, handleValidations_1.validateResults)(req, res, next);
    }
];
exports.imageUserValidator = [
    (0, express_validator_1.check)("image")
        .exists()
        .notEmpty()
        .isMongoId(),
    (req, res, next) => {
        return (0, handleValidations_1.validateResults)(req, res, next);
    }
];
