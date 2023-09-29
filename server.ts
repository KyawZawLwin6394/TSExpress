import express, { Express } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import http from 'http';
import cors from 'cors';
import { glob } from 'glob';
import * as path from 'path';

const app: Express = express();
const server = http.createServer(app);
const rootPath = path.normalize(__dirname); // Define path
const port: number = Number(process.env.PORT) || 9000;

app.use(cors({ origin: '*' })); // Use CORS middleware
app.use(bodyParser.json()); // Use body-parser middleware

const routes: string[] = glob.sync('./app/routes/*.ts'); // Preparing routes for MVC

routes.forEach(async (route: string) => {
    const joinedPath: string = path.join(rootPath, route);
    const { default: routeHandler } = await import(joinedPath);
    routeHandler(app);
});

server.listen(port, () => {
    console.log(`We are live on port : ${port}!`);
});

export default server;
