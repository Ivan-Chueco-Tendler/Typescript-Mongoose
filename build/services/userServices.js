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
exports.userLogin = exports.userRegister = exports.getUserById = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const utils_1 = require("../utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const { SECRET_KEY, EXPIRES_IN } = config_1.default;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const usersArray = yield user_1.default.find({}, '-password');
    return usersArray;
});
exports.getUsers = getUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userById = yield user_1.default.findById(id, '-password');
    if (userById === null)
        throw new Error('No user found with that id');
    return userById;
});
exports.getUserById = getUserById;
const userRegister = ({ email, username, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdUser = {
            email,
            username,
            password: yield bcrypt_1.default.hash(password, yield bcrypt_1.default.genSalt(12)),
            createdHolidays: []
        };
        const userCheck = yield user_1.default.findOne(createdUser);
        if (userCheck === null)
            throw new Error(`User ${username} already exists`);
        else {
            yield user_1.default.create(createdUser);
            return {
                _id: userCheck._id,
                email,
                username,
                createdHolidays: []
            };
        }
    }
    catch (err) {
        console.error(err);
        throw new Error((0, utils_1.getErrorMessage)(err));
    }
});
exports.userRegister = userRegister;
const userLogin = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCheck = yield user_1.default.findOne({ email });
        if (userCheck === null)
            throw new Error('Data entered is incorrect');
        else if (!(yield bcrypt_1.default.compare(password, userCheck.password)))
            throw new Error('Data entered is incorrect');
        else {
            return jsonwebtoken_1.default.sign({
                username: userCheck.username,
                createdHolidays: userCheck.createdHolidays,
                status: 'User'
            }, SECRET_KEY, { expiresIn: EXPIRES_IN });
        }
    }
    catch (err) {
        console.error(err);
        throw new Error((0, utils_1.getErrorMessage)(err));
    }
});
exports.userLogin = userLogin;
