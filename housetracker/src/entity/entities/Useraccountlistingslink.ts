import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Listing } from "./Listing";
import { Useraccount } from "./Useraccount";

@Index("useraccountlistingslink_pkey", ["listingid", "useraccountid"], {
  unique: true,
})
@Entity("useraccountlistingslink", { schema: "public" })
export class Useraccountlistingslink {
  @Column("integer", { primary: true, name: "useraccountid" })
  useraccountid: number;

  @Column("integer", { primary: true, name: "listingid" })
  listingid: number;

  @Column("timestamp without time zone", {
    name: "dateadded",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  dateadded: Date | null;

  @ManyToOne(() => Listing, (listing) => listing.useraccountlistingslinks, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "listingid", referencedColumnName: "id" }])
  listing: Listing;

  @ManyToOne(
    () => Useraccount,
    (useraccount) => useraccount.useraccountlistingslinks,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "useraccountid", referencedColumnName: "id" }])
  useraccount: Useraccount;
}
