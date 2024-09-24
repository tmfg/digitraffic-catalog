const FdsTokenSize3 = { name: "fds-size-3", value: "24px" };

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * Map of ARIAMixin properties to attributes
 */
// Shim the global element internals object
// Methods should be fine as noops and properties can generally
// be while on the server.
const ElementInternalsShim = class ElementInternals {
    get shadowRoot() {
        // Grab the shadow root instance from the Element shim
        // to ensure that the shadow root is always available
        // to the internals instance even if the mode is 'closed'
        return this.__host
            .__shadowRoot;
    }
    constructor(_host) {
        this.ariaAtomic = '';
        this.ariaAutoComplete = '';
        this.ariaBrailleLabel = '';
        this.ariaBrailleRoleDescription = '';
        this.ariaBusy = '';
        this.ariaChecked = '';
        this.ariaColCount = '';
        this.ariaColIndex = '';
        this.ariaColSpan = '';
        this.ariaCurrent = '';
        this.ariaDescription = '';
        this.ariaDisabled = '';
        this.ariaExpanded = '';
        this.ariaHasPopup = '';
        this.ariaHidden = '';
        this.ariaInvalid = '';
        this.ariaKeyShortcuts = '';
        this.ariaLabel = '';
        this.ariaLevel = '';
        this.ariaLive = '';
        this.ariaModal = '';
        this.ariaMultiLine = '';
        this.ariaMultiSelectable = '';
        this.ariaOrientation = '';
        this.ariaPlaceholder = '';
        this.ariaPosInSet = '';
        this.ariaPressed = '';
        this.ariaReadOnly = '';
        this.ariaRequired = '';
        this.ariaRoleDescription = '';
        this.ariaRowCount = '';
        this.ariaRowIndex = '';
        this.ariaRowSpan = '';
        this.ariaSelected = '';
        this.ariaSetSize = '';
        this.ariaSort = '';
        this.ariaValueMax = '';
        this.ariaValueMin = '';
        this.ariaValueNow = '';
        this.ariaValueText = '';
        this.role = '';
        this.form = null;
        this.labels = [];
        this.states = new Set();
        this.validationMessage = '';
        this.validity = {};
        this.willValidate = true;
        this.__host = _host;
    }
    checkValidity() {
        // TODO(augustjk) Consider actually implementing logic.
        // See https://github.com/lit/lit/issues/3740
        console.warn('`ElementInternals.checkValidity()` was called on the server.' +
            'This method always returns true.');
        return true;
    }
    reportValidity() {
        return true;
    }
    setFormValue() { }
    setValidity() { }
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const attributes = new WeakMap();
const attributesForElement = (element) => {
    let attrs = attributes.get(element);
    if (attrs === undefined) {
        attributes.set(element, (attrs = new Map()));
    }
    return attrs;
};
// The typings around the exports below are a little funky:
//
// 1. We want the `name` of the shim classes to match the real ones at runtime,
//    hence e.g. `class Element`.
// 2. We can't shadow the global types with a simple class declaration, because
//    then we can't reference the global types for casting, hence e.g.
//    `const ElementShim = class Element`.
// 3. We want to export the classes typed as the real ones, hence e.g.
//    `const ElementShimWithRealType = ElementShim as object as typeof Element;`.
// 4. We want the exported names to match the real ones, hence e.g.
//    `export {ElementShimWithRealType as Element}`.
const ElementShim = class Element {
    constructor() {
        this.__shadowRootMode = null;
        this.__shadowRoot = null;
        this.__internals = null;
    }
    get attributes() {
        return Array.from(attributesForElement(this)).map(([name, value]) => ({
            name,
            value,
        }));
    }
    get shadowRoot() {
        if (this.__shadowRootMode === 'closed') {
            return null;
        }
        return this.__shadowRoot;
    }
    get localName() {
        return this.constructor.__localName;
    }
    get tagName() {
        return this.localName?.toUpperCase();
    }
    setAttribute(name, value) {
        // Emulate browser behavior that silently casts all values to string. E.g.
        // `42` becomes `"42"` and `{}` becomes `"[object Object]""`.
        attributesForElement(this).set(name, String(value));
    }
    removeAttribute(name) {
        attributesForElement(this).delete(name);
    }
    toggleAttribute(name, force) {
        // Steps reference https://dom.spec.whatwg.org/#dom-element-toggleattribute
        if (this.hasAttribute(name)) {
            // Step 5
            if (force === undefined || !force) {
                this.removeAttribute(name);
                return false;
            }
        }
        else {
            // Step 4
            if (force === undefined || force) {
                // Step 4.1
                this.setAttribute(name, '');
                return true;
            }
            else {
                // Step 4.2
                return false;
            }
        }
        // Step 6
        return true;
    }
    hasAttribute(name) {
        return attributesForElement(this).has(name);
    }
    attachShadow(init) {
        const shadowRoot = { host: this };
        this.__shadowRootMode = init.mode;
        if (init && init.mode === 'open') {
            this.__shadowRoot = shadowRoot;
        }
        return shadowRoot;
    }
    attachInternals() {
        if (this.__internals !== null) {
            throw new Error(`Failed to execute 'attachInternals' on 'HTMLElement': ` +
                `ElementInternals for the specified element was already attached.`);
        }
        const internals = new ElementInternalsShim(this);
        this.__internals = internals;
        return internals;
    }
    getAttribute(name) {
        const value = attributesForElement(this).get(name);
        return value ?? null;
    }
};
const HTMLElementShim = class HTMLElement extends ElementShim {
};
const HTMLElementShimWithRealType = HTMLElementShim;
const CustomElementRegistryShim = class CustomElementRegistry {
    constructor() {
        this.__definitions = new Map();
    }
    define(name, ctor) {
        if (this.__definitions.has(name)) {
            if (process.env.NODE_ENV === 'development') {
                console.warn(`'CustomElementRegistry' already has "${name}" defined. ` +
                    `This may have been caused by live reload or hot module ` +
                    `replacement in which case it can be safely ignored.\n` +
                    `Make sure to test your application with a production build as ` +
                    `repeat registrations will throw in production.`);
            }
            else {
                throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': ` +
                    `the name "${name}" has already been used with this registry`);
            }
        }
        // Provide tagName and localName for the component.
        ctor.__localName = name;
        this.__definitions.set(name, {
            ctor,
            // Note it's important we read `observedAttributes` in case it is a getter
            // with side-effects, as is the case in Lit, where it triggers class
            // finalization.
            //
            // TODO(aomarks) To be spec compliant, we should also capture the
            // registration-time lifecycle methods like `connectedCallback`. For them
            // to be actually accessible to e.g. the Lit SSR element renderer, though,
            // we'd need to introduce a new API for accessing them (since `get` only
            // returns the constructor).
            observedAttributes: ctor.observedAttributes ?? [],
        });
    }
    get(name) {
        const definition = this.__definitions.get(name);
        return definition?.ctor;
    }
};
const CustomElementRegistryShimWithRealType = CustomElementRegistryShim;
const customElements$1 = new CustomElementRegistryShimWithRealType();

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=globalThis,e$3=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),n$5=new WeakMap;let o$4 = class o{constructor(t,e,n){if(this._$cssResult$=!0,n!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$3&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$5.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$5.set(s,t));}return t}toString(){return this.cssText}};const r$2=t=>new o$4("string"==typeof t?t:t+"",void 0,s$2),i$4=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o$4(n,t,s$2)},S$1=(s,n)=>{e$3?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$3.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$2=e$3||void 0===t$3.CSSStyleSheet?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var r$1,h$1;const o$3=globalThis;null!==(r$1=o$3.customElements)&&void 0!==r$1||(o$3.customElements=customElements$1);const n$4=o$3.trustedTypes,l$3=n$4?n$4.emptyScript:"",a$1=o$3.reactiveElementPolyfillSupport,d$1={toAttribute(t,i){switch(i){case Boolean:t=t?l$3:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},u$1=(t,i)=>i!==t&&(i==i||t==t),c$1={attribute:!0,type:String,converter:d$1,reflect:!1,hasChanged:u$1},v$1="finalized";let p$1 = class p extends(globalThis.HTMLElement??HTMLElementShimWithRealType){constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=c$1){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||c$1}static finalize(){if(this.hasOwnProperty(v$1))return !1;this[v$1]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const e=new Set(t.flat(1/0).reverse());for(const t of e)i.unshift(c$2(t));}else void 0!==t&&i.push(c$2(t));return i}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=c$1){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:d$1).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:d$1;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||u$1)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}};p$1[v$1]=!0,p$1.elementProperties=new Map,p$1.elementStyles=[],p$1.shadowRootOptions={mode:"open"},null==a$1||a$1({ReactiveElement:p$1}),(null!==(h$1=o$3.reactiveElementVersions)&&void 0!==h$1?h$1:o$3.reactiveElementVersions=[]).push("1.6.3");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$2;const i$3=globalThis,s$1=i$3.trustedTypes,e$2=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$2="$lit$",n$3=`lit$${(Math.random()+"").slice(9)}$`,l$2="?"+n$3,h=`<${l$2}>`,r=void 0===i$3.document?{createTreeWalker:()=>({})}:document,u=()=>r.createComment(""),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c=Array.isArray,v=t=>c(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${a}(?:([^\\s"'>=/]+)(${a}*=${a}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),T=x(1),w=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),E=new WeakMap,C=r.createTreeWalker(r,129,null,!1);function P(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$2?e$2.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,e=[];let l,r=2===i?"<svg>":"",u=f;for(let i=0;i<s;i++){const s=t[i];let d,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f?"!--"===c[1]?u=_:void 0!==c[1]?u=m:void 0!==c[2]?(y.test(c[2])&&(l=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=l?l:f,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,d=c[1],u=void 0===c[3]?p:'"'===c[3]?$:g):u===$||u===g?u=p:u===_||u===m?u=f:(u=p,l=void 0);const x=u===p&&t[i+1].startsWith("/>")?" ":"";r+=u===f?s+h:v>=0?(e.push(d),s.slice(0,v)+o$2+s.slice(v)+n$3+x):s+n$3+(-2===v?(e.push(void 0),i):x);}return [P(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]};class N{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,d=0;const c=t.length-1,v=this.parts,[a,f]=V(t,i);if(this.el=N.createElement(a,e),C.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(h=C.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith(o$2)||i.startsWith(n$3)){const s=f[d++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+o$2).split(n$3),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?H:"?"===i[1]?L:"@"===i[1]?z:R});}else v.push({type:6,index:r});}for(const i of t)h.removeAttribute(i);}if(y.test(h.tagName)){const t=h.textContent.split(n$3),i=t.length-1;if(i>0){h.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],u()),C.nextNode(),v.push({type:2,index:++r});h.append(t[i],u());}}}else if(8===h.nodeType)if(h.data===l$2)v.push({type:2,index:r});else {let t=-1;for(;-1!==(t=h.data.indexOf(n$3,t+1));)v.push({type:7,index:r}),t+=n$3.length-1;}r++;}}static createElement(t,i){const s=r.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){var o,n,l,h;if(i===w)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=S(t,r._$AS(t,i.values),r,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:r).importNode(s,!0);C.currentNode=o;let n=C.nextNode(),l=0,h=0,u=e[0];for(;void 0!==u;){if(l===u.index){let i;2===u.type?i=new k(n,n.nextSibling,this,t):1===u.type?i=new u.ctor(n,u.name,u.strings,this,t):6===u.type&&(i=new W(n,this,t)),this._$AV.push(i),u=e[++h];}l!==(null==u?void 0:u.index)&&(n=C.nextNode(),l++);}return C.currentNode=r,o}v(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{constructor(t,i,s,e){var o;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),d(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==w&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==A&&d(this._$AH)?this._$AA.nextSibling.data=t:this.$(r.createTextNode(t)),this._$AH=t;}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=N.createElement(P(e.h,e.h[0]),this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else {const t=new M(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t;}}_$AC(t){let i=E.get(t.strings);return void 0===i&&E.set(t.strings,i=new N(t)),i}T(t){c(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new k(this.k(u()),this.k(u()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class R{constructor(t,i,s,e,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=S(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==w,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=S(this,e[s+l],i,l),h===w&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class H extends R{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}const I=s$1?s$1.emptyScript:"";class L extends R{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==A?this.element.setAttribute(this.name,I):this.element.removeAttribute(this.name);}}class z extends R{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=S(this,t,i,0))&&void 0!==s?s:A)===w)return;const e=this._$AH,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class W{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const j=i$3.litHtmlPolyfillSupport;null==j||j(N,k),(null!==(t$2=i$3.litHtmlVersions)&&void 0!==t$2?t$2:i$3.litHtmlVersions=[]).push("2.8.0");const B=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new k(i.insertBefore(u(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l$1,o$1;class s extends p$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=B(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return w}}s.finalized=!0,s._$litElement$=!0,null===(l$1=globalThis.litElementHydrateSupport)||void 0===l$1||l$1.call(globalThis,{LitElement:s});const n$2=globalThis.litElementPolyfillSupport;null==n$2||n$2({LitElement:s});(null!==(o$1=globalThis.litElementVersions)&&void 0!==o$1?o$1:globalThis.litElementVersions=[]).push("3.3.3");

const FdsTypographyBodyDefaultFontFamily = /*#__PURE__*/ r$2("var(--fds-typography-body-default-font-family, 'Public Sans')");
const FdsTypographyBodyDefaultFontSize = /*#__PURE__*/ r$2("var(--fds-typography-body-default-font-size, 16px)");
const FdsTypographyBodyDefaultLetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-body-default-letter-spacing, 0px)");
const FdsTypographyBodyDefaultLineHeight = /*#__PURE__*/ r$2("var(--fds-typography-body-default-line-height, 150%)");
const FdsTypographyBodyDefaultFontWeight = /*#__PURE__*/ r$2("var(--fds-typography-body-default-font-weight, 400)");
const FdsTypographyBodyDefaultDisplay = /*#__PURE__*/ r$2("var(--fds-typography-body-default-display, inline-block)");
const FdsTypographyBodyLargeFontFamily = /*#__PURE__*/ r$2("var(--fds-typography-body-large-font-family, 'Public Sans')");
const FdsTypographyBodyLargeFontSize = /*#__PURE__*/ r$2("var(--fds-typography-body-large-font-size, 18px)");
const FdsTypographyBodyLargeLetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-body-large-letter-spacing, 0px)");
const FdsTypographyBodyLargeLineHeight = /*#__PURE__*/ r$2("var(--fds-typography-body-large-line-height, 150%)");
const FdsTypographyBodyLargeFontWeight = /*#__PURE__*/ r$2("var(--fds-typography-body-large-font-weight, 400)");
const FdsTypographyBodyLargeDisplay = /*#__PURE__*/ r$2("var(--fds-typography-body-large-display, inline-block)");
const FdsTypographyBodyMicroFontFamily = /*#__PURE__*/ r$2("var(--fds-typography-body-micro-font-family, 'Public Sans')");
const FdsTypographyBodyMicroFontSize = /*#__PURE__*/ r$2("var(--fds-typography-body-micro-font-size, 12px)");
const FdsTypographyBodyMicroLetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-body-micro-letter-spacing, 0px)");
const FdsTypographyBodyMicroLineHeight = /*#__PURE__*/ r$2("var(--fds-typography-body-micro-line-height, 150%)");
const FdsTypographyBodyMicroFontWeight = /*#__PURE__*/ r$2("var(--fds-typography-body-micro-font-weight, 400)");
const FdsTypographyBodyMicroDisplay = /*#__PURE__*/ r$2("var(--fds-typography-body-micro-display, inline-block)");
const FdsTypographyBodySmallFontFamily = /*#__PURE__*/ r$2("var(--fds-typography-body-small-font-family, 'Public Sans')");
const FdsTypographyBodySmallFontSize = /*#__PURE__*/ r$2("var(--fds-typography-body-small-font-size, 14px)");
const FdsTypographyBodySmallLetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-body-small-letter-spacing, 0px)");
const FdsTypographyBodySmallLineHeight = /*#__PURE__*/ r$2("var(--fds-typography-body-small-line-height, 150%)");
const FdsTypographyBodySmallFontWeight = /*#__PURE__*/ r$2("var(--fds-typography-body-small-font-weight, 400)");
const FdsTypographyBodySmallDisplay = /*#__PURE__*/ r$2("var(--fds-typography-body-small-display, inline-block)");
const FdsTypographyEmphasisDefaultFontFamily = /*#__PURE__*/ r$2("var(--fds-typography-emphasis-default-font-family, 'Public Sans')");
const FdsTypographyEmphasisDefaultFontSize = /*#__PURE__*/ r$2("var(--fds-typography-emphasis-default-font-size, 16px)");
const FdsTypographyEmphasisDefaultLetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-emphasis-default-letter-spacing, 0px)");
const FdsTypographyEmphasisDefaultLineHeight = /*#__PURE__*/ r$2("var(--fds-typography-emphasis-default-line-height, 150%)");
const FdsTypographyEmphasisDefaultFontWeight = /*#__PURE__*/ r$2("var(--fds-typography-emphasis-default-font-weight, 700)");
const FdsTypographyEmphasisDefaultDisplay = /*#__PURE__*/ r$2("var(--fds-typography-emphasis-default-display, inline-block)");
const FdsTypographyEmphasisLargeFontFamily = /*#__PURE__*/ r$2("var(--fds-typography-emphasis-large-font-family, 'Public Sans')");
const FdsTypographyEmphasisLargeFontSize = /*#__PURE__*/ r$2("var(--fds-typography-emphasis-large-font-size, 18px)");
const FdsTypographyEmphasisLargeLetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-emphasis-large-letter-spacing, 0px)");
const FdsTypographyEmphasisLargeLineHeight = /*#__PURE__*/ r$2("var(--fds-typography-emphasis-large-line-height, 150%)");
const FdsTypographyEmphasisLargeFontWeight = /*#__PURE__*/ r$2("var(--fds-typography-emphasis-large-font-weight, 700)");
const FdsTypographyEmphasisLargeDisplay = /*#__PURE__*/ r$2("var(--fds-typography-emphasis-large-display, inline-block)");
const FdsTypographyEmphasisMicroFontFamily = /*#__PURE__*/ r$2("var(--fds-typography-emphasis-micro-font-family, 'Public Sans')");
const FdsTypographyEmphasisMicroFontSize = /*#__PURE__*/ r$2("var(--fds-typography-emphasis-micro-font-size, 12px)");
const FdsTypographyEmphasisMicroLetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-emphasis-micro-letter-spacing, 0px)");
const FdsTypographyEmphasisMicroLineHeight = /*#__PURE__*/ r$2("var(--fds-typography-emphasis-micro-line-height, 150%)");
const FdsTypographyEmphasisMicroFontWeight = /*#__PURE__*/ r$2("var(--fds-typography-emphasis-micro-font-weight, 700)");
const FdsTypographyEmphasisMicroDisplay = /*#__PURE__*/ r$2("var(--fds-typography-emphasis-micro-display, inline-block)");
const FdsTypographyEmphasisSmallFontFamily = /*#__PURE__*/ r$2("var(--fds-typography-emphasis-small-font-family, 'Public Sans')");
const FdsTypographyEmphasisSmallFontSize = /*#__PURE__*/ r$2("var(--fds-typography-emphasis-small-font-size, 14px)");
const FdsTypographyEmphasisSmallLetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-emphasis-small-letter-spacing, 0px)");
const FdsTypographyEmphasisSmallLineHeight = /*#__PURE__*/ r$2("var(--fds-typography-emphasis-small-line-height, 150%)");
const FdsTypographyEmphasisSmallFontWeight = /*#__PURE__*/ r$2("var(--fds-typography-emphasis-small-font-weight, 700)");
const FdsTypographyEmphasisSmallDisplay = /*#__PURE__*/ r$2("var(--fds-typography-emphasis-small-display, inline-block)");
const FdsTypographyHeadingLargeHeading3FontFamily = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-3-font-family, 'Public Sans', 'PublicSans-Bold')");
const FdsTypographyHeadingLargeHeading3FontSize = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-3-font-size, 40px)");
const FdsTypographyHeadingLargeHeading3LetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-3-letter-spacing, 0px)");
const FdsTypographyHeadingLargeHeading3LineHeight = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-3-line-height, 110%)");
const FdsTypographyHeadingLargeHeading3FontWeight = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-3-font-weight, 700)");
const FdsTypographyHeadingLargeHeading3Display = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-3-display, inline-block)");
const FdsTypographyHeadingLargeHeading4FontFamily = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-4-font-family, 'Public Sans', 'PublicSans-Bold')");
const FdsTypographyHeadingLargeHeading4FontSize = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-4-font-size, 32px)");
const FdsTypographyHeadingLargeHeading4LetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-4-letter-spacing, 0px)");
const FdsTypographyHeadingLargeHeading4LineHeight = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-4-line-height, 110%)");
const FdsTypographyHeadingLargeHeading4FontWeight = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-4-font-weight, 700)");
const FdsTypographyHeadingLargeHeading4Display = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-4-display, inline-block)");
const FdsTypographyHeadingLargeHeading5FontFamily = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-5-font-family, 'Public Sans', 'PublicSans-Bold')");
const FdsTypographyHeadingLargeHeading5FontSize = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-5-font-size, 28px)");
const FdsTypographyHeadingLargeHeading5LetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-5-letter-spacing, 0px)");
const FdsTypographyHeadingLargeHeading5LineHeight = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-5-line-height, 110%)");
const FdsTypographyHeadingLargeHeading5FontWeight = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-5-font-weight, 700)");
const FdsTypographyHeadingLargeHeading5Display = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-5-display, inline-block)");
const FdsTypographyHeadingLargeHeading6FontFamily = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-6-font-family, 'Public Sans', 'PublicSans-Bold')");
const FdsTypographyHeadingLargeHeading6FontSize = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-6-font-size, 20px)");
const FdsTypographyHeadingLargeHeading6LetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-6-letter-spacing, 0px)");
const FdsTypographyHeadingLargeHeading6LineHeight = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-6-line-height, 110%)");
const FdsTypographyHeadingLargeHeading6FontWeight = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-6-font-weight, 700)");
const FdsTypographyHeadingLargeHeading6Display = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-6-display, inline-block)");
const FdsTypographyHeadingLargeHeading1FontFamily = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-1-font-family, 'Public Sans', 'PublicSans-Bold')");
const FdsTypographyHeadingLargeHeading1FontSize = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-1-font-size, 64px)");
const FdsTypographyHeadingLargeHeading1LetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-1-letter-spacing, 0px)");
const FdsTypographyHeadingLargeHeading1LineHeight = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-1-line-height, 110%)");
const FdsTypographyHeadingLargeHeading1FontWeight = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-1-font-weight, 700)");
const FdsTypographyHeadingLargeHeading1Display = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-1-display, inline-block)");
const FdsTypographyHeadingLargeHeading2FontFamily = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-2-font-family, 'Public Sans', 'PublicSans-Bold')");
const FdsTypographyHeadingLargeHeading2FontSize = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-2-font-size, 48px)");
const FdsTypographyHeadingLargeHeading2LetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-2-letter-spacing, 0px)");
const FdsTypographyHeadingLargeHeading2LineHeight = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-2-line-height, 110%)");
const FdsTypographyHeadingLargeHeading2FontWeight = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-2-font-weight, 700)");
const FdsTypographyHeadingLargeHeading2Display = /*#__PURE__*/ r$2("var(--fds-typography-heading-large-heading-2-display, inline-block)");
const FdsTypographyHeadingSmallHeading1FontFamily = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-1-font-family, 'Public Sans', 'PublicSans-Bold')");
const FdsTypographyHeadingSmallHeading1FontSize = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-1-font-size, 42px)");
const FdsTypographyHeadingSmallHeading1LetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-1-letter-spacing, 0px)");
const FdsTypographyHeadingSmallHeading1LineHeight = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-1-line-height, 110%)");
const FdsTypographyHeadingSmallHeading1FontWeight = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-1-font-weight, 700)");
const FdsTypographyHeadingSmallHeading1Display = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-1-display, inline-block)");
const FdsTypographyHeadingSmallHeading2FontFamily = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-2-font-family, 'Public Sans', 'PublicSans-Bold')");
const FdsTypographyHeadingSmallHeading2FontSize = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-2-font-size, 32px)");
const FdsTypographyHeadingSmallHeading2LetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-2-letter-spacing, 0px)");
const FdsTypographyHeadingSmallHeading2LineHeight = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-2-line-height, 110%)");
const FdsTypographyHeadingSmallHeading2FontWeight = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-2-font-weight, 700)");
const FdsTypographyHeadingSmallHeading2Display = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-2-display, inline-block)");
const FdsTypographyHeadingSmallHeading3FontFamily = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-3-font-family, 'Public Sans', 'PublicSans-Bold')");
const FdsTypographyHeadingSmallHeading3FontSize = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-3-font-size, 28px)");
const FdsTypographyHeadingSmallHeading3LetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-3-letter-spacing, 0px)");
const FdsTypographyHeadingSmallHeading3LineHeight = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-3-line-height, 110%)");
const FdsTypographyHeadingSmallHeading3FontWeight = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-3-font-weight, 700)");
const FdsTypographyHeadingSmallHeading3Display = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-3-display, inline-block)");
const FdsTypographyHeadingSmallHeading4FontFamily = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-4-font-family, 'Public Sans', 'PublicSans-Bold')");
const FdsTypographyHeadingSmallHeading4FontSize = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-4-font-size, 24px)");
const FdsTypographyHeadingSmallHeading4LetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-4-letter-spacing, 0px)");
const FdsTypographyHeadingSmallHeading4LineHeight = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-4-line-height, 110%)");
const FdsTypographyHeadingSmallHeading4FontWeight = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-4-font-weight, 700)");
const FdsTypographyHeadingSmallHeading4Display = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-4-display, inline-block)");
const FdsTypographyHeadingSmallHeading5FontFamily = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-5-font-family, 'Public Sans', 'PublicSans-Bold')");
const FdsTypographyHeadingSmallHeading5FontSize = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-5-font-size, 18px)");
const FdsTypographyHeadingSmallHeading5LetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-5-letter-spacing, 0px)");
const FdsTypographyHeadingSmallHeading5LineHeight = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-5-line-height, 110%)");
const FdsTypographyHeadingSmallHeading5FontWeight = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-5-font-weight, 700)");
const FdsTypographyHeadingSmallHeading5Display = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-5-display, inline-block)");
const FdsTypographyHeadingSmallHeading6FontFamily = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-6-font-family, 'Public Sans', 'PublicSans-Bold')");
const FdsTypographyHeadingSmallHeading6FontSize = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-6-font-size, 16px)");
const FdsTypographyHeadingSmallHeading6LetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-6-letter-spacing, 0px)");
const FdsTypographyHeadingSmallHeading6LineHeight = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-6-line-height, 110%)");
const FdsTypographyHeadingSmallHeading6FontWeight = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-6-font-weight, 700)");
const FdsTypographyHeadingSmallHeading6Display = /*#__PURE__*/ r$2("var(--fds-typography-heading-small-heading-6-display, inline-block)");
const FdsTypographyLinkLargeFontFamily = /*#__PURE__*/ r$2("var(--fds-typography-link-large-font-family, 'Public Sans')");
const FdsTypographyLinkLargeFontSize = /*#__PURE__*/ r$2("var(--fds-typography-link-large-font-size, 18px)");
const FdsTypographyLinkLargeLetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-link-large-letter-spacing, 0px)");
const FdsTypographyLinkLargeLineHeight = /*#__PURE__*/ r$2("var(--fds-typography-link-large-line-height, 150%)");
const FdsTypographyLinkLargeFontWeight = /*#__PURE__*/ r$2("var(--fds-typography-link-large-font-weight, 400)");
const FdsTypographyLinkLargeTextDecoration = /*#__PURE__*/ r$2("var(--fds-typography-link-large-text-decoration, underline)");
const FdsTypographyLinkLargeDisplay = /*#__PURE__*/ r$2("var(--fds-typography-link-large-display, inline-block)");
const FdsTypographyLinkMicroFontFamily = /*#__PURE__*/ r$2("var(--fds-typography-link-micro-font-family, 'Public Sans')");
const FdsTypographyLinkMicroFontSize = /*#__PURE__*/ r$2("var(--fds-typography-link-micro-font-size, 12px)");
const FdsTypographyLinkMicroLetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-link-micro-letter-spacing, 0px)");
const FdsTypographyLinkMicroLineHeight = /*#__PURE__*/ r$2("var(--fds-typography-link-micro-line-height, 150%)");
const FdsTypographyLinkMicroFontWeight = /*#__PURE__*/ r$2("var(--fds-typography-link-micro-font-weight, 400)");
const FdsTypographyLinkMicroTextDecoration = /*#__PURE__*/ r$2("var(--fds-typography-link-micro-text-decoration, underline)");
const FdsTypographyLinkMicroDisplay = /*#__PURE__*/ r$2("var(--fds-typography-link-micro-display, inline-block)");
const FdsTypographyLinkSmallFontFamily = /*#__PURE__*/ r$2("var(--fds-typography-link-small-font-family, 'Public Sans')");
const FdsTypographyLinkSmallFontSize = /*#__PURE__*/ r$2("var(--fds-typography-link-small-font-size, 14px)");
const FdsTypographyLinkSmallLetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-link-small-letter-spacing, 0px)");
const FdsTypographyLinkSmallLineHeight = /*#__PURE__*/ r$2("var(--fds-typography-link-small-line-height, 150%)");
const FdsTypographyLinkSmallFontWeight = /*#__PURE__*/ r$2("var(--fds-typography-link-small-font-weight, 400)");
const FdsTypographyLinkSmallTextDecoration = /*#__PURE__*/ r$2("var(--fds-typography-link-small-text-decoration, underline)");
const FdsTypographyLinkSmallDisplay = /*#__PURE__*/ r$2("var(--fds-typography-link-small-display, inline-block)");
const FdsTypographyLinkDefaultFontFamily = /*#__PURE__*/ r$2("var(--fds-typography-link-default-font-family, 'Public Sans')");
const FdsTypographyLinkDefaultFontSize = /*#__PURE__*/ r$2("var(--fds-typography-link-default-font-size, 16px)");
const FdsTypographyLinkDefaultLetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-link-default-letter-spacing, 0px)");
const FdsTypographyLinkDefaultLineHeight = /*#__PURE__*/ r$2("var(--fds-typography-link-default-line-height, 150%)");
const FdsTypographyLinkDefaultFontWeight = /*#__PURE__*/ r$2("var(--fds-typography-link-default-font-weight, 400)");
const FdsTypographyLinkDefaultTextDecoration = /*#__PURE__*/ r$2("var(--fds-typography-link-default-text-decoration, underline)");
const FdsTypographyLinkDefaultDisplay = /*#__PURE__*/ r$2("var(--fds-typography-link-default-display, inline-block)");
const FdsTypographyUiHelperFontFamily = /*#__PURE__*/ r$2("var(--fds-typography-ui-helper-font-family, 'Public Sans', 'PublicSans-Regular')");
const FdsTypographyUiHelperFontSize = /*#__PURE__*/ r$2("var(--fds-typography-ui-helper-font-size, 15px)");
const FdsTypographyUiHelperLetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-ui-helper-letter-spacing, 0px)");
const FdsTypographyUiHelperLineHeight = /*#__PURE__*/ r$2("var(--fds-typography-ui-helper-line-height, 100%)");
const FdsTypographyUiHelperFontWeight = /*#__PURE__*/ r$2("var(--fds-typography-ui-helper-font-weight, 400)");
const FdsTypographyUiHelperDisplay = /*#__PURE__*/ r$2("var(--fds-typography-ui-helper-display, inline-block)");
const FdsTypographyUiIdFontFamily = /*#__PURE__*/ r$2("var(--fds-typography-ui-id-font-family, 'Roboto Mono')");
const FdsTypographyUiIdFontSize = /*#__PURE__*/ r$2("var(--fds-typography-ui-id-font-size, 13px)");
const FdsTypographyUiIdLetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-ui-id-letter-spacing, 0px)");
const FdsTypographyUiIdLineHeight = /*#__PURE__*/ r$2("var(--fds-typography-ui-id-line-height, 100%)");
const FdsTypographyUiIdFontWeight = /*#__PURE__*/ r$2("var(--fds-typography-ui-id-font-weight, 700)");
const FdsTypographyUiIdDisplay = /*#__PURE__*/ r$2("var(--fds-typography-ui-id-display, inline-block)");
const FdsTypographyUiLabelFontFamily = /*#__PURE__*/ r$2("var(--fds-typography-ui-label-font-family, 'Public Sans', 'PublicSans-Medium')");
const FdsTypographyUiLabelFontSize = /*#__PURE__*/ r$2("var(--fds-typography-ui-label-font-size, 16px)");
const FdsTypographyUiLabelLetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-ui-label-letter-spacing, 0px)");
const FdsTypographyUiLabelLineHeight = /*#__PURE__*/ r$2("var(--fds-typography-ui-label-line-height, 22px)");
const FdsTypographyUiLabelFontWeight = /*#__PURE__*/ r$2("var(--fds-typography-ui-label-font-weight, 500)");
const FdsTypographyUiLabelDisplay = /*#__PURE__*/ r$2("var(--fds-typography-ui-label-display, inline-block)");
const FdsTypographyUiPlaceholderFontFamily = /*#__PURE__*/ r$2("var(--fds-typography-ui-placeholder-font-family, 'Public Sans', 'PublicSans-Medium')");
const FdsTypographyUiPlaceholderFontSize = /*#__PURE__*/ r$2("var(--fds-typography-ui-placeholder-font-size, 16px)");
const FdsTypographyUiPlaceholderLetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-ui-placeholder-letter-spacing, 0px)");
const FdsTypographyUiPlaceholderLineHeight = /*#__PURE__*/ r$2("var(--fds-typography-ui-placeholder-line-height, 100%)");
const FdsTypographyUiPlaceholderFontWeight = /*#__PURE__*/ r$2("var(--fds-typography-ui-placeholder-font-weight, 500)");
const FdsTypographyUiPlaceholderDisplay = /*#__PURE__*/ r$2("var(--fds-typography-ui-placeholder-display, inline-block)");
const FdsTypographyUiTagFontFamily = /*#__PURE__*/ r$2("var(--fds-typography-ui-tag-font-family, 'Public Sans', 'PublicSans-Bold')");
const FdsTypographyUiTagFontSize = /*#__PURE__*/ r$2("var(--fds-typography-ui-tag-font-size, 16px)");
const FdsTypographyUiTagLetterSpacing = /*#__PURE__*/ r$2("var(--fds-typography-ui-tag-letter-spacing, 0px)");
const FdsTypographyUiTagLineHeight = /*#__PURE__*/ r$2("var(--fds-typography-ui-tag-line-height, 100%)");
const FdsTypographyUiTagFontWeight = /*#__PURE__*/ r$2("var(--fds-typography-ui-tag-font-weight, 700)");
const FdsTypographyUiTagDisplay = /*#__PURE__*/ r$2("var(--fds-typography-ui-tag-display, inline-block)");
const FdsColorBrandBlack = /*#__PURE__*/ r$2("var(--fds-color-brand-black, #000000)");
const FdsColorBrandWhite = /*#__PURE__*/ r$2("var(--fds-color-brand-white, #ffffff)");
const FdsColorNeutral100 = /*#__PURE__*/ r$2("var(--fds-color-neutral-100, #cdcdd7)");
const FdsColorText300 = /*#__PURE__*/ r$2("var(--fds-color-text-300, #9696aa)");

