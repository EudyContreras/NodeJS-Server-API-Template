import React from 'react';
import Loadable from 'react-loadable';
import LoadingState from '../shared/states/LoadingState';

const DEFAULT_DELAY = 300;

export function Loading(props?: any): JSX.Element | null {
	if (props.error) {
		return <div>Error! <button onClick={props.retry}>Retry</button></div>;
	} else if (props.timedOut) {
		return <div>Taking a long time... <button onClick={props.retry}>Retry</button></div>;
	} else if (props.pastDelay) {
		return <LoadingState/>;
	} else {
		return null;
	}
}

export function lazyLoad(func: (props?: any) => Promise<React.Component>, options?: any): (React.ComponentClass<unknown, any> & Loadable.LoadableComponent) | (React.FunctionComponent<unknown> & Loadable.LoadableComponent) {
	return Loadable({
		loader: func,
		...options,
		delay: DEFAULT_DELAY,
		loading: Loading
	});
}


