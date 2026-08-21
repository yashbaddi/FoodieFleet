import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/requests";

export default function ProfileDropMenu({ toggleHide }) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logoutUser();
    } catch (e) {
      console.error(e);
    }
    toggleHide();
    window.location.href = "/login";
  };

  const links = [
    { name: "Orders", link: "/orders/" },
    { name: "Delivery Partner", link: "/my-account/delivery-partner" },
    { name: "Restaurant Dashboard", link: "/my-account/restaurant-admin" },
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
        <div onClick={handleSignOut}>
          <li className="hover:bg-red-100 hover:rounded-full px-2 py-0.5 my-1 cursor-pointer">
            <p className="no-underline text-red-600 font-medium">Sign Out</p>
          </li>
        </div>
      </ul>
    </div>
  );
}
