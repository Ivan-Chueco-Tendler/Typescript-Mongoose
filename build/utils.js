"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = exports.toAddUser = exports.toAddHoliday = void 0;
const enums_1 = require("./enums");
const getErrorMessage = (error) => {
    if (error instanceof Error)
        return error.message;
    return String(error);
};
exports.getErrorMessage = getErrorMessage;
const parseName = (nameFromRequest) => {
    if (typeof nameFromRequest !== 'string') {
        throw new Error('Missing or Incorrect name for new holiday');
    }
    return nameFromRequest;
};
const parseDescription = (descFromRequest) => {
    if (typeof descFromRequest !== 'string') {
        throw new Error('Missing or Incorrect description for new holiday');
    }
    return descFromRequest;
};
const parseCountry = (countryFromRequest) => {
    if (typeof countryFromRequest !== 'string') {
        throw new Error('Missing or Incorrect description for new holiday');
    }
    return countryFromRequest;
};
const parseDate = (dateFromRequest) => {
    if (typeof dateFromRequest !== 'string') {
        if (!(dateFromRequest instanceof Date)) {
            throw new Error('Missing or Incorrect date for new holiday');
        }
        return dateFromRequest.toISOString().substring(0, 10);
    }
    return dateFromRequest;
};
const parseType = (typeFromRequest) => {
    if (!Array.isArray(typeFromRequest)) {
        throw new Error('Missing or Incorrect type/s for new holiday (Not an Array)');
    }
    if (!checkTypesArray(typeFromRequest)) {
        throw new Error('Missing or Incorrect type/s for new holiday (Not a correct type)');
    }
    return typeFromRequest;
};
const checkTypesArray = (array) => {
    const arrayWithTypes = array.filter(arg => Object.values(enums_1.HolidayTypes).includes(arg));
    return (arrayWithTypes.length > 0 && arrayWithTypes.length === array.length);
};
const toAddHoliday = (object) => {
    const newHoliday = {
        name: parseName(object.name),
        description: parseDescription(object.description),
        date: parseDate(object.date),
        type: parseType(object.type),
        country: parseCountry(object.country)
    };
    return newHoliday;
};
exports.toAddHoliday = toAddHoliday;
const parseEmail = (emailFromRequest) => {
    if (typeof emailFromRequest !== 'string' || emailFromRequest.split('@').length !== 2) {
        throw new Error('Missing or Incorrect email for new user');
    }
    return emailFromRequest;
};
const parseUsername = (usernameFromRequest) => {
    if (typeof usernameFromRequest !== 'string') {
        throw new Error('Missing or Incorrect username for new user');
    }
    return usernameFromRequest;
};
const parsePassword = (passwordFromRequest) => {
    if (typeof passwordFromRequest !== 'string') {
        throw new Error('Missing or Incorrect password for new user');
        // RegEx for minimum eight characters, at least one letter, one number and one special character:
    }
    else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(passwordFromRequest)) {
        throw new Error('Password should have minimum eight characters, at least one letter, one number and one special character');
    }
    else
        return passwordFromRequest;
};
const toAddUser = (object) => {
    const newUser = {
        email: parseEmail(object.email),
        username: parseUsername(object.username),
        password: parsePassword(object.password)
    };
    return newUser;
};
exports.toAddUser = toAddUser;
