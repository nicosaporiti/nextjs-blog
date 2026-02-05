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
      </div>
    </nav>
  );
};

export default navbar;
