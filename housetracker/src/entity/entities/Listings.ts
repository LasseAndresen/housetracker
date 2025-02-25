import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Userslistingslinks } from "./Userslistingslinks";

@Index("listings_pkey", ["id"], { unique: true })
@Entity("listings", { schema: "public" })
export class Listings {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "externalid", length: 255 })
  externalid: string;

  @Column("text", { name: "title" })
  title: string;

  @Column("text", { name: "description" })
  description: string;

  @Column("integer", { name: "pricedkk" })
  pricedkk: number;

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
    () => Userslistingslinks,
    (userslistingslinks) => userslistingslinks.listing
  )
  userslistingslinks: Userslistingslinks[];
}
