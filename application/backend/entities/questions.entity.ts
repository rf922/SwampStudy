import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  ManyToOne,
} from "typeorm";
import { Account } from "./account.entity";
import { Thread } from "./thread.entity";
import { IsDefined, IsString } from "class-validator";

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @IsDefined()
  account: Account;

  @OneToOne(() => Thread, (thread) => thread.question)
  thread: Thread;

  @Column()
  @IsDefined()
  @IsString()
  question: string;
}
