import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const LoginPage = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault();
    }
  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      
      <h2>Login</h2>
      <form action="" onSubmit={handleLogin}>
      <div className="mb-4">
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            // value={formData.email}
            // onChange={handleChange}
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
            // value={formData.password}
            // onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter your password"
          />
          
        </div>

        <Link to='/forgotpassword'>
          <p>forgot password?</p>
          </Link>
          <button type='submit' className=' flex bg-blue-500 text-white p-2 rounded-md justify-center items-center w-full mt-2'>login</button>
          <div>
            <p>Don't have an account? <Link to='/auth/signup'>Signup</Link></p>
          </div>
      

      </form>
    </div>
  )
}

export default LoginPage
