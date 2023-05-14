import{d as g,v as b,k as e,o,c as _,L as d,l as n,j as i,D as u,i as E,m as c,w as P}from"./index.542ccea8.js";import{_ as v}from"./SelectField.vue_vue_type_script_setup_true_lang.d35fb49e.js";import{u as C}from"./TableStore.3bea6897.js";import{_ as y}from"./InputField.vue_vue_type_script_setup_true_lang.45688b00.js";import{_ as w}from"./CheckBoxField.vue_vue_type_script_setup_true_lang.cef64cb4.js";import{u as N,r as S,m as I,a as L}from"./index.esm.b82f64ff.js";import{P as x}from"./PreLoader.461640ce.js";import{_ as A}from"./PrimaryButton.vue_vue_type_script_setup_true_lang.05256df9.js";import{T as l}from"./PlayerStore.6f1305f5.js";import{_ as D}from"./Flex.vue_vue_type_script_setup_true_lang.84cb6120.js";import{_ as p,a as M}from"./GridColItem.vue_vue_type_script_setup_true_lang.873ceba5.js";import{a as G}from"./ModalSecondaryButton.ea03128a.js";import{_ as V}from"./ModalPrimaryButton.vue_vue_type_script_setup_true_lang.422fbacc.js";const B=[{id:l.PAUSE,name:"Pause"},{id:l.FINISH,name:"Finish"},{id:l.PLAYING,name:"Playing"},{id:l.WAITING,name:"Waiting"},{id:l.PLAYER_DISCONNECTED,name:"Player Disconnected"},{id:l.PLAYER_LEAVE,name:"Player Leave"},{id:l.GAME_MASTER_EDIT,name:"Game Master Edit"}],q=["onSubmit"],F={key:1},R={class:"flex justify-center mt-8"},U={key:1},se=g({__name:"TableForm",emits:["submit","closeModal"],setup(Y,{emit:j}){const t=C(),r=b(()=>t.editTable?t.edit:t.table),T=b(()=>({name:{required:S,minLength:I(4)},password:{requiredIf:L(()=>t.table.private)},game:{required:S}})),m=N(T,t.editTable?t.edit:t.table),$=async()=>{t.editTable?t._update():(await m.value.$validate(),m.value.$error||(m.value.$reset(),t._submit()))};return(k,s)=>e(t).loadingStatus?(o(),_("div",U,[i(x)])):(o(),_("form",{key:0,class:"px-4 py-8",onSubmit:P($,["prevent"])},[e(r)?(o(),d(M,{key:0,all:2,gap:2},{default:n(()=>[i(p,{all:2},{default:n(()=>[i(y,{input:e(r).name,title:"Name",errors:e(m).name.$errors,onChange:s[0]||(s[0]=a=>e(r).name=a)},null,8,["input","errors"])]),_:1}),i(p,{all:2},{default:n(()=>[i(w,{title:"Private",input:e(r).private,class:"mb-3",onChange:s[1]||(s[1]=a=>e(r).private=a)},null,8,["input"])]),_:1}),e(r).private?(o(),d(p,{key:0,all:2},{default:n(()=>[i(y,{input:e(r).password?e(r).password:"",title:"Password",errors:e(m).password.$errors,onChange:s[2]||(s[2]=a=>e(r).password=a)},null,8,["input","errors"])]),_:1})):u("",!0),e(t).games?(o(),d(p,{key:1,all:2},{default:n(()=>{var a;return[i(v,{title:"Game",input:e(t).editTable?{value:(a=e(t).edit.game)==null?void 0:a.id}:{value:e(t).table.game},options:e(t).games.map(f=>({id:f.id,name:f.name})),onUpdate:s[3]||(s[3]=f=>e(t).updateSelectedGame(f)),errors:e(m).game.$errors},null,8,["input","options","errors"])]}),_:1})):u("",!0),e(t).editTable?(o(),d(p,{key:2,all:2},{default:n(()=>[i(v,{title:"Status",input:{value:e(t).edit.status},options:e(B).map(a=>({id:a.id,name:a.name})),onUpdate:s[4]||(s[4]=a=>e(t).edit.status=a)},null,8,["input","options"])]),_:1})):u("",!0)]),_:1})):u("",!0),e(t).editTable?(o(),_("div",F,[e(t).role==="admin"?(o(),_("button",{key:0,title:"Delete Table Settings",class:"text-red-500 cursor-pointer hover:text-red-700",onClick:s[5]||(s[5]=a=>e(t)._deleteTableDetails())},"Delete table data (users, decks, cards) expect the table")):u("",!0),E("div",R,[i(A,{title:"Submit",type:"submit"})])])):(o(),d(D,{key:2,class:"mt-8"},{default:n(()=>[i(G,{onClick:s[6]||(s[6]=a=>k.$emit("closeModal"))},{default:n(()=>[c(" Close ")]),_:1}),i(V,{type:"submit"},{default:n(()=>[c(" Submit ")]),_:1})]),_:1}))],40,q))}});export{B as S,se as _};
