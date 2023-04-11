import{d as k,t as b,j as e,o,c as r,h as n,i as l,C as m,K as c,w as x,V as $}from"./index.34df172d.js";import{a as T,b as _,_ as h}from"./CheckBoxField.vue_vue_type_script_setup_true_lang.61da2be3.js";import{u as S}from"./TableStore.6e74c9ae.js";import{_ as f}from"./InputField.vue_vue_type_script_setup_true_lang.b2f0d15c.js";import{u as C,r as v,m as P,a as I}from"./index.esm.bc6cbcb5.js";import{P as N}from"./PreLoader.075b38d4.js";import{_ as B}from"./PrimaryButton.vue_vue_type_script_setup_true_lang.f3a9d834.js";import{T as u}from"./socket.78fac465.js";const V=[{id:u.PAUSE,name:"Pause"},{id:u.FINISH,name:"Finish"},{id:u.PLAYING,name:"Playing"},{id:u.WAITING,name:"Waiting"}],G=["onSubmit"],L={key:0,class:"grid grid-cols-2"},q={class:"col-span-2"},A={class:"col-span-2"},F={key:0,class:"col-span-2"},U={key:1,class:"col-span-2 mb-3"},j={key:2,class:"col-span-2 mb-3"},D={key:1},E={class:"flex justify-center mt-8"},M=n("button",{class:"btn-green",type:"submit"},"Submit",-1),W=n("button",{type:"submit",class:"rounded-md w-full border border-transparent bg-primary text-white px-8 py-3 text-base font-medium hover:bg-secondary hover:text-white md:py-3 md:px-10 md:text-lg"}," Submit ",-1),H={key:1},te=k({__name:"TableForm",emits:["submit"],setup(K,{emit:Y}){const t=S(),i=b(()=>t.editTable?t.edit:t.table),y=b(()=>({name:{required:v,minLength:P(4)},password:{requiredIf:I(()=>t.table.private)},game:{required:v}})),d=C(y,t.editTable?t.edit:t.table),g=async()=>{t.editTable?t._update():(await d.value.$validate(),d.value.$error||(d.value.$reset(),t._submit()))};return(w,a)=>{var p;return e(t).loadingStatus?(o(),r("div",H,[l(N)])):(o(),r("form",{key:0,class:"px-4 py-8",onSubmit:$(g,["prevent"])},[e(i)?(o(),r("div",L,[n("div",q,[l(f,{input:e(i).name,title:"Name",errors:e(d).name.$errors,onChange:a[0]||(a[0]=s=>e(i).name=s)},null,8,["input","errors"])]),n("div",A,[l(T,{title:"Private",input:e(i).private,class:"mb-3",onChange:a[1]||(a[1]=s=>e(i).private=s)},null,8,["input"])]),e(i).private?(o(),r("div",F,[l(f,{input:e(i).password?e(i).password:"",type:"password",title:"Password",errors:e(d).password.$errors,onChange:a[2]||(a[2]=s=>e(i).password=s)},null,8,["input","errors"])])):m("",!0),e(t).games?(o(),r("div",U,[l(_,{title:"Game",input:e(t).editTable?{value:(p=e(t).edit.game)==null?void 0:p.id}:{value:e(t).table.game},options:e(t).games.map(s=>({id:s.id,name:s.name})),onUpdate:a[3]||(a[3]=s=>e(t).updateSelectedGame(s)),errors:e(d).game.$errors},null,8,["input","options","errors"])])):m("",!0),e(t).editTable?(o(),r("div",j,[l(_,{title:"Status",input:{value:e(t).edit.status},options:e(V).map(s=>({id:s.id,name:s.name})),onUpdate:a[4]||(a[4]=s=>e(t).edit.status=s)},null,8,["input","options"])])):m("",!0)])):m("",!0),e(t).editTable?(o(),r("div",D,[e(t).role==="admin"?(o(),c(B,{key:0,title:"Delete Table Settings",onClick:a[5]||(a[5]=s=>e(t)._deleteTableDetails())})):m("",!0),n("div",E,[n("button",{class:"mr-2 btn-grey",type:"button",onClick:a[6]||(a[6]=s=>e(t).editTable=!1)},"Back"),M])])):(o(),c(h,{key:2,class:"mt-8"},{default:x(()=>[W,n("button",{class:"rounded-md w-full border border-transparent bg-gray-400 px-8 py-3 text-base font-medium text-white hover:bg-secondary hover:text-white md:py-3 md:px-10 md:text-lg ml-2",onClick:a[7]||(a[7]=s=>w.$emit("closeModal"))}," Close ")]),_:1}))],40,G))}}});export{te as _};