/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { IsDefined, IsInt, IsString } from "class-validator";
/* eslint-enable @typescript-eslint/no-unused-vars */

import { Account } from "./account.entity";

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account)
  @IsDefined()
  liker: Account;

  @ManyToOne(() => Account)
  @IsDefined()
  liked: Account;

  @CreateDateColumn({ type: "datetime" })
  timestamp;
}
