import { useContext, createContext } from "react";
import { useChannel } from "./useChannel";
import { sizeCloudinaryImage } from "../tools/cloudinary";
import * as DisplayOptions from "./DisplayOptions";
import {
  PageBlockImageDAO,
  PageBlockOnPageDAO,
  PageBlockCommonDAO,
  PageBlockFreeformTextDAO,
  PageBlockCtaDAO,
  PageBlockSocialDAO,
  PageBlockPersonDAO,
  BackgroundTreatment,
  PageBlockCampaignDAO,
  PageDAO,
} from "../common/types";

type BlockContextType = {
  block: PageBlockOnPageDAO;
  page: PageDAO;
  selectedBlockId?: number;
  isSelected?: (blockId: number) => boolean;
  isAlignment?: (alignment: string) => boolean;
  hasBackgroundImage?: () => boolean;
  getBackgroundTreatment?: () => BackgroundTreatment;
  common?: PageBlockCommonDAO;
  people?: PageBlockPersonDAO[];
  images?: PageBlockImageDAO[];
  texts?: PageBlockFreeformTextDAO[];
  ctas?: PageBlockCtaDAO[];
  socials?: PageBlockSocialDAO[];
  campaign?: PageBlockCampaignDAO[];
};

export const BlockContext = createContext<BlockContextType>(undefined);

