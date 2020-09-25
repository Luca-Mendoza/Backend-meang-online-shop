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


// Configuracion de las variables del entorno (Lecturas)
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

    const context = { db };

    const server = new ApolloServer({
        schema,
        introspection: true,
        context
    });

    server.applyMiddleware({app});

    app.get('/', expressPlayground({
        endpoint: '/graphql'
    }));

    const httoServer = createServer(app);
    const PORT = process.env.PORT || 2002;

    httoServer.listen(
        {
            port: PORT
        },
        () => console.log(`http://localhost:${PORT} API MEANG - Online Shop Start`)
    );
}

init();
