// ==UserScript==
// @name         VRV Subtitler
// @namespace    http://tampermonkey.net/
// @version      0.1.9
// @description  Display SRT format subtitles on VRV
// @author       sheodox
// @match        https://static.vrv.co/vilos/player.html
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

!function(t){var e={};function n(s){if(e[s])return e[s].exports;var r=e[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(s,r,function(e){return t[e]}.bind(null,r));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e){t.exports=class{constructor(t){this.format=t,this.subs=[]}getSubs(t){return this.subs.filter(e=>e.start<=t&&e.end>=t)}timeToMs(t){const[e,n,s]=t.split(":");return 36e5*+e+6e4*+n+1e3*parseFloat(s)}firstSubtitle(){return this.subs.reduce((t,e)=>e.start<t.start?e:t,{start:1/0})}}},function(t,e,n){const s=n(0);t.exports=class extends s{constructor(t){super("ass"),t=t.replace(/\r/g,"");try{this.blocks=this.parseBlocks(t),this.subs=this.parseBlock(this.blocks.subs),this.parseSubTimings(),this.parseStyles(this.parseBlock(this.blocks.styles)),this.parseSubOverrideTags()}catch(t){console.error("ASS PARSE ERROR",t),this.subs=[]}}parseBlocks(t){const e=t.split(/\n(?=\[)/),n=t=>e.find(e=>{e=e.trim();const[n,s]=e.match(/^\[(.*?)]/);return s===t}).replace(/.*\n/,"").trim();return{info:n("Script Info"),styles:n("V4+ Styles"),subs:n("Events")}}parseBlock(t){const[e,...n]=t.split("\n"),s=(t,e=1/0)=>{let[n,s,r]=t.match(/(\w*): (.*)/);return r=r.split(","),r.length>e&&(r[e-1]=r.slice(e-1).join(","),r.splice(e,1/0)),{type:s,attributes:r}},r=s(e);return n.reduce((t,e)=>{if(!e||";"===e.charAt(0)||0===e.indexOf("Comment: "))return t;const n=s(e,r.attributes.length),o={dataType:n.type.toLowerCase()};return r.attributes.forEach((t,e)=>{const s=(t=t.trim()).charAt(0).toLowerCase()+t.substring(1);o[s]=n.attributes[e]}),o.style="*Default"===o.style?"Default":o.style,t.push(o),t},[])}parseSubTimings(){this.subs.forEach(t=>{t.start=this.timeToMs(t.start),t.end=this.timeToMs(t.end)})}parseStyles(t){const e=t=>{if(t){const[e,n,s,r,o]=t.match(/&H([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})/i);return`#${o}${r}${s}${"00"===n?"":n}`}},n={};t.forEach(t=>{for(const n of Object.keys(t).filter(t=>/colour/i.test(t)))t[n]=e(t[n]);t.name="*Default"===t.name?"Default":t.name;const s=[],{primaryColour:r,secondaryColour:o,outlineColour:i,backColour:l,borderStyle:c,outline:a,shadow:u,fontname:d,fontsize:f,bold:p,italic:h,underline:m,strikeOut:g}=t;if(r&&s.push(`color: ${r}`),d&&s.push(`font-family: "${d}"`),f&&s.push(`font-size: ${f}pt`),"1"===c){const t=i||l;s.push(`text-shadow: ${t} 2px 2px, ${t} 2px -2px, ${t} -2px 2px, ${t} -2px -2px, ${t} 2px 0, ${t} 0 2px, ${t} -2px 0, ${t} 0 -2px, ${t} 2px 2px, ${u}px ${u}px ${t}`)}else"3"===c&&s.push(`background-color: ${l}`);"-1"===p&&s.push("font-weight: bold"),"-1"===h&&s.push("font-style: italic"),"-1"!==m&&"-1"!==g||s.push(`text-decoration: ${"-1"===m?"underline":""} ${"-1"===g?"line-through":""}`),n[t.name]={inline:s.join(";"),raw:t}}),this.styles=n}parseSubOverrideTags(){}}},function(t,e,n){"use strict";function s(){}n.r(e);const r=t=>t;function o(t){return t()}function i(){return Object.create(null)}function l(t){t.forEach(o)}function c(t){return"function"==typeof t}function a(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}const u="undefined"!=typeof window;let d=u?()=>window.performance.now():()=>Date.now(),f=u?t=>requestAnimationFrame(t):s;const p=new Set;function h(t){p.forEach(e=>{e.c(t)||(p.delete(e),e.f())}),0!==p.size&&f(h)}function m(t){let e;return 0===p.size&&f(h),{promise:new Promise(n=>{p.add(e={c:t,f:n})}),abort(){p.delete(e)}}}function g(t,e){t.appendChild(e)}function v(t,e,n){t.insertBefore(e,n||null)}function b(t){t.parentNode.removeChild(t)}function y(t){return document.createElement(t)}function $(t){return document.createTextNode(t)}function x(){return $(" ")}function w(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function k(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function S(t,e){e=""+e,t.data!==e&&(t.data=e)}function C(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}let _,E,j=0,M={};function O(t,e,n,s,r,o,i,l=0){const c=16.666/s;let a="{\n";for(let t=0;t<=1;t+=c){const s=e+(n-e)*o(t);a+=100*t+`%{${i(s,1-s)}}\n`}const u=a+`100% {${i(n,1-n)}}\n}`,d=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(u)}_${l}`;if(!M[d]){if(!_){const t=y("style");document.head.appendChild(t),_=t.sheet}M[d]=!0,_.insertRule(`@keyframes ${d} ${u}`,_.cssRules.length)}const f=t.style.animation||"";return t.style.animation=`${f?`${f}, `:""}${d} ${s}ms linear ${r}ms 1 both`,j+=1,d}function P(t,e){t.style.animation=(t.style.animation||"").split(", ").filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")).join(", "),e&&!--j&&f(()=>{if(j)return;let t=_.cssRules.length;for(;t--;)_.deleteRule(t);M={}})}function T(t){E=t}function A(){if(!E)throw new Error("Function called outside component initialization");return E}function R(){const t=A();return(e,n)=>{const s=t.$$.callbacks[e];if(s){const r=C(e,n);s.slice().forEach(e=>{e.call(t,r)})}}}const q=[],F=[],I=[],z=[],B=Promise.resolve();let V=!1;function L(){V||(V=!0,B.then(U))}function N(t){I.push(t)}let D=!1;const H=new Set;function U(){if(!D){D=!0;do{for(let t=0;t<q.length;t+=1){const e=q[t];T(e),G(e.$$)}for(q.length=0;F.length;)F.pop()();for(let t=0;t<I.length;t+=1){const e=I[t];H.has(e)||(H.add(e),e())}I.length=0}while(q.length);for(;z.length;)z.pop()();V=!1,D=!1,H.clear()}}function G(t){if(null!==t.fragment){t.update(),l(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(N)}}let J;function Y(){return J||(J=Promise.resolve(),J.then(()=>{J=null})),J}function Z(t,e,n){t.dispatchEvent(C(`${e?"intro":"outro"}${n}`))}const K=new Set;let Q;function W(){Q={r:0,c:[],p:Q}}function X(){Q.r||l(Q.c),Q=Q.p}function tt(t,e){t&&t.i&&(K.delete(t),t.i(e))}function et(t,e,n,s){if(t&&t.o){if(K.has(t))return;K.add(t),Q.c.push(()=>{K.delete(t),s&&(n&&t.d(1),s())}),t.o(e)}}const nt={duration:0};const st="undefined"!=typeof window?window:global;function rt(t,e){et(t,1,1,()=>{e.delete(t.key)})}new Set(["allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","hidden","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"]);let ot;function it(t){t&&t.c()}function lt(t,e,n){const{fragment:s,on_mount:r,on_destroy:i,after_update:a}=t.$$;s&&s.m(e,n),N(()=>{const e=r.map(o).filter(c);i?i.push(...e):l(e),t.$$.on_mount=[]}),a.forEach(N)}function ct(t,e){const n=t.$$;null!==n.fragment&&(l(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function at(t,e,n,r,o,c,a=[-1]){const u=E;T(t);const d=e.props||{},f=t.$$={fragment:null,ctx:null,props:c,update:s,not_equal:o,bound:i(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:i(),dirty:a};let p=!1;var h;f.ctx=n?n(t,d,(e,n,...s)=>{const r=s.length?s[0]:n;return f.ctx&&o(f.ctx[e],f.ctx[e]=r)&&(f.bound[e]&&f.bound[e](r),p&&function(t,e){-1===t.$$.dirty[0]&&(q.push(t),L(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}(t,e)),n}):[],f.update(),p=!0,l(f.before_update),f.fragment=!!r&&r(f.ctx),e.target&&(e.hydrate?f.fragment&&f.fragment.l((h=e.target,Array.from(h.childNodes))):f.fragment&&f.fragment.c(),e.intro&&tt(t.$$.fragment),lt(t,e.target,e.anchor),U()),T(u)}"function"==typeof HTMLElement&&(ot=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){for(const t in this.$$.slotted)this.appendChild(this.$$.slotted[t])}attributeChangedCallback(t,e,n){this[t]=n}$destroy(){ct(this,1),this.$destroy=s}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}});class ut{$destroy(){ct(this,1),this.$destroy=s}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}function dt(t){const e=t-1;return e*e*e+1}function ft(t,{delay:e=0,duration:n=400,easing:s=dt,x:r=0,y:o=0,opacity:i=0}){const l=getComputedStyle(t),c=+l.opacity,a="none"===l.transform?"":l.transform,u=c*(1-i);return{delay:e,duration:n,easing:s,css:(t,e)=>`\n\t\t\ttransform: ${a} translate(${(1-t)*r}px, ${(1-t)*o}px);\n\t\t\topacity: ${c-u*e}`}}function pt(t,e,n){const s=t.slice();return s[12]=e[n],s}function ht(t){let e,n,s,r,o,i,c,a,u,d,f,p,h,m,$,S,C,_,E;return{c(){e=y("div"),n=y("h2"),n.textContent="Settings",s=x(),r=y("button"),r.textContent="Reselect subtitles",o=x(),i=y("button"),i.textContent="Realign subtitles",c=x(),a=y("br"),u=x(),d=y("input"),f=x(),p=y("label"),p.textContent="Show subs over video",h=x(),m=y("br"),$=x(),S=y("input"),C=x(),_=y("label"),_.textContent="Pause when tray is open",k(n,"class","svelte-pvtdrn"),k(r,"class","svelte-pvtdrn"),k(i,"class","svelte-pvtdrn"),k(d,"id","show-subs"),k(d,"type","checkbox"),d.checked=!0,k(p,"for","show-subs"),k(S,"id","pause-on-tray"),k(S,"type","checkbox"),k(_,"for","pause-on-tray"),k(e,"class","settings svelte-pvtdrn")},m(l,b){v(l,e,b),g(e,n),g(e,s),g(e,r),g(e,o),g(e,i),g(e,c),g(e,a),g(e,u),g(e,d),g(e,f),g(e,p),g(e,h),g(e,m),g(e,$),g(e,S),S.checked=t[2],g(e,C),g(e,_),E=[w(r,"click",t[8]),w(i,"click",t[9]),w(d,"change",t[5]("show-subs")),w(S,"change",t[10])]},p(t,e){4&e&&(S.checked=t[2])},d(t){t&&b(e),l(E)}}}function mt(t,e){let n,o,i,a,u,f,p,h,C,_=e[12].text+"";return{key:t,first:null,c(){n=y("li"),o=y("a"),i=$(_),u=x(),k(o,"target","_blank"),k(o,"href",a=`https://jisho.org/search/${encodeURIComponent(e[12].text.trim())}`),k(o,"rel","noopener noreferrer"),k(o,"class","svelte-pvtdrn"),k(n,"class","svelte-pvtdrn"),this.first=n},m(t,s){v(t,n,s),g(n,o),g(o,i),g(n,u),h=!0,C=w(o,"click",e[11])},p(t,e){(!h||1&e)&&_!==(_=t[12].text+"")&&S(i,_),(!h||1&e&&a!==(a=`https://jisho.org/search/${encodeURIComponent(t[12].text.trim())}`))&&k(o,"href",a)},i(t){h||(N(()=>{p&&p.end(1),f||(f=function(t,e,n){let o,i,l=e(t,n),a=!1,u=0;function f(){o&&P(t,o)}function p(){const{delay:e=0,duration:n=300,easing:c=r,tick:p=s,css:h}=l||nt;h&&(o=O(t,0,1,n,e,c,h,u++)),p(0,1);const g=d()+e,v=g+n;i&&i.abort(),a=!0,N(()=>Z(t,!0,"start")),i=m(e=>{if(a){if(e>=v)return p(1,0),Z(t,!0,"end"),f(),a=!1;if(e>=g){const t=c((e-g)/n);p(t,1-t)}}return a})}let h=!1;return{start(){h||(P(t),c(l)?(l=l(),Y().then(p)):p())},invalidate(){h=!1},end(){a&&(f(),a=!1)}}}(n,ft,{y:50,duration:200})),f.start()}),h=!0)},o(t){f&&f.invalidate(),p=function(t,e,n){let o,i=e(t,n),a=!0;const u=Q;function f(){const{delay:e=0,duration:n=300,easing:c=r,tick:f=s,css:p}=i||nt;p&&(o=O(t,1,0,n,e,c,p));const h=d()+e,g=h+n;N(()=>Z(t,!1,"start")),m(e=>{if(a){if(e>=g)return f(0,1),Z(t,!1,"end"),--u.r||l(u.c),!1;if(e>=h){const t=c((e-h)/n);f(1-t,t)}}return a})}return u.r+=1,c(i)?Y().then(()=>{i=i(),f()}):f(),{end(e){e&&i.tick&&i.tick(1,0),a&&(o&&P(t,o),a=!1)}}}(n,ft,{y:-50,duration:200}),h=!1},d(t){t&&b(n),t&&p&&p.end(),C()}}}function gt(t){let e,n,s,r,o,i,c,a,u,d,f,p,h,m=t[1]?"Hide":"Show",C=[],_=new Map,E=t[1]&&ht(t),j=t[0];const M=t=>t[12].text;for(let e=0;e<j.length;e+=1){let n=pt(t,j,e),s=M(n);_.set(s,C[e]=mt(s,n))}return{c(){e=y("div"),n=y("h1"),n.textContent="VRV Subtitler",s=x(),r=y("button"),o=$(m),i=$(" Settings"),c=x(),E&&E.c(),a=x(),u=y("h2"),u.textContent="Recent Subtitles",d=x(),f=y("ul");for(let t=0;t<C.length;t+=1)C[t].c();k(n,"class","svelte-pvtdrn"),k(r,"class","svelte-pvtdrn"),k(u,"class","svelte-pvtdrn"),k(f,"class","recent-subs svelte-pvtdrn"),k(e,"class","tray svelte-pvtdrn")},m(l,m){v(l,e,m),g(e,n),g(e,s),g(e,r),g(r,o),g(r,i),g(e,c),E&&E.m(e,null),g(e,a),g(e,u),g(e,d),g(e,f);for(let t=0;t<C.length;t+=1)C[t].m(f,null);p=!0,h=[w(r,"click",t[7]),w(e,"mouseenter",t[4](!0)),w(e,"mouseleave",t[4](!1))]},p(t,[n]){if((!p||2&n)&&m!==(m=t[1]?"Hide":"Show")&&S(o,m),t[1]?E?E.p(t,n):(E=ht(t),E.c(),E.m(e,a)):E&&(E.d(1),E=null),9&n){const e=t[0];W(),C=function(t,e,n,s,r,o,i,l,c,a,u,d){let f=t.length,p=o.length,h=f;const m={};for(;h--;)m[t[h].key]=h;const g=[],v=new Map,b=new Map;for(h=p;h--;){const t=d(r,o,h),l=n(t);let c=i.get(l);c?s&&c.p(t,e):(c=a(l,t),c.c()),v.set(l,g[h]=c),l in m&&b.set(l,Math.abs(h-m[l]))}const y=new Set,$=new Set;function x(t){tt(t,1),t.m(l,u),i.set(t.key,t),u=t.first,p--}for(;f&&p;){const e=g[p-1],n=t[f-1],s=e.key,r=n.key;e===n?(u=e.first,f--,p--):v.has(r)?!i.has(s)||y.has(s)?x(e):$.has(r)?f--:b.get(s)>b.get(r)?($.add(s),x(e)):(y.add(r),f--):(c(n,i),f--)}for(;f--;){const e=t[f];v.has(e.key)||c(e,i)}for(;p;)x(g[p-1]);return g}(C,n,M,1,t,e,_,f,rt,mt,null,pt),X()}},i(t){if(!p){for(let t=0;t<j.length;t+=1)tt(C[t]);p=!0}},o(t){for(let t=0;t<C.length;t+=1)et(C[t]);p=!1},d(t){t&&b(e),E&&E.d();for(let t=0;t<C.length;t+=1)C[t].d();l(h)}}}function vt(t,e,n){const s=R();let{recentSubs:r=[]}=e,o=!1,i=!0;return t.$set=t=>{"recentSubs"in t&&n(0,r=t.recentSubs)},[r,o,i,s,function(t){return()=>{t&&!i||s("tray-pauser",t)}},function(t){return e=>{s(t,e.target.checked)}},!0,()=>n(1,o=!o),()=>s("restart"),()=>s("realign"),function(){i=this.checked,n(2,i)},()=>s("define-pauser")]}var bt=class extends ut{constructor(t){var e;super(),document.getElementById("svelte-pvtdrn-style")||((e=y("style")).id="svelte-pvtdrn-style",e.textContent=".tray.svelte-pvtdrn.svelte-pvtdrn{margin-top:0.5rem;width:2vw;background:rgba(255, 255, 255, 0.2);position:fixed;right:0;top:0;color:white;height:calc(100% - 5rem)}.tray.svelte-pvtdrn>.svelte-pvtdrn{visibility:hidden}.tray.svelte-pvtdrn.svelte-pvtdrn:hover{width:40vw;max-width:40rem;background:rgb(33, 39, 55);overflow:auto;border-radius:3px}.tray.svelte-pvtdrn:hover>.svelte-pvtdrn{visibility:visible}.tray.svelte-pvtdrn h1.svelte-pvtdrn{font-size:2rem;background:rgb(27, 26, 38);padding:0.5rem 0;border-radius:3px;margin:0 0 0.5rem 0;border-bottom:2px solid #f47521}.tray.svelte-pvtdrn h2.svelte-pvtdrn{margin:0;text-decoration:underline}button.svelte-pvtdrn.svelte-pvtdrn{margin:0.5rem}.settings.svelte-pvtdrn.svelte-pvtdrn{background:#1a1d2b;margin:1rem;padding:1rem;box-shadow:inset 0 0 0.5rem black;border-radius:3px}ul.svelte-pvtdrn.svelte-pvtdrn{list-style:none}a.svelte-pvtdrn.svelte-pvtdrn{color:white;transform:scaleY(0);transform-origin:top;transition:transform 0.5s ease;font-size:1rem;text-decoration:none}a.svelte-pvtdrn.svelte-pvtdrn:hover{color:#0aff8c;cursor:pointer;text-decoration:underline}li.svelte-pvtdrn.svelte-pvtdrn:not(:first-of-type)::before{content:' ';position:relative;background:#f47521;height:0.1rem;width:3.2rem;display:block;margin:0 auto;border-radius:4px}",g(document.head,e)),at(this,t,vt,gt,a,{recentSubs:0})}};function yt(t,e,n){const s=t.slice();return s[8]=e[n],s}function $t(t){let e,n=t[0],s=[];for(let e=0;e<n.length;e+=1)s[e]=xt(yt(t,n,e));return{c(){for(let t=0;t<s.length;t+=1)s[t].c();e=$("")},m(t,n){for(let e=0;e<s.length;e+=1)s[e].m(t,n);v(t,e,n)},p(t,r){if(13&r){let o;for(n=t[0],o=0;o<n.length;o+=1){const i=yt(t,n,o);s[o]?s[o].p(i,r):(s[o]=xt(i),s[o].c(),s[o].m(e.parentNode,e))}for(;o<s.length;o+=1)s[o].d(1);s.length=n.length}},d(t){!function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(s,t),t&&b(e)}}}function xt(t){let e,n,s,r,o=t[8].text+"";function i(...e){return t[7](t[8],...e)}return{c(){e=y("p"),n=$(o),k(e,"style",s=t[3](t[8])),k(e,"title","click to search this phrase on Jisho.org"),k(e,"class","svelte-g7jecb")},m(t,s){v(t,e,s),g(e,n),r=w(e,"click",i)},p(r,i){t=r,1&i&&o!==(o=t[8].text+"")&&S(n,o),1&i&&s!==(s=t[3](t[8]))&&k(e,"style",s)},d(t){t&&b(e),r()}}}function wt(t){let e,n=t[1]&&$t(t);return{c(){e=y("div"),n&&n.c(),k(e,"class","subtitles")},m(t,s){v(t,e,s),n&&n.m(e,null)},p(t,[s]){t[1]?n?n.p(t,s):(n=$t(t),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},i:s,o:s,d(t){t&&b(e),n&&n.d()}}}function kt(t,e,n){let{current:s=[]}=e,{styles:r={}}=e,{format:o=""}=e,{visible:i=!0}=e;const l=R();function c(t){l("define-pauser"),window.open(`https://jisho.org/search/${encodeURIComponent(t.trim())}`)}return t.$set=t=>{"current"in t&&n(0,s=t.current),"styles"in t&&n(4,r=t.styles),"format"in t&&n(5,o=t.format),"visible"in t&&n(1,i=t.visible)},[s,i,c,function(t){return"srt"===o?`font-size: ${1.5+1.5*(t.line?t.line:1)}rem; -webkit-text-stroke: 2px black;text-shadow: 3px 3px black;font-weight: bold`:"ass"===o&&t.style in r?r[t.style].inline:void 0},r,o,l,t=>c(t.text)]}var St=class extends ut{constructor(t){var e;super(),document.getElementById("svelte-g7jecb-style")||((e=y("style")).id="svelte-g7jecb-style",e.textContent="p.svelte-g7jecb{cursor:pointer;color:white;margin:0;padding:0}p.svelte-g7jecb:hover{color:#0aff8c !important}",g(document.head,e)),at(this,t,kt,wt,a,{current:0,styles:4,format:5,visible:1})}};class Ct{constructor(){this.video=null,this.reasons=[]}setVideo(t){this.reasons=[],this.video=t}addPauser(t){this.reasons.push(t),this._checkPause()}removePauser(t){const e=this.reasons.indexOf(t);-1!==e&&(this.reasons.splice(e,1),this._checkPause())}_checkPause(){this.reasons.length?this.video.pause():this.video.play()}}var _t=n(1),Et=n.n(_t),jt=n(0),Mt=n.n(jt);class Ot extends Mt.a{constructor(t){super("srt");const e=t.split("\n\n");this.subs=e.reduce((t,e)=>{let n=e.trim().split("\n");function s(){n.shift()}try{/^\d*$/.test(n[0])&&s();let[e,r]=n[0].replace(/,/g,".").match(/^([\d:\.\-> ]*)/)[0].split(/\-\->/),o=n[0].match(/([a-zA-Z].*)/);o=o&&o.length?o[1]:"";const i=(t=>{const e=o.match(new RegExp(`${t}:([\\d\\.]*)%`));if(e)return parseInt(e[1],10)/100})("line")||1;s(),t.push({start:this.timeToMs(e),end:this.timeToMs(r),text:n.join("\n").replace(/<\/?c.Japanese>/g,""),line:i})}catch(t){}return t},[])}}function Pt(t){let e,n,r,o;return{c(){e=y("label"),e.textContent="Select a subtitle file to begin",n=x(),r=y("input"),k(e,"for","srt-upload"),k(e,"class","svelte-7fhqwx"),k(r,"type","file"),k(r,"id","srt-upload"),k(r,"accept",".srt,.ass,.ssa"),k(r,"class","svelte-7fhqwx")},m(s,i){v(s,e,i),v(s,n,i),v(s,r,i),o=w(r,"change",t[0])},p:s,i:s,o:s,d(t){t&&b(e),t&&b(n),t&&b(r),o()}}}function Tt(t){const e=R();return[function(t){const n=t.target.files[0],s=new FileReader;s.onload=t=>{const s={ass:Et.a,ssa:Et.a,srt:Ot},[r,o]=n.name.match(/\.(\w{3})$/);e("subtitles-loaded",new s[o](t.target.result))},s.readAsText(n)}]}var At=class extends ut{constructor(t){var e;super(),document.getElementById("svelte-7fhqwx-style")||((e=y("style")).id="svelte-7fhqwx-style",e.textContent="label.svelte-7fhqwx{background:#fd0;border:none;cursor:pointer;padding:10px;line-height:1;font-weight:bold;color:black;text-transform:uppercase;display:inline-block;margin:2rem}label.svelte-7fhqwx:hover{background:#ffea6d}input.svelte-7fhqwx{display:none}",g(document.head,e)),at(this,t,Tt,Pt,a,{})}};const{document:Rt}=st;function qt(t){let e,n;const s=new St({props:{format:t[3].format,styles:t[3].styles,current:t[2],currentTime:t[6],visible:t[5]}});s.$on("define-pauser",t[12]);const r=new bt({props:{recentSubs:t[4]}});return r.$on("restart",t[7]),r.$on("tray-pauser",t[11]),r.$on("define-pauser",t[12]),r.$on("realign",t[20]),r.$on("show-subs",t[21]),{c(){it(s.$$.fragment),e=x(),it(r.$$.fragment)},m(t,o){lt(s,t,o),v(t,e,o),lt(r,t,o),n=!0},p(t,e){const n={};8&e&&(n.format=t[3].format),8&e&&(n.styles=t[3].styles),4&e&&(n.current=t[2]),32&e&&(n.visible=t[5]),s.$set(n);const o={};16&e&&(o.recentSubs=t[4]),r.$set(o)},i(t){n||(tt(s.$$.fragment,t),tt(r.$$.fragment,t),n=!0)},o(t){et(s.$$.fragment,t),et(r.$$.fragment,t),n=!1},d(t){ct(s,t),t&&b(e),ct(r,t)}}}function Ft(t){let e,n,r,o,i,c,a,u,d,f,p,h=t[3].firstSubtitle().text+"",m="number"==typeof t[1]&&zt(t);return{c(){e=y("div"),n=y("button"),r=$("Click when the first line is said:\n\t\t\t\t"),o=y("br"),i=x(),c=y("pre"),a=$(h),u=x(),m&&m.c(),d=x(),f=y("button"),f.textContent="No alignment adjustment.",k(n,"class","svelte-gi9goe"),k(f,"class","svelte-gi9goe"),k(e,"class","alignment-buttons svelte-gi9goe")},m(s,l){v(s,e,l),g(e,n),g(n,r),g(n,o),g(n,i),g(n,c),g(c,a),g(e,u),m&&m.m(e,null),g(e,d),g(e,f),p=[w(n,"click",t[8]),w(f,"click",t[19])]},p(t,n){8&n&&h!==(h=t[3].firstSubtitle().text+"")&&S(a,h),"number"==typeof t[1]?m?m.p(t,n):(m=zt(t),m.c(),m.m(e,d)):m&&(m.d(1),m=null)},i:s,o:s,d(t){t&&b(e),m&&m.d(),l(p)}}}function It(t){let e;const n=new At({});return n.$on("subtitles-loaded",t[10]),{c(){it(n.$$.fragment)},m(t,s){lt(n,t,s),e=!0},p:s,i(t){e||(tt(n.$$.fragment,t),e=!0)},o(t){et(n.$$.fragment,t),e=!1},d(t){ct(n,t)}}}function zt(t){let e,n,s,r,o,i=(t[1]/1e3).toFixed(1)+"";return{c(){e=y("button"),n=$("Use the last alignment (first line at "),s=$(i),r=$(" seconds)."),k(e,"class","svelte-gi9goe")},m(i,l){v(i,e,l),g(e,n),g(e,s),g(e,r),o=w(e,"click",t[9])},p(t,e){2&e&&i!==(i=(t[1]/1e3).toFixed(1)+"")&&S(s,i)},d(t){t&&b(e),o()}}}function Bt(t){let e,n,s,r;const o=[It,Ft,qt],i=[];function l(t,e){return"prompt"===t[0]?0:"align"===t[0]?1:"play"===t[0]?2:-1}return~(n=l(t))&&(s=i[n]=o[n](t)),{c(){e=y("div"),s&&s.c(),k(e,"class","subtitles-app svelte-gi9goe")},m(t,s){v(t,e,s),~n&&i[n].m(e,null),r=!0},p(t,[r]){let c=n;n=l(t),n===c?~n&&i[n].p(t,r):(s&&(W(),et(i[c],1,1,()=>{i[c]=null}),X()),~n?(s=i[n],s||(s=i[n]=o[n](t),s.c()),tt(s,1),s.m(e,null)):s=null)},i(t){r||(tt(s),r=!0)},o(t){et(s),r=!1},d(t){t&&b(e),~n&&i[n].d()}}}function Vt(t,e,n){const s="last-used-alignment",r=new Ct;let o="prompt",i=GM_getValue(s),l=[],c=null,a=null,u=-1,d=[],f=!0;function p(){n(0,o="prompt"),n(3,c=null),n(2,l=[])}var h;function m(t){a=document.querySelector("video"),r.setVideo(a),u="number"==typeof t?t:1e3*a.currentTime-c.firstSubtitle().start-400,GM_setValue(s,u),n(4,d=[]),n(0,o="play"),v()}function g(t){let e=t[t.length-1],s=d[d.length-1];!e||s&&e.text===s.text||n(4,d=[...d,e]),d.length>10&&n(4,d=d.slice(d.length-10))}function v(){"play"===o&&(n(2,l=c.getSubs(1e3*a.currentTime-u)),g(l),requestAnimationFrame(v))}h=()=>{document.addEventListener("visibilitychange",()=>{document.hidden||r.removePauser("define")});let t="";setInterval(()=>{const e=document.querySelector("video").getAttribute("src");e&&e!==t&&(t=e,p())},50)},A().$$.on_mount.push(h);return[o,i,l,c,d,f,"",p,m,function(){m(i)},function(t){n(3,c=t.detail),0===c.subs.length?(console.log("subtitles object failed to parse: ",c),alert(`No subtitles were parsed from the selected .${c.format} file, verify nothing is wrong with the file. If it appears normal please submit a bug report with the episode and the subtitles file you used to the issue tracker!`)):(n(1,i=GM_getValue(s)),n(0,o="align"))},function(t){t.detail?r.addPauser("tray"):r.removePauser("tray")},function(){r.addPauser("define")},a,u,s,r,g,v,()=>m(0),()=>n(0,o="align"),t=>n(5,f=t.detail)]}var Lt=class extends ut{constructor(t){var e;super(),Rt.getElementById("svelte-gi9goe-style")||((e=y("style")).id="svelte-gi9goe-style",e.textContent=".subtitles-app.svelte-gi9goe.svelte-gi9goe{position:relative}.subtitles-app.svelte-gi9goe.svelte-gi9goe>*{z-index:1000000000}.subtitles-app.svelte-gi9goe.svelte-gi9goe button{background:#fd0;border:none;cursor:pointer;padding:10px;line-height:1;font-weight:bold;color:black;text-transform:uppercase}.subtitles-app.svelte-gi9goe.svelte-gi9goe button:hover{background:#ffea6d}.alignment-buttons.svelte-gi9goe.svelte-gi9goe{display:flex;flex-direction:column}.alignment-buttons.svelte-gi9goe button.svelte-gi9goe{margin:0.5rem;align-self:center}",g(Rt.head,e)),at(this,t,Vt,Bt,a,{})}};const Nt=document.createElement("div");document.body.appendChild(Nt),Nt.id="sheodox-vrv-subtitler",Nt.style.height="100%",Nt.style.width="100%";new Lt({target:Nt})}]);
