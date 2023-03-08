"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../controllers/User");
const Users_1 = require("../validations/Users");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/register", Users_1.createUserValidator, User_1.createUser);
router.post("/login", Users_1.loginValidator, User_1.loginUser);
router.get("/:id", User_1.getUser);
router.post("/:id", authMiddleware_1.authRequired, Users_1.imageUserValidator, User_1.imageUser);
exports.default = router;