i$4`
  .body-default-text {
    display: ${FdsTypographyBodyDefaultDisplay};
    font-family: ${FdsTypographyBodyDefaultFontFamily};
    font-size: ${FdsTypographyBodyDefaultFontSize};
    font-weight: ${FdsTypographyBodyDefaultFontWeight};
    letter-spacing: ${FdsTypographyBodyDefaultLetterSpacing};
    line-height: ${FdsTypographyBodyDefaultLineHeight};
  }
`;

i$4`
  .body-large-text {
    display: ${FdsTypographyBodyLargeDisplay};
    font-family: ${FdsTypographyBodyLargeFontFamily};
    font-size: ${FdsTypographyBodyLargeFontSize};
    font-weight: ${FdsTypographyBodyLargeFontWeight};
    letter-spacing: ${FdsTypographyBodyLargeLetterSpacing};
    line-height: ${FdsTypographyBodyLargeLineHeight};
  }
`;

i$4`
  .body-micro-text {
    display: ${FdsTypographyBodyMicroDisplay};
    font-family: ${FdsTypographyBodyMicroFontFamily};
    font-size: ${FdsTypographyBodyMicroFontSize};
    font-weight: ${FdsTypographyBodyMicroFontWeight};
    letter-spacing: ${FdsTypographyBodyMicroLetterSpacing};
    line-height: ${FdsTypographyBodyMicroLineHeight};
  }
`;

