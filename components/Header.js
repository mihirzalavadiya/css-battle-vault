'use client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { FiSun, FiMoon } from 'react-icons/fi';

const Header = ({ hideLayoutRoutes }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  // Fetch user session
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    );
    return () => listener?.subscription.unsubscribe();
  }, []);

  // Initialize theme
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const current = saved || (systemPrefersDark ? 'dark' : 'light');
    setTheme(current);
    document.body.classList.add(current);
  }, []);

  // Toggle theme and persist
  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    document.body.classList.replace(theme, next);
    setTheme(next);
    localStorage.setItem('theme', next);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <header className="header-container">
      <h2 className="header-logo">
        <a href="/">Css Battle Vault</a>
      </h2>

      <div className="header-controls">
        {!user && <a href="/about">About</a>}

        {/* <div className="theme-switch" onClick={toggleTheme}>
          <div className={`switch-thumb ${theme === 'dark' ? 'dark' : ''}`}>
            {theme === 'dark' ? <FiMoon /> : <FiSun />}
          </div>
        </div> */}
        <div className="fancy-theme-toggle" onClick={toggleTheme}>
          <div className={`fancy-thumb ${theme === 'dark' ? 'dark' : ''}`}>
            {theme === 'dark' ? (
              <span className="moon">🌙</span>
            ) : (
              <span className="sun">☀️</span>
            )}
          </div>
        </div>

        {hideLayoutRoutes && user && (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
