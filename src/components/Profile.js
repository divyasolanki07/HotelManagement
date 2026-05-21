import React from 'react';

export default function Profile(){
  const user = localStorage.getItem('user');
  if(!user) return <div>Not signed in</div>;
  const u = JSON.parse(user);
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h3 className="card-title mb-3">Profile</h3>
        <p className="mb-2"><strong>Username:</strong> {u.username}</p>
        <p className="mb-0"><strong>User ID:</strong> {u.id}</p>
      </div>
    </div>
  );
}
