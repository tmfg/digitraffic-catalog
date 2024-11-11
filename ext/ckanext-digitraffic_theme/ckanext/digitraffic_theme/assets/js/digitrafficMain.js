const t={name:"fds-size-3",value:"24px"},i=class{get shadowRoot(){return this.__host.__shadowRoot}constructor(t){this.ariaAtomic="",this.ariaAutoComplete="",this.ariaBrailleLabel="",this.ariaBrailleRoleDescription="",this.ariaBusy="",this.ariaChecked="",this.ariaColCount="",this.ariaColIndex="",this.ariaColSpan="",this.ariaCurrent="",this.ariaDescription="",this.ariaDisabled="",this.ariaExpanded="",this.ariaHasPopup="",this.ariaHidden="",this.ariaInvalid="",this.ariaKeyShortcuts="",this.ariaLabel="",this.ariaLevel="",this.ariaLive="",this.ariaModal="",this.ariaMultiLine="",this.ariaMultiSelectable="",this.ariaOrientation="",this.ariaPlaceholder="",this.ariaPosInSet="",this.ariaPressed="",this.ariaReadOnly="",this.ariaRequired="",this.ariaRoleDescription="",this.ariaRowCount="",this.ariaRowIndex="",this.ariaRowSpan="",this.ariaSelected="",this.ariaSetSize="",this.ariaSort="",this.ariaValueMax="",this.ariaValueMin="",this.ariaValueNow="",this.ariaValueText="",this.role="",this.form=null,this.labels=[],this.states=new Set,this.validationMessage="",this.validity={},this.willValidate=!0,this.__host=t}checkValidity(){return console.warn("`ElementInternals.checkValidity()` was called on the server.This method always returns true."),!0}reportValidity(){return!0}setFormValue(){}setValidity(){}},e=new WeakMap,a=t=>{let i=e.get(t);return void 0===i&&e.set(t,i=new Map),i},o=class{constructor(){this.__shadowRootMode=null,this.__shadowRoot=null,this.__internals=null}get attributes(){return Array.from(a(this)).map((([t,i])=>({name:t,value:i})))}get shadowRoot(){return"closed"===this.__shadowRootMode?null:this.__shadowRoot}get localName(){return this.constructor.__localName}get tagName(){return this.localName?.toUpperCase()}setAttribute(t,i){a(this).set(t,String(i))}removeAttribute(t){a(this).delete(t)}toggleAttribute(t,i){return this.hasAttribute(t)?!(void 0===i||!i)||(this.removeAttribute(t),!1):!(void 0!==i&&!i)&&(this.setAttribute(t,""),!0)}hasAttribute(t){return a(this).has(t)}attachShadow(t){const i={host:this};return this.__shadowRootMode=t.mode,t&&"open"===t.mode&&(this.__shadowRoot=i),i}attachInternals(){if(null!==this.__internals)throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");const t=new i(this);return this.__internals=t,t}getAttribute(t){return a(this).get(t)??null}},s=class extends o{},r=new class{constructor(){this.__definitions=new Map}define(t,i){if(this.__definitions.has(t)){if("development"!==process.env.NODE_ENV)throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the name "${t}" has already been used with this registry`);console.warn(`'CustomElementRegistry' already has "${t}" defined. This may have been caused by live reload or hot module replacement in which case it can be safely ignored.\nMake sure to test your application with a production build as repeat registrations will throw in production.`)}i.__localName=t,this.__definitions.set(t,{ctor:i,observedAttributes:i.observedAttributes??[]})}get(t){const i=this.__definitions.get(t);return i?.ctor}},n=globalThis,l=n.ShadowRoot&&(void 0===n.ShadyCSS||n.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,d=Symbol(),h=new WeakMap;
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let p=class{constructor(t,i,e){if(this._$cssResult$=!0,e!==d)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const i=this.t;if(l&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=h.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&h.set(i,t))}return t}toString(){return this.cssText}};const c=t=>new p("string"==typeof t?t:t+"",void 0,d),y=(t,...i)=>{const e=1===t.length?t[0]:i.reduce(((i,e,a)=>i+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(e)+t[a+1]),t[0]);return new p(e,t,d)},m=(t,i)=>{l?t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((i=>{const e=document.createElement("style"),a=n.litNonce;void 0!==a&&e.setAttribute("nonce",a),e.textContent=i.cssText,t.appendChild(e)}))},g=l||void 0===n.CSSStyleSheet?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(const e of t.cssRules)i+=e.cssText;return c(i)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var f,b;const u=globalThis;null!==(f=u.customElements)&&void 0!==f||(u.customElements=r);const v=u.trustedTypes,w=v?v.emptyScript:"",_=u.reactiveElementPolyfillSupport,x={toAttribute(t,i){switch(i){case Boolean:t=t?w:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let e=t;switch(i){case Boolean:e=null!==t;break;case Number:e=null===t?null:Number(t);break;case Object:case Array:try{e=JSON.parse(t)}catch(t){e=null}}return e}},k=(t,i)=>i!==t&&(i==i||t==t),S={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:k},A="finalized";let M=class extends(globalThis.HTMLElement??s){constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,e)=>{const a=this._$Ep(e,i);void 0!==a&&(this._$Ev.set(a,e),t.push(a))})),t}static createProperty(t,i=S){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const e="symbol"==typeof t?Symbol():"__"+t,a=this.getPropertyDescriptor(t,e,i);void 0!==a&&Object.defineProperty(this.prototype,t,a)}}static getPropertyDescriptor(t,i,e){return{get(){return this[i]},set(a){const o=this[t];this[i]=a,this.requestUpdate(t,o,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||S}static finalize(){if(this.hasOwnProperty(A))return!1;this[A]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const e of i)this.createProperty(e,t[e])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const e=new Set(t.flat(1/0).reverse());for(const t of e)i.unshift(g(t))}else void 0!==t&&i.push(g(t));return i}static _$Ep(t,i){const e=i.attribute;return!1===e?void 0:"string"==typeof e?e:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var i,e;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(e=t.hostConnected)||void 0===e||e.call(t))}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return m(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}))}attributeChangedCallback(t,i,e){this._$AK(t,e)}_$EO(t,i,e=S){var a;const o=this.constructor._$Ep(t,e);if(void 0!==o&&!0===e.reflect){const s=(void 0!==(null===(a=e.converter)||void 0===a?void 0:a.toAttribute)?e.converter:x).toAttribute(i,e.type);this._$El=t,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$El=null}}_$AK(t,i){var e;const a=this.constructor,o=a._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=a.getPropertyOptions(o),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(e=t.converter)||void 0===e?void 0:e.fromAttribute)?t.converter:x;this._$El=o,this[o]=s.fromAttribute(i,t.type),this._$El=null}}requestUpdate(t,i,e){let a=!0;void 0!==t&&(((e=e||this.constructor.getPropertyOptions(t)).hasChanged||k)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===e.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,e))):a=!1),!this.isUpdatePending&&a&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(e)):this._$Ek()}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(e)}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var C;M[A]=!0,M.elementProperties=new Map,M.elementStyles=[],M.shadowRootOptions={mode:"open"},null==_||_({ReactiveElement:M}),(null!==(b=u.reactiveElementVersions)&&void 0!==b?b:u.reactiveElementVersions=[]).push("1.6.3");const E=globalThis,P=E.trustedTypes,T=P?P.createPolicy("lit-html",{createHTML:t=>t}):void 0,z="$lit$",L=`lit$${(Math.random()+"").slice(9)}$`,N="?"+L,R=`<${N}>`,O=void 0===E.document?{createTreeWalker:()=>({})}:document,U=()=>O.createComment(""),H=t=>null===t||"object"!=typeof t&&"function"!=typeof t,D=Array.isArray,B="[ \t\n\f\r]",j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,V=/>/g,W=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),K=/'/g,q=/"/g,F=/^(?:script|style|textarea|title)$/i,Z=(t=>(i,...e)=>({_$litType$:t,strings:i,values:e}))(1),J=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),Q=new WeakMap,Y=O.createTreeWalker(O,129,null,!1);function X(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==T?T.createHTML(i):i}const tt=(t,i)=>{const e=t.length-1,a=[];let o,s=2===i?"<svg>":"",r=j;for(let i=0;i<e;i++){const e=t[i];let n,l,d=-1,h=0;for(;h<e.length&&(r.lastIndex=h,l=r.exec(e),null!==l);)h=r.lastIndex,r===j?"!--"===l[1]?r=I:void 0!==l[1]?r=V:void 0!==l[2]?(F.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=W):void 0!==l[3]&&(r=W):r===W?">"===l[0]?(r=null!=o?o:j,d=-1):void 0===l[1]?d=-2:(d=r.lastIndex-l[2].length,n=l[1],r=void 0===l[3]?W:'"'===l[3]?q:K):r===q||r===K?r=W:r===I||r===V?r=j:(r=W,o=void 0);const p=r===W&&t[i+1].startsWith("/>")?" ":"";s+=r===j?e+R:d>=0?(a.push(n),e.slice(0,d)+z+e.slice(d)+L+p):e+L+(-2===d?(a.push(void 0),i):p)}return[X(t,s+(t[e]||"<?>")+(2===i?"</svg>":"")),a]};class it{constructor({strings:t,_$litType$:i},e){let a;this.parts=[];let o=0,s=0;const r=t.length-1,n=this.parts,[l,d]=tt(t,i);if(this.el=it.createElement(l,e),Y.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes)}for(;null!==(a=Y.nextNode())&&n.length<r;){if(1===a.nodeType){if(a.hasAttributes()){const t=[];for(const i of a.getAttributeNames())if(i.endsWith(z)||i.startsWith(L)){const e=d[s++];if(t.push(i),void 0!==e){const t=a.getAttribute(e.toLowerCase()+z).split(L),i=/([.?@])?(.*)/.exec(e);n.push({type:1,index:o,name:i[2],strings:t,ctor:"."===i[1]?rt:"?"===i[1]?lt:"@"===i[1]?dt:st})}else n.push({type:6,index:o})}for(const i of t)a.removeAttribute(i)}if(F.test(a.tagName)){const t=a.textContent.split(L),i=t.length-1;if(i>0){a.textContent=P?P.emptyScript:"";for(let e=0;e<i;e++)a.append(t[e],U()),Y.nextNode(),n.push({type:2,index:++o});a.append(t[i],U())}}}else if(8===a.nodeType)if(a.data===N)n.push({type:2,index:o});else{let t=-1;for(;-1!==(t=a.data.indexOf(L,t+1));)n.push({type:7,index:o}),t+=L.length-1}o++}}static createElement(t,i){const e=O.createElement("template");return e.innerHTML=t,e}}function et(t,i,e=t,a){var o,s,r,n;if(i===J)return i;let l=void 0!==a?null===(o=e._$Co)||void 0===o?void 0:o[a]:e._$Cl;const d=H(i)?void 0:i._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(s=null==l?void 0:l._$AO)||void 0===s||s.call(l,!1),void 0===d?l=void 0:(l=new d(t),l._$AT(t,e,a)),void 0!==a?(null!==(r=(n=e)._$Co)&&void 0!==r?r:n._$Co=[])[a]=l:e._$Cl=l),void 0!==l&&(i=et(t,l._$AS(t,i.values),l,a)),i}class at{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:e},parts:a}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:O).importNode(e,!0);Y.currentNode=o;let s=Y.nextNode(),r=0,n=0,l=a[0];for(;void 0!==l;){if(r===l.index){let i;2===l.type?i=new ot(s,s.nextSibling,this,t):1===l.type?i=new l.ctor(s,l.name,l.strings,this,t):6===l.type&&(i=new ht(s,this,t)),this._$AV.push(i),l=a[++n]}r!==(null==l?void 0:l.index)&&(s=Y.nextNode(),r++)}return Y.currentNode=O,o}v(t){let i=0;for(const e of this._$AV)void 0!==e&&(void 0!==e.strings?(e._$AI(t,e,i),i+=e.strings.length-2):e._$AI(t[i])),i++}}class ot{constructor(t,i,e,a){var o;this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=e,this.options=a,this._$Cp=null===(o=null==a?void 0:a.isConnected)||void 0===o||o}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=et(this,t,i),H(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==J&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>D(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==G&&H(this._$AH)?this._$AA.nextSibling.data=t:this.$(O.createTextNode(t)),this._$AH=t}g(t){var i;const{values:e,_$litType$:a}=t,o="number"==typeof a?this._$AC(t):(void 0===a.el&&(a.el=it.createElement(X(a.h,a.h[0]),this.options)),a);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(e);else{const t=new at(o,this),i=t.u(this.options);t.v(e),this.$(i),this._$AH=t}}_$AC(t){let i=Q.get(t.strings);return void 0===i&&Q.set(t.strings,i=new it(t)),i}T(t){D(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let e,a=0;for(const o of t)a===i.length?i.push(e=new ot(this.k(U()),this.k(U()),this,this.options)):e=i[a],e._$AI(o),a++;a<i.length&&(this._$AR(e&&e._$AB.nextSibling,a),i.length=a)}_$AR(t=this._$AA.nextSibling,i){var e;for(null===(e=this._$AP)||void 0===e||e.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t))}}class st{constructor(t,i,e,a,o){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=i,this._$AM=a,this.options=o,e.length>2||""!==e[0]||""!==e[1]?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=G}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,e,a){const o=this.strings;let s=!1;if(void 0===o)t=et(this,t,i,0),s=!H(t)||t!==this._$AH&&t!==J,s&&(this._$AH=t);else{const a=t;let r,n;for(t=o[0],r=0;r<o.length-1;r++)n=et(this,a[e+r],i,r),n===J&&(n=this._$AH[r]),s||(s=!H(n)||n!==this._$AH[r]),n===G?t=G:t!==G&&(t+=(null!=n?n:"")+o[r+1]),this._$AH[r]=n}s&&!a&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class rt extends st{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}const nt=P?P.emptyScript:"";class lt extends st{constructor(){super(...arguments),this.type=4}j(t){t&&t!==G?this.element.setAttribute(this.name,nt):this.element.removeAttribute(this.name)}}class dt extends st{constructor(t,i,e,a,o){super(t,i,e,a,o),this.type=5}_$AI(t,i=this){var e;if((t=null!==(e=et(this,t,i,0))&&void 0!==e?e:G)===J)return;const a=this._$AH,o=t===G&&a!==G||t.capture!==a.capture||t.once!==a.once||t.passive!==a.passive,s=t!==G&&(a===G||o);o&&this.element.removeEventListener(this.name,this,a),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var i,e;"function"==typeof this._$AH?this._$AH.call(null!==(e=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==e?e:this.element,t):this._$AH.handleEvent(t)}}class ht{constructor(t,i,e){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(t){et(this,t)}}const pt=E.litHtmlPolyfillSupport;null==pt||pt(it,ot),(null!==(C=E.litHtmlVersions)&&void 0!==C?C:E.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ct,yt;class mt extends M{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,i;const e=super.createRenderRoot();return null!==(t=(i=this.renderOptions).renderBefore)&&void 0!==t||(i.renderBefore=e.firstChild),e}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,i,e)=>{var a,o;const s=null!==(a=null==e?void 0:e.renderBefore)&&void 0!==a?a:i;let r=s._$litPart$;if(void 0===r){const t=null!==(o=null==e?void 0:e.renderBefore)&&void 0!==o?o:null;s._$litPart$=r=new ot(i.insertBefore(U(),t),t,void 0,null!=e?e:{})}return r._$AI(t),r})(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return J}}mt.finalized=!0,mt._$litElement$=!0,null===(ct=globalThis.litElementHydrateSupport)||void 0===ct||ct.call(globalThis,{LitElement:mt});const gt=globalThis.litElementPolyfillSupport;null==gt||gt({LitElement:mt}),(null!==(yt=globalThis.litElementVersions)&&void 0!==yt?yt:globalThis.litElementVersions=[]).push("3.3.3");const ft=c("var(--fds-typography-body-default-font-family, 'Public Sans')"),bt=c("var(--fds-typography-body-default-font-size, 16px)"),ut=c("var(--fds-typography-body-default-letter-spacing, 0px)"),vt=c("var(--fds-typography-body-default-line-height, 150%)"),wt=c("var(--fds-typography-body-default-font-weight, 400)"),$t=c("var(--fds-typography-body-default-display, inline-block)"),_t=c("var(--fds-typography-body-large-font-family, 'Public Sans')"),xt=c("var(--fds-typography-body-large-font-size, 18px)"),kt=c("var(--fds-typography-body-large-letter-spacing, 0px)"),St=c("var(--fds-typography-body-large-line-height, 150%)"),At=c("var(--fds-typography-body-large-font-weight, 400)"),Mt=c("var(--fds-typography-body-large-display, inline-block)"),Ct=c("var(--fds-typography-body-micro-font-family, 'Public Sans')"),Et=c("var(--fds-typography-body-micro-font-size, 12px)"),Pt=c("var(--fds-typography-body-micro-letter-spacing, 0px)"),Tt=c("var(--fds-typography-body-micro-line-height, 150%)"),zt=c("var(--fds-typography-body-micro-font-weight, 400)"),Lt=c("var(--fds-typography-body-micro-display, inline-block)"),Nt=c("var(--fds-typography-body-small-font-family, 'Public Sans')"),Rt=c("var(--fds-typography-body-small-font-size, 14px)"),Ot=c("var(--fds-typography-body-small-letter-spacing, 0px)"),Ut=c("var(--fds-typography-body-small-line-height, 150%)"),Ht=c("var(--fds-typography-body-small-font-weight, 400)"),Dt=c("var(--fds-typography-body-small-display, inline-block)"),Bt=c("var(--fds-typography-emphasis-default-font-family, 'Public Sans')"),jt=c("var(--fds-typography-emphasis-default-font-size, 16px)"),It=c("var(--fds-typography-emphasis-default-letter-spacing, 0px)"),Vt=c("var(--fds-typography-emphasis-default-line-height, 150%)"),Wt=c("var(--fds-typography-emphasis-default-font-weight, 700)"),Kt=c("var(--fds-typography-emphasis-default-display, inline-block)"),qt=c("var(--fds-typography-emphasis-large-font-family, 'Public Sans')"),Ft=c("var(--fds-typography-emphasis-large-font-size, 18px)"),Zt=c("var(--fds-typography-emphasis-large-letter-spacing, 0px)"),Jt=c("var(--fds-typography-emphasis-large-line-height, 150%)"),Gt=c("var(--fds-typography-emphasis-large-font-weight, 700)"),Qt=c("var(--fds-typography-emphasis-large-display, inline-block)"),Yt=c("var(--fds-typography-emphasis-micro-font-family, 'Public Sans')"),Xt=c("var(--fds-typography-emphasis-micro-font-size, 12px)"),ti=c("var(--fds-typography-emphasis-micro-letter-spacing, 0px)"),ii=c("var(--fds-typography-emphasis-micro-line-height, 150%)"),ei=c("var(--fds-typography-emphasis-micro-font-weight, 700)"),ai=c("var(--fds-typography-emphasis-micro-display, inline-block)"),oi=c("var(--fds-typography-emphasis-small-font-family, 'Public Sans')"),si=c("var(--fds-typography-emphasis-small-font-size, 14px)"),ri=c("var(--fds-typography-emphasis-small-letter-spacing, 0px)"),ni=c("var(--fds-typography-emphasis-small-line-height, 150%)"),li=c("var(--fds-typography-emphasis-small-font-weight, 700)"),di=c("var(--fds-typography-emphasis-small-display, inline-block)"),hi=c("var(--fds-typography-heading-large-heading-3-font-family, 'Public Sans', 'PublicSans-Bold')"),pi=c("var(--fds-typography-heading-large-heading-3-font-size, 40px)"),ci=c("var(--fds-typography-heading-large-heading-3-letter-spacing, 0px)"),yi=c("var(--fds-typography-heading-large-heading-3-line-height, 110%)"),mi=c("var(--fds-typography-heading-large-heading-3-font-weight, 700)"),gi=c("var(--fds-typography-heading-large-heading-3-display, inline-block)"),fi=c("var(--fds-typography-heading-large-heading-4-font-family, 'Public Sans', 'PublicSans-Bold')"),bi=c("var(--fds-typography-heading-large-heading-4-font-size, 32px)"),ui=c("var(--fds-typography-heading-large-heading-4-letter-spacing, 0px)"),vi=c("var(--fds-typography-heading-large-heading-4-line-height, 110%)"),wi=c("var(--fds-typography-heading-large-heading-4-font-weight, 700)"),$i=c("var(--fds-typography-heading-large-heading-4-display, inline-block)"),_i=c("var(--fds-typography-heading-large-heading-5-font-family, 'Public Sans', 'PublicSans-Bold')"),xi=c("var(--fds-typography-heading-large-heading-5-font-size, 28px)"),ki=c("var(--fds-typography-heading-large-heading-5-letter-spacing, 0px)"),Si=c("var(--fds-typography-heading-large-heading-5-line-height, 110%)"),Ai=c("var(--fds-typography-heading-large-heading-5-font-weight, 700)"),Mi=c("var(--fds-typography-heading-large-heading-5-display, inline-block)"),Ci=c("var(--fds-typography-heading-large-heading-6-font-family, 'Public Sans', 'PublicSans-Bold')"),Ei=c("var(--fds-typography-heading-large-heading-6-font-size, 20px)"),Pi=c("var(--fds-typography-heading-large-heading-6-letter-spacing, 0px)"),Ti=c("var(--fds-typography-heading-large-heading-6-line-height, 110%)"),zi=c("var(--fds-typography-heading-large-heading-6-font-weight, 700)"),Li=c("var(--fds-typography-heading-large-heading-6-display, inline-block)"),Ni=c("var(--fds-typography-heading-large-heading-1-font-family, 'Public Sans', 'PublicSans-Bold')"),Ri=c("var(--fds-typography-heading-large-heading-1-font-size, 64px)"),Oi=c("var(--fds-typography-heading-large-heading-1-letter-spacing, 0px)"),Ui=c("var(--fds-typography-heading-large-heading-1-line-height, 110%)"),Hi=c("var(--fds-typography-heading-large-heading-1-font-weight, 700)"),Di=c("var(--fds-typography-heading-large-heading-1-display, inline-block)"),Bi=c("var(--fds-typography-heading-large-heading-2-font-family, 'Public Sans', 'PublicSans-Bold')"),ji=c("var(--fds-typography-heading-large-heading-2-font-size, 48px)"),Ii=c("var(--fds-typography-heading-large-heading-2-letter-spacing, 0px)"),Vi=c("var(--fds-typography-heading-large-heading-2-line-height, 110%)"),Wi=c("var(--fds-typography-heading-large-heading-2-font-weight, 700)"),Ki=c("var(--fds-typography-heading-large-heading-2-display, inline-block)"),qi=c("var(--fds-typography-heading-small-heading-1-font-family, 'Public Sans', 'PublicSans-Bold')"),Fi=c("var(--fds-typography-heading-small-heading-1-font-size, 42px)"),Zi=c("var(--fds-typography-heading-small-heading-1-letter-spacing, 0px)"),Ji=c("var(--fds-typography-heading-small-heading-1-line-height, 110%)"),Gi=c("var(--fds-typography-heading-small-heading-1-font-weight, 700)"),Qi=c("var(--fds-typography-heading-small-heading-1-display, inline-block)"),Yi=c("var(--fds-typography-heading-small-heading-2-font-family, 'Public Sans', 'PublicSans-Bold')"),Xi=c("var(--fds-typography-heading-small-heading-2-font-size, 32px)"),te=c("var(--fds-typography-heading-small-heading-2-letter-spacing, 0px)"),ie=c("var(--fds-typography-heading-small-heading-2-line-height, 110%)"),ee=c("var(--fds-typography-heading-small-heading-2-font-weight, 700)"),ae=c("var(--fds-typography-heading-small-heading-2-display, inline-block)"),oe=c("var(--fds-typography-heading-small-heading-3-font-family, 'Public Sans', 'PublicSans-Bold')"),se=c("var(--fds-typography-heading-small-heading-3-font-size, 28px)"),re=c("var(--fds-typography-heading-small-heading-3-letter-spacing, 0px)"),ne=c("var(--fds-typography-heading-small-heading-3-line-height, 110%)"),le=c("var(--fds-typography-heading-small-heading-3-font-weight, 700)"),de=c("var(--fds-typography-heading-small-heading-3-display, inline-block)"),he=c("var(--fds-typography-heading-small-heading-4-font-family, 'Public Sans', 'PublicSans-Bold')"),pe=c("var(--fds-typography-heading-small-heading-4-font-size, 24px)"),ce=c("var(--fds-typography-heading-small-heading-4-letter-spacing, 0px)"),ye=c("var(--fds-typography-heading-small-heading-4-line-height, 110%)"),me=c("var(--fds-typography-heading-small-heading-4-font-weight, 700)"),ge=c("var(--fds-typography-heading-small-heading-4-display, inline-block)"),fe=c("var(--fds-typography-heading-small-heading-5-font-family, 'Public Sans', 'PublicSans-Bold')"),be=c("var(--fds-typography-heading-small-heading-5-font-size, 18px)"),ue=c("var(--fds-typography-heading-small-heading-5-letter-spacing, 0px)"),ve=c("var(--fds-typography-heading-small-heading-5-line-height, 110%)"),we=c("var(--fds-typography-heading-small-heading-5-font-weight, 700)"),$e=c("var(--fds-typography-heading-small-heading-5-display, inline-block)"),_e=c("var(--fds-typography-heading-small-heading-6-font-family, 'Public Sans', 'PublicSans-Bold')"),xe=c("var(--fds-typography-heading-small-heading-6-font-size, 16px)"),ke=c("var(--fds-typography-heading-small-heading-6-letter-spacing, 0px)"),Se=c("var(--fds-typography-heading-small-heading-6-line-height, 110%)"),Ae=c("var(--fds-typography-heading-small-heading-6-font-weight, 700)"),Me=c("var(--fds-typography-heading-small-heading-6-display, inline-block)"),Ce=c("var(--fds-typography-link-large-font-family, 'Public Sans')"),Ee=c("var(--fds-typography-link-large-font-size, 18px)"),Pe=c("var(--fds-typography-link-large-letter-spacing, 0px)"),Te=c("var(--fds-typography-link-large-line-height, 150%)"),ze=c("var(--fds-typography-link-large-font-weight, 400)"),Le=c("var(--fds-typography-link-large-text-decoration, underline)"),Ne=c("var(--fds-typography-link-large-display, inline-block)"),Re=c("var(--fds-typography-link-micro-font-family, 'Public Sans')"),Oe=c("var(--fds-typography-link-micro-font-size, 12px)"),Ue=c("var(--fds-typography-link-micro-letter-spacing, 0px)"),He=c("var(--fds-typography-link-micro-line-height, 150%)"),De=c("var(--fds-typography-link-micro-font-weight, 400)"),Be=c("var(--fds-typography-link-micro-text-decoration, underline)"),je=c("var(--fds-typography-link-micro-display, inline-block)"),Ie=c("var(--fds-typography-link-small-font-family, 'Public Sans')"),Ve=c("var(--fds-typography-link-small-font-size, 14px)"),We=c("var(--fds-typography-link-small-letter-spacing, 0px)"),Ke=c("var(--fds-typography-link-small-line-height, 150%)"),qe=c("var(--fds-typography-link-small-font-weight, 400)"),Fe=c("var(--fds-typography-link-small-text-decoration, underline)"),Ze=c("var(--fds-typography-link-small-display, inline-block)"),Je=c("var(--fds-typography-link-default-font-family, 'Public Sans')"),Ge=c("var(--fds-typography-link-default-font-size, 16px)"),Qe=c("var(--fds-typography-link-default-letter-spacing, 0px)"),Ye=c("var(--fds-typography-link-default-line-height, 150%)"),Xe=c("var(--fds-typography-link-default-font-weight, 400)"),ta=c("var(--fds-typography-link-default-text-decoration, underline)"),ia=c("var(--fds-typography-link-default-display, inline-block)"),ea=c("var(--fds-typography-ui-helper-font-family, 'Public Sans', 'PublicSans-Regular')"),aa=c("var(--fds-typography-ui-helper-font-size, 15px)"),oa=c("var(--fds-typography-ui-helper-letter-spacing, 0px)"),sa=c("var(--fds-typography-ui-helper-line-height, 100%)"),ra=c("var(--fds-typography-ui-helper-font-weight, 400)"),na=c("var(--fds-typography-ui-helper-display, inline-block)"),la=c("var(--fds-typography-ui-id-font-family, 'Roboto Mono')"),da=c("var(--fds-typography-ui-id-font-size, 13px)"),ha=c("var(--fds-typography-ui-id-letter-spacing, 0px)"),pa=c("var(--fds-typography-ui-id-line-height, 100%)"),ca=c("var(--fds-typography-ui-id-font-weight, 700)"),ya=c("var(--fds-typography-ui-id-display, inline-block)"),ma=c("var(--fds-typography-ui-label-font-family, 'Public Sans', 'PublicSans-Medium')"),ga=c("var(--fds-typography-ui-label-font-size, 16px)"),fa=c("var(--fds-typography-ui-label-letter-spacing, 0px)"),ba=c("var(--fds-typography-ui-label-line-height, 22px)"),ua=c("var(--fds-typography-ui-label-font-weight, 500)"),va=c("var(--fds-typography-ui-label-display, inline-block)"),wa=c("var(--fds-typography-ui-placeholder-font-family, 'Public Sans', 'PublicSans-Medium')"),$a=c("var(--fds-typography-ui-placeholder-font-size, 16px)"),_a=c("var(--fds-typography-ui-placeholder-letter-spacing, 0px)"),xa=c("var(--fds-typography-ui-placeholder-line-height, 100%)"),ka=c("var(--fds-typography-ui-placeholder-font-weight, 500)"),Sa=c("var(--fds-typography-ui-placeholder-display, inline-block)"),Aa=c("var(--fds-typography-ui-tag-font-family, 'Public Sans', 'PublicSans-Bold')"),Ma=c("var(--fds-typography-ui-tag-font-size, 16px)"),Ca=c("var(--fds-typography-ui-tag-letter-spacing, 0px)"),Ea=c("var(--fds-typography-ui-tag-line-height, 100%)"),Pa=c("var(--fds-typography-ui-tag-font-weight, 700)"),Ta=c("var(--fds-typography-ui-tag-display, inline-block)"),za=c("var(--fds-color-brand-black, #000000)"),La=c("var(--fds-color-brand-white, #ffffff)"),Na=c("var(--fds-color-neutral-100, #cdcdd7)"),Ra=c("var(--fds-color-text-300, #9696aa)");y`
  .body-default-text {
    display: ${$t};
    font-family: ${ft};
    font-size: ${bt};
    font-weight: ${wt};
    letter-spacing: ${ut};
    line-height: ${vt};
  }
`,y`
  .body-large-text {
    display: ${Mt};
    font-family: ${_t};
    font-size: ${xt};
    font-weight: ${At};
    letter-spacing: ${kt};
    line-height: ${St};
  }
`,y`
  .body-micro-text {
    display: ${Lt};
    font-family: ${Ct};
    font-size: ${Et};
    font-weight: ${zt};
    letter-spacing: ${Pt};
    line-height: ${Tt};
  }
`,y`
  .body-small-text {
    display: ${Dt};
    font-family: ${Nt};
    font-size: ${Rt};
    font-weight: ${Ht};
    letter-spacing: ${Ot};
    line-height: ${Ut};
  }
`,y`
  .emphasis-default-text {
    display: ${Kt};
    font-family: ${Bt};
    font-size: ${jt};
    font-weight: ${Wt};
    letter-spacing: ${It};
    line-height: ${Vt};
  }
`,y`
  .emphasis-large-text {
    display: ${Qt};
    font-family: ${qt};
    font-size: ${Ft};
    font-weight: ${Gt};
    letter-spacing: ${Zt};
    line-height: ${Jt};
  }
`,y`
  .emphasis-micro-text {
    display: ${ai};
    font-family: ${Yt};
    font-size: ${Xt};
    font-weight: ${ei};
    letter-spacing: ${ti};
    line-height: ${ii};
  }
`,y`
  .emphasis-small-text {
    display: ${di};
    font-family: ${oi};
    font-size: ${si};
    font-weight: ${li};
    letter-spacing: ${ri};
    line-height: ${ni};
  }
`,y`
  .heading-large-1-text {
    display: ${Di};
    font-family: ${Ni};
    font-size: ${Ri};
    font-weight: ${Hi};
    letter-spacing: ${Oi};
    line-height: ${Ui};
  }
`,y`
  .heading-large-2-text {
    display: ${Ki};
    font-family: ${Bi};
    font-size: ${ji};
    font-weight: ${Wi};
    letter-spacing: ${Ii};
    line-height: ${Vi};
  }
`,y`
  .heading-large-3-text {
    display: ${gi};
    font-family: ${hi};
    font-size: ${pi};
    font-weight: ${mi};
    letter-spacing: ${ci};
    line-height: ${yi};
  }
`,y`
  .heading-large-4-text {
    display: ${$i};
    font-family: ${fi};
    font-size: ${bi};
    font-weight: ${wi};
    letter-spacing: ${ui};
    line-height: ${vi};
  }
`,y`
  .heading-large-5-text {
    display: ${Mi};
    font-family: ${_i};
    font-size: ${xi};
    font-weight: ${Ai};
    letter-spacing: ${ki};
    line-height: ${Si};
  }
`,y`
  .heading-large-6-text {
    display: ${Li};
    font-family: ${Ci};
    font-size: ${Ei};
    font-weight: ${zi};
    letter-spacing: ${Pi};
    line-height: ${Ti};
  }
`,y`
  .heading-small-1-text {
    display: ${Qi};
    font-family: ${qi};
    font-size: ${Fi};
    font-weight: ${Gi};
    letter-spacing: ${Zi};
    line-height: ${Ji};
  }
`,y`
  .heading-small-2-text {
    display: ${ae};
    font-family: ${Yi};
    font-size: ${Xi};
    font-weight: ${ee};
    letter-spacing: ${te};
    line-height: ${ie};
  }
`,y`
  .heading-small-3-text {
    display: ${de};
    font-family: ${oe};
    font-size: ${se};
    font-weight: ${le};
    letter-spacing: ${re};
    line-height: ${ne};
  }
`,y`
  .heading-small-4-text {
    display: ${ge};
    font-family: ${he};
    font-size: ${pe};
    font-weight: ${me};
    letter-spacing: ${ce};
    line-height: ${ye};
  }
`,y`
  .heading-small-5-text {
    display: ${$e};
    font-family: ${fe};
    font-size: ${be};
    font-weight: ${we};
    letter-spacing: ${ue};
    line-height: ${ve};
  }
`,y`
  .heading-small-6-text {
    display: ${Me};
    font-family: ${_e};
    font-size: ${xe};
    font-weight: ${Ae};
    letter-spacing: ${ke};
    line-height: ${Se};
  }
`,y`
  .link-default-text {
    display: ${ia};
    font-family: ${Je};
    font-size: ${Ge};
    font-weight: ${Xe};
    letter-spacing: ${Qe};
    line-height: ${Ye};
    text-decoration: ${ta};
  }
`,y`
  .link-large-text {
    display: ${Ne};
    font-family: ${Ce};
    font-size: ${Ee};
    font-weight: ${ze};
    letter-spacing: ${Pe};
    line-height: ${Te};
    text-decoration: ${Le};
  }
`,y`
  .link-micro-text {
    display: ${je};
    font-family: ${Re};
    font-size: ${Oe};
    font-weight: ${De};
    letter-spacing: ${Ue};
    line-height: ${He};
    text-decoration: ${Be};
  }
`,y`
  .link-small-text {
    display: ${Ze};
    font-family: ${Ie};
    font-size: ${Ve};
    font-weight: ${qe};
    letter-spacing: ${We};
    line-height: ${Ke};
    text-decoration: ${Fe};
  }
`,y`
  .ui-helper-text {
    display: ${na};
    font-family: ${ea};
    font-size: ${aa};
    font-weight: ${ra};
    letter-spacing: ${oa};
    line-height: ${sa};
  }
`,y`
  .ui-id-text {
    display: ${ya};
    font-family: ${la};
    font-size: ${da};
    font-weight: ${ca};
    letter-spacing: ${ha};
    line-height: ${pa};
  }
`;const Oa=y`
  .ui-label-text {
    display: ${va};
    font-family: ${ma};
    font-size: ${ga};
    font-weight: ${ua};
    letter-spacing: ${fa};
    line-height: ${ba};
  }
`;y`
  .ui-placeholder-text {
    display: ${Sa};
    font-family: ${wa};
    font-size: ${$a};
    font-weight: ${ka};
    letter-spacing: ${_a};
    line-height: ${xa};
  }
`,y`
  .ui-tag-text {
    display: ${Ta};
    font-family: ${Aa};
    font-size: ${Ma};
    font-weight: ${Pa};
    letter-spacing: ${Ca};
    line-height: ${Ea};
  }
`
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;const Ua=(t,i)=>"method"===i.kind&&i.descriptor&&!("value"in i.descriptor)?{...i,finisher(e){e.createProperty(i.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:i.key,initializer(){"function"==typeof i.initializer&&(this[i.key]=i.initializer.call(this))},finisher(e){e.createProperty(i.key,t)}},Ha=(t,i,e)=>{i.constructor.createProperty(e,t)};function Da(t){return(i,e)=>void 0!==e?Ha(t,i,e):Ua(t,i)
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
var Ba;null===(Ba=globalThis.HTMLSlotElement)||void 0===Ba||Ba.prototype.assignedElements;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ja=1;let Ia=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,e){this._$Ct=t,this._$AM=i,this._$Ci=e}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Va="important",Wa=" !"+Va,Ka=(t=>(...i)=>({_$litDirective$:t,values:i}))(class extends Ia{constructor(t){var i;if(super(t),t.type!==ja||"style"!==t.name||(null===(i=t.strings)||void 0===i?void 0:i.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((i,e)=>{const a=t[e];return null==a?i:i+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${a};`}),"")}update(t,[i]){const{style:e}=t.element;if(void 0===this.ht){this.ht=new Set;for(const t in i)this.ht.add(t);return this.render(i)}this.ht.forEach((t=>{null==i[t]&&(this.ht.delete(t),t.includes("-")?e.removeProperty(t):e[t]="")}));for(const t in i){const a=i[t];if(null!=a){this.ht.add(t);const i="string"==typeof a&&a.endsWith(Wa);t.includes("-")||i?e.setProperty(t,i?a.slice(0,-11):a,i?Va:""):e[t]=a}}return J}});var qa,Fa,Za=function(t,i,e,a){var o,s=arguments.length,r=s<3?i:null===a?a=Object.getOwnPropertyDescriptor(i,e):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,i,e,a);else for(var n=t.length-1;n>=0;n--)(o=t[n])&&(r=(s<3?o(r):s>3?o(i,e,r):o(i,e))||r);return s>3&&r&&Object.defineProperty(i,e,r),r};!function(t){t.primary="primary",t.secondary="secondary"}(qa||(qa={})),function(t){t.left="left",t.right="right"}(Fa||(Fa={}));class Ja extends mt{constructor(){super(...arguments),this.variant=qa.primary,this.items=[],this.verticalMenuNavText="",this.verticalMenuThreshold=768,this._open=!1}connectedCallback(){super.connectedCallback(),m(this.shadowRoot,[Ja.cssVariables,Oa,Ja.collapsedNavigationStyles,this.desktopStyles()])}render(){const t=this.items.filter((t=>t.position===Fa.right)),i=this.items.filter((t=>t.position!==Fa.right));return Z` <div class="navigation-wrapper">
      <div class="navigation navigation--${this.variant} ui-label-text">
        ${this.variant===qa.primary?Z` <div class="navigation__header">
              <slot></slot>
            </div>`:G}
        <ul class="navigation__body ${this._open?"navigation__open":""}">
          ${i.map((t=>this.renderItem(t))).concat(t.map(((t,i)=>this.renderItem(t,0===i?"item__first-right":""))))}
        </ul>
        <div class="navigation__button-wrapper">${this.renderNavigationButton()}</div>
      </div>
    </div>`}renderNavigationButton(){let t;switch(this.variant){case qa.primary:t=this._open?Z`<fds-icon icon="chevron-up"></fds-icon>`:Z`<fds-icon icon="chevron-down"></fds-icon>`;break;case qa.secondary:t=Z`<fds-icon icon="menu"></fds-icon>`}return Z`
      <button
        class="navigation__button navigation__button--${this.variant}"
        type="button"
        @click=${this.handleNavigationClick}
      >
        <span class="navigation__label ui-label-text">${this.verticalMenuNavText}</span>
        ${t}
      </button>
    `}handleNavigationClick(){this._open=!this._open}renderItem(t,i=""){var e;const a=null!==(e=t.verticalMenuOrder)&&void 0!==e?e:0;return Z` <li
      @click=${()=>this.handleSelect(t)}
      class="item ${this.selected===t?"item--active":""} ${i}"
      style=${Ka({order:a})}
    >
      <div class="item__label">
        ${t.icon&&Z`<fds-icon class="item__icon" .icon="${t.icon}"></fds-icon>`}
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
          border-bottom: var(--element-vertical-padding--primary) solid ${La};
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
    `}}Ja.cssVariables=y`
    :host {
      --element-vertical-padding--primary: 9px;
      --element-vertical-padding--secondary: 16px;
      --element-horizontal-padding--primary: 20px;
      --item-border-bottom-width--secondary: 3px;
    }
  `,Ja.collapsedNavigationStyles=y`
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
      background-color: ${za};
      color: ${La};
    }

    .navigation--primary .item:hover {
      color: ${Ra};
    }

    .navigation--primary .navigation__open .item--active .item__label:after {
      content: '';
      position: relative;
      align-self: center;
      height: 0;
      margin-left: auto;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-right: var(--element-vertical-padding--primary) solid ${La};
    }

    .navigation--secondary {
      background-color: ${La};
      border-bottom: 1px solid ${za};
    }

    .navigation--secondary .item {
      border-bottom: 1px solid ${Na};
    }

    .navigation--secondary .item:hover {
      color: ${Ra};
    }

    .navigation__open {
      height: auto;
      width: 100%;
      visibility: visible;
      opacity: 1;
      overflow-y: visible;
      margin-left: 0;
      margin-top: 0;

      border-top: 1px solid ${Na};
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
      background-color: ${za};
      color: ${La};
      padding: var(--element-vertical-padding--primary);
    }

    .navigation__button--primary:hover {
      color: ${Ra};
    }

    .navigation__button--secondary {
      background-color: ${La};
      color: ${za};
      padding: var(--element-vertical-padding--secondary);
    }

    .navigation__button--secondary:hover {
      color: ${Ra};
    }

    .navigation__label {
      margin-right: 10px;
    }
  `,Ja.styles=[Ja.cssVariables,Oa,Ja.collapsedNavigationStyles],Za([Da()],Ja.prototype,"variant",void 0),Za([Da()],Ja.prototype,"items",void 0),Za([Da()],Ja.prototype,"selected",void 0),Za([Da({attribute:"vertical-menu-nav-text"})],Ja.prototype,"verticalMenuNavText",void 0),Za([Da({type:Number,attribute:"vertical-menu-threshold"})],Ja.prototype,"verticalMenuThreshold",void 0),Za([function(t){return Da({...t,state:!0})}()],Ja.prototype,"_open",void 0);const Ga=(t,i,e=[])=>{const a=document.createElementNS("http://www.w3.org/2000/svg",t);return Object.keys(i).forEach((t=>{a.setAttribute(t,String(i[t]))})),e.length&&e.forEach((t=>{const i=Ga(...t);a.appendChild(i)})),a};var Qa=([t,i,e])=>Ga(t,i,e);const Ya=t=>"string"==typeof t?t:t&&t.class?t.class&&"string"==typeof t.class?t.class.split(" "):t.class&&Array.isArray(t.class)?t.class:"":"",Xa=(t,{nameAttr:i,icons:e,attrs:a})=>{const o=t.getAttribute(i);if(null==o)return;const s=e[o.replace(/(\w)(\w*)(_|-|\s*)/g,((t,i,e)=>i.toUpperCase()+e.toLowerCase()))];if(!s)return console.warn(`${t.outerHTML} icon name was not found in the provided icons object.`);const r=(t=>Array.from(t.attributes).reduce(((t,i)=>(t[i.name]=i.value,t)),{}))(t),[n,l,d]=s,h={...l,"data-lucide":o,...a,...r},p=["lucide",`lucide-${o}`,r,a].flatMap(Ya).map((t=>t.trim())).filter(Boolean).filter(((t,i,e)=>e.indexOf(t)===i)).join(" ");p&&Object.assign(h,{class:p});const c=Qa([n,h,d]);return t.parentNode?.replaceChild(c,t)},to={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},io=["svg",to,[["path",{d:"m6 9 6 6 6-6"}]]],eo=["svg",to,[["path",{d:"m18 15-6-6-6 6"}]]],ao=["svg",to,[["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}],["polyline",{points:"15 3 21 3 21 9"}],["line",{x1:"10",x2:"21",y1:"14",y2:"3"}]]],oo=["svg",to,[["path",{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"}]]],so=["svg",to,[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"2",x2:"22",y1:"12",y2:"12"}],["path",{d:"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"}]]],ro=["svg",to,[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5"}]]],no=["svg",to,[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}],["rect",{width:"4",height:"12",x:"2",y:"9"}],["circle",{cx:"4",cy:"4",r:"2"}]]],lo=["svg",to,[["line",{x1:"4",x2:"20",y1:"12",y2:"12"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18"}]]],ho=["svg",to,[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"}]]],po=["svg",to,[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]]],co=["svg",to,[["path",{d:"M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"}],["path",{d:"m10 15 5-3-5-3z"}]]];var yo=function(t,i,e,a){var o,s=arguments.length,r=s<3?i:null===a?a=Object.getOwnPropertyDescriptor(i,e):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,i,e,a);else for(var n=t.length-1;n>=0;n--)(o=t[n])&&(r=(s<3?o(r):s>3?o(i,e,r):o(i,e))||r);return s>3&&r&&Object.defineProperty(i,e,r),r};const mo={"alert-circle":["svg",to,[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]]],"alert-triangle":["svg",to,[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]]],"chevron-down":io,"chevron-right":["svg",to,[["path",{d:"m9 18 6-6-6-6"}]]],"chevron-up":eo,menu:lo,pencil:["svg",to,[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"}],["path",{d:"m15 5 4 4"}]]],plus:["svg",to,[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]]],"plus-circle":["svg",to,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M8 12h8"}],["path",{d:"M12 8v8"}]]],"trash-2":["svg",to,[["path",{d:"M3 6h18"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17"}]]],x:["svg",to,[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]]],settings:["svg",to,[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"}],["circle",{cx:"12",cy:"12",r:"3"}]]],"check-circle":["svg",to,[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}],["polyline",{points:"22 4 12 14.01 9 11.01"}]]]};class go extends mt{constructor(){super(...arguments),this.size=t}render(){if(!this.icon||!mo[this.icon])return console.error(`invalid icon: '${this.icon}'`),null;const t=Qa(mo[this.icon]);return t.setAttribute("width",this.size.value),t.setAttribute("height",this.size.value),t}}function fo(){$.proxyAll(this,/^_/)}go.styles=y`
    :host {
      display: inline-flex;
    }
  `,yo([Da()],go.prototype,"size",void 0),yo([Da()],go.prototype,"icon",void 0),customElements.define("fds-icon",go),customElements.define("fds-navigation",Ja),ckan.module("digitraffic_theme_top_navigation",(function(t){return{initialize:function(){const t={label:"Digitraffic",value:"digitraffic",url:"https://www.digitraffic.fi/"},i=[{label:"Liikennetilanne",value:"liikennetilanne",url:"https://liikennetilanne.fintraffic.fi/"},{label:"Palauteväylä",value:"palautevayla",url:"https://www.palautevayla.fi/aspa?lang=fi"},{label:"Junalähdöt",value:"junalahdot",url:"https://junalahdot.fintraffic.fi/"},{label:"Drone-palvelut",value:"dronepalvelut",url:"https://skynavx.fi/#/drone"},t,{label:"Digitransit",value:"digitransit",url:"https://digitransit.fi/"},{label:"Reittiopas",value:"reittiopas",url:"https://opas.matka.fi/"},{label:"NAP",value:"nap",url:"https://finap.fi/#/"}];customElements.whenDefined("fds-navigation").then((()=>{const e=document.createElement("fds-navigation");e.setAttribute("vertical-menu-threshold","1225"),e.innerHTML='\n      <a href="https://www.fintraffic.fi/fi">\n              <svg viewBox="0 0 253 42" style="height: 18px">\n                  <use href="/assets/fintraffic_horizontal_white.svg#fintraffic_horizontal_white"></use>\n              </svg>\n          </a>';e.variant=qa.primary,e.items=i,e.selected=t,e.verticalMenuNavText="Services",e.addEventListener("select",(i=>{const e=i.detail;window.open(e.url,"_blank"),i.target.selected=t})),this.el.replaceWith(e)}))}}}));const bo=()=>({initialize(){fo.apply(this),this._getMenuController().on("click",this._onMenuControllerClick),this._getMenuController().on("keydown",this._onMenuControllerKeyDown),this._getMenu().on("keydown",this._onMenuKeyDown)},_onMenuControllerClick(t){this._getMenuController().has(t.target)&&this._toggleList()},_onMenuControllerKeyDown(t){if(this._getMenuController().has(t.target)){const{key:i}=t;switch(i){case" ":case"Enter":t.preventDefault(),this._toggleList();break;case"ArrowDown":t.preventDefault(),this._focus("first")}}},_onMenuKeyDown(t){if(this._getMenuController().is(":visible")&&this._getMenu().has(t.target)){const{key:i}=t;switch(i){case"Escape":t.preventDefault(),this._closeList(),this._focus("menuController");break;case"ArrowDown":$(t.target).is("select")||(t.preventDefault(),this._focus("next"));break;case"ArrowUp":$(t.target).is("select")||(t.preventDefault(),this._focus("previous"))}}},_expandedClass:"expanded",_focus(t){let i;const e=this.el.find(":focus"),a=!!this._getMenu().has(e),o=a&&this._getMenu().find("a:last")[0]===e[0],s=a&&this._getMenu().find("a:first")[0]===e[0];switch(t){case"first":i=this._getMenu().find("a:first");break;case"menuController":i=this._getMenuController();break;case"next":if(a){if(o)return;{const t=this._getMenu().find("a");i=t.filter((i=>i>0&&t[i-1]===e[0]))}}else i=this._getMenu().find("a:first");break;case"previous":if(a){if(s)return;{const t=this._getMenu().find("a");i=t.filter((i=>i<t.length-1&&t[i+1]===e[0]))}}else i=this._getMenu().find("a:first")}i.trigger("focus")},_toggleList(){this._isMenuOpen()?(this._closeList(),this._focus("menuController")):(this._openList(),this._focus("first"))},_isMenuOpen(){return this._getMenu().hasClass(this._expandedClass)},_closeList(){const t=this._getMenuController();this._getMenu().removeClass(this._expandedClass),t.attr("aria-expanded","false")},_openList(){const t=this._getMenuController();this._getMenu().addClass(this._expandedClass),t.attr("aria-expanded","true")},_getMenuController(){throw Error("No controller")},_getMenu(){throw Error("No menu")}}),uo={...bo(),_getMenuController:()=>$("#app-nav-hamburger-button"),_getMenu:()=>$("#nav-interactions-wrapper")};ckan.module("digitraffic_theme_app_navigation",(function(t){return uo}));const vo={...bo(),_getMenuController:()=>$("#user-action-select"),_getMenu:()=>$("#user-action-list")};ckan.module("digitraffic_theme_user_actions",(function(t){return vo}));const wo={initialize(){fo.apply(this),this.el.on("keyup","select",(t=>{const i=t.key,e=new Set(["ArrowDown","ArrowUp","Space"]).has(i),a="showPicker"in HTMLSelectElement.prototype;e&&a&&(t.preventDefault(),t.target.showPicker())})),this.el.on("change","select",(t=>{this.el.submit()}))}};ckan.module("digitraffic_theme_select_switch",(function(t){return wo}));const $o={"https://w3id.org/mobilitydcat-ap/mobility-theme/air-and-space-travel":[],"https://w3id.org/mobilitydcat-ap/mobility-theme/cycle-network-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/network-closures-diversions","https://w3id.org/mobilitydcat-ap/mobility-theme/network-detailed-attributes","https://w3id.org/mobilitydcat-ap/mobility-theme/network-geometry-and-lane-character"],"https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-traffic-signs-and-regulations":["https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-closures-and-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/direction-of-travel-on-reversible-lanes","https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-overtaking-bans-on-heavy-goods-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-speed-limits","https://w3id.org/mobilitydcat-ap/mobility-theme/lane-closures-and-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/other-access-restrictions-and-traffic-regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/other-temporary-traffic-management-measures-or-plans","https://w3id.org/mobilitydcat-ap/mobility-theme/road-closures-and-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-closures-and-access-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/filling-and-charging-stations":["https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-charging-points-for-electric-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-filling-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-charging-points","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-filling-stations"],"https://w3id.org/mobilitydcat-ap/mobility-theme/freight-and-logistics":["https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-delivery-areas","https://w3id.org/mobilitydcat-ap/mobility-theme/freight-delivery-regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-delivery-areas"],"https://w3id.org/mobilitydcat-ap/mobility-theme/general-information-for-trip-planning-":["https://w3id.org/mobilitydcat-ap/mobility-theme/address-identifiers","https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-costs","https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-environmental-factors","https://w3id.org/mobilitydcat-ap/mobility-theme/points-of-interest","https://w3id.org/mobilitydcat-ap/mobility-theme/topographic-places"],"https://w3id.org/mobilitydcat-ap/mobility-theme/other":[],"https://w3id.org/mobilitydcat-ap/mobility-theme/parking-service-and-rest-area-information":["https://w3id.org/mobilitydcat-ap/mobility-theme/bike-parking-locations","https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-locations-and-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/park-and-ride-stops","https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-locations-and-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-locations-and-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-accessibility-facilities","https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-geometry"],"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-non-scheduled-transport":["https://w3id.org/mobilitydcat-ap/mobility-theme/accesibility-information-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/fares","https://w3id.org/mobilitydcat-ap/mobility-theme/locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/provider-data","https://w3id.org/mobilitydcat-ap/mobility-theme/reservation-and-purchase-options","https://w3id.org/mobilitydcat-ap/mobility-theme/service-areas-and-service-times"],"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-scheduled-transport":["https://w3id.org/mobilitydcat-ap/mobility-theme/basic-commercial-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/basic-common-standard-fares","https://w3id.org/mobilitydcat-ap/mobility-theme/common-fare-products","https://w3id.org/mobilitydcat-ap/mobility-theme/connection-links","https://w3id.org/mobilitydcat-ap/mobility-theme/disruptions-delays-cancellations","https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/hours-of-operation","https://w3id.org/mobilitydcat-ap/mobility-theme/network-topology-and-routes-lines","https://w3id.org/mobilitydcat-ap/mobility-theme/operational-calendar","https://w3id.org/mobilitydcat-ap/mobility-theme/passenger-classes","https://w3id.org/mobilitydcat-ap/mobility-theme/planned-interchanges-between-scheduled-services","https://w3id.org/mobilitydcat-ap/mobility-theme/purchase-information","https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-estimated-departure-and-arrival-times","https://w3id.org/mobilitydcat-ap/mobility-theme/special-fare-products","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-accessibility-and-paths-within-facility","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-geometry-and-map-layout","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-location-and-features","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-status-of-features","https://w3id.org/mobilitydcat-ap/mobility-theme/timetables-static","https://w3id.org/mobilitydcat-ap/mobility-theme/transport-operators","https://w3id.org/mobilitydcat-ap/mobility-theme/vehicle-details"],"https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-traffic-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/current-travel-times","https://w3id.org/mobilitydcat-ap/mobility-theme/expected-delays","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-length-of-queues","https://w3id.org/mobilitydcat-ap/mobility-theme/predicted-travel-times","https://w3id.org/mobilitydcat-ap/mobility-theme/speed","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-data-at-border-crossings-to-third-countries","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-volume","https://w3id.org/mobilitydcat-ap/mobility-theme/waiting-time-at-border-crossings-to-non-eu-member-states"],"https://w3id.org/mobilitydcat-ap/mobility-theme/road-events-and-conditions":["https://w3id.org/mobilitydcat-ap/mobility-theme/accidents-and-incidents","https://w3id.org/mobilitydcat-ap/mobility-theme/poor-road-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/road-weather-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/road-work-information":["https://w3id.org/mobilitydcat-ap/mobility-theme/long-term-road-works","https://w3id.org/mobilitydcat-ap/mobility-theme/short-term-road-works"],"https://w3id.org/mobilitydcat-ap/mobility-theme/sharing-and-hiring-services":["https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods"],"https://w3id.org/mobilitydcat-ap/mobility-theme/static-road-network-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/geometry","https://w3id.org/mobilitydcat-ap/mobility-theme/gradients","https://w3id.org/mobilitydcat-ap/mobility-theme/junctions","https://w3id.org/mobilitydcat-ap/mobility-theme/number-of-lanes","https://w3id.org/mobilitydcat-ap/mobility-theme/road-classification","https://w3id.org/mobilitydcat-ap/mobility-theme/road-width"],"https://w3id.org/mobilitydcat-ap/mobility-theme/static-traffic-signs-and-regulations":["https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/other-static-traffic-signs","https://w3id.org/mobilitydcat-ap/mobility-theme/other-traffic-regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/permanent-access-restrictions","https://w3id.org/mobilitydcat-ap/mobility-theme/speed-limits","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-circulation-plans","https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-access-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/toll-information":["https://w3id.org/mobilitydcat-ap/mobility-theme/applicable-road-user-charges-and-payment-methods","https://w3id.org/mobilitydcat-ap/mobility-theme/identification-of-tolled-roads","https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-tolling-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods-for-tolls"],"https://w3id.org/mobilitydcat-ap/mobility-theme/waterways-and-water-bodies":[]},_o=new Set(Object.keys($o));new Set(Object.values($o).flat());const xo={"https://w3id.org/mobilitydcat-ap/mobility-theme/accesibility-information-for-vehicles":"Accesibility information for vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/accidents-and-incidents":"Accidents and incidents","https://w3id.org/mobilitydcat-ap/mobility-theme/address-identifiers":"Address identifiers","https://w3id.org/mobilitydcat-ap/mobility-theme/air-and-space-travel":"Air and space travel","https://w3id.org/mobilitydcat-ap/mobility-theme/applicable-road-user-charges-and-payment-methods":"Applicable road user charges and payment methods","https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-charging-points-for-electric-vehicles":"Availability of charging points for electric vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-delivery-areas":"Availability of delivery areas","https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-filling-stations":"Availability of filling stations","https://w3id.org/mobilitydcat-ap/mobility-theme/basic-commercial-conditions":"Basic commercial conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/basic-common-standard-fares":"Basic common standard fares","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-availability":"Bike-hiring Availability","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-stations":"Bike-hiring Stations","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-parking-locations":"Bike-parking locations","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-availability":"Bike sharing Availability","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-locations-and-stations":"Bike-sharing Locations and stations","https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-access-conditions":"Bridge access conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-closures-and-access-conditions":"Bridge closures and access conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-availability":"Car-hiring Availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-stations":"Car-hiring Stations","https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-availability":"Car parking availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-locations-and-conditions":"Car parking locations and conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-availability":"Car-sharing Availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-locations-and-stations":"Car-sharing Locations and stations","https://w3id.org/mobilitydcat-ap/mobility-theme/common-fare-products":"Common fare products","https://w3id.org/mobilitydcat-ap/mobility-theme/connection-links":"Connection links","https://w3id.org/mobilitydcat-ap/mobility-theme/current-travel-times":"Current travel times","https://w3id.org/mobilitydcat-ap/mobility-theme/cycle-network-data":"Cycle network data","https://w3id.org/mobilitydcat-ap/mobility-theme/data-content-category":"Data content category","https://w3id.org/mobilitydcat-ap/mobility-theme/data-content-sub-category":"Data content sub-category","https://w3id.org/mobilitydcat-ap/mobility-theme/direction-of-travel-on-reversible-lanes":"Direction of travel on reversible lanes","https://w3id.org/mobilitydcat-ap/mobility-theme/disruptions-delays-cancellations":"Disruptions, delays, cancellations","https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-overtaking-bans-on-heavy-goods-vehicles":"Dynamic overtaking bans on heavy goods vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-speed-limits":"Dynamic speed limits","https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-traffic-signs-and-regulations":"Dynamic traffic signs and regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-availability":"E-scooter-sharing Availability","https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-locations-and-stations":"E-scooter-sharing Locations and stations","https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles":"Environmental standards for vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/expected-delays":"Expected delays","https://w3id.org/mobilitydcat-ap/mobility-theme/fares":"Fares","https://w3id.org/mobilitydcat-ap/mobility-theme/filling-and-charging-stations":"Filling and charging stations","https://w3id.org/mobilitydcat-ap/mobility-theme/freight-and-logistics":"Freight and logistics","https://w3id.org/mobilitydcat-ap/mobility-theme/freight-delivery-regulations":"Freight delivery regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/general-information-for-trip-planning-":"General information for trip-planning","https://w3id.org/mobilitydcat-ap/mobility-theme/geometry":"Geometry","https://w3id.org/mobilitydcat-ap/mobility-theme/gradients":"Gradients","https://w3id.org/mobilitydcat-ap/mobility-theme/hours-of-operation":"Hours of operation","https://w3id.org/mobilitydcat-ap/mobility-theme/identification-of-tolled-roads":"Identification of tolled roads","https://w3id.org/mobilitydcat-ap/mobility-theme/junctions":"Junctions","https://w3id.org/mobilitydcat-ap/mobility-theme/lane-closures-and-access-conditions":"Lane closures and access conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-charging-points":"Location and conditions of charging points","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-filling-stations":"Location and conditions of filling stations","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-length-of-queues":"Location and length of queues","https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-delivery-areas":"Location of delivery areas","https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-tolling-stations":"Location of tolling stations","https://w3id.org/mobilitydcat-ap/mobility-theme/locations-and-stations":"Locations and stations","https://w3id.org/mobilitydcat-ap/mobility-theme/long-term-road-works":"Long-term road works","https://w3id.org/mobilitydcat-ap/mobility-theme/network-closures-diversions":"Network closures/diversions","https://w3id.org/mobilitydcat-ap/mobility-theme/network-detailed-attributes":"Network detailed attributes","https://w3id.org/mobilitydcat-ap/mobility-theme/network-geometry-and-lane-character":"Network geometry and lane character","https://w3id.org/mobilitydcat-ap/mobility-theme/network-topology-and-routes-lines":"Network topology and routes/lines","https://w3id.org/mobilitydcat-ap/mobility-theme/number-of-lanes":"Number of lanes","https://w3id.org/mobilitydcat-ap/mobility-theme/operational-calendar":"Operational Calendar","https://w3id.org/mobilitydcat-ap/mobility-theme/other":"Other","https://w3id.org/mobilitydcat-ap/mobility-theme/other-access-restrictions-and-traffic-regulations":"Other access restrictions and traffic regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/other-static-traffic-signs":"Other static traffic signs","https://w3id.org/mobilitydcat-ap/mobility-theme/other-temporary-traffic-management-measures-or-plans":"Other temporary traffic management measures or plans","https://w3id.org/mobilitydcat-ap/mobility-theme/other-traffic-regulations":"Other traffic regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-costs":"Parameters needed to calculate costs","https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-environmental-factors":"Parameters needed to calculate environmental factors","https://w3id.org/mobilitydcat-ap/mobility-theme/park-and-ride-stops":"Park and Ride stops","https://w3id.org/mobilitydcat-ap/mobility-theme/parking-service-and-rest-area-information":"Parking, service and rest area information","https://w3id.org/mobilitydcat-ap/mobility-theme/passenger-classes":"Passenger classes","https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods":"Payment methods","https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods-for-tolls":"Payment methods for tolls","https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-accessibility-facilities":"Pedestrian accessibility facilities","https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-data":"Pedestrian network data","https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-geometry":"Pedestrian network geometry","https://w3id.org/mobilitydcat-ap/mobility-theme/permanent-access-restrictions":"Permanent access restrictions","https://w3id.org/mobilitydcat-ap/mobility-theme/planned-interchanges-between-scheduled-services":"Planned interchanges between scheduled services","https://w3id.org/mobilitydcat-ap/mobility-theme/points-of-interest":"Points of interest","https://w3id.org/mobilitydcat-ap/mobility-theme/poor-road-conditions":"Poor road conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/predicted-travel-times":"Predicted travel times","https://w3id.org/mobilitydcat-ap/mobility-theme/provider-data":"Provider data","https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-non-scheduled-transport":"Public transport non-scheduled transport","https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-scheduled-transport":"Public transport scheduled transport","https://w3id.org/mobilitydcat-ap/mobility-theme/purchase-information":"Purchase information","https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-estimated-departure-and-arrival-times":"Real-time estimated departure and arrival times","https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-traffic-data":"Real-time traffic data","https://w3id.org/mobilitydcat-ap/mobility-theme/reservation-and-purchase-options":"Reservation and purchase options","https://w3id.org/mobilitydcat-ap/mobility-theme/road-classification":"Road classification","https://w3id.org/mobilitydcat-ap/mobility-theme/road-closures-and-access-conditions":"Road closures and access conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/road-events-and-conditions":"Road events and conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/road-weather-conditions":"Road weather conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/road-width":"Road width","https://w3id.org/mobilitydcat-ap/mobility-theme/road-work-information":"Road work information","https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-availability":"Service and rest area availability","https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-locations-and-conditions":"Service and rest area locations and conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/service-areas-and-service-times":"Service areas and service times","https://w3id.org/mobilitydcat-ap/mobility-theme/sharing-and-hiring-services":"Sharing and Hiring Services","https://w3id.org/mobilitydcat-ap/mobility-theme/short-term-road-works":"Short-term road works","https://w3id.org/mobilitydcat-ap/mobility-theme/special-fare-products":"Special Fare Products","https://w3id.org/mobilitydcat-ap/mobility-theme/speed":"Speed","https://w3id.org/mobilitydcat-ap/mobility-theme/speed-limits":"Speed limits","https://w3id.org/mobilitydcat-ap/mobility-theme/static-road-network-data":"Static road network data","https://w3id.org/mobilitydcat-ap/mobility-theme/static-traffic-signs-and-regulations":"Static traffic signs and regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-accessibility-and-paths-within-facility":"Stop facilities accessibility and paths within facility","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-geometry-and-map-layout":"Stop facilities geometry and map layout","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-location-and-features":"Stop facilities location and features","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-status-of-features":"Stop facilities status of features","https://w3id.org/mobilitydcat-ap/mobility-theme/timetables-static":"Timetables static","https://w3id.org/mobilitydcat-ap/mobility-theme/toll-information":"Toll information","https://w3id.org/mobilitydcat-ap/mobility-theme/topographic-places":"Topographic places","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-circulation-plans":"Traffic circulation plans","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-data-at-border-crossings-to-third-countries":"Traffic data at border crossings to third countries","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-volume":"Traffic volume","https://w3id.org/mobilitydcat-ap/mobility-theme/transport-operators":"Transport operators","https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-availability":"Truck parking availability","https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-locations-and-conditions":"Truck parking locations and conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-access-conditions":"Tunnel access conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-closures-and-access-conditions":"Tunnel closures and access conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/vehicle-details":"Vehicle details","https://w3id.org/mobilitydcat-ap/mobility-theme/waiting-time-at-border-crossings-to-non-eu-member-states":"Waiting time at border crossings to non-EU Member States","https://w3id.org/mobilitydcat-ap/mobility-theme/waterways-and-water-bodies":"Waterways and water bodies"};const ko={initialize(){fo.apply(this),console.log("---- INITIALIZE ----\x3e"),this.state={topMobilityTheme:this._getInitialMobilityTheme()},console.log(`Initial state: ${JSON.stringify(this.state)}`);const t=this._getTopMobilityThemeSelector();this._getSubMobilityThemeSelector(),t.on("change",this._onTopMobilityThemeChanged),this._onStateUpdate(this._handleTopMobilityThemeChanged),this._subThemeSelectorViewUpdate(void 0,this.state),console.log(`State after init: ${JSON.stringify(this.state)}`),console.log("<----- INITIALIZE -------")},teardown:function(){this._stateListeners=void 0},_getInitialMobilityTheme(){const t=this._getTopMobilityThemeSelector().val();return"string"==typeof(i=t)&&_o.has(i)?t:void 0;var i},_getTopMobilityThemeSelector(){return this.$("#field-mobility_theme")},_getSubMobilityThemeSelector(){return this.$("#field-mobility_theme_sub")},_onTopMobilityThemeChanged(t){const i=t.target.value;this._mergeState({topMobilityTheme:i})},_stateChangedKeys(t,i){const e=new Set;for(const a in t)a in i?t[a]!==i[a]&&e.add(a):e.add(a);for(const a in i)a in t||e.add(a);return e},_triggerListeners(t,i){if(this._stateListeners)for(const e of this._stateListeners)e(t,i)},_updateState(t){const i=this.state;this.state=t;const e=this._stateChangedKeys(i,t);return this._triggerListeners(i,e),t},_mergeState(t){const i=this.state,e={...this.state,...t};this.state=e;const a=this._stateChangedKeys(i,e);return this._triggerListeners(i,a),e},_onStateUpdate(t){return this._stateListeners?this._stateListeners.push(t):this._stateListeners=[t],()=>{this._stateListeners&&(this._stateListeners=this._stateListeners.filter((i=>i!==t)))}},_handleTopMobilityThemeChanged(t,i){i.has("topMobilityTheme")&&this._subThemeSelectorViewUpdate(t,this.state)},_subThemeSelectorViewUpdate(t,i){function e(t){return"object"==typeof t&&!!t.subMobilityThemeSelectorParent&&!!t.subMobilityThemeSelector}function a(){const t=this._getSubMobilityThemeSelector().parentsUntil("form").filter("div.form-group");"none"!==t.css("display")?t.css("display","none"):t.css("display","")}const o=void 0===t,s=t?.topMobilityTheme!==i.topMobilityTheme;if(o||s){const t=$o[i.topMobilityTheme];if(t?.length>0){(function(){if(e(i)){i.subMobilityThemeSelectorParent.append(i.subMobilityThemeSelector),a.apply(this);const t={...i},e=new Set(["subMobilityThemeSelector","subMobilityThemeSelectorParent"]),o=Object.keys(t).reduce(((i,a)=>(e.has(a)||(i[a]=t[a]),i)),{});this._updateState(o)}}).apply(this);const o=function(t){const i=t.map((t=>{const i=document.createElement("option");return i.value=t,i.text=xo[t],i})),e=document.createElement("option");return e.value="",e.text="",e.selected=!0,i.unshift(e),i}.apply(this,[t]);(function(t){this._getSubMobilityThemeSelector().empty().append(t)}).apply(this,[o])}else(function(){if(!e(i)){a.apply(this);const t=this._getSubMobilityThemeSelector().parent(),i=this._getSubMobilityThemeSelector().detach();this._mergeState({subMobilityThemeSelector:i,subMobilityThemeSelectorParent:t})}}).apply(this)}}};ckan.module("digitraffic_theme_dataset_form_wrapper",(function(t){return ko})),jQuery((function(){$(".js-disabled").removeClass("js-disabled"),(({icons:t={},nameAttr:i="data-lucide",attrs:e={}}={})=>{if(!Object.values(t).length)throw new Error("Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`");if("undefined"==typeof document)throw new Error("`createIcons()` only works in a browser environment.");const a=document.querySelectorAll(`[${i}]`);if(Array.from(a).forEach((a=>Xa(a,{nameAttr:i,icons:t,attrs:e}))),"data-lucide"===i){const i=document.querySelectorAll("[icon-name]");i.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(i).forEach((i=>Xa(i,{nameAttr:"icon-name",icons:t,attrs:e}))))}})({icons:{ExternalLink:ao,User:po,Menu:lo,Globe:so,ChevronDown:io,ChevronUp:eo,Facebook:oo,Twitter:ho,Instagram:ro,Youtube:co,Linkedin:no}})}));
