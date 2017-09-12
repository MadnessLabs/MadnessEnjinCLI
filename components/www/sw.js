importScripts('workbox-sw.prod.v2.0.1.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "build/app.js",
    "revision": "f0e7d95d94c1d1dc27b53f84e2a7e24b"
  },
  {
    "url": "build/app.registry.json",
    "revision": "9c473356381eb1c890162e88be3cf0d7"
  },
  {
    "url": "build/app/5m3ai7ox.css",
    "revision": "b1ce6efd3b35cb01468b474ac8f5000a"
  },
  {
    "url": "build/app/app.ijd2vlxm.js",
    "revision": "3688b099868eafdf3c42d224926a9271"
  },
  {
    "url": "build/app/app.ooqphsna.pf.js",
    "revision": "51590e4c73a717db628c51354f7cdb93"
  },
  {
    "url": "build/app/ebtor4ia.js",
    "revision": "2964fa17507dc4e779b039dac72876d1"
  },
  {
    "url": "build/app/i5pk3j36.js",
    "revision": "f55eddb1d098eeac52fb989e55f776fb"
  },
  {
    "url": "favicon.ico",
    "revision": "d2f619d796fbe8bed6200da2691aa5b6"
  },
  {
    "url": "index.html",
    "revision": "8f8a96a82c35c76fcd5855ba8d34352c"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true
});
workboxSW.precache(fileManifest);
