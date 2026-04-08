import React from 'react';
import Head from 'next/head';
import Navbar from './navbar';
import Footer from './footer';

export const siteTitle = 'Nicolás Saporiti';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml" />
        <meta name="google-site-verification" content="w7vDBjT1u0QWDSwWjkTrZgbAmw_68ndDmB-kNy45QkA" />
      </Head>
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}
