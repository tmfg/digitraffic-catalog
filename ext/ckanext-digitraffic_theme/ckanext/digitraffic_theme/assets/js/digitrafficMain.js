/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=class{get shadowRoot(){return this.__host.__shadowRoot}constructor(e){this.ariaAtomic="",this.ariaAutoComplete="",this.ariaBrailleLabel="",this.ariaBrailleRoleDescription="",this.ariaBusy="",this.ariaChecked="",this.ariaColCount="",this.ariaColIndex="",this.ariaColSpan="",this.ariaCurrent="",this.ariaDescription="",this.ariaDisabled="",this.ariaExpanded="",this.ariaHasPopup="",this.ariaHidden="",this.ariaInvalid="",this.ariaKeyShortcuts="",this.ariaLabel="",this.ariaLevel="",this.ariaLive="",this.ariaModal="",this.ariaMultiLine="",this.ariaMultiSelectable="",this.ariaOrientation="",this.ariaPlaceholder="",this.ariaPosInSet="",this.ariaPressed="",this.ariaReadOnly="",this.ariaRequired="",this.ariaRoleDescription="",this.ariaRowCount="",this.ariaRowIndex="",this.ariaRowSpan="",this.ariaSelected="",this.ariaSetSize="",this.ariaSort="",this.ariaValueMax="",this.ariaValueMin="",this.ariaValueNow="",this.ariaValueText="",this.role="",this.form=null,this.labels=[],this.states=new Set,this.validationMessage="",this.validity={},this.willValidate=!0,this.__host=e}checkValidity(){return console.warn("`ElementInternals.checkValidity()` was called on the server.This method always returns true."),!0}reportValidity(){return!0}setFormValue(){}setValidity(){}},t=new WeakMap,i=e=>{let i=t.get(e);return void 0===i&&t.set(e,i=new Map),i},o=class{constructor(){this.__shadowRootMode=null,this.__shadowRoot=null,this.__internals=null}get attributes(){return Array.from(i(this)).map((([e,t])=>({name:e,value:t})))}get shadowRoot(){return"closed"===this.__shadowRootMode?null:this.__shadowRoot}get localName(){return this.constructor.__localName}get tagName(){return this.localName?.toUpperCase()}setAttribute(e,t){i(this).set(e,String(t))}removeAttribute(e){i(this).delete(e)}toggleAttribute(e,t){return this.hasAttribute(e)?!(void 0===t||!t)||(this.removeAttribute(e),!1):!(void 0!==t&&!t)&&(this.setAttribute(e,""),!0)}hasAttribute(e){return i(this).has(e)}attachShadow(e){const t={host:this};return this.__shadowRootMode=e.mode,e&&"open"===e.mode&&(this.__shadowRoot=t),t}attachInternals(){if(null!==this.__internals)throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");const t=new e(this);return this.__internals=t,t}getAttribute(e){return i(this).get(e)??null}},r=class extends o{},n=new class{constructor(){this.__definitions=new Map}define(e,t){if(this.__definitions.has(e)){if("development"!==process.env.NODE_ENV)throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the name "${e}" has already been used with this registry`);console.warn(`'CustomElementRegistry' already has "${e}" defined. This may have been caused by live reload or hot module replacement in which case it can be safely ignored.\nMake sure to test your application with a production build as repeat registrations will throw in production.`)}t.__localName=e,this.__definitions.set(e,{ctor:t,observedAttributes:t.observedAttributes??[]})}get(e){const t=this.__definitions.get(e);return t?.ctor}},a=globalThis,s=a.ShadowRoot&&(void 0===a.ShadyCSS||a.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,l=Symbol(),d=new WeakMap;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let p=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==l)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(s&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=d.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&d.set(t,e))}return e}toString(){return this.cssText}};const c=e=>new p("string"==typeof e?e:e+"",void 0,l),h=(e,...t)=>{const i=1===e.length?e[0]:t.reduce(((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1]),e[0]);return new p(i,e,l)},f=(e,t)=>{s?e.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((t=>{const i=document.createElement("style"),o=a.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=t.cssText,e.appendChild(i)}))},u=s||void 0===a.CSSStyleSheet?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return c(t)})(e):e
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var g,y;const v=globalThis;null!==(g=v.customElements)&&void 0!==g||(v.customElements=n);const m=v.trustedTypes,b=m?m.emptyScript:"",$=v.reactiveElementPolyfillSupport,x={toAttribute(e,t){switch(t){case Boolean:e=e?b:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},w=(e,t)=>t!==e&&(t==t||e==e),_={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:w},k="finalized";let E=class extends(globalThis.HTMLElement??r){constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const o=this._$Ep(i,t);void 0!==o&&(this._$Ev.set(o,i),e.push(o))})),e}static createProperty(e,t=_){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,o=this.getPropertyDescriptor(e,i,t);void 0!==o&&Object.defineProperty(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(o){const r=this[e];this[t]=o,this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||_}static finalize(){if(this.hasOwnProperty(k))return!1;this[k]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(u(e))}else void 0!==e&&t.push(u(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return f(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=_){var o;const r=this.constructor._$Ep(e,i);if(void 0!==r&&!0===i.reflect){const n=(void 0!==(null===(o=i.converter)||void 0===o?void 0:o.toAttribute)?i.converter:x).toAttribute(t,i.type);this._$El=e,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$El=null}}_$AK(e,t){var i;const o=this.constructor,r=o._$Ev.get(e);if(void 0!==r&&this._$El!==r){const e=o.getPropertyOptions(r),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:x;this._$El=r,this[r]=n.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let o=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||w)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var A;E[k]=!0,E.elementProperties=new Map,E.elementStyles=[],E.shadowRootOptions={mode:"open"},null==$||$({ReactiveElement:E}),(null!==(y=v.reactiveElementVersions)&&void 0!==y?y:v.reactiveElementVersions=[]).push("1.6.3");const S=globalThis,O=S.trustedTypes,M=O?O.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",P=`lit$${(Math.random()+"").slice(9)}$`,j="?"+P,z=`<${j}>`,D=void 0===S.document?{createTreeWalker:()=>({})}:document,R=()=>D.createComment(""),L=e=>null===e||"object"!=typeof e&&"function"!=typeof e,N=Array.isArray,T="[ \t\n\f\r]",I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,U=/>/g,B=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),V=/'/g,W=/"/g,F=/^(?:script|style|textarea|title)$/i,q=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),K=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),Q=new WeakMap,Z=D.createTreeWalker(D,129,null,!1);function G(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==M?M.createHTML(t):t}const J=(e,t)=>{const i=e.length-1,o=[];let r,n=2===t?"<svg>":"",a=I;for(let t=0;t<i;t++){const i=e[t];let s,l,d=-1,p=0;for(;p<i.length&&(a.lastIndex=p,l=a.exec(i),null!==l);)p=a.lastIndex,a===I?"!--"===l[1]?a=H:void 0!==l[1]?a=U:void 0!==l[2]?(F.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=B):void 0!==l[3]&&(a=B):a===B?">"===l[0]?(a=null!=r?r:I,d=-1):void 0===l[1]?d=-2:(d=a.lastIndex-l[2].length,s=l[1],a=void 0===l[3]?B:'"'===l[3]?W:V):a===W||a===V?a=B:a===H||a===U?a=I:(a=B,r=void 0);const c=a===B&&e[t+1].startsWith("/>")?" ":"";n+=a===I?i+z:d>=0?(o.push(s),i.slice(0,d)+C+i.slice(d)+P+c):i+P+(-2===d?(o.push(void 0),t):c)}return[G(e,n+(e[i]||"<?>")+(2===t?"</svg>":"")),o]};class X{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let r=0,n=0;const a=e.length-1,s=this.parts,[l,d]=J(e,t);if(this.el=X.createElement(l,i),Z.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(o=Z.nextNode())&&s.length<a;){if(1===o.nodeType){if(o.hasAttributes()){const e=[];for(const t of o.getAttributeNames())if(t.endsWith(C)||t.startsWith(P)){const i=d[n++];if(e.push(t),void 0!==i){const e=o.getAttribute(i.toLowerCase()+C).split(P),t=/([.?@])?(.*)/.exec(i);s.push({type:1,index:r,name:t[2],strings:e,ctor:"."===t[1]?re:"?"===t[1]?ae:"@"===t[1]?se:oe})}else s.push({type:6,index:r})}for(const t of e)o.removeAttribute(t)}if(F.test(o.tagName)){const e=o.textContent.split(P),t=e.length-1;if(t>0){o.textContent=O?O.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],R()),Z.nextNode(),s.push({type:2,index:++r});o.append(e[t],R())}}}else if(8===o.nodeType)if(o.data===j)s.push({type:2,index:r});else{let e=-1;for(;-1!==(e=o.data.indexOf(P,e+1));)s.push({type:7,index:r}),e+=P.length-1}r++}}static createElement(e,t){const i=D.createElement("template");return i.innerHTML=e,i}}function ee(e,t,i=e,o){var r,n,a,s;if(t===K)return t;let l=void 0!==o?null===(r=i._$Co)||void 0===r?void 0:r[o]:i._$Cl;const d=L(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===d?l=void 0:(l=new d(e),l._$AT(e,i,o)),void 0!==o?(null!==(a=(s=i)._$Co)&&void 0!==a?a:s._$Co=[])[o]=l:i._$Cl=l),void 0!==l&&(t=ee(e,l._$AS(e,t.values),l,o)),t}class te{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:o}=this._$AD,r=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:D).importNode(i,!0);Z.currentNode=r;let n=Z.nextNode(),a=0,s=0,l=o[0];for(;void 0!==l;){if(a===l.index){let t;2===l.type?t=new ie(n,n.nextSibling,this,e):1===l.type?t=new l.ctor(n,l.name,l.strings,this,e):6===l.type&&(t=new le(n,this,e)),this._$AV.push(t),l=o[++s]}a!==(null==l?void 0:l.index)&&(n=Z.nextNode(),a++)}return Z.currentNode=D,r}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ie{constructor(e,t,i,o){var r;this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cp=null===(r=null==o?void 0:o.isConnected)||void 0===r||r}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ee(this,e,t),L(e)?e===Y||null==e||""===e?(this._$AH!==Y&&this._$AR(),this._$AH=Y):e!==this._$AH&&e!==K&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>N(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==Y&&L(this._$AH)?this._$AA.nextSibling.data=e:this.$(D.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:o}=e,r="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=X.createElement(G(o.h,o.h[0]),this.options)),o);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===r)this._$AH.v(i);else{const e=new te(r,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=Q.get(e.strings);return void 0===t&&Q.set(e.strings,t=new X(e)),t}T(e){N(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const r of e)o===t.length?t.push(i=new ie(this.k(R()),this.k(R()),this,this.options)):i=t[o],i._$AI(r),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class oe{constructor(e,t,i,o,r){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Y}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,o){const r=this.strings;let n=!1;if(void 0===r)e=ee(this,e,t,0),n=!L(e)||e!==this._$AH&&e!==K,n&&(this._$AH=e);else{const o=e;let a,s;for(e=r[0],a=0;a<r.length-1;a++)s=ee(this,o[i+a],t,a),s===K&&(s=this._$AH[a]),n||(n=!L(s)||s!==this._$AH[a]),s===Y?e=Y:e!==Y&&(e+=(null!=s?s:"")+r[a+1]),this._$AH[a]=s}n&&!o&&this.j(e)}j(e){e===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class re extends oe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Y?void 0:e}}const ne=O?O.emptyScript:"";class ae extends oe{constructor(){super(...arguments),this.type=4}j(e){e&&e!==Y?this.element.setAttribute(this.name,ne):this.element.removeAttribute(this.name)}}class se extends oe{constructor(e,t,i,o,r){super(e,t,i,o,r),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=ee(this,e,t,0))&&void 0!==i?i:Y)===K)return;const o=this._$AH,r=e===Y&&o!==Y||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,n=e!==Y&&(o===Y||r);r&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class le{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){ee(this,e)}}const de=S.litHtmlPolyfillSupport;null==de||de(X,ie),(null!==(A=S.litHtmlVersions)&&void 0!==A?A:S.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var pe,ce;class he extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var o,r;const n=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:t;let a=n._$litPart$;if(void 0===a){const e=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:null;n._$litPart$=a=new ie(t.insertBefore(R(),e),e,void 0,null!=i?i:{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return K}}he.finalized=!0,he._$litElement$=!0,null===(pe=globalThis.litElementHydrateSupport)||void 0===pe||pe.call(globalThis,{LitElement:he});const fe=globalThis.litElementPolyfillSupport;null==fe||fe({LitElement:he}),(null!==(ce=globalThis.litElementVersions)&&void 0!==ce?ce:globalThis.litElementVersions=[]).push("3.3.3");const ue={name:"fds-size-3",value:"24px"},ge="0px 1px 2px 0px rgba(0, 0, 0, 0.24), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",ye="0px 6px 6px 0px rgba(0, 0, 0, 0.23), 0px 3px 6px 0px rgba(0, 0, 0, 0.16)",ve={name:"fds-color-brand-white",value:"#ffffff"},me={name:"fds-color-neutral-200",value:"#9696aa"},be=e=>null==e||null==e.name||null==e.value?(console.error("invalid FdsToken",e),c("")):c(["var(--",e.name,", ",e.value,")"].join("")),$e=c("var(--fds-size-1, 8px)"),xe=c("var(--fds-size-2, 16px)"),we=c("var(--fds-size-3, 24px)"),_e=c("var(--fds-size-4, 32px)"),ke=c("var(--fds-size-6, 48px)"),Ee=c("var(--fds-radius-compact, 2px)"),Ae=c("var(--fds-radius-large, 8px)"),Se=c("var(--fds-style-elevation-200, 0px 6px 6px 0px rgba(0, 0, 0, 0.23), 0px 3px 6px 0px rgba(0, 0, 0, 0.16))"),Oe=c("var(--fds-style-elevation-400, 0px 20px 20px 0px rgba(0, 0, 0, 0.22), 0px 50px 100px 0px rgba(0, 0, 0, 0.25))"),Me=c("var(--fds-typography-body-default-font-family, 'Public Sans')"),Ce=c("var(--fds-typography-body-default-font-size, 16px)"),Pe=c("var(--fds-typography-body-default-letter-spacing, 0px)"),je=c("var(--fds-typography-body-default-line-height, 150%)"),ze=c("var(--fds-typography-body-default-font-weight, 400)"),De=c("var(--fds-typography-body-default-display, inline-block)"),Re=c("var(--fds-typography-body-large-font-family, 'Public Sans')"),Le=c("var(--fds-typography-body-large-font-size, 18px)"),Ne=c("var(--fds-typography-body-large-letter-spacing, 0px)"),Te=c("var(--fds-typography-body-large-line-height, 150%)"),Ie=c("var(--fds-typography-body-large-font-weight, 400)"),He=c("var(--fds-typography-body-large-display, inline-block)"),Ue=c("var(--fds-typography-body-micro-font-family, 'Public Sans')"),Be=c("var(--fds-typography-body-micro-font-size, 12px)"),Ve=c("var(--fds-typography-body-micro-letter-spacing, 0px)"),We=c("var(--fds-typography-body-micro-line-height, 150%)"),Fe=c("var(--fds-typography-body-micro-font-weight, 400)"),qe=c("var(--fds-typography-body-micro-display, inline-block)"),Ke=c("var(--fds-typography-body-small-font-family, 'Public Sans')"),Ye=c("var(--fds-typography-body-small-font-size, 14px)"),Qe=c("var(--fds-typography-body-small-letter-spacing, 0px)"),Ze=c("var(--fds-typography-body-small-line-height, 150%)"),Ge=c("var(--fds-typography-body-small-font-weight, 400)"),Je=c("var(--fds-typography-body-small-display, inline-block)"),Xe=c("var(--fds-typography-emphasis-default-font-family, 'Public Sans')"),et=c("var(--fds-typography-emphasis-default-font-size, 16px)"),tt=c("var(--fds-typography-emphasis-default-letter-spacing, 0px)"),it=c("var(--fds-typography-emphasis-default-line-height, 150%)"),ot=c("var(--fds-typography-emphasis-default-font-weight, 700)"),rt=c("var(--fds-typography-emphasis-default-display, inline-block)"),nt=c("var(--fds-typography-emphasis-large-font-family, 'Public Sans')"),at=c("var(--fds-typography-emphasis-large-font-size, 18px)"),st=c("var(--fds-typography-emphasis-large-letter-spacing, 0px)"),lt=c("var(--fds-typography-emphasis-large-line-height, 150%)"),dt=c("var(--fds-typography-emphasis-large-font-weight, 700)"),pt=c("var(--fds-typography-emphasis-large-display, inline-block)"),ct=c("var(--fds-typography-emphasis-micro-font-family, 'Public Sans')"),ht=c("var(--fds-typography-emphasis-micro-font-size, 12px)"),ft=c("var(--fds-typography-emphasis-micro-letter-spacing, 0px)"),ut=c("var(--fds-typography-emphasis-micro-line-height, 150%)"),gt=c("var(--fds-typography-emphasis-micro-font-weight, 700)"),yt=c("var(--fds-typography-emphasis-micro-display, inline-block)"),vt=c("var(--fds-typography-emphasis-small-font-family, 'Public Sans')"),mt=c("var(--fds-typography-emphasis-small-font-size, 14px)"),bt=c("var(--fds-typography-emphasis-small-letter-spacing, 0px)"),$t=c("var(--fds-typography-emphasis-small-line-height, 150%)"),xt=c("var(--fds-typography-emphasis-small-font-weight, 700)"),wt=c("var(--fds-typography-emphasis-small-display, inline-block)"),_t=c("var(--fds-typography-heading-large-heading-3-font-family, 'Public Sans', 'PublicSans-Bold')"),kt=c("var(--fds-typography-heading-large-heading-3-font-size, 40px)"),Et=c("var(--fds-typography-heading-large-heading-3-letter-spacing, 0px)"),At=c("var(--fds-typography-heading-large-heading-3-line-height, 110%)"),St=c("var(--fds-typography-heading-large-heading-3-font-weight, 700)"),Ot=c("var(--fds-typography-heading-large-heading-3-display, inline-block)"),Mt=c("var(--fds-typography-heading-large-heading-4-font-family, 'Public Sans', 'PublicSans-Bold')"),Ct=c("var(--fds-typography-heading-large-heading-4-font-size, 32px)"),Pt=c("var(--fds-typography-heading-large-heading-4-letter-spacing, 0px)"),jt=c("var(--fds-typography-heading-large-heading-4-line-height, 110%)"),zt=c("var(--fds-typography-heading-large-heading-4-font-weight, 700)"),Dt=c("var(--fds-typography-heading-large-heading-4-display, inline-block)"),Rt=c("var(--fds-typography-heading-large-heading-5-font-family, 'Public Sans', 'PublicSans-Bold')"),Lt=c("var(--fds-typography-heading-large-heading-5-font-size, 28px)"),Nt=c("var(--fds-typography-heading-large-heading-5-letter-spacing, 0px)"),Tt=c("var(--fds-typography-heading-large-heading-5-line-height, 110%)"),It=c("var(--fds-typography-heading-large-heading-5-font-weight, 700)"),Ht=c("var(--fds-typography-heading-large-heading-5-display, inline-block)"),Ut=c("var(--fds-typography-heading-large-heading-6-font-family, 'Public Sans', 'PublicSans-Bold')"),Bt=c("var(--fds-typography-heading-large-heading-6-font-size, 20px)"),Vt=c("var(--fds-typography-heading-large-heading-6-letter-spacing, 0px)"),Wt=c("var(--fds-typography-heading-large-heading-6-line-height, 110%)"),Ft=c("var(--fds-typography-heading-large-heading-6-font-weight, 700)"),qt=c("var(--fds-typography-heading-large-heading-6-display, inline-block)"),Kt=c("var(--fds-typography-heading-large-heading-1-font-family, 'Public Sans', 'PublicSans-Bold')"),Yt=c("var(--fds-typography-heading-large-heading-1-font-size, 64px)"),Qt=c("var(--fds-typography-heading-large-heading-1-letter-spacing, 0px)"),Zt=c("var(--fds-typography-heading-large-heading-1-line-height, 110%)"),Gt=c("var(--fds-typography-heading-large-heading-1-font-weight, 700)"),Jt=c("var(--fds-typography-heading-large-heading-1-display, inline-block)"),Xt=c("var(--fds-typography-heading-large-heading-2-font-family, 'Public Sans', 'PublicSans-Bold')"),ei=c("var(--fds-typography-heading-large-heading-2-font-size, 48px)"),ti=c("var(--fds-typography-heading-large-heading-2-letter-spacing, 0px)"),ii=c("var(--fds-typography-heading-large-heading-2-line-height, 110%)"),oi=c("var(--fds-typography-heading-large-heading-2-font-weight, 700)"),ri=c("var(--fds-typography-heading-large-heading-2-display, inline-block)"),ni=c("var(--fds-typography-heading-small-heading-1-font-family, 'Public Sans', 'PublicSans-Bold')"),ai=c("var(--fds-typography-heading-small-heading-1-font-size, 42px)"),si=c("var(--fds-typography-heading-small-heading-1-letter-spacing, 0px)"),li=c("var(--fds-typography-heading-small-heading-1-line-height, 110%)"),di=c("var(--fds-typography-heading-small-heading-1-font-weight, 700)"),pi=c("var(--fds-typography-heading-small-heading-1-display, inline-block)"),ci=c("var(--fds-typography-heading-small-heading-2-font-family, 'Public Sans', 'PublicSans-Bold')"),hi=c("var(--fds-typography-heading-small-heading-2-font-size, 32px)"),fi=c("var(--fds-typography-heading-small-heading-2-letter-spacing, 0px)"),ui=c("var(--fds-typography-heading-small-heading-2-line-height, 110%)"),gi=c("var(--fds-typography-heading-small-heading-2-font-weight, 700)"),yi=c("var(--fds-typography-heading-small-heading-2-display, inline-block)"),vi=c("var(--fds-typography-heading-small-heading-3-font-family, 'Public Sans', 'PublicSans-Bold')"),mi=c("var(--fds-typography-heading-small-heading-3-font-size, 28px)"),bi=c("var(--fds-typography-heading-small-heading-3-letter-spacing, 0px)"),$i=c("var(--fds-typography-heading-small-heading-3-line-height, 110%)"),xi=c("var(--fds-typography-heading-small-heading-3-font-weight, 700)"),wi=c("var(--fds-typography-heading-small-heading-3-display, inline-block)"),_i=c("var(--fds-typography-heading-small-heading-4-font-family, 'Public Sans', 'PublicSans-Bold')"),ki=c("var(--fds-typography-heading-small-heading-4-font-size, 24px)"),Ei=c("var(--fds-typography-heading-small-heading-4-letter-spacing, 0px)"),Ai=c("var(--fds-typography-heading-small-heading-4-line-height, 110%)"),Si=c("var(--fds-typography-heading-small-heading-4-font-weight, 700)"),Oi=c("var(--fds-typography-heading-small-heading-4-display, inline-block)"),Mi=c("var(--fds-typography-heading-small-heading-5-font-family, 'Public Sans', 'PublicSans-Bold')"),Ci=c("var(--fds-typography-heading-small-heading-5-font-size, 18px)"),Pi=c("var(--fds-typography-heading-small-heading-5-letter-spacing, 0px)"),ji=c("var(--fds-typography-heading-small-heading-5-line-height, 110%)"),zi=c("var(--fds-typography-heading-small-heading-5-font-weight, 700)"),Di=c("var(--fds-typography-heading-small-heading-5-display, inline-block)"),Ri=c("var(--fds-typography-heading-small-heading-6-font-family, 'Public Sans', 'PublicSans-Bold')"),Li=c("var(--fds-typography-heading-small-heading-6-font-size, 16px)"),Ni=c("var(--fds-typography-heading-small-heading-6-letter-spacing, 0px)"),Ti=c("var(--fds-typography-heading-small-heading-6-line-height, 110%)"),Ii=c("var(--fds-typography-heading-small-heading-6-font-weight, 700)"),Hi=c("var(--fds-typography-heading-small-heading-6-display, inline-block)"),Ui=c("var(--fds-typography-link-large-font-family, 'Public Sans')"),Bi=c("var(--fds-typography-link-large-font-size, 18px)"),Vi=c("var(--fds-typography-link-large-letter-spacing, 0px)"),Wi=c("var(--fds-typography-link-large-line-height, 150%)"),Fi=c("var(--fds-typography-link-large-font-weight, 400)"),qi=c("var(--fds-typography-link-large-text-decoration, underline)"),Ki=c("var(--fds-typography-link-large-display, inline-block)"),Yi=c("var(--fds-typography-link-micro-font-family, 'Public Sans')"),Qi=c("var(--fds-typography-link-micro-font-size, 12px)"),Zi=c("var(--fds-typography-link-micro-letter-spacing, 0px)"),Gi=c("var(--fds-typography-link-micro-line-height, 150%)"),Ji=c("var(--fds-typography-link-micro-font-weight, 400)"),Xi=c("var(--fds-typography-link-micro-text-decoration, underline)"),eo=c("var(--fds-typography-link-micro-display, inline-block)"),to=c("var(--fds-typography-link-small-font-family, 'Public Sans')"),io=c("var(--fds-typography-link-small-font-size, 14px)"),oo=c("var(--fds-typography-link-small-letter-spacing, 0px)"),ro=c("var(--fds-typography-link-small-line-height, 150%)"),no=c("var(--fds-typography-link-small-font-weight, 400)"),ao=c("var(--fds-typography-link-small-text-decoration, underline)"),so=c("var(--fds-typography-link-small-display, inline-block)"),lo=c("var(--fds-typography-link-default-font-family, 'Public Sans')"),po=c("var(--fds-typography-link-default-font-size, 16px)"),co=c("var(--fds-typography-link-default-letter-spacing, 0px)"),ho=c("var(--fds-typography-link-default-line-height, 150%)"),fo=c("var(--fds-typography-link-default-font-weight, 400)"),uo=c("var(--fds-typography-link-default-text-decoration, underline)"),go=c("var(--fds-typography-link-default-display, inline-block)"),yo=c("var(--fds-typography-ui-helper-font-family, 'Public Sans', 'PublicSans-Regular')"),vo=c("var(--fds-typography-ui-helper-font-size, 15px)"),mo=c("var(--fds-typography-ui-helper-letter-spacing, 0px)"),bo=c("var(--fds-typography-ui-helper-line-height, 100%)"),$o=c("var(--fds-typography-ui-helper-font-weight, 400)"),xo=c("var(--fds-typography-ui-helper-display, inline-block)"),wo=c("var(--fds-typography-ui-id-font-family, 'Roboto Mono')"),_o=c("var(--fds-typography-ui-id-font-size, 13px)"),ko=c("var(--fds-typography-ui-id-letter-spacing, 0px)"),Eo=c("var(--fds-typography-ui-id-line-height, 100%)"),Ao=c("var(--fds-typography-ui-id-font-weight, 700)"),So=c("var(--fds-typography-ui-id-display, inline-block)"),Oo=c("var(--fds-typography-ui-label-font-family, 'Public Sans', 'PublicSans-Medium')"),Mo=c("var(--fds-typography-ui-label-font-size, 16px)"),Co=c("var(--fds-typography-ui-label-letter-spacing, 0px)"),Po=c("var(--fds-typography-ui-label-line-height, 22px)"),jo=c("var(--fds-typography-ui-label-font-weight, 500)"),zo=c("var(--fds-typography-ui-label-display, inline-block)"),Do=c("var(--fds-typography-ui-placeholder-font-family, 'Public Sans', 'PublicSans-Medium')"),Ro=c("var(--fds-typography-ui-placeholder-font-size, 16px)"),Lo=c("var(--fds-typography-ui-placeholder-letter-spacing, 0px)"),No=c("var(--fds-typography-ui-placeholder-line-height, 100%)"),To=c("var(--fds-typography-ui-placeholder-font-weight, 500)"),Io=c("var(--fds-typography-ui-placeholder-display, inline-block)"),Ho=c("var(--fds-typography-ui-tag-font-family, 'Public Sans', 'PublicSans-Bold')"),Uo=c("var(--fds-typography-ui-tag-font-size, 16px)"),Bo=c("var(--fds-typography-ui-tag-letter-spacing, 0px)"),Vo=c("var(--fds-typography-ui-tag-line-height, 100%)"),Wo=c("var(--fds-typography-ui-tag-font-weight, 700)"),Fo=c("var(--fds-typography-ui-tag-display, inline-block)"),qo=c("var(--fds-color-brand-black, #000000)"),Ko=c("var(--fds-color-brand-white, #ffffff)"),Yo=c("var(--fds-color-danger-50, #FFF0ED)"),Qo=c("var(--fds-color-danger-200, #e55636)"),Zo=c("var(--fds-color-danger-300, #b40000)"),Go=c("var(--fds-color-danger-400, #720000)"),Jo=c("var(--fds-color-interactive-50, #EFF8FF)"),Xo=c("var(--fds-color-interactive-100, #90cefe)"),er=c("var(--fds-color-interactive-200, #1777f8)"),tr=c("var(--fds-color-interactive-300, #0034ac)"),ir=c("var(--fds-color-neutral-50, #F6F6F6)"),or=c("var(--fds-color-neutral-100, #cdcdd7)"),rr=c("var(--fds-color-neutral-200, #9696aa)"),nr=c("var(--fds-color-neutral-400, #2c2c44)"),ar=c("var(--fds-color-success-50, #EAFFF8)"),sr=c("var(--fds-color-success-300, #005f61)"),lr=c("var(--fds-color-text-300, #9696aa)"),dr=c("var(--fds-color-text-600, #505064)"),pr=c("var(--fds-color-text-1000, #000000)"),cr=c("var(--fds-color-warning-50, #FFFADB)"),hr=c("var(--fds-color-warning-400, #6c3e05)");h`
  .body-default-text {
    display: ${De};
    font-family: ${Me};
    font-size: ${Ce};
    font-weight: ${ze};
    letter-spacing: ${Pe};
    line-height: ${je};
  }
`,h`
  .body-large-text {
    display: ${He};
    font-family: ${Re};
    font-size: ${Le};
    font-weight: ${Ie};
    letter-spacing: ${Ne};
    line-height: ${Te};
  }
`,h`
  .body-micro-text {
    display: ${qe};
    font-family: ${Ue};
    font-size: ${Be};
    font-weight: ${Fe};
    letter-spacing: ${Ve};
    line-height: ${We};
  }
`,h`
  .body-small-text {
    display: ${Je};
    font-family: ${Ke};
    font-size: ${Ye};
    font-weight: ${Ge};
    letter-spacing: ${Qe};
    line-height: ${Ze};
  }
`,h`
  .emphasis-default-text {
    display: ${rt};
    font-family: ${Xe};
    font-size: ${et};
    font-weight: ${ot};
    letter-spacing: ${tt};
    line-height: ${it};
  }
`,h`
  .emphasis-large-text {
    display: ${pt};
    font-family: ${nt};
    font-size: ${at};
    font-weight: ${dt};
    letter-spacing: ${st};
    line-height: ${lt};
  }
`,h`
  .emphasis-micro-text {
    display: ${yt};
    font-family: ${ct};
    font-size: ${ht};
    font-weight: ${gt};
    letter-spacing: ${ft};
    line-height: ${ut};
  }
`,h`
  .emphasis-small-text {
    display: ${wt};
    font-family: ${vt};
    font-size: ${mt};
    font-weight: ${xt};
    letter-spacing: ${bt};
    line-height: ${$t};
  }
`,h`
  .heading-large-1-text {
    display: ${Jt};
    font-family: ${Kt};
    font-size: ${Yt};
    font-weight: ${Gt};
    letter-spacing: ${Qt};
    line-height: ${Zt};
  }
`,h`
  .heading-large-2-text {
    display: ${ri};
    font-family: ${Xt};
    font-size: ${ei};
    font-weight: ${oi};
    letter-spacing: ${ti};
    line-height: ${ii};
  }
`,h`
  .heading-large-3-text {
    display: ${Ot};
    font-family: ${_t};
    font-size: ${kt};
    font-weight: ${St};
    letter-spacing: ${Et};
    line-height: ${At};
  }
`,h`
  .heading-large-4-text {
    display: ${Dt};
    font-family: ${Mt};
    font-size: ${Ct};
    font-weight: ${zt};
    letter-spacing: ${Pt};
    line-height: ${jt};
  }
`,h`
  .heading-large-5-text {
    display: ${Ht};
    font-family: ${Rt};
    font-size: ${Lt};
    font-weight: ${It};
    letter-spacing: ${Nt};
    line-height: ${Tt};
  }
`,h`
  .heading-large-6-text {
    display: ${qt};
    font-family: ${Ut};
    font-size: ${Bt};
    font-weight: ${Ft};
    letter-spacing: ${Vt};
    line-height: ${Wt};
  }
`,h`
  .heading-small-1-text {
    display: ${pi};
    font-family: ${ni};
    font-size: ${ai};
    font-weight: ${di};
    letter-spacing: ${si};
    line-height: ${li};
  }
`,h`
  .heading-small-2-text {
    display: ${yi};
    font-family: ${ci};
    font-size: ${hi};
    font-weight: ${gi};
    letter-spacing: ${fi};
    line-height: ${ui};
  }
`,h`
  .heading-small-3-text {
    display: ${wi};
    font-family: ${vi};
    font-size: ${mi};
    font-weight: ${xi};
    letter-spacing: ${bi};
    line-height: ${$i};
  }
`;const fr=h`
  .heading-small-4-text {
    display: ${Oi};
    font-family: ${_i};
    font-size: ${ki};
    font-weight: ${Si};
    letter-spacing: ${Ei};
    line-height: ${Ai};
  }
`;h`
  .heading-small-5-text {
    display: ${Di};
    font-family: ${Mi};
    font-size: ${Ci};
    font-weight: ${zi};
    letter-spacing: ${Pi};
    line-height: ${ji};
  }
`,h`
  .heading-small-6-text {
    display: ${Hi};
    font-family: ${Ri};
    font-size: ${Li};
    font-weight: ${Ii};
    letter-spacing: ${Ni};
    line-height: ${Ti};
  }
`,h`
  .link-default-text {
    display: ${go};
    font-family: ${lo};
    font-size: ${po};
    font-weight: ${fo};
    letter-spacing: ${co};
    line-height: ${ho};
    text-decoration: ${uo};
  }
`,h`
  .link-large-text {
    display: ${Ki};
    font-family: ${Ui};
    font-size: ${Bi};
    font-weight: ${Fi};
    letter-spacing: ${Vi};
    line-height: ${Wi};
    text-decoration: ${qi};
  }
`,h`
  .link-micro-text {
    display: ${eo};
    font-family: ${Yi};
    font-size: ${Qi};
    font-weight: ${Ji};
    letter-spacing: ${Zi};
    line-height: ${Gi};
    text-decoration: ${Xi};
  }
`,h`
  .link-small-text {
    display: ${so};
    font-family: ${to};
    font-size: ${io};
    font-weight: ${no};
    letter-spacing: ${oo};
    line-height: ${ro};
    text-decoration: ${ao};
  }
`;const ur=h`
  .ui-helper-text {
    display: ${xo};
    font-family: ${yo};
    font-size: ${vo};
    font-weight: ${$o};
    letter-spacing: ${mo};
    line-height: ${bo};
  }
`;h`
  .ui-id-text {
    display: ${So};
    font-family: ${wo};
    font-size: ${_o};
    font-weight: ${Ao};
    letter-spacing: ${ko};
    line-height: ${Eo};
  }
`;const gr=h`
  .ui-label-text {
    display: ${zo};
    font-family: ${Oo};
    font-size: ${Mo};
    font-weight: ${jo};
    letter-spacing: ${Co};
    line-height: ${Po};
  }
`;h`
  .ui-placeholder-text {
    display: ${Io};
    font-family: ${Do};
    font-size: ${Ro};
    font-weight: ${To};
    letter-spacing: ${Lo};
    line-height: ${No};
  }
`,h`
  .ui-tag-text {
    display: ${Fo};
    font-family: ${Ho};
    font-size: ${Uo};
    font-weight: ${Wo};
    letter-spacing: ${Bo};
    line-height: ${Vo};
  }
`;class yr extends he{render(){return q`
      <div class="actions__separated">
        <slot name="separated"></slot>
      </div>
      <div class="actions__content">
        <slot></slot>
      </div>
    `}}yr.styles=h`
    :host {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .actions__content {
      display: flex;
      align-items: center;
    }

    @media (min-width: 600px) {
      :host {
        flex-direction: row;
      }

      .actions-separated {
        margin-right: ${ke};
      }

      .actions-content {
        flex-direction: row;
      }

      ::slotted(:not(:last-child)) {
        margin-right: ${$e};
      }
    }

    @media (max-width: 600px) {
      :host {
        flex-direction: column-reverse;
      }

      .actions__content {
        width: 100%;
        flex-direction: column-reverse;
      }

      .actions__separated {
        width: 100%;
        margin-top: ${ke};
      }

      ::slotted(*) {
        width: 100%;
      }

      ::slotted(:not(:last-child)) {
        margin-top: ${$e};
      }
    }
  `,customElements.define("fds-action-sheet",yr);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vr=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}},mr=(e,t,i)=>{t.constructor.createProperty(i,e)};function br(e){return(t,i)=>void 0!==i?mr(e,t,i):vr(e,t)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function $r(e){return br({...e,state:!0})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xr=({finisher:e,descriptor:t})=>(i,o)=>{var r;if(void 0===o){const o=null!==(r=i.originalKey)&&void 0!==r?r:i.key,n=null!=t?{kind:"method",placement:"prototype",key:o,descriptor:t(i.key)}:{...i,key:o};return null!=e&&(n.finisher=function(t){e(t,o)}),n}{const r=i.constructor;void 0!==t&&Object.defineProperty(i,o,t(o)),null==e||e(r,o)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var wr;const _r=null!=(null===(wr=globalThis.HTMLSlotElement)||void 0===wr?void 0:wr.prototype.assignedElements)?(e,t)=>e.assignedElements(t):(e,t)=>e.assignedNodes(t).filter((e=>e.nodeType===Node.ELEMENT_NODE));var kr,Er=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};!function(e){e.error="error",e.warning="warning",e.info="info",e.success="success"}(kr||(kr={}));class Ar extends he{constructor(){super(...arguments),this.variant=kr.error,this.dismissible=!1}render(){return q`
      <div class="alert alert--${this.variant}">
        <div class="alert-content">
          ${this.icon&&q`<fds-icon class="alert-icon" .icon=${this.icon} .size=${ue}></fds-icon>`}
          <slot class="ui-helper-text"></slot>
        </div>
        ${this.renderDismissButton()}
      </div>
    `}renderDismissButton(){return this.dismissible?q`<fds-icon
        class="alert-close"
        .icon=${"x"}
        .size=${ue}
        @click=${()=>this.handleDismiss()}
      ></fds-icon>`:null}handleDismiss(){this.dispatchEvent(new CustomEvent("dismissed"))}}Ar.styles=[ur,h`
      :host {
        display: block;
      }

      .alert {
        border: 1px solid;
        border-radius: ${$e};
        display: flex;
      }
      .alert--error {
        background-color: ${Yo};
        border-color: ${Zo};
        color: ${Zo};
      }
      .alert--warning {
        background-color: ${cr};
        color: ${hr};
        border-color: ${hr};
      }
      .alert--info {
        background-color: ${Jo};
        border-color: ${tr};
        color: ${tr};
      }
      .alert--success {
        background-color: ${ar};
        border-bottom-color: ${sr};
        color: ${sr};
      }
      .alert-icon {
        margin: 0 ${xe} 0 ${$e};
      }

      .alert-content {
        flex: 1;
        display: inline-flex;
        align-items: center;
        padding: ${$e};
        justify-content: center;
      }

      .alert-close {
        cursor: pointer;
        border-left: 1px solid;
        border-radius: 0 ${$e} ${$e} 0;
        padding: ${$e};
        margin-left: ${$e};
      }
    `],Er([br()],Ar.prototype,"variant",void 0),Er([br()],Ar.prototype,"icon",void 0),Er([br({type:Boolean})],Ar.prototype,"dismissible",void 0);const Sr=(e,t,i=[])=>{const o=document.createElementNS("http://www.w3.org/2000/svg",e);return Object.keys(t).forEach((e=>{o.setAttribute(e,String(t[e]))})),i.length&&i.forEach((e=>{const t=Sr(...e);o.appendChild(t)})),o};const Or={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var Mr=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};const Cr={"alert-circle":["svg",Or,[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]]],"alert-triangle":["svg",Or,[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]]],"chevron-down":["svg",Or,[["path",{d:"m6 9 6 6 6-6"}]]],"chevron-right":["svg",Or,[["path",{d:"m9 18 6-6-6-6"}]]],"chevron-up":["svg",Or,[["path",{d:"m18 15-6-6-6 6"}]]],menu:["svg",Or,[["line",{x1:"4",x2:"20",y1:"12",y2:"12"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18"}]]],pencil:["svg",Or,[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"}],["path",{d:"m15 5 4 4"}]]],plus:["svg",Or,[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]]],"plus-circle":["svg",Or,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M8 12h8"}],["path",{d:"M12 8v8"}]]],"trash-2":["svg",Or,[["path",{d:"M3 6h18"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17"}]]],x:["svg",Or,[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]]],settings:["svg",Or,[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"}],["circle",{cx:"12",cy:"12",r:"3"}]]],"check-circle":["svg",Or,[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}],["polyline",{points:"22 4 12 14.01 9 11.01"}]]]};class Pr extends he{constructor(){super(...arguments),this.size=ue}render(){if(!this.icon||!Cr[this.icon])return console.error(`invalid icon: '${this.icon}'`),null;const e=(([e,t,i])=>Sr(e,t,i))(Cr[this.icon]);return e.setAttribute("width",this.size.value),e.setAttribute("height",this.size.value),e}}Pr.styles=h`
    :host {
      display: inline-flex;
    }
  `,Mr([br()],Pr.prototype,"size",void 0),Mr([br()],Pr.prototype,"icon",void 0),customElements.define("fds-icon",Pr),customElements.define("fds-alert",Ar);var jr,zr=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};!function(e){e.primary="primary",e.secondary="secondary",e.tertiary="tertiary",e.danger="danger"}(jr||(jr={}));const Dr={primary:Ko,secondary:qo,tertiary:qo,danger:Ko};class Rr extends he{constructor(){super(...arguments),this.variant=jr.primary,this.disabled=!1}render(){return q`
      <button class="button--${this.variant}" ?disabled="${this.disabled}">
        ${this.icon&&q`<fds-icon .icon="${this.icon}"></fds-icon>`}
        ${this.label&&q`<span class="ui-label-text">${this.label}</span>`}
      </button>
    `}}Rr.styles=[gr,h`
      :host {
        display: inline-flex;
        justify-content: center;
      }

      button {
        cursor: pointer;
        display: flex;
        border: 2px solid ${qo};
        border-radius: ${Ae};
        padding: 13px 16px;
        height: ${ke};
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
        border-color: ${qo};
        background: ${qo};
        color: ${Dr[jr.primary]};
      }

      .button--secondary {
        border: 2px solid ${qo};
        background: ${Ko};
        color: ${Dr[jr.secondary]};
      }

      .button--tertiary {
        background: transparent;
        border-color: transparent;
        color: ${Dr[jr.tertiary]};
      }

      .button--danger {
        background: ${Zo};
        border-color: transparent;
        color: ${Dr[jr.danger]};
      }

      .button--primary:hover,
      .button--secondary:hover,
      .button--tertiary:hover {
        background: ${er};
        border-color: transparent;
        color: ${Ko};
      }

      .button--danger:hover {
        background: ${Go};
        border-color: ${Go};
        color: ${Ko};
      }

      .button--primary:disabled {
        background: ${or};
        border-color: ${or};
        color: ${lr};
      }

      .button--secondary:disabled {
        background: transparent;
        color: ${or};
        border-color: ${or};
      }

      .button--tertiary:disabled {
        background: transparent;
        border-color: transparent;
        color: ${or};
      }

      .button--danger:disabled {
        background: ${or};
        border-color: transparent;
        color: ${lr};
      }
    `],zr([br()],Rr.prototype,"variant",void 0),zr([br({type:Boolean})],Rr.prototype,"disabled",void 0),zr([br()],Rr.prototype,"icon",void 0),zr([br()],Rr.prototype,"label",void 0),customElements.define("fds-button",Rr);var Lr,Nr=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};!function(e){e.none="none",e.low="low",e.high="high"}(Lr||(Lr={}));class Tr extends he{constructor(){super(...arguments),this.elevation=Lr.low}render(){return this.style.boxShadow=this.getElevationStyle(),q`
      <slot name="header">
        <div class="card__header">
          <h4 class="card__header-title heading-small-4-text">
            <slot name="header-title"></slot>
          </h4>
          <div class="card__header-corner" @click=${this.onClick}>
            <slot name="header-corner"></slot>
          </div>
        </div>
      </slot>
      <div class="card__content">
        <slot></slot>
      </div>
      <slot name="footer"></slot>
    `}getElevationStyle(){return this.elevation===Lr.none?"none":this.elevation===Lr.high?ye:ge}onClick(){this.dispatchEvent(new CustomEvent("corner-click"))}}Tr.styles=[fr,h`
      :host {
        display: block;
        background: white;
        width: 100%;
      }

      h4 {
        margin: 0;
      }

      .card__header {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        padding: ${we} ${_e} ${$e};
      }

      .card__content {
        padding: ${xe} ${_e};
      }
    `],Nr([br()],Tr.prototype,"elevation",void 0),customElements.define("fds-card",Tr);var Ir=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};class Hr extends he{constructor(){super(...arguments),this.label="",this.disabled=!1,this.checked=!1}render(){return q`
      <input
        type="checkbox"
        id="checkbox"
        .disabled=${this.disabled}
        .checked="${this.checked}"
        @change=${this.handleSelect}
      />
      ${this.label&&q`<label for="checkbox" class="ui-label-text">${this.label}</label>`}
    `}handleSelect(){this.disabled||(this.checked=!this.checked,setTimeout((()=>{this.dispatchEvent(new CustomEvent("select",{detail:this.checked}))})))}}Hr.styles=[gr,h`
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
        border: 2px solid ${qo};
        border-radius: ${Ee};
      }

      #checkbox:checked::before {
        border-color: ${er};
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEwIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0zLjM4Nzc2IDcuNDAzM0wwLjE0NjA2NiA0LjE2MTYxQy0wLjA0ODY4ODcgMy45NjY4NSAtMC4wNDg2ODg3IDMuNjUxMDggMC4xNDYwNjYgMy40NTYzMUwwLjg1MTM0OSAyLjc1MUMxLjA0NjEgMi41NTYyMyAxLjM2MTkgMi41NTYyMyAxLjU1NjY1IDIuNzUxTDMuNzQwNDEgNC45MzQ3NEw4LjQxNzc4IDAuMjU3Mzk0QzguNjEyNTQgMC4wNjI2Mzk0IDguOTI4MzMgMC4wNjI2Mzk0IDkuMTIzMDggMC4yNTczOTRMOS44MjgzNyAwLjk2MjY5NkMxMC4wMjMxIDEuMTU3NDUgMTAuMDIzMSAxLjQ3MzIyIDkuODI4MzcgMS42NjhMNC4wOTMwNiA3LjQwMzMyQzMuODk4MjkgNy41OTgwOCAzLjU4MjUxIDcuNTk4MDggMy4zODc3NiA3LjQwMzNWNy40MDMzWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==');
        background-color: ${er};
        background-repeat: no-repeat;
        background-position: center;
      }

      #checkbox:disabled::before,
      #checkbox:disabled + label {
        cursor: default;
        color: ${lr};
      }

      #checkbox:disabled::before {
        border-color: ${lr};
      }

      #checkbox:disabled#checkbox:checked::before {
        background-color: ${lr};
      }
    `],Ir([br()],Hr.prototype,"label",void 0),Ir([br()],Hr.prototype,"disabled",void 0),Ir([br()],Hr.prototype,"checked",void 0),customElements.define("fds-checkbox",Hr);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ur=e=>null!=e?e:Y;var Br=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};class Vr extends CustomEvent{constructor(e){super("select",{detail:e,bubbles:!0,cancelable:!0,composed:!1})}}class Wr extends he{constructor(){super(),this.value="",this.options=[],this.disabled=!1,this.error=!1,this.addNewIndicator=!1,this._open=!1,this.addEventListener("blur",(()=>{this._open=!1,this.dispatchEvent(new Vr(this.value))}))}render(){const e=this.options.filter((e=>{var t;return e.toLowerCase().includes(null===(t=this.value)||void 0===t?void 0:t.toLowerCase())})),t=q`
      <div
        @click=${()=>this.handleSelectFromList(this.value)}
        @keypress=${e=>this.handleOptionKeypress(e,this.value)}
        @mouseenter=${e=>this.addSelectedTo(e.target)}
        @mouseleave=${this.removeSelected}
        class="option new ui-label-text"
        tabindex=${0}
      >
        <fds-icon .icon=${"plus"}></fds-icon>Lisää "${this.value}"
      </div>
    `,i=q`
      <div id="options-list">
        ${e.map((e=>q`
            <div
              @click=${()=>this.handleSelectFromList(e)}
              @keypress=${t=>this.handleOptionKeypress(t,e)}
              @mouseenter=${e=>this.addSelectedTo(e.target)}
              @mouseleave=${this.removeSelected}
              class="option ui-label-text"
              tabindex=${0}
              aria-selected=${this.value===e}
            >
              ${e}
            </div>
          `))}
        ${this.addNewIndicator&&this.value?t:null}
      </div>
    `;return q`
      <div @click=${()=>this._open=!0} class=${`input-container ${this.getInputCssClass()}`}>
        <input
          type="text"
          class="ui-label-text"
          .value=${this.value}
          @input=${this.handleInput}
          @keydown=${this.handleInputKeydown}
          placeholder=${Ur(this.placeholder)}
          aria-haspopup=${!0}
          aria-expanded=${this._open}
        />
        <fds-icon .icon=${this._open?"chevron-up":"chevron-down"}></fds-icon>
      </div>
      ${this._open?i:null}
    `}handleInput(e){const t=e.target;this.value=t.value}handleOptionKeypress(e,t){"Enter"===e.key&&this.handleSelectFromList(t)}handleSelectFromList(e){this.value=e,this.blur()}handleInputKeydown(e){const{shadowRoot:t}=this;if(!t)return;this._open=!0;const i=t.querySelector(".selected");if("Escape"===e.key){this._open=!1;e.target.select()}"Enter"===e.key&&(i&&!i.classList.contains("new")&&i.textContent&&(this.value=i.textContent.trim()),this.blur()),"ArrowUp"===e.key?(e.preventDefault(),i?this.addSelectedTo(i.previousElementSibling):this.addSelectedTo(t.querySelector(".option:last-child")),this.scrollToView()):"ArrowDown"===e.key?(e.preventDefault(),i?this.addSelectedTo(i.nextElementSibling):this.addSelectedTo(t.querySelector(".option:first-child")),this.scrollToView()):this.removeSelected()}scrollToView(){var e,t;null===(t=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(".selected"))||void 0===t||t.scrollIntoView({behavior:"auto",inline:"nearest",block:"nearest"})}removeSelected(){this.shadowRoot&&this.shadowRoot.querySelectorAll(".selected").forEach((e=>e.classList.remove("selected")))}addSelectedTo(e){this.removeSelected(),e&&e.classList.add("selected")}getInputCssClass(){return this.disabled?"disabled":this.error?"error":!this.value&&this.placeholder?"placeholder":""}}Wr.styles=[gr,h`
      :host {
        width: 100%;
        position: relative;
      }

      .input-container {
        cursor: pointer;
        box-sizing: border-box;
        display: inline-flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        white-space: nowrap;

        width: 100%;
        /* TODO: what values? */
        height: 46px; // element should be total of 48px (same as dropdown), children has 1px border
      }

      .input-container > input {
        width: inherit;
        height: inherit;
        text-overflow: ellipsis;
        padding-top: 0px;
        padding-bottom: 0px;
        padding-left: 16px;
        padding-right: 40px; // icon 24px + 8px padding for left and right
        background-color: ${Ko};
        border: 1px solid ${rr};
      }

      .input-container > fds-icon {
        pointer-events: none;
        position: absolute;
        right: 8px;
        color: ${pr};
      }

      .input-container.disabled {
        pointer-events: none;
      }

      .input-container.disabled > input {
        cursor: default;
        background-color: ${ir};
        color: ${lr};
      }

      .input-container.error > input {
        color: ${Qo};
        border: 3px solid ${Qo};
      }

      input::placeholder {
        color: ${lr};
      }

      #options-list {
        cursor: pointer;
        display: block;
        position: absolute;
        z-index: 1;
        overflow-y: scroll;

        min-width: 100%;
        max-width: fit-content;
        /* TODO: what value? */
        max-height: 80vw;

        box-shadow: ${Se};
      }

      .option {
        display: flex;
        align-items: center;
        white-space: nowrap;

        /* TODO: what values? */
        height: 56px;
        padding-left: 16px;
        padding-right: 8px;

        background-color: ${Ko};
        border-bottom: 1px solid ${rr};
      }

      .option.selected {
        /* TODO: what color? */
        background-color: ${Xo};
      }

      .option.new {
        color: ${tr};
        gap: 10px;
      }
    `],Br([br()],Wr.prototype,"value",void 0),Br([br()],Wr.prototype,"options",void 0),Br([br()],Wr.prototype,"disabled",void 0),Br([br()],Wr.prototype,"error",void 0),Br([br()],Wr.prototype,"placeholder",void 0),Br([br()],Wr.prototype,"addNewIndicator",void 0),Br([$r()],Wr.prototype,"_open",void 0),customElements.define("fds-combobox",Wr);var Fr=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};class qr extends he{constructor(){super(),this.modal=!1,this.overlay=!1,this.addEventListener("click",(({target:e})=>{this.modal&&e===this&&this.dispatchEvent(new CustomEvent("outside-modal-click"))}))}updated(e){var t,i,o,r;super.updated(e),e.has("modal")&&this.modal!==e.get("modal")&&(null===(t=this.dialog)||void 0===t||t.close(),this.modal?null===(i=this.dialog)||void 0===i||i.showModal():null===(o=this.dialog)||void 0===o||o.show()),null===(r=this.overlayElement)||void 0===r||r.then((e=>{var t;const[i]=null!==(t=this.slots)&&void 0!==t?t:[];if(e&&i){const{width:t,height:o}=i.getBoundingClientRect();e.style.width=this.overlaySizeStyle(t),e.style.height=this.overlaySizeStyle(o),e.style.pointerEvents=this.overlay?"auto":"none",e.style.opacity=this.overlay?"0.5":"0",i.inert=this.overlay}}))}render(){return q`
      <dialog style="${this.style.cssText}" @cancel=${e=>e.preventDefault()}>
        <div class="overlay" inert></div>
        <slot></slot>
      </dialog>
    `}overlaySizeStyle(e){return`calc(${e}px + ${Ae})`}}qr.styles=h`
    dialog {
      border-radius: ${Ae};
      border: none;
      box-shadow: ${Oe};
      padding: calc(${Ae} / 2);
      overflow: visible;
      outline: none;
    }

    .overlay {
      position: fixed;
      margin: calc(${Ae} / -2);
      border-radius: ${Ae};
      background-color: ${qo};
      pointer-events: none;
      transition: opacity 0.2s ease;
      opacity: 0;
      z-index: 2;
    }
  `,Fr([br()],qr.prototype,"modal",void 0),Fr([br()],qr.prototype,"overlay",void 0),Fr([function(e){return xr({descriptor:t=>{const i={get(){var t,i;return null!==(i=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e))&&void 0!==i?i:null},enumerable:!0,configurable:!0};return i}})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */("dialog")],qr.prototype,"dialog",void 0),Fr([function(e){const{slot:t,selector:i}={};return xr({descriptor:o=>({get(){var o;const r="slot"+(t?`[name=${t}]`:":not([name])"),n=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(r),a=null!=n?_r(n,e):[];return i?a.filter((e=>e.matches(i))):a},enumerable:!0,configurable:!0})})}()],qr.prototype,"slots",void 0),Fr([function(e){return xr({descriptor:t=>({async get(){var t;return await this.updateComplete,null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e)},enumerable:!0,configurable:!0})})}(".overlay")],qr.prototype,"overlayElement",void 0),customElements.define("fds-dialog",qr);var Kr=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};class Yr extends he{constructor(){super(...arguments),this.color=me}render(){return q`<div style="border-top: 1px solid ${be(this.color)}"></div>`}}Kr([br({type:Object})],Yr.prototype,"color",void 0),customElements.define("fds-divider",Yr);var Qr=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};class Zr extends CustomEvent{constructor(e){super("select",{detail:e,bubbles:!0,cancelable:!0,composed:!1})}}class Gr extends he{constructor(){super(),this.options=[],this.disabled=!1,this.error=!1,this._open=!1,this.addEventListener("blur",(()=>this._open=!1))}firstUpdated(){this.tabIndex=0}render(){var e;const t=q`
      <div class="options-list">
        ${this.options.map((e=>q`
            <div
              @click=${()=>this.handleSelect(e)}
              @keypress=${t=>this.handleKeypress(t,e)}
              class=${`ui-label-text option ${this.getOptionCssClass(e)}`}
              tabindex=${0}
              aria-selected=${this.value===e}
            >
              ${this.getLabel(e)}
            </div>
          `))}
      </div>
    `;return q`
      <button
        @click=${()=>this._open=!this._open}
        ?disabled=${this.disabled}
        class=${`ui-label-text ${this.getButtonCssClass()}`}
        aria-haspopup=${!0}
        aria-expanded=${this._open}
      >
        <div>${null!==(e=this.getLabel(this.value))&&void 0!==e?e:this.placeholder}</div>
        <fds-icon .icon=${this._open?"chevron-up":"chevron-down"}></fds-icon>
      </button>
      ${this._open?t:null}
    `}handleKeypress(e,t){"Enter"===e.key&&this.handleSelect(t)}handleSelect(e){this._open=!1,this.value=e,this.dispatchEvent(new Zr(e))}getLabel(e){if(!e)return null;const t=q`<span class="label">${e.label}</span>`;return e.icon?q`<span class="icon-label"><fds-icon .icon=${e.icon}></fds-icon>${t}</span>`:t}getButtonCssClass(){return this.error?"error":!this.value&&this.placeholder?"placeholder":""}getOptionCssClass(e){return this.value===e?"selected":""}}Gr.styles=[gr,h`
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

        background-color: ${Ko};
        border: 1px solid ${rr};
      }

      button:disabled {
        cursor: default;
        background-color: ${ir};
        color: ${lr};
      }

      button:disabled .chevron {
        color: ${lr};
      }

      button.placeholder {
        color: ${lr};
      }

      button.error {
        color: ${Qo};
        border: 3px solid ${Qo};
      }

      .options-list {
        cursor: pointer;
        display: block;
        position: absolute;
        z-index: 1;
        overflow-y: scroll;

        min-width: 100%;
        max-width: fit-content;
        /* TODO: what value? */
        max-height: 80vw;

        box-shadow: ${Se};
      }

      fds-icon {
        position: static;
        color: ${pr};
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

        background-color: ${Ko};
        border-bottom: 1px solid ${rr};
      }

      .option:hover {
        /* TODO: what color? */
        background-color: ${Xo};
      }

      .option.selected {
        /* TODO: what color? */
        background-color: ${er};
      }
    `],Qr([br()],Gr.prototype,"options",void 0),Qr([br()],Gr.prototype,"disabled",void 0),Qr([br()],Gr.prototype,"error",void 0),Qr([br()],Gr.prototype,"placeholder",void 0),Qr([br()],Gr.prototype,"value",void 0),Qr([$r()],Gr.prototype,"_open",void 0),customElements.define("fds-dropdown",Gr);var Jr=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};class Xr extends he{constructor(){super(...arguments),this.value="",this.error=!1,this.disabled=!1}render(){return q`
      ${this.label&&q`<label for="input" class="input-label ui-label-text">${this.label}</label>`}
      <div class="input-container ui-label-text">
        <input
          type="text"
          id="input"
          placeholder=${Ur(this.placeholder)}
          class="ui-label-text ${this.error?"input--error":""}"
          .value=${this.value}
          ?disabled=${this.disabled}
          @input=${this.handleChange}
        />
      </div>
      ${this.message&&q`<span class="input-message ui-helper-text ${this.error?"input-message--error":""}"
        >${this.message}</span
      >`}
    `}handleChange(e){const t=e.target;this.dispatchEvent(new CustomEvent("change",{detail:t.value,bubbles:!0,cancelable:!0,composed:!1}))}}Xr.styles=[gr,ur,h`
      :host {
        display: flex;
        flex-direction: column;
      }

      .input-label {
        padding-bottom: 8px;
        color: ${pr};
      }

      .input-container {
        display: inline-flex;
      }

      input {
        width: 100%;
        height: 46px;
        text-overflow: ellipsis;
        padding: 0px 16px;
        background-color: ${Ko};
        border: 1px solid ${rr};
        border-radius: 4px;
        color: ${pr};
      }

      input ::placeholder {
        color: ${lr};
      }

      input:disabled {
        border-color: ${rr};
        color: ${lr};
        background-color: ${ir};
      }

      .input--error {
        border: 3px solid ${Qo};
        color: ${Qo};
      }

      .input-message {
        padding-top: 8px;
        color: ${dr};
      }

      .input-message--error {
        color: ${Qo};
      }
    `],Jr([br()],Xr.prototype,"value",void 0),Jr([br()],Xr.prototype,"label",void 0),Jr([br()],Xr.prototype,"placeholder",void 0),Jr([br()],Xr.prototype,"message",void 0),Jr([br()],Xr.prototype,"error",void 0),Jr([br()],Xr.prototype,"disabled",void 0),customElements.define("fds-input",Xr);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const en=1;let tn=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const on="important",rn=" !"+on,nn=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends tn{constructor(e){var t;if(super(e),e.type!==en||"style"!==e.name||(null===(t=e.strings)||void 0===t?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce(((t,i)=>{const o=e[i];return null==o?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`}),"")}update(e,[t]){const{style:i}=e.element;if(void 0===this.ht){this.ht=new Set;for(const e in t)this.ht.add(e);return this.render(t)}this.ht.forEach((e=>{null==t[e]&&(this.ht.delete(e),e.includes("-")?i.removeProperty(e):i[e]="")}));for(const e in t){const o=t[e];if(null!=o){this.ht.add(e);const t="string"==typeof o&&o.endsWith(rn);e.includes("-")||t?i.setProperty(e,t?o.slice(0,-11):o,t?on:""):i[e]=o}}return K}});var an,sn,ln=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};!function(e){e.primary="primary",e.secondary="secondary"}(an||(an={})),function(e){e.left="left",e.right="right"}(sn||(sn={}));class dn extends he{constructor(){super(...arguments),this.variant=an.primary,this.items=[],this.verticalMenuNavText="",this.verticalMenuThreshold=768,this._open=!1}connectedCallback(){super.connectedCallback(),f(this.shadowRoot,[dn.cssVariables,gr,dn.collapsedNavigationStyles,this.desktopStyles()])}render(){const e=this.items.filter((e=>e.position===sn.right)),t=this.items.filter((e=>e.position!==sn.right));return q` <div class="navigation-wrapper">
      <div class="navigation navigation--${this.variant} ui-label-text">
        ${this.variant===an.primary?q` <div class="navigation__header">
              <slot></slot>
            </div>`:Y}
        <ul class="navigation__body ${this._open?"navigation__open":""}">
          ${t.map((e=>this.renderItem(e))).concat(e.map(((e,t)=>this.renderItem(e,0===t?"item__first-right":""))))}
        </ul>
        <div class="navigation__button-wrapper">${this.renderNavigationButton()}</div>
      </div>
    </div>`}renderNavigationButton(){let e;switch(this.variant){case an.primary:e=this._open?q`<fds-icon icon="chevron-up"></fds-icon>`:q`<fds-icon icon="chevron-down"></fds-icon>`;break;case an.secondary:e=q`<fds-icon icon="menu"></fds-icon>`}return q`
      <button
        class="navigation__button navigation__button--${this.variant}"
        type="button"
        @click=${this.handleNavigationClick}
      >
        <span class="navigation__label ui-label-text">${this.verticalMenuNavText}</span>
        ${e}
      </button>
    `}handleNavigationClick(){this._open=!this._open}renderItem(e,t=""){var i;const o=null!==(i=e.verticalMenuOrder)&&void 0!==i?i:0;return q` <li
      @click=${()=>this.handleSelect(e)}
      class="item ${this.selected===e?"item--active":""} ${t}"
      style=${nn({order:o})}
    >
      <div class="item__label">
        ${e.icon&&q`<fds-icon class="item__icon" .icon="${e.icon}"></fds-icon>`}
        <span>${e.label}</span>
      </div>
    </li>`}handleSelect(e){this.selected=e,this.dispatchEvent(new CustomEvent("select",{detail:e}))}desktopStyles(){return h`
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
          border-bottom: var(--element-vertical-padding--primary) solid ${Ko};
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
    `}}dn.cssVariables=h`
    :host {
      --element-vertical-padding--primary: 9px;
      --element-vertical-padding--secondary: 16px;
      --element-horizontal-padding--primary: 20px;
      --item-border-bottom-width--secondary: 3px;
    }
  `,dn.collapsedNavigationStyles=h`
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
      background-color: ${qo};
      color: ${Ko};
    }

    .navigation--primary .item:hover {
      color: ${lr};
    }

    .navigation--primary .navigation__open .item--active .item__label:after {
      content: '';
      position: relative;
      align-self: center;
      height: 0;
      margin-left: auto;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-right: var(--element-vertical-padding--primary) solid ${Ko};
    }

    .navigation--secondary {
      background-color: ${Ko};
      border-bottom: 1px solid ${qo};
    }

    .navigation--secondary .item {
      border-bottom: 1px solid ${or};
    }

    .navigation--secondary .item:hover {
      color: ${lr};
    }

    .navigation__open {
      height: auto;
      width: 100%;
      visibility: visible;
      opacity: 1;
      overflow-y: visible;
      margin-left: 0;
      margin-top: 0;

      border-top: 1px solid ${or};
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
      background-color: ${qo};
      color: ${Ko};
      padding: var(--element-vertical-padding--primary);
    }

    .navigation__button--primary:hover {
      color: ${lr};
    }

    .navigation__button--secondary {
      background-color: ${Ko};
      color: ${qo};
      padding: var(--element-vertical-padding--secondary);
    }

    .navigation__button--secondary:hover {
      color: ${lr};
    }

    .navigation__label {
      margin-right: 10px;
    }
  `,dn.styles=[dn.cssVariables,gr,dn.collapsedNavigationStyles],ln([br()],dn.prototype,"variant",void 0),ln([br()],dn.prototype,"items",void 0),ln([br()],dn.prototype,"selected",void 0),ln([br({attribute:"vertical-menu-nav-text"})],dn.prototype,"verticalMenuNavText",void 0),ln([br({type:Number,attribute:"vertical-menu-threshold"})],dn.prototype,"verticalMenuThreshold",void 0),ln([$r()],dn.prototype,"_open",void 0),customElements.define("fds-navigation",dn);var pn="top",cn="bottom",hn="right",fn="left",un="auto",gn=[pn,cn,hn,fn],yn="start",vn="end",mn="clippingParents",bn="viewport",$n="popper",xn="reference",wn=gn.reduce((function(e,t){return e.concat([t+"-"+yn,t+"-"+vn])}),[]),_n=[].concat(gn,[un]).reduce((function(e,t){return e.concat([t,t+"-"+yn,t+"-"+vn])}),[]),kn=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function En(e){return e?(e.nodeName||"").toLowerCase():null}function An(e){if(null==e)return window;if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function Sn(e){return e instanceof An(e).Element||e instanceof Element}function On(e){return e instanceof An(e).HTMLElement||e instanceof HTMLElement}function Mn(e){return"undefined"!=typeof ShadowRoot&&(e instanceof An(e).ShadowRoot||e instanceof ShadowRoot)}var Cn={name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach((function(e){var i=t.styles[e]||{},o=t.attributes[e]||{},r=t.elements[e];On(r)&&En(r)&&(Object.assign(r.style,i),Object.keys(o).forEach((function(e){var t=o[e];!1===t?r.removeAttribute(e):r.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,i={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,i.popper),t.styles=i,t.elements.arrow&&Object.assign(t.elements.arrow.style,i.arrow),function(){Object.keys(t.elements).forEach((function(e){var o=t.elements[e],r=t.attributes[e]||{},n=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:i[e]).reduce((function(e,t){return e[t]="",e}),{});On(o)&&En(o)&&(Object.assign(o.style,n),Object.keys(r).forEach((function(e){o.removeAttribute(e)})))}))}},requires:["computeStyles"]};function Pn(e){return e.split("-")[0]}var jn=Math.max,zn=Math.min,Dn=Math.round;function Rn(){var e=navigator.userAgentData;return null!=e&&e.brands&&Array.isArray(e.brands)?e.brands.map((function(e){return e.brand+"/"+e.version})).join(" "):navigator.userAgent}function Ln(){return!/^((?!chrome|android).)*safari/i.test(Rn())}function Nn(e,t,i){void 0===t&&(t=!1),void 0===i&&(i=!1);var o=e.getBoundingClientRect(),r=1,n=1;t&&On(e)&&(r=e.offsetWidth>0&&Dn(o.width)/e.offsetWidth||1,n=e.offsetHeight>0&&Dn(o.height)/e.offsetHeight||1);var a=(Sn(e)?An(e):window).visualViewport,s=!Ln()&&i,l=(o.left+(s&&a?a.offsetLeft:0))/r,d=(o.top+(s&&a?a.offsetTop:0))/n,p=o.width/r,c=o.height/n;return{width:p,height:c,top:d,right:l+p,bottom:d+c,left:l,x:l,y:d}}function Tn(e){var t=Nn(e),i=e.offsetWidth,o=e.offsetHeight;return Math.abs(t.width-i)<=1&&(i=t.width),Math.abs(t.height-o)<=1&&(o=t.height),{x:e.offsetLeft,y:e.offsetTop,width:i,height:o}}function In(e,t){var i=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(i&&Mn(i)){var o=t;do{if(o&&e.isSameNode(o))return!0;o=o.parentNode||o.host}while(o)}return!1}function Hn(e){return An(e).getComputedStyle(e)}function Un(e){return["table","td","th"].indexOf(En(e))>=0}function Bn(e){return((Sn(e)?e.ownerDocument:e.document)||window.document).documentElement}function Vn(e){return"html"===En(e)?e:e.assignedSlot||e.parentNode||(Mn(e)?e.host:null)||Bn(e)}function Wn(e){return On(e)&&"fixed"!==Hn(e).position?e.offsetParent:null}function Fn(e){for(var t=An(e),i=Wn(e);i&&Un(i)&&"static"===Hn(i).position;)i=Wn(i);return i&&("html"===En(i)||"body"===En(i)&&"static"===Hn(i).position)?t:i||function(e){var t=/firefox/i.test(Rn());if(/Trident/i.test(Rn())&&On(e)&&"fixed"===Hn(e).position)return null;var i=Vn(e);for(Mn(i)&&(i=i.host);On(i)&&["html","body"].indexOf(En(i))<0;){var o=Hn(i);if("none"!==o.transform||"none"!==o.perspective||"paint"===o.contain||-1!==["transform","perspective"].indexOf(o.willChange)||t&&"filter"===o.willChange||t&&o.filter&&"none"!==o.filter)return i;i=i.parentNode}return null}(e)||t}function qn(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function Kn(e,t,i){return jn(e,zn(t,i))}function Yn(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function Qn(e,t){return t.reduce((function(t,i){return t[i]=e,t}),{})}var Zn={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,i=e.state,o=e.name,r=e.options,n=i.elements.arrow,a=i.modifiersData.popperOffsets,s=Pn(i.placement),l=qn(s),d=[fn,hn].indexOf(s)>=0?"height":"width";if(n&&a){var p=function(e,t){return Yn("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:Qn(e,gn))}(r.padding,i),c=Tn(n),h="y"===l?pn:fn,f="y"===l?cn:hn,u=i.rects.reference[d]+i.rects.reference[l]-a[l]-i.rects.popper[d],g=a[l]-i.rects.reference[l],y=Fn(n),v=y?"y"===l?y.clientHeight||0:y.clientWidth||0:0,m=u/2-g/2,b=p[h],$=v-c[d]-p[f],x=v/2-c[d]/2+m,w=Kn(b,x,$),_=l;i.modifiersData[o]=((t={})[_]=w,t.centerOffset=w-x,t)}},effect:function(e){var t=e.state,i=e.options.element,o=void 0===i?"[data-popper-arrow]":i;null!=o&&("string"!=typeof o||(o=t.elements.popper.querySelector(o)))&&In(t.elements.popper,o)&&(t.elements.arrow=o)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Gn(e){return e.split("-")[1]}var Jn={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Xn(e){var t,i=e.popper,o=e.popperRect,r=e.placement,n=e.variation,a=e.offsets,s=e.position,l=e.gpuAcceleration,d=e.adaptive,p=e.roundOffsets,c=e.isFixed,h=a.x,f=void 0===h?0:h,u=a.y,g=void 0===u?0:u,y="function"==typeof p?p({x:f,y:g}):{x:f,y:g};f=y.x,g=y.y;var v=a.hasOwnProperty("x"),m=a.hasOwnProperty("y"),b=fn,$=pn,x=window;if(d){var w=Fn(i),_="clientHeight",k="clientWidth";if(w===An(i)&&"static"!==Hn(w=Bn(i)).position&&"absolute"===s&&(_="scrollHeight",k="scrollWidth"),r===pn||(r===fn||r===hn)&&n===vn)$=cn,g-=(c&&w===x&&x.visualViewport?x.visualViewport.height:w[_])-o.height,g*=l?1:-1;if(r===fn||(r===pn||r===cn)&&n===vn)b=hn,f-=(c&&w===x&&x.visualViewport?x.visualViewport.width:w[k])-o.width,f*=l?1:-1}var E,A=Object.assign({position:s},d&&Jn),S=!0===p?function(e,t){var i=e.x,o=e.y,r=t.devicePixelRatio||1;return{x:Dn(i*r)/r||0,y:Dn(o*r)/r||0}}({x:f,y:g},An(i)):{x:f,y:g};return f=S.x,g=S.y,l?Object.assign({},A,((E={})[$]=m?"0":"",E[b]=v?"0":"",E.transform=(x.devicePixelRatio||1)<=1?"translate("+f+"px, "+g+"px)":"translate3d("+f+"px, "+g+"px, 0)",E)):Object.assign({},A,((t={})[$]=m?g+"px":"",t[b]=v?f+"px":"",t.transform="",t))}var ea={passive:!0};var ta={left:"right",right:"left",bottom:"top",top:"bottom"};function ia(e){return e.replace(/left|right|bottom|top/g,(function(e){return ta[e]}))}var oa={start:"end",end:"start"};function ra(e){return e.replace(/start|end/g,(function(e){return oa[e]}))}function na(e){var t=An(e);return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function aa(e){return Nn(Bn(e)).left+na(e).scrollLeft}function sa(e){var t=Hn(e),i=t.overflow,o=t.overflowX,r=t.overflowY;return/auto|scroll|overlay|hidden/.test(i+r+o)}function la(e){return["html","body","#document"].indexOf(En(e))>=0?e.ownerDocument.body:On(e)&&sa(e)?e:la(Vn(e))}function da(e,t){var i;void 0===t&&(t=[]);var o=la(e),r=o===(null==(i=e.ownerDocument)?void 0:i.body),n=An(o),a=r?[n].concat(n.visualViewport||[],sa(o)?o:[]):o,s=t.concat(a);return r?s:s.concat(da(Vn(a)))}function pa(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function ca(e,t,i){return t===bn?pa(function(e,t){var i=An(e),o=Bn(e),r=i.visualViewport,n=o.clientWidth,a=o.clientHeight,s=0,l=0;if(r){n=r.width,a=r.height;var d=Ln();(d||!d&&"fixed"===t)&&(s=r.offsetLeft,l=r.offsetTop)}return{width:n,height:a,x:s+aa(e),y:l}}(e,i)):Sn(t)?function(e,t){var i=Nn(e,!1,"fixed"===t);return i.top=i.top+e.clientTop,i.left=i.left+e.clientLeft,i.bottom=i.top+e.clientHeight,i.right=i.left+e.clientWidth,i.width=e.clientWidth,i.height=e.clientHeight,i.x=i.left,i.y=i.top,i}(t,i):pa(function(e){var t,i=Bn(e),o=na(e),r=null==(t=e.ownerDocument)?void 0:t.body,n=jn(i.scrollWidth,i.clientWidth,r?r.scrollWidth:0,r?r.clientWidth:0),a=jn(i.scrollHeight,i.clientHeight,r?r.scrollHeight:0,r?r.clientHeight:0),s=-o.scrollLeft+aa(e),l=-o.scrollTop;return"rtl"===Hn(r||i).direction&&(s+=jn(i.clientWidth,r?r.clientWidth:0)-n),{width:n,height:a,x:s,y:l}}(Bn(e)))}function ha(e,t,i,o){var r="clippingParents"===t?function(e){var t=da(Vn(e)),i=["absolute","fixed"].indexOf(Hn(e).position)>=0&&On(e)?Fn(e):e;return Sn(i)?t.filter((function(e){return Sn(e)&&In(e,i)&&"body"!==En(e)})):[]}(e):[].concat(t),n=[].concat(r,[i]),a=n[0],s=n.reduce((function(t,i){var r=ca(e,i,o);return t.top=jn(r.top,t.top),t.right=zn(r.right,t.right),t.bottom=zn(r.bottom,t.bottom),t.left=jn(r.left,t.left),t}),ca(e,a,o));return s.width=s.right-s.left,s.height=s.bottom-s.top,s.x=s.left,s.y=s.top,s}function fa(e){var t,i=e.reference,o=e.element,r=e.placement,n=r?Pn(r):null,a=r?Gn(r):null,s=i.x+i.width/2-o.width/2,l=i.y+i.height/2-o.height/2;switch(n){case pn:t={x:s,y:i.y-o.height};break;case cn:t={x:s,y:i.y+i.height};break;case hn:t={x:i.x+i.width,y:l};break;case fn:t={x:i.x-o.width,y:l};break;default:t={x:i.x,y:i.y}}var d=n?qn(n):null;if(null!=d){var p="y"===d?"height":"width";switch(a){case yn:t[d]=t[d]-(i[p]/2-o[p]/2);break;case vn:t[d]=t[d]+(i[p]/2-o[p]/2)}}return t}function ua(e,t){void 0===t&&(t={});var i=t,o=i.placement,r=void 0===o?e.placement:o,n=i.strategy,a=void 0===n?e.strategy:n,s=i.boundary,l=void 0===s?mn:s,d=i.rootBoundary,p=void 0===d?bn:d,c=i.elementContext,h=void 0===c?$n:c,f=i.altBoundary,u=void 0!==f&&f,g=i.padding,y=void 0===g?0:g,v=Yn("number"!=typeof y?y:Qn(y,gn)),m=h===$n?xn:$n,b=e.rects.popper,$=e.elements[u?m:h],x=ha(Sn($)?$:$.contextElement||Bn(e.elements.popper),l,p,a),w=Nn(e.elements.reference),_=fa({reference:w,element:b,strategy:"absolute",placement:r}),k=pa(Object.assign({},b,_)),E=h===$n?k:w,A={top:x.top-E.top+v.top,bottom:E.bottom-x.bottom+v.bottom,left:x.left-E.left+v.left,right:E.right-x.right+v.right},S=e.modifiersData.offset;if(h===$n&&S){var O=S[r];Object.keys(A).forEach((function(e){var t=[hn,cn].indexOf(e)>=0?1:-1,i=[pn,cn].indexOf(e)>=0?"y":"x";A[e]+=O[i]*t}))}return A}function ga(e,t){void 0===t&&(t={});var i=t,o=i.placement,r=i.boundary,n=i.rootBoundary,a=i.padding,s=i.flipVariations,l=i.allowedAutoPlacements,d=void 0===l?_n:l,p=Gn(o),c=p?s?wn:wn.filter((function(e){return Gn(e)===p})):gn,h=c.filter((function(e){return d.indexOf(e)>=0}));0===h.length&&(h=c);var f=h.reduce((function(t,i){return t[i]=ua(e,{placement:i,boundary:r,rootBoundary:n,padding:a})[Pn(i)],t}),{});return Object.keys(f).sort((function(e,t){return f[e]-f[t]}))}var ya={name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,i=e.options,o=e.name;if(!t.modifiersData[o]._skip){for(var r=i.mainAxis,n=void 0===r||r,a=i.altAxis,s=void 0===a||a,l=i.fallbackPlacements,d=i.padding,p=i.boundary,c=i.rootBoundary,h=i.altBoundary,f=i.flipVariations,u=void 0===f||f,g=i.allowedAutoPlacements,y=t.options.placement,v=Pn(y),m=l||(v===y||!u?[ia(y)]:function(e){if(Pn(e)===un)return[];var t=ia(e);return[ra(e),t,ra(t)]}(y)),b=[y].concat(m).reduce((function(e,i){return e.concat(Pn(i)===un?ga(t,{placement:i,boundary:p,rootBoundary:c,padding:d,flipVariations:u,allowedAutoPlacements:g}):i)}),[]),$=t.rects.reference,x=t.rects.popper,w=new Map,_=!0,k=b[0],E=0;E<b.length;E++){var A=b[E],S=Pn(A),O=Gn(A)===yn,M=[pn,cn].indexOf(S)>=0,C=M?"width":"height",P=ua(t,{placement:A,boundary:p,rootBoundary:c,altBoundary:h,padding:d}),j=M?O?hn:fn:O?cn:pn;$[C]>x[C]&&(j=ia(j));var z=ia(j),D=[];if(n&&D.push(P[S]<=0),s&&D.push(P[j]<=0,P[z]<=0),D.every((function(e){return e}))){k=A,_=!1;break}w.set(A,D)}if(_)for(var R=function(e){var t=b.find((function(t){var i=w.get(t);if(i)return i.slice(0,e).every((function(e){return e}))}));if(t)return k=t,"break"},L=u?3:1;L>0;L--){if("break"===R(L))break}t.placement!==k&&(t.modifiersData[o]._skip=!0,t.placement=k,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}};function va(e,t,i){return void 0===i&&(i={x:0,y:0}),{top:e.top-t.height-i.y,right:e.right-t.width+i.x,bottom:e.bottom-t.height+i.y,left:e.left-t.width-i.x}}function ma(e){return[pn,hn,cn,fn].some((function(t){return e[t]>=0}))}var ba={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,i=e.options,o=e.name,r=i.offset,n=void 0===r?[0,0]:r,a=_n.reduce((function(e,i){return e[i]=function(e,t,i){var o=Pn(e),r=[fn,pn].indexOf(o)>=0?-1:1,n="function"==typeof i?i(Object.assign({},t,{placement:e})):i,a=n[0],s=n[1];return a=a||0,s=(s||0)*r,[fn,hn].indexOf(o)>=0?{x:s,y:a}:{x:a,y:s}}(i,t.rects,n),e}),{}),s=a[t.placement],l=s.x,d=s.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=l,t.modifiersData.popperOffsets.y+=d),t.modifiersData[o]=a}};var $a={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,i=e.options,o=e.name,r=i.mainAxis,n=void 0===r||r,a=i.altAxis,s=void 0!==a&&a,l=i.boundary,d=i.rootBoundary,p=i.altBoundary,c=i.padding,h=i.tether,f=void 0===h||h,u=i.tetherOffset,g=void 0===u?0:u,y=ua(t,{boundary:l,rootBoundary:d,padding:c,altBoundary:p}),v=Pn(t.placement),m=Gn(t.placement),b=!m,$=qn(v),x="x"===$?"y":"x",w=t.modifiersData.popperOffsets,_=t.rects.reference,k=t.rects.popper,E="function"==typeof g?g(Object.assign({},t.rects,{placement:t.placement})):g,A="number"==typeof E?{mainAxis:E,altAxis:E}:Object.assign({mainAxis:0,altAxis:0},E),S=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,O={x:0,y:0};if(w){if(n){var M,C="y"===$?pn:fn,P="y"===$?cn:hn,j="y"===$?"height":"width",z=w[$],D=z+y[C],R=z-y[P],L=f?-k[j]/2:0,N=m===yn?_[j]:k[j],T=m===yn?-k[j]:-_[j],I=t.elements.arrow,H=f&&I?Tn(I):{width:0,height:0},U=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},B=U[C],V=U[P],W=Kn(0,_[j],H[j]),F=b?_[j]/2-L-W-B-A.mainAxis:N-W-B-A.mainAxis,q=b?-_[j]/2+L+W+V+A.mainAxis:T+W+V+A.mainAxis,K=t.elements.arrow&&Fn(t.elements.arrow),Y=K?"y"===$?K.clientTop||0:K.clientLeft||0:0,Q=null!=(M=null==S?void 0:S[$])?M:0,Z=z+q-Q,G=Kn(f?zn(D,z+F-Q-Y):D,z,f?jn(R,Z):R);w[$]=G,O[$]=G-z}if(s){var J,X="x"===$?pn:fn,ee="x"===$?cn:hn,te=w[x],ie="y"===x?"height":"width",oe=te+y[X],re=te-y[ee],ne=-1!==[pn,fn].indexOf(v),ae=null!=(J=null==S?void 0:S[x])?J:0,se=ne?oe:te-_[ie]-k[ie]-ae+A.altAxis,le=ne?te+_[ie]+k[ie]-ae-A.altAxis:re,de=f&&ne?function(e,t,i){var o=Kn(e,t,i);return o>i?i:o}(se,te,le):Kn(f?se:oe,te,f?le:re);w[x]=de,O[x]=de-te}t.modifiersData[o]=O}},requiresIfExists:["offset"]};function xa(e,t,i){void 0===i&&(i=!1);var o,r,n=On(t),a=On(t)&&function(e){var t=e.getBoundingClientRect(),i=Dn(t.width)/e.offsetWidth||1,o=Dn(t.height)/e.offsetHeight||1;return 1!==i||1!==o}(t),s=Bn(t),l=Nn(e,a,i),d={scrollLeft:0,scrollTop:0},p={x:0,y:0};return(n||!n&&!i)&&(("body"!==En(t)||sa(s))&&(d=(o=t)!==An(o)&&On(o)?{scrollLeft:(r=o).scrollLeft,scrollTop:r.scrollTop}:na(o)),On(t)?((p=Nn(t,!0)).x+=t.clientLeft,p.y+=t.clientTop):s&&(p.x=aa(s))),{x:l.left+d.scrollLeft-p.x,y:l.top+d.scrollTop-p.y,width:l.width,height:l.height}}function wa(e){var t=new Map,i=new Set,o=[];function r(e){i.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!i.has(e)){var o=t.get(e);o&&r(o)}})),o.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){i.has(e.name)||r(e)})),o}var _a={placement:"bottom",modifiers:[],strategy:"absolute"};function ka(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function Ea(e){void 0===e&&(e={});var t=e,i=t.defaultModifiers,o=void 0===i?[]:i,r=t.defaultOptions,n=void 0===r?_a:r;return function(e,t,i){void 0===i&&(i=n);var r,a,s={placement:"bottom",orderedModifiers:[],options:Object.assign({},_a,n),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},l=[],d=!1,p={state:s,setOptions:function(i){var r="function"==typeof i?i(s.options):i;c(),s.options=Object.assign({},n,s.options,r),s.scrollParents={reference:Sn(e)?da(e):e.contextElement?da(e.contextElement):[],popper:da(t)};var a,d,h=function(e){var t=wa(e);return kn.reduce((function(e,i){return e.concat(t.filter((function(e){return e.phase===i})))}),[])}((a=[].concat(o,s.options.modifiers),d=a.reduce((function(e,t){var i=e[t.name];return e[t.name]=i?Object.assign({},i,t,{options:Object.assign({},i.options,t.options),data:Object.assign({},i.data,t.data)}):t,e}),{}),Object.keys(d).map((function(e){return d[e]}))));return s.orderedModifiers=h.filter((function(e){return e.enabled})),s.orderedModifiers.forEach((function(e){var t=e.name,i=e.options,o=void 0===i?{}:i,r=e.effect;if("function"==typeof r){var n=r({state:s,name:t,instance:p,options:o}),a=function(){};l.push(n||a)}})),p.update()},forceUpdate:function(){if(!d){var e=s.elements,t=e.reference,i=e.popper;if(ka(t,i)){s.rects={reference:xa(t,Fn(i),"fixed"===s.options.strategy),popper:Tn(i)},s.reset=!1,s.placement=s.options.placement,s.orderedModifiers.forEach((function(e){return s.modifiersData[e.name]=Object.assign({},e.data)}));for(var o=0;o<s.orderedModifiers.length;o++)if(!0!==s.reset){var r=s.orderedModifiers[o],n=r.fn,a=r.options,l=void 0===a?{}:a,c=r.name;"function"==typeof n&&(s=n({state:s,options:l,name:c,instance:p})||s)}else s.reset=!1,o=-1}}},update:(r=function(){return new Promise((function(e){p.forceUpdate(),e(s)}))},function(){return a||(a=new Promise((function(e){Promise.resolve().then((function(){a=void 0,e(r())}))}))),a}),destroy:function(){c(),d=!0}};if(!ka(e,t))return p;function c(){l.forEach((function(e){return e()})),l=[]}return p.setOptions(i).then((function(e){!d&&i.onFirstUpdate&&i.onFirstUpdate(e)})),p}}var Aa,Sa=Ea({defaultModifiers:[{name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,i=e.instance,o=e.options,r=o.scroll,n=void 0===r||r,a=o.resize,s=void 0===a||a,l=An(t.elements.popper),d=[].concat(t.scrollParents.reference,t.scrollParents.popper);return n&&d.forEach((function(e){e.addEventListener("scroll",i.update,ea)})),s&&l.addEventListener("resize",i.update,ea),function(){n&&d.forEach((function(e){e.removeEventListener("scroll",i.update,ea)})),s&&l.removeEventListener("resize",i.update,ea)}},data:{}},{name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,i=e.name;t.modifiersData[i]=fa({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},{name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,i=e.options,o=i.gpuAcceleration,r=void 0===o||o,n=i.adaptive,a=void 0===n||n,s=i.roundOffsets,l=void 0===s||s,d={placement:Pn(t.placement),variation:Gn(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:r,isFixed:"fixed"===t.options.strategy};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,Xn(Object.assign({},d,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:l})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,Xn(Object.assign({},d,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:l})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},Cn,ba,ya,$a,Zn,{name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,i=e.name,o=t.rects.reference,r=t.rects.popper,n=t.modifiersData.preventOverflow,a=ua(t,{elementContext:"reference"}),s=ua(t,{altBoundary:!0}),l=va(a,o),d=va(s,r,n),p=ma(l),c=ma(d);t.modifiersData[i]={referenceClippingOffsets:l,popperEscapeOffsets:d,isReferenceHidden:p,hasPopperEscaped:c},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":c})}}]}),Oa=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};!function(e){e.above="above",e.below="below",e.left="left",e.right="right"}(Aa||(Aa={}));class Ma extends he{constructor(){super(...arguments),this.position=Aa.above,this.openOnClick=!1,this.backgroundColor=ve,this._open=!1,this._clickListener=()=>{this._open=!this._open},this._mouseEnterListener=()=>{this._open=!0},this._mouseLeaveListener=()=>{this._open=!1}}updated(e){var t,i,o;super.updated(e);const r=null===(i=null===(t=this.shadowRoot)||void 0===t?void 0:t.children)||void 0===i?void 0:i.item(0);this._popper?(e.get("position")&&(null===(o=this._popper)||void 0===o||o.setOptions({placement:Ca(this.position)})),null!=e.get("openOnClick")&&(this.removeListeners(),this.addListeners()),e.get("backgroundColor")&&(r.style.backgroundColor=be(this.backgroundColor).toString())):(this._popper=Sa(this.parentElement,r,{modifiers:[{name:"offset",options:{offset:[0,8]},enabled:!0}],strategy:"fixed",placement:Ca(this.position)}),r.style.backgroundColor=be(this.backgroundColor).toString(),this.addListeners()),this._popper.update()}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._popper)||void 0===e||e.destroy()}addListeners(){var e,t,i;this.openOnClick?null===(e=this.parentElement)||void 0===e||e.addEventListener("click",this._clickListener):(null===(t=this.parentElement)||void 0===t||t.addEventListener("mouseenter",this._mouseEnterListener),null===(i=this.parentElement)||void 0===i||i.addEventListener("mouseleave",this._mouseLeaveListener))}removeListeners(){var e,t,i;null===(e=this.parentElement)||void 0===e||e.removeEventListener("click",this._clickListener),null===(t=this.parentElement)||void 0===t||t.removeEventListener("mouseenter",this._mouseEnterListener),null===(i=this.parentElement)||void 0===i||i.removeEventListener("mouseleave",this._mouseLeaveListener)}render(){return q`<div class="ui-helper-text popover${this._open?" popover-open":""}">
      <slot></slot>
      <div class="arrow" data-popper-arrow></div>
    </div>`}}function Ca(e){switch(e){case Aa.above:return pn;case Aa.below:return cn;case Aa.left:return fn;default:return hn}}Ma.styles=[ur,h`
      .popover {
        display: none;
        border-radius: ${Ae};
        box-shadow: ${Se};
        background-color: ${Ko};
      }

      .popover-open {
        display: inline !important;
      }

      .arrow,
      .arrow::before {
        position: absolute;
        width: 8px;
        height: 8px;
        background: inherit;
      }

      .arrow {
        visibility: hidden;
      }

      .arrow::before {
        visibility: visible;
        content: '';
        transform: rotate(45deg);
      }

      .popover[data-popper-placement^='top'] > .arrow {
        bottom: -4px;
      }

      .popover[data-popper-placement^='bottom'] > .arrow {
        top: -4px;
      }

      .popover[data-popper-placement^='left'] > .arrow {
        right: -4px;
      }

      .popover[data-popper-placement^='right'] > .arrow {
        left: -4px;
      }
    `],Oa([br()],Ma.prototype,"position",void 0),Oa([br()],Ma.prototype,"openOnClick",void 0),Oa([br()],Ma.prototype,"backgroundColor",void 0),Oa([$r()],Ma.prototype,"_open",void 0),customElements.define("fds-popover",Ma);var Pa=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};class ja extends he{constructor(){super(...arguments),this.striped=!0,this.items=[],this.renderHeader=()=>Y,this.renderItem=()=>Y}render(){return q`
      <table class="ui-helper-text">
        <thead>
          ${this.renderHeader()}
        </thead>
        <tbody class="${this.striped?"table-rows--striped":"table-rows--separator"}">
          ${this.items.map((e=>this.renderItem(e)))}
        </tbody>
      </table>
    `}}ja.styles=[h`
      :host {
        --fds-typography-ui-helper-display: table;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      thead {
        background: ${nr};
        color: ${Ko};
        position: sticky;
        top: 0;
      }

      tbody {
        background: ${Ko};
      }

      thead tr {
        height: 40px;
      }

      tbody tr {
        height: 39px;
        border-bottom: 1px solid transparent;
      }

      th,
      td {
        text-align: left;
        padding: 0 8px;
        font-size: 16px;
      }

      .table-rows--separator tr {
        border-bottom: 1px solid ${rr};
      }

      .table-rows--striped tr:nth-child(even) {
        background: ${ir};
      }

      ${ur}
    `],Pa([br()],ja.prototype,"striped",void 0),Pa([br()],ja.prototype,"items",void 0),Pa([br()],ja.prototype,"renderHeader",void 0),Pa([br()],ja.prototype,"renderItem",void 0),customElements.define("fds-table",ja);const za={label:"Digitraffic",value:"digitraffic"},Da=[{label:"Liikennetilanne",value:"liikennetilanne",url:"https://liikennetilanne.fintraffic.fi/"},{label:"Palauteväylä",value:"palautevayla",url:"https://www.palautevayla.fi/aspa?lang=fi"},{label:"Junalähdöt",value:"junalahdot",url:"https://junalahdot.fintraffic.fi/"},{label:"Drone-palvelut",value:"dronepalvelut",url:"https://skynavx.fi/#/drone"},za,{label:"Digitransit",value:"digitransit",url:"https://digitransit.fi/"},{label:"Reittiopas",value:"reittiopas",url:"https://opas.matka.fi/"},{label:"NAP",value:"nap",url:"https://finap.fi/#/"}];document.addEventListener("DOMContentLoaded",(function(){(()=>{const e=document.getElementById("top-navigation");e.variant=an.primary,e.items=Da,e.selected=za,e.verticalMenuNavText="Services",e.addEventListener("select",(e=>{const t=e.detail;t.value===za.value?window.location.href=window.location.origin:window.location.href=t.url}))})()}));
