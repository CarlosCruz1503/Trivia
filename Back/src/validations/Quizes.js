"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointQuizValidator = exports.editQuizValidator = exports.createQuizValidator = void 0;
const express_validator_1 = require("express-validator");
const handleValidations_1 = require("../utils/handleValidations");
exports.createQuizValidator = [
    (0, express_validator_1.check)("name")
        .exists()
        .notEmpty(),
    (0, express_validator_1.check)("questions")
        .isArray()
        .exists()
        .notEmpty()
        .isLength({ min: 4 }),
    (0, express_validator_1.check)("questions.*.questionsTitle")
        .exists()
        .notEmpty(),
    (0, express_validator_1.check)("quiestions.*.answers.*.answerTitle")
        .notEmpty()
        .exists(),
    (0, express_validator_1.check)("questions.*.answers.*.correct")
        .isBoolean(),
    (0, express_validator_1.check)("private")
        .isBoolean(),
    (0, express_validator_1.check)("image")
        .notEmpty()
        .isMongoId(),
    (0, express_validator_1.check)("author")
        .notEmpty()
        .isString(),
    (0, express_validator_1.check)("points")
        .isArray()
        .exists(),
    (0, express_validator_1.check)("points.*.user")
        .exists()
        .isString(),
    (0, express_validator_1.check)("points.*.points")
        .exists()
        .isNumeric(),
    (req, res, next) => {
        return (0, handleValidations_1.validateResults)(req, res, next);
    }
];
exports.editQuizValidator = [
    (0, express_validator_1.check)("id")
        .isMongoId(),
    (0, express_validator_1.check)("name")
        .exists()
        .notEmpty(),
    (0, express_validator_1.check)("questions")
        .isArray()
        .exists()
        .notEmpty()
        .isLength({ min: 4 }),
    (0, express_validator_1.check)("questions.*.questionsTitle")
        .exists()
        .notEmpty(),
    (0, express_validator_1.check)("quiestions.*.answers.*.answerTitle")
        .notEmpty()
        .exists(),
    (0, express_validator_1.check)("questions.*.answers.*.correct")
        .isBoolean(),
    (0, express_validator_1.check)("private")
        .isBoolean(),
    (0, express_validator_1.check)("image")
        .notEmpty()
        .isMongoId(),
    (0, express_validator_1.check)("author")
        .notEmpty()
        .isString(),
    (0, express_validator_1.check)("points")
        .isArray()
        .exists(),
    (0, express_validator_1.check)("points.*.name")
        .isString()
        .exists(),
    (0, express_validator_1.check)("points.*.pointsUser")
        .exists()
        .isNumeric(),
    (req, res, next) => {
        return (0, handleValidations_1.validateResults)(req, res, next);
    }
];
exports.pointQuizValidator = [
    (0, express_validator_1.check)("id")
        .isMongoId(),
    (0, express_validator_1.check)("name")
        .exists()
        .notEmpty(),
    (0, express_validator_1.check)("pointsUser")
        .isNumeric()
        .notEmpty(),
    (req, res, next) => {
        return (0, handleValidations_1.validateResults)(req, res, next);
    }
];
