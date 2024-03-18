import { ISession } from "connect-typeorm/out";
import {
  Column,
  Entity,
  Index,
  PrimaryColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity()
export class Session implements ISession {
  @Index()
  @Column("bigint", {
    name: "expiredAt",
    transformer: {
      to: (val: Date) => (val instanceof Date ? val.getTime() : val),
      from: (val: number) => new Date(val),
    },
  })
  public expiredAt: number = Date.now();

  @PrimaryColumn("varchar", { length: 255 })
  public id: string = "";

  @Column("text")
  public json: string = "";

  @DeleteDateColumn({ name: "deletedAt", nullable: true })
  public deletedAt?: Date;
}
