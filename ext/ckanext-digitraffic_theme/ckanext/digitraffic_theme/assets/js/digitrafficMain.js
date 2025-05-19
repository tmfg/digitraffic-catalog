!function(){"use strict";const t={name:"fds-size-3",value:"24px"},i=class{get shadowRoot(){return this.__host.__shadowRoot}constructor(t){this.ariaAtomic="",this.ariaAutoComplete="",this.ariaBrailleLabel="",this.ariaBrailleRoleDescription="",this.ariaBusy="",this.ariaChecked="",this.ariaColCount="",this.ariaColIndex="",this.ariaColSpan="",this.ariaCurrent="",this.ariaDescription="",this.ariaDisabled="",this.ariaExpanded="",this.ariaHasPopup="",this.ariaHidden="",this.ariaInvalid="",this.ariaKeyShortcuts="",this.ariaLabel="",this.ariaLevel="",this.ariaLive="",this.ariaModal="",this.ariaMultiLine="",this.ariaMultiSelectable="",this.ariaOrientation="",this.ariaPlaceholder="",this.ariaPosInSet="",this.ariaPressed="",this.ariaReadOnly="",this.ariaRequired="",this.ariaRoleDescription="",this.ariaRowCount="",this.ariaRowIndex="",this.ariaRowSpan="",this.ariaSelected="",this.ariaSetSize="",this.ariaSort="",this.ariaValueMax="",this.ariaValueMin="",this.ariaValueNow="",this.ariaValueText="",this.role="",this.form=null,this.labels=[],this.states=new Set,this.validationMessage="",this.validity={},this.willValidate=!0,this.__host=t}checkValidity(){return console.warn("`ElementInternals.checkValidity()` was called on the server.This method always returns true."),!0}reportValidity(){return!0}setFormValue(){}setValidity(){}};
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
var e,a,o,s,n,r,l,d,h,p,c,m,y=function(t,i,e,a,o){if("m"===a)throw new TypeError("Private method is not writable");if("a"===a&&!o)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof i?t!==i||!o:!i.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===a?o.call(t,e):o?o.value=e:i.set(t,e),e},g=function(t,i,e,a){if("a"===e&&!a)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof i?t!==i||!a:!i.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===e?a:"a"===e?a.call(t):a?a.value:i.get(t)};const u=t=>"boolean"==typeof t?t:t?.capture??!1,f=class{constructor(){this.__eventListeners=new Map,this.__captureEventListeners=new Map}addEventListener(t,i,e){if(null==i)return;const a=u(e)?this.__captureEventListeners:this.__eventListeners;let o=a.get(t);if(void 0===o)o=new Map,a.set(t,o);else if(o.has(i))return;const s="object"==typeof e&&e?e:{};s.signal?.addEventListener("abort",(()=>this.removeEventListener(t,i,e))),o.set(i,s??{})}removeEventListener(t,i,e){if(null==i)return;const a=u(e)?this.__captureEventListeners:this.__eventListeners,o=a.get(t);void 0!==o&&(o.delete(i),o.size||a.delete(t))}dispatchEvent(t){const i=[this];let e=this.__eventTargetParent;if(t.composed)for(;e;)i.push(e),e=e.__eventTargetParent;else for(;e&&e!==this.__host;)i.push(e),e=e.__eventTargetParent;let a=!1,o=!1,s=0,n=null,r=null,l=null;const d=t.stopPropagation,h=t.stopImmediatePropagation;Object.defineProperties(t,{target:{get:()=>n??r,...b},srcElement:{get:()=>t.target,...b},currentTarget:{get:()=>l,...b},eventPhase:{get:()=>s,...b},composedPath:{value:()=>i,...b},stopPropagation:{value:()=>{a=!0,d.call(t)},...b},stopImmediatePropagation:{value:()=>{o=!0,h.call(t)},...b}});const p=(i,e,a)=>{"function"==typeof i?i(t):"function"==typeof i?.handleEvent&&i.handleEvent(t),e.once&&a.delete(i)},c=()=>(l=null,s=0,!t.defaultPrevented),m=i.slice().reverse();n=this.__host&&t.composed?null:this;const y=t=>{for(r=this;r.__host&&t.includes(r.__host);)r=r.__host};for(const i of m){n||r&&r!==i.__host||y(m.slice(m.indexOf(i))),l=i,s=i===t.target?2:1;const e=i.__captureEventListeners.get(t.type);if(e)for(const[t,i]of e)if(p(t,i,e),o)return c();if(a)return c()}const g=t.bubbles?i:[this];r=null;for(const i of g){n||r&&i!==r.__host||y(g.slice(0,g.indexOf(i)+1)),l=i,s=i===t.target?2:3;const e=i.__eventListeners.get(t.type);if(e)for(const[t,i]of e)if(p(t,i,e),o)return c();if(a)return c()}return c()}},b={__proto__:null,enumerable:!0};Object.freeze(b);const v=(p=class{constructor(t,i={}){if(e.set(this,!1),a.set(this,!1),o.set(this,!1),s.set(this,!1),n.set(this,Date.now()),r.set(this,!1),l.set(this,void 0),d.set(this,void 0),h.set(this,void 0),this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,0===arguments.length)throw new Error("The type argument must be specified");if("object"!=typeof i||!i)throw new Error('The "options" argument must be an object');const{bubbles:p,cancelable:c,composed:m}=i;y(this,e,!!c,"f"),y(this,a,!!p,"f"),y(this,o,!!m,"f"),y(this,l,`${t}`,"f"),y(this,d,null,"f"),y(this,h,!1,"f")}initEvent(t,i,e){throw new Error("Method not implemented.")}stopImmediatePropagation(){this.stopPropagation()}preventDefault(){y(this,s,!0,"f")}get target(){return g(this,d,"f")}get currentTarget(){return g(this,d,"f")}get srcElement(){return g(this,d,"f")}get type(){return g(this,l,"f")}get cancelable(){return g(this,e,"f")}get defaultPrevented(){return g(this,e,"f")&&g(this,s,"f")}get timeStamp(){return g(this,n,"f")}composedPath(){return g(this,h,"f")?[g(this,d,"f")]:[]}get returnValue(){return!g(this,e,"f")||!g(this,s,"f")}get bubbles(){return g(this,a,"f")}get composed(){return g(this,o,"f")}get eventPhase(){return g(this,h,"f")?p.AT_TARGET:p.NONE}get cancelBubble(){return g(this,r,"f")}set cancelBubble(t){t&&y(this,r,!0,"f")}stopPropagation(){y(this,r,!0,"f")}get isTrusted(){return!1}},e=new WeakMap,a=new WeakMap,o=new WeakMap,s=new WeakMap,n=new WeakMap,r=new WeakMap,l=new WeakMap,d=new WeakMap,h=new WeakMap,p.NONE=0,p.CAPTURING_PHASE=1,p.AT_TARGET=2,p.BUBBLING_PHASE=3,p);Object.defineProperties(v.prototype,{initEvent:b,stopImmediatePropagation:b,preventDefault:b,target:b,currentTarget:b,srcElement:b,type:b,cancelable:b,defaultPrevented:b,timeStamp:b,composedPath:b,returnValue:b,bubbles:b,composed:b,eventPhase:b,cancelBubble:b,stopPropagation:b,isTrusted:b});const w=(m=class extends v{constructor(t,i={}){super(t,i),c.set(this,void 0),y(this,c,i?.detail??null,"f")}initCustomEvent(t,i,e,a){throw new Error("Method not implemented.")}get detail(){return g(this,c,"f")}},c=new WeakMap,m);Object.defineProperties(w.prototype,{detail:b});const _=v,k=w;
/**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
globalThis.Event??=_,globalThis.CustomEvent??=k;const x=new WeakMap,S=t=>{let i=x.get(t);return void 0===i&&x.set(t,i=new Map),i},A=class extends f{constructor(){super(...arguments),this.__shadowRootMode=null,this.__shadowRoot=null,this.__internals=null}get attributes(){return Array.from(S(this)).map((([t,i])=>({name:t,value:i})))}get shadowRoot(){return"closed"===this.__shadowRootMode?null:this.__shadowRoot}get localName(){return this.constructor.__localName}get tagName(){return this.localName?.toUpperCase()}setAttribute(t,i){S(this).set(t,String(i))}removeAttribute(t){S(this).delete(t)}toggleAttribute(t,i){return this.hasAttribute(t)?!(void 0===i||!i)||(this.removeAttribute(t),!1):!(void 0!==i&&!i)&&(this.setAttribute(t,""),!0)}hasAttribute(t){return S(this).has(t)}attachShadow(t){const i={host:this};return this.__shadowRootMode=t.mode,t&&"open"===t.mode&&(this.__shadowRoot=i),i}attachInternals(){if(null!==this.__internals)throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");const t=new i(this);return this.__internals=t,t}getAttribute(t){return S(this).get(t)??null}},E=class extends A{};globalThis.litServerRoot??=Object.defineProperty(new E,"localName",{get:()=>"lit-server-root"});const M=new class{constructor(){this.__definitions=new Map}define(t,i){if(this.__definitions.has(t)){if("development"!==process.env.NODE_ENV)throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the name "${t}" has already been used with this registry`);console.warn(`'CustomElementRegistry' already has "${t}" defined. This may have been caused by live reload or hot module replacement in which case it can be safely ignored.\nMake sure to test your application with a production build as repeat registrations will throw in production.`)}i.__localName=t,this.__definitions.set(t,{ctor:i,observedAttributes:i.observedAttributes??[]})}get(t){const i=this.__definitions.get(t);return i?.ctor}},T=globalThis,P=T.ShadowRoot&&(void 0===T.ShadyCSS||T.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,j=Symbol(),C=new WeakMap;let z=class{constructor(t,i,e){if(this._$cssResult$=!0,e!==j)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const i=this.t;if(P&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=C.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&C.set(i,t))}return t}toString(){return this.cssText}};const L=t=>new z("string"==typeof t?t:t+"",void 0,j),R=(t,...i)=>{const e=1===t.length?t[0]:i.reduce(((i,e,a)=>i+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(e)+t[a+1]),t[0]);return new z(e,t,j)},N=(t,i)=>{P?t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((i=>{const e=document.createElement("style"),a=T.litNonce;void 0!==a&&e.setAttribute("nonce",a),e.textContent=i.cssText,t.appendChild(e)}))},O=P||void 0===T.CSSStyleSheet?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(const e of t.cssRules)i+=e.cssText;return L(i)})(t):t
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */;var U,D;const B=globalThis;null!==(U=B.customElements)&&void 0!==U||(B.customElements=M);const H=B.trustedTypes,I=H?H.emptyScript:"",V=B.reactiveElementPolyfillSupport,K={toAttribute(t,i){switch(i){case Boolean:t=t?I:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let e=t;switch(i){case Boolean:e=null!==t;break;case Number:e=null===t?null:Number(t);break;case Object:case Array:try{e=JSON.parse(t)}catch(t){e=null}}return e}},W=(t,i)=>i!==t&&(i==i||t==t),F={attribute:!0,type:String,converter:K,reflect:!1,hasChanged:W},Y="finalized";let Z=class extends(globalThis.HTMLElement??E){constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,e)=>{const a=this._$Ep(e,i);void 0!==a&&(this._$Ev.set(a,e),t.push(a))})),t}static createProperty(t,i=F){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const e="symbol"==typeof t?Symbol():"__"+t,a=this.getPropertyDescriptor(t,e,i);void 0!==a&&Object.defineProperty(this.prototype,t,a)}}static getPropertyDescriptor(t,i,e){return{get(){return this[i]},set(a){const o=this[t];this[i]=a,this.requestUpdate(t,o,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||F}static finalize(){if(this.hasOwnProperty(Y))return!1;this[Y]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const e of i)this.createProperty(e,t[e])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const e=new Set(t.flat(1/0).reverse());for(const t of e)i.unshift(O(t))}else void 0!==t&&i.push(O(t));return i}static _$Ep(t,i){const e=i.attribute;return!1===e?void 0:"string"==typeof e?e:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var i,e;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(e=t.hostConnected)||void 0===e||e.call(t))}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return N(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}))}attributeChangedCallback(t,i,e){this._$AK(t,e)}_$EO(t,i,e=F){var a;const o=this.constructor._$Ep(t,e);if(void 0!==o&&!0===e.reflect){const s=(void 0!==(null===(a=e.converter)||void 0===a?void 0:a.toAttribute)?e.converter:K).toAttribute(i,e.type);this._$El=t,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$El=null}}_$AK(t,i){var e;const a=this.constructor,o=a._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=a.getPropertyOptions(o),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(e=t.converter)||void 0===e?void 0:e.fromAttribute)?t.converter:K;this._$El=o,this[o]=s.fromAttribute(i,t.type),this._$El=null}}requestUpdate(t,i,e){let a=!0;void 0!==t&&(((e=e||this.constructor.getPropertyOptions(t)).hasChanged||W)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===e.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,e))):a=!1),!this.isUpdatePending&&a&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(e)):this._$Ek()}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(e)}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var G;Z[Y]=!0,Z.elementProperties=new Map,Z.elementStyles=[],Z.shadowRootOptions={mode:"open"},null==V||V({ReactiveElement:Z}),(null!==(D=B.reactiveElementVersions)&&void 0!==D?D:B.reactiveElementVersions=[]).push("1.6.3");const J=globalThis,q=J.trustedTypes,Q=q?q.createPolicy("lit-html",{createHTML:t=>t}):void 0,X="$lit$",tt=`lit$${(Math.random()+"").slice(9)}$`,it="?"+tt,et=`<${it}>`,at=void 0===J.document?{createTreeWalker:()=>({})}:document,ot=()=>at.createComment(""),st=t=>null===t||"object"!=typeof t&&"function"!=typeof t,nt=Array.isArray,rt="[ \t\n\f\r]",lt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,dt=/-->/g,ht=/>/g,pt=RegExp(`>|${rt}(?:([^\\s"'>=/]+)(${rt}*=${rt}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),ct=/'/g,mt=/"/g,yt=/^(?:script|style|textarea|title)$/i,gt=(t=>(i,...e)=>({_$litType$:t,strings:i,values:e}))(1),ut=Symbol.for("lit-noChange"),ft=Symbol.for("lit-nothing"),bt=new WeakMap,vt=at.createTreeWalker(at,129,null,!1);function wt(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==Q?Q.createHTML(i):i}const _t=(t,i)=>{const e=t.length-1,a=[];let o,s=2===i?"<svg>":"",n=lt;for(let i=0;i<e;i++){const e=t[i];let r,l,d=-1,h=0;for(;h<e.length&&(n.lastIndex=h,l=n.exec(e),null!==l);)h=n.lastIndex,n===lt?"!--"===l[1]?n=dt:void 0!==l[1]?n=ht:void 0!==l[2]?(yt.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=pt):void 0!==l[3]&&(n=pt):n===pt?">"===l[0]?(n=null!=o?o:lt,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,r=l[1],n=void 0===l[3]?pt:'"'===l[3]?mt:ct):n===mt||n===ct?n=pt:n===dt||n===ht?n=lt:(n=pt,o=void 0);const p=n===pt&&t[i+1].startsWith("/>")?" ":"";s+=n===lt?e+et:d>=0?(a.push(r),e.slice(0,d)+X+e.slice(d)+tt+p):e+tt+(-2===d?(a.push(void 0),i):p)}return[wt(t,s+(t[e]||"<?>")+(2===i?"</svg>":"")),a]};class $t{constructor({strings:t,_$litType$:i},e){let a;this.parts=[];let o=0,s=0;const n=t.length-1,r=this.parts,[l,d]=_t(t,i);if(this.el=$t.createElement(l,e),vt.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes)}for(;null!==(a=vt.nextNode())&&r.length<n;){if(1===a.nodeType){if(a.hasAttributes()){const t=[];for(const i of a.getAttributeNames())if(i.endsWith(X)||i.startsWith(tt)){const e=d[s++];if(t.push(i),void 0!==e){const t=a.getAttribute(e.toLowerCase()+X).split(tt),i=/([.?@])?(.*)/.exec(e);r.push({type:1,index:o,name:i[2],strings:t,ctor:"."===i[1]?Et:"?"===i[1]?Tt:"@"===i[1]?Pt:At})}else r.push({type:6,index:o})}for(const i of t)a.removeAttribute(i)}if(yt.test(a.tagName)){const t=a.textContent.split(tt),i=t.length-1;if(i>0){a.textContent=q?q.emptyScript:"";for(let e=0;e<i;e++)a.append(t[e],ot()),vt.nextNode(),r.push({type:2,index:++o});a.append(t[i],ot())}}}else if(8===a.nodeType)if(a.data===it)r.push({type:2,index:o});else{let t=-1;for(;-1!==(t=a.data.indexOf(tt,t+1));)r.push({type:7,index:o}),t+=tt.length-1}o++}}static createElement(t,i){const e=at.createElement("template");return e.innerHTML=t,e}}function kt(t,i,e=t,a){var o,s,n,r;if(i===ut)return i;let l=void 0!==a?null===(o=e._$Co)||void 0===o?void 0:o[a]:e._$Cl;const d=st(i)?void 0:i._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(s=null==l?void 0:l._$AO)||void 0===s||s.call(l,!1),void 0===d?l=void 0:(l=new d(t),l._$AT(t,e,a)),void 0!==a?(null!==(n=(r=e)._$Co)&&void 0!==n?n:r._$Co=[])[a]=l:e._$Cl=l),void 0!==l&&(i=kt(t,l._$AS(t,i.values),l,a)),i}class xt{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:e},parts:a}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:at).importNode(e,!0);vt.currentNode=o;let s=vt.nextNode(),n=0,r=0,l=a[0];for(;void 0!==l;){if(n===l.index){let i;2===l.type?i=new St(s,s.nextSibling,this,t):1===l.type?i=new l.ctor(s,l.name,l.strings,this,t):6===l.type&&(i=new jt(s,this,t)),this._$AV.push(i),l=a[++r]}n!==(null==l?void 0:l.index)&&(s=vt.nextNode(),n++)}return vt.currentNode=at,o}v(t){let i=0;for(const e of this._$AV)void 0!==e&&(void 0!==e.strings?(e._$AI(t,e,i),i+=e.strings.length-2):e._$AI(t[i])),i++}}class St{constructor(t,i,e,a){var o;this.type=2,this._$AH=ft,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=e,this.options=a,this._$Cp=null===(o=null==a?void 0:a.isConnected)||void 0===o||o}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=kt(this,t,i),st(t)?t===ft||null==t||""===t?(this._$AH!==ft&&this._$AR(),this._$AH=ft):t!==this._$AH&&t!==ut&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>nt(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==ft&&st(this._$AH)?this._$AA.nextSibling.data=t:this.$(at.createTextNode(t)),this._$AH=t}g(t){var i;const{values:e,_$litType$:a}=t,o="number"==typeof a?this._$AC(t):(void 0===a.el&&(a.el=$t.createElement(wt(a.h,a.h[0]),this.options)),a);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(e);else{const t=new xt(o,this),i=t.u(this.options);t.v(e),this.$(i),this._$AH=t}}_$AC(t){let i=bt.get(t.strings);return void 0===i&&bt.set(t.strings,i=new $t(t)),i}T(t){nt(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let e,a=0;for(const o of t)a===i.length?i.push(e=new St(this.k(ot()),this.k(ot()),this,this.options)):e=i[a],e._$AI(o),a++;a<i.length&&(this._$AR(e&&e._$AB.nextSibling,a),i.length=a)}_$AR(t=this._$AA.nextSibling,i){var e;for(null===(e=this._$AP)||void 0===e||e.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t))}}class At{constructor(t,i,e,a,o){this.type=1,this._$AH=ft,this._$AN=void 0,this.element=t,this.name=i,this._$AM=a,this.options=o,e.length>2||""!==e[0]||""!==e[1]?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=ft}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,e,a){const o=this.strings;let s=!1;if(void 0===o)t=kt(this,t,i,0),s=!st(t)||t!==this._$AH&&t!==ut,s&&(this._$AH=t);else{const a=t;let n,r;for(t=o[0],n=0;n<o.length-1;n++)r=kt(this,a[e+n],i,n),r===ut&&(r=this._$AH[n]),s||(s=!st(r)||r!==this._$AH[n]),r===ft?t=ft:t!==ft&&(t+=(null!=r?r:"")+o[n+1]),this._$AH[n]=r}s&&!a&&this.j(t)}j(t){t===ft?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Et extends At{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===ft?void 0:t}}const Mt=q?q.emptyScript:"";class Tt extends At{constructor(){super(...arguments),this.type=4}j(t){t&&t!==ft?this.element.setAttribute(this.name,Mt):this.element.removeAttribute(this.name)}}class Pt extends At{constructor(t,i,e,a,o){super(t,i,e,a,o),this.type=5}_$AI(t,i=this){var e;if((t=null!==(e=kt(this,t,i,0))&&void 0!==e?e:ft)===ut)return;const a=this._$AH,o=t===ft&&a!==ft||t.capture!==a.capture||t.once!==a.once||t.passive!==a.passive,s=t!==ft&&(a===ft||o);o&&this.element.removeEventListener(this.name,this,a),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var i,e;"function"==typeof this._$AH?this._$AH.call(null!==(e=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==e?e:this.element,t):this._$AH.handleEvent(t)}}class jt{constructor(t,i,e){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(t){kt(this,t)}}const Ct=J.litHtmlPolyfillSupport;null==Ct||Ct($t,St),(null!==(G=J.litHtmlVersions)&&void 0!==G?G:J.litHtmlVersions=[]).push("2.8.0");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var zt,Lt;class Rt extends Z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,i;const e=super.createRenderRoot();return null!==(t=(i=this.renderOptions).renderBefore)&&void 0!==t||(i.renderBefore=e.firstChild),e}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,i,e)=>{var a,o;const s=null!==(a=null==e?void 0:e.renderBefore)&&void 0!==a?a:i;let n=s._$litPart$;if(void 0===n){const t=null!==(o=null==e?void 0:e.renderBefore)&&void 0!==o?o:null;s._$litPart$=n=new St(i.insertBefore(ot(),t),t,void 0,null!=e?e:{})}return n._$AI(t),n})(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return ut}}Rt.finalized=!0,Rt._$litElement$=!0,null===(zt=globalThis.litElementHydrateSupport)||void 0===zt||zt.call(globalThis,{LitElement:Rt});const Nt=globalThis.litElementPolyfillSupport;null==Nt||Nt({LitElement:Rt}),(null!==(Lt=globalThis.litElementVersions)&&void 0!==Lt?Lt:globalThis.litElementVersions=[]).push("3.3.3");const Ot=L("var(--fds-typography-body-default-font-family, 'Public Sans')"),Ut=L("var(--fds-typography-body-default-font-size, 16px)"),Dt=L("var(--fds-typography-body-default-letter-spacing, 0px)"),Bt=L("var(--fds-typography-body-default-line-height, 150%)"),Ht=L("var(--fds-typography-body-default-font-weight, 400)"),It=L("var(--fds-typography-body-default-display, inline-block)"),Vt=L("var(--fds-typography-body-large-font-family, 'Public Sans')"),Kt=L("var(--fds-typography-body-large-font-size, 18px)"),Wt=L("var(--fds-typography-body-large-letter-spacing, 0px)"),Ft=L("var(--fds-typography-body-large-line-height, 150%)"),Yt=L("var(--fds-typography-body-large-font-weight, 400)"),Zt=L("var(--fds-typography-body-large-display, inline-block)"),Gt=L("var(--fds-typography-body-micro-font-family, 'Public Sans')"),Jt=L("var(--fds-typography-body-micro-font-size, 12px)"),qt=L("var(--fds-typography-body-micro-letter-spacing, 0px)"),Qt=L("var(--fds-typography-body-micro-line-height, 150%)"),Xt=L("var(--fds-typography-body-micro-font-weight, 400)"),ti=L("var(--fds-typography-body-micro-display, inline-block)"),ii=L("var(--fds-typography-body-small-font-family, 'Public Sans')"),ei=L("var(--fds-typography-body-small-font-size, 14px)"),ai=L("var(--fds-typography-body-small-letter-spacing, 0px)"),oi=L("var(--fds-typography-body-small-line-height, 150%)"),si=L("var(--fds-typography-body-small-font-weight, 400)"),ni=L("var(--fds-typography-body-small-display, inline-block)"),ri=L("var(--fds-typography-emphasis-default-font-family, 'Public Sans')"),li=L("var(--fds-typography-emphasis-default-font-size, 16px)"),di=L("var(--fds-typography-emphasis-default-letter-spacing, 0px)"),hi=L("var(--fds-typography-emphasis-default-line-height, 150%)"),pi=L("var(--fds-typography-emphasis-default-font-weight, 700)"),ci=L("var(--fds-typography-emphasis-default-display, inline-block)"),mi=L("var(--fds-typography-emphasis-large-font-family, 'Public Sans')"),yi=L("var(--fds-typography-emphasis-large-font-size, 18px)"),gi=L("var(--fds-typography-emphasis-large-letter-spacing, 0px)"),ui=L("var(--fds-typography-emphasis-large-line-height, 150%)"),fi=L("var(--fds-typography-emphasis-large-font-weight, 700)"),bi=L("var(--fds-typography-emphasis-large-display, inline-block)"),vi=L("var(--fds-typography-emphasis-micro-font-family, 'Public Sans')"),wi=L("var(--fds-typography-emphasis-micro-font-size, 12px)"),_i=L("var(--fds-typography-emphasis-micro-letter-spacing, 0px)"),$i=L("var(--fds-typography-emphasis-micro-line-height, 150%)"),ki=L("var(--fds-typography-emphasis-micro-font-weight, 700)"),xi=L("var(--fds-typography-emphasis-micro-display, inline-block)"),Si=L("var(--fds-typography-emphasis-small-font-family, 'Public Sans')"),Ai=L("var(--fds-typography-emphasis-small-font-size, 14px)"),Ei=L("var(--fds-typography-emphasis-small-letter-spacing, 0px)"),Mi=L("var(--fds-typography-emphasis-small-line-height, 150%)"),Ti=L("var(--fds-typography-emphasis-small-font-weight, 700)"),Pi=L("var(--fds-typography-emphasis-small-display, inline-block)"),ji=L("var(--fds-typography-heading-large-heading-3-font-family, 'Public Sans', 'PublicSans-Bold')"),Ci=L("var(--fds-typography-heading-large-heading-3-font-size, 40px)"),zi=L("var(--fds-typography-heading-large-heading-3-letter-spacing, 0px)"),Li=L("var(--fds-typography-heading-large-heading-3-line-height, 110%)"),Ri=L("var(--fds-typography-heading-large-heading-3-font-weight, 700)"),Ni=L("var(--fds-typography-heading-large-heading-3-display, inline-block)"),Oi=L("var(--fds-typography-heading-large-heading-4-font-family, 'Public Sans', 'PublicSans-Bold')"),Ui=L("var(--fds-typography-heading-large-heading-4-font-size, 32px)"),Di=L("var(--fds-typography-heading-large-heading-4-letter-spacing, 0px)"),Bi=L("var(--fds-typography-heading-large-heading-4-line-height, 110%)"),Hi=L("var(--fds-typography-heading-large-heading-4-font-weight, 700)"),Ii=L("var(--fds-typography-heading-large-heading-4-display, inline-block)"),Vi=L("var(--fds-typography-heading-large-heading-5-font-family, 'Public Sans', 'PublicSans-Bold')"),Ki=L("var(--fds-typography-heading-large-heading-5-font-size, 28px)"),Wi=L("var(--fds-typography-heading-large-heading-5-letter-spacing, 0px)"),Fi=L("var(--fds-typography-heading-large-heading-5-line-height, 110%)"),Yi=L("var(--fds-typography-heading-large-heading-5-font-weight, 700)"),Zi=L("var(--fds-typography-heading-large-heading-5-display, inline-block)"),Gi=L("var(--fds-typography-heading-large-heading-6-font-family, 'Public Sans', 'PublicSans-Bold')"),Ji=L("var(--fds-typography-heading-large-heading-6-font-size, 20px)"),qi=L("var(--fds-typography-heading-large-heading-6-letter-spacing, 0px)"),Qi=L("var(--fds-typography-heading-large-heading-6-line-height, 110%)"),Xi=L("var(--fds-typography-heading-large-heading-6-font-weight, 700)"),te=L("var(--fds-typography-heading-large-heading-6-display, inline-block)"),ie=L("var(--fds-typography-heading-large-heading-1-font-family, 'Public Sans', 'PublicSans-Bold')"),ee=L("var(--fds-typography-heading-large-heading-1-font-size, 64px)"),ae=L("var(--fds-typography-heading-large-heading-1-letter-spacing, 0px)"),oe=L("var(--fds-typography-heading-large-heading-1-line-height, 110%)"),se=L("var(--fds-typography-heading-large-heading-1-font-weight, 700)"),ne=L("var(--fds-typography-heading-large-heading-1-display, inline-block)"),re=L("var(--fds-typography-heading-large-heading-2-font-family, 'Public Sans', 'PublicSans-Bold')"),le=L("var(--fds-typography-heading-large-heading-2-font-size, 48px)"),de=L("var(--fds-typography-heading-large-heading-2-letter-spacing, 0px)"),he=L("var(--fds-typography-heading-large-heading-2-line-height, 110%)"),pe=L("var(--fds-typography-heading-large-heading-2-font-weight, 700)"),ce=L("var(--fds-typography-heading-large-heading-2-display, inline-block)"),me=L("var(--fds-typography-heading-small-heading-1-font-family, 'Public Sans', 'PublicSans-Bold')"),ye=L("var(--fds-typography-heading-small-heading-1-font-size, 42px)"),ge=L("var(--fds-typography-heading-small-heading-1-letter-spacing, 0px)"),ue=L("var(--fds-typography-heading-small-heading-1-line-height, 110%)"),fe=L("var(--fds-typography-heading-small-heading-1-font-weight, 700)"),be=L("var(--fds-typography-heading-small-heading-1-display, inline-block)"),ve=L("var(--fds-typography-heading-small-heading-2-font-family, 'Public Sans', 'PublicSans-Bold')"),we=L("var(--fds-typography-heading-small-heading-2-font-size, 32px)"),_e=L("var(--fds-typography-heading-small-heading-2-letter-spacing, 0px)"),$e=L("var(--fds-typography-heading-small-heading-2-line-height, 110%)"),ke=L("var(--fds-typography-heading-small-heading-2-font-weight, 700)"),xe=L("var(--fds-typography-heading-small-heading-2-display, inline-block)"),Se=L("var(--fds-typography-heading-small-heading-3-font-family, 'Public Sans', 'PublicSans-Bold')"),Ae=L("var(--fds-typography-heading-small-heading-3-font-size, 28px)"),Ee=L("var(--fds-typography-heading-small-heading-3-letter-spacing, 0px)"),Me=L("var(--fds-typography-heading-small-heading-3-line-height, 110%)"),Te=L("var(--fds-typography-heading-small-heading-3-font-weight, 700)"),Pe=L("var(--fds-typography-heading-small-heading-3-display, inline-block)"),je=L("var(--fds-typography-heading-small-heading-4-font-family, 'Public Sans', 'PublicSans-Bold')"),Ce=L("var(--fds-typography-heading-small-heading-4-font-size, 24px)"),ze=L("var(--fds-typography-heading-small-heading-4-letter-spacing, 0px)"),Le=L("var(--fds-typography-heading-small-heading-4-line-height, 110%)"),Re=L("var(--fds-typography-heading-small-heading-4-font-weight, 700)"),Ne=L("var(--fds-typography-heading-small-heading-4-display, inline-block)"),Oe=L("var(--fds-typography-heading-small-heading-5-font-family, 'Public Sans', 'PublicSans-Bold')"),Ue=L("var(--fds-typography-heading-small-heading-5-font-size, 18px)"),De=L("var(--fds-typography-heading-small-heading-5-letter-spacing, 0px)"),Be=L("var(--fds-typography-heading-small-heading-5-line-height, 110%)"),He=L("var(--fds-typography-heading-small-heading-5-font-weight, 700)"),Ie=L("var(--fds-typography-heading-small-heading-5-display, inline-block)"),Ve=L("var(--fds-typography-heading-small-heading-6-font-family, 'Public Sans', 'PublicSans-Bold')"),Ke=L("var(--fds-typography-heading-small-heading-6-font-size, 16px)"),We=L("var(--fds-typography-heading-small-heading-6-letter-spacing, 0px)"),Fe=L("var(--fds-typography-heading-small-heading-6-line-height, 110%)"),Ye=L("var(--fds-typography-heading-small-heading-6-font-weight, 700)"),Ze=L("var(--fds-typography-heading-small-heading-6-display, inline-block)"),Ge=L("var(--fds-typography-link-large-font-family, 'Public Sans')"),Je=L("var(--fds-typography-link-large-font-size, 18px)"),qe=L("var(--fds-typography-link-large-letter-spacing, 0px)"),Qe=L("var(--fds-typography-link-large-line-height, 150%)"),Xe=L("var(--fds-typography-link-large-font-weight, 400)"),ta=L("var(--fds-typography-link-large-text-decoration, underline)"),ia=L("var(--fds-typography-link-large-display, inline-block)"),ea=L("var(--fds-typography-link-micro-font-family, 'Public Sans')"),aa=L("var(--fds-typography-link-micro-font-size, 12px)"),oa=L("var(--fds-typography-link-micro-letter-spacing, 0px)"),sa=L("var(--fds-typography-link-micro-line-height, 150%)"),na=L("var(--fds-typography-link-micro-font-weight, 400)"),ra=L("var(--fds-typography-link-micro-text-decoration, underline)"),la=L("var(--fds-typography-link-micro-display, inline-block)"),da=L("var(--fds-typography-link-small-font-family, 'Public Sans')"),ha=L("var(--fds-typography-link-small-font-size, 14px)"),pa=L("var(--fds-typography-link-small-letter-spacing, 0px)"),ca=L("var(--fds-typography-link-small-line-height, 150%)"),ma=L("var(--fds-typography-link-small-font-weight, 400)"),ya=L("var(--fds-typography-link-small-text-decoration, underline)"),ga=L("var(--fds-typography-link-small-display, inline-block)"),ua=L("var(--fds-typography-link-default-font-family, 'Public Sans')"),fa=L("var(--fds-typography-link-default-font-size, 16px)"),ba=L("var(--fds-typography-link-default-letter-spacing, 0px)"),va=L("var(--fds-typography-link-default-line-height, 150%)"),wa=L("var(--fds-typography-link-default-font-weight, 400)"),_a=L("var(--fds-typography-link-default-text-decoration, underline)"),$a=L("var(--fds-typography-link-default-display, inline-block)"),ka=L("var(--fds-typography-ui-helper-font-family, 'Public Sans', 'PublicSans-Regular')"),xa=L("var(--fds-typography-ui-helper-font-size, 15px)"),Sa=L("var(--fds-typography-ui-helper-letter-spacing, 0px)"),Aa=L("var(--fds-typography-ui-helper-line-height, 100%)"),Ea=L("var(--fds-typography-ui-helper-font-weight, 400)"),Ma=L("var(--fds-typography-ui-helper-display, inline-block)"),Ta=L("var(--fds-typography-ui-id-font-family, 'Roboto Mono')"),Pa=L("var(--fds-typography-ui-id-font-size, 13px)"),ja=L("var(--fds-typography-ui-id-letter-spacing, 0px)"),Ca=L("var(--fds-typography-ui-id-line-height, 100%)"),za=L("var(--fds-typography-ui-id-font-weight, 700)"),La=L("var(--fds-typography-ui-id-display, inline-block)"),Ra=L("var(--fds-typography-ui-label-font-family, 'Public Sans', 'PublicSans-Medium')"),Na=L("var(--fds-typography-ui-label-font-size, 16px)"),Oa=L("var(--fds-typography-ui-label-letter-spacing, 0px)"),Ua=L("var(--fds-typography-ui-label-line-height, 22px)"),Da=L("var(--fds-typography-ui-label-font-weight, 500)"),Ba=L("var(--fds-typography-ui-label-display, inline-block)"),Ha=L("var(--fds-typography-ui-placeholder-font-family, 'Public Sans', 'PublicSans-Medium')"),Ia=L("var(--fds-typography-ui-placeholder-font-size, 16px)"),Va=L("var(--fds-typography-ui-placeholder-letter-spacing, 0px)"),Ka=L("var(--fds-typography-ui-placeholder-line-height, 100%)"),Wa=L("var(--fds-typography-ui-placeholder-font-weight, 500)"),Fa=L("var(--fds-typography-ui-placeholder-display, inline-block)"),Ya=L("var(--fds-typography-ui-tag-font-family, 'Public Sans', 'PublicSans-Bold')"),Za=L("var(--fds-typography-ui-tag-font-size, 16px)"),Ga=L("var(--fds-typography-ui-tag-letter-spacing, 0px)"),Ja=L("var(--fds-typography-ui-tag-line-height, 100%)"),qa=L("var(--fds-typography-ui-tag-font-weight, 700)"),Qa=L("var(--fds-typography-ui-tag-display, inline-block)"),Xa=L("var(--fds-color-brand-black, #000000)"),to=L("var(--fds-color-brand-white, #ffffff)"),io=L("var(--fds-color-neutral-100, #cdcdd7)"),eo=L("var(--fds-color-text-300, #9696aa)");R`
  .body-default-text {
    display: ${It};
    font-family: ${Ot};
    font-size: ${Ut};
    font-weight: ${Ht};
    letter-spacing: ${Dt};
    line-height: ${Bt};
  }
`,R`
  .body-large-text {
    display: ${Zt};
    font-family: ${Vt};
    font-size: ${Kt};
    font-weight: ${Yt};
    letter-spacing: ${Wt};
    line-height: ${Ft};
  }
`,R`
  .body-micro-text {
    display: ${ti};
    font-family: ${Gt};
    font-size: ${Jt};
    font-weight: ${Xt};
    letter-spacing: ${qt};
    line-height: ${Qt};
  }
`,R`
  .body-small-text {
    display: ${ni};
    font-family: ${ii};
    font-size: ${ei};
    font-weight: ${si};
    letter-spacing: ${ai};
    line-height: ${oi};
  }
`,R`
  .emphasis-default-text {
    display: ${ci};
    font-family: ${ri};
    font-size: ${li};
    font-weight: ${pi};
    letter-spacing: ${di};
    line-height: ${hi};
  }
`,R`
  .emphasis-large-text {
    display: ${bi};
    font-family: ${mi};
    font-size: ${yi};
    font-weight: ${fi};
    letter-spacing: ${gi};
    line-height: ${ui};
  }
`,R`
  .emphasis-micro-text {
    display: ${xi};
    font-family: ${vi};
    font-size: ${wi};
    font-weight: ${ki};
    letter-spacing: ${_i};
    line-height: ${$i};
  }
`,R`
  .emphasis-small-text {
    display: ${Pi};
    font-family: ${Si};
    font-size: ${Ai};
    font-weight: ${Ti};
    letter-spacing: ${Ei};
    line-height: ${Mi};
  }
`,R`
  .heading-large-1-text {
    display: ${ne};
    font-family: ${ie};
    font-size: ${ee};
    font-weight: ${se};
    letter-spacing: ${ae};
    line-height: ${oe};
  }
`,R`
  .heading-large-2-text {
    display: ${ce};
    font-family: ${re};
    font-size: ${le};
    font-weight: ${pe};
    letter-spacing: ${de};
    line-height: ${he};
  }
`,R`
  .heading-large-3-text {
    display: ${Ni};
    font-family: ${ji};
    font-size: ${Ci};
    font-weight: ${Ri};
    letter-spacing: ${zi};
    line-height: ${Li};
  }
`,R`
  .heading-large-4-text {
    display: ${Ii};
    font-family: ${Oi};
    font-size: ${Ui};
    font-weight: ${Hi};
    letter-spacing: ${Di};
    line-height: ${Bi};
  }
`,R`
  .heading-large-5-text {
    display: ${Zi};
    font-family: ${Vi};
    font-size: ${Ki};
    font-weight: ${Yi};
    letter-spacing: ${Wi};
    line-height: ${Fi};
  }
`,R`
  .heading-large-6-text {
    display: ${te};
    font-family: ${Gi};
    font-size: ${Ji};
    font-weight: ${Xi};
    letter-spacing: ${qi};
    line-height: ${Qi};
  }
`,R`
  .heading-small-1-text {
    display: ${be};
    font-family: ${me};
    font-size: ${ye};
    font-weight: ${fe};
    letter-spacing: ${ge};
    line-height: ${ue};
  }
`,R`
  .heading-small-2-text {
    display: ${xe};
    font-family: ${ve};
    font-size: ${we};
    font-weight: ${ke};
    letter-spacing: ${_e};
    line-height: ${$e};
  }
`,R`
  .heading-small-3-text {
    display: ${Pe};
    font-family: ${Se};
    font-size: ${Ae};
    font-weight: ${Te};
    letter-spacing: ${Ee};
    line-height: ${Me};
  }
`,R`
  .heading-small-4-text {
    display: ${Ne};
    font-family: ${je};
    font-size: ${Ce};
    font-weight: ${Re};
    letter-spacing: ${ze};
    line-height: ${Le};
  }
`,R`
  .heading-small-5-text {
    display: ${Ie};
    font-family: ${Oe};
    font-size: ${Ue};
    font-weight: ${He};
    letter-spacing: ${De};
    line-height: ${Be};
  }
`,R`
  .heading-small-6-text {
    display: ${Ze};
    font-family: ${Ve};
    font-size: ${Ke};
    font-weight: ${Ye};
    letter-spacing: ${We};
    line-height: ${Fe};
  }
`,R`
  .link-default-text {
    display: ${$a};
    font-family: ${ua};
    font-size: ${fa};
    font-weight: ${wa};
    letter-spacing: ${ba};
    line-height: ${va};
    text-decoration: ${_a};
  }
`,R`
  .link-large-text {
    display: ${ia};
    font-family: ${Ge};
    font-size: ${Je};
    font-weight: ${Xe};
    letter-spacing: ${qe};
    line-height: ${Qe};
    text-decoration: ${ta};
  }
`,R`
  .link-micro-text {
    display: ${la};
    font-family: ${ea};
    font-size: ${aa};
    font-weight: ${na};
    letter-spacing: ${oa};
    line-height: ${sa};
    text-decoration: ${ra};
  }
`,R`
  .link-small-text {
    display: ${ga};
    font-family: ${da};
    font-size: ${ha};
    font-weight: ${ma};
    letter-spacing: ${pa};
    line-height: ${ca};
    text-decoration: ${ya};
  }
`,R`
  .ui-helper-text {
    display: ${Ma};
    font-family: ${ka};
    font-size: ${xa};
    font-weight: ${Ea};
    letter-spacing: ${Sa};
    line-height: ${Aa};
  }
`,R`
  .ui-id-text {
    display: ${La};
    font-family: ${Ta};
    font-size: ${Pa};
    font-weight: ${za};
    letter-spacing: ${ja};
    line-height: ${Ca};
  }
`;const ao=R`
  .ui-label-text {
    display: ${Ba};
    font-family: ${Ra};
    font-size: ${Na};
    font-weight: ${Da};
    letter-spacing: ${Oa};
    line-height: ${Ua};
  }
`;R`
  .ui-placeholder-text {
    display: ${Fa};
    font-family: ${Ha};
    font-size: ${Ia};
    font-weight: ${Wa};
    letter-spacing: ${Va};
    line-height: ${Ka};
  }
`,R`
  .ui-tag-text {
    display: ${Qa};
    font-family: ${Ya};
    font-size: ${Za};
    font-weight: ${qa};
    letter-spacing: ${Ga};
    line-height: ${Ja};
  }
`
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */;const oo=(t,i)=>"method"===i.kind&&i.descriptor&&!("value"in i.descriptor)?{...i,finisher(e){e.createProperty(i.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:i.key,initializer(){"function"==typeof i.initializer&&(this[i.key]=i.initializer.call(this))},finisher(e){e.createProperty(i.key,t)}};function so(t){return(i,e)=>void 0!==e?((t,i,e)=>{i.constructor.createProperty(e,t)})(t,i,e):oo(t,i)
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */}
/**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var no;null===(no=globalThis.HTMLSlotElement)||void 0===no||no.prototype.assignedElements;
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const ro=1;let lo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,e){this._$Ct=t,this._$AM=i,this._$Ci=e}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}};
/**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const ho="important",po=" !"+ho,co=(t=>(...i)=>({_$litDirective$:t,values:i}))(class extends lo{constructor(t){var i;if(super(t),t.type!==ro||"style"!==t.name||(null===(i=t.strings)||void 0===i?void 0:i.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((i,e)=>{const a=t[e];return null==a?i:i+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${a};`}),"")}update(t,[i]){const{style:e}=t.element;if(void 0===this.ht){this.ht=new Set;for(const t in i)this.ht.add(t);return this.render(i)}this.ht.forEach((t=>{null==i[t]&&(this.ht.delete(t),t.includes("-")?e.removeProperty(t):e[t]="")}));for(const t in i){const a=i[t];if(null!=a){this.ht.add(t);const i="string"==typeof a&&a.endsWith(po);t.includes("-")||i?e.setProperty(t,i?a.slice(0,-11):a,i?ho:""):e[t]=a}}return ut}});var mo,yo,go=function(t,i,e,a){var o,s=arguments.length,n=s<3?i:null===a?a=Object.getOwnPropertyDescriptor(i,e):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,i,e,a);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(n=(s<3?o(n):s>3?o(i,e,n):o(i,e))||n);return s>3&&n&&Object.defineProperty(i,e,n),n};!function(t){t.primary="primary",t.secondary="secondary"}(mo||(mo={})),function(t){t.left="left",t.right="right"}(yo||(yo={}));class uo extends Rt{constructor(){super(...arguments),this.variant=mo.primary,this.items=[],this.verticalMenuNavText="",this.verticalMenuThreshold=768,this._open=!1}connectedCallback(){super.connectedCallback(),N(this.shadowRoot,[uo.cssVariables,ao,uo.collapsedNavigationStyles,this.desktopStyles()])}render(){const t=this.items.filter((t=>t.position===yo.right)),i=this.items.filter((t=>t.position!==yo.right));return gt` <div class="navigation-wrapper">
      <div class="navigation navigation--${this.variant} ui-label-text">
        ${this.variant===mo.primary?gt` <div class="navigation__header">
              <slot></slot>
            </div>`:ft}
        <ul class="navigation__body ${this._open?"navigation__open":""}">
          ${i.map((t=>this.renderItem(t))).concat(t.map(((t,i)=>this.renderItem(t,0===i?"item__first-right":""))))}
        </ul>
        <div class="navigation__button-wrapper">${this.renderNavigationButton()}</div>
      </div>
    </div>`}renderNavigationButton(){let t;switch(this.variant){case mo.primary:t=this._open?gt`<fds-icon icon="chevron-up"></fds-icon>`:gt`<fds-icon icon="chevron-down"></fds-icon>`;break;case mo.secondary:t=gt`<fds-icon icon="menu"></fds-icon>`}return gt`
      <button
        class="navigation__button navigation__button--${this.variant}"
        type="button"
        @click=${this.handleNavigationClick}
      >
        <span class="navigation__label ui-label-text">${this.verticalMenuNavText}</span>
        ${t}
      </button>
    `}handleNavigationClick(){this._open=!this._open}renderItem(t,i=""){var e;const a=null!==(e=t.verticalMenuOrder)&&void 0!==e?e:0;return gt` <li
      @click=${()=>this.handleSelect(t)}
      class="item ${this.selected===t?"item--active":""} ${i}"
      style=${co({order:a})}
    >
      <div class="item__label">
        ${t.icon&&gt`<fds-icon class="item__icon" .icon="${t.icon}"></fds-icon>`}
        <span>${t.label}</span>
      </div>
    </li>`}handleSelect(t){this.selected=t,this.dispatchEvent(new CustomEvent("select",{detail:t}))}desktopStyles(){return R`
      @container navigation-wrapper (min-width: ${L(this.verticalMenuThreshold)}px) {
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
          border-bottom: var(--element-vertical-padding--primary) solid ${to};
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
    `}}uo.cssVariables=R`
    :host {
      --element-vertical-padding--primary: 9px;
      --element-vertical-padding--secondary: 16px;
      --element-horizontal-padding--primary: 20px;
      --item-border-bottom-width--secondary: 3px;
    }
  `,uo.collapsedNavigationStyles=R`
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
      background-color: ${Xa};
      color: ${to};
    }

    .navigation--primary .item:hover {
      color: ${eo};
    }

    .navigation--primary .navigation__open .item--active .item__label:after {
      content: '';
      position: relative;
      align-self: center;
      height: 0;
      margin-left: auto;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-right: var(--element-vertical-padding--primary) solid ${to};
    }

    .navigation--secondary {
      background-color: ${to};
      border-bottom: 1px solid ${Xa};
    }

    .navigation--secondary .item {
      border-bottom: 1px solid ${io};
    }

    .navigation--secondary .item:hover {
      color: ${eo};
    }

    .navigation__open {
      height: auto;
      width: 100%;
      visibility: visible;
      opacity: 1;
      overflow-y: visible;
      margin-left: 0;
      margin-top: 0;

      border-top: 1px solid ${io};
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
      background-color: ${Xa};
      color: ${to};
      padding: var(--element-vertical-padding--primary);
    }

    .navigation__button--primary:hover {
      color: ${eo};
    }

    .navigation__button--secondary {
      background-color: ${to};
      color: ${Xa};
      padding: var(--element-vertical-padding--secondary);
    }

    .navigation__button--secondary:hover {
      color: ${eo};
    }

    .navigation__label {
      margin-right: 10px;
    }
  `,uo.styles=[uo.cssVariables,ao,uo.collapsedNavigationStyles],go([so()],uo.prototype,"variant",void 0),go([so()],uo.prototype,"items",void 0),go([so()],uo.prototype,"selected",void 0),go([so({attribute:"vertical-menu-nav-text"})],uo.prototype,"verticalMenuNavText",void 0),go([so({type:Number,attribute:"vertical-menu-threshold"})],uo.prototype,"verticalMenuThreshold",void 0),go([function(t){return so({...t,state:!0})}()],uo.prototype,"_open",void 0);
