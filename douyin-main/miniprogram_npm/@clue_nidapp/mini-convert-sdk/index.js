!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var r=t();for(var n in r)("object"==typeof exports?exports:e)[n]=r[n]}}(self,(()=>(()=>{var e={224:function(e,t,r){"use strict";var n=this&&this.__assign||function(){return n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var i in t=arguments[r])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},n.apply(this,arguments)},i=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function a(e){try{c(n.next(e))}catch(e){o(e)}}function s(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}c((n=n.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var r,n,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,n=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=t.call(e,a)}catch(e){o=[6,e],n=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}};Object.defineProperty(t,"__esModule",{value:!0});var a=r(67),s=function(e){return i(void 0,void 0,void 0,(function(){var t,r;return o(this,(function(n){switch(n.label){case 0:if(e.live_rom_id)return[2,e.live_rom_id];if(e.live_room_id)return[2,e.live_room_id];if(e.room_id)return[2,e.room_id];n.label=1;case 1:return n.trys.push([1,3,,4]),[4,i(void 0,void 0,void 0,(function(){return o(this,(function(e){return[2,new Promise((function(e,t){try{tt.canIUse("getRoomInfo")||t({}),tt.getRoomInfo({success:function(t){return e(t)},fail:function(e){return console.log("errcode:",null==e?void 0:e.errCode),t(e)}})}catch(e){t({})}}))]}))}))];case 2:return t=n.sent(),[2,(null===(r=null==t?void 0:t.roomInfo)||void 0===r?void 0:r.roomID)||""];case 3:return n.sent(),[2,""];case 4:return[2]}}))}))},c={Toutiao:"13",Douyin:"1128",news_article_lite:"35",live_stream:"1112",XiGua:"32",PPX:"1319",douyin_lite:"2329"},u={ad_id:"",cid:"",device_id:"",req_id:"",user_id:"",app_id:"0",rit:"",orit:"",log_extra:"",os:"",app_version:"",version_code:"",site_id:"",mp_id:"",mp_douyin_id:"",mp_name:"",mp_env:"",mp_room_id:"",mp_short_video_id:"",mp_scene:""},l=function(e){return"string"==typeof e?e:""},d=function(e){if("string"==typeof e)try{return JSON.parse(e)}catch(t){return console.error("json parse fail",t),function(e){var t="",r={};try{t=e.replace(/\"\{/g,"{").replace(/\}\"/g,"}").replace(/\"\[/g,"[").replace(/\]\"/g,"]"),r=JSON.parse(t)}catch(e){console.log("try again parse fail",e)}return r}(e)}};t.default=function(e,t,r){return{track:function(){},getContext:function(){return i(void 0,void 0,void 0,(function(){var i,_,p,f,m,g,v,y,h,b,S,w,C,T,x;return o(this,(function(o){switch(o.label){case 0:return i=n(n({},u),{mp_id:e,mp_name:t}),_={},p={query:{},path:"",scene:"",aweme_uid:"",group_id:""},tt.canIUse("getEnterOptionsSync")?(p=tt.getEnterOptionsSync(),_=p.query):tt.canIUse("getLaunchOptionsSync")&&(p=tt.getLaunchOptionsSync(),_=p.query),f=tt.getSystemInfoSync(),m=f.appName,g=f.SDKVersion,v=f.version,y=f.platform,[4,s(h=_)];case 1:return b=o.sent(),S=d(h.ad_params)||{},w=S.web_url&&"string"==typeof S.web_url?a.getPageIdFormUrl(S.webUrl||""):"",C=S.log_extra,T=d(C)||C||{},[2,i=n(n({},i),{app_id:c[m]||"",app_name:m||"",version_code:null!=g?g:"",app_version:null!=v?v:"",os:y||"android",net_type:"",ad_id:l(h.adid),cid:l(h.creativeid),value:l(h.creativeid),user_id:l(h.user_id),log_extra:JSON.stringify(T),site_id:w,orit:T.orit||T.rit||"",rit:T.rit||"",click_id:l(h.clickid),req_id:null!==(x=T.req_id)&&void 0!==x?x:"",mp_open_id:r||"",mp_room_id:b,mp_douyin_id:p.aweme_uid,mp_scene:p.scene,mp_short_video_id:p.group_id,mp_path:p.path})]}}))}))}}}},833:()=>{},44:()=>{},991:(e,t,r)=>{"use strict";r.d(t,{U:()=>i});var n=r(231),i=(0,n.Eq)(n.c_.clue,"/event/kvmtpost")},483:(e,t,r)=>{"use strict";r.d(t,{B0:()=>a,C5:()=>c,Fc:()=>i,js:()=>s,oO:()=>o,sk:()=>u});var n=3;function i(e){n=e}function o(){return 3===n}function a(){return 1===n}function s(){return 2===n}function c(){return"object"==typeof window||"object"==typeof NativeModules}function u(){return!c()}},27:(e,t,r)=>{"use strict";r.d(t,{Gk:()=>s,In:()=>l,Ju:()=>_,RG:()=>u,SX:()=>d,WQ:()=>f,Xr:()=>p,bI:()=>c,eH:()=>n,fw:()=>a});var n,i={"aweme_enterprise.home":1,"aweme_enterprise.homepage_tab":6,"aweme_enterprise.video":7,"aweme_enterprise.live_card":2,"aweme_enterprise.live_card_service":10,"aweme_enterprise.im_message":9,"aweme_enterprise.dou_plus":25,"aweme_enterprise.subscription_article":28},o={"star.video":8};function a(e,t,r,n,i,o,a){return void 0===o&&(o=0),void 0===a&&(a=""),{businessScenario:e,subBusinessScenario:t,techProvider:r,techImpl:n,interactiveMode:i,appId:o,orit:a}}function s(e,t){if(e in i){var r=i[e];t.businessScenario=7,t.subBusinessScenario=r}else e in o&&(t.businessScenario=14,t.subBusinessScenario=o[e]);return t}function c(e,t){var r;t=t||3;var i=((r={})[n.store_popup]=[2,0,2,t,2],r[n.landing_page_embedded]=[1,0,2,t,1],r[n.light_landing_page]=[4,4,2,t,1],r[n.creative]=[3,0,2,t,1],r[n.slideUp]=[1,0,2,t,3],r[n.casing_mini_program]=[10,0,2,t,1],r[n.landing_page_embedded_payform]=[11,0,2,t,1],r[n.landing_page_slide_payform]=[11,0,2,t,3],r[n.light_game_page]=[4,5,2,t,1],r[n.coupon_direct_normal]=[1,11,2,t,2],r[n.coupon_direct_store]=[2,11,2,t,2],r[n.mini_program]=[18,0,14,4,1],r[n.playable]=[15,0,8,t,2],r[n.aip]=[16,0,8,t,1],r[n.fanqie_creative]=[3,0,13,t,1],r[n.zhuxiaobang_creative]=[3,0,9,t,1],r[n.xigua_creative]=[3,0,5,t,1],r[n.live_subscribe_one_key_form]=[1,33,2,t,1],r[n.consult_landing_page]=[19,0,15,t,1],r[n.creative_live_subscribe_one_key_form]=[3,33,2,t,3],r[n.pan_scenemini_program]=[21,0,2,t,1],r[n.stay_popup]=[1,0,2,t,4],r[n.mini_program_form_sdk]=[21,35,7,4,1],r[n.xiaoliu]=[22,0,17,t,1],r[n.enterprise_slide]=[7,1,2,t,3],r[n.third_developer_h5]=[24,35,8,3,1],r[n.interactive_smart]=[25,0,3,t,3],r),o=i[e]||i[n.landing_page_embedded];return a.apply(void 0,o)}function u(e){try{var t=JSON.parse(e||"");return[t.req_id||"",""+(t.orit||t.rit||""),""+(t.rit||"")]}catch(e){return["","",""]}}function l(){return a(1,0,2,3,1)}function d(e){return{business_scenario:e.businessScenario,sub_business_scenario:e.subBusinessScenario,technology_support:e.techProvider,technology_impl:e.techImpl,interview_mode:e.interactiveMode,app_code:e.appId,orit:e.orit,tpl_env:e.tplEnv}}function _(){return{req_id:"",cid:"",device_id:"",user_id:"",app_id:0,app_version:"",rit:"",orit:"",log_extra:"",os:"",version_code:"",site_id:"",ad_id:"",ad_extra_data:""}}function p(e){var t={req_id:"",cid:"",device_id:"",user_id:"",app_id:0,app_version:"",rit:"",orit:"",log_extra:"",os:"",version_code:"",site_id:"",ad_id:"",ad_extra_data:""};return e.getContext().then((function(e){t.cid=""+(e.cid||""),t.device_id=""+(e.device_id||""),t.user_id=""+(e.user_id||""),t.app_id=Number(e.app_id)||0,t.app_version=e.app_version,t.log_extra=e.log_extra,t.os=e.os||"android";var r=u(e.log_extra),n=r[0],i=r[1],o=r[2];for(var a in t.req_id=n,t.orit=i,t.rit=o,t.os=e.os,t.version_code=e.version_code,t.site_id=e.site_id,t.ad_id=e.ad_id||"",t.ad_extra_data=e.ad_extra_data||"",e)a in t||(t[a]=e[a]);return t})).catch((function(){return t}))}function f(e,t){return t?{businessScenario:e.businessScenario,subBusinessScenario:e.subBusinessScenario,techProvider:e.techProvider,techImpl:e.techImpl,interactiveMode:e.interactiveMode,appId:t.app_id,orit:t.orit,tplEnv:t.tpl_env}:e}!function(e){e[e.store_popup=1]="store_popup",e[e.landing_page_embedded=2]="landing_page_embedded",e[e.light_landing_page=3]="light_landing_page",e[e.creative=4]="creative",e[e.slideUp=5]="slideUp",e[e.casing_mini_program=6]="casing_mini_program",e[e.landing_page_embedded_payform=8]="landing_page_embedded_payform",e[e.landing_page_slide_payform=9]="landing_page_slide_payform",e[e.light_game_page=10]="light_game_page",e[e.coupon_direct_normal=12]="coupon_direct_normal",e[e.coupon_direct_store=13]="coupon_direct_store",e[e.mini_program=14]="mini_program",e[e.playable=15]="playable",e[e.aip=16]="aip",e[e.fanqie_creative=17]="fanqie_creative",e[e.zhuxiaobang_creative=18]="zhuxiaobang_creative",e[e.xigua_creative=19]="xigua_creative",e[e.live_subscribe_one_key_form=20]="live_subscribe_one_key_form",e[e.consult_landing_page=21]="consult_landing_page",e[e.creative_live_subscribe_one_key_form=22]="creative_live_subscribe_one_key_form",e[e.pan_scenemini_program=23]="pan_scenemini_program",e[e.stay_popup=24]="stay_popup",e[e.mini_program_form_sdk=25]="mini_program_form_sdk",e[e.xiaoliu=26]="xiaoliu",e[e.enterprise_slide=27]="enterprise_slide",e[e.third_developer_h5=28]="third_developer_h5",e[e.interactive_smart=29]="interactive_smart"}(n||(n={}))},67:(e,t,r)=>{"use strict";r.r(t),r.d(t,{ClueComponentType:()=>u.nN,ClueLogCompType:()=>u.K1,ComponentType:()=>u.re,ScenarioType:()=>l.eH,autoFillTypeMap:()=>u.kG,cdnOrigins:()=>d.YO,generateCommitID:()=>c.n$,generateFrom:()=>c.VK,getConvertContext:()=>l.Xr,getDefaultContext:()=>l.Ju,getDefaultScenario:()=>l.In,getGScenarioSubmitFormat:()=>l.SX,getGenericScenario:()=>l.fw,getGenericScenarioFromOldScenario:()=>l.bI,getGenericScenarioFromTrafficSource:()=>l.Gk,getMergedGScenario:()=>l.WQ,getPageIdFormUrl:()=>c.e9,getReqIdRitFromLogExtra:()=>l.RG,getServerPath:()=>d.Eq,getSessionID:()=>c.mL,getStaticPath:()=>d.lg,getValueByPath:()=>i.M,getWebID:()=>c.HT,isClient:()=>_.C5,isFlutter:()=>_.B0,isH5:()=>_.oO,isLynx:()=>_.js,isServer:()=>_.sk,maskPhoneNo:()=>c.jp,nextTick:()=>c.Y3,serverOrigins:()=>d.c_,setRenderType:()=>_.Fc,setValueByPath:()=>i.P,shallowCopy:()=>c.DC,submitEventUrl:()=>n.U,throttleOrDebounce:()=>c.vw,types:()=>o});var n=r(991),i=r(641),o=r(10),a=r(833),s={};for(const e in a)["default","types","submitEventUrl","getValueByPath","setValueByPath"].indexOf(e)<0&&(s[e]=()=>a[e]);r.d(t,s);var c=r(424),u=r(969),l=r(27),d=r(231),_=r(483),p=r(44);s={};for(const e in p)["default","types","submitEventUrl","getValueByPath","setValueByPath","generateCommitID","generateFrom","getPageIdFormUrl","getSessionID","getWebID","maskPhoneNo","nextTick","shallowCopy","throttleOrDebounce","ClueComponentType","ClueLogCompType","ComponentType","autoFillTypeMap","ScenarioType","getConvertContext","getDefaultContext","getDefaultScenario","getGScenarioSubmitFormat","getGenericScenario","getGenericScenarioFromOldScenario","getGenericScenarioFromTrafficSource","getMergedGScenario","getReqIdRitFromLogExtra","cdnOrigins","getServerPath","getStaticPath","serverOrigins","isClient","isFlutter","isH5","isLynx","isServer","setRenderType"].indexOf(e)<0&&(s[e]=()=>p[e]);r.d(t,s);var f=r(383);s={};for(const e in f)["default","types","submitEventUrl","getValueByPath","setValueByPath","generateCommitID","generateFrom","getPageIdFormUrl","getSessionID","getWebID","maskPhoneNo","nextTick","shallowCopy","throttleOrDebounce","ClueComponentType","ClueLogCompType","ComponentType","autoFillTypeMap","ScenarioType","getConvertContext","getDefaultContext","getDefaultScenario","getGScenarioSubmitFormat","getGenericScenario","getGenericScenarioFromOldScenario","getGenericScenarioFromTrafficSource","getMergedGScenario","getReqIdRitFromLogExtra","cdnOrigins","getServerPath","getStaticPath","serverOrigins","isClient","isFlutter","isH5","isLynx","isServer","setRenderType"].indexOf(e)<0&&(s[e]=()=>f[e]);r.d(t,s)},969:(e,t,r)=>{"use strict";var n,i,o,a;r.d(t,{K1:()=>o,kG:()=>i,nN:()=>a,re:()=>n}),function(e){e.form="form",e.lottery="lottery"}(n||(n={})),function(e){e[e.hisotry=1]="hisotry",e[e.localPhoneNo=2]="localPhoneNo",e[e.loginPhoneNo=3]="loginPhoneNo"}(i||(i={})),function(e){e[e.SMART_PHONE=202]="SMART_PHONE",e[e.FORM=401]="FORM",e[e.LOTTERY=501]="LOTTERY",e[e.COUPON_PACKAGE=601]="COUPON_PACKAGE",e[e.PAY=701]="PAY",e[e.WECHAT=801]="WECHAT",e[e.WECHAT_GAME=802]="WECHAT_GAME",e[e.PAY_V4=901]="PAY_V4",e[e.CONSULT=2001]="CONSULT"}(o||(o={})),function(e){e[e.form=1]="form",e[e.lottery=2]="lottery",e[e.phone=3]="phone",e[e.consult=4]="consult",e[e.new_lottery=5]="new_lottery",e[e.vote=6]="vote",e[e.wechat=7]="wechat",e[e.pay=8]="pay",e[e.pay_v4=9]="pay_v4",e[e.wechat_game=10]="wechat_game"}(a||(a={}))},641:(e,t,r)=>{"use strict";function n(e,t){for(var r=t.split("."),n=e;r.length>0;){var i=r.shift();if("object"!=typeof n)throw new Error("invalid path: "+t);n=n[i]}return n}function i(e,t,r){for(var n=t.split("."),i=e;n.length>0;){var o=n.shift();if(void 0===i&&(i={}),null===i||"number"==typeof i||"boolean"==typeof i)throw new Error("invalid path: "+t);0===n.length?i[o]=r:i=i[o]}}r.d(t,{M:()=>n,P:()=>i})},231:(e,t,r)=>{"use strict";r.d(t,{Eq:()=>a,YO:()=>s,c_:()=>o,lg:()=>c});var n={clue:{prod:"clue.oceanengine.com",boe:"clue-boe.oceanengine.com"},chengzi:{prod:"www.chengzijianzhan.com",boe:"www-boe.chengzijianzhan.com"}},i={"tos-lf1-hs":"lf1-cdn-tos.huoshanstatic.com","tos-lf3-hs":"lf3-cdn-tos.huoshanstatic.com","tos-lf6-hs":"lf6-cdn-tos.huoshanstatic.com","tos-sf3-tt":"sf3-cdn-tos.douyinstatic.com","tos-sf1-tt":"sf3-cdn-tos.douyinstatic.com","tos-sf6-tt":"sf3-cdn-tos.douyinstatic.com","tos-sf6-hs":"sf6-cdn-tos.huoshanstatic.com","verify.snssdk":"verify.snssdk.com"},o=Object.keys(n).reduce((function(e,t){return e[t]=t,e}),{});function a(e,t,r){return void 0===t&&(t=""),void 0===r&&(r=!0),(r?"https":"http")+"://"+n[e].prod+t}var s=Object.keys(i).reduce((function(e,t){return e[t]=t,e}),{});function c(e,t){return void 0===t&&(t=""),"https://"+i[e]+t}},383:()=>{},10:(e,t,r)=>{"use strict";r.r(t),r.d(t,{getType:()=>n,isArr:()=>a,isBool:()=>u,isFn:()=>o,isNum:()=>l,isObj:()=>d,isPlainObj:()=>s,isRegExp:()=>_,isStr:()=>c});var n=function(e){return Object.prototype.toString.call(e)},i=function(e){return function(t){return null!=t&&n(t)==="[object "+e+"]"}},o=i(["Function","AsyncFunction","GeneratorFunction"]),a=Array.isArray,s=i("Object"),c=i("String"),u=i("Boolean"),l=i("Number"),d=function(e){return"object"==typeof e},_=i("RegExp")},424:(e,t,r)=>{"use strict";function n(e,t,r){for(var n in void 0===r&&(r=!1),e)if(Object.prototype.hasOwnProperty.call(e,n)){var i=e[n];r?""!==i&&null!=i&&(t[n]=i):t[n]=i}}function i(e){"function"==typeof Promise&&"function"==typeof Promise.resolve?Promise.resolve().then(e):setTimeout(e)}function o(e,t,r,n){var i="throttle"===e,o=(i?"throttle":"debounce")+"_"+(t.name||"anonymous");try{return Function("fn","ctx","\n      var canCall = true;\n      var callTimer;\n      var lastCallTimer;\n\n      return function "+o+"() {\n        if (lastCallTimer) {\n          clearTimeout(lastCallTimer);\n          lastCallTimer = null;\n        }\n\n        if (canCall) {\n          canCall = false;\n          try {\n            fn.apply(ctx, arguments);\n          } finally {\n            if ("+i+") {\n              callTimer = setTimeout(() => {\n                callTimer = null;\n                canCall = true;\n              }, "+r+");\n            }\n          }\n        } else {\n          var args = arguments;\n          lastCallTimer = setTimeout(function lastCall_"+o+"() {\n            lastCallTimer = null;\n            fn.apply(ctx, args);\n          }, "+r+");\n        }\n\n        if ("+!i+") {\n          if (callTimer) {\n            clearTimeout(callTimer);\n          }\n\n          callTimer = setTimeout(() => {\n            callTimer = null;\n            canCall = true;\n          }, "+r+");\n        }\n      }\n    ")(t,n)}catch(e){return console.info("throttleOrDebounce error",e),t}}r.d(t,{DC:()=>n,HT:()=>l,VK:()=>s,Y3:()=>i,e9:()=>f,jp:()=>m,mL:()=>_,n$:()=>p,vw:()=>o});var a={data:{},get:function(e){if(e in this.data)return this.data[e];if(window&&localStorage){var t=localStorage.getItem(e)||"";if(t)return this.data[e]=t}return""},set:function(e,t){if(this.data[e]=t,window&&localStorage)try{localStorage.setItem(e,t)}catch(e){}}};function s(e,t){void 0===e&&(e=32);for(var r=(t=t||"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789").length,n="",i=0;i<e;i++)n+=t.charAt(~~(Math.random()*r));return n}function c(){var e=s(1,"123456789")+s(2,"0123456789"),t=Date.now(),r=Number(e)*t%100+"";return""+e+t+(r=r.length<2?"0"+r:r)}var u="__clue_web_id_921e691f871caa6e729d47babff8ead6__";function l(){var e=a.get(u);return e||(e=function(){for(var e=s(8),t=Date.now().toString(36).slice(0,8),r=s(8),n=(parseInt(e,36)+parseInt(t,36)+parseInt(r,36)).toString(36).slice(0,8),i="",o=0;o<8;o++)i+=e[o]+t[o]+r[o];return""+i+n}(),a.set(u,e)),e}var d,_=(d=c(),function(){return d}),p=c;function f(e){var t=e.match(/\/tetris\/(?:page|ultra|store)\/(?:creative\/)?(\d+)\b/);return t&&t.length>1?t[1]:""}function m(e){return e.replace(/(\d{3})(\*{4})(\d{2})(\d{2})/,"$1******$4")}}},t={};function r(n){var i=t[n];if(void 0!==i)return i.exports;var o=t[n]={exports:{}};return e[n].call(o.exports,o,o.exports,r),o.exports}return r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r(224)})()));
//# sourceMappingURL=index.js.map