import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreateBook from './pages/CreateBook';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className='p-6'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AddBook" element={<CreateBook />} />
      </Routes>
    </div>
  );
}

export default App;
