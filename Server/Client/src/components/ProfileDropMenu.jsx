import React from "react";
import { Link } from "react-router-dom";

export default function ProfileDropMenu({ toggleHide }) {
  const links = [
    { name: "Orders", link: "/orders/" },
    { name: "Delivery Partner", link: "/my-account/delivery-partner" },
    { name: "Restaurant Dashboard", link: "/my-account/restaurant-admin" },
    { name: "Sign Out", link: "/" },
  ];
  return (
    <div className="absolute top-28 right-10 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-52">
      <ul className="flex flex-col mx-2 my-0 p-0">
        {links.map((linkObject, index) => {
          return (
            <div key={index} onClick={toggleHide}>
              <Link
                to={linkObject.link}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <li className="hover:bg-orange-300 hover:rounded-full px-2 py-0.5 my-1">
                  <p className="no-underline text-black">{linkObject.name}</p>
                </li>
              </Link>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
