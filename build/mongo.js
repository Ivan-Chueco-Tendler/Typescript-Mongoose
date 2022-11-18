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
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const utils_1 = require("./utils");
const holidays_json_1 = __importDefault(require("./services/holidays.json"));
const holiday_1 = require("./models/holiday");
require('./models/user');
const { MONGO_URI } = config_1.default;
mongoose_1.default.connect(MONGO_URI).then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('DB connected!');
    const infoCheck = yield holiday_1.HolidayModel.find({}).limit(1);
    if (infoCheck.length > 0) {
        return console.log('DB already has data');
    }
    else {
        holiday_1.HolidayModel.insertMany(holidays_json_1.default, (err, _docs) => {
            if (err !== null) {
                console.error((0, utils_1.getErrorMessage)(err));
            }
            else {
                console.log('Holidays inserted!');
            }
        });
    }
})).catch(err => {
    console.error((0, utils_1.getErrorMessage)(err));
});
