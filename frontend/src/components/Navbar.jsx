import React from "react";
import { Link } from "react-router-dom";
import profile from "../images/profile.jpg";
import { useAuthStore } from "../store/authStore";
import logo from "../images/logo.svg";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <div className="navbar-center px-10 py-3 fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <nav className="flex items-center">
          <div className="font-bold text-xl text-black fontFamily-lexend">
            <img src={logo} alt="logo" className="h-7"/>
          </div>

          <div className="flex-1 flex justify-end">
            <ul className="menu menu-horizontal bg-base-100 rounded-box fontFamily-lexend font-weight-regular">
              <li>
                <Link to="/">Discover</Link>
              </li>
              <li>
                <button className="">
                  <Link to="/">Create</Link>
                </button>
              </li>
            </ul>
          </div>

          <Link to="/saved">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            class="size-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>
          </Link>
         
            

          
          <div className="dropdown dropdown-end relative">
            <div className="flex items-center">
              <p className="mr-2 ml-4 font-semibold">{user.username}</p>
              <img
                src={profile}
                alt="Profile"
                className="w-10 h-10 rounded-full overflow-hidden object-cover mr-3"
              />
              <div className="flex items-center cursor-pointer" tabIndex="0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </div>
            <ul
              tabIndex="0"
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 absolute right-0 top-full mt-8 z-50"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
              <li onClick={handleLogout}>
                <Link to="/auth/login">Log out</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
