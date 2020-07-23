!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const i=e=>e*r(30),r=e=>e*o(24),o=e=>e*c(60),c=e=>60*e;const a={API_DATA:/\/api\/.*\/*.(json|xml)$/,PROGRESSIVE_IMAGE:/.(webp)$/,DATA:/.(json|xml|txt)$/,FONT:/\.(eot|otf|ttf|woff|woff2)$/,STATIC:/.(js|css|js.br|js.gz|html)$/,IMAGE:/.(png|apng|svg|jpg|jpeg|pjpeg|tif|tiff|gif|ico|bmp|jfif)$/,AUDIO:/.(mp4|m4a|aac|oga|flac|wav|pmc|aiff|wav|mp3|ogg|webm)$/,VIDEO:/.(mp4|webm|ogg)$/},s=(e,t,n)=>e>=t&&e<n,d=e=>{return e.origin===self.location.origin&&(!(t=e.pathname)||""===t||void 0===t);var t};const u={log:(...e)=>{},warn:(...e)=>{},info:(...e)=>{},error:(...e)=>{}};var l;!function(e){e[e.PUSH=0]="PUSH",e[e.NOTIFICATIONS=1]="NOTIFICATIONS",e[e.BACKGROUND_SYNC=2]="BACKGROUND_SYNC",e[e.BACKGROUND_SYNC_PERIODIC=3]="BACKGROUND_SYNC_PERIODIC"}(l||(l={}));var f=function(e,t,n,i){return new(n||(n=Promise))((function(r,o){function c(e){try{s(i.next(e))}catch(t){o(t)}}function a(e){try{s(i.throw(e))}catch(t){o(t)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,a)}s((i=i.apply(e,t||[])).next())}))};r(1);const E="date",h={UPDATE_AVAILABLE:"update_available",DATA_UPDATE:"network_data_update"},v=e=>({DATA_CACHE:"eudcon-universal-data-cache-"+(e||""),IMAGE_CACHE:"eudcon-universal-image-cache-"+(e||""),MEDIA_CACHE:"eudcon-universal-media-cache-"+(e||""),STATIC_CACHE:"eudcon-universal-static-cache-"+(e||""),FALLBACK_CACHE:"eudcon-universal-fallback-cache-"+(e||""),QUEUE_CACHE:"eudcon-universal-request-queue-cache-"+(e||""),GOOGLE_FONTS_SHEETS_CACHE:"educon-universal-google-fonts-sheets-"+(e||""),GOOGLE_FONTS_WEB_CACHE:"educon-universal-google-fonts-web-"+(e||"")}),A={normal:{INITIAL_SYNC:"initial-sync",UPDATE_SYNC:"update-sync",DATA_SYNC:"data-sync"},periodic:{CONTENT_SYNC:"content-sync"}},p={title:"Template engine",options:{requireInteraction:!0,body:"There is update available! Would you like to see it?",icon:"./images/icons/icon-152x152.png",badge:"./images/icons/icon-152x152.png",actions:[{title:"yes",action:"action-1"},{title:"no",action:"action-2"}]}},y="sync",g="controlling",_="periodicsync",T="notificationclick",C="install",O="activate",m="waiting",S="message",I="fetch",D="push",N=Object.freeze({CACHE_ONLY:"cache_only_stragedy",CACHE_FIRST:"cache_first_stragedy",CACHE_THEN_PRELOAD:"cache_then_preload_stragedy",NETWORK_ONLY:"network_only_stragedy",NETWORK_FIRST:"network_first_stragedy",STALE_REVALIDATE:"stale_revalidate_stragedy",UPDATE_REFRESH:"update_refresh_stragedy",NON_FOUND:"no_found_stragedy"}),w={PUT:"PUT",POST:"POST",DELETE:"DELETE",PATCH:"PATCH"},L=Object.assign(Object.assign({},w),{GET:"GET"}),R={REFRESH:"refresh",CACHE_URLS:"cache-urls",APP_UPDATE:"add-update",READ_OFFLINE:"read-offline",SKIP_WAITING:"skip-awaitng",ADD_TO_CACHE:"add-to-cache",UNREGISTER_SYNC:"unregister-sync",PURGE_EXPIRED_CACHE:"purgo-expired-cache",WB_BROADCAST_UPDATE:"workbox-broadcast-update",REMOVE_FROM_CACHE:"remove-from-cache"},b={DOCUMENT:"document",WORKER:"worker",OBJECT:"object",IMAGE:"image",SCRIPT:"script",STYLE:"style",AUDIO:"audio",VIDEO:"video",FONT:"font"},x="cors",P="error",M="opaque",U={STYLESHEET_FONTS:"https://fonts.googleapis.com",STATIC_WEB_FONTS:"https://fonts.gstatic.com"},H={FALLBACK_HTML_URL:"/offline.html",FALLBACK_ERROR_URL:"",FALLBACK_IMAGE_URL:"",FALLBACK_FONT_URL:""},F=Object.freeze({push:{NEW_UPDATE:"new-update"},baseUrl:"/?source=pwa",fallbacks:H,urlsToCache:["/","https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"],stragedies:N,messages:R,cacheNames:v,sideEffects:w,httpMethods:L,syncEvents:A,appShellPage:"/?appshell=true",contentTypes:{HTML:"text/html",SVG:"image/svg+xml",IMAGE:"image/png",FONT:""},commonOrigins:U,cachableTypes:b,clientMessages:h,offlineFallbackPage:"/offline.html",updateNotification:p});let B,G;const j=new WeakMap,k=new WeakMap,q=new WeakMap,W=new WeakMap,K=new WeakMap;let Y={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return k.get(e);if("objectStoreNames"===t)return e.objectStoreNames||q.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return z(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function V(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(G||(G=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(J(this),t),z(j.get(this))}:function(...t){return z(e.apply(J(this),t))}:function(t,...n){const i=e.call(J(this),t,...n);return q.set(i,t.sort?t.sort():[t]),z(i)}}function $(e){return"function"===typeof e?V(e):(e instanceof IDBTransaction&&function(e){if(k.has(e))return;const t=new Promise((t,n)=>{const i=()=>{e.removeEventListener("complete",r),e.removeEventListener("error",o),e.removeEventListener("abort",o)},r=()=>{t(),i()},o=()=>{n(e.error||new DOMException("AbortError","AbortError")),i()};e.addEventListener("complete",r),e.addEventListener("error",o),e.addEventListener("abort",o)});k.set(e,t)}(e),t=e,(B||(B=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some(e=>t instanceof e)?new Proxy(e,Y):e);var t}function z(e){if(e instanceof IDBRequest)return function(e){const t=new Promise((t,n)=>{const i=()=>{e.removeEventListener("success",r),e.removeEventListener("error",o)},r=()=>{t(z(e.result)),i()},o=()=>{n(e.error),i()};e.addEventListener("success",r),e.addEventListener("error",o)});return t.then(t=>{t instanceof IDBCursor&&j.set(t,e)}).catch(()=>{}),K.set(t,e),t}(e);if(W.has(e))return W.get(e);const t=$(e);return t!==e&&(W.set(e,t),K.set(t,e)),t}const J=e=>K.get(e);const Q=["get","getKey","getAll","getAllKeys","count"],X=["put","add","delete","clear"],Z=new Map;function ee(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!==typeof t)return;if(Z.get(t))return Z.get(t);const n=t.replace(/FromIndex$/,""),i=t!==n,r=X.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!r&&!Q.includes(n))return;const o=async function(e,...t){const o=this.transaction(e,r?"readwrite":"readonly");let c=o.store;i&&(c=c.index(t.shift()));const a=await c[n](...t);return r&&await o.done,a};return Z.set(t,o),o}Y=(e=>({...e,get:(t,n,i)=>ee(t,n)||e.get(t,n,i),has:(t,n)=>!!ee(t,n)||e.has(t,n)}))(Y);var te=function(e,t,n,i){return new(n||(n=Promise))((function(r,o){function c(e){try{s(i.next(e))}catch(t){o(t)}}function a(e){try{s(i.throw(e))}catch(t){o(t)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,a)}s((i=i.apply(e,t||[])).next())}))};const ne="by-cachename",ie={DB_NAME:"Worker data storage",STORE_NAME:"expiration",methods:{READ_WRITE:"readwrite"},keyPaths:{PRIMARY_KEY:{index:"by-id",target:"id"},KEYS:[{index:"by-url",target:"url"},{index:ne,target:"cacheName"}]}},re=function(e,t,{blocked:n,upgrade:i,blocking:r,terminated:o}={}){const c=indexedDB.open(e,t),a=z(c);return i&&c.addEventListener("upgradeneeded",e=>{i(z(c.result),e.oldVersion,e.newVersion,z(c.transaction))}),n&&c.addEventListener("blocked",()=>n()),a.then(e=>{o&&e.addEventListener("close",()=>o()),r&&e.addEventListener("versionchange",()=>r())}).catch(()=>{}),a}(ie.DB_NAME,1,{upgrade(e){const t=ie.STORE_NAME,n=ie.keyPaths.PRIMARY_KEY,i=ie.keyPaths.KEYS,r=e.createObjectStore(t);r.createIndex(n.index,n.target,{unique:!0}),i.forEach(e=>{r.createIndex(e.index,e.target,{unique:!1})})}}),oe={getAllItems(e){return te(this,void 0,void 0,(function*(){const t=(yield re).transaction(ie.STORE_NAME,"readonly").store;return(yield t.index(e.index)).getAll(e.key)}))},getEntryCount(e){return te(this,void 0,void 0,(function*(){const t=(yield re).transaction(ie.STORE_NAME,"readonly").store;return(yield t.index(e.index)).count(e.key)}))},clearEntries(e){return te(this,void 0,void 0,(function*(){const t=(yield re).transaction(ie.STORE_NAME,"readwrite").store,n=yield t.index(e.index);return(yield n.getAll(e.key)).forEach(e=>{e.persist||t.delete(e.id)})}))},getItem(e){return te(this,void 0,void 0,(function*(){return(yield re).get(ie.STORE_NAME,e)}))},setItem(e,t){return te(this,void 0,void 0,(function*(){return(yield re).put(ie.STORE_NAME,t,e)}))},deleteItem(e){return te(this,void 0,void 0,(function*(){return(yield re).delete(ie.STORE_NAME,e)}))},clearItems(){return te(this,void 0,void 0,(function*(){return(yield re).clear(ie.STORE_NAME)}))},keys(){return te(this,void 0,void 0,(function*(){return(yield re).getAllKeys(ie.STORE_NAME)}))}};function ce(e,t,n){return te(this,void 0,void 0,(function*(){const i=new Date;let r=!1;return n&&n.maxAgeSeconds>0&&(i.setSeconds(i.getSeconds()+n.maxAgeSeconds),r=!0),yield function(e,t,{clearOnError:n=null,expiryDate:i=null,visited:r=!1,persist:o=!1}){var c,a,s,d;return te(this,void 0,void 0,(function*(){try{const o=(yield oe.getItem(e))||((e,t,n=null,i=0,r=!0)=>({id:`${t}|${e}`,url:e,persist:!1,cacheName:t,expiryDate:n,clearOnError:r,visitFrequency:null!==i&&void 0!==i?i:0}))(e,t),u=r?(null!==(c=o.visitFrequency)&&void 0!==c?c:0)+1:null!==(a=o.visitFrequency)&&void 0!==a?a:0,l=Object.assign(Object.assign({},o),{visitFrequency:u,clearOnError:null!==(s=null!==n&&void 0!==n?n:o.clearOnError)&&void 0!==s&&s,expiryDate:null!==(d=null!==i&&void 0!==i?i:o.expiryDate)&&void 0!==d?d:null});yield oe.setItem(e,l)}catch(o){u.error("Something went wrong",o)}}))}(e,t,{visited:!0,persist:!1,clearOnError:null===n||void 0===n?void 0:n.clearOnError,expiryDate:r?i.getTime():null})}))}var ae=function(e,t,n,i){return new(n||(n=Promise))((function(r,o){function c(e){try{s(i.next(e))}catch(t){o(t)}}function a(e){try{s(i.throw(e))}catch(t){o(t)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,a)}s((i=i.apply(e,t||[])).next())}))};const se=v(),de={crossOrigin:!0,allowOpaque:!1,cacheCondition:({response:e})=>e&&s(e.status,200,300)||!1};function ue(e,t,n){if(!t||!t.ok&&t.type!==M)return!1;const{acceptedStatus:i,crossOrigin:r,allowOpaque:o,cacheCondition:c}=n||de,a=i?i.includes(t.status):c&&c({request:e,response:t,url:new URL(e.url)});switch(t.type){case x:return!0===(r&&a);case M:return!0===(o&&a);case P:return!1}return!!a}const le=()=>{const e=JSON.stringify({error:"Sorry!, You are offline!. Please, try again later."});return new Response(e,{status:404,statusText:"Not Found",headers:{"Content-Type":"application/json"}})};function fe(e,t=5e3){return ae(this,void 0,void 0,(function*(){return new Promise((function(n,i){const r=setTimeout(i,t);fetch(e).then(e=>{clearTimeout(r),n(e)},i)}))}))}function Ee(e){const{event:t,url:n,request:i,cacheName:o,cachePredicate:c,quotaOptions:a}=e,s=caches.open(o);t.respondWith(s.then(s=>s.match(i).then(t=>{if(t){const n=t&&t.headers.get(E);if(!function(e,t,n){var i;if(!e)return!1;if(t){const n=e.getSeconds()+(null!==(i=t.maxAgeSeconds)&&void 0!==i?i:0);return Date.now()-n<0}return Date.now()-e.getSeconds()>(null!==n&&void 0!==n?n:r(1))}(n?new Date(n):new Date,a,e.theresholdAge))return t}const u=fe(i).then(e=>((d(n)||ue(i,e,c))&&s.addToCache(i,e.clone(),o,null===a||void 0===a?void 0:a.maxEntries),e||ve(i.destination)));return t||u}).catch(e=>Ae(t,i,e))))}function he(e){const{event:t,request:n,cacheName:i,cachePredicate:r,quotaOptions:o}=e,c=caches.open(i),a=e=>fetch(n).then(t=>t?(ce(n.url,i,o),ue(n,t,r)&&e.addToCache(n,t.clone(),i,null===o||void 0===o?void 0:o.maxEntries),t):ve(n.destination)).catch(e=>Ae(t,n,e));t.respondWith(c.then(e=>e.match(n).then(t=>ae(this,void 0,void 0,(function*(){return t&&o?function(e){return te(this,void 0,void 0,(function*(){try{const t=yield oe.getItem(e);return!t||!!t.expiryDate&&Date.now()>t.expiryDate}catch(t){return u.error("Something went wrong",t),!0}}))}(n.url).then(n=>n?a(e):t):t||a(e)})))))}function ve(e){return ae(this,void 0,void 0,(function*(){const t=yield caches.open(se.FALLBACK_CACHE);switch(e){case b.FONT:return(yield t.match(H.FALLBACK_FONT_URL))||le();case b.IMAGE:return(yield t.match(H.FALLBACK_IMAGE_URL))||le();default:return(yield t.match(H.FALLBACK_HTML_URL))||le()}}))}function Ae(e,t,n){return ae(this,void 0,void 0,(function*(){return Promise.resolve(le())}))}Cache.prototype.addToCache=function(e,t,n,i){return ae(this,void 0,void 0,(function*(){try{yield this.put(e,t),i&&function(e){return te(this,void 0,void 0,(function*(){return yield oe.getAllItems({index:ne,key:e})}))}(n).then(e=>{if(e.values.length>=i){const t=e.reduce((e,t)=>e.visitFrequency<t.visitFrequency?e:t);this.delete(t.url)}})}catch(r){r.code===DOMException.QUOTA_EXCEEDED_ERR&&function(e){return te(this,void 0,void 0,(function*(){return yield oe.getItem(e)}))}(e.url).then(e=>{(null===e||void 0===e?void 0:e.clearOnError)&&caches.delete(n)})}return t}))};var pe=function(e,t,n,i){return new(n||(n=Promise))((function(r,o){function c(e){try{s(i.next(e))}catch(t){o(t)}}function a(e){try{s(i.throw(e))}catch(t){o(t)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,a)}s((i=i.apply(e,t||[])).next())}))};const ye=v("1.0.0"),ge=[...[{'revision':'7f2c21478924d1e7a7eda9a6ab60aab0','url':'/images/favicon.ico'},{'revision':'69812b5f3f9c404de3a39a69e9241cec','url':'/images/icons/touch-icon-120x120.png'},{'revision':'6037f808f4843e33d5008d91ddba6ffe','url':'/images/icons/touch-icon-120x120.webp'},{'revision':'84e3c43ba405481159ec623b430b7369','url':'/images/icons/touch-icon-128x128.png'},{'revision':'73b6efcab10953e73612db85822a9302','url':'/images/icons/touch-icon-128x128.webp'},{'revision':'5265377c50d7d74019509b7d4197a69f','url':'/images/icons/touch-icon-144x144.png'},{'revision':'a575c3abd7ba89585de0de4c025d8623','url':'/images/icons/touch-icon-144x144.webp'},{'revision':'f54526f72876ca990c42f524552dbe68','url':'/images/icons/touch-icon-152x152.png'},{'revision':'08d3b3da1a6edc8874e9deba18d9e787','url':'/images/icons/touch-icon-152x152.webp'},{'revision':'c61e2a54514389f956c6fff91381c350','url':'/images/icons/touch-icon-180x180.png'},{'revision':'e95d37a72e5282606f10deabe10fd257','url':'/images/icons/touch-icon-180x180.webp'},{'revision':'2aa2cec6214383875cd0d435d5fb276c','url':'/images/icons/touch-icon-192x192.png'},{'revision':'ae7f6cd9b45e74e7f0193af451c7c966','url':'/images/icons/touch-icon-192x192.webp'},{'revision':'ca1698c18fd876e3ee6f719ee4ca3fac','url':'/images/icons/touch-icon-257x257.png'},{'revision':'c7ed463894d90d0839352437f79d1352','url':'/images/icons/touch-icon-257x257.webp'},{'revision':'b2d9b740f4536828df32d6be557859e4','url':'/images/icons/touch-icon-384x384.png'},{'revision':'6d1348b23a7ef16f01dd7e726cf060bf','url':'/images/icons/touch-icon-384x384.webp'},{'revision':'56b17b3f77e5ea1b2e3d783d8aa591eb','url':'/images/icons/touch-icon-512x512.png'},{'revision':'bbe1577b22a157f27e47403ab1b3fff5','url':'/images/icons/touch-icon-512x512.webp'},{'revision':'288745693ae4b59142398a6de141256c','url':'/images/icons/touch-icon-72x72.png'},{'revision':'3966528c91366436a7982c6cabbf9e00','url':'/images/icons/touch-icon-72x72.webp'},{'revision':'62f892f3e35f5b22a4eb6c1768f56413','url':'/images/icons/touch-icon-76x76.png'},{'revision':'b1ddd6a5deb015a100af8dd381490cfd','url':'/images/icons/touch-icon-76x76.webp'},{'revision':'91cfd67f08d8d0eaf898a46375df6e55','url':'/images/icons/touch-icon-96x96.png'},{'revision':'d9eb3ae2b116817028abb2bd16e726c8','url':'/images/icons/touch-icon-96x96.webp'},{'revision':'25d3d88faf8d2c99dfab3b9f2a603fbc','url':'/loadable-stats.json.br'},{'revision':'0ff7ebb8d733fb0d3aeb889ff94924ca','url':'/loadable-stats.json.gz'},{'revision':'93399fdcb7920aba904e99d01bb8bf6c','url':'/manifest.json'},{'revision':'4ae00974230e825a4c23200b5ff20faf','url':'/offline.html'},{'revision':'3ad0652bd17ff826a31fa29366021cfd','url':'/robots.txt'},{'revision':'1a073d53e5e1e832faccf443deccc92f','url':'/scripts/app.bundle.0c95a499de41faa7a40b.js'},{'revision':'bfe1d610487f665c7e9410aa31c2b674','url':'/scripts/app.bundle.0c95a499de41faa7a40b.js.br'},{'revision':'29da297ba2a8be974bfc59985ea9d79f','url':'/scripts/app.bundle.0c95a499de41faa7a40b.js.gz'},{'revision':'bf222d87db33203411d2e8888c9fe59f','url':'/scripts/sections-administration-AdminPage.chunk.6d5e465bde31f5ee2079.js'},{'revision':'ccdd745175d8dc2b91cb1f2a6151f108','url':'/scripts/sections-applications-ApplicationsPage.chunk.5910a063d0b618d0daf2.js'},{'revision':'2375f556b6b8a26ce0cf480f936f3d1f','url':'/scripts/sections-information-AboutPage.chunk.8a89eeb534ee7a48b1b9.js'},{'revision':'ec2f1e555f1f67e7215729896c43af13','url':'/scripts/vendors.chunk.55a8cf11aa16c4e12710.js'},{'revision':'b9dc25b693dbd2871395485831c25a56','url':'/scripts/vendors.chunk.55a8cf11aa16c4e12710.js.br'},{'revision':'017c98d07ec63664b20c1d15781926e9','url':'/scripts/vendors.chunk.55a8cf11aa16c4e12710.js.gz'},{'revision':'aa2ccc24276ceae616213c3c146c418b','url':'/styles/fonts.css'}]],_e={crossOrigin:!0,cacheCondition:({response:e})=>e&&s(null===e||void 0===e?void 0:e.status,200,300)||!1};self.addEventListener(I,e=>{const t=e.request.clone(),n=new URL(t.url);if(n.origin.startsWith("http"))if(d(n)){Ee({url:n,event:e,request:t,cacheName:ye.STATIC_CACHE,theresholdAge:r(1)})}else if(((e,...t)=>t.includes(e.destination))(t,b.STYLE,b.SCRIPT,b.DOCUMENT)){Ee({url:n,event:e,request:t,cacheName:n.origin===U.STYLESHEET_FONTS?ye.GOOGLE_FONTS_SHEETS_CACHE:ye.STATIC_CACHE,cachePredicate:{crossOrigin:!0,cacheCondition:({response:e})=>e&&s(null===e||void 0===e?void 0:e.status,200,300)||!1},theresholdAge:r(1)})}else if(((e,t)=>e.destination===b.FONT||t.origin===U.STATIC_WEB_FONTS)(t,n)){he({url:n,event:e,request:t,cacheName:ye.GOOGLE_FONTS_WEB_CACHE,cachePredicate:{crossOrigin:!0,acceptedStatus:[0,200,203,202]}})}else if(t.destination!==b.IMAGE)if(t.destination!==b.AUDIO)if(t.destination!==b.VIDEO){if((e=>e.url.includes("/api/")&&e.method===L.GET)(t)){const i={crossOrigin:!0,acceptedStatus:[0,200,203,202]};!function(e){const{event:t,request:n,cacheName:i,cachePredicate:r}=e,o=caches.open(i);t.respondWith(fe(n).then(e=>e&&ue(n,e,r)?(t.waitUntil(o.then(t=>{t.addToCache(n,e.clone(),i)})),e):o.then(e=>e.match(n).then(e=>e||ve(n.destination))).catch(e=>Ae(t,n,e))))}({url:n,event:e,request:t,cacheName:ye.DATA_CACHE,quotaOptions:{clearOnError:!0,maxAgeSeconds:o(6),maxEntries:8},cachePredicate:i})}}else{he({url:n,event:e,request:t,cacheName:ye.MEDIA_CACHE,quotaOptions:{clearOnError:!0,maxAgeSeconds:r(30),maxEntries:10},cachePredicate:_e})}else{he({url:n,event:e,request:t,cacheName:ye.MEDIA_CACHE,quotaOptions:{clearOnError:!0,maxAgeSeconds:i(2),maxEntries:30},cachePredicate:_e})}else{he({url:n,event:e,request:t,cacheName:ye.IMAGE_CACHE,quotaOptions:{clearOnError:!0,maxAgeSeconds:i(3),maxEntries:100},cachePredicate:_e})}}),self.addEventListener(C,e=>pe(void 0,void 0,void 0,(function*(){const t=Array.from(new Set([...ge.map(e=>e.url),...F.urlsToCache])),n=(e,t)=>pe(void 0,void 0,void 0,(function*(){try{const n=yield caches.open(e);yield n.addAll(t)}catch(n){}}));t.length>0&&e.waitUntil(Te(t,n).then(()=>self.skipWaiting()).catch(e=>u.log(e)))})));const Te=(e,t)=>pe(void 0,void 0,void 0,(function*(){try{const n=e.filter(e=>a.IMAGE.test(e)||a.PROGRESSIVE_IMAGE.test(e)),i=e.filter(e=>a.VIDEO.test(e)||a.AUDIO.test(e)),r=e.filter(e=>a.FONT.test(e)),o=e.filter(e=>a.STATIC.test(e)),c=e.filter(e=>a.DATA.test(e));n.length>0&&(yield t(ye.IMAGE_CACHE,n)),r.length>0&&(yield t(ye.GOOGLE_FONTS_WEB_CACHE,r)),o.length>0&&(yield t(ye.STATIC_CACHE,o)),i.length>0&&(yield t(ye.MEDIA_CACHE,i)),c.length>0&&(yield t(ye.DATA_CACHE,c))}catch(n){}}));self.addEventListener(O,e=>pe(void 0,void 0,void 0,(function*(){return e.waitUntil(caches.keys().then(e=>{const t=Object.values(ye);return Promise.all(e.filter(e=>!t.includes(e)).map(e=>caches.delete(e)))}).catch(e=>u.log(e))),self.clients.claim()}))),self.addEventListener(g,e=>pe(void 0,void 0,void 0,(function*(){window.location.reload()}))),self.addEventListener(m,e=>pe(void 0,void 0,void 0,(function*(){((e,t)=>{e.waitUntil(()=>pe(void 0,void 0,void 0,(function*(){if(!e.clientId)return;const n=yield self.clients.get(e.clientId);n&&n.postMessage(t)})))})(e,{type:F.clientMessages.UPDATE_AVAILABLE})}))),self.addEventListener(D,e=>{const{title:t,options:n}=p,i=self.registration.showNotification(t,n);e.waitUntil(i)}),self.addEventListener(T,e=>{e.notification.close();switch(e.notification.tag){case F.push.NEW_UPDATE:e.waitUntil(self.clients.openWindow(F.baseUrl));break;default:e.waitUntil(self.clients.openWindow(F.baseUrl))}}),self.addEventListener(y,e=>{}),self.addEventListener(_,e=>{switch(e.tag){case A.periodic.CONTENT_SYNC:e.waitUntil(function(e){return f(this,void 0,void 0,(function*(){const t=Object.values(e);try{for(const e of t){const t=yield caches.open(e),n=yield t.keys(),i=n.map(e=>e.url);i.length>0?(n.forEach(e=>f(this,void 0,void 0,(function*(){yield t.delete(e)}))),yield caches.delete(e),yield caches.open(e).then(e=>e.addAll(i))):yield caches.delete(e)}}catch(n){}return Promise.resolve()}))}(ye));break;default:e.registration.unregister()}}),self.addEventListener(S,e=>pe(void 0,void 0,void 0,(function*(){const t=e.data;var n;if(t)switch(t.type){case R.SKIP_WAITING:self.skipWaiting();break;case R.CACHE_URLS:{const e=t.payload;!function(e,...t){ae(this,void 0,void 0,(function*(){const n=yield caches.open(e);yield n.addAll(t)}))}(e.cacheName,...e.urlsToCache);break}case R.UNREGISTER_SYNC:{const e=t.payload;try{const t=yield navigator.serviceWorker.ready;yield t.periodicSync.unregister(e)}catch(i){u.error("Error under sync unregistration!",i)}break}case R.ADD_TO_CACHE:{const e=new Request(t.payload),r=((e,t)=>a.DATA.test(e)?t.DATA_CACHE:a.VIDEO.test(e)||a.AUDIO.test(e)?t.MEDIA_CACHE:a.IMAGE.test(e)||a.PROGRESSIVE_IMAGE.test(e)?t.IMAGE_CACHE:a.FONT.test(e)?t.GOOGLE_FONTS_WEB_CACHE:t.STATIC_CACHE)(t.payload,ye);try{!function(e,t,n){ae(this,void 0,void 0,(function*(){const i=yield caches.open(e);yield i.addToCache(t,n,e)}))}(r,e,yield fe(e,(n=10,1e3*n)))}catch(i){}break}}})))}]);