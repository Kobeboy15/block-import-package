// https://res.cloudinary.com/supapass-live/image/upload/v1486120396/theravenage/photos/1_1.png
// c_fit,h_60,w_60
// https://res.cloudinary.com/supapass-live/image/upload/c_fit,h_60,w_60/v1486120396/theravenage/photos/1_1.png

import { PROD } from "../common/flags";

export const sizeCloudinaryImage = (
  url: string,
  width: number = 100,
  height: number | null | undefined = null
) => {
  // const regex = /.+?(?=upload\/)upload\/(.*?)\//;
  if (!url) {
    return "";
  }

  if (!url.includes("cloudinary.com")) {
    return sizeImageProxy(url, width, height);
  }

  const needle = "image/upload/";
  const pos = url.indexOf(needle) + needle.length;
  const sizing = width && height ? `w_${width},h_${height}` : `w_${width}`;
  const newUrl = `${url.substring(0, pos)}${sizing}/${url.substring(pos)}`;

  return newUrl;
};

export const sizeImageProxy = (
  url: string,
  width: number = 100,
  height: number | null | undefined = null
) => {
  const cloudinaryAccount = PROD ? "supapass-live" : "supapassimgdev";

  const sizing = width && height ? `w_${width},h_${height}` : `w_${width}`;
  return `https://res.cloudinary.com/${cloudinaryAccount}/image/fetch/${sizing}/${url}`;
};

/**
 * The next Image component expects a src attribute just like the regular <img /> element.
 * It then performs optimisations and encoding, caching the images on the filesystem.
 * We have to specify domains hosting images that are allowed to use this process to prevent
 * abuse.
 *
 * We can specify res.cloudinary.com, our CDN, in next.config.js.
 *
 * Because we also load images from third party domains for things like podcast
 * episode promo, we can't optimise all these images in the same way, or allowlist all
 * those domains as they come up
 *
 * In the case where an image is hosted somewhere other than our CDN (cloudinary.com) then
 * we will simply fallback to our cloudinary fetch resizer, (which is also a security risk,
 * of course) supply that to the Next <Image /> component, and disable optimization. This
 * will still optimize the image to our fallback size, but won't use all the new features
 * of Next Image for those images. Ce la vie.
 */
export function nextImageCloudinarySrc(imageUrl: string, fallbackSize: number) {
  if (!imageUrl.includes("cloudinary.com")) {
    return { src: sizeImageProxy(imageUrl, fallbackSize), optimized: "false" };
  }
  return {
    src: imageUrl,
    optimized: "true",
  };
}
