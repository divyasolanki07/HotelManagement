import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function ReservationForm(){
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const defaultRoomId = Number(searchParams.get('roomId') || '');
  const [form, setForm] = useState({ roomId: defaultRoomId || '', checkIn: '', checkOut: '', guestName: currentUser?.username || '' });

  useEffect(()=>{
    axios.get('/rooms').then(r=>setRooms(r.data)).catch(()=>setRooms([]));
  },[]);

  useEffect(()=>{
    if (defaultRoomId && !form.roomId) {
      setForm(prev => ({ ...prev, roomId: defaultRoomId }));
    }
  }, [defaultRoomId, form.roomId]);

  const makeReservation = async (e)=>{
    e.preventDefault();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    const payload = { ...form, status: 'confirmed' };
    await axios.post('/reservations', payload);
    navigate('/reservations');
  };

  return (
    <div className="card p-4 shadow-sm">
      <h3>Make Reservation</h3>
      <form onSubmit={makeReservation}>
        <div className="mb-3">
          <label className="form-label">Guest name</label>
          <input className="form-control" value={form.guestName} onChange={e=>setForm({...form, guestName: e.target.value})} required disabled={!!currentUser} />
        </div>
        <div className="mb-3">
          <label className="form-label">Room</label>
          <select className="form-select" value={form.roomId} onChange={e=>setForm({...form, roomId:Number(e.target.value)})} required>
            <option value="">Select a room</option>
            {rooms.map(r=> <option key={r.id} value={r.id}>{r.number} — {r.type}</option>)}
          </select>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Check-in</label>
            <input type="date" className="form-control" value={form.checkIn} onChange={e=>setForm({...form, checkIn: e.target.value})} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Check-out</label>
            <input type="date" className="form-control" value={form.checkOut} onChange={e=>setForm({...form, checkOut: e.target.value})} required />
          </div>
        </div>
        <button className="btn btn-primary" type="submit">Reserve</button>
      </form>
    </div>
  );
}
