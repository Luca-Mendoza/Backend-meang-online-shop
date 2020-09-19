/*Creación del servidor Node Express con ajustes básicos y visualizar*/

import express from "express";
import cors from "cors"; /*CORS es un paquete node.js para proporcionar un middleware Connect / Express que se puede usar para habilitar CORS con varias opciones.*/
import compression from "compression";
import { createServer } from "http";


const app = express();

app.use('*', cors());

app.use(compression());

app.get('/', (_, res) => {
    res.send('APU MEANG - Oline Shop Start');
});

const httoServer = createServer(app);

httoServer.listen(
    {
        port: 2002
    },
    () => console.log('http://localhost:2002 API MEANG - Online Shop Start')
);

