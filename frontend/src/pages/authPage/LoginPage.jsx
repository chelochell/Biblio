import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import LoadingSpinner from "../../components/LoadingSpinner";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="w-full max-w-sm border border-red-300 p-12 rounded-lg">
      <h2 className="text-2xl font-bold mb-2 justify-center items-end flex">Login</h2>
      <p className="text-sm text-gray-500 mb-6 justify-center items-end flex">Dive Into Stories, Join Fellow Book Enthusiasts</p>
      <form action="" onSubmit={handleLogin}>
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
            className="w-full p-2 border border-gray-300 mt-1 rounded-lg"
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
            className="w-full p-2 border border-gray-300 rounded-lg mt-1"
            placeholder="Enter your password"
          />
        </div>

        <Link to="/forgotpassword">
          <p>forgot password?</p>
        </Link>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="flex border-b-orange-400 bg-red-300 text-white p-2 rounded-md justify-center items-center w-full mt-2"
          disabled={isLoading}
        >
          {isLoading ? <span className="loading loading-ring loading-sm"></span> : "login"}
        </button>
        <div>
          <p>
            Don't have an account? <Link to="/auth/signup">Signup</Link>
          </p>
        </div>
      </form>
      </div>
     
    </div>
  );
};

export default LoginPage;
