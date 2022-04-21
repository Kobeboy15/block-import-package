import { ParsedUrlQuery } from "querystring";

export type PreviewParams = {
  isEditMode: boolean;
  previewHost: string | null; // URL to preview host CMS for postMessage comms
  guid?: string | null;
  previewEndpoint?: string | null; // API endpoint to call for preview edit mode
};

// Clean up the query string strings and provide a boolean for isEditMode.
export function getPreviewHostParams(query: ParsedUrlQuery): PreviewParams {
  const isEditMode =
    (query.isEditMode as string) === "true" ||
    (query.isEditMode as string) === "1"
      ? true
      : false;
  const previewHost = (query?.previewHost as string) || null;
  const guid =
    query.guid && query.guid !== "null" ? (query.guid as string) : null;

  // note: the fetcher will add the channel identifier: channel/:channelName/liveEdit
  const previewEndpoint = `/api/v1/channel/liveEdit?includeLandingPage=true${
    guid ? `&landingPageVersionGuidPrivate=${guid}` : ""
  }`;

  return { isEditMode, previewHost, guid, previewEndpoint };
}
