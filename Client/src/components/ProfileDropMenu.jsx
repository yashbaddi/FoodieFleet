import React from "react";

export default function ProfileDropMenu() {
  return (
    <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-52">
      <ul>
        <li className="hover:bg-orange-500">Orders</li>
        <li className="hover:bg-orange-500">Driver Dashboard</li>
        <li className="hover:bg-orange-500">Restaurant Dashboard</li>
        <li className="hover:bg-orange-500">Sign Out</li>
      </ul>
    </div>
  );
}
