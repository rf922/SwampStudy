/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { IsDefined, IsInt, IsString } from "class-validator";
import { Account } from "./account.entity";
import { Class } from "./class.entity";
/* eslint-enable @typescript-eslint/no-unused-vars */

@Entity()
export class Match extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account)
  @IsDefined()
  user1: Account;

  @ManyToOne(() => Account)
  @IsDefined()
  user2: Account;

  @ManyToOne(() => Class)
  @IsDefined()
  class: Class;

  @Column({ type: "datetime" })
  meetingTime;

  @Column()
  @IsDefined()
  meetingLink: string;
}
