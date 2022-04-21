import { Channel } from "./channel";

export type ChannelResponseWithLandingPage = Channel & {
  landingPage: PageDAO;
};

export interface PageBlockImageDAO {
  createdDate: Date;
  updatedDate: Date;
  imageFileDAO: FileDAO;
  caption: string;
  id: number;
  position: number;
  // updatedByDAO: UserDAO;
  pageBlockCommonDAO: PageBlockCommonDAO;
  // createdByDAO: UserDAO;
}

export interface PageBlockSocialDAO {
  // createdByDAO: UserDAO;
  position: number;
  id: number;
  platform: string;
  // updatedByDAO: UserDAO;
  updatedDate: Date;
  accountId: string;
  createdDate: Date;
  pageBlockCommonDAO: PageBlockCommonDAO;
}

export interface PageBlockCampaignDAO {
  id: number;
  title: string;
  subtitle: string;
  showTelephone: boolean;
  customButtonText: string;
  showLastName: boolean;
  showFirstName: boolean;
  description: string;
  additionalContactInfo: string;
  showSocialLinks: boolean;
  campaignDAO?: PageBlockCampaignDAO;
  campaignId?: number;
}

export interface PageBlockCommonDAO {
  alignment: string;
  backgroundOverlayCode: number;
  background: string;
  backgroundImageFileDAO: FileDAO;
  subtitle: string;
  updatedDate: Date;
  imageRounding: number;
  // createdByDAO: UserDAO;
  title: string;
  backgroundImagePosition: string;
  hidden: boolean;
  // channelDAO: ChannelDAO;
  blockType: string;
  id: number;
  colourScheme: string;
  layout: string;
  kicker: string;
  createdDate: Date;
  padding: number;
  pageBlockCtaDAOs: PageBlockCtaDAO[];
  pageBlockFreeformTextDAOs: PageBlockFreeformTextDAO[];
  pageBlockImageDAOs: PageBlockImageDAO[];
  pageBlockPersonDAOs: PageBlockPersonDAO[];
  pageBlockSocialDAOs: PageBlockSocialDAO[];
  pageBlockCampaignDAOs: PageBlockCampaignDAO[];
}

export interface PageBlockCtaDAO {
  position: number;
  // createdByDAO: UserDAO;
  // updatedByDAO: UserDAO;
  pageBlockCommonDAO: PageBlockCommonDAO;
  ctaUrl: string;
  prominence: number;
  createdDate: Date;
  updatedDate: Date;
  id: number;
  ctaText: string;
}

export interface CampaignDAO {
  id: number;
  title: string;
  showTelephone: boolean;
  customButtonText: string;
  showLastName: boolean;
  showFirstName: boolean;
  description: string;
  additionalContactInfo: string;
  showSocialLinks: boolean;
}

export interface FileDAO {
  id: number;
  uploadedFilename?: string | null;
  originalFileExtension: string;
  originalFileSize?: number | null;
  ivWidth?: number | null;
  ivHeight?: number | null;
  avDuration?: number | null;
  contentTypeDAO: { code: string };

  readonly imageUrl?: string;
}

export interface PageBlockPersonDAO {
  position: number;
  id: number;
  pageBlockCommonDAO: PageBlockCommonDAO;
  quote: string;
  imageFileDAO: FileDAO;
  updatedDate: Date;
  // updatedByDAO: UserDAO;
  ctaUrl: string;
  // createdByDAO: UserDAO;
  reviewRating: number;
  role: string;
  ctaText: string;
  name: string;
  createdDate: Date;
}

export interface PageBlockFreeformTextDAO {
  createdDate: Date;
  // createdByDAO: UserDAO;
  pageBlockCommonDAO: PageBlockCommonDAO;
  // updatedByDAO: UserDAO;
  text: string; // HTML ?
  updatedDate: Date;
  id: number;
}

export interface PageBlockOnPageDAO {
  pageBlockCommonDAO: PageBlockCommonDAO;
  position: number;
  id: number;
}

interface ThemeDAO {
  colourScheme: string;
  cornerRounding: number;
  fontFamily: string;
}

export interface PageDAO {
  // facebookOgDescription?: string;
  // facebookOgImage?: string;
  // facebookOgTitle?: string;
  facebookOgImageFileDAO: FileDAO;
  metaDescription?: string;
  pageTitle?: string;
  theme?: ThemeDAO;
  themeDAO?: ThemeDAO;
  pageBlockOnPageDAOs?: PageBlockOnPageDAO[];
}

export type BackgroundTreatment = {
  backgroundImage: string;
  backgroundPosition: string;
  backgroundSize: string;
  backgroundRepeat: string;
};
