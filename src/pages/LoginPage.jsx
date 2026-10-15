import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="page-shell">
      <div className="auth-card">
        <h2>Welcome back</h2>
        <p className="muted">Login to your travel profile</p>
        {error && <div className="badge" style={{ background: '#fee2e2', color: '#991b1b' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} required />
          </div>
          <div className="auth-actions">
            <button className="primary-button" type="submit">Login</button>
            <Link to="/register" className="muted">Create account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
