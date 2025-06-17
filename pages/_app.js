import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '@/styles/globals.css';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Define paths where you DON'T want Header and Footer
  const hideLayoutRoutes = ['/login', '/admin', '/unauthorized']; // Add more routes as needed
  const hideLayout = hideLayoutRoutes.includes(router.pathname);
  return (
    <div className="grid-bg">
      <Header hideLayoutRoutes={hideLayoutRoutes} />
      <Component {...pageProps} />
      {!hideLayout && <Footer />}
    </div>
  );
}
