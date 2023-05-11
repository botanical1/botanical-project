import 'keen-slider/keen-slider.min.css';
import 'ka-table/style.css';
import './styles.css';

import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

import { Footer, Header, Spinner } from '@shopify/components';
import { MenuBasicModel } from '@shopify/models';
import { storefront } from '@shopify/utilities';
import { menuQuery } from '@shopify/graphql-queries';
import { NextPage } from 'next';
import { useUserStore } from '@shopify/state';
import { useRouter } from 'next/router';
import Script from 'next/script';

interface Props extends AppProps {
  menuData: MenuBasicModel;
}

const ShopifyApp: NextPage<Props> = ({
  Component,
  pageProps,
  menuData,
}: Props) => {
  const userStore = useUserStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    userStore.getUser();
    router.events.on('routeChangeStart', () => {
      setLoading(true);
    });

    router.events.on('routeChangeComplete', () => {
      setLoading(false);
    });

    router.events.on('routeChangeError', () => {
      setLoading(false);
    });
  }, []);

  return (
    <>
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
      <Head>
        <title>Yas Natural Solutions</title>
        <link rel="shortcut icon" href="/images/mstile-144x144.png" />
        {/* google merchant center */}
        <meta
          name="google-site-verification"
          content="BlU2L6JfPdfAPvzdUSsDsN1N7IxKRU_ei1bMYFOXiyM"
        />
        {/* pinterest */}
        <meta
          name="p:domain_verify"
          content="fc29d8e04b501b2d38118d744131ccf1"
        />
      </Head>
      <main>
        {loading && (
          <div className="absolute w-screen h-screen l-0 top-0 z-[1000] backdrop-blur-sm bg-white/10 flex justify-center items-center">
            <div className="flex justify-center items-center h-screen">
              <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-200 rounded-full border-2 border-white"></div>
              </div>
            </div>
          </div>
        )}

        <Header menu={menuData.menu?.items} />

        <Component {...pageProps} />
        <Footer />
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{ duration: 5000, style: { fontSize: 14 } }}
        />
      </main>
    </>
  );
};

ShopifyApp.getInitialProps = async ({ req, res }) => {
  res &&
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
    );

  const data = await storefront<any>(menuQuery);

  return {
    menuData: data.data,
  } as any;
};

export default ShopifyApp;
