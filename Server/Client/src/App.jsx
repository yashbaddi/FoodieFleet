import { Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store";

import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import Navigation from "./components/Navigation";
import Cart from "./pages/Cart";
import TrackOrder from "./pages/TrackOrder";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import NewRestaurant from "./pages/NewRestaurant";
// import UpdateRestaurant from "./components/UpdateRestaurant";
import EditRestaurant from "./pages/EditRestaurant";
import MyAccount from "./pages/MyAccount";
import DriversDashboard from "./pages/DriversDashboard";
import RestaurantsByUser from "./pages/RestaurantsByUser";
import RestaurantOrders from "./pages/RestaurantOrders";
import Orders from "./pages/Orders";
import RestaurantUpdate from "./pages/RestaurantUpdate";
import CreateItem from "./pages/CreateItem";
// import NewRestaurant from "./components/NewRestaurant";
// import UpdateRestaurant from "./components/UpdateRestaurant";
// import CreateItem from "./pages/Restaurant/CreateItem";
// import UpdateItem from "./components/UpdateItem";

function App() {
  return (
    <>
      <Provider store={store}>
        {location.pathname !== "/login" && <Navigation />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/track-order/:orderID" element={<TrackOrder />} />
          <Route path="/my-account" element={<MyAccount />}>
            <Route
              path="/my-account/restaurant-admin"
              element={<RestaurantDashboard />}
            />
            <Route
              path="/my-account/restaurant-admin/orders"
              element={<RestaurantOrders />}
            />
            <Route
              path="/my-account/restaurant-admin/restaurants"
              element={<RestaurantsByUser />}
            />
            <Route
              path="/my-account/restaurant-admin/new-restaurant"
              element={<NewRestaurant />}
            />
            <Route
              path="/my-account/restaurant-admin/restaurants/:id"
              element={<RestaurantUpdate />}
            />
            <Route
              path="/my-account/restaurant-admin/restaurants/:id/update"
              element={<EditRestaurant />}
            />
            <Route
              path="/my-account/restaurant-admin/restaurants/:id/items/new"
              element={<CreateItem />}
            />
            <Route
              path="/my-account/delivery-partner"
              element={<DriversDashboard />}
            />
          </Route>
        </Routes>
      </Provider>
    </>
  );
}

export default App;