i$4`
  .body-small-text {
    display: ${FdsTypographyBodySmallDisplay};
    font-family: ${FdsTypographyBodySmallFontFamily};
    font-size: ${FdsTypographyBodySmallFontSize};
    font-weight: ${FdsTypographyBodySmallFontWeight};
    letter-spacing: ${FdsTypographyBodySmallLetterSpacing};
    line-height: ${FdsTypographyBodySmallLineHeight};
  }
`;

i$4`
  .emphasis-default-text {
    display: ${FdsTypographyEmphasisDefaultDisplay};
    font-family: ${FdsTypographyEmphasisDefaultFontFamily};
    font-size: ${FdsTypographyEmphasisDefaultFontSize};
    font-weight: ${FdsTypographyEmphasisDefaultFontWeight};
    letter-spacing: ${FdsTypographyEmphasisDefaultLetterSpacing};
    line-height: ${FdsTypographyEmphasisDefaultLineHeight};
  }
`;

i$4`
  .emphasis-large-text {
    display: ${FdsTypographyEmphasisLargeDisplay};
    font-family: ${FdsTypographyEmphasisLargeFontFamily};
    font-size: ${FdsTypographyEmphasisLargeFontSize};
    font-weight: ${FdsTypographyEmphasisLargeFontWeight};
    letter-spacing: ${FdsTypographyEmphasisLargeLetterSpacing};
    line-height: ${FdsTypographyEmphasisLargeLineHeight};
  }
`;

