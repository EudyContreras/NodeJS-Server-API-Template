export {};

declare global {
   interface Window {
      __precacheManifest: any;
      __WB_MANIFEST: any;
      urlsToCache: any;
      clients: any;
      registration: any;
      skipWaiting: Function;
   }
}