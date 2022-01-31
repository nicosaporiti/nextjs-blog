import React from "react";
import styles from "./tipButton.module.css";

export const tipButton = ({ post }) => {
  const url = process.env.NEXT_PUBLIC_BTC_URL + "Blog Post: " +  post;

  return (
    <div>
      <a className={styles.btc_button} href={url} target="_blank">
        Donar 1 USD con BTC ⚡
      </a>
    </div>
  );
};
