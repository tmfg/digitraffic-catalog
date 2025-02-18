const t={name:"fds-size-3",value:"24px"},i=class{get shadowRoot(){return this.__host.__shadowRoot}constructor(t){this.ariaAtomic="",this.ariaAutoComplete="",this.ariaBrailleLabel="",this.ariaBrailleRoleDescription="",this.ariaBusy="",this.ariaChecked="",this.ariaColCount="",this.ariaColIndex="",this.ariaColSpan="",this.ariaCurrent="",this.ariaDescription="",this.ariaDisabled="",this.ariaExpanded="",this.ariaHasPopup="",this.ariaHidden="",this.ariaInvalid="",this.ariaKeyShortcuts="",this.ariaLabel="",this.ariaLevel="",this.ariaLive="",this.ariaModal="",this.ariaMultiLine="",this.ariaMultiSelectable="",this.ariaOrientation="",this.ariaPlaceholder="",this.ariaPosInSet="",this.ariaPressed="",this.ariaReadOnly="",this.ariaRequired="",this.ariaRoleDescription="",this.ariaRowCount="",this.ariaRowIndex="",this.ariaRowSpan="",this.ariaSelected="",this.ariaSetSize="",this.ariaSort="",this.ariaValueMax="",this.ariaValueMin="",this.ariaValueNow="",this.ariaValueText="",this.role="",this.form=null,this.labels=[],this.states=new Set,this.validationMessage="",this.validity={},this.willValidate=!0,this.__host=t}checkValidity(){return console.warn("`ElementInternals.checkValidity()` was called on the server.This method always returns true."),!0}reportValidity(){return!0}setFormValue(){}setValidity(){}};
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
var e,a,o,s,r,n,l,d,h,p,c,g,m=function(t,i,e,a,o){if("m"===a)throw new TypeError("Private method is not writable");if("a"===a&&!o)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof i?t!==i||!o:!i.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===a?o.call(t,e):o?o.value=e:i.set(t,e),e},y=function(t,i,e,a){if("a"===e&&!a)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof i?t!==i||!a:!i.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===e?a:"a"===e?a.call(t):a?a.value:i.get(t)};const f=t=>"boolean"==typeof t?t:t?.capture??!1,b=class{constructor(){this.__eventListeners=new Map,this.__captureEventListeners=new Map}addEventListener(t,i,e){if(null==i)return;const a=f(e)?this.__captureEventListeners:this.__eventListeners;let o=a.get(t);if(void 0===o)o=new Map,a.set(t,o);else if(o.has(i))return;const s="object"==typeof e&&e?e:{};s.signal?.addEventListener("abort",(()=>this.removeEventListener(t,i,e))),o.set(i,s??{})}removeEventListener(t,i,e){if(null==i)return;const a=f(e)?this.__captureEventListeners:this.__eventListeners,o=a.get(t);void 0!==o&&(o.delete(i),o.size||a.delete(t))}dispatchEvent(t){const i=[this];let e=this.__eventTargetParent;if(t.composed)for(;e;)i.push(e),e=e.__eventTargetParent;else for(;e&&e!==this.__host;)i.push(e),e=e.__eventTargetParent;let a=!1,o=!1,s=0,r=null,n=null,l=null;const d=t.stopPropagation,h=t.stopImmediatePropagation;Object.defineProperties(t,{target:{get:()=>r??n,...u},srcElement:{get:()=>t.target,...u},currentTarget:{get:()=>l,...u},eventPhase:{get:()=>s,...u},composedPath:{value:()=>i,...u},stopPropagation:{value:()=>{a=!0,d.call(t)},...u},stopImmediatePropagation:{value:()=>{o=!0,h.call(t)},...u}});const p=(i,e,a)=>{"function"==typeof i?i(t):"function"==typeof i?.handleEvent&&i.handleEvent(t),e.once&&a.delete(i)},c=()=>(l=null,s=0,!t.defaultPrevented),g=i.slice().reverse();r=this.__host&&t.composed?null:this;const m=t=>{for(n=this;n.__host&&t.includes(n.__host);)n=n.__host};for(const i of g){r||n&&n!==i.__host||m(g.slice(g.indexOf(i))),l=i,s=i===t.target?2:1;const e=i.__captureEventListeners.get(t.type);if(e)for(const[t,i]of e)if(p(t,i,e),o)return c();if(a)return c()}const y=t.bubbles?i:[this];n=null;for(const i of y){r||n&&i!==n.__host||m(y.slice(0,y.indexOf(i)+1)),l=i,s=i===t.target?2:3;const e=i.__eventListeners.get(t.type);if(e)for(const[t,i]of e)if(p(t,i,e),o)return c();if(a)return c()}return c()}},u={__proto__:null,enumerable:!0};Object.freeze(u);const v=(p=class{constructor(t,i={}){if(e.set(this,!1),a.set(this,!1),o.set(this,!1),s.set(this,!1),r.set(this,Date.now()),n.set(this,!1),l.set(this,void 0),d.set(this,void 0),h.set(this,void 0),this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,0===arguments.length)throw new Error("The type argument must be specified");if("object"!=typeof i||!i)throw new Error('The "options" argument must be an object');const{bubbles:p,cancelable:c,composed:g}=i;m(this,e,!!c,"f"),m(this,a,!!p,"f"),m(this,o,!!g,"f"),m(this,l,`${t}`,"f"),m(this,d,null,"f"),m(this,h,!1,"f")}initEvent(t,i,e){throw new Error("Method not implemented.")}stopImmediatePropagation(){this.stopPropagation()}preventDefault(){m(this,s,!0,"f")}get target(){return y(this,d,"f")}get currentTarget(){return y(this,d,"f")}get srcElement(){return y(this,d,"f")}get type(){return y(this,l,"f")}get cancelable(){return y(this,e,"f")}get defaultPrevented(){return y(this,e,"f")&&y(this,s,"f")}get timeStamp(){return y(this,r,"f")}composedPath(){return y(this,h,"f")?[y(this,d,"f")]:[]}get returnValue(){return!y(this,e,"f")||!y(this,s,"f")}get bubbles(){return y(this,a,"f")}get composed(){return y(this,o,"f")}get eventPhase(){return y(this,h,"f")?p.AT_TARGET:p.NONE}get cancelBubble(){return y(this,n,"f")}set cancelBubble(t){t&&m(this,n,!0,"f")}stopPropagation(){m(this,n,!0,"f")}get isTrusted(){return!1}},e=new WeakMap,a=new WeakMap,o=new WeakMap,s=new WeakMap,r=new WeakMap,n=new WeakMap,l=new WeakMap,d=new WeakMap,h=new WeakMap,p.NONE=0,p.CAPTURING_PHASE=1,p.AT_TARGET=2,p.BUBBLING_PHASE=3,p);Object.defineProperties(v.prototype,{initEvent:u,stopImmediatePropagation:u,preventDefault:u,target:u,currentTarget:u,srcElement:u,type:u,cancelable:u,defaultPrevented:u,timeStamp:u,composedPath:u,returnValue:u,bubbles:u,composed:u,eventPhase:u,cancelBubble:u,stopPropagation:u,isTrusted:u});const w=(g=class extends v{constructor(t,i={}){super(t,i),c.set(this,void 0),m(this,c,i?.detail??null,"f")}initCustomEvent(t,i,e,a){throw new Error("Method not implemented.")}get detail(){return y(this,c,"f")}},c=new WeakMap,g);Object.defineProperties(w.prototype,{detail:u});const _=v,k=w;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
globalThis.Event??=_,globalThis.CustomEvent??=k;const x=new WeakMap,S=t=>{let i=x.get(t);return void 0===i&&x.set(t,i=new Map),i},A=class extends b{constructor(){super(...arguments),this.__shadowRootMode=null,this.__shadowRoot=null,this.__internals=null}get attributes(){return Array.from(S(this)).map((([t,i])=>({name:t,value:i})))}get shadowRoot(){return"closed"===this.__shadowRootMode?null:this.__shadowRoot}get localName(){return this.constructor.__localName}get tagName(){return this.localName?.toUpperCase()}setAttribute(t,i){S(this).set(t,String(i))}removeAttribute(t){S(this).delete(t)}toggleAttribute(t,i){return this.hasAttribute(t)?!(void 0===i||!i)||(this.removeAttribute(t),!1):!(void 0!==i&&!i)&&(this.setAttribute(t,""),!0)}hasAttribute(t){return S(this).has(t)}attachShadow(t){const i={host:this};return this.__shadowRootMode=t.mode,t&&"open"===t.mode&&(this.__shadowRoot=i),i}attachInternals(){if(null!==this.__internals)throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");const t=new i(this);return this.__internals=t,t}getAttribute(t){return S(this).get(t)??null}},E=class extends A{};globalThis.litServerRoot??=Object.defineProperty(new E,"localName",{get:()=>"lit-server-root"});const M=new class{constructor(){this.__definitions=new Map}define(t,i){if(this.__definitions.has(t)){if("development"!==process.env.NODE_ENV)throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the name "${t}" has already been used with this registry`);console.warn(`'CustomElementRegistry' already has "${t}" defined. This may have been caused by live reload or hot module replacement in which case it can be safely ignored.\nMake sure to test your application with a production build as repeat registrations will throw in production.`)}i.__localName=t,this.__definitions.set(t,{ctor:i,observedAttributes:i.observedAttributes??[]})}get(t){const i=this.__definitions.get(t);return i?.ctor}},P=globalThis,C=P.ShadowRoot&&(void 0===P.ShadyCSS||P.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,T=Symbol(),z=new WeakMap;let L=class{constructor(t,i,e){if(this._$cssResult$=!0,e!==T)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const i=this.t;if(C&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=z.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&z.set(i,t))}return t}toString(){return this.cssText}};const N=t=>new L("string"==typeof t?t:t+"",void 0,T),O=(t,...i)=>{const e=1===t.length?t[0]:i.reduce(((i,e,a)=>i+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(e)+t[a+1]),t[0]);return new L(e,t,T)},R=(t,i)=>{C?t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((i=>{const e=document.createElement("style"),a=P.litNonce;void 0!==a&&e.setAttribute("nonce",a),e.textContent=i.cssText,t.appendChild(e)}))},U=C||void 0===P.CSSStyleSheet?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(const e of t.cssRules)i+=e.cssText;return N(i)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var D,j;const B=globalThis;null!==(D=B.customElements)&&void 0!==D||(B.customElements=M);const H=B.trustedTypes,I=H?H.emptyScript:"",V=B.reactiveElementPolyfillSupport,W={toAttribute(t,i){switch(i){case Boolean:t=t?I:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let e=t;switch(i){case Boolean:e=null!==t;break;case Number:e=null===t?null:Number(t);break;case Object:case Array:try{e=JSON.parse(t)}catch(t){e=null}}return e}},F=(t,i)=>i!==t&&(i==i||t==t),K={attribute:!0,type:String,converter:W,reflect:!1,hasChanged:F},G="finalized";let q=class extends(globalThis.HTMLElement??E){constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,e)=>{const a=this._$Ep(e,i);void 0!==a&&(this._$Ev.set(a,e),t.push(a))})),t}static createProperty(t,i=K){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const e="symbol"==typeof t?Symbol():"__"+t,a=this.getPropertyDescriptor(t,e,i);void 0!==a&&Object.defineProperty(this.prototype,t,a)}}static getPropertyDescriptor(t,i,e){return{get(){return this[i]},set(a){const o=this[t];this[i]=a,this.requestUpdate(t,o,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||K}static finalize(){if(this.hasOwnProperty(G))return!1;this[G]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const e of i)this.createProperty(e,t[e])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const e=new Set(t.flat(1/0).reverse());for(const t of e)i.unshift(U(t))}else void 0!==t&&i.push(U(t));return i}static _$Ep(t,i){const e=i.attribute;return!1===e?void 0:"string"==typeof e?e:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var i,e;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(e=t.hostConnected)||void 0===e||e.call(t))}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return R(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}))}attributeChangedCallback(t,i,e){this._$AK(t,e)}_$EO(t,i,e=K){var a;const o=this.constructor._$Ep(t,e);if(void 0!==o&&!0===e.reflect){const s=(void 0!==(null===(a=e.converter)||void 0===a?void 0:a.toAttribute)?e.converter:W).toAttribute(i,e.type);this._$El=t,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$El=null}}_$AK(t,i){var e;const a=this.constructor,o=a._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=a.getPropertyOptions(o),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(e=t.converter)||void 0===e?void 0:e.fromAttribute)?t.converter:W;this._$El=o,this[o]=s.fromAttribute(i,t.type),this._$El=null}}requestUpdate(t,i,e){let a=!0;void 0!==t&&(((e=e||this.constructor.getPropertyOptions(t)).hasChanged||F)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===e.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,e))):a=!1),!this.isUpdatePending&&a&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(e)):this._$Ek()}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(e)}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Z;q[G]=!0,q.elementProperties=new Map,q.elementStyles=[],q.shadowRootOptions={mode:"open"},null==V||V({ReactiveElement:q}),(null!==(j=B.reactiveElementVersions)&&void 0!==j?j:B.reactiveElementVersions=[]).push("1.6.3");const J=globalThis,Q=J.trustedTypes,Y=Q?Q.createPolicy("lit-html",{createHTML:t=>t}):void 0,X="$lit$",tt=`lit$${(Math.random()+"").slice(9)}$`,it="?"+tt,et=`<${it}>`,at=void 0===J.document?{createTreeWalker:()=>({})}:document,ot=()=>at.createComment(""),st=t=>null===t||"object"!=typeof t&&"function"!=typeof t,rt=Array.isArray,nt="[ \t\n\f\r]",lt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,dt=/-->/g,ht=/>/g,pt=RegExp(`>|${nt}(?:([^\\s"'>=/]+)(${nt}*=${nt}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),ct=/'/g,gt=/"/g,mt=/^(?:script|style|textarea|title)$/i,yt=(t=>(i,...e)=>({_$litType$:t,strings:i,values:e}))(1),ft=Symbol.for("lit-noChange"),bt=Symbol.for("lit-nothing"),ut=new WeakMap,vt=at.createTreeWalker(at,129,null,!1);function wt(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==Y?Y.createHTML(i):i}const _t=(t,i)=>{const e=t.length-1,a=[];let o,s=2===i?"<svg>":"",r=lt;for(let i=0;i<e;i++){const e=t[i];let n,l,d=-1,h=0;for(;h<e.length&&(r.lastIndex=h,l=r.exec(e),null!==l);)h=r.lastIndex,r===lt?"!--"===l[1]?r=dt:void 0!==l[1]?r=ht:void 0!==l[2]?(mt.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=pt):void 0!==l[3]&&(r=pt):r===pt?">"===l[0]?(r=null!=o?o:lt,d=-1):void 0===l[1]?d=-2:(d=r.lastIndex-l[2].length,n=l[1],r=void 0===l[3]?pt:'"'===l[3]?gt:ct):r===gt||r===ct?r=pt:r===dt||r===ht?r=lt:(r=pt,o=void 0);const p=r===pt&&t[i+1].startsWith("/>")?" ":"";s+=r===lt?e+et:d>=0?(a.push(n),e.slice(0,d)+X+e.slice(d)+tt+p):e+tt+(-2===d?(a.push(void 0),i):p)}return[wt(t,s+(t[e]||"<?>")+(2===i?"</svg>":"")),a]};class $t{constructor({strings:t,_$litType$:i},e){let a;this.parts=[];let o=0,s=0;const r=t.length-1,n=this.parts,[l,d]=_t(t,i);if(this.el=$t.createElement(l,e),vt.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes)}for(;null!==(a=vt.nextNode())&&n.length<r;){if(1===a.nodeType){if(a.hasAttributes()){const t=[];for(const i of a.getAttributeNames())if(i.endsWith(X)||i.startsWith(tt)){const e=d[s++];if(t.push(i),void 0!==e){const t=a.getAttribute(e.toLowerCase()+X).split(tt),i=/([.?@])?(.*)/.exec(e);n.push({type:1,index:o,name:i[2],strings:t,ctor:"."===i[1]?Et:"?"===i[1]?Pt:"@"===i[1]?Ct:At})}else n.push({type:6,index:o})}for(const i of t)a.removeAttribute(i)}if(mt.test(a.tagName)){const t=a.textContent.split(tt),i=t.length-1;if(i>0){a.textContent=Q?Q.emptyScript:"";for(let e=0;e<i;e++)a.append(t[e],ot()),vt.nextNode(),n.push({type:2,index:++o});a.append(t[i],ot())}}}else if(8===a.nodeType)if(a.data===it)n.push({type:2,index:o});else{let t=-1;for(;-1!==(t=a.data.indexOf(tt,t+1));)n.push({type:7,index:o}),t+=tt.length-1}o++}}static createElement(t,i){const e=at.createElement("template");return e.innerHTML=t,e}}function kt(t,i,e=t,a){var o,s,r,n;if(i===ft)return i;let l=void 0!==a?null===(o=e._$Co)||void 0===o?void 0:o[a]:e._$Cl;const d=st(i)?void 0:i._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(s=null==l?void 0:l._$AO)||void 0===s||s.call(l,!1),void 0===d?l=void 0:(l=new d(t),l._$AT(t,e,a)),void 0!==a?(null!==(r=(n=e)._$Co)&&void 0!==r?r:n._$Co=[])[a]=l:e._$Cl=l),void 0!==l&&(i=kt(t,l._$AS(t,i.values),l,a)),i}class xt{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:e},parts:a}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:at).importNode(e,!0);vt.currentNode=o;let s=vt.nextNode(),r=0,n=0,l=a[0];for(;void 0!==l;){if(r===l.index){let i;2===l.type?i=new St(s,s.nextSibling,this,t):1===l.type?i=new l.ctor(s,l.name,l.strings,this,t):6===l.type&&(i=new Tt(s,this,t)),this._$AV.push(i),l=a[++n]}r!==(null==l?void 0:l.index)&&(s=vt.nextNode(),r++)}return vt.currentNode=at,o}v(t){let i=0;for(const e of this._$AV)void 0!==e&&(void 0!==e.strings?(e._$AI(t,e,i),i+=e.strings.length-2):e._$AI(t[i])),i++}}class St{constructor(t,i,e,a){var o;this.type=2,this._$AH=bt,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=e,this.options=a,this._$Cp=null===(o=null==a?void 0:a.isConnected)||void 0===o||o}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=kt(this,t,i),st(t)?t===bt||null==t||""===t?(this._$AH!==bt&&this._$AR(),this._$AH=bt):t!==this._$AH&&t!==ft&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>rt(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==bt&&st(this._$AH)?this._$AA.nextSibling.data=t:this.$(at.createTextNode(t)),this._$AH=t}g(t){var i;const{values:e,_$litType$:a}=t,o="number"==typeof a?this._$AC(t):(void 0===a.el&&(a.el=$t.createElement(wt(a.h,a.h[0]),this.options)),a);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(e);else{const t=new xt(o,this),i=t.u(this.options);t.v(e),this.$(i),this._$AH=t}}_$AC(t){let i=ut.get(t.strings);return void 0===i&&ut.set(t.strings,i=new $t(t)),i}T(t){rt(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let e,a=0;for(const o of t)a===i.length?i.push(e=new St(this.k(ot()),this.k(ot()),this,this.options)):e=i[a],e._$AI(o),a++;a<i.length&&(this._$AR(e&&e._$AB.nextSibling,a),i.length=a)}_$AR(t=this._$AA.nextSibling,i){var e;for(null===(e=this._$AP)||void 0===e||e.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t))}}class At{constructor(t,i,e,a,o){this.type=1,this._$AH=bt,this._$AN=void 0,this.element=t,this.name=i,this._$AM=a,this.options=o,e.length>2||""!==e[0]||""!==e[1]?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=bt}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,e,a){const o=this.strings;let s=!1;if(void 0===o)t=kt(this,t,i,0),s=!st(t)||t!==this._$AH&&t!==ft,s&&(this._$AH=t);else{const a=t;let r,n;for(t=o[0],r=0;r<o.length-1;r++)n=kt(this,a[e+r],i,r),n===ft&&(n=this._$AH[r]),s||(s=!st(n)||n!==this._$AH[r]),n===bt?t=bt:t!==bt&&(t+=(null!=n?n:"")+o[r+1]),this._$AH[r]=n}s&&!a&&this.j(t)}j(t){t===bt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Et extends At{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===bt?void 0:t}}const Mt=Q?Q.emptyScript:"";class Pt extends At{constructor(){super(...arguments),this.type=4}j(t){t&&t!==bt?this.element.setAttribute(this.name,Mt):this.element.removeAttribute(this.name)}}class Ct extends At{constructor(t,i,e,a,o){super(t,i,e,a,o),this.type=5}_$AI(t,i=this){var e;if((t=null!==(e=kt(this,t,i,0))&&void 0!==e?e:bt)===ft)return;const a=this._$AH,o=t===bt&&a!==bt||t.capture!==a.capture||t.once!==a.once||t.passive!==a.passive,s=t!==bt&&(a===bt||o);o&&this.element.removeEventListener(this.name,this,a),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var i,e;"function"==typeof this._$AH?this._$AH.call(null!==(e=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==e?e:this.element,t):this._$AH.handleEvent(t)}}class Tt{constructor(t,i,e){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(t){kt(this,t)}}const zt=J.litHtmlPolyfillSupport;null==zt||zt($t,St),(null!==(Z=J.litHtmlVersions)&&void 0!==Z?Z:J.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Lt,Nt;class Ot extends q{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,i;const e=super.createRenderRoot();return null!==(t=(i=this.renderOptions).renderBefore)&&void 0!==t||(i.renderBefore=e.firstChild),e}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,i,e)=>{var a,o;const s=null!==(a=null==e?void 0:e.renderBefore)&&void 0!==a?a:i;let r=s._$litPart$;if(void 0===r){const t=null!==(o=null==e?void 0:e.renderBefore)&&void 0!==o?o:null;s._$litPart$=r=new St(i.insertBefore(ot(),t),t,void 0,null!=e?e:{})}return r._$AI(t),r})(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return ft}}Ot.finalized=!0,Ot._$litElement$=!0,null===(Lt=globalThis.litElementHydrateSupport)||void 0===Lt||Lt.call(globalThis,{LitElement:Ot});const Rt=globalThis.litElementPolyfillSupport;null==Rt||Rt({LitElement:Ot}),(null!==(Nt=globalThis.litElementVersions)&&void 0!==Nt?Nt:globalThis.litElementVersions=[]).push("3.3.3");const Ut=N("var(--fds-typography-body-default-font-family, 'Public Sans')"),Dt=N("var(--fds-typography-body-default-font-size, 16px)"),jt=N("var(--fds-typography-body-default-letter-spacing, 0px)"),Bt=N("var(--fds-typography-body-default-line-height, 150%)"),Ht=N("var(--fds-typography-body-default-font-weight, 400)"),It=N("var(--fds-typography-body-default-display, inline-block)"),Vt=N("var(--fds-typography-body-large-font-family, 'Public Sans')"),Wt=N("var(--fds-typography-body-large-font-size, 18px)"),Ft=N("var(--fds-typography-body-large-letter-spacing, 0px)"),Kt=N("var(--fds-typography-body-large-line-height, 150%)"),Gt=N("var(--fds-typography-body-large-font-weight, 400)"),qt=N("var(--fds-typography-body-large-display, inline-block)"),Zt=N("var(--fds-typography-body-micro-font-family, 'Public Sans')"),Jt=N("var(--fds-typography-body-micro-font-size, 12px)"),Qt=N("var(--fds-typography-body-micro-letter-spacing, 0px)"),Yt=N("var(--fds-typography-body-micro-line-height, 150%)"),Xt=N("var(--fds-typography-body-micro-font-weight, 400)"),ti=N("var(--fds-typography-body-micro-display, inline-block)"),ii=N("var(--fds-typography-body-small-font-family, 'Public Sans')"),ei=N("var(--fds-typography-body-small-font-size, 14px)"),ai=N("var(--fds-typography-body-small-letter-spacing, 0px)"),oi=N("var(--fds-typography-body-small-line-height, 150%)"),si=N("var(--fds-typography-body-small-font-weight, 400)"),ri=N("var(--fds-typography-body-small-display, inline-block)"),ni=N("var(--fds-typography-emphasis-default-font-family, 'Public Sans')"),li=N("var(--fds-typography-emphasis-default-font-size, 16px)"),di=N("var(--fds-typography-emphasis-default-letter-spacing, 0px)"),hi=N("var(--fds-typography-emphasis-default-line-height, 150%)"),pi=N("var(--fds-typography-emphasis-default-font-weight, 700)"),ci=N("var(--fds-typography-emphasis-default-display, inline-block)"),gi=N("var(--fds-typography-emphasis-large-font-family, 'Public Sans')"),mi=N("var(--fds-typography-emphasis-large-font-size, 18px)"),yi=N("var(--fds-typography-emphasis-large-letter-spacing, 0px)"),fi=N("var(--fds-typography-emphasis-large-line-height, 150%)"),bi=N("var(--fds-typography-emphasis-large-font-weight, 700)"),ui=N("var(--fds-typography-emphasis-large-display, inline-block)"),vi=N("var(--fds-typography-emphasis-micro-font-family, 'Public Sans')"),wi=N("var(--fds-typography-emphasis-micro-font-size, 12px)"),_i=N("var(--fds-typography-emphasis-micro-letter-spacing, 0px)"),$i=N("var(--fds-typography-emphasis-micro-line-height, 150%)"),ki=N("var(--fds-typography-emphasis-micro-font-weight, 700)"),xi=N("var(--fds-typography-emphasis-micro-display, inline-block)"),Si=N("var(--fds-typography-emphasis-small-font-family, 'Public Sans')"),Ai=N("var(--fds-typography-emphasis-small-font-size, 14px)"),Ei=N("var(--fds-typography-emphasis-small-letter-spacing, 0px)"),Mi=N("var(--fds-typography-emphasis-small-line-height, 150%)"),Pi=N("var(--fds-typography-emphasis-small-font-weight, 700)"),Ci=N("var(--fds-typography-emphasis-small-display, inline-block)"),Ti=N("var(--fds-typography-heading-large-heading-3-font-family, 'Public Sans', 'PublicSans-Bold')"),zi=N("var(--fds-typography-heading-large-heading-3-font-size, 40px)"),Li=N("var(--fds-typography-heading-large-heading-3-letter-spacing, 0px)"),Ni=N("var(--fds-typography-heading-large-heading-3-line-height, 110%)"),Oi=N("var(--fds-typography-heading-large-heading-3-font-weight, 700)"),Ri=N("var(--fds-typography-heading-large-heading-3-display, inline-block)"),Ui=N("var(--fds-typography-heading-large-heading-4-font-family, 'Public Sans', 'PublicSans-Bold')"),Di=N("var(--fds-typography-heading-large-heading-4-font-size, 32px)"),ji=N("var(--fds-typography-heading-large-heading-4-letter-spacing, 0px)"),Bi=N("var(--fds-typography-heading-large-heading-4-line-height, 110%)"),Hi=N("var(--fds-typography-heading-large-heading-4-font-weight, 700)"),Ii=N("var(--fds-typography-heading-large-heading-4-display, inline-block)"),Vi=N("var(--fds-typography-heading-large-heading-5-font-family, 'Public Sans', 'PublicSans-Bold')"),Wi=N("var(--fds-typography-heading-large-heading-5-font-size, 28px)"),Fi=N("var(--fds-typography-heading-large-heading-5-letter-spacing, 0px)"),Ki=N("var(--fds-typography-heading-large-heading-5-line-height, 110%)"),Gi=N("var(--fds-typography-heading-large-heading-5-font-weight, 700)"),qi=N("var(--fds-typography-heading-large-heading-5-display, inline-block)"),Zi=N("var(--fds-typography-heading-large-heading-6-font-family, 'Public Sans', 'PublicSans-Bold')"),Ji=N("var(--fds-typography-heading-large-heading-6-font-size, 20px)"),Qi=N("var(--fds-typography-heading-large-heading-6-letter-spacing, 0px)"),Yi=N("var(--fds-typography-heading-large-heading-6-line-height, 110%)"),Xi=N("var(--fds-typography-heading-large-heading-6-font-weight, 700)"),te=N("var(--fds-typography-heading-large-heading-6-display, inline-block)"),ie=N("var(--fds-typography-heading-large-heading-1-font-family, 'Public Sans', 'PublicSans-Bold')"),ee=N("var(--fds-typography-heading-large-heading-1-font-size, 64px)"),ae=N("var(--fds-typography-heading-large-heading-1-letter-spacing, 0px)"),oe=N("var(--fds-typography-heading-large-heading-1-line-height, 110%)"),se=N("var(--fds-typography-heading-large-heading-1-font-weight, 700)"),re=N("var(--fds-typography-heading-large-heading-1-display, inline-block)"),ne=N("var(--fds-typography-heading-large-heading-2-font-family, 'Public Sans', 'PublicSans-Bold')"),le=N("var(--fds-typography-heading-large-heading-2-font-size, 48px)"),de=N("var(--fds-typography-heading-large-heading-2-letter-spacing, 0px)"),he=N("var(--fds-typography-heading-large-heading-2-line-height, 110%)"),pe=N("var(--fds-typography-heading-large-heading-2-font-weight, 700)"),ce=N("var(--fds-typography-heading-large-heading-2-display, inline-block)"),ge=N("var(--fds-typography-heading-small-heading-1-font-family, 'Public Sans', 'PublicSans-Bold')"),me=N("var(--fds-typography-heading-small-heading-1-font-size, 42px)"),ye=N("var(--fds-typography-heading-small-heading-1-letter-spacing, 0px)"),fe=N("var(--fds-typography-heading-small-heading-1-line-height, 110%)"),be=N("var(--fds-typography-heading-small-heading-1-font-weight, 700)"),ue=N("var(--fds-typography-heading-small-heading-1-display, inline-block)"),ve=N("var(--fds-typography-heading-small-heading-2-font-family, 'Public Sans', 'PublicSans-Bold')"),we=N("var(--fds-typography-heading-small-heading-2-font-size, 32px)"),_e=N("var(--fds-typography-heading-small-heading-2-letter-spacing, 0px)"),$e=N("var(--fds-typography-heading-small-heading-2-line-height, 110%)"),ke=N("var(--fds-typography-heading-small-heading-2-font-weight, 700)"),xe=N("var(--fds-typography-heading-small-heading-2-display, inline-block)"),Se=N("var(--fds-typography-heading-small-heading-3-font-family, 'Public Sans', 'PublicSans-Bold')"),Ae=N("var(--fds-typography-heading-small-heading-3-font-size, 28px)"),Ee=N("var(--fds-typography-heading-small-heading-3-letter-spacing, 0px)"),Me=N("var(--fds-typography-heading-small-heading-3-line-height, 110%)"),Pe=N("var(--fds-typography-heading-small-heading-3-font-weight, 700)"),Ce=N("var(--fds-typography-heading-small-heading-3-display, inline-block)"),Te=N("var(--fds-typography-heading-small-heading-4-font-family, 'Public Sans', 'PublicSans-Bold')"),ze=N("var(--fds-typography-heading-small-heading-4-font-size, 24px)"),Le=N("var(--fds-typography-heading-small-heading-4-letter-spacing, 0px)"),Ne=N("var(--fds-typography-heading-small-heading-4-line-height, 110%)"),Oe=N("var(--fds-typography-heading-small-heading-4-font-weight, 700)"),Re=N("var(--fds-typography-heading-small-heading-4-display, inline-block)"),Ue=N("var(--fds-typography-heading-small-heading-5-font-family, 'Public Sans', 'PublicSans-Bold')"),De=N("var(--fds-typography-heading-small-heading-5-font-size, 18px)"),je=N("var(--fds-typography-heading-small-heading-5-letter-spacing, 0px)"),Be=N("var(--fds-typography-heading-small-heading-5-line-height, 110%)"),He=N("var(--fds-typography-heading-small-heading-5-font-weight, 700)"),Ie=N("var(--fds-typography-heading-small-heading-5-display, inline-block)"),Ve=N("var(--fds-typography-heading-small-heading-6-font-family, 'Public Sans', 'PublicSans-Bold')"),We=N("var(--fds-typography-heading-small-heading-6-font-size, 16px)"),Fe=N("var(--fds-typography-heading-small-heading-6-letter-spacing, 0px)"),Ke=N("var(--fds-typography-heading-small-heading-6-line-height, 110%)"),Ge=N("var(--fds-typography-heading-small-heading-6-font-weight, 700)"),qe=N("var(--fds-typography-heading-small-heading-6-display, inline-block)"),Ze=N("var(--fds-typography-link-large-font-family, 'Public Sans')"),Je=N("var(--fds-typography-link-large-font-size, 18px)"),Qe=N("var(--fds-typography-link-large-letter-spacing, 0px)"),Ye=N("var(--fds-typography-link-large-line-height, 150%)"),Xe=N("var(--fds-typography-link-large-font-weight, 400)"),ta=N("var(--fds-typography-link-large-text-decoration, underline)"),ia=N("var(--fds-typography-link-large-display, inline-block)"),ea=N("var(--fds-typography-link-micro-font-family, 'Public Sans')"),aa=N("var(--fds-typography-link-micro-font-size, 12px)"),oa=N("var(--fds-typography-link-micro-letter-spacing, 0px)"),sa=N("var(--fds-typography-link-micro-line-height, 150%)"),ra=N("var(--fds-typography-link-micro-font-weight, 400)"),na=N("var(--fds-typography-link-micro-text-decoration, underline)"),la=N("var(--fds-typography-link-micro-display, inline-block)"),da=N("var(--fds-typography-link-small-font-family, 'Public Sans')"),ha=N("var(--fds-typography-link-small-font-size, 14px)"),pa=N("var(--fds-typography-link-small-letter-spacing, 0px)"),ca=N("var(--fds-typography-link-small-line-height, 150%)"),ga=N("var(--fds-typography-link-small-font-weight, 400)"),ma=N("var(--fds-typography-link-small-text-decoration, underline)"),ya=N("var(--fds-typography-link-small-display, inline-block)"),fa=N("var(--fds-typography-link-default-font-family, 'Public Sans')"),ba=N("var(--fds-typography-link-default-font-size, 16px)"),ua=N("var(--fds-typography-link-default-letter-spacing, 0px)"),va=N("var(--fds-typography-link-default-line-height, 150%)"),wa=N("var(--fds-typography-link-default-font-weight, 400)"),_a=N("var(--fds-typography-link-default-text-decoration, underline)"),$a=N("var(--fds-typography-link-default-display, inline-block)"),ka=N("var(--fds-typography-ui-helper-font-family, 'Public Sans', 'PublicSans-Regular')"),xa=N("var(--fds-typography-ui-helper-font-size, 15px)"),Sa=N("var(--fds-typography-ui-helper-letter-spacing, 0px)"),Aa=N("var(--fds-typography-ui-helper-line-height, 100%)"),Ea=N("var(--fds-typography-ui-helper-font-weight, 400)"),Ma=N("var(--fds-typography-ui-helper-display, inline-block)"),Pa=N("var(--fds-typography-ui-id-font-family, 'Roboto Mono')"),Ca=N("var(--fds-typography-ui-id-font-size, 13px)"),Ta=N("var(--fds-typography-ui-id-letter-spacing, 0px)"),za=N("var(--fds-typography-ui-id-line-height, 100%)"),La=N("var(--fds-typography-ui-id-font-weight, 700)"),Na=N("var(--fds-typography-ui-id-display, inline-block)"),Oa=N("var(--fds-typography-ui-label-font-family, 'Public Sans', 'PublicSans-Medium')"),Ra=N("var(--fds-typography-ui-label-font-size, 16px)"),Ua=N("var(--fds-typography-ui-label-letter-spacing, 0px)"),Da=N("var(--fds-typography-ui-label-line-height, 22px)"),ja=N("var(--fds-typography-ui-label-font-weight, 500)"),Ba=N("var(--fds-typography-ui-label-display, inline-block)"),Ha=N("var(--fds-typography-ui-placeholder-font-family, 'Public Sans', 'PublicSans-Medium')"),Ia=N("var(--fds-typography-ui-placeholder-font-size, 16px)"),Va=N("var(--fds-typography-ui-placeholder-letter-spacing, 0px)"),Wa=N("var(--fds-typography-ui-placeholder-line-height, 100%)"),Fa=N("var(--fds-typography-ui-placeholder-font-weight, 500)"),Ka=N("var(--fds-typography-ui-placeholder-display, inline-block)"),Ga=N("var(--fds-typography-ui-tag-font-family, 'Public Sans', 'PublicSans-Bold')"),qa=N("var(--fds-typography-ui-tag-font-size, 16px)"),Za=N("var(--fds-typography-ui-tag-letter-spacing, 0px)"),Ja=N("var(--fds-typography-ui-tag-line-height, 100%)"),Qa=N("var(--fds-typography-ui-tag-font-weight, 700)"),Ya=N("var(--fds-typography-ui-tag-display, inline-block)"),Xa=N("var(--fds-color-brand-black, #000000)"),to=N("var(--fds-color-brand-white, #ffffff)"),io=N("var(--fds-color-neutral-100, #cdcdd7)"),eo=N("var(--fds-color-text-300, #9696aa)");O`
  .body-default-text {
    display: ${It};
    font-family: ${Ut};
    font-size: ${Dt};
    font-weight: ${Ht};
    letter-spacing: ${jt};
    line-height: ${Bt};
  }
`,O`
  .body-large-text {
    display: ${qt};
    font-family: ${Vt};
    font-size: ${Wt};
    font-weight: ${Gt};
    letter-spacing: ${Ft};
    line-height: ${Kt};
  }
`,O`
  .body-micro-text {
    display: ${ti};
    font-family: ${Zt};
    font-size: ${Jt};
    font-weight: ${Xt};
    letter-spacing: ${Qt};
    line-height: ${Yt};
  }
`,O`
  .body-small-text {
    display: ${ri};
    font-family: ${ii};
    font-size: ${ei};
    font-weight: ${si};
    letter-spacing: ${ai};
    line-height: ${oi};
  }
`,O`
  .emphasis-default-text {
    display: ${ci};
    font-family: ${ni};
    font-size: ${li};
    font-weight: ${pi};
    letter-spacing: ${di};
    line-height: ${hi};
  }
`,O`
  .emphasis-large-text {
    display: ${ui};
    font-family: ${gi};
    font-size: ${mi};
    font-weight: ${bi};
    letter-spacing: ${yi};
    line-height: ${fi};
  }
`,O`
  .emphasis-micro-text {
    display: ${xi};
    font-family: ${vi};
    font-size: ${wi};
    font-weight: ${ki};
    letter-spacing: ${_i};
    line-height: ${$i};
  }
`,O`
  .emphasis-small-text {
    display: ${Ci};
    font-family: ${Si};
    font-size: ${Ai};
    font-weight: ${Pi};
    letter-spacing: ${Ei};
    line-height: ${Mi};
  }
`,O`
  .heading-large-1-text {
    display: ${re};
    font-family: ${ie};
    font-size: ${ee};
    font-weight: ${se};
    letter-spacing: ${ae};
    line-height: ${oe};
  }
`,O`
  .heading-large-2-text {
    display: ${ce};
    font-family: ${ne};
    font-size: ${le};
    font-weight: ${pe};
    letter-spacing: ${de};
    line-height: ${he};
  }
`,O`
  .heading-large-3-text {
    display: ${Ri};
    font-family: ${Ti};
    font-size: ${zi};
    font-weight: ${Oi};
    letter-spacing: ${Li};
    line-height: ${Ni};
  }
`,O`
  .heading-large-4-text {
    display: ${Ii};
    font-family: ${Ui};
    font-size: ${Di};
    font-weight: ${Hi};
    letter-spacing: ${ji};
    line-height: ${Bi};
  }
`,O`
  .heading-large-5-text {
    display: ${qi};
    font-family: ${Vi};
    font-size: ${Wi};
    font-weight: ${Gi};
    letter-spacing: ${Fi};
    line-height: ${Ki};
  }
`,O`
  .heading-large-6-text {
    display: ${te};
    font-family: ${Zi};
    font-size: ${Ji};
    font-weight: ${Xi};
    letter-spacing: ${Qi};
    line-height: ${Yi};
  }
`,O`
  .heading-small-1-text {
    display: ${ue};
    font-family: ${ge};
    font-size: ${me};
    font-weight: ${be};
    letter-spacing: ${ye};
    line-height: ${fe};
  }
`,O`
  .heading-small-2-text {
    display: ${xe};
    font-family: ${ve};
    font-size: ${we};
    font-weight: ${ke};
    letter-spacing: ${_e};
    line-height: ${$e};
  }
`,O`
  .heading-small-3-text {
    display: ${Ce};
    font-family: ${Se};
    font-size: ${Ae};
    font-weight: ${Pe};
    letter-spacing: ${Ee};
    line-height: ${Me};
  }
`,O`
  .heading-small-4-text {
    display: ${Re};
    font-family: ${Te};
    font-size: ${ze};
    font-weight: ${Oe};
    letter-spacing: ${Le};
    line-height: ${Ne};
  }
`,O`
  .heading-small-5-text {
    display: ${Ie};
    font-family: ${Ue};
    font-size: ${De};
    font-weight: ${He};
    letter-spacing: ${je};
    line-height: ${Be};
  }
`,O`
  .heading-small-6-text {
    display: ${qe};
    font-family: ${Ve};
    font-size: ${We};
    font-weight: ${Ge};
    letter-spacing: ${Fe};
    line-height: ${Ke};
  }
`,O`
  .link-default-text {
    display: ${$a};
    font-family: ${fa};
    font-size: ${ba};
    font-weight: ${wa};
    letter-spacing: ${ua};
    line-height: ${va};
    text-decoration: ${_a};
  }
`,O`
  .link-large-text {
    display: ${ia};
    font-family: ${Ze};
    font-size: ${Je};
    font-weight: ${Xe};
    letter-spacing: ${Qe};
    line-height: ${Ye};
    text-decoration: ${ta};
  }
`,O`
  .link-micro-text {
    display: ${la};
    font-family: ${ea};
    font-size: ${aa};
    font-weight: ${ra};
    letter-spacing: ${oa};
    line-height: ${sa};
    text-decoration: ${na};
  }
`,O`
  .link-small-text {
    display: ${ya};
    font-family: ${da};
    font-size: ${ha};
    font-weight: ${ga};
    letter-spacing: ${pa};
    line-height: ${ca};
    text-decoration: ${ma};
  }
`,O`
  .ui-helper-text {
    display: ${Ma};
    font-family: ${ka};
    font-size: ${xa};
    font-weight: ${Ea};
    letter-spacing: ${Sa};
    line-height: ${Aa};
  }
`,O`
  .ui-id-text {
    display: ${Na};
    font-family: ${Pa};
    font-size: ${Ca};
    font-weight: ${La};
    letter-spacing: ${Ta};
    line-height: ${za};
  }
`;const ao=O`
  .ui-label-text {
    display: ${Ba};
    font-family: ${Oa};
    font-size: ${Ra};
    font-weight: ${ja};
    letter-spacing: ${Ua};
    line-height: ${Da};
  }
`;O`
  .ui-placeholder-text {
    display: ${Ka};
    font-family: ${Ha};
    font-size: ${Ia};
    font-weight: ${Fa};
    letter-spacing: ${Va};
    line-height: ${Wa};
  }
`,O`
  .ui-tag-text {
    display: ${Ya};
    font-family: ${Ga};
    font-size: ${qa};
    font-weight: ${Qa};
    letter-spacing: ${Za};
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
var ro;null===(ro=globalThis.HTMLSlotElement)||void 0===ro||ro.prototype.assignedElements;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const no=1;let lo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,e){this._$Ct=t,this._$AM=i,this._$Ci=e}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ho="important",po=" !"+ho,co=(t=>(...i)=>({_$litDirective$:t,values:i}))(class extends lo{constructor(t){var i;if(super(t),t.type!==no||"style"!==t.name||(null===(i=t.strings)||void 0===i?void 0:i.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((i,e)=>{const a=t[e];return null==a?i:i+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${a};`}),"")}update(t,[i]){const{style:e}=t.element;if(void 0===this.ht){this.ht=new Set;for(const t in i)this.ht.add(t);return this.render(i)}this.ht.forEach((t=>{null==i[t]&&(this.ht.delete(t),t.includes("-")?e.removeProperty(t):e[t]="")}));for(const t in i){const a=i[t];if(null!=a){this.ht.add(t);const i="string"==typeof a&&a.endsWith(po);t.includes("-")||i?e.setProperty(t,i?a.slice(0,-11):a,i?ho:""):e[t]=a}}return ft}});var go,mo,yo=function(t,i,e,a){var o,s=arguments.length,r=s<3?i:null===a?a=Object.getOwnPropertyDescriptor(i,e):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,i,e,a);else for(var n=t.length-1;n>=0;n--)(o=t[n])&&(r=(s<3?o(r):s>3?o(i,e,r):o(i,e))||r);return s>3&&r&&Object.defineProperty(i,e,r),r};!function(t){t.primary="primary",t.secondary="secondary"}(go||(go={})),function(t){t.left="left",t.right="right"}(mo||(mo={}));class fo extends Ot{constructor(){super(...arguments),this.variant=go.primary,this.items=[],this.verticalMenuNavText="",this.verticalMenuThreshold=768,this._open=!1}connectedCallback(){super.connectedCallback(),R(this.shadowRoot,[fo.cssVariables,ao,fo.collapsedNavigationStyles,this.desktopStyles()])}render(){const t=this.items.filter((t=>t.position===mo.right)),i=this.items.filter((t=>t.position!==mo.right));return yt` <div class="navigation-wrapper">
      <div class="navigation navigation--${this.variant} ui-label-text">
        ${this.variant===go.primary?yt` <div class="navigation__header">
              <slot></slot>
            </div>`:bt}
        <ul class="navigation__body ${this._open?"navigation__open":""}">
          ${i.map((t=>this.renderItem(t))).concat(t.map(((t,i)=>this.renderItem(t,0===i?"item__first-right":""))))}
        </ul>
        <div class="navigation__button-wrapper">${this.renderNavigationButton()}</div>
      </div>
    </div>`}renderNavigationButton(){let t;switch(this.variant){case go.primary:t=this._open?yt`<fds-icon icon="chevron-up"></fds-icon>`:yt`<fds-icon icon="chevron-down"></fds-icon>`;break;case go.secondary:t=yt`<fds-icon icon="menu"></fds-icon>`}return yt`
      <button
        class="navigation__button navigation__button--${this.variant}"
        type="button"
        @click=${this.handleNavigationClick}
      >
        <span class="navigation__label ui-label-text">${this.verticalMenuNavText}</span>
        ${t}
      </button>
    `}handleNavigationClick(){this._open=!this._open}renderItem(t,i=""){var e;const a=null!==(e=t.verticalMenuOrder)&&void 0!==e?e:0;return yt` <li
      @click=${()=>this.handleSelect(t)}
      class="item ${this.selected===t?"item--active":""} ${i}"
      style=${co({order:a})}
    >
      <div class="item__label">
        ${t.icon&&yt`<fds-icon class="item__icon" .icon="${t.icon}"></fds-icon>`}
        <span>${t.label}</span>
      </div>
    </li>`}handleSelect(t){this.selected=t,this.dispatchEvent(new CustomEvent("select",{detail:t}))}desktopStyles(){return O`
      @container navigation-wrapper (min-width: ${N(this.verticalMenuThreshold)}px) {
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
    `}}fo.cssVariables=O`
    :host {
      --element-vertical-padding--primary: 9px;
      --element-vertical-padding--secondary: 16px;
      --element-horizontal-padding--primary: 20px;
      --item-border-bottom-width--secondary: 3px;
    }
  `,fo.collapsedNavigationStyles=O`
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
  `,fo.styles=[fo.cssVariables,ao,fo.collapsedNavigationStyles],yo([so()],fo.prototype,"variant",void 0),yo([so()],fo.prototype,"items",void 0),yo([so()],fo.prototype,"selected",void 0),yo([so({attribute:"vertical-menu-nav-text"})],fo.prototype,"verticalMenuNavText",void 0),yo([so({type:Number,attribute:"vertical-menu-threshold"})],fo.prototype,"verticalMenuThreshold",void 0),yo([function(t){return so({...t,state:!0})}()],fo.prototype,"_open",void 0);const bo=(t,i,e=[])=>{const a=document.createElementNS("http://www.w3.org/2000/svg",t);return Object.keys(i).forEach((t=>{a.setAttribute(t,String(i[t]))})),e.length&&e.forEach((t=>{const i=bo(...t);a.appendChild(i)})),a};const uo={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var vo=function(t,i,e,a){var o,s=arguments.length,r=s<3?i:null===a?a=Object.getOwnPropertyDescriptor(i,e):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,i,e,a);else for(var n=t.length-1;n>=0;n--)(o=t[n])&&(r=(s<3?o(r):s>3?o(i,e,r):o(i,e))||r);return s>3&&r&&Object.defineProperty(i,e,r),r};const wo={"alert-circle":["svg",uo,[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]]],"alert-triangle":["svg",uo,[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]]],"chevron-down":["svg",uo,[["path",{d:"m6 9 6 6 6-6"}]]],"chevron-right":["svg",uo,[["path",{d:"m9 18 6-6-6-6"}]]],"chevron-up":["svg",uo,[["path",{d:"m18 15-6-6-6 6"}]]],menu:["svg",uo,[["line",{x1:"4",x2:"20",y1:"12",y2:"12"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18"}]]],pencil:["svg",uo,[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"}],["path",{d:"m15 5 4 4"}]]],plus:["svg",uo,[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]]],"plus-circle":["svg",uo,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M8 12h8"}],["path",{d:"M12 8v8"}]]],"trash-2":["svg",uo,[["path",{d:"M3 6h18"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17"}]]],x:["svg",uo,[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]]],settings:["svg",uo,[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"}],["circle",{cx:"12",cy:"12",r:"3"}]]],"check-circle":["svg",uo,[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}],["polyline",{points:"22 4 12 14.01 9 11.01"}]]]};class _o extends Ot{constructor(){super(...arguments),this.size=t}render(){if(!this.icon||!wo[this.icon])return console.error(`invalid icon: '${this.icon}'`),null;const t=(([t,i,e])=>bo(t,i,e))(wo[this.icon]);return t.setAttribute("width",this.size.value),t.setAttribute("height",this.size.value),t}}function $o(){$.proxyAll(this,/^_/)}_o.styles=O`
    :host {
      display: inline-flex;
    }
  `,vo([so()],_o.prototype,"size",void 0),vo([so()],_o.prototype,"icon",void 0),customElements.define("fds-icon",_o),customElements.define("fds-navigation",fo),ckan.module("digitraffic_theme_top_navigation",(function(t){return{initialize:function(){const t={label:"Digitraffic",value:"digitraffic",url:"https://www.digitraffic.fi/"},i=[{label:"Liikennetilanne",value:"liikennetilanne",url:"https://liikennetilanne.fintraffic.fi/"},{label:"Palauteväylä",value:"palautevayla",url:"https://www.palautevayla.fi/aspa?lang=fi"},{label:"Junalähdöt",value:"junalahdot",url:"https://junalahdot.fintraffic.fi/"},{label:"Drone-palvelut",value:"dronepalvelut",url:"https://skynavx.fi/#/drone"},t,{label:"Digitransit",value:"digitransit",url:"https://digitransit.fi/"},{label:"Reittiopas",value:"reittiopas",url:"https://opas.matka.fi/"},{label:"NAP",value:"nap",url:"https://finap.fi/#/"}];customElements.whenDefined("fds-navigation").then((()=>{const e=document.createElement("fds-navigation");e.setAttribute("vertical-menu-threshold","1225"),e.innerHTML='\n      <a href="https://www.fintraffic.fi/fi">\n              <svg viewBox="0 0 253 42" style="height: 18px">\n                  <use href="/assets/fintraffic_horizontal_white.svg#fintraffic_horizontal_white"></use>\n              </svg>\n          </a>';e.variant=go.primary,e.items=i,e.selected=t,e.verticalMenuNavText="Services",e.addEventListener("select",(i=>{const e=i.detail;window.open(e.url,"_blank"),i.target.selected=t})),this.el.replaceWith(e)}))}}}));const ko=()=>({initialize(){$o.apply(this),this._getMenuController().on("click",this._onMenuControllerClick),this._getMenuController().on("keydown",this._onMenuControllerKeyDown),this._getMenu().on("keydown",this._onMenuKeyDown)},_onMenuControllerClick(t){this._getMenuController().has(t.target)&&this._toggleList()},_onMenuControllerKeyDown(t){if(this._getMenuController().has(t.target)){const{key:i}=t;switch(i){case" ":case"Enter":t.preventDefault(),this._toggleList();break;case"ArrowDown":t.preventDefault(),this._focus("first")}}},_onMenuKeyDown(t){if(this._getMenuController().is(":visible")&&this._getMenu().has(t.target)){const{key:i}=t;switch(i){case"Escape":t.preventDefault(),this._closeList(),this._focus("menuController");break;case"ArrowDown":$(t.target).is("select")||(t.preventDefault(),this._focus("next"));break;case"ArrowUp":$(t.target).is("select")||(t.preventDefault(),this._focus("previous"))}}},_expandedClass:"expanded",_focus(t){let i;const e=this.el.find(":focus"),a=!!this._getMenu().has(e),o=a&&this._getMenu().find("a:last")[0]===e[0],s=a&&this._getMenu().find("a:first")[0]===e[0];switch(t){case"first":i=this._getMenu().find("a:first");break;case"menuController":i=this._getMenuController();break;case"next":if(a){if(o)return;{const t=this._getMenu().find("a");i=t.filter((i=>i>0&&t[i-1]===e[0]))}}else i=this._getMenu().find("a:first");break;case"previous":if(a){if(s)return;{const t=this._getMenu().find("a");i=t.filter((i=>i<t.length-1&&t[i+1]===e[0]))}}else i=this._getMenu().find("a:first")}i.trigger("focus")},_toggleList(){this._isMenuOpen()?(this._closeList(),this._focus("menuController")):(this._openList(),this._focus("first"))},_isMenuOpen(){return this._getMenu().hasClass(this._expandedClass)},_closeList(){const t=this._getMenuController();this._getMenu().removeClass(this._expandedClass),t.attr("aria-expanded","false")},_openList(){const t=this._getMenuController();this._getMenu().addClass(this._expandedClass),t.attr("aria-expanded","true")},_getMenuController(){throw Error("No controller")},_getMenu(){throw Error("No menu")}}),xo={...ko(),_getMenuController:()=>$("#app-nav-hamburger-button"),_getMenu:()=>$("#nav-interactions-wrapper")};ckan.module("digitraffic_theme_app_navigation",(function(t){return xo}));const So={...ko(),_getMenuController:()=>$("#user-action-select"),_getMenu:()=>$("#user-action-list")};ckan.module("digitraffic_theme_user_actions",(function(t){return So}));const Ao={"https://w3id.org/mobilitydcat-ap/mobility-theme/air-and-space-travel":[],"https://w3id.org/mobilitydcat-ap/mobility-theme/cycle-network-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/network-closures-diversions","https://w3id.org/mobilitydcat-ap/mobility-theme/network-detailed-attributes","https://w3id.org/mobilitydcat-ap/mobility-theme/network-geometry-and-lane-character"],"https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-traffic-signs-and-regulations":["https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-closures-and-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/direction-of-travel-on-reversible-lanes","https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-overtaking-bans-on-heavy-goods-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-speed-limits","https://w3id.org/mobilitydcat-ap/mobility-theme/lane-closures-and-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/other-access-restrictions-and-traffic-regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/other-temporary-traffic-management-measures-or-plans","https://w3id.org/mobilitydcat-ap/mobility-theme/road-closures-and-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-closures-and-access-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/filling-and-charging-stations":["https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-charging-points-for-electric-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-filling-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-charging-points","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-filling-stations"],"https://w3id.org/mobilitydcat-ap/mobility-theme/freight-and-logistics":["https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-delivery-areas","https://w3id.org/mobilitydcat-ap/mobility-theme/freight-delivery-regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-delivery-areas"],"https://w3id.org/mobilitydcat-ap/mobility-theme/general-information-for-trip-planning-":["https://w3id.org/mobilitydcat-ap/mobility-theme/address-identifiers","https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-costs","https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-environmental-factors","https://w3id.org/mobilitydcat-ap/mobility-theme/points-of-interest","https://w3id.org/mobilitydcat-ap/mobility-theme/topographic-places"],"https://w3id.org/mobilitydcat-ap/mobility-theme/other":[],"https://w3id.org/mobilitydcat-ap/mobility-theme/parking-service-and-rest-area-information":["https://w3id.org/mobilitydcat-ap/mobility-theme/bike-parking-locations","https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-locations-and-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/park-and-ride-stops","https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-locations-and-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-locations-and-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-accessibility-facilities","https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-geometry"],"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-non-scheduled-transport":["https://w3id.org/mobilitydcat-ap/mobility-theme/accesibility-information-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/fares","https://w3id.org/mobilitydcat-ap/mobility-theme/locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/provider-data","https://w3id.org/mobilitydcat-ap/mobility-theme/reservation-and-purchase-options","https://w3id.org/mobilitydcat-ap/mobility-theme/service-areas-and-service-times"],"https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-scheduled-transport":["https://w3id.org/mobilitydcat-ap/mobility-theme/basic-commercial-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/basic-common-standard-fares","https://w3id.org/mobilitydcat-ap/mobility-theme/common-fare-products","https://w3id.org/mobilitydcat-ap/mobility-theme/connection-links","https://w3id.org/mobilitydcat-ap/mobility-theme/disruptions-delays-cancellations","https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/hours-of-operation","https://w3id.org/mobilitydcat-ap/mobility-theme/network-topology-and-routes-lines","https://w3id.org/mobilitydcat-ap/mobility-theme/operational-calendar","https://w3id.org/mobilitydcat-ap/mobility-theme/passenger-classes","https://w3id.org/mobilitydcat-ap/mobility-theme/planned-interchanges-between-scheduled-services","https://w3id.org/mobilitydcat-ap/mobility-theme/purchase-information","https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-estimated-departure-and-arrival-times","https://w3id.org/mobilitydcat-ap/mobility-theme/special-fare-products","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-accessibility-and-paths-within-facility","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-geometry-and-map-layout","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-location-and-features","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-status-of-features","https://w3id.org/mobilitydcat-ap/mobility-theme/timetables-static","https://w3id.org/mobilitydcat-ap/mobility-theme/transport-operators","https://w3id.org/mobilitydcat-ap/mobility-theme/vehicle-details"],"https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-traffic-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/current-travel-times","https://w3id.org/mobilitydcat-ap/mobility-theme/expected-delays","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-length-of-queues","https://w3id.org/mobilitydcat-ap/mobility-theme/predicted-travel-times","https://w3id.org/mobilitydcat-ap/mobility-theme/speed","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-data-at-border-crossings-to-third-countries","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-volume","https://w3id.org/mobilitydcat-ap/mobility-theme/waiting-time-at-border-crossings-to-non-eu-member-states"],"https://w3id.org/mobilitydcat-ap/mobility-theme/road-events-and-conditions":["https://w3id.org/mobilitydcat-ap/mobility-theme/accidents-and-incidents","https://w3id.org/mobilitydcat-ap/mobility-theme/poor-road-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/road-weather-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/road-work-information":["https://w3id.org/mobilitydcat-ap/mobility-theme/long-term-road-works","https://w3id.org/mobilitydcat-ap/mobility-theme/short-term-road-works"],"https://w3id.org/mobilitydcat-ap/mobility-theme/sharing-and-hiring-services":["https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-availability","https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-locations-and-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods"],"https://w3id.org/mobilitydcat-ap/mobility-theme/static-road-network-data":["https://w3id.org/mobilitydcat-ap/mobility-theme/geometry","https://w3id.org/mobilitydcat-ap/mobility-theme/gradients","https://w3id.org/mobilitydcat-ap/mobility-theme/junctions","https://w3id.org/mobilitydcat-ap/mobility-theme/number-of-lanes","https://w3id.org/mobilitydcat-ap/mobility-theme/road-classification","https://w3id.org/mobilitydcat-ap/mobility-theme/road-width"],"https://w3id.org/mobilitydcat-ap/mobility-theme/static-traffic-signs-and-regulations":["https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-access-conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/other-static-traffic-signs","https://w3id.org/mobilitydcat-ap/mobility-theme/other-traffic-regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/permanent-access-restrictions","https://w3id.org/mobilitydcat-ap/mobility-theme/speed-limits","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-circulation-plans","https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-access-conditions"],"https://w3id.org/mobilitydcat-ap/mobility-theme/toll-information":["https://w3id.org/mobilitydcat-ap/mobility-theme/applicable-road-user-charges-and-payment-methods","https://w3id.org/mobilitydcat-ap/mobility-theme/identification-of-tolled-roads","https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-tolling-stations","https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods-for-tolls"],"https://w3id.org/mobilitydcat-ap/mobility-theme/waterways-and-water-bodies":[]},Eo=new Set(Object.keys(Ao));new Set(Object.values(Ao).flat());const Mo={"https://w3id.org/mobilitydcat-ap/mobility-theme/accesibility-information-for-vehicles":"Accesibility information for vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/accidents-and-incidents":"Accidents and incidents","https://w3id.org/mobilitydcat-ap/mobility-theme/address-identifiers":"Address identifiers","https://w3id.org/mobilitydcat-ap/mobility-theme/air-and-space-travel":"Air and space travel","https://w3id.org/mobilitydcat-ap/mobility-theme/applicable-road-user-charges-and-payment-methods":"Applicable road user charges and payment methods","https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-charging-points-for-electric-vehicles":"Availability of charging points for electric vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-delivery-areas":"Availability of delivery areas","https://w3id.org/mobilitydcat-ap/mobility-theme/availability-of-filling-stations":"Availability of filling stations","https://w3id.org/mobilitydcat-ap/mobility-theme/basic-commercial-conditions":"Basic commercial conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/basic-common-standard-fares":"Basic common standard fares","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-availability":"Bike-hiring Availability","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-hiring-stations":"Bike-hiring Stations","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-parking-locations":"Bike-parking locations","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-availability":"Bike sharing Availability","https://w3id.org/mobilitydcat-ap/mobility-theme/bike-sharing-locations-and-stations":"Bike-sharing Locations and stations","https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-access-conditions":"Bridge access conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/bridge-closures-and-access-conditions":"Bridge closures and access conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-availability":"Car-hiring Availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-hiring-stations":"Car-hiring Stations","https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-availability":"Car parking availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-parking-locations-and-conditions":"Car parking locations and conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-availability":"Car-sharing Availability","https://w3id.org/mobilitydcat-ap/mobility-theme/car-sharing-locations-and-stations":"Car-sharing Locations and stations","https://w3id.org/mobilitydcat-ap/mobility-theme/common-fare-products":"Common fare products","https://w3id.org/mobilitydcat-ap/mobility-theme/connection-links":"Connection links","https://w3id.org/mobilitydcat-ap/mobility-theme/current-travel-times":"Current travel times","https://w3id.org/mobilitydcat-ap/mobility-theme/cycle-network-data":"Cycle network data","https://w3id.org/mobilitydcat-ap/mobility-theme/data-content-category":"Data content category","https://w3id.org/mobilitydcat-ap/mobility-theme/data-content-sub-category":"Data content sub-category","https://w3id.org/mobilitydcat-ap/mobility-theme/direction-of-travel-on-reversible-lanes":"Direction of travel on reversible lanes","https://w3id.org/mobilitydcat-ap/mobility-theme/disruptions-delays-cancellations":"Disruptions, delays, cancellations","https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-overtaking-bans-on-heavy-goods-vehicles":"Dynamic overtaking bans on heavy goods vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-speed-limits":"Dynamic speed limits","https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-traffic-signs-and-regulations":"Dynamic traffic signs and regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-availability":"E-scooter-sharing Availability","https://w3id.org/mobilitydcat-ap/mobility-theme/e-scooter-sharing-locations-and-stations":"E-scooter-sharing Locations and stations","https://w3id.org/mobilitydcat-ap/mobility-theme/environmental-standards-for-vehicles":"Environmental standards for vehicles","https://w3id.org/mobilitydcat-ap/mobility-theme/expected-delays":"Expected delays","https://w3id.org/mobilitydcat-ap/mobility-theme/fares":"Fares","https://w3id.org/mobilitydcat-ap/mobility-theme/filling-and-charging-stations":"Filling and charging stations","https://w3id.org/mobilitydcat-ap/mobility-theme/freight-and-logistics":"Freight and logistics","https://w3id.org/mobilitydcat-ap/mobility-theme/freight-delivery-regulations":"Freight delivery regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/general-information-for-trip-planning-":"General information for trip-planning","https://w3id.org/mobilitydcat-ap/mobility-theme/geometry":"Geometry","https://w3id.org/mobilitydcat-ap/mobility-theme/gradients":"Gradients","https://w3id.org/mobilitydcat-ap/mobility-theme/hours-of-operation":"Hours of operation","https://w3id.org/mobilitydcat-ap/mobility-theme/identification-of-tolled-roads":"Identification of tolled roads","https://w3id.org/mobilitydcat-ap/mobility-theme/junctions":"Junctions","https://w3id.org/mobilitydcat-ap/mobility-theme/lane-closures-and-access-conditions":"Lane closures and access conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-charging-points":"Location and conditions of charging points","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-conditions-of-filling-stations":"Location and conditions of filling stations","https://w3id.org/mobilitydcat-ap/mobility-theme/location-and-length-of-queues":"Location and length of queues","https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-delivery-areas":"Location of delivery areas","https://w3id.org/mobilitydcat-ap/mobility-theme/location-of-tolling-stations":"Location of tolling stations","https://w3id.org/mobilitydcat-ap/mobility-theme/locations-and-stations":"Locations and stations","https://w3id.org/mobilitydcat-ap/mobility-theme/long-term-road-works":"Long-term road works","https://w3id.org/mobilitydcat-ap/mobility-theme/network-closures-diversions":"Network closures/diversions","https://w3id.org/mobilitydcat-ap/mobility-theme/network-detailed-attributes":"Network detailed attributes","https://w3id.org/mobilitydcat-ap/mobility-theme/network-geometry-and-lane-character":"Network geometry and lane character","https://w3id.org/mobilitydcat-ap/mobility-theme/network-topology-and-routes-lines":"Network topology and routes/lines","https://w3id.org/mobilitydcat-ap/mobility-theme/number-of-lanes":"Number of lanes","https://w3id.org/mobilitydcat-ap/mobility-theme/operational-calendar":"Operational Calendar","https://w3id.org/mobilitydcat-ap/mobility-theme/other":"Other","https://w3id.org/mobilitydcat-ap/mobility-theme/other-access-restrictions-and-traffic-regulations":"Other access restrictions and traffic regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/other-static-traffic-signs":"Other static traffic signs","https://w3id.org/mobilitydcat-ap/mobility-theme/other-temporary-traffic-management-measures-or-plans":"Other temporary traffic management measures or plans","https://w3id.org/mobilitydcat-ap/mobility-theme/other-traffic-regulations":"Other traffic regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-costs":"Parameters needed to calculate costs","https://w3id.org/mobilitydcat-ap/mobility-theme/parameters-needed-to-calculate-environmental-factors":"Parameters needed to calculate environmental factors","https://w3id.org/mobilitydcat-ap/mobility-theme/park-and-ride-stops":"Park and Ride stops","https://w3id.org/mobilitydcat-ap/mobility-theme/parking-service-and-rest-area-information":"Parking, service and rest area information","https://w3id.org/mobilitydcat-ap/mobility-theme/passenger-classes":"Passenger classes","https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods":"Payment methods","https://w3id.org/mobilitydcat-ap/mobility-theme/payment-methods-for-tolls":"Payment methods for tolls","https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-accessibility-facilities":"Pedestrian accessibility facilities","https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-data":"Pedestrian network data","https://w3id.org/mobilitydcat-ap/mobility-theme/pedestrian-network-geometry":"Pedestrian network geometry","https://w3id.org/mobilitydcat-ap/mobility-theme/permanent-access-restrictions":"Permanent access restrictions","https://w3id.org/mobilitydcat-ap/mobility-theme/planned-interchanges-between-scheduled-services":"Planned interchanges between scheduled services","https://w3id.org/mobilitydcat-ap/mobility-theme/points-of-interest":"Points of interest","https://w3id.org/mobilitydcat-ap/mobility-theme/poor-road-conditions":"Poor road conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/predicted-travel-times":"Predicted travel times","https://w3id.org/mobilitydcat-ap/mobility-theme/provider-data":"Provider data","https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-non-scheduled-transport":"Public transport non-scheduled transport","https://w3id.org/mobilitydcat-ap/mobility-theme/public-transport-scheduled-transport":"Public transport scheduled transport","https://w3id.org/mobilitydcat-ap/mobility-theme/purchase-information":"Purchase information","https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-estimated-departure-and-arrival-times":"Real-time estimated departure and arrival times","https://w3id.org/mobilitydcat-ap/mobility-theme/real-time-traffic-data":"Real-time traffic data","https://w3id.org/mobilitydcat-ap/mobility-theme/reservation-and-purchase-options":"Reservation and purchase options","https://w3id.org/mobilitydcat-ap/mobility-theme/road-classification":"Road classification","https://w3id.org/mobilitydcat-ap/mobility-theme/road-closures-and-access-conditions":"Road closures and access conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/road-events-and-conditions":"Road events and conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/road-weather-conditions":"Road weather conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/road-width":"Road width","https://w3id.org/mobilitydcat-ap/mobility-theme/road-work-information":"Road work information","https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-availability":"Service and rest area availability","https://w3id.org/mobilitydcat-ap/mobility-theme/service-and-rest-area-locations-and-conditions":"Service and rest area locations and conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/service-areas-and-service-times":"Service areas and service times","https://w3id.org/mobilitydcat-ap/mobility-theme/sharing-and-hiring-services":"Sharing and Hiring Services","https://w3id.org/mobilitydcat-ap/mobility-theme/short-term-road-works":"Short-term road works","https://w3id.org/mobilitydcat-ap/mobility-theme/special-fare-products":"Special Fare Products","https://w3id.org/mobilitydcat-ap/mobility-theme/speed":"Speed","https://w3id.org/mobilitydcat-ap/mobility-theme/speed-limits":"Speed limits","https://w3id.org/mobilitydcat-ap/mobility-theme/static-road-network-data":"Static road network data","https://w3id.org/mobilitydcat-ap/mobility-theme/static-traffic-signs-and-regulations":"Static traffic signs and regulations","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-accessibility-and-paths-within-facility":"Stop facilities accessibility and paths within facility","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-geometry-and-map-layout":"Stop facilities geometry and map layout","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-location-and-features":"Stop facilities location and features","https://w3id.org/mobilitydcat-ap/mobility-theme/stop-facilities-status-of-features":"Stop facilities status of features","https://w3id.org/mobilitydcat-ap/mobility-theme/timetables-static":"Timetables static","https://w3id.org/mobilitydcat-ap/mobility-theme/toll-information":"Toll information","https://w3id.org/mobilitydcat-ap/mobility-theme/topographic-places":"Topographic places","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-circulation-plans":"Traffic circulation plans","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-data-at-border-crossings-to-third-countries":"Traffic data at border crossings to third countries","https://w3id.org/mobilitydcat-ap/mobility-theme/traffic-volume":"Traffic volume","https://w3id.org/mobilitydcat-ap/mobility-theme/transport-operators":"Transport operators","https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-availability":"Truck parking availability","https://w3id.org/mobilitydcat-ap/mobility-theme/truck-parking-locations-and-conditions":"Truck parking locations and conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-access-conditions":"Tunnel access conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/tunnel-closures-and-access-conditions":"Tunnel closures and access conditions","https://w3id.org/mobilitydcat-ap/mobility-theme/vehicle-details":"Vehicle details","https://w3id.org/mobilitydcat-ap/mobility-theme/waiting-time-at-border-crossings-to-non-eu-member-states":"Waiting time at border crossings to non-EU Member States","https://w3id.org/mobilitydcat-ap/mobility-theme/waterways-and-water-bodies":"Waterways and water bodies"};const Po={initialize(){$o.apply(this),this.state={topMobilityTheme:this._getInitialMobilityTheme()};this._getTopMobilityThemeSelector().on("change",this._onTopMobilityThemeChanged),this._onStateUpdate(this._handleTopMobilityThemeChanged),this._subThemeSelectorViewUpdate(void 0,this.state)},teardown:function(){this._stateListeners=void 0},_getInitialMobilityTheme(){const t=this._getTopMobilityThemeSelector().val();return"string"==typeof(i=t)&&Eo.has(i)?t:void 0;var i},_getTopMobilityThemeSelector(){return this.$("#field-mobility_theme")},_getSubMobilityThemeSelector(){return this.$("#field-mobility_theme_sub")},_onTopMobilityThemeChanged(t){const i=t.target.value;this._mergeState({topMobilityTheme:i})},_stateChangedKeys(t,i){const e=new Set;for(const a in t)a in i?t[a]!==i[a]&&e.add(a):e.add(a);for(const a in i)a in t||e.add(a);return e},_triggerListeners(t,i){if(this._stateListeners)for(const e of this._stateListeners)e(t,i)},_updateState(t){const i=this.state;this.state=t;const e=this._stateChangedKeys(i,t);return this._triggerListeners(i,e),t},_mergeState(t){const i=this.state,e={...this.state,...t};this.state=e;const a=this._stateChangedKeys(i,e);return this._triggerListeners(i,a),e},_onStateUpdate(t){return this._stateListeners?this._stateListeners.push(t):this._stateListeners=[t],()=>{this._stateListeners&&(this._stateListeners=this._stateListeners.filter((i=>i!==t)))}},_handleTopMobilityThemeChanged(t,i){i.has("topMobilityTheme")&&this._subThemeSelectorViewUpdate(t,this.state)},_subThemeSelectorViewUpdate(t,i){function e(t){return"object"==typeof t&&!!t.subMobilityThemeSelectorParent&&!!t.subMobilityThemeSelector}function a(){const t=this._getSubMobilityThemeSelector().parentsUntil("form").filter("div.form-group");"none"!==t.css("display")?t.css("display","none"):t.css("display","")}const o=void 0===t,s=t?.topMobilityTheme!==i.topMobilityTheme;if(o||s){const t=Ao[i.topMobilityTheme];if(t?.length>0){(function(){if(e(i)){i.subMobilityThemeSelectorParent.append(i.subMobilityThemeSelector),a.apply(this);const t={...i},e=new Set(["subMobilityThemeSelector","subMobilityThemeSelectorParent"]),o=Object.keys(t).reduce(((i,a)=>(e.has(a)||(i[a]=t[a]),i)),{});this._updateState(o)}}).apply(this);const o=function(t){const i=t.map((t=>{const i=document.createElement("option");return i.value=t,i.text=Mo[t],i})),e=document.createElement("option");return e.value="",e.text="",e.selected=!0,i.unshift(e),i}.apply(this,[t]);(function(t){this._getSubMobilityThemeSelector().empty().append(t)}).apply(this,[o])}else(function(){if(!e(i)){a.apply(this);const t=this._getSubMobilityThemeSelector().parent(),i=this._getSubMobilityThemeSelector().detach();this._mergeState({subMobilityThemeSelector:i,subMobilityThemeSelectorParent:t})}}).apply(this)}}};ckan.module("digitraffic_theme_dataset_form_wrapper",(function(t){return Po}));const Co={initialize(){$o.apply(this)}};ckan.module("digitraffic_theme_iri_fragment_inputs",(function(t){return Co}));const To={initialize(){$o.apply(this);const t=this._getForm(),i=this._getFormInput(),e=this._getLanguageDropdown(),a=this._getLanguageOptions();e.on("click",this._toggleLanguageDropdownMouseOpen),e.on("keydown",this._toggleLanguageDropdownKeyboardOpen),a.each(((e,a)=>{const o=$(a);o.on("click",(()=>this._submitFormMouse(o,i,t))),o.on("keydown",(e=>this._submitFormKeyboard(e,o,i,t)))}))},_toggleLanguageDropdownMouseOpen(t){t.target&&t.target.classList.toggle("open")},_toggleLanguageDropdownKeyboardOpen(t){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),t.target&&t.target.classList.toggle("open"))},_submitFormMouse(t,i,e){const a=t.attr("data-value");i&&a&&i.val(a),e&&e.trigger("submit")},_submitFormKeyboard(t,i,e,a){if("Enter"===t.key||" "===t.key){const t=i.attr("data-value");e&&t&&e.val(t),a&&a.trigger("submit")}},_getForm(){return this.$("#language-menu-form")},_getFormInput(){return this.$("#language-option-hidden")},_getLanguageDropdown(){return this.$(".custom-language-dropdown")},_getLanguageOptions(){return this.$(".custom-language-option")}};ckan.module("digitraffic_theme_language_menu",(function(t){return To}));
/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zo=([t,i,e])=>{const a=document.createElementNS("http://www.w3.org/2000/svg",t);return Object.keys(i).forEach((t=>{a.setAttribute(t,String(i[t]))})),e?.length&&e.forEach((t=>{const i=zo(t);a.appendChild(i)})),a},Lo={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},No=t=>"string"==typeof t?t:t&&t.class?t.class&&"string"==typeof t.class?t.class.split(" "):t.class&&Array.isArray(t.class)?t.class:"":"",Oo=(t,{nameAttr:i,icons:e,attrs:a})=>{const o=t.getAttribute(i);if(null==o)return;const s=e[o.replace(/(\w)(\w*)(_|-|\s*)/g,((t,i,e)=>i.toUpperCase()+e.toLowerCase()))];if(!s)return console.warn(`${t.outerHTML} icon name was not found in the provided icons object.`);const r=(t=>Array.from(t.attributes).reduce(((t,i)=>(t[i.name]=i.value,t)),{}))(t),n={...Lo,"data-lucide":o,...a,...r},l=["lucide",`lucide-${o}`,r,a].flatMap(No).map((t=>t.trim())).filter(Boolean).filter(((t,i,e)=>e.indexOf(t)===i)).join(" ");l&&Object.assign(n,{class:l});const d=zo(["svg",n,s]);return t.parentNode?.replaceChild(d,t)},Ro=[["path",{d:"m6 9 6 6 6-6"}]],Uo=[["path",{d:"m18 15-6-6-6 6"}]],Do=[["path",{d:"M15 3h6v6"}],["path",{d:"M10 14 21 3"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}]],jo=[["path",{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"}]],Bo=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],["path",{d:"M2 12h20"}]],Ho=[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5"}]],Io=[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}],["rect",{width:"4",height:"12",x:"2",y:"9"}],["circle",{cx:"4",cy:"4",r:"2"}]],Vo=[["line",{x1:"4",x2:"20",y1:"12",y2:"12"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18"}]],Wo=[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"}]],Fo=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]],Ko=[["path",{d:"M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"}],["path",{d:"m10 15 5-3-5-3z"}]];
/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */jQuery((function(){$(".js-disabled").removeClass("js-disabled"),(({icons:t={},nameAttr:i="data-lucide",attrs:e={}}={})=>{if(!Object.values(t).length)throw new Error("Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`");if("undefined"==typeof document)throw new Error("`createIcons()` only works in a browser environment.");const a=document.querySelectorAll(`[${i}]`);if(Array.from(a).forEach((a=>Oo(a,{nameAttr:i,icons:t,attrs:e}))),"data-lucide"===i){const i=document.querySelectorAll("[icon-name]");i.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(i).forEach((i=>Oo(i,{nameAttr:"icon-name",icons:t,attrs:e}))))}})({icons:{ExternalLink:Do,User:Fo,Menu:Vo,Globe:Bo,ChevronDown:Ro,ChevronUp:Uo,Facebook:jo,Twitter:Wo,Instagram:Ho,Youtube:Ko,Linkedin:Io}})}));
