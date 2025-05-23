import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  BaseEntity, Relation
} from "typeorm";
import { Useraccountlistingslink } from "./index";

@Index("listing_pkey", ["id"], { unique: true })
@Entity("listing", { schema: "public" })
export class Listing extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "externalid", length: 255 })
  externalid: string;

  @Column("text", { name: "url" })
  url: string;

  @Column("text", { name: "title" })
  title: string;

  @Column("text", { name: "description" })
  description: string;

  @Column("text", { name: "pricedkk" })
  pricedkk: string;

  @Column("text", { name: "imageurl" })
  imageurl: string;

  @Column("text", { name: "location" })
  location: string;

  @Column("boolean", { name: "available", default: () => "true" })
  available: boolean;

  @Column("timestamp without time zone", {
    name: "dateadded",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  dateadded: Date | null;

  @OneToMany(
    () => Useraccountlistingslink,
    (useraccountlistingslink) => useraccountlistingslink.listing
  )
  useraccountlistingslinks: Relation<Useraccountlistingslink[]>;
}
