import { CacheNames } from '../constants';


export const syncContent = (cacheKeys: CacheNames): Promise<void> => {
	//1: Get all cache keys, all urls
	//2: Get cache info and settings for each url
	//2: Delete all cache keys and values
	//3: Add all keys again to their respective cache
	//4: Cached content gets updated
	return Promise.resolve();
};