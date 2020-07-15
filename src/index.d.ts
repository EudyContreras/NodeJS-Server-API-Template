
declare module '*.png' {
   const value: any;
   export = value;
}

declare module '*.ico' {
   const value: any;
   export = value;
}

declare module '*.webp' {
   const value: any;
   export = value;
}

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

declare module '*.pem' {
   const value: any;
   export = value;
}

declare module '*.json' {
   const value: any;
   export default value;
}

declare module 'hsts'

declare module 'express-react-views';

declare module 'express-no-favicons';

declare module 'isomorphic-style-loader/StyleContext';

declare module 'isomorphic-style-loader/withStyles';

declare module 'react-loadable-ssr-addon'

declare const __VERSION_NUMBER__: any;

interface Cache {
   addToCache(request: Request, response: Response | any, cacheName: string, maxEntries?: number): Promise<void>;
}