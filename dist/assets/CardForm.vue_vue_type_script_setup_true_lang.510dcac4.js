import{d as _,b as h,e as r,n as y,o as d,c,h as e,D as v,I as k,N as x,j as D,C as m,V as C}from"./index.afe561d7.js";import{l as w}from"./Function.92d05e83.js";const F=["onSubmit"],M=e("label",{for:"name",class:"block text-lg font-medium"},"Name",-1),V={class:"mt-1"},B={class:"mt-4 flex"},I=e("label",{for:"private",class:"block text-lg font-medium mr-2"},"Private",-1),N={class:"mt-4 relative"},R=e("label",{for:"imageFile",class:"block text-lg font-medium"},"Image",-1),S={class:"mt-1"},E=["src"],U={class:"flex justify-center"},j=e("button",{class:"mt-4 btn-green",type:"submit"}," Submit ",-1),L=_({__name:"CardForm",props:["successResponse","cardData","imageFile","edit"],emits:["sendData","closeEditMode"],setup(u,{emit:p}){const o=u;h(()=>{o.cardData&&(a.value.name=o.cardData.name,a.value.private=o.cardData.private),o.imageFile&&(l.value=o.imageFile)});const l=r(),a=r({name:"",private:!1}),i=r({file:"",name:""}),f=n=>{const t=n.target.files[0];i.value.name=t.name,i.value.file=t;const s=new FileReader;s.onload=()=>{l.value=s.result},s.readAsDataURL(t)},b=()=>{p("sendData",a.value,i.value,o.cardData)},g=()=>{a.value.name="",a.value.private=!1,l.value=""};return y(()=>o.successResponse,n=>{n===1&&g()}),(n,t)=>a.value?(d(),c("form",{key:0,class:"mt-10 px-4 py-8",onSubmit:C(b,["prevent"])},[M,e("div",V,[v(e("input",{id:"name",type:"text","onUpdate:modelValue":t[0]||(t[0]=s=>a.value.name=s),class:"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-lg"},null,512),[[k,a.value.name]])]),e("div",B,[I,v(e("input",{id:"private",type:"checkbox","onUpdate:modelValue":t[1]||(t[1]=s=>a.value.private=s)},null,512),[[x,a.value.private]])]),e("div",N,[R,e("div",S,[e("input",{id:"imageFile",type:"file",class:"rounded-md border border-gray-300",onChange:f},null,32),l.value?(d(),c("img",{key:0,src:D(w)(l.value),class:"w-52 h-60 mt-4"},null,8,E)):m("",!0)])]),e("div",U,[j,u.edit?(d(),c("button",{key:0,class:"mt-4 ml-2 btn-grey",type:"button",onClick:t[2]||(t[2]=s=>n.$emit("closeEditMode"))}," Back ")):m("",!0)])],40,F)):m("",!0)}});export{L as _};