i$4`
  .emphasis-micro-text {
    display: ${FdsTypographyEmphasisMicroDisplay};
    font-family: ${FdsTypographyEmphasisMicroFontFamily};
    font-size: ${FdsTypographyEmphasisMicroFontSize};
    font-weight: ${FdsTypographyEmphasisMicroFontWeight};
    letter-spacing: ${FdsTypographyEmphasisMicroLetterSpacing};
    line-height: ${FdsTypographyEmphasisMicroLineHeight};
  }
`;

i$4`
  .emphasis-small-text {
    display: ${FdsTypographyEmphasisSmallDisplay};
    font-family: ${FdsTypographyEmphasisSmallFontFamily};
    font-size: ${FdsTypographyEmphasisSmallFontSize};
    font-weight: ${FdsTypographyEmphasisSmallFontWeight};
    letter-spacing: ${FdsTypographyEmphasisSmallLetterSpacing};
    line-height: ${FdsTypographyEmphasisSmallLineHeight};
  }
`;

i$4`
  .heading-large-1-text {
    display: ${FdsTypographyHeadingLargeHeading1Display};
    font-family: ${FdsTypographyHeadingLargeHeading1FontFamily};
    font-size: ${FdsTypographyHeadingLargeHeading1FontSize};
    font-weight: ${FdsTypographyHeadingLargeHeading1FontWeight};
    letter-spacing: ${FdsTypographyHeadingLargeHeading1LetterSpacing};
    line-height: ${FdsTypographyHeadingLargeHeading1LineHeight};
  }
`;

