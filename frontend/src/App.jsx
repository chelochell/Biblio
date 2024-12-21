import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CommunityPage from './pages/CommunityPage'
import HomePage from './pages/HomePage';
import ClubsPage from './pages/ClubsPage'
import NotificationPage from './pages/NotificationPage'
import ProfilePage from './pages/ProfilePage';
function App() {
  return (
    <div className='p-6'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/Community' element={<CommunityPage/>} />
        <Route path='/Clubs' element={<ClubsPage/>} />
        <Route path='/Notifications' element={<NotificationPage/>} />
        <Route path='/Profile' element={<ProfilePage/>} />
      </Routes>
    </div>
  );
}

export default App;
