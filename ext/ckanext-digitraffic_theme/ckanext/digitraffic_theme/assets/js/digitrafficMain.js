!function(t){"use strict";function e(t){var e=Object.create(null);return t&&Object.keys(t).forEach(function(i){if("default"!==i){var a=Object.getOwnPropertyDescriptor(t,i);Object.defineProperty(e,i,a.get?a:{enumerable:!0,get:function(){return t[i]}})}}),e.default=t,Object.freeze(e)}var i=e(t);const a={name:"fds-size-3",value:"24px"},o=class{get shadowRoot(){return this.__host.__shadowRoot}constructor(t){this.ariaAtomic="",this.ariaAutoComplete="",this.ariaBrailleLabel="",this.ariaBrailleRoleDescription="",this.ariaBusy="",this.ariaChecked="",this.ariaColCount="",this.ariaColIndex="",this.ariaColSpan="",this.ariaCurrent="",this.ariaDescription="",this.ariaDisabled="",this.ariaExpanded="",this.ariaHasPopup="",this.ariaHidden="",this.ariaInvalid="",this.ariaKeyShortcuts="",this.ariaLabel="",this.ariaLevel="",this.ariaLive="",this.ariaModal="",this.ariaMultiLine="",this.ariaMultiSelectable="",this.ariaOrientation="",this.ariaPlaceholder="",this.ariaPosInSet="",this.ariaPressed="",this.ariaReadOnly="",this.ariaRequired="",this.ariaRoleDescription="",this.ariaRowCount="",this.ariaRowIndex="",this.ariaRowSpan="",this.ariaSelected="",this.ariaSetSize="",this.ariaSort="",this.ariaValueMax="",this.ariaValueMin="",this.ariaValueNow="",this.ariaValueText="",this.role="",this.form=null,this.labels=[],this.states=new Set,this.validationMessage="",this.validity={},this.willValidate=!0,this.__host=t}checkValidity(){return console.warn("`ElementInternals.checkValidity()` was called on the server.This method always returns true."),!0}reportValidity(){return!0}setFormValue(){}setValidity(){}};
/**
     * @license
     * Copyright 2023 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
/**
     * @license
     * Copyright 2023 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var s,n,r,l,d,h,p,c,g,m,y,u,f=function(t,e,i,a,o){if("m"===a)throw new TypeError("Private method is not writable");if("a"===a&&!o)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!o:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===a?o.call(t,i):o?o.value=i:e.set(t,i),i},b=function(t,e,i,a){if("a"===i&&!a)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!a:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===i?a:"a"===i?a.call(t):a?a.value:e.get(t)};const v=t=>"boolean"==typeof t?t:t?.capture??!1;const _=class{constructor(){this.__eventListeners=new Map,this.__captureEventListeners=new Map}addEventListener(t,e,i){if(null==e)return;const a=v(i)?this.__captureEventListeners:this.__eventListeners;let o=a.get(t);if(void 0===o)o=new Map,a.set(t,o);else if(o.has(e))return;const s="object"==typeof i&&i?i:{};s.signal?.addEventListener("abort",()=>this.removeEventListener(t,e,i)),o.set(e,s??{})}removeEventListener(t,e,i){if(null==e)return;const a=v(i)?this.__captureEventListeners:this.__eventListeners,o=a.get(t);void 0!==o&&(o.delete(e),o.size||a.delete(t))}dispatchEvent(t){const e=[this];let i=this.__eventTargetParent;if(t.composed)for(;i;)e.push(i),i=i.__eventTargetParent;else for(;i&&i!==this.__host;)e.push(i),i=i.__eventTargetParent;let a=!1,o=!1,s=0,n=null,r=null,l=null;const d=t.stopPropagation,h=t.stopImmediatePropagation;Object.defineProperties(t,{target:{get:()=>n??r,...w},srcElement:{get:()=>t.target,...w},currentTarget:{get:()=>l,...w},eventPhase:{get:()=>s,...w},composedPath:{value:()=>e,...w},stopPropagation:{value:()=>{a=!0,d.call(t)},...w},stopImmediatePropagation:{value:()=>{o=!0,h.call(t)},...w}});const p=(e,i,a)=>{"function"==typeof e?e(t):"function"==typeof e?.handleEvent&&e.handleEvent(t),i.once&&a.delete(e)},c=()=>(l=null,s=0,!t.defaultPrevented),g=e.slice().reverse();n=this.__host&&t.composed?null:this;const m=t=>{for(r=this;r.__host&&t.includes(r.__host);)r=r.__host};for(const e of g){n||r&&r!==e.__host||m(g.slice(g.indexOf(e))),l=e,s=e===t.target?2:1;const i=e.__captureEventListeners.get(t.type);if(i)for(const[t,e]of i)if(p(t,e,i),o)return c();if(a)return c()}const y=t.bubbles?e:[this];r=null;for(const e of y){n||r&&e!==r.__host||m(y.slice(0,y.indexOf(e)+1)),l=e,s=e===t.target?2:3;const i=e.__eventListeners.get(t.type);if(i)for(const[t,e]of i)if(p(t,e,i),o)return c();if(a)return c()}return c()}},w={__proto__:null,enumerable:!0};Object.freeze(w);const k=(m=class{constructor(t,e={}){if(s.set(this,!1),n.set(this,!1),r.set(this,!1),l.set(this,!1),d.set(this,Date.now()),h.set(this,!1),p.set(this,void 0),c.set(this,void 0),g.set(this,void 0),this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,0===arguments.length)throw new Error("The type argument must be specified");if("object"!=typeof e||!e)throw new Error('The "options" argument must be an object');const{bubbles:i,cancelable:a,composed:o}=e;f(this,s,!!a,"f"),f(this,n,!!i,"f"),f(this,r,!!o,"f"),f(this,p,`${t}`,"f"),f(this,c,null,"f"),f(this,g,!1,"f")}initEvent(t,e,i){throw new Error("Method not implemented.")}stopImmediatePropagation(){this.stopPropagation()}preventDefault(){f(this,l,!0,"f")}get target(){return b(this,c,"f")}get currentTarget(){return b(this,c,"f")}get srcElement(){return b(this,c,"f")}get type(){return b(this,p,"f")}get cancelable(){return b(this,s,"f")}get defaultPrevented(){return b(this,s,"f")&&b(this,l,"f")}get timeStamp(){return b(this,d,"f")}composedPath(){return b(this,g,"f")?[b(this,c,"f")]:[]}get returnValue(){return!b(this,s,"f")||!b(this,l,"f")}get bubbles(){return b(this,n,"f")}get composed(){return b(this,r,"f")}get eventPhase(){return b(this,g,"f")?m.AT_TARGET:m.NONE}get cancelBubble(){return b(this,h,"f")}set cancelBubble(t){t&&f(this,h,!0,"f")}stopPropagation(){f(this,h,!0,"f")}get isTrusted(){return!1}},s=new WeakMap,n=new WeakMap,r=new WeakMap,l=new WeakMap,d=new WeakMap,h=new WeakMap,p=new WeakMap,c=new WeakMap,g=new WeakMap,m.NONE=0,m.CAPTURING_PHASE=1,m.AT_TARGET=2,m.BUBBLING_PHASE=3,m);Object.defineProperties(k.prototype,{initEvent:w,stopImmediatePropagation:w,preventDefault:w,target:w,currentTarget:w,srcElement:w,type:w,cancelable:w,defaultPrevented:w,timeStamp:w,composedPath:w,returnValue:w,bubbles:w,composed:w,eventPhase:w,cancelBubble:w,stopPropagation:w,isTrusted:w});const x=(u=class extends k{constructor(t,e={}){super(t,e),y.set(this,void 0),f(this,y,e?.detail??null,"f")}initCustomEvent(t,e,i,a){throw new Error("Method not implemented.")}get detail(){return b(this,y,"f")}},y=new WeakMap,u);Object.defineProperties(x.prototype,{detail:w});const A=k,S=x;
/**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
globalThis.Event??=A,globalThis.CustomEvent??=S;const M=new WeakMap,E=t=>{let e=M.get(t);return void 0===e&&M.set(t,e=new Map),e},T=class extends _{constructor(){super(...arguments),this.__shadowRootMode=null,this.__shadowRoot=null,this.__internals=null}get attributes(){return Array.from(E(this)).map(([t,e])=>({name:t,value:e}))}get shadowRoot(){return"closed"===this.__shadowRootMode?null:this.__shadowRoot}get localName(){return this.constructor.__localName}get tagName(){return this.localName?.toUpperCase()}setAttribute(t,e){E(this).set(t,String(e))}removeAttribute(t){E(this).delete(t)}toggleAttribute(t,e){return this.hasAttribute(t)?!(void 0===e||!e)||(this.removeAttribute(t),!1):!(void 0!==e&&!e)&&(this.setAttribute(t,""),!0)}hasAttribute(t){return E(this).has(t)}attachShadow(t){const e={host:this};return this.__shadowRootMode=t.mode,t&&"open"===t.mode&&(this.__shadowRoot=e),e}attachInternals(){if(null!==this.__internals)throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");const t=new o(this);return this.__internals=t,t}getAttribute(t){return E(this).get(t)??null}},C=class extends T{};globalThis.litServerRoot??=Object.defineProperty(new C,"localName",{get:()=>"lit-server-root"});const P=new class{constructor(){this.__definitions=new Map,this.__reverseDefinitions=new Map,this.__pendingWhenDefineds=new Map}define(t,e){if(this.__definitions.has(t)){if("development"!==process.env.NODE_ENV)throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the name "${t}" has already been used with this registry`);console.warn(`'CustomElementRegistry' already has "${t}" defined. This may have been caused by live reload or hot module replacement in which case it can be safely ignored.\nMake sure to test your application with a production build as repeat registrations will throw in production.`)}if(this.__reverseDefinitions.has(e))throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the constructor has already been used with this registry for the tag name ${this.__reverseDefinitions.get(e)}`);e.__localName=t,this.__definitions.set(t,{ctor:e,observedAttributes:e.observedAttributes??[]}),this.__reverseDefinitions.set(e,t),this.__pendingWhenDefineds.get(t)?.resolve(e),this.__pendingWhenDefineds.delete(t)}get(t){const e=this.__definitions.get(t);return e?.ctor}getName(t){return this.__reverseDefinitions.get(t)??null}upgrade(t){throw new Error("customElements.upgrade is not currently supported in SSR. Please file a bug if you need it.")}async whenDefined(t){const e=this.__definitions.get(t);if(e)return e.ctor;let i=this.__pendingWhenDefineds.get(t);return i||(i=function(){let t,e;return{promise:new Promise((i,a)=>{t=i,e=a}),resolve:t,reject:e}}(),this.__pendingWhenDefineds.set(t,i)),i.promise}},j=globalThis,N=j.ShadowRoot&&(void 0===j.ShadyCSS||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,O=Symbol(),I=new WeakMap;let L=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==O)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(N&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=I.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&I.set(e,t))}return t}toString(){return this.cssText}};const R=t=>new L("string"==typeof t?t:t+"",void 0,O),z=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,a)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[a+1],t[0]);return new L(i,t,O)},D=(t,e)=>{N?t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(e=>{const i=document.createElement("style"),a=j.litNonce;void 0!==a&&i.setAttribute("nonce",a),i.textContent=e.cssText,t.appendChild(i)})},U=N||void 0===j.CSSStyleSheet?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return R(e)})(t):t;
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var V,F;const B=globalThis;null!==(V=B.customElements)&&void 0!==V||(B.customElements=P);const H=B.trustedTypes,Y=H?H.emptyScript:"",W=B.reactiveElementPolyfillSupport,G={toAttribute(t,e){switch(e){case Boolean:t=t?Y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},K=(t,e)=>e!==t&&(e==e||t==t),Z={attribute:!0,type:String,converter:G,reflect:!1,hasChanged:K},q="finalized";let Q=class extends(globalThis.HTMLElement??C){constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const a=this._$Ep(i,e);void 0!==a&&(this._$Ev.set(a,i),t.push(a))}),t}static createProperty(t,e=Z){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,a=this.getPropertyDescriptor(t,i,e);void 0!==a&&Object.defineProperty(this.prototype,t,a)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(a){const o=this[t];this[e]=a,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||Z}static finalize(){if(this.hasOwnProperty(q))return!1;this[q]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(U(t))}else void 0!==t&&e.push(U(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return D(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=Z){var a;const o=this.constructor._$Ep(t,i);if(void 0!==o&&!0===i.reflect){const s=(void 0!==(null===(a=i.converter)||void 0===a?void 0:a.toAttribute)?i.converter:G).toAttribute(e,i.type);this._$El=t,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$El=null}}_$AK(t,e){var i;const a=this.constructor,o=a._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=a.getPropertyOptions(o),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:G;this._$El=o,this[o]=s.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let a=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||K)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):a=!1),!this.isUpdatePending&&a&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var J;Q[q]=!0,Q.elementProperties=new Map,Q.elementStyles=[],Q.shadowRootOptions={mode:"open"},null==W||W({ReactiveElement:Q}),(null!==(F=B.reactiveElementVersions)&&void 0!==F?F:B.reactiveElementVersions=[]).push("1.6.3");const X=globalThis,tt=X.trustedTypes,et=tt?tt.createPolicy("lit-html",{createHTML:t=>t}):void 0,it="$lit$",at=`lit$${(Math.random()+"").slice(9)}$`,ot="?"+at,st=`<${ot}>`,nt=void 0===X.document?{createTreeWalker:()=>({})}:document,rt=()=>nt.createComment(""),lt=t=>null===t||"object"!=typeof t&&"function"!=typeof t,dt=Array.isArray,ht="[ \t\n\f\r]",pt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ct=/-->/g,gt=/>/g,mt=RegExp(`>|${ht}(?:([^\\s"'>=/]+)(${ht}*=${ht}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),yt=/'/g,ut=/"/g,ft=/^(?:script|style|textarea|title)$/i,bt=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),vt=Symbol.for("lit-noChange"),_t=Symbol.for("lit-nothing"),wt=new WeakMap,$t=nt.createTreeWalker(nt,129,null,!1);function kt(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==et?et.createHTML(e):e}const xt=(t,e)=>{const i=t.length-1,a=[];let o,s=2===e?"<svg>":"",n=pt;for(let e=0;e<i;e++){const i=t[e];let r,l,d=-1,h=0;for(;h<i.length&&(n.lastIndex=h,l=n.exec(i),null!==l);)h=n.lastIndex,n===pt?"!--"===l[1]?n=ct:void 0!==l[1]?n=gt:void 0!==l[2]?(ft.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=mt):void 0!==l[3]&&(n=mt):n===mt?">"===l[0]?(n=null!=o?o:pt,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,r=l[1],n=void 0===l[3]?mt:'"'===l[3]?ut:yt):n===ut||n===yt?n=mt:n===ct||n===gt?n=pt:(n=mt,o=void 0);const p=n===mt&&t[e+1].startsWith("/>")?" ":"";s+=n===pt?i+st:d>=0?(a.push(r),i.slice(0,d)+it+i.slice(d)+at+p):i+at+(-2===d?(a.push(void 0),e):p)}return[kt(t,s+(t[i]||"<?>")+(2===e?"</svg>":"")),a]};class At{constructor({strings:t,_$litType$:e},i){let a;this.parts=[];let o=0,s=0;const n=t.length-1,r=this.parts,[l,d]=xt(t,e);if(this.el=At.createElement(l,i),$t.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(a=$t.nextNode())&&r.length<n;){if(1===a.nodeType){if(a.hasAttributes()){const t=[];for(const e of a.getAttributeNames())if(e.endsWith(it)||e.startsWith(at)){const i=d[s++];if(t.push(e),void 0!==i){const t=a.getAttribute(i.toLowerCase()+it).split(at),e=/([.?@])?(.*)/.exec(i);r.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?Ct:"?"===e[1]?jt:"@"===e[1]?Nt:Tt})}else r.push({type:6,index:o})}for(const e of t)a.removeAttribute(e)}if(ft.test(a.tagName)){const t=a.textContent.split(at),e=t.length-1;if(e>0){a.textContent=tt?tt.emptyScript:"";for(let i=0;i<e;i++)a.append(t[i],rt()),$t.nextNode(),r.push({type:2,index:++o});a.append(t[e],rt())}}}else if(8===a.nodeType)if(a.data===ot)r.push({type:2,index:o});else{let t=-1;for(;-1!==(t=a.data.indexOf(at,t+1));)r.push({type:7,index:o}),t+=at.length-1}o++}}static createElement(t,e){const i=nt.createElement("template");return i.innerHTML=t,i}}function St(t,e,i=t,a){var o,s,n,r;if(e===vt)return e;let l=void 0!==a?null===(o=i._$Co)||void 0===o?void 0:o[a]:i._$Cl;const d=lt(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(s=null==l?void 0:l._$AO)||void 0===s||s.call(l,!1),void 0===d?l=void 0:(l=new d(t),l._$AT(t,i,a)),void 0!==a?(null!==(n=(r=i)._$Co)&&void 0!==n?n:r._$Co=[])[a]=l:i._$Cl=l),void 0!==l&&(e=St(t,l._$AS(t,e.values),l,a)),e}class Mt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:a}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:nt).importNode(i,!0);$t.currentNode=o;let s=$t.nextNode(),n=0,r=0,l=a[0];for(;void 0!==l;){if(n===l.index){let e;2===l.type?e=new Et(s,s.nextSibling,this,t):1===l.type?e=new l.ctor(s,l.name,l.strings,this,t):6===l.type&&(e=new Ot(s,this,t)),this._$AV.push(e),l=a[++r]}n!==(null==l?void 0:l.index)&&(s=$t.nextNode(),n++)}return $t.currentNode=nt,o}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Et{constructor(t,e,i,a){var o;this.type=2,this._$AH=_t,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=a,this._$Cp=null===(o=null==a?void 0:a.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=St(this,t,e),lt(t)?t===_t||null==t||""===t?(this._$AH!==_t&&this._$AR(),this._$AH=_t):t!==this._$AH&&t!==vt&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>dt(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==_t&&lt(this._$AH)?this._$AA.nextSibling.data=t:this.$(nt.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:a}=t,o="number"==typeof a?this._$AC(t):(void 0===a.el&&(a.el=At.createElement(kt(a.h,a.h[0]),this.options)),a);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.v(i);else{const t=new Mt(o,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=wt.get(t.strings);return void 0===e&&wt.set(t.strings,e=new At(t)),e}T(t){dt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,a=0;for(const o of t)a===e.length?e.push(i=new Et(this.k(rt()),this.k(rt()),this,this.options)):i=e[a],i._$AI(o),a++;a<e.length&&(this._$AR(i&&i._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class Tt{constructor(t,e,i,a,o){this.type=1,this._$AH=_t,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=_t}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,a){const o=this.strings;let s=!1;if(void 0===o)t=St(this,t,e,0),s=!lt(t)||t!==this._$AH&&t!==vt,s&&(this._$AH=t);else{const a=t;let n,r;for(t=o[0],n=0;n<o.length-1;n++)r=St(this,a[i+n],e,n),r===vt&&(r=this._$AH[n]),s||(s=!lt(r)||r!==this._$AH[n]),r===_t?t=_t:t!==_t&&(t+=(null!=r?r:"")+o[n+1]),this._$AH[n]=r}s&&!a&&this.j(t)}j(t){t===_t?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Ct extends Tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===_t?void 0:t}}const Pt=tt?tt.emptyScript:"";class jt extends Tt{constructor(){super(...arguments),this.type=4}j(t){t&&t!==_t?this.element.setAttribute(this.name,Pt):this.element.removeAttribute(this.name)}}class Nt extends Tt{constructor(t,e,i,a,o){super(t,e,i,a,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=St(this,t,e,0))&&void 0!==i?i:_t)===vt)return;const a=this._$AH,o=t===_t&&a!==_t||t.capture!==a.capture||t.once!==a.once||t.passive!==a.passive,s=t!==_t&&(a===_t||o);o&&this.element.removeEventListener(this.name,this,a),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class Ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){St(this,t)}}const It=X.litHtmlPolyfillSupport;null==It||It(At,Et),(null!==(J=X.litHtmlVersions)&&void 0!==J?J:X.litHtmlVersions=[]).push("2.8.0");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var Lt,Rt;class zt extends Q{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var a,o;const s=null!==(a=null==i?void 0:i.renderBefore)&&void 0!==a?a:e;let n=s._$litPart$;if(void 0===n){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;s._$litPart$=n=new Et(e.insertBefore(rt(),t),t,void 0,null!=i?i:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return vt}}zt.finalized=!0,zt._$litElement$=!0,null===(Lt=globalThis.litElementHydrateSupport)||void 0===Lt||Lt.call(globalThis,{LitElement:zt});const Dt=globalThis.litElementPolyfillSupport;null==Dt||Dt({LitElement:zt}),(null!==(Rt=globalThis.litElementVersions)&&void 0!==Rt?Rt:globalThis.litElementVersions=[]).push("3.3.3");const Ut=R("var(--fds-size-6, 48px)"),Vt=R("var(--fds-radius-compact, 2px)"),Ft=R("var(--fds-radius-large, 8px)"),Bt=R("var(--fds-style-elevation-200, 0px 6px 6px 0px rgba(0, 0, 0, 0.23), 0px 3px 6px 0px rgba(0, 0, 0, 0.16))"),Ht=R("var(--fds-typography-body-default-font-family, 'Public Sans')"),Yt=R("var(--fds-typography-body-default-font-size, 16px)"),Wt=R("var(--fds-typography-body-default-letter-spacing, 0px)"),Gt=R("var(--fds-typography-body-default-line-height, 150%)"),Kt=R("var(--fds-typography-body-default-font-weight, 400)"),Zt=R("var(--fds-typography-body-default-display, inline-block)"),qt=R("var(--fds-typography-body-large-font-family, 'Public Sans')"),Qt=R("var(--fds-typography-body-large-font-size, 18px)"),Jt=R("var(--fds-typography-body-large-letter-spacing, 0px)"),Xt=R("var(--fds-typography-body-large-line-height, 150%)"),te=R("var(--fds-typography-body-large-font-weight, 400)"),ee=R("var(--fds-typography-body-large-display, inline-block)"),ie=R("var(--fds-typography-body-micro-font-family, 'Public Sans')"),ae=R("var(--fds-typography-body-micro-font-size, 12px)"),oe=R("var(--fds-typography-body-micro-letter-spacing, 0px)"),se=R("var(--fds-typography-body-micro-line-height, 150%)"),ne=R("var(--fds-typography-body-micro-font-weight, 400)"),re=R("var(--fds-typography-body-micro-display, inline-block)"),le=R("var(--fds-typography-body-small-font-family, 'Public Sans')"),de=R("var(--fds-typography-body-small-font-size, 14px)"),he=R("var(--fds-typography-body-small-letter-spacing, 0px)"),pe=R("var(--fds-typography-body-small-line-height, 150%)"),ce=R("var(--fds-typography-body-small-font-weight, 400)"),ge=R("var(--fds-typography-body-small-display, inline-block)"),me=R("var(--fds-typography-emphasis-default-font-family, 'Public Sans')"),ye=R("var(--fds-typography-emphasis-default-font-size, 16px)"),ue=R("var(--fds-typography-emphasis-default-letter-spacing, 0px)"),fe=R("var(--fds-typography-emphasis-default-line-height, 150%)"),be=R("var(--fds-typography-emphasis-default-font-weight, 700)"),ve=R("var(--fds-typography-emphasis-default-display, inline-block)"),_e=R("var(--fds-typography-emphasis-large-font-family, 'Public Sans')"),we=R("var(--fds-typography-emphasis-large-font-size, 18px)"),$e=R("var(--fds-typography-emphasis-large-letter-spacing, 0px)"),ke=R("var(--fds-typography-emphasis-large-line-height, 150%)"),xe=R("var(--fds-typography-emphasis-large-font-weight, 700)"),Ae=R("var(--fds-typography-emphasis-large-display, inline-block)"),Se=R("var(--fds-typography-emphasis-micro-font-family, 'Public Sans')"),Me=R("var(--fds-typography-emphasis-micro-font-size, 12px)"),Ee=R("var(--fds-typography-emphasis-micro-letter-spacing, 0px)"),Te=R("var(--fds-typography-emphasis-micro-line-height, 150%)"),Ce=R("var(--fds-typography-emphasis-micro-font-weight, 700)"),Pe=R("var(--fds-typography-emphasis-micro-display, inline-block)"),je=R("var(--fds-typography-emphasis-small-font-family, 'Public Sans')"),Ne=R("var(--fds-typography-emphasis-small-font-size, 14px)"),Oe=R("var(--fds-typography-emphasis-small-letter-spacing, 0px)"),Ie=R("var(--fds-typography-emphasis-small-line-height, 150%)"),Le=R("var(--fds-typography-emphasis-small-font-weight, 700)"),Re=R("var(--fds-typography-emphasis-small-display, inline-block)"),ze=R("var(--fds-typography-heading-large-heading-3-font-family, 'Public Sans', 'PublicSans-Bold')"),De=R("var(--fds-typography-heading-large-heading-3-font-size, 40px)"),Ue=R("var(--fds-typography-heading-large-heading-3-letter-spacing, 0px)"),Ve=R("var(--fds-typography-heading-large-heading-3-line-height, 110%)"),Fe=R("var(--fds-typography-heading-large-heading-3-font-weight, 700)"),Be=R("var(--fds-typography-heading-large-heading-3-display, inline-block)"),He=R("var(--fds-typography-heading-large-heading-4-font-family, 'Public Sans', 'PublicSans-Bold')"),Ye=R("var(--fds-typography-heading-large-heading-4-font-size, 32px)"),We=R("var(--fds-typography-heading-large-heading-4-letter-spacing, 0px)"),Ge=R("var(--fds-typography-heading-large-heading-4-line-height, 110%)"),Ke=R("var(--fds-typography-heading-large-heading-4-font-weight, 700)"),Ze=R("var(--fds-typography-heading-large-heading-4-display, inline-block)"),qe=R("var(--fds-typography-heading-large-heading-5-font-family, 'Public Sans', 'PublicSans-Bold')"),Qe=R("var(--fds-typography-heading-large-heading-5-font-size, 28px)"),Je=R("var(--fds-typography-heading-large-heading-5-letter-spacing, 0px)"),Xe=R("var(--fds-typography-heading-large-heading-5-line-height, 110%)"),ti=R("var(--fds-typography-heading-large-heading-5-font-weight, 700)"),ei=R("var(--fds-typography-heading-large-heading-5-display, inline-block)"),ii=R("var(--fds-typography-heading-large-heading-6-font-family, 'Public Sans', 'PublicSans-Bold')"),ai=R("var(--fds-typography-heading-large-heading-6-font-size, 20px)"),oi=R("var(--fds-typography-heading-large-heading-6-letter-spacing, 0px)"),si=R("var(--fds-typography-heading-large-heading-6-line-height, 110%)"),ni=R("var(--fds-typography-heading-large-heading-6-font-weight, 700)"),ri=R("var(--fds-typography-heading-large-heading-6-display, inline-block)"),li=R("var(--fds-typography-heading-large-heading-1-font-family, 'Public Sans', 'PublicSans-Bold')"),di=R("var(--fds-typography-heading-large-heading-1-font-size, 64px)"),hi=R("var(--fds-typography-heading-large-heading-1-letter-spacing, 0px)"),pi=R("var(--fds-typography-heading-large-heading-1-line-height, 110%)"),ci=R("var(--fds-typography-heading-large-heading-1-font-weight, 700)"),gi=R("var(--fds-typography-heading-large-heading-1-display, inline-block)"),mi=R("var(--fds-typography-heading-large-heading-2-font-family, 'Public Sans', 'PublicSans-Bold')"),yi=R("var(--fds-typography-heading-large-heading-2-font-size, 48px)"),ui=R("var(--fds-typography-heading-large-heading-2-letter-spacing, 0px)"),fi=R("var(--fds-typography-heading-large-heading-2-line-height, 110%)"),bi=R("var(--fds-typography-heading-large-heading-2-font-weight, 700)"),vi=R("var(--fds-typography-heading-large-heading-2-display, inline-block)"),_i=R("var(--fds-typography-heading-small-heading-1-font-family, 'Public Sans', 'PublicSans-Bold')"),wi=R("var(--fds-typography-heading-small-heading-1-font-size, 42px)"),$i=R("var(--fds-typography-heading-small-heading-1-letter-spacing, 0px)"),ki=R("var(--fds-typography-heading-small-heading-1-line-height, 110%)"),xi=R("var(--fds-typography-heading-small-heading-1-font-weight, 700)"),Ai=R("var(--fds-typography-heading-small-heading-1-display, inline-block)"),Si=R("var(--fds-typography-heading-small-heading-2-font-family, 'Public Sans', 'PublicSans-Bold')"),Mi=R("var(--fds-typography-heading-small-heading-2-font-size, 32px)"),Ei=R("var(--fds-typography-heading-small-heading-2-letter-spacing, 0px)"),Ti=R("var(--fds-typography-heading-small-heading-2-line-height, 110%)"),Ci=R("var(--fds-typography-heading-small-heading-2-font-weight, 700)"),Pi=R("var(--fds-typography-heading-small-heading-2-display, inline-block)"),ji=R("var(--fds-typography-heading-small-heading-3-font-family, 'Public Sans', 'PublicSans-Bold')"),Ni=R("var(--fds-typography-heading-small-heading-3-font-size, 28px)"),Oi=R("var(--fds-typography-heading-small-heading-3-letter-spacing, 0px)"),Ii=R("var(--fds-typography-heading-small-heading-3-line-height, 110%)"),Li=R("var(--fds-typography-heading-small-heading-3-font-weight, 700)"),Ri=R("var(--fds-typography-heading-small-heading-3-display, inline-block)"),zi=R("var(--fds-typography-heading-small-heading-4-font-family, 'Public Sans', 'PublicSans-Bold')"),Di=R("var(--fds-typography-heading-small-heading-4-font-size, 24px)"),Ui=R("var(--fds-typography-heading-small-heading-4-letter-spacing, 0px)"),Vi=R("var(--fds-typography-heading-small-heading-4-line-height, 110%)"),Fi=R("var(--fds-typography-heading-small-heading-4-font-weight, 700)"),Bi=R("var(--fds-typography-heading-small-heading-4-display, inline-block)"),Hi=R("var(--fds-typography-heading-small-heading-5-font-family, 'Public Sans', 'PublicSans-Bold')"),Yi=R("var(--fds-typography-heading-small-heading-5-font-size, 18px)"),Wi=R("var(--fds-typography-heading-small-heading-5-letter-spacing, 0px)"),Gi=R("var(--fds-typography-heading-small-heading-5-line-height, 110%)"),Ki=R("var(--fds-typography-heading-small-heading-5-font-weight, 700)"),Zi=R("var(--fds-typography-heading-small-heading-5-display, inline-block)"),qi=R("var(--fds-typography-heading-small-heading-6-font-family, 'Public Sans', 'PublicSans-Bold')"),Qi=R("var(--fds-typography-heading-small-heading-6-font-size, 16px)"),Ji=R("var(--fds-typography-heading-small-heading-6-letter-spacing, 0px)"),Xi=R("var(--fds-typography-heading-small-heading-6-line-height, 110%)"),ta=R("var(--fds-typography-heading-small-heading-6-font-weight, 700)"),ea=R("var(--fds-typography-heading-small-heading-6-display, inline-block)"),ia=R("var(--fds-typography-link-large-font-family, 'Public Sans')"),aa=R("var(--fds-typography-link-large-font-size, 18px)"),oa=R("var(--fds-typography-link-large-letter-spacing, 0px)"),sa=R("var(--fds-typography-link-large-line-height, 150%)"),na=R("var(--fds-typography-link-large-font-weight, 400)"),ra=R("var(--fds-typography-link-large-text-decoration, underline)"),la=R("var(--fds-typography-link-large-display, inline-block)"),da=R("var(--fds-typography-link-micro-font-family, 'Public Sans')"),ha=R("var(--fds-typography-link-micro-font-size, 12px)"),pa=R("var(--fds-typography-link-micro-letter-spacing, 0px)"),ca=R("var(--fds-typography-link-micro-line-height, 150%)"),ga=R("var(--fds-typography-link-micro-font-weight, 400)"),ma=R("var(--fds-typography-link-micro-text-decoration, underline)"),ya=R("var(--fds-typography-link-micro-display, inline-block)"),ua=R("var(--fds-typography-link-small-font-family, 'Public Sans')"),fa=R("var(--fds-typography-link-small-font-size, 14px)"),ba=R("var(--fds-typography-link-small-letter-spacing, 0px)"),va=R("var(--fds-typography-link-small-line-height, 150%)"),_a=R("var(--fds-typography-link-small-font-weight, 400)"),wa=R("var(--fds-typography-link-small-text-decoration, underline)"),$a=R("var(--fds-typography-link-small-display, inline-block)"),ka=R("var(--fds-typography-link-default-font-family, 'Public Sans')"),xa=R("var(--fds-typography-link-default-font-size, 16px)"),Aa=R("var(--fds-typography-link-default-letter-spacing, 0px)"),Sa=R("var(--fds-typography-link-default-line-height, 150%)"),Ma=R("var(--fds-typography-link-default-font-weight, 400)"),Ea=R("var(--fds-typography-link-default-text-decoration, underline)"),Ta=R("var(--fds-typography-link-default-display, inline-block)"),Ca=R("var(--fds-typography-ui-helper-font-family, 'Public Sans', 'PublicSans-Regular')"),Pa=R("var(--fds-typography-ui-helper-font-size, 15px)"),ja=R("var(--fds-typography-ui-helper-letter-spacing, 0px)"),Na=R("var(--fds-typography-ui-helper-line-height, 100%)"),Oa=R("var(--fds-typography-ui-helper-font-weight, 400)"),Ia=R("var(--fds-typography-ui-helper-display, inline-block)"),La=R("var(--fds-typography-ui-id-font-family, 'Roboto Mono')"),Ra=R("var(--fds-typography-ui-id-font-size, 13px)"),za=R("var(--fds-typography-ui-id-letter-spacing, 0px)"),Da=R("var(--fds-typography-ui-id-line-height, 100%)"),Ua=R("var(--fds-typography-ui-id-font-weight, 700)"),Va=R("var(--fds-typography-ui-id-display, inline-block)"),Fa=R("var(--fds-typography-ui-label-font-family, 'Public Sans', 'PublicSans-Medium')"),Ba=R("var(--fds-typography-ui-label-font-size, 16px)"),Ha=R("var(--fds-typography-ui-label-letter-spacing, 0px)"),Ya=R("var(--fds-typography-ui-label-line-height, 22px)"),Wa=R("var(--fds-typography-ui-label-font-weight, 500)"),Ga=R("var(--fds-typography-ui-label-display, inline-block)"),Ka=R("var(--fds-typography-ui-placeholder-font-family, 'Public Sans', 'PublicSans-Medium')"),Za=R("var(--fds-typography-ui-placeholder-font-size, 16px)"),qa=R("var(--fds-typography-ui-placeholder-letter-spacing, 0px)"),Qa=R("var(--fds-typography-ui-placeholder-line-height, 100%)"),Ja=R("var(--fds-typography-ui-placeholder-font-weight, 500)"),Xa=R("var(--fds-typography-ui-placeholder-display, inline-block)"),to=R("var(--fds-typography-ui-tag-font-family, 'Public Sans', 'PublicSans-Bold')"),eo=R("var(--fds-typography-ui-tag-font-size, 16px)"),io=R("var(--fds-typography-ui-tag-letter-spacing, 0px)"),ao=R("var(--fds-typography-ui-tag-line-height, 100%)"),oo=R("var(--fds-typography-ui-tag-font-weight, 700)"),so=R("var(--fds-typography-ui-tag-display, inline-block)"),no=R("var(--fds-color-brand-black, #000000)"),ro=R("var(--fds-color-brand-white, #ffffff)"),lo=R("var(--fds-color-danger-200, #e55636)"),ho=R("var(--fds-color-danger-300, #b40000)"),po=R("var(--fds-color-danger-400, #720000)"),co=R("var(--fds-color-interactive-100, #90cefe)"),go=R("var(--fds-color-interactive-200, #1777f8)"),mo=R("var(--fds-color-neutral-50, #F6F6F6)"),yo=R("var(--fds-color-neutral-100, #cdcdd7)"),uo=R("var(--fds-color-neutral-200, #9696aa)"),fo=R("var(--fds-color-text-300, #9696aa)"),bo=R("var(--fds-color-text-1000, #000000)");z`
  .body-default-text {
    display: ${Zt};
    font-family: ${Ht};
    font-size: ${Yt};
    font-weight: ${Kt};
    letter-spacing: ${Wt};
    line-height: ${Gt};
  }
`,z`
  .body-large-text {
    display: ${ee};
    font-family: ${qt};
    font-size: ${Qt};
    font-weight: ${te};
    letter-spacing: ${Jt};
    line-height: ${Xt};
  }
`,z`
  .body-micro-text {
    display: ${re};
    font-family: ${ie};
    font-size: ${ae};
    font-weight: ${ne};
    letter-spacing: ${oe};
    line-height: ${se};
  }
`,z`
  .body-small-text {
    display: ${ge};
    font-family: ${le};
    font-size: ${de};
    font-weight: ${ce};
    letter-spacing: ${he};
    line-height: ${pe};
  }
`,z`
  .emphasis-default-text {
    display: ${ve};
    font-family: ${me};
    font-size: ${ye};
    font-weight: ${be};
    letter-spacing: ${ue};
    line-height: ${fe};
  }
`,z`
  .emphasis-large-text {
    display: ${Ae};
    font-family: ${_e};
    font-size: ${we};
    font-weight: ${xe};
    letter-spacing: ${$e};
    line-height: ${ke};
  }
`,z`
  .emphasis-micro-text {
    display: ${Pe};
    font-family: ${Se};
    font-size: ${Me};
    font-weight: ${Ce};
    letter-spacing: ${Ee};
    line-height: ${Te};
  }
`,z`
  .emphasis-small-text {
    display: ${Re};
    font-family: ${je};
    font-size: ${Ne};
    font-weight: ${Le};
    letter-spacing: ${Oe};
    line-height: ${Ie};
  }
`,z`
  .heading-large-1-text {
    display: ${gi};
    font-family: ${li};
    font-size: ${di};
    font-weight: ${ci};
    letter-spacing: ${hi};
    line-height: ${pi};
  }
`,z`
  .heading-large-2-text {
    display: ${vi};
    font-family: ${mi};
    font-size: ${yi};
    font-weight: ${bi};
    letter-spacing: ${ui};
    line-height: ${fi};
  }
`,z`
  .heading-large-3-text {
    display: ${Be};
    font-family: ${ze};
    font-size: ${De};
    font-weight: ${Fe};
    letter-spacing: ${Ue};
    line-height: ${Ve};
  }
`,z`
  .heading-large-4-text {
    display: ${Ze};
    font-family: ${He};
    font-size: ${Ye};
    font-weight: ${Ke};
    letter-spacing: ${We};
    line-height: ${Ge};
  }
`,z`
  .heading-large-5-text {
    display: ${ei};
    font-family: ${qe};
    font-size: ${Qe};
    font-weight: ${ti};
    letter-spacing: ${Je};
    line-height: ${Xe};
  }
`,z`
  .heading-large-6-text {
    display: ${ri};
    font-family: ${ii};
    font-size: ${ai};
    font-weight: ${ni};
    letter-spacing: ${oi};
    line-height: ${si};
  }
`,z`
  .heading-small-1-text {
    display: ${Ai};
    font-family: ${_i};
    font-size: ${wi};
    font-weight: ${xi};
    letter-spacing: ${$i};
    line-height: ${ki};
  }
`,z`
  .heading-small-2-text {
    display: ${Pi};
    font-family: ${Si};
    font-size: ${Mi};
    font-weight: ${Ci};
    letter-spacing: ${Ei};
    line-height: ${Ti};
  }
`,z`
  .heading-small-3-text {
    display: ${Ri};
    font-family: ${ji};
    font-size: ${Ni};
    font-weight: ${Li};
    letter-spacing: ${Oi};
    line-height: ${Ii};
  }
`,z`
  .heading-small-4-text {
    display: ${Bi};
    font-family: ${zi};
    font-size: ${Di};
    font-weight: ${Fi};
    letter-spacing: ${Ui};
    line-height: ${Vi};
  }
`,z`
  .heading-small-5-text {
    display: ${Zi};
    font-family: ${Hi};
    font-size: ${Yi};
    font-weight: ${Ki};
    letter-spacing: ${Wi};
    line-height: ${Gi};
  }
`,z`
  .heading-small-6-text {
    display: ${ea};
    font-family: ${qi};
    font-size: ${Qi};
    font-weight: ${ta};
    letter-spacing: ${Ji};
    line-height: ${Xi};
  }
`,z`
  .link-default-text {
    display: ${Ta};
    font-family: ${ka};
    font-size: ${xa};
    font-weight: ${Ma};
    letter-spacing: ${Aa};
    line-height: ${Sa};
    text-decoration: ${Ea};
  }
`,z`
  .link-large-text {
    display: ${la};
    font-family: ${ia};
    font-size: ${aa};
    font-weight: ${na};
    letter-spacing: ${oa};
    line-height: ${sa};
    text-decoration: ${ra};
  }
`,z`
  .link-micro-text {
    display: ${ya};
    font-family: ${da};
    font-size: ${ha};
    font-weight: ${ga};
    letter-spacing: ${pa};
    line-height: ${ca};
    text-decoration: ${ma};
  }
`,z`
  .link-small-text {
    display: ${$a};
    font-family: ${ua};
    font-size: ${fa};
    font-weight: ${_a};
    letter-spacing: ${ba};
    line-height: ${va};
    text-decoration: ${wa};
  }
`,z`
  .ui-helper-text {
    display: ${Ia};
    font-family: ${Ca};
    font-size: ${Pa};
    font-weight: ${Oa};
    letter-spacing: ${ja};
    line-height: ${Na};
  }
`,z`
  .ui-id-text {
    display: ${Va};
    font-family: ${La};
    font-size: ${Ra};
    font-weight: ${Ua};
    letter-spacing: ${za};
    line-height: ${Da};
  }
`;const vo=z`
  .ui-label-text {
    display: ${Ga};
    font-family: ${Fa};
    font-size: ${Ba};
    font-weight: ${Wa};
    letter-spacing: ${Ha};
    line-height: ${Ya};
  }
`;z`
  .ui-placeholder-text {
    display: ${Xa};
    font-family: ${Ka};
    font-size: ${Za};
    font-weight: ${Ja};
    letter-spacing: ${qa};
    line-height: ${Qa};
  }
`,z`
  .ui-tag-text {
    display: ${so};
    font-family: ${to};
    font-size: ${eo};
    font-weight: ${oo};
    letter-spacing: ${io};
    line-height: ${ao};
  }
`
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */;const _o=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function wo(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):_o(t,e)}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
/**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var $o;null===($o=globalThis.HTMLSlotElement)||void 0===$o||$o.prototype.assignedElements;
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const ko=1;let xo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const Ao="important",So=" !"+Ao,Mo=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends xo{constructor(t){var e;if(super(t),t.type!==ko||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const a=t[i];return null==a?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${a};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ht){this.ht=new Set;for(const t in e)this.ht.add(t);return this.render(e)}this.ht.forEach(t=>{null==e[t]&&(this.ht.delete(t),t.includes("-")?i.removeProperty(t):i[t]="")});for(const t in e){const a=e[t];if(null!=a){this.ht.add(t);const e="string"==typeof a&&a.endsWith(So);t.includes("-")||e?i.setProperty(t,e?a.slice(0,-11):a,e?Ao:""):i[t]=a}}return vt}});var Eo,To,Co=function(t,e,i,a){var o,s=arguments.length,n=s<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,a);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};!function(t){t.primary="primary",t.secondary="secondary"}(Eo||(Eo={})),function(t){t.left="left",t.right="right"}(To||(To={}));class Po extends zt{constructor(){super(...arguments),this.variant=Eo.primary,this.items=[],this.verticalMenuNavText="",this.verticalMenuThreshold=768,this._open=!1}connectedCallback(){super.connectedCallback(),D(this.shadowRoot,[Po.cssVariables,vo,Po.collapsedNavigationStyles,this.desktopStyles()])}render(){const t=this.items.filter(t=>t.position===To.right),e=this.items.filter(t=>t.position!==To.right);return bt` <div class="navigation-wrapper">
      <div class="navigation navigation--${this.variant} ui-label-text">
        ${this.variant===Eo.primary?bt` <div class="navigation__header">
              <slot></slot>
            </div>`:_t}
        <ul class="navigation__body ${this._open?"navigation__open":""}">
          ${e.map(t=>this.renderItem(t)).concat(t.map((t,e)=>this.renderItem(t,0===e?"item__first-right":"")))}
        </ul>
        <div class="navigation__button-wrapper">${this.renderNavigationButton()}</div>
      </div>
    </div>`}renderNavigationButton(){let t;switch(this.variant){case Eo.primary:t=this._open?bt`<fds-icon icon="chevron-up"></fds-icon>`:bt`<fds-icon icon="chevron-down"></fds-icon>`;break;case Eo.secondary:t=bt`<fds-icon icon="menu"></fds-icon>`}return bt`
      <button
        class="navigation__button navigation__button--${this.variant}"
        type="button"
        @click=${this.handleNavigationClick}
      >
        <span class="navigation__label ui-label-text">${this.verticalMenuNavText}</span>
        ${t}
      </button>
    `}handleNavigationClick(){this._open=!this._open}renderItem(t,e=""){var i;const a=null!==(i=t.verticalMenuOrder)&&void 0!==i?i:0;return bt` <li
      @click=${()=>this.handleSelect(t)}
      class="item ${this.selected===t?"item--active":""} ${e}"
      style=${Mo({order:a})}
    >
      <div class="item__label">
        ${t.icon&&bt`<fds-icon class="item__icon" .icon="${t.icon}"></fds-icon>`}
        <span>${t.label}</span>
      </div>
    </li>`}handleSelect(t){this.selected=t,this.dispatchEvent(new CustomEvent("select",{detail:t}))}desktopStyles(){return z`
      @container navigation-wrapper (min-width: ${R(this.verticalMenuThreshold)}px) {
        .navigation {
          flex-wrap: nowrap;
        }

        .navigation__body {
          width: 100%;
          order: 0;
          align-items: end;
          flex-direction: row;

          height: auto;
          visibility: visible;
          opacity: 1;
          overflow-y: visible;
          margin-left: 0;
          margin-top: 0;
        }

        .item__first-right {
          margin-left: auto;
        }

        .item {
          justify-items: center;
          order: 0 !important;
        }

        .item--active {
          padding-right: var(--element-horizontal-padding--primary);
        }

        .navigation--primary {
          height: 40px;
        }

        .navigation--primary .item--active:after {
          content: '';
          position: relative;
          top: 1px;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: var(--element-vertical-padding--primary) solid ${ro};
        }

        /* Disable the arrow shown on collapsed view */
        .navigation--primary .navigation__open .item--active .item__label:after {
          content: '';
          display: none;
        }

        .navigation--secondary .item {
          padding-bottom: calc(
            var(--element-vertical-padding--secondary) - var(--item-border-bottom-width--secondary)
          );
          border-bottom: var(--item-border-bottom-width--secondary) solid white;
        }

        .navigation--secondary .item--active {
          border-bottom: var(--item-border-bottom-width--secondary) solid black;
        }

        .navigation__button {
          display: none;
        }

        li:not(:has(ul)) {
          padding: 0;
          border-bottom: none;
          width: auto;
        }
      }
    `}}Po.cssVariables=z`
    :host {
      --element-vertical-padding--primary: 9px;
      --element-vertical-padding--secondary: 16px;
      --element-horizontal-padding--primary: 20px;
      --item-border-bottom-width--secondary: 3px;
    }
  `,Po.collapsedNavigationStyles=z`
    .navigation-wrapper {
      container-type: inline-size;
      container-name: navigation-wrapper;
    }
    .navigation {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      width: 100%;
      user-select: none;
    }

    .navigation__header,
    .navigation__body,
    .item__label {
      display: flex;
    }

    .item {
      cursor: pointer;
      display: grid;
      grid-template-rows: auto 0;
      padding: var(--element-vertical-padding--primary) var(--element-horizontal-padding--primary);
    }

    .item--active {
      padding-right: 0;
    }

    .navigation--secondary .item {
      padding: var(--element-vertical-padding--secondary) 16px;
    }

    .item__label {
      align-items: end;
    }

    .item__icon {
      margin-right: 6px;
    }

    .navigation__header ::slotted(*) {
      padding: var(--element-vertical-padding--primary) 24px var(--element-vertical-padding--primary) 32px;
    }

    .navigation__body {
      order: 2;
      align-items: stretch;
      flex-direction: column;
      list-style: none;
      margin: 0;
      padding: 0;

      height: 1px;
      width: 1px;
      visibility: hidden;
      opacity: 0;
      overflow-y: hidden;
      margin-left: -1px;
      margin-top: -1px;
      white-space: nowrap;
    }

    .navigation--primary {
      background-color: ${no};
      color: ${ro};
    }

    .navigation--primary .item:hover {
      color: ${fo};
    }

    .navigation--primary .navigation__open .item--active .item__label:after {
      content: '';
      position: relative;
      align-self: center;
      height: 0;
      margin-left: auto;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-right: var(--element-vertical-padding--primary) solid ${ro};
    }

    .navigation--secondary {
      background-color: ${ro};
      border-bottom: 1px solid ${no};
    }

    .navigation--secondary .item {
      border-bottom: 1px solid ${yo};
    }

    .navigation--secondary .item:hover {
      color: ${fo};
    }

    .navigation__open {
      height: auto;
      width: 100%;
      visibility: visible;
      opacity: 1;
      overflow-y: visible;
      margin-left: 0;
      margin-top: 0;

      border-top: 1px solid ${yo};
    }

    .navigation__button-wrapper {
      flex-grow: 1;
      display: flex;
      justify-content: flex-end;
    }

    .navigation__button {
      display: flex;
      align-items: center;

      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      text-align: center;
      user-select: none;
      white-space: nowrap;
    }

    .navigation__button--primary {
      background-color: ${no};
      color: ${ro};
      padding: var(--element-vertical-padding--primary);
    }

    .navigation__button--primary:hover {
      color: ${fo};
    }

    .navigation__button--secondary {
      background-color: ${ro};
      color: ${no};
      padding: var(--element-vertical-padding--secondary);
    }

    .navigation__button--secondary:hover {
      color: ${fo};
    }

    .navigation__label {
      margin-right: 10px;
    }
  `,Po.styles=[Po.cssVariables,vo,Po.collapsedNavigationStyles],Co([wo()],Po.prototype,"variant",void 0),Co([wo()],Po.prototype,"items",void 0),Co([wo()],Po.prototype,"selected",void 0),Co([wo({attribute:"vertical-menu-nav-text"})],Po.prototype,"verticalMenuNavText",void 0),Co([wo({type:Number,attribute:"vertical-menu-threshold"})],Po.prototype,"verticalMenuThreshold",void 0),Co([function(t){return wo({...t,state:!0})}()],Po.prototype,"_open",void 0);
/**
     * @license lucide v0.473.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */
const jo=(t,e,i=[])=>{const a=document.createElementNS("http://www.w3.org/2000/svg",t);return Object.keys(e).forEach(t=>{a.setAttribute(t,String(e[t]))}),i.length&&i.forEach(t=>{const e=jo(...t);a.appendChild(e)}),a};
/**
     * @license lucide v0.473.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */
const No={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};
/**
     * @license lucide v0.473.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */var Oo=function(t,e,i,a){var o,s=arguments.length,n=s<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,a);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};const Io={"alert-circle":["svg",No,[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]]],"alert-triangle":["svg",No,[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]]],"chevron-down":["svg",No,[["path",{d:"m6 9 6 6 6-6"}]]],"chevron-right":["svg",No,[["path",{d:"m9 18 6-6-6-6"}]]],"chevron-up":["svg",No,[["path",{d:"m18 15-6-6-6 6"}]]],menu:["svg",No,[["line",{x1:"4",x2:"20",y1:"12",y2:"12"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18"}]]],pencil:["svg",No,[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]]],plus:["svg",No,[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]]],"plus-circle":["svg",No,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M8 12h8"}],["path",{d:"M12 8v8"}]]],"trash-2":["svg",No,[["path",{d:"M3 6h18"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17"}]]],x:["svg",No,[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]]],settings:["svg",No,[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"}],["circle",{cx:"12",cy:"12",r:"3"}]]],"check-circle":["svg",No,[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335"}],["path",{d:"m9 11 3 3L22 4"}]]],"chevrons-left-right-ellipsis":["svg",No,[["path",{d:"m18 8 4 4-4 4"}],["path",{d:"m6 8-4 4 4 4"}],["path",{d:"M8 12h.01"}],["path",{d:"M12 12h.01"}],["path",{d:"M16 12h.01"}]]],"message-circle":["svg",No,[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z"}]]]};class Lo extends zt{constructor(){super(...arguments),this.size=a}render(){if(!this.icon||!Io[this.icon])return console.error(`invalid icon: '${this.icon}'`),null;const t=(([t,e,i])=>jo(t,e,i))(Io[this.icon]);return t.setAttribute("width",this.size.value),t.setAttribute("height",this.size.value),t}}Lo.styles=z`
    :host {
      display: inline-flex;
    }
  `,Oo([wo()],Lo.prototype,"size",void 0),Oo([wo()],Lo.prototype,"icon",void 0),customElements.define("fds-icon",Lo),customElements.define("fds-navigation",Po);const Ro={initialize:function(){const t={label:"Digitraffic",value:"digitraffic",url:"https://www.digitraffic.fi/"},e=[{label:"Liikennetilanne",value:"liikennetilanne",url:"https://liikennetilanne.fintraffic.fi/"},{label:"Palauteväylä",value:"palautevayla",url:"https://www.palautevayla.fi/aspa?lang=fi"},{label:"Junalähdöt",value:"junalahdot",url:"https://junalahdot.fintraffic.fi/"},{label:"Fintraffic Mobiili",value:"fintraffic-mobiili",url:"https://www.fintraffic.fi/fi/mobiili"},{label:"Fintraffic Matka",value:"fintraffic-matka",url:"https://matka.fintraffic.fi/"},{label:"Fintraffic Sky",value:"fintraffic-sky",url:"https://sky.fintraffic.fi/"},t,{label:"Digitransit",value:"digitransit",url:"https://digitransit.fi/"},{label:"NAP",value:"nap",url:"https://finap.fi/#/"}];customElements.whenDefined("fds-navigation").then(()=>{const i=document.createElement("fds-navigation");i.setAttribute("vertical-menu-threshold","1225"),i.innerHTML='\n      <a href="https://www.fintraffic.fi/fi">\n              <svg viewBox="0 0 253 42" style="height: 18px">\n                  <use href="/assets/fintraffic_horizontal_white.svg#fintraffic_horizontal_white"></use>\n              </svg>\n          </a>';i.variant=Eo.primary,i.items=e,i.selected=t,i.verticalMenuNavText="Services",i.addEventListener("select",e=>{const i=e.detail;window.open(i.url,"_blank"),e.target instanceof Po&&(e.target.selected=t)}),this.el.replaceWith(i)})}};function zo(){$.proxyAll(this,/^_/)}ckan.module("digitraffic_theme_top_navigation",Ro);const Do=()=>({initialize(){zo.apply(this),this._getMenuController().on("click",this._onMenuControllerClick),this._getMenuController().on("keydown",this._onMenuControllerKeyDown),this._getMenu().on("keydown",this._onMenuKeyDown)},_onMenuControllerClick(t){this._getMenuController().has(t.target)&&this._toggleList()},_onMenuControllerKeyDown(t){if(this._getMenuController().has(t.target)){const{key:e}=t;switch(e){case" ":case"Enter":t.preventDefault(),this._toggleList();break;case"ArrowDown":t.preventDefault(),this._focus("first")}}},_onMenuKeyDown(t){if(this._getMenuController().is(":visible")&&this._getMenu().has(t.target)){const{key:e}=t;switch(e){case"Escape":t.preventDefault(),this._closeList(),this._focus("menuController");break;case"ArrowDown":$(t.target).is("select")||(t.preventDefault(),this._focus("next"));break;case"ArrowUp":$(t.target).is("select")||(t.preventDefault(),this._focus("previous"))}}},_expandedClass:"expanded",_focus(t){let e;const i=this.el.find(":focus")[0],a=!!i&&!!this._getMenu().has(i),o=a&&this._getMenu().find("a:last")[0]===i,s=a&&this._getMenu().find("a:first")[0]===i;switch(t){case"first":e=this._getMenu().find("a:first");break;case"menuController":e=this._getMenuController();break;case"next":if(a){if(o)return;{const t=this._getMenu().find("a");e=t.filter(e=>e>0&&t[e-1]===i)}}else e=this._getMenu().find("a:first");break;case"previous":if(a){if(s)return;{const t=this._getMenu().find("a");e=t.filter(e=>e<t.length-1&&t[e+1]===i)}}else e=this._getMenu().find("a:first")}e.trigger("focus")},_toggleList(){this._isMenuOpen()?(this._closeList(),this._focus("menuController")):(this._openList(),this._focus("first"))},_isMenuOpen(){return this._getMenu().hasClass(this._expandedClass)},_closeList(){const t=this._getMenuController();this._getMenu().removeClass(this._expandedClass),t.attr("aria-expanded","false")},_openList(){const t=this._getMenuController();this._getMenu().addClass(this._expandedClass),t.attr("aria-expanded","true")},_getMenuController(){throw Error("No controller")},_getMenu(){throw Error("No menu")}}),Uo={...Do(),_getMenuController:()=>$("#app-nav-hamburger-button"),_getMenu:()=>$("#nav-interactions-wrapper")};ckan.module("digitraffic_theme_app_navigation",Uo);const Vo={...Do(),_getMenuController:()=>$("#user-action-select"),_getMenu:()=>$("#user-action-list")};ckan.module("digitraffic_theme_user_actions",Vo);const Fo={"https://w3id.org/mobilitydcat-ap/mobility-theme/air-and-space-travel":[],"https://w3id.org/mobilitydcat-ap/mobility-theme/cycle-network-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/network-closures-diversions","https://w3id.org/mobilitydcat-ap/mobility-theme/network-detailed-attributes","https://w3id.org/mobilitydcat-ap/mobility-theme/network-geometry-and-lane-character"],"https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-traffic-signs-and-regulations":["https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-closures-and-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/direction-of-travel-on-reversible-lanes","https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-overtaking-bans-on-heavy-goods-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-speed-limits","https://w3id.org/mobilitydcat-ap/mobility-theme/lane-closures-and-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/other-access-restrictions-and-traffic-regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/other-temporary-traffic-management-measures-or-plans","https://w3id.org/mobilitydcat-ap/mobility-theme/road-closures-and-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-closures-and-access-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/filling-and-charging-stations":["https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-charging-points-for-electric-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-filling-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-charging-points","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-filling-stations"],"https://w3id.org/mobilitydcat-ap/mobility-theme/freight-and-logistics":["https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-delivery-areas","https://w3id.org/mobilitydcat-ap/mobility-theme/freight-delivery-regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-delivery-areas"],"https://w3id.org/mobilitydcat-ap/mobility-theme/general-information-for-trip-planning-":["https://w3id.org/mobilitydcat-ap/mobility-theme/address-identifiers","https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-costs","https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-environmental-factors","https://w3id.org/mobilitydcat-ap/mobility-theme/points-of-interest","https://w3id.org/mobilitydcat-ap/mobility-theme/topographic-places"],"https://w3id.org/mobilitydcat-ap/mobility-theme/other":[],"https://w3id.org/mobilitydcat-ap/mobility-theme/parking-service-and-rest-area-information":["https://w3id.org/mobilitydcat-ap/mobility-theme/bike-parking-locations","https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-locations-and-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/park-and-ride-stops","https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-locations-and-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-locations-and-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-accessibility-facilities","https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-geometry"],"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-non-scheduled-transport":["https://w3id.org/mobilitydcat-ap/mobility-theme/accesibility-information-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/fares","https://w3id.org/mobilitydcat-ap/mobility-theme/locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/provider-data","https://w3id.org/mobilitydcat-ap/mobility-theme/reservation-and-purchase-options","https://w3id.org/mobilitydcat-ap/mobility-theme/service-areas-and-service-times"],"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-scheduled-transport":["https://w3id.org/mobilitydcat-ap/mobility-theme/basic-commercial-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/basic-common-standard-fares","https://w3id.org/mobilitydcat-ap/mobility-theme/common-fare-products","https://w3id.org/mobilitydcat-ap/mobility-theme/connection-links","https://w3id.org/mobilitydcat-ap/mobility-theme/disruptions-delays-cancellations","https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/hours-of-operation","https://w3id.org/mobilitydcat-ap/mobility-theme/network-topology-and-routes-lines","https://w3id.org/mobilitydcat-ap/mobility-theme/operational-calendar","https://w3id.org/mobilitydcat-ap/mobility-theme/passenger-classes","https://w3id.org/mobilitydcat-ap/mobility-theme/planned-interchanges-between-scheduled-services","https://w3id.org/mobilitydcat-ap/mobility-theme/purchase-information","https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-estimated-departure-and-arrival-times","https://w3id.org/mobilitydcat-ap/mobility-theme/special-fare-products","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-accessibility-and-paths-within-facility","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-geometry-and-map-layout","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-location-and-features","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-status-of-features","https://w3id.org/mobilitydcat-ap/mobility-theme/timetables-static","https://w3id.org/mobilitydcat-ap/mobility-theme/transport-operators","https://w3id.org/mobilitydcat-ap/mobility-theme/vehicle-details"],"https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-traffic-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/current-travel-times","https://w3id.org/mobilitydcat-ap/mobility-theme/expected-delays","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-length-of-queues","https://w3id.org/mobilitydcat-ap/mobility-theme/predicted-travel-times","https://w3id.org/mobilitydcat-ap/mobility-theme/speed","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-data-at-border-crossings-to-third-countries","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-volume","https://w3id.org/mobilitydcat-ap/mobility-theme/waiting-time-at-border-crossings-to-non-eu-member-states"],"https://w3id.org/mobilitydcat-ap/mobility-theme/road-events-and-conditions":["https://w3id.org/mobilitydcat-ap/mobility-theme/accidents-and-incidents","https://w3id.org/mobilitydcat-ap/mobility-theme/poor-road-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/road-weather-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/road-work-information":["https://w3id.org/mobilitydcat-ap/mobility-theme/long-term-road-works","https://w3id.org/mobilitydcat-ap/mobility-theme/short-term-road-works"],"https://w3id.org/mobilitydcat-ap/mobility-theme/sharing-and-hiring-services":["https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods"],"https://w3id.org/mobilitydcat-ap/mobility-theme/static-road-network-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/geometry","https://w3id.org/mobilitydcat-ap/mobility-theme/gradients","https://w3id.org/mobilitydcat-ap/mobility-theme/junctions","https://w3id.org/mobilitydcat-ap/mobility-theme/number-of-lanes","https://w3id.org/mobilitydcat-ap/mobility-theme/road-classification","https://w3id.org/mobilitydcat-ap/mobility-theme/road-width"],"https://w3id.org/mobilitydcat-ap/mobility-theme/static-traffic-signs-and-regulations":["https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/other-static-traffic-signs","https://w3id.org/mobilitydcat-ap/mobility-theme/other-traffic-regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/permanent-access-restrictions","https://w3id.org/mobilitydcat-ap/mobility-theme/speed-limits","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-circulation-plans","https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-access-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/toll-information":["https://w3id.org/mobilitydcat-ap/mobility-theme/applicable-road-user-charges-and-payment-methods","https://w3id.org/mobilitydcat-ap/mobility-theme/identification-of-tolled-roads","https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-tolling-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods-for-tolls"],"https://w3id.org/mobilitydcat-ap/mobility-theme/waterways-and-water-bodies":[]},Bo=new Set(Object.keys(Fo)),Ho=new Set(Object.values(Fo).flat()),Yo={"https://w3id.org/mobilitydcat-ap/mobility-theme/accesibility-information-for-vehicles":{en:"Accesibility information for vehicles",fi:"Ajoneuvojen esteettömyystiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/accidents-and-incidents":{en:"Accidents and incidents",fi:"Liikenneonnettomuudet ja -häiriöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/address-identifiers":{en:"Address identifiers",fi:"Osoitetunnisteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/air-and-space-travel":{en:"Air and space travel",fi:"Ilma- ja avaruusmatkailu"},"https://w3id.org/mobilitydcat-ap/mobility-theme/applicable-road-user-charges-and-payment-methods":{en:"Applicable road user charges and payment methods",fi:"Sovellettavat tienkäyttömaksut ja maksutavat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-charging-points-for-electric-vehicles":{en:"Availability of charging points for electric vehicles",fi:"Sähköajoneuvojen latauspisteiden saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-delivery-areas":{en:"Availability of delivery areas",fi:"Lastaus- ja purkauspaikkojen saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-filling-stations":{en:"Availability of filling stations",fi:"Tankkausasemien saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/basic-commercial-conditions":{en:"Basic commercial conditions",fi:"Kaupalliset perusehdot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/basic-common-standard-fares":{en:"Basic common standard fares",fi:"Yleiset perusmaksut"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-availability":{en:"Bike-hiring Availability",fi:"Vuokrapyörien saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-stations":{en:"Bike-hiring Stations",fi:"Pyöränvuokrausasemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-parking-locations":{en:"Bike-parking locations",fi:"Polkupyöräparkit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-availability":{en:"Bike sharing Availability",fi:"Kaupunkipyörien saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-locations-and-stations":{en:"Bike-sharing Locations and stations",fi:"Kaupunkipyörien sijainnit ja asemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-access-conditions":{en:"Bridge access conditions",fi:"Siltojen käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-closures-and-access-conditions":{en:"Bridge closures and access conditions",fi:"Siltojen sulkemiset ja käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-availability":{en:"Car-hiring Availability",fi:"Autonvuokrauksen saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-stations":{en:"Car-hiring Stations",fi:"Autonvuokrausasemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-availability":{en:"Car parking availability",fi:"Autojen pysäköinnin saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-locations-and-conditions":{en:"Car parking locations and conditions",fi:"Autojen pysäköintipaikat ja -olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-availability":{en:"Car-sharing Availability",fi:"Yhteiskäyttöautojen saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-locations-and-stations":{en:"Car-sharing Locations and stations",fi:"Yhteiskäyttöautojen sijainnit ja asemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/common-fare-products":{en:"Common fare products",fi:"Yleiset lipputuotteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/connection-links":{en:"Connection links",fi:"Vaihtoyhteydet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/current-travel-times":{en:"Current travel times",fi:"Ajankohtaiset matka-ajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/cycle-network-data":{en:"Cycle network data",fi:"Pyöräilyverkon tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/direction-of-travel-on-reversible-lanes":{en:"Direction of travel on reversible lanes",fi:"Vaihtuvasuuntaisten kaistojen ajosuunta"},"https://w3id.org/mobilitydcat-ap/mobility-theme/disruptions-delays-cancellations":{en:"Disruptions, delays, cancellations",fi:"Häiriöt, viivästykset, peruutukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-overtaking-bans-on-heavy-goods-vehicles":{en:"Dynamic overtaking bans on heavy goods vehicles",fi:"Dynaamiset raskaiden ajoneuvojen ohituskiellot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-speed-limits":{en:"Dynamic speed limits",fi:"Dynaamiset nopeusrajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-traffic-signs-and-regulations":{en:"Dynamic traffic signs and regulations",fi:"Dynaamiset liikennemerkit ja -säännöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-availability":{en:"E-scooter-sharing Availability",fi:"Yhteiskäyttöisten sähköpotkulautojen saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-locations-and-stations":{en:"E-scooter-sharing Locations and stations",fi:"Yhteiskäyttöisten sähköpotkulautojen sijainnit ja asemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles":{en:"Environmental standards for vehicles",fi:"Ajoneuvojen ympäristöstandardit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/expected-delays":{en:"Expected delays",fi:"Tiedossa olevat viivästykset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/fares":{en:"Fares",fi:"Maksut ja tariffit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/filling-and-charging-stations":{en:"Filling and charging stations",fi:"Tankkaus- ja latausasemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/freight-and-logistics":{en:"Freight and logistics",fi:"Rahti ja logistiikka"},"https://w3id.org/mobilitydcat-ap/mobility-theme/freight-delivery-regulations":{en:"Freight delivery regulations",fi:"Rahdinkuljetusmääräykset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/general-information-for-trip-planning-":{en:"General information for trip-planning",fi:"Yleistä tietoa reittisuunnitteluun"},"https://w3id.org/mobilitydcat-ap/mobility-theme/geometry":{en:"Geometry",fi:"Geometria"},"https://w3id.org/mobilitydcat-ap/mobility-theme/gradients":{en:"Gradients",fi:"Kaltevuudet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/hours-of-operation":{en:"Hours of operation",fi:"Käyttöajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/identification-of-tolled-roads":{en:"Identification of tolled roads",fi:"Tietullin alaisten teiden yksilöiminen"},"https://w3id.org/mobilitydcat-ap/mobility-theme/junctions":{en:"Junctions",fi:"Liittymät"},"https://w3id.org/mobilitydcat-ap/mobility-theme/lane-closures-and-access-conditions":{en:"Lane closures and access conditions",fi:"Kaistojen sulkemiset ja käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-charging-points":{en:"Location and conditions of charging points",fi:"Latauspisteiden sijainnit ja olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-filling-stations":{en:"Location and conditions of filling stations",fi:"Tankkausasemien sijainnit ja olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-length-of-queues":{en:"Location and length of queues",fi:"Jonojen sijainti ja pituus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-delivery-areas":{en:"Location of delivery areas",fi:"Lastaus- ja purkausalueiden sijainti"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-tolling-stations":{en:"Location of tolling stations",fi:"Tietulliasemien sijainti"},"https://w3id.org/mobilitydcat-ap/mobility-theme/locations-and-stations":{en:"Locations and stations",fi:"Sijainnit ja asemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/long-term-road-works":{en:"Long-term road works",fi:"Pitkäaikaiset tietyöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/network-closures-diversions":{en:"Network closures/diversions",fi:"Verkon suljetut osat ja/tai kiertotiet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/network-detailed-attributes":{en:"Network detailed attributes",fi:"Verkon yksityiskohtaiset tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/network-geometry-and-lane-character":{en:"Network geometry and lane character",fi:"Verkkogeometria ja kaistojen luonne"},"https://w3id.org/mobilitydcat-ap/mobility-theme/network-topology-and-routes-lines":{en:"Network topology and routes/lines",fi:"Verkkotopologia ja reitit/linjat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/number-of-lanes":{en:"Number of lanes",fi:"Kaistojen määrä"},"https://w3id.org/mobilitydcat-ap/mobility-theme/operational-calendar":{en:"Operational Calendar",fi:"Operatiivinen kalenteri"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other":{en:"Other",fi:"Muu"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other-access-restrictions-and-traffic-regulations":{en:"Other access restrictions and traffic regulations",fi:"Muut käyttörajoitukset ja liikennesäännöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other-static-traffic-signs":{en:"Other static traffic signs",fi:"Muut staattiset liikennemerkit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other-temporary-traffic-management-measures-or-plans":{en:"Other temporary traffic management measures or plans",fi:"Muut tilapäiset liikenteenhallintatoimenpiteet tai -suunnitelmat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other-traffic-regulations":{en:"Other traffic regulations",fi:"Muut liikennesäännöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-costs":{en:"Parameters needed to calculate costs",fi:"Kustannusten laskemiseen tarvittavat parametrit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-environmental-factors":{en:"Parameters needed to calculate environmental factors",fi:"Ympäristötekijöiden laskemiseen tarvittavat parametrit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/park-and-ride-stops":{en:"Park and Ride stops",fi:"Julkisen liikenteen liityntäpysäköinti"},"https://w3id.org/mobilitydcat-ap/mobility-theme/parking-service-and-rest-area-information":{en:"Parking, service and rest area information",fi:"Pysäköinti-, palvelu- ja levähdysalueiden tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/passenger-classes":{en:"Passenger classes",fi:"Matkustajaluokat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods":{en:"Payment methods",fi:"Maksutavat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods-for-tolls":{en:"Payment methods for tolls",fi:"Tietullien maksutavat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-accessibility-facilities":{en:"Pedestrian accessibility facilities",fi:"Jalankulkijoiden esteettömyyttä tukevat välineet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-data":{en:"Pedestrian network data",fi:"Jalankulkuverkon tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-geometry":{en:"Pedestrian network geometry",fi:"Jalankulkuverkon geometria"},"https://w3id.org/mobilitydcat-ap/mobility-theme/permanent-access-restrictions":{en:"Permanent access restrictions",fi:"Pysyvät käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/planned-interchanges-between-scheduled-services":{en:"Planned interchanges between scheduled services",fi:"Suunnitellut vaihdot säännöllisten palvelujen välillä"},"https://w3id.org/mobilitydcat-ap/mobility-theme/points-of-interest":{en:"Points of interest",fi:"Kohdepisteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/poor-road-conditions":{en:"Poor road conditions",fi:"Huonokuntoiset tiet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/predicted-travel-times":{en:"Predicted travel times",fi:"Ennustetut matka-ajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/provider-data":{en:"Provider data",fi:"Palveluntarjoajan tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-non-scheduled-transport":{en:"Public transport non-scheduled transport",fi:"Joukkoliikenne, aikatauluttamaton"},"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-scheduled-transport":{en:"Public transport scheduled transport",fi:"Joukkoliikenne, säännöllinen"},"https://w3id.org/mobilitydcat-ap/mobility-theme/purchase-information":{en:"Purchase information",fi:"Ostotiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-estimated-departure-and-arrival-times":{en:"Real-time estimated departure and arrival times",fi:"Reaaliaikaiset arvioidut lähtö- ja saapumisajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-traffic-data":{en:"Real-time traffic data",fi:"Reaaliaikaiset liikennetiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/reservation-and-purchase-options":{en:"Reservation and purchase options",fi:"Varaus- ja ostovaihtoehdot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-classification":{en:"Road classification",fi:"Tien luokitus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-closures-and-access-conditions":{en:"Road closures and access conditions",fi:"Teiden sulkemiset ja käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-events-and-conditions":{en:"Road events and conditions",fi:"Tieolosuhteet ja tapahtumat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-weather-conditions":{en:"Road weather conditions",fi:"Tieolosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-width":{en:"Road width",fi:"Teiden leveys"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-work-information":{en:"Road work information",fi:"Tietyötiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-availability":{en:"Service and rest area availability",fi:"Palvelu- ja levähdysalueiden saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-locations-and-conditions":{en:"Service and rest area locations and conditions",fi:"Palvelu- ja levähdysalueiden sijainnit ja olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/service-areas-and-service-times":{en:"Service areas and service times",fi:"Palvelualueet ja palveluajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/sharing-and-hiring-services":{en:"Sharing and Hiring Services",fi:"Vuokraus- ja yhteiskäyttöpalvelut"},"https://w3id.org/mobilitydcat-ap/mobility-theme/short-term-road-works":{en:"Short-term road works",fi:"Lyhytaikaiset tietyöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/special-fare-products":{en:"Special Fare Products",fi:"Erikoismaksutuotteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/speed":{en:"Speed",fi:"Nopeus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/speed-limits":{en:"Speed limits",fi:"Nopeusrajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/static-road-network-data":{en:"Static road network data",fi:"Staattiset tieverkon tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/static-traffic-signs-and-regulations":{en:"Static traffic signs and regulations",fi:"Staattiset liikennemerkit ja -säännöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-accessibility-and-paths-within-facility":{en:"Stop facilities accessibility and paths within facility",fi:"Pysäkkipalveluiden esteettömyys ja reitit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-geometry-and-map-layout":{en:"Stop facilities geometry and map layout",fi:"Pysäkkipalveluiden geometria ja kartta"},"https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-location-and-features":{en:"Stop facilities location and features",fi:"Pysäkkipalveluiden sijainti ja ominaisuudet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-status-of-features":{en:"Stop facilities status of features",fi:"Pysäkkipalveluiden ominaisuuksien tila"},"https://w3id.org/mobilitydcat-ap/mobility-theme/timetables-static":{en:"Timetables static",fi:"Aikataulut, staattiset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/toll-information":{en:"Toll information",fi:"Tietullitiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/topographic-places":{en:"Topographic places",fi:"Topografiset paikat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-circulation-plans":{en:"Traffic circulation plans",fi:"Liikennevirtasuunnitelmat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-data-at-border-crossings-to-third-countries":{en:"Traffic data at border crossings to third countries",fi:"Liikennetiedot rajanylityspaikoilla kolmansiin maihin"},"https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-volume":{en:"Traffic volume",fi:"Liikenteen määrä"},"https://w3id.org/mobilitydcat-ap/mobility-theme/transport-operators":{en:"Transport operators",fi:"Liikenteenharjoittajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-availability":{en:"Truck parking availability",fi:"Kuorma-autopysäköinnin saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-locations-and-conditions":{en:"Truck parking locations and conditions",fi:"Kuorma-autojen pysäköintipaikat ja -olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-access-conditions":{en:"Tunnel access conditions",fi:"Tunneleiden käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-closures-and-access-conditions":{en:"Tunnel closures and access conditions",fi:"Tunneleiden sulkemiset ja käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/vehicle-details":{en:"Vehicle details",fi:"Ajoneuvojen tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/waiting-time-at-border-crossings-to-non-eu-member-states":{en:"Waiting time at border crossings to non-EU Member States",fi:"Odotusaika rajanylityspaikoilla EU:n ulkopuolisiin maihin"},"https://w3id.org/mobilitydcat-ap/mobility-theme/waterways-and-water-bodies":{en:"Waterways and water bodies",fi:"Vesiväylät ja vesistöt"}};function Wo(t){return"string"==typeof t&&Bo.has(t)}const Go={state:{},initialize(){zo.apply(this),this.state={topMobilityTheme:this._getInitialMobilityTheme()};this._getTopMobilityThemeSelector().on("change",this._onTopMobilityThemeChanged),this._onStateUpdate(this._handleTopMobilityThemeChanged),this._subThemeSelectorViewUpdate(void 0,this.state)},teardown:function(){this._stateListeners=void 0},_getInitialMobilityTheme(){const t=this._getTopMobilityThemeSelector().val();return Wo(t)?t:void 0},_getInitialSubMobilityTheme(){const t=this._getInitialSubMobilityThemeSelector().val();return"string"==typeof(e=t)&&Ho.has(e)?t:void 0;var e},_getTopMobilityThemeSelector(){return this.$("#field-mobility_theme")},_getInitialSubMobilityThemeSelector(){return this.$("#mobility_theme_sub_value")},_getSubMobilityThemeSelector(){return this.$("#field-mobility_theme_sub")},_onTopMobilityThemeChanged(t){if(t.target instanceof HTMLSelectElement){const e=t.target.value;if(!Wo(e))throw new Error(`Invalid mobility theme: ${e}`);this._mergeState({topMobilityTheme:e})}},_stateChangedKeys(t,e){const i=new Set;for(const a in t)a in e?t[a]!==e[a]&&i.add(a):i.add(a);for(const a in e)a in t||i.add(a);return i},_triggerListeners(t,e){if(this._stateListeners)for(const i of this._stateListeners)i(t,e)},_updateState(t){const e=this.state;this.state=t;const i=this._stateChangedKeys(e,t);return this._triggerListeners(e,i),t},_mergeState(t){const e=this.state,i={...this.state,...t};this.state=i;const a=this._stateChangedKeys(e,i);return this._triggerListeners(e,a),i},_onStateUpdate(t){return this._stateListeners?this._stateListeners.push(t):this._stateListeners=[t],()=>{this._stateListeners&&(this._stateListeners=this._stateListeners.filter(e=>e!==t))}},_handleTopMobilityThemeChanged(t,e){e.has("topMobilityTheme")&&this._subThemeSelectorViewUpdate(t,this.state)},_subThemeSelectorViewUpdate(t,e){function i(t){return"object"==typeof t&&!!t.subMobilityThemeSelectorParent&&!!t.subMobilityThemeSelector}function a(){const t=this._getSubMobilityThemeSelector().parentsUntil("form").filter("div.form-group");"none"!==t.css("display")?t.css("display","none"):t.css("display","")}const o=void 0===t,s=t?.topMobilityTheme!==e.topMobilityTheme;if(o||s){if(e.topMobilityTheme){const t=Fo[e.topMobilityTheme].map(t=>t),o=this._getInitialSubMobilityTheme();if(t?.length>0){(function(){if(i(e)){e.subMobilityThemeSelectorParent.append(e.subMobilityThemeSelector),a.apply(this);const t={...e},i=new Set(["subMobilityThemeSelector","subMobilityThemeSelectorParent"]),o=Object.keys(t).reduce((e,a)=>(i.has(a)||(e[a]=t[a]),e),{});this._updateState(o)}}).apply(this);const s=function(t,e){const i=t.map(t=>{const i=document.createElement("option");i.value=t;const a=$("html").attr("lang")??"en";return i.text=Yo[t][a]??Yo[t].en,t===e&&(i.selected=!0),i}),a=document.createElement("option");return a.value="",a.text="",e||(a.selected=!0),i.unshift(a),i.sort((t,e)=>t.text.localeCompare(e.text)),i}.apply(this,[t,o]);return void function(t){this._getSubMobilityThemeSelector().empty().append(t)}.apply(this,[s])}}(function(){if(!i(e)){a.apply(this);const t=this._getSubMobilityThemeSelector().parent(),e=this._getSubMobilityThemeSelector().detach();this._mergeState({subMobilityThemeSelector:e,subMobilityThemeSelectorParent:t})}}).apply(this)}}};ckan.module("digitraffic_theme_dataset_form_wrapper",Go);const Ko={initialize(){zo.apply(this)}};ckan.module("digitraffic_theme_iri_fragment_inputs",Ko);const Zo={initialize(){zo.apply(this);const t=this._getForm(),e=this._getFormInput(),i=this._getLanguageDropdown(),a=this._getLanguageOptions();i.on("click",this._toggleLanguageDropdownMouseOpen),i.on("keydown",this._toggleLanguageDropdownKeyboardOpen),a.each((i,a)=>{const o=$(a);o.on("click",()=>this._submitFormMouse(o,e,t)),o.on("keydown",i=>this._submitFormKeyboard(i,o,e,t))})},_toggleLanguageDropdownMouseOpen(t){t.target&&t.target.classList.toggle("open")},_toggleLanguageDropdownKeyboardOpen(t){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),t.target&&t.target.classList.toggle("open"))},_submitFormMouse(t,e,i){const a=t.attr("data-value");e&&a&&e.val(a),i&&i.trigger("submit")},_submitFormKeyboard(t,e,i,a){if("Enter"===t.key||" "===t.key){const t=e.attr("data-value");i&&t&&i.val(t),a&&a.trigger("submit")}},_getForm(){return this.$("#language-menu-form")},_getFormInput(){return this.$("#language-option-hidden")},_getLanguageDropdown(){return this.$(".custom-language-dropdown")},_getLanguageOptions(){return this.$(".custom-language-option")}};ckan.module("digitraffic_theme_language_menu",Zo);const qo={START_TIMESTAMP_TZ_CSS_QUERY:"#field-start_timestamp-tz",END_TIMESTAMP_TZ_CSS_QUERY:"#field-end_timestamp-tz",initialize(){zo.apply(this);const t=this._getStartTimestampTZ(),e=this._getEndTimestampTZ();this._moveToEnd(t),t.find(this.START_TIMESTAMP_TZ_CSS_QUERY).on("change",t=>{const i=t.target.value;e.find(this.END_TIMESTAMP_TZ_CSS_QUERY).val(i)}),e.hide(),this._showNecessityLabels()},_getStartTimestampTZ(){return this.$(".datetime-row").find(".datetime-field").has(this.START_TIMESTAMP_TZ_CSS_QUERY)},_getEndTimestampTZ(){return this.$(".datetime-row").find(".datetime-field").has(this.END_TIMESTAMP_TZ_CSS_QUERY)},_moveToEnd(t){t.appendTo(this.el)},_showNecessityLabels(){const t=this.$(".hide-necessity");t.length&&t.removeClass("hide-necessity")}};ckan.module("digitraffic_theme_temporal_coverage",qo);var Qo=function(t,e,i,a){var o,s=arguments.length,n=s<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,a);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};class Jo extends CustomEvent{constructor(t){super("select",{detail:t,bubbles:!0,cancelable:!0,composed:!1})}}class Xo extends zt{constructor(){super(),this.options=[],this.disabled=!1,this.error=!1,this.multiple=!1,this.required=!1,this.addEventListener("blur",()=>this.getButton().ariaExpanded="false"),this._internals=this.attachInternals()}firstUpdated(){this.tabIndex=0,this.setValidity(),this.multiple&&this.setMultipleHeaderContent(),this.setFormValue()}render(){const t=t=>bt`
      <li
        @click=${()=>this.handleSelect(t)}
        @keypress=${e=>this.handleKeypress(e,t)}
        class=${`ui-label-text option ${this.getOptionCssClass(t)}`}
        tabindex=${0}
        aria-selected=${this.value===t}
      >
        ${this.getLabel(t)}
      </li>
    `,e=t=>bt`
      <li>
        <label class="ui-label-text option option-multiple ${this.getOptionCssClass(t)}">
          <fds-checkbox
            @select="${()=>this.handleMultiSelect(t)}"
            ?checked=${!!Array.isArray(this.value)&&this.value.some(e=>e.value===t.value)}
          >
          </fds-checkbox>
          ${this.getLabel(t)}
        </label>
      </li>
    `,i=bt`
      <ul
        part="options-list"
        id="options-list"
        role="listbox"
        aria-label="options"
        class="options-list"
        aria-multiselectable="true"
      >
        ${this.options.map(i=>this.multiple?e(i):t(i))}
      </ul>
    `,a=0===this.renderRoot.children.length;return bt`
      <div class="dropdown-wrapper">
        <button
          @click=${()=>{const t=this.getButton();t.ariaExpanded=(!("true"===t.ariaExpanded)).toString()}}
          ?disabled=${this.disabled}
          class=${`ui-label-text ${this.getButtonCssClass()}`}
          role="combobox"
          aria-controls="options-list"
          aria-expanded=${(t=>null!=t?t:_t)(a?"false":this.getButton().ariaExpanded)}
        >
          ${this.multiple?(()=>{const t=this.value,e=bt`<div>${this.placeholder||""}</div>`;if(null==t)return e;if(!Array.isArray(t))throw new Error("Selected options should be an array when multiple is true");return 0===t.length?e:bt`
        <div class="selected-options-container">
          <div class="selected-options">
            ${t.map(t=>bt` <span class="selected-tag">${this.getLabel(t)}</span> `)}
          </div>
          <span class="overflow-counter"></span>
        </div>
      `})():(()=>{var t;return bt` <div>${null!==(t=this.getLabel(this.value))&&void 0!==t?t:this.placeholder}</div> `})()}
          <fds-icon icon="chevron-up"></fds-icon>
          <fds-icon icon="chevron-down"></fds-icon>
        </button>
        ${i}
      </div>
    `}setMultipleHeaderContent(){const t=this.renderRoot.querySelector(".selected-options-container"),e=this.renderRoot.querySelector(".selected-options"),i=this.renderRoot.querySelector(".overflow-counter");if(!t||!e||!i)return;const a=Array.from(e.querySelectorAll(".selected-tag"));let o=0;const s=t.clientWidth-30;let n=0;a.forEach(t=>{const e=t;n+=e.offsetWidth;const i=e.querySelector("fds-icon");i&&(n+=parseInt(i.size.value)),n>s?(e.classList.add("hidden"),o++):e.classList.remove("hidden")}),o>0?(i.classList.remove("hidden"),i.textContent=`+${o}`):(i.textContent="",i.classList.add("hidden"))}updated(){this.setMultipleHeaderContent()}handleKeypress(t,e){"Enter"===t.key&&this.handleSelect(e)}getButton(){const t=this.renderRoot.querySelector("button");if(null===t)throw new Error("Button element not found");return t}handleSelect(t){this.getButton().ariaExpanded="false",this.value=t,this.setValidity(),this.setFormValue(),this.dispatchEvent(new Jo(t))}handleMultiSelect(t){const e=this.getValues();this.value=e.length>0?e:void 0,this.setValidity(),this.setFormValue(),this.dispatchEvent(new Jo(t))}getLabel(t){if(!t)return null;if(Array.isArray(t)){if(0===t.length)return null;t=t[0]}const e=bt`<span class="label">${t.label}</span>`;return t.icon?bt`<span class="icon-label"><fds-icon .icon=${t.icon}></fds-icon>${e}</span>`:e}getValues(){var t;const e=t=>this.options.find(e=>e.label===t);let i=[];if(this.multiple){const t=this.renderRoot.querySelectorAll("fds-checkbox");i=Array.from(t).filter(t=>t.checked).map(t=>{if(null===t.labels||null===t.labels[0].textContent)return;const i=t.labels[0].textContent.trim();return e(i)}).filter(t=>void 0!==t)}else{const a=this.renderRoot.querySelectorAll("li"),o=Array.from(a).find(t=>"true"===t.getAttribute("aria-selected"));if(void 0!==o){const a=null===(t=o.textContent)||void 0===t?void 0:t.trim();if(void 0!==a){const t=e(a);i=t?[t]:[]}}}return structuredClone(i)}getButtonCssClass(){return this.error?"error":!this.value&&this.placeholder?"placeholder":""}getOptionCssClass(t){return this.value===t?"selected":""}checkValidity(){return this._internals.checkValidity()}reportValidity(){return this._internals.reportValidity()}get labels(){return this._internals.labels}get validity(){return this._internals.validity}get validationMessage(){return this._internals.validationMessage}setValidity(){const t=!!this.required&&void 0===this.value;this._internals.setValidity({valueMissing:t,customError:this.error},"Invalid state")}setFormValue(){const t=this.name;if(void 0!==t){const e=new FormData;this.getValues().forEach(i=>{i.value&&e.append(t,i.value.toString())}),this._internals.setFormValue(e)}}}Xo.formAssociated=!0,Xo.shadowRootOptions={...zt.shadowRootOptions,delegatesFocus:!0},Xo.styles=[vo,z`
      :host {
        width: 100%;
        position: relative;
        --fds-typography-ui-label-display: flex;
        --counter-width: 30px;
      }

      button {
        cursor: pointer;
        box-sizing: border-box;
        display: inline-flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        white-space: nowrap;

        width: 100%;
        /* TODO: what values? */
        height: 48px;
        padding-left: 16px;
        padding-right: 8px;
        gap: 10px;

        background-color: ${ro};
        border: 1px solid ${uo};
      }

      button:disabled {
        cursor: default;
        background-color: ${mo};
        color: ${fo};
      }

      button:disabled .chevron {
        color: ${fo};
      }

      button.placeholder {
        color: ${fo};
      }

      button.error {
        color: ${lo};
        border: 3px solid ${lo};
      }

      .selected-options-container {
        display: flex;
        align-items: center;
        overflow: hidden;
        width: 100%;
      }

      .selected-options {
        display: flex;
        flex-wrap: nowrap;
        overflow: hidden;
        width: calc(100% - var(--counter-width));
      }

      .selected-tag {
        white-space: nowrap;
        background: ${yo};
        padding: 2px 6px;
        margin-right: 4px;
        border-radius: 4px;
      }

      .hidden {
        visibility: hidden;
      }

      .overflow-counter {
        min-width: 24px;
      }

      .options-list {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        position: relative;
        z-index: 1;
        overflow-y: scroll;
        max-height: 80vh;
        box-shadow: ${Bt};
        padding: 0;
        list-style: none;
        margin: 0;
      }

      .dropdown-wrapper [aria-expanded='false'] ~ .options-list {
        display: none;
      }

      .dropdown-wrapper [aria-expanded='false'] fds-icon[icon='chevron-up'] {
        display: none;
      }

      .dropdown-wrapper [aria-expanded='true'] ~ .options-list {
        display: flex;
      }

      .dropdown-wrapper [aria-expanded='true'] fds-icon[icon='chevron-down'] {
        display: none;
      }

      fds-icon {
        position: static;
        color: ${bo};
      }

      .icon-label {
        display: flex;
        align-items: center;
        overflow: hidden;

        gap: 0.5em;
      }

      .label {
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .option {
        flex: 1 0 auto;
        display: flex;
        align-items: center;
        white-space: nowrap;

        /* TODO: what values? */
        height: 56px;
        padding-left: 16px;
        padding-right: 8px;

        background-color: ${ro};
        border-bottom: 1px solid ${uo};

        &.option-multiple {
          cursor: pointer;
          gap: 10px;
          flex-wrap: nowrap;
        }
      }

      .option:hover {
        /* TODO: what color? */
        background-color: ${co};
      }

      .option.selected {
        /* TODO: what color? */
        background-color: ${go};
      }
    `],Qo([wo({type:Array})],Xo.prototype,"options",void 0),Qo([wo({type:Boolean})],Xo.prototype,"disabled",void 0),Qo([wo({type:Boolean})],Xo.prototype,"error",void 0),Qo([wo()],Xo.prototype,"placeholder",void 0),Qo([wo({type:Object})],Xo.prototype,"value",void 0),Qo([wo({type:Boolean})],Xo.prototype,"multiple",void 0),Qo([wo({type:Boolean})],Xo.prototype,"required",void 0),Qo([wo()],Xo.prototype,"name",void 0);var ts=function(t,e,i,a){var o,s=arguments.length,n=s<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,a);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};class es extends zt{constructor(){super(),this.label="",this.disabled=!1,this.checked=!1,this.value="on",this._internals=this.attachInternals(),this.addEventListener("click",t=>{var e;if(t.target===this){t.preventDefault(),t.stopPropagation();const i=null===(e=this.shadowRoot)||void 0===e?void 0:e.getElementById("checkbox");i&&i.click()}})}firstUpdated(){this.tabIndex=0,this.setValidity()}render(){return bt`
      <input
        type="checkbox"
        id="checkbox"
        .disabled=${this.disabled}
        .checked="${this.checked}"
        .value="${this.value}"
        @change=${this.handleSelect}
        @click=${t=>{t.stopPropagation()}}
      />
      ${this.label&&bt`<label for="checkbox" class="ui-label-text">${this.label}</label>`}
    `}handleSelect(){this.disabled||(this.checked=!this.checked,this.setValidity(),this.setFormValue(),setTimeout(()=>{this.dispatchEvent(new CustomEvent("select",{detail:this.checked}))}))}checkValidity(){return this._internals.checkValidity()}reportValidity(){return this._internals.reportValidity()}get validity(){return this._internals.validity}get labels(){return this._internals.labels}get validationMessage(){return this._internals.validationMessage}setValidity(){var t;const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.getElementById("checkbox");this._internals.setValidity(e.validity,e.validationMessage,e)}setFormValue(){if(this.checked){void 0!==this.name&&this._internals.setFormValue(this.value.toString())}else this._internals.setFormValue(null)}}es.formAssociated=!0,es.shadowRootOptions={...zt.shadowRootOptions,delegatesFocus:!0},es.styles=[vo,z`
      :host {
        user-select: none;
      }

      #checkbox {
        appearance: none;
      }

      label {
        padding: 0 16px;
        position: relative;
        right: 7px;
      }

      label,
      #checkbox::before {
        cursor: pointer;
      }

      #checkbox::before {
        content: '';
        height: 16px;
        width: 16px;
        display: inline-block;
        vertical-align: sub;
        border: 2px solid ${no};
        border-radius: ${Vt};
      }

      #checkbox:checked::before {
        border-color: ${go};
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEwIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0zLjM4Nzc2IDcuNDAzM0wwLjE0NjA2NiA0LjE2MTYxQy0wLjA0ODY4ODcgMy45NjY4NSAtMC4wNDg2ODg3IDMuNjUxMDggMC4xNDYwNjYgMy40NTYzMUwwLjg1MTM0OSAyLjc1MUMxLjA0NjEgMi41NTYyMyAxLjM2MTkgMi41NTYyMyAxLjU1NjY1IDIuNzUxTDMuNzQwNDEgNC45MzQ3NEw4LjQxNzc4IDAuMjU3Mzk0QzguNjEyNTQgMC4wNjI2Mzk0IDguOTI4MzMgMC4wNjI2Mzk0IDkuMTIzMDggMC4yNTczOTRMOS44MjgzNyAwLjk2MjY5NkMxMC4wMjMxIDEuMTU3NDUgMTAuMDIzMSAxLjQ3MzIyIDkuODI4MzcgMS42NjhMNC4wOTMwNiA3LjQwMzMyQzMuODk4MjkgNy41OTgwOCAzLjU4MjUxIDcuNTk4MDggMy4zODc3NiA3LjQwMzNWNy40MDMzWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==');
        background-color: ${go};
        background-repeat: no-repeat;
        background-position: center;
      }

      #checkbox:disabled::before,
      #checkbox:disabled + label {
        cursor: default;
        color: ${fo};
      }

      #checkbox:disabled::before {
        border-color: ${fo};
      }

      #checkbox:disabled#checkbox:checked::before {
        background-color: ${fo};
      }
    `],ts([wo()],es.prototype,"label",void 0),ts([wo({type:Boolean})],es.prototype,"disabled",void 0),ts([wo({type:Boolean})],es.prototype,"checked",void 0),ts([wo()],es.prototype,"value",void 0),ts([wo()],es.prototype,"name",void 0),customElements.define("fds-checkbox",es),customElements.define("fds-dropdown",Xo);const is={initialize(){zo.apply(this);const t=this._getOptionValues();customElements.whenDefined("fds-dropdown").then(()=>{const e=document.createElement("fds-dropdown");e.options=this._optionValuesToFdsDropdownOptions(t),e.value=this._optionValuesToFdsDropdownOptions(t.filter(t=>t.selected)),e.multiple=!0,e.setAttribute("id",this.el[0].id),this.el[0].name&&e.setAttribute("name",this.el[0].name),this.el.replaceWith(e)})},_getOptionValues(){return this.$("option").toArray().map(t=>{if(null===t.textContent)throw new Error("Option element does not have text content");const e=t.textContent.trim();if(""!==e)return{label:e,value:t.value,selected:""===t.getAttribute("selected")}}).filter(t=>void 0!==t)},_optionValuesToFdsDropdownOptions:t=>t.map(t=>({label:t.label,value:t.value}))};ckan.module("digitraffic_theme_multi_select",is);const as={initialize(){zo.apply(this);this._getToggleButtons().children(".language-toggle-button").each((t,e)=>{const i=$(e),a=i.attr("id");i.on("click",t=>{t.preventDefault();this.$(`#field-${a}`).parent().parent().removeClass("hidden"),i.addClass("hidden")})});this._getCloseButtons().each((t,e)=>{const i=$(e),a=i.attr("id");i.on("click",t=>{t.preventDefault();$(`#${a}.language-toggle-button`).removeClass("hidden"),i.parent().parent().addClass("hidden");this.$(`#field-${a}`).val("")})})},_getToggleButtons(){return this.$(".language-toggle-buttons")},_getCloseButtons(){return this.$(".hide-language-input")}};ckan.module("digitraffic_theme_language_toggle_buttons",as);var os,ss=function(t,e,i,a){var o,s=arguments.length,n=s<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,a);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};!function(t){t.primary="primary",t.secondary="secondary",t.tertiary="tertiary",t.danger="danger"}(os||(os={}));const ns={primary:ro,secondary:no,tertiary:no,danger:ro};class rs extends zt{constructor(){super(),this.variant=os.primary,this.disabled=!1,this._internals=this.attachInternals()}updated(t){(t.has("value")||t.has("name"))&&(this.setValidity(),this.setFormValue())}render(){return bt`
      <button id="button" class="button--${this.variant}" ?disabled="${this.disabled}">
        ${this.icon&&bt`<fds-icon .icon="${this.icon}"></fds-icon>`}
        ${this.label&&bt`<span class="ui-label-text">${this.label}</span>`}
      </button>
    `}checkValidity(){return this._internals.checkValidity()}reportValidity(){return this._internals.reportValidity()}get validity(){return this._internals.validity}get labels(){return this._internals.labels}get validationMessage(){return this._internals.validationMessage}setValidity(){var t;const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.getElementById("button");this._internals.setValidity(e.validity,e.validationMessage,e)}setFormValue(){if(this.name&&void 0!==this.value){void 0!==this.name&&this._internals.setFormValue(this.value.toString())}else this._internals.setFormValue(null)}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this._handleFormSubmit)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this._handleFormSubmit)}_handleFormSubmit(){if("submit"===this.type||void 0===this.type){const t=this._internals.form;null==t||t.requestSubmit()}}}rs.formAssociated=!0,rs.shadowRootOptions={...zt.shadowRootOptions,delegatesFocus:!0},rs.styles=[vo,z`
      :host {
        display: inline-flex;
        justify-content: center;
      }

      button {
        cursor: pointer;
        display: flex;
        border: 2px solid ${no};
        border-radius: ${Ft};
        padding: 13px 16px;
        height: ${Ut};
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 200ms;
        width: inherit;
      }

      button *,
      button ::slotted(*) {
        line-height: 1;
      }

      .button--primary {
        border-color: ${no};
        background: ${no};
        color: ${ns[os.primary]};
      }

      .button--secondary {
        border: 2px solid ${no};
        background: ${ro};
        color: ${ns[os.secondary]};
      }

      .button--tertiary {
        background: transparent;
        border-color: transparent;
        color: ${ns[os.tertiary]};
      }

      .button--danger {
        background: ${ho};
        border-color: transparent;
        color: ${ns[os.danger]};
      }

      .button--primary:hover,
      .button--secondary:hover,
      .button--tertiary:hover {
        background: ${go};
        border-color: transparent;
        color: ${ro};
      }

      .button--danger:hover {
        background: ${po};
        border-color: ${po};
        color: ${ro};
      }

      .button--primary:disabled {
        background: ${yo};
        border-color: ${yo};
        color: ${fo};
      }

      .button--secondary:disabled {
        background: transparent;
        color: ${yo};
        border-color: ${yo};
      }

      .button--tertiary:disabled {
        background: transparent;
        border-color: transparent;
        color: ${yo};
      }

      .button--danger:disabled {
        background: ${yo};
        border-color: transparent;
        color: ${fo};
      }
    `],ss([wo()],rs.prototype,"variant",void 0),ss([wo({type:Boolean})],rs.prototype,"disabled",void 0),ss([wo()],rs.prototype,"icon",void 0),ss([wo()],rs.prototype,"label",void 0),ss([wo()],rs.prototype,"type",void 0),ss([wo()],rs.prototype,"name",void 0),ss([wo()],rs.prototype,"value",void 0),customElements.define("fds-button",rs);class ls extends Error{constructor(t){super(t),this.name="TemplateError"}}const ds=()=>({fieldName:"NOT_SET",initialize(){zo.apply(this)},_getIndex(){const t=this.el.closest(`[data-field='${this.fieldName}']`);if(1!==t.length)throw new Error("Element not found");const e=t.attr("data-group-index");if(void 0===e)throw new Error("Index not found");if(e.startsWith("REPEATING-INDEX"))throw new ls("Template");return parseInt(e)},_getAllFields(){const t=this._getIndex(),e=this._getAllFieldNames(t);return this._getFields(e)},_getFields(t){let e=$();for(const i of t){const t=this.el.find(`[name='${i}']`);if(0===t.length)throw new Error(`Field element not found for field ${i}`);e=e.add(t)}return e},_getParentFormGroup(t){const e=t.closest(".form-group");if(0===e.length)throw new Error("Parent form group not found");return e},_getAllFieldNames(t){throw Error("No All Field Names")}}),hs=()=>{const t=ds();return{...t,initialize(){t.initialize.call(this);try{const t=this._getTypeEl(),e=t.val();this._onlyShowTypeFields(e),t.on("change",t=>{const e=t.target.value;this._onlyShowTypeFields(e)})}catch(t){if(t instanceof ls)return;throw t}},typeFieldName:"NOT_SET",_getTypeEl(){const t=this._getIndex(),e=`${this.fieldName}-${t}-${this.typeFieldName}`,i=this.el.find(`select[name='${e}']`);if(0===i.length)throw new Error(`Element not found for index ${t}`);return i},_onlyShowTypeFields(t){const e=this._getTypeFields(t),i=this._getAllFields().not(e).map((t,e)=>this._getParentFormGroup($(e))[0]),a=e.map((t,e)=>this._getParentFormGroup($(e))[0]);i.addClass("display-none"),a.removeClass("display-none")},_getTypeFields(t){throw Error("No Type Fieds")}}};var ps;!function(t){t.PERSON="http://www.w3.org/2006/vcard/ns#Individual",t.ORGANIZATION="http://www.w3.org/2006/vcard/ns#Organization"}(ps||(ps={}));const cs={...hs(),fieldName:"contact_point",typeFieldName:"contact_point_type",_getTypeFields(t){const e=this._getIndex(),i=this._getAllFieldNames(e);let a;if(t===ps.PERSON&&(a=i),t===ps.ORGANIZATION){const t=new Set([`contact_point-${e}-organization_name`]);a=new Set([...i].filter(e=>!t.has(e)))}if(void 0===a)throw new Error(`Contact point type field names not found for type ${t}`);return this._getFields(a)},_getAllFieldNames:t=>new Set([`contact_point-${t}-contact_point_type`,`contact_point-${t}-fn`,`contact_point-${t}-organization_name`,`contact_point-${t}-has_email`,`contact_point-${t}-has_telephone`,`contact_point-${t}-has_url`,`contact_point-${t}-street_address`,`contact_point-${t}-locality`,`contact_point-${t}-postal_code`,`contact_point-${t}-region`,`contact_point-${t}-country_name`])};var gs;ckan.module("digitraffic_theme_contact_detail",cs),function(t){t.ACADEMIA="http://purl.org/adms/publishertype/Academia-ScientificOrganisation",t.COMPANY="http://purl.org/adms/publishertype/Company",t.INDUSTRY_CONSORTIUM="http://purl.org/adms/publishertype/IndustryConsortium",t.LOCAL_AUTHORITY="http://purl.org/adms/publishertype/LocalAuthority",t.NATIONAL_AUTHORITY="http://purl.org/adms/publishertype/NationalAuthority",t.NON_GOVERNMENTAL_ORGANIZATION="http://purl.org/adms/publishertype/NonGovernmentalOrganisation",t.NON_PROFIT_ORGANIZATION="http://purl.org/adms/publishertype/NonProfitOrganisation",t.PRIVATE_INDIVIDUAL="http://purl.org/adms/publishertype/PrivateIndividual(s)",t.REGIONAL_AUTHORITY="http://purl.org/adms/publishertype/RegionalAuthority",t.STANDARDISATION_BODY="http://purl.org/adms/publishertype/StandardisationBody",t.SUPER_NATIONAL_AUTHORITY="http://purl.org/adms/publishertype/SupraNationalAuthority"}(gs||(gs={}));const ms={...hs(),fieldName:"rights_holder",typeFieldName:"type",_getTypeFields(t){const e=this._getIndex(),i=this._getAllFieldNames(e),a=new Set([gs.ACADEMIA,gs.COMPANY,gs.INDUSTRY_CONSORTIUM,gs.LOCAL_AUTHORITY,gs.NATIONAL_AUTHORITY,gs.NON_GOVERNMENTAL_ORGANIZATION,gs.NON_PROFIT_ORGANIZATION,gs.REGIONAL_AUTHORITY,gs.STANDARDISATION_BODY,gs.SUPER_NATIONAL_AUTHORITY]);let o;if(t===gs.PRIVATE_INDIVIDUAL&&(o=i),a.has(t)){const t=new Set([`rights_holder-${e}-first_name`,`rights_holder-${e}-surname`,`rights_holder-${e}-workplace_homepage`,`rights_holder-${e}-member_of`]);o=new Set([...i].filter(e=>!t.has(e)))}if(void 0===o)throw new Error(`Rights holder type field names not found for type ${t}`);return this._getFields(o)},_getAllFieldNames:t=>new Set([`rights_holder-${t}-type`,`rights_holder-${t}-name`,`rights_holder-${t}-first_name`,`rights_holder-${t}-surname`,`rights_holder-${t}-mbox`,`rights_holder-${t}-phone`,`rights_holder-${t}-thoroughfare`,`rights_holder-${t}-post_name`,`rights_holder-${t}-post_code`,`rights_holder-${t}-admin_unit_l2`,`rights_holder-${t}-admin_unit_l1`,`rights_holder-${t}-workplace_homepage`,`rights_holder-${t}-member_of`])};ckan.module("digitraffic_theme_rights_holder",ms);const ys={initialize(){zo.apply(this);const t=window.matchMedia("(min-width: 768px)");t.addEventListener("change",this._handleMediaQueryChange),this._handleMediaQueryChange(t)},_handleMediaQueryChange(t){const e=$('[data-form-layout-wrapper="left"]'),i=$('[data-form-layout-wrapper="right"]'),a=e.length>0,o=i.length>0;if(t.matches){if(!a&&!o){const t=$(".left-1, .left-2"),e=$(".right-1, .right-2"),i="display: flex; flex-wrap: nowrap; gap: 1rem; flex-direction: column;",a=document.createElement("div"),o=document.createElement("div");a.setAttribute("data-form-layout-wrapper","left"),o.setAttribute("data-form-layout-wrapper","right"),a.style=i+" grid-area: left-1-start / left-1-start / left-2-end / left-2-end;",t.wrapAll(a),o.style=i+" grid-area: right-1-start / right-1-start / right-2-end / right-2-end;",e.wrapAll(o)}}else a&&o&&(e.children().unwrap(),i.children().unwrap())}};ckan.module("digitraffic_theme_form_layout",ys);const us={options:{is_url:!1,is_upload:!1,field_upload:"image_upload",field_url:"image_url",field_clear:"clear_upload",field_name:"name",upload_label:"",previous_upload:!1},field_url:$(),field_image:$(),field_url_input:$(),field_name:$(),field_clear:$(),label_location:$(),button_url:$(),button_upload:$(),fields:$(),is_data_resource:!1,previousUpload:!1,_nameIsDirty:!1,input:$(),initialize(){zo.apply(this);const t=this.options,e='input[name="'+t.field_upload+'"]',i='input[name="'+t.field_url+'"]',a='input[name="'+t.field_clear+'"]',o='input[name="'+t.field_name+'"]';this.input=$(e,this.el),this.field_url=$(i,this.el).parents(".form-group"),this.field_image=this.input.parents(".form-group"),this.field_url_input=$("input",this.field_url),this.field_name=this.el.parents("form").find(o),this.label_location=$('label[for="field-image-url"]'),this.is_data_resource="url"===this.options.field_url&&"upload"===this.options.field_upload,this.previousUpload=this.options.previous_upload;const s=$(a,this.el);s.length>0&&s.parents(".form-group").remove(),this.field_clear=$('<input type="hidden" name="'+t.field_clear+'">').appendTo(this.el),this.button_upload=$('<a href="javascript:;" class="btn btn-default"><i class="fa fa-cloud-upload"></i>'+this._("Upload")+"</a>").insertAfter(this.input),this.previousUpload&&$('<div class="error-inline"><i class="fa fa-warning"></i> '+this._("Please select the file to upload again")+"</div>").appendTo(this.field_image);const n=this._("Remove");if($('<a href="javascript:;" class="btn btn-danger btn-remove-url">'+n+"</a>").prop("title",n).on("click",this._onRemove).insertBefore(this.field_url_input),$('label[for="field-image-upload"]').text(t.upload_label||this._("Image")),this.input.on("mouseover",this._onInputMouseOver).on("mouseout",this._onInputMouseOut).on("change",this._onInputChange).prop("title",this._("Upload a file on your computer")).css("width",this.button_upload.outerWidth()??0),this.fields=$("<i />").add(this.button_upload).add(this.input).add(this.field_url).add(this.field_image),this.field_name.on("change",this._onModifyName),this.field_name.val()&&(this._nameIsDirty=!0),t.is_url)this._showOnlyFieldUrl(),this._updateUrlLabel(this._("URL"));else if(t.is_upload){this._showOnlyFieldUrl(),this.field_url_input.prop("readonly",!0);const t=this._fileNameFromUpload(String(this.field_url_input.val())??"");this.field_url_input.val(t),this._updateUrlLabel(this._("File"))}else this._showOnlyButtons()},_fileNameFromUpload:function(t){return/^\/base\/images/.test(t)?t:t=(t=(t=t.substring(0,-1===t.indexOf("#")?t.length:t.indexOf("#"))).substring(0,-1===t.indexOf("?")?t.length:t.indexOf("?"))).substring(t.lastIndexOf("/")+1,t.length)},_updateUrlLabel:function(t){this.is_data_resource&&this.label_location.text(t)},_onRemove:function(){this._showOnlyButtons(),this.field_url_input.val(""),this.field_url_input.prop("readonly",!1),this.field_clear.val("true")},_onInputChange:function(){let t=this.input.val()??"".split(/^C:\\fakepath\\/).pop()??"";const e=!!document.DOCUMENT_NODE,i=!e&&!!window.StyleMedia;if(e||i){const e=String(t).match(/[^\\\/]+$/);t=e?e[0]:String(t)}this.field_url_input.val(t),this.field_url_input.prop("readonly",!0),this.field_clear.val(""),this._showOnlyFieldUrl(),this._autoName(String(t)),this._updateUrlLabel(this._("File"))},_showOnlyButtons:function(){this.fields.hide(),this.button_upload.add(this.field_image).add(this.input).show()},_showOnlyFieldUrl:function(){this.fields.hide(),this.field_url.show()},_onInputMouseOver:function(){this.button_upload.addClass("hover")},_onInputMouseOut:function(){this.button_upload.removeClass("hover")},_onModifyName:function(){this._nameIsDirty=!0},_onFromWebBlur:function(){const t=this.field_url_input.val()??"",e=String(t).match(/([^\/]+)\/?$/);e&&e[1]&&this._autoName(e[1])},_autoName:function(t){this._nameIsDirty||this.field_name.val(t)}};ckan.module("digitraffic_image_upload",us);const fs={initialize(){zo.apply(this);const t=i.Popover.getInstance(this.el.closest(".popover")[0]);this.el.find(".popover-close-button").on("click",()=>{t?.hide()})}};ckan.module("digitraffic_markdown_popover_header",fs),document.addEventListener("shown.bs.popover",function(t){if(!t?.target)return void console.warn("Popover shown event has no target");const e=t.target.getAttribute("aria-describedby"),a=document.getElementById(e),o=i.Popover.getInstance(a);$(a).find(".popover-close-button").on("click",()=>{o?.hide()})});
/**
     * @license lucide v0.477.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */
const bs={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},vs=([t,e,i])=>{const a=document.createElementNS("http://www.w3.org/2000/svg",t);return Object.keys(e).forEach(t=>{a.setAttribute(t,String(e[t]))}),i?.length&&i.forEach(t=>{const e=vs(t);a.appendChild(e)}),a},_s=t=>"string"==typeof t?t:t&&t.class?t.class&&"string"==typeof t.class?t.class.split(" "):t.class&&Array.isArray(t.class)?t.class:"":"",ws=(t,{nameAttr:e,icons:i,attrs:a})=>{const o=t.getAttribute(e);if(null==o)return;const s=i[o.replace(/(\w)(\w*)(_|-|\s*)/g,(t,e,i)=>e.toUpperCase()+i.toLowerCase())];if(!s)return console.warn(`${t.outerHTML} icon name was not found in the provided icons object.`);const n=(t=>Array.from(t.attributes).reduce((t,e)=>(t[e.name]=e.value,t),{}))(t),r={...bs,"data-lucide":o,...a,...n},l=["lucide",`lucide-${o}`,n,a].flatMap(_s).map(t=>t.trim()).filter(Boolean).filter((t,e,i)=>i.indexOf(t)===e).join(" ");l&&Object.assign(r,{class:l});const d=((t,e={})=>{const i={...bs,...e};return vs(["svg",i,t])})(s,r);return t.parentNode?.replaceChild(d,t)},$s=[["path",{d:"m6 9 6 6 6-6"}]],ks=[["path",{d:"m18 15-6-6-6 6"}]],xs=[["path",{d:"M15 3h6v6"}],["path",{d:"M10 14 21 3"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}]],As=[["path",{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"}]],Ss=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],["path",{d:"M2 12h20"}]],Ms=[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5"}]],Es=[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}],["rect",{width:"4",height:"12",x:"2",y:"9"}],["circle",{cx:"4",cy:"4",r:"2"}]],Ts=[["line",{x1:"4",x2:"20",y1:"12",y2:"12"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18"}]],Cs=[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"}]],Ps=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]],js=[["path",{d:"M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"}],["path",{d:"m10 15 5-3-5-3z"}]];
/**
     * @license lucide v0.477.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */jQuery(function(){$(".js-disabled").removeClass("js-disabled"),(({icons:t={},nameAttr:e="data-lucide",attrs:i={}}={})=>{if(!Object.values(t).length)throw new Error("Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`");if("undefined"==typeof document)throw new Error("`createIcons()` only works in a browser environment.");const a=document.querySelectorAll(`[${e}]`);if(Array.from(a).forEach(a=>ws(a,{nameAttr:e,icons:t,attrs:i})),"data-lucide"===e){const e=document.querySelectorAll("[icon-name]");e.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(e).forEach(e=>ws(e,{nameAttr:"icon-name",icons:t,attrs:i})))}})({icons:{ExternalLink:xs,User:Ps,Menu:Ts,Globe:Ss,ChevronDown:$s,ChevronUp:ks,Facebook:As,Twitter:Cs,Instagram:Ms,Youtube:js,Linkedin:Es}})})}(bootstrap);
