import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-3 mb-md-0">
            <h5>HotelMS</h5>
            <p className="text-muted">Simple hotel reservation system with modern Bootstrap design.</p>
          </div>
          <div className="col-md-3 mb-3 mb-md-0">
            <h6>Quick links</h6>
            <ul className="list-unstyled">
              <li><Link className="footer-link" to="/">Rooms</Link></li>
              <li><Link className="footer-link" to="/reserve">Reserve</Link></li>
              <li><Link className="footer-link" to="/reservations">My Reservations</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h6>Contact</h6>
            <p className="text-muted mb-1">support@hotelms.com</p>
            <p className="text-muted mb-0">+91 98765 43210</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
