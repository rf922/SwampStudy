import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsDefined, IsInt, IsString } from "class-validator";
/* eslint-enable @typescript-eslint/no-unused-vars */
import { Account } from "./account.entity";
import { Class } from "./class.entity";

@Entity()
export class Match extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Account, (account) => account.id)
  @IsDefined()
  user1: Account;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
