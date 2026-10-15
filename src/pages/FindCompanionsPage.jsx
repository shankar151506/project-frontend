import { useEffect, useState } from 'react';
import api from '../services/api';

export default function FindCompanionsPage() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    api.get('/matches').then((res) => setMatches(res.data)).catch(() => setMatches([]));
  }, []);

  return (
    <div className="page-shell">
      <h2>Find Travel Companions</h2>
      <div className="dashboard-grid" style={{ marginTop: '1rem' }}>
        {matches.length ? matches.map((trip) => (
          <div key={trip.id} className="match-card">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{trip.user?.fullName || 'Traveler'}</strong>
              <span className="badge">92% Match</span>
            </div>
            <div className="muted">{trip.destination} • {trip.departureDate} to {trip.returnDate}</div>
            <div className="muted">Budget: {trip.currency} {trip.budget}</div>
            <div className="muted">Travel Style: {trip.travelStyle}</div>
            <div className="muted">Interests: {trip.interests?.join(', ') || 'Adventure'}</div>
            <div className="inline-actions">
              <button className="primary-button">View Profile</button>
              <button className="secondary-button" style={{ color: '#0f172a' }}>Connect</button>
            </div>
          </div>
        )) : <div className="feature-card"><p className="muted">No compatible travelers available yet.</p></div>}
      </div>
    </div>
  );
}
