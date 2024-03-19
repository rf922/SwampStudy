import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { User } from "./users.entity";
import { Question } from "./questions.entity";
import { IsDefined, IsString } from "class-validator";

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsDefined()
  @IsString()
  first_name: string;

  @Column()
  @IsDefined()
  @IsString()
  last_name: string;

  @Column()
  profile_picture: string;

  @OneToOne(() => User)
  @JoinColumn()
  user_FK: User;

  @OneToMany(() => Question, (question) => question.account)
  questions: Question[];
}
