import{d as l,o,c as r,M as n,G as f}from"./index.2280b556.js";const c=l({__name:"Flex",props:{justify:{type:String,default:"start"},items:{type:String},gap:{type:Number},column:{type:Boolean},columnReverse:{type:Boolean,default:!1},wrap:{type:Boolean,default:!1}},setup(t){const e=t,a=()=>{let s="";return e.gap&&(s+=`gap-${e.gap} `),e.justify&&(s+=`justify-${e.justify} `),e.items&&(s+=`items-${e.items} `),e.column&&(s+="flex-col "),e.wrap&&(s+="flex-wrap "),e.columnReverse&&(s+="flex-col-reverse "),s};return(s,p)=>(o(),r("div",{class:f(["flex",a()])},[n(s.$slots,"default")],2))}});export{c as _};