export default function useBlockContext() {
  const { channel } = useChannel();
  const blockContext = useContext(BlockContext);

  const pageBlock = blockContext?.block?.pageBlockCommonDAO;
  const page = blockContext?.page;

  const {
    blockType,
    layout,
    colourScheme: colourSchemeBlock,
    alignment,
  } = blockContext?.block?.pageBlockCommonDAO;

  let colourScheme =
    colourSchemeBlock ??
    page?.theme?.colourScheme ??
    page?.themeDAO?.colourScheme ??
    channel.theme?.colourScheme ??
    channel.defaultTheme ??
    "light";

  const isLayout = (layoutCheck: string) => {
    return layout === layoutCheck;
  };

  const isAlignment = (alignmentCheck: string) => {
    return alignment === alignmentCheck;
  };

  const hasBackgroundImage = () => {
    return !!pageBlock?.backgroundImageFileDAO?.imageUrl;
  };

  // const getTypeface = () => {
  //   return (
  //     page?.theme?.fontFamily ?? page?.themeDAO?.fontFamily ?? 'sans-serif'
  //   );
  // };

  const getBackgroundTreatment = (): BackgroundTreatment => {
    const backgroundUrl = pageBlock?.backgroundImageFileDAO?.imageUrl;
    const backgroundSize = backgroundUrl?.includes(".svg") ? "cover" : "cover";
    const backgroundOverlay = pageBlock?.backgroundOverlayCode;

    const getBackgroundImageCSSString = () => {
      if (pageBlock?.backgroundImageFileDAO?.imageUrl) {
        return `,url(${sizeCloudinaryImage(
          pageBlock?.backgroundImageFileDAO?.imageUrl,
          1600
        )})`;
      }
      return "";
    };

    let backgroundOverlayStrings = {
      dark: `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.8))${getBackgroundImageCSSString()}`,
      light: `linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.05))${getBackgroundImageCSSString()}`,
    };

    switch (backgroundOverlay) {
      case 0:
        backgroundOverlayStrings = {
          dark: `${getBackgroundImageCSSString().replace(",", "")}`,
          // trailing comma and leading comma break CSS rules
          light: `${getBackgroundImageCSSString().replace(",", "")}`,
        };
        break;
      case 1:
        backgroundOverlayStrings = {
          dark: `linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))${getBackgroundImageCSSString()}`,
          light: `linear-gradient(rgba(0,0,0,.05),rgba(0,0,0,.05))${getBackgroundImageCSSString()}`,
        };
        break;
      case 2:
        backgroundOverlayStrings = {
          dark: `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.3))${getBackgroundImageCSSString()}`,
          light: `linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))${getBackgroundImageCSSString()}`,
        };
        break;
      case 3:
        backgroundOverlayStrings = {
          dark: `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.8))${getBackgroundImageCSSString()}`,
          light: `linear-gradient(rgba(0,0,0,.15),rgba(0,0,0,.3))${getBackgroundImageCSSString()}`,
        };
        break;
      case 4:
        backgroundOverlayStrings = {
          dark: `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.9))${getBackgroundImageCSSString()}`,
          light: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5))${getBackgroundImageCSSString()}`,
        };
        break;
      case 5:
        backgroundOverlayStrings = {
          dark: `linear-gradient(rgba(0,0,0,.7),rgba(0,0,0,1))${getBackgroundImageCSSString()}`,
          light: `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.6))${getBackgroundImageCSSString()}`,
        };
        break;
    }

    switch (colourScheme) {
      case DisplayOptions.Themes.DARK:
        return {
          backgroundImage: backgroundOverlayStrings.dark,
          backgroundPosition:
            pageBlock?.backgroundImagePosition ?? "top center",
          backgroundSize: backgroundSize,
          backgroundRepeat: "no-repeat",
        };
      case DisplayOptions.Themes.LIGHT:
        return {
          backgroundImage: backgroundOverlayStrings.light,
          backgroundPosition:
            pageBlock?.backgroundImagePosition ?? "top center",
          backgroundSize: backgroundSize,
          backgroundRepeat: "no-repeat",
        };
    }
  };

  const getVerticalPadding = () => {
    switch (common?.padding) {
      case 0:
        return "py-0 md:py-0 lg:py-0";
      case 1:
        return "py-1 md:py-2 lg:py-12";
      case 2:
        return "py-4 md:py-8 lg:py-24";
      case 3:
        return "py-12 md:py-16 lg:py-32";
      case 4:
        return "py-16 md:py-24 lg:py-40";
      case 5:
        return "py-20 md:py-32 lg:py-56";
      default:
        return "py-20 md:py-24 lg:py-40";
    }
  };

  const getImageRounding = () => {
    switch (common?.imageRounding) {
      case 0:
        return DisplayOptions.ImageRounding.NONE;
      case 1:
        return DisplayOptions.ImageRounding.SM;
      case 2:
        return DisplayOptions.ImageRounding.MD;
      case 3:
        return DisplayOptions.ImageRounding.LG;
      case 4:
        return DisplayOptions.ImageRounding.XL;
      case 5:
        return DisplayOptions.ImageRounding.FULL;
      default:
        return DisplayOptions.ImageRounding.NONE;
    }
  };

  const getButtonRounding = () => {
    const rounding =
      channel.theme?.cornerRounding ??
      page?.theme?.cornerRounding ??
      page?.themeDAO?.cornerRounding;

    switch (rounding) {
      case 0:
        return DisplayOptions.ButtonRounding.NONE;
      case 1:
        return DisplayOptions.ButtonRounding.SM;
      case 2:
        return DisplayOptions.ButtonRounding.MD;
      case 3:
        return DisplayOptions.ButtonRounding.LG;
      case 4:
        return DisplayOptions.ButtonRounding.XL;
      case 5:
        return DisplayOptions.ButtonRounding.FULL;
    }
  };

  const common = pageBlock;
  const people = pageBlock.pageBlockPersonDAOs;
  const texts = pageBlock.pageBlockFreeformTextDAOs;
  const images = pageBlock.pageBlockImageDAOs;
  const ctas = pageBlock.pageBlockCtaDAOs;
  const socials = pageBlock.pageBlockSocialDAOs;
  const campaign = pageBlock.pageBlockCampaignDAOs;

  return {
    ...blockContext,
    blockType,
    layout,
    colourScheme,
    common,
    people,
    texts,
    images,
    ctas,
    socials,
    campaign,
    isAlignment,
    isLayout,
    hasBackgroundImage,
    getBackgroundTreatment,
    getVerticalPadding,
    getImageRounding,
    getButtonRounding,
    // getTypeface,
  };
}
