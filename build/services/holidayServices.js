"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHoliday = exports.updateHoliday = exports.addHoliday = exports.findById = exports.filterByCountry = exports.getHolidays = void 0;
const holiday_1 = __importDefault(require("../models/holiday"));
const utils_1 = require("../utils");
const getHolidays = () => __awaiter(void 0, void 0, void 0, function* () {
    const holidayData = yield holiday_1.default.find({});
    return holidayData;
});
exports.getHolidays = getHolidays;
const filterByCountry = (country) => __awaiter(void 0, void 0, void 0, function* () {
    const holidaysFiltered = yield holiday_1.default.find({ country }, 'name description date type').exec();
    return holidaysFiltered;
});
exports.filterByCountry = filterByCountry;
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const holidayById = holiday_1.default.findById(id).exec().catch(err => {
        console.error(err);
        throw new Error('No holiday found with that Id');
    });
    return holidayById;
});
exports.findById = findById;
const addHoliday = ({ name, description, date, type, country }) => __awaiter(void 0, void 0, void 0, function* () {
    const newHoliday = {
        name,
        description,
        date,
        type,
        country
    };
    yield holiday_1.default.create(newHoliday);
    return newHoliday;
});
exports.addHoliday = addHoliday;
const updateHoliday = ({ id, name, description, date, type, country }) => __awaiter(void 0, void 0, void 0, function* () {
    const outdatedHoliday = yield holiday_1.default.findById(id);
    if (outdatedHoliday === null)
        throw new Error('No holiday found with that Id');
    else {
        const updatedInfo = {
            name: name !== null && name !== void 0 ? name : outdatedHoliday.name,
            description: description !== null && description !== void 0 ? description : outdatedHoliday.description,
            date: date !== null && date !== void 0 ? date : outdatedHoliday.date,
            type: type !== null && type !== void 0 ? type : outdatedHoliday.type,
            country: country !== null && country !== void 0 ? country : outdatedHoliday.country
        };
        const updatedHoliday = yield holiday_1.default.findByIdAndUpdate(id, updatedInfo, { new: true });
        if (updatedHoliday === null)
            throw new Error(`Error in update of ${updatedInfo.name}`);
        else
            return updatedHoliday;
    }
});
exports.updateHoliday = updateHoliday;
const deleteHoliday = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedHoliday = yield holiday_1.default.findByIdAndDelete(id).catch(err => {
            console.error(err);
            throw new Error('No holiday found with that id');
        });
        return (deletedHoliday !== null ? 'Holiday deleted!' : 'No holiday with that Id was found');
    }
    catch (err) {
        throw new Error((0, utils_1.getErrorMessage)(err));
    }
});
exports.deleteHoliday = deleteHoliday;
