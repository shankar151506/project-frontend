import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: 'Female',
    phoneNumber: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="page-shell">
      <div className="auth-card">
        <h2>Create account</h2>
        <p className="muted">Start matching with compatible travelers</p>
        {error && <div className="badge" style={{ background: '#fee2e2', color: '#991b1b' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input name="fullName" value={form.fullName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange}>
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group full">
              <label>Phone Number</label>
              <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
            </div>
          </div>
          <div className="auth-actions">
            <button className="primary-button" type="submit">Register</button>
            <Link to="/login" className="muted">Already have account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
