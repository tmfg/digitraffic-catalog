!function(){"use strict";const t={name:"fds-size-3",value:"24px"},e=class{get shadowRoot(){return this.__host.__shadowRoot}constructor(t){this.ariaAtomic="",this.ariaAutoComplete="",this.ariaBrailleLabel="",this.ariaBrailleRoleDescription="",this.ariaBusy="",this.ariaChecked="",this.ariaColCount="",this.ariaColIndex="",this.ariaColSpan="",this.ariaCurrent="",this.ariaDescription="",this.ariaDisabled="",this.ariaExpanded="",this.ariaHasPopup="",this.ariaHidden="",this.ariaInvalid="",this.ariaKeyShortcuts="",this.ariaLabel="",this.ariaLevel="",this.ariaLive="",this.ariaModal="",this.ariaMultiLine="",this.ariaMultiSelectable="",this.ariaOrientation="",this.ariaPlaceholder="",this.ariaPosInSet="",this.ariaPressed="",this.ariaReadOnly="",this.ariaRequired="",this.ariaRoleDescription="",this.ariaRowCount="",this.ariaRowIndex="",this.ariaRowSpan="",this.ariaSelected="",this.ariaSetSize="",this.ariaSort="",this.ariaValueMax="",this.ariaValueMin="",this.ariaValueNow="",this.ariaValueText="",this.role="",this.form=null,this.labels=[],this.states=new Set,this.validationMessage="",this.validity={},this.willValidate=!0,this.__host=t}checkValidity(){return console.warn("`ElementInternals.checkValidity()` was called on the server.This method always returns true."),!0}reportValidity(){return!0}setFormValue(){}setValidity(){}};
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
var i,a,o,s,n,r,l,d,h,p,c,m,g=function(t,e,i,a,o){if("m"===a)throw new TypeError("Private method is not writable");if("a"===a&&!o)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!o:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===a?o.call(t,i):o?o.value=i:e.set(t,i),i},y=function(t,e,i,a){if("a"===i&&!a)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!a:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===i?a:"a"===i?a.call(t):a?a.value:e.get(t)};const u=t=>"boolean"==typeof t?t:t?.capture??!1;const f=class{constructor(){this.__eventListeners=new Map,this.__captureEventListeners=new Map}addEventListener(t,e,i){if(null==e)return;const a=u(i)?this.__captureEventListeners:this.__eventListeners;let o=a.get(t);if(void 0===o)o=new Map,a.set(t,o);else if(o.has(e))return;const s="object"==typeof i&&i?i:{};s.signal?.addEventListener("abort",()=>this.removeEventListener(t,e,i)),o.set(e,s??{})}removeEventListener(t,e,i){if(null==e)return;const a=u(i)?this.__captureEventListeners:this.__eventListeners,o=a.get(t);void 0!==o&&(o.delete(e),o.size||a.delete(t))}dispatchEvent(t){const e=[this];let i=this.__eventTargetParent;if(t.composed)for(;i;)e.push(i),i=i.__eventTargetParent;else for(;i&&i!==this.__host;)e.push(i),i=i.__eventTargetParent;let a=!1,o=!1,s=0,n=null,r=null,l=null;const d=t.stopPropagation,h=t.stopImmediatePropagation;Object.defineProperties(t,{target:{get:()=>n??r,...b},srcElement:{get:()=>t.target,...b},currentTarget:{get:()=>l,...b},eventPhase:{get:()=>s,...b},composedPath:{value:()=>e,...b},stopPropagation:{value:()=>{a=!0,d.call(t)},...b},stopImmediatePropagation:{value:()=>{o=!0,h.call(t)},...b}});const p=(e,i,a)=>{"function"==typeof e?e(t):"function"==typeof e?.handleEvent&&e.handleEvent(t),i.once&&a.delete(e)},c=()=>(l=null,s=0,!t.defaultPrevented),m=e.slice().reverse();n=this.__host&&t.composed?null:this;const g=t=>{for(r=this;r.__host&&t.includes(r.__host);)r=r.__host};for(const e of m){n||r&&r!==e.__host||g(m.slice(m.indexOf(e))),l=e,s=e===t.target?2:1;const i=e.__captureEventListeners.get(t.type);if(i)for(const[t,e]of i)if(p(t,e,i),o)return c();if(a)return c()}const y=t.bubbles?e:[this];r=null;for(const e of y){n||r&&e!==r.__host||g(y.slice(0,y.indexOf(e)+1)),l=e,s=e===t.target?2:3;const i=e.__eventListeners.get(t.type);if(i)for(const[t,e]of i)if(p(t,e,i),o)return c();if(a)return c()}return c()}},b={__proto__:null,enumerable:!0};Object.freeze(b);const v=(p=class{constructor(t,e={}){if(i.set(this,!1),a.set(this,!1),o.set(this,!1),s.set(this,!1),n.set(this,Date.now()),r.set(this,!1),l.set(this,void 0),d.set(this,void 0),h.set(this,void 0),this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,0===arguments.length)throw new Error("The type argument must be specified");if("object"!=typeof e||!e)throw new Error('The "options" argument must be an object');const{bubbles:p,cancelable:c,composed:m}=e;g(this,i,!!c,"f"),g(this,a,!!p,"f"),g(this,o,!!m,"f"),g(this,l,`${t}`,"f"),g(this,d,null,"f"),g(this,h,!1,"f")}initEvent(t,e,i){throw new Error("Method not implemented.")}stopImmediatePropagation(){this.stopPropagation()}preventDefault(){g(this,s,!0,"f")}get target(){return y(this,d,"f")}get currentTarget(){return y(this,d,"f")}get srcElement(){return y(this,d,"f")}get type(){return y(this,l,"f")}get cancelable(){return y(this,i,"f")}get defaultPrevented(){return y(this,i,"f")&&y(this,s,"f")}get timeStamp(){return y(this,n,"f")}composedPath(){return y(this,h,"f")?[y(this,d,"f")]:[]}get returnValue(){return!y(this,i,"f")||!y(this,s,"f")}get bubbles(){return y(this,a,"f")}get composed(){return y(this,o,"f")}get eventPhase(){return y(this,h,"f")?p.AT_TARGET:p.NONE}get cancelBubble(){return y(this,r,"f")}set cancelBubble(t){t&&g(this,r,!0,"f")}stopPropagation(){g(this,r,!0,"f")}get isTrusted(){return!1}},i=new WeakMap,a=new WeakMap,o=new WeakMap,s=new WeakMap,n=new WeakMap,r=new WeakMap,l=new WeakMap,d=new WeakMap,h=new WeakMap,p.NONE=0,p.CAPTURING_PHASE=1,p.AT_TARGET=2,p.BUBBLING_PHASE=3,p);Object.defineProperties(v.prototype,{initEvent:b,stopImmediatePropagation:b,preventDefault:b,target:b,currentTarget:b,srcElement:b,type:b,cancelable:b,defaultPrevented:b,timeStamp:b,composedPath:b,returnValue:b,bubbles:b,composed:b,eventPhase:b,cancelBubble:b,stopPropagation:b,isTrusted:b});const _=(m=class extends v{constructor(t,e={}){super(t,e),c.set(this,void 0),g(this,c,e?.detail??null,"f")}initCustomEvent(t,e,i,a){throw new Error("Method not implemented.")}get detail(){return y(this,c,"f")}},c=new WeakMap,m);Object.defineProperties(_.prototype,{detail:b});const w=v,k=_;
/**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
globalThis.Event??=w,globalThis.CustomEvent??=k;const x=new WeakMap,A=t=>{let e=x.get(t);return void 0===e&&x.set(t,e=new Map),e},S=class extends f{constructor(){super(...arguments),this.__shadowRootMode=null,this.__shadowRoot=null,this.__internals=null}get attributes(){return Array.from(A(this)).map(([t,e])=>({name:t,value:e}))}get shadowRoot(){return"closed"===this.__shadowRootMode?null:this.__shadowRoot}get localName(){return this.constructor.__localName}get tagName(){return this.localName?.toUpperCase()}setAttribute(t,e){A(this).set(t,String(e))}removeAttribute(t){A(this).delete(t)}toggleAttribute(t,e){return this.hasAttribute(t)?!(void 0===e||!e)||(this.removeAttribute(t),!1):!(void 0!==e&&!e)&&(this.setAttribute(t,""),!0)}hasAttribute(t){return A(this).has(t)}attachShadow(t){const e={host:this};return this.__shadowRootMode=t.mode,t&&"open"===t.mode&&(this.__shadowRoot=e),e}attachInternals(){if(null!==this.__internals)throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");const t=new e(this);return this.__internals=t,t}getAttribute(t){return A(this).get(t)??null}},M=class extends S{};globalThis.litServerRoot??=Object.defineProperty(new M,"localName",{get:()=>"lit-server-root"});const T=new class{constructor(){this.__definitions=new Map,this.__reverseDefinitions=new Map,this.__pendingWhenDefineds=new Map}define(t,e){if(this.__definitions.has(t)){if("development"!==process.env.NODE_ENV)throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the name "${t}" has already been used with this registry`);console.warn(`'CustomElementRegistry' already has "${t}" defined. This may have been caused by live reload or hot module replacement in which case it can be safely ignored.\nMake sure to test your application with a production build as repeat registrations will throw in production.`)}if(this.__reverseDefinitions.has(e))throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the constructor has already been used with this registry for the tag name ${this.__reverseDefinitions.get(e)}`);e.__localName=t,this.__definitions.set(t,{ctor:e,observedAttributes:e.observedAttributes??[]}),this.__reverseDefinitions.set(e,t),this.__pendingWhenDefineds.get(t)?.resolve(e),this.__pendingWhenDefineds.delete(t)}get(t){const e=this.__definitions.get(t);return e?.ctor}getName(t){return this.__reverseDefinitions.get(t)??null}upgrade(t){throw new Error("customElements.upgrade is not currently supported in SSR. Please file a bug if you need it.")}async whenDefined(t){const e=this.__definitions.get(t);if(e)return e.ctor;let i=this.__pendingWhenDefineds.get(t);return i||(i=function(){let t,e;return{promise:new Promise((i,a)=>{t=i,e=a}),resolve:t,reject:e}}(),this.__pendingWhenDefineds.set(t,i)),i.promise}},E=globalThis,C=E.ShadowRoot&&(void 0===E.ShadyCSS||E.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,P=Symbol(),j=new WeakMap;let N=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==P)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(C&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=j.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&j.set(e,t))}return t}toString(){return this.cssText}};const O=t=>new N("string"==typeof t?t:t+"",void 0,P),I=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,a)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[a+1],t[0]);return new N(i,t,P)},L=(t,e)=>{C?t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(e=>{const i=document.createElement("style"),a=E.litNonce;void 0!==a&&i.setAttribute("nonce",a),i.textContent=e.cssText,t.appendChild(i)})},R=C||void 0===E.CSSStyleSheet?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return O(e)})(t):t;
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var z,D;const U=globalThis;null!==(z=U.customElements)&&void 0!==z||(U.customElements=T);const V=U.trustedTypes,F=V?V.emptyScript:"",B=U.reactiveElementPolyfillSupport,H={toAttribute(t,e){switch(e){case Boolean:t=t?F:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},Y=(t,e)=>e!==t&&(e==e||t==t),W={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:Y},G="finalized";let K=class extends(globalThis.HTMLElement??M){constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const a=this._$Ep(i,e);void 0!==a&&(this._$Ev.set(a,i),t.push(a))}),t}static createProperty(t,e=W){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,a=this.getPropertyDescriptor(t,i,e);void 0!==a&&Object.defineProperty(this.prototype,t,a)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(a){const o=this[t];this[e]=a,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||W}static finalize(){if(this.hasOwnProperty(G))return!1;this[G]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(R(t))}else void 0!==t&&e.push(R(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return L(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=W){var a;const o=this.constructor._$Ep(t,i);if(void 0!==o&&!0===i.reflect){const s=(void 0!==(null===(a=i.converter)||void 0===a?void 0:a.toAttribute)?i.converter:H).toAttribute(e,i.type);this._$El=t,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$El=null}}_$AK(t,e){var i;const a=this.constructor,o=a._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=a.getPropertyOptions(o),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:H;this._$El=o,this[o]=s.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let a=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||Y)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):a=!1),!this.isUpdatePending&&a&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var Z;K[G]=!0,K.elementProperties=new Map,K.elementStyles=[],K.shadowRootOptions={mode:"open"},null==B||B({ReactiveElement:K}),(null!==(D=U.reactiveElementVersions)&&void 0!==D?D:U.reactiveElementVersions=[]).push("1.6.3");const q=globalThis,Q=q.trustedTypes,J=Q?Q.createPolicy("lit-html",{createHTML:t=>t}):void 0,X="$lit$",tt=`lit$${(Math.random()+"").slice(9)}$`,et="?"+tt,it=`<${et}>`,at=void 0===q.document?{createTreeWalker:()=>({})}:document,ot=()=>at.createComment(""),st=t=>null===t||"object"!=typeof t&&"function"!=typeof t,nt=Array.isArray,rt="[ \t\n\f\r]",lt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,dt=/-->/g,ht=/>/g,pt=RegExp(`>|${rt}(?:([^\\s"'>=/]+)(${rt}*=${rt}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),ct=/'/g,mt=/"/g,gt=/^(?:script|style|textarea|title)$/i,yt=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),ut=Symbol.for("lit-noChange"),ft=Symbol.for("lit-nothing"),bt=new WeakMap,vt=at.createTreeWalker(at,129,null,!1);function _t(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==J?J.createHTML(e):e}const wt=(t,e)=>{const i=t.length-1,a=[];let o,s=2===e?"<svg>":"",n=lt;for(let e=0;e<i;e++){const i=t[e];let r,l,d=-1,h=0;for(;h<i.length&&(n.lastIndex=h,l=n.exec(i),null!==l);)h=n.lastIndex,n===lt?"!--"===l[1]?n=dt:void 0!==l[1]?n=ht:void 0!==l[2]?(gt.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=pt):void 0!==l[3]&&(n=pt):n===pt?">"===l[0]?(n=null!=o?o:lt,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,r=l[1],n=void 0===l[3]?pt:'"'===l[3]?mt:ct):n===mt||n===ct?n=pt:n===dt||n===ht?n=lt:(n=pt,o=void 0);const p=n===pt&&t[e+1].startsWith("/>")?" ":"";s+=n===lt?i+it:d>=0?(a.push(r),i.slice(0,d)+X+i.slice(d)+tt+p):i+tt+(-2===d?(a.push(void 0),e):p)}return[_t(t,s+(t[i]||"<?>")+(2===e?"</svg>":"")),a]};class $t{constructor({strings:t,_$litType$:e},i){let a;this.parts=[];let o=0,s=0;const n=t.length-1,r=this.parts,[l,d]=wt(t,e);if(this.el=$t.createElement(l,i),vt.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(a=vt.nextNode())&&r.length<n;){if(1===a.nodeType){if(a.hasAttributes()){const t=[];for(const e of a.getAttributeNames())if(e.endsWith(X)||e.startsWith(tt)){const i=d[s++];if(t.push(e),void 0!==i){const t=a.getAttribute(i.toLowerCase()+X).split(tt),e=/([.?@])?(.*)/.exec(i);r.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?Mt:"?"===e[1]?Et:"@"===e[1]?Ct:St})}else r.push({type:6,index:o})}for(const e of t)a.removeAttribute(e)}if(gt.test(a.tagName)){const t=a.textContent.split(tt),e=t.length-1;if(e>0){a.textContent=Q?Q.emptyScript:"";for(let i=0;i<e;i++)a.append(t[i],ot()),vt.nextNode(),r.push({type:2,index:++o});a.append(t[e],ot())}}}else if(8===a.nodeType)if(a.data===et)r.push({type:2,index:o});else{let t=-1;for(;-1!==(t=a.data.indexOf(tt,t+1));)r.push({type:7,index:o}),t+=tt.length-1}o++}}static createElement(t,e){const i=at.createElement("template");return i.innerHTML=t,i}}function kt(t,e,i=t,a){var o,s,n,r;if(e===ut)return e;let l=void 0!==a?null===(o=i._$Co)||void 0===o?void 0:o[a]:i._$Cl;const d=st(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(s=null==l?void 0:l._$AO)||void 0===s||s.call(l,!1),void 0===d?l=void 0:(l=new d(t),l._$AT(t,i,a)),void 0!==a?(null!==(n=(r=i)._$Co)&&void 0!==n?n:r._$Co=[])[a]=l:i._$Cl=l),void 0!==l&&(e=kt(t,l._$AS(t,e.values),l,a)),e}class xt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:a}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:at).importNode(i,!0);vt.currentNode=o;let s=vt.nextNode(),n=0,r=0,l=a[0];for(;void 0!==l;){if(n===l.index){let e;2===l.type?e=new At(s,s.nextSibling,this,t):1===l.type?e=new l.ctor(s,l.name,l.strings,this,t):6===l.type&&(e=new Pt(s,this,t)),this._$AV.push(e),l=a[++r]}n!==(null==l?void 0:l.index)&&(s=vt.nextNode(),n++)}return vt.currentNode=at,o}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class At{constructor(t,e,i,a){var o;this.type=2,this._$AH=ft,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=a,this._$Cp=null===(o=null==a?void 0:a.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=kt(this,t,e),st(t)?t===ft||null==t||""===t?(this._$AH!==ft&&this._$AR(),this._$AH=ft):t!==this._$AH&&t!==ut&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>nt(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==ft&&st(this._$AH)?this._$AA.nextSibling.data=t:this.$(at.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:a}=t,o="number"==typeof a?this._$AC(t):(void 0===a.el&&(a.el=$t.createElement(_t(a.h,a.h[0]),this.options)),a);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.v(i);else{const t=new xt(o,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=bt.get(t.strings);return void 0===e&&bt.set(t.strings,e=new $t(t)),e}T(t){nt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,a=0;for(const o of t)a===e.length?e.push(i=new At(this.k(ot()),this.k(ot()),this,this.options)):i=e[a],i._$AI(o),a++;a<e.length&&(this._$AR(i&&i._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class St{constructor(t,e,i,a,o){this.type=1,this._$AH=ft,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=ft}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,a){const o=this.strings;let s=!1;if(void 0===o)t=kt(this,t,e,0),s=!st(t)||t!==this._$AH&&t!==ut,s&&(this._$AH=t);else{const a=t;let n,r;for(t=o[0],n=0;n<o.length-1;n++)r=kt(this,a[i+n],e,n),r===ut&&(r=this._$AH[n]),s||(s=!st(r)||r!==this._$AH[n]),r===ft?t=ft:t!==ft&&(t+=(null!=r?r:"")+o[n+1]),this._$AH[n]=r}s&&!a&&this.j(t)}j(t){t===ft?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Mt extends St{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===ft?void 0:t}}const Tt=Q?Q.emptyScript:"";class Et extends St{constructor(){super(...arguments),this.type=4}j(t){t&&t!==ft?this.element.setAttribute(this.name,Tt):this.element.removeAttribute(this.name)}}class Ct extends St{constructor(t,e,i,a,o){super(t,e,i,a,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=kt(this,t,e,0))&&void 0!==i?i:ft)===ut)return;const a=this._$AH,o=t===ft&&a!==ft||t.capture!==a.capture||t.once!==a.once||t.passive!==a.passive,s=t!==ft&&(a===ft||o);o&&this.element.removeEventListener(this.name,this,a),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class Pt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){kt(this,t)}}const jt=q.litHtmlPolyfillSupport;null==jt||jt($t,At),(null!==(Z=q.litHtmlVersions)&&void 0!==Z?Z:q.litHtmlVersions=[]).push("2.8.0");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var Nt,Ot;class It extends K{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var a,o;const s=null!==(a=null==i?void 0:i.renderBefore)&&void 0!==a?a:e;let n=s._$litPart$;if(void 0===n){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;s._$litPart$=n=new At(e.insertBefore(ot(),t),t,void 0,null!=i?i:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return ut}}It.finalized=!0,It._$litElement$=!0,null===(Nt=globalThis.litElementHydrateSupport)||void 0===Nt||Nt.call(globalThis,{LitElement:It});const Lt=globalThis.litElementPolyfillSupport;null==Lt||Lt({LitElement:It}),(null!==(Ot=globalThis.litElementVersions)&&void 0!==Ot?Ot:globalThis.litElementVersions=[]).push("3.3.3");const Rt=O("var(--fds-size-6, 48px)"),zt=O("var(--fds-radius-compact, 2px)"),Dt=O("var(--fds-radius-large, 8px)"),Ut=O("var(--fds-style-elevation-200, 0px 6px 6px 0px rgba(0, 0, 0, 0.23), 0px 3px 6px 0px rgba(0, 0, 0, 0.16))"),Vt=O("var(--fds-typography-body-default-font-family, 'Public Sans')"),Ft=O("var(--fds-typography-body-default-font-size, 16px)"),Bt=O("var(--fds-typography-body-default-letter-spacing, 0px)"),Ht=O("var(--fds-typography-body-default-line-height, 150%)"),Yt=O("var(--fds-typography-body-default-font-weight, 400)"),Wt=O("var(--fds-typography-body-default-display, inline-block)"),Gt=O("var(--fds-typography-body-large-font-family, 'Public Sans')"),Kt=O("var(--fds-typography-body-large-font-size, 18px)"),Zt=O("var(--fds-typography-body-large-letter-spacing, 0px)"),qt=O("var(--fds-typography-body-large-line-height, 150%)"),Qt=O("var(--fds-typography-body-large-font-weight, 400)"),Jt=O("var(--fds-typography-body-large-display, inline-block)"),Xt=O("var(--fds-typography-body-micro-font-family, 'Public Sans')"),te=O("var(--fds-typography-body-micro-font-size, 12px)"),ee=O("var(--fds-typography-body-micro-letter-spacing, 0px)"),ie=O("var(--fds-typography-body-micro-line-height, 150%)"),ae=O("var(--fds-typography-body-micro-font-weight, 400)"),oe=O("var(--fds-typography-body-micro-display, inline-block)"),se=O("var(--fds-typography-body-small-font-family, 'Public Sans')"),ne=O("var(--fds-typography-body-small-font-size, 14px)"),re=O("var(--fds-typography-body-small-letter-spacing, 0px)"),le=O("var(--fds-typography-body-small-line-height, 150%)"),de=O("var(--fds-typography-body-small-font-weight, 400)"),he=O("var(--fds-typography-body-small-display, inline-block)"),pe=O("var(--fds-typography-emphasis-default-font-family, 'Public Sans')"),ce=O("var(--fds-typography-emphasis-default-font-size, 16px)"),me=O("var(--fds-typography-emphasis-default-letter-spacing, 0px)"),ge=O("var(--fds-typography-emphasis-default-line-height, 150%)"),ye=O("var(--fds-typography-emphasis-default-font-weight, 700)"),ue=O("var(--fds-typography-emphasis-default-display, inline-block)"),fe=O("var(--fds-typography-emphasis-large-font-family, 'Public Sans')"),be=O("var(--fds-typography-emphasis-large-font-size, 18px)"),ve=O("var(--fds-typography-emphasis-large-letter-spacing, 0px)"),_e=O("var(--fds-typography-emphasis-large-line-height, 150%)"),we=O("var(--fds-typography-emphasis-large-font-weight, 700)"),$e=O("var(--fds-typography-emphasis-large-display, inline-block)"),ke=O("var(--fds-typography-emphasis-micro-font-family, 'Public Sans')"),xe=O("var(--fds-typography-emphasis-micro-font-size, 12px)"),Ae=O("var(--fds-typography-emphasis-micro-letter-spacing, 0px)"),Se=O("var(--fds-typography-emphasis-micro-line-height, 150%)"),Me=O("var(--fds-typography-emphasis-micro-font-weight, 700)"),Te=O("var(--fds-typography-emphasis-micro-display, inline-block)"),Ee=O("var(--fds-typography-emphasis-small-font-family, 'Public Sans')"),Ce=O("var(--fds-typography-emphasis-small-font-size, 14px)"),Pe=O("var(--fds-typography-emphasis-small-letter-spacing, 0px)"),je=O("var(--fds-typography-emphasis-small-line-height, 150%)"),Ne=O("var(--fds-typography-emphasis-small-font-weight, 700)"),Oe=O("var(--fds-typography-emphasis-small-display, inline-block)"),Ie=O("var(--fds-typography-heading-large-heading-3-font-family, 'Public Sans', 'PublicSans-Bold')"),Le=O("var(--fds-typography-heading-large-heading-3-font-size, 40px)"),Re=O("var(--fds-typography-heading-large-heading-3-letter-spacing, 0px)"),ze=O("var(--fds-typography-heading-large-heading-3-line-height, 110%)"),De=O("var(--fds-typography-heading-large-heading-3-font-weight, 700)"),Ue=O("var(--fds-typography-heading-large-heading-3-display, inline-block)"),Ve=O("var(--fds-typography-heading-large-heading-4-font-family, 'Public Sans', 'PublicSans-Bold')"),Fe=O("var(--fds-typography-heading-large-heading-4-font-size, 32px)"),Be=O("var(--fds-typography-heading-large-heading-4-letter-spacing, 0px)"),He=O("var(--fds-typography-heading-large-heading-4-line-height, 110%)"),Ye=O("var(--fds-typography-heading-large-heading-4-font-weight, 700)"),We=O("var(--fds-typography-heading-large-heading-4-display, inline-block)"),Ge=O("var(--fds-typography-heading-large-heading-5-font-family, 'Public Sans', 'PublicSans-Bold')"),Ke=O("var(--fds-typography-heading-large-heading-5-font-size, 28px)"),Ze=O("var(--fds-typography-heading-large-heading-5-letter-spacing, 0px)"),qe=O("var(--fds-typography-heading-large-heading-5-line-height, 110%)"),Qe=O("var(--fds-typography-heading-large-heading-5-font-weight, 700)"),Je=O("var(--fds-typography-heading-large-heading-5-display, inline-block)"),Xe=O("var(--fds-typography-heading-large-heading-6-font-family, 'Public Sans', 'PublicSans-Bold')"),ti=O("var(--fds-typography-heading-large-heading-6-font-size, 20px)"),ei=O("var(--fds-typography-heading-large-heading-6-letter-spacing, 0px)"),ii=O("var(--fds-typography-heading-large-heading-6-line-height, 110%)"),ai=O("var(--fds-typography-heading-large-heading-6-font-weight, 700)"),oi=O("var(--fds-typography-heading-large-heading-6-display, inline-block)"),si=O("var(--fds-typography-heading-large-heading-1-font-family, 'Public Sans', 'PublicSans-Bold')"),ni=O("var(--fds-typography-heading-large-heading-1-font-size, 64px)"),ri=O("var(--fds-typography-heading-large-heading-1-letter-spacing, 0px)"),li=O("var(--fds-typography-heading-large-heading-1-line-height, 110%)"),di=O("var(--fds-typography-heading-large-heading-1-font-weight, 700)"),hi=O("var(--fds-typography-heading-large-heading-1-display, inline-block)"),pi=O("var(--fds-typography-heading-large-heading-2-font-family, 'Public Sans', 'PublicSans-Bold')"),ci=O("var(--fds-typography-heading-large-heading-2-font-size, 48px)"),mi=O("var(--fds-typography-heading-large-heading-2-letter-spacing, 0px)"),gi=O("var(--fds-typography-heading-large-heading-2-line-height, 110%)"),yi=O("var(--fds-typography-heading-large-heading-2-font-weight, 700)"),ui=O("var(--fds-typography-heading-large-heading-2-display, inline-block)"),fi=O("var(--fds-typography-heading-small-heading-1-font-family, 'Public Sans', 'PublicSans-Bold')"),bi=O("var(--fds-typography-heading-small-heading-1-font-size, 42px)"),vi=O("var(--fds-typography-heading-small-heading-1-letter-spacing, 0px)"),_i=O("var(--fds-typography-heading-small-heading-1-line-height, 110%)"),wi=O("var(--fds-typography-heading-small-heading-1-font-weight, 700)"),$i=O("var(--fds-typography-heading-small-heading-1-display, inline-block)"),ki=O("var(--fds-typography-heading-small-heading-2-font-family, 'Public Sans', 'PublicSans-Bold')"),xi=O("var(--fds-typography-heading-small-heading-2-font-size, 32px)"),Ai=O("var(--fds-typography-heading-small-heading-2-letter-spacing, 0px)"),Si=O("var(--fds-typography-heading-small-heading-2-line-height, 110%)"),Mi=O("var(--fds-typography-heading-small-heading-2-font-weight, 700)"),Ti=O("var(--fds-typography-heading-small-heading-2-display, inline-block)"),Ei=O("var(--fds-typography-heading-small-heading-3-font-family, 'Public Sans', 'PublicSans-Bold')"),Ci=O("var(--fds-typography-heading-small-heading-3-font-size, 28px)"),Pi=O("var(--fds-typography-heading-small-heading-3-letter-spacing, 0px)"),ji=O("var(--fds-typography-heading-small-heading-3-line-height, 110%)"),Ni=O("var(--fds-typography-heading-small-heading-3-font-weight, 700)"),Oi=O("var(--fds-typography-heading-small-heading-3-display, inline-block)"),Ii=O("var(--fds-typography-heading-small-heading-4-font-family, 'Public Sans', 'PublicSans-Bold')"),Li=O("var(--fds-typography-heading-small-heading-4-font-size, 24px)"),Ri=O("var(--fds-typography-heading-small-heading-4-letter-spacing, 0px)"),zi=O("var(--fds-typography-heading-small-heading-4-line-height, 110%)"),Di=O("var(--fds-typography-heading-small-heading-4-font-weight, 700)"),Ui=O("var(--fds-typography-heading-small-heading-4-display, inline-block)"),Vi=O("var(--fds-typography-heading-small-heading-5-font-family, 'Public Sans', 'PublicSans-Bold')"),Fi=O("var(--fds-typography-heading-small-heading-5-font-size, 18px)"),Bi=O("var(--fds-typography-heading-small-heading-5-letter-spacing, 0px)"),Hi=O("var(--fds-typography-heading-small-heading-5-line-height, 110%)"),Yi=O("var(--fds-typography-heading-small-heading-5-font-weight, 700)"),Wi=O("var(--fds-typography-heading-small-heading-5-display, inline-block)"),Gi=O("var(--fds-typography-heading-small-heading-6-font-family, 'Public Sans', 'PublicSans-Bold')"),Ki=O("var(--fds-typography-heading-small-heading-6-font-size, 16px)"),Zi=O("var(--fds-typography-heading-small-heading-6-letter-spacing, 0px)"),qi=O("var(--fds-typography-heading-small-heading-6-line-height, 110%)"),Qi=O("var(--fds-typography-heading-small-heading-6-font-weight, 700)"),Ji=O("var(--fds-typography-heading-small-heading-6-display, inline-block)"),Xi=O("var(--fds-typography-link-large-font-family, 'Public Sans')"),ta=O("var(--fds-typography-link-large-font-size, 18px)"),ea=O("var(--fds-typography-link-large-letter-spacing, 0px)"),ia=O("var(--fds-typography-link-large-line-height, 150%)"),aa=O("var(--fds-typography-link-large-font-weight, 400)"),oa=O("var(--fds-typography-link-large-text-decoration, underline)"),sa=O("var(--fds-typography-link-large-display, inline-block)"),na=O("var(--fds-typography-link-micro-font-family, 'Public Sans')"),ra=O("var(--fds-typography-link-micro-font-size, 12px)"),la=O("var(--fds-typography-link-micro-letter-spacing, 0px)"),da=O("var(--fds-typography-link-micro-line-height, 150%)"),ha=O("var(--fds-typography-link-micro-font-weight, 400)"),pa=O("var(--fds-typography-link-micro-text-decoration, underline)"),ca=O("var(--fds-typography-link-micro-display, inline-block)"),ma=O("var(--fds-typography-link-small-font-family, 'Public Sans')"),ga=O("var(--fds-typography-link-small-font-size, 14px)"),ya=O("var(--fds-typography-link-small-letter-spacing, 0px)"),ua=O("var(--fds-typography-link-small-line-height, 150%)"),fa=O("var(--fds-typography-link-small-font-weight, 400)"),ba=O("var(--fds-typography-link-small-text-decoration, underline)"),va=O("var(--fds-typography-link-small-display, inline-block)"),_a=O("var(--fds-typography-link-default-font-family, 'Public Sans')"),wa=O("var(--fds-typography-link-default-font-size, 16px)"),$a=O("var(--fds-typography-link-default-letter-spacing, 0px)"),ka=O("var(--fds-typography-link-default-line-height, 150%)"),xa=O("var(--fds-typography-link-default-font-weight, 400)"),Aa=O("var(--fds-typography-link-default-text-decoration, underline)"),Sa=O("var(--fds-typography-link-default-display, inline-block)"),Ma=O("var(--fds-typography-ui-helper-font-family, 'Public Sans', 'PublicSans-Regular')"),Ta=O("var(--fds-typography-ui-helper-font-size, 15px)"),Ea=O("var(--fds-typography-ui-helper-letter-spacing, 0px)"),Ca=O("var(--fds-typography-ui-helper-line-height, 100%)"),Pa=O("var(--fds-typography-ui-helper-font-weight, 400)"),ja=O("var(--fds-typography-ui-helper-display, inline-block)"),Na=O("var(--fds-typography-ui-id-font-family, 'Roboto Mono')"),Oa=O("var(--fds-typography-ui-id-font-size, 13px)"),Ia=O("var(--fds-typography-ui-id-letter-spacing, 0px)"),La=O("var(--fds-typography-ui-id-line-height, 100%)"),Ra=O("var(--fds-typography-ui-id-font-weight, 700)"),za=O("var(--fds-typography-ui-id-display, inline-block)"),Da=O("var(--fds-typography-ui-label-font-family, 'Public Sans', 'PublicSans-Medium')"),Ua=O("var(--fds-typography-ui-label-font-size, 16px)"),Va=O("var(--fds-typography-ui-label-letter-spacing, 0px)"),Fa=O("var(--fds-typography-ui-label-line-height, 22px)"),Ba=O("var(--fds-typography-ui-label-font-weight, 500)"),Ha=O("var(--fds-typography-ui-label-display, inline-block)"),Ya=O("var(--fds-typography-ui-placeholder-font-family, 'Public Sans', 'PublicSans-Medium')"),Wa=O("var(--fds-typography-ui-placeholder-font-size, 16px)"),Ga=O("var(--fds-typography-ui-placeholder-letter-spacing, 0px)"),Ka=O("var(--fds-typography-ui-placeholder-line-height, 100%)"),Za=O("var(--fds-typography-ui-placeholder-font-weight, 500)"),qa=O("var(--fds-typography-ui-placeholder-display, inline-block)"),Qa=O("var(--fds-typography-ui-tag-font-family, 'Public Sans', 'PublicSans-Bold')"),Ja=O("var(--fds-typography-ui-tag-font-size, 16px)"),Xa=O("var(--fds-typography-ui-tag-letter-spacing, 0px)"),to=O("var(--fds-typography-ui-tag-line-height, 100%)"),eo=O("var(--fds-typography-ui-tag-font-weight, 700)"),io=O("var(--fds-typography-ui-tag-display, inline-block)"),ao=O("var(--fds-color-brand-black, #000000)"),oo=O("var(--fds-color-brand-white, #ffffff)"),so=O("var(--fds-color-danger-200, #e55636)"),no=O("var(--fds-color-danger-300, #b40000)"),ro=O("var(--fds-color-danger-400, #720000)"),lo=O("var(--fds-color-interactive-100, #90cefe)"),ho=O("var(--fds-color-interactive-200, #1777f8)"),po=O("var(--fds-color-neutral-50, #F6F6F6)"),co=O("var(--fds-color-neutral-100, #cdcdd7)"),mo=O("var(--fds-color-neutral-200, #9696aa)"),go=O("var(--fds-color-text-300, #9696aa)"),yo=O("var(--fds-color-text-1000, #000000)");I`
  .body-default-text {
    display: ${Wt};
    font-family: ${Vt};
    font-size: ${Ft};
    font-weight: ${Yt};
    letter-spacing: ${Bt};
    line-height: ${Ht};
  }
`,I`
  .body-large-text {
    display: ${Jt};
    font-family: ${Gt};
    font-size: ${Kt};
    font-weight: ${Qt};
    letter-spacing: ${Zt};
    line-height: ${qt};
  }
`,I`
  .body-micro-text {
    display: ${oe};
    font-family: ${Xt};
    font-size: ${te};
    font-weight: ${ae};
    letter-spacing: ${ee};
    line-height: ${ie};
  }
`,I`
  .body-small-text {
    display: ${he};
    font-family: ${se};
    font-size: ${ne};
    font-weight: ${de};
    letter-spacing: ${re};
    line-height: ${le};
  }
`,I`
  .emphasis-default-text {
    display: ${ue};
    font-family: ${pe};
    font-size: ${ce};
    font-weight: ${ye};
    letter-spacing: ${me};
    line-height: ${ge};
  }
`,I`
  .emphasis-large-text {
    display: ${$e};
    font-family: ${fe};
    font-size: ${be};
    font-weight: ${we};
    letter-spacing: ${ve};
    line-height: ${_e};
  }
`,I`
  .emphasis-micro-text {
    display: ${Te};
    font-family: ${ke};
    font-size: ${xe};
    font-weight: ${Me};
    letter-spacing: ${Ae};
    line-height: ${Se};
  }
`,I`
  .emphasis-small-text {
    display: ${Oe};
    font-family: ${Ee};
    font-size: ${Ce};
    font-weight: ${Ne};
    letter-spacing: ${Pe};
    line-height: ${je};
  }
`,I`
  .heading-large-1-text {
    display: ${hi};
    font-family: ${si};
    font-size: ${ni};
    font-weight: ${di};
    letter-spacing: ${ri};
    line-height: ${li};
  }
`,I`
  .heading-large-2-text {
    display: ${ui};
    font-family: ${pi};
    font-size: ${ci};
    font-weight: ${yi};
    letter-spacing: ${mi};
    line-height: ${gi};
  }
`,I`
  .heading-large-3-text {
    display: ${Ue};
    font-family: ${Ie};
    font-size: ${Le};
    font-weight: ${De};
    letter-spacing: ${Re};
    line-height: ${ze};
  }
`,I`
  .heading-large-4-text {
    display: ${We};
    font-family: ${Ve};
    font-size: ${Fe};
    font-weight: ${Ye};
    letter-spacing: ${Be};
    line-height: ${He};
  }
`,I`
  .heading-large-5-text {
    display: ${Je};
    font-family: ${Ge};
    font-size: ${Ke};
    font-weight: ${Qe};
    letter-spacing: ${Ze};
    line-height: ${qe};
  }
`,I`
  .heading-large-6-text {
    display: ${oi};
    font-family: ${Xe};
    font-size: ${ti};
    font-weight: ${ai};
    letter-spacing: ${ei};
    line-height: ${ii};
  }
`,I`
  .heading-small-1-text {
    display: ${$i};
    font-family: ${fi};
    font-size: ${bi};
    font-weight: ${wi};
    letter-spacing: ${vi};
    line-height: ${_i};
  }
`,I`
  .heading-small-2-text {
    display: ${Ti};
    font-family: ${ki};
    font-size: ${xi};
    font-weight: ${Mi};
    letter-spacing: ${Ai};
    line-height: ${Si};
  }
`,I`
  .heading-small-3-text {
    display: ${Oi};
    font-family: ${Ei};
    font-size: ${Ci};
    font-weight: ${Ni};
    letter-spacing: ${Pi};
    line-height: ${ji};
  }
`,I`
  .heading-small-4-text {
    display: ${Ui};
    font-family: ${Ii};
    font-size: ${Li};
    font-weight: ${Di};
    letter-spacing: ${Ri};
    line-height: ${zi};
  }
`,I`
  .heading-small-5-text {
    display: ${Wi};
    font-family: ${Vi};
    font-size: ${Fi};
    font-weight: ${Yi};
    letter-spacing: ${Bi};
    line-height: ${Hi};
  }
`,I`
  .heading-small-6-text {
    display: ${Ji};
    font-family: ${Gi};
    font-size: ${Ki};
    font-weight: ${Qi};
    letter-spacing: ${Zi};
    line-height: ${qi};
  }
`,I`
  .link-default-text {
    display: ${Sa};
    font-family: ${_a};
    font-size: ${wa};
    font-weight: ${xa};
    letter-spacing: ${$a};
    line-height: ${ka};
    text-decoration: ${Aa};
  }
`,I`
  .link-large-text {
    display: ${sa};
    font-family: ${Xi};
    font-size: ${ta};
    font-weight: ${aa};
    letter-spacing: ${ea};
    line-height: ${ia};
    text-decoration: ${oa};
  }
`,I`
  .link-micro-text {
    display: ${ca};
    font-family: ${na};
    font-size: ${ra};
    font-weight: ${ha};
    letter-spacing: ${la};
    line-height: ${da};
    text-decoration: ${pa};
  }
`,I`
  .link-small-text {
    display: ${va};
    font-family: ${ma};
    font-size: ${ga};
    font-weight: ${fa};
    letter-spacing: ${ya};
    line-height: ${ua};
    text-decoration: ${ba};
  }
`,I`
  .ui-helper-text {
    display: ${ja};
    font-family: ${Ma};
    font-size: ${Ta};
    font-weight: ${Pa};
    letter-spacing: ${Ea};
    line-height: ${Ca};
  }
`,I`
  .ui-id-text {
    display: ${za};
    font-family: ${Na};
    font-size: ${Oa};
    font-weight: ${Ra};
    letter-spacing: ${Ia};
    line-height: ${La};
  }
`;const uo=I`
  .ui-label-text {
    display: ${Ha};
    font-family: ${Da};
    font-size: ${Ua};
    font-weight: ${Ba};
    letter-spacing: ${Va};
    line-height: ${Fa};
  }
`;I`
  .ui-placeholder-text {
    display: ${qa};
    font-family: ${Ya};
    font-size: ${Wa};
    font-weight: ${Za};
    letter-spacing: ${Ga};
    line-height: ${Ka};
  }
`,I`
  .ui-tag-text {
    display: ${io};
    font-family: ${Qa};
    font-size: ${Ja};
    font-weight: ${eo};
    letter-spacing: ${Xa};
    line-height: ${to};
  }
`
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */;const fo=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function bo(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):fo(t,e)}
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
var vo;null===(vo=globalThis.HTMLSlotElement)||void 0===vo||vo.prototype.assignedElements;
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const _o=1;let wo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const $o="important",ko=" !"+$o,xo=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends wo{constructor(t){var e;if(super(t),t.type!==_o||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const a=t[i];return null==a?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${a};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ht){this.ht=new Set;for(const t in e)this.ht.add(t);return this.render(e)}this.ht.forEach(t=>{null==e[t]&&(this.ht.delete(t),t.includes("-")?i.removeProperty(t):i[t]="")});for(const t in e){const a=e[t];if(null!=a){this.ht.add(t);const e="string"==typeof a&&a.endsWith(ko);t.includes("-")||e?i.setProperty(t,e?a.slice(0,-11):a,e?$o:""):i[t]=a}}return ut}});var Ao,So,Mo=function(t,e,i,a){var o,s=arguments.length,n=s<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,a);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};!function(t){t.primary="primary",t.secondary="secondary"}(Ao||(Ao={})),function(t){t.left="left",t.right="right"}(So||(So={}));class To extends It{constructor(){super(...arguments),this.variant=Ao.primary,this.items=[],this.verticalMenuNavText="",this.verticalMenuThreshold=768,this._open=!1}connectedCallback(){super.connectedCallback(),L(this.shadowRoot,[To.cssVariables,uo,To.collapsedNavigationStyles,this.desktopStyles()])}render(){const t=this.items.filter(t=>t.position===So.right),e=this.items.filter(t=>t.position!==So.right);return yt` <div class="navigation-wrapper">
      <div class="navigation navigation--${this.variant} ui-label-text">
        ${this.variant===Ao.primary?yt` <div class="navigation__header">
              <slot></slot>
            </div>`:ft}
        <ul class="navigation__body ${this._open?"navigation__open":""}">
          ${e.map(t=>this.renderItem(t)).concat(t.map((t,e)=>this.renderItem(t,0===e?"item__first-right":"")))}
        </ul>
        <div class="navigation__button-wrapper">${this.renderNavigationButton()}</div>
      </div>
    </div>`}renderNavigationButton(){let t;switch(this.variant){case Ao.primary:t=this._open?yt`<fds-icon icon="chevron-up"></fds-icon>`:yt`<fds-icon icon="chevron-down"></fds-icon>`;break;case Ao.secondary:t=yt`<fds-icon icon="menu"></fds-icon>`}return yt`
      <button
        class="navigation__button navigation__button--${this.variant}"
        type="button"
        @click=${this.handleNavigationClick}
      >
        <span class="navigation__label ui-label-text">${this.verticalMenuNavText}</span>
        ${t}
      </button>
    `}handleNavigationClick(){this._open=!this._open}renderItem(t,e=""){var i;const a=null!==(i=t.verticalMenuOrder)&&void 0!==i?i:0;return yt` <li
      @click=${()=>this.handleSelect(t)}
      class="item ${this.selected===t?"item--active":""} ${e}"
      style=${xo({order:a})}
    >
      <div class="item__label">
        ${t.icon&&yt`<fds-icon class="item__icon" .icon="${t.icon}"></fds-icon>`}
        <span>${t.label}</span>
      </div>
    </li>`}handleSelect(t){this.selected=t,this.dispatchEvent(new CustomEvent("select",{detail:t}))}desktopStyles(){return I`
      @container navigation-wrapper (min-width: ${O(this.verticalMenuThreshold)}px) {
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
          border-bottom: var(--element-vertical-padding--primary) solid ${oo};
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
    `}}To.cssVariables=I`
    :host {
      --element-vertical-padding--primary: 9px;
      --element-vertical-padding--secondary: 16px;
      --element-horizontal-padding--primary: 20px;
      --item-border-bottom-width--secondary: 3px;
    }
  `,To.collapsedNavigationStyles=I`
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
      background-color: ${ao};
      color: ${oo};
    }

    .navigation--primary .item:hover {
      color: ${go};
    }

    .navigation--primary .navigation__open .item--active .item__label:after {
      content: '';
      position: relative;
      align-self: center;
      height: 0;
      margin-left: auto;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-right: var(--element-vertical-padding--primary) solid ${oo};
    }

    .navigation--secondary {
      background-color: ${oo};
      border-bottom: 1px solid ${ao};
    }

    .navigation--secondary .item {
      border-bottom: 1px solid ${co};
    }

    .navigation--secondary .item:hover {
      color: ${go};
    }

    .navigation__open {
      height: auto;
      width: 100%;
      visibility: visible;
      opacity: 1;
      overflow-y: visible;
      margin-left: 0;
      margin-top: 0;

      border-top: 1px solid ${co};
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
      background-color: ${ao};
      color: ${oo};
      padding: var(--element-vertical-padding--primary);
    }

    .navigation__button--primary:hover {
      color: ${go};
    }

    .navigation__button--secondary {
      background-color: ${oo};
      color: ${ao};
      padding: var(--element-vertical-padding--secondary);
    }

    .navigation__button--secondary:hover {
      color: ${go};
    }

    .navigation__label {
      margin-right: 10px;
    }
  `,To.styles=[To.cssVariables,uo,To.collapsedNavigationStyles],Mo([bo()],To.prototype,"variant",void 0),Mo([bo()],To.prototype,"items",void 0),Mo([bo()],To.prototype,"selected",void 0),Mo([bo({attribute:"vertical-menu-nav-text"})],To.prototype,"verticalMenuNavText",void 0),Mo([bo({type:Number,attribute:"vertical-menu-threshold"})],To.prototype,"verticalMenuThreshold",void 0),Mo([function(t){return bo({...t,state:!0})}()],To.prototype,"_open",void 0);
