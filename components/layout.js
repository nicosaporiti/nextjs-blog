import React from "react";
import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Navbar from "./navbar";
import Image from "next/image";

const name = "Notas en {código}.";
export const siteTitle = "BLOG de Nicolás Saporiti";

export default function Layout({ children, home }) {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {home ? (
          <Head>
            <link rel="icon" href="/favicon.ico" />
            <meta name="description" content="Notas en {código}." />
            <meta
              property="og:image"
              content={`https://og-image.now.sh/${encodeURI(
                siteTitle
              )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
            />
            <meta name="og:title" content={siteTitle} />
          </Head>
        ) : (
          <Head>
            <link rel="icon" href="/favicon.ico" />
          </Head>
        )}

        <header className={styles.header}>
          {home ? (
            <>
              <Image
                src="/images/profile.jpg"
                className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
                alt={name}
                unsized
              />
              <h1 className={utilStyles.heading2Xl}>{name}</h1>
            </>
          ) : (
            <>
              <Link href="/">
                <a>
                  <Image
                    src="/images/profile.jpg"
                    className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                    alt={name}
                    unsized
                  />
                </a>
              </Link>
              <h2 className={utilStyles.headingLg}>
                <Link href="/">
                  <a className={utilStyles.colorInherit}>{name}</a>
                </Link>
              </h2>
            </>
          )}
        </header>
        <main>{children}</main>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>← Volver al Home</a>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
