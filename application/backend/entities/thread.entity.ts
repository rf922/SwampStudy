import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany,
    ManyToOne,
  } from "typeorm";
  import { Class } from "./class.entity";
  import { Question } from "./questions.entity";
  import { Answer } from "./answer.entity";
  
  @Entity()
  export class Thread {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @ManyToOne(() => Class, {})
    @JoinColumn()
    class: Class;
  
    @OneToOne(() => Question, {})
    @JoinColumn()
    question: Question;
  
    @OneToMany(() => Answer, answer => answer.thread, {})
    answers: Answer[];
  }
  