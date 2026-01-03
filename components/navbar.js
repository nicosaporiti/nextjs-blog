import React from "react";
import Image from "next/image";
import styles from "./navbar.module.css";
import Link from "next/link";

const navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link href="/about">
          <Image
            src="/images/about.png"
            alt="about"
            className={styles.iconStyle}
            width={24}
            height={24}
          />
      </Link>
      <a
        href="https://github.com/nicosaporiti"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/images/github.png"
          alt="githubIcon"
          className={styles.iconStyle}
          width={24}
          height={24}
        />
      </a>
      <a
        href="https://www.linkedin.com/in/nicolas-jorge-saporiti-1619391a/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/images/linkedin.png"
          alt="linkedIN"
          className={styles.iconStyle}
          width={24}
          height={24}
        />
      </a>
      <a href="mailto:nicolas@saporiti.cl?subject=Contacto%20desde%20Blog">
        <Image
          src="/images/email.png"
          alt="email"
          className={styles.iconStyle}
          width={24}
          height={24}
        />
      </a>
    </div>
  );
};

export default navbar;
