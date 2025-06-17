'use client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';

const Header = ({ hideLayoutRoutes }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getSession();

    // Optional: Listen to auth changes for dynamic update
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="header-container">
      <h2 className="header-logo">
        <a href="/">Css Battle Vault</a>
      </h2>

      {!user && <a href="/about">About</a>}

      {hideLayoutRoutes && user && (
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      )}
    </div>
  );
};

export default Header;
