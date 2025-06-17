import React from 'react';
import styles from '@/styles/Home.module.css';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const About = () => {
  return (
    <div
      className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
    >
      <main className={`about-container ${styles.main}`}>
        <ol>
          <li>
            This project is a personal collection of all the challenges I've
            solved on the CSSBattle platform.
          </li>
          <li>Each solution is stored here with clean and readable code.</li>
          <li>
            You can easily search and filter through the challenges to quickly
            find any specific problem or solution.
          </li>
        </ol>
      </main>
    </div>
  );
};

export default About;
