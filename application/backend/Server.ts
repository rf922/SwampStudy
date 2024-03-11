import express, { Express, Request, Response } from "express";
import * as path from "path";
import cors from "cors";
//import userRouter from "./routes/userRouter";
import { myDataSource } from "./app-data-source";

<<<<<<< HEAD
import accountRouter from "./routers/accountRouter"; // ES6 default export
import userRouter from "./routers/userRouter"; // ES6 default export
=======
const account = require("./routers/accountRouter");
const user = require("./routers/userRouter");
const like = require("./routers/likeRouter");
const match = require("./routers/matchRouter.ts");
>>>>>>> lenni-db-dev

myDataSource
  .initialize()
  .then(() => {
    console.log("Successful DB Conn");
  })
  .catch((err) => {
    console.log("Not Successful", err);
  });

export class Server {
  private app: Express;

  constructor() {
    this.app = express(); // Create an Express app inside the constructor

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static(path.resolve("./dist")));
    this.app.use(cors());

<<<<<<< HEAD
    this.app.use("/api/account", accountRouter);
    this.app.use("/api/user", userRouter);
=======
    this.app.use("/api/account", account);
    this.app.use("/api/user", user);
    this.app.use("/api/like", like);
    this.app.use("/api/match", match);
>>>>>>> lenni-db-dev

    this.app.get("/api", (req: Request, res: Response): void => {
      res.send("You have reached the API!");
    });

    //    this.app.use("/user", userRouter);
  }

  public start(port: number): void {
    this.app.listen(port, () =>
      console.log(`Server listening on port ${port}!`),
    );
  }
}
