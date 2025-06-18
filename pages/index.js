import Head from 'next/head';
import { Geist, Geist_Mono } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Cards from '@/components/Cards';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function getServerSideProps() {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseURL}/api/cards`);
    const data = await res.json();

    return {
      props: {
        initialCards: data || [],
      },
    };
  } catch (err) {
    console.error('Fetch failed:', err);
    return {
      props: {
        initialCards: [],
      },
    };
  }
}

export default function Home({ initialCards }) {
  return (
    <>
      <Head>
        <title>CSS BATTLE VAULT</title>
        <meta name="description" content="CSS challenge vault" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className={styles.mainContainer}>
          <Cards initialCards={initialCards} />
        </main>
      </div>
    </>
  );
}
