import React from 'react';
import baseLoadable, { DefaultComponent, LoadableComponent } from '@loadable/component';

export default function loadable<T>(func: (props: T) => Promise<DefaultComponent<T>>, options: any): LoadableComponent<T> {
	return baseLoadable(func, { 
		...options,
		fallback: <div>Loading...</div> 
	});
}