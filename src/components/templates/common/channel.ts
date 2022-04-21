type MonthlyPrice = {
  streaming: number;
  vip: number;
};

type Price = {
  monthly: MonthlyPrice;
  yearly: number;
};

type ContentCounts = {
  album: boolean;
  video: boolean;
  article: boolean;
  audioCategories: boolean;
  articleCategories: boolean;
  videoCategories: boolean;
};

type SubscriptionMethod = "STRIPE" | "SUPAPASS_CODE";

type CustomContentTab = {
  title: string;
};

export type ImageObject = {
  id: number;
  imageUrl: string;
  ivWidth: number;
  ivHeight: number;
};

export type Theme = {
  colourScheme: string;
  cornerRounding: number;
  fontFamily: string;
};

export type Channel = {
  active: boolean;
  artistId: number;
  appleId: string;
  artistUrl: string;
  availableSubscriptionMethods: SubscriptionMethod[];
  backgroundImageUrl: string;

  buzz: boolean;
  cleanname: string;
  counts: ContentCounts;
  customContentTabDetails: {
    articles: CustomContentTab;
    audio: CustomContentTab;
    video: CustomContentTab;
  };
  defaultTheme: "dark" | "light";
  theme: Theme;
  domain: string;
  downloads: boolean;
  eulaExternalUrl?: string;
  eulaInternalUrl?: string;
  faqExternalUrl?: string;
  faqInternalUrl?: string;
  featured: boolean;
  footerText?: string;
  hasGoogleApp: boolean;
  homepage: Object;
  imageUrl: string;
  info: string;
  isSubscribable: boolean;
  logoImage: ImageObject;
  name: string;
  premiumDesc: string;
  promoVideoUrl: string;
  promoVideoCoverUrl: string;
  promoVideoCoverImageUrl?: string;
  price: Price;
  showChannelMarketingOption: boolean;
  showSupaPassMarketingOption: boolean;
  showPoweredBySupaPass: boolean;
  supportEmailAddress?: string;
  stream: boolean;
  streamingDesc: string;
  stripeConnectedAccountId: string;
  supafans: number;
  themeColor: string;
  twitterUrl: string;
  type: boolean;
  vip: boolean;
  vipDesc: string;
  welcomeVideo: string;
  // Analytics
  facebookPixelToken?: string;
  googleAnalyticsToken?: string;
  // App Package Names
  appAppleBundleId: string;
  appGooglePackageName: string;
};
