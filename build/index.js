"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const holidayRoutes_1 = __importDefault(require("./routes/holidayRoutes"));
const config_1 = __importDefault(require("./config"));
const cors_1 = __importDefault(require("cors"));
const { PORT } = config_1.default;
require('./mongo');
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/holidays', holidayRoutes_1.default);
app.listen(PORT, () => {
    console.log(`App is running in port ${config_1.default.PORT}`);
});
