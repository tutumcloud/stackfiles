/* js-yaml 3.3.1 https://github.com/nodeca/js-yaml */
/* jshint ignore:start */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.jsyaml=e()}}(function(){return function e(t,n,i){function r(a,s){if(!n[a]){if(!t[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(o)return o(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[a]={exports:{}};t[a][0].call(l.exports,function(e){var n=t[a][1][e];return r(n?n:e)},l,l.exports,e,t,n,i)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<i.length;a++)r(i[a]);return r}({1:[function(e,t,n){"use strict";function i(e){return function(){throw new Error("Function "+e+" is deprecated and cannot be used.")}}var r=e("./js-yaml/loader"),o=e("./js-yaml/dumper");t.exports.Type=e("./js-yaml/type"),t.exports.Schema=e("./js-yaml/schema"),t.exports.FAILSAFE_SCHEMA=e("./js-yaml/schema/failsafe"),t.exports.JSON_SCHEMA=e("./js-yaml/schema/json"),t.exports.CORE_SCHEMA=e("./js-yaml/schema/core"),t.exports.DEFAULT_SAFE_SCHEMA=e("./js-yaml/schema/default_safe"),t.exports.DEFAULT_FULL_SCHEMA=e("./js-yaml/schema/default_full"),t.exports.load=r.load,t.exports.loadAll=r.loadAll,t.exports.safeLoad=r.safeLoad,t.exports.safeLoadAll=r.safeLoadAll,t.exports.dump=o.dump,t.exports.safeDump=o.safeDump,t.exports.YAMLException=e("./js-yaml/exception"),t.exports.MINIMAL_SCHEMA=e("./js-yaml/schema/failsafe"),t.exports.SAFE_SCHEMA=e("./js-yaml/schema/default_safe"),t.exports.DEFAULT_SCHEMA=e("./js-yaml/schema/default_full"),t.exports.scan=i("scan"),t.exports.parse=i("parse"),t.exports.compose=i("compose"),t.exports.addConstructor=i("addConstructor")},{"./js-yaml/dumper":3,"./js-yaml/exception":4,"./js-yaml/loader":5,"./js-yaml/schema":7,"./js-yaml/schema/core":8,"./js-yaml/schema/default_full":9,"./js-yaml/schema/default_safe":10,"./js-yaml/schema/failsafe":11,"./js-yaml/schema/json":12,"./js-yaml/type":13}],2:[function(e,t,n){"use strict";function i(e){return"undefined"==typeof e||null===e}function r(e){return"object"==typeof e&&null!==e}function o(e){return Array.isArray(e)?e:i(e)?[]:[e]}function a(e,t){var n,i,r,o;if(t)for(o=Object.keys(t),n=0,i=o.length;i>n;n+=1)r=o[n],e[r]=t[r];return e}function s(e,t){var n,i="";for(n=0;t>n;n+=1)i+=e;return i}function u(e){return 0===e&&Number.NEGATIVE_INFINITY===1/e}t.exports.isNothing=i,t.exports.isObject=r,t.exports.toArray=o,t.exports.repeat=s,t.exports.isNegativeZero=u,t.exports.extend=a},{}],3:[function(e,t,n){"use strict";function i(e,t){var n,i,r,o,a,s,u;if(null===t)return{};for(n={},i=Object.keys(t),r=0,o=i.length;o>r;r+=1)a=i[r],s=String(t[a]),"!!"===a.slice(0,2)&&(a="tag:yaml.org,2002:"+a.slice(2)),u=e.compiledTypeMap[a],u&&F.call(u.styleAliases,s)&&(s=u.styleAliases[s]),n[a]=s;return n}function r(e){var t,n,i;if(t=e.toString(16).toUpperCase(),255>=e)n="x",i=2;else if(65535>=e)n="u",i=4;else{if(!(4294967295>=e))throw new I("code point within a string may not be greater than 0xFFFFFFFF");n="U",i=8}return"\\"+n+j.repeat("0",i-t.length)+t}function o(e){this.schema=e.schema||S,this.indent=Math.max(1,e.indent||2),this.skipInvalid=e.skipInvalid||!1,this.flowLevel=j.isNothing(e.flowLevel)?-1:e.flowLevel,this.styleMap=i(this.schema,e.styles||null),this.sortKeys=e.sortKeys||!1,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function a(e,t){for(var n,i=j.repeat(" ",t),r=0,o=-1,a="",s=e.length;s>r;)o=e.indexOf("\n",r),-1===o?(n=e.slice(r),r=s):(n=e.slice(r,o+1),r=o+1),n.length&&"\n"!==n&&(a+=i),a+=n;return a}function s(e,t){return"\n"+j.repeat(" ",e.indent*t)}function u(e,t){var n,i,r;for(n=0,i=e.implicitTypes.length;i>n;n+=1)if(r=e.implicitTypes[n],r.resolve(t))return!0;return!1}function c(e){this.source=e,this.result="",this.checkpoint=0}function l(e,t,n){var i,r,o,s,l,f,m,g,y,x,v,A,b,w,C,k,j,I,S,O,E;if(0===t.length)return void(e.dump="''");if(-1!==te.indexOf(t))return void(e.dump="'"+t+"'");for(i=!0,r=t.length?t.charCodeAt(0):0,o=M===r||M===t.charCodeAt(t.length-1),(K===r||G===r||V===r||J===r)&&(i=!1),o?(i=!1,s=!1,l=!1):(s=!0,l=!0),f=!0,m=new c(t),g=!1,y=0,x=0,v=e.indent*n,A=80,40>v?A-=v:A=40,w=0;w<t.length;w++){if(b=t.charCodeAt(w),i){if(h(b))continue;i=!1}f&&b===P&&(f=!1),C=ee[b],k=d(b),(C||k)&&(b!==T&&b!==D&&b!==P?(s=!1,l=!1):b===T&&(g=!0,f=!1,w>0&&(j=t.charCodeAt(w-1),j===M&&(l=!1,s=!1)),s&&(I=w-y,y=w,I>x&&(x=I))),b!==D&&(f=!1),m.takeUpTo(w),m.escapeChar())}if(i&&u(e,t)&&(i=!1),S="",(s||l)&&(O=0,t.charCodeAt(t.length-1)===T&&(O+=1,t.charCodeAt(t.length-2)===T&&(O+=1)),0===O?S="-":2===O&&(S="+")),l&&A>x&&(s=!1),g||(l=!1),i)e.dump=t;else if(f)e.dump="'"+t+"'";else if(s)E=p(t,A),e.dump=">"+S+"\n"+a(E,v);else if(l)S||(t=t.replace(/\n$/,"")),e.dump="|"+S+"\n"+a(t,v);else{if(!m)throw new Error("Failed to dump scalar value");m.finish(),e.dump='"'+m.result+'"'}}function p(e,t){var n,i="",r=0,o=e.length,a=/\n+$/.exec(e);for(a&&(o=a.index+1);o>r;)n=e.indexOf("\n",r),n>o||-1===n?(i&&(i+="\n\n"),i+=f(e.slice(r,o),t),r=o):(i&&(i+="\n\n"),i+=f(e.slice(r,n),t),r=n+1);return a&&"\n"!==a[0]&&(i+=a[0]),i}function f(e,t){if(""===e)return e;for(var n,i,r,o=/[^\s] [^\s]/g,a="",s=0,u=0,c=o.exec(e);c;)n=c.index,n-u>t&&(i=s!==u?s:n,a&&(a+="\n"),r=e.slice(u,i),a+=r,u=i+1),s=n+1,c=o.exec(e);return a&&(a+="\n"),a+=u!==s&&e.length-u>t?e.slice(u,s)+"\n"+e.slice(s+1):e.slice(u)}function h(e){return N!==e&&T!==e&&_!==e&&B!==e&&W!==e&&Z!==e&&z!==e&&X!==e&&U!==e&&q!==e&&$!==e&&L!==e&&Q!==e&&H!==e&&P!==e&&D!==e&&Y!==e&&R!==e&&!ee[e]&&!d(e)}function d(e){return!(e>=32&&126>=e||133===e||e>=160&&55295>=e||e>=57344&&65533>=e||e>=65536&&1114111>=e)}function m(e,t,n){var i,r,o="",a=e.tag;for(i=0,r=n.length;r>i;i+=1)A(e,t,n[i],!1,!1)&&(0!==i&&(o+=", "),o+=e.dump);e.tag=a,e.dump="["+o+"]"}function g(e,t,n,i){var r,o,a="",u=e.tag;for(r=0,o=n.length;o>r;r+=1)A(e,t+1,n[r],!0,!0)&&(i&&0===r||(a+=s(e,t)),a+="- "+e.dump);e.tag=u,e.dump=a||"[]"}function y(e,t,n){var i,r,o,a,s,u="",c=e.tag,l=Object.keys(n);for(i=0,r=l.length;r>i;i+=1)s="",0!==i&&(s+=", "),o=l[i],a=n[o],A(e,t,o,!1,!1)&&(e.dump.length>1024&&(s+="? "),s+=e.dump+": ",A(e,t,a,!1,!1)&&(s+=e.dump,u+=s));e.tag=c,e.dump="{"+u+"}"}function x(e,t,n,i){var r,o,a,u,c,l,p="",f=e.tag,h=Object.keys(n);if(e.sortKeys===!0)h.sort();else if("function"==typeof e.sortKeys)h.sort(e.sortKeys);else if(e.sortKeys)throw new I("sortKeys must be a boolean or a function");for(r=0,o=h.length;o>r;r+=1)l="",i&&0===r||(l+=s(e,t)),a=h[r],u=n[a],A(e,t+1,a,!0,!0)&&(c=null!==e.tag&&"?"!==e.tag||e.dump&&e.dump.length>1024,c&&(l+=e.dump&&T===e.dump.charCodeAt(0)?"?":"? "),l+=e.dump,c&&(l+=s(e,t)),A(e,t+1,u,!0,c)&&(l+=e.dump&&T===e.dump.charCodeAt(0)?":":": ",l+=e.dump,p+=l));e.tag=f,e.dump=p||"{}"}function v(e,t,n){var i,r,o,a,s,u;for(r=n?e.explicitTypes:e.implicitTypes,o=0,a=r.length;a>o;o+=1)if(s=r[o],(s.instanceOf||s.predicate)&&(!s.instanceOf||"object"==typeof t&&t instanceof s.instanceOf)&&(!s.predicate||s.predicate(t))){if(e.tag=n?s.tag:"?",s.represent){if(u=e.styleMap[s.tag]||s.defaultStyle,"[object Function]"===E.call(s.represent))i=s.represent(t,u);else{if(!F.call(s.represent,u))throw new I("!<"+s.tag+'> tag resolver accepts not "'+u+'" style');i=s.represent[u](t,u)}e.dump=i}return!0}return!1}function A(e,t,n,i,r){e.tag=null,e.dump=n,v(e,n,!1)||v(e,n,!0);var o=E.call(e.dump);i&&(i=0>e.flowLevel||e.flowLevel>t),(null!==e.tag&&"?"!==e.tag||2!==e.indent&&t>0)&&(r=!1);var a,s,u="[object Object]"===o||"[object Array]"===o;if(u&&(a=e.duplicates.indexOf(n),s=-1!==a),s&&e.usedDuplicates[a])e.dump="*ref_"+a;else{if(u&&s&&!e.usedDuplicates[a]&&(e.usedDuplicates[a]=!0),"[object Object]"===o)i&&0!==Object.keys(e.dump).length?(x(e,t,e.dump,r),s&&(e.dump="&ref_"+a+(0===t?"\n":"")+e.dump)):(y(e,t,e.dump),s&&(e.dump="&ref_"+a+" "+e.dump));else if("[object Array]"===o)i&&0!==e.dump.length?(g(e,t,e.dump,r),s&&(e.dump="&ref_"+a+(0===t?"\n":"")+e.dump)):(m(e,t,e.dump),s&&(e.dump="&ref_"+a+" "+e.dump));else{if("[object String]"!==o){if(e.skipInvalid)return!1;throw new I("unacceptable kind of an object to dump "+o)}"?"!==e.tag&&l(e,e.dump,t)}null!==e.tag&&"?"!==e.tag&&(e.dump="!<"+e.tag+"> "+e.dump)}return!0}function b(e,t){var n,i,r=[],o=[];for(w(e,r,o),n=0,i=o.length;i>n;n+=1)t.duplicates.push(r[o[n]]);t.usedDuplicates=new Array(i)}function w(e,t,n){var i,r,o;E.call(e);if(null!==e&&"object"==typeof e)if(r=t.indexOf(e),-1!==r)-1===n.indexOf(r)&&n.push(r);else if(t.push(e),Array.isArray(e))for(r=0,o=e.length;o>r;r+=1)w(e[r],t,n);else for(i=Object.keys(e),r=0,o=i.length;o>r;r+=1)w(e[i[r]],t,n)}function C(e,t){t=t||{};var n=new o(t);return b(e,n),A(n,0,e,!0,!0)?n.dump+"\n":""}function k(e,t){return C(e,j.extend({schema:O},t))}var j=e("./common"),I=e("./exception"),S=e("./schema/default_full"),O=e("./schema/default_safe"),E=Object.prototype.toString,F=Object.prototype.hasOwnProperty,N=9,T=10,_=13,M=32,L=33,D=34,U=35,Y=37,q=38,P=39,$=42,B=44,K=45,R=58,H=62,G=63,V=64,W=91,Z=93,J=96,z=123,Q=124,X=125,ee={};ee[0]="\\0",ee[7]="\\a",ee[8]="\\b",ee[9]="\\t",ee[10]="\\n",ee[11]="\\v",ee[12]="\\f",ee[13]="\\r",ee[27]="\\e",ee[34]='\\"',ee[92]="\\\\",ee[133]="\\N",ee[160]="\\_",ee[8232]="\\L",ee[8233]="\\P";var te=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"];c.prototype.takeUpTo=function(e){var t;if(e<this.checkpoint)throw t=new Error("position should be > checkpoint"),t.position=e,t.checkpoint=this.checkpoint,t;return this.result+=this.source.slice(this.checkpoint,e),this.checkpoint=e,this},c.prototype.escapeChar=function(){var e,t;return e=this.source.charCodeAt(this.checkpoint),t=ee[e]||r(e),this.result+=t,this.checkpoint+=1,this},c.prototype.finish=function(){this.source.length>this.checkpoint&&this.takeUpTo(this.source.length)},t.exports.dump=C,t.exports.safeDump=k},{"./common":2,"./exception":4,"./schema/default_full":9,"./schema/default_safe":10}],4:[function(e,t,n){"use strict";function i(e,t){this.name="YAMLException",this.reason=e,this.mark=t,this.message=this.toString(!1)}i.prototype.toString=function(e){var t;return t="JS-YAML: "+(this.reason||"(unknown reason)"),!e&&this.mark&&(t+=" "+this.mark.toString()),t},t.exports=i},{}],5:[function(e,t,n){"use strict";function i(e){return 10===e||13===e}function r(e){return 9===e||32===e}function o(e){return 9===e||32===e||10===e||13===e}function a(e){return 44===e||91===e||93===e||123===e||125===e}function s(e){var t;return e>=48&&57>=e?e-48:(t=32|e,t>=97&&102>=t?t-97+10:-1)}function u(e){return 120===e?2:117===e?4:85===e?8:0}function c(e){return e>=48&&57>=e?e-48:-1}function l(e){return 48===e?"\x00":97===e?"":98===e?"\b":116===e?"	":9===e?"	":110===e?"\n":118===e?"":102===e?"\f":114===e?"\r":101===e?"":32===e?" ":34===e?'"':47===e?"/":92===e?"\\":78===e?"":95===e?" ":76===e?"\u2028":80===e?"\u2029":""}function p(e){return 65535>=e?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function f(e,t){this.input=e,this.filename=t.filename||null,this.schema=t.schema||R,this.onWarning=t.onWarning||null,this.legacy=t.legacy||!1,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=e.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.documents=[]}function h(e,t){return new $(t,new B(e.filename,e.input,e.position,e.line,e.position-e.lineStart))}function d(e,t){throw h(e,t)}function m(e,t){var n=h(e,t);if(!e.onWarning)throw n;e.onWarning.call(null,n)}function g(e,t,n,i){var r,o,a,s;if(n>t){if(s=e.input.slice(t,n),i)for(r=0,o=s.length;o>r;r+=1)a=s.charCodeAt(r),9===a||a>=32&&1114111>=a||d(e,"expected valid JSON character");e.result+=s}}function y(e,t,n){var i,r,o,a;for(P.isObject(n)||d(e,"cannot merge mappings; the provided source object is unacceptable"),i=Object.keys(n),o=0,a=i.length;a>o;o+=1)r=i[o],H.call(t,r)||(t[r]=n[r])}function x(e,t,n,i,r){var o,a;if(i=String(i),null===t&&(t={}),"tag:yaml.org,2002:merge"===n)if(Array.isArray(r))for(o=0,a=r.length;a>o;o+=1)y(e,t,r[o]);else y(e,t,r);else t[i]=r;return t}function v(e){var t;t=e.input.charCodeAt(e.position),10===t?e.position++:13===t?(e.position++,10===e.input.charCodeAt(e.position)&&e.position++):d(e,"a line break is expected"),e.line+=1,e.lineStart=e.position}function A(e,t,n){for(var o=0,a=e.input.charCodeAt(e.position);0!==a;){for(;r(a);)a=e.input.charCodeAt(++e.position);if(t&&35===a)do a=e.input.charCodeAt(++e.position);while(10!==a&&13!==a&&0!==a);if(!i(a))break;for(v(e),a=e.input.charCodeAt(e.position),o++,e.lineIndent=0;32===a;)e.lineIndent++,a=e.input.charCodeAt(++e.position)}return-1!==n&&0!==o&&e.lineIndent<n&&m(e,"deficient indentation"),o}function b(e){var t,n=e.position;return t=e.input.charCodeAt(n),45!==t&&46!==t||e.input.charCodeAt(n+1)!==t||e.input.charCodeAt(n+2)!==t||(n+=3,t=e.input.charCodeAt(n),0!==t&&!o(t))?!1:!0}function w(e,t){1===t?e.result+=" ":t>1&&(e.result+=P.repeat("\n",t-1))}function C(e,t,n){var s,u,c,l,p,f,h,d,m,y=e.kind,x=e.result;if(m=e.input.charCodeAt(e.position),o(m)||a(m)||35===m||38===m||42===m||33===m||124===m||62===m||39===m||34===m||37===m||64===m||96===m)return!1;if((63===m||45===m)&&(u=e.input.charCodeAt(e.position+1),o(u)||n&&a(u)))return!1;for(e.kind="scalar",e.result="",c=l=e.position,p=!1;0!==m;){if(58===m){if(u=e.input.charCodeAt(e.position+1),o(u)||n&&a(u))break}else if(35===m){if(s=e.input.charCodeAt(e.position-1),o(s))break}else{if(e.position===e.lineStart&&b(e)||n&&a(m))break;if(i(m)){if(f=e.line,h=e.lineStart,d=e.lineIndent,A(e,!1,-1),e.lineIndent>=t){p=!0,m=e.input.charCodeAt(e.position);continue}e.position=l,e.line=f,e.lineStart=h,e.lineIndent=d;break}}p&&(g(e,c,l,!1),w(e,e.line-f),c=l=e.position,p=!1),r(m)||(l=e.position+1),m=e.input.charCodeAt(++e.position)}return g(e,c,l,!1),e.result?!0:(e.kind=y,e.result=x,!1)}function k(e,t){var n,r,o;if(n=e.input.charCodeAt(e.position),39!==n)return!1;for(e.kind="scalar",e.result="",e.position++,r=o=e.position;0!==(n=e.input.charCodeAt(e.position));)if(39===n){if(g(e,r,e.position,!0),n=e.input.charCodeAt(++e.position),39!==n)return!0;r=o=e.position,e.position++}else i(n)?(g(e,r,o,!0),w(e,A(e,!1,t)),r=o=e.position):e.position===e.lineStart&&b(e)?d(e,"unexpected end of the document within a single quoted scalar"):(e.position++,o=e.position);d(e,"unexpected end of the stream within a single quoted scalar")}function j(e,t){var n,r,o,a,c,l;if(l=e.input.charCodeAt(e.position),34!==l)return!1;for(e.kind="scalar",e.result="",e.position++,n=r=e.position;0!==(l=e.input.charCodeAt(e.position));){if(34===l)return g(e,n,e.position,!0),e.position++,!0;if(92===l){if(g(e,n,e.position,!0),l=e.input.charCodeAt(++e.position),i(l))A(e,!1,t);else if(256>l&&re[l])e.result+=oe[l],e.position++;else if((c=u(l))>0){for(o=c,a=0;o>0;o--)l=e.input.charCodeAt(++e.position),(c=s(l))>=0?a=(a<<4)+c:d(e,"expected hexadecimal character");e.result+=p(a),e.position++}else d(e,"unknown escape sequence");n=r=e.position}else i(l)?(g(e,n,r,!0),w(e,A(e,!1,t)),n=r=e.position):e.position===e.lineStart&&b(e)?d(e,"unexpected end of the document within a double quoted scalar"):(e.position++,r=e.position)}d(e,"unexpected end of the stream within a double quoted scalar")}function I(e,t){var n,i,r,a,s,u,c,l,p,f,h,m=!0,g=e.tag,y=e.anchor;if(h=e.input.charCodeAt(e.position),91===h)a=93,c=!1,i=[];else{if(123!==h)return!1;a=125,c=!0,i={}}for(null!==e.anchor&&(e.anchorMap[e.anchor]=i),h=e.input.charCodeAt(++e.position);0!==h;){if(A(e,!0,t),h=e.input.charCodeAt(e.position),h===a)return e.position++,e.tag=g,e.anchor=y,e.kind=c?"mapping":"sequence",e.result=i,!0;m||d(e,"missed comma between flow collection entries"),p=l=f=null,s=u=!1,63===h&&(r=e.input.charCodeAt(e.position+1),o(r)&&(s=u=!0,e.position++,A(e,!0,t))),n=e.line,_(e,t,G,!1,!0),p=e.tag,l=e.result,A(e,!0,t),h=e.input.charCodeAt(e.position),!u&&e.line!==n||58!==h||(s=!0,h=e.input.charCodeAt(++e.position),A(e,!0,t),_(e,t,G,!1,!0),f=e.result),c?x(e,i,p,l,f):i.push(s?x(e,null,p,l,f):l),A(e,!0,t),h=e.input.charCodeAt(e.position),44===h?(m=!0,h=e.input.charCodeAt(++e.position)):m=!1}d(e,"unexpected end of the stream within a flow collection")}function S(e,t){var n,o,a,s,u=J,l=!1,p=t,f=0,h=!1;if(s=e.input.charCodeAt(e.position),124===s)o=!1;else{if(62!==s)return!1;o=!0}for(e.kind="scalar",e.result="";0!==s;)if(s=e.input.charCodeAt(++e.position),43===s||45===s)J===u?u=43===s?Q:z:d(e,"repeat of a chomping mode identifier");else{if(!((a=c(s))>=0))break;0===a?d(e,"bad explicit indentation width of a block scalar; it cannot be less than one"):l?d(e,"repeat of an indentation width identifier"):(p=t+a-1,l=!0)}if(r(s)){do s=e.input.charCodeAt(++e.position);while(r(s));if(35===s)do s=e.input.charCodeAt(++e.position);while(!i(s)&&0!==s)}for(;0!==s;){for(v(e),e.lineIndent=0,s=e.input.charCodeAt(e.position);(!l||e.lineIndent<p)&&32===s;)e.lineIndent++,s=e.input.charCodeAt(++e.position);if(!l&&e.lineIndent>p&&(p=e.lineIndent),i(s))f++;else{if(e.lineIndent<p){u===Q?e.result+=P.repeat("\n",f):u===J&&l&&(e.result+="\n");break}for(o?r(s)?(h=!0,e.result+=P.repeat("\n",f+1)):h?(h=!1,e.result+=P.repeat("\n",f+1)):0===f?l&&(e.result+=" "):e.result+=P.repeat("\n",f):l&&(e.result+=P.repeat("\n",f+1)),l=!0,f=0,n=e.position;!i(s)&&0!==s;)s=e.input.charCodeAt(++e.position);g(e,n,e.position,!1)}}return!0}function O(e,t){var n,i,r,a=e.tag,s=e.anchor,u=[],c=!1;for(null!==e.anchor&&(e.anchorMap[e.anchor]=u),r=e.input.charCodeAt(e.position);0!==r&&45===r&&(i=e.input.charCodeAt(e.position+1),o(i));)if(c=!0,e.position++,A(e,!0,-1)&&e.lineIndent<=t)u.push(null),r=e.input.charCodeAt(e.position);else if(n=e.line,_(e,t,W,!1,!0),u.push(e.result),A(e,!0,-1),r=e.input.charCodeAt(e.position),(e.line===n||e.lineIndent>t)&&0!==r)d(e,"bad indentation of a sequence entry");else if(e.lineIndent<t)break;return c?(e.tag=a,e.anchor=s,e.kind="sequence",e.result=u,!0):!1}function E(e,t,n){var i,a,s,u,c=e.tag,l=e.anchor,p={},f=null,h=null,m=null,g=!1,y=!1;for(null!==e.anchor&&(e.anchorMap[e.anchor]=p),u=e.input.charCodeAt(e.position);0!==u;){if(i=e.input.charCodeAt(e.position+1),s=e.line,63!==u&&58!==u||!o(i)){if(!_(e,n,V,!1,!0))break;if(e.line===s){for(u=e.input.charCodeAt(e.position);r(u);)u=e.input.charCodeAt(++e.position);if(58===u)u=e.input.charCodeAt(++e.position),o(u)||d(e,"a whitespace character is expected after the key-value separator within a block mapping"),g&&(x(e,p,f,h,null),f=h=m=null),y=!0,g=!1,a=!1,f=e.tag,h=e.result;else{if(!y)return e.tag=c,e.anchor=l,!0;d(e,"can not read an implicit mapping pair; a colon is missed")}}else{if(!y)return e.tag=c,e.anchor=l,!0;d(e,"can not read a block mapping entry; a multiline key may not be an implicit key")}}else 63===u?(g&&(x(e,p,f,h,null),f=h=m=null),y=!0,g=!0,a=!0):g?(g=!1,a=!0):d(e,"incomplete explicit mapping pair; a key node is missed"),e.position+=1,u=i;if((e.line===s||e.lineIndent>t)&&(_(e,t,Z,!0,a)&&(g?h=e.result:m=e.result),g||(x(e,p,f,h,m),f=h=m=null),A(e,!0,-1),u=e.input.charCodeAt(e.position)),e.lineIndent>t&&0!==u)d(e,"bad indentation of a mapping entry");else if(e.lineIndent<t)break}return g&&x(e,p,f,h,null),y&&(e.tag=c,e.anchor=l,e.kind="mapping",e.result=p),y}function F(e){var t,n,i,r,a=!1,s=!1;if(r=e.input.charCodeAt(e.position),33!==r)return!1;if(null!==e.tag&&d(e,"duplication of a tag property"),r=e.input.charCodeAt(++e.position),60===r?(a=!0,r=e.input.charCodeAt(++e.position)):33===r?(s=!0,n="!!",r=e.input.charCodeAt(++e.position)):n="!",t=e.position,a){do r=e.input.charCodeAt(++e.position);while(0!==r&&62!==r);e.position<e.length?(i=e.input.slice(t,e.position),r=e.input.charCodeAt(++e.position)):d(e,"unexpected end of the stream within a verbatim tag")}else{for(;0!==r&&!o(r);)33===r&&(s?d(e,"tag suffix cannot contain exclamation marks"):(n=e.input.slice(t-1,e.position+1),ne.test(n)||d(e,"named tag handle cannot contain such characters"),s=!0,t=e.position+1)),r=e.input.charCodeAt(++e.position);i=e.input.slice(t,e.position),te.test(i)&&d(e,"tag suffix cannot contain flow indicator characters")}return i&&!ie.test(i)&&d(e,"tag name cannot contain such characters: "+i),a?e.tag=i:H.call(e.tagMap,n)?e.tag=e.tagMap[n]+i:"!"===n?e.tag="!"+i:"!!"===n?e.tag="tag:yaml.org,2002:"+i:d(e,'undeclared tag handle "'+n+'"'),!0}function N(e){var t,n;if(n=e.input.charCodeAt(e.position),38!==n)return!1;for(null!==e.anchor&&d(e,"duplication of an anchor property"),n=e.input.charCodeAt(++e.position),t=e.position;0!==n&&!o(n)&&!a(n);)n=e.input.charCodeAt(++e.position);return e.position===t&&d(e,"name of an anchor node must contain at least one character"),e.anchor=e.input.slice(t,e.position),!0}function T(e){var t,n,i;e.length,e.input;if(i=e.input.charCodeAt(e.position),42!==i)return!1;for(i=e.input.charCodeAt(++e.position),t=e.position;0!==i&&!o(i)&&!a(i);)i=e.input.charCodeAt(++e.position);return e.position===t&&d(e,"name of an alias node must contain at least one character"),n=e.input.slice(t,e.position),e.anchorMap.hasOwnProperty(n)||d(e,'unidentified alias "'+n+'"'),e.result=e.anchorMap[n],A(e,!0,-1),!0}function _(e,t,n,i,r){var o,a,s,u,c,l,p,f,h=1,g=!1,y=!1;if(e.tag=null,e.anchor=null,e.kind=null,e.result=null,o=a=s=Z===n||W===n,i&&A(e,!0,-1)&&(g=!0,e.lineIndent>t?h=1:e.lineIndent===t?h=0:e.lineIndent<t&&(h=-1)),1===h)for(;F(e)||N(e);)A(e,!0,-1)?(g=!0,s=o,e.lineIndent>t?h=1:e.lineIndent===t?h=0:e.lineIndent<t&&(h=-1)):s=!1;if(s&&(s=g||r),(1===h||Z===n)&&(p=G===n||V===n?t:t+1,f=e.position-e.lineStart,1===h?s&&(O(e,f)||E(e,f,p))||I(e,p)?y=!0:(a&&S(e,p)||k(e,p)||j(e,p)?y=!0:T(e)?(y=!0,(null!==e.tag||null!==e.anchor)&&d(e,"alias node should not have any properties")):C(e,p,G===n)&&(y=!0,null===e.tag&&(e.tag="?")),null!==e.anchor&&(e.anchorMap[e.anchor]=e.result)):0===h&&(y=s&&O(e,f))),null!==e.tag&&"!"!==e.tag)if("?"===e.tag){for(u=0,c=e.implicitTypes.length;c>u;u+=1)if(l=e.implicitTypes[u],l.resolve(e.result)){e.result=l.construct(e.result),e.tag=l.tag,null!==e.anchor&&(e.anchorMap[e.anchor]=e.result);break}}else H.call(e.typeMap,e.tag)?(l=e.typeMap[e.tag],null!==e.result&&l.kind!==e.kind&&d(e,"unacceptable node kind for !<"+e.tag+'> tag; it should be "'+l.kind+'", not "'+e.kind+'"'),l.resolve(e.result)?(e.result=l.construct(e.result),null!==e.anchor&&(e.anchorMap[e.anchor]=e.result)):d(e,"cannot resolve a node with !<"+e.tag+"> explicit tag")):m(e,"unknown tag !<"+e.tag+">");return null!==e.tag||null!==e.anchor||y}function M(e){var t,n,a,s,u=e.position,c=!1;for(e.version=null,e.checkLineBreaks=e.legacy,e.tagMap={},e.anchorMap={};0!==(s=e.input.charCodeAt(e.position))&&(A(e,!0,-1),s=e.input.charCodeAt(e.position),!(e.lineIndent>0||37!==s));){for(c=!0,s=e.input.charCodeAt(++e.position),t=e.position;0!==s&&!o(s);)s=e.input.charCodeAt(++e.position);for(n=e.input.slice(t,e.position),a=[],n.length<1&&d(e,"directive name must not be less than one character in length");0!==s;){for(;r(s);)s=e.input.charCodeAt(++e.position);if(35===s){do s=e.input.charCodeAt(++e.position);while(0!==s&&!i(s));break}if(i(s))break;for(t=e.position;0!==s&&!o(s);)s=e.input.charCodeAt(++e.position);a.push(e.input.slice(t,e.position))}0!==s&&v(e),H.call(se,n)?se[n](e,n,a):m(e,'unknown document directive "'+n+'"')}return A(e,!0,-1),0===e.lineIndent&&45===e.input.charCodeAt(e.position)&&45===e.input.charCodeAt(e.position+1)&&45===e.input.charCodeAt(e.position+2)?(e.position+=3,A(e,!0,-1)):c&&d(e,"directives end mark is expected"),_(e,e.lineIndent-1,Z,!1,!0),A(e,!0,-1),e.checkLineBreaks&&ee.test(e.input.slice(u,e.position))&&m(e,"non-ASCII line breaks are interpreted as content"),e.documents.push(e.result),e.position===e.lineStart&&b(e)?void(46===e.input.charCodeAt(e.position)&&(e.position+=3,A(e,!0,-1))):void(e.position<e.length-1&&d(e,"end of the stream or a document separator is expected"))}function L(e,t){e=String(e),t=t||{},0!==e.length&&(10!==e.charCodeAt(e.length-1)&&13!==e.charCodeAt(e.length-1)&&(e+="\n"),65279===e.charCodeAt(0)&&(e=e.slice(1)));var n=new f(e,t);for(X.test(n.input)&&d(n,"the stream contains non-printable characters"),n.input+="\x00";32===n.input.charCodeAt(n.position);)n.lineIndent+=1,n.position+=1;for(;n.position<n.length-1;)M(n);return n.documents}function D(e,t,n){var i,r,o=L(e,n);for(i=0,r=o.length;r>i;i+=1)t(o[i])}function U(e,t){var n=L(e,t);if(0===n.length)return void 0;if(1===n.length)return n[0];throw new $("expected a single document in the stream, but found more")}function Y(e,t,n){D(e,t,P.extend({schema:K},n))}function q(e,t){return U(e,P.extend({schema:K},t))}for(var P=e("./common"),$=e("./exception"),B=e("./mark"),K=e("./schema/default_safe"),R=e("./schema/default_full"),H=Object.prototype.hasOwnProperty,G=1,V=2,W=3,Z=4,J=1,z=2,Q=3,X=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,ee=/[\x85\u2028\u2029]/,te=/[,\[\]\{\}]/,ne=/^(?:!|!!|![a-z\-]+!)$/i,ie=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i,re=new Array(256),oe=new Array(256),ae=0;256>ae;ae++)re[ae]=l(ae)?1:0,oe[ae]=l(ae);var se={YAML:function(e,t,n){var i,r,o;null!==e.version&&d(e,"duplication of %YAML directive"),1!==n.length&&d(e,"YAML directive accepts exactly one argument"),i=/^([0-9]+)\.([0-9]+)$/.exec(n[0]),null===i&&d(e,"ill-formed argument of the YAML directive"),r=parseInt(i[1],10),o=parseInt(i[2],10),1!==r&&d(e,"unacceptable YAML version of the document"),e.version=n[0],e.checkLineBreaks=2>o,1!==o&&2!==o&&m(e,"unsupported YAML version of the document")},TAG:function(e,t,n){var i,r;2!==n.length&&d(e,"TAG directive accepts exactly two arguments"),i=n[0],r=n[1],ne.test(i)||d(e,"ill-formed tag handle (first argument) of the TAG directive"),H.call(e.tagMap,i)&&d(e,'there is a previously declared suffix for "'+i+'" tag handle'),ie.test(r)||d(e,"ill-formed tag prefix (second argument) of the TAG directive"),e.tagMap[i]=r}};t.exports.loadAll=D,t.exports.load=U,t.exports.safeLoadAll=Y,t.exports.safeLoad=q},{"./common":2,"./exception":4,"./mark":6,"./schema/default_full":9,"./schema/default_safe":10}],6:[function(e,t,n){"use strict";function i(e,t,n,i,r){this.name=e,this.buffer=t,this.position=n,this.line=i,this.column=r}var r=e("./common");i.prototype.getSnippet=function(e,t){var n,i,o,a,s;if(!this.buffer)return null;for(e=e||4,t=t||75,n="",i=this.position;i>0&&-1==="\x00\r\n\u2028\u2029".indexOf(this.buffer.charAt(i-1));)if(i-=1,this.position-i>t/2-1){n=" ... ",i+=5;break}for(o="",a=this.position;a<this.buffer.length&&-1==="\x00\r\n\u2028\u2029".indexOf(this.buffer.charAt(a));)if(a+=1,a-this.position>t/2-1){o=" ... ",a-=5;break}return s=this.buffer.slice(i,a),r.repeat(" ",e)+n+s+o+"\n"+r.repeat(" ",e+this.position-i+n.length)+"^"},i.prototype.toString=function(e){var t,n="";return this.name&&(n+='in "'+this.name+'" '),n+="at line "+(this.line+1)+", column "+(this.column+1),e||(t=this.getSnippet(),t&&(n+=":\n"+t)),n},t.exports=i},{"./common":2}],7:[function(e,t,n){"use strict";function i(e,t,n){var r=[];return e.include.forEach(function(e){n=i(e,t,n)}),e[t].forEach(function(e){n.forEach(function(t,n){t.tag===e.tag&&r.push(n)}),n.push(e)}),n.filter(function(e,t){return-1===r.indexOf(t)})}function r(){function e(e){i[e.tag]=e}var t,n,i={};for(t=0,n=arguments.length;n>t;t+=1)arguments[t].forEach(e);return i}function o(e){this.include=e.include||[],this.implicit=e.implicit||[],this.explicit=e.explicit||[],this.implicit.forEach(function(e){if(e.loadKind&&"scalar"!==e.loadKind)throw new s("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.")}),this.compiledImplicit=i(this,"implicit",[]),this.compiledExplicit=i(this,"explicit",[]),this.compiledTypeMap=r(this.compiledImplicit,this.compiledExplicit)}var a=e("./common"),s=e("./exception"),u=e("./type");o.DEFAULT=null,o.create=function(){var e,t;switch(arguments.length){case 1:e=o.DEFAULT,t=arguments[0];break;case 2:e=arguments[0],t=arguments[1];break;default:throw new s("Wrong number of arguments for Schema.create function")}if(e=a.toArray(e),t=a.toArray(t),!e.every(function(e){return e instanceof o}))throw new s("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");if(!t.every(function(e){return e instanceof u}))throw new s("Specified list of YAML types (or a single Type object) contains a non-Type object.");return new o({include:e,explicit:t})},t.exports=o},{"./common":2,"./exception":4,"./type":13}],8:[function(e,t,n){"use strict";var i=e("../schema");t.exports=new i({include:[e("./json")]})},{"../schema":7,"./json":12}],9:[function(e,t,n){"use strict";var i=e("../schema");t.exports=i.DEFAULT=new i({include:[e("./default_safe")],explicit:[e("../type/js/undefined"),e("../type/js/regexp"),e("../type/js/function")]})},{"../schema":7,"../type/js/function":18,"../type/js/regexp":19,"../type/js/undefined":20,"./default_safe":10}],10:[function(e,t,n){"use strict";var i=e("../schema");t.exports=new i({include:[e("./core")],implicit:[e("../type/timestamp"),e("../type/merge")],explicit:[e("../type/binary"),e("../type/omap"),e("../type/pairs"),e("../type/set")]})},{"../schema":7,"../type/binary":14,"../type/merge":22,"../type/omap":24,"../type/pairs":25,"../type/set":27,"../type/timestamp":29,"./core":8}],11:[function(e,t,n){"use strict";var i=e("../schema");t.exports=new i({explicit:[e("../type/str"),e("../type/seq"),e("../type/map")]})},{"../schema":7,"../type/map":21,"../type/seq":26,"../type/str":28}],12:[function(e,t,n){"use strict";var i=e("../schema");t.exports=new i({include:[e("./failsafe")],implicit:[e("../type/null"),e("../type/bool"),e("../type/int"),e("../type/float")]})},{"../schema":7,"../type/bool":15,"../type/float":16,"../type/int":17,"../type/null":23,"./failsafe":11}],13:[function(e,t,n){"use strict";function i(e){var t={};return null!==e&&Object.keys(e).forEach(function(n){e[n].forEach(function(e){t[String(e)]=n})}),t}function r(e,t){if(t=t||{},Object.keys(t).forEach(function(t){if(-1===a.indexOf(t))throw new o('Unknown option "'+t+'" is met in definition of "'+e+'" YAML type.')}),this.tag=e,this.kind=t.kind||null,this.resolve=t.resolve||function(){return!0},this.construct=t.construct||function(e){return e},this.instanceOf=t.instanceOf||null,this.predicate=t.predicate||null,this.represent=t.represent||null,this.defaultStyle=t.defaultStyle||null,this.styleAliases=i(t.styleAliases||null),-1===s.indexOf(this.kind))throw new o('Unknown kind "'+this.kind+'" is specified for "'+e+'" YAML type.')}var o=e("./exception"),a=["kind","resolve","construct","instanceOf","predicate","represent","defaultStyle","styleAliases"],s=["scalar","sequence","mapping"];t.exports=r},{"./exception":4}],14:[function(e,t,n){"use strict";function i(e){if(null===e)return!1;var t,n,i=0,r=e.length,o=c;for(n=0;r>n;n++)if(t=o.indexOf(e.charAt(n)),!(t>64)){if(0>t)return!1;i+=6}return i%8===0}function r(e){var t,n,i=e.replace(/[\r\n=]/g,""),r=i.length,o=c,a=0,u=[];for(t=0;r>t;t++)t%4===0&&t&&(u.push(a>>16&255),u.push(a>>8&255),u.push(255&a)),a=a<<6|o.indexOf(i.charAt(t));return n=r%4*6,0===n?(u.push(a>>16&255),u.push(a>>8&255),u.push(255&a)):18===n?(u.push(a>>10&255),u.push(a>>2&255)):12===n&&u.push(a>>4&255),s?new s(u):u}function o(e){var t,n,i="",r=0,o=e.length,a=c;for(t=0;o>t;t++)t%3===0&&t&&(i+=a[r>>18&63],i+=a[r>>12&63],i+=a[r>>6&63],i+=a[63&r]),r=(r<<8)+e[t];return n=o%3,0===n?(i+=a[r>>18&63],i+=a[r>>12&63],i+=a[r>>6&63],i+=a[63&r]):2===n?(i+=a[r>>10&63],i+=a[r>>4&63],i+=a[r<<2&63],i+=a[64]):1===n&&(i+=a[r>>2&63],i+=a[r<<4&63],i+=a[64],i+=a[64]),i}function a(e){return s&&s.isBuffer(e)}var s=e("buffer").Buffer,u=e("../type"),c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";t.exports=new u("tag:yaml.org,2002:binary",{kind:"scalar",resolve:i,construct:r,predicate:a,represent:o})},{"../type":13,buffer:30}],15:[function(e,t,n){"use strict";function i(e){if(null===e)return!1;var t=e.length;return 4===t&&("true"===e||"True"===e||"TRUE"===e)||5===t&&("false"===e||"False"===e||"FALSE"===e);
}function r(e){return"true"===e||"True"===e||"TRUE"===e}function o(e){return"[object Boolean]"===Object.prototype.toString.call(e)}var a=e("../type");t.exports=new a("tag:yaml.org,2002:bool",{kind:"scalar",resolve:i,construct:r,predicate:o,represent:{lowercase:function(e){return e?"true":"false"},uppercase:function(e){return e?"TRUE":"FALSE"},camelcase:function(e){return e?"True":"False"}},defaultStyle:"lowercase"})},{"../type":13}],16:[function(e,t,n){"use strict";function i(e){if(null===e)return!1;return c.test(e)?!0:!1}function r(e){var t,n,i,r;return t=e.replace(/_/g,"").toLowerCase(),n="-"===t[0]?-1:1,r=[],0<="+-".indexOf(t[0])&&(t=t.slice(1)),".inf"===t?1===n?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:".nan"===t?NaN:0<=t.indexOf(":")?(t.split(":").forEach(function(e){r.unshift(parseFloat(e,10))}),t=0,i=1,r.forEach(function(e){t+=e*i,i*=60}),n*t):n*parseFloat(t,10)}function o(e,t){if(isNaN(e))switch(t){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===e)switch(t){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===e)switch(t){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(s.isNegativeZero(e))return"-0.0";return e.toString(10)}function a(e){return"[object Number]"===Object.prototype.toString.call(e)&&(0!==e%1||s.isNegativeZero(e))}var s=e("../common"),u=e("../type"),c=new RegExp("^(?:[-+]?(?:[0-9][0-9_]*)\\.[0-9_]*(?:[eE][-+][0-9]+)?|\\.[0-9_]+(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");t.exports=new u("tag:yaml.org,2002:float",{kind:"scalar",resolve:i,construct:r,predicate:a,represent:o,defaultStyle:"lowercase"})},{"../common":2,"../type":13}],17:[function(e,t,n){"use strict";function i(e){return e>=48&&57>=e||e>=65&&70>=e||e>=97&&102>=e}function r(e){return e>=48&&55>=e}function o(e){return e>=48&&57>=e}function a(e){if(null===e)return!1;var t,n=e.length,a=0,s=!1;if(!n)return!1;if(t=e[a],("-"===t||"+"===t)&&(t=e[++a]),"0"===t){if(a+1===n)return!0;if(t=e[++a],"b"===t){for(a++;n>a;a++)if(t=e[a],"_"!==t){if("0"!==t&&"1"!==t)return!1;s=!0}return s}if("x"===t){for(a++;n>a;a++)if(t=e[a],"_"!==t){if(!i(e.charCodeAt(a)))return!1;s=!0}return s}for(;n>a;a++)if(t=e[a],"_"!==t){if(!r(e.charCodeAt(a)))return!1;s=!0}return s}for(;n>a;a++)if(t=e[a],"_"!==t){if(":"===t)break;if(!o(e.charCodeAt(a)))return!1;s=!0}return s?":"!==t?!0:/^(:[0-5]?[0-9])+$/.test(e.slice(a)):!1}function s(e){var t,n,i=e,r=1,o=[];return-1!==i.indexOf("_")&&(i=i.replace(/_/g,"")),t=i[0],("-"===t||"+"===t)&&("-"===t&&(r=-1),i=i.slice(1),t=i[0]),"0"===i?0:"0"===t?"b"===i[1]?r*parseInt(i.slice(2),2):"x"===i[1]?r*parseInt(i,16):r*parseInt(i,8):-1!==i.indexOf(":")?(i.split(":").forEach(function(e){o.unshift(parseInt(e,10))}),i=0,n=1,o.forEach(function(e){i+=e*n,n*=60}),r*i):r*parseInt(i,10)}function u(e){return"[object Number]"===Object.prototype.toString.call(e)&&0===e%1&&!c.isNegativeZero(e)}var c=e("../common"),l=e("../type");t.exports=new l("tag:yaml.org,2002:int",{kind:"scalar",resolve:a,construct:s,predicate:u,represent:{binary:function(e){return"0b"+e.toString(2)},octal:function(e){return"0"+e.toString(8)},decimal:function(e){return e.toString(10)},hexadecimal:function(e){return"0x"+e.toString(16).toUpperCase()}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}})},{"../common":2,"../type":13}],18:[function(e,t,n){"use strict";function i(e){if(null===e)return!1;try{var t="("+e+")",n=s.parse(t,{range:!0});return"Program"!==n.type||1!==n.body.length||"ExpressionStatement"!==n.body[0].type||"FunctionExpression"!==n.body[0].expression.type?!1:!0}catch(i){return!1}}function r(e){var t,n="("+e+")",i=s.parse(n,{range:!0}),r=[];if("Program"!==i.type||1!==i.body.length||"ExpressionStatement"!==i.body[0].type||"FunctionExpression"!==i.body[0].expression.type)throw new Error("Failed to resolve function");return i.body[0].expression.params.forEach(function(e){r.push(e.name)}),t=i.body[0].expression.body.range,new Function(r,n.slice(t[0]+1,t[1]-1))}function o(e){return e.toString()}function a(e){return"[object Function]"===Object.prototype.toString.call(e)}var s;try{s=e("esprima")}catch(u){"undefined"!=typeof window&&(s=window.esprima)}var c=e("../../type");t.exports=new c("tag:yaml.org,2002:js/function",{kind:"scalar",resolve:i,construct:r,predicate:a,represent:o})},{"../../type":13,esprima:"esprima"}],19:[function(e,t,n){"use strict";function i(e){if(null===e)return!1;if(0===e.length)return!1;var t=e,n=/\/([gim]*)$/.exec(e),i="";if("/"===t[0]){if(n&&(i=n[1]),i.length>3)return!1;if("/"!==t[t.length-i.length-1])return!1;t=t.slice(1,t.length-i.length-1)}try{new RegExp(t,i);return!0}catch(r){return!1}}function r(e){var t=e,n=/\/([gim]*)$/.exec(e),i="";return"/"===t[0]&&(n&&(i=n[1]),t=t.slice(1,t.length-i.length-1)),new RegExp(t,i)}function o(e){var t="/"+e.source+"/";return e.global&&(t+="g"),e.multiline&&(t+="m"),e.ignoreCase&&(t+="i"),t}function a(e){return"[object RegExp]"===Object.prototype.toString.call(e)}var s=e("../../type");t.exports=new s("tag:yaml.org,2002:js/regexp",{kind:"scalar",resolve:i,construct:r,predicate:a,represent:o})},{"../../type":13}],20:[function(e,t,n){"use strict";function i(){return!0}function r(){return void 0}function o(){return""}function a(e){return"undefined"==typeof e}var s=e("../../type");t.exports=new s("tag:yaml.org,2002:js/undefined",{kind:"scalar",resolve:i,construct:r,predicate:a,represent:o})},{"../../type":13}],21:[function(e,t,n){"use strict";var i=e("../type");t.exports=new i("tag:yaml.org,2002:map",{kind:"mapping",construct:function(e){return null!==e?e:{}}})},{"../type":13}],22:[function(e,t,n){"use strict";function i(e){return"<<"===e||null===e}var r=e("../type");t.exports=new r("tag:yaml.org,2002:merge",{kind:"scalar",resolve:i})},{"../type":13}],23:[function(e,t,n){"use strict";function i(e){if(null===e)return!0;var t=e.length;return 1===t&&"~"===e||4===t&&("null"===e||"Null"===e||"NULL"===e)}function r(){return null}function o(e){return null===e}var a=e("../type");t.exports=new a("tag:yaml.org,2002:null",{kind:"scalar",resolve:i,construct:r,predicate:o,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"}},defaultStyle:"lowercase"})},{"../type":13}],24:[function(e,t,n){"use strict";function i(e){if(null===e)return!0;var t,n,i,r,o,u=[],c=e;for(t=0,n=c.length;n>t;t+=1){if(i=c[t],o=!1,"[object Object]"!==s.call(i))return!1;for(r in i)if(a.call(i,r)){if(o)return!1;o=!0}if(!o)return!1;if(-1!==u.indexOf(r))return!1;u.push(r)}return!0}function r(e){return null!==e?e:[]}var o=e("../type"),a=Object.prototype.hasOwnProperty,s=Object.prototype.toString;t.exports=new o("tag:yaml.org,2002:omap",{kind:"sequence",resolve:i,construct:r})},{"../type":13}],25:[function(e,t,n){"use strict";function i(e){if(null===e)return!0;var t,n,i,r,o,s=e;for(o=new Array(s.length),t=0,n=s.length;n>t;t+=1){if(i=s[t],"[object Object]"!==a.call(i))return!1;if(r=Object.keys(i),1!==r.length)return!1;o[t]=[r[0],i[r[0]]]}return!0}function r(e){if(null===e)return[];var t,n,i,r,o,a=e;for(o=new Array(a.length),t=0,n=a.length;n>t;t+=1)i=a[t],r=Object.keys(i),o[t]=[r[0],i[r[0]]];return o}var o=e("../type"),a=Object.prototype.toString;t.exports=new o("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:i,construct:r})},{"../type":13}],26:[function(e,t,n){"use strict";var i=e("../type");t.exports=new i("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(e){return null!==e?e:[]}})},{"../type":13}],27:[function(e,t,n){"use strict";function i(e){if(null===e)return!0;var t,n=e;for(t in n)if(a.call(n,t)&&null!==n[t])return!1;return!0}function r(e){return null!==e?e:{}}var o=e("../type"),a=Object.prototype.hasOwnProperty;t.exports=new o("tag:yaml.org,2002:set",{kind:"mapping",resolve:i,construct:r})},{"../type":13}],28:[function(e,t,n){"use strict";var i=e("../type");t.exports=new i("tag:yaml.org,2002:str",{kind:"scalar",construct:function(e){return null!==e?e:""}})},{"../type":13}],29:[function(e,t,n){"use strict";function i(e){if(null===e)return!1;var t;return t=s.exec(e),null===t?!1:!0}function r(e){var t,n,i,r,o,a,u,c,l,p,f=0,h=null;if(t=s.exec(e),null===t)throw new Error("Date resolve error");if(n=+t[1],i=+t[2]-1,r=+t[3],!t[4])return new Date(Date.UTC(n,i,r));if(o=+t[4],a=+t[5],u=+t[6],t[7]){for(f=t[7].slice(0,3);f.length<3;)f+="0";f=+f}return t[9]&&(c=+t[10],l=+(t[11]||0),h=6e4*(60*c+l),"-"===t[9]&&(h=-h)),p=new Date(Date.UTC(n,i,r,o,a,u,f)),h&&p.setTime(p.getTime()-h),p}function o(e){return e.toISOString()}var a=e("../type"),s=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?)?$");t.exports=new a("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:i,construct:r,instanceOf:Date,represent:o})},{"../type":13}],30:[function(e,t,n){},{}],"/":[function(e,t,n){"use strict";var i=e("./lib/js-yaml.js");t.exports=i},{"./lib/js-yaml.js":1}]},{},[])("/")});
/* jshint ignore:end */

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _landingLandingModule = require('./landing/landing.module');

var LandingModule = _interopRequireWildcard(_landingLandingModule);

var _sessionSessionModule = require('./session/session.module');

var SessionModule = _interopRequireWildcard(_sessionSessionModule);

var _favmoduleFavmoduleModule = require('./favmodule/favmodule.module');

var FavModule = _interopRequireWildcard(_favmoduleFavmoduleModule);

var _registryRegistryModule = require('./registry/registry.module');

var RegistryModule = _interopRequireWildcard(_registryRegistryModule);

var _mystacksMystacksModule = require('./mystacks/mystacks.module');

var MyStacksModule = _interopRequireWildcard(_mystacksMystacksModule);

var _favoritesFavoritesModule = require('./favorites/favorites.module');

var FavoritesModule = _interopRequireWildcard(_favoritesFavoritesModule);

angular.module('stackfiles', ['ui.router', 'infinite-scroll', 'localytics.directives', 'zeroclipboard']).factory('landingFactory', LandingModule.svc).controller('landingController', LandingModule.ctrl).factory('sessionFactory', SessionModule.svc).controller('sessionController', SessionModule.ctrl).factory('favFactory', FavModule.svc).controller('favController', FavModule.ctrl).factory('registryLoader', RegistryModule.loader).factory('registryFactory', RegistryModule.svc).controller('registryController', RegistryModule.ctrl).factory('mystacksFactory', MyStacksModule.svc).controller('mystacksController', MyStacksModule.ctrl).factory('favoritesFactory', FavoritesModule.svc).controller('favoritesController', FavoritesModule.ctrl).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise("/404");

    $stateProvider.state('landing', {
        url: '/',
        views: {
            full: {
                templateUrl: 'partials/landingpage.html',
                controller: 'landingController'
            }
        }
    }).state('registry', {
        url: '/registry',
        views: {
            top: {
                templateUrl: 'partials/top-bar.html'
            },
            side: {
                templateUrl: 'partials/side-menu.html'
            },
            content: {
                templateUrl: 'partials/registry.html'
            }
        }
    }).state('mystacks', {
        url: '/mystacks',
        views: {
            top: {
                templateUrl: 'partials/top-bar.html'
            },
            side: {
                templateUrl: 'partials/side-menu.html'
            },
            content: {
                templateUrl: 'partials/mystacks.html'
            }
        }
    }).state('favorites', {
        url: '/favorites',
        views: {
            top: {
                templateUrl: 'partials/top-bar.html'
            },
            side: {
                templateUrl: 'partials/side-menu.html'
            },
            content: {
                templateUrl: 'partials/favorites.html'
            }
        }
    }).state('create', {
        url: '/create',
        views: {
            top: {
                templateUrl: 'partials/top-bar.html'
            },
            side: {
                templateUrl: 'partials/side-menu.html'
            },
            content: {
                templateUrl: 'partials/create.html'
            }
        }
    }).state('404', {
        url: '/404',
        views: {
            full: {
                templateUrl: 'partials/404.html'
            }
        }
    });
}]).directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
}).directive('modal', function () {
    return {
        template: '<div class="modal fade">' + '<div class="modal-dialog">' + '<div class="modal-content">' + '<div class="modal-header">' + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + '<h4 class="modal-title">{{ title }}</h4>' + '</div>' + '<div class="modal-body" ng-transclude></div>' + '</div>' + '</div>' + '</div>',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;
            scope.$watch(attrs.visible, function (value) {
                if (value === true) $(element).modal('show');else $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
}).directive('autofocus', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function link($scope, $element) {
            $timeout(function () {
                $element[0].focus();
            });
        }
    };
}]).directive('fav', function () {
    return {
        template: '<svg ng-click="toggle()" ng-class="{\'btn-off\':!isSelected, \'btn-on\':isSelected,}" class="star"  width="24px" height="24px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">' + '<g id="Stackfiles.io" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">' + '<g id="-star" sketch:type="MSArtboardGroup" fill="#f1f1f1">' + '<g id="star" sketch:type="MSLayerGroup" transform="translate(4.000000, 4.000000)">' + '<path d="M40,14.48 L25.62,13.24 L20,0 L14.38,13.26 L0,14.48 L10.92,23.94 L7.64,38 L20,30.54 L32.36,38 L29.1,23.94 L40,14.48 L40,14.48 Z M20,26.8 L12.48,31.34 L14.48,22.78 L7.84,17.02 L16.6,16.26 L20,8.2 L23.42,16.28 L32.18,17.04 L25.54,22.8 L27.54,31.36 L20,26.8 L20,26.8 Z" id="Shape" sketch:type="MSShapeGroup"></path>' + '</g>' + '</g>' + '</g>' + '</svg>',
        restrict: 'E',
        scope: {
            fid: '@',
            isSelected: '=',
            onSelect: '&'
        },
        link: function link(scope, element, attributes) {
            scope.isSelected = false;
            scope.toggle = function () {
                scope.isSelected = !scope.isSelected;
                scope.onSelect()(scope.fid, scope.isSelected);
            };
        }
    };
});

},{"./favmodule/favmodule.module":3,"./favorites/favorites.module":6,"./landing/landing.module":9,"./mystacks/mystacks.module":12,"./registry/registry.module":16,"./session/session.module":19}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var FavController = (function () {
  function FavController($scope, $rootScope, favFactory) {
    _classCallCheck(this, FavController);

    this.favFactory = favFactory;
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.init();
    this.$scope.favoriteList = [];
  }

  _createClass(FavController, [{
    key: 'init',
    value: function init() {
      var _this = this;

      if (this.$rootScope.logged) {
        this.$scope.user = this.$rootScope.user;
        this.$scope.logged = this.$rootScope.logged;
        this.favFactory.checkFav().then(function (favorites) {
          _this.$scope.favoriteList = favorites.data;
        });
      }
    }
  }, {
    key: 'increment',
    value: function increment(file) {
      if (this.$rootScope.logged) {
        file.stars = file.stars + 1;
      }
    }
  }, {
    key: 'toggleStatus',
    value: function toggleStatus(file) {
      var _this2 = this;

      this.favFactory.favFile(file._id).then(function () {
        if (_this2.$rootScope.logged) {
          _this2.$scope.favoriteList.push(file._id);
        }
      });
    }
  }, {
    key: 'unToggleStatus',
    value: function unToggleStatus(file) {
      var _this3 = this;

      this.favFactory.unFavFile(file._id).then(function () {
        if (_this3.$scope.logged) {
          var index = _this3.$scope.favoriteList.indexOf(file._id);
          _this3.$scope.favoriteList.splice(index, 1);
        }
      });
    }
  }, {
    key: 'isSelected',
    value: function isSelected(file) {
      return this.$scope.favoriteList.indexOf(file._id) > -1;
    }
  }]);

  return FavController;
})();

FavController.$inject = ['$scope', '$rootScope', 'favFactory'];

exports.FavController = FavController;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _favmoduleCtrl = require('./favmodule.ctrl');

var _favmoduleSvc = require('./favmodule.svc');

var ctrl = _favmoduleCtrl.FavController;
var svc = _favmoduleSvc.FavService.factory;

exports.ctrl = ctrl;
exports.svc = svc;

},{"./favmodule.ctrl":2,"./favmodule.svc":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var FavService = (function () {
  function FavService($http) {
    _classCallCheck(this, FavService);

    this.$http = $http;
  }

  _createClass(FavService, [{
    key: 'checkFav',
    value: function checkFav() {
      return this.$http.get('/api/v1/user/fav', {
        method: 'GET'
      });
    }
  }, {
    key: 'favFile',
    value: function favFile(id) {
      return this.$http.get('/api/v1/files/fav/' + id, {
        method: 'GET'
      }).then(function (r) {
        return r.data;
      });
    }
  }, {
    key: 'unFavFile',
    value: function unFavFile(id) {
      return this.$http.get('/api/v1/files/unfav/' + id, {
        method: 'GET'
      }).then(function (r) {
        return r.data;
      });
    }
  }], [{
    key: 'factory',
    value: function factory($http) {
      return new FavService($http);
    }
  }]);

  return FavService;
})();

FavService.factory.$inject = ['$http'];

exports.FavService = FavService;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var FavoriteController = (function () {
  function FavoriteController($scope, $rootScope, favoritesFactory) {
    _classCallCheck(this, FavoriteController);

    this.favoritesFactory = favoritesFactory;
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.init();
  }

  _createClass(FavoriteController, [{
    key: 'init',
    value: function init() {
      var _this = this;

      this.favoritesFactory.getUserFavorites().then(function (data) {
        _this.files = data;
        _this.$scope.loaded = true;
      });
    }
  }, {
    key: 'toggleModal',
    value: function toggleModal() {
      this.$scope.copyText = { status: 'notClicked' };
      this.$scope.showModal = !this.$scope.showModal;
    }
  }, {
    key: 'generateEmbed',
    value: function generateEmbed(id) {
      this.$scope.embedScript = '<script src="' + window.location.protocol + '//' + window.location.hostname + '/embed/file/' + id + '.js"></script>';
    }
  }, {
    key: 'deploy',
    value: function deploy(id) {
      window.location.href = '/api/v1/deploy/' + id;
    }
  }, {
    key: 'removeRow',
    value: function removeRow(file) {
      var index = -1;
      for (var i = 0; i < this.files.length; i++) {
        if (this.files[i]._id === file._id) {
          index = i;
          break;
        }
      }
      this.files.splice(index, 1);
    }
  }, {
    key: 'searchFile',
    value: function searchFile() {
      var _this2 = this;

      var term = this.data.search;
      this.favoritesFactory.searchFile(term).then(function (results) {
        _this2.results = results;
      });
    }
  }]);

  return FavoriteController;
})();

FavoriteController.$inject = ['$scope', '$rootScope', 'favoritesFactory'];

exports.FavoriteController = FavoriteController;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _favoritesCtrl = require('./favorites.ctrl');

var _favoritesSvc = require('./favorites.svc');

var ctrl = _favoritesCtrl.FavoriteController;
var svc = _favoritesSvc.FavoriteService.factory;

exports.ctrl = ctrl;
exports.svc = svc;

},{"./favorites.ctrl":5,"./favorites.svc":7}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var FavoriteService = (function () {
  function FavoriteService($http) {
    _classCallCheck(this, FavoriteService);

    this.$http = $http;
  }

  _createClass(FavoriteService, [{
    key: 'getUserFavorites',
    value: function getUserFavorites() {
      return this.$http.get('/api/v1/user/favorites', {
        method: 'GET'
      }).then(function (r) {
        return r.data;
      });
    }
  }, {
    key: 'searchFile',
    value: function searchFile(term) {
      return this.$http.get('/api/v1/search', {
        method: 'GET',
        params: {
          term: term
        }
      }).then(function (r) {
        return r.data;
      });
    }
  }], [{
    key: 'factory',
    value: function factory($http) {
      return new FavoriteService($http);
    }
  }]);

  return FavoriteService;
})();

FavoriteService.factory.$inject = ['$http'];

exports.FavoriteService = FavoriteService;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MainController = (function () {
  function MainController(landingFactory) {
    _classCallCheck(this, MainController);

    this.landingFactory = landingFactory;
  }

  _createClass(MainController, [{
    key: 'signin',
    value: function signin(page) {
      this.landingFactory.signin(page);
    }
  }]);

  return MainController;
})();

MainController.$inject = ['landingFactory'];

exports.MainController = MainController;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _landingCtrl = require('./landing.ctrl');

var _landingSvc = require('./landing.svc');

var ctrl = _landingCtrl.MainController;
var svc = _landingSvc.MainService.factory;

exports.ctrl = ctrl;
exports.svc = svc;

},{"./landing.ctrl":8,"./landing.svc":10}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MainService = (function () {
  function MainService($window) {
    _classCallCheck(this, MainService);

    this.$window = $window;
  }

  _createClass(MainService, [{
    key: 'signin',
    value: function signin(page) {
      this.$window.location.href = '/auth/github?redirect=' + page;
    }
  }], [{
    key: 'factory',
    value: function factory($window) {
      return new MainService($window);
    }
  }]);

  return MainService;
})();

MainService.factory.$inject = ['$window'];

exports.MainService = MainService;

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MyStackController = (function () {
  function MyStackController($scope, mystacksFactory) {
    _classCallCheck(this, MyStackController);

    this.mystacksFactory = mystacksFactory;
    this.$scope = $scope;
    this.init();
  }

  _createClass(MyStackController, [{
    key: 'init',
    value: function init() {
      var _this = this;

      this.mystacksFactory.getUserFiles().then(function (data) {
        _this.files = data;
        _this.$scope.loaded = true;
      });
    }
  }, {
    key: 'toggleModal',
    value: function toggleModal() {
      this.$scope.copyText = { status: 'notClicked' };
      this.$scope.showModal = !this.$scope.showModal;
    }
  }, {
    key: 'generateEmbed',
    value: function generateEmbed(id) {
      this.$scope.embedScript = '<script src="' + window.location.protocol + '//' + window.location.hostname + '/embed/file/' + id + '.js"></script>';
    }
  }, {
    key: 'deploy',
    value: function deploy(id) {
      window.location.href = '/api/v1/deploy/' + id;
    }
  }, {
    key: 'searchFile',
    value: function searchFile() {
      var _this2 = this;

      var term = this.data.search;
      this.mystacksFactory.searchFile(term).then(function (results) {
        _this2.results = results;
      });
    }
  }]);

  return MyStackController;
})();

MyStackController.$inject = ['$scope', 'mystacksFactory'];

exports.MyStackController = MyStackController;

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _mystacksCtrl = require('./mystacks.ctrl');

var _mystacksSvc = require('./mystacks.svc');

var ctrl = _mystacksCtrl.MyStackController;
var svc = _mystacksSvc.MyStackService.factory;

exports.ctrl = ctrl;
exports.svc = svc;

},{"./mystacks.ctrl":11,"./mystacks.svc":13}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MyStackService = (function () {
  function MyStackService($http) {
    _classCallCheck(this, MyStackService);

    this.$http = $http;
  }

  _createClass(MyStackService, [{
    key: 'getUserFiles',
    value: function getUserFiles() {
      return this.$http.get('/api/v1/user/files', {
        method: 'GET'
      }).then(function (r) {
        return r.data;
      });
    }
  }, {
    key: 'searchFile',
    value: function searchFile(term) {
      return this.$http.get('/api/v1/search', {
        method: 'GET',
        params: {
          term: term
        }
      }).then(function (r) {
        return r.data;
      });
    }
  }], [{
    key: 'factory',
    value: function factory($http) {
      return new MyStackService($http);
    }
  }]);

  return MyStackService;
})();

MyStackService.factory.$inject = ['$http'];

exports.MyStackService = MyStackService;

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Loader = (function () {
  function Loader(registryFactory) {
    _classCallCheck(this, Loader);

    this.registryFactory = registryFactory;
    this.items = [];
    this.busy = false;
    this.after = 1;
  }

  _createClass(Loader, [{
    key: 'nextPage',
    value: function nextPage() {
      if (this.busy) return;
      this.busy = true;
      var self = this;

      return this.registryFactory.getFiles(this.after).then(function (files) {
        var list = files;
        if (list.length === 0) {
          self.busy = true;
          return;
        } else {
          for (var i = 0; i < list.length; i++) {
            self.items.push(list[i]);
          }
          self.after = self.after + 1;
          self.busy = false;
        }
      });
    }
  }], [{
    key: 'factory',
    value: function factory(registryFactory) {
      return new Loader(registryFactory);
    }
  }]);

  return Loader;
})();

Loader.$inject = ['registryFactory'];

exports.Loader = Loader;

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var RegistryController = (function () {
  function RegistryController($scope, $rootScope, $window, registryFactory, registryLoader) {
    _classCallCheck(this, RegistryController);

    this.registryFactory = registryFactory;
    this.registryLoader = registryLoader;
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$window = $window;
    this.init();
  }

  _createClass(RegistryController, [{
    key: 'init',
    value: function init() {
      this.files = this.registryLoader;
      this.$scope.loaded = true;
    }
  }, {
    key: 'toggleModal',
    value: function toggleModal() {
      this.$scope.copyText = { status: 'notClicked' };
      this.$scope.showModal = !this.$scope.showModal;
    }
  }, {
    key: 'generateEmbed',
    value: function generateEmbed(id) {
      this.$scope.embedScript = '<script src="' + window.location.protocol + '//' + window.location.hostname + '/embed/file/' + id + '.js"></script>';
    }
  }, {
    key: 'deploy',
    value: function deploy(id) {
      window.location.href = '/api/v1/deploy/' + id;
    }
  }, {
    key: 'searchFile',
    value: function searchFile() {
      var _this = this;

      var term = this.data.search;
      this.registryFactory.searchFile(term).then(function (results) {
        _this.results = results;
      });
    }
  }, {
    key: 'checkSearch',
    value: function checkSearch() {
      var _this2 = this;

      if (this.$window.localStorage.search !== undefined) {
        this.$scope.data = { search: this.$window.localStorage.search };
        this.registryFactory.searchFile(this.$window.localStorage.search).then(function (results) {
          _this2.results = results;
        });
        this.$window.localStorage.clear();
      }
    }
  }]);

  return RegistryController;
})();

RegistryController.$inject = ['$scope', '$rootScope', '$window', 'registryFactory', 'registryLoader'];

exports.RegistryController = RegistryController;

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _registryCtrl = require('./registry.ctrl');

var _registrySvc = require('./registry.svc');

var _registryLoader = require('./registry-loader');

var ctrl = _registryCtrl.RegistryController;
var svc = _registrySvc.RegistryService.factory;
var loader = _registryLoader.Loader.factory;

exports.ctrl = ctrl;
exports.svc = svc;
exports.loader = loader;

},{"./registry-loader":14,"./registry.ctrl":15,"./registry.svc":17}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var RegistryService = (function () {
  function RegistryService($http) {
    _classCallCheck(this, RegistryService);

    this.$http = $http;
  }

  _createClass(RegistryService, [{
    key: 'getFiles',
    value: function getFiles(page) {
      return this.$http.get('/api/v1/files/', {
        method: 'GET',
        params: {
          page: page,
          limit: 5
        }
      }).then(function (r) {
        return r.data;
      });
    }
  }, {
    key: 'searchFile',
    value: function searchFile(term) {
      return this.$http.get('/api/v1/search', {
        method: 'GET',
        params: {
          term: term
        }
      }).then(function (r) {
        return r.data;
      });
    }
  }], [{
    key: 'factory',
    value: function factory($http) {
      return new RegistryService($http);
    }
  }]);

  return RegistryService;
})();

RegistryService.factory.$inject = ['$http'];

exports.RegistryService = RegistryService;

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SessionController = (function () {
  function SessionController($scope, $rootScope, $state, $location, $window, sessionFactory) {
    _classCallCheck(this, SessionController);

    this.sessionFactory = sessionFactory;
    this.init();
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$location = $location;
    this.$window = $window;
  }

  _createClass(SessionController, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.sessionFactory.getUser().then(function (data, status, headers, config) {
        _this.$rootScope.logged = true;
        _this.$rootScope.user = data.username;
        _this.$scope.logged = true;
        _this.$scope.user = data.username;
        _this.$scope.photo = data._json.avatar_url;
      });
    }
  }, {
    key: "signin",
    value: function signin(page) {
      this.sessionFactory.signin(page);
    }
  }, {
    key: "logout",
    value: function logout() {
      var _this2 = this;

      this.sessionFactory.logout().then(function (data, status, headers, config) {
        _this2.$state.transitionTo(_this2.$state.current, {}, {
          reload: true,
          inherit: false,
          notify: true
        });
        _this2.$window.location.reload();
      });
    }
  }, {
    key: "getClass",
    value: function getClass(path) {
      if (this.$location.path().substr(0, path.length) == path) {
        return "selected";
      } else {
        return "";
      }
    }
  }]);

  return SessionController;
})();

