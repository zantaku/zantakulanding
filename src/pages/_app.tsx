import { AppProps } from 'next/app';
import Head from 'next/head';
import { defaultSEO } from '../lib/seo';
import { ENABLE_ADSENSE_IN_DEV } from '../config/analytics';

function MyApp({ Component, pageProps }: AppProps) {
  // Check if AdSense should be loaded based on environment
  const shouldLoadAdSense = process.env.NODE_ENV === 'production' || ENABLE_ADSENSE_IN_DEV;

  return (
    <>
      <Head>
        <title>{defaultSEO.title}</title>
        <meta name="description" content={defaultSEO.description} />
        
        {/* Google AdSense - Only load in production or if explicitly enabled in dev */}
        {shouldLoadAdSense && (
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7036570320623661" crossOrigin="anonymous"></script>
        )}
        
        {/* Favicon Configuration */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* PWA Meta Tags */}
        <meta name="application-name" content="Zantaku" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Zantaku" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#FF69B4" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#FF69B4" />
        
        {/* Open Graph */}
        <meta property="og:type" content={defaultSEO.openGraph.type} />
        <meta property="og:locale" content={defaultSEO.openGraph.locale} />
        <meta property="og:url" content={defaultSEO.openGraph.url} />
        <meta property="og:title" content={defaultSEO.openGraph.title} />
        <meta property="og:description" content={defaultSEO.openGraph.description} />
        <meta property="og:site_name" content={defaultSEO.openGraph.site_name} />
        <meta property="og:image" content={defaultSEO.openGraph.images[0].url} />
        <meta property="og:image:width" content={defaultSEO.openGraph.images[0].width.toString()} />
        <meta property="og:image:height" content={defaultSEO.openGraph.images[0].height.toString()} />
        <meta property="og:image:alt" content={defaultSEO.openGraph.images[0].alt} />
        
        {/* Twitter */}
        <meta name="twitter:card" content={defaultSEO.twitter.cardType} />
        <meta name="twitter:site" content={defaultSEO.twitter.site} />
        <meta name="twitter:creator" content={defaultSEO.twitter.handle} />
        <meta name="twitter:title" content={defaultSEO.title} />
        <meta name="twitter:description" content={defaultSEO.description} />
        <meta name="twitter:image" content={defaultSEO.twitter.images[0]} />
        
        {/* Additional Meta Tags */}
        {defaultSEO.additionalMetaTags.map((tag, index) => (
          <meta key={index} name={tag.name} content={tag.content} />
        ))}
        
        {/* Canonical URL */}
        <link rel="canonical" href={defaultSEO.openGraph.url} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp; 