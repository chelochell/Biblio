import React from "react";
import { Link } from "react-router-dom";
import profile from '../images/profile.jpg'

const Navbar = () => {
  return (
    <>
      <div className="navbar-center p-6">
        <nav className="flex items-center">
          
          <div className="font-bold text-xl text-black fontFamily-lexend">Biblio</div>

          <div className="flex-1 flex justify-center">
            <ul className="menu menu-horizontal bg-base-100 rounded-box fontFamily-lexend font-weight-regular">
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/Community'>Community</Link></li>
              <li><Link to='/Clubs'>Clubs</Link></li>
              <li><Link to='/Notifications'>Notifications</Link></li>
            </ul>
          </div>

          {/* Profile image with dropdown */}
          <div className="dropdown dropdown-end">
            <div tabIndex="0" className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
              <img src={profile} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/settings">Settings</Link></li>
              <li><Link to="/logout">Log out</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
