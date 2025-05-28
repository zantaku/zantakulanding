export const siteConfig = {
  title: 'Zantaku - Discover, Track & Dive Into Anime & Manga',
  description: 'Zantaku is where the next generation of anime fans come together to discover, track, and dive into anime and manga.',
  url: 'https://zantaku.com',
  ogImage: '/asset/zantakulogotypes_Facebook-OG.png',
  twitterImage: '/asset/zantakulogotypes_Twitterlargesummary.png',
  keywords: 'anime, manga, anime platform, watch anime, read manga, anime tracker, AniList sync, anime community, otaku, Japanese culture, anime fans, anime social network',
  author: 'Zantaku',  
  twitterHandle: '@zantaku',
};

export const defaultSEO = {
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    site_name: siteConfig.title,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    handle: siteConfig.twitterHandle,
    site: siteConfig.twitterHandle,
    cardType: 'summary_large_image',
    images: [siteConfig.twitterImage],
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: siteConfig.keywords,
    },
    {
      name: 'author',
      content: siteConfig.author,
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#FF69B4',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      name: 'googlebot',
      content: 'index, follow',
    },
    {
      name: 'rating',
      content: 'General',
    },
  ],
};
