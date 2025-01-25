import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import LoadingSpinner from "../../components/LoadingSpinner";
import logo from "../../images/logo.svg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };


  return (
    <div className="flex flex-col h-screen justify-center items-center mt-20">
      <img
        src={logo}
        alt="logo"
        className="h-7 mb-10 self-start ml-12 mt-20"
      />
      <div className="w-full max-w-sm border border-[#DED7D7] p-14 rounded-lg mb-40">
        <h2 className="text-2xl mb-2 justify-center items-end flex font-cormorant-garamond font-bold">
          Login
        </h2>
        <p className="text-sm text-gray-500 mb-8 text-center font-urbanist">
          Every page brings you closer to your next adventure. Log in to
          continue your story
        </p>
        <form action="" onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-urbanist text-sm font-medium mb-2"
            >
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
            <label
              htmlFor="password"
              className="block text-sm font-urbanist font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full max-w-sm font-urbanist bg-[#FBFAE9]"
              placeholder="Enter your password"
            />
          </div>

          <Link to="/auth/forgot-password">
            <p className="text-sm font-urbanist flex justify-end font-medium mb-3">
              forgot password?
            </p>
          </Link>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="flex bg-[#093D2B] text-white p-3 rounded-md justify-center items-center w-full mt-2 font-urbanist text-sm mb-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-ring loading-sm font-urbanist"></span>
            ) : (
              "Login"
            )}
          </button>
          <div>
            <p className="text-sm font-urbanist mt-2 mb-2">
              Don't have an account?{" "}
              <Link to="/auth/signup" className="text-[#D4AB0E] font-bold">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
