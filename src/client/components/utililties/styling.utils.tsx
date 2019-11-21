import ReactDom from 'react-dom';


export const element = (tag: string, classes: string[]) => {
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

export const getElement = (component: React.PureComponent) => {
	return (ReactDom.findDOMNode(component) as Element);
};

export const getHTMLElement = (component: React.PureComponent) => {
	return (ReactDom.findDOMNode(component) as HTMLElement);
};

export const css = (properties: any): string => {
   let style = '';

   for (let key in properties){
      if(properties.hasOwnProperty(key)) {
         style += `${key}: ${properties[key]}; \n`;
      }
   }

   return style;
}