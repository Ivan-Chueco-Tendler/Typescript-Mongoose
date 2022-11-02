"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const holidayServices_1 = require("../services/holidayServices");
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    (0, holidayServices_1.getHolidays)().then(data => {
        console.log(data);
    }).catch(err => (0, utils_1.getErrorMessage)(err));
    (0, holidayServices_1.getHolidays)().then(data => {
        res.json(data);
    }).catch(err => (0, utils_1.getErrorMessage)(err));
});
router.get('/:country', (req, res) => {
    try {
        const { country } = req.params;
        res.json((0, holidayServices_1.filterByCountry)(country));
    }
    catch (e) {
        res.status(400).send((0, utils_1.getErrorMessage)(e));
    }
});
router.post('/', (req, res) => {
    try {
        const newHoliday = (0, utils_1.toAddHoliday)(req.body);
        res.send((0, holidayServices_1.addHoliday)(newHoliday));
    }
    catch (e) {
        res.status(400).send((0, utils_1.getErrorMessage)(e));
    }
});
exports.default = router;
