import{N as e,O as t,P as o,U as n,o as i,c as a,w as s,k as l,n as r,q as u,F as d,L as c,j as h,b as m,t as p,g,f,I as y,J as b,a as S,K as v,T as x,l as T,V as _,W as C,d as w,r as z,X as N,e as $,M as k,B as I,C as M,Y as B,Z as E}from"./index-3ae9664c.js";import{_ as G,a as P}from"./u-icon.1e3c1816.js";const R=G({name:"u-loading-icon",mixins:[t,o,{props:{show:{type:Boolean,default:e.loadingIcon.show},color:{type:String,default:e.loadingIcon.color},textColor:{type:String,default:e.loadingIcon.textColor},vertical:{type:Boolean,default:e.loadingIcon.vertical},mode:{type:String,default:e.loadingIcon.mode},size:{type:[String,Number],default:e.loadingIcon.size},textSize:{type:[String,Number],default:e.loadingIcon.textSize},text:{type:[String,Number],default:e.loadingIcon.text},timingFunction:{type:String,default:e.loadingIcon.timingFunction},duration:{type:[String,Number],default:e.loadingIcon.duration},inactiveColor:{type:String,default:e.loadingIcon.inactiveColor}}}],data:()=>({array12:Array.from({length:12}),aniAngel:360,webviewHide:!1,loading:!1}),computed:{otherBorderColor(){const e=uni.$u.colorGradient(this.color,"#ffffff",100)[80];return"circle"===this.mode?this.inactiveColor?this.inactiveColor:e:"transparent"}},watch:{show(e){}},mounted(){this.init()},methods:{init(){setTimeout((()=>{}),20)},addEventListenerToWebview(){const e=n(),t=e[e.length-1].$getAppWebview();t.addEventListener("hide",(()=>{this.webviewHide=!0})),t.addEventListener("show",(()=>{this.webviewHide=!1}))}}},[["render",function(e,t,o,n,y,b){const S=g,v=f;return e.show?(i(),a(S,{key:0,class:l(["u-loading-icon",[e.vertical&&"u-loading-icon--vertical"]]),style:r([e.$u.addStyle(e.customStyle)])},{default:s((()=>[y.webviewHide?h("v-if",!0):(i(),a(S,{key:0,class:l(["u-loading-icon__spinner",[`u-loading-icon__spinner--${e.mode}`]]),ref:"ani",style:r({color:e.color,width:e.$u.addUnit(e.size),height:e.$u.addUnit(e.size),borderTopColor:e.color,borderBottomColor:b.otherBorderColor,borderLeftColor:b.otherBorderColor,borderRightColor:b.otherBorderColor,"animation-duration":`${e.duration}ms`,"animation-timing-function":"semicircle"===e.mode||"circle"===e.mode?e.timingFunction:""})},{default:s((()=>["spinner"===e.mode?(i(!0),u(d,{key:0},c(y.array12,((e,t)=>(i(),a(S,{key:t,class:"u-loading-icon__dot"})))),128)):h("v-if",!0)])),_:1},8,["class","style"])),e.text?(i(),a(v,{key:1,class:"u-loading-icon__text",style:r({fontSize:e.$u.addUnit(e.textSize),color:e.textColor})},{default:s((()=>[m(p(e.text),1)])),_:1},8,["style"])):h("v-if",!0)])),_:1},8,["style","class"])):h("v-if",!0)}],["__scopeId","data-v-0f37b144"]]);const q=G({name:"u-button",mixins:[t,o,{props:{hairline:{type:Boolean,default:e.button.hairline},type:{type:String,default:e.button.type},size:{type:String,default:e.button.size},shape:{type:String,default:e.button.shape},plain:{type:Boolean,default:e.button.plain},disabled:{type:Boolean,default:e.button.disabled},loading:{type:Boolean,default:e.button.loading},loadingText:{type:[String,Number],default:e.button.loadingText},loadingMode:{type:String,default:e.button.loadingMode},loadingSize:{type:[String,Number],default:e.button.loadingSize},openType:{type:String,default:e.button.openType},formType:{type:String,default:e.button.formType},appParameter:{type:String,default:e.button.appParameter},hoverStopPropagation:{type:Boolean,default:e.button.hoverStopPropagation},lang:{type:String,default:e.button.lang},sessionFrom:{type:String,default:e.button.sessionFrom},sendMessageTitle:{type:String,default:e.button.sendMessageTitle},sendMessagePath:{type:String,default:e.button.sendMessagePath},sendMessageImg:{type:String,default:e.button.sendMessageImg},showMessageCard:{type:Boolean,default:e.button.showMessageCard},dataName:{type:String,default:e.button.dataName},throttleTime:{type:[String,Number],default:e.button.throttleTime},hoverStartTime:{type:[String,Number],default:e.button.hoverStartTime},hoverStayTime:{type:[String,Number],default:e.button.hoverStayTime},text:{type:[String,Number],default:e.button.text},icon:{type:String,default:e.button.icon},iconColor:{type:String,default:e.button.icon},color:{type:String,default:e.button.color}}}],data:()=>({}),computed:{bemClass(){return this.color?this.bem("button",["shape","size"],["disabled","plain","hairline"]):this.bem("button",["type","shape","size"],["disabled","plain","hairline"])},loadingColor(){return this.plain?this.color?this.color:uni.$u.config.color[`u-${this.type}`]:"info"===this.type?"#c9c9c9":"rgb(200, 200, 200)"},iconColorCom(){return this.iconColor?this.iconColor:this.plain?this.color?this.color:this.type:"info"===this.type?"#000000":"#ffffff"},baseColor(){let e={};return this.color&&(e.color=this.plain?this.color:"white",this.plain||(e["background-color"]=this.color),-1!==this.color.indexOf("gradient")?(e.borderTopWidth=0,e.borderRightWidth=0,e.borderBottomWidth=0,e.borderLeftWidth=0,this.plain||(e.backgroundImage=this.color)):(e.borderColor=this.color,e.borderWidth="1px",e.borderStyle="solid")),e},nvueTextStyle(){let e={};return"info"===this.type&&(e.color="#323233"),this.color&&(e.color=this.plain?this.color:"white"),e.fontSize=this.textSize+"px",e},textSize(){let e=14,{size:t}=this;return"large"===t&&(e=16),"normal"===t&&(e=14),"small"===t&&(e=12),"mini"===t&&(e=10),e}},emits:["click","getphonenumber","getuserinfo","error","opensetting","launchapp"],methods:{clickHandler(){this.disabled||this.loading||uni.$u.throttle((()=>{this.$emit("click")}),this.throttleTime)},getphonenumber(e){this.$emit("getphonenumber",e)},getuserinfo(e){this.$emit("getuserinfo",e)},error(e){this.$emit("error",e)},opensetting(e){this.$emit("opensetting",e)},launchapp(e){this.$emit("launchapp",e)}}},[["render",function(e,t,o,n,c,g){const T=y(b("u-loading-icon"),R),_=f,C=y(b("u-icon"),P),w=x;return i(),a(w,{"hover-start-time":Number(e.hoverStartTime),"hover-stay-time":Number(e.hoverStayTime),"form-type":e.formType,"open-type":e.openType,"app-parameter":e.appParameter,"hover-stop-propagation":e.hoverStopPropagation,"send-message-title":e.sendMessageTitle,"send-message-path":e.sendMessagePath,lang:e.lang,"data-name":e.dataName,"session-from":e.sessionFrom,"send-message-img":e.sendMessageImg,"show-message-card":e.showMessageCard,onGetphonenumber:g.getphonenumber,onGetuserinfo:g.getuserinfo,onError:g.error,onOpensetting:g.opensetting,onLaunchapp:g.launchapp,"hover-class":e.disabled||e.loading?"":"u-button--active",class:l(["u-button u-reset-button",g.bemClass]),style:r([g.baseColor,e.$u.addStyle(e.customStyle)]),onClick:g.clickHandler},{default:s((()=>[e.loading?(i(),u(d,{key:0},[S(T,{mode:e.loadingMode,size:1.15*e.loadingSize,color:g.loadingColor},null,8,["mode","size","color"]),S(_,{class:"u-button__loading-text",style:r([{fontSize:g.textSize+"px"}])},{default:s((()=>[m(p(e.loadingText||e.text),1)])),_:1},8,["style"])],64)):(i(),u(d,{key:1},[e.icon?(i(),a(C,{key:0,name:e.icon,color:g.iconColorCom,size:1.35*g.textSize,customStyle:{marginRight:"2px"}},null,8,["name","color","size"])):h("v-if",!0),v(e.$slots,"default",{},(()=>[S(_,{class:"u-button__text",style:r([{fontSize:g.textSize+"px"}])},{default:s((()=>[m(p(e.text),1)])),_:1},8,["style"])]),!0)],64))])),_:3},8,["hover-start-time","hover-stay-time","form-type","open-type","app-parameter","hover-stop-propagation","send-message-title","send-message-path","lang","data-name","session-from","send-message-img","show-message-card","onGetphonenumber","onGetuserinfo","onError","onOpensetting","onLaunchapp","hover-class","style","onClick","class"])}],["__scopeId","data-v-0e543b30"]]);const K=G({name:"u-code",mixins:[t,o,{props:{seconds:{type:[String,Number],default:e.code.seconds},startText:{type:String,default:e.code.startText},changeText:{type:String,default:e.code.changeText},endText:{type:String,default:e.code.endText},keepRunning:{type:Boolean,default:e.code.keepRunning},uniqueKey:{type:String,default:e.code.uniqueKey}}}],data(){return{secNum:this.seconds,timer:null,canGetCode:!0}},mounted(){this.checkKeepRunning()},watch:{seconds:{immediate:!0,handler(e){this.secNum=e}}},emits:["start","end","change"],methods:{checkKeepRunning(){let e=Number(T(this.uniqueKey+"_$uCountDownTimestamp"));if(!e)return this.changeEvent(this.startText);let t=Math.floor(+new Date/1e3);this.keepRunning&&e&&e>t?(this.secNum=e-t,_(this.uniqueKey+"_$uCountDownTimestamp"),this.start()):this.changeEvent(this.startText)},start(){this.timer&&(clearInterval(this.timer),this.timer=null),this.$emit("start"),this.canGetCode=!1,this.changeEvent(this.changeText.replace(/x|X/,this.secNum)),this.setTimeToStorage(),this.timer=setInterval((()=>{--this.secNum?this.changeEvent(this.changeText.replace(/x|X/,this.secNum)):(clearInterval(this.timer),this.timer=null,this.changeEvent(this.endText),this.secNum=this.seconds,this.$emit("end"),this.canGetCode=!0)}),1e3)},reset(){this.canGetCode=!0,clearInterval(this.timer),this.secNum=this.seconds,this.changeEvent(this.endText)},changeEvent(e){this.$emit("change",e)},setTimeToStorage(){if(this.keepRunning&&this.timer&&this.secNum>0&&this.secNum<=this.seconds){let e=Math.floor(+new Date/1e3);C({key:this.uniqueKey+"_$uCountDownTimestamp",data:e+Number(this.secNum)})}}},beforeDestroy(){this.setTimeToStorage(),clearTimeout(this.timer),this.timer=null}},[["render",function(e,t,o,n,l,r){const u=g;return i(),a(u,{class:"u-code"},{default:s((()=>[h(" 此组件功能由js完成，无需写html逻辑 ")])),_:1})}],["__scopeId","data-v-373e33ee"]]),L=G(w({__name:"index",setup(e){const t=z("18502811111"),o=z("1234"),n=z(),l=z(null),u=N((()=>{const e={};return t.value&&o.value&&(e.color="#fff",e.backgroundColor=uni.$u.color.warning),e}));function d(e){n.value=e}function c(){var e;(null==(e=l.value)?void 0:e.canGetCode)?(I({title:"正在获取验证码"}),setTimeout((()=>{var e;M(),uni.$u.toast("验证码已发送"),null==(e=l.value)||e.start()}),1e3)):uni.$u.toast("倒计时结束后再发送")}function h(){uni.$u.test.mobile(t.value)&&(B("1234567890"),uni.$u.route("/pages/index/index"))}return(e,p)=>{const v=g,T=E,_=y(b("u-button"),q),C=x,w=y(b("u-icon"),P),z=f;return i(),a(v,null,{default:s((()=>[S(v,{class:"login-form-wrap"},{default:s((()=>[S(v,{class:"title"},{default:s((()=>[m(" 欢迎登录 ")])),_:1}),S(T,{modelValue:$(t),"onUpdate:modelValue":p[0]||(p[0]=e=>k(t)?t.value=e:null),class:"u-border-bottom",type:"number",placeholder:"请输入手机号"},null,8,["modelValue"]),S(v,{class:"u-border-bottom my-40rpx flex"},{default:s((()=>[S(T,{modelValue:$(o),"onUpdate:modelValue":p[1]||(p[1]=e=>k(o)?o.value=e:null),class:"flex-1",type:"number",placeholder:"请输入验证码"},null,8,["modelValue"]),S(v,null,{default:s((()=>[S(K,{ref_key:"uCodeRef",ref:l,onChange:d},null,512),S(_,{text:$(n),type:"success",size:"mini",onClick:c},null,8,["text"])])),_:1})])),_:1}),S(C,{style:r([$(u)]),class:"login-btn",onClick:h},{default:s((()=>[m(" 登录 ")])),_:1},8,["style"]),S(v,{class:"alternative"},{default:s((()=>[S(v,{class:"password"},{default:s((()=>[m(" 密码登录 ")])),_:1}),S(v,{class:"issue"},{default:s((()=>[m(" 遇到问题 ")])),_:1})])),_:1})])),_:1}),S(v,{class:"login-type-wrap"},{default:s((()=>[S(v,{class:"item wechat"},{default:s((()=>[S(v,{class:"icon"},{default:s((()=>[S(w,{size:"35",name:"weixin-fill",color:"rgb(83,194,64)"})])),_:1}),m(" 微信 ")])),_:1}),S(v,{class:"item QQ"},{default:s((()=>[S(v,{class:"icon"},{default:s((()=>[S(w,{size:"35",name:"qq-fill",color:"rgb(17,183,233)"})])),_:1}),m(" QQ ")])),_:1})])),_:1}),S(v,{class:"hint"},{default:s((()=>[m(" 登录代表同意 "),S(z,{class:"link"},{default:s((()=>[m(" 用户协议、隐私政策， ")])),_:1}),m(" 并授权使用您的账号信息（如昵称、头像、收获地址）以便您统一管理 ")])),_:1})])),_:1})}}}),[["__scopeId","data-v-7575ef92"]]);export{L as default};
