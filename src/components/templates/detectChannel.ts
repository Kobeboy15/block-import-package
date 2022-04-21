const platformHostnames = ['lvh.me', 'now.sh', 'supapass.com', 'supapass.xyz'];
const noIndexHostnames = ['supapass.xyz', 'now.sh'];

/**
 * If we're on the client and have a window object we can get the
 * hostname and attempt to derive the channel from the sudomain...
 */
export const detectChannel = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname) {
      return checkHostname(hostname);
    }
  }
};

export const detectChannelFromHostname = (hostname: string) => {
  return checkHostname(hostname);
};

const getDevToolsChannel = () => {
  return window.localStorage.getItem('_DEV_TOOLS_channelName');
};

const checkHostname = (hostname) => {
  // If dev tools are enabled client side, return the channel specified
  if (typeof window !== 'undefined') {
    const devToolsChannel = getDevToolsChannel();
    if (devToolsChannel) {
      hostname = devToolsChannel;
      return devToolsChannel;
    }
  }

  if (isTestSite(hostname)) {
    return 'example';
  }

  // if we're running on test or dev or shared domain, use the uniqueName
  // find a match for those
  let match = false;
  platformHostnames.forEach((platformHostname) => {
    if (~hostname.indexOf(platformHostname)) {
      // console.log('Hostname contains a test address');
      match = true;
    }
  });

  if (match) {
    const channel = splitHostnameForChannel(hostname);
    return channel;
  }

  let lookupDomain = hostname;
  if (~hostname.indexOf(':')) {
    lookupDomain = hostname.split(':')[0];
  }

  return lookupDomain;
};

const validSubdomains = [
  'www',
  'app',
  'streaming',
  'members',
  'audio',
  'video',
  'courses',
  'fanclub',
  'donate',
  'test',
  'hidden',
];

const splitHostnameForChannel = (hostname) => {
  const segments = hostname.split('.');
  if (~validSubdomains.indexOf(segments[0])) {
    return segments[1];
  }
  return segments[0];
};

let testAppPatterns = [
  /web-app-([A-Za-z0-9]*)/,
  /web-app-staging-([A-Za-z0-9]*)/,
  /web-app-test-([A-Za-z0-9]*)/,
  /supapass-frontend-([A-Za-z0-9]*)/,
  /supapass-frontend-staging([A-Za-z0-9]*)/,
  /supapass-frontend-test([A-Za-z0-9]*)/,
  /supapass-frontend-next-([A-Za-z0-9]*).now.sh/,
  /supapass-frontend-next-([A-Za-z0-9]*).supapass1.now.sh/,
  /test.([A-Za-z0-9]*).supapass.com/,
  /([0-9]).([0-9]).([0-9]).([0-9])/,
  /localhost/,
];

export const isTestSite = (uniqueName: string) => {
  // does it contain web-app-xxxxxx.now.sh
  // or supapass-front-end-xxxx.now.sh
  let found = false;
  testAppPatterns.forEach((pattern) => {
    if (uniqueName.match(pattern)) {
      found = true;
    }
  });
  return found;
};

export function isNoIndexHostname(hostname: string): boolean {
  let result = false;
  noIndexHostnames.forEach((noIndexHost) => {
    if (hostname.includes(noIndexHost)) {
      result = true;
    }
  });
  return result;
}

export const getChannelIdentifierFromRequest = (req) => {
  return detectChannelFromHostname(
    (req.headers['x-forwarded-host'] as string) || (req.headers.host as string)
  );
};
