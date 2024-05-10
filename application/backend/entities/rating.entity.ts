import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
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

  @ManyToOne(() => Account, (account) => account.ratings, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "accountId" }) // Specifies the custom column name if different from the default
  account: Account;
}
