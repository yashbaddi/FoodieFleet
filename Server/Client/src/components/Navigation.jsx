import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import { FaRegUser } from "react-icons/fa6";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoLocation } from "react-icons/io5";
import { RiShoppingCart2Fill } from "react-icons/ri";
import ProfileDropMenu from "./ProfileDropMenu.jsx";
import { useState } from "react";
export default function Navigation() {
  const [isProfileDropDownOpen, setProfileDropdownOpen] = useState(false);

  function toggleProfileDropdown() {
    setProfileDropdownOpen((isProfileDropDownOpen) => !isProfileDropDownOpen);
  }

  return (
    <div className="flex flex-col">
      <nav className="bg-white flex items-center justify-between p-6">
        <div className="flex basis-1/2">
          <Link to="/">
            <a className="border-red-200 h-1">
              <Logo />
            </a>
          </Link>
          <IoLocation />
          <a className=" text-orange-400 no-underline">Address</a>
        </div>

        <div className="flex justify-center items-center p-10 basis-1/4 gap-4">
          <div className="flex items-baseline text-gray-700 hover:text-orange-400">
            <BiSearchAlt2 />
            <p className="no-underline ">Search</p>
          </div>

          <Link
            to={"/cart/"}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <div className="flex items-baseline no-underline text-gray-700 hover:text-orange-400">
              <RiShoppingCart2Fill />
              <p className="no-underline ">Cart</p>
            </div>
          </Link>
          <div
            className="flex items-baseline no-underline text-gray-700 hover:text-orange-400"
            onClick={toggleProfileDropdown}
          >
            <FaRegUser />
            <p className="no-underline ">Profile</p>
            {isProfileDropDownOpen && (
              <ProfileDropMenu toggleHide={toggleProfileDropdown} />
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

{
  /* <div className="flex items-baseline">
<FaRegUser />
<button onClick={toggleProfileDropdown}>Profile</button> */
}
