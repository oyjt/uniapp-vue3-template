import{d as a,g as e,c as l,a1 as s,a2 as t,a3 as u,M as o,N as n,o as i,a as c,w as r,i as d,a4 as f,Z as m,b as _,h as p,e as b,P as v,a5 as g,l as x,G as y,H as h,a6 as w,a7 as C,a8 as $,k,a9 as V,aa as Q,_ as T}from"./index-grVS5wBQ.js";const z=T(a({__name:"index",setup(a){const T=e("18502811111"),z=e("1234"),U=e(),q=e(null);let G=Q;const I=l((()=>{const a={};return T.value&&z.value&&(a.color="#fff",a.backgroundColor=uni.$u.color.warning),a}));function N(a){U.value=a}function R(){var a;(null==(a=q.value)?void 0:a.canGetCode)?(y({title:"正在获取验证码"}),setTimeout((()=>{var a;h(),uni.$u.toast("验证码已发送"),null==(a=q.value)||a.start()}),1e3)):uni.$u.toast("倒计时结束后再发送")}async function j(){uni.$u.test.mobile(Number(T.value))?z.value?(w("1234567890"),setTimeout((()=>{uni.$u.route({type:C(G)?"switchTab":"redirectTo",url:G})}),800)):uni.$u.toast("请输入验证码"):uni.$u.toast("请输入正确的手机号")}return s((a=>{a.redirect&&t(a.redirect)!==u&&(G=decodeURIComponent(a.redirect))})),(a,e)=>{const l=d,s=$,t=o(n("u-button"),f),u=k,y=V,h=o(n("u-icon"),m);return i(),c(l,null,{default:r((()=>[_(l,{class:"login-form-wrap"},{default:r((()=>[_(l,{class:"title"},{default:r((()=>[p(" 欢迎登录 ")])),_:1}),_(s,{modelValue:b(T),"onUpdate:modelValue":e[0]||(e[0]=a=>v(T)?T.value=a:null),class:"u-border-bottom",type:"number",placeholder:"请输入手机号"},null,8,["modelValue"]),_(l,{class:"u-border-bottom my-40rpx flex"},{default:r((()=>[_(s,{modelValue:b(z),"onUpdate:modelValue":e[1]||(e[1]=a=>v(z)?z.value=a:null),class:"flex-1",type:"number",placeholder:"请输入验证码"},null,8,["modelValue"]),_(l,null,{default:r((()=>[_(g,{ref_key:"uCodeRef",ref:q,onChange:N},null,512),_(t,{text:b(U),type:"success",size:"mini",onClick:R},null,8,["text"])])),_:1})])),_:1}),_(y,{class:"login-btn",style:x([b(I)]),onClick:j},{default:r((()=>[p(" 登录 "),_(u,{class:"i-mdi-login"})])),_:1},8,["style"]),_(l,{class:"alternative"},{default:r((()=>[_(l,{class:"password"},{default:r((()=>[p(" 密码登录 ")])),_:1}),_(l,{class:"issue flex items-center"},{default:r((()=>[p(" 遇到问题 "),_(u,{class:"i-mdi-help"})])),_:1})])),_:1})])),_:1}),_(l,{class:"login-type-wrap"},{default:r((()=>[_(l,{class:"item wechat"},{default:r((()=>[_(l,{class:"icon"},{default:r((()=>[_(h,{size:"35",name:"weixin-fill",color:"rgb(83,194,64)"})])),_:1}),p(" 微信 ")])),_:1}),_(l,{class:"item QQ"},{default:r((()=>[_(l,{class:"icon"},{default:r((()=>[_(h,{size:"35",name:"qq-fill",color:"rgb(17,183,233)"})])),_:1}),p(" QQ ")])),_:1})])),_:1}),_(l,{class:"hint"},{default:r((()=>[p(" 登录代表同意 "),_(u,{class:"link"},{default:r((()=>[p(" 用户协议、隐私政策， ")])),_:1}),p(" 并授权使用您的账号信息（如昵称、头像、收获地址）以便您统一管理 ")])),_:1})])),_:1})}}}),[["__scopeId","data-v-a87b5d71"]]);export{z as default};
