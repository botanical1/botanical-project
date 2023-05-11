import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

class BotanicalDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin={'true'}
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&family=Raleway:wght@100;200;300;400;500;600;700&display=swap"
            rel="stylesheet"
          />

          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-Q86DS2ZZZ0"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-Q86DS2ZZZ0');
            `}
          </Script>

          <meta
            name="google-site-verification"
            content="BlU2L6JfPdfAPvzdUSsDsN1N7IxKRU_ei1bMYFOXiyM"
          />

          <meta
            name="p:domain_verify"
            content="fc29d8e04b501b2d38118d744131ccf1"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default BotanicalDocument;
