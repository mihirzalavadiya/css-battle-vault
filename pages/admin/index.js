'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../utils/supabaseClient';
import AdminUploadForm from '@/components/AdminUploadForm';

const AdminPanel = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.push('/login');
        return;
      }

      // OPTIONAL: If you have an `is_admin` field in a custom `users` table
      if (!user) {
        router.push('/unauthorized');
      } else {
        setUser(user);
      }

      setLoading(false);
    };

    checkUser();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <AdminUploadForm />
      {/* <p>Welcome, {user.email}</p> */}
      {/* Add your admin features here */}
    </div>
  );
};

export default AdminPanel;
