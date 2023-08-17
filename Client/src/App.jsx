import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import { store } from "./store";

import Home from "./pages/Home/Home";
import Restaurant from "./pages/Restaurant/Restaurant";
import Order from "./pages/Order/Order";
import Navigation from "./components/navigation";

function App() {
  return (
    <>
      <Navigation />
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/orders" element={<Order />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
