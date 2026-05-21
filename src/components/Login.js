import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login(){
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const submit = async (e)=>{
    e.preventDefault();
    try{
      const res = await axios.get('/users');
      const normalized = u.trim().toLowerCase();
      const user = res.data.find(item => item.username.toLowerCase() === normalized && item.password === p);
      if(user){
        localStorage.setItem('user', JSON.stringify(user));
        const nextPath = location.state?.from?.pathname || '/';
        navigate(nextPath);
        return;
      }
      alert('Invalid credentials');
    } catch(err){
      alert('Login error');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            <h3 className="mb-3">Sign in</h3>
            <p className="text-muted mb-4">Enter your credentials to manage room reservations.</p>
            <form onSubmit={submit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input className="form-control" value={u} onChange={e=>setU(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" value={p} onChange={e=>setP(e.target.value)} />
              </div>
              <button className="btn btn-primary">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
