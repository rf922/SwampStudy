import { DataSource } from "typeorm";
export const myDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["./entities/*.ts"],
  logging: true,
  synchronize: true,
});

// update this section
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
