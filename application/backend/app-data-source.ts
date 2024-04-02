import { DataSource } from "typeorm";
export const myDataSource = new DataSource({
  type: "mysql",
  host: "csc648-db.ceezzsxgwws1.us-west-1.rds.amazonaws.com",
  port: 3306,
  username: "admin",
  password: "admincsc648",
  database: "swampstudydb",
  entities: ["./entities/*.ts"],
  logging: true,
  synchronize: true,
});

// export const myDataSource = new DataSource({
//   type: "mysql",
//   host: "csc648-db.ceezzsxgwws1.us-west-1.rds.amazonaws.com",
//   port: 3306,
//   username: "admin",
//   password: "swampstudy648",
//   database: "swampstudyDB",
//   entities: ["./entities/*.ts"],
//   logging: true,
//   synchronize: true,
// });
