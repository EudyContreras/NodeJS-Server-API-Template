export {};

declare global {
   interface Window {
      __precacheManifest: any;
      urlsToCache: any;
      clients: any;
      constants: any;
      registration: any;
      skipWaiting: Function;
   }
}