i$4`
  .heading-large-2-text {
    display: ${FdsTypographyHeadingLargeHeading2Display};
    font-family: ${FdsTypographyHeadingLargeHeading2FontFamily};
    font-size: ${FdsTypographyHeadingLargeHeading2FontSize};
    font-weight: ${FdsTypographyHeadingLargeHeading2FontWeight};
    letter-spacing: ${FdsTypographyHeadingLargeHeading2LetterSpacing};
    line-height: ${FdsTypographyHeadingLargeHeading2LineHeight};
  }
`;

i$4`
  .heading-large-3-text {
    display: ${FdsTypographyHeadingLargeHeading3Display};
    font-family: ${FdsTypographyHeadingLargeHeading3FontFamily};
    font-size: ${FdsTypographyHeadingLargeHeading3FontSize};
    font-weight: ${FdsTypographyHeadingLargeHeading3FontWeight};
    letter-spacing: ${FdsTypographyHeadingLargeHeading3LetterSpacing};
    line-height: ${FdsTypographyHeadingLargeHeading3LineHeight};
  }
`;

i$4`
  .heading-large-4-text {
    display: ${FdsTypographyHeadingLargeHeading4Display};
    font-family: ${FdsTypographyHeadingLargeHeading4FontFamily};
    font-size: ${FdsTypographyHeadingLargeHeading4FontSize};
    font-weight: ${FdsTypographyHeadingLargeHeading4FontWeight};
    letter-spacing: ${FdsTypographyHeadingLargeHeading4LetterSpacing};
    line-height: ${FdsTypographyHeadingLargeHeading4LineHeight};
  }
`;

i$4`
  .heading-large-5-text {
    display: ${FdsTypographyHeadingLargeHeading5Display};
    font-family: ${FdsTypographyHeadingLargeHeading5FontFamily};
    font-size: ${FdsTypographyHeadingLargeHeading5FontSize};
    font-weight: ${FdsTypographyHeadingLargeHeading5FontWeight};
    letter-spacing: ${FdsTypographyHeadingLargeHeading5LetterSpacing};
    line-height: ${FdsTypographyHeadingLargeHeading5LineHeight};
  }
`;

i$4`
  .heading-large-6-text {
    display: ${FdsTypographyHeadingLargeHeading6Display};
    font-family: ${FdsTypographyHeadingLargeHeading6FontFamily};
    font-size: ${FdsTypographyHeadingLargeHeading6FontSize};
    font-weight: ${FdsTypographyHeadingLargeHeading6FontWeight};
    letter-spacing: ${FdsTypographyHeadingLargeHeading6LetterSpacing};
    line-height: ${FdsTypographyHeadingLargeHeading6LineHeight};
  }
`;