/**
     * @license lucide v0.473.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */
const Eo=(t,e,i=[])=>{const a=document.createElementNS("http://www.w3.org/2000/svg",t);return Object.keys(e).forEach(t=>{a.setAttribute(t,String(e[t]))}),i.length&&i.forEach(t=>{const e=Eo(...t);a.appendChild(e)}),a};
/**
     * @license lucide v0.473.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */
const Co={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};
/**
     * @license lucide v0.473.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */var Po=function(t,e,i,a){var o,s=arguments.length,n=s<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,a);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};const jo={"alert-circle":["svg",Co,[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]]],"alert-triangle":["svg",Co,[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]]],"chevron-down":["svg",Co,[["path",{d:"m6 9 6 6 6-6"}]]],"chevron-right":["svg",Co,[["path",{d:"m9 18 6-6-6-6"}]]],"chevron-up":["svg",Co,[["path",{d:"m18 15-6-6-6 6"}]]],menu:["svg",Co,[["line",{x1:"4",x2:"20",y1:"12",y2:"12"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18"}]]],pencil:["svg",Co,[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]]],plus:["svg",Co,[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]]],"plus-circle":["svg",Co,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M8 12h8"}],["path",{d:"M12 8v8"}]]],"trash-2":["svg",Co,[["path",{d:"M3 6h18"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17"}]]],x:["svg",Co,[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]]],settings:["svg",Co,[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"}],["circle",{cx:"12",cy:"12",r:"3"}]]],"check-circle":["svg",Co,[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335"}],["path",{d:"m9 11 3 3L22 4"}]]],"chevrons-left-right-ellipsis":["svg",Co,[["path",{d:"m18 8 4 4-4 4"}],["path",{d:"m6 8-4 4 4 4"}],["path",{d:"M8 12h.01"}],["path",{d:"M12 12h.01"}],["path",{d:"M16 12h.01"}]]],"message-circle":["svg",Co,[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z"}]]]};class No extends It{constructor(){super(...arguments),this.size=t}render(){if(!this.icon||!jo[this.icon])return console.error(`invalid icon: '${this.icon}'`),null;const t=(([t,e,i])=>Eo(t,e,i))(jo[this.icon]);return t.setAttribute("width",this.size.value),t.setAttribute("height",this.size.value),t}}No.styles=I`
    :host {
      display: inline-flex;
    }
  `,Po([bo()],No.prototype,"size",void 0),Po([bo()],No.prototype,"icon",void 0),customElements.define("fds-icon",No),customElements.define("fds-navigation",To);const Oo={initialize:function(){const t={label:"Digitraffic",value:"digitraffic",url:"https://www.digitraffic.fi/"},e=[{label:"Liikennetilanne",value:"liikennetilanne",url:"https://liikennetilanne.fintraffic.fi/"},{label:"Palauteväylä",value:"palautevayla",url:"https://www.palautevayla.fi/aspa?lang=fi"},{label:"Junalähdöt",value:"junalahdot",url:"https://junalahdot.fintraffic.fi/"},{label:"Fintraffic Mobiili",value:"fintraffic-mobiili",url:"https://www.fintraffic.fi/fi/mobiili"},{label:"Fintraffic Matka",value:"fintraffic-matka",url:"https://matka.fintraffic.fi/"},{label:"Fintraffic Sky",value:"fintraffic-sky",url:"https://sky.fintraffic.fi/"},t,{label:"Digitransit",value:"digitransit",url:"https://digitransit.fi/"},{label:"NAP",value:"nap",url:"https://finap.fi/#/"}];customElements.whenDefined("fds-navigation").then(()=>{const i=document.createElement("fds-navigation");i.setAttribute("vertical-menu-threshold","1225"),i.innerHTML='\n      <a href="https://www.fintraffic.fi/fi">\n              <svg viewBox="0 0 253 42" style="height: 18px">\n                  <use href="/assets/fintraffic_horizontal_white.svg#fintraffic_horizontal_white"></use>\n              </svg>\n          </a>';i.variant=Ao.primary,i.items=e,i.selected=t,i.verticalMenuNavText="Services",i.addEventListener("select",e=>{const i=e.detail;window.open(i.url,"_blank"),e.target instanceof To&&(e.target.selected=t)}),this.el.replaceWith(i)})}};function Io(){$.proxyAll(this,/^_/)}ckan.module("digitraffic_theme_top_navigation",Oo);const Lo=()=>({initialize(){Io.apply(this),this._getMenuController().on("click",this._onMenuControllerClick),this._getMenuController().on("keydown",this._onMenuControllerKeyDown),this._getMenu().on("keydown",this._onMenuKeyDown)},_onMenuControllerClick(t){this._getMenuController().has(t.target)&&this._toggleList()},_onMenuControllerKeyDown(t){if(this._getMenuController().has(t.target)){const{key:e}=t;switch(e){case" ":case"Enter":t.preventDefault(),this._toggleList();break;case"ArrowDown":t.preventDefault(),this._focus("first")}}},_onMenuKeyDown(t){if(this._getMenuController().is(":visible")&&this._getMenu().has(t.target)){const{key:e}=t;switch(e){case"Escape":t.preventDefault(),this._closeList(),this._focus("menuController");break;case"ArrowDown":$(t.target).is("select")||(t.preventDefault(),this._focus("next"));break;case"ArrowUp":$(t.target).is("select")||(t.preventDefault(),this._focus("previous"))}}},_expandedClass:"expanded",_focus(t){let e;const i=this.el.find(":focus")[0],a=!!i&&!!this._getMenu().has(i),o=a&&this._getMenu().find("a:last")[0]===i,s=a&&this._getMenu().find("a:first")[0]===i;switch(t){case"first":e=this._getMenu().find("a:first");break;case"menuController":e=this._getMenuController();break;case"next":if(a){if(o)return;{const t=this._getMenu().find("a");e=t.filter(e=>e>0&&t[e-1]===i)}}else e=this._getMenu().find("a:first");break;case"previous":if(a){if(s)return;{const t=this._getMenu().find("a");e=t.filter(e=>e<t.length-1&&t[e+1]===i)}}else e=this._getMenu().find("a:first")}e.trigger("focus")},_toggleList(){this._isMenuOpen()?(this._closeList(),this._focus("menuController")):(this._openList(),this._focus("first"))},_isMenuOpen(){return this._getMenu().hasClass(this._expandedClass)},_closeList(){const t=this._getMenuController();this._getMenu().removeClass(this._expandedClass),t.attr("aria-expanded","false")},_openList(){const t=this._getMenuController();this._getMenu().addClass(this._expandedClass),t.attr("aria-expanded","true")},_getMenuController(){throw Error("No controller")},_getMenu(){throw Error("No menu")}}),Ro={...Lo(),_getMenuController:()=>$("#app-nav-hamburger-button"),_getMenu:()=>$("#nav-interactions-wrapper")};ckan.module("digitraffic_theme_app_navigation",Ro);const zo={...Lo(),_getMenuController:()=>$("#user-action-select"),_getMenu:()=>$("#user-action-list")};ckan.module("digitraffic_theme_user_actions",zo);const Do={"https://w3id.org/mobilitydcat-ap/mobility-theme/air-and-space-travel":[],"https://w3id.org/mobilitydcat-ap/mobility-theme/cycle-network-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/network-closures-diversions","https://w3id.org/mobilitydcat-ap/mobility-theme/network-detailed-attributes","https://w3id.org/mobilitydcat-ap/mobility-theme/network-geometry-and-lane-character"],"https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-traffic-signs-and-regulations":["https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-closures-and-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/direction-of-travel-on-reversible-lanes","https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-overtaking-bans-on-heavy-goods-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-speed-limits","https://w3id.org/mobilitydcat-ap/mobility-theme/lane-closures-and-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/other-access-restrictions-and-traffic-regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/other-temporary-traffic-management-measures-or-plans","https://w3id.org/mobilitydcat-ap/mobility-theme/road-closures-and-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-closures-and-access-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/filling-and-charging-stations":["https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-charging-points-for-electric-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-filling-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-charging-points","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-filling-stations"],"https://w3id.org/mobilitydcat-ap/mobility-theme/freight-and-logistics":["https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-delivery-areas","https://w3id.org/mobilitydcat-ap/mobility-theme/freight-delivery-regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-delivery-areas"],"https://w3id.org/mobilitydcat-ap/mobility-theme/general-information-for-trip-planning-":["https://w3id.org/mobilitydcat-ap/mobility-theme/address-identifiers","https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-costs","https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-environmental-factors","https://w3id.org/mobilitydcat-ap/mobility-theme/points-of-interest","https://w3id.org/mobilitydcat-ap/mobility-theme/topographic-places"],"https://w3id.org/mobilitydcat-ap/mobility-theme/other":[],"https://w3id.org/mobilitydcat-ap/mobility-theme/parking-service-and-rest-area-information":["https://w3id.org/mobilitydcat-ap/mobility-theme/bike-parking-locations","https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-locations-and-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/park-and-ride-stops","https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-locations-and-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-locations-and-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-accessibility-facilities","https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-geometry"],"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-non-scheduled-transport":["https://w3id.org/mobilitydcat-ap/mobility-theme/accesibility-information-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/fares","https://w3id.org/mobilitydcat-ap/mobility-theme/locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/provider-data","https://w3id.org/mobilitydcat-ap/mobility-theme/reservation-and-purchase-options","https://w3id.org/mobilitydcat-ap/mobility-theme/service-areas-and-service-times"],"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-scheduled-transport":["https://w3id.org/mobilitydcat-ap/mobility-theme/basic-commercial-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/basic-common-standard-fares","https://w3id.org/mobilitydcat-ap/mobility-theme/common-fare-products","https://w3id.org/mobilitydcat-ap/mobility-theme/connection-links","https://w3id.org/mobilitydcat-ap/mobility-theme/disruptions-delays-cancellations","https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/hours-of-operation","https://w3id.org/mobilitydcat-ap/mobility-theme/network-topology-and-routes-lines","https://w3id.org/mobilitydcat-ap/mobility-theme/operational-calendar","https://w3id.org/mobilitydcat-ap/mobility-theme/passenger-classes","https://w3id.org/mobilitydcat-ap/mobility-theme/planned-interchanges-between-scheduled-services","https://w3id.org/mobilitydcat-ap/mobility-theme/purchase-information","https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-estimated-departure-and-arrival-times","https://w3id.org/mobilitydcat-ap/mobility-theme/special-fare-products","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-accessibility-and-paths-within-facility","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-geometry-and-map-layout","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-location-and-features","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-status-of-features","https://w3id.org/mobilitydcat-ap/mobility-theme/timetables-static","https://w3id.org/mobilitydcat-ap/mobility-theme/transport-operators","https://w3id.org/mobilitydcat-ap/mobility-theme/vehicle-details"],"https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-traffic-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/current-travel-times","https://w3id.org/mobilitydcat-ap/mobility-theme/expected-delays","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-length-of-queues","https://w3id.org/mobilitydcat-ap/mobility-theme/predicted-travel-times","https://w3id.org/mobilitydcat-ap/mobility-theme/speed","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-data-at-border-crossings-to-third-countries","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-volume","https://w3id.org/mobilitydcat-ap/mobility-theme/waiting-time-at-border-crossings-to-non-eu-member-states"],"https://w3id.org/mobilitydcat-ap/mobility-theme/road-events-and-conditions":["https://w3id.org/mobilitydcat-ap/mobility-theme/accidents-and-incidents","https://w3id.org/mobilitydcat-ap/mobility-theme/poor-road-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/road-weather-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/road-work-information":["https://w3id.org/mobilitydcat-ap/mobility-theme/long-term-road-works","https://w3id.org/mobilitydcat-ap/mobility-theme/short-term-road-works"],"https://w3id.org/mobilitydcat-ap/mobility-theme/sharing-and-hiring-services":["https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods"],"https://w3id.org/mobilitydcat-ap/mobility-theme/static-road-network-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/geometry","https://w3id.org/mobilitydcat-ap/mobility-theme/gradients","https://w3id.org/mobilitydcat-ap/mobility-theme/junctions","https://w3id.org/mobilitydcat-ap/mobility-theme/number-of-lanes","https://w3id.org/mobilitydcat-ap/mobility-theme/road-classification","https://w3id.org/mobilitydcat-ap/mobility-theme/road-width"],"https://w3id.org/mobilitydcat-ap/mobility-theme/static-traffic-signs-and-regulations":["https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/other-static-traffic-signs","https://w3id.org/mobilitydcat-ap/mobility-theme/other-traffic-regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/permanent-access-restrictions","https://w3id.org/mobilitydcat-ap/mobility-theme/speed-limits","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-circulation-plans","https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-access-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/toll-information":["https://w3id.org/mobilitydcat-ap/mobility-theme/applicable-road-user-charges-and-payment-methods","https://w3id.org/mobilitydcat-ap/mobility-theme/identification-of-tolled-roads","https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-tolling-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods-for-tolls"],"https://w3id.org/mobilitydcat-ap/mobility-theme/waterways-and-water-bodies":[]},Uo=new Set(Object.keys(Do)),Vo=new Set(Object.values(Do).flat()),Fo={"https://w3id.org/mobilitydcat-ap/mobility-theme/accesibility-information-for-vehicles":{en:"Accesibility information for vehicles",fi:"Ajoneuvojen esteettömyystiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/accidents-and-incidents":{en:"Accidents and incidents",fi:"Liikenneonnettomuudet ja -häiriöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/address-identifiers":{en:"Address identifiers",fi:"Osoitetunnisteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/air-and-space-travel":{en:"Air and space travel",fi:"Ilma- ja avaruusmatkailu"},"https://w3id.org/mobilitydcat-ap/mobility-theme/applicable-road-user-charges-and-payment-methods":{en:"Applicable road user charges and payment methods",fi:"Sovellettavat tienkäyttömaksut ja maksutavat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-charging-points-for-electric-vehicles":{en:"Availability of charging points for electric vehicles",fi:"Sähköajoneuvojen latauspisteiden saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-delivery-areas":{en:"Availability of delivery areas",fi:"Lastaus- ja purkauspaikkojen saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-filling-stations":{en:"Availability of filling stations",fi:"Tankkausasemien saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/basic-commercial-conditions":{en:"Basic commercial conditions",fi:"Kaupalliset perusehdot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/basic-common-standard-fares":{en:"Basic common standard fares",fi:"Yleiset perusmaksut"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-availability":{en:"Bike-hiring Availability",fi:"Vuokrapyörien saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-stations":{en:"Bike-hiring Stations",fi:"Pyöränvuokrausasemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-parking-locations":{en:"Bike-parking locations",fi:"Polkupyöräparkit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-availability":{en:"Bike sharing Availability",fi:"Kaupunkipyörien saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-locations-and-stations":{en:"Bike-sharing Locations and stations",fi:"Kaupunkipyörien sijainnit ja asemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-access-conditions":{en:"Bridge access conditions",fi:"Siltojen käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-closures-and-access-conditions":{en:"Bridge closures and access conditions",fi:"Siltojen sulkemiset ja käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-availability":{en:"Car-hiring Availability",fi:"Autonvuokrauksen saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-stations":{en:"Car-hiring Stations",fi:"Autonvuokrausasemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-availability":{en:"Car parking availability",fi:"Autojen pysäköinnin saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-locations-and-conditions":{en:"Car parking locations and conditions",fi:"Autojen pysäköintipaikat ja -olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-availability":{en:"Car-sharing Availability",fi:"Yhteiskäyttöautojen saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-locations-and-stations":{en:"Car-sharing Locations and stations",fi:"Yhteiskäyttöautojen sijainnit ja asemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/common-fare-products":{en:"Common fare products",fi:"Yleiset lipputuotteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/connection-links":{en:"Connection links",fi:"Vaihtoyhteydet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/current-travel-times":{en:"Current travel times",fi:"Ajankohtaiset matka-ajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/cycle-network-data":{en:"Cycle network data",fi:"Pyöräilyverkon tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/direction-of-travel-on-reversible-lanes":{en:"Direction of travel on reversible lanes",fi:"Vaihtuvasuuntaisten kaistojen ajosuunta"},"https://w3id.org/mobilitydcat-ap/mobility-theme/disruptions-delays-cancellations":{en:"Disruptions, delays, cancellations",fi:"Häiriöt, viivästykset, peruutukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-overtaking-bans-on-heavy-goods-vehicles":{en:"Dynamic overtaking bans on heavy goods vehicles",fi:"Dynaamiset raskaiden ajoneuvojen ohituskiellot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-speed-limits":{en:"Dynamic speed limits",fi:"Dynaamiset nopeusrajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-traffic-signs-and-regulations":{en:"Dynamic traffic signs and regulations",fi:"Dynaamiset liikennemerkit ja -säännöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-availability":{en:"E-scooter-sharing Availability",fi:"Yhteiskäyttöisten sähköpotkulautojen saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-locations-and-stations":{en:"E-scooter-sharing Locations and stations",fi:"Yhteiskäyttöisten sähköpotkulautojen sijainnit ja asemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles":{en:"Environmental standards for vehicles",fi:"Ajoneuvojen ympäristöstandardit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/expected-delays":{en:"Expected delays",fi:"Tiedossa olevat viivästykset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/fares":{en:"Fares",fi:"Maksut ja tariffit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/filling-and-charging-stations":{en:"Filling and charging stations",fi:"Tankkaus- ja latausasemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/freight-and-logistics":{en:"Freight and logistics",fi:"Rahti ja logistiikka"},"https://w3id.org/mobilitydcat-ap/mobility-theme/freight-delivery-regulations":{en:"Freight delivery regulations",fi:"Rahdinkuljetusmääräykset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/general-information-for-trip-planning-":{en:"General information for trip-planning",fi:"Yleistä tietoa reittisuunnitteluun"},"https://w3id.org/mobilitydcat-ap/mobility-theme/geometry":{en:"Geometry",fi:"Geometria"},"https://w3id.org/mobilitydcat-ap/mobility-theme/gradients":{en:"Gradients",fi:"Kaltevuudet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/hours-of-operation":{en:"Hours of operation",fi:"Käyttöajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/identification-of-tolled-roads":{en:"Identification of tolled roads",fi:"Tietullin alaisten teiden yksilöiminen"},"https://w3id.org/mobilitydcat-ap/mobility-theme/junctions":{en:"Junctions",fi:"Liittymät"},"https://w3id.org/mobilitydcat-ap/mobility-theme/lane-closures-and-access-conditions":{en:"Lane closures and access conditions",fi:"Kaistojen sulkemiset ja käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-charging-points":{en:"Location and conditions of charging points",fi:"Latauspisteiden sijainnit ja olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-filling-stations":{en:"Location and conditions of filling stations",fi:"Tankkausasemien sijainnit ja olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-length-of-queues":{en:"Location and length of queues",fi:"Jonojen sijainti ja pituus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-delivery-areas":{en:"Location of delivery areas",fi:"Lastaus- ja purkausalueiden sijainti"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-tolling-stations":{en:"Location of tolling stations",fi:"Tietulliasemien sijainti"},"https://w3id.org/mobilitydcat-ap/mobility-theme/locations-and-stations":{en:"Locations and stations",fi:"Sijainnit ja asemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/long-term-road-works":{en:"Long-term road works",fi:"Pitkäaikaiset tietyöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/network-closures-diversions":{en:"Network closures/diversions",fi:"Verkon suljetut osat ja/tai kiertotiet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/network-detailed-attributes":{en:"Network detailed attributes",fi:"Verkon yksityiskohtaiset tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/network-geometry-and-lane-character":{en:"Network geometry and lane character",fi:"Verkkogeometria ja kaistojen luonne"},"https://w3id.org/mobilitydcat-ap/mobility-theme/network-topology-and-routes-lines":{en:"Network topology and routes/lines",fi:"Verkkotopologia ja reitit/linjat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/number-of-lanes":{en:"Number of lanes",fi:"Kaistojen määrä"},"https://w3id.org/mobilitydcat-ap/mobility-theme/operational-calendar":{en:"Operational Calendar",fi:"Operatiivinen kalenteri"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other":{en:"Other",fi:"Muu"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other-access-restrictions-and-traffic-regulations":{en:"Other access restrictions and traffic regulations",fi:"Muut käyttörajoitukset ja liikennesäännöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other-static-traffic-signs":{en:"Other static traffic signs",fi:"Muut staattiset liikennemerkit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other-temporary-traffic-management-measures-or-plans":{en:"Other temporary traffic management measures or plans",fi:"Muut tilapäiset liikenteenhallintatoimenpiteet tai -suunnitelmat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other-traffic-regulations":{en:"Other traffic regulations",fi:"Muut liikennesäännöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-costs":{en:"Parameters needed to calculate costs",fi:"Kustannusten laskemiseen tarvittavat parametrit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-environmental-factors":{en:"Parameters needed to calculate environmental factors",fi:"Ympäristötekijöiden laskemiseen tarvittavat parametrit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/park-and-ride-stops":{en:"Park and Ride stops",fi:"Julkisen liikenteen liityntäpysäköinti"},"https://w3id.org/mobilitydcat-ap/mobility-theme/parking-service-and-rest-area-information":{en:"Parking, service and rest area information",fi:"Pysäköinti-, palvelu- ja levähdysalueiden tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/passenger-classes":{en:"Passenger classes",fi:"Matkustajaluokat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods":{en:"Payment methods",fi:"Maksutavat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods-for-tolls":{en:"Payment methods for tolls",fi:"Tietullien maksutavat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-accessibility-facilities":{en:"Pedestrian accessibility facilities",fi:"Jalankulkijoiden esteettömyyttä tukevat välineet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-data":{en:"Pedestrian network data",fi:"Jalankulkuverkon tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-geometry":{en:"Pedestrian network geometry",fi:"Jalankulkuverkon geometria"},"https://w3id.org/mobilitydcat-ap/mobility-theme/permanent-access-restrictions":{en:"Permanent access restrictions",fi:"Pysyvät käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/planned-interchanges-between-scheduled-services":{en:"Planned interchanges between scheduled services",fi:"Suunnitellut vaihdot säännöllisten palvelujen välillä"},"https://w3id.org/mobilitydcat-ap/mobility-theme/points-of-interest":{en:"Points of interest",fi:"Kohdepisteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/poor-road-conditions":{en:"Poor road conditions",fi:"Huonokuntoiset tiet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/predicted-travel-times":{en:"Predicted travel times",fi:"Ennustetut matka-ajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/provider-data":{en:"Provider data",fi:"Palveluntarjoajan tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-non-scheduled-transport":{en:"Public transport non-scheduled transport",fi:"Joukkoliikenne, aikatauluttamaton"},"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-scheduled-transport":{en:"Public transport scheduled transport",fi:"Joukkoliikenne, säännöllinen"},"https://w3id.org/mobilitydcat-ap/mobility-theme/purchase-information":{en:"Purchase information",fi:"Ostotiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-estimated-departure-and-arrival-times":{en:"Real-time estimated departure and arrival times",fi:"Reaaliaikaiset arvioidut lähtö- ja saapumisajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-traffic-data":{en:"Real-time traffic data",fi:"Reaaliaikaiset liikennetiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/reservation-and-purchase-options":{en:"Reservation and purchase options",fi:"Varaus- ja ostovaihtoehdot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-classification":{en:"Road classification",fi:"Tien luokitus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-closures-and-access-conditions":{en:"Road closures and access conditions",fi:"Teiden sulkemiset ja käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-events-and-conditions":{en:"Road events and conditions",fi:"Tieolosuhteet ja tapahtumat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-weather-conditions":{en:"Road weather conditions",fi:"Tieolosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-width":{en:"Road width",fi:"Teiden leveys"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-work-information":{en:"Road work information",fi:"Tietyötiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-availability":{en:"Service and rest area availability",fi:"Palvelu- ja levähdysalueiden saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-locations-and-conditions":{en:"Service and rest area locations and conditions",fi:"Palvelu- ja levähdysalueiden sijainnit ja olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/service-areas-and-service-times":{en:"Service areas and service times",fi:"Palvelualueet ja palveluajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/sharing-and-hiring-services":{en:"Sharing and Hiring Services",fi:"Vuokraus- ja yhteiskäyttöpalvelut"},"https://w3id.org/mobilitydcat-ap/mobility-theme/short-term-road-works":{en:"Short-term road works",fi:"Lyhytaikaiset tietyöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/special-fare-products":{en:"Special Fare Products",fi:"Erikoismaksutuotteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/speed":{en:"Speed",fi:"Nopeus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/speed-limits":{en:"Speed limits",fi:"Nopeusrajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/static-road-network-data":{en:"Static road network data",fi:"Staattiset tieverkon tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/static-traffic-signs-and-regulations":{en:"Static traffic signs and regulations",fi:"Staattiset liikennemerkit ja -säännöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-accessibility-and-paths-within-facility":{en:"Stop facilities accessibility and paths within facility",fi:"Pysäkkipalveluiden esteettömyys ja reitit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-geometry-and-map-layout":{en:"Stop facilities geometry and map layout",fi:"Pysäkkipalveluiden geometria ja kartta"},"https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-location-and-features":{en:"Stop facilities location and features",fi:"Pysäkkipalveluiden sijainti ja ominaisuudet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-status-of-features":{en:"Stop facilities status of features",fi:"Pysäkkipalveluiden ominaisuuksien tila"},"https://w3id.org/mobilitydcat-ap/mobility-theme/timetables-static":{en:"Timetables static",fi:"Aikataulut, staattiset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/toll-information":{en:"Toll information",fi:"Tietullitiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/topographic-places":{en:"Topographic places",fi:"Topografiset paikat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-circulation-plans":{en:"Traffic circulation plans",fi:"Liikennevirtasuunnitelmat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-data-at-border-crossings-to-third-countries":{en:"Traffic data at border crossings to third countries",fi:"Liikennetiedot rajanylityspaikoilla kolmansiin maihin"},"https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-volume":{en:"Traffic volume",fi:"Liikenteen määrä"},"https://w3id.org/mobilitydcat-ap/mobility-theme/transport-operators":{en:"Transport operators",fi:"Liikenteenharjoittajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-availability":{en:"Truck parking availability",fi:"Kuorma-autopysäköinnin saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-locations-and-conditions":{en:"Truck parking locations and conditions",fi:"Kuorma-autojen pysäköintipaikat ja -olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-access-conditions":{en:"Tunnel access conditions",fi:"Tunneleiden käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-closures-and-access-conditions":{en:"Tunnel closures and access conditions",fi:"Tunneleiden sulkemiset ja käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/vehicle-details":{en:"Vehicle details",fi:"Ajoneuvojen tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/waiting-time-at-border-crossings-to-non-eu-member-states":{en:"Waiting time at border crossings to non-EU Member States",fi:"Odotusaika rajanylityspaikoilla EU:n ulkopuolisiin maihin"},"https://w3id.org/mobilitydcat-ap/mobility-theme/waterways-and-water-bodies":{en:"Waterways and water bodies",fi:"Vesiväylät ja vesistöt"}};function Bo(t){return"string"==typeof t&&Uo.has(t)}const Ho={state:{},initialize(){Io.apply(this),this.state={topMobilityTheme:this._getInitialMobilityTheme()};this._getTopMobilityThemeSelector().on("change",this._onTopMobilityThemeChanged),this._onStateUpdate(this._handleTopMobilityThemeChanged),this._subThemeSelectorViewUpdate(void 0,this.state)},teardown:function(){this._stateListeners=void 0},_getInitialMobilityTheme(){const t=this._getTopMobilityThemeSelector().val();return Bo(t)?t:void 0},_getInitialSubMobilityTheme(){const t=this._getInitialSubMobilityThemeSelector().val();return"string"==typeof(e=t)&&Vo.has(e)?t:void 0;var e},_getTopMobilityThemeSelector(){return this.$("#field-mobility_theme")},_getInitialSubMobilityThemeSelector(){return this.$("#mobility_theme_sub_value")},_getSubMobilityThemeSelector(){return this.$("#field-mobility_theme_sub")},_onTopMobilityThemeChanged(t){if(t.target instanceof HTMLSelectElement){const e=t.target.value;if(!Bo(e))throw new Error(`Invalid mobility theme: ${e}`);this._mergeState({topMobilityTheme:e})}},_stateChangedKeys(t,e){const i=new Set;for(const a in t)a in e?t[a]!==e[a]&&i.add(a):i.add(a);for(const a in e)a in t||i.add(a);return i},_triggerListeners(t,e){if(this._stateListeners)for(const i of this._stateListeners)i(t,e)},_updateState(t){const e=this.state;this.state=t;const i=this._stateChangedKeys(e,t);return this._triggerListeners(e,i),t},_mergeState(t){const e=this.state,i={...this.state,...t};this.state=i;const a=this._stateChangedKeys(e,i);return this._triggerListeners(e,a),i},_onStateUpdate(t){return this._stateListeners?this._stateListeners.push(t):this._stateListeners=[t],()=>{this._stateListeners&&(this._stateListeners=this._stateListeners.filter(e=>e!==t))}},_handleTopMobilityThemeChanged(t,e){e.has("topMobilityTheme")&&this._subThemeSelectorViewUpdate(t,this.state)},_subThemeSelectorViewUpdate(t,e){function i(t){return"object"==typeof t&&!!t.subMobilityThemeSelectorParent&&!!t.subMobilityThemeSelector}function a(){const t=this._getSubMobilityThemeSelector().parentsUntil("form").filter("div.form-group");"none"!==t.css("display")?t.css("display","none"):t.css("display","")}const o=void 0===t,s=t?.topMobilityTheme!==e.topMobilityTheme;if(o||s){if(e.topMobilityTheme){const t=Do[e.topMobilityTheme].map(t=>t),o=this._getInitialSubMobilityTheme();if(t?.length>0){(function(){if(i(e)){e.subMobilityThemeSelectorParent.append(e.subMobilityThemeSelector),a.apply(this);const t={...e},i=new Set(["subMobilityThemeSelector","subMobilityThemeSelectorParent"]),o=Object.keys(t).reduce((e,a)=>(i.has(a)||(e[a]=t[a]),e),{});this._updateState(o)}}).apply(this);const s=function(t,e){const i=t.map(t=>{const i=document.createElement("option");i.value=t;const a=$("html").attr("lang")??"en";return i.text=Fo[t][a]??Fo[t].en,t===e&&(i.selected=!0),i}),a=document.createElement("option");return a.value="",a.text="",e||(a.selected=!0),i.unshift(a),i.sort((t,e)=>t.text.localeCompare(e.text)),i}.apply(this,[t,o]);return void function(t){this._getSubMobilityThemeSelector().empty().append(t)}.apply(this,[s])}}(function(){if(!i(e)){a.apply(this);const t=this._getSubMobilityThemeSelector().parent(),e=this._getSubMobilityThemeSelector().detach();this._mergeState({subMobilityThemeSelector:e,subMobilityThemeSelectorParent:t})}}).apply(this)}}};ckan.module("digitraffic_theme_dataset_form_wrapper",Ho);const Yo={initialize(){Io.apply(this)}};ckan.module("digitraffic_theme_iri_fragment_inputs",Yo);const Wo={initialize(){Io.apply(this);const t=this._getForm(),e=this._getFormInput(),i=this._getLanguageDropdown(),a=this._getLanguageOptions();i.on("click",this._toggleLanguageDropdownMouseOpen),i.on("keydown",this._toggleLanguageDropdownKeyboardOpen),a.each((i,a)=>{const o=$(a);o.on("click",()=>this._submitFormMouse(o,e,t)),o.on("keydown",i=>this._submitFormKeyboard(i,o,e,t))})},_toggleLanguageDropdownMouseOpen(t){t.target&&t.target.classList.toggle("open")},_toggleLanguageDropdownKeyboardOpen(t){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),t.target&&t.target.classList.toggle("open"))},_submitFormMouse(t,e,i){const a=t.attr("data-value");e&&a&&e.val(a),i&&i.trigger("submit")},_submitFormKeyboard(t,e,i,a){if("Enter"===t.key||" "===t.key){const t=e.attr("data-value");i&&t&&i.val(t),a&&a.trigger("submit")}},_getForm(){return this.$("#language-menu-form")},_getFormInput(){return this.$("#language-option-hidden")},_getLanguageDropdown(){return this.$(".custom-language-dropdown")},_getLanguageOptions(){return this.$(".custom-language-option")}};ckan.module("digitraffic_theme_language_menu",Wo);const Go={START_TIMESTAMP_TZ_CSS_QUERY:"#field-start_timestamp-tz",END_TIMESTAMP_TZ_CSS_QUERY:"#field-end_timestamp-tz",initialize(){Io.apply(this);const t=this._getStartTimestampTZ(),e=this._getEndTimestampTZ();this._moveToEnd(t),t.find(this.START_TIMESTAMP_TZ_CSS_QUERY).on("change",t=>{const i=t.target.value;e.find(this.END_TIMESTAMP_TZ_CSS_QUERY).val(i)}),e.hide(),this._showNecessityLabels()},_getStartTimestampTZ(){return this.$(".datetime-row").find(".datetime-field").has(this.START_TIMESTAMP_TZ_CSS_QUERY)},_getEndTimestampTZ(){return this.$(".datetime-row").find(".datetime-field").has(this.END_TIMESTAMP_TZ_CSS_QUERY)},_moveToEnd(t){t.appendTo(this.el)},_showNecessityLabels(){const t=this.$(".hide-necessity");t.length&&t.removeClass("hide-necessity")}};ckan.module("digitraffic_theme_temporal_coverage",Go);var Ko=function(t,e,i,a){var o,s=arguments.length,n=s<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,a);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};class Zo extends CustomEvent{constructor(t){super("select",{detail:t,bubbles:!0,cancelable:!0,composed:!1})}}class qo extends It{constructor(){super(),this.options=[],this.disabled=!1,this.error=!1,this.multiple=!1,this.required=!1,this.addEventListener("blur",()=>this.getButton().ariaExpanded="false"),this._internals=this.attachInternals()}firstUpdated(){this.tabIndex=0,this.setValidity(),this.multiple&&this.setMultipleHeaderContent(),this.setFormValue()}render(){const t=t=>yt`
      <li
        @click=${()=>this.handleSelect(t)}
        @keypress=${e=>this.handleKeypress(e,t)}
        class=${`ui-label-text option ${this.getOptionCssClass(t)}`}
        tabindex=${0}
        aria-selected=${this.value===t}
      >
        ${this.getLabel(t)}
      </li>
    `,e=t=>yt`
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
    `,i=yt`
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
    `,a=0===this.renderRoot.children.length;return yt`
      <div class="dropdown-wrapper">
        <button
          @click=${()=>{const t=this.getButton();t.ariaExpanded=(!("true"===t.ariaExpanded)).toString()}}
          ?disabled=${this.disabled}
          class=${`ui-label-text ${this.getButtonCssClass()}`}
          role="combobox"
          aria-controls="options-list"
          aria-expanded=${(t=>null!=t?t:ft)(a?"false":this.getButton().ariaExpanded)}
        >
          ${this.multiple?(()=>{const t=this.value,e=yt`<div>${this.placeholder||""}</div>`;if(null==t)return e;if(!Array.isArray(t))throw new Error("Selected options should be an array when multiple is true");return 0===t.length?e:yt`
        <div class="selected-options-container">
          <div class="selected-options">
            ${t.map(t=>yt` <span class="selected-tag">${this.getLabel(t)}</span> `)}
          </div>
          <span class="overflow-counter"></span>
        </div>
      `})():(()=>{var t;return yt` <div>${null!==(t=this.getLabel(this.value))&&void 0!==t?t:this.placeholder}</div> `})()}
          <fds-icon icon="chevron-up"></fds-icon>
          <fds-icon icon="chevron-down"></fds-icon>
        </button>
        ${i}
      </div>
    `}setMultipleHeaderContent(){const t=this.renderRoot.querySelector(".selected-options-container"),e=this.renderRoot.querySelector(".selected-options"),i=this.renderRoot.querySelector(".overflow-counter");if(!t||!e||!i)return;const a=Array.from(e.querySelectorAll(".selected-tag"));let o=0;const s=t.clientWidth-30;let n=0;a.forEach(t=>{const e=t;n+=e.offsetWidth;const i=e.querySelector("fds-icon");i&&(n+=parseInt(i.size.value)),n>s?(e.classList.add("hidden"),o++):e.classList.remove("hidden")}),o>0?(i.classList.remove("hidden"),i.textContent=`+${o}`):(i.textContent="",i.classList.add("hidden"))}updated(){this.setMultipleHeaderContent()}handleKeypress(t,e){"Enter"===t.key&&this.handleSelect(e)}getButton(){const t=this.renderRoot.querySelector("button");if(null===t)throw new Error("Button element not found");return t}handleSelect(t){this.getButton().ariaExpanded="false",this.value=t,this.setValidity(),this.setFormValue(),this.dispatchEvent(new Zo(t))}handleMultiSelect(t){const e=this.getValues();this.value=e.length>0?e:void 0,this.setValidity(),this.setFormValue(),this.dispatchEvent(new Zo(t))}getLabel(t){if(!t)return null;if(Array.isArray(t)){if(0===t.length)return null;t=t[0]}const e=yt`<span class="label">${t.label}</span>`;return t.icon?yt`<span class="icon-label"><fds-icon .icon=${t.icon}></fds-icon>${e}</span>`:e}getValues(){var t;const e=t=>this.options.find(e=>e.label===t);let i=[];if(this.multiple){const t=this.renderRoot.querySelectorAll("fds-checkbox");i=Array.from(t).filter(t=>t.checked).map(t=>{if(null===t.labels||null===t.labels[0].textContent)return;const i=t.labels[0].textContent.trim();return e(i)}).filter(t=>void 0!==t)}else{const a=this.renderRoot.querySelectorAll("li"),o=Array.from(a).find(t=>"true"===t.getAttribute("aria-selected"));if(void 0!==o){const a=null===(t=o.textContent)||void 0===t?void 0:t.trim();if(void 0!==a){const t=e(a);i=t?[t]:[]}}}return structuredClone(i)}getButtonCssClass(){return this.error?"error":!this.value&&this.placeholder?"placeholder":""}getOptionCssClass(t){return this.value===t?"selected":""}checkValidity(){return this._internals.checkValidity()}reportValidity(){return this._internals.reportValidity()}get labels(){return this._internals.labels}get validity(){return this._internals.validity}get validationMessage(){return this._internals.validationMessage}setValidity(){const t=!!this.required&&void 0===this.value;this._internals.setValidity({valueMissing:t,customError:this.error},"Invalid state")}setFormValue(){const t=this.name;if(void 0!==t){const e=new FormData;this.getValues().forEach(i=>{i.value&&e.append(t,i.value.toString())}),this._internals.setFormValue(e)}}}qo.formAssociated=!0,qo.shadowRootOptions={...It.shadowRootOptions,delegatesFocus:!0},qo.styles=[uo,I`
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

        background-color: ${oo};
        border: 1px solid ${mo};
      }

      button:disabled {
        cursor: default;
        background-color: ${po};
        color: ${go};
      }

      button:disabled .chevron {
        color: ${go};
      }

      button.placeholder {
        color: ${go};
      }

      button.error {
        color: ${so};
        border: 3px solid ${so};
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
        background: ${co};
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
        box-shadow: ${Ut};
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
        color: ${yo};
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

        background-color: ${oo};
        border-bottom: 1px solid ${mo};

        &.option-multiple {
          cursor: pointer;
          gap: 10px;
          flex-wrap: nowrap;
        }
      }

      .option:hover {
        /* TODO: what color? */
        background-color: ${lo};
      }

      .option.selected {
        /* TODO: what color? */
        background-color: ${ho};
      }
    `],Ko([bo({type:Array})],qo.prototype,"options",void 0),Ko([bo({type:Boolean})],qo.prototype,"disabled",void 0),Ko([bo({type:Boolean})],qo.prototype,"error",void 0),Ko([bo()],qo.prototype,"placeholder",void 0),Ko([bo({type:Object})],qo.prototype,"value",void 0),Ko([bo({type:Boolean})],qo.prototype,"multiple",void 0),Ko([bo({type:Boolean})],qo.prototype,"required",void 0),Ko([bo()],qo.prototype,"name",void 0);var Qo=function(t,e,i,a){var o,s=arguments.length,n=s<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,a);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};class Jo extends It{constructor(){super(),this.label="",this.disabled=!1,this.checked=!1,this.value="on",this._internals=this.attachInternals(),this.addEventListener("click",t=>{var e;if(t.target===this){t.preventDefault(),t.stopPropagation();const i=null===(e=this.shadowRoot)||void 0===e?void 0:e.getElementById("checkbox");i&&i.click()}})}firstUpdated(){this.tabIndex=0,this.setValidity()}render(){return yt`
      <input
        type="checkbox"
        id="checkbox"
        .disabled=${this.disabled}
        .checked="${this.checked}"
        .value="${this.value}"
        @change=${this.handleSelect}
        @click=${t=>{t.stopPropagation()}}
      />
      ${this.label&&yt`<label for="checkbox" class="ui-label-text">${this.label}</label>`}
    `}handleSelect(){this.disabled||(this.checked=!this.checked,this.setValidity(),this.setFormValue(),setTimeout(()=>{this.dispatchEvent(new CustomEvent("select",{detail:this.checked}))}))}checkValidity(){return this._internals.checkValidity()}reportValidity(){return this._internals.reportValidity()}get validity(){return this._internals.validity}get labels(){return this._internals.labels}get validationMessage(){return this._internals.validationMessage}setValidity(){var t;const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.getElementById("checkbox");this._internals.setValidity(e.validity,e.validationMessage,e)}setFormValue(){if(this.checked){void 0!==this.name&&this._internals.setFormValue(this.value.toString())}else this._internals.setFormValue(null)}}Jo.formAssociated=!0,Jo.shadowRootOptions={...It.shadowRootOptions,delegatesFocus:!0},Jo.styles=[uo,I`
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
        border: 2px solid ${ao};
        border-radius: ${zt};
      }

      #checkbox:checked::before {
        border-color: ${ho};
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEwIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0zLjM4Nzc2IDcuNDAzM0wwLjE0NjA2NiA0LjE2MTYxQy0wLjA0ODY4ODcgMy45NjY4NSAtMC4wNDg2ODg3IDMuNjUxMDggMC4xNDYwNjYgMy40NTYzMUwwLjg1MTM0OSAyLjc1MUMxLjA0NjEgMi41NTYyMyAxLjM2MTkgMi41NTYyMyAxLjU1NjY1IDIuNzUxTDMuNzQwNDEgNC45MzQ3NEw4LjQxNzc4IDAuMjU3Mzk0QzguNjEyNTQgMC4wNjI2Mzk0IDguOTI4MzMgMC4wNjI2Mzk0IDkuMTIzMDggMC4yNTczOTRMOS44MjgzNyAwLjk2MjY5NkMxMC4wMjMxIDEuMTU3NDUgMTAuMDIzMSAxLjQ3MzIyIDkuODI4MzcgMS42NjhMNC4wOTMwNiA3LjQwMzMyQzMuODk4MjkgNy41OTgwOCAzLjU4MjUxIDcuNTk4MDggMy4zODc3NiA3LjQwMzNWNy40MDMzWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==');
        background-color: ${ho};
        background-repeat: no-repeat;
        background-position: center;
      }

      #checkbox:disabled::before,
      #checkbox:disabled + label {
        cursor: default;
        color: ${go};
      }

      #checkbox:disabled::before {
        border-color: ${go};
      }

      #checkbox:disabled#checkbox:checked::before {
        background-color: ${go};
      }
    `],Qo([bo()],Jo.prototype,"label",void 0),Qo([bo({type:Boolean})],Jo.prototype,"disabled",void 0),Qo([bo({type:Boolean})],Jo.prototype,"checked",void 0),Qo([bo()],Jo.prototype,"value",void 0),Qo([bo()],Jo.prototype,"name",void 0),customElements.define("fds-checkbox",Jo),customElements.define("fds-dropdown",qo);const Xo={initialize(){Io.apply(this);const t=this._getOptionValues();customElements.whenDefined("fds-dropdown").then(()=>{const e=document.createElement("fds-dropdown");e.options=this._optionValuesToFdsDropdownOptions(t),e.value=this._optionValuesToFdsDropdownOptions(t.filter(t=>t.selected)),e.multiple=!0,e.setAttribute("id",this.el[0].id),this.el[0].name&&e.setAttribute("name",this.el[0].name),this.el.replaceWith(e)})},_getOptionValues(){return this.$("option").toArray().map(t=>{if(null===t.textContent)throw new Error("Option element does not have text content");const e=t.textContent.trim();if(""!==e)return{label:e,value:t.value,selected:""===t.getAttribute("selected")}}).filter(t=>void 0!==t)},_optionValuesToFdsDropdownOptions:t=>t.map(t=>({label:t.label,value:t.value}))};ckan.module("digitraffic_theme_multi_select",Xo);const ts={initialize(){Io.apply(this);this._getToggleButtons().children(".language-toggle-button").each((t,e)=>{const i=$(e),a=i.attr("id");i.on("click",t=>{t.preventDefault();this.$(`#field-${a}`).parent().parent().removeClass("hidden"),i.addClass("hidden")})});this._getCloseButtons().each((t,e)=>{const i=$(e),a=i.attr("id");i.on("click",t=>{t.preventDefault();$(`#${a}.language-toggle-button`).removeClass("hidden"),i.parent().parent().addClass("hidden");this.$(`#field-${a}`).val("")})})},_getToggleButtons(){return this.$(".language-toggle-buttons")},_getCloseButtons(){return this.$(".hide-language-input")}};ckan.module("digitraffic_theme_language_toggle_buttons",ts);var es,is=function(t,e,i,a){var o,s=arguments.length,n=s<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,a);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};!function(t){t.primary="primary",t.secondary="secondary",t.tertiary="tertiary",t.danger="danger"}(es||(es={}));const as={primary:oo,secondary:ao,tertiary:ao,danger:oo};class os extends It{constructor(){super(),this.variant=es.primary,this.disabled=!1,this._internals=this.attachInternals()}updated(t){(t.has("value")||t.has("name"))&&(this.setValidity(),this.setFormValue())}render(){return yt`
      <button id="button" class="button--${this.variant}" ?disabled="${this.disabled}">
        ${this.icon&&yt`<fds-icon .icon="${this.icon}"></fds-icon>`}
        ${this.label&&yt`<span class="ui-label-text">${this.label}</span>`}
      </button>
    `}checkValidity(){return this._internals.checkValidity()}reportValidity(){return this._internals.reportValidity()}get validity(){return this._internals.validity}get labels(){return this._internals.labels}get validationMessage(){return this._internals.validationMessage}setValidity(){var t;const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.getElementById("button");this._internals.setValidity(e.validity,e.validationMessage,e)}setFormValue(){if(this.name&&void 0!==this.value){void 0!==this.name&&this._internals.setFormValue(this.value.toString())}else this._internals.setFormValue(null)}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this._handleFormSubmit)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this._handleFormSubmit)}_handleFormSubmit(){if("submit"===this.type||void 0===this.type){const t=this._internals.form;null==t||t.requestSubmit()}}}os.formAssociated=!0,os.shadowRootOptions={...It.shadowRootOptions,delegatesFocus:!0},os.styles=[uo,I`
      :host {
        display: inline-flex;
        justify-content: center;
      }

      button {
        cursor: pointer;
        display: flex;
        border: 2px solid ${ao};
        border-radius: ${Dt};
        padding: 13px 16px;
        height: ${Rt};
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
        border-color: ${ao};
        background: ${ao};
        color: ${as[es.primary]};
      }

      .button--secondary {
        border: 2px solid ${ao};
        background: ${oo};
        color: ${as[es.secondary]};
      }

      .button--tertiary {
        background: transparent;
        border-color: transparent;
        color: ${as[es.tertiary]};
      }

      .button--danger {
        background: ${no};
        border-color: transparent;
        color: ${as[es.danger]};
      }

      .button--primary:hover,
      .button--secondary:hover,
      .button--tertiary:hover {
        background: ${ho};
        border-color: transparent;
        color: ${oo};
      }

      .button--danger:hover {
        background: ${ro};
        border-color: ${ro};
        color: ${oo};
      }

      .button--primary:disabled {
        background: ${co};
        border-color: ${co};
        color: ${go};
      }

      .button--secondary:disabled {
        background: transparent;
        color: ${co};
        border-color: ${co};
      }

      .button--tertiary:disabled {
        background: transparent;
        border-color: transparent;
        color: ${co};
      }

      .button--danger:disabled {
        background: ${co};
        border-color: transparent;
        color: ${go};
      }
    `],is([bo()],os.prototype,"variant",void 0),is([bo({type:Boolean})],os.prototype,"disabled",void 0),is([bo()],os.prototype,"icon",void 0),is([bo()],os.prototype,"label",void 0),is([bo()],os.prototype,"type",void 0),is([bo()],os.prototype,"name",void 0),is([bo()],os.prototype,"value",void 0),customElements.define("fds-button",os);class ss extends Error{constructor(t){super(t),this.name="TemplateError"}}const ns=()=>({fieldName:"NOT_SET",initialize(){Io.apply(this)},_getIndex(){const t=this.el.closest(`[data-field='${this.fieldName}']`);if(1!==t.length)throw new Error("Element not found");const e=t.attr("data-group-index");if(void 0===e)throw new Error("Index not found");if(e.startsWith("REPEATING-INDEX"))throw new ss("Template");return parseInt(e)},_getAllFields(){const t=this._getIndex(),e=this._getAllFieldNames(t);return this._getFields(e)},_getFields(t){let e=$();for(const i of t){const t=this.el.find(`[name='${i}']`);if(0===t.length)throw new Error(`Field element not found for field ${i}`);e=e.add(t)}return e},_getParentFormGroup(t){const e=t.closest(".form-group");if(0===e.length)throw new Error("Parent form group not found");return e},_getAllFieldNames(t){throw Error("No All Field Names")}}),rs=()=>{const t=ns();return{...t,initialize(){t.initialize.call(this);try{const t=this._getTypeEl(),e=t.val();this._onlyShowTypeFields(e),t.on("change",t=>{const e=t.target.value;this._onlyShowTypeFields(e)})}catch(t){if(t instanceof ss)return;throw t}},typeFieldName:"NOT_SET",_getTypeEl(){const t=this._getIndex(),e=`${this.fieldName}-${t}-${this.typeFieldName}`,i=this.el.find(`select[name='${e}']`);if(0===i.length)throw new Error(`Element not found for index ${t}`);return i},_onlyShowTypeFields(t){const e=this._getTypeFields(t),i=this._getAllFields().not(e).map((t,e)=>this._getParentFormGroup($(e))[0]),a=e.map((t,e)=>this._getParentFormGroup($(e))[0]);i.addClass("display-none"),a.removeClass("display-none")},_getTypeFields(t){throw Error("No Type Fieds")}}};var ls;!function(t){t.PERSON="http://www.w3.org/2006/vcard/ns#Individual",t.ORGANIZATION="http://www.w3.org/2006/vcard/ns#Organization"}(ls||(ls={}));const ds={...rs(),fieldName:"contact_point",typeFieldName:"contact_point_type",_getTypeFields(t){const e=this._getIndex(),i=this._getAllFieldNames(e);let a;if(t===ls.PERSON&&(a=i),t===ls.ORGANIZATION){const t=new Set([`contact_point-${e}-organization_name`]);a=new Set([...i].filter(e=>!t.has(e)))}if(void 0===a)throw new Error(`Contact point type field names not found for type ${t}`);return this._getFields(a)},_getAllFieldNames:t=>new Set([`contact_point-${t}-contact_point_type`,`contact_point-${t}-fn`,`contact_point-${t}-organization_name`,`contact_point-${t}-has_email`,`contact_point-${t}-has_telephone`,`contact_point-${t}-has_url`,`contact_point-${t}-street_address`,`contact_point-${t}-locality`,`contact_point-${t}-postal_code`,`contact_point-${t}-region`,`contact_point-${t}-country_name`])};var hs;ckan.module("digitraffic_theme_contact_detail",ds),function(t){t.ACADEMIA="http://purl.org/adms/publishertype/Academia-ScientificOrganisation",t.COMPANY="http://purl.org/adms/publishertype/Company",t.INDUSTRY_CONSORTIUM="http://purl.org/adms/publishertype/IndustryConsortium",t.LOCAL_AUTHORITY="http://purl.org/adms/publishertype/LocalAuthority",t.NATIONAL_AUTHORITY="http://purl.org/adms/publishertype/NationalAuthority",t.NON_GOVERNMENTAL_ORGANIZATION="http://purl.org/adms/publishertype/NonGovernmentalOrganisation",t.NON_PROFIT_ORGANIZATION="http://purl.org/adms/publishertype/NonProfitOrganisation",t.PRIVATE_INDIVIDUAL="http://purl.org/adms/publishertype/PrivateIndividual(s)",t.REGIONAL_AUTHORITY="http://purl.org/adms/publishertype/RegionalAuthority",t.STANDARDISATION_BODY="http://purl.org/adms/publishertype/StandardisationBody",t.SUPER_NATIONAL_AUTHORITY="http://purl.org/adms/publishertype/SupraNationalAuthority"}(hs||(hs={}));const ps={...rs(),fieldName:"rights_holder",typeFieldName:"type",_getTypeFields(t){const e=this._getIndex(),i=this._getAllFieldNames(e),a=new Set([hs.ACADEMIA,hs.COMPANY,hs.INDUSTRY_CONSORTIUM,hs.LOCAL_AUTHORITY,hs.NATIONAL_AUTHORITY,hs.NON_GOVERNMENTAL_ORGANIZATION,hs.NON_PROFIT_ORGANIZATION,hs.REGIONAL_AUTHORITY,hs.STANDARDISATION_BODY,hs.SUPER_NATIONAL_AUTHORITY]);let o;if(t===hs.PRIVATE_INDIVIDUAL&&(o=i),a.has(t)){const t=new Set([`rights_holder-${e}-first_name`,`rights_holder-${e}-surname`,`rights_holder-${e}-workplace_homepage`,`rights_holder-${e}-member_of`]);o=new Set([...i].filter(e=>!t.has(e)))}if(void 0===o)throw new Error(`Rights holder type field names not found for type ${t}`);return this._getFields(o)},_getAllFieldNames:t=>new Set([`rights_holder-${t}-type`,`rights_holder-${t}-name`,`rights_holder-${t}-first_name`,`rights_holder-${t}-surname`,`rights_holder-${t}-mbox`,`rights_holder-${t}-phone`,`rights_holder-${t}-thoroughfare`,`rights_holder-${t}-post_name`,`rights_holder-${t}-post_code`,`rights_holder-${t}-admin_unit_l2`,`rights_holder-${t}-admin_unit_l1`,`rights_holder-${t}-workplace_homepage`,`rights_holder-${t}-member_of`])};ckan.module("digitraffic_theme_rights_holder",ps);const cs={initialize(){Io.apply(this);const t=window.matchMedia("(min-width: 768px)");t.addEventListener("change",this._handleMediaQueryChange),this._handleMediaQueryChange(t)},_handleMediaQueryChange(t){const e=$('[data-form-layout-wrapper="left"]'),i=$('[data-form-layout-wrapper="right"]'),a=e.length>0,o=i.length>0;if(t.matches){if(!a&&!o){const t=$(".left-1, .left-2"),e=$(".right-1, .right-2"),i="display: flex; flex-wrap: nowrap; gap: 1rem; flex-direction: column;",a=document.createElement("div"),o=document.createElement("div");a.setAttribute("data-form-layout-wrapper","left"),o.setAttribute("data-form-layout-wrapper","right"),a.style=i+" grid-area: left-1-start / left-1-start / left-2-end / left-2-end;",t.wrapAll(a),o.style=i+" grid-area: right-1-start / right-1-start / right-2-end / right-2-end;",e.wrapAll(o)}}else a&&o&&(e.children().unwrap(),i.children().unwrap())}};ckan.module("digitraffic_theme_form_layout",cs);const ms={options:{is_url:!1,is_upload:!1,field_upload:"image_upload",field_url:"image_url",field_clear:"clear_upload",field_name:"name",upload_label:"",previous_upload:!1},field_url:$(),field_image:$(),field_url_input:$(),field_name:$(),field_clear:$(),label_location:$(),button_url:$(),button_upload:$(),fields:$(),is_data_resource:!1,previousUpload:!1,_nameIsDirty:!1,input:$(),initialize(){Io.apply(this);const t=this.options,e='input[name="'+t.field_upload+'"]',i='input[name="'+t.field_url+'"]',a='input[name="'+t.field_clear+'"]',o='input[name="'+t.field_name+'"]';this.input=$(e,this.el),this.field_url=$(i,this.el).parents(".form-group"),this.field_image=this.input.parents(".form-group"),this.field_url_input=$("input",this.field_url),this.field_name=this.el.parents("form").find(o),this.label_location=$('label[for="field-image-url"]'),this.is_data_resource="url"===this.options.field_url&&"upload"===this.options.field_upload,this.previousUpload=this.options.previous_upload;const s=$(a,this.el);s.length>0&&s.parents(".form-group").remove(),this.field_clear=$('<input type="hidden" name="'+t.field_clear+'">').appendTo(this.el),this.button_upload=$('<a href="javascript:;" class="btn btn-default"><i class="fa fa-cloud-upload"></i>'+this._("Upload")+"</a>").insertAfter(this.input),this.previousUpload&&$('<div class="error-inline"><i class="fa fa-warning"></i> '+this._("Please select the file to upload again")+"</div>").appendTo(this.field_image);const n=this._("Remove");if($('<a href="javascript:;" class="btn btn-danger btn-remove-url">'+n+"</a>").prop("title",n).on("click",this._onRemove).insertBefore(this.field_url_input),$('label[for="field-image-upload"]').text(t.upload_label||this._("Image")),this.input.on("mouseover",this._onInputMouseOver).on("mouseout",this._onInputMouseOut).on("change",this._onInputChange).prop("title",this._("Upload a file on your computer")).css("width",this.button_upload.outerWidth()??0),this.fields=$("<i />").add(this.button_upload).add(this.input).add(this.field_url).add(this.field_image),this.field_name.on("change",this._onModifyName),this.field_name.val()&&(this._nameIsDirty=!0),t.is_url)this._showOnlyFieldUrl(),this._updateUrlLabel(this._("URL"));else if(t.is_upload){this._showOnlyFieldUrl(),this.field_url_input.prop("readonly",!0);const t=this._fileNameFromUpload(String(this.field_url_input.val())??"");this.field_url_input.val(t),this._updateUrlLabel(this._("File"))}else this._showOnlyButtons()},_fileNameFromUpload:function(t){return/^\/base\/images/.test(t)?t:t=(t=(t=t.substring(0,-1===t.indexOf("#")?t.length:t.indexOf("#"))).substring(0,-1===t.indexOf("?")?t.length:t.indexOf("?"))).substring(t.lastIndexOf("/")+1,t.length)},_updateUrlLabel:function(t){this.is_data_resource&&this.label_location.text(t)},_onRemove:function(){this._showOnlyButtons(),this.field_url_input.val(""),this.field_url_input.prop("readonly",!1),this.field_clear.val("true")},_onInputChange:function(){let t=this.input.val()??"".split(/^C:\\fakepath\\/).pop()??"";const e=!!document.DOCUMENT_NODE,i=!e&&!!window.StyleMedia;if(e||i){const e=String(t).match(/[^\\\/]+$/);t=e?e[0]:String(t)}this.field_url_input.val(t),this.field_url_input.prop("readonly",!0),this.field_clear.val(""),this._showOnlyFieldUrl(),this._autoName(String(t)),this._updateUrlLabel(this._("File"))},_showOnlyButtons:function(){this.fields.hide(),this.button_upload.add(this.field_image).add(this.input).show()},_showOnlyFieldUrl:function(){this.fields.hide(),this.field_url.show()},_onInputMouseOver:function(){this.button_upload.addClass("hover")},_onInputMouseOut:function(){this.button_upload.removeClass("hover")},_onModifyName:function(){this._nameIsDirty=!0},_onFromWebBlur:function(){const t=this.field_url_input.val()??"",e=String(t).match(/([^\/]+)\/?$/);e&&e[1]&&this._autoName(e[1])},_autoName:function(t){this._nameIsDirty||this.field_name.val(t)}};ckan.module("digitraffic_image_upload",ms);
/**
     * @license lucide v0.477.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */
const gs={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},ys=([t,e,i])=>{const a=document.createElementNS("http://www.w3.org/2000/svg",t);return Object.keys(e).forEach(t=>{a.setAttribute(t,String(e[t]))}),i?.length&&i.forEach(t=>{const e=ys(t);a.appendChild(e)}),a},us=t=>"string"==typeof t?t:t&&t.class?t.class&&"string"==typeof t.class?t.class.split(" "):t.class&&Array.isArray(t.class)?t.class:"":"",fs=(t,{nameAttr:e,icons:i,attrs:a})=>{const o=t.getAttribute(e);if(null==o)return;const s=i[o.replace(/(\w)(\w*)(_|-|\s*)/g,(t,e,i)=>e.toUpperCase()+i.toLowerCase())];if(!s)return console.warn(`${t.outerHTML} icon name was not found in the provided icons object.`);const n=(t=>Array.from(t.attributes).reduce((t,e)=>(t[e.name]=e.value,t),{}))(t),r={...gs,"data-lucide":o,...a,...n},l=["lucide",`lucide-${o}`,n,a].flatMap(us).map(t=>t.trim()).filter(Boolean).filter((t,e,i)=>i.indexOf(t)===e).join(" ");l&&Object.assign(r,{class:l});const d=((t,e={})=>{const i={...gs,...e};return ys(["svg",i,t])})(s,r);return t.parentNode?.replaceChild(d,t)},bs=[["path",{d:"m6 9 6 6 6-6"}]],vs=[["path",{d:"m18 15-6-6-6 6"}]],_s=[["path",{d:"M15 3h6v6"}],["path",{d:"M10 14 21 3"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}]],ws=[["path",{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"}]],$s=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],["path",{d:"M2 12h20"}]],ks=[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5"}]],xs=[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}],["rect",{width:"4",height:"12",x:"2",y:"9"}],["circle",{cx:"4",cy:"4",r:"2"}]],As=[["line",{x1:"4",x2:"20",y1:"12",y2:"12"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18"}]],Ss=[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"}]],Ms=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]],Ts=[["path",{d:"M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"}],["path",{d:"m10 15 5-3-5-3z"}]];
/**
     * @license lucide v0.477.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */jQuery(function(){$(".js-disabled").removeClass("js-disabled"),(({icons:t={},nameAttr:e="data-lucide",attrs:i={}}={})=>{if(!Object.values(t).length)throw new Error("Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`");if("undefined"==typeof document)throw new Error("`createIcons()` only works in a browser environment.");const a=document.querySelectorAll(`[${e}]`);if(Array.from(a).forEach(a=>fs(a,{nameAttr:e,icons:t,attrs:i})),"data-lucide"===e){const e=document.querySelectorAll("[icon-name]");e.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(e).forEach(e=>fs(e,{nameAttr:"icon-name",icons:t,attrs:i})))}})({icons:{ExternalLink:_s,User:Ms,Menu:As,Globe:$s,ChevronDown:bs,ChevronUp:vs,Facebook:ws,Twitter:Ss,Instagram:ks,Youtube:Ts,Linkedin:xs}})})}();
