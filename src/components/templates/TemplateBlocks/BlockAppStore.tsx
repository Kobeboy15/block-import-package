import React from "react";
import useBlockContext from "../hooks/useBlockContext";
import AppStoreButtons from "./AppStoreButtons";

const showForBlockTypes = ["appStoreButtons"];

export default function BlockAppStore() {
  const { blockType } = useBlockContext();

  if (!showForBlockTypes.includes(blockType)) {
    return null;
  }

  return (
    <div className="px-6 text-center justify-center flex">
      <AppStoreButtons />
    </div>
  );
}
