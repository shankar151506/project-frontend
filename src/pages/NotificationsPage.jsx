import { useEffect, useState } from 'react';
import api from '../services/api';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    api.get('/notifications').then((res) => setNotifications(res.data)).catch(() => setNotifications([]));
  }, []);

  return (
    <div className="page-shell">
      <h2>Notifications</h2>
      <div className="list-stack" style={{ marginTop: '1rem' }}>
        {notifications.length ? notifications.map((item) => (
          <div key={item.id} className="notification-card">
            <strong>{item.type}</strong>
            <div>{item.message}</div>
            <small className="muted">{item.createdAt || 'Just now'}</small>
          </div>
        )) : <div className="feature-card"><p className="muted">No notifications yet.</p></div>}
      </div>
    </div>
  );
}
