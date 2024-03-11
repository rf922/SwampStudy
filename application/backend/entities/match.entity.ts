/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { IsDefined, IsInt, IsString } from "class-validator";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Account } from "./account.entity";
import { Class } from "./class.entity";

@Entity()
export class Match extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Account, (account) => account.id)
  @IsDefined()
  user1: Account;

  @ManyToOne((type) => Account, (account) => account.id)
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
