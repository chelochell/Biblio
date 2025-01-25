import React, { useState } from "react";
import { Link, useBeforeUnload, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import logo from "../../images/logo.svg";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { signup, error ,isLoading } = useAuthStore();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await signup(email, password, username);
      navigate("/auth/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center my-32">
      <div className="absolute top-5 left-12">
        <img src={logo} alt="logo" className="h-7" />
      </div>
      <div className="w-full max-w-md border border-[#DED7D7] p-12 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center font-cormorant-garamond">Sign Up</h2>
        <p className="text-sm text-gray-500 mb-8 text-center font-urbanist">
          Join our community! Create an account to start exploring and saving your favorite books.
        </p>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="username" className="block font-medium text-xs font-urbanist mb-3">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered w-full max-w-sm font-urbanist text-sm bg-[#FBFAE9]"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block font-medium font-urbanist text-xs mb-3">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full max-w-sm font-urbanist text-sm bg-[#FBFAE9]"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block font-medium font-urbanist text-xs mb-3">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full max-w-sm text-sm bg-[#FBFAE9]"
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block font-medium font-urbanist text-xs mb-3">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input input-bordered w-full max-w-sm font-urbanist text-sm bg-[#FBFAE9]"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="flex p-4 bg-[#093D2B] text-white rounded-md justify-center items-center w-full mt-2 font-urbanist text-sm font-bold"
          >
            {isLoading ? <span className="loading loading-ring loading-sm"></span> : "Sign Up"}
          </button>
          <div className="mb-4 font-urbanist text-sm mt-3">
            <p>
              Already have an account? <Link to="/auth/login" className="font-bold text-[#D4AB0E] font-urbanist">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
