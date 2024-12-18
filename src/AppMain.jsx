import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Login/Register';
import App from './App';
import HotelDetails from './Hoteldetails';
import ProtectedRoute from './Protected';
///app is like home

//make the protected chanaegs too 
function AppMain() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/register" element={<ProtectedRoute element={<Register />} />} />
             <Route path="/hotel/:hotelId" element={<HotelDetails />} />
      </Routes>
    </Router>
  );
}

export default AppMain;
