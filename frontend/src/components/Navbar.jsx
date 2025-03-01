import React, { useRef } from "react";
import { Link } from "react-router-dom";
import profile from "../images/profile.jpg";
import { useAuthStore } from "../store/authStore";
import logo from "../images/logo.svg";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const createClusterModalRef = useRef(null);
  const handleLogout = () => {
    logout();
  };
  
  return (
    <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 right-0 px-4 z-50">
    
      <div className="navbar-start">
        <Link to="/" className="font-bold text-xl text-black font-lexend">
          <img src={logo} alt="logo" className="h-7" />
        </Link>
      </div>
      
     
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-lexend">
          <li><Link to="/discover">Discover</Link></li>
          <li>
            <details>
              <summary>Create</summary>
              <ul className="p-2 bg-base-100 rounded-t-none w-48">
                <li>
                  <button to="/create-club" className="flex flex-col items-start" onClick={() => createClusterModalRef.current?.showModal()}>
                    <span>Create Club</span>
                    <span className="text-xs opacity-70">Join different clubs</span>
                  </button>
                </li>
                <li>
                  <Link to="/book-cluster" className="flex flex-col items-start">
                    <span>Book Cluster</span>
                    <span className="text-xs opacity-70">A collection of books</span>
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>

     
      <dialog ref={createClusterModalRef} className="modal">
        <form method="dialog" className="modal-box">
          <button 
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" 
            onClick={() => createClusterModalRef.current?.close()}
          >
            ✕
          </button>
          <div className="form-control justify-center items-center">
            <h3 className="text-2xl font-cormorant-garamond font-bold ">New Cluster</h3>
            <p className="font-urbanist font-semibold text-gray-600 mb-8">A collection of elements</p>
            <input type="text" placeholder="Cluster Name" className="mx-12 h-16 w-full px-6 bg-stone-200 rounded-3xl focus:outline-none" />
          </div>
          <div className="modal-action justify-center items-center">
            <button className="h-16 w-full px-6 bg-[#292229] text-white rounded-3xl">Create</button>
          </div>
        </form>
      </dialog>
     
      <div className="navbar-end">
        <Link to="/saved" className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>
        </Link>
        
        <div className="dropdown dropdown-end ml-2">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={profile} alt="Profile" className="object-cover" />
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50">
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            <li onClick={handleLogout}><Link to="/auth/login">Log out</Link></li>
          </ul>
        </div>
      </div>
      
      
      <div className="navbar-end lg:hidden">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/discover">Discover</Link></li>
            <li>
              <details>
                <summary>Create</summary>
                <ul className="p-2">
                  <li><Link to="/create-club">Create Club</Link></li>
                  <li><Link to="/book-cluster">Book Cluster</Link></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;