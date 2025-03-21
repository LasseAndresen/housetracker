import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  BaseEntity, Relation
} from "typeorm";
import { Useraccountlistingslink } from "./index";

@Index("useraccount_email_key", ["email"], { unique: true })
@Index("useraccount_pkey", ["id"], { unique: true })
@Entity("useraccount", { schema: "public" })
export class Useraccount extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "email", unique: true })
  email: string;

  @Column("text", { name: "passwordencrypted" })
  passwordencrypted: string;

  @Column("timestamp without time zone", {
    name: "dateadded",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  dateadded: Date | null;

  @Column("timestamp without time zone", { name: "lastlogin", nullable: true })
  lastlogin: Date | null;

  @Column("boolean", {
    name: "isactive",
    nullable: true,
    default: () => "true",
  })
  isactive: boolean | null;

  @Column("boolean", {
    name: "isadmin",
    nullable: true,
    default: () => "false",
  })
  isadmin: boolean | null;

  @OneToMany(
    () => Useraccountlistingslink,
    (useraccountlistingslink) => useraccountlistingslink.useraccount
  )
  useraccountlistingslinks: Relation<Useraccountlistingslink[]>;
}
