import React from 'react';
import minDelay from 'p-min-delay';
import { timeout } from 'promise-timeout';
import baseLoadable, { LoadableComponent, DefaultComponent } from '@loadable/component';
import LoadingState from '../shared/states/LoadingState';

const DEFAULT_DELAY = 1300;
const DEFAULT_TIMEOUT = 3000;

export function Loading(props?: any): JSX.Element | null {
	console.log(props);
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

enum LoadHint {
	PREFETCH,
	PRELOAD,
	NONE
}

type Options = {
	ssr?: boolean;
	delay?: number;
	timeout?: number;
	cacheKey?: string;
	loadHint?: LoadHint;
};
export function delayBoundary<T>(
	call: Promise<DefaultComponent<T>>,
	options: Options = { 
		ssr: true,
		delay: DEFAULT_DELAY, 
		timeout: DEFAULT_TIMEOUT, 
		loadHint: LoadHint.NONE 
	}
): Promise<DefaultComponent<T>> {
	const delay = options.delay || DEFAULT_DELAY;
	const timeoutTime = options.timeout || DEFAULT_TIMEOUT;
	return timeout(minDelay(call, delay), timeoutTime);
};

export function loadable<T>(
	call: (props: T) => Promise<DefaultComponent<T>>,
	options: Options = { 
		ssr: true,
		delay: DEFAULT_DELAY, 
		timeout: DEFAULT_TIMEOUT, 
		loadHint: LoadHint.NONE 
	}
): LoadableComponent<T> {
	const settings = {
		fallback: <LoadingState/>,
		ssr: options.ssr || true,
		cacheKey: (props: any): string => props.page
	};
	switch (options.loadHint) {
		case LoadHint.PREFETCH:
			return baseLoadable(call, settings);
		case LoadHint.PRELOAD:
			return baseLoadable(call, settings);
		default:
			return baseLoadable(call, settings);
	}
}
