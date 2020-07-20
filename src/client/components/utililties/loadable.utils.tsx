import minDelay from 'p-min-delay';
import { timeout } from 'promise-timeout';
import { DefaultComponent } from '@loadable/component';

const DEFAULT_DELAY = 1250;
const DEFAULT_TIMEOUT = 5000;

type DelayOptions = {
	delay: number;
	timeout?: number;
};

export function delayBoundary<T>(
	call: Promise<DefaultComponent<T>>,
	options: DelayOptions = {
		delay: DEFAULT_DELAY,
		timeout: DEFAULT_TIMEOUT
	}
): Promise<DefaultComponent<T>> {
	const delay = options.delay;
	const timeoutTime = options.timeout || DEFAULT_TIMEOUT;
	return timeout(minDelay(call, delay), timeoutTime);
}
