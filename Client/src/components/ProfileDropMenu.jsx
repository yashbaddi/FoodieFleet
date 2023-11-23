import React from "react";
import { Link } from "react-router-dom";

export default function ProfileDropMenu() {
  return (
    <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-52">
      <ul>
        <li className="hover:bg-orange-500">
          <Link
            to={"/orders/"}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <p className="no-underline text-black">Orders</p>
          </Link>
        </li>
        <li className="hover:bg-orange-500">
          <li className="hover:bg-orange-500">
            <Link
              to={"/my-account/delivery-partner"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <p className="no-underline text-black">Driver's Dashboard</p>
            </Link>
          </li>
        </li>
        <li className="hover:bg-orange-500">
          <li className="hover:bg-orange-500">
            <Link
              to={"/my-account/restaurant-admin"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <p className="no-underline text-black">Restaurant Dashboard</p>
            </Link>
          </li>
        </li>
        <li className="hover:bg-orange-500">
          <li className="hover:bg-orange-500">
            <Link
              to={"/orders/"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <p className="no-underline text-black">Sign Out</p>
            </Link>
          </li>
        </li>
      </ul>
    </div>
  );
}
