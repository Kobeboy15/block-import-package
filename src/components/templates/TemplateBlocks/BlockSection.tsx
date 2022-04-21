import { ReactNode, useEffect } from "react";
import classNames from "classnames";
import useBlockContext from "../hooks/useBlockContext";
import * as DisplayOptions from "../hooks/DisplayOptions";
import React from "react";
// import useChangeDetection from 'src/app/pagebuilder/hooks/useChangeDetection';

type BlockSectionProps = {
  children: ReactNode;
  isSelected?: boolean;
  isDisabled?: boolean;
  blockType?: string;
};

export default function BlockSection({
  children,
  isSelected = false,
  isDisabled = false,
  blockType,
}: BlockSectionProps) {
  const {
    getBackgroundTreatment,
    getVerticalPadding,
    isAlignment,
    common,
    page,
    colourScheme,
  } = useBlockContext();

  // useChangeDetection(common, { people, colourScheme });
  useEffect(() => {
    if (isSelected) {
      document.getElementById(`block-${common.id}`).scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [common.id, isSelected]);

  return (
    <section
      key={common.id}
      id={`block-${common.id}`}
      tabIndex={0}
      data-testid={common.id}
      className={classNames(
        `relative bg-bg-primary even:bg-gray-200 ${getVerticalPadding()} transition duration-300 ease-out`,
        {
          "dark-mode": colourScheme === DisplayOptions.Themes.DARK,
          "light-mode": colourScheme === DisplayOptions.Themes.LIGHT,
          "is-active-edit-block relative": isSelected,
          "opacity-25": isDisabled,
        }
      )}
      style={{
        ...getBackgroundTreatment(),
        scrollMarginTop: "4em",
      }}
    >
      <div className="overflow-hidden">
        <div
          className={classNames(
            `${blockType === "contactForm" ? null : "max-w-screen-xl"} mx-auto`,
            {
              "md:text-center": isAlignment("center"),
              "md:text-right": isAlignment("right"),
            }
          )}
        >
          {children}
        </div>
        <style jsx>{`
          .is-active-edit-block:before {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            animation: pulsate 1.8s ease-in-out infinite;
            border: 0px dotted var(--color-text-tertiary);
            pointer-events: none;
            box-shadow: inset 0 0 25px var(--color-accent-transparent);
            transition: all 300ms;
          }
        `}</style>
      </div>
    </section>
  );
}
