export {};

declare global {
   interface Window {
      __precacheManifest: any;
      urlsToCache: any;
      clients: any;
      registration: any;
      skipWaiting: Function;
   }
}