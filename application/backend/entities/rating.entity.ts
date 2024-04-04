import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { Account } from "./account.entity";
import { IsDefined, IsInt } from "class-validator";
@Entity()
export class Rating extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsDefined()
  @IsInt()
  rating: number;

  @IsDefined()
  @ManyToOne(() => Account)
  account: Account;
}
