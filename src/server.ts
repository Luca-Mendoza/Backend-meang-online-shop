import { IContext } from './interfaces/context.interface';
/*Creación del servidor Node Express con ajustes básicos y visualizar*/

import express from 'express';
import cors from 'cors'; /*CORS es un paquete node.js para proporcionar un middleware Connect / Express que se puede usar para habilitar CORS con varias opciones.*/
import compression from 'compression';
import environment from './config/environments';
import schema from './schema';
import expressPlayground from 'graphql-playground-middleware-express';
import { createServer, Server } from 'http';
import { ApolloServer } from 'apollo-server-express';
import Database from './lib/database';
import chalk from 'chalk';


// Configuration de las variables del enteron (Lectures)
if (process.env.NODE_ENV !== 'production') {
    const env = environment;
    console.log(env);
}

async function init() {
    const app = express();

    app.use('*', cors());

    app.use(compression());

    const database = new Database();

    const db = await database.init();

    const context = async ({ req, connection }: IContext) => {
        const token = (req) ? req.headers.authorization : connection.authorization;
        return { db, token };
    };

    const server = new ApolloServer({
        schema,
        introspection: true,
        context
    });

    server.applyMiddleware({ app });

    app.get('/', expressPlayground({
        endpoint: '/graphql'
    }));

    const httpServer = createServer(app);
    const PORT = process.env.PORT || 2002;

    httpServer.listen(
        {
            port: PORT
        },
        () => {
            console.log('=============================SERVER API GRAPHQL=============================');
            console.log(`STATUS: ${chalk.greenBright('ONLINE')}`);
            console.log(`MESSAGE: ${chalk.greenBright('MAILER CONNECT')}`);
            console.log(`URL: http://localhost:${PORT}`);
        }
    );
}

init();
