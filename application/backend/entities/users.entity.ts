import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BaseEntity} from "typeorm"
import { IsDefined, IsEmail, IsString } from "class-validator"

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique:true, nullable:false})
    @IsEmail()
    @IsDefined()
    email: string

    @Column({nullable:false})
    @IsDefined()
    @IsString()
    password: string

    @CreateDateColumn()
    created: Date
}