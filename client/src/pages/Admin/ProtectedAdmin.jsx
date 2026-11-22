
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function ProtectedAdmin({ children }) {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let active = true;

    async function checkAccess() {
      const { data: { user }, error: userError } =
        await supabase.auth.getUser();

      if (!active) return;

      if (userError || !user) {
        setStatus('denied');
        return;
      }

      const { data: isAdmin, error: accessError } =
        await supabase.rpc('is_portfolio_admin');

      if (!active) return;

      setStatus(
        !accessError && isAdmin === true
          ? 'allowed'
          : 'denied'
      );
    }

    checkAccess();

    return () => {
      active = false;
    };
  }, []);

  if (status === 'loading') {
    return <p className="p-8">Checking admin access...</p>;
  }

  if (status === 'denied') {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
