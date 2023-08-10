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
  Longitude NUMERIC(10, 7) NOT NULL,
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
  Restaurant_ID UUID REFERENCES Restaurants(ID) ON update cascade,
);

CREATE TABLE Orders (
  ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  Status VARCHAR DEFAULT 'in_cart',
  Created_at TIMESTAMP DEFAULT Current_timestamp(2),
  Total_amt NUMERIC DEFAULT 0,
  Delivered_Time TIMESTAMP,
  Customer_ID UUID REFERENCES Users(ID),
  Restaurant_ID UUID REFERENCES Restaurants(ID),
);

CREATE TABLE Ordered_Items (
  Order_ID UUID REFERENCES Orders(ID),
  Item_ID UUID REFERENCES Items(ID),
  Quantity NUMERIC DEFAULT 1,
  PRIMARY KEY (Order_ID, Item_ID)
);

SELECT (orders.id,orders.status,orders.Created_at,orders.delivered_time,orders.Customer_ID,orders.Customer_ID,orders.Restaurant_ID,) FROM ordered_items 
JOIN orders ON ordered_items.order_id = orders.id
JOIN Items ON ordered_items.Item_ID= items.id


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


