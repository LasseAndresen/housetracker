create table UserAccountListingsLink (
    UserAccountID INTEGER NOT NULL,
    ListingID INTEGER NOT NULL,
    DateAdded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    OriginalPriceDKK TEXT NOT NULL,
    PRIMARY KEY (UserAccountID, ListingID),
    FOREIGN KEY (UserAccountID) REFERENCES UserAccount(ID) ON DELETE CASCADE,
    FOREIGN KEY (ListingID) REFERENCES Listing(ID) ON DELETE CASCADE
)
