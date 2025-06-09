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
var i,a,o,n,s,r,l,d,h,p,c,m,g=function(t,e,i,a,o){if("m"===a)throw new TypeError("Private method is not writable");if("a"===a&&!o)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!o:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===a?o.call(t,i):o?o.value=i:e.set(t,i),i},y=function(t,e,i,a){if("a"===i&&!a)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!a:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===i?a:"a"===i?a.call(t):a?a.value:e.get(t)};const u=t=>"boolean"==typeof t?t:t?.capture??!1,f=class{constructor(){this.__eventListeners=new Map,this.__captureEventListeners=new Map}addEventListener(t,e,i){if(null==e)return;const a=u(i)?this.__captureEventListeners:this.__eventListeners;let o=a.get(t);if(void 0===o)o=new Map,a.set(t,o);else if(o.has(e))return;const n="object"==typeof i&&i?i:{};n.signal?.addEventListener("abort",(()=>this.removeEventListener(t,e,i))),o.set(e,n??{})}removeEventListener(t,e,i){if(null==e)return;const a=u(i)?this.__captureEventListeners:this.__eventListeners,o=a.get(t);void 0!==o&&(o.delete(e),o.size||a.delete(t))}dispatchEvent(t){const e=[this];let i=this.__eventTargetParent;if(t.composed)for(;i;)e.push(i),i=i.__eventTargetParent;else for(;i&&i!==this.__host;)e.push(i),i=i.__eventTargetParent;let a=!1,o=!1,n=0,s=null,r=null,l=null;const d=t.stopPropagation,h=t.stopImmediatePropagation;Object.defineProperties(t,{target:{get:()=>s??r,...b},srcElement:{get:()=>t.target,...b},currentTarget:{get:()=>l,...b},eventPhase:{get:()=>n,...b},composedPath:{value:()=>e,...b},stopPropagation:{value:()=>{a=!0,d.call(t)},...b},stopImmediatePropagation:{value:()=>{o=!0,h.call(t)},...b}});const p=(e,i,a)=>{"function"==typeof e?e(t):"function"==typeof e?.handleEvent&&e.handleEvent(t),i.once&&a.delete(e)},c=()=>(l=null,n=0,!t.defaultPrevented),m=e.slice().reverse();s=this.__host&&t.composed?null:this;const g=t=>{for(r=this;r.__host&&t.includes(r.__host);)r=r.__host};for(const e of m){s||r&&r!==e.__host||g(m.slice(m.indexOf(e))),l=e,n=e===t.target?2:1;const i=e.__captureEventListeners.get(t.type);if(i)for(const[t,e]of i)if(p(t,e,i),o)return c();if(a)return c()}const y=t.bubbles?e:[this];r=null;for(const e of y){s||r&&e!==r.__host||g(y.slice(0,y.indexOf(e)+1)),l=e,n=e===t.target?2:3;const i=e.__eventListeners.get(t.type);if(i)for(const[t,e]of i)if(p(t,e,i),o)return c();if(a)return c()}return c()}},b={__proto__:null,enumerable:!0};Object.freeze(b);const v=(p=class{constructor(t,e={}){if(i.set(this,!1),a.set(this,!1),o.set(this,!1),n.set(this,!1),s.set(this,Date.now()),r.set(this,!1),l.set(this,void 0),d.set(this,void 0),h.set(this,void 0),this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,0===arguments.length)throw new Error("The type argument must be specified");if("object"!=typeof e||!e)throw new Error('The "options" argument must be an object');const{bubbles:p,cancelable:c,composed:m}=e;g(this,i,!!c,"f"),g(this,a,!!p,"f"),g(this,o,!!m,"f"),g(this,l,`${t}`,"f"),g(this,d,null,"f"),g(this,h,!1,"f")}initEvent(t,e,i){throw new Error("Method not implemented.")}stopImmediatePropagation(){this.stopPropagation()}preventDefault(){g(this,n,!0,"f")}get target(){return y(this,d,"f")}get currentTarget(){return y(this,d,"f")}get srcElement(){return y(this,d,"f")}get type(){return y(this,l,"f")}get cancelable(){return y(this,i,"f")}get defaultPrevented(){return y(this,i,"f")&&y(this,n,"f")}get timeStamp(){return y(this,s,"f")}composedPath(){return y(this,h,"f")?[y(this,d,"f")]:[]}get returnValue(){return!y(this,i,"f")||!y(this,n,"f")}get bubbles(){return y(this,a,"f")}get composed(){return y(this,o,"f")}get eventPhase(){return y(this,h,"f")?p.AT_TARGET:p.NONE}get cancelBubble(){return y(this,r,"f")}set cancelBubble(t){t&&g(this,r,!0,"f")}stopPropagation(){g(this,r,!0,"f")}get isTrusted(){return!1}},i=new WeakMap,a=new WeakMap,o=new WeakMap,n=new WeakMap,s=new WeakMap,r=new WeakMap,l=new WeakMap,d=new WeakMap,h=new WeakMap,p.NONE=0,p.CAPTURING_PHASE=1,p.AT_TARGET=2,p.BUBBLING_PHASE=3,p);Object.defineProperties(v.prototype,{initEvent:b,stopImmediatePropagation:b,preventDefault:b,target:b,currentTarget:b,srcElement:b,type:b,cancelable:b,defaultPrevented:b,timeStamp:b,composedPath:b,returnValue:b,bubbles:b,composed:b,eventPhase:b,cancelBubble:b,stopPropagation:b,isTrusted:b});const w=(m=class extends v{constructor(t,e={}){super(t,e),c.set(this,void 0),g(this,c,e?.detail??null,"f")}initCustomEvent(t,e,i,a){throw new Error("Method not implemented.")}get detail(){return y(this,c,"f")}},c=new WeakMap,m);Object.defineProperties(w.prototype,{detail:b});const _=v,k=w;
/**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
globalThis.Event??=_,globalThis.CustomEvent??=k;const x=new WeakMap,A=t=>{let e=x.get(t);return void 0===e&&x.set(t,e=new Map),e},S=class extends f{constructor(){super(...arguments),this.__shadowRootMode=null,this.__shadowRoot=null,this.__internals=null}get attributes(){return Array.from(A(this)).map((([t,e])=>({name:t,value:e})))}get shadowRoot(){return"closed"===this.__shadowRootMode?null:this.__shadowRoot}get localName(){return this.constructor.__localName}get tagName(){return this.localName?.toUpperCase()}setAttribute(t,e){A(this).set(t,String(e))}removeAttribute(t){A(this).delete(t)}toggleAttribute(t,e){return this.hasAttribute(t)?!(void 0===e||!e)||(this.removeAttribute(t),!1):!(void 0!==e&&!e)&&(this.setAttribute(t,""),!0)}hasAttribute(t){return A(this).has(t)}attachShadow(t){const e={host:this};return this.__shadowRootMode=t.mode,t&&"open"===t.mode&&(this.__shadowRoot=e),e}attachInternals(){if(null!==this.__internals)throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");const t=new e(this);return this.__internals=t,t}getAttribute(t){return A(this).get(t)??null}},T=class extends S{};globalThis.litServerRoot??=Object.defineProperty(new T,"localName",{get:()=>"lit-server-root"});const E=new class{constructor(){this.__definitions=new Map}define(t,e){if(this.__definitions.has(t)){if("development"!==process.env.NODE_ENV)throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the name "${t}" has already been used with this registry`);console.warn(`'CustomElementRegistry' already has "${t}" defined. This may have been caused by live reload or hot module replacement in which case it can be safely ignored.\nMake sure to test your application with a production build as repeat registrations will throw in production.`)}e.__localName=t,this.__definitions.set(t,{ctor:e,observedAttributes:e.observedAttributes??[]})}get(t){const e=this.__definitions.get(t);return e?.ctor}},M=globalThis,P=M.ShadowRoot&&(void 0===M.ShadyCSS||M.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,C=Symbol(),j=new WeakMap;let N=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==C)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(P&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=j.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&j.set(e,t))}return t}toString(){return this.cssText}};const O=t=>new N("string"==typeof t?t:t+"",void 0,C),L=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,a)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[a+1]),t[0]);return new N(i,t,C)},R=(t,e)=>{P?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style"),a=M.litNonce;void 0!==a&&i.setAttribute("nonce",a),i.textContent=e.cssText,t.appendChild(i)}))},z=P||void 0===M.CSSStyleSheet?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return O(e)})(t):t
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */;var I,D;const U=globalThis;null!==(I=U.customElements)&&void 0!==I||(U.customElements=E);const B=U.trustedTypes,H=B?B.emptyScript:"",V=U.reactiveElementPolyfillSupport,F={toAttribute(t,e){switch(e){case Boolean:t=t?H:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},Y=(t,e)=>e!==t&&(e==e||t==t),K={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:Y},G="finalized";let W=class extends(globalThis.HTMLElement??T){constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const a=this._$Ep(i,e);void 0!==a&&(this._$Ev.set(a,i),t.push(a))})),t}static createProperty(t,e=K){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,a=this.getPropertyDescriptor(t,i,e);void 0!==a&&Object.defineProperty(this.prototype,t,a)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(a){const o=this[t];this[e]=a,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||K}static finalize(){if(this.hasOwnProperty(G))return!1;this[G]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(z(t))}else void 0!==t&&e.push(z(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return R(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=K){var a;const o=this.constructor._$Ep(t,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==(null===(a=i.converter)||void 0===a?void 0:a.toAttribute)?i.converter:F).toAttribute(e,i.type);this._$El=t,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(t,e){var i;const a=this.constructor,o=a._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=a.getPropertyOptions(o),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:F;this._$El=o,this[o]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let a=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||Y)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):a=!1),!this.isUpdatePending&&a&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var Z;W[G]=!0,W.elementProperties=new Map,W.elementStyles=[],W.shadowRootOptions={mode:"open"},null==V||V({ReactiveElement:W}),(null!==(D=U.reactiveElementVersions)&&void 0!==D?D:U.reactiveElementVersions=[]).push("1.6.3");const J=globalThis,Q=J.trustedTypes,q=Q?Q.createPolicy("lit-html",{createHTML:t=>t}):void 0,X="$lit$",tt=`lit$${(Math.random()+"").slice(9)}$`,et="?"+tt,it=`<${et}>`,at=void 0===J.document?{createTreeWalker:()=>({})}:document,ot=()=>at.createComment(""),nt=t=>null===t||"object"!=typeof t&&"function"!=typeof t,st=Array.isArray,rt="[ \t\n\f\r]",lt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,dt=/-->/g,ht=/>/g,pt=RegExp(`>|${rt}(?:([^\\s"'>=/]+)(${rt}*=${rt}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),ct=/'/g,mt=/"/g,gt=/^(?:script|style|textarea|title)$/i,yt=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),ut=Symbol.for("lit-noChange"),ft=Symbol.for("lit-nothing"),bt=new WeakMap,vt=at.createTreeWalker(at,129,null,!1);function wt(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==q?q.createHTML(e):e}const _t=(t,e)=>{const i=t.length-1,a=[];let o,n=2===e?"<svg>":"",s=lt;for(let e=0;e<i;e++){const i=t[e];let r,l,d=-1,h=0;for(;h<i.length&&(s.lastIndex=h,l=s.exec(i),null!==l);)h=s.lastIndex,s===lt?"!--"===l[1]?s=dt:void 0!==l[1]?s=ht:void 0!==l[2]?(gt.test(l[2])&&(o=RegExp("</"+l[2],"g")),s=pt):void 0!==l[3]&&(s=pt):s===pt?">"===l[0]?(s=null!=o?o:lt,d=-1):void 0===l[1]?d=-2:(d=s.lastIndex-l[2].length,r=l[1],s=void 0===l[3]?pt:'"'===l[3]?mt:ct):s===mt||s===ct?s=pt:s===dt||s===ht?s=lt:(s=pt,o=void 0);const p=s===pt&&t[e+1].startsWith("/>")?" ":"";n+=s===lt?i+it:d>=0?(a.push(r),i.slice(0,d)+X+i.slice(d)+tt+p):i+tt+(-2===d?(a.push(void 0),e):p)}return[wt(t,n+(t[i]||"<?>")+(2===e?"</svg>":"")),a]};class $t{constructor({strings:t,_$litType$:e},i){let a;this.parts=[];let o=0,n=0;const s=t.length-1,r=this.parts,[l,d]=_t(t,e);if(this.el=$t.createElement(l,i),vt.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(a=vt.nextNode())&&r.length<s;){if(1===a.nodeType){if(a.hasAttributes()){const t=[];for(const e of a.getAttributeNames())if(e.endsWith(X)||e.startsWith(tt)){const i=d[n++];if(t.push(e),void 0!==i){const t=a.getAttribute(i.toLowerCase()+X).split(tt),e=/([.?@])?(.*)/.exec(i);r.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?Tt:"?"===e[1]?Mt:"@"===e[1]?Pt:St})}else r.push({type:6,index:o})}for(const e of t)a.removeAttribute(e)}if(gt.test(a.tagName)){const t=a.textContent.split(tt),e=t.length-1;if(e>0){a.textContent=Q?Q.emptyScript:"";for(let i=0;i<e;i++)a.append(t[i],ot()),vt.nextNode(),r.push({type:2,index:++o});a.append(t[e],ot())}}}else if(8===a.nodeType)if(a.data===et)r.push({type:2,index:o});else{let t=-1;for(;-1!==(t=a.data.indexOf(tt,t+1));)r.push({type:7,index:o}),t+=tt.length-1}o++}}static createElement(t,e){const i=at.createElement("template");return i.innerHTML=t,i}}function kt(t,e,i=t,a){var o,n,s,r;if(e===ut)return e;let l=void 0!==a?null===(o=i._$Co)||void 0===o?void 0:o[a]:i._$Cl;const d=nt(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===d?l=void 0:(l=new d(t),l._$AT(t,i,a)),void 0!==a?(null!==(s=(r=i)._$Co)&&void 0!==s?s:r._$Co=[])[a]=l:i._$Cl=l),void 0!==l&&(e=kt(t,l._$AS(t,e.values),l,a)),e}class xt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:a}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:at).importNode(i,!0);vt.currentNode=o;let n=vt.nextNode(),s=0,r=0,l=a[0];for(;void 0!==l;){if(s===l.index){let e;2===l.type?e=new At(n,n.nextSibling,this,t):1===l.type?e=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(e=new Ct(n,this,t)),this._$AV.push(e),l=a[++r]}s!==(null==l?void 0:l.index)&&(n=vt.nextNode(),s++)}return vt.currentNode=at,o}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class At{constructor(t,e,i,a){var o;this.type=2,this._$AH=ft,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=a,this._$Cp=null===(o=null==a?void 0:a.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=kt(this,t,e),nt(t)?t===ft||null==t||""===t?(this._$AH!==ft&&this._$AR(),this._$AH=ft):t!==this._$AH&&t!==ut&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>st(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==ft&&nt(this._$AH)?this._$AA.nextSibling.data=t:this.$(at.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:a}=t,o="number"==typeof a?this._$AC(t):(void 0===a.el&&(a.el=$t.createElement(wt(a.h,a.h[0]),this.options)),a);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.v(i);else{const t=new xt(o,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=bt.get(t.strings);return void 0===e&&bt.set(t.strings,e=new $t(t)),e}T(t){st(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,a=0;for(const o of t)a===e.length?e.push(i=new At(this.k(ot()),this.k(ot()),this,this.options)):i=e[a],i._$AI(o),a++;a<e.length&&(this._$AR(i&&i._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class St{constructor(t,e,i,a,o){this.type=1,this._$AH=ft,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=ft}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,a){const o=this.strings;let n=!1;if(void 0===o)t=kt(this,t,e,0),n=!nt(t)||t!==this._$AH&&t!==ut,n&&(this._$AH=t);else{const a=t;let s,r;for(t=o[0],s=0;s<o.length-1;s++)r=kt(this,a[i+s],e,s),r===ut&&(r=this._$AH[s]),n||(n=!nt(r)||r!==this._$AH[s]),r===ft?t=ft:t!==ft&&(t+=(null!=r?r:"")+o[s+1]),this._$AH[s]=r}n&&!a&&this.j(t)}j(t){t===ft?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Tt extends St{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===ft?void 0:t}}const Et=Q?Q.emptyScript:"";class Mt extends St{constructor(){super(...arguments),this.type=4}j(t){t&&t!==ft?this.element.setAttribute(this.name,Et):this.element.removeAttribute(this.name)}}class Pt extends St{constructor(t,e,i,a,o){super(t,e,i,a,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=kt(this,t,e,0))&&void 0!==i?i:ft)===ut)return;const a=this._$AH,o=t===ft&&a!==ft||t.capture!==a.capture||t.once!==a.once||t.passive!==a.passive,n=t!==ft&&(a===ft||o);o&&this.element.removeEventListener(this.name,this,a),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class Ct{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){kt(this,t)}}const jt=J.litHtmlPolyfillSupport;null==jt||jt($t,At),(null!==(Z=J.litHtmlVersions)&&void 0!==Z?Z:J.litHtmlVersions=[]).push("2.8.0");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var Nt,Ot;class Lt extends W{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var a,o;const n=null!==(a=null==i?void 0:i.renderBefore)&&void 0!==a?a:e;let s=n._$litPart$;if(void 0===s){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=s=new At(e.insertBefore(ot(),t),t,void 0,null!=i?i:{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return ut}}Lt.finalized=!0,Lt._$litElement$=!0,null===(Nt=globalThis.litElementHydrateSupport)||void 0===Nt||Nt.call(globalThis,{LitElement:Lt});const Rt=globalThis.litElementPolyfillSupport;null==Rt||Rt({LitElement:Lt}),(null!==(Ot=globalThis.litElementVersions)&&void 0!==Ot?Ot:globalThis.litElementVersions=[]).push("3.3.3");const zt=O("var(--fds-size-6, 48px)"),It=O("var(--fds-radius-large, 8px)"),Dt=O("var(--fds-style-elevation-200, 0px 6px 6px 0px rgba(0, 0, 0, 0.23), 0px 3px 6px 0px rgba(0, 0, 0, 0.16))"),Ut=O("var(--fds-typography-body-default-font-family, 'Public Sans')"),Bt=O("var(--fds-typography-body-default-font-size, 16px)"),Ht=O("var(--fds-typography-body-default-letter-spacing, 0px)"),Vt=O("var(--fds-typography-body-default-line-height, 150%)"),Ft=O("var(--fds-typography-body-default-font-weight, 400)"),Yt=O("var(--fds-typography-body-default-display, inline-block)"),Kt=O("var(--fds-typography-body-large-font-family, 'Public Sans')"),Gt=O("var(--fds-typography-body-large-font-size, 18px)"),Wt=O("var(--fds-typography-body-large-letter-spacing, 0px)"),Zt=O("var(--fds-typography-body-large-line-height, 150%)"),Jt=O("var(--fds-typography-body-large-font-weight, 400)"),Qt=O("var(--fds-typography-body-large-display, inline-block)"),qt=O("var(--fds-typography-body-micro-font-family, 'Public Sans')"),Xt=O("var(--fds-typography-body-micro-font-size, 12px)"),te=O("var(--fds-typography-body-micro-letter-spacing, 0px)"),ee=O("var(--fds-typography-body-micro-line-height, 150%)"),ie=O("var(--fds-typography-body-micro-font-weight, 400)"),ae=O("var(--fds-typography-body-micro-display, inline-block)"),oe=O("var(--fds-typography-body-small-font-family, 'Public Sans')"),ne=O("var(--fds-typography-body-small-font-size, 14px)"),se=O("var(--fds-typography-body-small-letter-spacing, 0px)"),re=O("var(--fds-typography-body-small-line-height, 150%)"),le=O("var(--fds-typography-body-small-font-weight, 400)"),de=O("var(--fds-typography-body-small-display, inline-block)"),he=O("var(--fds-typography-emphasis-default-font-family, 'Public Sans')"),pe=O("var(--fds-typography-emphasis-default-font-size, 16px)"),ce=O("var(--fds-typography-emphasis-default-letter-spacing, 0px)"),me=O("var(--fds-typography-emphasis-default-line-height, 150%)"),ge=O("var(--fds-typography-emphasis-default-font-weight, 700)"),ye=O("var(--fds-typography-emphasis-default-display, inline-block)"),ue=O("var(--fds-typography-emphasis-large-font-family, 'Public Sans')"),fe=O("var(--fds-typography-emphasis-large-font-size, 18px)"),be=O("var(--fds-typography-emphasis-large-letter-spacing, 0px)"),ve=O("var(--fds-typography-emphasis-large-line-height, 150%)"),we=O("var(--fds-typography-emphasis-large-font-weight, 700)"),_e=O("var(--fds-typography-emphasis-large-display, inline-block)"),$e=O("var(--fds-typography-emphasis-micro-font-family, 'Public Sans')"),ke=O("var(--fds-typography-emphasis-micro-font-size, 12px)"),xe=O("var(--fds-typography-emphasis-micro-letter-spacing, 0px)"),Ae=O("var(--fds-typography-emphasis-micro-line-height, 150%)"),Se=O("var(--fds-typography-emphasis-micro-font-weight, 700)"),Te=O("var(--fds-typography-emphasis-micro-display, inline-block)"),Ee=O("var(--fds-typography-emphasis-small-font-family, 'Public Sans')"),Me=O("var(--fds-typography-emphasis-small-font-size, 14px)"),Pe=O("var(--fds-typography-emphasis-small-letter-spacing, 0px)"),Ce=O("var(--fds-typography-emphasis-small-line-height, 150%)"),je=O("var(--fds-typography-emphasis-small-font-weight, 700)"),Ne=O("var(--fds-typography-emphasis-small-display, inline-block)"),Oe=O("var(--fds-typography-heading-large-heading-3-font-family, 'Public Sans', 'PublicSans-Bold')"),Le=O("var(--fds-typography-heading-large-heading-3-font-size, 40px)"),Re=O("var(--fds-typography-heading-large-heading-3-letter-spacing, 0px)"),ze=O("var(--fds-typography-heading-large-heading-3-line-height, 110%)"),Ie=O("var(--fds-typography-heading-large-heading-3-font-weight, 700)"),De=O("var(--fds-typography-heading-large-heading-3-display, inline-block)"),Ue=O("var(--fds-typography-heading-large-heading-4-font-family, 'Public Sans', 'PublicSans-Bold')"),Be=O("var(--fds-typography-heading-large-heading-4-font-size, 32px)"),He=O("var(--fds-typography-heading-large-heading-4-letter-spacing, 0px)"),Ve=O("var(--fds-typography-heading-large-heading-4-line-height, 110%)"),Fe=O("var(--fds-typography-heading-large-heading-4-font-weight, 700)"),Ye=O("var(--fds-typography-heading-large-heading-4-display, inline-block)"),Ke=O("var(--fds-typography-heading-large-heading-5-font-family, 'Public Sans', 'PublicSans-Bold')"),Ge=O("var(--fds-typography-heading-large-heading-5-font-size, 28px)"),We=O("var(--fds-typography-heading-large-heading-5-letter-spacing, 0px)"),Ze=O("var(--fds-typography-heading-large-heading-5-line-height, 110%)"),Je=O("var(--fds-typography-heading-large-heading-5-font-weight, 700)"),Qe=O("var(--fds-typography-heading-large-heading-5-display, inline-block)"),qe=O("var(--fds-typography-heading-large-heading-6-font-family, 'Public Sans', 'PublicSans-Bold')"),Xe=O("var(--fds-typography-heading-large-heading-6-font-size, 20px)"),ti=O("var(--fds-typography-heading-large-heading-6-letter-spacing, 0px)"),ei=O("var(--fds-typography-heading-large-heading-6-line-height, 110%)"),ii=O("var(--fds-typography-heading-large-heading-6-font-weight, 700)"),ai=O("var(--fds-typography-heading-large-heading-6-display, inline-block)"),oi=O("var(--fds-typography-heading-large-heading-1-font-family, 'Public Sans', 'PublicSans-Bold')"),ni=O("var(--fds-typography-heading-large-heading-1-font-size, 64px)"),si=O("var(--fds-typography-heading-large-heading-1-letter-spacing, 0px)"),ri=O("var(--fds-typography-heading-large-heading-1-line-height, 110%)"),li=O("var(--fds-typography-heading-large-heading-1-font-weight, 700)"),di=O("var(--fds-typography-heading-large-heading-1-display, inline-block)"),hi=O("var(--fds-typography-heading-large-heading-2-font-family, 'Public Sans', 'PublicSans-Bold')"),pi=O("var(--fds-typography-heading-large-heading-2-font-size, 48px)"),ci=O("var(--fds-typography-heading-large-heading-2-letter-spacing, 0px)"),mi=O("var(--fds-typography-heading-large-heading-2-line-height, 110%)"),gi=O("var(--fds-typography-heading-large-heading-2-font-weight, 700)"),yi=O("var(--fds-typography-heading-large-heading-2-display, inline-block)"),ui=O("var(--fds-typography-heading-small-heading-1-font-family, 'Public Sans', 'PublicSans-Bold')"),fi=O("var(--fds-typography-heading-small-heading-1-font-size, 42px)"),bi=O("var(--fds-typography-heading-small-heading-1-letter-spacing, 0px)"),vi=O("var(--fds-typography-heading-small-heading-1-line-height, 110%)"),wi=O("var(--fds-typography-heading-small-heading-1-font-weight, 700)"),_i=O("var(--fds-typography-heading-small-heading-1-display, inline-block)"),$i=O("var(--fds-typography-heading-small-heading-2-font-family, 'Public Sans', 'PublicSans-Bold')"),ki=O("var(--fds-typography-heading-small-heading-2-font-size, 32px)"),xi=O("var(--fds-typography-heading-small-heading-2-letter-spacing, 0px)"),Ai=O("var(--fds-typography-heading-small-heading-2-line-height, 110%)"),Si=O("var(--fds-typography-heading-small-heading-2-font-weight, 700)"),Ti=O("var(--fds-typography-heading-small-heading-2-display, inline-block)"),Ei=O("var(--fds-typography-heading-small-heading-3-font-family, 'Public Sans', 'PublicSans-Bold')"),Mi=O("var(--fds-typography-heading-small-heading-3-font-size, 28px)"),Pi=O("var(--fds-typography-heading-small-heading-3-letter-spacing, 0px)"),Ci=O("var(--fds-typography-heading-small-heading-3-line-height, 110%)"),ji=O("var(--fds-typography-heading-small-heading-3-font-weight, 700)"),Ni=O("var(--fds-typography-heading-small-heading-3-display, inline-block)"),Oi=O("var(--fds-typography-heading-small-heading-4-font-family, 'Public Sans', 'PublicSans-Bold')"),Li=O("var(--fds-typography-heading-small-heading-4-font-size, 24px)"),Ri=O("var(--fds-typography-heading-small-heading-4-letter-spacing, 0px)"),zi=O("var(--fds-typography-heading-small-heading-4-line-height, 110%)"),Ii=O("var(--fds-typography-heading-small-heading-4-font-weight, 700)"),Di=O("var(--fds-typography-heading-small-heading-4-display, inline-block)"),Ui=O("var(--fds-typography-heading-small-heading-5-font-family, 'Public Sans', 'PublicSans-Bold')"),Bi=O("var(--fds-typography-heading-small-heading-5-font-size, 18px)"),Hi=O("var(--fds-typography-heading-small-heading-5-letter-spacing, 0px)"),Vi=O("var(--fds-typography-heading-small-heading-5-line-height, 110%)"),Fi=O("var(--fds-typography-heading-small-heading-5-font-weight, 700)"),Yi=O("var(--fds-typography-heading-small-heading-5-display, inline-block)"),Ki=O("var(--fds-typography-heading-small-heading-6-font-family, 'Public Sans', 'PublicSans-Bold')"),Gi=O("var(--fds-typography-heading-small-heading-6-font-size, 16px)"),Wi=O("var(--fds-typography-heading-small-heading-6-letter-spacing, 0px)"),Zi=O("var(--fds-typography-heading-small-heading-6-line-height, 110%)"),Ji=O("var(--fds-typography-heading-small-heading-6-font-weight, 700)"),Qi=O("var(--fds-typography-heading-small-heading-6-display, inline-block)"),qi=O("var(--fds-typography-link-large-font-family, 'Public Sans')"),Xi=O("var(--fds-typography-link-large-font-size, 18px)"),ta=O("var(--fds-typography-link-large-letter-spacing, 0px)"),ea=O("var(--fds-typography-link-large-line-height, 150%)"),ia=O("var(--fds-typography-link-large-font-weight, 400)"),aa=O("var(--fds-typography-link-large-text-decoration, underline)"),oa=O("var(--fds-typography-link-large-display, inline-block)"),na=O("var(--fds-typography-link-micro-font-family, 'Public Sans')"),sa=O("var(--fds-typography-link-micro-font-size, 12px)"),ra=O("var(--fds-typography-link-micro-letter-spacing, 0px)"),la=O("var(--fds-typography-link-micro-line-height, 150%)"),da=O("var(--fds-typography-link-micro-font-weight, 400)"),ha=O("var(--fds-typography-link-micro-text-decoration, underline)"),pa=O("var(--fds-typography-link-micro-display, inline-block)"),ca=O("var(--fds-typography-link-small-font-family, 'Public Sans')"),ma=O("var(--fds-typography-link-small-font-size, 14px)"),ga=O("var(--fds-typography-link-small-letter-spacing, 0px)"),ya=O("var(--fds-typography-link-small-line-height, 150%)"),ua=O("var(--fds-typography-link-small-font-weight, 400)"),fa=O("var(--fds-typography-link-small-text-decoration, underline)"),ba=O("var(--fds-typography-link-small-display, inline-block)"),va=O("var(--fds-typography-link-default-font-family, 'Public Sans')"),wa=O("var(--fds-typography-link-default-font-size, 16px)"),_a=O("var(--fds-typography-link-default-letter-spacing, 0px)"),$a=O("var(--fds-typography-link-default-line-height, 150%)"),ka=O("var(--fds-typography-link-default-font-weight, 400)"),xa=O("var(--fds-typography-link-default-text-decoration, underline)"),Aa=O("var(--fds-typography-link-default-display, inline-block)"),Sa=O("var(--fds-typography-ui-helper-font-family, 'Public Sans', 'PublicSans-Regular')"),Ta=O("var(--fds-typography-ui-helper-font-size, 15px)"),Ea=O("var(--fds-typography-ui-helper-letter-spacing, 0px)"),Ma=O("var(--fds-typography-ui-helper-line-height, 100%)"),Pa=O("var(--fds-typography-ui-helper-font-weight, 400)"),Ca=O("var(--fds-typography-ui-helper-display, inline-block)"),ja=O("var(--fds-typography-ui-id-font-family, 'Roboto Mono')"),Na=O("var(--fds-typography-ui-id-font-size, 13px)"),Oa=O("var(--fds-typography-ui-id-letter-spacing, 0px)"),La=O("var(--fds-typography-ui-id-line-height, 100%)"),Ra=O("var(--fds-typography-ui-id-font-weight, 700)"),za=O("var(--fds-typography-ui-id-display, inline-block)"),Ia=O("var(--fds-typography-ui-label-font-family, 'Public Sans', 'PublicSans-Medium')"),Da=O("var(--fds-typography-ui-label-font-size, 16px)"),Ua=O("var(--fds-typography-ui-label-letter-spacing, 0px)"),Ba=O("var(--fds-typography-ui-label-line-height, 22px)"),Ha=O("var(--fds-typography-ui-label-font-weight, 500)"),Va=O("var(--fds-typography-ui-label-display, inline-block)"),Fa=O("var(--fds-typography-ui-placeholder-font-family, 'Public Sans', 'PublicSans-Medium')"),Ya=O("var(--fds-typography-ui-placeholder-font-size, 16px)"),Ka=O("var(--fds-typography-ui-placeholder-letter-spacing, 0px)"),Ga=O("var(--fds-typography-ui-placeholder-line-height, 100%)"),Wa=O("var(--fds-typography-ui-placeholder-font-weight, 500)"),Za=O("var(--fds-typography-ui-placeholder-display, inline-block)"),Ja=O("var(--fds-typography-ui-tag-font-family, 'Public Sans', 'PublicSans-Bold')"),Qa=O("var(--fds-typography-ui-tag-font-size, 16px)"),qa=O("var(--fds-typography-ui-tag-letter-spacing, 0px)"),Xa=O("var(--fds-typography-ui-tag-line-height, 100%)"),to=O("var(--fds-typography-ui-tag-font-weight, 700)"),eo=O("var(--fds-typography-ui-tag-display, inline-block)"),io=O("var(--fds-color-brand-black, #000000)"),ao=O("var(--fds-color-brand-white, #ffffff)"),oo=O("var(--fds-color-danger-200, #e55636)"),no=O("var(--fds-color-danger-300, #b40000)"),so=O("var(--fds-color-danger-400, #720000)"),ro=O("var(--fds-color-interactive-100, #90cefe)"),lo=O("var(--fds-color-interactive-200, #1777f8)"),ho=O("var(--fds-color-neutral-50, #F6F6F6)"),po=O("var(--fds-color-neutral-100, #cdcdd7)"),co=O("var(--fds-color-neutral-200, #9696aa)"),mo=O("var(--fds-color-text-300, #9696aa)"),go=O("var(--fds-color-text-1000, #000000)");L`
  .body-default-text {
    display: ${Yt};
    font-family: ${Ut};
    font-size: ${Bt};
    font-weight: ${Ft};
    letter-spacing: ${Ht};
    line-height: ${Vt};
  }
`,L`
  .body-large-text {
    display: ${Qt};
    font-family: ${Kt};
    font-size: ${Gt};
    font-weight: ${Jt};
    letter-spacing: ${Wt};
    line-height: ${Zt};
  }
`,L`
  .body-micro-text {
    display: ${ae};
    font-family: ${qt};
    font-size: ${Xt};
    font-weight: ${ie};
    letter-spacing: ${te};
    line-height: ${ee};
  }
`,L`
  .body-small-text {
    display: ${de};
    font-family: ${oe};
    font-size: ${ne};
    font-weight: ${le};
    letter-spacing: ${se};
    line-height: ${re};
  }
`,L`
  .emphasis-default-text {
    display: ${ye};
    font-family: ${he};
    font-size: ${pe};
    font-weight: ${ge};
    letter-spacing: ${ce};
    line-height: ${me};
  }
`,L`
  .emphasis-large-text {
    display: ${_e};
    font-family: ${ue};
    font-size: ${fe};
    font-weight: ${we};
    letter-spacing: ${be};
    line-height: ${ve};
  }
`,L`
  .emphasis-micro-text {
    display: ${Te};
    font-family: ${$e};
    font-size: ${ke};
    font-weight: ${Se};
    letter-spacing: ${xe};
    line-height: ${Ae};
  }
`,L`
  .emphasis-small-text {
    display: ${Ne};
    font-family: ${Ee};
    font-size: ${Me};
    font-weight: ${je};
    letter-spacing: ${Pe};
    line-height: ${Ce};
  }
`,L`
  .heading-large-1-text {
    display: ${di};
    font-family: ${oi};
    font-size: ${ni};
    font-weight: ${li};
    letter-spacing: ${si};
    line-height: ${ri};
  }
`,L`
  .heading-large-2-text {
    display: ${yi};
    font-family: ${hi};
    font-size: ${pi};
    font-weight: ${gi};
    letter-spacing: ${ci};
    line-height: ${mi};
  }
`,L`
  .heading-large-3-text {
    display: ${De};
    font-family: ${Oe};
    font-size: ${Le};
    font-weight: ${Ie};
    letter-spacing: ${Re};
    line-height: ${ze};
  }
`,L`
  .heading-large-4-text {
    display: ${Ye};
    font-family: ${Ue};
    font-size: ${Be};
    font-weight: ${Fe};
    letter-spacing: ${He};
    line-height: ${Ve};
  }
`,L`
  .heading-large-5-text {
    display: ${Qe};
    font-family: ${Ke};
    font-size: ${Ge};
    font-weight: ${Je};
    letter-spacing: ${We};
    line-height: ${Ze};
  }
`,L`
  .heading-large-6-text {
    display: ${ai};
    font-family: ${qe};
    font-size: ${Xe};
    font-weight: ${ii};
    letter-spacing: ${ti};
    line-height: ${ei};
  }
`,L`
  .heading-small-1-text {
    display: ${_i};
    font-family: ${ui};
    font-size: ${fi};
    font-weight: ${wi};
    letter-spacing: ${bi};
    line-height: ${vi};
  }
`,L`
  .heading-small-2-text {
    display: ${Ti};
    font-family: ${$i};
    font-size: ${ki};
    font-weight: ${Si};
    letter-spacing: ${xi};
    line-height: ${Ai};
  }
`,L`
  .heading-small-3-text {
    display: ${Ni};
    font-family: ${Ei};
    font-size: ${Mi};
    font-weight: ${ji};
    letter-spacing: ${Pi};
    line-height: ${Ci};
  }
`,L`
  .heading-small-4-text {
    display: ${Di};
    font-family: ${Oi};
    font-size: ${Li};
    font-weight: ${Ii};
    letter-spacing: ${Ri};
    line-height: ${zi};
  }
`,L`
  .heading-small-5-text {
    display: ${Yi};
    font-family: ${Ui};
    font-size: ${Bi};
    font-weight: ${Fi};
    letter-spacing: ${Hi};
    line-height: ${Vi};
  }
`,L`
  .heading-small-6-text {
    display: ${Qi};
    font-family: ${Ki};
    font-size: ${Gi};
    font-weight: ${Ji};
    letter-spacing: ${Wi};
    line-height: ${Zi};
  }
`,L`
  .link-default-text {
    display: ${Aa};
    font-family: ${va};
    font-size: ${wa};
    font-weight: ${ka};
    letter-spacing: ${_a};
    line-height: ${$a};
    text-decoration: ${xa};
  }
`,L`
  .link-large-text {
    display: ${oa};
    font-family: ${qi};
    font-size: ${Xi};
    font-weight: ${ia};
    letter-spacing: ${ta};
    line-height: ${ea};
    text-decoration: ${aa};
  }
`,L`
  .link-micro-text {
    display: ${pa};
    font-family: ${na};
    font-size: ${sa};
    font-weight: ${da};
    letter-spacing: ${ra};
    line-height: ${la};
    text-decoration: ${ha};
  }
`,L`
  .link-small-text {
    display: ${ba};
    font-family: ${ca};
    font-size: ${ma};
    font-weight: ${ua};
    letter-spacing: ${ga};
    line-height: ${ya};
    text-decoration: ${fa};
  }
`,L`
  .ui-helper-text {
    display: ${Ca};
    font-family: ${Sa};
    font-size: ${Ta};
    font-weight: ${Pa};
    letter-spacing: ${Ea};
    line-height: ${Ma};
  }
`,L`
  .ui-id-text {
    display: ${za};
    font-family: ${ja};
    font-size: ${Na};
    font-weight: ${Ra};
    letter-spacing: ${Oa};
    line-height: ${La};
  }
`;const yo=L`
  .ui-label-text {
    display: ${Va};
    font-family: ${Ia};
    font-size: ${Da};
    font-weight: ${Ha};
    letter-spacing: ${Ua};
    line-height: ${Ba};
  }
`;L`
  .ui-placeholder-text {
    display: ${Za};
    font-family: ${Fa};
    font-size: ${Ya};
    font-weight: ${Wa};
    letter-spacing: ${Ka};
    line-height: ${Ga};
  }
`,L`
  .ui-tag-text {
    display: ${eo};
    font-family: ${Ja};
    font-size: ${Qa};
    font-weight: ${to};
    letter-spacing: ${qa};
    line-height: ${Xa};
  }
`
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */;const uo=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function fo(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):uo(t,e)
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */}function bo(t){return fo({...t,state:!0})}
/**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var vo;null===(vo=globalThis.HTMLSlotElement)||void 0===vo||vo.prototype.assignedElements;
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const wo=1;let _o=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const $o="important",ko=" !"+$o,xo=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends _o{constructor(t){var e;if(super(t),t.type!==wo||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,i)=>{const a=t[i];return null==a?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${a};`}),"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ht){this.ht=new Set;for(const t in e)this.ht.add(t);return this.render(e)}this.ht.forEach((t=>{null==e[t]&&(this.ht.delete(t),t.includes("-")?i.removeProperty(t):i[t]="")}));for(const t in e){const a=e[t];if(null!=a){this.ht.add(t);const e="string"==typeof a&&a.endsWith(ko);t.includes("-")||e?i.setProperty(t,e?a.slice(0,-11):a,e?$o:""):i[t]=a}}return ut}});var Ao,So,To=function(t,e,i,a){var o,n=arguments.length,s=n<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,a);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(s=(n<3?o(s):n>3?o(e,i,s):o(e,i))||s);return n>3&&s&&Object.defineProperty(e,i,s),s};!function(t){t.primary="primary",t.secondary="secondary"}(Ao||(Ao={})),function(t){t.left="left",t.right="right"}(So||(So={}));class Eo extends Lt{constructor(){super(...arguments),this.variant=Ao.primary,this.items=[],this.verticalMenuNavText="",this.verticalMenuThreshold=768,this._open=!1}connectedCallback(){super.connectedCallback(),R(this.shadowRoot,[Eo.cssVariables,yo,Eo.collapsedNavigationStyles,this.desktopStyles()])}render(){const t=this.items.filter((t=>t.position===So.right)),e=this.items.filter((t=>t.position!==So.right));return yt` <div class="navigation-wrapper">
      <div class="navigation navigation--${this.variant} ui-label-text">
        ${this.variant===Ao.primary?yt` <div class="navigation__header">
              <slot></slot>
            </div>`:ft}
        <ul class="navigation__body ${this._open?"navigation__open":""}">
          ${e.map((t=>this.renderItem(t))).concat(t.map(((t,e)=>this.renderItem(t,0===e?"item__first-right":""))))}
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
    </li>`}handleSelect(t){this.selected=t,this.dispatchEvent(new CustomEvent("select",{detail:t}))}desktopStyles(){return L`
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
          border-bottom: var(--element-vertical-padding--primary) solid ${ao};
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
    `}}Eo.cssVariables=L`
    :host {
      --element-vertical-padding--primary: 9px;
      --element-vertical-padding--secondary: 16px;
      --element-horizontal-padding--primary: 20px;
      --item-border-bottom-width--secondary: 3px;
    }
  `,Eo.collapsedNavigationStyles=L`
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
      background-color: ${io};
      color: ${ao};
    }

    .navigation--primary .item:hover {
      color: ${mo};
    }

    .navigation--primary .navigation__open .item--active .item__label:after {
      content: '';
      position: relative;
      align-self: center;
      height: 0;
      margin-left: auto;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-right: var(--element-vertical-padding--primary) solid ${ao};
    }

    .navigation--secondary {
      background-color: ${ao};
      border-bottom: 1px solid ${io};
    }

    .navigation--secondary .item {
      border-bottom: 1px solid ${po};
    }

    .navigation--secondary .item:hover {
      color: ${mo};
    }

    .navigation__open {
      height: auto;
      width: 100%;
      visibility: visible;
      opacity: 1;
      overflow-y: visible;
      margin-left: 0;
      margin-top: 0;

      border-top: 1px solid ${po};
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
      background-color: ${io};
      color: ${ao};
      padding: var(--element-vertical-padding--primary);
    }

    .navigation__button--primary:hover {
      color: ${mo};
    }

    .navigation__button--secondary {
      background-color: ${ao};
      color: ${io};
      padding: var(--element-vertical-padding--secondary);
    }

    .navigation__button--secondary:hover {
      color: ${mo};
    }

    .navigation__label {
      margin-right: 10px;
    }
  `,Eo.styles=[Eo.cssVariables,yo,Eo.collapsedNavigationStyles],To([fo()],Eo.prototype,"variant",void 0),To([fo()],Eo.prototype,"items",void 0),To([fo()],Eo.prototype,"selected",void 0),To([fo({attribute:"vertical-menu-nav-text"})],Eo.prototype,"verticalMenuNavText",void 0),To([fo({type:Number,attribute:"vertical-menu-threshold"})],Eo.prototype,"verticalMenuThreshold",void 0),To([bo()],Eo.prototype,"_open",void 0);
/**
     * @license lucide v0.473.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */
const Mo=(t,e,i=[])=>{const a=document.createElementNS("http://www.w3.org/2000/svg",t);return Object.keys(e).forEach((t=>{a.setAttribute(t,String(e[t]))})),i.length&&i.forEach((t=>{const e=Mo(...t);a.appendChild(e)})),a};
/**
     * @license lucide v0.473.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */
const Po={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};
/**
     * @license lucide v0.473.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */var Co=function(t,e,i,a){var o,n=arguments.length,s=n<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,a);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(s=(n<3?o(s):n>3?o(e,i,s):o(e,i))||s);return n>3&&s&&Object.defineProperty(e,i,s),s};const jo={"alert-circle":["svg",Po,[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]]],"alert-triangle":["svg",Po,[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]]],"chevron-down":["svg",Po,[["path",{d:"m6 9 6 6 6-6"}]]],"chevron-right":["svg",Po,[["path",{d:"m9 18 6-6-6-6"}]]],"chevron-up":["svg",Po,[["path",{d:"m18 15-6-6-6 6"}]]],menu:["svg",Po,[["line",{x1:"4",x2:"20",y1:"12",y2:"12"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18"}]]],pencil:["svg",Po,[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]]],plus:["svg",Po,[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]]],"plus-circle":["svg",Po,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M8 12h8"}],["path",{d:"M12 8v8"}]]],"trash-2":["svg",Po,[["path",{d:"M3 6h18"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17"}]]],x:["svg",Po,[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]]],settings:["svg",Po,[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"}],["circle",{cx:"12",cy:"12",r:"3"}]]],"check-circle":["svg",Po,[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335"}],["path",{d:"m9 11 3 3L22 4"}]]],"chevrons-left-right-ellipsis":["svg",Po,[["path",{d:"m18 8 4 4-4 4"}],["path",{d:"m6 8-4 4 4 4"}],["path",{d:"M8 12h.01"}],["path",{d:"M12 12h.01"}],["path",{d:"M16 12h.01"}]]]};class No extends Lt{constructor(){super(...arguments),this.size=t}render(){if(!this.icon||!jo[this.icon])return console.error(`invalid icon: '${this.icon}'`),null;const t=(([t,e,i])=>Mo(t,e,i))(jo[this.icon]);return t.setAttribute("width",this.size.value),t.setAttribute("height",this.size.value),t}}No.styles=L`
    :host {
      display: inline-flex;
    }
  `,Co([fo()],No.prototype,"size",void 0),Co([fo()],No.prototype,"icon",void 0),customElements.define("fds-icon",No),customElements.define("fds-navigation",Eo);const Oo={initialize:function(){const t={label:"Digitraffic",value:"digitraffic",url:"https://www.digitraffic.fi/"},e=[{label:"Liikennetilanne",value:"liikennetilanne",url:"https://liikennetilanne.fintraffic.fi/"},{label:"Palauteväylä",value:"palautevayla",url:"https://www.palautevayla.fi/aspa?lang=fi"},{label:"Junalähdöt",value:"junalahdot",url:"https://junalahdot.fintraffic.fi/"},{label:"Drone-palvelut",value:"dronepalvelut",url:"https://skynavx.fi/#/drone"},t,{label:"Digitransit",value:"digitransit",url:"https://digitransit.fi/"},{label:"Reittiopas",value:"reittiopas",url:"https://opas.matka.fi/"},{label:"NAP",value:"nap",url:"https://finap.fi/#/"}];customElements.whenDefined("fds-navigation").then((()=>{const i=document.createElement("fds-navigation");i.setAttribute("vertical-menu-threshold","1225"),i.innerHTML='\n      <a href="https://www.fintraffic.fi/fi">\n              <svg viewBox="0 0 253 42" style="height: 18px">\n                  <use href="/assets/fintraffic_horizontal_white.svg#fintraffic_horizontal_white"></use>\n              </svg>\n          </a>';i.variant=Ao.primary,i.items=e,i.selected=t,i.verticalMenuNavText="Services",i.addEventListener("select",(e=>{const i=e.detail;window.open(i.url,"_blank"),e.target instanceof Eo&&(e.target.selected=t)})),this.el.replaceWith(i)}))}};function Lo(){$.proxyAll(this,/^_/)}ckan.module("digitraffic_theme_top_navigation",Oo);const Ro=()=>({initialize(){Lo.apply(this),this._getMenuController().on("click",this._onMenuControllerClick),this._getMenuController().on("keydown",this._onMenuControllerKeyDown),this._getMenu().on("keydown",this._onMenuKeyDown)},_onMenuControllerClick(t){this._getMenuController().has(t.target)&&this._toggleList()},_onMenuControllerKeyDown(t){if(this._getMenuController().has(t.target)){const{key:e}=t;switch(e){case" ":case"Enter":t.preventDefault(),this._toggleList();break;case"ArrowDown":t.preventDefault(),this._focus("first")}}},_onMenuKeyDown(t){if(this._getMenuController().is(":visible")&&this._getMenu().has(t.target)){const{key:e}=t;switch(e){case"Escape":t.preventDefault(),this._closeList(),this._focus("menuController");break;case"ArrowDown":$(t.target).is("select")||(t.preventDefault(),this._focus("next"));break;case"ArrowUp":$(t.target).is("select")||(t.preventDefault(),this._focus("previous"))}}},_expandedClass:"expanded",_focus(t){let e;const i=this.el.find(":focus")[0],a=!!i&&!!this._getMenu().has(i),o=a&&this._getMenu().find("a:last")[0]===i,n=a&&this._getMenu().find("a:first")[0]===i;switch(t){case"first":e=this._getMenu().find("a:first");break;case"menuController":e=this._getMenuController();break;case"next":if(a){if(o)return;{const t=this._getMenu().find("a");e=t.filter((e=>e>0&&t[e-1]===i))}}else e=this._getMenu().find("a:first");break;case"previous":if(a){if(n)return;{const t=this._getMenu().find("a");e=t.filter((e=>e<t.length-1&&t[e+1]===i))}}else e=this._getMenu().find("a:first")}e.trigger("focus")},_toggleList(){this._isMenuOpen()?(this._closeList(),this._focus("menuController")):(this._openList(),this._focus("first"))},_isMenuOpen(){return this._getMenu().hasClass(this._expandedClass)},_closeList(){const t=this._getMenuController();this._getMenu().removeClass(this._expandedClass),t.attr("aria-expanded","false")},_openList(){const t=this._getMenuController();this._getMenu().addClass(this._expandedClass),t.attr("aria-expanded","true")},_getMenuController(){throw Error("No controller")},_getMenu(){throw Error("No menu")}}),zo={...Ro(),_getMenuController:()=>$("#app-nav-hamburger-button"),_getMenu:()=>$("#nav-interactions-wrapper")};ckan.module("digitraffic_theme_app_navigation",zo);const Io={...Ro(),_getMenuController:()=>$("#user-action-select"),_getMenu:()=>$("#user-action-list")};ckan.module("digitraffic_theme_user_actions",Io);const Do={"https://w3id.org/mobilitydcat-ap/mobility-theme/air-and-space-travel":[],"https://w3id.org/mobilitydcat-ap/mobility-theme/cycle-network-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/network-closures-diversions","https://w3id.org/mobilitydcat-ap/mobility-theme/network-detailed-attributes","https://w3id.org/mobilitydcat-ap/mobility-theme/network-geometry-and-lane-character"],"https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-traffic-signs-and-regulations":["https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-closures-and-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/direction-of-travel-on-reversible-lanes","https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-overtaking-bans-on-heavy-goods-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-speed-limits","https://w3id.org/mobilitydcat-ap/mobility-theme/lane-closures-and-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/other-access-restrictions-and-traffic-regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/other-temporary-traffic-management-measures-or-plans","https://w3id.org/mobilitydcat-ap/mobility-theme/road-closures-and-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-closures-and-access-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/filling-and-charging-stations":["https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-charging-points-for-electric-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-filling-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-charging-points","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-filling-stations"],"https://w3id.org/mobilitydcat-ap/mobility-theme/freight-and-logistics":["https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-delivery-areas","https://w3id.org/mobilitydcat-ap/mobility-theme/freight-delivery-regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-delivery-areas"],"https://w3id.org/mobilitydcat-ap/mobility-theme/general-information-for-trip-planning-":["https://w3id.org/mobilitydcat-ap/mobility-theme/address-identifiers","https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-costs","https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-environmental-factors","https://w3id.org/mobilitydcat-ap/mobility-theme/points-of-interest","https://w3id.org/mobilitydcat-ap/mobility-theme/topographic-places"],"https://w3id.org/mobilitydcat-ap/mobility-theme/other":[],"https://w3id.org/mobilitydcat-ap/mobility-theme/parking-service-and-rest-area-information":["https://w3id.org/mobilitydcat-ap/mobility-theme/bike-parking-locations","https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-locations-and-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/park-and-ride-stops","https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-locations-and-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-locations-and-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-accessibility-facilities","https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-geometry"],"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-non-scheduled-transport":["https://w3id.org/mobilitydcat-ap/mobility-theme/accesibility-information-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/fares","https://w3id.org/mobilitydcat-ap/mobility-theme/locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/provider-data","https://w3id.org/mobilitydcat-ap/mobility-theme/reservation-and-purchase-options","https://w3id.org/mobilitydcat-ap/mobility-theme/service-areas-and-service-times"],"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-scheduled-transport":["https://w3id.org/mobilitydcat-ap/mobility-theme/basic-commercial-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/basic-common-standard-fares","https://w3id.org/mobilitydcat-ap/mobility-theme/common-fare-products","https://w3id.org/mobilitydcat-ap/mobility-theme/connection-links","https://w3id.org/mobilitydcat-ap/mobility-theme/disruptions-delays-cancellations","https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/hours-of-operation","https://w3id.org/mobilitydcat-ap/mobility-theme/network-topology-and-routes-lines","https://w3id.org/mobilitydcat-ap/mobility-theme/operational-calendar","https://w3id.org/mobilitydcat-ap/mobility-theme/passenger-classes","https://w3id.org/mobilitydcat-ap/mobility-theme/planned-interchanges-between-scheduled-services","https://w3id.org/mobilitydcat-ap/mobility-theme/purchase-information","https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-estimated-departure-and-arrival-times","https://w3id.org/mobilitydcat-ap/mobility-theme/special-fare-products","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-accessibility-and-paths-within-facility","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-geometry-and-map-layout","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-location-and-features","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-status-of-features","https://w3id.org/mobilitydcat-ap/mobility-theme/timetables-static","https://w3id.org/mobilitydcat-ap/mobility-theme/transport-operators","https://w3id.org/mobilitydcat-ap/mobility-theme/vehicle-details"],"https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-traffic-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/current-travel-times","https://w3id.org/mobilitydcat-ap/mobility-theme/expected-delays","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-length-of-queues","https://w3id.org/mobilitydcat-ap/mobility-theme/predicted-travel-times","https://w3id.org/mobilitydcat-ap/mobility-theme/speed","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-data-at-border-crossings-to-third-countries","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-volume","https://w3id.org/mobilitydcat-ap/mobility-theme/waiting-time-at-border-crossings-to-non-eu-member-states"],"https://w3id.org/mobilitydcat-ap/mobility-theme/road-events-and-conditions":["https://w3id.org/mobilitydcat-ap/mobility-theme/accidents-and-incidents","https://w3id.org/mobilitydcat-ap/mobility-theme/poor-road-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/road-weather-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/road-work-information":["https://w3id.org/mobilitydcat-ap/mobility-theme/long-term-road-works","https://w3id.org/mobilitydcat-ap/mobility-theme/short-term-road-works"],"https://w3id.org/mobilitydcat-ap/mobility-theme/sharing-and-hiring-services":["https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods"],"https://w3id.org/mobilitydcat-ap/mobility-theme/static-road-network-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/geometry","https://w3id.org/mobilitydcat-ap/mobility-theme/gradients","https://w3id.org/mobilitydcat-ap/mobility-theme/junctions","https://w3id.org/mobilitydcat-ap/mobility-theme/number-of-lanes","https://w3id.org/mobilitydcat-ap/mobility-theme/road-classification","https://w3id.org/mobilitydcat-ap/mobility-theme/road-width"],"https://w3id.org/mobilitydcat-ap/mobility-theme/static-traffic-signs-and-regulations":["https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/other-static-traffic-signs","https://w3id.org/mobilitydcat-ap/mobility-theme/other-traffic-regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/permanent-access-restrictions","https://w3id.org/mobilitydcat-ap/mobility-theme/speed-limits","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-circulation-plans","https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-access-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/toll-information":["https://w3id.org/mobilitydcat-ap/mobility-theme/applicable-road-user-charges-and-payment-methods","https://w3id.org/mobilitydcat-ap/mobility-theme/identification-of-tolled-roads","https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-tolling-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods-for-tolls"],"https://w3id.org/mobilitydcat-ap/mobility-theme/waterways-and-water-bodies":[]},Uo=new Set(Object.keys(Do)),Bo=new Set(Object.values(Do).flat()),Ho={"https://w3id.org/mobilitydcat-ap/mobility-theme/accesibility-information-for-vehicles":{en:"Accesibility information for vehicles",fi:"Ajoneuvojen esteettömyystiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/accidents-and-incidents":{en:"Accidents and incidents",fi:"Liikenneonnettomuudet ja -häiriöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/address-identifiers":{en:"Address identifiers",fi:"Osoitetunnisteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/air-and-space-travel":{en:"Air and space travel",fi:"Ilma- ja avaruusmatkailu"},"https://w3id.org/mobilitydcat-ap/mobility-theme/applicable-road-user-charges-and-payment-methods":{en:"Applicable road user charges and payment methods",fi:"Sovellettavat tienkäyttömaksut ja maksutavat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-charging-points-for-electric-vehicles":{en:"Availability of charging points for electric vehicles",fi:"Sähköajoneuvojen latauspisteiden saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-delivery-areas":{en:"Availability of delivery areas",fi:"Lastaus- ja purkauspaikkojen saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-filling-stations":{en:"Availability of filling stations",fi:"Tankkausasemien saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/basic-commercial-conditions":{en:"Basic commercial conditions",fi:"Kaupalliset perusehdot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/basic-common-standard-fares":{en:"Basic common standard fares",fi:"Yleiset perusmaksut"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-availability":{en:"Bike-hiring Availability",fi:"Vuokrapyörien saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-stations":{en:"Bike-hiring Stations",fi:"Pyöränvuokrausasemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-parking-locations":{en:"Bike-parking locations",fi:"Polkupyöräparkit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-availability":{en:"Bike sharing Availability",fi:"Kaupunkipyörien saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-locations-and-stations":{en:"Bike-sharing Locations and stations",fi:"Kaupunkipyörien sijainnit ja asemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-access-conditions":{en:"Bridge access conditions",fi:"Siltojen käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-closures-and-access-conditions":{en:"Bridge closures and access conditions",fi:"Siltojen sulkemiset ja käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-availability":{en:"Car-hiring Availability",fi:"Autonvuokrauksen saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-stations":{en:"Car-hiring Stations",fi:"Autonvuokrausasemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-availability":{en:"Car parking availability",fi:"Autojen pysäköinnin saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-locations-and-conditions":{en:"Car parking locations and conditions",fi:"Autojen pysäköintipaikat ja -olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-availability":{en:"Car-sharing Availability",fi:"Yhteiskäyttöautojen saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-locations-and-stations":{en:"Car-sharing Locations and stations",fi:"Yhteiskäyttöautojen sijainnit ja asemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/common-fare-products":{en:"Common fare products",fi:"Yleiset lipputuotteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/connection-links":{en:"Connection links",fi:"Vaihtoyhteydet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/current-travel-times":{en:"Current travel times",fi:"Ajankohtaiset matka-ajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/cycle-network-data":{en:"Cycle network data",fi:"Pyöräilyverkon tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/direction-of-travel-on-reversible-lanes":{en:"Direction of travel on reversible lanes",fi:"Vaihtuvasuuntaisten kaistojen ajosuunta"},"https://w3id.org/mobilitydcat-ap/mobility-theme/disruptions-delays-cancellations":{en:"Disruptions, delays, cancellations",fi:"Häiriöt, viivästykset, peruutukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-overtaking-bans-on-heavy-goods-vehicles":{en:"Dynamic overtaking bans on heavy goods vehicles",fi:"Dynaamiset raskaiden ajoneuvojen ohituskiellot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-speed-limits":{en:"Dynamic speed limits",fi:"Dynaamiset nopeusrajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-traffic-signs-and-regulations":{en:"Dynamic traffic signs and regulations",fi:"Dynaamiset liikennemerkit ja -säännöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-availability":{en:"E-scooter-sharing Availability",fi:"Yhteiskäyttöisten sähköpotkulautojen saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-locations-and-stations":{en:"E-scooter-sharing Locations and stations",fi:"Yhteiskäyttöisten sähköpotkulautojen sijainnit ja asemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles":{en:"Environmental standards for vehicles",fi:"Ajoneuvojen ympäristöstandardit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/expected-delays":{en:"Expected delays",fi:"Tiedossa olevat viivästykset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/fares":{en:"Fares",fi:"Maksut ja tariffit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/filling-and-charging-stations":{en:"Filling and charging stations",fi:"Tankkaus- ja latausasemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/freight-and-logistics":{en:"Freight and logistics",fi:"Rahti ja logistiikka"},"https://w3id.org/mobilitydcat-ap/mobility-theme/freight-delivery-regulations":{en:"Freight delivery regulations",fi:"Rahdinkuljetusmääräykset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/general-information-for-trip-planning-":{en:"General information for trip-planning",fi:"Yleistä tietoa reittisuunnitteluun"},"https://w3id.org/mobilitydcat-ap/mobility-theme/geometry":{en:"Geometry",fi:"Geometria"},"https://w3id.org/mobilitydcat-ap/mobility-theme/gradients":{en:"Gradients",fi:"Kaltevuudet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/hours-of-operation":{en:"Hours of operation",fi:"Käyttöajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/identification-of-tolled-roads":{en:"Identification of tolled roads",fi:"Tietullin alaisten teiden yksilöiminen"},"https://w3id.org/mobilitydcat-ap/mobility-theme/junctions":{en:"Junctions",fi:"Liittymät"},"https://w3id.org/mobilitydcat-ap/mobility-theme/lane-closures-and-access-conditions":{en:"Lane closures and access conditions",fi:"Kaistojen sulkemiset ja käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-charging-points":{en:"Location and conditions of charging points",fi:"Latauspisteiden sijainnit ja olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-filling-stations":{en:"Location and conditions of filling stations",fi:"Tankkausasemien sijainnit ja olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-length-of-queues":{en:"Location and length of queues",fi:"Jonojen sijainti ja pituus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-delivery-areas":{en:"Location of delivery areas",fi:"Lastaus- ja purkausalueiden sijainti"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-tolling-stations":{en:"Location of tolling stations",fi:"Tietulliasemien sijainti"},"https://w3id.org/mobilitydcat-ap/mobility-theme/locations-and-stations":{en:"Locations and stations",fi:"Sijainnit ja asemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/long-term-road-works":{en:"Long-term road works",fi:"Pitkäaikaiset tietyöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/network-closures-diversions":{en:"Network closures/diversions",fi:"Verkon suljetut osat ja/tai kiertotiet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/network-detailed-attributes":{en:"Network detailed attributes",fi:"Verkon yksityiskohtaiset tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/network-geometry-and-lane-character":{en:"Network geometry and lane character",fi:"Verkkogeometria ja kaistojen luonne"},"https://w3id.org/mobilitydcat-ap/mobility-theme/network-topology-and-routes-lines":{en:"Network topology and routes/lines",fi:"Verkkotopologia ja reitit/linjat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/number-of-lanes":{en:"Number of lanes",fi:"Kaistojen määrä"},"https://w3id.org/mobilitydcat-ap/mobility-theme/operational-calendar":{en:"Operational Calendar",fi:"Operatiivinen kalenteri"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other":{en:"Other",fi:"Muu"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other-access-restrictions-and-traffic-regulations":{en:"Other access restrictions and traffic regulations",fi:"Muut käyttörajoitukset ja liikennesäännöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other-static-traffic-signs":{en:"Other static traffic signs",fi:"Muut staattiset liikennemerkit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other-temporary-traffic-management-measures-or-plans":{en:"Other temporary traffic management measures or plans",fi:"Muut tilapäiset liikenteenhallintatoimenpiteet tai -suunnitelmat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other-traffic-regulations":{en:"Other traffic regulations",fi:"Muut liikennesäännöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-costs":{en:"Parameters needed to calculate costs",fi:"Kustannusten laskemiseen tarvittavat parametrit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-environmental-factors":{en:"Parameters needed to calculate environmental factors",fi:"Ympäristötekijöiden laskemiseen tarvittavat parametrit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/park-and-ride-stops":{en:"Park and Ride stops",fi:"Julkisen liikenteen liityntäpysäköinti"},"https://w3id.org/mobilitydcat-ap/mobility-theme/parking-service-and-rest-area-information":{en:"Parking, service and rest area information",fi:"Pysäköinti-, palvelu- ja levähdysalueiden tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/passenger-classes":{en:"Passenger classes",fi:"Matkustajaluokat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods":{en:"Payment methods",fi:"Maksutavat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods-for-tolls":{en:"Payment methods for tolls",fi:"Tietullien maksutavat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-accessibility-facilities":{en:"Pedestrian accessibility facilities",fi:"Jalankulkijoiden esteettömyyttä tukevat välineet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-data":{en:"Pedestrian network data",fi:"Jalankulkuverkon tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-geometry":{en:"Pedestrian network geometry",fi:"Jalankulkuverkon geometria"},"https://w3id.org/mobilitydcat-ap/mobility-theme/permanent-access-restrictions":{en:"Permanent access restrictions",fi:"Pysyvät käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/planned-interchanges-between-scheduled-services":{en:"Planned interchanges between scheduled services",fi:"Suunnitellut vaihdot säännöllisten palvelujen välillä"},"https://w3id.org/mobilitydcat-ap/mobility-theme/points-of-interest":{en:"Points of interest",fi:"Kohdepisteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/poor-road-conditions":{en:"Poor road conditions",fi:"Huonokuntoiset tiet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/predicted-travel-times":{en:"Predicted travel times",fi:"Ennustetut matka-ajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/provider-data":{en:"Provider data",fi:"Palveluntarjoajan tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-non-scheduled-transport":{en:"Public transport non-scheduled transport",fi:"Joukkoliikenne, aikatauluttamaton"},"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-scheduled-transport":{en:"Public transport scheduled transport",fi:"Joukkoliikenne, säännöllinen"},"https://w3id.org/mobilitydcat-ap/mobility-theme/purchase-information":{en:"Purchase information",fi:"Ostotiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-estimated-departure-and-arrival-times":{en:"Real-time estimated departure and arrival times",fi:"Reaaliaikaiset arvioidut lähtö- ja saapumisajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-traffic-data":{en:"Real-time traffic data",fi:"Reaaliaikaiset liikennetiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/reservation-and-purchase-options":{en:"Reservation and purchase options",fi:"Varaus- ja ostovaihtoehdot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-classification":{en:"Road classification",fi:"Tien luokitus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-closures-and-access-conditions":{en:"Road closures and access conditions",fi:"Teiden sulkemiset ja käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-events-and-conditions":{en:"Road events and conditions",fi:"Tieolosuhteet ja tapahtumat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-weather-conditions":{en:"Road weather conditions",fi:"Tieolosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-width":{en:"Road width",fi:"Teiden leveys"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-work-information":{en:"Road work information",fi:"Tietyötiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-availability":{en:"Service and rest area availability",fi:"Palvelu- ja levähdysalueiden saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-locations-and-conditions":{en:"Service and rest area locations and conditions",fi:"Palvelu- ja levähdysalueiden sijainnit ja olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/service-areas-and-service-times":{en:"Service areas and service times",fi:"Palvelualueet ja palveluajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/sharing-and-hiring-services":{en:"Sharing and Hiring Services",fi:"Vuokraus- ja yhteiskäyttöpalvelut"},"https://w3id.org/mobilitydcat-ap/mobility-theme/short-term-road-works":{en:"Short-term road works",fi:"Lyhytaikaiset tietyöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/special-fare-products":{en:"Special Fare Products",fi:"Erikoismaksutuotteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/speed":{en:"Speed",fi:"Nopeus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/speed-limits":{en:"Speed limits",fi:"Nopeusrajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/static-road-network-data":{en:"Static road network data",fi:"Staattiset tieverkon tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/static-traffic-signs-and-regulations":{en:"Static traffic signs and regulations",fi:"Staattiset liikennemerkit ja -säännöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-accessibility-and-paths-within-facility":{en:"Stop facilities accessibility and paths within facility",fi:"Pysäkkipalveluiden esteettömyys ja reitit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-geometry-and-map-layout":{en:"Stop facilities geometry and map layout",fi:"Pysäkkipalveluiden geometria ja kartta"},"https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-location-and-features":{en:"Stop facilities location and features",fi:"Pysäkkipalveluiden sijainti ja ominaisuudet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-status-of-features":{en:"Stop facilities status of features",fi:"Pysäkkipalveluiden ominaisuuksien tila"},"https://w3id.org/mobilitydcat-ap/mobility-theme/timetables-static":{en:"Timetables static",fi:"Aikataulut, staattiset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/toll-information":{en:"Toll information",fi:"Tietullitiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/topographic-places":{en:"Topographic places",fi:"Topografiset paikat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-circulation-plans":{en:"Traffic circulation plans",fi:"Liikennevirtasuunnitelmat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-data-at-border-crossings-to-third-countries":{en:"Traffic data at border crossings to third countries",fi:"Liikennetiedot rajanylityspaikoilla kolmansiin maihin"},"https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-volume":{en:"Traffic volume",fi:"Liikenteen määrä"},"https://w3id.org/mobilitydcat-ap/mobility-theme/transport-operators":{en:"Transport operators",fi:"Liikenteenharjoittajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-availability":{en:"Truck parking availability",fi:"Kuorma-autopysäköinnin saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-locations-and-conditions":{en:"Truck parking locations and conditions",fi:"Kuorma-autojen pysäköintipaikat ja -olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-access-conditions":{en:"Tunnel access conditions",fi:"Tunneleiden käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-closures-and-access-conditions":{en:"Tunnel closures and access conditions",fi:"Tunneleiden sulkemiset ja käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/vehicle-details":{en:"Vehicle details",fi:"Ajoneuvojen tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/waiting-time-at-border-crossings-to-non-eu-member-states":{en:"Waiting time at border crossings to non-EU Member States",fi:"Odotusaika rajanylityspaikoilla EU:n ulkopuolisiin maihin"},"https://w3id.org/mobilitydcat-ap/mobility-theme/waterways-and-water-bodies":{en:"Waterways and water bodies",fi:"Vesiväylät ja vesistöt"}};function Vo(t){return"string"==typeof t&&Uo.has(t)}const Fo={state:{},initialize(){Lo.apply(this),this.state={topMobilityTheme:this._getInitialMobilityTheme()};this._getTopMobilityThemeSelector().on("change",this._onTopMobilityThemeChanged),this._onStateUpdate(this._handleTopMobilityThemeChanged),this._subThemeSelectorViewUpdate(void 0,this.state)},teardown:function(){this._stateListeners=void 0},_getInitialMobilityTheme(){const t=this._getTopMobilityThemeSelector().val();return Vo(t)?t:void 0},_getInitialSubMobilityTheme(){const t=this._getInitialSubMobilityThemeSelector().val();return"string"==typeof(e=t)&&Bo.has(e)?t:void 0;var e},_getTopMobilityThemeSelector(){return this.$("#field-mobility_theme")},_getInitialSubMobilityThemeSelector(){return this.$("#mobility_theme_sub_value")},_getSubMobilityThemeSelector(){return this.$("#field-mobility_theme_sub")},_onTopMobilityThemeChanged(t){if(t.target instanceof HTMLSelectElement){const e=t.target.value;if(!Vo(e))throw new Error(`Invalid mobility theme: ${e}`);this._mergeState({topMobilityTheme:e})}},_stateChangedKeys(t,e){const i=new Set;for(const a in t)a in e?t[a]!==e[a]&&i.add(a):i.add(a);for(const a in e)a in t||i.add(a);return i},_triggerListeners(t,e){if(this._stateListeners)for(const i of this._stateListeners)i(t,e)},_updateState(t){const e=this.state;this.state=t;const i=this._stateChangedKeys(e,t);return this._triggerListeners(e,i),t},_mergeState(t){const e=this.state,i={...this.state,...t};this.state=i;const a=this._stateChangedKeys(e,i);return this._triggerListeners(e,a),i},_onStateUpdate(t){return this._stateListeners?this._stateListeners.push(t):this._stateListeners=[t],()=>{this._stateListeners&&(this._stateListeners=this._stateListeners.filter((e=>e!==t)))}},_handleTopMobilityThemeChanged(t,e){e.has("topMobilityTheme")&&this._subThemeSelectorViewUpdate(t,this.state)},_subThemeSelectorViewUpdate(t,e){function i(t){return"object"==typeof t&&!!t.subMobilityThemeSelectorParent&&!!t.subMobilityThemeSelector}function a(){const t=this._getSubMobilityThemeSelector().parentsUntil("form").filter("div.form-group");"none"!==t.css("display")?t.css("display","none"):t.css("display","")}const o=void 0===t,n=t?.topMobilityTheme!==e.topMobilityTheme;if(o||n){if(e.topMobilityTheme){const t=Do[e.topMobilityTheme].map((t=>t)),o=this._getInitialSubMobilityTheme();if(t?.length>0){(function(){if(i(e)){e.subMobilityThemeSelectorParent.append(e.subMobilityThemeSelector),a.apply(this);const t={...e},i=new Set(["subMobilityThemeSelector","subMobilityThemeSelectorParent"]),o=Object.keys(t).reduce(((e,a)=>(i.has(a)||(e[a]=t[a]),e)),{});this._updateState(o)}}).apply(this);const n=function(t,e){const i=t.map((t=>{const i=document.createElement("option");i.value=t;const a=$("html").attr("lang")??"en";return i.text=Ho[t][a]??Ho[t].en,t===e&&(i.selected=!0),i})),a=document.createElement("option");return a.value="",a.text="",e||(a.selected=!0),i.unshift(a),i.sort(((t,e)=>t.text.localeCompare(e.text))),i}.apply(this,[t,o]);return void function(t){this._getSubMobilityThemeSelector().empty().append(t)}.apply(this,[n])}}(function(){if(!i(e)){a.apply(this);const t=this._getSubMobilityThemeSelector().parent(),e=this._getSubMobilityThemeSelector().detach();this._mergeState({subMobilityThemeSelector:e,subMobilityThemeSelectorParent:t})}}).apply(this)}}};ckan.module("digitraffic_theme_dataset_form_wrapper",Fo);const Yo={initialize(){Lo.apply(this)}};ckan.module("digitraffic_theme_iri_fragment_inputs",Yo);const Ko={initialize(){Lo.apply(this);const t=this._getForm(),e=this._getFormInput(),i=this._getLanguageDropdown(),a=this._getLanguageOptions();i.on("click",this._toggleLanguageDropdownMouseOpen),i.on("keydown",this._toggleLanguageDropdownKeyboardOpen),a.each(((i,a)=>{const o=$(a);o.on("click",(()=>this._submitFormMouse(o,e,t))),o.on("keydown",(i=>this._submitFormKeyboard(i,o,e,t)))}))},_toggleLanguageDropdownMouseOpen(t){t.target&&t.target.classList.toggle("open")},_toggleLanguageDropdownKeyboardOpen(t){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),t.target&&t.target.classList.toggle("open"))},_submitFormMouse(t,e,i){const a=t.attr("data-value");e&&a&&e.val(a),i&&i.trigger("submit")},_submitFormKeyboard(t,e,i,a){if("Enter"===t.key||" "===t.key){const t=e.attr("data-value");i&&t&&i.val(t),a&&a.trigger("submit")}},_getForm(){return this.$("#language-menu-form")},_getFormInput(){return this.$("#language-option-hidden")},_getLanguageDropdown(){return this.$(".custom-language-dropdown")},_getLanguageOptions(){return this.$(".custom-language-option")}};ckan.module("digitraffic_theme_language_menu",Ko);const Go={START_TIMESTAMP_TZ_CSS_QUERY:"#field-start_timestamp-tz",END_TIMESTAMP_TZ_CSS_QUERY:"#field-end_timestamp-tz",initialize(){Lo.apply(this);const t=this._getStartTimestampTZ(),e=this._getEndTimestampTZ();this._moveToEnd(t),t.find(this.START_TIMESTAMP_TZ_CSS_QUERY).on("change",(t=>{const i=t.target.value;e.find(this.END_TIMESTAMP_TZ_CSS_QUERY).val(i)})),e.hide(),this._showNecessityLabels()},_getStartTimestampTZ(){return this.$(".datetime-row").find(".datetime-field").has(this.START_TIMESTAMP_TZ_CSS_QUERY)},_getEndTimestampTZ(){return this.$(".datetime-row").find(".datetime-field").has(this.END_TIMESTAMP_TZ_CSS_QUERY)},_moveToEnd(t){t.appendTo(this.el)},_showNecessityLabels(){const t=this.$(".hide-necessity");t.length&&t.removeClass("hide-necessity")}};ckan.module("digitraffic_theme_temporal_coverage",Go);var Wo=function(t,e,i,a){var o,n=arguments.length,s=n<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,a);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(s=(n<3?o(s):n>3?o(e,i,s):o(e,i))||s);return n>3&&s&&Object.defineProperty(e,i,s),s};class Zo extends CustomEvent{constructor(t){super("select",{detail:t,bubbles:!0,cancelable:!0,composed:!1})}}class Jo extends Lt{constructor(){super(),this.options=[],this.disabled=!1,this.error=!1,this._open=!1,this.addEventListener("blur",(()=>this._open=!1))}firstUpdated(){this.tabIndex=0}render(){var t;const e=yt`
      <div part="options-list" class="options-list">
        ${this.options.map((t=>yt`
            <div
              @click=${()=>this.handleSelect(t)}
              @keypress=${e=>this.handleKeypress(e,t)}
              class=${`ui-label-text option ${this.getOptionCssClass(t)}`}
              tabindex=${0}
              aria-selected=${this.value===t}
            >
              ${this.getLabel(t)}
            </div>
          `))}
      </div>
    `;return yt`
      <button
        @click=${()=>this._open=!this._open}
        ?disabled=${this.disabled}
        class=${`ui-label-text ${this.getButtonCssClass()}`}
        aria-haspopup=${!0}
        aria-expanded=${this._open}
      >
        <div>${null!==(t=this.getLabel(this.value))&&void 0!==t?t:this.placeholder}</div>
        <fds-icon .icon=${this._open?"chevron-up":"chevron-down"}></fds-icon>
      </button>
      ${this._open?e:null}
    `}handleKeypress(t,e){"Enter"===t.key&&this.handleSelect(e)}handleSelect(t){this._open=!1,this.value=t,this.dispatchEvent(new Zo(t))}getLabel(t){if(!t)return null;const e=yt`<span class="label">${t.label}</span>`;return t.icon?yt`<span class="icon-label"><fds-icon .icon=${t.icon}></fds-icon>${e}</span>`:e}getButtonCssClass(){return this.error?"error":!this.value&&this.placeholder?"placeholder":""}getOptionCssClass(t){return this.value===t?"selected":""}}Jo.styles=[yo,L`
      :host {
        width: 100%;
        position: relative;
        --fds-typography-ui-label-display: flex;
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

        background-color: ${ao};
        border: 1px solid ${co};
      }

      button:disabled {
        cursor: default;
        background-color: ${ho};
        color: ${mo};
      }

      button:disabled .chevron {
        color: ${mo};
      }

      button.placeholder {
        color: ${mo};
      }

      button.error {
        color: ${oo};
        border: 3px solid ${oo};
      }

      .options-list {
        cursor: pointer;
        display: block;
        position: absolute;
        z-index: 1;
        overflow-y: scroll;

        min-width: 100%;
        max-width: fit-content;
        max-height: 80vh;

        box-shadow: ${Dt};
      }

      fds-icon {
        position: static;
        color: ${go};
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
        display: flex;
        align-items: center;
        white-space: nowrap;

        /* TODO: what values? */
        height: 56px;
        padding-left: 16px;
        padding-right: 8px;

        background-color: ${ao};
        border-bottom: 1px solid ${co};
      }

      .option:hover {
        /* TODO: what color? */
        background-color: ${ro};
      }

      .option.selected {
        /* TODO: what color? */
        background-color: ${lo};
      }
    `],Wo([fo()],Jo.prototype,"options",void 0),Wo([fo()],Jo.prototype,"disabled",void 0),Wo([fo()],Jo.prototype,"error",void 0),Wo([fo()],Jo.prototype,"placeholder",void 0),Wo([fo()],Jo.prototype,"value",void 0),Wo([bo()],Jo.prototype,"_open",void 0),customElements.define("fds-dropdown",Jo);const Qo={initialize(){Lo.apply(this);const t=this._getOptionValues();customElements.whenDefined("fds-dropdown").then((()=>{const e=document.createElement("fds-dropdown");e.options=this._optionValuesToFdsDropdownOptions(t),e.value=this._optionValuesToFdsDropdownOptions(t.filter((t=>t.selected))),e.multiple=!0,e.setAttribute("id",this.el[0].id),this.el[0].name&&e.setAttribute("name",this.el[0].name),this.el.replaceWith(e)}))},_getOptionValues(){return this.$("option").toArray().map((t=>{if(null===t.textContent)throw new Error("Option element does not have text content");return{label:t.textContent.trim(),value:t.value,selected:"selected"===t.getAttribute("selected")}}))},_optionValuesToFdsDropdownOptions:t=>t.map((t=>({label:t.label,value:t.value})))};ckan.module("digitraffic_theme_multi_select",Qo);const qo={initialize(){Lo.apply(this);this._getToggleButtons().children(".language-toggle-button").each(((t,e)=>{const i=$(e),a=i.attr("id");i.on("click",(t=>{t.preventDefault();this.$(`#field-${a}`).parent().parent().removeClass("hidden"),i.addClass("hidden")}))}));this._getCloseButtons().each(((t,e)=>{const i=$(e),a=i.attr("id");i.on("click",(t=>{t.preventDefault();$(`#${a}.language-toggle-button`).removeClass("hidden"),i.parent().parent().addClass("hidden");this.$(`#field-${a}`).val("")}))}))},_getToggleButtons(){return this.$(".language-toggle-buttons")},_getCloseButtons(){return this.$(".hide-language-input")}};ckan.module("digitraffic_theme_language_toggle_buttons",qo);var Xo,tn=function(t,e,i,a){var o,n=arguments.length,s=n<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,a);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(s=(n<3?o(s):n>3?o(e,i,s):o(e,i))||s);return n>3&&s&&Object.defineProperty(e,i,s),s};!function(t){t.primary="primary",t.secondary="secondary",t.tertiary="tertiary",t.danger="danger"}(Xo||(Xo={}));const en={primary:ao,secondary:io,tertiary:io,danger:ao};class an extends Lt{constructor(){super(...arguments),this.variant=Xo.primary,this.disabled=!1}render(){return yt`
      <button class="button--${this.variant}" ?disabled="${this.disabled}">
        ${this.icon&&yt`<fds-icon .icon="${this.icon}"></fds-icon>`}
        ${this.label&&yt`<span class="ui-label-text">${this.label}</span>`}
      </button>
    `}}an.styles=[yo,L`
      :host {
        display: inline-flex;
        justify-content: center;
      }

      button {
        cursor: pointer;
        display: flex;
        border: 2px solid ${io};
        border-radius: ${It};
        padding: 13px 16px;
        height: ${zt};
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
        border-color: ${io};
        background: ${io};
        color: ${en[Xo.primary]};
      }

      .button--secondary {
        border: 2px solid ${io};
        background: ${ao};
        color: ${en[Xo.secondary]};
      }

      .button--tertiary {
        background: transparent;
        border-color: transparent;
        color: ${en[Xo.tertiary]};
      }

      .button--danger {
        background: ${no};
        border-color: transparent;
        color: ${en[Xo.danger]};
      }

      .button--primary:hover,
      .button--secondary:hover,
      .button--tertiary:hover {
        background: ${lo};
        border-color: transparent;
        color: ${ao};
      }

      .button--danger:hover {
        background: ${so};
        border-color: ${so};
        color: ${ao};
      }

      .button--primary:disabled {
        background: ${po};
        border-color: ${po};
        color: ${mo};
      }

      .button--secondary:disabled {
        background: transparent;
        color: ${po};
        border-color: ${po};
      }

      .button--tertiary:disabled {
        background: transparent;
        border-color: transparent;
        color: ${po};
      }

      .button--danger:disabled {
        background: ${po};
        border-color: transparent;
        color: ${mo};
      }
    `],tn([fo()],an.prototype,"variant",void 0),tn([fo({type:Boolean})],an.prototype,"disabled",void 0),tn([fo()],an.prototype,"icon",void 0),tn([fo()],an.prototype,"label",void 0),customElements.define("fds-button",an);class on extends Error{constructor(t){super(t),this.name="TemplateError"}}const nn=()=>({fieldName:"NOT_SET",initialize(){Lo.apply(this)},_getIndex(){const t=this.el.closest(`[data-field='${this.fieldName}']`);if(1!==t.length)throw new Error("Element not found");const e=t.attr("data-group-index");if(void 0===e)throw new Error("Index not found");if(e.startsWith("REPEATING-INDEX"))throw new on("Template");return parseInt(e)},_getAllFields(){const t=this._getIndex(),e=this._getAllFieldNames(t);return this._getFields(e)},_getFields(t){let e=$();for(const i of t){const t=this.el.find(`[name='${i}']`);if(0===t.length)throw new Error(`Field element not found for field ${i}`);e=e.add(t)}return e},_getParentFormGroup(t){const e=t.closest(".form-group");if(0===e.length)throw new Error("Parent form group not found");return e},_getAllFieldNames(t){throw Error("No All Field Names")}}),sn=()=>{const t=nn();return{...t,initialize(){t.initialize.call(this);try{const t=this._getTypeEl(),e=t.val();this._onlyShowTypeFields(e),t.on("change",(t=>{const e=t.target.value;this._onlyShowTypeFields(e)}))}catch(t){if(t instanceof on)return;throw t}},typeFieldName:"NOT_SET",_getTypeEl(){const t=this._getIndex(),e=`${this.fieldName}-${t}-${this.typeFieldName}`,i=this.el.find(`select[name='${e}']`);if(0===i.length)throw new Error(`Element not found for index ${t}`);return i},_onlyShowTypeFields(t){const e=this._getTypeFields(t),i=this._getAllFields().not(e).map(((t,e)=>this._getParentFormGroup($(e))[0])),a=e.map(((t,e)=>this._getParentFormGroup($(e))[0]));i.addClass("display-none"),a.removeClass("display-none")},_getTypeFields(t){throw Error("No Type Fieds")}}};var rn;!function(t){t.PERSON="http://www.w3.org/2006/vcard/ns#Individual",t.ORGANIZATION="http://www.w3.org/2006/vcard/ns#Organization"}(rn||(rn={}));const ln={...sn(),fieldName:"contact_point",typeFieldName:"contact_point_type",_getTypeFields(t){const e=this._getIndex(),i=this._getAllFieldNames(e);let a;if(t===rn.PERSON&&(a=i),t===rn.ORGANIZATION){const t=new Set([`contact_point-${e}-organization_name`]);a=new Set([...i].filter((e=>!t.has(e))))}if(void 0===a)throw new Error(`Contact point type field names not found for type ${t}`);return this._getFields(a)},_getAllFieldNames:t=>new Set([`contact_point-${t}-contact_point_type`,`contact_point-${t}-fn`,`contact_point-${t}-organization_name`,`contact_point-${t}-has_email`,`contact_point-${t}-has_telephone`,`contact_point-${t}-has_url`,`contact_point-${t}-street_address`,`contact_point-${t}-locality`,`contact_point-${t}-postal_code`,`contact_point-${t}-region`,`contact_point-${t}-country_name`])};var dn;ckan.module("digitraffic_theme_contact_detail",ln),function(t){t.ACADEMIA="http://purl.org/adms/publishertype/Academia-ScientificOrganisation",t.COMPANY="http://purl.org/adms/publishertype/Company",t.INDUSTRY_CONSORTIUM="http://purl.org/adms/publishertype/IndustryConsortium",t.LOCAL_AUTHORITY="http://purl.org/adms/publishertype/LocalAuthority",t.NATIONAL_AUTHORITY="http://purl.org/adms/publishertype/NationalAuthority",t.NON_GOVERNMENTAL_ORGANIZATION="http://purl.org/adms/publishertype/NonGovernmentalOrganisation",t.NON_PROFIT_ORGANIZATION="http://purl.org/adms/publishertype/NonProfitOrganisation",t.PRIVATE_INDIVIDUAL="http://purl.org/adms/publishertype/PrivateIndividual(s)",t.REGIONAL_AUTHORITY="http://purl.org/adms/publishertype/RegionalAuthority",t.STANDARDISATION_BODY="http://purl.org/adms/publishertype/StandardisationBody",t.SUPER_NATIONAL_AUTHORITY="http://purl.org/adms/publishertype/SupraNationalAuthority"}(dn||(dn={}));const hn={...sn(),fieldName:"rights_holder",typeFieldName:"type",_getTypeFields(t){const e=this._getIndex(),i=this._getAllFieldNames(e),a=new Set([dn.ACADEMIA,dn.COMPANY,dn.INDUSTRY_CONSORTIUM,dn.LOCAL_AUTHORITY,dn.NATIONAL_AUTHORITY,dn.NON_GOVERNMENTAL_ORGANIZATION,dn.NON_PROFIT_ORGANIZATION,dn.REGIONAL_AUTHORITY,dn.STANDARDISATION_BODY,dn.SUPER_NATIONAL_AUTHORITY]);let o;if(t===dn.PRIVATE_INDIVIDUAL&&(o=i),a.has(t)){const t=new Set([`rights_holder-${e}-first_name`,`rights_holder-${e}-surname`,`rights_holder-${e}-workplace_homepage`]);o=new Set([...i].filter((e=>!t.has(e))))}if(void 0===o)throw new Error(`Rights holder type field names not found for type ${t}`);return this._getFields(o)},_getAllFieldNames:t=>new Set([`rights_holder-${t}-type`,`rights_holder-${t}-name`,`rights_holder-${t}-first_name`,`rights_holder-${t}-surname`,`rights_holder-${t}-mbox`,`rights_holder-${t}-phone`,`rights_holder-${t}-thoroughfare`,`rights_holder-${t}-post_name`,`rights_holder-${t}-post_code`,`rights_holder-${t}-admin_unit_l2`,`rights_holder-${t}-admin_unit_l1`,`rights_holder-${t}-workplace_homepage`])};ckan.module("digitraffic_theme_rights_holder",hn);const pn={initialize(){Lo.apply(this);const t=window.matchMedia("(min-width: 768px)");t.addEventListener("change",this._handleMediaQueryChange),this._handleMediaQueryChange(t)},_handleMediaQueryChange(t){const e=$('[data-form-layout-wrapper="left"]'),i=$('[data-form-layout-wrapper="right"]'),a=e.length>0,o=i.length>0;if(t.matches){if(!a&&!o){const t=$(".left-1, .left-2"),e=$(".right-1, .right-2"),i="display: flex; flex-wrap: nowrap; gap: 1rem; flex-direction: column;",a=document.createElement("div"),o=document.createElement("div");a.setAttribute("data-form-layout-wrapper","left"),o.setAttribute("data-form-layout-wrapper","right"),a.style=i+" grid-area: left-1-start / left-1-start / left-2-end / left-2-end;",t.wrapAll(a),o.style=i+" grid-area: right-1-start / right-1-start / right-2-end / right-2-end;",e.wrapAll(o)}}else a&&o&&(e.children().unwrap(),i.children().unwrap())}};ckan.module("digitraffic_theme_form_layout",pn);const cn={initialize(){Lo.apply(this);const t=this._getLicenseId(),e=this._getLicenseText().closest("div.form-group.control-full");this._toggleLicenseText(t,e),console.log("jee"),console.log(e),t.on("change",(()=>this._toggleLicenseText(t,e)))},_toggleLicenseText(t,e){t.val()?e.show():e.hide()},_getLicenseId(){return this.$("[name='license_id']")},_getLicenseText(){return this.$("[name='license_text']")}};ckan.module("digitraffic_theme_license_document",cn);
/**
     * @license lucide v0.477.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */
const mn={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},gn=([t,e,i])=>{const a=document.createElementNS("http://www.w3.org/2000/svg",t);return Object.keys(e).forEach((t=>{a.setAttribute(t,String(e[t]))})),i?.length&&i.forEach((t=>{const e=gn(t);a.appendChild(e)})),a},yn=t=>"string"==typeof t?t:t&&t.class?t.class&&"string"==typeof t.class?t.class.split(" "):t.class&&Array.isArray(t.class)?t.class:"":"",un=(t,{nameAttr:e,icons:i,attrs:a})=>{const o=t.getAttribute(e);if(null==o)return;const n=i[o.replace(/(\w)(\w*)(_|-|\s*)/g,((t,e,i)=>e.toUpperCase()+i.toLowerCase()))];if(!n)return console.warn(`${t.outerHTML} icon name was not found in the provided icons object.`);const s=(t=>Array.from(t.attributes).reduce(((t,e)=>(t[e.name]=e.value,t)),{}))(t),r={...mn,"data-lucide":o,...a,...s},l=["lucide",`lucide-${o}`,s,a].flatMap(yn).map((t=>t.trim())).filter(Boolean).filter(((t,e,i)=>i.indexOf(t)===e)).join(" ");l&&Object.assign(r,{class:l});const d=((t,e={})=>{const i={...mn,...e};return gn(["svg",i,t])})(n,r);return t.parentNode?.replaceChild(d,t)},fn=[["path",{d:"m6 9 6 6 6-6"}]],bn=[["path",{d:"m18 15-6-6-6 6"}]],vn=[["path",{d:"M15 3h6v6"}],["path",{d:"M10 14 21 3"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}]],wn=[["path",{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"}]],_n=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],["path",{d:"M2 12h20"}]],$n=[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5"}]],kn=[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}],["rect",{width:"4",height:"12",x:"2",y:"9"}],["circle",{cx:"4",cy:"4",r:"2"}]],xn=[["line",{x1:"4",x2:"20",y1:"12",y2:"12"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18"}]],An=[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"}]],Sn=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]],Tn=[["path",{d:"M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"}],["path",{d:"m10 15 5-3-5-3z"}]];
/**
     * @license lucide v0.477.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */jQuery((function(){$(".js-disabled").removeClass("js-disabled"),(({icons:t={},nameAttr:e="data-lucide",attrs:i={}}={})=>{if(!Object.values(t).length)throw new Error("Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`");if("undefined"==typeof document)throw new Error("`createIcons()` only works in a browser environment.");const a=document.querySelectorAll(`[${e}]`);if(Array.from(a).forEach((a=>un(a,{nameAttr:e,icons:t,attrs:i}))),"data-lucide"===e){const e=document.querySelectorAll("[icon-name]");e.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(e).forEach((e=>un(e,{nameAttr:"icon-name",icons:t,attrs:i}))))}})({icons:{ExternalLink:vn,User:Sn,Menu:xn,Globe:_n,ChevronDown:fn,ChevronUp:bn,Facebook:wn,Twitter:An,Instagram:$n,Youtube:Tn,Linkedin:kn}})}))}();
