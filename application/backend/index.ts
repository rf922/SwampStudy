import { Server } from "./Server";
import express from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = express();

const port = parseInt(process.env.PORT);

const server = new Server();
server.start(port);
