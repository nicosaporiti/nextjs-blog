import React from "react";
import styles from "./navbar.module.css";

const navbar = () => {
  return (
    <div className={styles.navbar}>
      <a href="https://github.com/nicosaporiti" target="_blank">
        <img
          src="/images/github.png"
          alt="githubIcon"
          className={styles.iconStyle}
        />
      </a>
      <a
        href="https://www.linkedin.com/in/nicolas-jorge-saporiti-1619391a/"
        target="_blank"
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
  );
};

export default navbar;
