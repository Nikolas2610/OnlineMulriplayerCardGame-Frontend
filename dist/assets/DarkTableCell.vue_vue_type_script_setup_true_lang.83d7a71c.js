import{d as i,o as s,c as a,i as e,H as d,I as _,C as u,D as p,M as n,G as m}from"./index.31bb550f.js";import{_ as f}from"./_plugin-vue_export-helper.cdc0426e.js";const h={class:"mx-auto mt-4"},y={class:"flex flex-col"},x={class:"relative overflow-x-auto shadow-md rounded-lg"},g={class:"inline-block min-w-full align-middle"},v={class:"overflow-hidden"},b={class:"min-w-full divide-y table-fixed divide-gray-700"},k={class:"bg-gray-700"},w={key:0,scope:"col",class:"p-4"},C=e("span",{class:"sr-only"},"Edit",-1),$=[C],D={class:"divide-y bg-dark divide-gray-700"},N=i({__name:"DarkTable",props:{tableHeaders:{type:Array,required:!0},actions:{type:Boolean,default:!1}},setup(t){return(o,l)=>(s(),a("div",h,[e("div",y,[e("div",x,[e("div",g,[e("div",v,[e("table",b,[e("thead",k,[e("tr",null,[(s(!0),a(d,null,_(t.tableHeaders,(r,c)=>(s(),a("th",{scope:"col",key:c,class:"py-3 px-6 text-xs font-medium tracking-wider text-left uppercase text-gray-400"},u(r),1))),128)),t.actions?(s(),a("th",w,$)):p("",!0)])]),e("tbody",D,[n(o.$slots,"default")])])])])])])]))}}),B={},H={class:"hover:bg-gray-700 transition duration-150"};function S(t,o){return s(),a("tr",H,[n(t.$slots,"default")])}const V=f(B,[["render",S]]),q=i({__name:"DarkTableCell",props:{textColor:{type:String,default:"white"}},setup(t){const o=t,l=()=>`text-${o.textColor}`;return(r,c)=>(s(),a("td",{class:m(["py-4 px-6 text-sm font-medium whitespace-nowrap",l()])},[n(r.$slots,"default")],2))}});export{V as D,N as _,q as a};