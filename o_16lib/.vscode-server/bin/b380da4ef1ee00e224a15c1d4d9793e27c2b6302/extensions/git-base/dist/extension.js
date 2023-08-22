(()=>{"use strict";var e={699:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.registerAPICommands=t.ApiImpl=void 0;const r=o(496),i=o(571);t.ApiImpl=class{constructor(e){this.a=e}pickRemoteSource(e){return(0,i.pickRemoteSource)(this.a,e)}getRemoteSourceActions(e){return(0,i.getRemoteSourceActions)(this.a,e)}registerRemoteSourceProvider(e){return this.a.registerRemoteSourceProvider(e)}},t.registerAPICommands=function(e){const t=[];return t.push(r.commands.registerCommand("git-base.api.getRemoteSources",(t=>{if(e.model)return(0,i.pickRemoteSource)(e.model,t)}))),r.Disposable.from(...t)}},413:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GitBaseExtensionImpl=void 0;const r=o(496),i=o(699);t.GitBaseExtensionImpl=class{set model(e){this.b=e;const t=!!e;this.enabled!==t&&(this.enabled=t,this.a.fire(this.enabled))}get model(){return this.b}constructor(e){this.enabled=!1,this.a=new r.EventEmitter,this.onDidChangeEnablement=this.a.event,this.b=void 0,e&&(this.enabled=!0,this.b=e)}getAPI(e){if(!this.b)throw new Error("Git model not found");if(1!==e)throw new Error(`No API version ${e} found.`);return new i.ApiImpl(this.b)}}},874:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.throttle=t.debounce=void 0;const r=o(575);function i(e){return(t,o,r)=>{let i=null,n=null;if("function"==typeof r.value?(i="value",n=r.value):"function"==typeof r.get&&(i="get",n=r.get),!n||!i)throw new Error("not supported");r[i]=e(n,o)}}t.debounce=function(e){return i(((t,o)=>{const r=`$debounce$${o}`;return function(...o){clearTimeout(this[r]),this[r]=setTimeout((()=>t.apply(this,o)),e)}}))},t.throttle=i((function(e,t){const o=`$throttle$current$${t}`,i=`$throttle$next$${t}`,n=function(...t){if(this[i])return this[i];if(this[o])return this[i]=(0,r.done)(this[o]).then((()=>(this[i]=void 0,n.apply(this,t)))),this[i];this[o]=e.apply(this,t);const s=()=>this[o]=void 0;return(0,r.done)(this[o]).then(s,s),this[o]};return n}))},74:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Model=void 0;const r=o(496),i=o(575);t.Model=class{constructor(){this.a=new Set,this.b=new r.EventEmitter,this.onDidAddRemoteSourceProvider=this.b.event,this.c=new r.EventEmitter,this.onDidRemoveRemoteSourceProvider=this.c.event}registerRemoteSourceProvider(e){return this.a.add(e),this.b.fire(e),(0,i.toDisposable)((()=>{this.a.delete(e),this.c.fire(e)}))}getRemoteProviders(){return[...this.a.values()]}}},571:function(e,t,o){var r=this&&this.__decorate||function(e,t,o,r){var i,n=arguments.length,s=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var c=e.length-1;c>=0;c--)(i=e[c])&&(s=(n<3?i(s):n>3?i(t,o,s):i(t,o))||s);return n>3&&s&&Object.defineProperty(t,o,s),s};Object.defineProperty(t,"__esModule",{value:!0}),t.pickRemoteSource=t.getRemoteSourceActions=void 0;const i=o(496),n=o(874);async function s(e){const t=await new Promise((t=>{e.onDidAccept((()=>t(e.selectedItems[0]))),e.onDidHide((()=>t(void 0))),e.show()}));return e.hide(),t}class c{constructor(e){this.e=e}f(){this.d||(this.d=i.window.createQuickPick(),this.d.ignoreFocusOut=!0,this.e.supportsQuery?(this.d.placeholder=this.e.placeholder??i.l10n.t("Repository name (type to search)"),this.d.onDidChangeValue(this.g,this)):this.d.placeholder=this.e.placeholder??i.l10n.t("Repository name"))}g(){this.h()}async h(){try{this.f(),this.d.busy=!0,this.d.show();const e=await this.e.getRemoteSources(this.d?.value)||[];0===e.length?this.d.items=[{label:i.l10n.t("No remote repositories found."),alwaysShow:!0}]:this.d.items=e.map((e=>({label:e.icon?`$(${e.icon}) ${e.name}`:e.name,description:e.description||("string"==typeof e.url?e.url:e.url[0]),detail:e.detail,remoteSource:e,alwaysShow:!0})))}catch(e){this.d.items=[{label:i.l10n.t("{0} Error: {1}","$(error)",e.message),alwaysShow:!0}],console.error(e)}finally{this.d.busy=!1}}async pick(){return await this.h(),(await s(this.d))?.remoteSource}}async function a(e,t={}){const o=new c(e),r=await o.pick();let n;if(r&&("string"==typeof r.url?n=r.url:r.url.length>0&&(n=await i.window.showQuickPick(r.url,{ignoreFocusOut:!0,placeHolder:i.l10n.t("Choose a URL to clone from.")}))),!n||!t.branch)return n;if(!e.getBranches)return{url:n};const s=await e.getBranches(n);if(!s)return{url:n};const a=await i.window.showQuickPick(s,{placeHolder:i.l10n.t("Branch name")});return a?{url:n,branch:a}:{url:n}}r([(0,n.debounce)(300)],c.prototype,"g",null),r([n.throttle],c.prototype,"h",null),t.getRemoteSourceActions=async function(e,t){const o=e.getRemoteProviders(),r=[];for(const e of o){const o=await(e.getRemoteSourceActions?.(t));o?.length&&r.push(...o)}return r},t.pickRemoteSource=async function(e,t={}){const o=i.window.createQuickPick();if(o.title=t.title,t.providerName){const o=e.getRemoteProviders().filter((e=>e.name===t.providerName))[0];if(o)return await a(o,t)}const r=e.getRemoteProviders().map((e=>({label:(e.icon?`$(${e.icon}) `:"")+(t.providerLabel?t.providerLabel(e):e.name),alwaysShow:!0,provider:e}))),n=[];if(t.showRecentSources)for(const{provider:e}of r){const t=(await(e.getRecentRemoteSources?.())??[]).map((e=>({...e,label:(e.icon?`$(${e.icon}) `:"")+e.name,url:"string"==typeof e.url?e.url:e.url[0]})));n.push(...t)}const c=[{kind:i.QuickPickItemKind.Separator,label:i.l10n.t("remote sources")},...r,{kind:i.QuickPickItemKind.Separator,label:i.l10n.t("recently opened")},...n.sort(((e,t)=>t.timestamp-e.timestamp))];o.placeholder=t.placeholder??(0===r.length?i.l10n.t("Provide repository URL"):i.l10n.t("Provide repository URL or pick a repository source."));const l=e=>{if(e){const r=("string"==typeof t.urlLabel?t.urlLabel:t.urlLabel?.(e))??i.l10n.t("URL");o.items=[{label:r,description:e,alwaysShow:!0,url:e},...c]}else o.items=c};o.onDidChangeValue(l),l();const u=await s(o);if(u){if(u.url)return u.url;if(u.provider)return await a(u.provider,t)}}},575:(e,t)=>{var o;Object.defineProperty(t,"__esModule",{value:!0}),t.Versions=t.done=t.toDisposable=void 0,t.toDisposable=function(e){return{dispose:e}},t.done=function(e){return e.then((()=>{}))},function(e){function t(e,t,o,r){return{major:"string"==typeof e?parseInt(e,10):e,minor:"string"==typeof t?parseInt(t,10):t,patch:null==o?0:"string"==typeof o?parseInt(o,10):o,pre:r}}function o(e){const[o,r]=e.split("-"),[i,n,s]=o.split(".");return t(i,n,s,r)}e.compare=function(e,t){return"string"==typeof e&&(e=o(e)),"string"==typeof t&&(t=o(t)),e.major>t.major?1:e.major<t.major?-1:e.minor>t.minor?1:e.minor<t.minor?-1:e.patch>t.patch?1:e.patch<t.patch?-1:void 0===e.pre&&void 0!==t.pre?1:void 0!==e.pre&&void 0===t.pre?-1:void 0!==e.pre&&void 0!==t.pre?e.pre.localeCompare(t.pre):0},e.from=t,e.fromString=o}(o||(t.Versions=o={}))},496:e=>{e.exports=require("vscode")}},t={};function o(r){var i=t[r];if(void 0!==i)return i.exports;var n=t[r]={exports:{}};return e[r].call(n.exports,n,n.exports,o),n.exports}var r={};(()=>{var e=r;Object.defineProperty(e,"__esModule",{value:!0}),e.activate=void 0;const t=o(699),i=o(413),n=o(74);e.activate=function(e){const o=new i.GitBaseExtensionImpl(new n.Model);return e.subscriptions.push((0,t.registerAPICommands)(o)),o}})();var i=exports;for(var n in r)i[n]=r[n];r.__esModule&&Object.defineProperty(i,"__esModule",{value:!0})})();
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/b380da4ef1ee00e224a15c1d4d9793e27c2b6302/extensions/git-base/dist/extension.js.map