SessionController.$inject = ['$scope', '$rootScope', '$state', '$location', '$window', 'sessionFactory'];

exports.SessionController = SessionController;

},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _sessionCtrl = require('./session.ctrl');

var _sessionSvc = require('./session.svc');

var ctrl = _sessionCtrl.SessionController;
var svc = _sessionSvc.SessionService.factory;

exports.ctrl = ctrl;
exports.svc = svc;

},{"./session.ctrl":18,"./session.svc":20}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var SessionService = (function () {
  function SessionService($http, $window) {
    _classCallCheck(this, SessionService);

    this.$http = $http;
    this.$window = $window;
  }

  _createClass(SessionService, [{
    key: 'signin',
    value: function signin(page) {
      this.$window.location.href = '/auth/github?redirect=' + page;
    }
  }, {
    key: 'getUser',
    value: function getUser() {
      return this.$http.get('/api/v1/user', {
        method: 'GET'
      }).then(function (r) {
        return r.data;
      });
    }
  }, {
    key: 'logout',
    value: function logout() {
      return this.$http.get('/auth/logout', {
        method: 'GET'
      }).then(function (r) {
        return r.data;
      });
    }
  }], [{
    key: 'factory',
    value: function factory($http, $window) {
      return new SessionService($http, $window);
    }
  }]);

  return SessionService;
})();

