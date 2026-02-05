import React from 'react';
import Head from 'next/head';
import styles from './layout.module.css';
import Link from 'next/link';
import Navbar from './navbar';

export const siteTitle = 'BLOG de Nicolás Saporiti';

export default function Layout({ children, home }) {
  return (
    <>
      <Navbar home={home} />
      <div className={home ? styles.containerHome : styles.container}>
        <Head>
          <link rel='icon' href='/favicon.ico' />
          {home && (
            <>
              <meta name='description' content='Blog de Nicolás Saporiti.' />
              <meta
                property='og:image'
                content={`https://og-image.now.sh/${encodeURI(
                  siteTitle,
                )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
              />
              <meta name='og:title' content={siteTitle} />
            </>
          )}
        </Head>
        <main>{children}</main>
        {!home && (
          <>
            <div className={styles.backToHome}>
              <Link href='/'>← Volver al Home</Link>
            </div>
            <Link
              href='/'
              className={styles.backButton}
              aria-label='Volver al Home'
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <polyline points='15 18 9 12 15 6' />
              </svg>
            </Link>
          </>
        )}
      </div>
    </>
  );
}
