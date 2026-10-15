import { useEffect, useState } from 'react';
import api from '../services/api';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    user: { fullName: 'Traveler' },
    location: 'Hyderabad',
    bio: 'Loves adventure, food, and photography',
    travelInterests: ['Photography', 'Beaches', 'Food'],
    favoriteDestinations: ['Goa', 'Kashmir', 'Bali'],
    preferredTravelStyle: 'Adventure',
    budgetRange: '₹12,000 - ₹18,000',
    accommodationPreference: 'Hotel',
    transportationPreference: 'Train'
  });

  useEffect(() => {
    api.get('/profile').then((res) => setProfile(res.data)).catch(() => setProfile(profile));
  }, []);

  return (
    <div className="page-shell">
      <div className="auth-card" style={{ maxWidth: '760px' }}>
        <h2>{profile.user?.fullName || 'Traveler Profile'}</h2>
        <div className="badge">Verified Traveler</div>
        <p className="muted">{profile.bio}</p>
        <div className="form-grid" style={{ marginTop: '1rem' }}>
          <div className="form-group"><label>Location</label><input value={profile.location || ''} readOnly /></div>
          <div className="form-group"><label>Travel Style</label><input value={profile.preferredTravelStyle || ''} readOnly /></div>
          <div className="form-group"><label>Budget Range</label><input value={profile.budgetRange || ''} readOnly /></div>
          <div className="form-group"><label>Accommodation</label><input value={profile.accommodationPreference || ''} readOnly /></div>
          <div className="form-group"><label>Transportation</label><input value={profile.transportationPreference || ''} readOnly /></div>
          <div className="form-group full"><label>Travel Interests</label><input value={(profile.travelInterests || []).join(', ')} readOnly /></div>
          <div className="form-group full"><label>Favorite Destinations</label><input value={(profile.favoriteDestinations || []).join(', ')} readOnly /></div>
        </div>
      </div>
    </div>
  );
}
