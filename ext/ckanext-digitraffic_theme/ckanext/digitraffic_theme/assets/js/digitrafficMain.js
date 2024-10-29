const t={name:"fds-size-3",value:"24px"},e=class{get shadowRoot(){return this.__host.__shadowRoot}constructor(t){this.ariaAtomic="",this.ariaAutoComplete="",this.ariaBrailleLabel="",this.ariaBrailleRoleDescription="",this.ariaBusy="",this.ariaChecked="",this.ariaColCount="",this.ariaColIndex="",this.ariaColSpan="",this.ariaCurrent="",this.ariaDescription="",this.ariaDisabled="",this.ariaExpanded="",this.ariaHasPopup="",this.ariaHidden="",this.ariaInvalid="",this.ariaKeyShortcuts="",this.ariaLabel="",this.ariaLevel="",this.ariaLive="",this.ariaModal="",this.ariaMultiLine="",this.ariaMultiSelectable="",this.ariaOrientation="",this.ariaPlaceholder="",this.ariaPosInSet="",this.ariaPressed="",this.ariaReadOnly="",this.ariaRequired="",this.ariaRoleDescription="",this.ariaRowCount="",this.ariaRowIndex="",this.ariaRowSpan="",this.ariaSelected="",this.ariaSetSize="",this.ariaSort="",this.ariaValueMax="",this.ariaValueMin="",this.ariaValueNow="",this.ariaValueText="",this.role="",this.form=null,this.labels=[],this.states=new Set,this.validationMessage="",this.validity={},this.willValidate=!0,this.__host=t}checkValidity(){return console.warn("`ElementInternals.checkValidity()` was called on the server.This method always returns true."),!0}reportValidity(){return!0}setFormValue(){}setValidity(){}},i=new WeakMap,a=t=>{let e=i.get(t);return void 0===e&&i.set(t,e=new Map),e},n=class{constructor(){this.__shadowRootMode=null,this.__shadowRoot=null,this.__internals=null}get attributes(){return Array.from(a(this)).map((([t,e])=>({name:t,value:e})))}get shadowRoot(){return"closed"===this.__shadowRootMode?null:this.__shadowRoot}get localName(){return this.constructor.__localName}get tagName(){return this.localName?.toUpperCase()}setAttribute(t,e){a(this).set(t,String(e))}removeAttribute(t){a(this).delete(t)}toggleAttribute(t,e){return this.hasAttribute(t)?!(void 0===e||!e)||(this.removeAttribute(t),!1):!(void 0!==e&&!e)&&(this.setAttribute(t,""),!0)}hasAttribute(t){return a(this).has(t)}attachShadow(t){const e={host:this};return this.__shadowRootMode=t.mode,t&&"open"===t.mode&&(this.__shadowRoot=e),e}attachInternals(){if(null!==this.__internals)throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");const t=new e(this);return this.__internals=t,t}getAttribute(t){return a(this).get(t)??null}},s=class extends n{},r=new class{constructor(){this.__definitions=new Map}define(t,e){if(this.__definitions.has(t)){if("development"!==process.env.NODE_ENV)throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the name "${t}" has already been used with this registry`);console.warn(`'CustomElementRegistry' already has "${t}" defined. This may have been caused by live reload or hot module replacement in which case it can be safely ignored.\nMake sure to test your application with a production build as repeat registrations will throw in production.`)}e.__localName=t,this.__definitions.set(t,{ctor:e,observedAttributes:e.observedAttributes??[]})}get(t){const e=this.__definitions.get(t);return e?.ctor}},o=globalThis,l=o.ShadowRoot&&(void 0===o.ShadyCSS||o.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,h=Symbol(),d=new WeakMap;
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let p=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==h)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(l&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=d.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&d.set(e,t))}return t}toString(){return this.cssText}};const c=t=>new p("string"==typeof t?t:t+"",void 0,h),g=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,a)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[a+1]),t[0]);return new p(i,t,h)},y=(t,e)=>{l?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style"),a=o.litNonce;void 0!==a&&i.setAttribute("nonce",a),i.textContent=e.cssText,t.appendChild(i)}))},f=l||void 0===o.CSSStyleSheet?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return c(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var u,v;const m=globalThis;null!==(u=m.customElements)&&void 0!==u||(m.customElements=r);const _=m.trustedTypes,b=_?_.emptyScript:"",w=m.reactiveElementPolyfillSupport,x={toAttribute(t,e){switch(e){case Boolean:t=t?b:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},A=(t,e)=>e!==t&&(e==e||t==t),S={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:A},k="finalized";let E=class extends(globalThis.HTMLElement??s){constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const a=this._$Ep(i,e);void 0!==a&&(this._$Ev.set(a,i),t.push(a))})),t}static createProperty(t,e=S){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,a=this.getPropertyDescriptor(t,i,e);void 0!==a&&Object.defineProperty(this.prototype,t,a)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(a){const n=this[t];this[e]=a,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||S}static finalize(){if(this.hasOwnProperty(k))return!1;this[k]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(f(t))}else void 0!==t&&e.push(f(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return y(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=S){var a;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==(null===(a=i.converter)||void 0===a?void 0:a.toAttribute)?i.converter:x).toAttribute(e,i.type);this._$El=t,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$El=null}}_$AK(t,e){var i;const a=this.constructor,n=a._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=a.getPropertyOptions(n),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:x;this._$El=n,this[n]=s.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let a=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||A)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):a=!1),!this.isUpdatePending&&a&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var C;E[k]=!0,E.elementProperties=new Map,E.elementStyles=[],E.shadowRootOptions={mode:"open"},null==w||w({ReactiveElement:E}),(null!==(v=m.reactiveElementVersions)&&void 0!==v?v:m.reactiveElementVersions=[]).push("1.6.3");const M=globalThis,P=M.trustedTypes,z=P?P.createPolicy("lit-html",{createHTML:t=>t}):void 0,N="$lit$",R=`lit$${(Math.random()+"").slice(9)}$`,T="?"+R,U=`<${T}>`,H=void 0===M.document?{createTreeWalker:()=>({})}:document,O=()=>H.createComment(""),L=t=>null===t||"object"!=typeof t&&"function"!=typeof t,D=Array.isArray,j="[ \t\n\f\r]",B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,V=/-->/g,I=/>/g,W=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),K=/'/g,q=/"/g,Z=/^(?:script|style|textarea|title)$/i,F=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),J=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),Q=new WeakMap,Y=H.createTreeWalker(H,129,null,!1);function X(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==z?z.createHTML(e):e}const tt=(t,e)=>{const i=t.length-1,a=[];let n,s=2===e?"<svg>":"",r=B;for(let e=0;e<i;e++){const i=t[e];let o,l,h=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===B?"!--"===l[1]?r=V:void 0!==l[1]?r=I:void 0!==l[2]?(Z.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=W):void 0!==l[3]&&(r=W):r===W?">"===l[0]?(r=null!=n?n:B,h=-1):void 0===l[1]?h=-2:(h=r.lastIndex-l[2].length,o=l[1],r=void 0===l[3]?W:'"'===l[3]?q:K):r===q||r===K?r=W:r===V||r===I?r=B:(r=W,n=void 0);const p=r===W&&t[e+1].startsWith("/>")?" ":"";s+=r===B?i+U:h>=0?(a.push(o),i.slice(0,h)+N+i.slice(h)+R+p):i+R+(-2===h?(a.push(void 0),e):p)}return[X(t,s+(t[i]||"<?>")+(2===e?"</svg>":"")),a]};class et{constructor({strings:t,_$litType$:e},i){let a;this.parts=[];let n=0,s=0;const r=t.length-1,o=this.parts,[l,h]=tt(t,e);if(this.el=et.createElement(l,i),Y.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(a=Y.nextNode())&&o.length<r;){if(1===a.nodeType){if(a.hasAttributes()){const t=[];for(const e of a.getAttributeNames())if(e.endsWith(N)||e.startsWith(R)){const i=h[s++];if(t.push(e),void 0!==i){const t=a.getAttribute(i.toLowerCase()+N).split(R),e=/([.?@])?(.*)/.exec(i);o.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?rt:"?"===e[1]?lt:"@"===e[1]?ht:st})}else o.push({type:6,index:n})}for(const e of t)a.removeAttribute(e)}if(Z.test(a.tagName)){const t=a.textContent.split(R),e=t.length-1;if(e>0){a.textContent=P?P.emptyScript:"";for(let i=0;i<e;i++)a.append(t[i],O()),Y.nextNode(),o.push({type:2,index:++n});a.append(t[e],O())}}}else if(8===a.nodeType)if(a.data===T)o.push({type:2,index:n});else{let t=-1;for(;-1!==(t=a.data.indexOf(R,t+1));)o.push({type:7,index:n}),t+=R.length-1}n++}}static createElement(t,e){const i=H.createElement("template");return i.innerHTML=t,i}}function it(t,e,i=t,a){var n,s,r,o;if(e===J)return e;let l=void 0!==a?null===(n=i._$Co)||void 0===n?void 0:n[a]:i._$Cl;const h=L(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==h&&(null===(s=null==l?void 0:l._$AO)||void 0===s||s.call(l,!1),void 0===h?l=void 0:(l=new h(t),l._$AT(t,i,a)),void 0!==a?(null!==(r=(o=i)._$Co)&&void 0!==r?r:o._$Co=[])[a]=l:i._$Cl=l),void 0!==l&&(e=it(t,l._$AS(t,e.values),l,a)),e}class at{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:a}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:H).importNode(i,!0);Y.currentNode=n;let s=Y.nextNode(),r=0,o=0,l=a[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new nt(s,s.nextSibling,this,t):1===l.type?e=new l.ctor(s,l.name,l.strings,this,t):6===l.type&&(e=new dt(s,this,t)),this._$AV.push(e),l=a[++o]}r!==(null==l?void 0:l.index)&&(s=Y.nextNode(),r++)}return Y.currentNode=H,n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class nt{constructor(t,e,i,a){var n;this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=a,this._$Cp=null===(n=null==a?void 0:a.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=it(this,t,e),L(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==J&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>D(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==G&&L(this._$AH)?this._$AA.nextSibling.data=t:this.$(H.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:a}=t,n="number"==typeof a?this._$AC(t):(void 0===a.el&&(a.el=et.createElement(X(a.h,a.h[0]),this.options)),a);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new at(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=Q.get(t.strings);return void 0===e&&Q.set(t.strings,e=new et(t)),e}T(t){D(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,a=0;for(const n of t)a===e.length?e.push(i=new nt(this.k(O()),this.k(O()),this,this.options)):i=e[a],i._$AI(n),a++;a<e.length&&(this._$AR(i&&i._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class st{constructor(t,e,i,a,n){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,a){const n=this.strings;let s=!1;if(void 0===n)t=it(this,t,e,0),s=!L(t)||t!==this._$AH&&t!==J,s&&(this._$AH=t);else{const a=t;let r,o;for(t=n[0],r=0;r<n.length-1;r++)o=it(this,a[i+r],e,r),o===J&&(o=this._$AH[r]),s||(s=!L(o)||o!==this._$AH[r]),o===G?t=G:t!==G&&(t+=(null!=o?o:"")+n[r+1]),this._$AH[r]=o}s&&!a&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class rt extends st{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}const ot=P?P.emptyScript:"";class lt extends st{constructor(){super(...arguments),this.type=4}j(t){t&&t!==G?this.element.setAttribute(this.name,ot):this.element.removeAttribute(this.name)}}class ht extends st{constructor(t,e,i,a,n){super(t,e,i,a,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=it(this,t,e,0))&&void 0!==i?i:G)===J)return;const a=this._$AH,n=t===G&&a!==G||t.capture!==a.capture||t.once!==a.once||t.passive!==a.passive,s=t!==G&&(a===G||n);n&&this.element.removeEventListener(this.name,this,a),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class dt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){it(this,t)}}const pt=M.litHtmlPolyfillSupport;null==pt||pt(et,nt),(null!==(C=M.litHtmlVersions)&&void 0!==C?C:M.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ct,gt;class yt extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var a,n;const s=null!==(a=null==i?void 0:i.renderBefore)&&void 0!==a?a:e;let r=s._$litPart$;if(void 0===r){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;s._$litPart$=r=new nt(e.insertBefore(O(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return J}}yt.finalized=!0,yt._$litElement$=!0,null===(ct=globalThis.litElementHydrateSupport)||void 0===ct||ct.call(globalThis,{LitElement:yt});const ft=globalThis.litElementPolyfillSupport;null==ft||ft({LitElement:yt}),(null!==(gt=globalThis.litElementVersions)&&void 0!==gt?gt:globalThis.litElementVersions=[]).push("3.3.3");const ut=c("var(--fds-typography-body-default-font-family, 'Public Sans')"),vt=c("var(--fds-typography-body-default-font-size, 16px)"),mt=c("var(--fds-typography-body-default-letter-spacing, 0px)"),$t=c("var(--fds-typography-body-default-line-height, 150%)"),_t=c("var(--fds-typography-body-default-font-weight, 400)"),bt=c("var(--fds-typography-body-default-display, inline-block)"),wt=c("var(--fds-typography-body-large-font-family, 'Public Sans')"),xt=c("var(--fds-typography-body-large-font-size, 18px)"),At=c("var(--fds-typography-body-large-letter-spacing, 0px)"),St=c("var(--fds-typography-body-large-line-height, 150%)"),kt=c("var(--fds-typography-body-large-font-weight, 400)"),Et=c("var(--fds-typography-body-large-display, inline-block)"),Ct=c("var(--fds-typography-body-micro-font-family, 'Public Sans')"),Mt=c("var(--fds-typography-body-micro-font-size, 12px)"),Pt=c("var(--fds-typography-body-micro-letter-spacing, 0px)"),zt=c("var(--fds-typography-body-micro-line-height, 150%)"),Nt=c("var(--fds-typography-body-micro-font-weight, 400)"),Rt=c("var(--fds-typography-body-micro-display, inline-block)"),Tt=c("var(--fds-typography-body-small-font-family, 'Public Sans')"),Ut=c("var(--fds-typography-body-small-font-size, 14px)"),Ht=c("var(--fds-typography-body-small-letter-spacing, 0px)"),Ot=c("var(--fds-typography-body-small-line-height, 150%)"),Lt=c("var(--fds-typography-body-small-font-weight, 400)"),Dt=c("var(--fds-typography-body-small-display, inline-block)"),jt=c("var(--fds-typography-emphasis-default-font-family, 'Public Sans')"),Bt=c("var(--fds-typography-emphasis-default-font-size, 16px)"),Vt=c("var(--fds-typography-emphasis-default-letter-spacing, 0px)"),It=c("var(--fds-typography-emphasis-default-line-height, 150%)"),Wt=c("var(--fds-typography-emphasis-default-font-weight, 700)"),Kt=c("var(--fds-typography-emphasis-default-display, inline-block)"),qt=c("var(--fds-typography-emphasis-large-font-family, 'Public Sans')"),Zt=c("var(--fds-typography-emphasis-large-font-size, 18px)"),Ft=c("var(--fds-typography-emphasis-large-letter-spacing, 0px)"),Jt=c("var(--fds-typography-emphasis-large-line-height, 150%)"),Gt=c("var(--fds-typography-emphasis-large-font-weight, 700)"),Qt=c("var(--fds-typography-emphasis-large-display, inline-block)"),Yt=c("var(--fds-typography-emphasis-micro-font-family, 'Public Sans')"),Xt=c("var(--fds-typography-emphasis-micro-font-size, 12px)"),te=c("var(--fds-typography-emphasis-micro-letter-spacing, 0px)"),ee=c("var(--fds-typography-emphasis-micro-line-height, 150%)"),ie=c("var(--fds-typography-emphasis-micro-font-weight, 700)"),ae=c("var(--fds-typography-emphasis-micro-display, inline-block)"),ne=c("var(--fds-typography-emphasis-small-font-family, 'Public Sans')"),se=c("var(--fds-typography-emphasis-small-font-size, 14px)"),re=c("var(--fds-typography-emphasis-small-letter-spacing, 0px)"),oe=c("var(--fds-typography-emphasis-small-line-height, 150%)"),le=c("var(--fds-typography-emphasis-small-font-weight, 700)"),he=c("var(--fds-typography-emphasis-small-display, inline-block)"),de=c("var(--fds-typography-heading-large-heading-3-font-family, 'Public Sans', 'PublicSans-Bold')"),pe=c("var(--fds-typography-heading-large-heading-3-font-size, 40px)"),ce=c("var(--fds-typography-heading-large-heading-3-letter-spacing, 0px)"),ge=c("var(--fds-typography-heading-large-heading-3-line-height, 110%)"),ye=c("var(--fds-typography-heading-large-heading-3-font-weight, 700)"),fe=c("var(--fds-typography-heading-large-heading-3-display, inline-block)"),ue=c("var(--fds-typography-heading-large-heading-4-font-family, 'Public Sans', 'PublicSans-Bold')"),ve=c("var(--fds-typography-heading-large-heading-4-font-size, 32px)"),me=c("var(--fds-typography-heading-large-heading-4-letter-spacing, 0px)"),$e=c("var(--fds-typography-heading-large-heading-4-line-height, 110%)"),_e=c("var(--fds-typography-heading-large-heading-4-font-weight, 700)"),be=c("var(--fds-typography-heading-large-heading-4-display, inline-block)"),we=c("var(--fds-typography-heading-large-heading-5-font-family, 'Public Sans', 'PublicSans-Bold')"),xe=c("var(--fds-typography-heading-large-heading-5-font-size, 28px)"),Ae=c("var(--fds-typography-heading-large-heading-5-letter-spacing, 0px)"),Se=c("var(--fds-typography-heading-large-heading-5-line-height, 110%)"),ke=c("var(--fds-typography-heading-large-heading-5-font-weight, 700)"),Ee=c("var(--fds-typography-heading-large-heading-5-display, inline-block)"),Ce=c("var(--fds-typography-heading-large-heading-6-font-family, 'Public Sans', 'PublicSans-Bold')"),Me=c("var(--fds-typography-heading-large-heading-6-font-size, 20px)"),Pe=c("var(--fds-typography-heading-large-heading-6-letter-spacing, 0px)"),ze=c("var(--fds-typography-heading-large-heading-6-line-height, 110%)"),Ne=c("var(--fds-typography-heading-large-heading-6-font-weight, 700)"),Re=c("var(--fds-typography-heading-large-heading-6-display, inline-block)"),Te=c("var(--fds-typography-heading-large-heading-1-font-family, 'Public Sans', 'PublicSans-Bold')"),Ue=c("var(--fds-typography-heading-large-heading-1-font-size, 64px)"),He=c("var(--fds-typography-heading-large-heading-1-letter-spacing, 0px)"),Oe=c("var(--fds-typography-heading-large-heading-1-line-height, 110%)"),Le=c("var(--fds-typography-heading-large-heading-1-font-weight, 700)"),De=c("var(--fds-typography-heading-large-heading-1-display, inline-block)"),je=c("var(--fds-typography-heading-large-heading-2-font-family, 'Public Sans', 'PublicSans-Bold')"),Be=c("var(--fds-typography-heading-large-heading-2-font-size, 48px)"),Ve=c("var(--fds-typography-heading-large-heading-2-letter-spacing, 0px)"),Ie=c("var(--fds-typography-heading-large-heading-2-line-height, 110%)"),We=c("var(--fds-typography-heading-large-heading-2-font-weight, 700)"),Ke=c("var(--fds-typography-heading-large-heading-2-display, inline-block)"),qe=c("var(--fds-typography-heading-small-heading-1-font-family, 'Public Sans', 'PublicSans-Bold')"),Ze=c("var(--fds-typography-heading-small-heading-1-font-size, 42px)"),Fe=c("var(--fds-typography-heading-small-heading-1-letter-spacing, 0px)"),Je=c("var(--fds-typography-heading-small-heading-1-line-height, 110%)"),Ge=c("var(--fds-typography-heading-small-heading-1-font-weight, 700)"),Qe=c("var(--fds-typography-heading-small-heading-1-display, inline-block)"),Ye=c("var(--fds-typography-heading-small-heading-2-font-family, 'Public Sans', 'PublicSans-Bold')"),Xe=c("var(--fds-typography-heading-small-heading-2-font-size, 32px)"),ti=c("var(--fds-typography-heading-small-heading-2-letter-spacing, 0px)"),ei=c("var(--fds-typography-heading-small-heading-2-line-height, 110%)"),ii=c("var(--fds-typography-heading-small-heading-2-font-weight, 700)"),ai=c("var(--fds-typography-heading-small-heading-2-display, inline-block)"),ni=c("var(--fds-typography-heading-small-heading-3-font-family, 'Public Sans', 'PublicSans-Bold')"),si=c("var(--fds-typography-heading-small-heading-3-font-size, 28px)"),ri=c("var(--fds-typography-heading-small-heading-3-letter-spacing, 0px)"),oi=c("var(--fds-typography-heading-small-heading-3-line-height, 110%)"),li=c("var(--fds-typography-heading-small-heading-3-font-weight, 700)"),hi=c("var(--fds-typography-heading-small-heading-3-display, inline-block)"),di=c("var(--fds-typography-heading-small-heading-4-font-family, 'Public Sans', 'PublicSans-Bold')"),pi=c("var(--fds-typography-heading-small-heading-4-font-size, 24px)"),ci=c("var(--fds-typography-heading-small-heading-4-letter-spacing, 0px)"),gi=c("var(--fds-typography-heading-small-heading-4-line-height, 110%)"),yi=c("var(--fds-typography-heading-small-heading-4-font-weight, 700)"),fi=c("var(--fds-typography-heading-small-heading-4-display, inline-block)"),ui=c("var(--fds-typography-heading-small-heading-5-font-family, 'Public Sans', 'PublicSans-Bold')"),vi=c("var(--fds-typography-heading-small-heading-5-font-size, 18px)"),mi=c("var(--fds-typography-heading-small-heading-5-letter-spacing, 0px)"),$i=c("var(--fds-typography-heading-small-heading-5-line-height, 110%)"),_i=c("var(--fds-typography-heading-small-heading-5-font-weight, 700)"),bi=c("var(--fds-typography-heading-small-heading-5-display, inline-block)"),wi=c("var(--fds-typography-heading-small-heading-6-font-family, 'Public Sans', 'PublicSans-Bold')"),xi=c("var(--fds-typography-heading-small-heading-6-font-size, 16px)"),Ai=c("var(--fds-typography-heading-small-heading-6-letter-spacing, 0px)"),Si=c("var(--fds-typography-heading-small-heading-6-line-height, 110%)"),ki=c("var(--fds-typography-heading-small-heading-6-font-weight, 700)"),Ei=c("var(--fds-typography-heading-small-heading-6-display, inline-block)"),Ci=c("var(--fds-typography-link-large-font-family, 'Public Sans')"),Mi=c("var(--fds-typography-link-large-font-size, 18px)"),Pi=c("var(--fds-typography-link-large-letter-spacing, 0px)"),zi=c("var(--fds-typography-link-large-line-height, 150%)"),Ni=c("var(--fds-typography-link-large-font-weight, 400)"),Ri=c("var(--fds-typography-link-large-text-decoration, underline)"),Ti=c("var(--fds-typography-link-large-display, inline-block)"),Ui=c("var(--fds-typography-link-micro-font-family, 'Public Sans')"),Hi=c("var(--fds-typography-link-micro-font-size, 12px)"),Oi=c("var(--fds-typography-link-micro-letter-spacing, 0px)"),Li=c("var(--fds-typography-link-micro-line-height, 150%)"),Di=c("var(--fds-typography-link-micro-font-weight, 400)"),ji=c("var(--fds-typography-link-micro-text-decoration, underline)"),Bi=c("var(--fds-typography-link-micro-display, inline-block)"),Vi=c("var(--fds-typography-link-small-font-family, 'Public Sans')"),Ii=c("var(--fds-typography-link-small-font-size, 14px)"),Wi=c("var(--fds-typography-link-small-letter-spacing, 0px)"),Ki=c("var(--fds-typography-link-small-line-height, 150%)"),qi=c("var(--fds-typography-link-small-font-weight, 400)"),Zi=c("var(--fds-typography-link-small-text-decoration, underline)"),Fi=c("var(--fds-typography-link-small-display, inline-block)"),Ji=c("var(--fds-typography-link-default-font-family, 'Public Sans')"),Gi=c("var(--fds-typography-link-default-font-size, 16px)"),Qi=c("var(--fds-typography-link-default-letter-spacing, 0px)"),Yi=c("var(--fds-typography-link-default-line-height, 150%)"),Xi=c("var(--fds-typography-link-default-font-weight, 400)"),ta=c("var(--fds-typography-link-default-text-decoration, underline)"),ea=c("var(--fds-typography-link-default-display, inline-block)"),ia=c("var(--fds-typography-ui-helper-font-family, 'Public Sans', 'PublicSans-Regular')"),aa=c("var(--fds-typography-ui-helper-font-size, 15px)"),na=c("var(--fds-typography-ui-helper-letter-spacing, 0px)"),sa=c("var(--fds-typography-ui-helper-line-height, 100%)"),ra=c("var(--fds-typography-ui-helper-font-weight, 400)"),oa=c("var(--fds-typography-ui-helper-display, inline-block)"),la=c("var(--fds-typography-ui-id-font-family, 'Roboto Mono')"),ha=c("var(--fds-typography-ui-id-font-size, 13px)"),da=c("var(--fds-typography-ui-id-letter-spacing, 0px)"),pa=c("var(--fds-typography-ui-id-line-height, 100%)"),ca=c("var(--fds-typography-ui-id-font-weight, 700)"),ga=c("var(--fds-typography-ui-id-display, inline-block)"),ya=c("var(--fds-typography-ui-label-font-family, 'Public Sans', 'PublicSans-Medium')"),fa=c("var(--fds-typography-ui-label-font-size, 16px)"),ua=c("var(--fds-typography-ui-label-letter-spacing, 0px)"),va=c("var(--fds-typography-ui-label-line-height, 22px)"),ma=c("var(--fds-typography-ui-label-font-weight, 500)"),$a=c("var(--fds-typography-ui-label-display, inline-block)"),_a=c("var(--fds-typography-ui-placeholder-font-family, 'Public Sans', 'PublicSans-Medium')"),ba=c("var(--fds-typography-ui-placeholder-font-size, 16px)"),wa=c("var(--fds-typography-ui-placeholder-letter-spacing, 0px)"),xa=c("var(--fds-typography-ui-placeholder-line-height, 100%)"),Aa=c("var(--fds-typography-ui-placeholder-font-weight, 500)"),Sa=c("var(--fds-typography-ui-placeholder-display, inline-block)"),ka=c("var(--fds-typography-ui-tag-font-family, 'Public Sans', 'PublicSans-Bold')"),Ea=c("var(--fds-typography-ui-tag-font-size, 16px)"),Ca=c("var(--fds-typography-ui-tag-letter-spacing, 0px)"),Ma=c("var(--fds-typography-ui-tag-line-height, 100%)"),Pa=c("var(--fds-typography-ui-tag-font-weight, 700)"),za=c("var(--fds-typography-ui-tag-display, inline-block)"),Na=c("var(--fds-color-brand-black, #000000)"),Ra=c("var(--fds-color-brand-white, #ffffff)"),Ta=c("var(--fds-color-neutral-100, #cdcdd7)"),Ua=c("var(--fds-color-text-300, #9696aa)");g`
  .body-default-text {
    display: ${bt};
    font-family: ${ut};
    font-size: ${vt};
    font-weight: ${_t};
    letter-spacing: ${mt};
    line-height: ${$t};
  }
`,g`
  .body-large-text {
    display: ${Et};
    font-family: ${wt};
    font-size: ${xt};
    font-weight: ${kt};
    letter-spacing: ${At};
    line-height: ${St};
  }
`,g`
  .body-micro-text {
    display: ${Rt};
    font-family: ${Ct};
    font-size: ${Mt};
    font-weight: ${Nt};
    letter-spacing: ${Pt};
    line-height: ${zt};
  }
`,g`
  .body-small-text {
    display: ${Dt};
    font-family: ${Tt};
    font-size: ${Ut};
    font-weight: ${Lt};
    letter-spacing: ${Ht};
    line-height: ${Ot};
  }
`,g`
  .emphasis-default-text {
    display: ${Kt};
    font-family: ${jt};
    font-size: ${Bt};
    font-weight: ${Wt};
    letter-spacing: ${Vt};
    line-height: ${It};
  }
`,g`
  .emphasis-large-text {
    display: ${Qt};
    font-family: ${qt};
    font-size: ${Zt};
    font-weight: ${Gt};
    letter-spacing: ${Ft};
    line-height: ${Jt};
  }
`,g`
  .emphasis-micro-text {
    display: ${ae};
    font-family: ${Yt};
    font-size: ${Xt};
    font-weight: ${ie};
    letter-spacing: ${te};
    line-height: ${ee};
  }
`,g`
  .emphasis-small-text {
    display: ${he};
    font-family: ${ne};
    font-size: ${se};
    font-weight: ${le};
    letter-spacing: ${re};
    line-height: ${oe};
  }
`,g`
  .heading-large-1-text {
    display: ${De};
    font-family: ${Te};
    font-size: ${Ue};
    font-weight: ${Le};
    letter-spacing: ${He};
    line-height: ${Oe};
  }
`,g`
  .heading-large-2-text {
    display: ${Ke};
    font-family: ${je};
    font-size: ${Be};
    font-weight: ${We};
    letter-spacing: ${Ve};
    line-height: ${Ie};
  }
`,g`
  .heading-large-3-text {
    display: ${fe};
    font-family: ${de};
    font-size: ${pe};
    font-weight: ${ye};
    letter-spacing: ${ce};
    line-height: ${ge};
  }
`,g`
  .heading-large-4-text {
    display: ${be};
    font-family: ${ue};
    font-size: ${ve};
    font-weight: ${_e};
    letter-spacing: ${me};
    line-height: ${$e};
  }
`,g`
  .heading-large-5-text {
    display: ${Ee};
    font-family: ${we};
    font-size: ${xe};
    font-weight: ${ke};
    letter-spacing: ${Ae};
    line-height: ${Se};
  }
`,g`
  .heading-large-6-text {
    display: ${Re};
    font-family: ${Ce};
    font-size: ${Me};
    font-weight: ${Ne};
    letter-spacing: ${Pe};
    line-height: ${ze};
  }
`,g`
  .heading-small-1-text {
    display: ${Qe};
    font-family: ${qe};
    font-size: ${Ze};
    font-weight: ${Ge};
    letter-spacing: ${Fe};
    line-height: ${Je};
  }
`,g`
  .heading-small-2-text {
    display: ${ai};
    font-family: ${Ye};
    font-size: ${Xe};
    font-weight: ${ii};
    letter-spacing: ${ti};
    line-height: ${ei};
  }
`,g`
  .heading-small-3-text {
    display: ${hi};
    font-family: ${ni};
    font-size: ${si};
    font-weight: ${li};
    letter-spacing: ${ri};
    line-height: ${oi};
  }
`,g`
  .heading-small-4-text {
    display: ${fi};
    font-family: ${di};
    font-size: ${pi};
    font-weight: ${yi};
    letter-spacing: ${ci};
    line-height: ${gi};
  }
`,g`
  .heading-small-5-text {
    display: ${bi};
    font-family: ${ui};
    font-size: ${vi};
    font-weight: ${_i};
    letter-spacing: ${mi};
    line-height: ${$i};
  }
`,g`
  .heading-small-6-text {
    display: ${Ei};
    font-family: ${wi};
    font-size: ${xi};
    font-weight: ${ki};
    letter-spacing: ${Ai};
    line-height: ${Si};
  }
`,g`
  .link-default-text {
    display: ${ea};
    font-family: ${Ji};
    font-size: ${Gi};
    font-weight: ${Xi};
    letter-spacing: ${Qi};
    line-height: ${Yi};
    text-decoration: ${ta};
  }
`,g`
  .link-large-text {
    display: ${Ti};
    font-family: ${Ci};
    font-size: ${Mi};
    font-weight: ${Ni};
    letter-spacing: ${Pi};
    line-height: ${zi};
    text-decoration: ${Ri};
  }
`,g`
  .link-micro-text {
    display: ${Bi};
    font-family: ${Ui};
    font-size: ${Hi};
    font-weight: ${Di};
    letter-spacing: ${Oi};
    line-height: ${Li};
    text-decoration: ${ji};
  }
`,g`
  .link-small-text {
    display: ${Fi};
    font-family: ${Vi};
    font-size: ${Ii};
    font-weight: ${qi};
    letter-spacing: ${Wi};
    line-height: ${Ki};
    text-decoration: ${Zi};
  }
`,g`
  .ui-helper-text {
    display: ${oa};
    font-family: ${ia};
    font-size: ${aa};
    font-weight: ${ra};
    letter-spacing: ${na};
    line-height: ${sa};
  }
`,g`
  .ui-id-text {
    display: ${ga};
    font-family: ${la};
    font-size: ${ha};
    font-weight: ${ca};
    letter-spacing: ${da};
    line-height: ${pa};
  }
`;const Ha=g`
  .ui-label-text {
    display: ${$a};
    font-family: ${ya};
    font-size: ${fa};
    font-weight: ${ma};
    letter-spacing: ${ua};
    line-height: ${va};
  }
`;g`
  .ui-placeholder-text {
    display: ${Sa};
    font-family: ${_a};
    font-size: ${ba};
    font-weight: ${Aa};
    letter-spacing: ${wa};
    line-height: ${xa};
  }
`,g`
  .ui-tag-text {
    display: ${za};
    font-family: ${ka};
    font-size: ${Ea};
    font-weight: ${Pa};
    letter-spacing: ${Ca};
    line-height: ${Ma};
  }
`
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;const Oa=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}},La=(t,e,i)=>{e.constructor.createProperty(i,t)};function Da(t){return(e,i)=>void 0!==i?La(t,e,i):Oa(t,e)
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
var ja;null===(ja=globalThis.HTMLSlotElement)||void 0===ja||ja.prototype.assignedElements;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ba=1;let Va=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ia="important",Wa=" !"+Ia,Ka=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends Va{constructor(t){var e;if(super(t),t.type!==Ba||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,i)=>{const a=t[i];return null==a?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${a};`}),"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ht){this.ht=new Set;for(const t in e)this.ht.add(t);return this.render(e)}this.ht.forEach((t=>{null==e[t]&&(this.ht.delete(t),t.includes("-")?i.removeProperty(t):i[t]="")}));for(const t in e){const a=e[t];if(null!=a){this.ht.add(t);const e="string"==typeof a&&a.endsWith(Wa);t.includes("-")||e?i.setProperty(t,e?a.slice(0,-11):a,e?Ia:""):i[t]=a}}return J}});var qa,Za,Fa=function(t,e,i,a){var n,s=arguments.length,r=s<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,a);else for(var o=t.length-1;o>=0;o--)(n=t[o])&&(r=(s<3?n(r):s>3?n(e,i,r):n(e,i))||r);return s>3&&r&&Object.defineProperty(e,i,r),r};!function(t){t.primary="primary",t.secondary="secondary"}(qa||(qa={})),function(t){t.left="left",t.right="right"}(Za||(Za={}));class Ja extends yt{constructor(){super(...arguments),this.variant=qa.primary,this.items=[],this.verticalMenuNavText="",this.verticalMenuThreshold=768,this._open=!1}connectedCallback(){super.connectedCallback(),y(this.shadowRoot,[Ja.cssVariables,Ha,Ja.collapsedNavigationStyles,this.desktopStyles()])}render(){const t=this.items.filter((t=>t.position===Za.right)),e=this.items.filter((t=>t.position!==Za.right));return F` <div class="navigation-wrapper">
      <div class="navigation navigation--${this.variant} ui-label-text">
        ${this.variant===qa.primary?F` <div class="navigation__header">
              <slot></slot>
            </div>`:G}
        <ul class="navigation__body ${this._open?"navigation__open":""}">
          ${e.map((t=>this.renderItem(t))).concat(t.map(((t,e)=>this.renderItem(t,0===e?"item__first-right":""))))}
        </ul>
        <div class="navigation__button-wrapper">${this.renderNavigationButton()}</div>
      </div>
    </div>`}renderNavigationButton(){let t;switch(this.variant){case qa.primary:t=this._open?F`<fds-icon icon="chevron-up"></fds-icon>`:F`<fds-icon icon="chevron-down"></fds-icon>`;break;case qa.secondary:t=F`<fds-icon icon="menu"></fds-icon>`}return F`
      <button
        class="navigation__button navigation__button--${this.variant}"
        type="button"
        @click=${this.handleNavigationClick}
      >
        <span class="navigation__label ui-label-text">${this.verticalMenuNavText}</span>
        ${t}
      </button>
    `}handleNavigationClick(){this._open=!this._open}renderItem(t,e=""){var i;const a=null!==(i=t.verticalMenuOrder)&&void 0!==i?i:0;return F` <li
      @click=${()=>this.handleSelect(t)}
      class="item ${this.selected===t?"item--active":""} ${e}"
      style=${Ka({order:a})}
    >
      <div class="item__label">
        ${t.icon&&F`<fds-icon class="item__icon" .icon="${t.icon}"></fds-icon>`}
        <span>${t.label}</span>
      </div>
    </li>`}handleSelect(t){this.selected=t,this.dispatchEvent(new CustomEvent("select",{detail:t}))}desktopStyles(){return g`
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
          border-bottom: var(--element-vertical-padding--primary) solid ${Ra};
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
    `}}Ja.cssVariables=g`
    :host {
      --element-vertical-padding--primary: 9px;
      --element-vertical-padding--secondary: 16px;
      --element-horizontal-padding--primary: 20px;
      --item-border-bottom-width--secondary: 3px;
    }
  `,Ja.collapsedNavigationStyles=g`
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
      background-color: ${Na};
      color: ${Ra};
    }

    .navigation--primary .item:hover {
      color: ${Ua};
    }

    .navigation--primary .navigation__open .item--active .item__label:after {
      content: '';
      position: relative;
      align-self: center;
      height: 0;
      margin-left: auto;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-right: var(--element-vertical-padding--primary) solid ${Ra};
    }

    .navigation--secondary {
      background-color: ${Ra};
      border-bottom: 1px solid ${Na};
    }

    .navigation--secondary .item {
      border-bottom: 1px solid ${Ta};
    }

    .navigation--secondary .item:hover {
      color: ${Ua};
    }

    .navigation__open {
      height: auto;
      width: 100%;
      visibility: visible;
      opacity: 1;
      overflow-y: visible;
      margin-left: 0;
      margin-top: 0;

      border-top: 1px solid ${Ta};
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
      background-color: ${Na};
      color: ${Ra};
      padding: var(--element-vertical-padding--primary);
    }

    .navigation__button--primary:hover {
      color: ${Ua};
    }

    .navigation__button--secondary {
      background-color: ${Ra};
      color: ${Na};
      padding: var(--element-vertical-padding--secondary);
    }

    .navigation__button--secondary:hover {
      color: ${Ua};
    }

    .navigation__label {
      margin-right: 10px;
    }
  `,Ja.styles=[Ja.cssVariables,Ha,Ja.collapsedNavigationStyles],Fa([Da()],Ja.prototype,"variant",void 0),Fa([Da()],Ja.prototype,"items",void 0),Fa([Da()],Ja.prototype,"selected",void 0),Fa([Da({attribute:"vertical-menu-nav-text"})],Ja.prototype,"verticalMenuNavText",void 0),Fa([Da({type:Number,attribute:"vertical-menu-threshold"})],Ja.prototype,"verticalMenuThreshold",void 0),Fa([function(t){return Da({...t,state:!0})}()],Ja.prototype,"_open",void 0);const Ga=(t,e,i=[])=>{const a=document.createElementNS("http://www.w3.org/2000/svg",t);return Object.keys(e).forEach((t=>{a.setAttribute(t,String(e[t]))})),i.length&&i.forEach((t=>{const e=Ga(...t);a.appendChild(e)})),a};var Qa=([t,e,i])=>Ga(t,e,i);const Ya=t=>"string"==typeof t?t:t&&t.class?t.class&&"string"==typeof t.class?t.class.split(" "):t.class&&Array.isArray(t.class)?t.class:"":"",Xa=(t,{nameAttr:e,icons:i,attrs:a})=>{const n=t.getAttribute(e);if(null==n)return;const s=i[n.replace(/(\w)(\w*)(_|-|\s*)/g,((t,e,i)=>e.toUpperCase()+i.toLowerCase()))];if(!s)return console.warn(`${t.outerHTML} icon name was not found in the provided icons object.`);const r=(t=>Array.from(t.attributes).reduce(((t,e)=>(t[e.name]=e.value,t)),{}))(t),[o,l,h]=s,d={...l,"data-lucide":n,...a,...r},p=["lucide",`lucide-${n}`,r,a].flatMap(Ya).map((t=>t.trim())).filter(Boolean).filter(((t,e,i)=>i.indexOf(t)===e)).join(" ");p&&Object.assign(d,{class:p});const c=Qa([o,d,h]);return t.parentNode?.replaceChild(c,t)},tn={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},en=["svg",tn,[["path",{d:"m6 9 6 6 6-6"}]]],an=["svg",tn,[["path",{d:"m18 15-6-6-6 6"}]]],nn=["svg",tn,[["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}],["polyline",{points:"15 3 21 3 21 9"}],["line",{x1:"10",x2:"21",y1:"14",y2:"3"}]]],sn=["svg",tn,[["path",{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"}]]],rn=["svg",tn,[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"2",x2:"22",y1:"12",y2:"12"}],["path",{d:"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"}]]],on=["svg",tn,[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5"}]]],ln=["svg",tn,[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}],["rect",{width:"4",height:"12",x:"2",y:"9"}],["circle",{cx:"4",cy:"4",r:"2"}]]],hn=["svg",tn,[["line",{x1:"4",x2:"20",y1:"12",y2:"12"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18"}]]],dn=["svg",tn,[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"}]]],pn=["svg",tn,[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]]],cn=["svg",tn,[["path",{d:"M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"}],["path",{d:"m10 15 5-3-5-3z"}]]];var gn=function(t,e,i,a){var n,s=arguments.length,r=s<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,a);else for(var o=t.length-1;o>=0;o--)(n=t[o])&&(r=(s<3?n(r):s>3?n(e,i,r):n(e,i))||r);return s>3&&r&&Object.defineProperty(e,i,r),r};const yn={"alert-circle":["svg",tn,[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]]],"alert-triangle":["svg",tn,[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]]],"chevron-down":en,"chevron-right":["svg",tn,[["path",{d:"m9 18 6-6-6-6"}]]],"chevron-up":an,menu:hn,pencil:["svg",tn,[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"}],["path",{d:"m15 5 4 4"}]]],plus:["svg",tn,[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]]],"plus-circle":["svg",tn,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M8 12h8"}],["path",{d:"M12 8v8"}]]],"trash-2":["svg",tn,[["path",{d:"M3 6h18"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17"}]]],x:["svg",tn,[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]]],settings:["svg",tn,[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"}],["circle",{cx:"12",cy:"12",r:"3"}]]],"check-circle":["svg",tn,[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}],["polyline",{points:"22 4 12 14.01 9 11.01"}]]]};class fn extends yt{constructor(){super(...arguments),this.size=t}render(){if(!this.icon||!yn[this.icon])return console.error(`invalid icon: '${this.icon}'`),null;const t=Qa(yn[this.icon]);return t.setAttribute("width",this.size.value),t.setAttribute("height",this.size.value),t}}fn.styles=g`
    :host {
      display: inline-flex;
    }
  `,gn([Da()],fn.prototype,"size",void 0),gn([Da()],fn.prototype,"icon",void 0),customElements.define("fds-icon",fn),customElements.define("fds-navigation",Ja),ckan.module("digitraffic_theme_top_navigation",(function(t){return{initialize:function(){const t={label:"Digitraffic",value:"digitraffic",url:"https://www.digitraffic.fi/"},e=[{label:"Liikennetilanne",value:"liikennetilanne",url:"https://liikennetilanne.fintraffic.fi/"},{label:"Palauteväylä",value:"palautevayla",url:"https://www.palautevayla.fi/aspa?lang=fi"},{label:"Junalähdöt",value:"junalahdot",url:"https://junalahdot.fintraffic.fi/"},{label:"Drone-palvelut",value:"dronepalvelut",url:"https://skynavx.fi/#/drone"},t,{label:"Digitransit",value:"digitransit",url:"https://digitransit.fi/"},{label:"Reittiopas",value:"reittiopas",url:"https://opas.matka.fi/"},{label:"NAP",value:"nap",url:"https://finap.fi/#/"}];customElements.whenDefined("fds-navigation").then((()=>{const i=document.createElement("fds-navigation");i.setAttribute("vertical-menu-threshold","1225"),i.innerHTML='\n      <a href="https://www.fintraffic.fi/fi">\n              <svg viewBox="0 0 253 42" style="height: 18px">\n                  <use href="/assets/fintraffic_horizontal_white.svg#fintraffic_horizontal_white"></use>\n              </svg>\n          </a>';i.variant=qa.primary,i.items=e,i.selected=t,i.verticalMenuNavText="Services",i.addEventListener("select",(e=>{const i=e.detail;window.open(i.url,"_blank"),e.target.selected=t})),this.el.replaceWith(i)}))}}}));const un={initialize(){$.proxyAll(this,/_on/)}},vn={...un,initialize(){un.initialize.apply(this),this._getMenuController().on("click",this._onMenuControllerClick),this._getMenuController().on("keydown",this._onMenuControllerKeyDown),this._getMenu().on("keydown",this._onMenuKeyDown)},_onMenuControllerClick(t){this._getMenuController().has(t.target)&&this._toggleList()},_onMenuControllerKeyDown(t){if(this._getMenuController().has(t.target)){const{key:e}=t;switch(e){case" ":case"Enter":t.preventDefault(),this._toggleList();break;case"ArrowDown":t.preventDefault(),this._focus("first")}}},_onMenuKeyDown(t){if(this._getMenuController().is(":visible")&&this._getMenu().has(t.target)){const{key:e}=t;switch(e){case"Escape":t.preventDefault(),this._closeList(),this._focus("menuController");break;case"ArrowDown":$(t.target).is("select")||(t.preventDefault(),this._focus("next"));break;case"ArrowUp":$(t.target).is("select")||(t.preventDefault(),this._focus("previous"))}}},_expandedClass:"expanded",_focus(t){let e;const i=this.el.find(":focus"),a=!!this._getMenu().has(i),n=a&&this._getMenu().find("a:last")[0]===i[0],s=a&&this._getMenu().find("a:first")[0]===i[0];switch(t){case"first":e=this._getMenu().find("a:first");break;case"menuController":e=this._getMenuController();break;case"next":if(a){if(n)return;{const t=this._getMenu().find("a");e=t.filter((e=>e>0&&t[e-1]===i[0]))}}else e=this._getMenu().find("a:first");break;case"previous":if(a){if(s)return;{const t=this._getMenu().find("a");e=t.filter((e=>e<t.length-1&&t[e+1]===i[0]))}}else e=this._getMenu().find("a:first")}e.trigger("focus")},_toggleList(){this._isMenuOpen()?(this._closeList(),this._focus("menuController")):(this._openList(),this._focus("first"))},_isMenuOpen(){return this._getMenu().hasClass(this._expandedClass)},_closeList(){const t=this._getMenuController();this._getMenu().removeClass(this._expandedClass),t.attr("aria-expanded","false")},_openList(){const t=this._getMenuController();this._getMenu().addClass(this._expandedClass),t.attr("aria-expanded","true")},_getMenuController(){throw Error("No controller")},_getMenu(){throw Error("No menu")}},mn={...vn,_getMenuController:()=>$("#app-nav-hamburger-button"),_getMenu:()=>$("#nav-interactions-wrapper")};ckan.module("digitraffic_theme_app_navigation",(function(t){return mn}));const $n={...vn,_getMenuController:()=>$("#user-action-select"),_getMenu:()=>$("#user-action-list")};ckan.module("digitraffic_theme_user_actions",(function(t){return $n}));const _n={...un,initialize(){un.initialize.apply(this),this.el.on("keyup","select",(t=>{const e=t.key,i=new Set(["ArrowDown","ArrowUp","Space"]).has(e),a="showPicker"in HTMLSelectElement.prototype;i&&a&&(t.preventDefault(),t.target.showPicker())})),this.el.on("change","select",(t=>{this.el.submit()}))}};ckan.module("digitraffic_theme_select_switch",(function(t){return _n})),jQuery((function(){$(".js-disabled").removeClass("js-disabled"),(({icons:t={},nameAttr:e="data-lucide",attrs:i={}}={})=>{if(!Object.values(t).length)throw new Error("Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`");if("undefined"==typeof document)throw new Error("`createIcons()` only works in a browser environment.");const a=document.querySelectorAll(`[${e}]`);if(Array.from(a).forEach((a=>Xa(a,{nameAttr:e,icons:t,attrs:i}))),"data-lucide"===e){const e=document.querySelectorAll("[icon-name]");e.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(e).forEach((e=>Xa(e,{nameAttr:"icon-name",icons:t,attrs:i}))))}})({icons:{ExternalLink:nn,User:pn,Menu:hn,Globe:rn,ChevronDown:en,ChevronUp:an,Facebook:sn,Twitter:dn,Instagram:on,Youtube:cn,Linkedin:ln}})}));
