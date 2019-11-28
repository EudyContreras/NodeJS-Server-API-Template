
export const element = (tag: string, classes: string[]): Element => {
	const element = document.createElement(tag);
	classes.forEach((x) => element.classList.add(x));
	return element;
};

/**
 * Joins css classes into a single string
 */
export const join = (...names: string[]): string => {
	return names.join(' ');
};

/**
 * Creates a css styling string from the given
 * object.
 */
export const css = (properties: any): string => {
	let style = '';

	for (const key in properties){
		if(Object.prototype.hasOwnProperty.call(properties, key)) {
			style += `${key}: ${properties[key]}; \n`;
		}
	}

	return style;
};