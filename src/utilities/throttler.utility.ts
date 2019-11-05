
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
export default function throttle(action: Function, interval: number, max: number, start = 0) {
   performThrottle(action, interval, max, start);
}

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
function performThrottle(action: Function, interval: number, max: number, index: number) {
   if (index >= max) {
      return;
   }

   action(index);

   setTimeout(() => {
      performThrottle(action, interval, max, index + 1);
   }, interval);
}