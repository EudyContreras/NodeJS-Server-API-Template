
declare const __VERSION_NUMBER__: any;

interface WorkerMessage {
  type: string;
  cacheName?: string;
  payload?: any;
}

interface ClientMessage {
  type: string;
  meta?: string;
  payload?: any;
}
interface CacheQuotaOptions {
  clearOnError: boolean;
  maxAgeSeconds: number;
  maxEntries: number;
}

interface CacheConditionTargets {
  request: Request;
  response: Response;
  url: URL;
}

interface CachePredicate {
  cacheCondition?: (targets: CacheConditionTargets) => boolean;
  acceptedStatus?: number[];
  allowOpaque?: boolean;
  crossOrigin?: boolean;
}

interface CacheStragedy {
  event: any;
  request: Request;
  cacheName: string;
  quotaOptions?: CacheQuotaOptions;
  cachePredicate?: CachePredicate;
}

interface RevalidateCacheStragedy extends CacheStragedy {
  theresholdAge?: number;
}

interface AgingResponseInfo {
  cacheableResponse: Response;
  effectiveResponse: Response;
  expirationDate: Date | null;
}

interface CacheExpirationInfo {
  expiration: number | null;
}

interface WebpSupportCallback<T> {
  onHasSupport: () => Promise<T>;
  onNoSupport: () => Promise<T>;
}

interface ResultCallback<T> {
  onSuccess: (args: T) => void;
  onFailure: (error: Error) => void;
}

interface PermissionCallback {
  onGranted: () => void;
  onDenied?: (reson?: any) => void;
}

interface UpdateEntryArgs {
  clearOnError: boolean | null | undefined;
  expiryDate: number | null | undefined;
  persist: boolean | undefined;
  visited: boolean | undefined;
}

interface Entry {
  [key: string]: CacheEntryInfo;
}

interface CacheEntryInfo {
  id: string;
  url: string;
  persist: boolean;
  cacheName: string;
  expiryDate: number | null;
  clearOnError: boolean;
  visitFrequency: number;
}

interface RefreshCallbacks {
  onLoading: (loading: boolean) => void;
  onReady: (response: any) => void;
  onError: (error: Error) => void;
}

interface Cache {
  addToCache(request: Request, response: Response | any, cacheName: string, maxEntries?: number): Promise<Response>;
}

type NetworkState = 'auto' | 'avoid-draining';
type PowerState = 'online' | 'avoid-cellular';

interface PeriodicSyncEvent {
	tag: string;
	minInterval: number;
	powerState: string;
	networkState: string;
}

interface ServiceWorkerRegistration extends EventTarget {
  periodicSync: {
    register(syncEvent: PeriodicSyncEvent): Promise<boolean>;
    unregister(tag: string);
    getTags(): Promise<string[]>;
  };
}