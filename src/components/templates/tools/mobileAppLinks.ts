/**
 * Build a link for apple app store with app id
 */
export const createAppleLink = (appleId: string) =>
  `https://itunes.apple.com/us/app/${
    appleId.substr(0, 2) === "id" ? appleId : "id" + appleId
  }`;

/**
 * Build a link for google app store with channel cleanname
 */
export const createGoogleLink = (appGooglePackageName: any) =>
  `https://play.google.com/store/apps/details?id=${appGooglePackageName}`;
