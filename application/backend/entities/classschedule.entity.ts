import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Account } from "./account.entity";
import { Class } from "./class.entity";
import { IsDefined } from "class-validator";

@Entity()
export class ClassSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @IsDefined()
  account: Account;

  @ManyToOne(() => Class)
  @IsDefined()
  class: Class;
}
