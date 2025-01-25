import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { resetPassword, error, isLoading, message } = useAuthStore();
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await resetPassword(token, password);
      toast.success("Password reset successful, redirecting to login page...");
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (error) {
      toast.error(error.message || "Error resetting password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-sm border border-[#DED7D7] p-14 rounded-lg">
        <h2 className="text-2xl font-bold flex justify-center items-center font-cormorant-garamond mb-4">
          Reset Password
        </h2>
        <p className="text-sm text-gray-500 mb-8 text-center font-urbanist">Secure your account with a strong password</p>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="password" className="font-urbanist text-sm mb-3">
            New Password
          </label>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full max-w-sm font-urbanist bg-[#FBFAE9]"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-sm font-urbanist"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <label htmlFor="confirmPassword" className="font-urbanist text-sm mb-3">Confirm Password</label>
          <div className="relative mb-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input input-bordered w-full max-w-sm font-urbanist bg-[#FBFAE9]"
              placeholder="Confirm Password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-2 text-sm font-urbanist"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {message && <p className="text-green-500">{message}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="flex bg-[#093D2B] text-white p-2 rounded-md justify-center items-center w-full mt-2 font-urbanist text-sm font-medium p-3"
          >
            {isLoading ? "Resetting..." : "Set New Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
