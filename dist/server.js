"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const glob_1 = require("glob");
const path = __importStar(require("path"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const rootPath = path.normalize(__dirname); // Define path
const port = Number(process.env.PORT) || 9000;
app.use((0, cors_1.default)({ origin: '*' })); // Use CORS middleware
app.use(body_parser_1.default.json()); // Use body-parser middleware
const routes = glob_1.glob.sync('./app/routes/*.ts'); // Preparing routes for MVC
routes.forEach((route) => __awaiter(void 0, void 0, void 0, function* () {
    const joinedPath = path.join(rootPath, route);
    const { default: routeHandler } = yield Promise.resolve(`${joinedPath}`).then(s => __importStar(require(s)));
    routeHandler(app);
}));
server.listen(port, () => {
    console.log(`We are live on port : ${port}!`);
});
exports.default = server;
