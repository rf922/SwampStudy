import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  OneToOne,
} from "typeorm";
import { IsDefined, IsEmail, IsString } from "class-validator";
import { Account } from "./account.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  @IsEmail()
  @IsDefined()
  email: string;

  @Column({ nullable: false })
  @IsDefined()
  @IsString()
  password: string;

  @CreateDateColumn()
  created: Date;

  @OneToOne(() => Account, (account) => account.user_FK)
  account: Account;
}
