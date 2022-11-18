"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const holiday_1 = require("./holiday");
const { Schema, model } = mongoose_1.default;
const userSchema = new Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    createdHolidays: { type: [holiday_1.holidaySchema] }
});
userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        delete returnedObject.__v;
    }
});
const UserModel = model('User', userSchema);
exports.default = UserModel;
