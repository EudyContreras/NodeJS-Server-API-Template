export {};

declare global {
   interface This {
      globalThis: any;
   }
   interface Window {
      __precacheManifest: any;
      __WB_MANIFEST: any;
      urlsToCache: any;
      clients: any;
      clientConfig: any;
      registration: any;
      skipWaiting: Function;
   }
}