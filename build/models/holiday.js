"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HolidayModel = exports.holidaySchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
exports.holidaySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    type: { type: [String], required: true },
    country: { type: String, required: true }
});
exports.holidaySchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
exports.HolidayModel = model('Holiday', exports.holidaySchema);
