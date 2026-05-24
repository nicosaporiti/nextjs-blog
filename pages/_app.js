import '../styles/global.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../contexts/themeContext';
import Script from 'next/script';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GA_ID, sendPageView } from '../lib/gtag';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      sendPageView(router.asPath, pageProps);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [router.asPath, router.isReady]);

  return (
    <ThemeProvider>
      <div className={inter.className}>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);}
            window.gtag('js', new Date());
            window.gtag('config', '${GA_ID}', { send_page_view: false });
          `}
        </Script>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
