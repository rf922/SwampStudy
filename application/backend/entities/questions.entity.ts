import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Account } from "./account.entity";
import { IsDefined, IsString } from "class-validator";

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account)
  @IsDefined()
  account: Account;

  @Column()
  @IsDefined()
  @IsString()
  question: string;
}
