import React, { useState } from "react";
import { Link, useBeforeUnload, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const {signup} = useAuthStore();
  


  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await signup(email,password, username);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

      

        <div className="mb-4">
          <label htmlFor="username" className="block font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter your password"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Confirm your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-violet-500 text-white p-2 rounded hover:bg-violet-600 transition"
        >
          Sign Up
        </button>
        <div className="mb-4">
          <p>Already have an account?</p>
          {""}
          <Link to="/auth/login" className="text-blue-500 font-bold">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
