import React from "react";
import Image from "next/image";
import styles from "./navbar.module.css";
import Link from "next/link";

const navbar = ({ home }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link href="/" className={styles.identity}>
          <Image
            src="https://lh3.googleusercontent.com/a-/AOh14GgwKFzMdsAwOfBb9dRTM1ZNlRwQgX9Ow26ZPFRhxg=s96-c"
            className={styles.avatar}
            alt="Nicolás Saporiti"
            width={28}
            height={28}
          />
          <span className={styles.name}>Blog de Nicolás Saporiti</span>
        </Link>
      </div>
      <div className={styles.icons}>
        <Link href="/about">
          <img
            src="/images/about.png"
            alt="about"
            className={styles.iconStyle}
          />
        </Link>
        <a
          href="https://github.com/nicosaporiti"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/github.png"
            alt="githubIcon"
            className={styles.iconStyle}
          />
        </a>
        <a
          href="https://www.linkedin.com/in/nicolas-jorge-saporiti-1619391a/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/linkedin.png"
            alt="linkedIN"
            className={styles.iconStyle}
          />
        </a>
        <a href="mailto:nicolas@saporiti.cl?subject=Contacto%20desde%20Blog">
          <img src="/images/email.png" alt="email" className={styles.iconStyle} />
        </a>
        <a href="/rss.xml" target="_blank" rel="noopener noreferrer" title="RSS Feed">
          <svg
            className={styles.iconStyle}
            viewBox="0 0 24 24"
            fill="#e0e0e0"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6.18" cy="17.82" r="2.18" />
            <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56z" />
            <path d="M4 10.1v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z" />
          </svg>
        </a>
      </div>
    </nav>
  );
};

export default navbar;
