import { ISession } from "connect-typeorm";
import {
  Column,
  Entity,
  Index,
  PrimaryColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity()
export class Session implements ISession {
  @PrimaryColumn("varchar", { length: 255 })
  public id: string = "";

  @Index()
  @Column("bigint", {
    name: "expiredAt",
    transformer: {
      to: (val: Date) => (val instanceof Date ? val.getTime() : val),
      from: (val: number) => new Date(val),
    },
  })
  public expiredAt: number = Date.now();

  @Column("text")
  public json: string = "";

  @DeleteDateColumn({ name: "destroyedAt", nullable: true })
  public destroyedAt?: Date;
}
