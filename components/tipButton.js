import React from 'react';
import styles from './tipButton.module.css';

export const tipButton = () => {
  const url = process.env.NEXT_PUBLIC_BTC_URL;

  return (
    <div>
      <a
        className={styles.btc_button}
        href={'https://payments.saporiti.cl/'}
        target='_blank'
      >
        Donar Sats con LN ⚡
      </a>
    </div>
  );
};
