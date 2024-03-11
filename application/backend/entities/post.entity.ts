import {Entity, PrimaryGeneratedColumn, Column, ManyToOne,} from 'typeorm';
import { Thread } from './thread.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    content: string;

    @ManyToOne(() => Thread, (thread) => thread.posts)
    thread: Thread;
}
