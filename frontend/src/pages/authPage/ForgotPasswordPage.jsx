import React, { useState } from 'react'
import { useAuthStore } from '../../store/authStore';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {forgotPassword, isLoading} = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
    
  }

  return (
    <div className='flex justify-center items-center h-screen flex-col'>
      <div>
        <h2 className='text-2xl font-bold justify-center items-center flex mb-4'>Forgot Password</h2>
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p className='text-sm text-gray-500 mb-6 justify-center items-end flex'>Enter your email address and we will send you a link to reset your password.</p>
            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='border border-gray-300 p-2 rounded-md w-full mb-4' />
           
            <button type="submit" className="flex border-b-orange-400 bg-red-300 text-white p-2 rounded-md justify-center items-center w-full mt-2" disabled={isLoading}>
              {isLoading ? <span className="loading loading-ring loading-sm"></span> : "Send Reset Link"}
            </button>
          </form>
        ) : (
         <div className='flex text-center'>
          <p>If an account exists for {email}, we have sent a password reset link shortly.</p>
         </div>
        )}
      </div>

      <div>
        <Link to="/auth/login">Back to Login</Link>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
