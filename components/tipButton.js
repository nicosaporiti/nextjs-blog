import React from "react";
import styles from "./tipButton.module.css";

export const tipButton = () => {
  const url = process.env.NEXT_PUBLIC_BTC_URL;

  return (
    <div>
      <a className={styles.btc_button} href={"lightning:nicolas.saporiti@rayito.app"} target="_blank">
        Donar BTC con Rayito.app ⚡ 
      </a>
    </div>
  );
};
