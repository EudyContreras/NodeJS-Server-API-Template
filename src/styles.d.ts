declare module '*.css' {
   const content: string;
   export default content;
}

declare module '*.scss' {
   const content: string;
   export default content;
}

declare module '*.module.css' {
   const classes: { [key: string]: string };
   export default classes;
}

declare module '*.module.scss' {
   const classes: { [key: string]: string };
   export default classes;
}

declare module '*.module.sass' {
   const classes: { [key: string]: string };
   export default classes;
}

declare module '*.module.less' {
   const classes: { [key: string]: string };
   export default classes;
}
