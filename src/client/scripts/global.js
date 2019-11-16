
/**
 * 
 * @param {string} name 
 * @returns {string}
 */
const asClass = (name) => '.'+name;

/**
 * 
 * @param {string} name 
 * @returns {string}
 */
const asId = (name) => '#'+name;

/**
 * 
 * @param {string} name 
 * @returns { HTMLElement}
 */
const spanElement = (name) => {
 const element = document.createElement('span');
 element.classList.add(name);
 return element;
}

/**
 * 
 * @param {string} tag 
 * @param {string[]} classes 
 * @returns { HTMLElement}
 */
const element = (tag, classes) => {
   const element = document.createElement(tag);
   classes.forEach(x => element.classList.add(x));
   return element;
}