import{N as t,O as e,P as l,o as a,c as r,w as s,K as i,n as o,g as n,Q as u,I as c,J as f,j as d,a as p,k as _,b as g,t as b,f as h}from"./index-3ae9664c.js";import{_ as y,a as v}from"./u-icon.1e3c1816.js";import{b as m,_ as x,a as k}from"./u-cell.46b4fd18.js";const C=y({name:"u-status-bar",mixins:[e,l,{props:{bgColor:{type:String,default:t.statusBar.bgColor}}}],data:()=>({}),computed:{style(){const t={};return t.height=uni.$u.addUnit(uni.$u.sys().statusBarHeight,"px"),t.backgroundColor=this.bgColor,uni.$u.deepMerge(t,uni.$u.addStyle(this.customStyle))}}},[["render",function(t,e,l,u,c,f){const d=n;return a(),r(d,{style:o([f.style]),class:"u-status-bar"},{default:s((()=>[i(t.$slots,"default",{},void 0,!0)])),_:3},8,["style"])}],["__scopeId","data-v-f6881482"]]);const S=y({name:"u-navbar",mixins:[e,l,{props:{safeAreaInsetTop:{type:Boolean,default:t.navbar.safeAreaInsetTop},placeholder:{type:Boolean,default:t.navbar.placeholder},fixed:{type:Boolean,default:t.navbar.fixed},border:{type:Boolean,default:t.navbar.border},leftIcon:{type:String,default:t.navbar.leftIcon},leftText:{type:String,default:t.navbar.leftText},rightText:{type:String,default:t.navbar.rightText},rightIcon:{type:String,default:t.navbar.rightIcon},title:{type:[String,Number],default:t.navbar.title},bgColor:{type:String,default:t.navbar.bgColor},titleWidth:{type:[String,Number],default:t.navbar.titleWidth},height:{type:[String,Number],default:t.navbar.height},leftIconSize:{type:[String,Number],default:t.navbar.leftIconSize},leftIconColor:{type:String,default:t.navbar.leftIconColor},autoBack:{type:Boolean,default:t.navbar.autoBack},titleStyle:{type:[String,Object],default:t.navbar.titleStyle}}}],data:()=>({}),emits:["leftClick","rightClick"],methods:{leftClick(){this.$emit("leftClick"),this.autoBack&&u()},rightClick(){this.$emit("rightClick")}}},[["render",function(t,e,l,u,y,m){const x=n,k=c(f("u-status-bar"),C),S=c(f("u-icon"),v),I=h;return a(),r(x,{class:"u-navbar"},{default:s((()=>[t.fixed&&t.placeholder?(a(),r(x,{key:0,class:"u-navbar__placeholder",style:o({height:t.$u.addUnit(t.$u.getPx(t.height)+t.$u.sys().statusBarHeight,"px")})},null,8,["style"])):d("v-if",!0),p(x,{class:_([t.fixed&&"u-navbar--fixed"])},{default:s((()=>[t.safeAreaInsetTop?(a(),r(k,{key:0,bgColor:t.bgColor},null,8,["bgColor"])):d("v-if",!0),p(x,{class:_(["u-navbar__content",[t.border&&"u-border-bottom"]]),style:o({height:t.$u.addUnit(t.height),backgroundColor:t.bgColor})},{default:s((()=>[p(x,{class:"u-navbar__content__left","hover-class":"u-navbar__content__left--hover","hover-start-time":"150",onClick:m.leftClick},{default:s((()=>[i(t.$slots,"left",{},(()=>[t.leftIcon?(a(),r(S,{key:0,name:t.leftIcon,size:t.leftIconSize,color:t.leftIconColor},null,8,["name","size","color"])):d("v-if",!0),t.leftText?(a(),r(I,{key:1,style:o({color:t.leftIconColor}),class:"u-navbar__content__left__text"},{default:s((()=>[g(b(t.leftText),1)])),_:1},8,["style"])):d("v-if",!0)]),!0)])),_:3},8,["onClick"]),i(t.$slots,"center",{},(()=>[p(I,{class:"u-line-1 u-navbar__content__title",style:o([{width:t.$u.addUnit(t.titleWidth)},t.$u.addStyle(t.titleStyle)])},{default:s((()=>[g(b(t.title),1)])),_:1},8,["style"])]),!0),t.$slots.right||t.rightIcon||t.rightText?(a(),r(x,{key:0,class:"u-navbar__content__right",onClick:m.rightClick},{default:s((()=>[i(t.$slots,"right",{},(()=>[t.rightIcon?(a(),r(S,{key:0,name:t.rightIcon,size:"20"},null,8,["name"])):d("v-if",!0),t.rightText?(a(),r(I,{key:1,class:"u-navbar__content__right__text"},{default:s((()=>[g(b(t.rightText),1)])),_:1})):d("v-if",!0)]),!0)])),_:3},8,["onClick"])):d("v-if",!0)])),_:3},8,["class","style"])])),_:3},8,["class"])])),_:3})}],["__scopeId","data-v-11fcb0c4"]]);const I=y({name:"u-cell-group",mixins:[e,l,{props:{title:{type:String,default:t.cellGroup.title},border:{type:Boolean,default:t.cellGroup.border}}}]},[["render",function(t,e,l,u,y,v){const x=h,k=n,C=c(f("u-line"),m);return a(),r(k,{style:o([t.$u.addStyle(t.customStyle)]),class:_([[t.customClass],"u-cell-group"])},{default:s((()=>[t.title?(a(),r(k,{key:0,class:"u-cell-group__title"},{default:s((()=>[i(t.$slots,"title",{},(()=>[p(x,{class:"u-cell-group__title__text"},{default:s((()=>[g(b(t.title),1)])),_:1})]),!0)])),_:3})):d("v-if",!0),p(k,{class:"u-cell-group__wrapper"},{default:s((()=>[t.border?(a(),r(C,{key:0})):d("v-if",!0),i(t.$slots,"default",{},void 0,!0)])),_:3})])),_:3},8,["style","class"])}],["__scopeId","data-v-cee80e8a"]]);const $=y({},[["render",function(t,e){const l=c(f("u-navbar"),S),i=c(f("u-avatar"),x),o=n,u=c(f("u-icon"),v),d=c(f("u-cell"),k),_=c(f("u-cell-group"),I);return a(),r(o,{class:"page-wrap"},{default:s((()=>[p(l,{title:"",placeholder:"","left-icon":"","right-icon":"camera-fill"}),p(o,{class:"flex items-center bg-white pb-30rpx pl-30rpx pr-20rpx"},{default:s((()=>[p(o,{class:"mr-10rpx"},{default:s((()=>[p(i,{src:"/static/logo.png",size:"70"})])),_:1}),p(o,{class:"flex-1"},{default:s((()=>[p(o,{class:"pb-20rpx font-size-18rpx"},{default:s((()=>[g(" uni-app ")])),_:1}),p(o,{class:"u-tips-color font-size-14rpx"},{default:s((()=>[g(" 微信号:uni-app ")])),_:1})])),_:1}),p(o,{class:"ml-10rpx p-10rpx"},{default:s((()=>[p(u,{name:"scan",color:"#969799"})])),_:1}),p(o,{class:"ml-10rpx p-10rpx"},{default:s((()=>[p(u,{name:"arrow-right",color:"#969799"})])),_:1})])),_:1}),p(o,{class:"mt-20rpx bg-white"},{default:s((()=>[p(_,null,{default:s((()=>[p(d,{icon:"rmb-circle",title:"支付","is-link":""})])),_:1})])),_:1}),p(o,{class:"mt-20rpx bg-white"},{default:s((()=>[p(_,null,{default:s((()=>[p(d,{icon:"star",title:"收藏","is-link":""}),p(d,{icon:"photo",title:"相册","is-link":""}),p(d,{icon:"coupon",title:"卡券","is-link":""}),p(d,{icon:"heart",title:"关注","is-link":""})])),_:1})])),_:1}),p(o,{class:"mt-20rpx bg-white"},{default:s((()=>[p(_,null,{default:s((()=>[p(d,{icon:"setting",title:"设置","is-link":""})])),_:1})])),_:1})])),_:1})}]]);export{$ as default};
