
declare const __VERSION_NUMBER__: any;

interface Cache {
   addToCache(request: Request, response: Response | any, cacheName: string, maxEntries?: number): Promise<void>;
}