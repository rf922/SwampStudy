import {Server} from "./Server";
import express from 'express';
const app = express();

const port = 80;

const server = new Server(app);
server.start(port);
