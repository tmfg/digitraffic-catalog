!function(){"use strict";const t={name:"fds-size-3",value:"24px"},e=class{constructor(t){this.ariaAtomic="",this.ariaAutoComplete="",this.ariaBraileLabel="",this.ariaBraileRoleDescription="",this.ariaBusy="",this.ariaChecked="",this.ariaColCount="",this.ariaColIndex="",this.ariaColSpan="",this.ariaCurrent="",this.ariaDescription="",this.ariaDisabled="",this.ariaExpanded="",this.ariaHasPopup="",this.ariaHidden="",this.ariaInvalid="",this.ariaKeyShortcuts="",this.ariaLabel="",this.ariaLevel="",this.ariaLive="",this.ariaModal="",this.ariaMultiLine="",this.ariaMultiSelectable="",this.ariaOrientation="",this.ariaPlaceholder="",this.ariaPosInSet="",this.ariaPressed="",this.ariaReadOnly="",this.ariaRequired="",this.ariaRoleDescription="",this.ariaRowCount="",this.ariaRowIndex="",this.ariaRowSpan="",this.ariaSelected="",this.ariaSetSize="",this.ariaSort="",this.ariaValueMax="",this.ariaValueMin="",this.ariaValueNow="",this.ariaValueText="",this.role="",this.form=null,this.labels=[],this.states=new Set,this.validationMessage="",this.validity={},this.willValidate=!0,this.__host=t}get shadowRoot(){return this.__host.__shadowRoot}checkValidity(){return console.warn("`ElementInternals.checkValidity()` was called on the server.This method always returns true."),!0}reportValidity(){return!0}setFormValue(){}setValidity(){}},i=new WeakMap,a=t=>{let e=i.get(t);return void 0===e&&i.set(t,e=new Map),e},o=class{constructor(){this.__shadowRootMode=null,this.__shadowRoot=null,this.__internals=null}get attributes(){return Array.from(a(this)).map((([t,e])=>({name:t,value:e})))}get shadowRoot(){return"closed"===this.__shadowRootMode?null:this.__shadowRoot}setAttribute(t,e){a(this).set(t,String(e))}removeAttribute(t){a(this).delete(t)}hasAttribute(t){return a(this).has(t)}attachShadow(t){const e={host:this};return this.__shadowRootMode=t.mode,t&&"open"===t.mode&&(this.__shadowRoot=e),e}attachInternals(){if(null!==this.__internals)throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");const t=new e(this);return this.__internals=t,t}getAttribute(t){return a(this).get(t)??null}},s=class extends o{},n=new class{constructor(){this.__definitions=new Map}define(t,e){if(this.__definitions.has(t)){if("development"!==process.env.NODE_ENV)throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the name "${t}" has already been used with this registry`);console.warn(`'CustomElementRegistry' already has "${t}" defined. This may have been caused by live reload or hot module replacement in which case it can be safely ignored.\nMake sure to test your application with a production build as repeat registrations will throw in production.`)}this.__definitions.set(t,{ctor:e,observedAttributes:e.observedAttributes??[]})}get(t){const e=this.__definitions.get(t);return e?.ctor}},r=globalThis,l=r.ShadowRoot&&(void 0===r.ShadyCSS||r.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,d=Symbol(),h=new WeakMap;
/**
     * @license
     * Copyright 2023 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */let p=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==d)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(l&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=h.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&h.set(e,t))}return t}toString(){return this.cssText}};const c=t=>new p("string"==typeof t?t:t+"",void 0,d),y=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,a)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[a+1]),t[0]);return new p(i,t,d)},m=(t,e)=>{l?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style"),a=r.litNonce;void 0!==a&&i.setAttribute("nonce",a),i.textContent=e.cssText,t.appendChild(i)}))},g=l||void 0===r.CSSStyleSheet?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return c(e)})(t):t
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */;var u,f;const b=globalThis;null!==(u=b.customElements)&&void 0!==u||(b.customElements=n);const v=b.trustedTypes,w=v?v.emptyScript:"",_=b.reactiveElementPolyfillSupport,k={toAttribute(t,e){switch(e){case Boolean:t=t?w:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},x=(t,e)=>e!==t&&(e==e||t==t),S={attribute:!0,type:String,converter:k,reflect:!1,hasChanged:x},M="finalized";let A=class extends(globalThis.HTMLElement??s){constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const a=this._$Ep(i,e);void 0!==a&&(this._$Ev.set(a,i),t.push(a))})),t}static createProperty(t,e=S){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,a=this.getPropertyDescriptor(t,i,e);void 0!==a&&Object.defineProperty(this.prototype,t,a)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(a){const o=this[t];this[e]=a,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||S}static finalize(){if(this.hasOwnProperty(M))return!1;this[M]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(g(t))}else void 0!==t&&e.push(g(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return m(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=S){var a;const o=this.constructor._$Ep(t,i);if(void 0!==o&&!0===i.reflect){const s=(void 0!==(null===(a=i.converter)||void 0===a?void 0:a.toAttribute)?i.converter:k).toAttribute(e,i.type);this._$El=t,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$El=null}}_$AK(t,e){var i;const a=this.constructor,o=a._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=a.getPropertyOptions(o),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:k;this._$El=o,this[o]=s.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let a=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||x)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):a=!1),!this.isUpdatePending&&a&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var E;A[M]=!0,A.elementProperties=new Map,A.elementStyles=[],A.shadowRootOptions={mode:"open"},null==_||_({ReactiveElement:A}),(null!==(f=b.reactiveElementVersions)&&void 0!==f?f:b.reactiveElementVersions=[]).push("1.6.3");const T=globalThis,j=T.trustedTypes,C=j?j.createPolicy("lit-html",{createHTML:t=>t}):void 0,P="$lit$",z=`lit$${(Math.random()+"").slice(9)}$`,L="?"+z,O=`<${L}>`,N=void 0===T.document?{createTreeWalker:()=>({})}:document,R=()=>N.createComment(""),D=t=>null===t||"object"!=typeof t&&"function"!=typeof t,I=Array.isArray,V="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,B=/-->/g,H=/>/g,F=RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),K=/'/g,Y=/"/g,q=/^(?:script|style|textarea|title)$/i,W=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),Z=Symbol.for("lit-noChange"),Q=Symbol.for("lit-nothing"),J=new WeakMap,G=N.createTreeWalker(N,129,null,!1);function X(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const tt=(t,e)=>{const i=t.length-1,a=[];let o,s=2===e?"<svg>":"",n=U;for(let e=0;e<i;e++){const i=t[e];let r,l,d=-1,h=0;for(;h<i.length&&(n.lastIndex=h,l=n.exec(i),null!==l);)h=n.lastIndex,n===U?"!--"===l[1]?n=B:void 0!==l[1]?n=H:void 0!==l[2]?(q.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=F):void 0!==l[3]&&(n=F):n===F?">"===l[0]?(n=null!=o?o:U,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,r=l[1],n=void 0===l[3]?F:'"'===l[3]?Y:K):n===Y||n===K?n=F:n===B||n===H?n=U:(n=F,o=void 0);const p=n===F&&t[e+1].startsWith("/>")?" ":"";s+=n===U?i+O:d>=0?(a.push(r),i.slice(0,d)+P+i.slice(d)+z+p):i+z+(-2===d?(a.push(void 0),e):p)}return[X(t,s+(t[i]||"<?>")+(2===e?"</svg>":"")),a]};class et{constructor({strings:t,_$litType$:e},i){let a;this.parts=[];let o=0,s=0;const n=t.length-1,r=this.parts,[l,d]=tt(t,e);if(this.el=et.createElement(l,i),G.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(a=G.nextNode())&&r.length<n;){if(1===a.nodeType){if(a.hasAttributes()){const t=[];for(const e of a.getAttributeNames())if(e.endsWith(P)||e.startsWith(z)){const i=d[s++];if(t.push(e),void 0!==i){const t=a.getAttribute(i.toLowerCase()+P).split(z),e=/([.?@])?(.*)/.exec(i);r.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?nt:"?"===e[1]?lt:"@"===e[1]?dt:st})}else r.push({type:6,index:o})}for(const e of t)a.removeAttribute(e)}if(q.test(a.tagName)){const t=a.textContent.split(z),e=t.length-1;if(e>0){a.textContent=j?j.emptyScript:"";for(let i=0;i<e;i++)a.append(t[i],R()),G.nextNode(),r.push({type:2,index:++o});a.append(t[e],R())}}}else if(8===a.nodeType)if(a.data===L)r.push({type:2,index:o});else{let t=-1;for(;-1!==(t=a.data.indexOf(z,t+1));)r.push({type:7,index:o}),t+=z.length-1}o++}}static createElement(t,e){const i=N.createElement("template");return i.innerHTML=t,i}}function it(t,e,i=t,a){var o,s,n,r;if(e===Z)return e;let l=void 0!==a?null===(o=i._$Co)||void 0===o?void 0:o[a]:i._$Cl;const d=D(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(s=null==l?void 0:l._$AO)||void 0===s||s.call(l,!1),void 0===d?l=void 0:(l=new d(t),l._$AT(t,i,a)),void 0!==a?(null!==(n=(r=i)._$Co)&&void 0!==n?n:r._$Co=[])[a]=l:i._$Cl=l),void 0!==l&&(e=it(t,l._$AS(t,e.values),l,a)),e}class at{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:a}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:N).importNode(i,!0);G.currentNode=o;let s=G.nextNode(),n=0,r=0,l=a[0];for(;void 0!==l;){if(n===l.index){let e;2===l.type?e=new ot(s,s.nextSibling,this,t):1===l.type?e=new l.ctor(s,l.name,l.strings,this,t):6===l.type&&(e=new ht(s,this,t)),this._$AV.push(e),l=a[++r]}n!==(null==l?void 0:l.index)&&(s=G.nextNode(),n++)}return G.currentNode=N,o}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class ot{constructor(t,e,i,a){var o;this.type=2,this._$AH=Q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=a,this._$Cp=null===(o=null==a?void 0:a.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=it(this,t,e),D(t)?t===Q||null==t||""===t?(this._$AH!==Q&&this._$AR(),this._$AH=Q):t!==this._$AH&&t!==Z&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>I(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==Q&&D(this._$AH)?this._$AA.nextSibling.data=t:this.$(N.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:a}=t,o="number"==typeof a?this._$AC(t):(void 0===a.el&&(a.el=et.createElement(X(a.h,a.h[0]),this.options)),a);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.v(i);else{const t=new at(o,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=J.get(t.strings);return void 0===e&&J.set(t.strings,e=new et(t)),e}T(t){I(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,a=0;for(const o of t)a===e.length?e.push(i=new ot(this.k(R()),this.k(R()),this,this.options)):i=e[a],i._$AI(o),a++;a<e.length&&(this._$AR(i&&i._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class st{constructor(t,e,i,a,o){this.type=1,this._$AH=Q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Q}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,a){const o=this.strings;let s=!1;if(void 0===o)t=it(this,t,e,0),s=!D(t)||t!==this._$AH&&t!==Z,s&&(this._$AH=t);else{const a=t;let n,r;for(t=o[0],n=0;n<o.length-1;n++)r=it(this,a[i+n],e,n),r===Z&&(r=this._$AH[n]),s||(s=!D(r)||r!==this._$AH[n]),r===Q?t=Q:t!==Q&&(t+=(null!=r?r:"")+o[n+1]),this._$AH[n]=r}s&&!a&&this.j(t)}j(t){t===Q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class nt extends st{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Q?void 0:t}}const rt=j?j.emptyScript:"";class lt extends st{constructor(){super(...arguments),this.type=4}j(t){t&&t!==Q?this.element.setAttribute(this.name,rt):this.element.removeAttribute(this.name)}}class dt extends st{constructor(t,e,i,a,o){super(t,e,i,a,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=it(this,t,e,0))&&void 0!==i?i:Q)===Z)return;const a=this._$AH,o=t===Q&&a!==Q||t.capture!==a.capture||t.once!==a.once||t.passive!==a.passive,s=t!==Q&&(a===Q||o);o&&this.element.removeEventListener(this.name,this,a),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class ht{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){it(this,t)}}const pt=T.litHtmlPolyfillSupport;null==pt||pt(et,ot),(null!==(E=T.litHtmlVersions)&&void 0!==E?E:T.litHtmlVersions=[]).push("2.8.0");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var ct,yt;class mt extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var a,o;const s=null!==(a=null==i?void 0:i.renderBefore)&&void 0!==a?a:e;let n=s._$litPart$;if(void 0===n){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;s._$litPart$=n=new ot(e.insertBefore(R(),t),t,void 0,null!=i?i:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return Z}}mt.finalized=!0,mt._$litElement$=!0,null===(ct=globalThis.litElementHydrateSupport)||void 0===ct||ct.call(globalThis,{LitElement:mt});const gt=globalThis.litElementPolyfillSupport;null==gt||gt({LitElement:mt}),(null!==(yt=globalThis.litElementVersions)&&void 0!==yt?yt:globalThis.litElementVersions=[]).push("3.3.3");const ut=c("var(--fds-radius-compact, 2px)"),ft=c("var(--fds-style-elevation-200, 0px 6px 6px 0px rgba(0, 0, 0, 0.23), 0px 3px 6px 0px rgba(0, 0, 0, 0.16))"),bt=c("var(--fds-typography-body-default-font-family, 'Public Sans')"),vt=c("var(--fds-typography-body-default-font-size, 16px)"),wt=c("var(--fds-typography-body-default-letter-spacing, 0px)"),$t=c("var(--fds-typography-body-default-line-height, 150%)"),_t=c("var(--fds-typography-body-default-font-weight, 400)"),kt=c("var(--fds-typography-body-default-display, inline-block)"),xt=c("var(--fds-typography-body-large-font-family, 'Public Sans')"),St=c("var(--fds-typography-body-large-font-size, 18px)"),Mt=c("var(--fds-typography-body-large-letter-spacing, 0px)"),At=c("var(--fds-typography-body-large-line-height, 150%)"),Et=c("var(--fds-typography-body-large-font-weight, 400)"),Tt=c("var(--fds-typography-body-large-display, inline-block)"),jt=c("var(--fds-typography-body-micro-font-family, 'Public Sans')"),Ct=c("var(--fds-typography-body-micro-font-size, 12px)"),Pt=c("var(--fds-typography-body-micro-letter-spacing, 0px)"),zt=c("var(--fds-typography-body-micro-line-height, 150%)"),Lt=c("var(--fds-typography-body-micro-font-weight, 400)"),Ot=c("var(--fds-typography-body-micro-display, inline-block)"),Nt=c("var(--fds-typography-body-small-font-family, 'Public Sans')"),Rt=c("var(--fds-typography-body-small-font-size, 14px)"),Dt=c("var(--fds-typography-body-small-letter-spacing, 0px)"),It=c("var(--fds-typography-body-small-line-height, 150%)"),Vt=c("var(--fds-typography-body-small-font-weight, 400)"),Ut=c("var(--fds-typography-body-small-display, inline-block)"),Bt=c("var(--fds-typography-emphasis-default-font-family, 'Public Sans')"),Ht=c("var(--fds-typography-emphasis-default-font-size, 16px)"),Ft=c("var(--fds-typography-emphasis-default-letter-spacing, 0px)"),Kt=c("var(--fds-typography-emphasis-default-line-height, 150%)"),Yt=c("var(--fds-typography-emphasis-default-font-weight, 700)"),qt=c("var(--fds-typography-emphasis-default-display, inline-block)"),Wt=c("var(--fds-typography-emphasis-large-font-family, 'Public Sans')"),Zt=c("var(--fds-typography-emphasis-large-font-size, 18px)"),Qt=c("var(--fds-typography-emphasis-large-letter-spacing, 0px)"),Jt=c("var(--fds-typography-emphasis-large-line-height, 150%)"),Gt=c("var(--fds-typography-emphasis-large-font-weight, 700)"),Xt=c("var(--fds-typography-emphasis-large-display, inline-block)"),te=c("var(--fds-typography-emphasis-micro-font-family, 'Public Sans')"),ee=c("var(--fds-typography-emphasis-micro-font-size, 12px)"),ie=c("var(--fds-typography-emphasis-micro-letter-spacing, 0px)"),ae=c("var(--fds-typography-emphasis-micro-line-height, 150%)"),oe=c("var(--fds-typography-emphasis-micro-font-weight, 700)"),se=c("var(--fds-typography-emphasis-micro-display, inline-block)"),ne=c("var(--fds-typography-emphasis-small-font-family, 'Public Sans')"),re=c("var(--fds-typography-emphasis-small-font-size, 14px)"),le=c("var(--fds-typography-emphasis-small-letter-spacing, 0px)"),de=c("var(--fds-typography-emphasis-small-line-height, 150%)"),he=c("var(--fds-typography-emphasis-small-font-weight, 700)"),pe=c("var(--fds-typography-emphasis-small-display, inline-block)"),ce=c("var(--fds-typography-heading-large-heading-3-font-family, 'Public Sans', 'PublicSans-Bold')"),ye=c("var(--fds-typography-heading-large-heading-3-font-size, 40px)"),me=c("var(--fds-typography-heading-large-heading-3-letter-spacing, 0px)"),ge=c("var(--fds-typography-heading-large-heading-3-line-height, 110%)"),ue=c("var(--fds-typography-heading-large-heading-3-font-weight, 700)"),fe=c("var(--fds-typography-heading-large-heading-3-display, inline-block)"),be=c("var(--fds-typography-heading-large-heading-4-font-family, 'Public Sans', 'PublicSans-Bold')"),ve=c("var(--fds-typography-heading-large-heading-4-font-size, 32px)"),we=c("var(--fds-typography-heading-large-heading-4-letter-spacing, 0px)"),$e=c("var(--fds-typography-heading-large-heading-4-line-height, 110%)"),_e=c("var(--fds-typography-heading-large-heading-4-font-weight, 700)"),ke=c("var(--fds-typography-heading-large-heading-4-display, inline-block)"),xe=c("var(--fds-typography-heading-large-heading-5-font-family, 'Public Sans', 'PublicSans-Bold')"),Se=c("var(--fds-typography-heading-large-heading-5-font-size, 28px)"),Me=c("var(--fds-typography-heading-large-heading-5-letter-spacing, 0px)"),Ae=c("var(--fds-typography-heading-large-heading-5-line-height, 110%)"),Ee=c("var(--fds-typography-heading-large-heading-5-font-weight, 700)"),Te=c("var(--fds-typography-heading-large-heading-5-display, inline-block)"),je=c("var(--fds-typography-heading-large-heading-6-font-family, 'Public Sans', 'PublicSans-Bold')"),Ce=c("var(--fds-typography-heading-large-heading-6-font-size, 20px)"),Pe=c("var(--fds-typography-heading-large-heading-6-letter-spacing, 0px)"),ze=c("var(--fds-typography-heading-large-heading-6-line-height, 110%)"),Le=c("var(--fds-typography-heading-large-heading-6-font-weight, 700)"),Oe=c("var(--fds-typography-heading-large-heading-6-display, inline-block)"),Ne=c("var(--fds-typography-heading-large-heading-1-font-family, 'Public Sans', 'PublicSans-Bold')"),Re=c("var(--fds-typography-heading-large-heading-1-font-size, 64px)"),De=c("var(--fds-typography-heading-large-heading-1-letter-spacing, 0px)"),Ie=c("var(--fds-typography-heading-large-heading-1-line-height, 110%)"),Ve=c("var(--fds-typography-heading-large-heading-1-font-weight, 700)"),Ue=c("var(--fds-typography-heading-large-heading-1-display, inline-block)"),Be=c("var(--fds-typography-heading-large-heading-2-font-family, 'Public Sans', 'PublicSans-Bold')"),He=c("var(--fds-typography-heading-large-heading-2-font-size, 48px)"),Fe=c("var(--fds-typography-heading-large-heading-2-letter-spacing, 0px)"),Ke=c("var(--fds-typography-heading-large-heading-2-line-height, 110%)"),Ye=c("var(--fds-typography-heading-large-heading-2-font-weight, 700)"),qe=c("var(--fds-typography-heading-large-heading-2-display, inline-block)"),We=c("var(--fds-typography-heading-small-heading-1-font-family, 'Public Sans', 'PublicSans-Bold')"),Ze=c("var(--fds-typography-heading-small-heading-1-font-size, 42px)"),Qe=c("var(--fds-typography-heading-small-heading-1-letter-spacing, 0px)"),Je=c("var(--fds-typography-heading-small-heading-1-line-height, 110%)"),Ge=c("var(--fds-typography-heading-small-heading-1-font-weight, 700)"),Xe=c("var(--fds-typography-heading-small-heading-1-display, inline-block)"),ti=c("var(--fds-typography-heading-small-heading-2-font-family, 'Public Sans', 'PublicSans-Bold')"),ei=c("var(--fds-typography-heading-small-heading-2-font-size, 32px)"),ii=c("var(--fds-typography-heading-small-heading-2-letter-spacing, 0px)"),ai=c("var(--fds-typography-heading-small-heading-2-line-height, 110%)"),oi=c("var(--fds-typography-heading-small-heading-2-font-weight, 700)"),si=c("var(--fds-typography-heading-small-heading-2-display, inline-block)"),ni=c("var(--fds-typography-heading-small-heading-3-font-family, 'Public Sans', 'PublicSans-Bold')"),ri=c("var(--fds-typography-heading-small-heading-3-font-size, 28px)"),li=c("var(--fds-typography-heading-small-heading-3-letter-spacing, 0px)"),di=c("var(--fds-typography-heading-small-heading-3-line-height, 110%)"),hi=c("var(--fds-typography-heading-small-heading-3-font-weight, 700)"),pi=c("var(--fds-typography-heading-small-heading-3-display, inline-block)"),ci=c("var(--fds-typography-heading-small-heading-4-font-family, 'Public Sans', 'PublicSans-Bold')"),yi=c("var(--fds-typography-heading-small-heading-4-font-size, 24px)"),mi=c("var(--fds-typography-heading-small-heading-4-letter-spacing, 0px)"),gi=c("var(--fds-typography-heading-small-heading-4-line-height, 110%)"),ui=c("var(--fds-typography-heading-small-heading-4-font-weight, 700)"),fi=c("var(--fds-typography-heading-small-heading-4-display, inline-block)"),bi=c("var(--fds-typography-heading-small-heading-5-font-family, 'Public Sans', 'PublicSans-Bold')"),vi=c("var(--fds-typography-heading-small-heading-5-font-size, 18px)"),wi=c("var(--fds-typography-heading-small-heading-5-letter-spacing, 0px)"),$i=c("var(--fds-typography-heading-small-heading-5-line-height, 110%)"),_i=c("var(--fds-typography-heading-small-heading-5-font-weight, 700)"),ki=c("var(--fds-typography-heading-small-heading-5-display, inline-block)"),xi=c("var(--fds-typography-heading-small-heading-6-font-family, 'Public Sans', 'PublicSans-Bold')"),Si=c("var(--fds-typography-heading-small-heading-6-font-size, 16px)"),Mi=c("var(--fds-typography-heading-small-heading-6-letter-spacing, 0px)"),Ai=c("var(--fds-typography-heading-small-heading-6-line-height, 110%)"),Ei=c("var(--fds-typography-heading-small-heading-6-font-weight, 700)"),Ti=c("var(--fds-typography-heading-small-heading-6-display, inline-block)"),ji=c("var(--fds-typography-link-large-font-family, 'Public Sans')"),Ci=c("var(--fds-typography-link-large-font-size, 18px)"),Pi=c("var(--fds-typography-link-large-letter-spacing, 0px)"),zi=c("var(--fds-typography-link-large-line-height, 150%)"),Li=c("var(--fds-typography-link-large-font-weight, 400)"),Oi=c("var(--fds-typography-link-large-text-decoration, underline)"),Ni=c("var(--fds-typography-link-large-display, inline-block)"),Ri=c("var(--fds-typography-link-micro-font-family, 'Public Sans')"),Di=c("var(--fds-typography-link-micro-font-size, 12px)"),Ii=c("var(--fds-typography-link-micro-letter-spacing, 0px)"),Vi=c("var(--fds-typography-link-micro-line-height, 150%)"),Ui=c("var(--fds-typography-link-micro-font-weight, 400)"),Bi=c("var(--fds-typography-link-micro-text-decoration, underline)"),Hi=c("var(--fds-typography-link-micro-display, inline-block)"),Fi=c("var(--fds-typography-link-small-font-family, 'Public Sans')"),Ki=c("var(--fds-typography-link-small-font-size, 14px)"),Yi=c("var(--fds-typography-link-small-letter-spacing, 0px)"),qi=c("var(--fds-typography-link-small-line-height, 150%)"),Wi=c("var(--fds-typography-link-small-font-weight, 400)"),Zi=c("var(--fds-typography-link-small-text-decoration, underline)"),Qi=c("var(--fds-typography-link-small-display, inline-block)"),Ji=c("var(--fds-typography-link-default-font-family, 'Public Sans')"),Gi=c("var(--fds-typography-link-default-font-size, 16px)"),Xi=c("var(--fds-typography-link-default-letter-spacing, 0px)"),ta=c("var(--fds-typography-link-default-line-height, 150%)"),ea=c("var(--fds-typography-link-default-font-weight, 400)"),ia=c("var(--fds-typography-link-default-text-decoration, underline)"),aa=c("var(--fds-typography-link-default-display, inline-block)"),oa=c("var(--fds-typography-ui-helper-font-family, 'Public Sans', 'PublicSans-Regular')"),sa=c("var(--fds-typography-ui-helper-font-size, 15px)"),na=c("var(--fds-typography-ui-helper-letter-spacing, 0px)"),ra=c("var(--fds-typography-ui-helper-line-height, 100%)"),la=c("var(--fds-typography-ui-helper-font-weight, 400)"),da=c("var(--fds-typography-ui-helper-display, inline-block)"),ha=c("var(--fds-typography-ui-id-font-family, 'Roboto Mono')"),pa=c("var(--fds-typography-ui-id-font-size, 13px)"),ca=c("var(--fds-typography-ui-id-letter-spacing, 0px)"),ya=c("var(--fds-typography-ui-id-line-height, 100%)"),ma=c("var(--fds-typography-ui-id-font-weight, 700)"),ga=c("var(--fds-typography-ui-id-display, inline-block)"),ua=c("var(--fds-typography-ui-label-font-family, 'Public Sans', 'PublicSans-Medium')"),fa=c("var(--fds-typography-ui-label-font-size, 16px)"),ba=c("var(--fds-typography-ui-label-letter-spacing, 0px)"),va=c("var(--fds-typography-ui-label-line-height, 22px)"),wa=c("var(--fds-typography-ui-label-font-weight, 500)"),$a=c("var(--fds-typography-ui-label-display, inline-block)"),_a=c("var(--fds-typography-ui-placeholder-font-family, 'Public Sans', 'PublicSans-Medium')"),ka=c("var(--fds-typography-ui-placeholder-font-size, 16px)"),xa=c("var(--fds-typography-ui-placeholder-letter-spacing, 0px)"),Sa=c("var(--fds-typography-ui-placeholder-line-height, 100%)"),Ma=c("var(--fds-typography-ui-placeholder-font-weight, 500)"),Aa=c("var(--fds-typography-ui-placeholder-display, inline-block)"),Ea=c("var(--fds-typography-ui-tag-font-family, 'Public Sans', 'PublicSans-Bold')"),Ta=c("var(--fds-typography-ui-tag-font-size, 16px)"),ja=c("var(--fds-typography-ui-tag-letter-spacing, 0px)"),Ca=c("var(--fds-typography-ui-tag-line-height, 100%)"),Pa=c("var(--fds-typography-ui-tag-font-weight, 700)"),za=c("var(--fds-typography-ui-tag-display, inline-block)"),La=c("var(--fds-color-brand-black, #000000)"),Oa=c("var(--fds-color-brand-white, #ffffff)"),Na=c("var(--fds-color-danger-200, #e55636)"),Ra=c("var(--fds-color-interactive-100, #90cefe)"),Da=c("var(--fds-color-interactive-200, #1777f8)"),Ia=c("var(--fds-color-neutral-50, #F6F6F6)"),Va=c("var(--fds-color-neutral-100, #cdcdd7)"),Ua=c("var(--fds-color-neutral-200, #9696aa)"),Ba=c("var(--fds-color-text-300, #9696aa)"),Ha=c("var(--fds-color-text-1000, #000000)");y`
  .body-default-text {
    display: ${kt};
    font-family: ${bt};
    font-size: ${vt};
    font-weight: ${_t};
    letter-spacing: ${wt};
    line-height: ${$t};
  }
`,y`
  .body-large-text {
    display: ${Tt};
    font-family: ${xt};
    font-size: ${St};
    font-weight: ${Et};
    letter-spacing: ${Mt};
    line-height: ${At};
  }
`,y`
  .body-micro-text {
    display: ${Ot};
    font-family: ${jt};
    font-size: ${Ct};
    font-weight: ${Lt};
    letter-spacing: ${Pt};
    line-height: ${zt};
  }
`,y`
  .body-small-text {
    display: ${Ut};
    font-family: ${Nt};
    font-size: ${Rt};
    font-weight: ${Vt};
    letter-spacing: ${Dt};
    line-height: ${It};
  }
`,y`
  .emphasis-default-text {
    display: ${qt};
    font-family: ${Bt};
    font-size: ${Ht};
    font-weight: ${Yt};
    letter-spacing: ${Ft};
    line-height: ${Kt};
  }
`,y`
  .emphasis-large-text {
    display: ${Xt};
    font-family: ${Wt};
    font-size: ${Zt};
    font-weight: ${Gt};
    letter-spacing: ${Qt};
    line-height: ${Jt};
  }
`,y`
  .emphasis-micro-text {
    display: ${se};
    font-family: ${te};
    font-size: ${ee};
    font-weight: ${oe};
    letter-spacing: ${ie};
    line-height: ${ae};
  }
`,y`
  .emphasis-small-text {
    display: ${pe};
    font-family: ${ne};
    font-size: ${re};
    font-weight: ${he};
    letter-spacing: ${le};
    line-height: ${de};
  }
`,y`
  .heading-large-1-text {
    display: ${Ue};
    font-family: ${Ne};
    font-size: ${Re};
    font-weight: ${Ve};
    letter-spacing: ${De};
    line-height: ${Ie};
  }
`,y`
  .heading-large-2-text {
    display: ${qe};
    font-family: ${Be};
    font-size: ${He};
    font-weight: ${Ye};
    letter-spacing: ${Fe};
    line-height: ${Ke};
  }
`,y`
  .heading-large-3-text {
    display: ${fe};
    font-family: ${ce};
    font-size: ${ye};
    font-weight: ${ue};
    letter-spacing: ${me};
    line-height: ${ge};
  }
`,y`
  .heading-large-4-text {
    display: ${ke};
    font-family: ${be};
    font-size: ${ve};
    font-weight: ${_e};
    letter-spacing: ${we};
    line-height: ${$e};
  }
`,y`
  .heading-large-5-text {
    display: ${Te};
    font-family: ${xe};
    font-size: ${Se};
    font-weight: ${Ee};
    letter-spacing: ${Me};
    line-height: ${Ae};
  }
`,y`
  .heading-large-6-text {
    display: ${Oe};
    font-family: ${je};
    font-size: ${Ce};
    font-weight: ${Le};
    letter-spacing: ${Pe};
    line-height: ${ze};
  }
`,y`
  .heading-small-1-text {
    display: ${Xe};
    font-family: ${We};
    font-size: ${Ze};
    font-weight: ${Ge};
    letter-spacing: ${Qe};
    line-height: ${Je};
  }
`,y`
  .heading-small-2-text {
    display: ${si};
    font-family: ${ti};
    font-size: ${ei};
    font-weight: ${oi};
    letter-spacing: ${ii};
    line-height: ${ai};
  }
`,y`
  .heading-small-3-text {
    display: ${pi};
    font-family: ${ni};
    font-size: ${ri};
    font-weight: ${hi};
    letter-spacing: ${li};
    line-height: ${di};
  }
`,y`
  .heading-small-4-text {
    display: ${fi};
    font-family: ${ci};
    font-size: ${yi};
    font-weight: ${ui};
    letter-spacing: ${mi};
    line-height: ${gi};
  }
`,y`
  .heading-small-5-text {
    display: ${ki};
    font-family: ${bi};
    font-size: ${vi};
    font-weight: ${_i};
    letter-spacing: ${wi};
    line-height: ${$i};
  }
`,y`
  .heading-small-6-text {
    display: ${Ti};
    font-family: ${xi};
    font-size: ${Si};
    font-weight: ${Ei};
    letter-spacing: ${Mi};
    line-height: ${Ai};
  }
`,y`
  .link-default-text {
    display: ${aa};
    font-family: ${Ji};
    font-size: ${Gi};
    font-weight: ${ea};
    letter-spacing: ${Xi};
    line-height: ${ta};
    text-decoration: ${ia};
  }
`,y`
  .link-large-text {
    display: ${Ni};
    font-family: ${ji};
    font-size: ${Ci};
    font-weight: ${Li};
    letter-spacing: ${Pi};
    line-height: ${zi};
    text-decoration: ${Oi};
  }
`,y`
  .link-micro-text {
    display: ${Hi};
    font-family: ${Ri};
    font-size: ${Di};
    font-weight: ${Ui};
    letter-spacing: ${Ii};
    line-height: ${Vi};
    text-decoration: ${Bi};
  }
`,y`
  .link-small-text {
    display: ${Qi};
    font-family: ${Fi};
    font-size: ${Ki};
    font-weight: ${Wi};
    letter-spacing: ${Yi};
    line-height: ${qi};
    text-decoration: ${Zi};
  }
`,y`
  .ui-helper-text {
    display: ${da};
    font-family: ${oa};
    font-size: ${sa};
    font-weight: ${la};
    letter-spacing: ${na};
    line-height: ${ra};
  }
`,y`
  .ui-id-text {
    display: ${ga};
    font-family: ${ha};
    font-size: ${pa};
    font-weight: ${ma};
    letter-spacing: ${ca};
    line-height: ${ya};
  }
`;const Fa=y`
  .ui-label-text {
    display: ${$a};
    font-family: ${ua};
    font-size: ${fa};
    font-weight: ${wa};
    letter-spacing: ${ba};
    line-height: ${va};
  }
`;y`
  .ui-placeholder-text {
    display: ${Aa};
    font-family: ${_a};
    font-size: ${ka};
    font-weight: ${Ma};
    letter-spacing: ${xa};
    line-height: ${Sa};
  }
`,y`
  .ui-tag-text {
    display: ${za};
    font-family: ${Ea};
    font-size: ${Ta};
    font-weight: ${Pa};
    letter-spacing: ${ja};
    line-height: ${Ca};
  }
`
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */;const Ka=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function Ya(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):Ka(t,e)
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
var qa;null===(qa=globalThis.HTMLSlotElement)||void 0===qa||qa.prototype.assignedElements;
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const Wa=1;let Za=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const Qa="important",Ja=" !"+Qa,Ga=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends Za{constructor(t){var e;if(super(t),t.type!==Wa||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,i)=>{const a=t[i];return null==a?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${a};`}),"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ht){this.ht=new Set;for(const t in e)this.ht.add(t);return this.render(e)}this.ht.forEach((t=>{null==e[t]&&(this.ht.delete(t),t.includes("-")?i.removeProperty(t):i[t]="")}));for(const t in e){const a=e[t];if(null!=a){this.ht.add(t);const e="string"==typeof a&&a.endsWith(Ja);t.includes("-")||e?i.setProperty(t,e?a.slice(0,-11):a,e?Qa:""):i[t]=a}}return Z}});var Xa,to,eo=function(t,e,i,a){var o,s=arguments.length,n=s<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,a);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};!function(t){t.primary="primary",t.secondary="secondary"}(Xa||(Xa={})),function(t){t.left="left",t.right="right"}(to||(to={}));class io extends mt{constructor(){super(...arguments),this.variant=Xa.primary,this.items=[],this.verticalMenuNavText="",this.verticalMenuThreshold=768,this._open=!1}connectedCallback(){super.connectedCallback(),m(this.shadowRoot,[io.cssVariables,Fa,io.collapsedNavigationStyles,this.desktopStyles()])}render(){const t=this.items.filter((t=>t.position===to.right)),e=this.items.filter((t=>t.position!==to.right));return W` <div class="navigation-wrapper">
      <div class="navigation navigation--${this.variant} ui-label-text">
        ${this.variant===Xa.primary?W` <div class="navigation__header">
              <slot></slot>
            </div>`:Q}
        <ul class="navigation__body ${this._open?"navigation__open":""}">
          ${e.map((t=>this.renderItem(t))).concat(t.map(((t,e)=>this.renderItem(t,0===e?"item__first-right":""))))}
        </ul>
        <div class="navigation__button-wrapper">${this.renderNavigationButton()}</div>
      </div>
    </div>`}renderNavigationButton(){let t;switch(this.variant){case Xa.primary:t=this._open?W`<fds-icon icon="chevron-up"></fds-icon>`:W`<fds-icon icon="chevron-down"></fds-icon>`;break;case Xa.secondary:t=W`<fds-icon icon="menu"></fds-icon>`}return W`
      <button
        class="navigation__button navigation__button--${this.variant}"
        type="button"
        @click=${this.handleNavigationClick}
      >
        <span class="navigation__label ui-label-text">${this.verticalMenuNavText}</span>
        ${t}
      </button>
    `}handleNavigationClick(){this._open=!this._open}renderItem(t,e=""){var i;const a=null!==(i=t.verticalMenuOrder)&&void 0!==i?i:0;return W` <li
      @click=${()=>this.handleSelect(t)}
      class="item ${this.selected===t?"item--active":""} ${e}"
      style=${Ga({order:a})}
    >
      <div class="item__label">
        ${t.icon&&W`<fds-icon class="item__icon" .icon="${t.icon}"></fds-icon>`}
        <span>${t.label}</span>
      </div>
    </li>`}handleSelect(t){this.selected=t,this.dispatchEvent(new CustomEvent("select",{detail:t}))}desktopStyles(){return y`
      @container navigation-wrapper (min-width: ${c(this.verticalMenuThreshold)}px) {
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
          border-bottom: var(--element-vertical-padding--primary) solid ${Oa};
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
    `}}io.cssVariables=y`
    :host {
      --element-vertical-padding--primary: 9px;
      --element-vertical-padding--secondary: 16px;
      --element-horizontal-padding--primary: 20px;
      --item-border-bottom-width--secondary: 3px;
    }
  `,io.collapsedNavigationStyles=y`
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
      background-color: ${La};
      color: ${Oa};
    }

    .navigation--primary .item:hover {
      color: ${Ba};
    }

    .navigation--primary .navigation__open .item--active .item__label:after {
      content: '';
      position: relative;
      align-self: center;
      height: 0;
      margin-left: auto;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-right: var(--element-vertical-padding--primary) solid ${Oa};
    }

    .navigation--secondary {
      background-color: ${Oa};
      border-bottom: 1px solid ${La};
    }

    .navigation--secondary .item {
      border-bottom: 1px solid ${Va};
    }

    .navigation--secondary .item:hover {
      color: ${Ba};
    }

    .navigation__open {
      height: auto;
      width: 100%;
      visibility: visible;
      opacity: 1;
      overflow-y: visible;
      margin-left: 0;
      margin-top: 0;

      border-top: 1px solid ${Va};
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
      background-color: ${La};
      color: ${Oa};
      padding: var(--element-vertical-padding--primary);
    }

    .navigation__button--primary:hover {
      color: ${Ba};
    }

    .navigation__button--secondary {
      background-color: ${Oa};
      color: ${La};
      padding: var(--element-vertical-padding--secondary);
    }

    .navigation__button--secondary:hover {
      color: ${Ba};
    }

    .navigation__label {
      margin-right: 10px;
    }
  `,io.styles=[io.cssVariables,Fa,io.collapsedNavigationStyles],eo([Ya()],io.prototype,"variant",void 0),eo([Ya()],io.prototype,"items",void 0),eo([Ya()],io.prototype,"selected",void 0),eo([Ya({attribute:"vertical-menu-nav-text"})],io.prototype,"verticalMenuNavText",void 0),eo([Ya({type:Number,attribute:"vertical-menu-threshold"})],io.prototype,"verticalMenuThreshold",void 0),eo([function(t){return Ya({...t,state:!0})}()],io.prototype,"_open",void 0);
/**
     * @license lucide v0.473.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */
const ao=(t,e,i=[])=>{const a=document.createElementNS("http://www.w3.org/2000/svg",t);return Object.keys(e).forEach((t=>{a.setAttribute(t,String(e[t]))})),i.length&&i.forEach((t=>{const e=ao(...t);a.appendChild(e)})),a};
/**
     * @license lucide v0.473.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */
const oo={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};
/**
     * @license lucide v0.473.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */var so=function(t,e,i,a){var o,s=arguments.length,n=s<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,a);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};const no={"alert-circle":["svg",oo,[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]]],"alert-triangle":["svg",oo,[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]]],"chevron-down":["svg",oo,[["path",{d:"m6 9 6 6 6-6"}]]],"chevron-right":["svg",oo,[["path",{d:"m9 18 6-6-6-6"}]]],"chevron-up":["svg",oo,[["path",{d:"m18 15-6-6-6 6"}]]],menu:["svg",oo,[["line",{x1:"4",x2:"20",y1:"12",y2:"12"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18"}]]],pencil:["svg",oo,[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]]],plus:["svg",oo,[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]]],"plus-circle":["svg",oo,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M8 12h8"}],["path",{d:"M12 8v8"}]]],"trash-2":["svg",oo,[["path",{d:"M3 6h18"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17"}]]],x:["svg",oo,[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]]],settings:["svg",oo,[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"}],["circle",{cx:"12",cy:"12",r:"3"}]]],"check-circle":["svg",oo,[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335"}],["path",{d:"m9 11 3 3L22 4"}]]],"chevrons-left-right-ellipsis":["svg",oo,[["path",{d:"m18 8 4 4-4 4"}],["path",{d:"m6 8-4 4 4 4"}],["path",{d:"M8 12h.01"}],["path",{d:"M12 12h.01"}],["path",{d:"M16 12h.01"}]]],"message-circle":["svg",oo,[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z"}]]]};class ro extends mt{constructor(){super(...arguments),this.size=t}render(){if(!this.icon||!no[this.icon])return console.error(`invalid icon: '${this.icon}'`),null;const t=(([t,e,i])=>ao(t,e,i))(no[this.icon]);return t.setAttribute("width",this.size.value),t.setAttribute("height",this.size.value),t}}ro.styles=y`
    :host {
      display: inline-flex;
    }
  `,so([Ya()],ro.prototype,"size",void 0),so([Ya()],ro.prototype,"icon",void 0),customElements.define("fds-icon",ro),customElements.define("fds-navigation",io);const lo={initialize:function(){const t={label:"Digitraffic",value:"digitraffic",url:"https://www.digitraffic.fi/"},e=[{label:"Liikennetilanne",value:"liikennetilanne",url:"https://liikennetilanne.fintraffic.fi/"},{label:"Palauteväylä",value:"palautevayla",url:"https://www.palautevayla.fi/aspa?lang=fi"},{label:"Junalähdöt",value:"junalahdot",url:"https://junalahdot.fintraffic.fi/"},{label:"Drone-palvelut",value:"dronepalvelut",url:"https://skynavx.fi/#/drone"},t,{label:"Digitransit",value:"digitransit",url:"https://digitransit.fi/"},{label:"Reittiopas",value:"reittiopas",url:"https://opas.matka.fi/"},{label:"NAP",value:"nap",url:"https://finap.fi/#/"}];customElements.whenDefined("fds-navigation").then((()=>{const i=document.createElement("fds-navigation");i.setAttribute("vertical-menu-threshold","1225"),i.innerHTML='\n      <a href="https://www.fintraffic.fi/fi">\n              <svg viewBox="0 0 253 42" style="height: 18px">\n                  <use href="/assets/fintraffic_horizontal_white.svg#fintraffic_horizontal_white"></use>\n              </svg>\n          </a>';i.variant=Xa.primary,i.items=e,i.selected=t,i.verticalMenuNavText="Services",i.addEventListener("select",(e=>{const i=e.detail;window.open(i.url,"_blank"),e.target instanceof io&&(e.target.selected=t)})),this.el.replaceWith(i)}))}};function ho(){$.proxyAll(this,/^_/)}ckan.module("digitraffic_theme_top_navigation",lo);const po=()=>({initialize(){ho.apply(this),this._getMenuController().on("click",this._onMenuControllerClick),this._getMenuController().on("keydown",this._onMenuControllerKeyDown),this._getMenu().on("keydown",this._onMenuKeyDown)},_onMenuControllerClick(t){this._getMenuController().has(t.target)&&this._toggleList()},_onMenuControllerKeyDown(t){if(this._getMenuController().has(t.target)){const{key:e}=t;switch(e){case" ":case"Enter":t.preventDefault(),this._toggleList();break;case"ArrowDown":t.preventDefault(),this._focus("first")}}},_onMenuKeyDown(t){if(this._getMenuController().is(":visible")&&this._getMenu().has(t.target)){const{key:e}=t;switch(e){case"Escape":t.preventDefault(),this._closeList(),this._focus("menuController");break;case"ArrowDown":$(t.target).is("select")||(t.preventDefault(),this._focus("next"));break;case"ArrowUp":$(t.target).is("select")||(t.preventDefault(),this._focus("previous"))}}},_expandedClass:"expanded",_focus(t){let e;const i=this.el.find(":focus"),a=!!this._getMenu().has(i),o=a&&this._getMenu().find("a:last")[0]===i[0],s=a&&this._getMenu().find("a:first")[0]===i[0];switch(t){case"first":e=this._getMenu().find("a:first");break;case"menuController":e=this._getMenuController();break;case"next":if(a){if(o)return;{const t=this._getMenu().find("a");e=t.filter((e=>e>0&&t[e-1]===i[0]))}}else e=this._getMenu().find("a:first");break;case"previous":if(a){if(s)return;{const t=this._getMenu().find("a");e=t.filter((e=>e<t.length-1&&t[e+1]===i[0]))}}else e=this._getMenu().find("a:first")}e.trigger("focus")},_toggleList(){this._isMenuOpen()?(this._closeList(),this._focus("menuController")):(this._openList(),this._focus("first"))},_isMenuOpen(){return this._getMenu().hasClass(this._expandedClass)},_closeList(){const t=this._getMenuController();this._getMenu().removeClass(this._expandedClass),t.attr("aria-expanded","false")},_openList(){const t=this._getMenuController();this._getMenu().addClass(this._expandedClass),t.attr("aria-expanded","true")},_getMenuController(){throw Error("No controller")},_getMenu(){throw Error("No menu")}}),co={...po(),_getMenuController:()=>$("#app-nav-hamburger-button"),_getMenu:()=>$("#nav-interactions-wrapper")};ckan.module("digitraffic_theme_app_navigation",co);const yo={...po(),_getMenuController:()=>$("#user-action-select"),_getMenu:()=>$("#user-action-list")};ckan.module("digitraffic_theme_user_actions",yo);const mo={"https://w3id.org/mobilitydcat-ap/mobility-theme/air-and-space-travel":[],"https://w3id.org/mobilitydcat-ap/mobility-theme/cycle-network-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/network-closures-diversions","https://w3id.org/mobilitydcat-ap/mobility-theme/network-detailed-attributes","https://w3id.org/mobilitydcat-ap/mobility-theme/network-geometry-and-lane-character"],"https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-traffic-signs-and-regulations":["https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-closures-and-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/direction-of-travel-on-reversible-lanes","https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-overtaking-bans-on-heavy-goods-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-speed-limits","https://w3id.org/mobilitydcat-ap/mobility-theme/lane-closures-and-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/other-access-restrictions-and-traffic-regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/other-temporary-traffic-management-measures-or-plans","https://w3id.org/mobilitydcat-ap/mobility-theme/road-closures-and-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-closures-and-access-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/filling-and-charging-stations":["https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-charging-points-for-electric-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-filling-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-charging-points","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-filling-stations"],"https://w3id.org/mobilitydcat-ap/mobility-theme/freight-and-logistics":["https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-delivery-areas","https://w3id.org/mobilitydcat-ap/mobility-theme/freight-delivery-regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-delivery-areas"],"https://w3id.org/mobilitydcat-ap/mobility-theme/general-information-for-trip-planning-":["https://w3id.org/mobilitydcat-ap/mobility-theme/address-identifiers","https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-costs","https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-environmental-factors","https://w3id.org/mobilitydcat-ap/mobility-theme/points-of-interest","https://w3id.org/mobilitydcat-ap/mobility-theme/topographic-places"],"https://w3id.org/mobilitydcat-ap/mobility-theme/other":[],"https://w3id.org/mobilitydcat-ap/mobility-theme/parking-service-and-rest-area-information":["https://w3id.org/mobilitydcat-ap/mobility-theme/bike-parking-locations","https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-locations-and-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/park-and-ride-stops","https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-locations-and-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-locations-and-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-accessibility-facilities","https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-geometry"],"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-non-scheduled-transport":["https://w3id.org/mobilitydcat-ap/mobility-theme/accesibility-information-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/fares","https://w3id.org/mobilitydcat-ap/mobility-theme/locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/provider-data","https://w3id.org/mobilitydcat-ap/mobility-theme/reservation-and-purchase-options","https://w3id.org/mobilitydcat-ap/mobility-theme/service-areas-and-service-times"],"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-scheduled-transport":["https://w3id.org/mobilitydcat-ap/mobility-theme/basic-commercial-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/basic-common-standard-fares","https://w3id.org/mobilitydcat-ap/mobility-theme/common-fare-products","https://w3id.org/mobilitydcat-ap/mobility-theme/connection-links","https://w3id.org/mobilitydcat-ap/mobility-theme/disruptions-delays-cancellations","https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/hours-of-operation","https://w3id.org/mobilitydcat-ap/mobility-theme/network-topology-and-routes-lines","https://w3id.org/mobilitydcat-ap/mobility-theme/operational-calendar","https://w3id.org/mobilitydcat-ap/mobility-theme/passenger-classes","https://w3id.org/mobilitydcat-ap/mobility-theme/planned-interchanges-between-scheduled-services","https://w3id.org/mobilitydcat-ap/mobility-theme/purchase-information","https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-estimated-departure-and-arrival-times","https://w3id.org/mobilitydcat-ap/mobility-theme/special-fare-products","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-accessibility-and-paths-within-facility","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-geometry-and-map-layout","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-location-and-features","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-status-of-features","https://w3id.org/mobilitydcat-ap/mobility-theme/timetables-static","https://w3id.org/mobilitydcat-ap/mobility-theme/transport-operators","https://w3id.org/mobilitydcat-ap/mobility-theme/vehicle-details"],"https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-traffic-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/current-travel-times","https://w3id.org/mobilitydcat-ap/mobility-theme/expected-delays","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-length-of-queues","https://w3id.org/mobilitydcat-ap/mobility-theme/predicted-travel-times","https://w3id.org/mobilitydcat-ap/mobility-theme/speed","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-data-at-border-crossings-to-third-countries","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-volume","https://w3id.org/mobilitydcat-ap/mobility-theme/waiting-time-at-border-crossings-to-non-eu-member-states"],"https://w3id.org/mobilitydcat-ap/mobility-theme/road-events-and-conditions":["https://w3id.org/mobilitydcat-ap/mobility-theme/accidents-and-incidents","https://w3id.org/mobilitydcat-ap/mobility-theme/poor-road-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/road-weather-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/road-work-information":["https://w3id.org/mobilitydcat-ap/mobility-theme/long-term-road-works","https://w3id.org/mobilitydcat-ap/mobility-theme/short-term-road-works"],"https://w3id.org/mobilitydcat-ap/mobility-theme/sharing-and-hiring-services":["https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods"],"https://w3id.org/mobilitydcat-ap/mobility-theme/static-road-network-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/geometry","https://w3id.org/mobilitydcat-ap/mobility-theme/gradients","https://w3id.org/mobilitydcat-ap/mobility-theme/junctions","https://w3id.org/mobilitydcat-ap/mobility-theme/number-of-lanes","https://w3id.org/mobilitydcat-ap/mobility-theme/road-classification","https://w3id.org/mobilitydcat-ap/mobility-theme/road-width"],"https://w3id.org/mobilitydcat-ap/mobility-theme/static-traffic-signs-and-regulations":["https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/other-static-traffic-signs","https://w3id.org/mobilitydcat-ap/mobility-theme/other-traffic-regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/permanent-access-restrictions","https://w3id.org/mobilitydcat-ap/mobility-theme/speed-limits","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-circulation-plans","https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-access-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/toll-information":["https://w3id.org/mobilitydcat-ap/mobility-theme/applicable-road-user-charges-and-payment-methods","https://w3id.org/mobilitydcat-ap/mobility-theme/identification-of-tolled-roads","https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-tolling-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods-for-tolls"],"https://w3id.org/mobilitydcat-ap/mobility-theme/waterways-and-water-bodies":[]},go=new Set(Object.keys(mo)),uo=new Set(Object.values(mo).flat()),fo={"https://w3id.org/mobilitydcat-ap/mobility-theme/accesibility-information-for-vehicles":{en:"Accesibility information for vehicles",fi:"Ajoneuvojen esteettömyystiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/accidents-and-incidents":{en:"Accidents and incidents",fi:"Liikenneonnettomuudet ja -häiriöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/address-identifiers":{en:"Address identifiers",fi:"Osoitetunnisteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/air-and-space-travel":{en:"Air and space travel",fi:"Ilma- ja avaruusmatkailu"},"https://w3id.org/mobilitydcat-ap/mobility-theme/applicable-road-user-charges-and-payment-methods":{en:"Applicable road user charges and payment methods",fi:"Sovellettavat tienkäyttömaksut ja maksutavat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-charging-points-for-electric-vehicles":{en:"Availability of charging points for electric vehicles",fi:"Sähköajoneuvojen latauspisteiden saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-delivery-areas":{en:"Availability of delivery areas",fi:"Lastaus- ja purkauspaikkojen saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-filling-stations":{en:"Availability of filling stations",fi:"Tankkausasemien saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/basic-commercial-conditions":{en:"Basic commercial conditions",fi:"Kaupalliset perusehdot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/basic-common-standard-fares":{en:"Basic common standard fares",fi:"Yleiset perusmaksut"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-availability":{en:"Bike-hiring Availability",fi:"Vuokrapyörien saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-stations":{en:"Bike-hiring Stations",fi:"Pyöränvuokrausasemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-parking-locations":{en:"Bike-parking locations",fi:"Polkupyöräparkit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-availability":{en:"Bike sharing Availability",fi:"Kaupunkipyörien saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-locations-and-stations":{en:"Bike-sharing Locations and stations",fi:"Kaupunkipyörien sijainnit ja asemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-access-conditions":{en:"Bridge access conditions",fi:"Siltojen käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-closures-and-access-conditions":{en:"Bridge closures and access conditions",fi:"Siltojen sulkemiset ja käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-availability":{en:"Car-hiring Availability",fi:"Autonvuokrauksen saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-stations":{en:"Car-hiring Stations",fi:"Autonvuokrausasemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-availability":{en:"Car parking availability",fi:"Autojen pysäköinnin saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-locations-and-conditions":{en:"Car parking locations and conditions",fi:"Autojen pysäköintipaikat ja -olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-availability":{en:"Car-sharing Availability",fi:"Yhteiskäyttöautojen saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-locations-and-stations":{en:"Car-sharing Locations and stations",fi:"Yhteiskäyttöautojen sijainnit ja asemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/common-fare-products":{en:"Common fare products",fi:"Yleiset lipputuotteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/connection-links":{en:"Connection links",fi:"Vaihtoyhteydet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/current-travel-times":{en:"Current travel times",fi:"Ajankohtaiset matka-ajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/cycle-network-data":{en:"Cycle network data",fi:"Pyöräilyverkon tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/direction-of-travel-on-reversible-lanes":{en:"Direction of travel on reversible lanes",fi:"Vaihtuvasuuntaisten kaistojen ajosuunta"},"https://w3id.org/mobilitydcat-ap/mobility-theme/disruptions-delays-cancellations":{en:"Disruptions, delays, cancellations",fi:"Häiriöt, viivästykset, peruutukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-overtaking-bans-on-heavy-goods-vehicles":{en:"Dynamic overtaking bans on heavy goods vehicles",fi:"Dynaamiset raskaiden ajoneuvojen ohituskiellot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-speed-limits":{en:"Dynamic speed limits",fi:"Dynaamiset nopeusrajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-traffic-signs-and-regulations":{en:"Dynamic traffic signs and regulations",fi:"Dynaamiset liikennemerkit ja -säännöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-availability":{en:"E-scooter-sharing Availability",fi:"Yhteiskäyttöisten sähköpotkulautojen saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-locations-and-stations":{en:"E-scooter-sharing Locations and stations",fi:"Yhteiskäyttöisten sähköpotkulautojen sijainnit ja asemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles":{en:"Environmental standards for vehicles",fi:"Ajoneuvojen ympäristöstandardit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/expected-delays":{en:"Expected delays",fi:"Tiedossa olevat viivästykset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/fares":{en:"Fares",fi:"Maksut ja tariffit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/filling-and-charging-stations":{en:"Filling and charging stations",fi:"Tankkaus- ja latausasemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/freight-and-logistics":{en:"Freight and logistics",fi:"Rahti ja logistiikka"},"https://w3id.org/mobilitydcat-ap/mobility-theme/freight-delivery-regulations":{en:"Freight delivery regulations",fi:"Rahdinkuljetusmääräykset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/general-information-for-trip-planning-":{en:"General information for trip-planning",fi:"Yleistä tietoa reittisuunnitteluun"},"https://w3id.org/mobilitydcat-ap/mobility-theme/geometry":{en:"Geometry",fi:"Geometria"},"https://w3id.org/mobilitydcat-ap/mobility-theme/gradients":{en:"Gradients",fi:"Kaltevuudet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/hours-of-operation":{en:"Hours of operation",fi:"Käyttöajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/identification-of-tolled-roads":{en:"Identification of tolled roads",fi:"Tietullin alaisten teiden yksilöiminen"},"https://w3id.org/mobilitydcat-ap/mobility-theme/junctions":{en:"Junctions",fi:"Liittymät"},"https://w3id.org/mobilitydcat-ap/mobility-theme/lane-closures-and-access-conditions":{en:"Lane closures and access conditions",fi:"Kaistojen sulkemiset ja käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-charging-points":{en:"Location and conditions of charging points",fi:"Latauspisteiden sijainnit ja olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-filling-stations":{en:"Location and conditions of filling stations",fi:"Tankkausasemien sijainnit ja olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-length-of-queues":{en:"Location and length of queues",fi:"Jonojen sijainti ja pituus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-delivery-areas":{en:"Location of delivery areas",fi:"Lastaus- ja purkausalueiden sijainti"},"https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-tolling-stations":{en:"Location of tolling stations",fi:"Tietulliasemien sijainti"},"https://w3id.org/mobilitydcat-ap/mobility-theme/locations-and-stations":{en:"Locations and stations",fi:"Sijainnit ja asemat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/long-term-road-works":{en:"Long-term road works",fi:"Pitkäaikaiset tietyöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/network-closures-diversions":{en:"Network closures/diversions",fi:"Verkon suljetut osat ja/tai kiertotiet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/network-detailed-attributes":{en:"Network detailed attributes",fi:"Verkon yksityiskohtaiset tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/network-geometry-and-lane-character":{en:"Network geometry and lane character",fi:"Verkkogeometria ja kaistojen luonne"},"https://w3id.org/mobilitydcat-ap/mobility-theme/network-topology-and-routes-lines":{en:"Network topology and routes/lines",fi:"Verkkotopologia ja reitit/linjat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/number-of-lanes":{en:"Number of lanes",fi:"Kaistojen määrä"},"https://w3id.org/mobilitydcat-ap/mobility-theme/operational-calendar":{en:"Operational Calendar",fi:"Operatiivinen kalenteri"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other":{en:"Other",fi:"Muu"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other-access-restrictions-and-traffic-regulations":{en:"Other access restrictions and traffic regulations",fi:"Muut käyttörajoitukset ja liikennesäännöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other-static-traffic-signs":{en:"Other static traffic signs",fi:"Muut staattiset liikennemerkit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other-temporary-traffic-management-measures-or-plans":{en:"Other temporary traffic management measures or plans",fi:"Muut tilapäiset liikenteenhallintatoimenpiteet tai -suunnitelmat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/other-traffic-regulations":{en:"Other traffic regulations",fi:"Muut liikennesäännöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-costs":{en:"Parameters needed to calculate costs",fi:"Kustannusten laskemiseen tarvittavat parametrit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-environmental-factors":{en:"Parameters needed to calculate environmental factors",fi:"Ympäristötekijöiden laskemiseen tarvittavat parametrit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/park-and-ride-stops":{en:"Park and Ride stops",fi:"Julkisen liikenteen liityntäpysäköinti"},"https://w3id.org/mobilitydcat-ap/mobility-theme/parking-service-and-rest-area-information":{en:"Parking, service and rest area information",fi:"Pysäköinti-, palvelu- ja levähdysalueiden tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/passenger-classes":{en:"Passenger classes",fi:"Matkustajaluokat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods":{en:"Payment methods",fi:"Maksutavat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods-for-tolls":{en:"Payment methods for tolls",fi:"Tietullien maksutavat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-accessibility-facilities":{en:"Pedestrian accessibility facilities",fi:"Jalankulkijoiden esteettömyyttä tukevat välineet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-data":{en:"Pedestrian network data",fi:"Jalankulkuverkon tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-geometry":{en:"Pedestrian network geometry",fi:"Jalankulkuverkon geometria"},"https://w3id.org/mobilitydcat-ap/mobility-theme/permanent-access-restrictions":{en:"Permanent access restrictions",fi:"Pysyvät käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/planned-interchanges-between-scheduled-services":{en:"Planned interchanges between scheduled services",fi:"Suunnitellut vaihdot säännöllisten palvelujen välillä"},"https://w3id.org/mobilitydcat-ap/mobility-theme/points-of-interest":{en:"Points of interest",fi:"Kohdepisteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/poor-road-conditions":{en:"Poor road conditions",fi:"Huonokuntoiset tiet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/predicted-travel-times":{en:"Predicted travel times",fi:"Ennustetut matka-ajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/provider-data":{en:"Provider data",fi:"Palveluntarjoajan tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-non-scheduled-transport":{en:"Public transport non-scheduled transport",fi:"Joukkoliikenne, aikatauluttamaton"},"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-scheduled-transport":{en:"Public transport scheduled transport",fi:"Joukkoliikenne, säännöllinen"},"https://w3id.org/mobilitydcat-ap/mobility-theme/purchase-information":{en:"Purchase information",fi:"Ostotiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-estimated-departure-and-arrival-times":{en:"Real-time estimated departure and arrival times",fi:"Reaaliaikaiset arvioidut lähtö- ja saapumisajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-traffic-data":{en:"Real-time traffic data",fi:"Reaaliaikaiset liikennetiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/reservation-and-purchase-options":{en:"Reservation and purchase options",fi:"Varaus- ja ostovaihtoehdot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-classification":{en:"Road classification",fi:"Tien luokitus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-closures-and-access-conditions":{en:"Road closures and access conditions",fi:"Teiden sulkemiset ja käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-events-and-conditions":{en:"Road events and conditions",fi:"Tieolosuhteet ja tapahtumat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-weather-conditions":{en:"Road weather conditions",fi:"Tieolosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-width":{en:"Road width",fi:"Teiden leveys"},"https://w3id.org/mobilitydcat-ap/mobility-theme/road-work-information":{en:"Road work information",fi:"Tietyötiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-availability":{en:"Service and rest area availability",fi:"Palvelu- ja levähdysalueiden saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-locations-and-conditions":{en:"Service and rest area locations and conditions",fi:"Palvelu- ja levähdysalueiden sijainnit ja olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/service-areas-and-service-times":{en:"Service areas and service times",fi:"Palvelualueet ja palveluajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/sharing-and-hiring-services":{en:"Sharing and Hiring Services",fi:"Vuokraus- ja yhteiskäyttöpalvelut"},"https://w3id.org/mobilitydcat-ap/mobility-theme/short-term-road-works":{en:"Short-term road works",fi:"Lyhytaikaiset tietyöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/special-fare-products":{en:"Special Fare Products",fi:"Erikoismaksutuotteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/speed":{en:"Speed",fi:"Nopeus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/speed-limits":{en:"Speed limits",fi:"Nopeusrajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/static-road-network-data":{en:"Static road network data",fi:"Staattiset tieverkon tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/static-traffic-signs-and-regulations":{en:"Static traffic signs and regulations",fi:"Staattiset liikennemerkit ja -säännöt"},"https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-accessibility-and-paths-within-facility":{en:"Stop facilities accessibility and paths within facility",fi:"Pysäkkipalveluiden esteettömyys ja reitit"},"https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-geometry-and-map-layout":{en:"Stop facilities geometry and map layout",fi:"Pysäkkipalveluiden geometria ja kartta"},"https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-location-and-features":{en:"Stop facilities location and features",fi:"Pysäkkipalveluiden sijainti ja ominaisuudet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-status-of-features":{en:"Stop facilities status of features",fi:"Pysäkkipalveluiden ominaisuuksien tila"},"https://w3id.org/mobilitydcat-ap/mobility-theme/timetables-static":{en:"Timetables static",fi:"Aikataulut, staattiset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/toll-information":{en:"Toll information",fi:"Tietullitiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/topographic-places":{en:"Topographic places",fi:"Topografiset paikat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-circulation-plans":{en:"Traffic circulation plans",fi:"Liikennevirtasuunnitelmat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-data-at-border-crossings-to-third-countries":{en:"Traffic data at border crossings to third countries",fi:"Liikennetiedot rajanylityspaikoilla kolmansiin maihin"},"https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-volume":{en:"Traffic volume",fi:"Liikenteen määrä"},"https://w3id.org/mobilitydcat-ap/mobility-theme/transport-operators":{en:"Transport operators",fi:"Liikenteenharjoittajat"},"https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-availability":{en:"Truck parking availability",fi:"Kuorma-autopysäköinnin saatavuus"},"https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-locations-and-conditions":{en:"Truck parking locations and conditions",fi:"Kuorma-autojen pysäköintipaikat ja -olosuhteet"},"https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-access-conditions":{en:"Tunnel access conditions",fi:"Tunneleiden käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-closures-and-access-conditions":{en:"Tunnel closures and access conditions",fi:"Tunneleiden sulkemiset ja käyttörajoitukset"},"https://w3id.org/mobilitydcat-ap/mobility-theme/vehicle-details":{en:"Vehicle details",fi:"Ajoneuvojen tiedot"},"https://w3id.org/mobilitydcat-ap/mobility-theme/waiting-time-at-border-crossings-to-non-eu-member-states":{en:"Waiting time at border crossings to non-EU Member States",fi:"Odotusaika rajanylityspaikoilla EU:n ulkopuolisiin maihin"},"https://w3id.org/mobilitydcat-ap/mobility-theme/waterways-and-water-bodies":{en:"Waterways and water bodies",fi:"Vesiväylät ja vesistöt"}};function bo(t){return"string"==typeof t&&go.has(t)}const vo={state:{},initialize(){ho.apply(this),this.state={topMobilityTheme:this._getInitialMobilityTheme()};this._getTopMobilityThemeSelector().on("change",this._onTopMobilityThemeChanged),this._onStateUpdate(this._handleTopMobilityThemeChanged),this._subThemeSelectorViewUpdate(void 0,this.state)},teardown:function(){this._stateListeners=void 0},_getInitialMobilityTheme(){const t=this._getTopMobilityThemeSelector().val();return bo(t)?t:void 0},_getInitialSubMobilityTheme(){const t=this._getInitialSubMobilityThemeSelector().val();return"string"==typeof(e=t)&&uo.has(e)?t:void 0;var e},_getTopMobilityThemeSelector(){return this.$("#field-mobility_theme")},_getInitialSubMobilityThemeSelector(){return this.$("#mobility_theme_sub_value")},_getSubMobilityThemeSelector(){return this.$("#field-mobility_theme_sub")},_onTopMobilityThemeChanged(t){if(t.target instanceof HTMLSelectElement){const e=t.target.value;if(!bo(e))throw new Error(`Invalid mobility theme: ${e}`);this._mergeState({topMobilityTheme:e})}},_stateChangedKeys(t,e){const i=new Set;for(const a in t)a in e?t[a]!==e[a]&&i.add(a):i.add(a);for(const a in e)a in t||i.add(a);return i},_triggerListeners(t,e){if(this._stateListeners)for(const i of this._stateListeners)i(t,e)},_updateState(t){const e=this.state;this.state=t;const i=this._stateChangedKeys(e,t);return this._triggerListeners(e,i),t},_mergeState(t){const e=this.state,i={...this.state,...t};this.state=i;const a=this._stateChangedKeys(e,i);return this._triggerListeners(e,a),i},_onStateUpdate(t){return this._stateListeners?this._stateListeners.push(t):this._stateListeners=[t],()=>{this._stateListeners&&(this._stateListeners=this._stateListeners.filter((e=>e!==t)))}},_handleTopMobilityThemeChanged(t,e){e.has("topMobilityTheme")&&this._subThemeSelectorViewUpdate(t,this.state)},_subThemeSelectorViewUpdate(t,e){function i(t){return"object"==typeof t&&!!t.subMobilityThemeSelectorParent&&!!t.subMobilityThemeSelector}function a(){const t=this._getSubMobilityThemeSelector().parentsUntil("form").filter("div.form-group");"none"!==t.css("display")?t.css("display","none"):t.css("display","")}const o=void 0===t,s=t?.topMobilityTheme!==e.topMobilityTheme;if((o||s)&&e.topMobilityTheme){const t=mo[e.topMobilityTheme].map((t=>t)),o=this._getInitialSubMobilityTheme();if(t?.length>0){(function(){if(i(e)){e.subMobilityThemeSelectorParent.append(e.subMobilityThemeSelector),a.apply(this);const t={...e},i=new Set(["subMobilityThemeSelector","subMobilityThemeSelectorParent"]),o=Object.keys(t).reduce(((e,a)=>(i.has(a)||(e[a]=t[a]),e)),{});this._updateState(o)}}).apply(this);const s=function(t,e){const i=t.map((t=>{const i=document.createElement("option");i.value=t;const a=$("html").attr("lang")??"en";return i.text=fo[t][a]??fo[t].en,t===e&&(i.selected=!0),i})),a=document.createElement("option");return a.value="",a.text="",e||(a.selected=!0),i.unshift(a),i.sort(((t,e)=>t.text.localeCompare(e.text))),i}.apply(this,[t,o]);(function(t){this._getSubMobilityThemeSelector().empty().append(t)}).apply(this,[s])}else(function(){if(!i(e)){a.apply(this);const t=this._getSubMobilityThemeSelector().parent(),e=this._getSubMobilityThemeSelector().detach();this._mergeState({subMobilityThemeSelector:e,subMobilityThemeSelectorParent:t})}}).apply(this)}}};ckan.module("digitraffic_theme_dataset_form_wrapper",vo);const wo={initialize(){ho.apply(this)}};ckan.module("digitraffic_theme_iri_fragment_inputs",wo);const $o={initialize(){ho.apply(this);const t=this._getForm(),e=this._getFormInput(),i=this._getLanguageDropdown(),a=this._getLanguageOptions();i.on("click",this._toggleLanguageDropdownMouseOpen),i.on("keydown",this._toggleLanguageDropdownKeyboardOpen),a.each(((i,a)=>{const o=$(a);o.on("click",(()=>this._submitFormMouse(o,e,t))),o.on("keydown",(i=>this._submitFormKeyboard(i,o,e,t)))}))},_toggleLanguageDropdownMouseOpen(t){t.target&&t.target.classList.toggle("open")},_toggleLanguageDropdownKeyboardOpen(t){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),t.target&&t.target.classList.toggle("open"))},_submitFormMouse(t,e,i){const a=t.attr("data-value");e&&a&&e.val(a),i&&i.trigger("submit")},_submitFormKeyboard(t,e,i,a){if("Enter"===t.key||" "===t.key){const t=e.attr("data-value");i&&t&&i.val(t),a&&a.trigger("submit")}},_getForm(){return this.$("#language-menu-form")},_getFormInput(){return this.$("#language-option-hidden")},_getLanguageDropdown(){return this.$(".custom-language-dropdown")},_getLanguageOptions(){return this.$(".custom-language-option")}};ckan.module("digitraffic_theme_language_menu",$o);const _o={START_TIMESTAMP_TZ_CSS_QUERY:"#field-start_timestamp-tz",END_TIMESTAMP_TZ_CSS_QUERY:"#field-end_timestamp-tz",initialize(){ho.apply(this);const t=this._getStartTimestampTZ(),e=this._getEndTimestampTZ();this._moveToEnd(t),t.find(this.START_TIMESTAMP_TZ_CSS_QUERY).on("change",(t=>{const i=t.target.value;e.find(this.END_TIMESTAMP_TZ_CSS_QUERY).val(i)})),e.hide(),this._showNecessityLabels()},_getStartTimestampTZ(){return this.$(".datetime-row").find(".datetime-field").has(this.START_TIMESTAMP_TZ_CSS_QUERY)},_getEndTimestampTZ(){return this.$(".datetime-row").find(".datetime-field").has(this.END_TIMESTAMP_TZ_CSS_QUERY)},_moveToEnd(t){t.appendTo(this.el)},_showNecessityLabels(){const t=this.$(".hide-necessity");t.length&&t.removeClass("hide-necessity")}};ckan.module("digitraffic_theme_temporal_coverage",_o);var ko=function(t,e,i,a){var o,s=arguments.length,n=s<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,a);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};class xo extends CustomEvent{constructor(t){super("select",{detail:t,bubbles:!0,cancelable:!0,composed:!1})}}class So extends mt{constructor(){super(),this.options=[],this.disabled=!1,this.error=!1,this.multiple=!1,this.required=!1,this.addEventListener("blur",(()=>this.getButton().ariaExpanded="false")),this._internals=this.attachInternals()}firstUpdated(){this.tabIndex=0,this.setValidity(),this.multiple&&this.setMultipleHeaderContent()}render(){const t=t=>W`
      <li
        @click=${()=>this.handleSelect(t)}
        @keypress=${e=>this.handleKeypress(e,t)}
        class=${`ui-label-text option ${this.getOptionCssClass(t)}`}
        tabindex=${0}
        aria-selected=${this.value===t}
      >
        ${this.getLabel(t)}
      </li>
    `,e=t=>W`
      <li>
        <label class="ui-label-text option option-multiple ${this.getOptionCssClass(t)}">
          <fds-checkbox
            @select="${()=>this.handleMultiSelect(t)}"
            ?checked=${!!Array.isArray(this.value)&&this.value.some((e=>e.value===t.value))}
          >
          </fds-checkbox>
          ${this.getLabel(t)}
        </label>
      </li>
    `,i=W`
      <ul
        part="options-list"
        id="options-list"
        role="listbox"
        aria-label="options"
        class="options-list"
        aria-multiselectable="true"
      >
        ${this.options.map((i=>this.multiple?e(i):t(i)))}
      </ul>
    `,a=0===this.renderRoot.children.length;return W`
      <div class="dropdown-wrapper">
        <button
          @click=${()=>{const t=this.getButton();t.ariaExpanded=(!("true"===t.ariaExpanded)).toString()}}
          ?disabled=${this.disabled}
          class=${`ui-label-text ${this.getButtonCssClass()}`}
          role="combobox"
          aria-controls="options-list"
          aria-expanded=${a?"false":this.getButton().ariaExpanded}
        >
          ${this.multiple?(()=>{const t=this.value;if(!Array.isArray(t))throw new Error("Selected options should be an array when multiple is true");return 0===t.length?W`<div>${this.placeholder||""}</div>`:W`
        <div class="selected-options-container">
          <div class="selected-options">
            ${t.map((t=>W` <span class="selected-tag">${this.getLabel(t)}</span> `))}
          </div>
          <span class="overflow-counter"></span>
        </div>
      `})():(()=>{var t;return W` <div>${null!==(t=this.getLabel(this.value))&&void 0!==t?t:this.placeholder}</div> `})()}
          <fds-icon icon="chevron-up"></fds-icon>
          <fds-icon icon="chevron-down"></fds-icon>
        </button>
        ${i}
      </div>
    `}setMultipleHeaderContent(){const t=this.renderRoot.querySelector(".selected-options-container"),e=this.renderRoot.querySelector(".selected-options"),i=this.renderRoot.querySelector(".overflow-counter");if(!t||!e||!i)return;const a=Array.from(e.querySelectorAll(".selected-tag"));let o=0;const s=t.clientWidth-30;let n=0;a.forEach((t=>{const e=t;n+=e.offsetWidth;const i=e.querySelector("fds-icon");i&&(n+=parseInt(i.size.value)),n>s?(e.classList.add("hidden"),o++):e.classList.remove("hidden")})),o>0?(i.classList.remove("hidden"),i.textContent=`+${o}`):(i.textContent="",i.classList.add("hidden"))}updated(){this.setMultipleHeaderContent()}handleKeypress(t,e){"Enter"===t.key&&this.handleSelect(e)}getButton(){const t=this.renderRoot.querySelector("button");if(null===t)throw new Error("Button element not found");return t}handleSelect(t){this.getButton().ariaExpanded="false",this.value=t,this.setValidity(),this.setFormValue(),this.dispatchEvent(new xo(t))}handleMultiSelect(t){const e=this.getValues();this.value=e.length>0?e:void 0,this.setValidity(),this.setFormValue(),this.dispatchEvent(new xo(t))}getLabel(t){if(!t)return null;if(Array.isArray(t)){if(0===t.length)return null;t=t[0]}const e=W`<span class="label">${t.label}</span>`;return t.icon?W`<span class="icon-label"><fds-icon .icon=${t.icon}></fds-icon>${e}</span>`:e}getValues(){var t;const e=t=>this.options.find((e=>e.label===t));let i=[];if(this.multiple){const t=this.renderRoot.querySelectorAll("fds-checkbox");i=Array.from(t).filter((t=>t.checked)).map((t=>{if(null===t.labels||null===t.labels[0].textContent)return;const i=t.labels[0].textContent.trim();return e(i)})).filter((t=>void 0!==t))}else{const a=this.renderRoot.querySelectorAll("li"),o=Array.from(a).find((t=>"true"===t.getAttribute("aria-selected")));if(void 0!==o){const a=null===(t=o.textContent)||void 0===t?void 0:t.trim();if(void 0!==a){const t=e(a);i=t?[t]:[]}}}return structuredClone(i)}getButtonCssClass(){return this.error?"error":!this.value&&this.placeholder?"placeholder":""}getOptionCssClass(t){return this.value===t?"selected":""}checkValidity(){return this._internals.checkValidity()}reportValidity(){return this._internals.reportValidity()}get labels(){return this._internals.labels}get validity(){return this._internals.validity}get validationMessage(){return this._internals.validationMessage}setValidity(){const t=!!this.required&&void 0===this.value;this._internals.setValidity({valueMissing:t,customError:this.error},"Invalid state")}setFormValue(){const t=this.name;if(void 0!==t){const e=new FormData;this.getValues().forEach((i=>{i.value&&e.append(t,i.value.toString())})),this._internals.setFormValue(e)}}}So.formAssociated=!0,So.shadowRootOptions={...mt.shadowRootOptions,delegatesFocus:!0},So.styles=[Fa,y`
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

        background-color: ${Oa};
        border: 1px solid ${Ua};
      }

      button:disabled {
        cursor: default;
        background-color: ${Ia};
        color: ${Ba};
      }

      button:disabled .chevron {
        color: ${Ba};
      }

      button.placeholder {
        color: ${Ba};
      }

      button.error {
        color: ${Na};
        border: 3px solid ${Na};
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
        background: ${Va};
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
        box-shadow: ${ft};
        padding: 0;
      }

      .dropdown-wrapper:has([aria-expanded='false']) {
        .options-list {
          display: none;
        }
        fds-icon[icon='chevron-up'] {
          display: none;
        }
      }

      .dropdown-wrapper:has([aria-expanded='true']) {
        .options-list {
          display: flex;
        }
        fds-icon[icon='chevron-down'] {
          display: none;
        }
      }

      fds-icon {
        position: static;
        color: ${Ha};
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

        background-color: ${Oa};
        border-bottom: 1px solid ${Ua};

        &.option-multiple {
          cursor: pointer;
          gap: 10px;
          flex-wrap: nowrap;
        }
      }

      .option:hover {
        /* TODO: what color? */
        background-color: ${Ra};
      }

      .option.selected {
        /* TODO: what color? */
        background-color: ${Da};
      }
    `],ko([Ya()],So.prototype,"options",void 0),ko([Ya({type:Boolean})],So.prototype,"disabled",void 0),ko([Ya({type:Boolean})],So.prototype,"error",void 0),ko([Ya()],So.prototype,"placeholder",void 0),ko([Ya()],So.prototype,"value",void 0),ko([Ya({type:Boolean})],So.prototype,"multiple",void 0),ko([Ya({type:Boolean})],So.prototype,"required",void 0),ko([Ya()],So.prototype,"name",void 0);var Mo=function(t,e,i,a){var o,s=arguments.length,n=s<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,a);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};class Ao extends mt{constructor(){super(),this.label="",this.disabled=!1,this.checked=!1,this.value="on",this._internals=this.attachInternals(),this.addEventListener("click",(()=>{var t;const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.getElementById("checkbox");e&&e.click()}))}firstUpdated(){this.tabIndex=0,this.setValidity()}render(){return W`
      <input
        type="checkbox"
        id="checkbox"
        .disabled=${this.disabled}
        .checked="${this.checked}"
        .value="${this.value}"
        @change=${this.handleSelect}
        @click=${t=>{t.stopPropagation()}}
      />
      ${this.label&&W`<label for="checkbox" class="ui-label-text">${this.label}</label>`}
    `}handleSelect(){this.disabled||(this.checked=!this.checked,this.setValidity(),this.setFormValue(),setTimeout((()=>{this.dispatchEvent(new CustomEvent("select",{detail:this.checked}))})))}checkValidity(){return this._internals.checkValidity()}reportValidity(){return this._internals.reportValidity()}get validity(){return this._internals.validity}get labels(){return this._internals.labels}get validationMessage(){return this._internals.validationMessage}setValidity(){var t;const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.getElementById("checkbox");this._internals.setValidity(e.validity,e.validationMessage,e)}setFormValue(){if(this.checked){void 0!==this.name&&this._internals.setFormValue(this.value.toString())}else this._internals.setFormValue(null)}}Ao.formAssociated=!0,Ao.shadowRootOptions={...mt.shadowRootOptions,delegatesFocus:!0},Ao.styles=[Fa,y`
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
        border: 2px solid ${La};
        border-radius: ${ut};
      }

      #checkbox:checked::before {
        border-color: ${Da};
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEwIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0zLjM4Nzc2IDcuNDAzM0wwLjE0NjA2NiA0LjE2MTYxQy0wLjA0ODY4ODcgMy45NjY4NSAtMC4wNDg2ODg3IDMuNjUxMDggMC4xNDYwNjYgMy40NTYzMUwwLjg1MTM0OSAyLjc1MUMxLjA0NjEgMi41NTYyMyAxLjM2MTkgMi41NTYyMyAxLjU1NjY1IDIuNzUxTDMuNzQwNDEgNC45MzQ3NEw4LjQxNzc4IDAuMjU3Mzk0QzguNjEyNTQgMC4wNjI2Mzk0IDguOTI4MzMgMC4wNjI2Mzk0IDkuMTIzMDggMC4yNTczOTRMOS44MjgzNyAwLjk2MjY5NkMxMC4wMjMxIDEuMTU3NDUgMTAuMDIzMSAxLjQ3MzIyIDkuODI4MzcgMS42NjhMNC4wOTMwNiA3LjQwMzMyQzMuODk4MjkgNy41OTgwOCAzLjU4MjUxIDcuNTk4MDggMy4zODc3NiA3LjQwMzNWNy40MDMzWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==');
        background-color: ${Da};
        background-repeat: no-repeat;
        background-position: center;
      }

      #checkbox:disabled::before,
      #checkbox:disabled + label {
        cursor: default;
        color: ${Ba};
      }

      #checkbox:disabled::before {
        border-color: ${Ba};
      }

      #checkbox:disabled#checkbox:checked::before {
        background-color: ${Ba};
      }
    `],Mo([Ya()],Ao.prototype,"label",void 0),Mo([Ya({type:Boolean})],Ao.prototype,"disabled",void 0),Mo([Ya({type:Boolean})],Ao.prototype,"checked",void 0),Mo([Ya()],Ao.prototype,"value",void 0),Mo([Ya()],Ao.prototype,"name",void 0),customElements.define("fds-checkbox",Ao),customElements.define("fds-dropdown",So);const Eo={initialize(){ho.apply(this);const t=this._getOptionValues();customElements.whenDefined("fds-dropdown").then((()=>{const e=document.createElement("fds-dropdown");e.options=this._optionValuesToFdsDropdownOptions(t),e.value=this._optionValuesToFdsDropdownOptions(t.filter((t=>t.selected))),e.multiple=!0,e.setAttribute("id",this.el[0].id),e.setAttribute("name",this.el[0].name),this.el.replaceWith(e)}))},_getOptionValues(){return this.$("option").toArray().map((t=>({label:t.textContent?.trim(),value:t.value,selected:"selected"===t.getAttribute("selected")})))},_optionValuesToFdsDropdownOptions:t=>t.map((t=>({label:t.label,value:t.value})))};ckan.module("digitraffic_theme_multi_select",Eo);const To={initialize(){ho.apply(this);this._getToggleButtons().children(".language-toggle-button").each(((t,e)=>{const i=$(e),a=i.attr("id");i.on("click",(t=>{t.preventDefault();this.$(`#field-${a}`).parent().parent().removeClass("hidden"),i.addClass("hidden")}))}));this._getCloseButtons().each(((t,e)=>{const i=$(e),a=i.attr("id");i.on("click",(t=>{t.preventDefault();$(`#${a}.language-toggle-button`).removeClass("hidden"),i.parent().parent().addClass("hidden");this.$(`#field-${a}`).val("")}))}))},_getToggleButtons(){return this.$(".language-toggle-buttons")},_getCloseButtons(){return this.$(".hide-language-input")}};ckan.module("digitraffic_theme_language_toggle_buttons",To);
/**
     * @license lucide v0.477.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */
const jo={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},Co=([t,e,i])=>{const a=document.createElementNS("http://www.w3.org/2000/svg",t);return Object.keys(e).forEach((t=>{a.setAttribute(t,String(e[t]))})),i?.length&&i.forEach((t=>{const e=Co(t);a.appendChild(e)})),a},Po=t=>"string"==typeof t?t:t&&t.class?t.class&&"string"==typeof t.class?t.class.split(" "):t.class&&Array.isArray(t.class)?t.class:"":"",zo=(t,{nameAttr:e,icons:i,attrs:a})=>{const o=t.getAttribute(e);if(null==o)return;const s=i[o.replace(/(\w)(\w*)(_|-|\s*)/g,((t,e,i)=>e.toUpperCase()+i.toLowerCase()))];if(!s)return console.warn(`${t.outerHTML} icon name was not found in the provided icons object.`);const n=(t=>Array.from(t.attributes).reduce(((t,e)=>(t[e.name]=e.value,t)),{}))(t),r={...jo,"data-lucide":o,...a,...n},l=["lucide",`lucide-${o}`,n,a].flatMap(Po).map((t=>t.trim())).filter(Boolean).filter(((t,e,i)=>i.indexOf(t)===e)).join(" ");l&&Object.assign(r,{class:l});const d=((t,e={})=>{const i={...jo,...e};return Co(["svg",i,t])})(s,r);return t.parentNode?.replaceChild(d,t)},Lo=[["path",{d:"m6 9 6 6 6-6"}]],Oo=[["path",{d:"m18 15-6-6-6 6"}]],No=[["path",{d:"M15 3h6v6"}],["path",{d:"M10 14 21 3"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}]],Ro=[["path",{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"}]],Do=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],["path",{d:"M2 12h20"}]],Io=[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5"}]],Vo=[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}],["rect",{width:"4",height:"12",x:"2",y:"9"}],["circle",{cx:"4",cy:"4",r:"2"}]],Uo=[["line",{x1:"4",x2:"20",y1:"12",y2:"12"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18"}]],Bo=[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"}]],Ho=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]],Fo=[["path",{d:"M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"}],["path",{d:"m10 15 5-3-5-3z"}]];
/**
     * @license lucide v0.477.0 - ISC
     *
     * This source code is licensed under the ISC license.
     * See the LICENSE file in the root directory of this source tree.
     */jQuery((function(){$(".js-disabled").removeClass("js-disabled"),(({icons:t={},nameAttr:e="data-lucide",attrs:i={}}={})=>{if(!Object.values(t).length)throw new Error("Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`");if("undefined"==typeof document)throw new Error("`createIcons()` only works in a browser environment.");const a=document.querySelectorAll(`[${e}]`);if(Array.from(a).forEach((a=>zo(a,{nameAttr:e,icons:t,attrs:i}))),"data-lucide"===e){const e=document.querySelectorAll("[icon-name]");e.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(e).forEach((e=>zo(e,{nameAttr:"icon-name",icons:t,attrs:i}))))}})({icons:{ExternalLink:No,User:Ho,Menu:Uo,Globe:Do,ChevronDown:Lo,ChevronUp:Oo,Facebook:Ro,Twitter:Bo,Instagram:Io,Youtube:Fo,Linkedin:Vo}})}))}();
