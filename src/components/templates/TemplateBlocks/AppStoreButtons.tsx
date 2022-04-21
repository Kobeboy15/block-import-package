import styled from "styled-components";
import { useChannel } from "../hooks/useChannel";
import { createAppleLink, createGoogleLink } from "../tools/mobileAppLinks";
import { media } from "../themes/mediaQueries";
import React from "react";

export default function AppStoreButtons() {
  const { channel } = useChannel();
  const { appleId, hasGoogleApp, appGooglePackageName } = channel;

  return (
    <>
      {appleId || hasGoogleApp ? (
        <AppStoreButtonSection>
          {appleId ? (
            <AppStoreButton apple>
              <a href={createAppleLink(appleId)}>
                <img
                  src="/static/img/apple-app-store-badge.svg"
                  alt="Download on the Apple App Store"
                />
              </a>
            </AppStoreButton>
          ) : null}
          {hasGoogleApp ? (
            <AppStoreButton>
              <a href={createGoogleLink(appGooglePackageName)}>
                <img
                  src="/static/img/google-play-badge.png"
                  alt="Download on Google Play"
                />
              </a>
            </AppStoreButton>
          ) : null}
        </AppStoreButtonSection>
      ) : null}
    </>
  );
}

export const AppStoreButtonSection = styled.div`
  display: flex;
  max-width: ${({ theme }) => theme.maxWidth.text};
  margin-top: ${(props) => props.theme.padding * 3}px;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  align-items: center;

  /* if first child remove margin top */
  &:first-child {
    margin-top: 0;
  }

  ${media.medium`
    flex-direction: row;
  `}
`;

export const AppStoreButton = styled.div`
  max-width: 200px;
  min-width: 200px;
  text-align: center;

  &:last-child {
    margin-right: 0;
  }

  /* ${media.medium`
  max-width: ${(props) => (!props.apple ? "200px" : "177px")};
  min-width: ${(props) => (!props.apple ? "200px" : "177px")};
    margin-right: ${(props) => props.theme.padding * 2}px;
  `} */
`;
