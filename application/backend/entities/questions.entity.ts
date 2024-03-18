import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  //OneToMany,
} from "typeorm";
//import { Answer } from "./answer.entity";
import { Account } from "./account.entity";
import { IsDefined, IsString } from "class-validator";

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @IsDefined()
  account: Account;

  @Column()
  @IsDefined()
  @IsString()
  question: string;
}
