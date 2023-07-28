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
- Three different Frontend Application

  1. Customer Application
  2. Restaurant Application
  3. Delivery Driver Application

1. _Customer Application_ Should have the following functionalities

- List of Restaurants
- Seperate Page for each restaurant
- Menu in Each restaurant page
- Option to order food on Click
- Totaling the order price
- Placing the order
- Tracking the delivery driver on map

2. _Restaurant Application_ Should have the following Functionalities

- Page to confirm the orders with displaying the order details
- option to notify if the order is done

3. _Delivery Driver Application_ should have the following functionalities

- Page to get the display an order
- Delivery Direction on Map
- Confrimation button once delivered
- option to tell that the driver is open to deliver

## 2. Data Modeling:

## 3. API Contracts:

### Users

`isUserNameExists(username):`\
Checks weather the username already exists or not,mainly will be used during sign up

Parameters:

- username:Enter the username

Return:

- Returns a boolean true if it exists false if it doesn't

`createUser(username,password,name,phone,email):`\
Creates a user with the following params

Parameters:

- username: Choosen username by the user
- password: Choosen password by the user
- name: User's name
- phone: User's phone number
- email: User's email

Return:

- Returns a boolean true if the user is generated

`getUser(username):`\
gets a username details

Parameters:

- username: Username

Return:

- An Object that contains the user details like name,phone,email in key value pair

`updateUser(username,updateData):`\
update a user

Parameters:

- username:Username
- updateData:An Object that contains updated details of user like name,phone,email also password

Return:

- returns a object that would contain the updated result

`deleteUser(username):`\
delete a user

Parameters:

- username:Username

Return:

- a boolean true if deleted successfully

`getOrderDetails(username):`\
get the current order details of the user

Parameters:

- username:Username

Return:

- returns a list of cusines with other order details as a object

`getPreviousOrders(username):`\
Read all the previous orders of that user

Parameters:

- username:Username

Return:

- returns a object with the details of all the previous orders of the user

#### Driver Executive

`createDeliveryExecutive(username):`\
Creates a delivery executive with a given existing username

Parameters:

- username:Username

Return:

- return true if sucessfully created a delivery partner with that specified username

`getDeliveryExecutive(username):`\
get delivery executive details

Parameters:

- username:Username

Return:

- An Object with all the details of delivery executitive including user details

`updateDriverLocation(username,latitude,logitude):`\
Updates the driver's current location

Parameters:

- username:Username
- Latitude:Latitude of the driver
- Logitude:Logitude of the driver

Return:

- Returns an object with latitude and logitude of the location of the driver

`getDriverCurrentLocation(username):`\
gets the drivers current location

Parameters:

- username:Username

Return:

- Returns an object with latitude and logitude of the location of the driver

`updateDriverStatus(username,status):`\
Updates the driver status like is he/she is available to take orders

Parameters:

- username:Username
- status: The current status of the driver like are they available,unavailable,busy

Return:

- Returns boolean true as a confirmation

`getDriverStatus(username):`\
gets the current status of the driver

Parameters:

- username:Username

Return:

- Returns the current status of the driver like available,unavailable,busy

`getCurrentOrder(username):`\
Get the current order details that the driver is delivering

Parameters:

- username:Username

Return:

- the object tha contains the current order detatils

`deleteDeliveryExecutive(username):`\
Deletes the specified user as a delivery execitive

Parameters:

- username:Username

Return:

- Returns a confirmation boolean true if deleted successfully

#### Restaurant

`createRestaurant(username,restaurantName,address,description):`\
Creates a new Restaurant associated with the specified username

Parameters:

- username: User ID of the user that wants to create a resaurant
- restaurantName:The specified Restaurant name
- Address: The Address of that Restaurant
- description: The description of that resaurant

Return:

- Restaurant Details as object with restaurantID

`getRestaurant(restaurantID):`\
Gets the resaurant Details

Parameters:

- restaurantID: RestaurantID of that restaurant

Return:

- Restaurant Details as object

`getAllRestaurants(username):`\
Gets all the restaurants owened by the user

Parameters:

- username:username of the user

Return:

- Details all the restaurants owened by the user in an object

`updateRestaurant(restaurantID,updateData):`\
Update the resaurant Details

Parameters:

- restaurantID: RestaurantID of that restaurant

Return:

- The updated Restaurant Details

`deleteRestaurant(resaurantID):`\
Delete the resaurant

Parameters:

- restaurantID: RestaurantID of that restaurant

Return:

- A boolean that returns true as a delete confirmation

`getAllOrdersRestaurant(restaurantID):`\
Get all the orders in the restaurant

Parameters:

- restaurantID: RestaurantID of that restaurant

Return:

- A object that returns a all the orders in the restaurant

`createCusine(resaurantID,cusineObject):`\
Create a cusine for a specific Restaurant

Parameters:
restaurantID:RestaurantID of a restaurant
cusineObject:Details of that cusine in an object

Return:

- Details of that cusine in a object with cusineID

`getCusine(cusineID):`\
Read a perticualar cusine in a object with cusineID

Parameters:

- cusineID:CusineID of the cusine

Return:

- Returns a details of that cusine in Object

`getCusinesList(resaurantID):`\
Read a list of cusine that exists in the cusine list

Parameters:

- restaurantID:ID of that restaurant

Return:

- Details of all the cusines that the restaurant has

`updateCusine(cusineID,updateData):`\
Update a perticular cusine

Parameters:

- cusineID:id of that cusine
- updateData:updated data for that cusine

Return:

- Return a object with updated cusine details

`deleteCusine(cusineID):`\
Delete a cusine

Parameters:

- cusineID: cusineID of that cusine

Return:

- A boolean that returns true as a delete confirmation

---

## 4. Project Plan:
