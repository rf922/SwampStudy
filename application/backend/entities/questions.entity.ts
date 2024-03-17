import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Answer } from "./answer.entity";
import { Account } from "./account.entity";
import { IsDefined, IsString } from "class-validator";

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToMany(() => Answer, (answer) => answer.question) // reciprocal part of the relationship
  answers: Answer[];

  @ManyToOne(() => Account)
  @IsDefined()
  account: Account;

  @Column()
  @IsDefined()
  @IsString()
  question: string;
}
