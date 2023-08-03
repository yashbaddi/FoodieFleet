CREATE TABLE Users (
  ID UUID PRIMARY KEY ,
  Password VARCHAR NOT NULL,
  Name VARCHAR NOT NULL,
  Phone VARCHAR NOT NULL,
  Email VARCHAR NOT NULL,
);

CREATE TABLE "Restaurants" (
  ID UUID PRIMARY KEY,
  Name VARCHAR NOT NULL,
  Description VARCHAR,
  Pictures VARCHAR,
  timings JSONB,
  is_open BOOLEAN,
  Address_ID REFERENCES Address(Address_ID)
);

CREATE TABLE "Orders" (
  "ID" <type>,
  "Status" <type>,
  "Created_at" <type>,
  "Total_amt" <type>,
  "Delivered_Time" <type>,
  "Customer_ID" <type>,
  "Driver_ID" <type>,
  "Address_ID" <type>,
  PRIMARY KEY ("ID")
);

CREATE TABLE "Ratings" (
  "ID" <type>,
  "Rating" <type>,
  "Review" <type>,
  "Order_ID" <type>,
  PRIMARY KEY ("ID"),
  CONSTRAINT "FK_Ratings.Order_ID"
    FOREIGN KEY ("Order_ID")
      REFERENCES "Orders"("ID")
);

CREATE TABLE "Drivers" (
  "ID" <type>,
  "isAvailable" <type>,
  PRIMARY KEY ("ID")
);


CREATE TABLE "Address" (
  "ID" <type>,
  "Address" <type>,
  "Latitude" <type>,
  "Logitude" <type>,
  "Customer_ID" <type>,
  PRIMARY KEY ("ID"),
  CONSTRAINT "FK_Address.Customer_ID"
    FOREIGN KEY ("Customer_ID")
      REFERENCES "Users"("ID")
);

CREATE TABLE "Sessions" (
  "ID" <type>,
  "User_ID" <type>,
  PRIMARY KEY ("ID"),
  CONSTRAINT "FK_Sessions.User_ID"
    FOREIGN KEY ("User_ID")
      REFERENCES "Users"("ID")
);

CREATE TABLE "Ordered_Items" (
  "Order_ID" <type>,
  "Item_ID" <type>,
  "Quantity" <type>,
  PRIMARY KEY ("Order_ID", "Item_ID")
);