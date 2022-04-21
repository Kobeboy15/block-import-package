import { addUniqueNameToEndpoint } from "./addUniqueNameToEndpoint";
import { detectChannel } from "../detectChannel";
import { useMemo } from "react";

export const BASE_URL =
  process.env.NEXT_PUBLIC_SP_API_BASE_URL ||
  "https://cf.test.spenvs.dns-cloud.net";

export const SUPAPASS_TOKEN_ID = "SPID";

export function createFetcher(uniqueName: string, alternateRoot?: string) {
  return async function fetcher(
    endpoint: string,
    { body = null, customConfig = {} }: any = { headers: [] },
    method?: string
  ) {
    // Ensure Channel-Uniquename header is set
    // TODO should this be Channel-Identifier?
    const headers = {
      "Content-Type": "application/json",
      "Channel-Identifier": uniqueName,
      "Cache-Control": "no-cache",
    };

    // Get Authorizatoin token from localStorage if present.
    // Ensure the Authorization header is included if we have a token.
    let token = "";
    if (typeof window !== "undefined") {
      token = window?.localStorage?.getItem(SUPAPASS_TOKEN_ID) || "";
    }
    if (token) {
      headers["Authorization"] = `${token}`;
    }
    if (token === "") {
      delete headers["Authorization"];
    }

    // Standard HTTP config, default to POST if body, unless specified
    const config = {
      method: body ? (method ? method : "POST") : "GET",
      ...customConfig,
      headers: {
        ...headers,
        ...customConfig?.headers,
      },
    };

    // Include the request body
    if (body) {
      config["body"] = JSON.stringify(body);
    }

    // Set the base url, or use the alternate root if specified
    const baseUrl =
      endpoint === "/api/register" ||
      endpoint.includes("/api/consent") ||
      endpoint === "/api/play" ||
      endpoint === "/api/login"
        ? ""
        : alternateRoot || BASE_URL.replace("/api/v1", "");

    const fetchUrl = baseUrl + addUniqueNameToEndpoint(endpoint, uniqueName);

    // if (!PROD)
    console.log("fetcher -", fetchUrl);

    try {
      const response = await fetch(`${fetchUrl}`, config);

      // TODO fix this, its very fugly
      // API sometimes doesn't return a response parsable with res.json()
      // which is what code below this tries to mitigate with the try/catch block.
      // However, doing this breaks login userAgreement repsonses that require us to
      // read the body of the 400 error on login. Hence...
      if (response.status === 400 && fetchUrl.includes("login")) {
        return response.json();
      }

      if (response.status === 401) {
        console.error("401: User not authenticated.");
      }

      if (response.status === 409) {
        console.error("409: User conflict.");
      }

      if (response.status === 403) {
        console.error("403: User not authorised.");
      }

      if (response.status === 418) {
        console.error("Teapot");
      }

      let data = null;
      try {
        data = await response.json();
      } catch (e) {
        console.error("JSON parse failed", e.message);
      }

      if (response.ok) {
        return { ...data, status: response.status, ok: response.ok };
      } else {
        // throw new Error('Response not ok.');
        return response;
      }
    } catch (e) {
      console.error("Fetch error: ", e);
    }
  };
}

export function useFetcher(alternateRoot?: string) {
  const channelIdentifier = detectChannel();

  return useMemo(
    () => createFetcher(channelIdentifier, alternateRoot),
    [channelIdentifier, alternateRoot]
  );
}
