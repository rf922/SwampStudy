/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from "typeorm";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsDefined, IsInt, IsString } from "class-validator";
/* eslint-enable @typescript-eslint/no-unused-vars */
import { Account } from "./account.entity";
import { Class } from "./class.entity";
/* eslint-enable @typescript-eslint/no-unused-vars */

@Entity()
export class Match extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany(() => Account)
  @JoinTable()
  @IsDefined()
  users: Account[];

  @ManyToOne(() => Class)
  @IsDefined()
  class: Class;

  @Column({ type: "datetime" })
  meetingTime;

  @Column()
  @IsDefined()
  meetingLink: string;
}
