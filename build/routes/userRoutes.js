"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userServices_1 = require("../services/userServices");
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (req, res, next) => {
    const { id } = req.query;
    if (typeof id !== 'string')
        next();
    else {
        (0, userServices_1.getUserById)(id).then(data => {
            res.json(data);
        }).catch(err => res.status(400).send((0, utils_1.getErrorMessage)(err)));
    }
});
router.get('/', (_req, res) => {
    (0, userServices_1.getUsers)().then(data => {
        res.json(data);
    }).catch(err => res.status(400).send((0, utils_1.getErrorMessage)(err)));
});
router.post('/register', (req, res) => {
    const newUser = (0, utils_1.toAddUser)(req.body);
    (0, userServices_1.userRegister)(newUser).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(400).send((0, utils_1.getErrorMessage)(err));
    });
});
router.post('/login', (req, res) => {
    (0, userServices_1.userLogin)(req.body).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(400).send((0, utils_1.getErrorMessage)(err));
    });
});
exports.default = router;
