import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Account } from "./account.entity";
import { Question } from "./questions.entity";
import { IsDefined, IsString } from "class-validator";

@Entity()
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question, (question) => question.answers) // corresponding setup @ Question entity
  @IsDefined()
  question: Question;

  @ManyToOne(() => Account)
  @IsDefined()
  account: Account;

  @Column()
  @IsDefined()
  @IsString()
  answer: string;
}
