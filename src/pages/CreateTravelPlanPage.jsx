import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function CreateTravelPlanPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    destination: '',
    startingLocation: '',
    departureDate: '',
    returnDate: '',
    tripDuration: 4,
    budget: 15000,
    currency: 'INR',
    travelStyle: 'Adventure',
    interests: 'Beaches, Photography, Food',
    activities: 'Hiking, Sightseeing',
    accommodationPreference: 'Hotel',
    transportationPreference: 'Train',
    companionsNeeded: 2,
    description: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        interests: form.interests.split(',').map((item) => item.trim()).filter(Boolean),
        activities: form.activities.split(',').map((item) => item.trim()).filter(Boolean),
      };
      await api.post('/trips', payload);
      navigate('/trips');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create trip');
    }
  };

  return (
    <div className="page-shell">
      <div className="auth-card" style={{ maxWidth: '860px' }}>
        <h2>Create Travel Plan</h2>
        {error && <div className="badge" style={{ background: '#fee2e2', color: '#991b1b' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group"><label>Destination</label><input name="destination" value={form.destination} onChange={handleChange} required /></div>
            <div className="form-group"><label>Starting Location</label><input name="startingLocation" value={form.startingLocation} onChange={handleChange} required /></div>
            <div className="form-group"><label>Departure Date</label><input type="date" name="departureDate" value={form.departureDate} onChange={handleChange} required /></div>
            <div className="form-group"><label>Return Date</label><input type="date" name="returnDate" value={form.returnDate} onChange={handleChange} required /></div>
            <div className="form-group"><label>Trip Duration</label><input name="tripDuration" type="number" value={form.tripDuration} onChange={handleChange} /></div>
            <div className="form-group"><label>Budget</label><input name="budget" type="number" value={form.budget} onChange={handleChange} /></div>
            <div className="form-group"><label>Currency</label><select name="currency" value={form.currency} onChange={handleChange}><option>INR</option><option>USD</option><option>EUR</option></select></div>
            <div className="form-group"><label>Travel Style</label><select name="travelStyle" value={form.travelStyle} onChange={handleChange}><option>Adventure</option><option>Relaxed</option><option>Backpacking</option><option>Luxury</option><option>Budget</option></select></div>
            <div className="form-group full"><label>Interests</label><input name="interests" value={form.interests} onChange={handleChange} /></div>
            <div className="form-group full"><label>Activities</label><input name="activities" value={form.activities} onChange={handleChange} /></div>
            <div className="form-group"><label>Accommodation Preference</label><input name="accommodationPreference" value={form.accommodationPreference} onChange={handleChange} /></div>
            <div className="form-group"><label>Transportation Preference</label><input name="transportationPreference" value={form.transportationPreference} onChange={handleChange} /></div>
            <div className="form-group"><label>Companions Needed</label><input name="companionsNeeded" type="number" value={form.companionsNeeded} onChange={handleChange} /></div>
            <div className="form-group full"><label>Description</label><textarea rows="4" name="description" value={form.description} onChange={handleChange} /></div>
          </div>
          <div className="auth-actions">
            <button className="primary-button" type="submit">Publish Trip</button>
          </div>
        </form>
      </div>
    </div>
  );
}
