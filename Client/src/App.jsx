import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import { store } from "./store";

import Home from "./pages/Home/Home";
import Restaurant from "./pages/Restaurant/Restaurant";
import Order from "./pages/Order/Order";
import Navigation from "./components/navigation";
import NewRestaurant from "./pages/YourRestaurants/NewRestaurant/NewRestaurant";
import UpdateRestaurant from "./pages/YourRestaurants/UpdateRestaurant/UpdateRestaurant";
import CreateItem from "./pages/Restaurant/createItem/createItem";
import UpdateItem from "./pages/Restaurant/updateItem/updateItem";

function App() {
  return (
    <>
      <Navigation />
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/new" element={<NewRestaurant />} />
          <Route path="/restaurant/:id/update" element={<UpdateRestaurant />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="restaurant/:id/item/new" element={<CreateItem />} />
          <Route
            path="restaurant/:id/item/:itemID/update"
            element={<UpdateItem />}
          />
          <Route path="/orders" element={<Order />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
