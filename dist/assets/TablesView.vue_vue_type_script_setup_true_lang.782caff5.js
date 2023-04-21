import{M as D}from"./Modal.e27e3e69.js";import{M as f}from"./MyTitle.9ce631a7.js";import{u as M}from"./TableStore.951d60d7.js";import{_ as E}from"./TableForm.vue_vue_type_script_setup_true_lang.2c953d15.js";import{P as A}from"./PreLoader.c8a0e3af.js";import{d as $,a3 as N,e as w,v as V,o,c as a,j as i,i as u,k as r,l as p,h as e,H as y,I as v,C as n,L}from"./index.e533216c.js";const R={class:"w-full overflow-x-auto px-4"},B={key:0},O={key:0,class:"mx-auto mt-4"},j={class:"flex flex-col"},I={class:"overflow-x-auto shadow-md sm:rounded-lg"},P={class:"inline-block min-w-full align-middle"},U={class:"overflow-hidden"},F={class:"min-w-full divide-y table-fixed divide-gray-700"},G={class:"bg-gray-700"},H=e("th",{scope:"col",class:"p-4"},[e("span",{class:"sr-only"},"Edit")],-1),Y={class:"divide-y bg-dark divide-gray-700"},q={class:"py-4 px-6 text-sm font-medium whitespace-nowrap text-white"},z={class:"py-4 px-6 text-sm font-medium whitespace-nowrap text-white"},J={class:"py-4 px-6 text-sm font-medium whitespace-nowrap text-white"},K={class:"py-4 px-6 text-sm font-medium whitespace-nowrap text-white"},Q={class:"py-4 px-6 text-sm font-medium whitespace-nowrap text-white"},W={class:"py-4 px-6 text-sm font-medium whitespace-nowrap text-white"},X={class:"py-4 px-6 text-sm font-medium text-right whitespace-nowrap"},Z=["onClick"],ee=["onClick"],te={key:1},se=e("div",null," Do you really want to delete this table? This process cannot be undone. ",-1),ce=$({__name:"TablesView",setup(oe){const b=N(),t=M(),c=w(!1),_=V(()=>t.tables),g=w(["No","NAME","PRIVATE","STATUS","GAME","CREATED AT"]);b.meta.admin?t.setUserRole("admin"):t.setUserRole("user");const h=()=>{c.value=!1},k=m=>{const l=new Date(m),s=l.toLocaleDateString();return`${l.toLocaleTimeString()} - ${s}`},T=()=>{c.value=!1,t._delete()},S=m=>{t.selectedTableId=_.value[m].id,c.value=!0};return t.fetchTables(),t.fetchGames(),(m,l)=>(o(),a("div",R,[i(t).editTable?(o(),a("div",te,[u(f,null,{default:r(()=>[p("Edit Table")]),_:1}),u(E,{onSubmit:l[0]||(l[0]=()=>i(t)._update())})])):(o(),a("div",B,[u(f,null,{default:r(()=>[p("My Tables")]),_:1}),i(t).loadingStatus?(o(),L(A,{key:1})):(o(),a("div",O,[e("div",j,[e("div",I,[e("div",P,[e("div",U,[e("table",F,[e("thead",G,[e("tr",null,[(o(!0),a(y,null,v(g.value,(s,d)=>(o(),a("th",{scope:"col",key:d,class:"py-3 px-6 text-xs font-medium tracking-wider text-left uppercase text-gray-400"},n(s),1))),128)),H])]),e("tbody",Y,[(o(!0),a(y,null,v(i(_),(s,d)=>{var x;return o(),a("tr",{class:"hover:bg-gray-700",key:`table_${s.id}`},[e("td",q,n(d+1),1),e("td",z,n(s.name),1),e("td",J,n(s.private?"YES":"NO"),1),e("td",K,n(s.status),1),e("td",Q,n((x=s.game)==null?void 0:x.name),1),e("td",W,n(k(s.created_at)),1),e("td",X,[e("button",{class:"text-blue-500 hover:underline",onClick:C=>i(t).toggleEditTable(d)}," View Details ",8,Z),e("button",{class:"text-red-500 hover:underline ml-2",onClick:C=>S(d)}," Delete ",8,ee)])])}),128))])])])])])])]))])),u(D,{modalOpen:c.value,onCloseModal:h},{modal_header:r(()=>[p(" Are you sure? ")]),body:r(()=>[se]),modal_footer:r(()=>[e("button",{onClick:l[1]||(l[1]=s=>T()),class:"flex w-full items-center justify-center rounded-md border border-transparent bg-red-500 text-white px-8 py-3 text-base font-medium hover:bg-red-600 hover:text-white md:py-3 md:px-10 md:text-lg"}," Delete "),e("button",{onClick:h,class:"flex w-full items-center justify-center rounded-md border border-transparent bg-gray-400 px-8 font-medium text-white hover:bg-gray-600 hover:text-white md:py-3 md:px-10 md:text-lg ml-2"}," Cancel ")]),_:1},8,["modalOpen"])]))}});export{ce as _};
