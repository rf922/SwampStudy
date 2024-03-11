import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany,} from "typeorm";
import { Class } from './class.entity';
import { Thread } from './thread.entity';

@Entity()
export class Forum {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Class, (classEntity) => classEntity.forums)
    class: Class;

    @OneToMany(() => Thread, (thread) => thread.forum)
    threads: Thread[];
}
