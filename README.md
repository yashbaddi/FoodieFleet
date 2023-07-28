# FoodieFleet

A Food Delivery Application

## 1. Business Description

**Web Application Goals**

Our website will be the primary touchpoint for customers, restaurant partners, and delivery drivers. This will be the center part of our product and it will have 3 primary goals

1. Ordering Food
2. Tracking Delivery
3. Managing Customers, Restaurants and Delivery Drivers

To Meet These Objectives we have following criteria

- Proper and intuitive UI for the users
- Frontend Application with 3 diffrent interfaces

  1. Customer Interface
  2. Restaurant Interface
  3. Delivery Driver Interface

1. _Customer Interface_ Should have the following functionalities

- List of Restaurants
- Seperate Page for each restaurant
- Menu in Each restaurant page
- Option to order food on Click
- Totaling the order price
- Placing the order
- Tracking the delivery driver on map

2. _Restaurant Interface_ Should have the following Functionalities

- Page to confirm the orders with displaying the order details
- option to notify if the order is done

3. _Delivery Driver Interface_ should have the following functionalities

- Page to get the display an order
- Delivery Direction on Map
- Confrimation button once delivered
- option to tell that the driver is open to deliver

## 2. Data Modeling:

## 3. API Contracts:

### Users

`createUser:`\
POST /users

Creates a user with the following params

Parameters:

- username: Choosen username by the user
- password: Choosen password by the user
- name: User's name
- phone: User's phone number
- email: User's email

Return:

- Returns a object that has user details

---

`getUser:`\
GET /users/:id'

gets a username details

Path Parameters:

- id : Username

Return:

- An Object that contains the user details like name,phone,email in key value pair

---

`updateUser:`\
PUT /users/:id

update a user

Path Parameters:

- id :Username

Parameters:

- updateData:An Object that contains updated details of user like name,phone,email also password

Return:

- returns a object that would contain the updated result

---

`deleteUser:`\
DELETE /users/:id
delete a user

Path Parameters:

- id :Username

Return:

- a boolean true if deleted successfully

---

### Orders

`createOrder`
POST /orders

Parameters:

- UserID: User ID
- resaurantID: Restaurant ID
- cusines: Object with all the cusines

Return:

- All the details of that order with total amt and orderID

`getCurrentOrder:`
GET /orders/current

get the current order details

Query Parameters:

- user-id:to get current order of user id
- restaurant-id:to get the current orders of restaurant-id filter
- driver-id:to get current orders of driver-id filter

Return:

- returns a list of orders and details as a object based on filters

---

`getOrders:`\
GET /orders

Read all orders

Query Parameters:

- user-id:to get orders of user id
- restaurant-id:to get the orders of restaurant-id filter
- driver-id:to get orders of driver-id filter

Optional Path Param:

Return:

- returns a object with the details of all the previous orders of the user

`getOrder:`
GET /orders/:id

To get order based on id

path Parameters:

- id:Order Id

Return:

- All the details of that order with total amt and orderID

---

---

### Driver Executive

`createDeliveryExecutive:`\
POST /driver
Creates a delivery executive with a given existing username

Parameters:

- id:User Name

Return:

- return true if sucessfully created a delivery partner with that specified username

---

`getDeliveryExecutive:`\
GET /driver/:id
get delivery executive details

Path Parameters:

- id:Driver ID

Return:

- An Object with all the details of delivery executitive including user details

---

`updateDriverLocation:`\
PUT /driver/:id/location
Updates the driver's current location

Path Parameters:

- id:Driver ID

Parameters:

- Latitude:Latitude of the driver
- Logitude:Logitude of the driver

Return:

- Returns an object with latitude and logitude of the location of the driver

---

`getDriverCurrentLocation:`\
GET /driver/:id/location

gets the drivers current location

Path Parameters:

- id:Driver ID

Return:

- Returns an object with latitude and logitude of the location of the driver

---

`updateDriverStatus:`\
PUT /driver/:id/status

Updates the driver status like is he/she is available to take orders

Path Parameters:

- id:Driver ID

Parameters:

- status: The current status of the driver like are they available,unavailable,busy

Return:

- Returns boolean true as a confirmation

---

`getDriverStatus:`\
PUT /driver/:id/status

