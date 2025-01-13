import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CommunityPage from './pages/CommunityPage'
import HomePage from './pages/HomePage';
import ClubsPage from './pages/ClubsPage'
import NotificationPage from './pages/NotificationPage'
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/authPage/LoginPage';
import SignupPage from './pages/authPage/SignupPage';
import ForgotPassword from './pages/authPage/ForgotPassword';
import VerifyEmail from './pages/authPage/VerifyEmail';
function App() {
  return (
    <div className=''>
      <Routes>
       
        <Route path='/auth/login' element={<LoginPage/>} />
        <Route path='/auth/signup' element={<SignupPage/>} />
        <Route path='/auth/forgot-password' element={<ForgotPassword/>} />
        <Route path='/auth/verify-email' element={<VerifyEmail/>} />
        
       
        <Route path="/" element={
          <>
            <Navbar />
            <HomePage />
          </>
        } />
        <Route path='/Community' element={
          <>
            <Navbar />
            <CommunityPage/>
          </>
        } />
        <Route path='/Clubs' element={
          <>
            <Navbar />
            <ClubsPage/>
          </>
        } />
        <Route path='/Notifications' element={
          <>
            <Navbar />
            <NotificationPage/>
          </>
        } />
        <Route path='/Profile' element={
          <>
            <Navbar />
            <ProfilePage/>
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;