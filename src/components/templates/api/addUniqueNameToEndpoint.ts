/**
 * Inject the channelIdentifier into the API endpoint on routes that expect
 * it if it doesn't already exist.
 */
export function addUniqueNameToEndpoint(endpoint: string, uniqueName: any) {
  if (
    endpoint.includes("/channel") &&
    !endpoint.includes(`/channel/${uniqueName}`)
  ) {
    return endpoint.replace("/channel", `/channel/${uniqueName}`);
  }
  return endpoint;
}
