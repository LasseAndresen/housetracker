import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Listings } from "./Listings";
import { Users } from "./Users";

@Index("userslistingslinks_pkey", ["listingid", "userid"], { unique: true })
@Entity("userslistingslinks", { schema: "public" })
export class Userslistingslinks {
  @Column("integer", { primary: true, name: "userid" })
  userid: number;

  @Column("integer", { primary: true, name: "listingid" })
  listingid: number;

  @Column("timestamp without time zone", {
    name: "dateadded",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  dateadded: Date | null;

  @ManyToOne(() => Listings, (listings) => listings.userslistingslinks, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "listingid", referencedColumnName: "id" }])
  listing: Listings;

  @ManyToOne(() => Users, (users) => users.userslistingslinks, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "userid", referencedColumnName: "id" }])
  user: Users;
}
