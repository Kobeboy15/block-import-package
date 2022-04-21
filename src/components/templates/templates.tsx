import React from "react";
import { PageBlockOnPageDAO, PageDAO } from "./common/types";
import PageBuilderBlock from "./PageBuilderBlock";

type BlockAction = {
  action: string;
  id: number;
};

export interface TemplateProps {
  blocks?: any;
  page: PageDAO;
  block?: PageBlockOnPageDAO;
  postMessage?: (message: BlockAction) => void;
  isEditMode?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  postMessageToPreviewHost: any;
  previewParams: any;
  selectedBlockId: number;
}

const Button = (props: TemplateProps) => {
  return (
    <>
      {props.blocks.map((block: { id: number }, index: any) => (
        <PageBuilderBlock
          key={block.id || index} // note: use index in prod where ids are not available, ids in preview mode
          block={block}
          page={props.page}
          postMessage={props.postMessageToPreviewHost}
          isEditMode={props.previewParams.isEditMode}
          isSelected={props.selectedBlockId === block.id}
          isDisabled={
            props.selectedBlockId !== 0 && props.selectedBlockId !== block.id
          }
        />
      ))}
    </>
  );
};

export default Button;
