import { Link } from "react-router-dom";
import { orderID } from "../Data/sampleData.js";

export default function Navigation() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light navigation">
        <Link to="/">
          <a className="navbar-brand navigation__header">Foodie Fleet</a>
        </Link>

        <ul className="navbar-nav">
          <li className="nav-item dropdown navigation__item--address">
            Address
          </li>
          <Link to={"/orders/"}>
            <li className="nav-item navigation__item--cart">Cart</li>
          </Link>
        </ul>
      </nav>
    </>
  );
}
