import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Account } from "./account.entity";
import { IsDefined, IsString } from "class-validator";
import { Thread } from "./thread.entity";

@Entity()
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @IsDefined()
  account: Account;

  @Column()
  @IsDefined()
  @IsString()
  answer: string;

  @ManyToOne(() => Thread, (thread) => thread.answers)
  thread: Thread;
}
