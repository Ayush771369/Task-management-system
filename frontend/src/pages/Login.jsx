import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/api';

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm]       = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Email and password are required.');
      return;
    }

    setLoading(true);
    try {
      const res = await login(form);
      // Accept token at res.data.token or res.data.data.token
      const token =
        res.data?.token ||
        res.data?.data?.token ||
        res.data?.accessToken;

      if (!token) throw new Error('No token received from server.');
      localStorage.setItem('token', token);

      // Optionally persist user info
      const user = res.data?.user || res.data?.data?.user;

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role', user.role);
        localStorage.setItem('name', user.name);
      }

      navigate('/dashboard');
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Login failed. Check your credentials.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-logo">TaskApp</div>
        <h1 className="auth-title">Sign in</h1>
        <p className="auth-sub">Welcome back.</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="jane@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              disabled={loading}
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : null}
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="auth-footer">
          No account yet?
          <Link to="/register">Create one</Link>
        </div>
      </div>
    </div>
  );
}
