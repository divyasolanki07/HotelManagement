import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';

export default function RoomList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('search') || '';

  useEffect(() => {
    setLoading(true);
    axios.get('/rooms')
      .then(res => setItems(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = items.filter(r => {
    if (!searchValue) return true;
    const term = searchValue.toLowerCase();
    return (
      r.type.toLowerCase().includes(term)
      || r.features.join(' ').toLowerCase().includes(term)
      || r.number.toString().includes(term)
    );
  });

  if (loading) return <div>Loading rooms...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4 flex-column flex-md-row gap-3">
        <div>
          <h2 className="mb-1">Room collection</h2>
          <p className="text-muted mb-0">Browse rooms in a clean layout and search by room type.</p>
        </div>
        {searchValue && (
          <div className="badge bg-primary text-white py-2 px-3">Search: {searchValue}</div>
        )}
      </div>

      <div className="row g-4">
        {filtered.map(room => (
          <div className="col-lg-6" key={room.id}>
            <article className="card blog-card shadow-sm h-100 border-0">
              <div className="ratio ratio-16x9 room-banner d-flex align-items-end p-3">
                <div>
                  <span className="badge bg-white text-dark mb-2">{room.type}</span>
                  <h5 className="text-white">Room {room.number}</h5>
                </div>
              </div>
              <div className="card-body d-flex flex-column">
                <p className="text-muted mb-2">Enjoy modern amenities, a clean stay, and easy booking to make your trip smooth.</p>
                <div className="mb-3">
                  <span className={`badge ${room.available ? 'bg-success' : 'bg-danger'} me-2`}>
                    {room.available ? 'Available' : 'Booked'}
                  </span>
                  <span className="badge bg-secondary">${room.price}/night</span>
                </div>
                <p className="mb-4 text-truncate">{room.features.join(' · ')}</p>
                <div className="mt-auto d-flex flex-wrap gap-2">
                  <Link className="btn btn-outline-primary" to={`/rooms/${room.id}`}>View details</Link>
                  <Link className="btn btn-primary" to={`/reserve?roomId=${room.id}`}>Reserve now</Link>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
