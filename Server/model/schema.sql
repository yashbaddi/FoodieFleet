CREATE TABLE Users (
  ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY ,
  Password VARCHAR NOT NULL,
  Name VARCHAR NOT NULL,
  Phone VARCHAR NOT NULL,
  Email VARCHAR NOT NULL,
);

CREATE TABLE Address(
  ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  Address VARCHAR,
  Latitude NUMERIC(10, 7) NOT NULL,
  Logitude NUMERIC(10, 7) NOT NULL,
);

CREATE TABLE Restaurants (
  ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  Name VARCHAR NOT NULL,
  Description VARCHAR,
  Pictures VARCHAR,
  timings JSONB,
  is_open BOOLEAN DEFAULT FALSE,
  address_id UUID  REFERENCES Address(ID),
  owner_id UUID  REFERENCES Users(ID)
);

CREATE TABLE Items (
  ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  Name VARCHAR NOT NULL,
  is_vegitarian BOOLEAN DEFAULT FALSE NOT NULL,
  Description VARCHAR,
  Price NUMERIC(10,2),
  Restaurant_ID UUID REFERENCES Restaurants(ID),
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
