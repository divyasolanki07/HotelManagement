import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import Footer from './components/Footer';
import RoomList from './components/RoomList';
import RoomDetails from './components/RoomDetails';
import ReservationForm from './components/ReservationForm';
import ReservationList from './components/ReservationList';
import Login from './components/Login';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

export default function App() {
  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <AppNavbar />
      <main className="container flex-grow-1 py-4">
        <Routes>
          <Route path="/" element={<RoomList />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/reserve" element={<PrivateRoute><ReservationForm /></PrivateRoute>} />
          <Route path="/reservations" element={<PrivateRoute><ReservationList /></PrivateRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
