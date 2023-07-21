import{d as j,o,c as r,H as _,m as b,C as k,G as w,i as t,r as u,u as O,p as T,q as $,w as q,E as x,J as H,Z as P,j as f,l as m,I as B,k as V,D as G,Y as J,L as Y,e as Z}from"./index.31bb550f.js";import{a as K,M as Q}from"./ModalSecondaryButton.bf18b6b7.js";import{a as W}from"./axiosUser.ec9c9c17.js";import{l as A}from"./helpers.2772eae0.js";import{_ as X}from"./PrimaryButton.vue_vue_type_script_setup_true_lang.dd57d2cf.js";import{_ as N}from"./Flex.vue_vue_type_script_setup_true_lang.4c56f787.js";import{_ as ee}from"./Alert.vue_vue_type_script_setup_true_lang.616c90d6.js";const te=["type","disabled"],ae={key:0,class:"animate-spin -ml-1 h-7 w-7 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},se=t("circle",{class:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4"},null,-1),le=t("path",{class:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"},null,-1),oe=[se,le],re=j({__name:"SecondaryButton",props:{type:{type:String,default:"button"},width:{type:String,default:"52"},title:{type:String,required:!0},loading:{type:Boolean,default:!1},disable:{type:Boolean,default:!1}},setup(i){return(C,h)=>(o(),r("button",{class:w(["flex items-center justify-center rounded-md border border-transparent bg-black text-white px-8 py-2 text-base font-medium hover:bg-opacity-80 hover:text-white md:px-10 md:text-base transition duration-150",[`w-${i.width}`,i.disable?"cursor-not-allowed bg-opacity-50":"cursor-pointer"]]),type:i.type==="button"?"button":"submit",disabled:i.disable},[i.loading?(o(),r("svg",ae,oe)):(o(),r(_,{key:1},[b(k(i.title),1)],64))],10,te))}}),ne=["onSubmit"],ie=t("label",{for:"name",class:"block text-lg font-medium"},"Name",-1),de={class:"mt-1"},ce={class:"mt-4 flex"},ue=t("label",{for:"private",class:"block text-lg font-medium mr-2"},"Private",-1),me=t("h1",{class:"mt-4 text-lg font-medium"},"Card List:",-1),ve={class:"mt-4 grid grid-cols-8 gap-2 px-4 py-8 border rounded-lg shadow-lg"},pe=["src"],fe=t("label",{for:"role",class:"block text-sm font-medium"},"Role",-1),he=t("option",{value:"user"},"User",-1),ye=t("option",{value:"public"},"Public",-1),_e=[he,ye],be={key:0,class:"grid grid-cols-4 mt-4 gap-2 max-h-96 overflow-y-scroll"},ge=["onClick"],xe=["src"],Ve=j({__name:"DeckForm",props:["successResponse","deckData","edit"],emits:["sendData"],setup(i,{emit:C}){const h=i,y=u("user"),g=u(!1),v=u(),n=u([]),M=O(),p=u([]),c=u([]),a=u({name:"",private:!1,cards:[]});T(async()=>{await U(),h.deckData&&(a.value={...h.deckData},a.value.cards=[...h.deckData.cards],a.value&&a.value.cards.forEach(s=>{n.value.push(s.id)}))});const S=()=>{g.value=!1},R=async()=>{c.value.length===0&&p.value.length===0?(M.warning("First you have to create card before choose cards for the deck"),Z.push({name:"create-card"})):g.value=!0},U=async()=>{var s,l;try{const e=await W.get("card");if(e.status===200){if(c.value=(s=e.data.userCards)!=null?s:[],p.value=(l=e.data.publicCards)!=null?l:[],c.value.length>0){v.value=c.value;return}if(p.value.length>0){y.value="public";return}}}catch{M.error("Failed to load the cards")}},D=s=>n.value.includes(s),E=s=>{const l=a.value.cards.findIndex(e=>e.id===s.id);l>=0?(n.value=n.value.filter(e=>e!==s.id),a.value.cards.splice(l,1)):(n.value.push(s.id),a.value.cards.push(s))},F=()=>{C("sendData",a.value)},z=()=>{a.value.name="",a.value.private=!1,a.value.cards=[],n.value=[]},I=()=>{y.value==="user"?(n.value=c.value.map(s=>s.id),a.value.cards=c.value):(n.value=p.value.map(s=>s.id),a.value.cards=p.value)},L=()=>{a.value.cards=[],n.value=[]};return $(()=>y.value,s=>{var l,e;s==="user"?v.value=(l=c.value)!=null?l:[]:v.value=(e=p.value)!=null?e:[]}),$(()=>h.successResponse,s=>{s===1&&z()}),(s,l)=>(o(),r(_,null,[a.value?(o(),r("form",{key:0,class:"mt-10 px-4 py-8",onSubmit:q(F,["prevent"])},[t("div",null,[ie,t("div",de,[x(t("input",{id:"name",type:"text","onUpdate:modelValue":l[0]||(l[0]=e=>a.value.name=e),class:"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-lg"},null,512),[[H,a.value.name]])])]),t("div",ce,[ue,x(t("input",{id:"private",type:"checkbox","onUpdate:modelValue":l[1]||(l[1]=e=>a.value.private=e),class:""},null,512),[[P,a.value.private]])]),f(N,{justify:"center",gap:4},{default:m(()=>[f(re,{title:"Edit cards deck",onClick:R}),f(X,{title:"Submit",type:"submit"})]),_:1}),me,t("div",ve,[(o(!0),r(_,null,B(a.value.cards,e=>(o(),r("div",{class:"col-span-1 flex justify-center items-center flex-col gap-2",key:`sel-${e.id}`},[t("img",{src:V(A)(e.image),class:"w-32 max-h-52"},null,8,pe),t("div",null,k(e.name),1)]))),128))])],40,ne)):G("",!0),f(Q,{modalOpen:g.value,onCloseModal:S},{modal_header:m(()=>[b(" Add or Remove Cards ")]),body:m(()=>{var e;return[t("div",null,[fe,x(t("select",{id:"role","onUpdate:modelValue":l[2]||(l[2]=d=>y.value=d),class:"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm"},_e,512),[[J,y.value]])]),f(N,{gap:4},{default:m(()=>[t("div",{onClick:I,class:"underline py-2 cursor-pointer hover:text-primary transition duration-300"}," Select All "),t("div",{onClick:L,class:"underline py-2 cursor-pointer hover:text-primary transition duration-300"}," Remove All ")]),_:1}),v.value&&((e=v.value)==null?void 0:e.length)>0?(o(),r("div",be,[(o(!0),r(_,null,B(v.value,d=>(o(),r("div",{class:w(["col-span-1 flex justify-center items-center flex-col cursor-pointer hover:bg-secondary hover:text-white rounded-lg p-2 transition duration-300",D(d.id)?"bg-primary":""]),onClick:ke=>E(d),key:d.id},[t("img",{src:V(A)(d.image),class:"w-32 max-h-52"},null,8,xe),t("div",{class:w(["pt-2",D(d.id)?"text-white":""])},k(d.name),3)],10,ge))),128))])):(o(),Y(ee,{key:1,class:"my-4"},{default:m(()=>[b("No available cards")]),_:1}))]}),modal_footer:m(()=>[f(K,{onClick:S},{default:m(()=>[b(" Close ")]),_:1})]),_:1},8,["modalOpen"])],64))}});export{Ve as _};
