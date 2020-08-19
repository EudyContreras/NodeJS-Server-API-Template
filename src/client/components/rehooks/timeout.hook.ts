import { useEffect } from 'react';

export const useTimeOut = (func: () => void, delay: number): void =>
	useEffect(() => {
		const timer = setTimeout(func, delay);
		return (): any => clearTimeout(timer);
	}, []);
