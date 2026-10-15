import { Link } from 'react-router-dom';

const features = [
  { icon: '🧭', title: 'Find Compatible Travelers', text: 'Meet people whose destinations, style, and budget match your next adventure.' },
  { icon: '🗺️', title: 'Plan Trips Together', text: 'Coordinate with travelers who share your interests and ideal trip pace.' },
  { icon: '🛡️', title: 'Travel Safely', text: 'Stay informed with verified profiles, trip reviews, and reporting tools.' },
  { icon: '⭐', title: 'Build Trust', text: 'Rate co-travelers and maintain a reputation that improves matching quality.' }
];

const reviews = [
  { name: 'Aisha', quote: 'I found the perfect trekking partner for Kashmir in under a day.' },
  { name: 'Rohan', quote: 'The matching system clearly suggested travelers with similar budget and interests.' },
  { name: 'Meera', quote: 'Easy to manage trips, connect, and communicate with verified travelers.' }
];

export default function LandingPage() {
  return (
    <div className="container">
      <section className="hero">
        <div className="hero-grid">
          <div>
            <h1>Find Your Perfect Travel Companion</h1>
            <p>Discover people who share your destination, interests, budget, and passion for travel.</p>
            <div className="hero-actions">
              <Link to="/find-companions" className="primary-button">Find a Companion</Link>
              <Link to="/create-trip" className="secondary-button">Create Travel Plan</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="travel-card">
              <h3>Goa • Dec 15–20</h3>
              <p>Adventure • Beaches • Photography</p>
              <div className="badge">92% Match</div>
              <p className="muted">Rahul • ₹12,000–₹16,000 • Verified Traveler</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>How It Works</h2>
        </div>
        <div className="features-grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p className="muted">{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Traveler Reviews</h2>
        </div>
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.name} className="review-card">
              <div className="badge">★★★★★</div>
              <p>“{review.quote}”</p>
              <strong>{review.name}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
