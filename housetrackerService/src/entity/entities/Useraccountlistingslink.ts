import {Column, Entity, Index, JoinColumn, ManyToOne, BaseEntity, Relation} from "typeorm";
import { Listing } from "./index";
import { Useraccount } from "./index";

@Index("useraccountlistingslink_pkey", ["listingid", "useraccountid"], {
  unique: true,
})
@Entity("useraccountlistingslink", { schema: "public" })
export class Useraccountlistingslink extends BaseEntity {
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
  listing: Relation<Listing>;

  @ManyToOne(
    () => Useraccount,
    (useraccount) => useraccount.useraccountlistingslinks,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "useraccountid", referencedColumnName: "id" }])
  useraccount: Relation<Useraccount>;
}
