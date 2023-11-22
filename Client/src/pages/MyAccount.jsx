import React from "react";
import AccountSideBar from "../components/AccountSideBar";
import { Outlet } from "react-router-dom";

function MyAccount() {
  return (
    <div>
      <AccountSideBar />
      <Outlet />
    </div>
  );
}

export default MyAccount;
