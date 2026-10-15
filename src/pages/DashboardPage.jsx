import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function DashboardPage() {
  const [matches, setMatches] = useState([]);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get('/matches'),
      api.get('/trips')
    ]).then(([matchesRes, tripsRes]) => {
      setMatches(matchesRes.data.slice(0, 3));
      setTrips(tripsRes.data.slice(0, 3));
    }).catch(() => {
      setMatches([]);
      setTrips([]);
    });
  }, []);

  return (
    <div className="page-shell">
      <h2>Welcome back, Traveler!</h2>
      <div className="dashboard-grid" style={{ marginTop: '1rem' }}>
        <div className="dashboard-card">
          <span className="muted">Upcoming Trips</span>
          <strong>{trips.length || 0}</strong>
        </div>
        <div className="dashboard-card">
          <span className="muted">Travel Companions</span>
          <strong>{matches.length || 0}</strong>
        </div>
        <div className="dashboard-card">
          <span className="muted">Connection Requests</span>
          <strong>4</strong>
        </div>
        <div className="dashboard-card">
          <span className="muted">Unread Messages</span>
          <strong>2</strong>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }} className="cards-grid">
        <div className="feature-card">
          <h3>Recommended Companions</h3>
          {matches.length ? matches.map((trip) => (
            <div key={trip.id} className="match-card" style={{ marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{trip.user?.fullName || 'Traveler'}</strong>
                <span className="badge">92% Match</span>
              </div>
              <div className="muted">{trip.destination} • {trip.departureDate}</div>
              <div className="inline-actions">
                <button className="primary-button">View Profile</button>
                <button className="secondary-button" style={{ color: '#0f172a' }}>Connect</button>
              </div>
            </div>
          )) : <p className="muted">No recommended companions yet.</p>}
        </div>

        <div className="feature-card">
          <h3>Quick Actions</h3>
          <div className="list-stack">
            <Link to="/create-trip" className="primary-button" style={{ textAlign: 'center' }}>Create Trip</Link>
            <Link to="/find-companions" className="secondary-button" style={{ textAlign: 'center', color: '#0f172a' }}>Find Companion</Link>
            <Link to="/trips" className="secondary-button" style={{ textAlign: 'center', color: '#0f172a' }}>My Trips</Link>
            <Link to="/messages" className="secondary-button" style={{ textAlign: 'center', color: '#0f172a' }}>Messages</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