i$4`
  .heading-small-1-text {
    display: ${FdsTypographyHeadingSmallHeading1Display};
    font-family: ${FdsTypographyHeadingSmallHeading1FontFamily};
    font-size: ${FdsTypographyHeadingSmallHeading1FontSize};
    font-weight: ${FdsTypographyHeadingSmallHeading1FontWeight};
    letter-spacing: ${FdsTypographyHeadingSmallHeading1LetterSpacing};
    line-height: ${FdsTypographyHeadingSmallHeading1LineHeight};
  }
`;

i$4`
  .heading-small-2-text {
    display: ${FdsTypographyHeadingSmallHeading2Display};
    font-family: ${FdsTypographyHeadingSmallHeading2FontFamily};
    font-size: ${FdsTypographyHeadingSmallHeading2FontSize};
    font-weight: ${FdsTypographyHeadingSmallHeading2FontWeight};
    letter-spacing: ${FdsTypographyHeadingSmallHeading2LetterSpacing};
    line-height: ${FdsTypographyHeadingSmallHeading2LineHeight};
  }
`;

i$4`
  .heading-small-3-text {
    display: ${FdsTypographyHeadingSmallHeading3Display};
    font-family: ${FdsTypographyHeadingSmallHeading3FontFamily};
    font-size: ${FdsTypographyHeadingSmallHeading3FontSize};
    font-weight: ${FdsTypographyHeadingSmallHeading3FontWeight};
    letter-spacing: ${FdsTypographyHeadingSmallHeading3LetterSpacing};
    line-height: ${FdsTypographyHeadingSmallHeading3LineHeight};
  }
`;

i$4`
  .heading-small-4-text {
    display: ${FdsTypographyHeadingSmallHeading4Display};
    font-family: ${FdsTypographyHeadingSmallHeading4FontFamily};
    font-size: ${FdsTypographyHeadingSmallHeading4FontSize};
    font-weight: ${FdsTypographyHeadingSmallHeading4FontWeight};
    letter-spacing: ${FdsTypographyHeadingSmallHeading4LetterSpacing};
    line-height: ${FdsTypographyHeadingSmallHeading4LineHeight};
  }
`;

i$4`
  .heading-small-5-text {
    display: ${FdsTypographyHeadingSmallHeading5Display};
    font-family: ${FdsTypographyHeadingSmallHeading5FontFamily};
    font-size: ${FdsTypographyHeadingSmallHeading5FontSize};
    font-weight: ${FdsTypographyHeadingSmallHeading5FontWeight};
    letter-spacing: ${FdsTypographyHeadingSmallHeading5LetterSpacing};
    line-height: ${FdsTypographyHeadingSmallHeading5LineHeight};
  }
`;

i$4`
  .heading-small-6-text {
    display: ${FdsTypographyHeadingSmallHeading6Display};
    font-family: ${FdsTypographyHeadingSmallHeading6FontFamily};
    font-size: ${FdsTypographyHeadingSmallHeading6FontSize};
    font-weight: ${FdsTypographyHeadingSmallHeading6FontWeight};
    letter-spacing: ${FdsTypographyHeadingSmallHeading6LetterSpacing};
    line-height: ${FdsTypographyHeadingSmallHeading6LineHeight};
  }
`;

i$4`
  .link-default-text {
    display: ${FdsTypographyLinkDefaultDisplay};
    font-family: ${FdsTypographyLinkDefaultFontFamily};
    font-size: ${FdsTypographyLinkDefaultFontSize};
    font-weight: ${FdsTypographyLinkDefaultFontWeight};
    letter-spacing: ${FdsTypographyLinkDefaultLetterSpacing};
    line-height: ${FdsTypographyLinkDefaultLineHeight};
    text-decoration: ${FdsTypographyLinkDefaultTextDecoration};
  }
`;

i$4`
  .link-large-text {
    display: ${FdsTypographyLinkLargeDisplay};
    font-family: ${FdsTypographyLinkLargeFontFamily};
    font-size: ${FdsTypographyLinkLargeFontSize};
    font-weight: ${FdsTypographyLinkLargeFontWeight};
    letter-spacing: ${FdsTypographyLinkLargeLetterSpacing};
    line-height: ${FdsTypographyLinkLargeLineHeight};
    text-decoration: ${FdsTypographyLinkLargeTextDecoration};
  }
`;

i$4`
  .link-micro-text {
    display: ${FdsTypographyLinkMicroDisplay};
    font-family: ${FdsTypographyLinkMicroFontFamily};
    font-size: ${FdsTypographyLinkMicroFontSize};
    font-weight: ${FdsTypographyLinkMicroFontWeight};
    letter-spacing: ${FdsTypographyLinkMicroLetterSpacing};
    line-height: ${FdsTypographyLinkMicroLineHeight};
    text-decoration: ${FdsTypographyLinkMicroTextDecoration};
  }
`;

i$4`
  .link-small-text {
    display: ${FdsTypographyLinkSmallDisplay};
    font-family: ${FdsTypographyLinkSmallFontFamily};
    font-size: ${FdsTypographyLinkSmallFontSize};
    font-weight: ${FdsTypographyLinkSmallFontWeight};
    letter-spacing: ${FdsTypographyLinkSmallLetterSpacing};
    line-height: ${FdsTypographyLinkSmallLineHeight};
    text-decoration: ${FdsTypographyLinkSmallTextDecoration};
  }
`;

i$4`
  .ui-helper-text {
    display: ${FdsTypographyUiHelperDisplay};
    font-family: ${FdsTypographyUiHelperFontFamily};
    font-size: ${FdsTypographyUiHelperFontSize};
    font-weight: ${FdsTypographyUiHelperFontWeight};
    letter-spacing: ${FdsTypographyUiHelperLetterSpacing};
    line-height: ${FdsTypographyUiHelperLineHeight};
  }
`;

i$4`
  .ui-id-text {
    display: ${FdsTypographyUiIdDisplay};
    font-family: ${FdsTypographyUiIdFontFamily};
    font-size: ${FdsTypographyUiIdFontSize};
    font-weight: ${FdsTypographyUiIdFontWeight};
    letter-spacing: ${FdsTypographyUiIdLetterSpacing};
    line-height: ${FdsTypographyUiIdLineHeight};
  }
`;

const uiLabelTextClass = i$4`
  .ui-label-text {
    display: ${FdsTypographyUiLabelDisplay};
    font-family: ${FdsTypographyUiLabelFontFamily};
    font-size: ${FdsTypographyUiLabelFontSize};
    font-weight: ${FdsTypographyUiLabelFontWeight};
    letter-spacing: ${FdsTypographyUiLabelLetterSpacing};
    line-height: ${FdsTypographyUiLabelLineHeight};
  }
`;

i$4`
  .ui-placeholder-text {
    display: ${FdsTypographyUiPlaceholderDisplay};
    font-family: ${FdsTypographyUiPlaceholderFontFamily};
    font-size: ${FdsTypographyUiPlaceholderFontSize};
    font-weight: ${FdsTypographyUiPlaceholderFontWeight};
    letter-spacing: ${FdsTypographyUiPlaceholderLetterSpacing};
    line-height: ${FdsTypographyUiPlaceholderLineHeight};
  }
`;