gets the current status of the driver

Path Parameters:

- id:Driver ID

Return:

- Returns the current status of the driver like available,unavailable,busy

---

`deleteDelivery:`\
DELETE /driver/:id
Deletes the specified user as a delivery execitive

Path Parameters:

- id:Driver ID

Return:

- Returns a confirmation boolean true if deleted successfully

---

---

### Restaurant

`createRestaurant:`\
POST /restaurant

Creates a new Restaurant associated with the specified username

Parameters:

- username: User ID of the user that wants to create a resaurant
- restaurantName:The specified Restaurant name
- Address: The Address of that Restaurant
- description: The description of that resaurant

Return:

- Restaurant Details as object with restaurantID

---

`getRestaurant:`\
GET /restaurant/:id
Gets the resaurant Details

Path Parameters:

- id: Restaurant ID

Return:

- Restaurant Details as object

---

`getAllRestaurants:`\
GET /restaurant
Gets all the restaurants owened by the user

Return:

- Details all the restaurants owened by the user in an object

---

`updateRestaurant:`\
PUT /restaurant/:id
Update the resaurant Details

Path Parameters:

- id: Restaurant ID

Parameters:

- username: User ID of the user that wants to create a resaurant
- restaurantName:The specified Restaurant name
- Address: The Address of that Restaurant
- description: The description of that resaurant

Return:

- The updated Restaurant Details

---

`deleteRestaurant:`\
DELETE /restaurant/:id
Delete the resaurant

Path Parameters:

- id: Restaurant ID

Return:

- A boolean that returns true as a delete confirmation

---

`createCusine:`\
POST /restaurant/:restaurantID/cusine/
Create a cusine for a specific Restaurant

Path Parameters:

- restaurantID: Restaurant id that wants to add the cusine

Parameters:
cusineObject:Details of that cusine in an object ///Need Edit

Return:

- Details of that cusine in a object with cusineID

---

`getCusine:`\
GET /cusine/:cusineID
Read a perticualar cusine in a object with cusineID and restaurant id

Path Parameters:

- cusineID:CusineID of the cusine

Return:

- Returns a details of that cusine in Object

---

`getCusinesList:`\
GET /restaurant/:restauantID/cusine
Read a list of cusine that exists in the cusine list

Path Parameters:

- restaurantID:ID of that restaurant

Return:

- Details of all the cusines that the restaurant has

---

`updateCusine:`\
PUT /restaurant/:restauantID/cusine/:cusineID

Update a perticular cusine

Path Parameters:

- restaurantID:ID of that restaurant
- cusineID:id of that cusine

Parameters:

- updateData:updated data for that cusine ///Need

Return:

- Return a object with updated cusine details

---

`deleteCusine:`\
DELETE /restaurant/:restauantID/cusine/:cusineID

Delete a cusine

Path Parameters:

- restaurantID:ID of that restaurant
- cusineID:id of that cusine

Return:

- A boolean that returns true as a delete confirmation

---

---

### Session

`createSession:`
POST /session

Parameters:

- username:User Name
- password:Password

Return:

- Session Cookie with sessionID and username

`getSession:`
GET /session

Parameters:(Session Cookie)

Return:

- Validate Session

`deleteSession:`
DELETE /session

Parameters:(Session Cookie)

Return:

- Delete cooike in the frontend and Database'

## 4. Project Plan:

#### Zeroth Week:

- [x] Create a Data Model based on Desc.
- [x] Create api contracts for the same.
- [x] Build a project Plan.

#### First Week:

- [ ] Create Login Page.
- [ ] Create a SignUp Page.
- [ ] Restaurants CRUD incl. Frontend
- [ ] Adding Dummy cusines
- [ ] Adding a basic map

#### Second Week:

- [ ] Delivery Executive CRUD incl. Frontend
- [ ] Understanding and modifying the Map based on Needs
- [ ] Tracking Delivery Executive

#### Third Week:

- [ ] Cusines CRUD incl. Frontend
- [ ] Calculating Delivery time and route
- [ ] Calculating Total time
- [ ] Adding Support for Images
- [ ] Adding Reviews and Ratings

#### Fourth Week:

- [ ] Refining The App.
- [ ] Exprimenting and adding different features
