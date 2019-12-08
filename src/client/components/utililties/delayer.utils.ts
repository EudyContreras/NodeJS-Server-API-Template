



// export const delayExecution = (func: Function, delay: number): () => void => {
// 	let timeout = null;

// 	const timer = (): void => {
// 		if (timeout !== null) {
// 			timeout = setTimeout(func, delay);
// 		}
// 	};

// 	return timer;
// };