import { Server } from "./Server";
import express from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = express();

//port was changed from 80 to 8080
const port = 8080;

const server = new Server(app);
server.start(port);
