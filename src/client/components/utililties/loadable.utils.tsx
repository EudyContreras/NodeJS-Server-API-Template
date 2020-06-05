import React from 'react';
import minDelay from 'p-min-delay';
import { timeout } from 'promise-timeout';
import baseLoadable, { Options, LoadableComponent, DefaultComponent } from '@loadable/component';
import LoadingState from '../shared/states/LoadingState';

const DEFAULT_DELAY = 100;
const DEFAULT_TIMEOUT = 5000;

export function Loading(props?: any): JSX.Element | null {
	if (props.error) {
		return <div>Error! <button onClick={props.retry}>Retry</button></div>;
	} else if (props.timedOut) {
		return <div>Taking a long time... <button onClick={props.retry}>Retry</button></div>;
	} else if (props.pastDelay || null) {
		return <LoadingState />;
	} else {
		return null;
	}
}

type DelayOptions = {
	delay?: number;
	timeout?: number;
};

export function delayBoundary<T>(
	call: Promise<DefaultComponent<T>>,
	options: DelayOptions = { 
		delay: DEFAULT_DELAY, 
		timeout: DEFAULT_TIMEOUT
	}
): Promise<DefaultComponent<T>> {
	const delay = options.delay || DEFAULT_DELAY;
	const timeoutTime = options.timeout || DEFAULT_TIMEOUT;
	return timeout(minDelay(call, delay), timeoutTime);
};

export function loadable<T>(
	call: (props: T) => Promise<DefaultComponent<T>>,
	options: Options<T> = { 
		ssr: true,
		fallback: <LoadingState/>
	}
): LoadableComponent<T> {
	return baseLoadable(call, options);
}
