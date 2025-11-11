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
var i,s,n,o,a,r,l,d,h,c,p,u,g=function(t,e,i,s,n){if("m"===s)throw new TypeError("Private method is not writable");if("a"===s&&!n)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!n:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===s?n.call(t,i):n?n.value=i:e.set(t,i),i},m=function(t,e,i,s){if("a"===i&&!s)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!s:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===i?s:"a"===i?s.call(t):s?s.value:e.get(t)};const f=t=>"boolean"==typeof t?t:t?.capture??!1;const y=class{constructor(){this.__eventListeners=new Map,this.__captureEventListeners=new Map}addEventListener(t,e,i){if(null==e)return;const s=f(i)?this.__captureEventListeners:this.__eventListeners;let n=s.get(t);if(void 0===n)n=new Map,s.set(t,n);else if(n.has(e))return;const o="object"==typeof i&&i?i:{};o.signal?.addEventListener("abort",()=>this.removeEventListener(t,e,i)),n.set(e,o??{})}removeEventListener(t,e,i){if(null==e)return;const s=f(i)?this.__captureEventListeners:this.__eventListeners,n=s.get(t);void 0!==n&&(n.delete(e),n.size||s.delete(t))}dispatchEvent(t){const e=[this];let i=this.__eventTargetParent;if(t.composed)for(;i;)e.push(i),i=i.__eventTargetParent;else for(;i&&i!==this.__host;)e.push(i),i=i.__eventTargetParent;let s=!1,n=!1,o=0,a=null,r=null,l=null;const d=t.stopPropagation,h=t.stopImmediatePropagation;Object.defineProperties(t,{target:{get:()=>a??r,...b},srcElement:{get:()=>t.target,...b},currentTarget:{get:()=>l,...b},eventPhase:{get:()=>o,...b},composedPath:{value:()=>e,...b},stopPropagation:{value:()=>{s=!0,d.call(t)},...b},stopImmediatePropagation:{value:()=>{n=!0,h.call(t)},...b}});const c=(e,i,s)=>{"function"==typeof e?e(t):"function"==typeof e?.handleEvent&&e.handleEvent(t),i.once&&s.delete(e)},p=()=>(l=null,o=0,!t.defaultPrevented),u=e.slice().reverse();a=this.__host&&t.composed?null:this;const g=t=>{for(r=this;r.__host&&t.includes(r.__host);)r=r.__host};for(const e of u){a||r&&r!==e.__host||g(u.slice(u.indexOf(e))),l=e,o=e===t.target?2:1;const i=e.__captureEventListeners.get(t.type);if(i)for(const[t,e]of i)if(c(t,e,i),n)return p();if(s)return p()}const m=t.bubbles?e:[this];r=null;for(const e of m){a||r&&e!==r.__host||g(m.slice(0,m.indexOf(e)+1)),l=e,o=e===t.target?2:3;const i=e.__eventListeners.get(t.type);if(i)for(const[t,e]of i)if(c(t,e,i),n)return p();if(s)return p()}return p()}},b={__proto__:null,enumerable:!0};Object.freeze(b);const _=(c=class{constructor(t,e={}){if(i.set(this,!1),s.set(this,!1),n.set(this,!1),o.set(this,!1),a.set(this,Date.now()),r.set(this,!1),l.set(this,void 0),d.set(this,void 0),h.set(this,void 0),this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,0===arguments.length)throw new Error("The type argument must be specified");if("object"!=typeof e||!e)throw new Error('The "options" argument must be an object');const{bubbles:c,cancelable:p,composed:u}=e;g(this,i,!!p,"f"),g(this,s,!!c,"f"),g(this,n,!!u,"f"),g(this,l,`${t}`,"f"),g(this,d,null,"f"),g(this,h,!1,"f")}initEvent(t,e,i){throw new Error("Method not implemented.")}stopImmediatePropagation(){this.stopPropagation()}preventDefault(){g(this,o,!0,"f")}get target(){return m(this,d,"f")}get currentTarget(){return m(this,d,"f")}get srcElement(){return m(this,d,"f")}get type(){return m(this,l,"f")}get cancelable(){return m(this,i,"f")}get defaultPrevented(){return m(this,i,"f")&&m(this,o,"f")}get timeStamp(){return m(this,a,"f")}composedPath(){return m(this,h,"f")?[m(this,d,"f")]:[]}get returnValue(){return!m(this,i,"f")||!m(this,o,"f")}get bubbles(){return m(this,s,"f")}get composed(){return m(this,n,"f")}get eventPhase(){return m(this,h,"f")?c.AT_TARGET:c.NONE}get cancelBubble(){return m(this,r,"f")}set cancelBubble(t){t&&g(this,r,!0,"f")}stopPropagation(){g(this,r,!0,"f")}get isTrusted(){return!1}},i=new WeakMap,s=new WeakMap,n=new WeakMap,o=new WeakMap,a=new WeakMap,r=new WeakMap,l=new WeakMap,d=new WeakMap,h=new WeakMap,c.NONE=0,c.CAPTURING_PHASE=1,c.AT_TARGET=2,c.BUBBLING_PHASE=3,c);Object.defineProperties(_.prototype,{initEvent:b,stopImmediatePropagation:b,preventDefault:b,target:b,currentTarget:b,srcElement:b,type:b,cancelable:b,defaultPrevented:b,timeStamp:b,composedPath:b,returnValue:b,bubbles:b,composed:b,eventPhase:b,cancelBubble:b,stopPropagation:b,isTrusted:b});const v=(u=class extends _{constructor(t,e={}){super(t,e),p.set(this,void 0),g(this,p,e?.detail??null,"f")}initCustomEvent(t,e,i,s){throw new Error("Method not implemented.")}get detail(){return m(this,p,"f")}},p=new WeakMap,u);Object.defineProperties(v.prototype,{detail:b});const w=_,k=v;
/**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
globalThis.Event??=w,globalThis.CustomEvent??=k;const A=new WeakMap,E=t=>{let e=A.get(t);return void 0===e&&A.set(t,e=new Map),e},x=class extends y{constructor(){super(...arguments),this.__shadowRootMode=null,this.__shadowRoot=null,this.__internals=null}get attributes(){return Array.from(E(this)).map(([t,e])=>({name:t,value:e}))}get shadowRoot(){return"closed"===this.__shadowRootMode?null:this.__shadowRoot}get localName(){return this.constructor.__localName}get tagName(){return this.localName?.toUpperCase()}setAttribute(t,e){E(this).set(t,String(e))}removeAttribute(t){E(this).delete(t)}toggleAttribute(t,e){return this.hasAttribute(t)?!(void 0===e||!e)||(this.removeAttribute(t),!1):!(void 0!==e&&!e)&&(this.setAttribute(t,""),!0)}hasAttribute(t){return E(this).has(t)}attachShadow(t){const e={host:this};return this.__shadowRootMode=t.mode,t&&"open"===t.mode&&(this.__shadowRoot=e),e}attachInternals(){if(null!==this.__internals)throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");const t=new e(this);return this.__internals=t,t}getAttribute(t){return E(this).get(t)??null}},T=class extends x{};globalThis.litServerRoot??=Object.defineProperty(new T,"localName",{get:()=>"lit-server-root"});const S=new class{constructor(){this.__definitions=new Map,this.__reverseDefinitions=new Map,this.__pendingWhenDefineds=new Map}define(t,e){if(this.__definitions.has(t)){if("development"!==process.env.NODE_ENV)throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the name "${t}" has already been used with this registry`);console.warn(`'CustomElementRegistry' already has "${t}" defined. This may have been caused by live reload or hot module replacement in which case it can be safely ignored.\nMake sure to test your application with a production build as repeat registrations will throw in production.`)}if(this.__reverseDefinitions.has(e))throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the constructor has already been used with this registry for the tag name ${this.__reverseDefinitions.get(e)}`);e.__localName=t,this.__definitions.set(t,{ctor:e,observedAttributes:e.observedAttributes??[]}),this.__reverseDefinitions.set(e,t),this.__pendingWhenDefineds.get(t)?.resolve(e),this.__pendingWhenDefineds.delete(t)}get(t){const e=this.__definitions.get(t);return e?.ctor}getName(t){return this.__reverseDefinitions.get(t)??null}upgrade(t){throw new Error("customElements.upgrade is not currently supported in SSR. Please file a bug if you need it.")}async whenDefined(t){const e=this.__definitions.get(t);if(e)return e.ctor;let i=this.__pendingWhenDefineds.get(t);return i||(i=function(){let t,e;return{promise:new Promise((i,s)=>{t=i,e=s}),resolve:t,reject:e}}(),this.__pendingWhenDefineds.set(t,i)),i.promise}},C=globalThis,M=C.ShadowRoot&&(void 0===C.ShadyCSS||C.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,O=Symbol(),N=new WeakMap;let P=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==O)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(M&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=N.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&N.set(e,t))}return t}toString(){return this.cssText}};const L=t=>new P("string"==typeof t?t:t+"",void 0,O),I=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new P(i,t,O)},j=(t,e)=>{M?t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(e=>{const i=document.createElement("style"),s=C.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=e.cssText,t.appendChild(i)})},D=M||void 0===C.CSSStyleSheet?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return L(e)})(t):t;
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var z,R;const F=globalThis;null!==(z=F.customElements)&&void 0!==z||(F.customElements=S);const U=F.trustedTypes,B=U?U.emptyScript:"",V=F.reactiveElementPolyfillSupport,H={toAttribute(t,e){switch(e){case Boolean:t=t?B:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},W=(t,e)=>e!==t&&(e==e||t==t),Y={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:W},q="finalized";let K=class extends(globalThis.HTMLElement??T){constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))}),t}static createProperty(t,e=Y){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||Y}static finalize(){if(this.hasOwnProperty(q))return!1;this[q]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(D(t))}else void 0!==t&&e.push(D(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return j(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=Y){var s;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:H).toAttribute(e,i.type);this._$El=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,n=s._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=s.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:H;this._$El=n,this[n]=o.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||W)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var Q;K[q]=!0,K.elementProperties=new Map,K.elementStyles=[],K.shadowRootOptions={mode:"open"},null==V||V({ReactiveElement:K}),(null!==(R=F.reactiveElementVersions)&&void 0!==R?R:F.reactiveElementVersions=[]).push("1.6.3");const G=globalThis,Z=G.trustedTypes,X=Z?Z.createPolicy("lit-html",{createHTML:t=>t}):void 0,J="$lit$",tt=`lit$${(Math.random()+"").slice(9)}$`,et="?"+tt,it=`<${et}>`,st=void 0===G.document?{createTreeWalker:()=>({})}:document,nt=()=>st.createComment(""),ot=t=>null===t||"object"!=typeof t&&"function"!=typeof t,at=Array.isArray,rt="[ \t\n\f\r]",lt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,dt=/-->/g,ht=/>/g,ct=RegExp(`>|${rt}(?:([^\\s"'>=/]+)(${rt}*=${rt}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),pt=/'/g,ut=/"/g,gt=/^(?:script|style|textarea|title)$/i,mt=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),ft=Symbol.for("lit-noChange"),yt=Symbol.for("lit-nothing"),bt=new WeakMap,_t=st.createTreeWalker(st,129,null,!1);function vt(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==X?X.createHTML(e):e}const wt=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":"",a=lt;for(let e=0;e<i;e++){const i=t[e];let r,l,d=-1,h=0;for(;h<i.length&&(a.lastIndex=h,l=a.exec(i),null!==l);)h=a.lastIndex,a===lt?"!--"===l[1]?a=dt:void 0!==l[1]?a=ht:void 0!==l[2]?(gt.test(l[2])&&(n=RegExp("</"+l[2],"g")),a=ct):void 0!==l[3]&&(a=ct):a===ct?">"===l[0]?(a=null!=n?n:lt,d=-1):void 0===l[1]?d=-2:(d=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?ct:'"'===l[3]?ut:pt):a===ut||a===pt?a=ct:a===dt||a===ht?a=lt:(a=ct,n=void 0);const c=a===ct&&t[e+1].startsWith("/>")?" ":"";o+=a===lt?i+it:d>=0?(s.push(r),i.slice(0,d)+J+i.slice(d)+tt+c):i+tt+(-2===d?(s.push(void 0),e):c)}return[vt(t,o+(t[i]||"<?>")+(2===e?"</svg>":"")),s]};class $t{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const a=t.length-1,r=this.parts,[l,d]=wt(t,e);if(this.el=$t.createElement(l,i),_t.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=_t.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(J)||e.startsWith(tt)){const i=d[o++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+J).split(tt),e=/([.?@])?(.*)/.exec(i);r.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?Tt:"?"===e[1]?Ct:"@"===e[1]?Mt:xt})}else r.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(gt.test(s.tagName)){const t=s.textContent.split(tt),e=t.length-1;if(e>0){s.textContent=Z?Z.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],nt()),_t.nextNode(),r.push({type:2,index:++n});s.append(t[e],nt())}}}else if(8===s.nodeType)if(s.data===et)r.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(tt,t+1));)r.push({type:7,index:n}),t+=tt.length-1}n++}}static createElement(t,e){const i=st.createElement("template");return i.innerHTML=t,i}}function kt(t,e,i=t,s){var n,o,a,r;if(e===ft)return e;let l=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const d=ot(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===d?l=void 0:(l=new d(t),l._$AT(t,i,s)),void 0!==s?(null!==(a=(r=i)._$Co)&&void 0!==a?a:r._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(e=kt(t,l._$AS(t,e.values),l,s)),e}class At{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:st).importNode(i,!0);_t.currentNode=n;let o=_t.nextNode(),a=0,r=0,l=s[0];for(;void 0!==l;){if(a===l.index){let e;2===l.type?e=new Et(o,o.nextSibling,this,t):1===l.type?e=new l.ctor(o,l.name,l.strings,this,t):6===l.type&&(e=new Ot(o,this,t)),this._$AV.push(e),l=s[++r]}a!==(null==l?void 0:l.index)&&(o=_t.nextNode(),a++)}return _t.currentNode=st,n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Et{constructor(t,e,i,s){var n;this.type=2,this._$AH=yt,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=kt(this,t,e),ot(t)?t===yt||null==t||""===t?(this._$AH!==yt&&this._$AR(),this._$AH=yt):t!==this._$AH&&t!==ft&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>at(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==yt&&ot(this._$AH)?this._$AA.nextSibling.data=t:this.$(st.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=$t.createElement(vt(s.h,s.h[0]),this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new At(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=bt.get(t.strings);return void 0===e&&bt.set(t.strings,e=new $t(t)),e}T(t){at(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Et(this.k(nt()),this.k(nt()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class xt{constructor(t,e,i,s,n){this.type=1,this._$AH=yt,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=yt}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=kt(this,t,e,0),o=!ot(t)||t!==this._$AH&&t!==ft,o&&(this._$AH=t);else{const s=t;let a,r;for(t=n[0],a=0;a<n.length-1;a++)r=kt(this,s[i+a],e,a),r===ft&&(r=this._$AH[a]),o||(o=!ot(r)||r!==this._$AH[a]),r===yt?t=yt:t!==yt&&(t+=(null!=r?r:"")+n[a+1]),this._$AH[a]=r}o&&!s&&this.j(t)}j(t){t===yt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Tt extends xt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===yt?void 0:t}}const St=Z?Z.emptyScript:"";class Ct extends xt{constructor(){super(...arguments),this.type=4}j(t){t&&t!==yt?this.element.setAttribute(this.name,St):this.element.removeAttribute(this.name)}}class Mt extends xt{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=kt(this,t,e,0))&&void 0!==i?i:yt)===ft)return;const s=this._$AH,n=t===yt&&s!==yt||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==yt&&(s===yt||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class Ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){kt(this,t)}}const Nt=G.litHtmlPolyfillSupport;null==Nt||Nt($t,Et),(null!==(Q=G.litHtmlVersions)&&void 0!==Q?Q:G.litHtmlVersions=[]).push("2.8.0");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var Pt,Lt;class It extends K{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let a=o._$litPart$;if(void 0===a){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=a=new Et(e.insertBefore(nt(),t),t,void 0,null!=i?i:{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return ft}}It.finalized=!0,It._$litElement$=!0,null===(Pt=globalThis.litElementHydrateSupport)||void 0===Pt||Pt.call(globalThis,{LitElement:It});const jt=globalThis.litElementPolyfillSupport;null==jt||jt({LitElement:It}),(null!==(Lt=globalThis.litElementVersions)&&void 0!==Lt?Lt:globalThis.litElementVersions=[]).push("3.3.3");const Dt=L("var(--fds-size-6, 48px)"),zt=L("var(--fds-radius-compact, 2px)"),Rt=L("var(--fds-radius-large, 8px)"),Ft=L("var(--fds-style-elevation-200, 0px 6px 6px 0px rgba(0, 0, 0, 0.23), 0px 3px 6px 0px rgba(0, 0, 0, 0.16))"),Ut=L("var(--fds-typography-body-default-font-family, 'Public Sans')"),Bt=L("var(--fds-typography-body-default-font-size, 16px)"),Vt=L("var(--fds-typography-body-default-letter-spacing, 0px)"),Ht=L("var(--fds-typography-body-default-line-height, 150%)"),Wt=L("var(--fds-typography-body-default-font-weight, 400)"),Yt=L("var(--fds-typography-body-default-display, inline-block)"),qt=L("var(--fds-typography-body-large-font-family, 'Public Sans')"),Kt=L("var(--fds-typography-body-large-font-size, 18px)"),Qt=L("var(--fds-typography-body-large-letter-spacing, 0px)"),Gt=L("var(--fds-typography-body-large-line-height, 150%)"),Zt=L("var(--fds-typography-body-large-font-weight, 400)"),Xt=L("var(--fds-typography-body-large-display, inline-block)"),Jt=L("var(--fds-typography-body-micro-font-family, 'Public Sans')"),te=L("var(--fds-typography-body-micro-font-size, 12px)"),ee=L("var(--fds-typography-body-micro-letter-spacing, 0px)"),ie=L("var(--fds-typography-body-micro-line-height, 150%)"),se=L("var(--fds-typography-body-micro-font-weight, 400)"),ne=L("var(--fds-typography-body-micro-display, inline-block)"),oe=L("var(--fds-typography-body-small-font-family, 'Public Sans')"),ae=L("var(--fds-typography-body-small-font-size, 14px)"),re=L("var(--fds-typography-body-small-letter-spacing, 0px)"),le=L("var(--fds-typography-body-small-line-height, 150%)"),de=L("var(--fds-typography-body-small-font-weight, 400)"),he=L("var(--fds-typography-body-small-display, inline-block)"),ce=L("var(--fds-typography-emphasis-default-font-family, 'Public Sans')"),pe=L("var(--fds-typography-emphasis-default-font-size, 16px)"),ue=L("var(--fds-typography-emphasis-default-letter-spacing, 0px)"),ge=L("var(--fds-typography-emphasis-default-line-height, 150%)"),me=L("var(--fds-typography-emphasis-default-font-weight, 700)"),fe=L("var(--fds-typography-emphasis-default-display, inline-block)"),ye=L("var(--fds-typography-emphasis-large-font-family, 'Public Sans')"),be=L("var(--fds-typography-emphasis-large-font-size, 18px)"),_e=L("var(--fds-typography-emphasis-large-letter-spacing, 0px)"),ve=L("var(--fds-typography-emphasis-large-line-height, 150%)"),we=L("var(--fds-typography-emphasis-large-font-weight, 700)"),$e=L("var(--fds-typography-emphasis-large-display, inline-block)"),ke=L("var(--fds-typography-emphasis-micro-font-family, 'Public Sans')"),Ae=L("var(--fds-typography-emphasis-micro-font-size, 12px)"),Ee=L("var(--fds-typography-emphasis-micro-letter-spacing, 0px)"),xe=L("var(--fds-typography-emphasis-micro-line-height, 150%)"),Te=L("var(--fds-typography-emphasis-micro-font-weight, 700)"),Se=L("var(--fds-typography-emphasis-micro-display, inline-block)"),Ce=L("var(--fds-typography-emphasis-small-font-family, 'Public Sans')"),Me=L("var(--fds-typography-emphasis-small-font-size, 14px)"),Oe=L("var(--fds-typography-emphasis-small-letter-spacing, 0px)"),Ne=L("var(--fds-typography-emphasis-small-line-height, 150%)"),Pe=L("var(--fds-typography-emphasis-small-font-weight, 700)"),Le=L("var(--fds-typography-emphasis-small-display, inline-block)"),Ie=L("var(--fds-typography-heading-large-heading-3-font-family, 'Public Sans', 'PublicSans-Bold')"),je=L("var(--fds-typography-heading-large-heading-3-font-size, 40px)"),De=L("var(--fds-typography-heading-large-heading-3-letter-spacing, 0px)"),ze=L("var(--fds-typography-heading-large-heading-3-line-height, 110%)"),Re=L("var(--fds-typography-heading-large-heading-3-font-weight, 700)"),Fe=L("var(--fds-typography-heading-large-heading-3-display, inline-block)"),Ue=L("var(--fds-typography-heading-large-heading-4-font-family, 'Public Sans', 'PublicSans-Bold')"),Be=L("var(--fds-typography-heading-large-heading-4-font-size, 32px)"),Ve=L("var(--fds-typography-heading-large-heading-4-letter-spacing, 0px)"),He=L("var(--fds-typography-heading-large-heading-4-line-height, 110%)"),We=L("var(--fds-typography-heading-large-heading-4-font-weight, 700)"),Ye=L("var(--fds-typography-heading-large-heading-4-display, inline-block)"),qe=L("var(--fds-typography-heading-large-heading-5-font-family, 'Public Sans', 'PublicSans-Bold')"),Ke=L("var(--fds-typography-heading-large-heading-5-font-size, 28px)"),Qe=L("var(--fds-typography-heading-large-heading-5-letter-spacing, 0px)"),Ge=L("var(--fds-typography-heading-large-heading-5-line-height, 110%)"),Ze=L("var(--fds-typography-heading-large-heading-5-font-weight, 700)"),Xe=L("var(--fds-typography-heading-large-heading-5-display, inline-block)"),Je=L("var(--fds-typography-heading-large-heading-6-font-family, 'Public Sans', 'PublicSans-Bold')"),ti=L("var(--fds-typography-heading-large-heading-6-font-size, 20px)"),ei=L("var(--fds-typography-heading-large-heading-6-letter-spacing, 0px)"),ii=L("var(--fds-typography-heading-large-heading-6-line-height, 110%)"),si=L("var(--fds-typography-heading-large-heading-6-font-weight, 700)"),ni=L("var(--fds-typography-heading-large-heading-6-display, inline-block)"),oi=L("var(--fds-typography-heading-large-heading-1-font-family, 'Public Sans', 'PublicSans-Bold')"),ai=L("var(--fds-typography-heading-large-heading-1-font-size, 64px)"),ri=L("var(--fds-typography-heading-large-heading-1-letter-spacing, 0px)"),li=L("var(--fds-typography-heading-large-heading-1-line-height, 110%)"),di=L("var(--fds-typography-heading-large-heading-1-font-weight, 700)"),hi=L("var(--fds-typography-heading-large-heading-1-display, inline-block)"),ci=L("var(--fds-typography-heading-large-heading-2-font-family, 'Public Sans', 'PublicSans-Bold')"),pi=L("var(--fds-typography-heading-large-heading-2-font-size, 48px)"),ui=L("var(--fds-typography-heading-large-heading-2-letter-spacing, 0px)"),gi=L("var(--fds-typography-heading-large-heading-2-line-height, 110%)"),mi=L("var(--fds-typography-heading-large-heading-2-font-weight, 700)"),fi=L("var(--fds-typography-heading-large-heading-2-display, inline-block)"),yi=L("var(--fds-typography-heading-small-heading-1-font-family, 'Public Sans', 'PublicSans-Bold')"),bi=L("var(--fds-typography-heading-small-heading-1-font-size, 42px)"),_i=L("var(--fds-typography-heading-small-heading-1-letter-spacing, 0px)"),vi=L("var(--fds-typography-heading-small-heading-1-line-height, 110%)"),wi=L("var(--fds-typography-heading-small-heading-1-font-weight, 700)"),$i=L("var(--fds-typography-heading-small-heading-1-display, inline-block)"),ki=L("var(--fds-typography-heading-small-heading-2-font-family, 'Public Sans', 'PublicSans-Bold')"),Ai=L("var(--fds-typography-heading-small-heading-2-font-size, 32px)"),Ei=L("var(--fds-typography-heading-small-heading-2-letter-spacing, 0px)"),xi=L("var(--fds-typography-heading-small-heading-2-line-height, 110%)"),Ti=L("var(--fds-typography-heading-small-heading-2-font-weight, 700)"),Si=L("var(--fds-typography-heading-small-heading-2-display, inline-block)"),Ci=L("var(--fds-typography-heading-small-heading-3-font-family, 'Public Sans', 'PublicSans-Bold')"),Mi=L("var(--fds-typography-heading-small-heading-3-font-size, 28px)"),Oi=L("var(--fds-typography-heading-small-heading-3-letter-spacing, 0px)"),Ni=L("var(--fds-typography-heading-small-heading-3-line-height, 110%)"),Pi=L("var(--fds-typography-heading-small-heading-3-font-weight, 700)"),Li=L("var(--fds-typography-heading-small-heading-3-display, inline-block)"),Ii=L("var(--fds-typography-heading-small-heading-4-font-family, 'Public Sans', 'PublicSans-Bold')"),ji=L("var(--fds-typography-heading-small-heading-4-font-size, 24px)"),Di=L("var(--fds-typography-heading-small-heading-4-letter-spacing, 0px)"),zi=L("var(--fds-typography-heading-small-heading-4-line-height, 110%)"),Ri=L("var(--fds-typography-heading-small-heading-4-font-weight, 700)"),Fi=L("var(--fds-typography-heading-small-heading-4-display, inline-block)"),Ui=L("var(--fds-typography-heading-small-heading-5-font-family, 'Public Sans', 'PublicSans-Bold')"),Bi=L("var(--fds-typography-heading-small-heading-5-font-size, 18px)"),Vi=L("var(--fds-typography-heading-small-heading-5-letter-spacing, 0px)"),Hi=L("var(--fds-typography-heading-small-heading-5-line-height, 110%)"),Wi=L("var(--fds-typography-heading-small-heading-5-font-weight, 700)"),Yi=L("var(--fds-typography-heading-small-heading-5-display, inline-block)"),qi=L("var(--fds-typography-heading-small-heading-6-font-family, 'Public Sans', 'PublicSans-Bold')"),Ki=L("var(--fds-typography-heading-small-heading-6-font-size, 16px)"),Qi=L("var(--fds-typography-heading-small-heading-6-letter-spacing, 0px)"),Gi=L("var(--fds-typography-heading-small-heading-6-line-height, 110%)"),Zi=L("var(--fds-typography-heading-small-heading-6-font-weight, 700)"),Xi=L("var(--fds-typography-heading-small-heading-6-display, inline-block)"),Ji=L("var(--fds-typography-link-large-font-family, 'Public Sans')"),ts=L("var(--fds-typography-link-large-font-size, 18px)"),es=L("var(--fds-typography-link-large-letter-spacing, 0px)"),is=L("var(--fds-typography-link-large-line-height, 150%)"),ss=L("var(--fds-typography-link-large-font-weight, 400)"),ns=L("var(--fds-typography-link-large-text-decoration, underline)"),os=L("var(--fds-typography-link-large-display, inline-block)"),as=L("var(--fds-typography-link-micro-font-family, 'Public Sans')"),rs=L("var(--fds-typography-link-micro-font-size, 12px)"),ls=L("var(--fds-typography-link-micro-letter-spacing, 0px)"),ds=L("var(--fds-typography-link-micro-line-height, 150%)"),hs=L("var(--fds-typography-link-micro-font-weight, 400)"),cs=L("var(--fds-typography-link-micro-text-decoration, underline)"),ps=L("var(--fds-typography-link-micro-display, inline-block)"),us=L("var(--fds-typography-link-small-font-family, 'Public Sans')"),gs=L("var(--fds-typography-link-small-font-size, 14px)"),ms=L("var(--fds-typography-link-small-letter-spacing, 0px)"),fs=L("var(--fds-typography-link-small-line-height, 150%)"),ys=L("var(--fds-typography-link-small-font-weight, 400)"),bs=L("var(--fds-typography-link-small-text-decoration, underline)"),_s=L("var(--fds-typography-link-small-display, inline-block)"),vs=L("var(--fds-typography-link-default-font-family, 'Public Sans')"),ws=L("var(--fds-typography-link-default-font-size, 16px)"),$s=L("var(--fds-typography-link-default-letter-spacing, 0px)"),ks=L("var(--fds-typography-link-default-line-height, 150%)"),As=L("var(--fds-typography-link-default-font-weight, 400)"),Es=L("var(--fds-typography-link-default-text-decoration, underline)"),xs=L("var(--fds-typography-link-default-display, inline-block)"),Ts=L("var(--fds-typography-ui-helper-font-family, 'Public Sans', 'PublicSans-Regular')"),Ss=L("var(--fds-typography-ui-helper-font-size, 15px)"),Cs=L("var(--fds-typography-ui-helper-letter-spacing, 0px)"),Ms=L("var(--fds-typography-ui-helper-line-height, 100%)"),Os=L("var(--fds-typography-ui-helper-font-weight, 400)"),Ns=L("var(--fds-typography-ui-helper-display, inline-block)"),Ps=L("var(--fds-typography-ui-id-font-family, 'Roboto Mono')"),Ls=L("var(--fds-typography-ui-id-font-size, 13px)"),Is=L("var(--fds-typography-ui-id-letter-spacing, 0px)"),js=L("var(--fds-typography-ui-id-line-height, 100%)"),Ds=L("var(--fds-typography-ui-id-font-weight, 700)"),zs=L("var(--fds-typography-ui-id-display, inline-block)"),Rs=L("var(--fds-typography-ui-label-font-family, 'Public Sans', 'PublicSans-Medium')"),Fs=L("var(--fds-typography-ui-label-font-size, 16px)"),Us=L("var(--fds-typography-ui-label-letter-spacing, 0px)"),Bs=L("var(--fds-typography-ui-label-line-height, 22px)"),Vs=L("var(--fds-typography-ui-label-font-weight, 500)"),Hs=L("var(--fds-typography-ui-label-display, inline-block)"),Ws=L("var(--fds-typography-ui-placeholder-font-family, 'Public Sans', 'PublicSans-Medium')"),Ys=L("var(--fds-typography-ui-placeholder-font-size, 16px)"),qs=L("var(--fds-typography-ui-placeholder-letter-spacing, 0px)"),Ks=L("var(--fds-typography-ui-placeholder-line-height, 100%)"),Qs=L("var(--fds-typography-ui-placeholder-font-weight, 500)"),Gs=L("var(--fds-typography-ui-placeholder-display, inline-block)"),Zs=L("var(--fds-typography-ui-tag-font-family, 'Public Sans', 'PublicSans-Bold')"),Xs=L("var(--fds-typography-ui-tag-font-size, 16px)"),Js=L("var(--fds-typography-ui-tag-letter-spacing, 0px)"),tn=L("var(--fds-typography-ui-tag-line-height, 100%)"),en=L("var(--fds-typography-ui-tag-font-weight, 700)"),sn=L("var(--fds-typography-ui-tag-display, inline-block)"),nn=L("var(--fds-color-brand-black, #000000)"),on=L("var(--fds-color-brand-white, #ffffff)"),an=L("var(--fds-color-danger-200, #e55636)"),rn=L("var(--fds-color-danger-300, #b40000)"),ln=L("var(--fds-color-danger-400, #720000)"),dn=L("var(--fds-color-interactive-100, #90cefe)"),hn=L("var(--fds-color-interactive-200, #1777f8)"),cn=L("var(--fds-color-neutral-50, #F6F6F6)"),pn=L("var(--fds-color-neutral-100, #cdcdd7)"),un=L("var(--fds-color-neutral-200, #9696aa)"),gn=L("var(--fds-color-text-300, #9696aa)"),mn=L("var(--fds-color-text-1000, #000000)");I`
  .body-default-text {
    display: ${Yt};
    font-family: ${Ut};
    font-size: ${Bt};
    font-weight: ${Wt};
    letter-spacing: ${Vt};
    line-height: ${Ht};
  }
`,I`
  .body-large-text {
    display: ${Xt};
    font-family: ${qt};
    font-size: ${Kt};
    font-weight: ${Zt};
    letter-spacing: ${Qt};
    line-height: ${Gt};
  }
`,I`
  .body-micro-text {
    display: ${ne};
    font-family: ${Jt};
    font-size: ${te};
    font-weight: ${se};
    letter-spacing: ${ee};
    line-height: ${ie};
  }
`,I`
  .body-small-text {
    display: ${he};
    font-family: ${oe};
    font-size: ${ae};
    font-weight: ${de};
    letter-spacing: ${re};
    line-height: ${le};
  }
`,I`
  .emphasis-default-text {
    display: ${fe};
    font-family: ${ce};
    font-size: ${pe};
    font-weight: ${me};
    letter-spacing: ${ue};
    line-height: ${ge};
  }
`,I`
  .emphasis-large-text {
    display: ${$e};
    font-family: ${ye};
    font-size: ${be};
    font-weight: ${we};
    letter-spacing: ${_e};
    line-height: ${ve};
  }
`,I`
  .emphasis-micro-text {
    display: ${Se};
    font-family: ${ke};
    font-size: ${Ae};
    font-weight: ${Te};
    letter-spacing: ${Ee};
    line-height: ${xe};
  }
`,I`
  .emphasis-small-text {
    display: ${Le};
    font-family: ${Ce};
    font-size: ${Me};
    font-weight: ${Pe};
    letter-spacing: ${Oe};
    line-height: ${Ne};
  }
`,I`
  .heading-large-1-text {
    display: ${hi};
    font-family: ${oi};
    font-size: ${ai};
    font-weight: ${di};
    letter-spacing: ${ri};
    line-height: ${li};
  }
`,I`
  .heading-large-2-text {
    display: ${fi};
    font-family: ${ci};
    font-size: ${pi};
    font-weight: ${mi};
    letter-spacing: ${ui};
    line-height: ${gi};
  }
`,I`
  .heading-large-3-text {
    display: ${Fe};
    font-family: ${Ie};
    font-size: ${je};
    font-weight: ${Re};
    letter-spacing: ${De};
    line-height: ${ze};
  }
`,I`
  .heading-large-4-text {
    display: ${Ye};
    font-family: ${Ue};
    font-size: ${Be};
    font-weight: ${We};
    letter-spacing: ${Ve};
    line-height: ${He};
  }
`,I`
  .heading-large-5-text {
    display: ${Xe};
    font-family: ${qe};
    font-size: ${Ke};
    font-weight: ${Ze};
    letter-spacing: ${Qe};
    line-height: ${Ge};
  }
`,I`
  .heading-large-6-text {
    display: ${ni};
    font-family: ${Je};
    font-size: ${ti};
    font-weight: ${si};
    letter-spacing: ${ei};
    line-height: ${ii};
  }
`,I`
  .heading-small-1-text {
    display: ${$i};
    font-family: ${yi};
    font-size: ${bi};
    font-weight: ${wi};
    letter-spacing: ${_i};
    line-height: ${vi};
  }
`,I`
  .heading-small-2-text {
    display: ${Si};
    font-family: ${ki};
    font-size: ${Ai};
    font-weight: ${Ti};
    letter-spacing: ${Ei};
    line-height: ${xi};
  }
`,I`
  .heading-small-3-text {
    display: ${Li};
    font-family: ${Ci};
    font-size: ${Mi};
    font-weight: ${Pi};
    letter-spacing: ${Oi};
    line-height: ${Ni};
  }
`,I`
  .heading-small-4-text {
    display: ${Fi};
    font-family: ${Ii};
    font-size: ${ji};
    font-weight: ${Ri};
    letter-spacing: ${Di};
    line-height: ${zi};
  }
`,I`
  .heading-small-5-text {
    display: ${Yi};
    font-family: ${Ui};
    font-size: ${Bi};
    font-weight: ${Wi};
    letter-spacing: ${Vi};
    line-height: ${Hi};
  }
`,I`
  .heading-small-6-text {
    display: ${Xi};
    font-family: ${qi};
    font-size: ${Ki};
    font-weight: ${Zi};
    letter-spacing: ${Qi};
    line-height: ${Gi};
  }
`,I`
  .link-default-text {
    display: ${xs};
    font-family: ${vs};
    font-size: ${ws};
    font-weight: ${As};
    letter-spacing: ${$s};
    line-height: ${ks};
    text-decoration: ${Es};
  }
`,I`
  .link-large-text {
    display: ${os};
    font-family: ${Ji};
    font-size: ${ts};
    font-weight: ${ss};
    letter-spacing: ${es};
    line-height: ${is};
    text-decoration: ${ns};
  }
`,I`
  .link-micro-text {
    display: ${ps};
    font-family: ${as};
    font-size: ${rs};
    font-weight: ${hs};
    letter-spacing: ${ls};
    line-height: ${ds};
    text-decoration: ${cs};
  }
`,I`
  .link-small-text {
    display: ${_s};
    font-family: ${us};
    font-size: ${gs};
    font-weight: ${ys};
    letter-spacing: ${ms};
    line-height: ${fs};
    text-decoration: ${bs};
  }
`,I`
  .ui-helper-text {
    display: ${Ns};
    font-family: ${Ts};
    font-size: ${Ss};
    font-weight: ${Os};
    letter-spacing: ${Cs};
    line-height: ${Ms};
  }
`,I`
  .ui-id-text {
    display: ${zs};
    font-family: ${Ps};
    font-size: ${Ls};
    font-weight: ${Ds};
    letter-spacing: ${Is};
    line-height: ${js};
  }
`;const fn=I`
  .ui-label-text {
    display: ${Hs};
    font-family: ${Rs};
    font-size: ${Fs};
    font-weight: ${Vs};
    letter-spacing: ${Us};
    line-height: ${Bs};
  }
`;I`
  .ui-placeholder-text {
    display: ${Gs};
    font-family: ${Ws};
    font-size: ${Ys};
    font-weight: ${Qs};
    letter-spacing: ${qs};
    line-height: ${Ks};
  }
`,I`
  .ui-tag-text {
    display: ${sn};
    font-family: ${Zs};
    font-size: ${Xs};
    font-weight: ${en};
    letter-spacing: ${Js};
    line-height: ${tn};
  }
`
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */;const yn=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function bn(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):yn(t,e)}
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
var _n;null===(_n=globalThis.HTMLSlotElement)||void 0===_n||_n.prototype.assignedElements;
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const vn=1;let wn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const $n="important",kn=" !"+$n,An=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends wn{constructor(t){var e;if(super(t),t.type!==vn||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const s=t[i];return null==s?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ht){this.ht=new Set;for(const t in e)this.ht.add(t);return this.render(e)}this.ht.forEach(t=>{null==e[t]&&(this.ht.delete(t),t.includes("-")?i.removeProperty(t):i[t]="")});for(const t in e){const s=e[t];if(null!=s){this.ht.add(t);const e="string"==typeof s&&s.endsWith(kn);t.includes("-")||e?i.setProperty(t,e?s.slice(0,-11):s,e?$n:""):i[t]=s}}return ft}});var En,xn,Tn=function(t,e,i,s){var n,o=arguments.length,a=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(o<3?n(a):o>3?n(e,i,a):n(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a};!function(t){t.primary="primary",t.secondary="secondary"}(En||(En={})),function(t){t.left="left",t.right="right"}(xn||(xn={}));class Sn extends It{constructor(){super(...arguments),this.variant=En.primary,this.items=[],this.verticalMenuNavText="",this.verticalMenuThreshold=768,this._open=!1}connectedCallback(){super.connectedCallback(),j(this.shadowRoot,[Sn.cssVariables,fn,Sn.collapsedNavigationStyles,this.desktopStyles()])}render(){const t=this.items.filter(t=>t.position===xn.right),e=this.items.filter(t=>t.position!==xn.right);return mt` <div class="navigation-wrapper">
      <div class="navigation navigation--${this.variant} ui-label-text">
        ${this.variant===En.primary?mt` <div class="navigation__header">
              <slot></slot>
            </div>`:yt}
        <ul class="navigation__body ${this._open?"navigation__open":""}">
          ${e.map(t=>this.renderItem(t)).concat(t.map((t,e)=>this.renderItem(t,0===e?"item__first-right":"")))}
        </ul>
        <div class="navigation__button-wrapper">${this.renderNavigationButton()}</div>
      </div>
    </div>`}renderNavigationButton(){let t;switch(this.variant){case En.primary:t=this._open?mt`<fds-icon icon="chevron-up"></fds-icon>`:mt`<fds-icon icon="chevron-down"></fds-icon>`;break;case En.secondary:t=mt`<fds-icon icon="menu"></fds-icon>`}return mt`
      <button
        class="navigation__button navigation__button--${this.variant}"
        type="button"
        @click=${this.handleNavigationClick}
      >
        <span class="navigation__label ui-label-text">${this.verticalMenuNavText}</span>
        ${t}
      </button>
    `}handleNavigationClick(){this._open=!this._open}renderItem(t,e=""){var i;const s=null!==(i=t.verticalMenuOrder)&&void 0!==i?i:0;return mt` <li
      @click=${()=>this.handleSelect(t)}
      class="item ${this.selected===t?"item--active":""} ${e}"
      style=${An({order:s})}
    >
      <div class="item__label">
        ${t.icon&&mt`<fds-icon class="item__icon" .icon="${t.icon}"></fds-icon>`}
        <span>${t.label}</span>
      </div>
    </li>`}handleSelect(t){this.selected=t,this.dispatchEvent(new CustomEvent("select",{detail:t}))}desktopStyles(){return I`
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
          border-bottom: var(--element-vertical-padding--primary) solid ${on};
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
    `}}Sn.cssVariables=I`
    :host {
      --element-vertical-padding--primary: 9px;
      --element-vertical-padding--secondary: 16px;
      --element-horizontal-padding--primary: 20px;
      --item-border-bottom-width--secondary: 3px;
    }
  `,Sn.collapsedNavigationStyles=I`
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
      background-color: ${nn};
      color: ${on};
    }

    .navigation--primary .item:hover {
      color: ${gn};
    }

    .navigation--primary .navigation__open .item--active .item__label:after {
      content: '';
      position: relative;
      align-self: center;
      height: 0;
      margin-left: auto;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-right: var(--element-vertical-padding--primary) solid ${on};
    }

    .navigation--secondary {
      background-color: ${on};
      border-bottom: 1px solid ${nn};
    }

    .navigation--secondary .item {
      border-bottom: 1px solid ${pn};
    }

    .navigation--secondary .item:hover {
      color: ${gn};
    }

    .navigation__open {
      height: auto;
      width: 100%;
      visibility: visible;
      opacity: 1;
      overflow-y: visible;
      margin-left: 0;
      margin-top: 0;

      border-top: 1px solid ${pn};
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
      background-color: ${nn};
      color: ${on};
      padding: var(--element-vertical-padding--primary);
    }

    .navigation__button--primary:hover {
      color: ${gn};
    }

    .navigation__button--secondary {
      background-color: ${on};
      color: ${nn};
      padding: var(--element-vertical-padding--secondary);
    }

    .navigation__button--secondary:hover {
      color: ${gn};
    }

    .navigation__label {
      margin-right: 10px;
    }
  `,Sn.styles=[Sn.cssVariables,fn,Sn.collapsedNavigationStyles],Tn([bn()],Sn.prototype,"variant",void 0),Tn([bn()],Sn.prototype,"items",void 0),Tn([bn()],Sn.prototype,"selected",void 0),Tn([bn({attribute:"vertical-menu-nav-text"})],Sn.prototype,"verticalMenuNavText",void 0),Tn([bn({type:Number,attribute:"vertical-menu-threshold"})],Sn.prototype,"verticalMenuThreshold",void 0),Tn([function(t){return bn({...t,state:!0})}()],Sn.prototype,"_open",void 0);
/**
     * @license lucide v0.473.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */
const Cn=(t,e,i=[])=>{const s=document.createElementNS("http://www.w3.org/2000/svg",t);return Object.keys(e).forEach(t=>{s.setAttribute(t,String(e[t]))}),i.length&&i.forEach(t=>{const e=Cn(...t);s.appendChild(e)}),s};
/**
     * @license lucide v0.473.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */
const Mn={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};
/**
     * @license lucide v0.473.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */var On=function(t,e,i,s){var n,o=arguments.length,a=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(o<3?n(a):o>3?n(e,i,a):n(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a};const Nn={"alert-circle":["svg",Mn,[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]]],"alert-triangle":["svg",Mn,[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]]],"chevron-down":["svg",Mn,[["path",{d:"m6 9 6 6 6-6"}]]],"chevron-right":["svg",Mn,[["path",{d:"m9 18 6-6-6-6"}]]],"chevron-up":["svg",Mn,[["path",{d:"m18 15-6-6-6 6"}]]],menu:["svg",Mn,[["line",{x1:"4",x2:"20",y1:"12",y2:"12"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18"}]]],pencil:["svg",Mn,[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]]],plus:["svg",Mn,[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]]],"plus-circle":["svg",Mn,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M8 12h8"}],["path",{d:"M12 8v8"}]]],"trash-2":["svg",Mn,[["path",{d:"M3 6h18"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17"}]]],x:["svg",Mn,[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]]],settings:["svg",Mn,[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"}],["circle",{cx:"12",cy:"12",r:"3"}]]],"check-circle":["svg",Mn,[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335"}],["path",{d:"m9 11 3 3L22 4"}]]],"chevrons-left-right-ellipsis":["svg",Mn,[["path",{d:"m18 8 4 4-4 4"}],["path",{d:"m6 8-4 4 4 4"}],["path",{d:"M8 12h.01"}],["path",{d:"M12 12h.01"}],["path",{d:"M16 12h.01"}]]],"message-circle":["svg",Mn,[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z"}]]]};class Pn extends It{constructor(){super(...arguments),this.size=t}render(){if(!this.icon||!Nn[this.icon])return console.error(`invalid icon: '${this.icon}'`),null;const t=(([t,e,i])=>Cn(t,e,i))(Nn[this.icon]);return t.setAttribute("width",this.size.value),t.setAttribute("height",this.size.value),t}}Pn.styles=I`
    :host {
      display: inline-flex;
    }
  `,On([bn()],Pn.prototype,"size",void 0),On([bn()],Pn.prototype,"icon",void 0),customElements.define("fds-icon",Pn),customElements.define("fds-navigation",Sn);const Ln={initialize:function(){const t={label:"Digitraffic",value:"digitraffic",url:"https://www.digitraffic.fi/"},e=[{label:"Liikennetilanne",value:"liikennetilanne",url:"https://liikennetilanne.fintraffic.fi/"},{label:"Palauteväylä",value:"palautevayla",url:"https://www.palautevayla.fi/aspa?lang=fi"},{label:"Junalähdöt",value:"junalahdot",url:"https://junalahdot.fintraffic.fi/"},{label:"Fintraffic Mobiili",value:"fintraffic-mobiili",url:"https://www.fintraffic.fi/fi/mobiili"},{label:"Fintraffic Matka",value:"fintraffic-matka",url:"https://matka.fintraffic.fi/"},{label:"Fintraffic Sky",value:"fintraffic-sky",url:"https://sky.fintraffic.fi/"},t,{label:"Digitransit",value:"digitransit",url:"https://digitransit.fi/"},{label:"NAP",value:"nap",url:"https://finap.fi/#/"}];customElements.whenDefined("fds-navigation").then(()=>{const i=document.createElement("fds-navigation");i.setAttribute("vertical-menu-threshold","1225"),i.innerHTML='\n      <a href="https://www.fintraffic.fi/fi">\n              <svg viewBox="0 0 253 42" style="height: 18px">\n                  <use href="/assets/fintraffic_horizontal_white.svg#fintraffic_horizontal_white"></use>\n              </svg>\n          </a>';i.variant=En.primary,i.items=e,i.selected=t,i.verticalMenuNavText="Services",i.addEventListener("select",e=>{const i=e.detail;window.open(i.url,"_blank"),e.target instanceof Sn&&(e.target.selected=t)}),this.el.replaceWith(i)})}};function In(){$.proxyAll(this,/^_/)}ckan.module("digitraffic_core_top_navigation",Ln);const jn=()=>({initialize(){In.apply(this),this._getMenuController().on("click",this._onMenuControllerClick),this._getMenuController().on("keydown",this._onMenuControllerKeyDown),this._getMenu().on("keydown",this._onMenuKeyDown)},_onMenuControllerClick(t){this._getMenuController().has(t.target)&&this._toggleList()},_onMenuControllerKeyDown(t){if(this._getMenuController().has(t.target)){const{key:e}=t;switch(e){case" ":case"Enter":t.preventDefault(),this._toggleList();break;case"ArrowDown":t.preventDefault(),this._focus("first")}}},_onMenuKeyDown(t){if(this._getMenuController().is(":visible")&&this._getMenu().has(t.target)){const{key:e}=t;switch(e){case"Escape":t.preventDefault(),this._closeList(),this._focus("menuController");break;case"ArrowDown":$(t.target).is("select")||(t.preventDefault(),this._focus("next"));break;case"ArrowUp":$(t.target).is("select")||(t.preventDefault(),this._focus("previous"))}}},_expandedClass:"expanded",_focus(t){let e;const i=this.el.find(":focus")[0],s=!!i&&!!this._getMenu().has(i),n=s&&this._getMenu().find("a:last")[0]===i,o=s&&this._getMenu().find("a:first")[0]===i;switch(t){case"first":e=this._getMenu().find("a:first");break;case"menuController":e=this._getMenuController();break;case"next":if(s){if(n)return;{const t=this._getMenu().find("a");e=t.filter(e=>e>0&&t[e-1]===i)}}else e=this._getMenu().find("a:first");break;case"previous":if(s){if(o)return;{const t=this._getMenu().find("a");e=t.filter(e=>e<t.length-1&&t[e+1]===i)}}else e=this._getMenu().find("a:first")}e.trigger("focus")},_toggleList(){this._isMenuOpen()?(this._closeList(),this._focus("menuController")):(this._openList(),this._focus("first"))},_isMenuOpen(){return this._getMenu().hasClass(this._expandedClass)},_closeList(){const t=this._getMenuController();this._getMenu().removeClass(this._expandedClass),t.attr("aria-expanded","false")},_openList(){const t=this._getMenuController();this._getMenu().addClass(this._expandedClass),t.attr("aria-expanded","true")},_getMenuController(){throw Error("No controller")},_getMenu(){throw Error("No menu")}}),Dn={...jn(),_getMenuController:()=>$("#app-nav-hamburger-button"),_getMenu:()=>$("#nav-interactions-wrapper")};ckan.module("digitraffic_core_app_navigation",Dn);const zn={...jn(),_getMenuController:()=>$("#user-action-select"),_getMenu:()=>$("#user-action-list")};ckan.module("digitraffic_core_user_actions",zn);const Rn={"https://w3id.org/mobilitydcat-ap/mobility-theme/air-and-space-travel":[],"https://w3id.org/mobilitydcat-ap/mobility-theme/cycle-network-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/network-closures-diversions","https://w3id.org/mobilitydcat-ap/mobility-theme/network-detailed-attributes","https://w3id.org/mobilitydcat-ap/mobility-theme/network-geometry-and-lane-character"],"https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-traffic-signs-and-regulations":["https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-closures-and-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/direction-of-travel-on-reversible-lanes","https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-overtaking-bans-on-heavy-goods-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-speed-limits","https://w3id.org/mobilitydcat-ap/mobility-theme/lane-closures-and-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/other-access-restrictions-and-traffic-regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/other-temporary-traffic-management-measures-or-plans","https://w3id.org/mobilitydcat-ap/mobility-theme/road-closures-and-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-closures-and-access-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/filling-and-charging-stations":["https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-charging-points-for-electric-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-filling-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-charging-points","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-filling-stations"],"https://w3id.org/mobilitydcat-ap/mobility-theme/freight-and-logistics":["https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-delivery-areas","https://w3id.org/mobilitydcat-ap/mobility-theme/freight-delivery-regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-delivery-areas"],"https://w3id.org/mobilitydcat-ap/mobility-theme/general-information-for-trip-planning-":["https://w3id.org/mobilitydcat-ap/mobility-theme/address-identifiers","https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-costs","https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-environmental-factors","https://w3id.org/mobilitydcat-ap/mobility-theme/points-of-interest","https://w3id.org/mobilitydcat-ap/mobility-theme/topographic-places"],"https://w3id.org/mobilitydcat-ap/mobility-theme/other":[],"https://w3id.org/mobilitydcat-ap/mobility-theme/parking-service-and-rest-area-information":["https://w3id.org/mobilitydcat-ap/mobility-theme/bike-parking-locations","https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-locations-and-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/park-and-ride-stops","https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-locations-and-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-locations-and-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-accessibility-facilities","https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-geometry"],"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-non-scheduled-transport":["https://w3id.org/mobilitydcat-ap/mobility-theme/accesibility-information-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/fares","https://w3id.org/mobilitydcat-ap/mobility-theme/locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/provider-data","https://w3id.org/mobilitydcat-ap/mobility-theme/reservation-and-purchase-options","https://w3id.org/mobilitydcat-ap/mobility-theme/service-areas-and-service-times"],"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-scheduled-transport":["https://w3id.org/mobilitydcat-ap/mobility-theme/basic-commercial-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/basic-common-standard-fares","https://w3id.org/mobilitydcat-ap/mobility-theme/common-fare-products","https://w3id.org/mobilitydcat-ap/mobility-theme/connection-links","https://w3id.org/mobilitydcat-ap/mobility-theme/disruptions-delays-cancellations","https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/hours-of-operation","https://w3id.org/mobilitydcat-ap/mobility-theme/network-topology-and-routes-lines","https://w3id.org/mobilitydcat-ap/mobility-theme/operational-calendar","https://w3id.org/mobilitydcat-ap/mobility-theme/passenger-classes","https://w3id.org/mobilitydcat-ap/mobility-theme/planned-interchanges-between-scheduled-services","https://w3id.org/mobilitydcat-ap/mobility-theme/purchase-information","https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-estimated-departure-and-arrival-times","https://w3id.org/mobilitydcat-ap/mobility-theme/special-fare-products","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-accessibility-and-paths-within-facility","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-geometry-and-map-layout","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-location-and-features","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-status-of-features","https://w3id.org/mobilitydcat-ap/mobility-theme/timetables-static","https://w3id.org/mobilitydcat-ap/mobility-theme/transport-operators","https://w3id.org/mobilitydcat-ap/mobility-theme/vehicle-details"],"https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-traffic-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/current-travel-times","https://w3id.org/mobilitydcat-ap/mobility-theme/expected-delays","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-length-of-queues","https://w3id.org/mobilitydcat-ap/mobility-theme/predicted-travel-times","https://w3id.org/mobilitydcat-ap/mobility-theme/speed","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-data-at-border-crossings-to-third-countries","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-volume","https://w3id.org/mobilitydcat-ap/mobility-theme/waiting-time-at-border-crossings-to-non-eu-member-states"],"https://w3id.org/mobilitydcat-ap/mobility-theme/road-events-and-conditions":["https://w3id.org/mobilitydcat-ap/mobility-theme/accidents-and-incidents","https://w3id.org/mobilitydcat-ap/mobility-theme/poor-road-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/road-weather-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/road-work-information":["https://w3id.org/mobilitydcat-ap/mobility-theme/long-term-road-works","https://w3id.org/mobilitydcat-ap/mobility-theme/short-term-road-works"],"https://w3id.org/mobilitydcat-ap/mobility-theme/sharing-and-hiring-services":["https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods"],"https://w3id.org/mobilitydcat-ap/mobility-theme/static-road-network-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/geometry","https://w3id.org/mobilitydcat-ap/mobility-theme/gradients","https://w3id.org/mobilitydcat-ap/mobility-theme/junctions","https://w3id.org/mobilitydcat-ap/mobility-theme/number-of-lanes","https://w3id.org/mobilitydcat-ap/mobility-theme/road-classification","https://w3id.org/mobilitydcat-ap/mobility-theme/road-width"],"https://w3id.org/mobilitydcat-ap/mobility-theme/static-traffic-signs-and-regulations":["https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/other-static-traffic-signs","https://w3id.org/mobilitydcat-ap/mobility-theme/other-traffic-regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/permanent-access-restrictions","https://w3id.org/mobilitydcat-ap/mobility-theme/speed-limits","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-circulation-plans","https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-access-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/toll-information":["https://w3id.org/mobilitydcat-ap/mobility-theme/applicable-road-user-charges-and-payment-methods","https://w3id.org/mobilitydcat-ap/mobility-theme/identification-of-tolled-roads","https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-tolling-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods-for-tolls"],"https://w3id.org/mobilitydcat-ap/mobility-theme/waterways-and-water-bodies":[]},Fn=new Set(Object.keys(Rn)),Un=new Set(Object.values(Rn).flat()),Bn={"https://w3id.org/mobilitydcat-ap/mobility-theme/accesibility-information-for-vehicles":{en:"Accesibility information for vehicles",fi:"Ajoneuvojen esteettömyystiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/accidents-and-incidents":{en:"Accidents and incidents",fi:"Liikenneonnettomuudet ja -häiriöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/address-identifiers":{en:"Address identifiers",fi:"Osoitetunnisteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/air-and-space-travel":{en:"Air and space travel",fi:"Ilma- ja avaruusmatkailu"},"https://w3id.org/mobilitydcat-ap/mobility-theme/applicable-road-user-charges-and-payment-methods":{en:"Applicable road user charges and payment methods",fi:"Sovellettavat tienkäyttömaksut ja maksutavat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-charging-points-for-electric-vehicles":{en:"Availability of charging points for electric vehicles",fi:"Sähköajoneuvojen latauspisteiden saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-delivery-areas":{en:"Availability of delivery areas",fi:"Lastaus- ja purkauspaikkojen saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-filling-stations":{en:"Availability of filling stations",fi:"Tankkausasemien saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/basic-commercial-conditions":{en:"Basic commercial conditions",fi:"Kaupalliset perusehdot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/basic-common-standard-fares":{en:"Basic common standard fares",fi:"Yleiset perusmaksut"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-availability":{en:"Bike-hiring Availability",fi:"Vuokrapyörien saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-stations":{en:"Bike-hiring Stations",fi:"Pyöränvuokrausasemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-parking-locations":{en:"Bike-parking locations",fi:"Polkupyöräparkit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-availability":{en:"Bike sharing Availability",fi:"Kaupunkipyörien saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-locations-and-stations":{en:"Bike-sharing Locations and stations",fi:"Kaupunkipyörien sijainnit ja asemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-access-conditions":{en:"Bridge access conditions",fi:"Siltojen käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-closures-and-access-conditions":{en:"Bridge closures and access conditions",fi:"Siltojen sulkemiset ja käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-availability":{en:"Car-hiring Availability",fi:"Autonvuokrauksen saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-stations":{en:"Car-hiring Stations",fi:"Autonvuokrausasemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-availability":{en:"Car parking availability",fi:"Autojen pysäköinnin saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-locations-and-conditions":{en:"Car parking locations and conditions",fi:"Autojen pysäköintipaikat ja -olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-availability":{en:"Car-sharing Availability",fi:"Yhteiskäyttöautojen saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-locations-and-stations":{en:"Car-sharing Locations and stations",fi:"Yhteiskäyttöautojen sijainnit ja asemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/common-fare-products":{en:"Common fare products",fi:"Yleiset lipputuotteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/connection-links":{en:"Connection links",fi:"Vaihtoyhteydet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/current-travel-times":{en:"Current travel times",fi:"Ajankohtaiset matka-ajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/cycle-network-data":{en:"Cycle network data",fi:"Pyöräilyverkon tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/direction-of-travel-on-reversible-lanes":{en:"Direction of travel on reversible lanes",fi:"Vaihtuvasuuntaisten kaistojen ajosuunta"},"https://w3id.org/mobilitydcat-ap/mobility-theme/disruptions-delays-cancellations":{en:"Disruptions, delays, cancellations",fi:"Häiriöt, viivästykset, peruutukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-overtaking-bans-on-heavy-goods-vehicles":{en:"Dynamic overtaking bans on heavy goods vehicles",fi:"Dynaamiset raskaiden ajoneuvojen ohituskiellot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-speed-limits":{en:"Dynamic speed limits",fi:"Dynaamiset nopeusrajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-traffic-signs-and-regulations":{en:"Dynamic traffic signs and regulations",fi:"Dynaamiset liikennemerkit ja -säännöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-availability":{en:"E-scooter-sharing Availability",fi:"Yhteiskäyttöisten sähköpotkulautojen saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-locations-and-stations":{en:"E-scooter-sharing Locations and stations",fi:"Yhteiskäyttöisten sähköpotkulautojen sijainnit ja asemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles":{en:"Environmental standards for vehicles",fi:"Ajoneuvojen ympäristöstandardit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/expected-delays":{en:"Expected delays",fi:"Tiedossa olevat viivästykset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/fares":{en:"Fares",fi:"Maksut ja tariffit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/filling-and-charging-stations":{en:"Filling and charging stations",fi:"Tankkaus- ja latausasemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/freight-and-logistics":{en:"Freight and logistics",fi:"Rahti ja logistiikka"},"https://w3id.org/mobilitydcat-ap/mobility-theme/freight-delivery-regulations":{en:"Freight delivery regulations",fi:"Rahdinkuljetusmääräykset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/general-information-for-trip-planning-":{en:"General information for trip-planning",fi:"Yleistä tietoa reittisuunnitteluun"},"https://w3id.org/mobilitydcat-ap/mobility-theme/geometry":{en:"Geometry",fi:"Geometria"},"https://w3id.org/mobilitydcat-ap/mobility-theme/gradients":{en:"Gradients",fi:"Kaltevuudet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/hours-of-operation":{en:"Hours of operation",fi:"Käyttöajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/identification-of-tolled-roads":{en:"Identification of tolled roads",fi:"Tietullin alaisten teiden yksilöiminen"},"https://w3id.org/mobilitydcat-ap/mobility-theme/junctions":{en:"Junctions",fi:"Liittymät"},"https://w3id.org/mobilitydcat-ap/mobility-theme/lane-closures-and-access-conditions":{en:"Lane closures and access conditions",fi:"Kaistojen sulkemiset ja käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-charging-points":{en:"Location and conditions of charging points",fi:"Latauspisteiden sijainnit ja olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-filling-stations":{en:"Location and conditions of filling stations",fi:"Tankkausasemien sijainnit ja olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-length-of-queues":{en:"Location and length of queues",fi:"Jonojen sijainti ja pituus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-delivery-areas":{en:"Location of delivery areas",fi:"Lastaus- ja purkausalueiden sijainti"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-tolling-stations":{en:"Location of tolling stations",fi:"Tietulliasemien sijainti"},"https://w3id.org/mobilitydcat-ap/mobility-theme/locations-and-stations":{en:"Locations and stations",fi:"Sijainnit ja asemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/long-term-road-works":{en:"Long-term road works",fi:"Pitkäaikaiset tietyöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/network-closures-diversions":{en:"Network closures/diversions",fi:"Verkon suljetut osat ja/tai kiertotiet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/network-detailed-attributes":{en:"Network detailed attributes",fi:"Verkon yksityiskohtaiset tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/network-geometry-and-lane-character":{en:"Network geometry and lane character",fi:"Verkkogeometria ja kaistojen luonne"},"https://w3id.org/mobilitydcat-ap/mobility-theme/network-topology-and-routes-lines":{en:"Network topology and routes/lines",fi:"Verkkotopologia ja reitit/linjat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/number-of-lanes":{en:"Number of lanes",fi:"Kaistojen määrä"},"https://w3id.org/mobilitydcat-ap/mobility-theme/operational-calendar":{en:"Operational Calendar",fi:"Operatiivinen kalenteri"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other":{en:"Other",fi:"Muu"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other-access-restrictions-and-traffic-regulations":{en:"Other access restrictions and traffic regulations",fi:"Muut käyttörajoitukset ja liikennesäännöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other-static-traffic-signs":{en:"Other static traffic signs",fi:"Muut staattiset liikennemerkit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other-temporary-traffic-management-measures-or-plans":{en:"Other temporary traffic management measures or plans",fi:"Muut tilapäiset liikenteenhallintatoimenpiteet tai -suunnitelmat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other-traffic-regulations":{en:"Other traffic regulations",fi:"Muut liikennesäännöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-costs":{en:"Parameters needed to calculate costs",fi:"Kustannusten laskemiseen tarvittavat parametrit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-environmental-factors":{en:"Parameters needed to calculate environmental factors",fi:"Ympäristötekijöiden laskemiseen tarvittavat parametrit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/park-and-ride-stops":{en:"Park and Ride stops",fi:"Julkisen liikenteen liityntäpysäköinti"},"https://w3id.org/mobilitydcat-ap/mobility-theme/parking-service-and-rest-area-information":{en:"Parking, service and rest area information",fi:"Pysäköinti-, palvelu- ja levähdysalueiden tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/passenger-classes":{en:"Passenger classes",fi:"Matkustajaluokat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods":{en:"Payment methods",fi:"Maksutavat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods-for-tolls":{en:"Payment methods for tolls",fi:"Tietullien maksutavat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-accessibility-facilities":{en:"Pedestrian accessibility facilities",fi:"Jalankulkijoiden esteettömyyttä tukevat välineet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-data":{en:"Pedestrian network data",fi:"Jalankulkuverkon tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-geometry":{en:"Pedestrian network geometry",fi:"Jalankulkuverkon geometria"},"https://w3id.org/mobilitydcat-ap/mobility-theme/permanent-access-restrictions":{en:"Permanent access restrictions",fi:"Pysyvät käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/planned-interchanges-between-scheduled-services":{en:"Planned interchanges between scheduled services",fi:"Suunnitellut vaihdot säännöllisten palvelujen välillä"},"https://w3id.org/mobilitydcat-ap/mobility-theme/points-of-interest":{en:"Points of interest",fi:"Kohdepisteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/poor-road-conditions":{en:"Poor road conditions",fi:"Huonokuntoiset tiet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/predicted-travel-times":{en:"Predicted travel times",fi:"Ennustetut matka-ajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/provider-data":{en:"Provider data",fi:"Palveluntarjoajan tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-non-scheduled-transport":{en:"Public transport non-scheduled transport",fi:"Joukkoliikenne, aikatauluttamaton"},"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-scheduled-transport":{en:"Public transport scheduled transport",fi:"Joukkoliikenne, säännöllinen"},"https://w3id.org/mobilitydcat-ap/mobility-theme/purchase-information":{en:"Purchase information",fi:"Ostotiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-estimated-departure-and-arrival-times":{en:"Real-time estimated departure and arrival times",fi:"Reaaliaikaiset arvioidut lähtö- ja saapumisajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-traffic-data":{en:"Real-time traffic data",fi:"Reaaliaikaiset liikennetiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/reservation-and-purchase-options":{en:"Reservation and purchase options",fi:"Varaus- ja ostovaihtoehdot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-classification":{en:"Road classification",fi:"Tien luokitus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-closures-and-access-conditions":{en:"Road closures and access conditions",fi:"Teiden sulkemiset ja käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-events-and-conditions":{en:"Road events and conditions",fi:"Tieolosuhteet ja tapahtumat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-weather-conditions":{en:"Road weather conditions",fi:"Tieolosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-width":{en:"Road width",fi:"Teiden leveys"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-work-information":{en:"Road work information",fi:"Tietyötiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-availability":{en:"Service and rest area availability",fi:"Palvelu- ja levähdysalueiden saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-locations-and-conditions":{en:"Service and rest area locations and conditions",fi:"Palvelu- ja levähdysalueiden sijainnit ja olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/service-areas-and-service-times":{en:"Service areas and service times",fi:"Palvelualueet ja palveluajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/sharing-and-hiring-services":{en:"Sharing and Hiring Services",fi:"Vuokraus- ja yhteiskäyttöpalvelut"},"https://w3id.org/mobilitydcat-ap/mobility-theme/short-term-road-works":{en:"Short-term road works",fi:"Lyhytaikaiset tietyöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/special-fare-products":{en:"Special Fare Products",fi:"Erikoismaksutuotteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/speed":{en:"Speed",fi:"Nopeus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/speed-limits":{en:"Speed limits",fi:"Nopeusrajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/static-road-network-data":{en:"Static road network data",fi:"Staattiset tieverkon tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/static-traffic-signs-and-regulations":{en:"Static traffic signs and regulations",fi:"Staattiset liikennemerkit ja -säännöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-accessibility-and-paths-within-facility":{en:"Stop facilities accessibility and paths within facility",fi:"Pysäkkipalveluiden esteettömyys ja reitit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-geometry-and-map-layout":{en:"Stop facilities geometry and map layout",fi:"Pysäkkipalveluiden geometria ja kartta"},"https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-location-and-features":{en:"Stop facilities location and features",fi:"Pysäkkipalveluiden sijainti ja ominaisuudet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-status-of-features":{en:"Stop facilities status of features",fi:"Pysäkkipalveluiden ominaisuuksien tila"},"https://w3id.org/mobilitydcat-ap/mobility-theme/timetables-static":{en:"Timetables static",fi:"Aikataulut, staattiset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/toll-information":{en:"Toll information",fi:"Tietullitiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/topographic-places":{en:"Topographic places",fi:"Topografiset paikat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-circulation-plans":{en:"Traffic circulation plans",fi:"Liikennevirtasuunnitelmat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-data-at-border-crossings-to-third-countries":{en:"Traffic data at border crossings to third countries",fi:"Liikennetiedot rajanylityspaikoilla kolmansiin maihin"},"https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-volume":{en:"Traffic volume",fi:"Liikenteen määrä"},"https://w3id.org/mobilitydcat-ap/mobility-theme/transport-operators":{en:"Transport operators",fi:"Liikenteenharjoittajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-availability":{en:"Truck parking availability",fi:"Kuorma-autopysäköinnin saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-locations-and-conditions":{en:"Truck parking locations and conditions",fi:"Kuorma-autojen pysäköintipaikat ja -olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-access-conditions":{en:"Tunnel access conditions",fi:"Tunneleiden käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-closures-and-access-conditions":{en:"Tunnel closures and access conditions",fi:"Tunneleiden sulkemiset ja käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/vehicle-details":{en:"Vehicle details",fi:"Ajoneuvojen tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/waiting-time-at-border-crossings-to-non-eu-member-states":{en:"Waiting time at border crossings to non-EU Member States",fi:"Odotusaika rajanylityspaikoilla EU:n ulkopuolisiin maihin"},"https://w3id.org/mobilitydcat-ap/mobility-theme/waterways-and-water-bodies":{en:"Waterways and water bodies",fi:"Vesiväylät ja vesistöt"}};function Vn(t){return"string"==typeof t&&Fn.has(t)}const Hn={state:{},initialize(){In.apply(this),this.state={topMobilityTheme:this._getInitialMobilityTheme()};this._getTopMobilityThemeSelector().on("change",this._onTopMobilityThemeChanged),this._onStateUpdate(this._handleTopMobilityThemeChanged),this._subThemeSelectorViewUpdate(void 0,this.state)},teardown:function(){this._stateListeners=void 0},_getInitialMobilityTheme(){const t=this._getTopMobilityThemeSelector().val();return Vn(t)?t:void 0},_getInitialSubMobilityTheme(){const t=this._getInitialSubMobilityThemeSelector().val();return"string"==typeof(e=t)&&Un.has(e)?t:void 0;var e},_getTopMobilityThemeSelector(){return this.$("#field-mobility_theme")},_getInitialSubMobilityThemeSelector(){return this.$("#mobility_theme_sub_value")},_getSubMobilityThemeSelector(){return this.$("#field-mobility_theme_sub")},_onTopMobilityThemeChanged(t){if(t.target instanceof HTMLSelectElement){const e=t.target.value;if(!Vn(e))throw new Error(`Invalid mobility theme: ${e}`);this._mergeState({topMobilityTheme:e})}},_stateChangedKeys(t,e){const i=new Set;for(const s in t)s in e?t[s]!==e[s]&&i.add(s):i.add(s);for(const s in e)s in t||i.add(s);return i},_triggerListeners(t,e){if(this._stateListeners)for(const i of this._stateListeners)i(t,e)},_updateState(t){const e=this.state;this.state=t;const i=this._stateChangedKeys(e,t);return this._triggerListeners(e,i),t},_mergeState(t){const e=this.state,i={...this.state,...t};this.state=i;const s=this._stateChangedKeys(e,i);return this._triggerListeners(e,s),i},_onStateUpdate(t){return this._stateListeners?this._stateListeners.push(t):this._stateListeners=[t],()=>{this._stateListeners&&(this._stateListeners=this._stateListeners.filter(e=>e!==t))}},_handleTopMobilityThemeChanged(t,e){e.has("topMobilityTheme")&&this._subThemeSelectorViewUpdate(t,this.state)},_subThemeSelectorViewUpdate(t,e){function i(t){return"object"==typeof t&&!!t.subMobilityThemeSelectorParent&&!!t.subMobilityThemeSelector}function s(){const t=this._getSubMobilityThemeSelector().parentsUntil("form").filter("div.form-group");"none"!==t.css("display")?t.css("display","none"):t.css("display","")}const n=void 0===t,o=t?.topMobilityTheme!==e.topMobilityTheme;if(n||o){if(e.topMobilityTheme){const t=Rn[e.topMobilityTheme].map(t=>t),n=this._getInitialSubMobilityTheme();if(t?.length>0){(function(){if(i(e)){e.subMobilityThemeSelectorParent.append(e.subMobilityThemeSelector),s.apply(this);const t={...e},i=new Set(["subMobilityThemeSelector","subMobilityThemeSelectorParent"]),n=Object.keys(t).reduce((e,s)=>(i.has(s)||(e[s]=t[s]),e),{});this._updateState(n)}}).apply(this);const o=function(t,e){const i=t.map(t=>{const i=document.createElement("option");i.value=t;const s=$("html").attr("lang")??"en";return i.text=Bn[t][s]??Bn[t].en,t===e&&(i.selected=!0),i}),s=document.createElement("option");return s.value="",s.text="",e||(s.selected=!0),i.unshift(s),i.sort((t,e)=>t.text.localeCompare(e.text)),i}.apply(this,[t,n]);return void function(t){this._getSubMobilityThemeSelector().empty().append(t)}.apply(this,[o])}}(function(){if(!i(e)){s.apply(this);const t=this._getSubMobilityThemeSelector().parent(),e=this._getSubMobilityThemeSelector().detach();this._mergeState({subMobilityThemeSelector:e,subMobilityThemeSelectorParent:t})}}).apply(this)}}};ckan.module("digitraffic_core_dataset_form_wrapper",Hn);const Wn={initialize(){In.apply(this)}};ckan.module("digitraffic_core_iri_fragment_inputs",Wn);const Yn={initialize(){In.apply(this);const t=this._getForm(),e=this._getFormInput(),i=this._getLanguageDropdown(),s=this._getLanguageOptions();i.on("click",this._toggleLanguageDropdownMouseOpen),i.on("keydown",this._toggleLanguageDropdownKeyboardOpen),s.each((i,s)=>{const n=$(s);n.on("click",()=>this._submitFormMouse(n,e,t)),n.on("keydown",i=>this._submitFormKeyboard(i,n,e,t))})},_toggleLanguageDropdownMouseOpen(t){t.target&&t.target.classList.toggle("open")},_toggleLanguageDropdownKeyboardOpen(t){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),t.target&&t.target.classList.toggle("open"))},_submitFormMouse(t,e,i){const s=t.attr("data-value");e&&s&&e.val(s),i&&i.trigger("submit")},_submitFormKeyboard(t,e,i,s){if("Enter"===t.key||" "===t.key){const t=e.attr("data-value");i&&t&&i.val(t),s&&s.trigger("submit")}},_getForm(){return this.$("#language-menu-form")},_getFormInput(){return this.$("#language-option-hidden")},_getLanguageDropdown(){return this.$(".custom-language-dropdown")},_getLanguageOptions(){return this.$(".custom-language-option")}};ckan.module("digitraffic_core_language_menu",Yn);const qn={START_TIMESTAMP_TZ_CSS_QUERY:"#field-start_timestamp-tz",END_TIMESTAMP_TZ_CSS_QUERY:"#field-end_timestamp-tz",initialize(){In.apply(this);const t=this._getStartTimestampTZ(),e=this._getEndTimestampTZ();this._moveToEnd(t),t.find(this.START_TIMESTAMP_TZ_CSS_QUERY).on("change",t=>{const i=t.target.value;e.find(this.END_TIMESTAMP_TZ_CSS_QUERY).val(i)}),e.hide(),this._showNecessityLabels()},_getStartTimestampTZ(){return this.$(".datetime-row").find(".datetime-field").has(this.START_TIMESTAMP_TZ_CSS_QUERY)},_getEndTimestampTZ(){return this.$(".datetime-row").find(".datetime-field").has(this.END_TIMESTAMP_TZ_CSS_QUERY)},_moveToEnd(t){t.appendTo(this.el)},_showNecessityLabels(){const t=this.$(".hide-necessity");t.length&&t.removeClass("hide-necessity")}};ckan.module("digitraffic_core_temporal_coverage",qn);var Kn=function(t,e,i,s){var n,o=arguments.length,a=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(o<3?n(a):o>3?n(e,i,a):n(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a};class Qn extends CustomEvent{constructor(t){super("select",{detail:t,bubbles:!0,cancelable:!0,composed:!1})}}class Gn extends It{constructor(){super(),this.options=[],this.disabled=!1,this.error=!1,this.multiple=!1,this.required=!1,this.addEventListener("blur",()=>this.getButton().ariaExpanded="false"),this._internals=this.attachInternals()}firstUpdated(){this.tabIndex=0,this.setValidity(),this.multiple&&this.setMultipleHeaderContent(),this.setFormValue()}render(){const t=t=>mt`
      <li
        @click=${()=>this.handleSelect(t)}
        @keypress=${e=>this.handleKeypress(e,t)}
        class=${`ui-label-text option ${this.getOptionCssClass(t)}`}
        tabindex=${0}
        aria-selected=${this.value===t}
      >
        ${this.getLabel(t)}
      </li>
    `,e=t=>mt`
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
    `,i=mt`
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
    `,s=0===this.renderRoot.children.length;return mt`
      <div class="dropdown-wrapper">
        <button
          @click=${()=>{const t=this.getButton();t.ariaExpanded=(!("true"===t.ariaExpanded)).toString()}}
          ?disabled=${this.disabled}
          class=${`ui-label-text ${this.getButtonCssClass()}`}
          role="combobox"
          aria-controls="options-list"
          aria-expanded=${(t=>null!=t?t:yt)(s?"false":this.getButton().ariaExpanded)}
        >
          ${this.multiple?(()=>{const t=this.value,e=mt`<div>${this.placeholder||""}</div>`;if(null==t)return e;if(!Array.isArray(t))throw new Error("Selected options should be an array when multiple is true");return 0===t.length?e:mt`
        <div class="selected-options-container">
          <div class="selected-options">
            ${t.map(t=>mt` <span class="selected-tag">${this.getLabel(t)}</span> `)}
          </div>
          <span class="overflow-counter"></span>
        </div>
      `})():(()=>{var t;return mt` <div>${null!==(t=this.getLabel(this.value))&&void 0!==t?t:this.placeholder}</div> `})()}
          <fds-icon icon="chevron-up"></fds-icon>
          <fds-icon icon="chevron-down"></fds-icon>
        </button>
        ${i}
      </div>
    `}setMultipleHeaderContent(){const t=this.renderRoot.querySelector(".selected-options-container"),e=this.renderRoot.querySelector(".selected-options"),i=this.renderRoot.querySelector(".overflow-counter");if(!t||!e||!i)return;const s=Array.from(e.querySelectorAll(".selected-tag"));let n=0;const o=t.clientWidth-30;let a=0;s.forEach(t=>{const e=t;a+=e.offsetWidth;const i=e.querySelector("fds-icon");i&&(a+=parseInt(i.size.value)),a>o?(e.classList.add("hidden"),n++):e.classList.remove("hidden")}),n>0?(i.classList.remove("hidden"),i.textContent=`+${n}`):(i.textContent="",i.classList.add("hidden"))}updated(){this.setMultipleHeaderContent()}handleKeypress(t,e){"Enter"===t.key&&this.handleSelect(e)}getButton(){const t=this.renderRoot.querySelector("button");if(null===t)throw new Error("Button element not found");return t}handleSelect(t){this.getButton().ariaExpanded="false",this.value=t,this.setValidity(),this.setFormValue(),this.dispatchEvent(new Qn(t))}handleMultiSelect(t){const e=this.getValues();this.value=e.length>0?e:void 0,this.setValidity(),this.setFormValue(),this.dispatchEvent(new Qn(t))}getLabel(t){if(!t)return null;if(Array.isArray(t)){if(0===t.length)return null;t=t[0]}const e=mt`<span class="label">${t.label}</span>`;return t.icon?mt`<span class="icon-label"><fds-icon .icon=${t.icon}></fds-icon>${e}</span>`:e}getValues(){var t;const e=t=>this.options.find(e=>e.label===t);let i=[];if(this.multiple){const t=this.renderRoot.querySelectorAll("fds-checkbox");i=Array.from(t).filter(t=>t.checked).map(t=>{if(null===t.labels||null===t.labels[0].textContent)return;const i=t.labels[0].textContent.trim();return e(i)}).filter(t=>void 0!==t)}else{const s=this.renderRoot.querySelectorAll("li"),n=Array.from(s).find(t=>"true"===t.getAttribute("aria-selected"));if(void 0!==n){const s=null===(t=n.textContent)||void 0===t?void 0:t.trim();if(void 0!==s){const t=e(s);i=t?[t]:[]}}}return structuredClone(i)}getButtonCssClass(){return this.error?"error":!this.value&&this.placeholder?"placeholder":""}getOptionCssClass(t){return this.value===t?"selected":""}checkValidity(){return this._internals.checkValidity()}reportValidity(){return this._internals.reportValidity()}get labels(){return this._internals.labels}get validity(){return this._internals.validity}get validationMessage(){return this._internals.validationMessage}setValidity(){const t=!!this.required&&void 0===this.value;this._internals.setValidity({valueMissing:t,customError:this.error},"Invalid state")}setFormValue(){const t=this.name;if(void 0!==t){const e=new FormData;this.getValues().forEach(i=>{i.value&&e.append(t,i.value.toString())}),this._internals.setFormValue(e)}}}Gn.formAssociated=!0,Gn.shadowRootOptions={...It.shadowRootOptions,delegatesFocus:!0},Gn.styles=[fn,I`
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

        background-color: ${on};
        border: 1px solid ${un};
      }

      button:disabled {
        cursor: default;
        background-color: ${cn};
        color: ${gn};
      }

      button:disabled .chevron {
        color: ${gn};
      }

      button.placeholder {
        color: ${gn};
      }

      button.error {
        color: ${an};
        border: 3px solid ${an};
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
        background: ${pn};
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
        box-shadow: ${Ft};
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
        color: ${mn};
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

        background-color: ${on};
        border-bottom: 1px solid ${un};

        &.option-multiple {
          cursor: pointer;
          gap: 10px;
          flex-wrap: nowrap;
        }
      }

      .option:hover {
        /* TODO: what color? */
        background-color: ${dn};
      }

      .option.selected {
        /* TODO: what color? */
        background-color: ${hn};
      }
    `],Kn([bn({type:Array})],Gn.prototype,"options",void 0),Kn([bn({type:Boolean})],Gn.prototype,"disabled",void 0),Kn([bn({type:Boolean})],Gn.prototype,"error",void 0),Kn([bn()],Gn.prototype,"placeholder",void 0),Kn([bn({type:Object})],Gn.prototype,"value",void 0),Kn([bn({type:Boolean})],Gn.prototype,"multiple",void 0),Kn([bn({type:Boolean})],Gn.prototype,"required",void 0),Kn([bn()],Gn.prototype,"name",void 0);var Zn=function(t,e,i,s){var n,o=arguments.length,a=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(o<3?n(a):o>3?n(e,i,a):n(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a};class Xn extends It{constructor(){super(),this.label="",this.disabled=!1,this.checked=!1,this.value="on",this._internals=this.attachInternals(),this.addEventListener("click",t=>{var e;if(t.target===this){t.preventDefault(),t.stopPropagation();const i=null===(e=this.shadowRoot)||void 0===e?void 0:e.getElementById("checkbox");i&&i.click()}})}firstUpdated(){this.tabIndex=0,this.setValidity()}render(){return mt`
      <input
        type="checkbox"
        id="checkbox"
        .disabled=${this.disabled}
        .checked="${this.checked}"
        .value="${this.value}"
        @change=${this.handleSelect}
        @click=${t=>{t.stopPropagation()}}
      />
      ${this.label&&mt`<label for="checkbox" class="ui-label-text">${this.label}</label>`}
    `}handleSelect(){this.disabled||(this.checked=!this.checked,this.setValidity(),this.setFormValue(),setTimeout(()=>{this.dispatchEvent(new CustomEvent("select",{detail:this.checked}))}))}checkValidity(){return this._internals.checkValidity()}reportValidity(){return this._internals.reportValidity()}get validity(){return this._internals.validity}get labels(){return this._internals.labels}get validationMessage(){return this._internals.validationMessage}setValidity(){var t;const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.getElementById("checkbox");this._internals.setValidity(e.validity,e.validationMessage,e)}setFormValue(){if(this.checked){void 0!==this.name&&this._internals.setFormValue(this.value.toString())}else this._internals.setFormValue(null)}}Xn.formAssociated=!0,Xn.shadowRootOptions={...It.shadowRootOptions,delegatesFocus:!0},Xn.styles=[fn,I`
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
        border: 2px solid ${nn};
        border-radius: ${zt};
      }

      #checkbox:checked::before {
        border-color: ${hn};
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEwIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0zLjM4Nzc2IDcuNDAzM0wwLjE0NjA2NiA0LjE2MTYxQy0wLjA0ODY4ODcgMy45NjY4NSAtMC4wNDg2ODg3IDMuNjUxMDggMC4xNDYwNjYgMy40NTYzMUwwLjg1MTM0OSAyLjc1MUMxLjA0NjEgMi41NTYyMyAxLjM2MTkgMi41NTYyMyAxLjU1NjY1IDIuNzUxTDMuNzQwNDEgNC45MzQ3NEw4LjQxNzc4IDAuMjU3Mzk0QzguNjEyNTQgMC4wNjI2Mzk0IDguOTI4MzMgMC4wNjI2Mzk0IDkuMTIzMDggMC4yNTczOTRMOS44MjgzNyAwLjk2MjY5NkMxMC4wMjMxIDEuMTU3NDUgMTAuMDIzMSAxLjQ3MzIyIDkuODI4MzcgMS42NjhMNC4wOTMwNiA3LjQwMzMyQzMuODk4MjkgNy41OTgwOCAzLjU4MjUxIDcuNTk4MDggMy4zODc3NiA3LjQwMzNWNy40MDMzWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==');
        background-color: ${hn};
        background-repeat: no-repeat;
        background-position: center;
      }

      #checkbox:disabled::before,
      #checkbox:disabled + label {
        cursor: default;
        color: ${gn};
      }

      #checkbox:disabled::before {
        border-color: ${gn};
      }

      #checkbox:disabled#checkbox:checked::before {
        background-color: ${gn};
      }
    `],Zn([bn()],Xn.prototype,"label",void 0),Zn([bn({type:Boolean})],Xn.prototype,"disabled",void 0),Zn([bn({type:Boolean})],Xn.prototype,"checked",void 0),Zn([bn()],Xn.prototype,"value",void 0),Zn([bn()],Xn.prototype,"name",void 0),customElements.define("fds-checkbox",Xn),customElements.define("fds-dropdown",Gn);const Jn={initialize(){In.apply(this);const t=this._getOptionValues();customElements.whenDefined("fds-dropdown").then(()=>{const e=document.createElement("fds-dropdown");e.options=this._optionValuesToFdsDropdownOptions(t),e.value=this._optionValuesToFdsDropdownOptions(t.filter(t=>t.selected)),e.multiple=!0,e.setAttribute("id",this.el[0].id),this.el[0].name&&e.setAttribute("name",this.el[0].name),this.el.replaceWith(e)})},_getOptionValues(){return this.$("option").toArray().map(t=>{if(null===t.textContent)throw new Error("Option element does not have text content");const e=t.textContent.trim();if(""!==e)return{label:e,value:t.value,selected:""===t.getAttribute("selected")}}).filter(t=>void 0!==t)},_optionValuesToFdsDropdownOptions:t=>t.map(t=>({label:t.label,value:t.value}))};ckan.module("digitraffic_core_multi_select",Jn);const to={initialize(){In.apply(this);this._getToggleButtons().children(".language-toggle-button").each((t,e)=>{const i=$(e),s=i.attr("id");i.on("click",t=>{t.preventDefault();this.$(`#field-${s}`).parent().parent().removeClass("hidden"),i.addClass("hidden")})});this._getCloseButtons().each((t,e)=>{const i=$(e),s=i.attr("id");i.on("click",t=>{t.preventDefault();$(`#${s}.language-toggle-button`).removeClass("hidden"),i.parent().parent().addClass("hidden");this.$(`#field-${s}`).val("")})})},_getToggleButtons(){return this.$(".language-toggle-buttons")},_getCloseButtons(){return this.$(".hide-language-input")}};ckan.module("digitraffic_core_language_toggle_buttons",to);var eo,io=function(t,e,i,s){var n,o=arguments.length,a=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(o<3?n(a):o>3?n(e,i,a):n(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a};!function(t){t.primary="primary",t.secondary="secondary",t.tertiary="tertiary",t.danger="danger"}(eo||(eo={}));const so={primary:on,secondary:nn,tertiary:nn,danger:on};class no extends It{constructor(){super(),this.variant=eo.primary,this.disabled=!1,this._internals=this.attachInternals()}updated(t){(t.has("value")||t.has("name"))&&(this.setValidity(),this.setFormValue())}render(){return mt`
      <button id="button" class="button--${this.variant}" ?disabled="${this.disabled}">
        ${this.icon&&mt`<fds-icon .icon="${this.icon}"></fds-icon>`}
        ${this.label&&mt`<span class="ui-label-text">${this.label}</span>`}
      </button>
    `}checkValidity(){return this._internals.checkValidity()}reportValidity(){return this._internals.reportValidity()}get validity(){return this._internals.validity}get labels(){return this._internals.labels}get validationMessage(){return this._internals.validationMessage}setValidity(){var t;const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.getElementById("button");this._internals.setValidity(e.validity,e.validationMessage,e)}setFormValue(){if(this.name&&void 0!==this.value){void 0!==this.name&&this._internals.setFormValue(this.value.toString())}else this._internals.setFormValue(null)}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this._handleFormSubmit)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this._handleFormSubmit)}_handleFormSubmit(){if("submit"===this.type||void 0===this.type){const t=this._internals.form;null==t||t.requestSubmit()}}}no.formAssociated=!0,no.shadowRootOptions={...It.shadowRootOptions,delegatesFocus:!0},no.styles=[fn,I`
      :host {
        display: inline-flex;
        justify-content: center;
      }

      button {
        cursor: pointer;
        display: flex;
        border: 2px solid ${nn};
        border-radius: ${Rt};
        padding: 13px 16px;
        height: ${Dt};
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
        border-color: ${nn};
        background: ${nn};
        color: ${so[eo.primary]};
      }

      .button--secondary {
        border: 2px solid ${nn};
        background: ${on};
        color: ${so[eo.secondary]};
      }

      .button--tertiary {
        background: transparent;
        border-color: transparent;
        color: ${so[eo.tertiary]};
      }

      .button--danger {
        background: ${rn};
        border-color: transparent;
        color: ${so[eo.danger]};
      }

      .button--primary:hover,
      .button--secondary:hover,
      .button--tertiary:hover {
        background: ${hn};
        border-color: transparent;
        color: ${on};
      }

      .button--danger:hover {
        background: ${ln};
        border-color: ${ln};
        color: ${on};
      }

      .button--primary:disabled {
        background: ${pn};
        border-color: ${pn};
        color: ${gn};
      }

      .button--secondary:disabled {
        background: transparent;
        color: ${pn};
        border-color: ${pn};
      }

      .button--tertiary:disabled {
        background: transparent;
        border-color: transparent;
        color: ${pn};
      }

      .button--danger:disabled {
        background: ${pn};
        border-color: transparent;
        color: ${gn};
      }
    `],io([bn()],no.prototype,"variant",void 0),io([bn({type:Boolean})],no.prototype,"disabled",void 0),io([bn()],no.prototype,"icon",void 0),io([bn()],no.prototype,"label",void 0),io([bn()],no.prototype,"type",void 0),io([bn()],no.prototype,"name",void 0),io([bn()],no.prototype,"value",void 0),customElements.define("fds-button",no);class oo extends Error{constructor(t){super(t),this.name="TemplateError"}}const ao=()=>({fieldName:"NOT_SET",initialize(){In.apply(this)},_getIndex(){const t=this.el.closest(`[data-field='${this.fieldName}']`);if(1!==t.length)throw new Error("Element not found");const e=t.attr("data-group-index");if(void 0===e)throw new Error("Index not found");if(e.startsWith("REPEATING-INDEX"))throw new oo("Template");return parseInt(e)},_getAllFields(){const t=this._getIndex(),e=this._getAllFieldNames(t);return this._getFields(e)},_getFields(t){let e=$();for(const i of t){const t=this.el.find(`[name='${i}']`);if(0===t.length)throw new Error(`Field element not found for field ${i}`);e=e.add(t)}return e},_getParentFormGroup(t){const e=t.closest(".form-group");if(0===e.length)throw new Error("Parent form group not found");return e},_getAllFieldNames(t){throw Error("No All Field Names")}}),ro=()=>{const t=ao();return{...t,initialize(){t.initialize.call(this);try{const t=this._getTypeEl(),e=t.val();this._onlyShowTypeFields(e),t.on("change",t=>{const e=t.target.value;this._onlyShowTypeFields(e)})}catch(t){if(t instanceof oo)return;throw t}},typeFieldName:"NOT_SET",_getTypeEl(){const t=this._getIndex(),e=`${this.fieldName}-${t}-${this.typeFieldName}`,i=this.el.find(`select[name='${e}']`);if(0===i.length)throw new Error(`Element not found for index ${t}`);return i},_onlyShowTypeFields(t){const e=this._getTypeFields(t),i=this._getAllFields().not(e).map((t,e)=>this._getParentFormGroup($(e))[0]),s=e.map((t,e)=>this._getParentFormGroup($(e))[0]);i.addClass("display-none"),s.removeClass("display-none")},_getTypeFields(t){throw Error("No Type Fieds")}}};var lo;!function(t){t.PERSON="http://www.w3.org/2006/vcard/ns#Individual",t.ORGANIZATION="http://www.w3.org/2006/vcard/ns#Organization"}(lo||(lo={}));const ho={...ro(),fieldName:"contact_point",typeFieldName:"contact_point_type",_getTypeFields(t){const e=this._getIndex(),i=this._getAllFieldNames(e);let s;if(t===lo.PERSON&&(s=i),t===lo.ORGANIZATION){const t=new Set([`contact_point-${e}-organization_name`]);s=new Set([...i].filter(e=>!t.has(e)))}if(void 0===s)throw new Error(`Contact point type field names not found for type ${t}`);return this._getFields(s)},_getAllFieldNames:t=>new Set([`contact_point-${t}-contact_point_type`,`contact_point-${t}-fn`,`contact_point-${t}-organization_name`,`contact_point-${t}-has_email`,`contact_point-${t}-has_telephone`,`contact_point-${t}-has_url`,`contact_point-${t}-street_address`,`contact_point-${t}-locality`,`contact_point-${t}-postal_code`,`contact_point-${t}-region`,`contact_point-${t}-country_name`])};var co;ckan.module("digitraffic_core_contact_detail",ho),function(t){t.ACADEMIA="http://purl.org/adms/publishertype/Academia-ScientificOrganisation",t.COMPANY="http://purl.org/adms/publishertype/Company",t.INDUSTRY_CONSORTIUM="http://purl.org/adms/publishertype/IndustryConsortium",t.LOCAL_AUTHORITY="http://purl.org/adms/publishertype/LocalAuthority",t.NATIONAL_AUTHORITY="http://purl.org/adms/publishertype/NationalAuthority",t.NON_GOVERNMENTAL_ORGANIZATION="http://purl.org/adms/publishertype/NonGovernmentalOrganisation",t.NON_PROFIT_ORGANIZATION="http://purl.org/adms/publishertype/NonProfitOrganisation",t.PRIVATE_INDIVIDUAL="http://purl.org/adms/publishertype/PrivateIndividual(s)",t.REGIONAL_AUTHORITY="http://purl.org/adms/publishertype/RegionalAuthority",t.STANDARDISATION_BODY="http://purl.org/adms/publishertype/StandardisationBody",t.SUPER_NATIONAL_AUTHORITY="http://purl.org/adms/publishertype/SupraNationalAuthority"}(co||(co={}));const po={...ro(),fieldName:"rights_holder",typeFieldName:"type",_getTypeFields(t){const e=this._getIndex(),i=this._getAllFieldNames(e),s=new Set([co.ACADEMIA,co.COMPANY,co.INDUSTRY_CONSORTIUM,co.LOCAL_AUTHORITY,co.NATIONAL_AUTHORITY,co.NON_GOVERNMENTAL_ORGANIZATION,co.NON_PROFIT_ORGANIZATION,co.REGIONAL_AUTHORITY,co.STANDARDISATION_BODY,co.SUPER_NATIONAL_AUTHORITY]);let n;if(t===co.PRIVATE_INDIVIDUAL&&(n=i),s.has(t)){const t=new Set([`rights_holder-${e}-first_name`,`rights_holder-${e}-surname`,`rights_holder-${e}-workplace_homepage`,`rights_holder-${e}-member_of`]);n=new Set([...i].filter(e=>!t.has(e)))}if(void 0===n)throw new Error(`Rights holder type field names not found for type ${t}`);return this._getFields(n)},_getAllFieldNames:t=>new Set([`rights_holder-${t}-type`,`rights_holder-${t}-name`,`rights_holder-${t}-first_name`,`rights_holder-${t}-surname`,`rights_holder-${t}-mbox`,`rights_holder-${t}-phone`,`rights_holder-${t}-thoroughfare`,`rights_holder-${t}-post_name`,`rights_holder-${t}-post_code`,`rights_holder-${t}-admin_unit_l2`,`rights_holder-${t}-admin_unit_l1`,`rights_holder-${t}-workplace_homepage`,`rights_holder-${t}-member_of`])};ckan.module("digitraffic_core_rights_holder",po);const uo={initialize(){In.apply(this);const t=window.matchMedia("(min-width: 768px)");t.addEventListener("change",this._handleMediaQueryChange),this._handleMediaQueryChange(t)},_handleMediaQueryChange(t){const e=$('[data-form-layout-wrapper="left"]'),i=$('[data-form-layout-wrapper="right"]'),s=e.length>0,n=i.length>0;if(t.matches){if(!s&&!n){const t=$(".left-1, .left-2"),e=$(".right-1, .right-2"),i="display: flex; flex-wrap: nowrap; gap: 1rem; flex-direction: column;",s=document.createElement("div"),n=document.createElement("div");s.setAttribute("data-form-layout-wrapper","left"),n.setAttribute("data-form-layout-wrapper","right"),s.style=i+" grid-area: left-1-start / left-1-start / left-2-end / left-2-end;",t.wrapAll(s),n.style=i+" grid-area: right-1-start / right-1-start / right-2-end / right-2-end;",e.wrapAll(n)}}else s&&n&&(e.children().unwrap(),i.children().unwrap())}};ckan.module("digitraffic_core_form_layout",uo);const go={options:{is_url:!1,is_upload:!1,field_upload:"image_upload",field_url:"image_url",field_clear:"clear_upload",field_name:"name",upload_label:"",previous_upload:!1},field_url:$(),field_image:$(),field_url_input:$(),field_name:$(),field_clear:$(),label_location:$(),button_url:$(),button_upload:$(),fields:$(),is_data_resource:!1,previousUpload:!1,_nameIsDirty:!1,input:$(),initialize(){In.apply(this);const t=this.options,e='input[name="'+t.field_upload+'"]',i='input[name="'+t.field_url+'"]',s='input[name="'+t.field_clear+'"]',n='input[name="'+t.field_name+'"]';this.input=$(e,this.el),this.field_url=$(i,this.el).parents(".form-group"),this.field_image=this.input.parents(".form-group"),this.field_url_input=$("input",this.field_url),this.field_name=this.el.parents("form").find(n),this.label_location=$('label[for="field-image-url"]'),this.is_data_resource="url"===this.options.field_url&&"upload"===this.options.field_upload,this.previousUpload=this.options.previous_upload;const o=$(s,this.el);o.length>0&&o.parents(".form-group").remove(),this.field_clear=$('<input type="hidden" name="'+t.field_clear+'">').appendTo(this.el),this.button_upload=$('<a href="javascript:;" class="btn btn-default"><i class="fa fa-cloud-upload"></i>'+this._("Upload")+"</a>").insertAfter(this.input),this.previousUpload&&$('<div class="error-inline"><i class="fa fa-warning"></i> '+this._("Please select the file to upload again")+"</div>").appendTo(this.field_image);const a=this._("Remove");if($('<a href="javascript:;" class="btn btn-danger btn-remove-url">'+a+"</a>").prop("title",a).on("click",this._onRemove).insertBefore(this.field_url_input),$('label[for="field-image-upload"]').text(t.upload_label||this._("Image")),this.input.on("mouseover",this._onInputMouseOver).on("mouseout",this._onInputMouseOut).on("change",this._onInputChange).prop("title",this._("Upload a file on your computer")).css("width",this.button_upload.outerWidth()??0),this.fields=$("<i />").add(this.button_upload).add(this.input).add(this.field_url).add(this.field_image),this.field_name.on("change",this._onModifyName),this.field_name.val()&&(this._nameIsDirty=!0),t.is_url)this._showOnlyFieldUrl(),this._updateUrlLabel(this._("URL"));else if(t.is_upload){this._showOnlyFieldUrl(),this.field_url_input.prop("readonly",!0);const t=this._fileNameFromUpload(String(this.field_url_input.val())??"");this.field_url_input.val(t),this._updateUrlLabel(this._("File"))}else this._showOnlyButtons()},_fileNameFromUpload:function(t){return/^\/base\/images/.test(t)?t:t=(t=(t=t.substring(0,-1===t.indexOf("#")?t.length:t.indexOf("#"))).substring(0,-1===t.indexOf("?")?t.length:t.indexOf("?"))).substring(t.lastIndexOf("/")+1,t.length)},_updateUrlLabel:function(t){this.is_data_resource&&this.label_location.text(t)},_onRemove:function(){this._showOnlyButtons(),this.field_url_input.val(""),this.field_url_input.prop("readonly",!1),this.field_clear.val("true")},_onInputChange:function(){let t=this.input.val()??"".split(/^C:\\fakepath\\/).pop()??"";const e=!!document.DOCUMENT_NODE,i=!e&&!!window.StyleMedia;if(e||i){const e=String(t).match(/[^\\\/]+$/);t=e?e[0]:String(t)}this.field_url_input.val(t),this.field_url_input.prop("readonly",!0),this.field_clear.val(""),this._showOnlyFieldUrl(),this._autoName(String(t)),this._updateUrlLabel(this._("File"))},_showOnlyButtons:function(){this.fields.hide(),this.button_upload.add(this.field_image).add(this.input).show()},_showOnlyFieldUrl:function(){this.fields.hide(),this.field_url.show()},_onInputMouseOver:function(){this.button_upload.addClass("hover")},_onInputMouseOut:function(){this.button_upload.removeClass("hover")},_onModifyName:function(){this._nameIsDirty=!0},_onFromWebBlur:function(){const t=this.field_url_input.val()??"",e=String(t).match(/([^\/]+)\/?$/);e&&e[1]&&this._autoName(e[1])},_autoName:function(t){this._nameIsDirty||this.field_name.val(t)}};
/*!
      * Bootstrap v5.3.3 (https://getbootstrap.com/)
      * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
      * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
      */
var mo,fo;ckan.module("digitraffic_image_upload",go),mo=void 0,fo=function(t){function e(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t)for(const i in t)if("default"!==i){const s=Object.getOwnPropertyDescriptor(t,i);Object.defineProperty(e,i,s.get?s:{enumerable:!0,get:()=>t[i]})}return e.default=t,Object.freeze(e)}const i=e(t),s=new Map,n={set(t,e,i){s.has(t)||s.set(t,new Map);const n=s.get(t);n.has(e)||0===n.size?n.set(e,i):console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`)},get:(t,e)=>s.has(t)&&s.get(t).get(e)||null,remove(t,e){if(!s.has(t))return;const i=s.get(t);i.delete(e),0===i.size&&s.delete(t)}},o="transitionend",a=t=>(t&&window.CSS&&window.CSS.escape&&(t=t.replace(/#([^\s"#']+)/g,(t,e)=>`#${CSS.escape(e)}`)),t),r=t=>null==t?`${t}`:Object.prototype.toString.call(t).match(/\s([a-z]+)/i)[1].toLowerCase(),l=t=>{t.dispatchEvent(new Event(o))},d=t=>!(!t||"object"!=typeof t)&&(void 0!==t.jquery&&(t=t[0]),void 0!==t.nodeType),h=t=>d(t)?t.jquery?t[0]:t:"string"==typeof t&&t.length>0?document.querySelector(a(t)):null,c=t=>{if(!d(t)||0===t.getClientRects().length)return!1;const e="visible"===getComputedStyle(t).getPropertyValue("visibility"),i=t.closest("details:not([open])");if(!i)return e;if(i!==t){const e=t.closest("summary");if(e&&e.parentNode!==i)return!1;if(null===e)return!1}return e},p=t=>!t||t.nodeType!==Node.ELEMENT_NODE||!!t.classList.contains("disabled")||(void 0!==t.disabled?t.disabled:t.hasAttribute("disabled")&&"false"!==t.getAttribute("disabled")),u=t=>{if(!document.documentElement.attachShadow)return null;if("function"==typeof t.getRootNode){const e=t.getRootNode();return e instanceof ShadowRoot?e:null}return t instanceof ShadowRoot?t:t.parentNode?u(t.parentNode):null},g=()=>{},m=t=>{t.offsetHeight},f=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,y=[],b=()=>"rtl"===document.documentElement.dir,_=t=>{var e;e=()=>{const e=f();if(e){const i=t.NAME,s=e.fn[i];e.fn[i]=t.jQueryInterface,e.fn[i].Constructor=t,e.fn[i].noConflict=()=>(e.fn[i]=s,t.jQueryInterface)}},"loading"===document.readyState?(y.length||document.addEventListener("DOMContentLoaded",()=>{for(const t of y)t()}),y.push(e)):e()},v=(t,e=[],i=t)=>"function"==typeof t?t(...e):i,w=(t,e,i=!0)=>{if(!i)return void v(t);const s=(t=>{if(!t)return 0;let{transitionDuration:e,transitionDelay:i}=window.getComputedStyle(t);const s=Number.parseFloat(e),n=Number.parseFloat(i);return s||n?(e=e.split(",")[0],i=i.split(",")[0],1e3*(Number.parseFloat(e)+Number.parseFloat(i))):0})(e)+5;let n=!1;const a=({target:i})=>{i===e&&(n=!0,e.removeEventListener(o,a),v(t))};e.addEventListener(o,a),setTimeout(()=>{n||l(e)},s)},$=(t,e,i,s)=>{const n=t.length;let o=t.indexOf(e);return-1===o?!i&&s?t[n-1]:t[0]:(o+=i?1:-1,s&&(o=(o+n)%n),t[Math.max(0,Math.min(o,n-1))])},k=/[^.]*(?=\..*)\.|.*/,A=/\..*/,E=/::\d+$/,x={};let T=1;const S={mouseenter:"mouseover",mouseleave:"mouseout"},C=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function M(t,e){return e&&`${e}::${T++}`||t.uidEvent||T++}function O(t){const e=M(t);return t.uidEvent=e,x[e]=x[e]||{},x[e]}function N(t,e,i=null){return Object.values(t).find(t=>t.callable===e&&t.delegationSelector===i)}function P(t,e,i){const s="string"==typeof e,n=s?i:e||i;let o=D(t);return C.has(o)||(o=t),[s,n,o]}function L(t,e,i,s,n){if("string"!=typeof e||!t)return;let[o,a,r]=P(e,i,s);if(e in S){const t=t=>function(e){if(!e.relatedTarget||e.relatedTarget!==e.delegateTarget&&!e.delegateTarget.contains(e.relatedTarget))return t.call(this,e)};a=t(a)}const l=O(t),d=l[r]||(l[r]={}),h=N(d,a,o?i:null);if(h)return void(h.oneOff=h.oneOff&&n);const c=M(a,e.replace(k,"")),p=o?function(t,e,i){return function s(n){const o=t.querySelectorAll(e);for(let{target:a}=n;a&&a!==this;a=a.parentNode)for(const r of o)if(r===a)return R(n,{delegateTarget:a}),s.oneOff&&z.off(t,n.type,e,i),i.apply(a,[n])}}(t,i,a):function(t,e){return function i(s){return R(s,{delegateTarget:t}),i.oneOff&&z.off(t,s.type,e),e.apply(t,[s])}}(t,a);p.delegationSelector=o?i:null,p.callable=a,p.oneOff=n,p.uidEvent=c,d[c]=p,t.addEventListener(r,p,o)}function I(t,e,i,s,n){const o=N(e[i],s,n);o&&(t.removeEventListener(i,o,Boolean(n)),delete e[i][o.uidEvent])}function j(t,e,i,s){const n=e[i]||{};for(const[o,a]of Object.entries(n))o.includes(s)&&I(t,e,i,a.callable,a.delegationSelector)}function D(t){return t=t.replace(A,""),S[t]||t}const z={on(t,e,i,s){L(t,e,i,s,!1)},one(t,e,i,s){L(t,e,i,s,!0)},off(t,e,i,s){if("string"!=typeof e||!t)return;const[n,o,a]=P(e,i,s),r=a!==e,l=O(t),d=l[a]||{},h=e.startsWith(".");if(void 0===o){if(h)for(const i of Object.keys(l))j(t,l,i,e.slice(1));for(const[i,s]of Object.entries(d)){const n=i.replace(E,"");r&&!e.includes(n)||I(t,l,a,s.callable,s.delegationSelector)}}else{if(!Object.keys(d).length)return;I(t,l,a,o,n?i:null)}},trigger(t,e,i){if("string"!=typeof e||!t)return null;const s=f();let n=null,o=!0,a=!0,r=!1;e!==D(e)&&s&&(n=s.Event(e,i),s(t).trigger(n),o=!n.isPropagationStopped(),a=!n.isImmediatePropagationStopped(),r=n.isDefaultPrevented());const l=R(new Event(e,{bubbles:o,cancelable:!0}),i);return r&&l.preventDefault(),a&&t.dispatchEvent(l),l.defaultPrevented&&n&&n.preventDefault(),l}};function R(t,e={}){for(const[i,s]of Object.entries(e))try{t[i]=s}catch(e){Object.defineProperty(t,i,{configurable:!0,get:()=>s})}return t}function F(t){if("true"===t)return!0;if("false"===t)return!1;if(t===Number(t).toString())return Number(t);if(""===t||"null"===t)return null;if("string"!=typeof t)return t;try{return JSON.parse(decodeURIComponent(t))}catch(e){return t}}function U(t){return t.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}const B={setDataAttribute(t,e,i){t.setAttribute(`data-bs-${U(e)}`,i)},removeDataAttribute(t,e){t.removeAttribute(`data-bs-${U(e)}`)},getDataAttributes(t){if(!t)return{};const e={},i=Object.keys(t.dataset).filter(t=>t.startsWith("bs")&&!t.startsWith("bsConfig"));for(const s of i){let i=s.replace(/^bs/,"");i=i.charAt(0).toLowerCase()+i.slice(1,i.length),e[i]=F(t.dataset[s])}return e},getDataAttribute:(t,e)=>F(t.getAttribute(`data-bs-${U(e)}`))};class V{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(t){return t=this._mergeConfigObj(t),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}_configAfterMerge(t){return t}_mergeConfigObj(t,e){const i=d(e)?B.getDataAttribute(e,"config"):{};return{...this.constructor.Default,..."object"==typeof i?i:{},...d(e)?B.getDataAttributes(e):{},..."object"==typeof t?t:{}}}_typeCheckConfig(t,e=this.constructor.DefaultType){for(const[i,s]of Object.entries(e)){const e=t[i],n=d(e)?"element":r(e);if(!new RegExp(s).test(n))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${i}" provided type "${n}" but expected type "${s}".`)}}}class H extends V{constructor(t,e){super(),(t=h(t))&&(this._element=t,this._config=this._getConfig(e),n.set(this._element,this.constructor.DATA_KEY,this))}dispose(){n.remove(this._element,this.constructor.DATA_KEY),z.off(this._element,this.constructor.EVENT_KEY);for(const t of Object.getOwnPropertyNames(this))this[t]=null}_queueCallback(t,e,i=!0){w(t,e,i)}_getConfig(t){return t=this._mergeConfigObj(t,this._element),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}static getInstance(t){return n.get(h(t),this.DATA_KEY)}static getOrCreateInstance(t,e={}){return this.getInstance(t)||new this(t,"object"==typeof e?e:null)}static get VERSION(){return"5.3.3"}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(t){return`${t}${this.EVENT_KEY}`}}const W=t=>{let e=t.getAttribute("data-bs-target");if(!e||"#"===e){let i=t.getAttribute("href");if(!i||!i.includes("#")&&!i.startsWith("."))return null;i.includes("#")&&!i.startsWith("#")&&(i=`#${i.split("#")[1]}`),e=i&&"#"!==i?i.trim():null}return e?e.split(",").map(t=>a(t)).join(","):null},Y={find:(t,e=document.documentElement)=>[].concat(...Element.prototype.querySelectorAll.call(e,t)),findOne:(t,e=document.documentElement)=>Element.prototype.querySelector.call(e,t),children:(t,e)=>[].concat(...t.children).filter(t=>t.matches(e)),parents(t,e){const i=[];let s=t.parentNode.closest(e);for(;s;)i.push(s),s=s.parentNode.closest(e);return i},prev(t,e){let i=t.previousElementSibling;for(;i;){if(i.matches(e))return[i];i=i.previousElementSibling}return[]},next(t,e){let i=t.nextElementSibling;for(;i;){if(i.matches(e))return[i];i=i.nextElementSibling}return[]},focusableChildren(t){const e=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map(t=>`${t}:not([tabindex^="-"])`).join(",");return this.find(e,t).filter(t=>!p(t)&&c(t))},getSelectorFromElement(t){const e=W(t);return e&&Y.findOne(e)?e:null},getElementFromSelector(t){const e=W(t);return e?Y.findOne(e):null},getMultipleElementsFromSelector(t){const e=W(t);return e?Y.find(e):[]}},q=(t,e="hide")=>{const i=`click.dismiss${t.EVENT_KEY}`,s=t.NAME;z.on(document,i,`[data-bs-dismiss="${s}"]`,function(i){if(["A","AREA"].includes(this.tagName)&&i.preventDefault(),p(this))return;const n=Y.getElementFromSelector(this)||this.closest(`.${s}`);t.getOrCreateInstance(n)[e]()})},K=".bs.alert",Q=`close${K}`,G=`closed${K}`;class Z extends H{static get NAME(){return"alert"}close(){if(z.trigger(this._element,Q).defaultPrevented)return;this._element.classList.remove("show");const t=this._element.classList.contains("fade");this._queueCallback(()=>this._destroyElement(),this._element,t)}_destroyElement(){this._element.remove(),z.trigger(this._element,G),this.dispose()}static jQueryInterface(t){return this.each(function(){const e=Z.getOrCreateInstance(this);if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t](this)}})}}q(Z,"close"),_(Z);const X='[data-bs-toggle="button"]';class J extends H{static get NAME(){return"button"}toggle(){this._element.setAttribute("aria-pressed",this._element.classList.toggle("active"))}static jQueryInterface(t){return this.each(function(){const e=J.getOrCreateInstance(this);"toggle"===t&&e[t]()})}}z.on(document,"click.bs.button.data-api",X,t=>{t.preventDefault();const e=t.target.closest(X);J.getOrCreateInstance(e).toggle()}),_(J);const tt=".bs.swipe",et=`touchstart${tt}`,it=`touchmove${tt}`,st=`touchend${tt}`,nt=`pointerdown${tt}`,ot=`pointerup${tt}`,at={endCallback:null,leftCallback:null,rightCallback:null},rt={endCallback:"(function|null)",leftCallback:"(function|null)",rightCallback:"(function|null)"};class lt extends V{constructor(t,e){super(),this._element=t,t&&lt.isSupported()&&(this._config=this._getConfig(e),this._deltaX=0,this._supportPointerEvents=Boolean(window.PointerEvent),this._initEvents())}static get Default(){return at}static get DefaultType(){return rt}static get NAME(){return"swipe"}dispose(){z.off(this._element,tt)}_start(t){this._supportPointerEvents?this._eventIsPointerPenTouch(t)&&(this._deltaX=t.clientX):this._deltaX=t.touches[0].clientX}_end(t){this._eventIsPointerPenTouch(t)&&(this._deltaX=t.clientX-this._deltaX),this._handleSwipe(),v(this._config.endCallback)}_move(t){this._deltaX=t.touches&&t.touches.length>1?0:t.touches[0].clientX-this._deltaX}_handleSwipe(){const t=Math.abs(this._deltaX);if(t<=40)return;const e=t/this._deltaX;this._deltaX=0,e&&v(e>0?this._config.rightCallback:this._config.leftCallback)}_initEvents(){this._supportPointerEvents?(z.on(this._element,nt,t=>this._start(t)),z.on(this._element,ot,t=>this._end(t)),this._element.classList.add("pointer-event")):(z.on(this._element,et,t=>this._start(t)),z.on(this._element,it,t=>this._move(t)),z.on(this._element,st,t=>this._end(t)))}_eventIsPointerPenTouch(t){return this._supportPointerEvents&&("pen"===t.pointerType||"touch"===t.pointerType)}static isSupported(){return"ontouchstart"in document.documentElement||navigator.maxTouchPoints>0}}const dt=".bs.carousel",ht=".data-api",ct="ArrowLeft",pt="ArrowRight",ut="next",gt="prev",mt="left",ft="right",yt=`slide${dt}`,bt=`slid${dt}`,_t=`keydown${dt}`,vt=`mouseenter${dt}`,wt=`mouseleave${dt}`,$t=`dragstart${dt}`,kt=`load${dt}${ht}`,At=`click${dt}${ht}`,Et="carousel",xt="active",Tt=".active",St=".carousel-item",Ct=Tt+St,Mt={[ct]:ft,[pt]:mt},Ot={interval:5e3,keyboard:!0,pause:"hover",ride:!1,touch:!0,wrap:!0},Nt={interval:"(number|boolean)",keyboard:"boolean",pause:"(string|boolean)",ride:"(boolean|string)",touch:"boolean",wrap:"boolean"};class Pt extends H{constructor(t,e){super(t,e),this._interval=null,this._activeElement=null,this._isSliding=!1,this.touchTimeout=null,this._swipeHelper=null,this._indicatorsElement=Y.findOne(".carousel-indicators",this._element),this._addEventListeners(),this._config.ride===Et&&this.cycle()}static get Default(){return Ot}static get DefaultType(){return Nt}static get NAME(){return"carousel"}next(){this._slide(ut)}nextWhenVisible(){!document.hidden&&c(this._element)&&this.next()}prev(){this._slide(gt)}pause(){this._isSliding&&l(this._element),this._clearInterval()}cycle(){this._clearInterval(),this._updateInterval(),this._interval=setInterval(()=>this.nextWhenVisible(),this._config.interval)}_maybeEnableCycle(){this._config.ride&&(this._isSliding?z.one(this._element,bt,()=>this.cycle()):this.cycle())}to(t){const e=this._getItems();if(t>e.length-1||t<0)return;if(this._isSliding)return void z.one(this._element,bt,()=>this.to(t));const i=this._getItemIndex(this._getActive());if(i===t)return;const s=t>i?ut:gt;this._slide(s,e[t])}dispose(){this._swipeHelper&&this._swipeHelper.dispose(),super.dispose()}_configAfterMerge(t){return t.defaultInterval=t.interval,t}_addEventListeners(){this._config.keyboard&&z.on(this._element,_t,t=>this._keydown(t)),"hover"===this._config.pause&&(z.on(this._element,vt,()=>this.pause()),z.on(this._element,wt,()=>this._maybeEnableCycle())),this._config.touch&&lt.isSupported()&&this._addTouchEventListeners()}_addTouchEventListeners(){for(const t of Y.find(".carousel-item img",this._element))z.on(t,$t,t=>t.preventDefault());const t={leftCallback:()=>this._slide(this._directionToOrder(mt)),rightCallback:()=>this._slide(this._directionToOrder(ft)),endCallback:()=>{"hover"===this._config.pause&&(this.pause(),this.touchTimeout&&clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout(()=>this._maybeEnableCycle(),500+this._config.interval))}};this._swipeHelper=new lt(this._element,t)}_keydown(t){if(/input|textarea/i.test(t.target.tagName))return;const e=Mt[t.key];e&&(t.preventDefault(),this._slide(this._directionToOrder(e)))}_getItemIndex(t){return this._getItems().indexOf(t)}_setActiveIndicatorElement(t){if(!this._indicatorsElement)return;const e=Y.findOne(Tt,this._indicatorsElement);e.classList.remove(xt),e.removeAttribute("aria-current");const i=Y.findOne(`[data-bs-slide-to="${t}"]`,this._indicatorsElement);i&&(i.classList.add(xt),i.setAttribute("aria-current","true"))}_updateInterval(){const t=this._activeElement||this._getActive();if(!t)return;const e=Number.parseInt(t.getAttribute("data-bs-interval"),10);this._config.interval=e||this._config.defaultInterval}_slide(t,e=null){if(this._isSliding)return;const i=this._getActive(),s=t===ut,n=e||$(this._getItems(),i,s,this._config.wrap);if(n===i)return;const o=this._getItemIndex(n),a=e=>z.trigger(this._element,e,{relatedTarget:n,direction:this._orderToDirection(t),from:this._getItemIndex(i),to:o});if(a(yt).defaultPrevented)return;if(!i||!n)return;const r=Boolean(this._interval);this.pause(),this._isSliding=!0,this._setActiveIndicatorElement(o),this._activeElement=n;const l=s?"carousel-item-start":"carousel-item-end",d=s?"carousel-item-next":"carousel-item-prev";n.classList.add(d),m(n),i.classList.add(l),n.classList.add(l),this._queueCallback(()=>{n.classList.remove(l,d),n.classList.add(xt),i.classList.remove(xt,d,l),this._isSliding=!1,a(bt)},i,this._isAnimated()),r&&this.cycle()}_isAnimated(){return this._element.classList.contains("slide")}_getActive(){return Y.findOne(Ct,this._element)}_getItems(){return Y.find(St,this._element)}_clearInterval(){this._interval&&(clearInterval(this._interval),this._interval=null)}_directionToOrder(t){return b()?t===mt?gt:ut:t===mt?ut:gt}_orderToDirection(t){return b()?t===gt?mt:ft:t===gt?ft:mt}static jQueryInterface(t){return this.each(function(){const e=Pt.getOrCreateInstance(this,t);if("number"!=typeof t){if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t]()}}else e.to(t)})}}z.on(document,At,"[data-bs-slide], [data-bs-slide-to]",function(t){const e=Y.getElementFromSelector(this);if(!e||!e.classList.contains(Et))return;t.preventDefault();const i=Pt.getOrCreateInstance(e),s=this.getAttribute("data-bs-slide-to");return s?(i.to(s),void i._maybeEnableCycle()):"next"===B.getDataAttribute(this,"slide")?(i.next(),void i._maybeEnableCycle()):(i.prev(),void i._maybeEnableCycle())}),z.on(window,kt,()=>{const t=Y.find('[data-bs-ride="carousel"]');for(const e of t)Pt.getOrCreateInstance(e)}),_(Pt);const Lt=".bs.collapse",It=`show${Lt}`,jt=`shown${Lt}`,Dt=`hide${Lt}`,zt=`hidden${Lt}`,Rt=`click${Lt}.data-api`,Ft="show",Ut="collapse",Bt="collapsing",Vt=`:scope .${Ut} .${Ut}`,Ht='[data-bs-toggle="collapse"]',Wt={parent:null,toggle:!0},Yt={parent:"(null|element)",toggle:"boolean"};class qt extends H{constructor(t,e){super(t,e),this._isTransitioning=!1,this._triggerArray=[];const i=Y.find(Ht);for(const t of i){const e=Y.getSelectorFromElement(t),i=Y.find(e).filter(t=>t===this._element);null!==e&&i.length&&this._triggerArray.push(t)}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle()}static get Default(){return Wt}static get DefaultType(){return Yt}static get NAME(){return"collapse"}toggle(){this._isShown()?this.hide():this.show()}show(){if(this._isTransitioning||this._isShown())return;let t=[];if(this._config.parent&&(t=this._getFirstLevelChildren(".collapse.show, .collapse.collapsing").filter(t=>t!==this._element).map(t=>qt.getOrCreateInstance(t,{toggle:!1}))),t.length&&t[0]._isTransitioning)return;if(z.trigger(this._element,It).defaultPrevented)return;for(const e of t)e.hide();const e=this._getDimension();this._element.classList.remove(Ut),this._element.classList.add(Bt),this._element.style[e]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0;const i=`scroll${e[0].toUpperCase()+e.slice(1)}`;this._queueCallback(()=>{this._isTransitioning=!1,this._element.classList.remove(Bt),this._element.classList.add(Ut,Ft),this._element.style[e]="",z.trigger(this._element,jt)},this._element,!0),this._element.style[e]=`${this._element[i]}px`}hide(){if(this._isTransitioning||!this._isShown())return;if(z.trigger(this._element,Dt).defaultPrevented)return;const t=this._getDimension();this._element.style[t]=`${this._element.getBoundingClientRect()[t]}px`,m(this._element),this._element.classList.add(Bt),this._element.classList.remove(Ut,Ft);for(const t of this._triggerArray){const e=Y.getElementFromSelector(t);e&&!this._isShown(e)&&this._addAriaAndCollapsedClass([t],!1)}this._isTransitioning=!0,this._element.style[t]="",this._queueCallback(()=>{this._isTransitioning=!1,this._element.classList.remove(Bt),this._element.classList.add(Ut),z.trigger(this._element,zt)},this._element,!0)}_isShown(t=this._element){return t.classList.contains(Ft)}_configAfterMerge(t){return t.toggle=Boolean(t.toggle),t.parent=h(t.parent),t}_getDimension(){return this._element.classList.contains("collapse-horizontal")?"width":"height"}_initializeChildren(){if(!this._config.parent)return;const t=this._getFirstLevelChildren(Ht);for(const e of t){const t=Y.getElementFromSelector(e);t&&this._addAriaAndCollapsedClass([e],this._isShown(t))}}_getFirstLevelChildren(t){const e=Y.find(Vt,this._config.parent);return Y.find(t,this._config.parent).filter(t=>!e.includes(t))}_addAriaAndCollapsedClass(t,e){if(t.length)for(const i of t)i.classList.toggle("collapsed",!e),i.setAttribute("aria-expanded",e)}static jQueryInterface(t){const e={};return"string"==typeof t&&/show|hide/.test(t)&&(e.toggle=!1),this.each(function(){const i=qt.getOrCreateInstance(this,e);if("string"==typeof t){if(void 0===i[t])throw new TypeError(`No method named "${t}"`);i[t]()}})}}z.on(document,Rt,Ht,function(t){("A"===t.target.tagName||t.delegateTarget&&"A"===t.delegateTarget.tagName)&&t.preventDefault();for(const t of Y.getMultipleElementsFromSelector(this))qt.getOrCreateInstance(t,{toggle:!1}).toggle()}),_(qt);const Kt="dropdown",Qt=".bs.dropdown",Gt=".data-api",Zt="ArrowUp",Xt="ArrowDown",Jt=`hide${Qt}`,te=`hidden${Qt}`,ee=`show${Qt}`,ie=`shown${Qt}`,se=`click${Qt}${Gt}`,ne=`keydown${Qt}${Gt}`,oe=`keyup${Qt}${Gt}`,ae="show",re='[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',le=`${re}.${ae}`,de=".dropdown-menu",he=b()?"top-end":"top-start",ce=b()?"top-start":"top-end",pe=b()?"bottom-end":"bottom-start",ue=b()?"bottom-start":"bottom-end",ge=b()?"left-start":"right-start",me=b()?"right-start":"left-start",fe={autoClose:!0,boundary:"clippingParents",display:"dynamic",offset:[0,2],popperConfig:null,reference:"toggle"},ye={autoClose:"(boolean|string)",boundary:"(string|element)",display:"string",offset:"(array|string|function)",popperConfig:"(null|object|function)",reference:"(string|element|object)"};class be extends H{constructor(t,e){super(t,e),this._popper=null,this._parent=this._element.parentNode,this._menu=Y.next(this._element,de)[0]||Y.prev(this._element,de)[0]||Y.findOne(de,this._parent),this._inNavbar=this._detectNavbar()}static get Default(){return fe}static get DefaultType(){return ye}static get NAME(){return Kt}toggle(){return this._isShown()?this.hide():this.show()}show(){if(p(this._element)||this._isShown())return;const t={relatedTarget:this._element};if(!z.trigger(this._element,ee,t).defaultPrevented){if(this._createPopper(),"ontouchstart"in document.documentElement&&!this._parent.closest(".navbar-nav"))for(const t of[].concat(...document.body.children))z.on(t,"mouseover",g);this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.add(ae),this._element.classList.add(ae),z.trigger(this._element,ie,t)}}hide(){if(p(this._element)||!this._isShown())return;const t={relatedTarget:this._element};this._completeHide(t)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_completeHide(t){if(!z.trigger(this._element,Jt,t).defaultPrevented){if("ontouchstart"in document.documentElement)for(const t of[].concat(...document.body.children))z.off(t,"mouseover",g);this._popper&&this._popper.destroy(),this._menu.classList.remove(ae),this._element.classList.remove(ae),this._element.setAttribute("aria-expanded","false"),B.removeDataAttribute(this._menu,"popper"),z.trigger(this._element,te,t)}}_getConfig(t){if("object"==typeof(t=super._getConfig(t)).reference&&!d(t.reference)&&"function"!=typeof t.reference.getBoundingClientRect)throw new TypeError(`${Kt.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);return t}_createPopper(){if(void 0===i)throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");let t=this._element;"parent"===this._config.reference?t=this._parent:d(this._config.reference)?t=h(this._config.reference):"object"==typeof this._config.reference&&(t=this._config.reference);const e=this._getPopperConfig();this._popper=i.createPopper(t,this._menu,e)}_isShown(){return this._menu.classList.contains(ae)}_getPlacement(){const t=this._parent;if(t.classList.contains("dropend"))return ge;if(t.classList.contains("dropstart"))return me;if(t.classList.contains("dropup-center"))return"top";if(t.classList.contains("dropdown-center"))return"bottom";const e="end"===getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();return t.classList.contains("dropup")?e?ce:he:e?ue:pe}_detectNavbar(){return null!==this._element.closest(".navbar")}_getOffset(){const{offset:t}=this._config;return"string"==typeof t?t.split(",").map(t=>Number.parseInt(t,10)):"function"==typeof t?e=>t(e,this._element):t}_getPopperConfig(){const t={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]};return(this._inNavbar||"static"===this._config.display)&&(B.setDataAttribute(this._menu,"popper","static"),t.modifiers=[{name:"applyStyles",enabled:!1}]),{...t,...v(this._config.popperConfig,[t])}}_selectMenuItem({key:t,target:e}){const i=Y.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",this._menu).filter(t=>c(t));i.length&&$(i,e,t===Xt,!i.includes(e)).focus()}static jQueryInterface(t){return this.each(function(){const e=be.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}})}static clearMenus(t){if(2===t.button||"keyup"===t.type&&"Tab"!==t.key)return;const e=Y.find(le);for(const i of e){const e=be.getInstance(i);if(!e||!1===e._config.autoClose)continue;const s=t.composedPath(),n=s.includes(e._menu);if(s.includes(e._element)||"inside"===e._config.autoClose&&!n||"outside"===e._config.autoClose&&n)continue;if(e._menu.contains(t.target)&&("keyup"===t.type&&"Tab"===t.key||/input|select|option|textarea|form/i.test(t.target.tagName)))continue;const o={relatedTarget:e._element};"click"===t.type&&(o.clickEvent=t),e._completeHide(o)}}static dataApiKeydownHandler(t){const e=/input|textarea/i.test(t.target.tagName),i="Escape"===t.key,s=[Zt,Xt].includes(t.key);if(!s&&!i)return;if(e&&!i)return;t.preventDefault();const n=this.matches(re)?this:Y.prev(this,re)[0]||Y.next(this,re)[0]||Y.findOne(re,t.delegateTarget.parentNode),o=be.getOrCreateInstance(n);if(s)return t.stopPropagation(),o.show(),void o._selectMenuItem(t);o._isShown()&&(t.stopPropagation(),o.hide(),n.focus())}}z.on(document,ne,re,be.dataApiKeydownHandler),z.on(document,ne,de,be.dataApiKeydownHandler),z.on(document,se,be.clearMenus),z.on(document,oe,be.clearMenus),z.on(document,se,re,function(t){t.preventDefault(),be.getOrCreateInstance(this).toggle()}),_(be);const _e="backdrop",ve="show",we=`mousedown.bs.${_e}`,$e={className:"modal-backdrop",clickCallback:null,isAnimated:!1,isVisible:!0,rootElement:"body"},ke={className:"string",clickCallback:"(function|null)",isAnimated:"boolean",isVisible:"boolean",rootElement:"(element|string)"};class Ae extends V{constructor(t){super(),this._config=this._getConfig(t),this._isAppended=!1,this._element=null}static get Default(){return $e}static get DefaultType(){return ke}static get NAME(){return _e}show(t){if(!this._config.isVisible)return void v(t);this._append();const e=this._getElement();this._config.isAnimated&&m(e),e.classList.add(ve),this._emulateAnimation(()=>{v(t)})}hide(t){this._config.isVisible?(this._getElement().classList.remove(ve),this._emulateAnimation(()=>{this.dispose(),v(t)})):v(t)}dispose(){this._isAppended&&(z.off(this._element,we),this._element.remove(),this._isAppended=!1)}_getElement(){if(!this._element){const t=document.createElement("div");t.className=this._config.className,this._config.isAnimated&&t.classList.add("fade"),this._element=t}return this._element}_configAfterMerge(t){return t.rootElement=h(t.rootElement),t}_append(){if(this._isAppended)return;const t=this._getElement();this._config.rootElement.append(t),z.on(t,we,()=>{v(this._config.clickCallback)}),this._isAppended=!0}_emulateAnimation(t){w(t,this._getElement(),this._config.isAnimated)}}const Ee=".bs.focustrap",xe=`focusin${Ee}`,Te=`keydown.tab${Ee}`,Se="backward",Ce={autofocus:!0,trapElement:null},Me={autofocus:"boolean",trapElement:"element"};class Oe extends V{constructor(t){super(),this._config=this._getConfig(t),this._isActive=!1,this._lastTabNavDirection=null}static get Default(){return Ce}static get DefaultType(){return Me}static get NAME(){return"focustrap"}activate(){this._isActive||(this._config.autofocus&&this._config.trapElement.focus(),z.off(document,Ee),z.on(document,xe,t=>this._handleFocusin(t)),z.on(document,Te,t=>this._handleKeydown(t)),this._isActive=!0)}deactivate(){this._isActive&&(this._isActive=!1,z.off(document,Ee))}_handleFocusin(t){const{trapElement:e}=this._config;if(t.target===document||t.target===e||e.contains(t.target))return;const i=Y.focusableChildren(e);0===i.length?e.focus():this._lastTabNavDirection===Se?i[i.length-1].focus():i[0].focus()}_handleKeydown(t){"Tab"===t.key&&(this._lastTabNavDirection=t.shiftKey?Se:"forward")}}const Ne=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",Pe=".sticky-top",Le="padding-right",Ie="margin-right";class je{constructor(){this._element=document.body}getWidth(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}hide(){const t=this.getWidth();this._disableOverFlow(),this._setElementAttributes(this._element,Le,e=>e+t),this._setElementAttributes(Ne,Le,e=>e+t),this._setElementAttributes(Pe,Ie,e=>e-t)}reset(){this._resetElementAttributes(this._element,"overflow"),this._resetElementAttributes(this._element,Le),this._resetElementAttributes(Ne,Le),this._resetElementAttributes(Pe,Ie)}isOverflowing(){return this.getWidth()>0}_disableOverFlow(){this._saveInitialAttribute(this._element,"overflow"),this._element.style.overflow="hidden"}_setElementAttributes(t,e,i){const s=this.getWidth();this._applyManipulationCallback(t,t=>{if(t!==this._element&&window.innerWidth>t.clientWidth+s)return;this._saveInitialAttribute(t,e);const n=window.getComputedStyle(t).getPropertyValue(e);t.style.setProperty(e,`${i(Number.parseFloat(n))}px`)})}_saveInitialAttribute(t,e){const i=t.style.getPropertyValue(e);i&&B.setDataAttribute(t,e,i)}_resetElementAttributes(t,e){this._applyManipulationCallback(t,t=>{const i=B.getDataAttribute(t,e);null!==i?(B.removeDataAttribute(t,e),t.style.setProperty(e,i)):t.style.removeProperty(e)})}_applyManipulationCallback(t,e){if(d(t))e(t);else for(const i of Y.find(t,this._element))e(i)}}const De=".bs.modal",ze=`hide${De}`,Re=`hidePrevented${De}`,Fe=`hidden${De}`,Ue=`show${De}`,Be=`shown${De}`,Ve=`resize${De}`,He=`click.dismiss${De}`,We=`mousedown.dismiss${De}`,Ye=`keydown.dismiss${De}`,qe=`click${De}.data-api`,Ke="modal-open",Qe="show",Ge="modal-static",Ze={backdrop:!0,focus:!0,keyboard:!0},Xe={backdrop:"(boolean|string)",focus:"boolean",keyboard:"boolean"};class Je extends H{constructor(t,e){super(t,e),this._dialog=Y.findOne(".modal-dialog",this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._isTransitioning=!1,this._scrollBar=new je,this._addEventListeners()}static get Default(){return Ze}static get DefaultType(){return Xe}static get NAME(){return"modal"}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){this._isShown||this._isTransitioning||z.trigger(this._element,Ue,{relatedTarget:t}).defaultPrevented||(this._isShown=!0,this._isTransitioning=!0,this._scrollBar.hide(),document.body.classList.add(Ke),this._adjustDialog(),this._backdrop.show(()=>this._showElement(t)))}hide(){this._isShown&&!this._isTransitioning&&(z.trigger(this._element,ze).defaultPrevented||(this._isShown=!1,this._isTransitioning=!0,this._focustrap.deactivate(),this._element.classList.remove(Qe),this._queueCallback(()=>this._hideModal(),this._element,this._isAnimated())))}dispose(){z.off(window,De),z.off(this._dialog,De),this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new Ae({isVisible:Boolean(this._config.backdrop),isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new Oe({trapElement:this._element})}_showElement(t){document.body.contains(this._element)||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0;const e=Y.findOne(".modal-body",this._dialog);e&&(e.scrollTop=0),m(this._element),this._element.classList.add(Qe),this._queueCallback(()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,z.trigger(this._element,Be,{relatedTarget:t})},this._dialog,this._isAnimated())}_addEventListeners(){z.on(this._element,Ye,t=>{"Escape"===t.key&&(this._config.keyboard?this.hide():this._triggerBackdropTransition())}),z.on(window,Ve,()=>{this._isShown&&!this._isTransitioning&&this._adjustDialog()}),z.on(this._element,We,t=>{z.one(this._element,He,e=>{this._element===t.target&&this._element===e.target&&("static"!==this._config.backdrop?this._config.backdrop&&this.hide():this._triggerBackdropTransition())})})}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide(()=>{document.body.classList.remove(Ke),this._resetAdjustments(),this._scrollBar.reset(),z.trigger(this._element,Fe)})}_isAnimated(){return this._element.classList.contains("fade")}_triggerBackdropTransition(){if(z.trigger(this._element,Re).defaultPrevented)return;const t=this._element.scrollHeight>document.documentElement.clientHeight,e=this._element.style.overflowY;"hidden"===e||this._element.classList.contains(Ge)||(t||(this._element.style.overflowY="hidden"),this._element.classList.add(Ge),this._queueCallback(()=>{this._element.classList.remove(Ge),this._queueCallback(()=>{this._element.style.overflowY=e},this._dialog)},this._dialog),this._element.focus())}_adjustDialog(){const t=this._element.scrollHeight>document.documentElement.clientHeight,e=this._scrollBar.getWidth(),i=e>0;if(i&&!t){const t=b()?"paddingLeft":"paddingRight";this._element.style[t]=`${e}px`}if(!i&&t){const t=b()?"paddingRight":"paddingLeft";this._element.style[t]=`${e}px`}}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}static jQueryInterface(t,e){return this.each(function(){const i=Je.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===i[t])throw new TypeError(`No method named "${t}"`);i[t](e)}})}}z.on(document,qe,'[data-bs-toggle="modal"]',function(t){const e=Y.getElementFromSelector(this);["A","AREA"].includes(this.tagName)&&t.preventDefault(),z.one(e,Ue,t=>{t.defaultPrevented||z.one(e,Fe,()=>{c(this)&&this.focus()})});const i=Y.findOne(".modal.show");i&&Je.getInstance(i).hide(),Je.getOrCreateInstance(e).toggle(this)}),q(Je),_(Je);const ti=".bs.offcanvas",ei=".data-api",ii=`load${ti}${ei}`,si="show",ni="showing",oi="hiding",ai=".offcanvas.show",ri=`show${ti}`,li=`shown${ti}`,di=`hide${ti}`,hi=`hidePrevented${ti}`,ci=`hidden${ti}`,pi=`resize${ti}`,ui=`click${ti}${ei}`,gi=`keydown.dismiss${ti}`,mi={backdrop:!0,keyboard:!0,scroll:!1},fi={backdrop:"(boolean|string)",keyboard:"boolean",scroll:"boolean"};class yi extends H{constructor(t,e){super(t,e),this._isShown=!1,this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._addEventListeners()}static get Default(){return mi}static get DefaultType(){return fi}static get NAME(){return"offcanvas"}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){this._isShown||z.trigger(this._element,ri,{relatedTarget:t}).defaultPrevented||(this._isShown=!0,this._backdrop.show(),this._config.scroll||(new je).hide(),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.classList.add(ni),this._queueCallback(()=>{this._config.scroll&&!this._config.backdrop||this._focustrap.activate(),this._element.classList.add(si),this._element.classList.remove(ni),z.trigger(this._element,li,{relatedTarget:t})},this._element,!0))}hide(){this._isShown&&(z.trigger(this._element,di).defaultPrevented||(this._focustrap.deactivate(),this._element.blur(),this._isShown=!1,this._element.classList.add(oi),this._backdrop.hide(),this._queueCallback(()=>{this._element.classList.remove(si,oi),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._config.scroll||(new je).reset(),z.trigger(this._element,ci)},this._element,!0)))}dispose(){this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}_initializeBackDrop(){const t=Boolean(this._config.backdrop);return new Ae({className:"offcanvas-backdrop",isVisible:t,isAnimated:!0,rootElement:this._element.parentNode,clickCallback:t?()=>{"static"!==this._config.backdrop?this.hide():z.trigger(this._element,hi)}:null})}_initializeFocusTrap(){return new Oe({trapElement:this._element})}_addEventListeners(){z.on(this._element,gi,t=>{"Escape"===t.key&&(this._config.keyboard?this.hide():z.trigger(this._element,hi))})}static jQueryInterface(t){return this.each(function(){const e=yi.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t](this)}})}}z.on(document,ui,'[data-bs-toggle="offcanvas"]',function(t){const e=Y.getElementFromSelector(this);if(["A","AREA"].includes(this.tagName)&&t.preventDefault(),p(this))return;z.one(e,ci,()=>{c(this)&&this.focus()});const i=Y.findOne(ai);i&&i!==e&&yi.getInstance(i).hide(),yi.getOrCreateInstance(e).toggle(this)}),z.on(window,ii,()=>{for(const t of Y.find(ai))yi.getOrCreateInstance(t).show()}),z.on(window,pi,()=>{for(const t of Y.find("[aria-modal][class*=show][class*=offcanvas-]"))"fixed"!==getComputedStyle(t).position&&yi.getOrCreateInstance(t).hide()}),q(yi),_(yi);const bi={"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],dd:[],div:[],dl:[],dt:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},_i=new Set(["background","cite","href","itemtype","longdesc","poster","src","xlink:href"]),vi=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,wi=(t,e)=>{const i=t.nodeName.toLowerCase();return e.includes(i)?!_i.has(i)||Boolean(vi.test(t.nodeValue)):e.filter(t=>t instanceof RegExp).some(t=>t.test(i))},$i={allowList:bi,content:{},extraClass:"",html:!1,sanitize:!0,sanitizeFn:null,template:"<div></div>"},ki={allowList:"object",content:"object",extraClass:"(string|function)",html:"boolean",sanitize:"boolean",sanitizeFn:"(null|function)",template:"string"},Ai={entry:"(string|element|function|null)",selector:"(string|element)"};class Ei extends V{constructor(t){super(),this._config=this._getConfig(t)}static get Default(){return $i}static get DefaultType(){return ki}static get NAME(){return"TemplateFactory"}getContent(){return Object.values(this._config.content).map(t=>this._resolvePossibleFunction(t)).filter(Boolean)}hasContent(){return this.getContent().length>0}changeContent(t){return this._checkContent(t),this._config.content={...this._config.content,...t},this}toHtml(){const t=document.createElement("div");t.innerHTML=this._maybeSanitize(this._config.template);for(const[e,i]of Object.entries(this._config.content))this._setContent(t,i,e);const e=t.children[0],i=this._resolvePossibleFunction(this._config.extraClass);return i&&e.classList.add(...i.split(" ")),e}_typeCheckConfig(t){super._typeCheckConfig(t),this._checkContent(t.content)}_checkContent(t){for(const[e,i]of Object.entries(t))super._typeCheckConfig({selector:e,entry:i},Ai)}_setContent(t,e,i){const s=Y.findOne(i,t);s&&((e=this._resolvePossibleFunction(e))?d(e)?this._putElementInTemplate(h(e),s):this._config.html?s.innerHTML=this._maybeSanitize(e):s.textContent=e:s.remove())}_maybeSanitize(t){return this._config.sanitize?function(t,e,i){if(!t.length)return t;if(i&&"function"==typeof i)return i(t);const s=(new window.DOMParser).parseFromString(t,"text/html"),n=[].concat(...s.body.querySelectorAll("*"));for(const t of n){const i=t.nodeName.toLowerCase();if(!Object.keys(e).includes(i)){t.remove();continue}const s=[].concat(...t.attributes),n=[].concat(e["*"]||[],e[i]||[]);for(const e of s)wi(e,n)||t.removeAttribute(e.nodeName)}return s.body.innerHTML}(t,this._config.allowList,this._config.sanitizeFn):t}_resolvePossibleFunction(t){return v(t,[this])}_putElementInTemplate(t,e){if(this._config.html)return e.innerHTML="",void e.append(t);e.textContent=t.textContent}}const xi=new Set(["sanitize","allowList","sanitizeFn"]),Ti="fade",Si="show",Ci=".tooltip-inner",Mi=".modal",Oi="hide.bs.modal",Ni="hover",Pi="focus",Li={AUTO:"auto",TOP:"top",RIGHT:b()?"left":"right",BOTTOM:"bottom",LEFT:b()?"right":"left"},Ii={allowList:bi,animation:!0,boundary:"clippingParents",container:!1,customClass:"",delay:0,fallbackPlacements:["top","right","bottom","left"],html:!1,offset:[0,6],placement:"top",popperConfig:null,sanitize:!0,sanitizeFn:null,selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',title:"",trigger:"hover focus"},ji={allowList:"object",animation:"boolean",boundary:"(string|element)",container:"(string|element|boolean)",customClass:"(string|function)",delay:"(number|object)",fallbackPlacements:"array",html:"boolean",offset:"(array|string|function)",placement:"(string|function)",popperConfig:"(null|object|function)",sanitize:"boolean",sanitizeFn:"(null|function)",selector:"(string|boolean)",template:"string",title:"(string|element|function)",trigger:"string"};class Di extends H{constructor(t,e){if(void 0===i)throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");super(t,e),this._isEnabled=!0,this._timeout=0,this._isHovered=null,this._activeTrigger={},this._popper=null,this._templateFactory=null,this._newContent=null,this.tip=null,this._setListeners(),this._config.selector||this._fixTitle()}static get Default(){return Ii}static get DefaultType(){return ji}static get NAME(){return"tooltip"}enable(){this._isEnabled=!0}disable(){this._isEnabled=!1}toggleEnabled(){this._isEnabled=!this._isEnabled}toggle(){this._isEnabled&&(this._activeTrigger.click=!this._activeTrigger.click,this._isShown()?this._leave():this._enter())}dispose(){clearTimeout(this._timeout),z.off(this._element.closest(Mi),Oi,this._hideModalHandler),this._element.getAttribute("data-bs-original-title")&&this._element.setAttribute("title",this._element.getAttribute("data-bs-original-title")),this._disposePopper(),super.dispose()}show(){if("none"===this._element.style.display)throw new Error("Please use show on visible elements");if(!this._isWithContent()||!this._isEnabled)return;const t=z.trigger(this._element,this.constructor.eventName("show")),e=(u(this._element)||this._element.ownerDocument.documentElement).contains(this._element);if(t.defaultPrevented||!e)return;this._disposePopper();const i=this._getTipElement();this._element.setAttribute("aria-describedby",i.getAttribute("id"));const{container:s}=this._config;if(this._element.ownerDocument.documentElement.contains(this.tip)||(s.append(i),z.trigger(this._element,this.constructor.eventName("inserted"))),this._popper=this._createPopper(i),i.classList.add(Si),"ontouchstart"in document.documentElement)for(const t of[].concat(...document.body.children))z.on(t,"mouseover",g);this._queueCallback(()=>{z.trigger(this._element,this.constructor.eventName("shown")),!1===this._isHovered&&this._leave(),this._isHovered=!1},this.tip,this._isAnimated())}hide(){if(this._isShown()&&!z.trigger(this._element,this.constructor.eventName("hide")).defaultPrevented){if(this._getTipElement().classList.remove(Si),"ontouchstart"in document.documentElement)for(const t of[].concat(...document.body.children))z.off(t,"mouseover",g);this._activeTrigger.click=!1,this._activeTrigger[Pi]=!1,this._activeTrigger[Ni]=!1,this._isHovered=null,this._queueCallback(()=>{this._isWithActiveTrigger()||(this._isHovered||this._disposePopper(),this._element.removeAttribute("aria-describedby"),z.trigger(this._element,this.constructor.eventName("hidden")))},this.tip,this._isAnimated())}}update(){this._popper&&this._popper.update()}_isWithContent(){return Boolean(this._getTitle())}_getTipElement(){return this.tip||(this.tip=this._createTipElement(this._newContent||this._getContentForTemplate())),this.tip}_createTipElement(t){const e=this._getTemplateFactory(t).toHtml();if(!e)return null;e.classList.remove(Ti,Si),e.classList.add(`bs-${this.constructor.NAME}-auto`);const i=(t=>{do{t+=Math.floor(1e6*Math.random())}while(document.getElementById(t));return t})(this.constructor.NAME).toString();return e.setAttribute("id",i),this._isAnimated()&&e.classList.add(Ti),e}setContent(t){this._newContent=t,this._isShown()&&(this._disposePopper(),this.show())}_getTemplateFactory(t){return this._templateFactory?this._templateFactory.changeContent(t):this._templateFactory=new Ei({...this._config,content:t,extraClass:this._resolvePossibleFunction(this._config.customClass)}),this._templateFactory}_getContentForTemplate(){return{[Ci]:this._getTitle()}}_getTitle(){return this._resolvePossibleFunction(this._config.title)||this._element.getAttribute("data-bs-original-title")}_initializeOnDelegatedTarget(t){return this.constructor.getOrCreateInstance(t.delegateTarget,this._getDelegateConfig())}_isAnimated(){return this._config.animation||this.tip&&this.tip.classList.contains(Ti)}_isShown(){return this.tip&&this.tip.classList.contains(Si)}_createPopper(t){const e=v(this._config.placement,[this,t,this._element]),s=Li[e.toUpperCase()];return i.createPopper(this._element,t,this._getPopperConfig(s))}_getOffset(){const{offset:t}=this._config;return"string"==typeof t?t.split(",").map(t=>Number.parseInt(t,10)):"function"==typeof t?e=>t(e,this._element):t}_resolvePossibleFunction(t){return v(t,[this._element])}_getPopperConfig(t){const e={placement:t,modifiers:[{name:"flip",options:{fallbackPlacements:this._config.fallbackPlacements}},{name:"offset",options:{offset:this._getOffset()}},{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"arrow",options:{element:`.${this.constructor.NAME}-arrow`}},{name:"preSetPlacement",enabled:!0,phase:"beforeMain",fn:t=>{this._getTipElement().setAttribute("data-popper-placement",t.state.placement)}}]};return{...e,...v(this._config.popperConfig,[e])}}_setListeners(){const t=this._config.trigger.split(" ");for(const e of t)if("click"===e)z.on(this._element,this.constructor.eventName("click"),this._config.selector,t=>{this._initializeOnDelegatedTarget(t).toggle()});else if("manual"!==e){const t=e===Ni?this.constructor.eventName("mouseenter"):this.constructor.eventName("focusin"),i=e===Ni?this.constructor.eventName("mouseleave"):this.constructor.eventName("focusout");z.on(this._element,t,this._config.selector,t=>{const e=this._initializeOnDelegatedTarget(t);e._activeTrigger["focusin"===t.type?Pi:Ni]=!0,e._enter()}),z.on(this._element,i,this._config.selector,t=>{const e=this._initializeOnDelegatedTarget(t);e._activeTrigger["focusout"===t.type?Pi:Ni]=e._element.contains(t.relatedTarget),e._leave()})}this._hideModalHandler=()=>{this._element&&this.hide()},z.on(this._element.closest(Mi),Oi,this._hideModalHandler)}_fixTitle(){const t=this._element.getAttribute("title");t&&(this._element.getAttribute("aria-label")||this._element.textContent.trim()||this._element.setAttribute("aria-label",t),this._element.setAttribute("data-bs-original-title",t),this._element.removeAttribute("title"))}_enter(){this._isShown()||this._isHovered?this._isHovered=!0:(this._isHovered=!0,this._setTimeout(()=>{this._isHovered&&this.show()},this._config.delay.show))}_leave(){this._isWithActiveTrigger()||(this._isHovered=!1,this._setTimeout(()=>{this._isHovered||this.hide()},this._config.delay.hide))}_setTimeout(t,e){clearTimeout(this._timeout),this._timeout=setTimeout(t,e)}_isWithActiveTrigger(){return Object.values(this._activeTrigger).includes(!0)}_getConfig(t){const e=B.getDataAttributes(this._element);for(const t of Object.keys(e))xi.has(t)&&delete e[t];return t={...e,..."object"==typeof t&&t?t:{}},t=this._mergeConfigObj(t),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}_configAfterMerge(t){return t.container=!1===t.container?document.body:h(t.container),"number"==typeof t.delay&&(t.delay={show:t.delay,hide:t.delay}),"number"==typeof t.title&&(t.title=t.title.toString()),"number"==typeof t.content&&(t.content=t.content.toString()),t}_getDelegateConfig(){const t={};for(const[e,i]of Object.entries(this._config))this.constructor.Default[e]!==i&&(t[e]=i);return t.selector=!1,t.trigger="manual",t}_disposePopper(){this._popper&&(this._popper.destroy(),this._popper=null),this.tip&&(this.tip.remove(),this.tip=null)}static jQueryInterface(t){return this.each(function(){const e=Di.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}})}}_(Di);const zi=".popover-header",Ri=".popover-body",Fi={...Di.Default,content:"",offset:[0,8],placement:"right",template:'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',trigger:"click"},Ui={...Di.DefaultType,content:"(null|string|element|function)"};class Bi extends Di{static get Default(){return Fi}static get DefaultType(){return Ui}static get NAME(){return"popover"}_isWithContent(){return this._getTitle()||this._getContent()}_getContentForTemplate(){return{[zi]:this._getTitle(),[Ri]:this._getContent()}}_getContent(){return this._resolvePossibleFunction(this._config.content)}static jQueryInterface(t){return this.each(function(){const e=Bi.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}})}}_(Bi);const Vi=".bs.scrollspy",Hi=`activate${Vi}`,Wi=`click${Vi}`,Yi=`load${Vi}.data-api`,qi="active",Ki="[href]",Qi=".nav-link",Gi=`${Qi}, .nav-item > ${Qi}, .list-group-item`,Zi={offset:null,rootMargin:"0px 0px -25%",smoothScroll:!1,target:null,threshold:[.1,.5,1]},Xi={offset:"(number|null)",rootMargin:"string",smoothScroll:"boolean",target:"element",threshold:"array"};class Ji extends H{constructor(t,e){super(t,e),this._targetLinks=new Map,this._observableSections=new Map,this._rootElement="visible"===getComputedStyle(this._element).overflowY?null:this._element,this._activeTarget=null,this._observer=null,this._previousScrollData={visibleEntryTop:0,parentScrollTop:0},this.refresh()}static get Default(){return Zi}static get DefaultType(){return Xi}static get NAME(){return"scrollspy"}refresh(){this._initializeTargetsAndObservables(),this._maybeEnableSmoothScroll(),this._observer?this._observer.disconnect():this._observer=this._getNewObserver();for(const t of this._observableSections.values())this._observer.observe(t)}dispose(){this._observer.disconnect(),super.dispose()}_configAfterMerge(t){return t.target=h(t.target)||document.body,t.rootMargin=t.offset?`${t.offset}px 0px -30%`:t.rootMargin,"string"==typeof t.threshold&&(t.threshold=t.threshold.split(",").map(t=>Number.parseFloat(t))),t}_maybeEnableSmoothScroll(){this._config.smoothScroll&&(z.off(this._config.target,Wi),z.on(this._config.target,Wi,Ki,t=>{const e=this._observableSections.get(t.target.hash);if(e){t.preventDefault();const i=this._rootElement||window,s=e.offsetTop-this._element.offsetTop;if(i.scrollTo)return void i.scrollTo({top:s,behavior:"smooth"});i.scrollTop=s}}))}_getNewObserver(){const t={root:this._rootElement,threshold:this._config.threshold,rootMargin:this._config.rootMargin};return new IntersectionObserver(t=>this._observerCallback(t),t)}_observerCallback(t){const e=t=>this._targetLinks.get(`#${t.target.id}`),i=t=>{this._previousScrollData.visibleEntryTop=t.target.offsetTop,this._process(e(t))},s=(this._rootElement||document.documentElement).scrollTop,n=s>=this._previousScrollData.parentScrollTop;this._previousScrollData.parentScrollTop=s;for(const o of t){if(!o.isIntersecting){this._activeTarget=null,this._clearActiveClass(e(o));continue}const t=o.target.offsetTop>=this._previousScrollData.visibleEntryTop;if(n&&t){if(i(o),!s)return}else n||t||i(o)}}_initializeTargetsAndObservables(){this._targetLinks=new Map,this._observableSections=new Map;const t=Y.find(Ki,this._config.target);for(const e of t){if(!e.hash||p(e))continue;const t=Y.findOne(decodeURI(e.hash),this._element);c(t)&&(this._targetLinks.set(decodeURI(e.hash),e),this._observableSections.set(e.hash,t))}}_process(t){this._activeTarget!==t&&(this._clearActiveClass(this._config.target),this._activeTarget=t,t.classList.add(qi),this._activateParents(t),z.trigger(this._element,Hi,{relatedTarget:t}))}_activateParents(t){if(t.classList.contains("dropdown-item"))Y.findOne(".dropdown-toggle",t.closest(".dropdown")).classList.add(qi);else for(const e of Y.parents(t,".nav, .list-group"))for(const t of Y.prev(e,Gi))t.classList.add(qi)}_clearActiveClass(t){t.classList.remove(qi);const e=Y.find(`${Ki}.${qi}`,t);for(const t of e)t.classList.remove(qi)}static jQueryInterface(t){return this.each(function(){const e=Ji.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t]()}})}}z.on(window,Yi,()=>{for(const t of Y.find('[data-bs-spy="scroll"]'))Ji.getOrCreateInstance(t)}),_(Ji);const ts=".bs.tab",es=`hide${ts}`,is=`hidden${ts}`,ss=`show${ts}`,ns=`shown${ts}`,os=`click${ts}`,as=`keydown${ts}`,rs=`load${ts}`,ls="ArrowLeft",ds="ArrowRight",hs="ArrowUp",cs="ArrowDown",ps="Home",us="End",gs="active",ms="fade",fs="show",ys=".dropdown-toggle",bs=`:not(${ys})`,_s='[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',vs=`.nav-link${bs}, .list-group-item${bs}, [role="tab"]${bs}, ${_s}`,ws=`.${gs}[data-bs-toggle="tab"], .${gs}[data-bs-toggle="pill"], .${gs}[data-bs-toggle="list"]`;class $s extends H{constructor(t){super(t),this._parent=this._element.closest('.list-group, .nav, [role="tablist"]'),this._parent&&(this._setInitialAttributes(this._parent,this._getChildren()),z.on(this._element,as,t=>this._keydown(t)))}static get NAME(){return"tab"}show(){const t=this._element;if(this._elemIsActive(t))return;const e=this._getActiveElem(),i=e?z.trigger(e,es,{relatedTarget:t}):null;z.trigger(t,ss,{relatedTarget:e}).defaultPrevented||i&&i.defaultPrevented||(this._deactivate(e,t),this._activate(t,e))}_activate(t,e){t&&(t.classList.add(gs),this._activate(Y.getElementFromSelector(t)),this._queueCallback(()=>{"tab"===t.getAttribute("role")?(t.removeAttribute("tabindex"),t.setAttribute("aria-selected",!0),this._toggleDropDown(t,!0),z.trigger(t,ns,{relatedTarget:e})):t.classList.add(fs)},t,t.classList.contains(ms)))}_deactivate(t,e){t&&(t.classList.remove(gs),t.blur(),this._deactivate(Y.getElementFromSelector(t)),this._queueCallback(()=>{"tab"===t.getAttribute("role")?(t.setAttribute("aria-selected",!1),t.setAttribute("tabindex","-1"),this._toggleDropDown(t,!1),z.trigger(t,is,{relatedTarget:e})):t.classList.remove(fs)},t,t.classList.contains(ms)))}_keydown(t){if(![ls,ds,hs,cs,ps,us].includes(t.key))return;t.stopPropagation(),t.preventDefault();const e=this._getChildren().filter(t=>!p(t));let i;if([ps,us].includes(t.key))i=e[t.key===ps?0:e.length-1];else{const s=[ds,cs].includes(t.key);i=$(e,t.target,s,!0)}i&&(i.focus({preventScroll:!0}),$s.getOrCreateInstance(i).show())}_getChildren(){return Y.find(vs,this._parent)}_getActiveElem(){return this._getChildren().find(t=>this._elemIsActive(t))||null}_setInitialAttributes(t,e){this._setAttributeIfNotExists(t,"role","tablist");for(const t of e)this._setInitialAttributesOnChild(t)}_setInitialAttributesOnChild(t){t=this._getInnerElement(t);const e=this._elemIsActive(t),i=this._getOuterElement(t);t.setAttribute("aria-selected",e),i!==t&&this._setAttributeIfNotExists(i,"role","presentation"),e||t.setAttribute("tabindex","-1"),this._setAttributeIfNotExists(t,"role","tab"),this._setInitialAttributesOnTargetPanel(t)}_setInitialAttributesOnTargetPanel(t){const e=Y.getElementFromSelector(t);e&&(this._setAttributeIfNotExists(e,"role","tabpanel"),t.id&&this._setAttributeIfNotExists(e,"aria-labelledby",`${t.id}`))}_toggleDropDown(t,e){const i=this._getOuterElement(t);if(!i.classList.contains("dropdown"))return;const s=(t,s)=>{const n=Y.findOne(t,i);n&&n.classList.toggle(s,e)};s(ys,gs),s(".dropdown-menu",fs),i.setAttribute("aria-expanded",e)}_setAttributeIfNotExists(t,e,i){t.hasAttribute(e)||t.setAttribute(e,i)}_elemIsActive(t){return t.classList.contains(gs)}_getInnerElement(t){return t.matches(vs)?t:Y.findOne(vs,t)}_getOuterElement(t){return t.closest(".nav-item, .list-group-item")||t}static jQueryInterface(t){return this.each(function(){const e=$s.getOrCreateInstance(this);if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t]()}})}}z.on(document,os,_s,function(t){["A","AREA"].includes(this.tagName)&&t.preventDefault(),p(this)||$s.getOrCreateInstance(this).show()}),z.on(window,rs,()=>{for(const t of Y.find(ws))$s.getOrCreateInstance(t)}),_($s);const ks=".bs.toast",As=`mouseover${ks}`,Es=`mouseout${ks}`,xs=`focusin${ks}`,Ts=`focusout${ks}`,Ss=`hide${ks}`,Cs=`hidden${ks}`,Ms=`show${ks}`,Os=`shown${ks}`,Ns="hide",Ps="show",Ls="showing",Is={animation:"boolean",autohide:"boolean",delay:"number"},js={animation:!0,autohide:!0,delay:5e3};class Ds extends H{constructor(t,e){super(t,e),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners()}static get Default(){return js}static get DefaultType(){return Is}static get NAME(){return"toast"}show(){z.trigger(this._element,Ms).defaultPrevented||(this._clearTimeout(),this._config.animation&&this._element.classList.add("fade"),this._element.classList.remove(Ns),m(this._element),this._element.classList.add(Ps,Ls),this._queueCallback(()=>{this._element.classList.remove(Ls),z.trigger(this._element,Os),this._maybeScheduleHide()},this._element,this._config.animation))}hide(){this.isShown()&&(z.trigger(this._element,Ss).defaultPrevented||(this._element.classList.add(Ls),this._queueCallback(()=>{this._element.classList.add(Ns),this._element.classList.remove(Ls,Ps),z.trigger(this._element,Cs)},this._element,this._config.animation)))}dispose(){this._clearTimeout(),this.isShown()&&this._element.classList.remove(Ps),super.dispose()}isShown(){return this._element.classList.contains(Ps)}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout(()=>{this.hide()},this._config.delay)))}_onInteraction(t,e){switch(t.type){case"mouseover":case"mouseout":this._hasMouseInteraction=e;break;case"focusin":case"focusout":this._hasKeyboardInteraction=e}if(e)return void this._clearTimeout();const i=t.relatedTarget;this._element===i||this._element.contains(i)||this._maybeScheduleHide()}_setListeners(){z.on(this._element,As,t=>this._onInteraction(t,!0)),z.on(this._element,Es,t=>this._onInteraction(t,!1)),z.on(this._element,xs,t=>this._onInteraction(t,!0)),z.on(this._element,Ts,t=>this._onInteraction(t,!1))}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null}static jQueryInterface(t){return this.each(function(){const e=Ds.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t](this)}})}}return q(Ds),_(Ds),{Alert:Z,Button:J,Carousel:Pt,Collapse:qt,Dropdown:be,Modal:Je,Offcanvas:yi,Popover:Bi,ScrollSpy:Ji,Tab:$s,Toast:Ds,Tooltip:Di}},"object"==typeof exports&&"undefined"!=typeof module?module.exports=fo(require("@popperjs/core")):"function"==typeof define&&define.amd?define(["@popperjs/core"],fo):(mo="undefined"!=typeof globalThis?globalThis:mo||self).bootstrap=fo(mo.Popper),document.addEventListener("shown.bs.popover",function(t){if(!t?.target)return void console.warn("Popover shown event has no target");const e=t.target.getAttribute("aria-describedby"),i=document.getElementById(e);(void 0).getInstance(i);$(i).find(".popover-close-button").on("click",()=>{})});
/**
     * @license lucide v0.477.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */
const yo={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},bo=([t,e,i])=>{const s=document.createElementNS("http://www.w3.org/2000/svg",t);return Object.keys(e).forEach(t=>{s.setAttribute(t,String(e[t]))}),i?.length&&i.forEach(t=>{const e=bo(t);s.appendChild(e)}),s},_o=t=>"string"==typeof t?t:t&&t.class?t.class&&"string"==typeof t.class?t.class.split(" "):t.class&&Array.isArray(t.class)?t.class:"":"",vo=(t,{nameAttr:e,icons:i,attrs:s})=>{const n=t.getAttribute(e);if(null==n)return;const o=i[n.replace(/(\w)(\w*)(_|-|\s*)/g,(t,e,i)=>e.toUpperCase()+i.toLowerCase())];if(!o)return console.warn(`${t.outerHTML} icon name was not found in the provided icons object.`);const a=(t=>Array.from(t.attributes).reduce((t,e)=>(t[e.name]=e.value,t),{}))(t),r={...yo,"data-lucide":n,...s,...a},l=["lucide",`lucide-${n}`,a,s].flatMap(_o).map(t=>t.trim()).filter(Boolean).filter((t,e,i)=>i.indexOf(t)===e).join(" ");l&&Object.assign(r,{class:l});const d=((t,e={})=>{const i={...yo,...e};return bo(["svg",i,t])})(o,r);return t.parentNode?.replaceChild(d,t)},wo=[["path",{d:"m6 9 6 6 6-6"}]],$o=[["path",{d:"m18 15-6-6-6 6"}]],ko=[["path",{d:"M15 3h6v6"}],["path",{d:"M10 14 21 3"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}]],Ao=[["path",{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"}]],Eo=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],["path",{d:"M2 12h20"}]],xo=[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5"}]],To=[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}],["rect",{width:"4",height:"12",x:"2",y:"9"}],["circle",{cx:"4",cy:"4",r:"2"}]],So=[["line",{x1:"4",x2:"20",y1:"12",y2:"12"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18"}]],Co=[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"}]],Mo=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]],Oo=[["path",{d:"M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"}],["path",{d:"m10 15 5-3-5-3z"}]];
/**
     * @license lucide v0.477.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */jQuery(function(){$(".js-disabled").removeClass("js-disabled"),(({icons:t={},nameAttr:e="data-lucide",attrs:i={}}={})=>{if(!Object.values(t).length)throw new Error("Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`");if("undefined"==typeof document)throw new Error("`createIcons()` only works in a browser environment.");const s=document.querySelectorAll(`[${e}]`);if(Array.from(s).forEach(s=>vo(s,{nameAttr:e,icons:t,attrs:i})),"data-lucide"===e){const e=document.querySelectorAll("[icon-name]");e.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(e).forEach(e=>vo(e,{nameAttr:"icon-name",icons:t,attrs:i})))}})({icons:{ExternalLink:ko,User:Mo,Menu:So,Globe:Eo,ChevronDown:wo,ChevronUp:$o,Facebook:Ao,Twitter:Co,Instagram:xo,Youtube:Oo,Linkedin:To}})})}();
