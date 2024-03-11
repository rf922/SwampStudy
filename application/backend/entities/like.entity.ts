import {
  Entity, // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsDefined, IsInt, IsString } from "class-validator";
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
