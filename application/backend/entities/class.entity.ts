import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { IsDefined, IsInt, IsString } from "class-validator";

@Entity()
export class Class extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsDefined()
  @IsString()
  name: string

  @Column()
  @IsDefined()
  @IsInt()
  number: number

  @Column()
  @IsDefined()
  @IsString()
  department: string
}
