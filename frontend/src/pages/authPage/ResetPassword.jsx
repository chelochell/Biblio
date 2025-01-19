import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      <div className="flex justify-center items-center flex-col">
        <h2 className="text-2xl font-bold flex justify-center items-center">
          Reset Password
        </h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            className="border border-gray-300 p-2 rounded-md w-full mb-4"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="border border-gray-300 p-2 rounded-md w-full mb-4"
          />
          {error && <p className="text-red-500">{error}</p>}
          {message && <p className="text-green-500">{message}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="flex border-b-orange-400 bg-red-300 text-white p-2 rounded-md justify-center items-center w-full mt-2"
          >
            {isLoading ? "Resetting..." : "Set New Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
