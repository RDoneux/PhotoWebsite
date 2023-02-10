(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[893],{8893:(X,N,f)=>{"use strict";f.r(N),f.d(N,{AdminLoginModule:()=>W});var s=f(6895),I=f(6773),B=f(3172),p=f(8256),E=f(529),w=f(2043),m=f(8897),o=f(109),R=f(1195),v=f(7674),U=f(6054);function b(Y,S){if(1&Y&&(p.TgZ(0,"span"),p._uU(1),p.qZA()),2&Y){const D=p.oxw();p.xp6(1),p.Oqu(D.feedbackMessage)}}function h(Y,S){1&Y&&p._UZ(0,"app-loading-spinner")}class c{constructor(S,D,O){this.httpClient=S,this.router=D,this.authService=O,this.username="",this.password="",this.feedbackMessage="",this.loading=!1}updateUsername(S){this.username=S}updatePassword(S){this.password=S}login(){this.username&&this.password?(this.loading=!0,this.httpClient.get("api/user",{headers:{Authorization:"Basic "+B.lW.from(`${this.username}:${this.password}`,"binary").toString("base64")}}).subscribe({next:S=>{this.authService.updateBearerToken(S.data),this.router.navigate(["/admin-dashboard"])},error:()=>{this.feedbackMessage="Incorrect password or username, please try again.",this.username="",this.password="",this.loading=!1}})):this.feedbackMessage="Please provide a password and username."}static#r=this.\u0275fac=function(D){return new(D||c)(p.Y36(E.eN),p.Y36(I.F0),p.Y36(w.g))};static#n=this.\u0275cmp=p.Xpm({type:c,selectors:[["app-admin-login"]],decls:13,vars:8,consts:[[1,"admin-login__container"],[1,"admin-login__page-title-wrapper"],[1,"admin-login__input-wrapper"],[1,"admin-login__user-text-wrapper"],[3,"label","value","valueChanged"],[3,"label","type","value","valueChanged"],[3,"label","submit"],[1,"admin-login__feedback"],[4,"ngIf"]],template:function(D,O){1&D&&(p.TgZ(0,"div",0)(1,"div",1),p._UZ(2,"app-nav-bar"),p.TgZ(3,"app-page-title"),p._uU(4,"Admin Login"),p.qZA()(),p.TgZ(5,"div",2)(6,"div",3)(7,"app-text-input",4),p.NdJ("valueChanged",function(z){return O.updateUsername(z)}),p.qZA(),p.TgZ(8,"app-text-input",5),p.NdJ("valueChanged",function(z){return O.updatePassword(z)}),p.qZA()(),p.TgZ(9,"app-button",6),p.NdJ("submit",function(){return O.login()}),p.qZA(),p.TgZ(10,"span",7),p.YNc(11,b,2,1,"span",8),p.YNc(12,h,1,0,"app-loading-spinner",8),p.qZA()()()),2&D&&(p.xp6(7),p.Q6J("label","Username")("value",O.username),p.xp6(1),p.Q6J("label","Password")("type","password")("value",O.password),p.xp6(1),p.Q6J("label","Login"),p.xp6(2),p.Q6J("ngIf",!O.loading),p.xp6(1),p.Q6J("ngIf",O.loading))},dependencies:[s.O5,m.T,o.w,R.r,v.t,U.g],styles:[".admin-login__container[_ngcontent-%COMP%]{width:100%;height:100%;display:grid;grid-template-rows:18% 60%}.admin-login__container[_ngcontent-%COMP%]   .admin-login__page-title-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column}.admin-login__container[_ngcontent-%COMP%]   .admin-login__page-title-wrapper[_ngcontent-%COMP%]   app-page-title[_ngcontent-%COMP%]{width:100%}.admin-login__container[_ngcontent-%COMP%]   .admin-login__page-title-wrapper[_ngcontent-%COMP%]   app-nav-bar[_ngcontent-%COMP%]{width:100%}.admin-login__container[_ngcontent-%COMP%]   .admin-login__input-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:space-between;width:80%;height:250px;align-self:center;justify-self:center}.admin-login__container[_ngcontent-%COMP%]   .admin-login__input-wrapper[_ngcontent-%COMP%]   .admin-login__user-text-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:space-evenly;height:150px}.admin-login__container[_ngcontent-%COMP%]   .admin-login__input-wrapper[_ngcontent-%COMP%]   .admin-login__feedback[_ngcontent-%COMP%]{display:flex;min-height:50px;align-items:center;justify-content:center}.admin-login__container[_ngcontent-%COMP%]   .admin-login__input-wrapper[_ngcontent-%COMP%]   .admin-login__feedback[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#df6161;text-align:center}"]})}const y=[{path:"",component:c}];class g{static#r=this.\u0275fac=function(D){return new(D||g)};static#n=this.\u0275mod=p.oAB({type:g});static#t=this.\u0275inj=p.cJS({imports:[I.Bz.forChild(y),I.Bz]})}var _=f(433),F=f(2873),T=f(8411),P=f(1484),M=f(1700),J=f(3522);class W{static#r=this.\u0275fac=function(D){return new(D||W)};static#n=this.\u0275mod=p.oAB({type:W});static#t=this.\u0275inj=p.cJS({imports:[s.ez,_.u5,g,F.p,T.R,M.h,P.N,J.z]})}},5343:(X,N)=>{"use strict";N.byteLength=function m(h){var c=w(h),g=c[1];return 3*(c[0]+g)/4-g},N.toByteArray=function R(h){var c,M,y=w(h),g=y[0],_=y[1],F=new I(function o(h,c,y){return 3*(c+y)/4-y}(0,g,_)),T=0,P=_>0?g-4:g;for(M=0;M<P;M+=4)c=s[h.charCodeAt(M)]<<18|s[h.charCodeAt(M+1)]<<12|s[h.charCodeAt(M+2)]<<6|s[h.charCodeAt(M+3)],F[T++]=c>>16&255,F[T++]=c>>8&255,F[T++]=255&c;return 2===_&&(c=s[h.charCodeAt(M)]<<2|s[h.charCodeAt(M+1)]>>4,F[T++]=255&c),1===_&&(c=s[h.charCodeAt(M)]<<10|s[h.charCodeAt(M+1)]<<4|s[h.charCodeAt(M+2)]>>2,F[T++]=c>>8&255,F[T++]=255&c),F},N.fromByteArray=function b(h){for(var c,y=h.length,g=y%3,_=[],F=16383,T=0,P=y-g;T<P;T+=F)_.push(U(h,T,T+F>P?P:T+F));return 1===g?_.push(f[(c=h[y-1])>>2]+f[c<<4&63]+"=="):2===g&&_.push(f[(c=(h[y-2]<<8)+h[y-1])>>10]+f[c>>4&63]+f[c<<2&63]+"="),_.join("")};for(var f=[],s=[],I=typeof Uint8Array<"u"?Uint8Array:Array,B="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",p=0,E=B.length;p<E;++p)f[p]=B[p],s[B.charCodeAt(p)]=p;function w(h){var c=h.length;if(c%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var y=h.indexOf("=");return-1===y&&(y=c),[y,y===c?0:4-y%4]}function v(h){return f[h>>18&63]+f[h>>12&63]+f[h>>6&63]+f[63&h]}function U(h,c,y){for(var _=[],F=c;F<y;F+=3)_.push(v((h[F]<<16&16711680)+(h[F+1]<<8&65280)+(255&h[F+2])));return _.join("")}s["-".charCodeAt(0)]=62,s["_".charCodeAt(0)]=63},3172:(X,N,f)=>{"use strict";var I=f(5343),B=f(8461),p="function"==typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom"):null;N.lW=o,N.h2=50;var E=2147483647;function m(t){if(t>E)throw new RangeError('The value "'+t+'" is invalid for option "size"');var r=new Uint8Array(t);return Object.setPrototypeOf(r,o.prototype),r}function o(t,r,n){if("number"==typeof t){if("string"==typeof r)throw new TypeError('The "string" argument must be of type string. Received type number');return b(t)}return R(t,r,n)}function R(t,r,n){if("string"==typeof t)return function h(t,r){if(("string"!=typeof r||""===r)&&(r="utf8"),!o.isEncoding(r))throw new TypeError("Unknown encoding: "+r);var n=0|P(t,r),i=m(n),e=i.write(t,r);return e!==n&&(i=i.slice(0,e)),i}(t,r);if(ArrayBuffer.isView(t))return function y(t){if(Z(t,Uint8Array)){var r=new Uint8Array(t);return g(r.buffer,r.byteOffset,r.byteLength)}return c(t)}(t);if(null==t)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(Z(t,ArrayBuffer)||t&&Z(t.buffer,ArrayBuffer)||typeof SharedArrayBuffer<"u"&&(Z(t,SharedArrayBuffer)||t&&Z(t.buffer,SharedArrayBuffer)))return g(t,r,n);if("number"==typeof t)throw new TypeError('The "value" argument must not be of type number. Received type number');var i=t.valueOf&&t.valueOf();if(null!=i&&i!==t)return o.from(i,r,n);var e=function _(t){if(o.isBuffer(t)){var r=0|F(t.length),n=m(r);return 0===n.length||t.copy(n,0,0,r),n}return void 0!==t.length?"number"!=typeof t.length||$(t.length)?m(0):c(t):"Buffer"===t.type&&Array.isArray(t.data)?c(t.data):void 0}(t);if(e)return e;if(typeof Symbol<"u"&&null!=Symbol.toPrimitive&&"function"==typeof t[Symbol.toPrimitive])return o.from(t[Symbol.toPrimitive]("string"),r,n);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}function v(t){if("number"!=typeof t)throw new TypeError('"size" argument must be of type number');if(t<0)throw new RangeError('The value "'+t+'" is invalid for option "size"')}function b(t){return v(t),m(t<0?0:0|F(t))}function c(t){for(var r=t.length<0?0:0|F(t.length),n=m(r),i=0;i<r;i+=1)n[i]=255&t[i];return n}function g(t,r,n){if(r<0||t.byteLength<r)throw new RangeError('"offset" is outside of buffer bounds');if(t.byteLength<r+(n||0))throw new RangeError('"length" is outside of buffer bounds');var i;return i=void 0===r&&void 0===n?new Uint8Array(t):void 0===n?new Uint8Array(t,r):new Uint8Array(t,r,n),Object.setPrototypeOf(i,o.prototype),i}function F(t){if(t>=E)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+E.toString(16)+" bytes");return 0|t}function P(t,r){if(o.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||Z(t,ArrayBuffer))return t.byteLength;if("string"!=typeof t)throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);var n=t.length,i=arguments.length>2&&!0===arguments[2];if(!i&&0===n)return 0;for(var e=!1;;)switch(r){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":return V(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return tr(t).length;default:if(e)return i?-1:V(t).length;r=(""+r).toLowerCase(),e=!0}}function M(t,r,n){var i=!1;if((void 0===r||r<0)&&(r=0),r>this.length||((void 0===n||n>this.length)&&(n=this.length),n<=0)||(n>>>=0)<=(r>>>=0))return"";for(t||(t="utf8");;)switch(t){case"hex":return hr(this,r,n);case"utf8":case"utf-8":return j(this,r,n);case"ascii":return ur(this,r,n);case"latin1":case"binary":return pr(this,r,n);case"base64":return or(this,r,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return fr(this,r,n);default:if(i)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),i=!0}}function J(t,r,n){var i=t[r];t[r]=t[n],t[n]=i}function W(t,r,n,i,e){if(0===t.length)return-1;if("string"==typeof n?(i=n,n=0):n>2147483647?n=2147483647:n<-2147483648&&(n=-2147483648),$(n=+n)&&(n=e?0:t.length-1),n<0&&(n=t.length+n),n>=t.length){if(e)return-1;n=t.length-1}else if(n<0){if(!e)return-1;n=0}if("string"==typeof r&&(r=o.from(r,i)),o.isBuffer(r))return 0===r.length?-1:Y(t,r,n,i,e);if("number"==typeof r)return r&=255,"function"==typeof Uint8Array.prototype.indexOf?e?Uint8Array.prototype.indexOf.call(t,r,n):Uint8Array.prototype.lastIndexOf.call(t,r,n):Y(t,[r],n,i,e);throw new TypeError("val must be string, number or Buffer")}function Y(t,r,n,i,e){var d,a=1,u=t.length,l=r.length;if(void 0!==i&&("ucs2"===(i=String(i).toLowerCase())||"ucs-2"===i||"utf16le"===i||"utf-16le"===i)){if(t.length<2||r.length<2)return-1;a=2,u/=2,l/=2,n/=2}function x(ir,er){return 1===a?ir[er]:ir.readUInt16BE(er*a)}if(e){var L=-1;for(d=n;d<u;d++)if(x(t,d)===x(r,-1===L?0:d-L)){if(-1===L&&(L=d),d-L+1===l)return L*a}else-1!==L&&(d-=d-L),L=-1}else for(n+l>u&&(n=u-l),d=n;d>=0;d--){for(var A=!0,G=0;G<l;G++)if(x(t,d+G)!==x(r,G)){A=!1;break}if(A)return d}return-1}function S(t,r,n,i){n=Number(n)||0;var e=t.length-n;i?(i=Number(i))>e&&(i=e):i=e;var a=r.length;i>a/2&&(i=a/2);for(var u=0;u<i;++u){var l=parseInt(r.substr(2*u,2),16);if($(l))return u;t[n+u]=l}return u}function D(t,r,n,i){return H(V(r,t.length-n),t,n,i)}function O(t,r,n,i){return H(function lr(t){for(var r=[],n=0;n<t.length;++n)r.push(255&t.charCodeAt(n));return r}(r),t,n,i)}function Q(t,r,n,i){return H(tr(r),t,n,i)}function z(t,r,n,i){return H(function wr(t,r){for(var n,i,a=[],u=0;u<t.length&&!((r-=2)<0);++u)i=(n=t.charCodeAt(u))>>8,a.push(n%256),a.push(i);return a}(r,t.length-n),t,n,i)}function or(t,r,n){return I.fromByteArray(0===r&&n===t.length?t:t.slice(r,n))}function j(t,r,n){n=Math.min(t.length,n);for(var i=[],e=r;e<n;){var x,d,L,A,a=t[e],u=null,l=a>239?4:a>223?3:a>191?2:1;if(e+l<=n)switch(l){case 1:a<128&&(u=a);break;case 2:128==(192&(x=t[e+1]))&&(A=(31&a)<<6|63&x)>127&&(u=A);break;case 3:d=t[e+2],128==(192&(x=t[e+1]))&&128==(192&d)&&(A=(15&a)<<12|(63&x)<<6|63&d)>2047&&(A<55296||A>57343)&&(u=A);break;case 4:d=t[e+2],L=t[e+3],128==(192&(x=t[e+1]))&&128==(192&d)&&128==(192&L)&&(A=(15&a)<<18|(63&x)<<12|(63&d)<<6|63&L)>65535&&A<1114112&&(u=A)}null===u?(u=65533,l=1):u>65535&&(i.push((u-=65536)>>>10&1023|55296),u=56320|1023&u),i.push(u),e+=l}return function ar(t){var r=t.length;if(r<=K)return String.fromCharCode.apply(String,t);for(var n="",i=0;i<r;)n+=String.fromCharCode.apply(String,t.slice(i,i+=K));return n}(i)}!(o.TYPED_ARRAY_SUPPORT=function w(){try{var t=new Uint8Array(1),r={foo:function(){return 42}};return Object.setPrototypeOf(r,Uint8Array.prototype),Object.setPrototypeOf(t,r),42===t.foo()}catch{return!1}}())&&typeof console<"u"&&"function"==typeof console.error&&console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(o.prototype,"parent",{enumerable:!0,get:function(){if(o.isBuffer(this))return this.buffer}}),Object.defineProperty(o.prototype,"offset",{enumerable:!0,get:function(){if(o.isBuffer(this))return this.byteOffset}}),o.poolSize=8192,o.from=function(t,r,n){return R(t,r,n)},Object.setPrototypeOf(o.prototype,Uint8Array.prototype),Object.setPrototypeOf(o,Uint8Array),o.alloc=function(t,r,n){return function U(t,r,n){return v(t),t<=0?m(t):void 0!==r?"string"==typeof n?m(t).fill(r,n):m(t).fill(r):m(t)}(t,r,n)},o.allocUnsafe=function(t){return b(t)},o.allocUnsafeSlow=function(t){return b(t)},o.isBuffer=function(r){return null!=r&&!0===r._isBuffer&&r!==o.prototype},o.compare=function(r,n){if(Z(r,Uint8Array)&&(r=o.from(r,r.offset,r.byteLength)),Z(n,Uint8Array)&&(n=o.from(n,n.offset,n.byteLength)),!o.isBuffer(r)||!o.isBuffer(n))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(r===n)return 0;for(var i=r.length,e=n.length,a=0,u=Math.min(i,e);a<u;++a)if(r[a]!==n[a]){i=r[a],e=n[a];break}return i<e?-1:e<i?1:0},o.isEncoding=function(r){switch(String(r).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},o.concat=function(r,n){if(!Array.isArray(r))throw new TypeError('"list" argument must be an Array of Buffers');if(0===r.length)return o.alloc(0);var i;if(void 0===n)for(n=0,i=0;i<r.length;++i)n+=r[i].length;var e=o.allocUnsafe(n),a=0;for(i=0;i<r.length;++i){var u=r[i];if(Z(u,Uint8Array))a+u.length>e.length?o.from(u).copy(e,a):Uint8Array.prototype.set.call(e,u,a);else{if(!o.isBuffer(u))throw new TypeError('"list" argument must be an Array of Buffers');u.copy(e,a)}a+=u.length}return e},o.byteLength=P,o.prototype._isBuffer=!0,o.prototype.swap16=function(){var r=this.length;if(r%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var n=0;n<r;n+=2)J(this,n,n+1);return this},o.prototype.swap32=function(){var r=this.length;if(r%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var n=0;n<r;n+=4)J(this,n,n+3),J(this,n+1,n+2);return this},o.prototype.swap64=function(){var r=this.length;if(r%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var n=0;n<r;n+=8)J(this,n,n+7),J(this,n+1,n+6),J(this,n+2,n+5),J(this,n+3,n+4);return this},o.prototype.toLocaleString=o.prototype.toString=function(){var r=this.length;return 0===r?"":0===arguments.length?j(this,0,r):M.apply(this,arguments)},o.prototype.equals=function(r){if(!o.isBuffer(r))throw new TypeError("Argument must be a Buffer");return this===r||0===o.compare(this,r)},o.prototype.inspect=function(){var r="",n=N.h2;return r=this.toString("hex",0,n).replace(/(.{2})/g,"$1 ").trim(),this.length>n&&(r+=" ... "),"<Buffer "+r+">"},p&&(o.prototype[p]=o.prototype.inspect),o.prototype.compare=function(r,n,i,e,a){if(Z(r,Uint8Array)&&(r=o.from(r,r.offset,r.byteLength)),!o.isBuffer(r))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof r);if(void 0===n&&(n=0),void 0===i&&(i=r?r.length:0),void 0===e&&(e=0),void 0===a&&(a=this.length),n<0||i>r.length||e<0||a>this.length)throw new RangeError("out of range index");if(e>=a&&n>=i)return 0;if(e>=a)return-1;if(n>=i)return 1;if(this===r)return 0;for(var u=(a>>>=0)-(e>>>=0),l=(i>>>=0)-(n>>>=0),x=Math.min(u,l),d=this.slice(e,a),L=r.slice(n,i),A=0;A<x;++A)if(d[A]!==L[A]){u=d[A],l=L[A];break}return u<l?-1:l<u?1:0},o.prototype.includes=function(r,n,i){return-1!==this.indexOf(r,n,i)},o.prototype.indexOf=function(r,n,i){return W(this,r,n,i,!0)},o.prototype.lastIndexOf=function(r,n,i){return W(this,r,n,i,!1)},o.prototype.write=function(r,n,i,e){if(void 0===n)e="utf8",i=this.length,n=0;else if(void 0===i&&"string"==typeof n)e=n,i=this.length,n=0;else{if(!isFinite(n))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");n>>>=0,isFinite(i)?(i>>>=0,void 0===e&&(e="utf8")):(e=i,i=void 0)}var a=this.length-n;if((void 0===i||i>a)&&(i=a),r.length>0&&(i<0||n<0)||n>this.length)throw new RangeError("Attempt to write outside buffer bounds");e||(e="utf8");for(var u=!1;;)switch(e){case"hex":return S(this,r,n,i);case"utf8":case"utf-8":return D(this,r,n,i);case"ascii":case"latin1":case"binary":return O(this,r,n,i);case"base64":return Q(this,r,n,i);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return z(this,r,n,i);default:if(u)throw new TypeError("Unknown encoding: "+e);e=(""+e).toLowerCase(),u=!0}},o.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var K=4096;function ur(t,r,n){var i="";n=Math.min(t.length,n);for(var e=r;e<n;++e)i+=String.fromCharCode(127&t[e]);return i}function pr(t,r,n){var i="";n=Math.min(t.length,n);for(var e=r;e<n;++e)i+=String.fromCharCode(t[e]);return i}function hr(t,r,n){var i=t.length;(!r||r<0)&&(r=0),(!n||n<0||n>i)&&(n=i);for(var e="",a=r;a<n;++a)e+=yr[t[a]];return e}function fr(t,r,n){for(var i=t.slice(r,n),e="",a=0;a<i.length-1;a+=2)e+=String.fromCharCode(i[a]+256*i[a+1]);return e}function C(t,r,n){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+r>n)throw new RangeError("Trying to access beyond buffer length")}function k(t,r,n,i,e,a){if(!o.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(r>e||r<a)throw new RangeError('"value" argument is out of bounds');if(n+i>t.length)throw new RangeError("Index out of range")}function q(t,r,n,i,e,a){if(n+i>t.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("Index out of range")}function rr(t,r,n,i,e){return r=+r,n>>>=0,e||q(t,0,n,4),B.write(t,r,n,i,23,4),n+4}function nr(t,r,n,i,e){return r=+r,n>>>=0,e||q(t,0,n,8),B.write(t,r,n,i,52,8),n+8}o.prototype.slice=function(r,n){var i=this.length;(r=~~r)<0?(r+=i)<0&&(r=0):r>i&&(r=i),(n=void 0===n?i:~~n)<0?(n+=i)<0&&(n=0):n>i&&(n=i),n<r&&(n=r);var e=this.subarray(r,n);return Object.setPrototypeOf(e,o.prototype),e},o.prototype.readUintLE=o.prototype.readUIntLE=function(r,n,i){r>>>=0,n>>>=0,i||C(r,n,this.length);for(var e=this[r],a=1,u=0;++u<n&&(a*=256);)e+=this[r+u]*a;return e},o.prototype.readUintBE=o.prototype.readUIntBE=function(r,n,i){r>>>=0,n>>>=0,i||C(r,n,this.length);for(var e=this[r+--n],a=1;n>0&&(a*=256);)e+=this[r+--n]*a;return e},o.prototype.readUint8=o.prototype.readUInt8=function(r,n){return r>>>=0,n||C(r,1,this.length),this[r]},o.prototype.readUint16LE=o.prototype.readUInt16LE=function(r,n){return r>>>=0,n||C(r,2,this.length),this[r]|this[r+1]<<8},o.prototype.readUint16BE=o.prototype.readUInt16BE=function(r,n){return r>>>=0,n||C(r,2,this.length),this[r]<<8|this[r+1]},o.prototype.readUint32LE=o.prototype.readUInt32LE=function(r,n){return r>>>=0,n||C(r,4,this.length),(this[r]|this[r+1]<<8|this[r+2]<<16)+16777216*this[r+3]},o.prototype.readUint32BE=o.prototype.readUInt32BE=function(r,n){return r>>>=0,n||C(r,4,this.length),16777216*this[r]+(this[r+1]<<16|this[r+2]<<8|this[r+3])},o.prototype.readIntLE=function(r,n,i){r>>>=0,n>>>=0,i||C(r,n,this.length);for(var e=this[r],a=1,u=0;++u<n&&(a*=256);)e+=this[r+u]*a;return e>=(a*=128)&&(e-=Math.pow(2,8*n)),e},o.prototype.readIntBE=function(r,n,i){r>>>=0,n>>>=0,i||C(r,n,this.length);for(var e=n,a=1,u=this[r+--e];e>0&&(a*=256);)u+=this[r+--e]*a;return u>=(a*=128)&&(u-=Math.pow(2,8*n)),u},o.prototype.readInt8=function(r,n){return r>>>=0,n||C(r,1,this.length),128&this[r]?-1*(255-this[r]+1):this[r]},o.prototype.readInt16LE=function(r,n){r>>>=0,n||C(r,2,this.length);var i=this[r]|this[r+1]<<8;return 32768&i?4294901760|i:i},o.prototype.readInt16BE=function(r,n){r>>>=0,n||C(r,2,this.length);var i=this[r+1]|this[r]<<8;return 32768&i?4294901760|i:i},o.prototype.readInt32LE=function(r,n){return r>>>=0,n||C(r,4,this.length),this[r]|this[r+1]<<8|this[r+2]<<16|this[r+3]<<24},o.prototype.readInt32BE=function(r,n){return r>>>=0,n||C(r,4,this.length),this[r]<<24|this[r+1]<<16|this[r+2]<<8|this[r+3]},o.prototype.readFloatLE=function(r,n){return r>>>=0,n||C(r,4,this.length),B.read(this,r,!0,23,4)},o.prototype.readFloatBE=function(r,n){return r>>>=0,n||C(r,4,this.length),B.read(this,r,!1,23,4)},o.prototype.readDoubleLE=function(r,n){return r>>>=0,n||C(r,8,this.length),B.read(this,r,!0,52,8)},o.prototype.readDoubleBE=function(r,n){return r>>>=0,n||C(r,8,this.length),B.read(this,r,!1,52,8)},o.prototype.writeUintLE=o.prototype.writeUIntLE=function(r,n,i,e){r=+r,n>>>=0,i>>>=0,e||k(this,r,n,i,Math.pow(2,8*i)-1,0);var u=1,l=0;for(this[n]=255&r;++l<i&&(u*=256);)this[n+l]=r/u&255;return n+i},o.prototype.writeUintBE=o.prototype.writeUIntBE=function(r,n,i,e){r=+r,n>>>=0,i>>>=0,e||k(this,r,n,i,Math.pow(2,8*i)-1,0);var u=i-1,l=1;for(this[n+u]=255&r;--u>=0&&(l*=256);)this[n+u]=r/l&255;return n+i},o.prototype.writeUint8=o.prototype.writeUInt8=function(r,n,i){return r=+r,n>>>=0,i||k(this,r,n,1,255,0),this[n]=255&r,n+1},o.prototype.writeUint16LE=o.prototype.writeUInt16LE=function(r,n,i){return r=+r,n>>>=0,i||k(this,r,n,2,65535,0),this[n]=255&r,this[n+1]=r>>>8,n+2},o.prototype.writeUint16BE=o.prototype.writeUInt16BE=function(r,n,i){return r=+r,n>>>=0,i||k(this,r,n,2,65535,0),this[n]=r>>>8,this[n+1]=255&r,n+2},o.prototype.writeUint32LE=o.prototype.writeUInt32LE=function(r,n,i){return r=+r,n>>>=0,i||k(this,r,n,4,4294967295,0),this[n+3]=r>>>24,this[n+2]=r>>>16,this[n+1]=r>>>8,this[n]=255&r,n+4},o.prototype.writeUint32BE=o.prototype.writeUInt32BE=function(r,n,i){return r=+r,n>>>=0,i||k(this,r,n,4,4294967295,0),this[n]=r>>>24,this[n+1]=r>>>16,this[n+2]=r>>>8,this[n+3]=255&r,n+4},o.prototype.writeIntLE=function(r,n,i,e){if(r=+r,n>>>=0,!e){var a=Math.pow(2,8*i-1);k(this,r,n,i,a-1,-a)}var u=0,l=1,x=0;for(this[n]=255&r;++u<i&&(l*=256);)r<0&&0===x&&0!==this[n+u-1]&&(x=1),this[n+u]=(r/l>>0)-x&255;return n+i},o.prototype.writeIntBE=function(r,n,i,e){if(r=+r,n>>>=0,!e){var a=Math.pow(2,8*i-1);k(this,r,n,i,a-1,-a)}var u=i-1,l=1,x=0;for(this[n+u]=255&r;--u>=0&&(l*=256);)r<0&&0===x&&0!==this[n+u+1]&&(x=1),this[n+u]=(r/l>>0)-x&255;return n+i},o.prototype.writeInt8=function(r,n,i){return r=+r,n>>>=0,i||k(this,r,n,1,127,-128),r<0&&(r=255+r+1),this[n]=255&r,n+1},o.prototype.writeInt16LE=function(r,n,i){return r=+r,n>>>=0,i||k(this,r,n,2,32767,-32768),this[n]=255&r,this[n+1]=r>>>8,n+2},o.prototype.writeInt16BE=function(r,n,i){return r=+r,n>>>=0,i||k(this,r,n,2,32767,-32768),this[n]=r>>>8,this[n+1]=255&r,n+2},o.prototype.writeInt32LE=function(r,n,i){return r=+r,n>>>=0,i||k(this,r,n,4,2147483647,-2147483648),this[n]=255&r,this[n+1]=r>>>8,this[n+2]=r>>>16,this[n+3]=r>>>24,n+4},o.prototype.writeInt32BE=function(r,n,i){return r=+r,n>>>=0,i||k(this,r,n,4,2147483647,-2147483648),r<0&&(r=4294967295+r+1),this[n]=r>>>24,this[n+1]=r>>>16,this[n+2]=r>>>8,this[n+3]=255&r,n+4},o.prototype.writeFloatLE=function(r,n,i){return rr(this,r,n,!0,i)},o.prototype.writeFloatBE=function(r,n,i){return rr(this,r,n,!1,i)},o.prototype.writeDoubleLE=function(r,n,i){return nr(this,r,n,!0,i)},o.prototype.writeDoubleBE=function(r,n,i){return nr(this,r,n,!1,i)},o.prototype.copy=function(r,n,i,e){if(!o.isBuffer(r))throw new TypeError("argument should be a Buffer");if(i||(i=0),!e&&0!==e&&(e=this.length),n>=r.length&&(n=r.length),n||(n=0),e>0&&e<i&&(e=i),e===i||0===r.length||0===this.length)return 0;if(n<0)throw new RangeError("targetStart out of bounds");if(i<0||i>=this.length)throw new RangeError("Index out of range");if(e<0)throw new RangeError("sourceEnd out of bounds");e>this.length&&(e=this.length),r.length-n<e-i&&(e=r.length-n+i);var a=e-i;return this===r&&"function"==typeof Uint8Array.prototype.copyWithin?this.copyWithin(n,i,e):Uint8Array.prototype.set.call(r,this.subarray(i,e),n),a},o.prototype.fill=function(r,n,i,e){if("string"==typeof r){if("string"==typeof n?(e=n,n=0,i=this.length):"string"==typeof i&&(e=i,i=this.length),void 0!==e&&"string"!=typeof e)throw new TypeError("encoding must be a string");if("string"==typeof e&&!o.isEncoding(e))throw new TypeError("Unknown encoding: "+e);if(1===r.length){var a=r.charCodeAt(0);("utf8"===e&&a<128||"latin1"===e)&&(r=a)}}else"number"==typeof r?r&=255:"boolean"==typeof r&&(r=Number(r));if(n<0||this.length<n||this.length<i)throw new RangeError("Out of range index");if(i<=n)return this;var u;if(n>>>=0,i=void 0===i?this.length:i>>>0,r||(r=0),"number"==typeof r)for(u=n;u<i;++u)this[u]=r;else{var l=o.isBuffer(r)?r:o.from(r,e),x=l.length;if(0===x)throw new TypeError('The value "'+r+'" is invalid for argument "value"');for(u=0;u<i-n;++u)this[u+n]=l[u%x]}return this};var cr=/[^+/0-9A-Za-z-_]/g;function V(t,r){r=r||1/0;for(var n,i=t.length,e=null,a=[],u=0;u<i;++u){if((n=t.charCodeAt(u))>55295&&n<57344){if(!e){if(n>56319){(r-=3)>-1&&a.push(239,191,189);continue}if(u+1===i){(r-=3)>-1&&a.push(239,191,189);continue}e=n;continue}if(n<56320){(r-=3)>-1&&a.push(239,191,189),e=n;continue}n=65536+(e-55296<<10|n-56320)}else e&&(r-=3)>-1&&a.push(239,191,189);if(e=null,n<128){if((r-=1)<0)break;a.push(n)}else if(n<2048){if((r-=2)<0)break;a.push(n>>6|192,63&n|128)}else if(n<65536){if((r-=3)<0)break;a.push(n>>12|224,n>>6&63|128,63&n|128)}else{if(!(n<1114112))throw new Error("Invalid code point");if((r-=4)<0)break;a.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128)}}return a}function tr(t){return I.toByteArray(function sr(t){if((t=(t=t.split("=")[0]).trim().replace(cr,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}(t))}function H(t,r,n,i){for(var e=0;e<i&&!(e+n>=r.length||e>=t.length);++e)r[e+n]=t[e];return e}function Z(t,r){return t instanceof r||null!=t&&null!=t.constructor&&null!=t.constructor.name&&t.constructor.name===r.name}function $(t){return t!=t}var yr=function(){for(var t="0123456789abcdef",r=new Array(256),n=0;n<16;++n)for(var i=16*n,e=0;e<16;++e)r[i+e]=t[n]+t[e];return r}()},8461:(X,N)=>{N.read=function(f,s,I,B,p){var E,w,m=8*p-B-1,o=(1<<m)-1,R=o>>1,v=-7,U=I?p-1:0,b=I?-1:1,h=f[s+U];for(U+=b,E=h&(1<<-v)-1,h>>=-v,v+=m;v>0;E=256*E+f[s+U],U+=b,v-=8);for(w=E&(1<<-v)-1,E>>=-v,v+=B;v>0;w=256*w+f[s+U],U+=b,v-=8);if(0===E)E=1-R;else{if(E===o)return w?NaN:1/0*(h?-1:1);w+=Math.pow(2,B),E-=R}return(h?-1:1)*w*Math.pow(2,E-B)},N.write=function(f,s,I,B,p,E){var w,m,o,R=8*E-p-1,v=(1<<R)-1,U=v>>1,b=23===p?Math.pow(2,-24)-Math.pow(2,-77):0,h=B?0:E-1,c=B?1:-1,y=s<0||0===s&&1/s<0?1:0;for(s=Math.abs(s),isNaN(s)||s===1/0?(m=isNaN(s)?1:0,w=v):(w=Math.floor(Math.log(s)/Math.LN2),s*(o=Math.pow(2,-w))<1&&(w--,o*=2),(s+=w+U>=1?b/o:b*Math.pow(2,1-U))*o>=2&&(w++,o/=2),w+U>=v?(m=0,w=v):w+U>=1?(m=(s*o-1)*Math.pow(2,p),w+=U):(m=s*Math.pow(2,U-1)*Math.pow(2,p),w=0));p>=8;f[I+h]=255&m,h+=c,m/=256,p-=8);for(w=w<<p|m,R+=p;R>0;f[I+h]=255&w,h+=c,w/=256,R-=8);f[I+h-c]|=128*y}}}]);