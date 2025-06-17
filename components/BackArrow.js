'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiArrowNarrowLeft } from 'react-icons/hi';

const BackArrow = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const match = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(match.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    match.addEventListener('change', handleChange);

    return () => match.removeEventListener('change', handleChange);
  }, []);

  const iconColor = isDarkMode ? '#facc15' : '#171717';

  return (
    <HiArrowNarrowLeft
      size={30}
      color={iconColor}
      style={{ cursor: 'pointer' }}
      onClick={() => router.back()} // or use router.push('/') for homepage
    />
  );
};

export default BackArrow;
