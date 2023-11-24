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
    setProfileDropdownOpen(!isProfileDropDownOpen);
  }
  return (
    <>
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
          <div className="flex items-baseline">
            <BiSearchAlt2 />
            <p className="inline">Search</p>
          </div>

          <div className="flex items-baseline no-underline">
            <RiShoppingCart2Fill />
            <Link
              to={"/cart/"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <p className="no-underline text-black">Cart</p>
            </Link>
          </div>
          <div className="flex items-baseline">
            <FaRegUser />
            <button onClick={toggleProfileDropdown} className="inline">
              Profile
            </button>
          </div>
        </div>
      </nav>
      {isProfileDropDownOpen && <ProfileDropMenu />}
    </>
  );
}
