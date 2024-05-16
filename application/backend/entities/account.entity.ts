import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Question } from "./question.entity";
import { IsDefined, IsString } from "class-validator";
import { ClassSchedule } from "./classschedule.entity";
import { Rating } from "./rating.entity";
import { Match } from "./match.entity";

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

  @Column({ default: "" })
  profile_picture: string;

  @OneToOne(() => User)
  @JoinColumn()
  user_FK: User;

  @OneToMany(() => Question, (question) => question.account, {
    cascade: true,
    onDelete: "CASCADE",
  })
  questions: Question[];

  @OneToMany(() => Rating, (rating) => rating.account, {
    cascade: true,
    onDelete: "CASCADE",
  })
  ratings: Rating[];

  @OneToMany(() => Match, (match) => match.userOne, {
    cascade: true,
    onDelete: "CASCADE",
  })
  matchesAsUserOne: Match[];

  @OneToMany(() => Match, (match) => match.userTwo, {
    cascade: true,
    onDelete: "CASCADE",
  })
  matchesAsUserTwo: Match[];

  @OneToMany(() => ClassSchedule, (classSchedule) => classSchedule.account, {
    cascade: true,
    onDelete: "CASCADE",
  })
  classSchedule: ClassSchedule[];

  @Column("smallint", { default: 0 })
  weekavailability: number;

  @Column({ default: 0 })
  educator: boolean;

  @Column({ default: 0 })
  introvert: boolean;

  @Column({ default: 0 })
  isHidden: boolean;

  @Column("varchar", { length: 500, default: "" })
  biography: string;
}
