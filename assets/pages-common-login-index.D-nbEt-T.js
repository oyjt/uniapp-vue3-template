import{d as l,r as a,V as e,I as s,J as t,o as u,c as n,w as o,i,W as c,T as d,a as r,b as f,e as m,M as _,X as p,h as b,B as v,C as g,Y as x,Z as y,a0 as h,g as w,a1 as C,_ as V}from"./index-DbN9StHc.js";const $=V(l({__name:"index",setup(l){const V=a("18502811111"),$=a("1234"),k=a(),Q=a(null),z=e((()=>{const l={};return V.value&&$.value&&(l.color="#fff",l.backgroundColor=uni.$u.color.warning),l}));function q(l){k.value=l}function I(){var l;(null==(l=Q.value)?void 0:l.canGetCode)?(v({title:"正在获取验证码"}),setTimeout((()=>{var l;g(),uni.$u.toast("验证码已发送"),null==(l=Q.value)||l.start()}),1e3)):uni.$u.toast("倒计时结束后再发送")}async function T(){uni.$u.test.mobile(Number(V.value))?$.value?(x("1234567890"),y({url:"/pages/tab/home/index"})):uni.$u.toast("请输入验证码"):uni.$u.toast("请输入正确的手机号")}return(l,a)=>{const e=i,v=h,g=s(t("u-button"),c),x=w,y=C,U=s(t("u-icon"),d);return u(),n(e,null,{default:o((()=>[r(e,{class:"login-form-wrap"},{default:o((()=>[r(e,{class:"title"},{default:o((()=>[f(" 欢迎登录 ")])),_:1}),r(v,{modelValue:m(V),"onUpdate:modelValue":a[0]||(a[0]=l=>_(V)?V.value=l:null),class:"u-border-bottom",type:"number",placeholder:"请输入手机号"},null,8,["modelValue"]),r(e,{class:"u-border-bottom my-40rpx flex"},{default:o((()=>[r(v,{modelValue:m($),"onUpdate:modelValue":a[1]||(a[1]=l=>_($)?$.value=l:null),class:"flex-1",type:"number",placeholder:"请输入验证码"},null,8,["modelValue"]),r(e,null,{default:o((()=>[r(p,{ref_key:"uCodeRef",ref:Q,onChange:q},null,512),r(g,{text:m(k),type:"success",size:"mini",onClick:I},null,8,["text"])])),_:1})])),_:1}),r(y,{class:"login-btn",style:b([m(z)]),onClick:T},{default:o((()=>[f(" 登录 "),r(x,{class:"i-mdi-login"})])),_:1},8,["style"]),r(e,{class:"alternative"},{default:o((()=>[r(e,{class:"password"},{default:o((()=>[f(" 密码登录 ")])),_:1}),r(e,{class:"issue flex items-center"},{default:o((()=>[f(" 遇到问题 "),r(x,{class:"i-mdi-help"})])),_:1})])),_:1})])),_:1}),r(e,{class:"login-type-wrap"},{default:o((()=>[r(e,{class:"item wechat"},{default:o((()=>[r(e,{class:"icon"},{default:o((()=>[r(U,{size:"35",name:"weixin-fill",color:"rgb(83,194,64)"})])),_:1}),f(" 微信 ")])),_:1}),r(e,{class:"item QQ"},{default:o((()=>[r(e,{class:"icon"},{default:o((()=>[r(U,{size:"35",name:"qq-fill",color:"rgb(17,183,233)"})])),_:1}),f(" QQ ")])),_:1})])),_:1}),r(e,{class:"hint"},{default:o((()=>[f(" 登录代表同意 "),r(x,{class:"link"},{default:o((()=>[f(" 用户协议、隐私政策， ")])),_:1}),f(" 并授权使用您的账号信息（如昵称、头像、收获地址）以便您统一管理 ")])),_:1})])),_:1})}}}),[["__scopeId","data-v-7586dc54"]]);export{$ as default};
