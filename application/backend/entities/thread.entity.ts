import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany,} from 'typeorm';
import { Forum } from './forum.entity';
import { Post } from './post.entity';

@Entity()
export class Thread {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => Forum, (forum) => forum.threads)
    forum: Forum;

    @OneToMany(() => Post, (post) => post.thread)
    posts: Post[];
}
