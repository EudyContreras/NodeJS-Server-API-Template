/**
 * @description Internal throttle a repeated action so that there is
 * a pause between repetions.
 * @param action The action to be performed
 * @param interval The time interval at which the
 * action gets repeated.
 * @param max The max amount of iterations for
 * the specified action.
 * @param index The index parameter which keeps
 * track of the number of iterations for the specified
 * action.
 */
function performThrottle(action: (index: number) => void, interval: number, max: number, index: number): void {
	if (index >= max) {
		return;
	}

	action(index);

	setTimeout(() => {
		performThrottle(action, interval, max, index + 1);
	}, interval);
}

/**
 * @description Throttles a repeated action so that there is
 * a pause between repetions.
 * @param action The action to be performed
 * @param interval The time interval at which the
 * action gets repeated.
 * @param max The max amount of iterations for
 * the specified action.
 * @param index The index parameter which keeps
 * track of the number of iterations for the specified
 * action.
 */
export default function throttle(action: (index: number) => void, interval: number, max: number, start = 0): void {
	performThrottle(action, interval, max, start);
}

/* eslint-disable */
export const debounce = (a, b, c): any => {
	var d, e;
	return function () {
		function h() {
			(d = null), c || (e = a.apply(f, g));
		}
		var f = self,
			g = arguments;
		return clearTimeout(d), (d = setTimeout(h, b)), c && !d && (e = a.apply(f, g)), e;
	};
};
