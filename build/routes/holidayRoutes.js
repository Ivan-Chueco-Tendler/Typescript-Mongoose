"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const holidayServices_1 = require("../services/holidayServices");
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (req, res, next) => {
    const { id } = req.query;
    if (typeof id !== 'string')
        next();
    else {
        (0, holidayServices_1.findById)(id).then(data => {
            res.json(data);
        }).catch(err => res.status(400).send((0, utils_1.getErrorMessage)(err)));
    }
});
router.get('/', (_req, res) => {
    (0, holidayServices_1.getHolidays)().then(data => {
        res.json(data);
    }).catch(err => res.status(400).send((0, utils_1.getErrorMessage)(err)));
});
router.get('/:country', (req, res) => {
    const { country } = req.params;
    (0, holidayServices_1.filterByCountry)(country).then(data => {
        res.json(data);
    }).catch(err => res.status(400).send((0, utils_1.getErrorMessage)(err)));
});
router.put('/', (req, res) => {
    const updatedInfo = (0, utils_1.toAddHoliday)(req.body);
    (0, holidayServices_1.updateHoliday)(Object.assign({ id: req.body.id }, updatedInfo)).then(data => {
        res.json(data);
    }).catch(err => res.status(400).send((0, utils_1.getErrorMessage)(err)));
});
router.post('/', (req, res) => {
    const newHoliday = (0, utils_1.toAddHoliday)(req.body);
    (0, holidayServices_1.addHoliday)(newHoliday).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(400).send((0, utils_1.getErrorMessage)(err));
    });
});
router.delete('/', (req, res) => {
    const { id } = req.query;
    if (typeof id !== 'string' || id === '')
        res.status(400).send('Query must be a string with a valid id');
    else {
        (0, holidayServices_1.deleteHoliday)(id).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(404).send((0, utils_1.getErrorMessage)(err));
        });
    }
});
exports.default = router;
