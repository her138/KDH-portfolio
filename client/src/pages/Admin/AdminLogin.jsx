
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (loginError) throw loginError;

      const { data: isAdmin, error: accessError } =
        await supabase.rpc('is_portfolio_admin');

      if (accessError || isAdmin !== true) {
        await supabase.auth.signOut();
        throw new Error('This account is not authorised.');
      }

      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="glass-card w-full max-w-md p-8 space-y-5"
      >
        <h1 className="text-3xl font-playfair font-semibold">
          KDH Admin Login
        </h1>

        <p className="text-sm text-gray-500">
          Sign in to manage your portfolio.
        </p>

        <div>
          <label htmlFor="admin-email" className="block mb-2">
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border text-black"
          />
        </div>

        <div>
          <label htmlFor="admin-password" className="block mb-2">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border text-black"
          />
        </div>

        {error && (
          <p role="alert" className="text-red-500 text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#252422] text-white rounded-lg p-3 disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </main>
  );
}
