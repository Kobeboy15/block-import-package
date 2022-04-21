// API Routes do not include the {channelIdentifier} to save us needing to pass in the channel
// identifier everywhere we make a call. The fetcher (see fetcher.ts) is initialised with a
// channelIdentifier and modifies these routes from /channel/bundles to /channel/{channelIdentifier}/bundles.
//
// WARNING: Not all routes used in the app are listed here for legacy reasons. Please move here as found...
export const API_ROUTES = {
  user: `/api/v1/user`,
  channel: `/api/v1/channel?includeLandingPage=true`,
  channelWithLandingPage: `/api/v1/channel?includeLandingPage=true`,
  categories: `/api/v1/channel/categories`,
  audioCollections: `/api/v1/channel/collections/AUDIO`,
  videoCollections: `/api/v1/channel/collections/VIDEO`,
  articleCollections: `/api/v1/channel/collections/ARTICLE`,
  collectionById: (id) => `/api/v1/channel/collection/${id}`,
  collectionItemsById: (id) =>
    `/api/v1/channel/collection/${id}?includeContentDetail=true&includePlainTextSummary=true`,
  bundles: `/api/v1/channel/bundles`,
  bundlePlans: `/api/v1/channel/bundlePlans/stripe`,
  videoById: (videoId) => `/api/v1/channel/video/${videoId}`,
  articleById: (articleId) => `/api/v1/channel/article/${articleId}`,
  contentById: (contentId) => `/api/v1/channel/content/${contentId}`,
  videoStreamingLinksById: (videoId, source, channelId) =>
    `/api/v1/user/streaming/video/${videoId}?videoType=${
      source === 'external' ? 'http' : 'all'
    }&channelIdentifier=${channelId}`,
  postRequestEmailVerification: `/api/v1/user/verify-email-request`,
  links: `/api/v1/channel/links`,
  log: `/api/v1/user/log`,
  logout: `/api/v1/user/logout`,
};