/**
     * @license lucide v0.473.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */
const fo=(t,i,e=[])=>{const a=document.createElementNS("http://www.w3.org/2000/svg",t);return Object.keys(i).forEach((t=>{a.setAttribute(t,String(i[t]))})),e.length&&e.forEach((t=>{const i=fo(...t);a.appendChild(i)})),a};
/**
     * @license lucide v0.473.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */
const bo={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};
/**
     * @license lucide v0.473.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */var vo=function(t,i,e,a){var o,s=arguments.length,n=s<3?i:null===a?a=Object.getOwnPropertyDescriptor(i,e):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,i,e,a);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(n=(s<3?o(n):s>3?o(i,e,n):o(i,e))||n);return s>3&&n&&Object.defineProperty(i,e,n),n};const wo={"alert-circle":["svg",bo,[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]]],"alert-triangle":["svg",bo,[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]]],"chevron-down":["svg",bo,[["path",{d:"m6 9 6 6 6-6"}]]],"chevron-right":["svg",bo,[["path",{d:"m9 18 6-6-6-6"}]]],"chevron-up":["svg",bo,[["path",{d:"m18 15-6-6-6 6"}]]],menu:["svg",bo,[["line",{x1:"4",x2:"20",y1:"12",y2:"12"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18"}]]],pencil:["svg",bo,[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]]],plus:["svg",bo,[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]]],"plus-circle":["svg",bo,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M8 12h8"}],["path",{d:"M12 8v8"}]]],"trash-2":["svg",bo,[["path",{d:"M3 6h18"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17"}]]],x:["svg",bo,[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]]],settings:["svg",bo,[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"}],["circle",{cx:"12",cy:"12",r:"3"}]]],"check-circle":["svg",bo,[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335"}],["path",{d:"m9 11 3 3L22 4"}]]],"chevrons-left-right-ellipsis":["svg",bo,[["path",{d:"m18 8 4 4-4 4"}],["path",{d:"m6 8-4 4 4 4"}],["path",{d:"M8 12h.01"}],["path",{d:"M12 12h.01"}],["path",{d:"M16 12h.01"}]]]};class _o extends Rt{constructor(){super(...arguments),this.size=t}render(){if(!this.icon||!wo[this.icon])return console.error(`invalid icon: '${this.icon}'`),null;const t=(([t,i,e])=>fo(t,i,e))(wo[this.icon]);return t.setAttribute("width",this.size.value),t.setAttribute("height",this.size.value),t}}function $o(){$.proxyAll(this,/^_/)}_o.styles=R`
    :host {
      display: inline-flex;
    }
  `,vo([so()],_o.prototype,"size",void 0),vo([so()],_o.prototype,"icon",void 0),customElements.define("fds-icon",_o),customElements.define("fds-navigation",uo),ckan.module("digitraffic_theme_top_navigation",(function(t){return{initialize:function(){const t={label:"Digitraffic",value:"digitraffic",url:"https://www.digitraffic.fi/"},i=[{label:"Liikennetilanne",value:"liikennetilanne",url:"https://liikennetilanne.fintraffic.fi/"},{label:"Palauteväylä",value:"palautevayla",url:"https://www.palautevayla.fi/aspa?lang=fi"},{label:"Junalähdöt",value:"junalahdot",url:"https://junalahdot.fintraffic.fi/"},{label:"Drone-palvelut",value:"dronepalvelut",url:"https://skynavx.fi/#/drone"},t,{label:"Digitransit",value:"digitransit",url:"https://digitransit.fi/"},{label:"Reittiopas",value:"reittiopas",url:"https://opas.matka.fi/"},{label:"NAP",value:"nap",url:"https://finap.fi/#/"}];customElements.whenDefined("fds-navigation").then((()=>{const e=document.createElement("fds-navigation");e.setAttribute("vertical-menu-threshold","1225"),e.innerHTML='\n      <a href="https://www.fintraffic.fi/fi">\n              <svg viewBox="0 0 253 42" style="height: 18px">\n                  <use href="/assets/fintraffic_horizontal_white.svg#fintraffic_horizontal_white"></use>\n              </svg>\n          </a>';e.variant=mo.primary,e.items=i,e.selected=t,e.verticalMenuNavText="Services",e.addEventListener("select",(i=>{const e=i.detail;window.open(e.url,"_blank"),i.target.selected=t})),this.el.replaceWith(e)}))}}}));const ko=()=>({initialize(){$o.apply(this),this._getMenuController().on("click",this._onMenuControllerClick),this._getMenuController().on("keydown",this._onMenuControllerKeyDown),this._getMenu().on("keydown",this._onMenuKeyDown)},_onMenuControllerClick(t){this._getMenuController().has(t.target)&&this._toggleList()},_onMenuControllerKeyDown(t){if(this._getMenuController().has(t.target)){const{key:i}=t;switch(i){case" ":case"Enter":t.preventDefault(),this._toggleList();break;case"ArrowDown":t.preventDefault(),this._focus("first")}}},_onMenuKeyDown(t){if(this._getMenuController().is(":visible")&&this._getMenu().has(t.target)){const{key:i}=t;switch(i){case"Escape":t.preventDefault(),this._closeList(),this._focus("menuController");break;case"ArrowDown":$(t.target).is("select")||(t.preventDefault(),this._focus("next"));break;case"ArrowUp":$(t.target).is("select")||(t.preventDefault(),this._focus("previous"))}}},_expandedClass:"expanded",_focus(t){let i;const e=this.el.find(":focus"),a=!!this._getMenu().has(e),o=a&&this._getMenu().find("a:last")[0]===e[0],s=a&&this._getMenu().find("a:first")[0]===e[0];switch(t){case"first":i=this._getMenu().find("a:first");break;case"menuController":i=this._getMenuController();break;case"next":if(a){if(o)return;{const t=this._getMenu().find("a");i=t.filter((i=>i>0&&t[i-1]===e[0]))}}else i=this._getMenu().find("a:first");break;case"previous":if(a){if(s)return;{const t=this._getMenu().find("a");i=t.filter((i=>i<t.length-1&&t[i+1]===e[0]))}}else i=this._getMenu().find("a:first")}i.trigger("focus")},_toggleList(){this._isMenuOpen()?(this._closeList(),this._focus("menuController")):(this._openList(),this._focus("first"))},_isMenuOpen(){return this._getMenu().hasClass(this._expandedClass)},_closeList(){const t=this._getMenuController();this._getMenu().removeClass(this._expandedClass),t.attr("aria-expanded","false")},_openList(){const t=this._getMenuController();this._getMenu().addClass(this._expandedClass),t.attr("aria-expanded","true")},_getMenuController(){throw Error("No controller")},_getMenu(){throw Error("No menu")}}),xo={...ko(),_getMenuController:()=>$("#app-nav-hamburger-button"),_getMenu:()=>$("#nav-interactions-wrapper")};ckan.module("digitraffic_theme_app_navigation",(function(t){return xo}));const So={...ko(),_getMenuController:()=>$("#user-action-select"),_getMenu:()=>$("#user-action-list")};ckan.module("digitraffic_theme_user_actions",(function(t){return So}));const Ao={"https://w3id.org/mobilitydcat-ap/mobility-theme/air-and-space-travel":[],"https://w3id.org/mobilitydcat-ap/mobility-theme/cycle-network-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/network-closures-diversions","https://w3id.org/mobilitydcat-ap/mobility-theme/network-detailed-attributes","https://w3id.org/mobilitydcat-ap/mobility-theme/network-geometry-and-lane-character"],"https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-traffic-signs-and-regulations":["https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-closures-and-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/direction-of-travel-on-reversible-lanes","https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-overtaking-bans-on-heavy-goods-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-speed-limits","https://w3id.org/mobilitydcat-ap/mobility-theme/lane-closures-and-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/other-access-restrictions-and-traffic-regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/other-temporary-traffic-management-measures-or-plans","https://w3id.org/mobilitydcat-ap/mobility-theme/road-closures-and-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-closures-and-access-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/filling-and-charging-stations":["https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-charging-points-for-electric-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-filling-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-charging-points","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-filling-stations"],"https://w3id.org/mobilitydcat-ap/mobility-theme/freight-and-logistics":["https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-delivery-areas","https://w3id.org/mobilitydcat-ap/mobility-theme/freight-delivery-regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-delivery-areas"],"https://w3id.org/mobilitydcat-ap/mobility-theme/general-information-for-trip-planning-":["https://w3id.org/mobilitydcat-ap/mobility-theme/address-identifiers","https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-costs","https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-environmental-factors","https://w3id.org/mobilitydcat-ap/mobility-theme/points-of-interest","https://w3id.org/mobilitydcat-ap/mobility-theme/topographic-places"],"https://w3id.org/mobilitydcat-ap/mobility-theme/other":[],"https://w3id.org/mobilitydcat-ap/mobility-theme/parking-service-and-rest-area-information":["https://w3id.org/mobilitydcat-ap/mobility-theme/bike-parking-locations","https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-locations-and-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/park-and-ride-stops","https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-locations-and-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-locations-and-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-accessibility-facilities","https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-geometry"],"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-non-scheduled-transport":["https://w3id.org/mobilitydcat-ap/mobility-theme/accesibility-information-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/fares","https://w3id.org/mobilitydcat-ap/mobility-theme/locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/provider-data","https://w3id.org/mobilitydcat-ap/mobility-theme/reservation-and-purchase-options","https://w3id.org/mobilitydcat-ap/mobility-theme/service-areas-and-service-times"],"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-scheduled-transport":["https://w3id.org/mobilitydcat-ap/mobility-theme/basic-commercial-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/basic-common-standard-fares","https://w3id.org/mobilitydcat-ap/mobility-theme/common-fare-products","https://w3id.org/mobilitydcat-ap/mobility-theme/connection-links","https://w3id.org/mobilitydcat-ap/mobility-theme/disruptions-delays-cancellations","https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/hours-of-operation","https://w3id.org/mobilitydcat-ap/mobility-theme/network-topology-and-routes-lines","https://w3id.org/mobilitydcat-ap/mobility-theme/operational-calendar","https://w3id.org/mobilitydcat-ap/mobility-theme/passenger-classes","https://w3id.org/mobilitydcat-ap/mobility-theme/planned-interchanges-between-scheduled-services","https://w3id.org/mobilitydcat-ap/mobility-theme/purchase-information","https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-estimated-departure-and-arrival-times","https://w3id.org/mobilitydcat-ap/mobility-theme/special-fare-products","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-accessibility-and-paths-within-facility","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-geometry-and-map-layout","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-location-and-features","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-status-of-features","https://w3id.org/mobilitydcat-ap/mobility-theme/timetables-static","https://w3id.org/mobilitydcat-ap/mobility-theme/transport-operators","https://w3id.org/mobilitydcat-ap/mobility-theme/vehicle-details"],"https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-traffic-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/current-travel-times","https://w3id.org/mobilitydcat-ap/mobility-theme/expected-delays","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-length-of-queues","https://w3id.org/mobilitydcat-ap/mobility-theme/predicted-travel-times","https://w3id.org/mobilitydcat-ap/mobility-theme/speed","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-data-at-border-crossings-to-third-countries","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-volume","https://w3id.org/mobilitydcat-ap/mobility-theme/waiting-time-at-border-crossings-to-non-eu-member-states"],"https://w3id.org/mobilitydcat-ap/mobility-theme/road-events-and-conditions":["https://w3id.org/mobilitydcat-ap/mobility-theme/accidents-and-incidents","https://w3id.org/mobilitydcat-ap/mobility-theme/poor-road-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/road-weather-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/road-work-information":["https://w3id.org/mobilitydcat-ap/mobility-theme/long-term-road-works","https://w3id.org/mobilitydcat-ap/mobility-theme/short-term-road-works"],"https://w3id.org/mobilitydcat-ap/mobility-theme/sharing-and-hiring-services":["https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods"],"https://w3id.org/mobilitydcat-ap/mobility-theme/static-road-network-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/geometry","https://w3id.org/mobilitydcat-ap/mobility-theme/gradients","https://w3id.org/mobilitydcat-ap/mobility-theme/junctions","https://w3id.org/mobilitydcat-ap/mobility-theme/number-of-lanes","https://w3id.org/mobilitydcat-ap/mobility-theme/road-classification","https://w3id.org/mobilitydcat-ap/mobility-theme/road-width"],"https://w3id.org/mobilitydcat-ap/mobility-theme/static-traffic-signs-and-regulations":["https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/other-static-traffic-signs","https://w3id.org/mobilitydcat-ap/mobility-theme/other-traffic-regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/permanent-access-restrictions","https://w3id.org/mobilitydcat-ap/mobility-theme/speed-limits","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-circulation-plans","https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-access-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/toll-information":["https://w3id.org/mobilitydcat-ap/mobility-theme/applicable-road-user-charges-and-payment-methods","https://w3id.org/mobilitydcat-ap/mobility-theme/identification-of-tolled-roads","https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-tolling-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods-for-tolls"],"https://w3id.org/mobilitydcat-ap/mobility-theme/waterways-and-water-bodies":[]},Eo=new Set(Object.keys(Ao)),Mo=new Set(Object.values(Ao).flat()),To={"https://w3id.org/mobilitydcat-ap/mobility-theme/accesibility-information-for-vehicles":{en:"Accesibility information for vehicles",fi:"Ajoneuvojen esteettömyystiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/accidents-and-incidents":{en:"Accidents and incidents",fi:"Liikenneonnettomuudet ja -häiriöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/address-identifiers":{en:"Address identifiers",fi:"Osoitetunnisteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/air-and-space-travel":{en:"Air and space travel",fi:"Ilma- ja avaruusmatkailu"},"https://w3id.org/mobilitydcat-ap/mobility-theme/applicable-road-user-charges-and-payment-methods":{en:"Applicable road user charges and payment methods",fi:"Sovellettavat tienkäyttömaksut ja maksutavat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-charging-points-for-electric-vehicles":{en:"Availability of charging points for electric vehicles",fi:"Sähköajoneuvojen latauspisteiden saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-delivery-areas":{en:"Availability of delivery areas",fi:"Lastaus- ja purkauspaikkojen saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-filling-stations":{en:"Availability of filling stations",fi:"Tankkausasemien saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/basic-commercial-conditions":{en:"Basic commercial conditions",fi:"Kaupalliset perusehdot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/basic-common-standard-fares":{en:"Basic common standard fares",fi:"Yleiset perusmaksut"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-availability":{en:"Bike-hiring Availability",fi:"Vuokrapyörien saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-stations":{en:"Bike-hiring Stations",fi:"Pyöränvuokrausasemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-parking-locations":{en:"Bike-parking locations",fi:"Polkupyöräparkit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-availability":{en:"Bike sharing Availability",fi:"Kaupunkipyörien saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-locations-and-stations":{en:"Bike-sharing Locations and stations",fi:"Kaupunkipyörien sijainnit ja asemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-access-conditions":{en:"Bridge access conditions",fi:"Siltojen käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-closures-and-access-conditions":{en:"Bridge closures and access conditions",fi:"Siltojen sulkemiset ja käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-availability":{en:"Car-hiring Availability",fi:"Autonvuokrauksen saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-stations":{en:"Car-hiring Stations",fi:"Autonvuokrausasemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-availability":{en:"Car parking availability",fi:"Autojen pysäköinnin saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-locations-and-conditions":{en:"Car parking locations and conditions",fi:"Autojen pysäköintipaikat ja -olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-availability":{en:"Car-sharing Availability",fi:"Yhteiskäyttöautojen saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-locations-and-stations":{en:"Car-sharing Locations and stations",fi:"Yhteiskäyttöautojen sijainnit ja asemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/common-fare-products":{en:"Common fare products",fi:"Yleiset lipputuotteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/connection-links":{en:"Connection links",fi:"Vaihtoyhteydet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/current-travel-times":{en:"Current travel times",fi:"Ajankohtaiset matka-ajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/cycle-network-data":{en:"Cycle network data",fi:"Pyöräilyverkon tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/data-content-category":{en:"Data content category",fi:"Tietosisällön kategoria"},"https://w3id.org/mobilitydcat-ap/mobility-theme/data-content-sub-category":{en:"Data content sub-category",fi:"Tietosisällön alakategoria"},"https://w3id.org/mobilitydcat-ap/mobility-theme/direction-of-travel-on-reversible-lanes":{en:"Direction of travel on reversible lanes",fi:"Vaihtuvasuuntaisten kaistojen ajosuunta"},"https://w3id.org/mobilitydcat-ap/mobility-theme/disruptions-delays-cancellations":{en:"Disruptions, delays, cancellations",fi:"Häiriöt, viivästykset, peruutukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-overtaking-bans-on-heavy-goods-vehicles":{en:"Dynamic overtaking bans on heavy goods vehicles",fi:"Dynaamiset raskaiden ajoneuvojen ohituskiellot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-speed-limits":{en:"Dynamic speed limits",fi:"Dynaamiset nopeusrajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-traffic-signs-and-regulations":{en:"Dynamic traffic signs and regulations",fi:"Dynaamiset liikennemerkit ja -säännöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-availability":{en:"E-scooter-sharing Availability",fi:"Yhteiskäyttöisten sähköpotkulautojen saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-locations-and-stations":{en:"E-scooter-sharing Locations and stations",fi:"Yhteiskäyttöisten sähköpotkulautojen sijainnit ja asemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles":{en:"Environmental standards for vehicles",fi:"Ajoneuvojen ympäristöstandardit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/expected-delays":{en:"Expected delays",fi:"Tiedossa olevat viivästykset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/fares":{en:"Fares",fi:"Maksut ja tariffit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/filling-and-charging-stations":{en:"Filling and charging stations",fi:"Tankkaus- ja latausasemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/freight-and-logistics":{en:"Freight and logistics",fi:"Rahti ja logistiikka"},"https://w3id.org/mobilitydcat-ap/mobility-theme/freight-delivery-regulations":{en:"Freight delivery regulations",fi:"Rahdinkuljetusmääräykset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/general-information-for-trip-planning-":{en:"General information for trip-planning",fi:"Yleistä tietoa reittisuunnitteluun"},"https://w3id.org/mobilitydcat-ap/mobility-theme/geometry":{en:"Geometry",fi:"Geometria"},"https://w3id.org/mobilitydcat-ap/mobility-theme/gradients":{en:"Gradients",fi:"Kaltevuudet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/hours-of-operation":{en:"Hours of operation",fi:"Käyttöajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/identification-of-tolled-roads":{en:"Identification of tolled roads",fi:"Tietullin alaisten teiden yksilöiminen"},"https://w3id.org/mobilitydcat-ap/mobility-theme/junctions":{en:"Junctions",fi:"Liittymät"},"https://w3id.org/mobilitydcat-ap/mobility-theme/lane-closures-and-access-conditions":{en:"Lane closures and access conditions",fi:"Kaistojen sulkemiset ja käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-charging-points":{en:"Location and conditions of charging points",fi:"Latauspisteiden sijainnit ja olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-filling-stations":{en:"Location and conditions of filling stations",fi:"Tankkausasemien sijainnit ja olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-length-of-queues":{en:"Location and length of queues",fi:"Jonojen sijainti ja pituus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-delivery-areas":{en:"Location of delivery areas",fi:"Lastaus- ja purkausalueiden sijainti"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-tolling-stations":{en:"Location of tolling stations",fi:"Tietulliasemien sijainti"},"https://w3id.org/mobilitydcat-ap/mobility-theme/locations-and-stations":{en:"Locations and stations",fi:"Sijainnit ja asemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/long-term-road-works":{en:"Long-term road works",fi:"Pitkäaikaiset tietyöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/network-closures-diversions":{en:"Network closures/diversions",fi:"Verkon suljetut osat ja/tai kiertotiet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/network-detailed-attributes":{en:"Network detailed attributes",fi:"Verkon yksityiskohtaiset tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/network-geometry-and-lane-character":{en:"Network geometry and lane character",fi:"Verkkogeometria ja kaistojen luonne"},"https://w3id.org/mobilitydcat-ap/mobility-theme/network-topology-and-routes-lines":{en:"Network topology and routes/lines",fi:"Verkkotopologia ja reitit/linjat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/number-of-lanes":{en:"Number of lanes",fi:"Kaistojen määrä"},"https://w3id.org/mobilitydcat-ap/mobility-theme/operational-calendar":{en:"Operational Calendar",fi:"Operatiivinen kalenteri"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other":{en:"Other",fi:"Muu"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other-access-restrictions-and-traffic-regulations":{en:"Other access restrictions and traffic regulations",fi:"Muut käyttörajoitukset ja liikennesäännöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other-static-traffic-signs":{en:"Other static traffic signs",fi:"Muut staattiset liikennemerkit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other-temporary-traffic-management-measures-or-plans":{en:"Other temporary traffic management measures or plans",fi:"Muut tilapäiset liikenteenhallintatoimenpiteet tai -suunnitelmat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other-traffic-regulations":{en:"Other traffic regulations",fi:"Muut liikennesäännöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-costs":{en:"Parameters needed to calculate costs",fi:"Kustannusten laskemiseen tarvittavat parametrit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-environmental-factors":{en:"Parameters needed to calculate environmental factors",fi:"Ympäristötekijöiden laskemiseen tarvittavat parametrit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/park-and-ride-stops":{en:"Park and Ride stops",fi:"Julkisen liikenteen liityntäpysäköinti"},"https://w3id.org/mobilitydcat-ap/mobility-theme/parking-service-and-rest-area-information":{en:"Parking, service and rest area information",fi:"Pysäköinti-, palvelu- ja levähdysalueiden tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/passenger-classes":{en:"Passenger classes",fi:"Matkustajaluokat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods":{en:"Payment methods",fi:"Maksutavat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods-for-tolls":{en:"Payment methods for tolls",fi:"Tietullien maksutavat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-accessibility-facilities":{en:"Pedestrian accessibility facilities",fi:"Jalankulkijoiden esteettömyyttä tukevat välineet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-data":{en:"Pedestrian network data",fi:"Jalankulkuverkon tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-geometry":{en:"Pedestrian network geometry",fi:"Jalankulkuverkon geometria"},"https://w3id.org/mobilitydcat-ap/mobility-theme/permanent-access-restrictions":{en:"Permanent access restrictions",fi:"Pysyvät käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/planned-interchanges-between-scheduled-services":{en:"Planned interchanges between scheduled services",fi:"Suunnitellut vaihdot säännöllisten palvelujen välillä"},"https://w3id.org/mobilitydcat-ap/mobility-theme/points-of-interest":{en:"Points of interest",fi:"Kohdepisteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/poor-road-conditions":{en:"Poor road conditions",fi:"Huonokuntoiset tiet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/predicted-travel-times":{en:"Predicted travel times",fi:"Ennustetut matka-ajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/provider-data":{en:"Provider data",fi:"Palveluntarjoajan tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-non-scheduled-transport":{en:"Public transport non-scheduled transport",fi:"Joukkoliikenne, aikatauluttamaton"},"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-scheduled-transport":{en:"Public transport scheduled transport",fi:"Joukkoliikenne, säännöllinen"},"https://w3id.org/mobilitydcat-ap/mobility-theme/purchase-information":{en:"Purchase information",fi:"Ostotiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-estimated-departure-and-arrival-times":{en:"Real-time estimated departure and arrival times",fi:"Reaaliaikaiset arvioidut lähtö- ja saapumisajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-traffic-data":{en:"Real-time traffic data",fi:"Reaaliaikaiset liikennetiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/reservation-and-purchase-options":{en:"Reservation and purchase options",fi:"Varaus- ja ostovaihtoehdot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-classification":{en:"Road classification",fi:"Tien luokitus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-closures-and-access-conditions":{en:"Road closures and access conditions",fi:"Teiden sulkemiset ja käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-events-and-conditions":{en:"Road events and conditions",fi:"Tieolosuhteet ja tapahtumat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-weather-conditions":{en:"Road weather conditions",fi:"Tieolosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-width":{en:"Road width",fi:"Teiden leveys"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-work-information":{en:"Road work information",fi:"Tietyötiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-availability":{en:"Service and rest area availability",fi:"Palvelu- ja levähdysalueiden saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-locations-and-conditions":{en:"Service and rest area locations and conditions",fi:"Palvelu- ja levähdysalueiden sijainnit ja olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/service-areas-and-service-times":{en:"Service areas and service times",fi:"Palvelualueet ja palveluajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/sharing-and-hiring-services":{en:"Sharing and Hiring Services",fi:"Vuokraus- ja yhteiskäyttöpalvelut"},"https://w3id.org/mobilitydcat-ap/mobility-theme/short-term-road-works":{en:"Short-term road works",fi:"Lyhytaikaiset tietyöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/special-fare-products":{en:"Special Fare Products",fi:"Erikoismaksutuotteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/speed":{en:"Speed",fi:"Nopeus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/speed-limits":{en:"Speed limits",fi:"Nopeusrajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/static-road-network-data":{en:"Static road network data",fi:"Staattiset tieverkon tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/static-traffic-signs-and-regulations":{en:"Static traffic signs and regulations",fi:"Staattiset liikennemerkit ja -säännöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-accessibility-and-paths-within-facility":{en:"Stop facilities accessibility and paths within facility",fi:"Pysäkkipalveluiden esteettömyys ja reitit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-geometry-and-map-layout":{en:"Stop facilities geometry and map layout",fi:"Pysäkkipalveluiden geometria ja kartta"},"https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-location-and-features":{en:"Stop facilities location and features",fi:"Pysäkkipalveluiden sijainti ja ominaisuudet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-status-of-features":{en:"Stop facilities status of features",fi:"Pysäkkipalveluiden ominaisuuksien tila"},"https://w3id.org/mobilitydcat-ap/mobility-theme/timetables-static":{en:"Timetables static",fi:"Aikataulut, staattiset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/toll-information":{en:"Toll information",fi:"Tietullitiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/topographic-places":{en:"Topographic places",fi:"Topografiset paikat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-circulation-plans":{en:"Traffic circulation plans",fi:"Liikennevirtasuunnitelmat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-data-at-border-crossings-to-third-countries":{en:"Traffic data at border crossings to third countries",fi:"Liikennetiedot rajanylityspaikoilla kolmansiin maihin"},"https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-volume":{en:"Traffic volume",fi:"Liikenteen määrä"},"https://w3id.org/mobilitydcat-ap/mobility-theme/transport-operators":{en:"Transport operators",fi:"Liikenteenharjoittajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-availability":{en:"Truck parking availability",fi:"Kuorma-autopysäköinnin saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-locations-and-conditions":{en:"Truck parking locations and conditions",fi:"Kuorma-autojen pysäköintipaikat ja -olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-access-conditions":{en:"Tunnel access conditions",fi:"Tunneleiden käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-closures-and-access-conditions":{en:"Tunnel closures and access conditions",fi:"Tunneleiden sulkemiset ja käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/vehicle-details":{en:"Vehicle details",fi:"Ajoneuvojen tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/waiting-time-at-border-crossings-to-non-eu-member-states":{en:"Waiting time at border crossings to non-EU Member States",fi:"Odotusaika rajanylityspaikoilla EU:n ulkopuolisiin maihin"},"https://w3id.org/mobilitydcat-ap/mobility-theme/waterways-and-water-bodies":{en:"Waterways and water bodies",fi:"Vesiväylät ja vesistöt"}};const Po={initialize(){$o.apply(this),this.state={topMobilityTheme:this._getInitialMobilityTheme()};this._getTopMobilityThemeSelector().on("change",this._onTopMobilityThemeChanged),this._onStateUpdate(this._handleTopMobilityThemeChanged),this._subThemeSelectorViewUpdate(void 0,this.state)},teardown:function(){this._stateListeners=void 0},_getInitialMobilityTheme(){const t=this._getTopMobilityThemeSelector().val();return"string"==typeof(i=t)&&Eo.has(i)?t:void 0;var i},_getInitialSubMobilityTheme(){const t=this._getInitialSubMobilityThemeSelector().val();return Mo.has(t)?t:void 0},_getTopMobilityThemeSelector(){return this.$("#field-mobility_theme")},_getInitialSubMobilityThemeSelector(){return this.$("#mobility_theme_sub_value")},_getSubMobilityThemeSelector(){return this.$("#field-mobility_theme_sub")},_onTopMobilityThemeChanged(t){const i=t.target.value;this._mergeState({topMobilityTheme:i})},_stateChangedKeys(t,i){const e=new Set;for(const a in t)a in i?t[a]!==i[a]&&e.add(a):e.add(a);for(const a in i)a in t||e.add(a);return e},_triggerListeners(t,i){if(this._stateListeners)for(const e of this._stateListeners)e(t,i)},_updateState(t){const i=this.state;this.state=t;const e=this._stateChangedKeys(i,t);return this._triggerListeners(i,e),t},_mergeState(t){const i=this.state,e={...this.state,...t};this.state=e;const a=this._stateChangedKeys(i,e);return this._triggerListeners(i,a),e},_onStateUpdate(t){return this._stateListeners?this._stateListeners.push(t):this._stateListeners=[t],()=>{this._stateListeners&&(this._stateListeners=this._stateListeners.filter((i=>i!==t)))}},_handleTopMobilityThemeChanged(t,i){i.has("topMobilityTheme")&&this._subThemeSelectorViewUpdate(t,this.state)},_subThemeSelectorViewUpdate(t,i){function e(t){return"object"==typeof t&&!!t.subMobilityThemeSelectorParent&&!!t.subMobilityThemeSelector}function a(){const t=this._getSubMobilityThemeSelector().parentsUntil("form").filter("div.form-group");"none"!==t.css("display")?t.css("display","none"):t.css("display","")}const o=void 0===t,s=t?.topMobilityTheme!==i.topMobilityTheme;if(o||s){const t=Ao[i.topMobilityTheme],o=this._getInitialSubMobilityTheme();if(t?.length>0){(function(){if(e(i)){i.subMobilityThemeSelectorParent.append(i.subMobilityThemeSelector),a.apply(this);const t={...i},e=new Set(["subMobilityThemeSelector","subMobilityThemeSelectorParent"]),o=Object.keys(t).reduce(((i,a)=>(e.has(a)||(i[a]=t[a]),i)),{});this._updateState(o)}}).apply(this);const s=function(t,i){const e=t.map((t=>{const e=document.createElement("option");e.value=t;const a=$("html").attr("lang");return e.text=To[t][a]??To[t].en,t===i&&(e.selected=!0),e})),a=document.createElement("option");return a.value="",a.text="",i||(a.selected=!0),e.unshift(a),e.sort(((t,i)=>t.text.localeCompare(i.text))),e}.apply(this,[t,o]);(function(t){this._getSubMobilityThemeSelector().empty().append(t)}).apply(this,[s])}else(function(){if(!e(i)){a.apply(this);const t=this._getSubMobilityThemeSelector().parent(),i=this._getSubMobilityThemeSelector().detach();this._mergeState({subMobilityThemeSelector:i,subMobilityThemeSelectorParent:t})}}).apply(this)}}};ckan.module("digitraffic_theme_dataset_form_wrapper",(function(t){return Po}));const jo={initialize(){$o.apply(this)}};ckan.module("digitraffic_theme_iri_fragment_inputs",(function(t){return jo}));const Co={initialize(){$o.apply(this);const t=this._getForm(),i=this._getFormInput(),e=this._getLanguageDropdown(),a=this._getLanguageOptions();e.on("click",this._toggleLanguageDropdownMouseOpen),e.on("keydown",this._toggleLanguageDropdownKeyboardOpen),a.each(((e,a)=>{const o=$(a);o.on("click",(()=>this._submitFormMouse(o,i,t))),o.on("keydown",(e=>this._submitFormKeyboard(e,o,i,t)))}))},_toggleLanguageDropdownMouseOpen(t){t.target&&t.target.classList.toggle("open")},_toggleLanguageDropdownKeyboardOpen(t){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),t.target&&t.target.classList.toggle("open"))},_submitFormMouse(t,i,e){const a=t.attr("data-value");i&&a&&i.val(a),e&&e.trigger("submit")},_submitFormKeyboard(t,i,e,a){if("Enter"===t.key||" "===t.key){const t=i.attr("data-value");e&&t&&e.val(t),a&&a.trigger("submit")}},_getForm(){return this.$("#language-menu-form")},_getFormInput(){return this.$("#language-option-hidden")},_getLanguageDropdown(){return this.$(".custom-language-dropdown")},_getLanguageOptions(){return this.$(".custom-language-option")}};ckan.module("digitraffic_theme_language_menu",(function(t){return Co}));const zo={START_TIMESTAMP_TZ_CSS_QUERY:"#field-start_timestamp-tz",END_TIMESTAMP_TZ_CSS_QUERY:"#field-end_timestamp-tz",initialize(){$o.apply(this);const t=this._getStartTimestampTZ(),i=this._getEndTimestampTZ();this._moveToEnd(t),t.find(this.START_TIMESTAMP_TZ_CSS_QUERY).on("change",(t=>{const e=t.target.value;i.find(this.END_TIMESTAMP_TZ_CSS_QUERY).val(e)})),i.hide(),this._showNecessityLabels()},_getStartTimestampTZ(){return this.$(".datetime-row").find(".datetime-field").has(this.START_TIMESTAMP_TZ_CSS_QUERY)},_getEndTimestampTZ(){return this.$(".datetime-row").find(".datetime-field").has(this.END_TIMESTAMP_TZ_CSS_QUERY)},_moveToEnd(t){t.appendTo(this.el)},_showNecessityLabels(){const t=this.$(".hide-necessity");t.length&&t.removeClass("hide-necessity")}};ckan.module("digitraffic_theme_temporal_coverage",(function(t){return zo}));const Lo={initialize(){$o.apply(this);this._getToggleButtons().children(".language-toggle-button").each(((t,i)=>{const e=$(i),a=e.attr("id");e.on("click",(t=>{t.preventDefault();this.$(`#field-${a}`).parent().parent().removeClass("hidden"),e.addClass("hidden")}))}));this._getCloseButtons().each(((t,i)=>{const e=$(i),a=e.attr("id");e.on("click",(t=>{t.preventDefault();$(`#${a}.language-toggle-button`).removeClass("hidden"),e.parent().parent().addClass("hidden");this.$(`#field-${a}`).val("")}))}))},_getToggleButtons(){return this.$(".language-toggle-buttons")},_getCloseButtons(){return this.$(".hide-language-input")}};ckan.module("digitraffic_theme_language_toggle_buttons",(function(t){return Lo}));
/**
     * @license lucide v0.477.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */
const Ro={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},No=([t,i,e])=>{const a=document.createElementNS("http://www.w3.org/2000/svg",t);return Object.keys(i).forEach((t=>{a.setAttribute(t,String(i[t]))})),e?.length&&e.forEach((t=>{const i=No(t);a.appendChild(i)})),a},Oo=t=>"string"==typeof t?t:t&&t.class?t.class&&"string"==typeof t.class?t.class.split(" "):t.class&&Array.isArray(t.class)?t.class:"":"",Uo=(t,{nameAttr:i,icons:e,attrs:a})=>{const o=t.getAttribute(i);if(null==o)return;const s=e[o.replace(/(\w)(\w*)(_|-|\s*)/g,((t,i,e)=>i.toUpperCase()+e.toLowerCase()))];if(!s)return console.warn(`${t.outerHTML} icon name was not found in the provided icons object.`);const n=(t=>Array.from(t.attributes).reduce(((t,i)=>(t[i.name]=i.value,t)),{}))(t),r={...Ro,"data-lucide":o,...a,...n},l=["lucide",`lucide-${o}`,n,a].flatMap(Oo).map((t=>t.trim())).filter(Boolean).filter(((t,i,e)=>e.indexOf(t)===i)).join(" ");l&&Object.assign(r,{class:l});const d=((t,i={})=>{const e={...Ro,...i};return No(["svg",e,t])})(s,r);return t.parentNode?.replaceChild(d,t)},Do=[["path",{d:"m6 9 6 6 6-6"}]],Bo=[["path",{d:"m18 15-6-6-6 6"}]],Ho=[["path",{d:"M15 3h6v6"}],["path",{d:"M10 14 21 3"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}]],Io=[["path",{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"}]],Vo=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],["path",{d:"M2 12h20"}]],Ko=[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5"}]],Wo=[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}],["rect",{width:"4",height:"12",x:"2",y:"9"}],["circle",{cx:"4",cy:"4",r:"2"}]],Fo=[["line",{x1:"4",x2:"20",y1:"12",y2:"12"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18"}]],Yo=[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"}]],Zo=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]],Go=[["path",{d:"M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"}],["path",{d:"m10 15 5-3-5-3z"}]];
/**
     * @license lucide v0.477.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */jQuery((function(){$(".js-disabled").removeClass("js-disabled"),(({icons:t={},nameAttr:i="data-lucide",attrs:e={}}={})=>{if(!Object.values(t).length)throw new Error("Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`");if("undefined"==typeof document)throw new Error("`createIcons()` only works in a browser environment.");const a=document.querySelectorAll(`[${i}]`);if(Array.from(a).forEach((a=>Uo(a,{nameAttr:i,icons:t,attrs:e}))),"data-lucide"===i){const i=document.querySelectorAll("[icon-name]");i.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(i).forEach((i=>Uo(i,{nameAttr:"icon-name",icons:t,attrs:e}))))}})({icons:{ExternalLink:Ho,User:Zo,Menu:Fo,Globe:Vo,ChevronDown:Do,ChevronUp:Bo,Facebook:Io,Twitter:Yo,Instagram:Ko,Youtube:Go,Linkedin:Wo}})}))}();
