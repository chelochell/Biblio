import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { forgotPassword, isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <div className="w-full max-w-sm border border-[#DED7D7] p-14 rounded-lg">
        <h2 className="text-2xl font-bold justify-center items-center flex mb-4 font-cormorant-garamond">
          Forgot Password
        </h2>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p className="text-sm text-gray-500 mb-6 justify-center font-urbanist text-center">
              Enter your email address and we will send you a link to reset your
              password.
            </p>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full max-w-sm font-urbanist text-sm bg-[#FBFAE9]"
            />

            <button
              type="submit"
              className="mt-4 flex bg-[#093D2B] text-white p-3 rounded-md justify-center items-center w-full font-urbanist text-sm font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-ring loading-sm"></span>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        ) : (
          <div className="flex text-center">
            <p className="font-urbanist">
              If an account exists for {email}, we have sent a password reset
              link shortly.
            </p>
          </div>
        )}
        <div className="flex justify-center items-center">
          <Link to="/auth/login" className="text-sm font-urbanist mt-3">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
