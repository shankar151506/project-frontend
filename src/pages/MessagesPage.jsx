import { useState } from 'react';

const inbox = [
  { id: 1, name: 'Rahul', preview: 'See you at the beach café!', time: '09:15 AM' },
  { id: 2, name: 'Nisha', preview: 'I can share a hotel room.', time: 'Yesterday' }
];

export default function MessagesPage() {
  const [messages, setMessages] = useState([
    { from: 'Rahul', text: 'Let’s plan our Goa itinerary together.', me: false },
    { from: 'Me', text: 'Perfect! I’ll bring the camera gear.', me: true }
  ]);
  const [draft, setDraft] = useState('');

  const handleSend = () => {
    if (!draft.trim()) return;
    setMessages((current) => [...current, { from: 'Me', text: draft, me: true }]);
    setDraft('');
  };

  return (
    <div className="page-shell">
      <h2>Messages</h2>
      <div className="cards-grid" style={{ marginTop: '1rem' }}>
        <div className="feature-card">
          {inbox.map((item) => (
            <div key={item.id} className="notification-card" style={{ marginBottom: '0.75rem' }}>
              <strong>{item.name}</strong>
              <div className="muted">{item.preview}</div>
              <small>{item.time}</small>
            </div>
          ))}
        </div>
        <div className="feature-card">
          <h3>Rahul</h3>
          <div className="list-stack" style={{ marginTop: '1rem' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ alignSelf: msg.me ? 'flex-end' : 'flex-start', maxWidth: '75%', background: msg.me ? '#dbeafe' : '#f1f5f9', padding: '0.75rem 1rem', borderRadius: '12px' }}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="form-group" style={{ marginTop: '1rem' }}>
            <textarea rows="3" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type a message..." />
          </div>
          <button className="primary-button" onClick={handleSend}>Send Message</button>
        </div>
      </div>
    </div>
  );
}