i$4`
  .ui-tag-text {
    display: ${FdsTypographyUiTagDisplay};
    font-family: ${FdsTypographyUiTagFontFamily};
    font-size: ${FdsTypographyUiTagFontSize};
    font-weight: ${FdsTypographyUiTagFontWeight};
    letter-spacing: ${FdsTypographyUiTagLetterSpacing};
    line-height: ${FdsTypographyUiTagLineHeight};
  }
`;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$2=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}},e$1=(i,e,n)=>{e.constructor.createProperty(n,i);};function n$1(n){return (t,o)=>void 0!==o?e$1(n,t,o):i$2(n,t)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function t$1(t){return n$1({...t,state:!0})}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l;null!=(null===(l=globalThis.HTMLSlotElement)||void 0===l?void 0:l.prototype.assignedElements)?(o,l)=>o.assignedElements(l):(o,l)=>o.assignedNodes(l).filter((o=>o.nodeType===Node.ELEMENT_NODE));

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e=t=>(...e)=>({_$litDirective$:t,values:e});let i$1 = class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const i="important",n=" !"+i,o=e(class extends i$1{constructor(t$1){var e;if(super(t$1),t$1.type!==t.ATTRIBUTE||"style"!==t$1.name||(null===(e=t$1.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`}),"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ht){this.ht=new Set;for(const t in r)this.ht.add(t);return this.render(r)}this.ht.forEach((t=>{null==r[t]&&(this.ht.delete(t),t.includes("-")?s.removeProperty(t):s[t]="");}));for(const t in r){const e=r[t];if(null!=e){this.ht.add(t);const r="string"==typeof e&&e.endsWith(n);t.includes("-")||r?s.setProperty(t,r?e.slice(0,-11):e,r?i:""):s[t]=e;}}return w}});

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FdsNavigationVariant;
(function (FdsNavigationVariant) {
    FdsNavigationVariant["primary"] = "primary";
    FdsNavigationVariant["secondary"] = "secondary";
})(FdsNavigationVariant || (FdsNavigationVariant = {}));
var FdsNavigationItemPosition;
(function (FdsNavigationItemPosition) {
    FdsNavigationItemPosition["left"] = "left";
    FdsNavigationItemPosition["right"] = "right";
})(FdsNavigationItemPosition || (FdsNavigationItemPosition = {}));
/**
 * Navigation component.
 *
 * @property {FdsNavigationVariant} variant - Primary or secondary style
 * @property {FdsNavigationItem[]} items - List of navigation items
 * @property {FdsNavigationItem} selected - Currently selected value
 * @property {string} verticalMenuNavText - Text for vertical menu navigation button
 * @property {number} verticalMenuThreshold - Width in pixels when navigation is collapsed
 * @event select - Triggered when destination is clicked. The selected item is in event details field.
 */
class FdsNavigation extends s {
    constructor() {
        super(...arguments);
        this.variant = FdsNavigationVariant.primary;
        this.items = [];
        this.verticalMenuNavText = '';
        this.verticalMenuThreshold = 768;
        this._open = false;
    }
    connectedCallback() {
        super.connectedCallback();
        S$1(this.shadowRoot, [
            FdsNavigation.cssVariables,
            uiLabelTextClass,
            FdsNavigation.collapsedNavigationStyles,
            this.desktopStyles(),
        ]);
    }
    render() {
        const itemsOnRight = this.items.filter(item => item.position === FdsNavigationItemPosition.right);
        const itemsOnLeft = this.items.filter(item => item.position !== FdsNavigationItemPosition.right);
        return T ` <div class="navigation-wrapper">
      <div class="navigation navigation--${this.variant} ui-label-text">
        ${this.variant === FdsNavigationVariant.primary
            ? T ` <div class="navigation__header">
              <slot></slot>
            </div>`
            : A}
        <ul class="navigation__body ${this._open ? 'navigation__open' : ''}">
          ${itemsOnLeft
            .map(item => this.renderItem(item))
            .concat(itemsOnRight.map((item, index) => this.renderItem(item, index === 0 ? 'item__first-right' : '')))}
        </ul>
        <div class="navigation__button-wrapper">${this.renderNavigationButton()}</div>
      </div>
    </div>`;
    }
    renderNavigationButton() {
        let icon;
        switch (this.variant) {
            case FdsNavigationVariant.primary:
                icon = this._open
                    ? T `<fds-icon icon="chevron-up"></fds-icon>`
                    : T `<fds-icon icon="chevron-down"></fds-icon>`;
                break;
            case FdsNavigationVariant.secondary:
                icon = T `<fds-icon icon="menu"></fds-icon>`;
                break;
        }
        return T `
      <button
        class="navigation__button navigation__button--${this.variant}"
        type="button"
        @click=${this.handleNavigationClick}
      >
        <span class="navigation__label ui-label-text">${this.verticalMenuNavText}</span>
        ${icon}
      </button>
    `;
    }
    handleNavigationClick() {
        this._open = !this._open;
    }
    renderItem(item, clazz = '') {
        var _a;
        const verticalMenuOrder = (_a = item.verticalMenuOrder) !== null && _a !== void 0 ? _a : 0;
        return T ` <li
      @click=${() => this.handleSelect(item)}
      class="item ${this.selected === item ? 'item--active' : ''} ${clazz}"
      style=${o({ order: verticalMenuOrder })}
    >
      <div class="item__label">
        ${item.icon && T `<fds-icon class="item__icon" .icon="${item.icon}"></fds-icon>`}
        <span>${item.label}</span>
      </div>
    </li>`;
    }
    handleSelect(item) {
        this.selected = item;
        this.dispatchEvent(new CustomEvent('select', {
            detail: item,
        }));
    }
    /**
     * These styles are inside a function instead of being static because they depend on the verticalMenuThreshold property
     * that the end user can change
     */
    desktopStyles() {
        return i$4 `
      @container navigation-wrapper (min-width: ${r$2(this.verticalMenuThreshold)}px) {
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
          border-bottom: var(--element-vertical-padding--primary) solid ${FdsColorBrandWhite};
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
    `;
    }
}
FdsNavigation.cssVariables = i$4 `
    :host {
      --element-vertical-padding--primary: 9px;
      --element-vertical-padding--secondary: 16px;
      --element-horizontal-padding--primary: 20px;
      --item-border-bottom-width--secondary: 3px;
    }
  `;
FdsNavigation.collapsedNavigationStyles = i$4 `
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
      background-color: ${FdsColorBrandBlack};
      color: ${FdsColorBrandWhite};
    }

    .navigation--primary .item:hover {
      color: ${FdsColorText300};
    }

    .navigation--primary .navigation__open .item--active .item__label:after {
      content: '';
      position: relative;
      align-self: center;
      height: 0;
      margin-left: auto;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-right: var(--element-vertical-padding--primary) solid ${FdsColorBrandWhite};
    }

    .navigation--secondary {
      background-color: ${FdsColorBrandWhite};
      border-bottom: 1px solid ${FdsColorBrandBlack};
    }

    .navigation--secondary .item {
      border-bottom: 1px solid ${FdsColorNeutral100};
    }

    .navigation--secondary .item:hover {
      color: ${FdsColorText300};
    }

    .navigation__open {
      height: auto;
      width: 100%;
      visibility: visible;
      opacity: 1;
      overflow-y: visible;
      margin-left: 0;
      margin-top: 0;

      border-top: 1px solid ${FdsColorNeutral100};
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
      background-color: ${FdsColorBrandBlack};
      color: ${FdsColorBrandWhite};
      padding: var(--element-vertical-padding--primary);
    }

    .navigation__button--primary:hover {
      color: ${FdsColorText300};
    }

    .navigation__button--secondary {
      background-color: ${FdsColorBrandWhite};
      color: ${FdsColorBrandBlack};
      padding: var(--element-vertical-padding--secondary);
    }

    .navigation__button--secondary:hover {
      color: ${FdsColorText300};
    }

    .navigation__label {
      margin-right: 10px;
    }
  `;
FdsNavigation.styles = [
    FdsNavigation.cssVariables,
    uiLabelTextClass,
    FdsNavigation.collapsedNavigationStyles,
];
__decorate$1([
    n$1()
], FdsNavigation.prototype, "variant", void 0);
__decorate$1([
    n$1()
], FdsNavigation.prototype, "items", void 0);
__decorate$1([
    n$1()
], FdsNavigation.prototype, "selected", void 0);
__decorate$1([
    n$1({ attribute: 'vertical-menu-nav-text' })
], FdsNavigation.prototype, "verticalMenuNavText", void 0);
__decorate$1([
    n$1({ type: Number, attribute: 'vertical-menu-threshold' })
], FdsNavigation.prototype, "verticalMenuThreshold", void 0);
__decorate$1([
    t$1()
], FdsNavigation.prototype, "_open", void 0);

/**
 * lucide v0.265.0 - ISC
 */

const createElement = (tag, attrs, children = []) => {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.keys(attrs).forEach((name) => {
    element.setAttribute(name, String(attrs[name]));
  });
  if (children.length) {
    children.forEach((child) => {
      const childElement = createElement(...child);
      element.appendChild(childElement);
    });
  }
  return element;
};
var createElement$1 = ([tag, attrs, children]) => createElement(tag, attrs, children);

/**
 * lucide v0.265.0 - ISC
 */

const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};

/**
 * lucide v0.265.0 - ISC
 */


const AlertCircle = [
  "svg",
  defaultAttributes,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "12" }],
    ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16" }]
  ]
];

/**
 * lucide v0.265.0 - ISC
 */


const AlertTriangle = [
  "svg",
  defaultAttributes,
  [
    [
      "path",
      {
        d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
      }
    ],
    ["path", { d: "M12 9v4" }],
    ["path", { d: "M12 17h.01" }]
  ]
];

/**
 * lucide v0.265.0 - ISC
 */


const CheckCircle = [
  "svg",
  defaultAttributes,
  [
    ["path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }],
    ["polyline", { points: "22 4 12 14.01 9 11.01" }]
  ]
];

/**
 * lucide v0.265.0 - ISC
 */


const ChevronDown = [
  "svg",
  defaultAttributes,
  [["path", { d: "m6 9 6 6 6-6" }]]
];

/**
 * lucide v0.265.0 - ISC
 */


const ChevronRight = [
  "svg",
  defaultAttributes,
  [["path", { d: "m9 18 6-6-6-6" }]]
];

/**
 * lucide v0.265.0 - ISC
 */


const ChevronUp = [
  "svg",
  defaultAttributes,
  [["path", { d: "m18 15-6-6-6 6" }]]
];

/**
 * lucide v0.265.0 - ISC
 */


const Menu = [
  "svg",
  defaultAttributes,
  [
    ["line", { x1: "4", x2: "20", y1: "12", y2: "12" }],
    ["line", { x1: "4", x2: "20", y1: "6", y2: "6" }],
    ["line", { x1: "4", x2: "20", y1: "18", y2: "18" }]
  ]
];

/**
 * lucide v0.265.0 - ISC
 */


const Pencil = [
  "svg",
  defaultAttributes,
  [
    ["path", { d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" }],
    ["path", { d: "m15 5 4 4" }]
  ]
];

/**
 * lucide v0.265.0 - ISC
 */


const PlusCircle = [
  "svg",
  defaultAttributes,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M8 12h8" }],
    ["path", { d: "M12 8v8" }]
  ]
];

/**
 * lucide v0.265.0 - ISC
 */


const Plus = [
  "svg",
  defaultAttributes,
  [
    ["path", { d: "M5 12h14" }],
    ["path", { d: "M12 5v14" }]
  ]
];

/**
 * lucide v0.265.0 - ISC
 */


const Settings = [
  "svg",
  defaultAttributes,
  [
    [
      "path",
      {
        d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
      }
    ],
    ["circle", { cx: "12", cy: "12", r: "3" }]
  ]
];

/**
 * lucide v0.265.0 - ISC
 */


const Trash2 = [
  "svg",
  defaultAttributes,
  [
    ["path", { d: "M3 6h18" }],
    ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }],
    ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }],
    ["line", { x1: "10", x2: "10", y1: "11", y2: "17" }],
    ["line", { x1: "14", x2: "14", y1: "11", y2: "17" }]
  ]
];

/**
 * lucide v0.265.0 - ISC
 */


const X = [
  "svg",
  defaultAttributes,
  [
    ["path", { d: "M18 6 6 18" }],
    ["path", { d: "m6 6 12 12" }]
  ]
];

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Only the common icons needed in fds components are here to keep bundle size smaller
 */
const FdsIcons = {
    'alert-circle': AlertCircle,
    'alert-triangle': AlertTriangle,
    'chevron-down': ChevronDown,
    'chevron-right': ChevronRight,
    'chevron-up': ChevronUp,
    menu: Menu,
    pencil: Pencil,
    plus: Plus,
    'plus-circle': PlusCircle,
    'trash-2': Trash2,
    x: X,
    settings: Settings,
    'check-circle': CheckCircle,
};
/**
 * Add interactible icon element. Icon library: https://lucide.dev/
 *
 * @event click - Dispatches a MouseEvent on click.
 *
 * @property {string} icon - Options:
 * - alert-circle
 * - alert-triangle
 * - chevron-down
 * - chevron-right
 * - chevron-up
 * - menu
 * - edit
 * - plus-circle
 * - trash-2
 * - x
 * - settings
 * - check-circle
 * @property {string} size - FdsSizeToken
 */
class FdsIcon extends s {
    constructor() {
        super(...arguments);
        this.size = FdsTokenSize3;
    }
    render() {
        if (!this.icon || !FdsIcons[this.icon]) {
            console.error(`invalid icon: '${this.icon}'`);
            return null;
        }
        const svgElement = createElement$1(FdsIcons[this.icon]);
        svgElement.setAttribute('width', this.size.value);
        svgElement.setAttribute('height', this.size.value);
        return svgElement;
    }
}
FdsIcon.styles = i$4 `
    :host {
      display: inline-flex;
    }
  `;
__decorate([
    n$1()
], FdsIcon.prototype, "size", void 0);
__decorate([
    n$1()
], FdsIcon.prototype, "icon", void 0);

customElements.define('fds-icon', FdsIcon);

customElements.define('fds-navigation', FdsNavigation);

ckan.module('digitraffic_theme_top_navigation', function ($) {
    return {
        initialize: function () {
            const DIGITRAFFIC_SERVICE = { label: "Digitraffic", value: "digitraffic", url: "https://www.digitraffic.fi/" };
            const FT_SERVICES = [
                { label: "Liikennetilanne", value: "liikennetilanne", url: "https://liikennetilanne.fintraffic.fi/" },
                { label: "Palauteväylä", value: "palautevayla", url: "https://www.palautevayla.fi/aspa?lang=fi" },
                { label: "Junalähdöt", value: "junalahdot", url: "https://junalahdot.fintraffic.fi/" },
                { label: "Drone-palvelut", value: "dronepalvelut", url: "https://skynavx.fi/#/drone" },
                DIGITRAFFIC_SERVICE,
                { label: "Digitransit", value: "digitransit", url: "https://digitransit.fi/" },
                { label: "Reittiopas", value: "reittiopas", url: "https://opas.matka.fi/" },
                { label: "NAP", value: "nap", url: "https://finap.fi/#/" }
            ];
            customElements.whenDefined("fds-navigation").then(() => {
                console.log('fds-navigation DEFINED');
                const fdsNavigation = document.createElement("fds-navigation");
                /*const FdsNavigation = customElements.get("fds-navigation")
                const fdsNavigation:FdsNavigation = new FdsNavigation()*/
                fdsNavigation.setAttribute("vertical-menu-threshold", "1150");
                fdsNavigation.innerHTML = `
      <a href="https://www.fintraffic.fi/fi">
              <svg viewBox="0 0 253 42" style="height: 18px">
                  <use href="/assets/fintraffic_horizontal_white.svg#fintraffic_horizontal_white"></use>
              </svg>
          </a>`;
                const handleSelection = (event) => {
                    const item = event.detail;
                    window.open(item.url, "_blank");
                    event.target.selected = DIGITRAFFIC_SERVICE;
                };
                fdsNavigation.variant = FdsNavigationVariant.primary;
                fdsNavigation.items = FT_SERVICES;
                fdsNavigation.selected = DIGITRAFFIC_SERVICE;
                fdsNavigation.verticalMenuNavText = "Services";
                fdsNavigation.addEventListener('select', handleSelection);
                this.el.replaceWith(fdsNavigation);
            });
        }
    };
});

ckan.module('digitraffic_theme_app_navigation', function ($) {
    return {
        initialize: function () {
            customElements.whenDefined("fds-navigation").then(() => {
                console.log('fds-navigation DEFINED');
                console.log(this.el);
                console.log(this.options);
                const fdsNavigation = document.createElement("fds-navigation");
                fdsNavigation.setAttribute("vertical-menu-threshold", "1150");
                fdsNavigation.innerHTML = `
        <span>Datakatalogi</span>
        `;
                const handleSelection = (event) => {
                    const item = event.detail;
                    window.location.href = item.url;
                    /*if (item.value === DIGITRAFFIC_SERVICE.value) {
                      window.location.href = window.location.origin;
                    } else {
                      window.open(item.url, "_blank");
                    }
                    event.target.selected = DIGITRAFFIC_SERVICE;*/
                };
                const DATACATALOG_NAVIGATION = [
                    { label: this.options["datasetLabel"], value: "dataset", url: this.options["datasetUrl"] },
                    { label: this.options["organizationLabel"], value: "organization", url: this.options["organizationUrl"] },
                    { label: this.options["groupLabel"], value: "group", url: this.options["groupUrl"] },
                    { label: this.options["aboutLabel"], value: "about", url: this.options["aboutUrl"] },
                ];
                const currentNavigation = DATACATALOG_NAVIGATION.filter(({ url }) => {
                    return window.location.pathname.includes(url);
                })[0];
                fdsNavigation.variant = FdsNavigationVariant.secondary;
                fdsNavigation.items = DATACATALOG_NAVIGATION;
                fdsNavigation.selected = currentNavigation;
                fdsNavigation.verticalMenuNavText = "Nav";
                fdsNavigation.addEventListener('select', handleSelection);
                this.el.replaceWith(fdsNavigation);
            });
        }
    };
});
