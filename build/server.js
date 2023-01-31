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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const http_1 = require("http");
const environments_1 = __importDefault(require("./config/environments"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = __importDefault(require("./schema"));
const graphql_playground_middleware_express_1 = __importDefault(require("graphql-playground-middleware-express"));
const database_1 = __importDefault(require("./lib/database"));
const chalk_1 = __importDefault(require("chalk"));
if (process.env.NODE_ENV !== 'production') {
    const env = environments_1.default;
    console.log(env);
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express_1.default();
        const pubsub = new apollo_server_express_1.PubSub();
        app.use('*', cors_1.default());
        app.use(compression_1.default());
        const database = new database_1.default();
        const db = yield database.init();
        const context = ({ req, connection }) => __awaiter(this, void 0, void 0, function* () {
            const token = req
                ? req.headers.authorization
                : connection.authorization;
            return { db, token, pubsub };
        });
        const server = new apollo_server_express_1.ApolloServer({
            schema: schema_1.default,
            introspection: true,
            context,
        });
        server.applyMiddleware({ app });
        app.get('/', graphql_playground_middleware_express_1.default({
            endpoint: '/graphql',
        }));
        const httpServer = http_1.createServer(app);
        server.installSubscriptionHandlers(httpServer);
        const PORT = process.env.PORT || 2002;
        httpServer.listen({
            port: PORT,
        }, () => {
            console.log('==================SERVER API GRAPHQL====================');
            console.log(`STATUS: ${chalk_1.default.greenBright('ONLINE')}`);
            console.log(`MESSAGE: ${chalk_1.default.greenBright('API MEANG - Online Shop CONNECT!!')}`);
            console.log(`GraphQL Server => @: http://localhost:${PORT}/graphql `);
            console.log(`WS Connection => @: ws://localhost:${PORT}/graphql `);
        });
    });
}
init();
