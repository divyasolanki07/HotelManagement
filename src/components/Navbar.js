import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function AppNavbar() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    const u = localStorage.getItem('user');
    setUser(u ? JSON.parse(u) : null);
  },[location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = search.trim();
    navigate(`/?search=${encodeURIComponent(query)}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-2">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">HotelMS</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
            <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
          </ul>

          <form className="d-flex me-3" onSubmit={handleSearch}>
            <input
              className="form-control form-control-sm me-2"
              type="search"
              placeholder="Search room/type"
              aria-label="Search"
              value={search}
              onChange={e=>setSearch(e.target.value)}
            />
            <button className="btn btn-outline-light btn-sm" type="submit">Search</button>
          </form>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {user ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/profile">{user.username}</Link></li>
                <li className="nav-item"><button className="btn btn-link nav-link" onClick={handleLogout}>Sign out</button></li>
              </>
            ) : (
              <li className="nav-item"><Link className="nav-link" to="/login">Sign in</Link></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
