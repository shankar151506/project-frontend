import { useEffect, useState } from 'react';
import api from '../services/api';

export default function MyTripsPage() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    api.get('/trips').then((res) => setTrips(res.data)).catch(() => setTrips([]));
  }, []);

  return (
    <div className="page-shell">
      <h2>My Trips</h2>
      <div className="trips-grid" style={{ marginTop: '1rem' }}>
        {trips.length ? trips.map((trip) => (
          <div key={trip.id} className="trip-card">
            <div className="badge">{trip.status || 'OPEN'}</div>
            <h3>{trip.destination}</h3>
            <p className="muted">{trip.departureDate} to {trip.returnDate}</p>
            <p><strong>Budget:</strong> {trip.currency} {trip.budget}</p>
            <p><strong>Companions:</strong> {trip.companionsNeeded}</p>
            <div className="inline-actions">
              <button className="primary-button">View Details</button>
              <button className="secondary-button" style={{ color: '#0f172a' }}>Edit</button>
            </div>
          </div>
        )) : <div className="feature-card"><p className="muted">No trips created yet.</p></div>}
      </div>
    </div>
  );
}
