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
/* eslint-enable @typescript-eslint/no-unused-vars */

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @IsDefined()
  liker: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @IsDefined()
  liked: Account;

  @CreateDateColumn()
  public timestamp: Date;
}
