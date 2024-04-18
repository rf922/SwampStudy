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

  @OneToMany(() => Question, (question) => question.account, {
    cascade: true,
    onDelete: "CASCADE",
  })
  questions: Question[];

  @Column()
  monday: boolean;

  @Column()
  tuesday: boolean;

  @Column()
  wednesday: boolean;

  @Column()
  thursday: boolean;

  @Column()
  friday: boolean;

  @Column()
  saturday: boolean;

  @Column()
  sunday: boolean;

  @Column()
  educator: boolean;

  @Column()
  introvert: boolean;

  @Column("varchar", { length: 500 })
  biography;
}
