import '../styles/global.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../contexts/themeContext';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

const GA_ID = 'G-PXKER2TTH1';

export default function App({ Component, pageProps }) {
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
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
