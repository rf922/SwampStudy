import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  ManyToOne,
  //OneToMany,
} from "typeorm";
//import { Answer } from "./answer.entity";
import { Account } from "./account.entity";
import { Thread } from "./thread.entity";
import { IsDefined, IsString } from "class-validator";

@Entity()
export class Question extends BaseEntity {
  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @IsDefined()
  account: Account;

  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsDefined()
  @IsString()
  question: string;
  @OneToOne(() => Thread, (thread) => thread.question, {
    cascade: true,
    onDelete: "CASCADE",
  })
  thread: Thread;
}
