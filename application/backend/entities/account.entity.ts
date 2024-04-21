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

  @Column("smallint", { default: 0 })
  weekavailability: number;

  @Column({ default: 0 })
  educator: boolean;

  @Column({ default: 0 })
  introvert: boolean;

  @Column("varchar", { length: 500, default: "" })
  biography: string;

  @OneToMany(() => ClassSchedule, (classSchedule) => classSchedule.account)
  classSchedules: ClassSchedule[];
}
