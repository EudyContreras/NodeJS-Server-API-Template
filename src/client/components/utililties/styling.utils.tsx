import ReactDom from 'react-dom';


export const element = (tag: string, classes: string[]) => {
   const element = document.createElement(tag);
   classes.forEach((x) => element.classList.add(x));
   return element;
};

/**
 * Joins css classes into a single string
 */
export const classes = (...names: string[]): string => {
   return names.join(' ');
};

export const getElement = (component: React.PureComponent) => {
	return (ReactDom.findDOMNode(component) as Element);
};

export const getHTMLElement = (component: React.PureComponent) => {
	return (ReactDom.findDOMNode(component) as HTMLElement);
};
