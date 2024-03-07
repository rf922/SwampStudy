import { Express, Request, Response } from "express";
import express from "express";
import * as path from "path";
import { myDataSource } from "./app-data-source";
import { User } from "./entities/users.entity";
import { Account } from "./entities/account.entity"
import { Validate, validate } from "class-validator";

myDataSource
  .initialize()
  .then(() => {
    console.log("Successfull DB Conn");
  })
  .catch((err) => {
    console.log("not Successful", err);
  });

export class Server {
  private app: Express;

  constructor(app: Express) {
    this.app = app;

    this.app.use(express.json());
    this.app.use(express.static(path.resolve("./") + "/dist"));

    this.app.get("/api", (req: Request, res: Response): void => {
      res.send("You have reached the API!");
    });

    this.app.post("/api/user", async function (req: Request, res: Response) {
      const user = await myDataSource.getRepository(User).create(req.body);

      const errors = await validate(user);
      if (errors.length > 0) {
        res.status(500);
        console.log("Data Validation Failed");
        res.send("Failed Data Validation");
      } else {
        try {
          const results = await myDataSource.getRepository(User).insert(user);
          res.send(results);
        } catch (error) {
          res.status(500);
          res.send("Database Error");
        }
      }
    });

    this.app.post("/api/account", async function (req: Request, res:Response){
      const account = await myDataSource.getRepository(Account).create(req.body)
      const errors = await validate(account);

      if(errors.length > 0){
        res.status(500);
        res.send("Failed Data Validation");
      } else {
        try {
          const results = await myDataSource.getRepository(Account).insert(account);
          res.send(results);
        } catch (error) {
          res.status(500);
          res.send("DB Error");
        }
      }

    });

    this.app.delete(
      "/api/user/:id",
      async function (req: Request, res: Response) {
        try {
          const results = await myDataSource
            .getRepository(User)
            .delete(req.params.id);
          res.send(results);
        } catch (error) {
          res.status(500);
          res.send("Could not delete the user");
        }
      }
    );

    // this.app.get("/about", (req: Request, res: Response): void => {
    //     res.sendFile(path.resolve("./") + "/dist/about.html");
    // });

    this.app.get("*", (req: Request, res: Response): void => {
      res.sendFile(path.resolve("./") + "/dist/index.html");
    });
  }

  public start(port: number): void {
    this.app.listen(port, () =>
      console.log(`Server listening on port ${port}!`)
    );
  }
}
