import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ReservationList(){
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  useEffect(()=>{
    async function loadData() {
      try {
        const [reservationsRes, roomsRes] = await Promise.all([
          axios.get('/reservations'),
          axios.get('/rooms')
        ]);
        setRooms(roomsRes.data);
        const allReservations = reservationsRes.data;
        setReservations(currentUser ? allReservations.filter(r => r.guestName === currentUser.username) : allReservations);
      } catch (error) {
        setReservations([]);
        setRooms([]);
      }
    }
    loadData();
  },[currentUser]);

  const startEdit = (r) => {
    setEditing(r.id);
    setForm(r);
  };

  const save = async () => {
    const updated = { ...form, guestName: currentUser?.username || form.guestName };
    await axios.put(`/reservations/${editing}`, updated);
    const res = await axios.get('/reservations');
    setReservations(currentUser ? res.data.filter(r => r.guestName === currentUser.username) : res.data);
    setEditing(null);
  };

  const cancelReservation = async (id) => {
    if (window.confirm('Cancel reservation?')) {
      await axios.delete(`/reservations/${id}`);
      setReservations(reservations.filter(r=>r.id!==id));
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3>My Reservations</h3>
          <p className="text-muted">Edit or cancel your current reservations here.</p>
        </div>
      </div>
      {reservations.length === 0 ? (
        <div className="alert alert-info rounded-4 shadow-sm">No reservations found. Reserve a room first.</div>
      ) : (
        <div className="row g-4">
          {reservations.map(r=> (
            <div key={r.id} className="col-md-6">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  {editing === r.id ? (
                    <div>
                      <div className="mb-3">
                        <label className="form-label">Room</label>
                        <select className="form-select" value={form.roomId} onChange={e=>setForm({...form, roomId:Number(e.target.value)})}>
                          {rooms.map(room => (
                            <option key={room.id} value={room.id}>{room.number} — {room.type}</option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Guest name</label>
                        <input className="form-control" value={form.guestName || ''} onChange={e=>setForm({...form, guestName:e.target.value})} />
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Check-in</label>
                          <input type="date" className="form-control" value={form.checkIn || ''} onChange={e=>setForm({...form, checkIn:e.target.value})} />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Check-out</label>
                          <input type="date" className="form-control" value={form.checkOut || ''} onChange={e=>setForm({...form, checkOut:e.target.value})} />
                        </div>
                      </div>
                      <button className="btn btn-primary me-2" onClick={save}>Save</button>
                      <button className="btn btn-secondary" onClick={()=>setEditing(null)}>Cancel</button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-between align-items-start gap-3">
                      <div>
                        <h5 className="card-title mb-2">{r.guestName} — {rooms.find(x=>x.id===r.roomId)?.number || '—'}</h5>
                        <p className="mb-1">{r.checkIn} → {r.checkOut}</p>
                        <p className="text-muted mb-0">Status: <span className="badge bg-secondary">{r.status}</span></p>
                      </div>
                      <div className="d-flex flex-column gap-2">
                        <button className="btn btn-sm btn-outline-primary" onClick={()=>startEdit(r)}>Edit</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={()=>cancelReservation(r.id)}>Cancel</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
