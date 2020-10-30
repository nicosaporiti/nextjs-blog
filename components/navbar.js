import React from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import Link from "next/link";

const navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link href="/about">
        <a>
          <Image
            src="/images/about.png"
            alt="about"
            unsized
            className={styles.iconStyle}
          />
        </a>
      </Link>
      <a href="https://github.com/nicosaporiti" target="_blank">
        <Image
          src="/images/github.png"
          alt="githubIcon"
          unsized
          className={styles.iconStyle}
        />
      </a>
      <a
        href="https://www.linkedin.com/in/nicolas-jorge-saporiti-1619391a/"
        target="_blank"
      >
        <Image
          src="/images/linkedin.png"
          alt="linkedIN"
          unsized
          className={styles.iconStyle}
        />
      </a>
      <a href="mailto:nicolas@saporiti.cl?subject=Contacto%20desde%20Blog">
        <Image
          src="/images/email.png"
          alt="email"
          className={styles.iconStyle}
          unsized
        />
      </a>
    </div>
  );
};

export default navbar;
