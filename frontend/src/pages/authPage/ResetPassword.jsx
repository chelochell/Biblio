import React from 'react'

const ResetPassword = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex justify-center items-center flex-col'>
        <h2 className='text-2xl font-bold flex justify-center items-center'>Reset Password</h2>
        <form className='flex flex-col'>
          <input type="password" placeholder='New Password' className='border border-gray-300 p-2 rounded-md w-full mb-4' />
          <input type="password" placeholder='Confirm Password' className='border border-gray-300 p-2 rounded-md w-full mb-4' />
          <button type='submit'>Reset Password</button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword