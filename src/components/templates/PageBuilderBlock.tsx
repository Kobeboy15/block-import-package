import BlockSection from "./TemplateBlocks/BlockSection";
import { BlockContext } from "./hooks/useBlockContext";
import { PageBlockOnPageDAO, PageDAO } from "./common/types";
import BlockAppStore from "./TemplateBlocks/BlockAppStore";

type BlockAction = {
  action: string;
  id: number;
};

type PageBuilderBlockProps = {
  page: PageDAO;
  block?: PageBlockOnPageDAO;
  postMessage?: (message: BlockAction) => void;
  isEditMode?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
};

export default function PageBuilderBlock({
  block,
  page,
  postMessage,
  isEditMode = false,
  isSelected = false,
  isDisabled = false,
}: PageBuilderBlockProps) {
  if (!block) return null;

  return (
    <BlockContext.Provider
      value={{
        block,
        page,
      }}
    >
      <BlockSection
        isSelected={isSelected}
        isDisabled={isDisabled}
        blockType={block?.pageBlockCommonDAO?.blockType}
      >
        {/* <BlockHeader />
        <BlockText />
        <BlockTestimonials />
        <BlockSocial />
        <BlockPeople />
        <BlockImages /> */}
        <BlockAppStore />
        {/* <BlockContactForm /> */}
        {/* This is about campaign */}
        {/* <BlockCampaign /> */}
        {/* {block?.pageBlockCommonDAO?.blockType === "promoVideo" && (
          <PromoVideoPlayer />
        )} */}
        {/* <BlockEditControls
          onClick={postMessage}
          isEditMode={isEditMode}
          isSelected={isSelected}
          isDisabled={isDisabled}
          isTopBlock={block.position === 1}
        /> */}
      </BlockSection>
    </BlockContext.Provider>
  );
}
