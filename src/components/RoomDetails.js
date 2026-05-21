import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function RoomDetails(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);

  useEffect(()=>{
    axios.get(`/rooms/${id}`).then(r=>setRoom(r.data)).catch(()=>setRoom(null));
  },[id]);

  if(!room) return <div>Loading...</div>;
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h3 className="card-title mb-3">Room {room.number} — {room.type}</h3>
        <div className="mb-3">
          <span className={`badge ${room.available ? 'bg-success' : 'bg-danger'} py-2 px-3`}>
            {room.available ? 'Available now' : 'Currently booked'}
          </span>
        </div>
        <p className="mb-2"><strong>Price:</strong> ${room.price} / night</p>
        <div className="mb-3">
          <strong>Features:</strong>
          <ul className="list-unstyled mt-2 mb-0">
            {room.features.map(feature => <li key={feature} className="badge bg-secondary me-2 mb-2">{feature}</li>)}
          </ul>
        </div>
        <div className="d-flex flex-column flex-sm-row gap-2">
          <button className="btn btn-primary" onClick={()=>navigate(`/reserve?roomId=${room.id}`)}>Reserve this room</button>
          <button className="btn btn-outline-secondary" onClick={()=>navigate('/')}>Back to rooms</button>
        </div>
      </div>
    </div>
  );
}
