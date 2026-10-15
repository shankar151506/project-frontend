import { useEffect, useState } from 'react';
import api from '../services/api';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, totalTrips: 0, completedTrips: 0, pendingVerifications: 0, reports: 0 });

  useEffect(() => {
    api.get('/admin/stats').then((res) => setStats(res.data)).catch(() => setStats({ totalUsers: 0, activeUsers: 0, totalTrips: 0, completedTrips: 0, pendingVerifications: 0, reports: 0 }));
  }, []);

  return (
    <div className="page-shell">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-grid" style={{ marginTop: '1rem' }}>
        <div className="dashboard-card"><span className="muted">Total Users</span><strong>{stats.totalUsers}</strong></div>
        <div className="dashboard-card"><span className="muted">Active Users</span><strong>{stats.activeUsers}</strong></div>
        <div className="dashboard-card"><span className="muted">Total Trips</span><strong>{stats.totalTrips}</strong></div>
        <div className="dashboard-card"><span className="muted">Completed Trips</span><strong>{stats.completedTrips}</strong></div>
        <div className="dashboard-card"><span className="muted">Pending Verifications</span><strong>{stats.pendingVerifications}</strong></div>
        <div className="dashboard-card"><span className="muted">Reports</span><strong>{stats.reports}</strong></div>
      </div>
    </div>
  );
}
