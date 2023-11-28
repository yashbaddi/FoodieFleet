CREATE TABLE
  Users (
    ID VARCHAR DEFAULT CAST(uuid_generate_v4 () as VARCHAR) PRIMARY KEY,
    Name VARCHAR NOT NULL,
    Phone VARCHAR NOT NULL,
    Email VARCHAR NOT NULL
  );

CREATE TABLE
  Sessions (
    ID UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    User_ID VARCHAR REFERENCES Users (ID) ON DELETE CASCADE
  );

CREATE TABLE
  Address (
    ID UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    Address VARCHAR,
    Latitude NUMERIC(10, 7) NOT NULL,
    Longitude NUMERIC(10, 7) NOT NULL
  );

CREATE TABLE
  Restaurants (
    ID UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    Name VARCHAR NOT NULL,
    Description VARCHAR,
    Pictures VARCHAR,
    timings JSONB,
    is_open BOOLEAN DEFAULT FALSE,
    owner_id VARCHAR REFERENCES Users (ID)
  );

CREATE TABLE
  Items (
    ID UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    Name VARCHAR NOT NULL,
    Is_Vegetarian BOOLEAN DEFAULT FALSE NOT NULL,
    Description VARCHAR,
    Price NUMERIC(10, 2),
    Restaurant_ID UUID REFERENCES Restaurants (ID) ON UPDATE CASCADE ON DELETE CASCAODE
  );

CREATE TABLE
  Cart_Items (
    User_ID VARCHAR REFERENCES Users (ID) ON DELETE CASCADE,
    Item_ID UUID REFERENCES Items (ID) ON DELETE CASCADE,
    Quantity NUMERIC DEFAULT 1,
    PRIMARY KEY (User_ID, Item_ID)
  );

CREATE TABLE
  Orders (
    ID UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    Status VARCHAR DEFAULT 'PLACED',
    Created_at TIMESTAMP DEFAULT Current_timestamp(2),
    Total_amt NUMERIC DEFAULT 0,
    Delivered_Time TIMESTAMP,
    Customer_ID VARCHAR REFERENCES Users (ID) ON DELETE CASCADE,
    Restaurant_ID UUID REFERENCES Restaurants (ID) ON UPDATE CASCADE ON DELETE CASCADE
  );

CREATE TABLE
  Ordered_Items (
    Order_ID UUID REFERENCES Orders (ID) ON DELETE CASCADE,
    Item_ID UUID REFERENCES Items (ID) ON DELETE CASCADE,
    Quantity NUMERIC DEFAULT 1,
    PRIMARY KEY (Order_ID, Item_ID)
  );

-- CREATE TABLE Auth_Tokens(
--   User_ID VARCHAR REFERENCES Users(ID) ON DELETE CASCADE,
--   Access_Token VARCHAR,
--   Refresh_Token VARCHAR,
--   Access_Token_Expires TIMESTAMP,
--   Refresh_Token_Expires TIMESTAMP,
--   PRIMARY KEY (User_ID)
-- );
-- SELECT (orders.id,orders.status,orders.Created_at,orders.delivered_time,orders.Customer_ID,orders.Customer_ID,orders.Restaurant_ID,) FROM ordered_items 
-- JOIN orders ON ordered_items.order_id = orders.id
-- JOIN Items ON ordered_items.Item_ID= items.id
-- CREATE TABLE "Ratings" (
--   "ID" <type>,
--   "Rating" <type>,
--   "Review" <type>,
--   "Order_ID" <type>,
--   PRIMARY KEY ("ID"),
--   CONSTRAINT "FK_Ratings.Order_ID"
--     FOREIGN KEY ("Order_ID")
--       REFERENCES "Orders"("ID")
-- );
CREATE TABLE
  "Drivers" (
    User_Id VARCHAR REFERENCES Users (ID) ON DELETE CASCADE,
    status VARCHAR(255) DEFAULT 'BUSY'
  );