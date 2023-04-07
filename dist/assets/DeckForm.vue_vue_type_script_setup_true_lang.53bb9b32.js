import{d as R,e as d,m as U,n as _,o as l,c as n,V as $,h as e,D as p,I as E,N as F,C as v,G as f,H as k,j as w,B as C,i as I,w as b,k as O,M as P,F as M}from"./index.afe561d7.js";import{M as A}from"./Modal.97e016a9.js";import{a as L}from"./axiosUser.fe64fb1c.js";import{l as D}from"./Function.92d05e83.js";const T=["onSubmit"],z=e("label",{for:"name",class:"block text-lg font-medium"},"Name",-1),G={class:"mt-1"},H={class:"mt-4 flex"},q=e("label",{for:"private",class:"block text-lg font-medium mr-2"},"Private",-1),J={class:"flex justify-center"},K=e("button",{class:"mt-4 ml-2 btn-green",type:"submit"},"Submit",-1),Q=e("h1",{class:"mt-4 text-lg font-medium"},"Card List:",-1),W={class:"mt-4 grid grid-cols-8 gap-2 px-4 py-8 border rounded-lg shadow-lg"},X=["src"],Y=e("label",{for:"role",class:"block text-sm font-medium"},"Role",-1),Z=e("option",{value:"user"},"User",-1),ee=e("option",{value:"public"},"Public",-1),se=[Z,ee],te={key:0,class:"grid grid-cols-4 mt-4 gap-2 max-h-96 overflow-y-scroll"},oe=["onClick"],ae=["src"],ce=R({__name:"DeckForm",props:["successResponse","deckData","edit"],emits:["sendData","closeEditMode"],setup(h,{emit:V}){const i=h,c=d("user"),u=d(!1),m=d(),r=d([]),t=d({name:"",private:!1,cards:[]});U(()=>{i.deckData&&(t.value={...i.deckData},t.value.cards=[...i.deckData.cards],t.value&&t.value.cards.forEach(o=>{r.value.push(o.id)}))});const x=()=>{u.value=!1},S=async()=>{await g(),u.value=!0},g=async()=>{try{const o=await L.get(`card/${c.value}`);m.value=o.data}catch(o){console.log(o)}},y=o=>r.value.includes(o),B=o=>{const a=t.value.cards.findIndex(s=>s.id===o.id);a>=0?(r.value=r.value.filter(s=>s!==o.id),t.value.cards.splice(a,1)):(r.value.push(o.id),t.value.cards.push(o))},N=()=>{V("sendData",t.value)},j=()=>{t.value.name="",t.value.private=!1,t.value.cards=[],r.value=[]};return _(()=>c.value,o=>{g()}),_(()=>i.successResponse,o=>{o===1&&j()}),(o,a)=>(l(),n(f,null,[t.value?(l(),n("form",{key:0,class:"mt-10 px-4 py-8",onSubmit:$(N,["prevent"])},[e("div",null,[z,e("div",G,[p(e("input",{id:"name",type:"text","onUpdate:modelValue":a[0]||(a[0]=s=>t.value.name=s),class:"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-lg"},null,512),[[E,t.value.name]])])]),e("div",H,[q,p(e("input",{id:"private",type:"checkbox","onUpdate:modelValue":a[1]||(a[1]=s=>t.value.private=s),class:""},null,512),[[F,t.value.private]])]),e("div",J,[h.edit?(l(),n("button",{key:0,class:"mt-4 mr-2 btn-grey",type:"button",onClick:a[2]||(a[2]=s=>o.$emit("closeEditMode"))},"Back")):v("",!0),e("button",{class:"mt-4 btn-outline-green",onClick:S,type:"button"},"Add or Remove Cards"),K]),Q,e("div",W,[(l(!0),n(f,null,k(t.value.cards,s=>(l(),n("div",{class:"col-span-1 flex justify-center items-center flex-col gap-2",key:`sel-${s.id}`},[e("img",{src:w(D)(s.image),class:"w-32 max-h-52"},null,8,X),e("div",null,C(s.name),1)]))),128))])],40,T)):v("",!0),I(A,{modalOpen:u.value,onCloseModal:x},{modal_header:b(()=>[O(" Add or Remove Cards ")]),body:b(()=>[e("div",null,[Y,p(e("select",{id:"role","onUpdate:modelValue":a[3]||(a[3]=s=>c.value=s),class:"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm"},se,512),[[P,c.value]])]),m.value?(l(),n("div",te,[(l(!0),n(f,null,k(m.value,s=>(l(),n("div",{class:M(["col-span-1 flex justify-center items-center flex-col cursor-pointer hover:bg-secondary hover:text-white rounded-lg p-2 transition duration-300",y(s.id)?"bg-primary":""]),onClick:le=>B(s),key:s.id},[e("img",{src:w(D)(s.image),class:"w-32 max-h-52"},null,8,ae),e("div",{class:M(["pt-2",y(s.id)?"text-white":""])},C(s.name),3)],10,oe))),128))])):v("",!0)]),modal_footer:b(()=>[e("button",{class:"flex w-full items-center justify-center rounded-md border border-transparent bg-gray-400 px-8 py-3 text-base font-medium text-white hover:bg-secondary hover:text-white md:py-3 md:px-10 md:text-lg ml-2",onClick:x}," Close ")]),_:1},8,["modalOpen"])],64))}});export{ce as _};
