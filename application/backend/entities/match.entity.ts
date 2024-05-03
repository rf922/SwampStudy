import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from "typeorm";
import { Account } from "./account.entity";
import { Class } from "./class.entity";

@Entity()
export class Match extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, { eager: true })
  userOne: Account;

  @ManyToOne(() => Account, { eager: true })
  userTwo: Account;

  @ManyToMany(() => Class, { eager: true })
  @JoinTable()
  classes: Class[];

  @Column({ type: "datetime", nullable: true })
  meetingTime: Date | null;

  @Column({ nullable: true })
  meetingLink: string | null;

  @CreateDateColumn()
  createdAt: Date;
}
