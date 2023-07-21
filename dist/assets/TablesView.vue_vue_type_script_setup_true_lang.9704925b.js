import{a as D,M}from"./ModalSecondaryButton.bf18b6b7.js";import{M as v}from"./MyTitle.ce5db6a3.js";import{u as N}from"./TableStore.3264869a.js";import{_ as $,S as I}from"./TableForm.vue_vue_type_script_setup_true_lang.2339e3d0.js";import{P as L}from"./PreLoader.a049e412.js";import{d as R,a4 as B,r as T,v as P,o as i,c as l,k as s,j as n,l as d,m as u,i as e,H as g,I as b,C as r,G as V,L as G}from"./index.31bb550f.js";import{_ as O}from"./BackButton.vue_vue_type_script_setup_true_lang.9d70059d.js";import{_ as U}from"./Flex.vue_vue_type_script_setup_true_lang.4c56f787.js";import{_ as Y}from"./ModalPrimaryButton.vue_vue_type_script_setup_true_lang.d5f9a0c3.js";import{T as c}from"./PlayerStore.bc49c745.js";const F={class:"w-full overflow-x-auto px-4"},j={key:0},H={key:0,class:"mx-auto mt-4"},z={class:"flex flex-col"},W={class:"overflow-x-auto shadow-md sm:rounded-lg"},q={class:"inline-block min-w-full align-middle"},J={class:"overflow-hidden"},K={class:"min-w-full divide-y table-fixed divide-gray-700"},Q={class:"bg-gray-700"},X=e("th",{scope:"col",class:"p-4"},[e("span",{class:"sr-only"},"Edit")],-1),Z={class:"divide-y bg-dark divide-gray-700"},ee={class:"py-4 px-6 text-sm font-medium whitespace-nowrap text-white"},te={class:"py-4 px-6 text-sm font-medium whitespace-nowrap text-white"},se={class:"py-4 px-6 text-sm font-medium whitespace-nowrap text-white"},oe={class:"py-4 px-6 text-sm font-medium whitespace-nowrap text-white"},ae={class:"py-4 px-6 text-sm font-medium whitespace-nowrap text-white"},ie={class:"py-4 px-6 text-sm font-medium text-right whitespace-nowrap"},le=["onClick"],ne=["onClick"],de={key:1},re=e("div",null," Do you really want to delete this table? This process cannot be undone. ",-1),Te=R({__name:"TablesView",setup(ce){const k=B(),o=N(),_=T(!1),h=P(()=>o.tables),S=T(["No","NAME","PRIVATE","STATUS","GAME","CREATED AT"]);k.meta.admin?o.setUserRole("admin"):o.setUserRole("user");const x=()=>{_.value=!1},E=p=>{const a=new Date(p),t=a.toLocaleDateString();return`${a.toLocaleTimeString()} - ${t}`},C=()=>{_.value=!1,o._delete()},A=p=>{o.selectedTableId=h.value[p].id,_.value=!0};return o.fetchTables(),o.fetchGames(),(p,a)=>(i(),l("div",F,[s(o).editTable?(i(),l("div",de,[n(U,{justify:"between"},{default:d(()=>[n(v,null,{default:d(()=>[u("Edit Table")]),_:1}),n(O,{title:"Back to Tables",onClick:a[0]||(a[0]=t=>s(o).editTable=!1)})]),_:1}),n($,{onSubmit:a[1]||(a[1]=()=>s(o)._update())})])):(i(),l("div",j,[n(v,null,{default:d(()=>[u("My Tables")]),_:1}),s(o).loadingStatus?(i(),G(L,{key:1})):(i(),l("div",H,[e("div",z,[e("div",W,[e("div",q,[e("div",J,[e("table",K,[e("thead",Q,[e("tr",null,[(i(!0),l(g,null,b(S.value,(t,m)=>(i(),l("th",{scope:"col",key:m,class:"py-3 px-6 text-xs font-medium tracking-wider text-left uppercase text-gray-400"},r(t),1))),128)),X])]),e("tbody",Z,[(i(!0),l(g,null,b(s(h),(t,m)=>{var w,y;return i(),l("tr",{class:"hover:bg-gray-700",key:`table_${t.id}`},[e("td",ee,r(m+1),1),e("td",te,r(t.name),1),e("td",se,r(t.private?"YES":"NO"),1),e("td",{class:V(["py-4 px-6 text-sm font-medium whitespace-nowrap text-white",[t.status===s(c).WAITING?"text-blue-500":"",t.status===s(c).PLAYING||t.status===s(c).FINISH?"text-primary":"",t.status===s(c).PLAYER_DISCONNECTED||t.status===s(c).PLAYER_LEAVE?"text-red-500":"",t.status===s(c).PAUSE||t.status===s(c).GAME_MASTER_EDIT?"text-orange-500":""]])},r(((w=s(I).find(f=>f.id===t.status))==null?void 0:w.name)||"Unknown"),3),e("td",oe,r((y=t.game)==null?void 0:y.name),1),e("td",ae,r(E(t.created_at)),1),e("td",ie,[e("button",{class:"text-blue-500 hover:underline",onClick:f=>s(o).toggleEditTable(m)}," View Details ",8,le),e("button",{class:"text-red-500 hover:underline ml-2",onClick:f=>A(m)}," Delete ",8,ne)])])}),128))])])])])])])]))])),n(M,{modalOpen:_.value,onCloseModal:x},{modal_header:d(()=>[u(" Are you sure? ")]),body:d(()=>[re]),modal_footer:d(()=>[n(D,{onClick:x},{default:d(()=>[u(" Close ")]),_:1}),n(Y,{onClick:a[2]||(a[2]=t=>C()),deleteButton:!0},{default:d(()=>[u(" Delete ")]),_:1})]),_:1},8,["modalOpen"])]))}});export{Te as _};