SessionService.factory.$inject = ['$http', '$window'];

exports.SessionService = SessionService;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9hcHAuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9mYXZtb2R1bGUvZmF2bW9kdWxlLmN0cmwuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9mYXZtb2R1bGUvZmF2bW9kdWxlLm1vZHVsZS5qcyIsIi9Vc2Vycy9tYXhpbWVoZWNrZWwvRG9jdW1lbnRzL1Byb2plY3RzL0NvbXBvc2VSZWdpc3RyeS9zcmMvYXBwL2Zhdm1vZHVsZS9mYXZtb2R1bGUuc3ZjLmpzIiwiL1VzZXJzL21heGltZWhlY2tlbC9Eb2N1bWVudHMvUHJvamVjdHMvQ29tcG9zZVJlZ2lzdHJ5L3NyYy9hcHAvZmF2b3JpdGVzL2Zhdm9yaXRlcy5jdHJsLmpzIiwiL1VzZXJzL21heGltZWhlY2tlbC9Eb2N1bWVudHMvUHJvamVjdHMvQ29tcG9zZVJlZ2lzdHJ5L3NyYy9hcHAvZmF2b3JpdGVzL2Zhdm9yaXRlcy5tb2R1bGUuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9mYXZvcml0ZXMvZmF2b3JpdGVzLnN2Yy5qcyIsIi9Vc2Vycy9tYXhpbWVoZWNrZWwvRG9jdW1lbnRzL1Byb2plY3RzL0NvbXBvc2VSZWdpc3RyeS9zcmMvYXBwL2xhbmRpbmcvbGFuZGluZy5jdHJsLmpzIiwiL1VzZXJzL21heGltZWhlY2tlbC9Eb2N1bWVudHMvUHJvamVjdHMvQ29tcG9zZVJlZ2lzdHJ5L3NyYy9hcHAvbGFuZGluZy9sYW5kaW5nLm1vZHVsZS5qcyIsIi9Vc2Vycy9tYXhpbWVoZWNrZWwvRG9jdW1lbnRzL1Byb2plY3RzL0NvbXBvc2VSZWdpc3RyeS9zcmMvYXBwL2xhbmRpbmcvbGFuZGluZy5zdmMuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9teXN0YWNrcy9teXN0YWNrcy5jdHJsLmpzIiwiL1VzZXJzL21heGltZWhlY2tlbC9Eb2N1bWVudHMvUHJvamVjdHMvQ29tcG9zZVJlZ2lzdHJ5L3NyYy9hcHAvbXlzdGFja3MvbXlzdGFja3MubW9kdWxlLmpzIiwiL1VzZXJzL21heGltZWhlY2tlbC9Eb2N1bWVudHMvUHJvamVjdHMvQ29tcG9zZVJlZ2lzdHJ5L3NyYy9hcHAvbXlzdGFja3MvbXlzdGFja3Muc3ZjLmpzIiwiL1VzZXJzL21heGltZWhlY2tlbC9Eb2N1bWVudHMvUHJvamVjdHMvQ29tcG9zZVJlZ2lzdHJ5L3NyYy9hcHAvcmVnaXN0cnkvcmVnaXN0cnktbG9hZGVyLmpzIiwiL1VzZXJzL21heGltZWhlY2tlbC9Eb2N1bWVudHMvUHJvamVjdHMvQ29tcG9zZVJlZ2lzdHJ5L3NyYy9hcHAvcmVnaXN0cnkvcmVnaXN0cnkuY3RybC5qcyIsIi9Vc2Vycy9tYXhpbWVoZWNrZWwvRG9jdW1lbnRzL1Byb2plY3RzL0NvbXBvc2VSZWdpc3RyeS9zcmMvYXBwL3JlZ2lzdHJ5L3JlZ2lzdHJ5Lm1vZHVsZS5qcyIsIi9Vc2Vycy9tYXhpbWVoZWNrZWwvRG9jdW1lbnRzL1Byb2plY3RzL0NvbXBvc2VSZWdpc3RyeS9zcmMvYXBwL3JlZ2lzdHJ5L3JlZ2lzdHJ5LnN2Yy5qcyIsIi9Vc2Vycy9tYXhpbWVoZWNrZWwvRG9jdW1lbnRzL1Byb2plY3RzL0NvbXBvc2VSZWdpc3RyeS9zcmMvYXBwL3Nlc3Npb24vc2Vzc2lvbi5jdHJsLmpzIiwiL1VzZXJzL21heGltZWhlY2tlbC9Eb2N1bWVudHMvUHJvamVjdHMvQ29tcG9zZVJlZ2lzdHJ5L3NyYy9hcHAvc2Vzc2lvbi9zZXNzaW9uLm1vZHVsZS5qcyIsIi9Vc2Vycy9tYXhpbWVoZWNrZWwvRG9jdW1lbnRzL1Byb2plY3RzL0NvbXBvc2VSZWdpc3RyeS9zcmMvYXBwL3Nlc3Npb24vc2Vzc2lvbi5zdmMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O29DQ0ErQiwwQkFBMEI7O0lBQTdDLGFBQWE7O29DQUNNLDBCQUEwQjs7SUFBN0MsYUFBYTs7d0NBQ0UsOEJBQThCOztJQUE3QyxTQUFTOztzQ0FDVyw0QkFBNEI7O0lBQWhELGNBQWM7O3NDQUNNLDRCQUE0Qjs7SUFBaEQsY0FBYzs7d0NBQ08sOEJBQThCOztJQUFuRCxlQUFlOztBQUUzQixPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLFdBQVcsRUFBQyxpQkFBaUIsRUFBQyx1QkFBdUIsRUFBQyxlQUFlLENBQUMsQ0FBQyxDQUVwRyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUM1QyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUVuRCxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUM1QyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUVuRCxPQUFPLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FDcEMsVUFBVSxDQUFDLGVBQWUsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLENBRTNDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQ2hELE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLENBQzlDLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBRXJELE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLENBQzlDLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFD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LFFBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0dBQ3hCOztlQUpHLGNBQWM7O1dBTVosZ0JBQUMsSUFBSSxFQUFDO0FBQ1YsVUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFJLHdCQUF3QixHQUFHLElBQUksQUFBQyxDQUFDO0tBQ2hFOzs7V0FFTSxtQkFBRTtBQUNQLGFBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFO0FBQ3BDLGNBQU0sRUFBRSxLQUFLO09BQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUM7ZUFBSSxDQUFDLENBQUMsSUFBSTtPQUFBLENBQUMsQ0FBQztLQUN0Qjs7O1dBRUssa0JBQUU7QUFDTixhQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRTtBQUNwQyxjQUFNLEVBQUUsS0FBSztPQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDO2VBQUksQ0FBQyxDQUFDLElBQUk7T0FBQSxDQUFDLENBQUM7S0FDdEI7OztXQUVhLGlCQUFDLEtBQUssRUFBRSxPQUFPLEVBQUM7QUFDNUIsYUFBTyxJQUFJLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDM0M7OztTQXhCRyxjQUFjOzs7QUE0QnBCLGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDOztRQUU3QyxjQUFjLEdBQWQsY0FBYyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgKiBhcyBMYW5kaW5nTW9kdWxlIGZyb20gJy4vbGFuZGluZy9sYW5kaW5nLm1vZHVsZSc7XG5pbXBvcnQgKiBhcyBTZXNzaW9uTW9kdWxlIGZyb20gJy4vc2Vzc2lvbi9zZXNzaW9uLm1vZHVsZSc7XG5pbXBvcnQgKiBhcyBGYXZNb2R1bGUgZnJvbSAnLi9mYXZtb2R1bGUvZmF2bW9kdWxlLm1vZHVsZSc7XG5pbXBvcnQgKiBhcyBSZWdpc3RyeU1vZHVsZSBmcm9tICcuL3JlZ2lzdHJ5L3JlZ2lzdHJ5Lm1vZHVsZSc7XG5pbXBvcnQgKiBhcyBNeVN0YWNrc01vZHVsZSBmcm9tICcuL215c3RhY2tzL215c3RhY2tzLm1vZHVsZSc7XG5pbXBvcnQgKiBhcyBGYXZvcml0ZXNNb2R1bGUgZnJvbSAnLi9mYXZvcml0ZXMvZmF2b3JpdGVzLm1vZHVsZSc7XG5cbmFuZ3VsYXIubW9kdWxlKCdzdGFja2ZpbGVzJywgWyd1aS5yb3V0ZXInLCdpbmZpbml0ZS1zY3JvbGwnLCdsb2NhbHl0aWNzLmRpcmVjdGl2ZXMnLCd6ZXJvY2xpcGJvYXJkJ10pXG5cbi5mYWN0b3J5KCdsYW5kaW5nRmFjdG9yeScsIExhbmRpbmdNb2R1bGUuc3ZjKVxuLmNvbnRyb2xsZXIoJ2xhbmRpbmdDb250cm9sbGVyJywgTGFuZGluZ01vZHVsZS5jdHJsKVxuXG4uZmFjdG9yeSgnc2Vzc2lvbkZhY3RvcnknLCBTZXNzaW9uTW9kdWxlLnN2Yylcbi5jb250cm9sbGVyKCdzZXNzaW9uQ29udHJvbGxlcicsIFNlc3Npb25Nb2R1bGUuY3RybClcblxuLmZhY3RvcnkoJ2ZhdkZhY3RvcnknLCBGYXZNb2R1bGUuc3ZjKVxuLmNvbnRyb2xsZXIoJ2ZhdkNvbnRyb2xsZXInLCBGYXZNb2R1bGUuY3RybClcblxuLmZhY3RvcnkoJ3JlZ2lzdHJ5TG9hZGVyJywgUmVnaXN0cnlNb2R1bGUubG9hZGVyKVxuLmZhY3RvcnkoJ3JlZ2lzdHJ5RmFjdG9yeScsIFJlZ2lzdHJ5TW9kdWxlLnN2Yylcbi5jb250cm9sbGVyKCdyZWdpc3RyeUNvbnRyb2xsZXInLCBSZWdpc3RyeU1vZHVsZS5jdHJsKVxuXG4uZmFjdG9yeSgnbXlzdGFja3NGYWN0b3J5JywgTXlTdGFja3NNb2R1bGUuc3ZjKVxuLmNvbnRyb2xsZXIoJ215c3RhY2tzQ29udHJvbGxlcicsIE15U3RhY2tzTW9kdWxlLmN0cmwpXG5cbi5mYWN0b3J5KCdmYXZvcml0ZXNGYWN0b3J5JywgRmF2b3JpdGVzTW9kdWxlLnN2Yylcbi5jb250cm9sbGVyKCdmYXZvcml0ZXNDb250cm9sbGVyJywgRmF2b3JpdGVzTW9kdWxlLmN0cmwpXG5cbi5jb25maWcoW1wiJHN0YXRlUHJvdmlkZXJcIiwgXCIkdXJsUm91dGVyUHJvdmlkZXJcIiwgKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpID0+IHtcblxuICAgICR1cmxSb3V0ZXJQcm92aWRlci53aGVuKCcnLCAnLycpO1xuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoXCIvNDA0XCIpO1xuXG4gICAgJHN0YXRlUHJvdmlkZXIuXG4gICAgICBzdGF0ZSgnbGFuZGluZycsIHtcbiAgICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgZnVsbDoge1xuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL2xhbmRpbmdwYWdlLmh0bWwnLFxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbGFuZGluZ0NvbnRyb2xsZXInXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfSkuXG4gICAgICBzdGF0ZSgncmVnaXN0cnknLCB7XG4gICAgICAgIHVybDogJy9yZWdpc3RyeScsXG4gICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgdG9wOiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL3RvcC1iYXIuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNpZGU6IHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvc2lkZS1tZW51Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb250ZW50OiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL3JlZ2lzdHJ5Lmh0bWwnXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KS5cbiAgICAgIHN0YXRlKCdteXN0YWNrcycsIHtcbiAgICAgICAgdXJsOicvbXlzdGFja3MnLFxuICAgICAgICB2aWV3czoge1xuICAgICAgICAgIHRvcDoge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy90b3AtYmFyLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzaWRlOiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL3NpZGUtbWVudS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgY29udGVudDoge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9teXN0YWNrcy5odG1sJyxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pLlxuICAgICAgc3RhdGUoJ2Zhdm9yaXRlcycsIHtcbiAgICAgICAgdXJsOicvZmF2b3JpdGVzJyxcbiAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICB0b3A6IHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvdG9wLWJhci5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2lkZToge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9zaWRlLW1lbnUuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvZmF2b3JpdGVzLmh0bWwnXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KS5cbiAgICAgIHN0YXRlKCdjcmVhdGUnLCB7XG4gICAgICAgIHVybDonL2NyZWF0ZScsXG4gICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgdG9wOiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL3RvcC1iYXIuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNpZGU6IHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvc2lkZS1tZW51Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb250ZW50OiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL2NyZWF0ZS5odG1sJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkuXG4gICAgICBzdGF0ZSgnNDA0Jywge1xuICAgICAgICB1cmw6Jy80MDQnLFxuICAgICAgICB2aWV3czoge1xuICAgICAgICAgIGZ1bGw6IHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvNDA0Lmh0bWwnXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbn1dKVxuXG4uZGlyZWN0aXZlKCduZ0VudGVyJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGVsZW1lbnQuYmluZChcImtleWRvd24ga2V5cHJlc3NcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZihldmVudC53aGljaCA9PT0gMTMpIHtcbiAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRldmFsKGF0dHJzLm5nRW50ZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG59KVxuXG4uZGlyZWN0aXZlKCdtb2RhbCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJtb2RhbCBmYWRlXCI+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nXCI+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPicgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPicgK1xuICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvYnV0dG9uPicgK1xuICAgICAgICAnPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIj57eyB0aXRsZSB9fTwvaDQ+JyArXG4gICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nICtcbiAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICc8L2Rpdj4nLFxuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICB0cmFuc2NsdWRlOiB0cnVlLFxuICAgICAgICByZXBsYWNlOnRydWUsXG4gICAgICAgIHNjb3BlOnRydWUsXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiBwb3N0TGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIHNjb3BlLnRpdGxlID0gYXR0cnMudGl0bGU7XG4gICAgICAgICAgICBzY29wZS4kd2F0Y2goYXR0cnMudmlzaWJsZSwgZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgICAgICAgIGlmKHZhbHVlID09PSB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLm1vZGFsKCdzaG93Jyk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLm1vZGFsKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLm9uKCdzaG93bi5icy5tb2RhbCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuJHBhcmVudFthdHRycy52aXNpYmxlXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS4kcGFyZW50W2F0dHJzLnZpc2libGVdID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59KVxuXG4uZGlyZWN0aXZlKCdhdXRvZm9jdXMnLCBbJyR0aW1lb3V0JywgZnVuY3Rpb24oJHRpbWVvdXQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgICAgICAgbGluayA6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnRbMF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1dKVxuXG4uZGlyZWN0aXZlKCdmYXYnLCBmdW5jdGlvbigpe1xuICAgIHJldHVybiB7XG4gICAgICAgIHRlbXBsYXRlOiAnPHN2ZyBuZy1jbGljaz1cInRvZ2dsZSgpXCIgbmctY2xhc3M9XCJ7XFwnYnRuLW9mZlxcJzohaXNTZWxlY3RlZCwgXFwnYnRuLW9uXFwnOmlzU2VsZWN0ZWQsfVwiIGNsYXNzPVwic3RhclwiICB3aWR0aD1cIjI0cHhcIiBoZWlnaHQ9XCIyNHB4XCIgdmlld0JveD1cIjAgMCA0OCA0OFwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeG1sbnM6c2tldGNoPVwiaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zXCI+JytcbiAgICAgICAgICAgICc8ZyBpZD1cIlN0YWNrZmlsZXMuaW9cIiBzdHJva2U9XCJub25lXCIgc3Ryb2tlLXdpZHRoPVwiMVwiIGZpbGw9XCJub25lXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIHNrZXRjaDp0eXBlPVwiTVNQYWdlXCI+JytcbiAgICAgICAgICAgICAgICAnPGcgaWQ9XCItc3RhclwiIHNrZXRjaDp0eXBlPVwiTVNBcnRib2FyZEdyb3VwXCIgZmlsbD1cIiNmMWYxZjFcIj4nK1xuICAgICAgICAgICAgICAgICAgICAnPGcgaWQ9XCJzdGFyXCIgc2tldGNoOnR5cGU9XCJNU0xheWVyR3JvdXBcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoNC4wMDAwMDAsIDQuMDAwMDAwKVwiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxwYXRoIGQ9XCJNNDAsMTQuNDggTDI1LjYyLDEzLjI0IEwyMCwwIEwxNC4zOCwxMy4yNiBMMCwxNC40OCBMMTAuOTIsMjMuOTQgTDcuNjQsMzggTDIwLDMwLjU0IEwzMi4zNiwzOCBMMjkuMSwyMy45NCBMNDAsMTQuNDggTDQwLDE0LjQ4IFogTTIwLDI2LjggTDEyLjQ4LDMxLjM0IEwxNC40OCwyMi43OCBMNy44NCwxNy4wMiBMMTYuNiwxNi4yNiBMMjAsOC4yIEwyMy40MiwxNi4yOCBMMzIuMTgsMTcuMDQgTDI1LjU0LDIyLjggTDI3LjU0LDMxLjM2IEwyMCwyNi44IEwyMCwyNi44IFpcIiBpZD1cIlNoYXBlXCIgc2tldGNoOnR5cGU9XCJNU1NoYXBlR3JvdXBcIj48L3BhdGg+JytcbiAgICAgICAgICAgICAgICAgICAgJzwvZz4nK1xuICAgICAgICAgICAgICAgICc8L2c+JyArXG4gICAgICAgICAgICAnPC9nPicgK1xuICAgICAgICAnPC9zdmc+JyxcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgIGZpZDogJ0AnLFxuICAgICAgICAgICAgaXNTZWxlY3RlZDogJz0nLFxuICAgICAgICAgICAgb25TZWxlY3Q6ICcmJ1xuICAgICAgICB9LFxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cmlidXRlcyl7XG4gICAgICAgICAgICBzY29wZS5pc1NlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBzY29wZS50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuaXNTZWxlY3RlZCA9ICFzY29wZS5pc1NlbGVjdGVkO1xuICAgICAgICAgICAgICAgIHNjb3BlLm9uU2VsZWN0KCkoc2NvcGUuZmlkLHNjb3BlLmlzU2VsZWN0ZWQpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICB9XG4gICAgfTtcbn0pO1xuIiwiY2xhc3MgRmF2Q29udHJvbGxlcntcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkcm9vdFNjb3BlLCBmYXZGYWN0b3J5KXtcbiAgICB0aGlzLmZhdkZhY3RvcnkgPSBmYXZGYWN0b3J5O1xuICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgIHRoaXMuJHJvb3RTY29wZSA9ICRyb290U2NvcGU7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy4kc2NvcGUuZmF2b3JpdGVMaXN0ID0gW107XG5cbiAgfVxuXG4gIGluaXQoKXtcbiAgICBpZih0aGlzLiRyb290U2NvcGUubG9nZ2VkKXtcbiAgICAgIHRoaXMuJHNjb3BlLnVzZXIgPSB0aGlzLiRyb290U2NvcGUudXNlcjtcbiAgICAgIHRoaXMuJHNjb3BlLmxvZ2dlZCA9IHRoaXMuJHJvb3RTY29wZS5sb2dnZWQ7XG4gICAgICB0aGlzLmZhdkZhY3RvcnkuY2hlY2tGYXYoKS50aGVuKGZhdm9yaXRlcyA9PiB7XG4gICAgICAgIHRoaXMuJHNjb3BlLmZhdm9yaXRlTGlzdCA9IGZhdm9yaXRlcy5kYXRhO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaW5jcmVtZW50KGZpbGUpe1xuICAgIGlmKHRoaXMuJHJvb3RTY29wZS5sb2dnZWQpe1xuICAgICAgZmlsZS5zdGFycyA9IGZpbGUuc3RhcnMgKyAxO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZVN0YXR1cyhmaWxlKXtcbiAgICB0aGlzLmZhdkZhY3RvcnkuZmF2RmlsZShmaWxlLl9pZCkudGhlbigoKSA9PiB7XG4gICAgICBpZih0aGlzLiRyb290U2NvcGUubG9nZ2VkKXtcbiAgICAgICAgdGhpcy4kc2NvcGUuZmF2b3JpdGVMaXN0LnB1c2goZmlsZS5faWQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdW5Ub2dnbGVTdGF0dXMoZmlsZSl7XG4gICAgdGhpcy5mYXZGYWN0b3J5LnVuRmF2RmlsZShmaWxlLl9pZCkudGhlbigoKSA9PiB7XG4gICAgICBpZih0aGlzLiRzY29wZS5sb2dnZWQpe1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLiRzY29wZS5mYXZvcml0ZUxpc3QuaW5kZXhPZihmaWxlLl9pZCk7XG4gICAgICAgIHRoaXMuJHNjb3BlLmZhdm9yaXRlTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaXNTZWxlY3RlZChmaWxlKXtcbiAgICByZXR1cm4gdGhpcy4kc2NvcGUuZmF2b3JpdGVMaXN0LmluZGV4T2YoZmlsZS5faWQpID4gLTE7XG4gIH1cbn1cblxuRmF2Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJHJvb3RTY29wZScsICdmYXZGYWN0b3J5J107XG5cbmV4cG9ydCB7IEZhdkNvbnRyb2xsZXIgfTtcbiIsImltcG9ydCB7IEZhdkNvbnRyb2xsZXIgfSBmcm9tICcuL2Zhdm1vZHVsZS5jdHJsJztcbmltcG9ydCB7IEZhdlNlcnZpY2UgfSBmcm9tICcuL2Zhdm1vZHVsZS5zdmMnO1xuXG5sZXQgY3RybCA9IEZhdkNvbnRyb2xsZXI7XG5sZXQgc3ZjID0gRmF2U2VydmljZS5mYWN0b3J5O1xuXG5leHBvcnQgeyBjdHJsIH07XG5leHBvcnQgeyBzdmMgfTtcbiIsImNsYXNzIEZhdlNlcnZpY2V7XG4gIGNvbnN0cnVjdG9yKCRodHRwKXtcbiAgICB0aGlzLiRodHRwID0gJGh0dHA7XG4gIH1cblxuICBjaGVja0Zhdigpe1xuICAgIHJldHVybiB0aGlzLiRodHRwLmdldCgnL2FwaS92MS91c2VyL2ZhdicsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KTtcbiAgfVxuICBcbiAgZmF2RmlsZShpZCl7XG4gICAgcmV0dXJuIHRoaXMuJGh0dHAuZ2V0KCcvYXBpL3YxL2ZpbGVzL2Zhdi8nICsgaWQsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KS50aGVuKHIgPT4gci5kYXRhKTtcbiAgfVxuXG4gIHVuRmF2RmlsZShpZCl7XG4gICAgcmV0dXJuIHRoaXMuJGh0dHAuZ2V0KCcvYXBpL3YxL2ZpbGVzL3VuZmF2LycgKyBpZCwge1xuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pLnRoZW4ociA9PiByLmRhdGEpO1xuICB9XG5cbiAgc3RhdGljIGZhY3RvcnkoJGh0dHApe1xuICAgIHJldHVybiBuZXcgRmF2U2VydmljZSgkaHR0cCk7XG4gIH1cbn1cblxuRmF2U2VydmljZS5mYWN0b3J5LiRpbmplY3QgPSBbJyRodHRwJ107XG5cbmV4cG9ydCB7IEZhdlNlcnZpY2UgfTtcbiIsImNsYXNzIEZhdm9yaXRlQ29udHJvbGxlcntcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkcm9vdFNjb3BlLCBmYXZvcml0ZXNGYWN0b3J5KXtcbiAgICB0aGlzLmZhdm9yaXRlc0ZhY3RvcnkgPSBmYXZvcml0ZXNGYWN0b3J5O1xuICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgIHRoaXMuJHJvb3RTY29wZSA9ICRyb290U2NvcGU7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0KCl7XG4gICAgdGhpcy5mYXZvcml0ZXNGYWN0b3J5LmdldFVzZXJGYXZvcml0ZXMoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgdGhpcy5maWxlcyA9IGRhdGE7XG4gICAgICB0aGlzLiRzY29wZS5sb2FkZWQgPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgdG9nZ2xlTW9kYWwoKXtcbiAgICB0aGlzLiRzY29wZS5jb3B5VGV4dCA9IHtzdGF0dXM6ICdub3RDbGlja2VkJ307XG4gICAgdGhpcy4kc2NvcGUuc2hvd01vZGFsID0gIXRoaXMuJHNjb3BlLnNob3dNb2RhbDtcbiAgfVxuXG4gIGdlbmVyYXRlRW1iZWQoaWQpe1xuICAgIHRoaXMuJHNjb3BlLmVtYmVkU2NyaXB0ID0gJzxzY3JpcHQgc3JjPVwiJyt3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wrJy8vJyt3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUrJy9lbWJlZC9maWxlLycraWQrJy5qc1wiPjwvc2NyaXB0Pic7XG4gIH1cblxuICBkZXBsb3koaWQpe1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gKCcvYXBpL3YxL2RlcGxveS8nK2lkKTtcbiAgfVxuXG4gIHJlbW92ZVJvdyhmaWxlKXtcbiAgICB2YXIgaW5kZXggPSAtMTtcblx0XHRmb3IoIHZhciBpID0gMDsgaSA8IHRoaXMuZmlsZXMubGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRpZiggdGhpcy5maWxlc1tpXS5faWQgPT09IGZpbGUuX2lkICkge1xuXHRcdFx0XHRpbmRleCA9IGk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLmZpbGVzLnNwbGljZSggaW5kZXgsIDEgKTtcbiAgfVxuXG4gIHNlYXJjaEZpbGUoKXtcbiAgICB2YXIgdGVybSA9IHRoaXMuZGF0YS5zZWFyY2g7XG4gICAgdGhpcy5mYXZvcml0ZXNGYWN0b3J5LnNlYXJjaEZpbGUodGVybSkudGhlbihyZXN1bHRzID0+IHtcbiAgICAgIHRoaXMucmVzdWx0cyA9IHJlc3VsdHM7XG4gICAgfSk7XG4gIH1cbn1cblxuRmF2b3JpdGVDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckcm9vdFNjb3BlJywgJ2Zhdm9yaXRlc0ZhY3RvcnknXTtcblxuZXhwb3J0IHsgRmF2b3JpdGVDb250cm9sbGVyIH07XG4iLCJpbXBvcnQgeyBGYXZvcml0ZUNvbnRyb2xsZXIgfSBmcm9tICcuL2Zhdm9yaXRlcy5jdHJsJztcbmltcG9ydCB7IEZhdm9yaXRlU2VydmljZSB9IGZyb20gJy4vZmF2b3JpdGVzLnN2Yyc7XG5cbmxldCBjdHJsID0gRmF2b3JpdGVDb250cm9sbGVyO1xubGV0IHN2YyA9IEZhdm9yaXRlU2VydmljZS5mYWN0b3J5O1xuXG5leHBvcnQgeyBjdHJsIH07XG5leHBvcnQgeyBzdmMgfTtcbiIsImNsYXNzIEZhdm9yaXRlU2VydmljZXtcbiAgY29uc3RydWN0b3IoJGh0dHApe1xuICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcbiAgfVxuXG4gIGdldFVzZXJGYXZvcml0ZXMoKXtcbiAgICByZXR1cm4gdGhpcy4kaHR0cC5nZXQoJy9hcGkvdjEvdXNlci9mYXZvcml0ZXMnLHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pLnRoZW4ociA9PiByLmRhdGEpO1xuICB9XG5cbiAgc2VhcmNoRmlsZSh0ZXJtKXtcbiAgICByZXR1cm4gdGhpcy4kaHR0cC5nZXQoJy9hcGkvdjEvc2VhcmNoJywge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHBhcmFtczoge1xuICAgICAgICB0ZXJtOiB0ZXJtXG4gICAgICB9XG4gICAgfSkudGhlbihyID0+IHIuZGF0YSk7XG4gIH1cblxuICBzdGF0aWMgZmFjdG9yeSgkaHR0cCl7XG4gICAgcmV0dXJuIG5ldyBGYXZvcml0ZVNlcnZpY2UoJGh0dHApO1xuICB9XG59XG5cbkZhdm9yaXRlU2VydmljZS5mYWN0b3J5LiRpbmplY3QgPSBbJyRodHRwJ107XG5cbmV4cG9ydCB7IEZhdm9yaXRlU2VydmljZSB9O1xuIiwiY2xhc3MgTWFpbkNvbnRyb2xsZXJ7XG4gIGNvbnN0cnVjdG9yKGxhbmRpbmdGYWN0b3J5KSB7XG4gICAgdGhpcy5sYW5kaW5nRmFjdG9yeSA9IGxhbmRpbmdGYWN0b3J5O1xuICB9XG4gIHNpZ25pbihwYWdlKXtcbiAgICB0aGlzLmxhbmRpbmdGYWN0b3J5LnNpZ25pbihwYWdlKTtcbiAgfVxufVxuXG5NYWluQ29udHJvbGxlci4kaW5qZWN0ID0gWydsYW5kaW5nRmFjdG9yeSddO1xuXG5leHBvcnQgeyBNYWluQ29udHJvbGxlciB9O1xuIiwiaW1wb3J0IHsgTWFpbkNvbnRyb2xsZXIgfSBmcm9tICcuL2xhbmRpbmcuY3RybCc7XG5pbXBvcnQgeyBNYWluU2VydmljZSB9IGZyb20gJy4vbGFuZGluZy5zdmMnO1xuXG5sZXQgY3RybCA9IE1haW5Db250cm9sbGVyO1xubGV0IHN2YyA9IE1haW5TZXJ2aWNlLmZhY3Rvcnk7XG5cbmV4cG9ydCB7IGN0cmwgfTtcbmV4cG9ydCB7IHN2YyB9O1xuIiwiY2xhc3MgTWFpblNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcigkd2luZG93KXtcbiAgICB0aGlzLiR3aW5kb3cgPSAkd2luZG93O1xuICB9XG5cbiAgc2lnbmluKHBhZ2Upe1xuICAgIHRoaXMuJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gKCcvYXV0aC9naXRodWI/cmVkaXJlY3Q9JyArIHBhZ2UpO1xuICB9XG5cbiAgc3RhdGljIGZhY3RvcnkoJHdpbmRvdyl7XG4gICAgcmV0dXJuIG5ldyBNYWluU2VydmljZSgkd2luZG93KTtcbiAgfVxufVxuXG5NYWluU2VydmljZS5mYWN0b3J5LiRpbmplY3QgPSBbJyR3aW5kb3cnXTtcblxuZXhwb3J0IHsgTWFpblNlcnZpY2UgfTtcbiIsImNsYXNzIE15U3RhY2tDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoJHNjb3BlLCBteXN0YWNrc0ZhY3Rvcnkpe1xuICAgIHRoaXMubXlzdGFja3NGYWN0b3J5ID0gbXlzdGFja3NGYWN0b3J5O1xuICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgaW5pdCgpe1xuICAgIHRoaXMubXlzdGFja3NGYWN0b3J5LmdldFVzZXJGaWxlcygpLnRoZW4oZGF0YSA9PiB7XG4gICAgICB0aGlzLmZpbGVzID0gZGF0YTtcbiAgICAgIHRoaXMuJHNjb3BlLmxvYWRlZCA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICB0b2dnbGVNb2RhbCgpe1xuICAgIHRoaXMuJHNjb3BlLmNvcHlUZXh0ID0ge3N0YXR1czogJ25vdENsaWNrZWQnfTtcbiAgICB0aGlzLiRzY29wZS5zaG93TW9kYWwgPSAhdGhpcy4kc2NvcGUuc2hvd01vZGFsO1xuICB9XG5cbiAgZ2VuZXJhdGVFbWJlZChpZCl7XG4gICAgdGhpcy4kc2NvcGUuZW1iZWRTY3JpcHQgPSAnPHNjcmlwdCBzcmM9XCInK3dpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCsnLy8nK3dpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSsnL2VtYmVkL2ZpbGUvJytpZCsnLmpzXCI+PC9zY3JpcHQ+JztcbiAgfVxuXG4gIGRlcGxveShpZCl7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAoJy9hcGkvdjEvZGVwbG95LycraWQpO1xuICB9XG5cbiAgc2VhcmNoRmlsZSgpe1xuICAgIHZhciB0ZXJtID0gdGhpcy5kYXRhLnNlYXJjaDtcbiAgICB0aGlzLm15c3RhY2tzRmFjdG9yeS5zZWFyY2hGaWxlKHRlcm0pLnRoZW4ocmVzdWx0cyA9PiB7XG4gICAgICB0aGlzLnJlc3VsdHMgPSByZXN1bHRzO1xuICAgIH0pO1xuICB9XG59XG5cbk15U3RhY2tDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICdteXN0YWNrc0ZhY3RvcnknXTtcblxuZXhwb3J0IHsgTXlTdGFja0NvbnRyb2xsZXIgfTtcbiIsImltcG9ydCB7IE15U3RhY2tDb250cm9sbGVyIH0gZnJvbSAnLi9teXN0YWNrcy5jdHJsJztcbmltcG9ydCB7IE15U3RhY2tTZXJ2aWNlIH0gZnJvbSAnLi9teXN0YWNrcy5zdmMnO1xuXG5sZXQgY3RybCA9IE15U3RhY2tDb250cm9sbGVyO1xubGV0IHN2YyA9IE15U3RhY2tTZXJ2aWNlLmZhY3Rvcnk7XG5cbmV4cG9ydCB7IGN0cmwgfTtcbmV4cG9ydCB7IHN2YyB9O1xuIiwiY2xhc3MgTXlTdGFja1NlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcigkaHR0cCl7XG4gICAgdGhpcy4kaHR0cCA9ICRodHRwO1xuICB9XG5cbiAgZ2V0VXNlckZpbGVzKCl7XG4gICAgcmV0dXJuIHRoaXMuJGh0dHAuZ2V0KCcvYXBpL3YxL3VzZXIvZmlsZXMnLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgIH0pLnRoZW4ociA9PiByLmRhdGEpO1xuICB9XG5cbiAgc2VhcmNoRmlsZSh0ZXJtKXtcbiAgICByZXR1cm4gdGhpcy4kaHR0cC5nZXQoJy9hcGkvdjEvc2VhcmNoJywge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHBhcmFtczoge1xuICAgICAgICB0ZXJtOiB0ZXJtXG4gICAgICB9XG4gICAgfSkudGhlbihyID0+IHIuZGF0YSk7XG4gIH1cblxuICBzdGF0aWMgZmFjdG9yeSgkaHR0cCl7XG4gICAgcmV0dXJuIG5ldyBNeVN0YWNrU2VydmljZSgkaHR0cCk7XG4gIH1cblxufVxuXG5NeVN0YWNrU2VydmljZS5mYWN0b3J5LiRpbmplY3QgPSBbJyRodHRwJ107XG5cbmV4cG9ydCB7IE15U3RhY2tTZXJ2aWNlIH07XG4iLCJjbGFzcyBMb2FkZXIge1xuICBjb25zdHJ1Y3RvcihyZWdpc3RyeUZhY3RvcnkpIHtcbiAgICB0aGlzLnJlZ2lzdHJ5RmFjdG9yeSA9IHJlZ2lzdHJ5RmFjdG9yeTtcbiAgICB0aGlzLml0ZW1zID0gW107XG4gICAgdGhpcy5idXN5ID0gZmFsc2U7XG4gICAgdGhpcy5hZnRlciA9IDE7XG4gIH1cblxuICBuZXh0UGFnZSgpIHtcbiAgICBpZiAodGhpcy5idXN5KSByZXR1cm47XG4gICAgdGhpcy5idXN5ID0gdHJ1ZTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyeUZhY3RvcnkuZ2V0RmlsZXModGhpcy5hZnRlcikudGhlbihmaWxlcyA9PiB7XG4gICAgICB2YXIgbGlzdCA9IGZpbGVzO1xuICAgICAgaWYobGlzdC5sZW5ndGggPT09IDApe1xuICAgICAgICBzZWxmLmJ1c3kgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBzZWxmLml0ZW1zLnB1c2gobGlzdFtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5hZnRlciA9IHNlbGYuYWZ0ZXIgKyAxO1xuICAgICAgICBzZWxmLmJ1c3kgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBmYWN0b3J5KHJlZ2lzdHJ5RmFjdG9yeSl7XG4gICAgcmV0dXJuIG5ldyBMb2FkZXIocmVnaXN0cnlGYWN0b3J5KTtcbiAgfVxufVxuXG5Mb2FkZXIuJGluamVjdCA9IFsncmVnaXN0cnlGYWN0b3J5J107XG5cbmV4cG9ydCB7IExvYWRlciB9O1xuIiwiY2xhc3MgUmVnaXN0cnlDb250cm9sbGVye1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRyb290U2NvcGUsICR3aW5kb3csIHJlZ2lzdHJ5RmFjdG9yeSwgcmVnaXN0cnlMb2FkZXIpe1xuICAgIHRoaXMucmVnaXN0cnlGYWN0b3J5ID0gcmVnaXN0cnlGYWN0b3J5O1xuICAgIHRoaXMucmVnaXN0cnlMb2FkZXIgPSByZWdpc3RyeUxvYWRlcjtcbiAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICB0aGlzLiRyb290U2NvcGUgPSAkcm9vdFNjb3BlO1xuICAgIHRoaXMuJHdpbmRvdyA9ICR3aW5kb3c7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0KCl7XG4gICAgdGhpcy5maWxlcyA9IHRoaXMucmVnaXN0cnlMb2FkZXI7XG4gICAgdGhpcy4kc2NvcGUubG9hZGVkID0gdHJ1ZTtcbiAgfVxuXG4gIHRvZ2dsZU1vZGFsKCl7XG4gICAgdGhpcy4kc2NvcGUuY29weVRleHQgPSB7c3RhdHVzOiAnbm90Q2xpY2tlZCd9O1xuICAgIHRoaXMuJHNjb3BlLnNob3dNb2RhbCA9ICF0aGlzLiRzY29wZS5zaG93TW9kYWw7XG4gIH1cblxuICBnZW5lcmF0ZUVtYmVkKGlkKXtcbiAgICB0aGlzLiRzY29wZS5lbWJlZFNjcmlwdCA9ICc8c2NyaXB0IHNyYz1cIicrd2luZG93LmxvY2F0aW9uLnByb3RvY29sKycvLycrd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lKycvZW1iZWQvZmlsZS8nK2lkKycuanNcIj48L3NjcmlwdD4nO1xuICB9XG5cbiAgZGVwbG95KGlkKXtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICgnL2FwaS92MS9kZXBsb3kvJytpZCk7XG4gIH1cblxuICBzZWFyY2hGaWxlKCl7XG4gICAgdmFyIHRlcm0gPSB0aGlzLmRhdGEuc2VhcmNoO1xuICAgIHRoaXMucmVnaXN0cnlGYWN0b3J5LnNlYXJjaEZpbGUodGVybSkudGhlbihyZXN1bHRzID0+IHtcbiAgICAgIHRoaXMucmVzdWx0cyA9IHJlc3VsdHM7XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1NlYXJjaCgpe1xuICAgIGlmKHRoaXMuJHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2VhcmNoICE9PSB1bmRlZmluZWQpe1xuICAgICAgdGhpcy4kc2NvcGUuZGF0YSA9IHtzZWFyY2g6IHRoaXMuJHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2VhcmNofTtcbiAgICAgIHRoaXMucmVnaXN0cnlGYWN0b3J5LnNlYXJjaEZpbGUodGhpcy4kd2luZG93LmxvY2FsU3RvcmFnZS5zZWFyY2gpLnRoZW4ocmVzdWx0cyA9PiB7XG4gICAgICAgIHRoaXMucmVzdWx0cyA9IHJlc3VsdHM7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuJHdpbmRvdy5sb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICB9XG4gIH1cblxufVxuXG5SZWdpc3RyeUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRyb290U2NvcGUnLCAnJHdpbmRvdycsJ3JlZ2lzdHJ5RmFjdG9yeScsICdyZWdpc3RyeUxvYWRlciddO1xuXG5leHBvcnQgeyBSZWdpc3RyeUNvbnRyb2xsZXIgfTtcbiIsImltcG9ydCB7IFJlZ2lzdHJ5Q29udHJvbGxlciB9IGZyb20gJy4vcmVnaXN0cnkuY3RybCc7XG5pbXBvcnQgeyBSZWdpc3RyeVNlcnZpY2UgfSBmcm9tICcuL3JlZ2lzdHJ5LnN2Yyc7XG5pbXBvcnQgeyBMb2FkZXIgfSBmcm9tICcuL3JlZ2lzdHJ5LWxvYWRlcic7XG5cbmxldCBjdHJsID0gUmVnaXN0cnlDb250cm9sbGVyO1xubGV0IHN2YyA9IFJlZ2lzdHJ5U2VydmljZS5mYWN0b3J5O1xubGV0IGxvYWRlciA9IExvYWRlci5mYWN0b3J5O1xuXG5leHBvcnQgeyBjdHJsIH07XG5leHBvcnQgeyBzdmMgfTtcbmV4cG9ydCB7IGxvYWRlciB9O1xuIiwiY2xhc3MgUmVnaXN0cnlTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoJGh0dHApe1xuICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcbiAgfVxuXG4gIGdldEZpbGVzKHBhZ2Upe1xuICAgIHJldHVybiB0aGlzLiRodHRwLmdldCgnL2FwaS92MS9maWxlcy8nLHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBwYXJhbXM6IHtcbiAgICAgICAgICBwYWdlOiBwYWdlLFxuICAgICAgICAgIGxpbWl0OiA1XG4gICAgICB9XG4gICAgfSkudGhlbihyID0+IHIuZGF0YSk7XG4gIH1cblxuICBzZWFyY2hGaWxlKHRlcm0pe1xuICAgIHJldHVybiB0aGlzLiRodHRwLmdldCgnL2FwaS92MS9zZWFyY2gnLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgcGFyYW1zOiB7XG4gICAgICAgIHRlcm06IHRlcm1cbiAgICAgIH1cbiAgICB9KS50aGVuKHIgPT4gci5kYXRhKTtcbiAgfVxuXG4gIHN0YXRpYyBmYWN0b3J5KCRodHRwKXtcbiAgICByZXR1cm4gbmV3IFJlZ2lzdHJ5U2VydmljZSgkaHR0cCk7XG4gIH1cbn1cblxuUmVnaXN0cnlTZXJ2aWNlLmZhY3RvcnkuJGluamVjdCA9IFsnJGh0dHAnXTtcblxuZXhwb3J0IHsgUmVnaXN0cnlTZXJ2aWNlIH07XG4iLCJjbGFzcyBTZXNzaW9uQ29udHJvbGxlcntcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkcm9vdFNjb3BlLCAkc3RhdGUsICRsb2NhdGlvbiwgJHdpbmRvdywgc2Vzc2lvbkZhY3Rvcnkpe1xuICAgIHRoaXMuc2Vzc2lvbkZhY3RvcnkgPSBzZXNzaW9uRmFjdG9yeTtcbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICB0aGlzLiRyb290U2NvcGUgPSAkcm9vdFNjb3BlO1xuICAgIHRoaXMuJHN0YXRlID0gJHN0YXRlO1xuICAgIHRoaXMuJGxvY2F0aW9uID0gJGxvY2F0aW9uO1xuICAgIHRoaXMuJHdpbmRvdyA9ICR3aW5kb3c7XG4gIH1cblxuICBpbml0KCl7XG4gICAgdGhpcy5zZXNzaW9uRmFjdG9yeS5nZXRVc2VyKCkudGhlbigoZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpID0+IHtcbiAgICAgIHRoaXMuJHJvb3RTY29wZS5sb2dnZWQgPSB0cnVlO1xuICAgICAgdGhpcy4kcm9vdFNjb3BlLnVzZXIgPSBkYXRhLnVzZXJuYW1lO1xuICAgICAgdGhpcy4kc2NvcGUubG9nZ2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMuJHNjb3BlLnVzZXIgPSBkYXRhLnVzZXJuYW1lO1xuICAgICAgdGhpcy4kc2NvcGUucGhvdG8gPSBkYXRhLl9qc29uLmF2YXRhcl91cmw7XG4gICAgfSk7XG4gIH1cblxuICBzaWduaW4ocGFnZSl7XG4gICAgdGhpcy5zZXNzaW9uRmFjdG9yeS5zaWduaW4ocGFnZSk7XG4gIH1cblxuICBsb2dvdXQoKXtcbiAgICB0aGlzLnNlc3Npb25GYWN0b3J5LmxvZ291dCgpLnRoZW4oKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSA9PiB7XG4gICAgICB0aGlzLiRzdGF0ZS50cmFuc2l0aW9uVG8odGhpcy4kc3RhdGUuY3VycmVudCwge30sIHtcbiAgICAgICAgICByZWxvYWQ6IHRydWUsXG4gICAgICAgICAgaW5oZXJpdDogZmFsc2UsXG4gICAgICAgICAgbm90aWZ5OiB0cnVlXG4gICAgICB9KTtcbiAgICAgIHRoaXMuJHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldENsYXNzKHBhdGgpe1xuICAgIGlmICh0aGlzLiRsb2NhdGlvbi5wYXRoKCkuc3Vic3RyKDAsIHBhdGgubGVuZ3RoKSA9PSBwYXRoKSB7XG4gICAgICByZXR1cm4gXCJzZWxlY3RlZFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gIH1cbn1cblxuU2Vzc2lvbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRyb290U2NvcGUnLCAnJHN0YXRlJywgJyRsb2NhdGlvbicsICckd2luZG93JywgJ3Nlc3Npb25GYWN0b3J5J107XG5cbmV4cG9ydCB7IFNlc3Npb25Db250cm9sbGVyIH07XG4iLCJpbXBvcnQgeyBTZXNzaW9uQ29udHJvbGxlciB9IGZyb20gJy4vc2Vzc2lvbi5jdHJsJztcbmltcG9ydCB7IFNlc3Npb25TZXJ2aWNlIH0gZnJvbSAnLi9zZXNzaW9uLnN2Yyc7XG5cbmxldCBjdHJsID0gU2Vzc2lvbkNvbnRyb2xsZXI7XG5sZXQgc3ZjID0gU2Vzc2lvblNlcnZpY2UuZmFjdG9yeTtcblxuZXhwb3J0IHsgY3RybCB9O1xuZXhwb3J0IHsgc3ZjIH07XG4iLCJjbGFzcyBTZXNzaW9uU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKCRodHRwLCAkd2luZG93KXtcbiAgICB0aGlzLiRodHRwID0gJGh0dHA7XG4gICAgdGhpcy4kd2luZG93ID0gJHdpbmRvdztcbiAgfVxuXG4gIHNpZ25pbihwYWdlKXtcbiAgICB0aGlzLiR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICgnL2F1dGgvZ2l0aHViP3JlZGlyZWN0PScgKyBwYWdlKTtcbiAgfVxuXG4gIGdldFVzZXIoKXtcbiAgICByZXR1cm4gdGhpcy4kaHR0cC5nZXQoJy9hcGkvdjEvdXNlcicsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KS50aGVuKHIgPT4gci5kYXRhKTtcbiAgfVxuXG4gIGxvZ291dCgpe1xuICAgIHJldHVybiB0aGlzLiRodHRwLmdldCgnL2F1dGgvbG9nb3V0Jywge1xuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pLnRoZW4ociA9PiByLmRhdGEpO1xuICB9XG5cbiAgc3RhdGljIGZhY3RvcnkoJGh0dHAsICR3aW5kb3cpe1xuICAgIHJldHVybiBuZXcgU2Vzc2lvblNlcnZpY2UoJGh0dHAsICR3aW5kb3cpO1xuICB9XG5cbn1cblxuU2Vzc2lvblNlcnZpY2UuZmFjdG9yeS4kaW5qZWN0ID0gWyckaHR0cCcsICckd2luZG93J107XG5cbmV4cG9ydCB7IFNlc3Npb25TZXJ2aWNlIH07XG4iXX0=
