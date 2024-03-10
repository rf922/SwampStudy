import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, CreateDateColumn } from "typeorm";
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

  @CreateDateColumn({type: "datetime"})
  timestamp;
}
