import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        language: "日本語",
        byOneAnime: "By 1anime"
      },
      // Hero Section
      hero: {
        title: "The Ultimate Anime & Manga Experience",
        tagline: "The Future of Anime & Manga Discovery",
        subtitle: "Track, Discover & Share Your Journey",
        description: "Join thousands of anime fans in the most comprehensive tracking platform. Sync with AniList, discover new favorites, and connect with the community.",
        downloadButton: "Get the App",
        watchDemo: "Watch Demo",
        scrollHint: "Scroll to explore"
      },
      // Introduction Section
      intro: {
        passion: "Born from Passion",
        passionDesc: "Created by anime and manga enthusiasts who understand the community's needs",
        community: "Community First", 
        communityDesc: "Built to connect otaku worldwide and share the love for Japanese culture",
        innovation: "Cutting Edge",
        innovationDesc: "Using the latest technology to enhance your anime and manga experience",
        subtitle: "We believe every otaku deserves a platform that truly understands their passion",
        mainText: "In a world filled with generic streaming services and basic tracking apps, we saw the need for something different. Something that speaks the language of true anime and manga fans."
      },
      // Comparison Section
      comparison: {
        customProfiles: "Custom Anime Profiles",
        aiRecommendations: "AI-Powered Recommendations", 
        mangaTracking: "Advanced Manga Tracking",
        socialFeatures: "Rich Social Features",
        crossPlatform: "Cross-Platform Sync",
        offlineMode: "Offline Mode",
        communityEvents: "Community Events",
        customization: "Deep Customization",
        subtitle: "See how we stack up against the most popular anime and manga platforms",
        winner: "Zantaku leads with 8/8 features"
      },
      // Popular Media Section
      popular: {
        subtitle: "Trending Now on Zantaku",
        title: "Discover Popular Anime",
        clickToFlip: "Click to flip",
        tap: "Tap",
        clickToSeeCover: "Click to see cover",
        episodes: "Episodes",
        chapters: "Chapters",
        previousAnime: "Previous anime",
        nextAnime: "Next anime"
      },
      // Features Section
      features: {
        // New features section
        aiRecommendations: "AI-Powered Recommendations",
        aiDesc: "Get personalized anime and manga suggestions based on your unique taste profile",
        socialConnect: "Social Connection", 
        socialDesc: "Connect with fellow otaku, share reviews, and discover through your community",
        offlineFirst: "Offline-First Design",
        offlineDesc: "Access your lists, read reviews, and browse content even without internet",
        crossPlatform: "Cross-Platform Sync",
        crossDesc: "Seamlessly sync across all your devices",
        releaseTracker: "Release Tracker",
        releaseDesc: "Never miss new episodes or chapters", 
        customProfilesNew: "Custom Profiles",
        profileDesc: "Express your otaku identity with style",
        mangaReader: "Built-in Manga Reader",
        readerDesc: "Read manga with our optimized reader",
        gamification: "Gamified Experience", 
        gameDesc: "Earn badges and level up your otaku status",
        privacy: "Privacy-First",
        privacyDesc: "Your data stays yours, always",
        subtitle: "A complete ecosystem designed for the modern otaku experience",
        bottom: "And this is just the beginning. We're constantly adding new features based on community feedback.",
        // New comparison design
        title: 'Features',
        modernOtaku: 'Who\'s Really Built for the Modern Otaku?',
        comparisonSubtitle: 'An honest look at what each platform actually delivers',
        
        contentLibrary: 'Content Library',
        contentLibraryDesc: 'Variety and depth of anime, manga, novels, and webtoons',
        anilistIntegration: 'AniList Integration',
        anilistIntegrationDesc: 'How deeply AniList tracking is built into the experience',
        userExperience: 'User Experience', 
        userExperienceDesc: 'Interface polish, ease of use, and overall app quality',
        
        outOf10: '/10',
        
        allFormats: 'All formats',
        animeOnly: 'Anime only',
        extensionBased: 'Extension-based',
        streamingOnly: 'Streaming only',
        
        nativeClient: 'Native client',
        noIntegration: 'No integration',
        basicSync: 'Basic sync',
        
        modernUI: 'Modern UI',
        polishedApp: 'Polished app',
        powerUser: 'Power user',
        basicInterface: 'Basic interface',
        
        overallBest: 'Overall Best',
        awardContext: 'Awarded by our community for best all-in-one anime experience',
        
        whyWeWin: 'Why We Win',
        crossPlatformShort: 'Cross-platform',
        noAds: 'No ads',
        nativeSync: 'Native sync',
        freeTier: 'Free tier',
        
        // Feature cards
        discover: "Discover",
        discoverDesc: "Explore your favorite anime and manga while discovering exciting new series perfectly tailored to your interests with our AI-powered recommendation engine.",
        readWatch: "Read & Watch",
        readWatchDesc: "Enjoy a seamless reading and watching experience with our curated collection. Premium content without premium pricing, all in one place.",
        syncShare: "Sync & Share",
        syncShareDesc: "Connect with AniList to track your progress, showcase your collection, and discover what other fans are enjoying in real-time.",
        // Main titles
        everythingYouNeed: "Everything You Need in",
        onePlace: "One Place",
        experienceTheFuture: "Experience the future of anime and manga tracking with our comprehensive platform",
        whyZantaku: "なぜ Zantaku なのか？",
        compareZantaku: "Compare Zantaku against the competition and see why we're the ultimate choice for anime & manga enthusiasts",
        // Discover section
        discoverMainTitle: "Discover",
        animeAndManga: "Anime & Manga",
        likeNeverBefore: "Like Never Before",
        discoverMainDesc: "Zantaku brings you a revolutionary platform to track, discover, and share your anime and manga journey. Our curated content and personalized recommendations help you find your next favorite series.",
        // Three feature highlight boxes
        japaneseQuality: "Japanese Quality",
        japaneseQualityDesc: "日本の品質",
        instantSync: "Instant Sync",
        instantSyncDesc: "瞬間同期",
        beautifulExp: "Beautiful Experience",
        beautifulExpDesc: "美しい体験",
        // Comparison table
        features: "Features",
        cost: "Cost",
        crossPlatformSyncTable: "Cross-Platform Sync",
        aiPoweredRecommendations: "AI-Powered Recommendations",
        contentSupport: "Content Support",
        communitySocial: "Community & Social",
        anilistExperience: "AniList Experience",
        setupMaintenance: "Setup & Maintenance",
        platformFocus: "Platform Focus",
        contentAccess: "Content Access",
        // Comparison table values
        ultimateAnilistClient: "ULTIMATE ANILIST CLIENT",
        subscriptionGiant: "Subscription Giant",
        hundredPercentFree: "100% Free",
        crunchyrollPrice: "$7.99-14.99/mo",
        free: "Free",
        comingSoonFullEcosystem: "Coming Soon - Full Ecosystem",
        internalOnlyTracking: "Internal-only tracking",
        androidOnly: "Android only",
        noExternalSync: "No external sync",
        inDevelopment: "In Development",
        editorialTrendingContent: "Editorial & trending content",
        none: "None",
        latestEpisodesOnly: "Latest episodes only",
        animeMangaNovelsWebtoons: "Anime + Manga + Novels + Webtoons",
        animeLimitedManga: "Anime + limited manga",
        extensionDependentQuality: "Extension-dependent quality",
        animeStreamingOnly: "Anime streaming only",
        anilistIntegrationForumsPlanned: "AniList integration + forums planned",
        episodeComments: "Episode comments",
        noSocialFeatures: "No social features",
        nativeAnilistClient: "Native AniList client",
        separatePlatform: "Separate platform",
        communityForkSync: "Community fork sync",
        noAnilistIntegration: "No AniList integration",
        anilistLoginOnly: "AniList login only",
        accountRegistration: "Account registration",
        userManagedExtensions: "User-managed extensions",
        installAndStream: "View and track",
        anilistEcosystemEnhancement: "AniList ecosystem enhancement",
        licensedContentPlatform: "Licensed content platform",
        communityDrivenForks: "Community-driven forks",
        regionalAnimeStreaming: "Regional anime streaming",
        unifiedAnilistLibrary: "Unified AniList library",
        geographicLicensing: "Geographic licensing",
        extensionSourceDependent: "Extension source dependent",
        regionalAnimeCatalog: "Regional anime catalog",
        // Bottom feature cards
        bottomUltimateTitle: "The Ultimate AniList Client",
        bottomUltimateDesc: "Not just an AniList tracker - Zantaku IS your complete AniList experience with anime, manga, novels, and webtoons all in one place.",
        bottomContentTitle: "All Content Types",
        bottomContentDesc: "Anime, Manga, Light Novels, Webtoons, Manhua - everything from your AniList, seamlessly integrated in one beautiful app.",
        bottomTrackingTitle: "Beyond Basic Tracking",
        bottomTrackingDesc: "While others just track your progress, Zantaku is building the future - AI recommendations, cross-platform sync, and community features.",
        // New comparison graph
        comparison: "Comparison",
        fullSupport: "Full Content Support",
        nativeExperience: "Native Experience",
        seamlessExperience: "Seamless Experience",
        overallWinner: "Overall Winner",
        bestChoice: "The Best Choice for Anime & Manga Enthusiasts",
        contentSupportDesc: "Zantaku supports all content types from your AniList, including anime, manga, light novels, and webtoons.",
        anilistExperienceDesc: "Experience AniList as it was meant to be, with native integration and enhanced features.",
        modernExperience: "Modern Experience",
        modernExperienceDesc: "Enjoy a beautiful, intuitive interface designed for the ultimate anime and manga experience."
      },
      // Call to Action
      cta: {
        title: "Ready to Join the Revolution?",
        titleHighlight: "Revolution",
        subtitle: "Don't let another great anime slip by unnoticed. Start your ultimate otaku journey today.",
        buttonText: "Unleash Your Destiny",
        buttonSubtext: "運命を解き放て",
        discordButton: "Join Discord",
        discordSubtext: "Community & Support",
        earlyUsers: "Early Users",
        rating: "App Rating",
        uptime: "Uptime",
        finalMessage: "Join thousands of otaku who have already discovered their new favorite anime and manga through Zantaku. Your next obsession is waiting."
      },
      // Footer
      footer: {
        about: "About",
        ourStory: "Our Story",
        team: "Team",
        careers: "Careers",
        press: "Press",
        features: "Features",
        animeTracking: "Anime Tracking",
        mangaLibrary: "Manga Library",
        customLists: "Custom Lists",
        recommendations: "Recommendations",
        support: "Support",
        helpCenter: "Help Center",
        community: "Community",
        contactUs: "Contact Us",
        feedback: "Feedback",
        legal: "Legal",
        termsOfService: "Terms of Service",
        privacyPolicy: "Privacy Policy",
        cookiePolicy: "Cookie Policy",
        contentGuidelines: "Content Guidelines",
        copyright: "© {{year}} Zantaku. All rights reserved.",
        description: "Zantaku is a community-driven platform for anime and manga enthusiasts. We're committed to providing the best experience for fans worldwide."
      }
    }
  },
  ja: {
    translation: {
      nav: {
        language: "English",
        byOneAnime: "By 1anime"
      },
      hero: {
        title: "究極のアニメ・マンガ体験",
        subtitle: "追跡・発見・共有の旅",
        description: "最も包括的な追跡プラットフォームで数千人のアニメファンと一緒に参加しましょう。AniListと同期し、新しいお気に入りを発見し、コミュニティとつながりましょう。",
        downloadButton: "アプリを入手",
        watchDemo: "デモを見る",
        scrollHint: "スクロールして探索"
      },
      popular: {
        subtitle: "Zantakuでトレンド中",
        title: "人気アニメを発見",
        clickToFlip: "クリックして反転",
        tap: "タップ",
        clickToSeeCover: "クリックしてカバーを見る",
        episodes: "エピソード",
        chapters: "チャプター",
        previousAnime: "前のアニメ",
        nextAnime: "次のアニメ"
      },
      features: {
        // New comparison design
        title: '機能',
        modernOtaku: '現代のオタクのために作られたのは誰？',
        comparisonSubtitle: '各プラットフォームが実際に提供するものを正直に見る',
        
        contentLibrary: 'コンテンツライブラリ',
        contentLibraryDesc: 'アニメ、マンガ、小説、ウェブトゥーンの多様性と深さ',
        anilistIntegration: 'AniList統合',
        anilistIntegrationDesc: 'AniList追跡が体験にどれだけ深く組み込まれているか',
        userExperience: 'ユーザー体験', 
        userExperienceDesc: 'インターフェースの洗練度、使いやすさ、全体的なアプリ品質',
        
        outOf10: '/10',
        
        allFormats: '全フォーマット',
        animeOnly: 'アニメのみ',
        extensionBased: 'エクステンション型',
        streamingOnly: 'ストリーミングのみ',
        
        nativeClient: 'ネイティブクライアント',
        noIntegration: '統合なし',
        basicSync: '基本同期',
        
        modernUI: 'モダンUI',
        polishedApp: '洗練されたアプリ',
        powerUser: 'パワーユーザー',
        basicInterface: '基本インターフェース',
        
        overallBest: '総合最優秀',
        awardContext: '最高のオールインワンアニメ体験としてコミュニティから受賞',
        
        whyWeWin: 'なぜ私たちが勝つのか',
        crossPlatform: 'クロスプラットフォーム',
        noAds: '広告なし',
        nativeSync: 'ネイティブ同期',
        freeTier: '無料プラン',
        discoverTitle: "発見",
        discoverSubtitle: "アニメ・マンガ",
        discoverDescription: "Zantakuは、あなたのアニメやマンガの旅を追跡、発見、共有するための革新的なプラットフォームを提供します。厳選されたコンテンツと個人化された推奨事項により、次のお気に入りシリーズを見つけることができます。",
        ultimateClient: "究極のAniListクライアント",
        ultimateClientDesc: "単なるAniListトラッカーではありません - Zantakuは、アニメ、マンガ、小説、ウェブトゥーンを一箇所にまとめた完全なAniList体験です。",
        allContentTypes: "すべてのコンテンツタイプ",
        allContentTypesDesc: "アニメ、マンガ、ライトノベル、ウェブトゥーン、マンファ - AniListのすべてが美しいアプリに統合されています。",
        beyondTracking: "基本的な追跡を超えて",
        beyondTrackingDesc: "他のアプリが進捗を追跡するだけの中、ZantakuはAI推奨、クロスプラットフォーム同期、コミュニティ機能で未来を構築しています。",
        // Feature cards
        discover: "発見",
        discoverDesc: "AI推奨エンジンで、あなたの興味に完璧に合わせた新しいシリーズを発見しながら、お気に入りのアニメやマンガを探索しましょう。",
        readWatch: "読む・観る",
        readWatchDesc: "厳選されたコレクションでシームレスな読書・視聴体験をお楽しみください。プレミアム価格なしでプレミアムコンテンツを、すべて一箇所で。",
        syncShare: "同期・共有",
        syncShareDesc: "AniListと連携して進捗を追跡し、コレクションを披露し、他のファンがリアルタイムで楽しんでいることを発見しましょう。",
        // Main titles
        everythingYouNeed: "必要なすべてが",
        onePlace: "一箇所に",
        experienceTheFuture: "包括的なプラットフォームでアニメとマンガ追跡の未来を体験してください",
        whyZantaku: "なぜ Zantaku なのか？",
        compareZantaku: "Zantakuを競合他社と比較し、なぜアニメ・マンガ愛好家にとって究極の選択なのかをご覧ください",
        // Discover section
        discoverMainTitle: "発見",
        animeAndManga: "アニメ・マンガ",
        likeNeverBefore: "これまでにない体験",
        discoverMainDesc: "Zantakuは、あなたのアニメやマンガの旅を追跡、発見、共有するための革新的なプラットフォームを提供します。厳選されたコンテンツと個人化された推奨事項により、次のお気に入りシリーズを見つけることができます。",
        // Three feature highlight boxes  
        japaneseQuality: "日本の品質",
        japaneseQualityDesc: "Japanese Quality",
        instantSync: "瞬間同期", 
        instantSyncDesc: "Instant Sync",
        beautifulExp: "美しい体験",
        beautifulExpDesc: "Beautiful Experience",
        // Comparison table
        features: "機能",
        cost: "料金",
        crossPlatformSync: "クロスプラットフォーム同期",
        aiPoweredRecommendations: "AI推奨機能",
        contentSupport: "コンテンツサポート",
        communitySocial: "コミュニティ・ソーシャル",
        anilistExperience: "AniList体験",
        setupMaintenance: "セットアップ・メンテナンス",
        platformFocus: "プラットフォーム重点",
        contentAccess: "コンテンツアクセス",
        // Comparison table values
        ultimateAnilistClient: "究極のANILISTクライアント",
        subscriptionGiant: "サブスクリプション大手",
        hundredPercentFree: "100%無料",
        crunchyrollPrice: "¥1,200-2,200/月",
        free: "無料",
        comingSoonFullEcosystem: "近日公開 - 完全エコシステム",
        internalOnlyTracking: "内部追跡のみ",
        androidOnly: "Androidのみ",
        noExternalSync: "外部同期なし",
        inDevelopment: "開発中",
        editorialTrendingContent: "編集・トレンドコンテンツ",
        none: "なし",
        latestEpisodesOnly: "最新エピソードのみ",
        animeMangaNovelsWebtoons: "アニメ + マンガ + 小説 + ウェブトゥーン",
        animeLimitedManga: "アニメ + 限定マンガ",
        extensionDependentQuality: "エクステンション依存品質",
        animeStreamingOnly: "アニメストリーミングのみ",
        anilistIntegrationForumsPlanned: "AniList統合 + フォーラム予定",
        episodeComments: "エピソードコメント",
        noSocialFeatures: "ソーシャル機能なし",
        nativeAnilistClient: "ネイティブAniListクライアント",
        separatePlatform: "別プラットフォーム",
        communityForkSync: "コミュニティフォーク同期",
        noAnilistIntegration: "AniList統合なし",
        anilistLoginOnly: "AniListログインのみ",
        accountRegistration: "アカウント登録",
        userManagedExtensions: "ユーザー管理エクステンション",
        installAndStream: "表示・追跡",
        anilistEcosystemEnhancement: "AniListエコシステム強化",
        licensedContentPlatform: "ライセンスコンテンツプラットフォーム",
        communityDrivenForks: "コミュニティ主導フォーク",
        regionalAnimeStreaming: "地域別アニメストリーミング",
        unifiedAnilistLibrary: "統一AniListライブラリ",
        geographicLicensing: "地理的ライセンス",
        extensionSourceDependent: "エクステンションソース依存",
        regionalAnimeCatalog: "地域別アニメカタログ",
        // Bottom feature cards
        bottomUltimateTitle: "究極のAniListクライアント",
        bottomUltimateDesc: "単なるAniListトラッカーではありません - Zantakuは、アニメ、マンガ、小説、ウェブトゥーンを一箇所にまとめた完全なAniList体験です。",
        bottomContentTitle: "すべてのコンテンツタイプ",
        bottomContentDesc: "アニメ、マンガ、ライトノベル、ウェブトゥーン、マンファ - AniListのすべてが美しいアプリに統合されています。",
        bottomTrackingTitle: "基本的な追跡を超えて",
        bottomTrackingDesc: "他のアプリが進捗を追跡するだけの中、ZantakuはAI推奨、クロスプラットフォーム同期、コミュニティ機能で未来を構築しています。",
        // New comparison graph
        comparison: "比較",
        fullSupport: "完全なコンテンツサポート",
        nativeExperience: "ネイティブ体験",
        seamlessExperience: "シームレスな体験",
        overallWinner: "総合優勝者",
        bestChoice: "アニメ・マンガ愛好家のための最良の選択",
        contentSupportDesc: "Zantakuはアニメ、マンガ、ライトノベル、ウェブトゥーンなど、AniListのすべてのコンテンツタイプをサポートしています。",
        anilistExperienceDesc: "ネイティブ統合と強化された機能で、AniListを本来あるべき姿で体験できます。",
        modernExperience: "モダンな体験",
        modernExperienceDesc: "究極のアニメとマンガ体験のために設計された、美しく直感的なインターフェースをお楽しみください。"
      },
      cta: {
        title: "革命に参加する準備はできましたか？",
        titleHighlight: "革命",
        subtitle: "次世代のアニメ・マンガ体験の一部になりましょう。早期アクセスが利用可能です。",
        buttonText: "運命を解き放て",
        buttonSubtext: "Unleash Your Destiny",
        discordButton: "Discordに参加",
        discordSubtext: "コミュニティ・サポート"
      },
      footer: {
        about: "について",
        ourStory: "私たちの物語",
        team: "チーム",
        careers: "採用情報",
        press: "プレス",
        features: "機能",
        animeTracking: "アニメ追跡",
        mangaLibrary: "マンガライブラリ",
        customLists: "カスタムリスト",
        recommendations: "推奨事項",
        support: "サポート",
        helpCenter: "ヘルプセンター",
        community: "コミュニティ",
        contactUs: "お問い合わせ",
        feedback: "フィードバック",
        legal: "法的事項",
        termsOfService: "利用規約",
        privacyPolicy: "プライバシーポリシー",
        cookiePolicy: "クッキーポリシー",
        contentGuidelines: "コンテンツガイドライン",
        copyright: "© {{year}} Zantaku. All rights reserved.",
        description: "Zantakuは、アニメとマンガの愛好家のためのコミュニティ主導のプラットフォームです。世界中のファンに最高の体験を提供することをお約束します。"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    detection: {
      // Order of language detection
      order: ['localStorage', 'navigator', 'htmlTag'],
      // Keys to lookup language from
      lookupLocalStorage: 'zantaku-language',
      // Cache user language
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    // Namespace configuration
    defaultNS: 'translation',
    ns: ['translation'],
  });

export default i18n; 