
/**
 * 
 * @param {string} tag 
 * @param {string[]} classes 
 * @returns { HTMLElement}
 */
export const element = (tag: string, classes: string[]) => {
   const element = document.createElement(tag);
   classes.forEach(x => element.classList.add(x));
   return element;
}

/**
 * Joins css classes into a single string
 */
export const classes = (...names: string[]): string => {
   return names.join(' ');
}