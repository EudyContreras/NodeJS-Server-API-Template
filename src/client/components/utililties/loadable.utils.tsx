import minDelay from 'p-min-delay';
import { timeout } from 'promise-timeout';
import { DefaultComponent } from '@loadable/component';

const DEFAULT_DELAY = 300;
const DEFAULT_TIMEOUT = 5000;

interface LoadableOptions {
	ssr: boolean;
	delay?: number;
	timeOut?: number;
	fallback?: JSX.Element;
}

export function suspend<T>(loadFunc: Promise<DefaultComponent<T>>, options: LoadableOptions = { ssr: true }): Promise<DefaultComponent<T>> {
	if (options.ssr === true) return loadFunc;
	const delay = options.delay || DEFAULT_DELAY;
	const timeoutTime = options.timeOut || DEFAULT_TIMEOUT;
	return timeout(minDelay(loadFunc, delay), timeoutTime);
}
