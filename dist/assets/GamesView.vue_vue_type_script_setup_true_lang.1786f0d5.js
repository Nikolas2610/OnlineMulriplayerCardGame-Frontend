import{M as y}from"./MyTitle.42b29322.js";import{a as D,M as E}from"./ModalSecondaryButton.3030f7a0.js";import{d as S,a4 as B,a as R,r as u,b as N,o,c as a,i as t,k as _,j as l,l as i,m as n,H as p,I as w,C as d,L as O}from"./index.9e6e0a8e.js";import{u as V}from"./GameStore.1cad73da.js";import{P as A}from"./PreLoader.a6559b58.js";import{_ as I}from"./GameForm.vue_vue_type_script_setup_true_lang.f7e86acf.js";import{_ as L}from"./Flex.vue_vue_type_script_setup_true_lang.f0738fbf.js";import{_ as P}from"./BackButton.vue_vue_type_script_setup_true_lang.4067e871.js";import{_ as T}from"./ModalPrimaryButton.vue_vue_type_script_setup_true_lang.252669b6.js";const U={class:"w-full overflow-x-auto px-4"},j={key:0},X={key:0,class:"mx-auto mt-4"},Y={class:"flex flex-col"},H={class:"overflow-x-auto shadow-md sm:rounded-lg"},q={class:"inline-block min-w-full align-middle"},z={class:"overflow-hidden"},J={class:"min-w-full divide-y table-fixed divide-gray-700"},K={class:"bg-gray-700"},Q=t("th",{scope:"col",class:"p-4"},[t("span",{class:"sr-only"},"Edit")],-1),W={class:"divide-y bg-dark divide-gray-700"},Z={class:"py-4 px-6 text-sm font-medium whitespace-nowrap text-white"},ee={class:"py-4 px-6 text-sm font-medium whitespace-nowrap text-white"},te={class:"py-4 px-6 text-sm font-medium whitespace-nowrap text-white"},se={class:"py-4 px-6 text-sm font-medium whitespace-nowrap text-white"},oe=t("span",{class:"text-primary"},"X",-1),ae={class:"py-4 px-6 text-sm font-medium whitespace-nowrap text-white"},le={class:"py-4 px-6 text-sm font-medium text-right whitespace-nowrap"},ie=["onClick"],ne=["onClick"],de={key:1},re=t("div",null," Do you really want to delete this game? This process cannot be undone ",-1),we=S({__name:"GamesView",setup(ce){const e=V(),f=B(),g=R(),k=u("user"),m=u(!1),h=u(null),b=u(["No","NAME","MAX PLAYERS","GRID","PRIVATE"]);f.meta.admin?e.setUserRole("admin"):e.setUserRole("user"),N(async()=>{f.meta.admin&&(k.value=g.$state.user.role,e.setUserRole("admin")),e.fetchGames(),e.editGame=!1,e.stepForm.value=1});const v=()=>{m.value=!1},G=x=>{h.value=e.games[x].id,m.value=!0},M=async()=>{e._delete(h.value).finally(()=>{m.value=!1})},C=async()=>{e.stepForm.submitted.indexOf(!0)!==-1&&await e.fetchGames(),e.editGame=!1,e.stepForm.value=1},F=async()=>{e.stepForm.change[e.stepForm.value-1]?e._update():e.stepForm.value===e.stepForm.change.length?(e.stepForm.submitted.indexOf(!0)!==-1&&await e.fetchGames(),e.stepForm.value=1,e.editGame=!1):e.stepForm.value++};return(x,r)=>(o(),a(p,null,[t("div",U,[_(e).editGame?(o(),a("div",de,[l(L,{justify:"between"},{default:i(()=>[l(y,null,{default:i(()=>[n("Edit Game")]),_:1}),l(P,{title:"Back to Games",onClick:r[0]||(r[0]=s=>C())})]),_:1}),l(I,{onSubmit:r[1]||(r[1]=s=>F())})])):(o(),a("div",j,[l(y,null,{default:i(()=>[n("My Games")]),_:1}),_(e).loading?(o(),O(A,{key:1})):(o(),a("div",X,[t("div",Y,[t("div",H,[t("div",q,[t("div",z,[t("table",J,[t("thead",K,[t("tr",null,[(o(!0),a(p,null,w(b.value,(s,c)=>(o(),a("th",{scope:"col",key:c,class:"py-3 px-6 text-xs font-medium tracking-wider text-left uppercase text-gray-400"},d(s),1))),128)),Q])]),t("tbody",W,[(o(!0),a(p,null,w(_(e).games,(s,c)=>(o(),a("tr",{class:"hover:bg-gray-700",key:`game_${s.id}`},[t("td",Z,d(c+1),1),t("td",ee,d(s.name),1),t("td",te,d(s.max_players),1),t("td",se,[n(d(s.grid_rows)+" ",1),oe,n(" "+d(s.grid_cols),1)]),t("td",ae,d(s.private?"YES":"NO"),1),t("td",le,[t("button",{class:"text-blue-500 hover:underline",onClick:$=>_(e).toggleEditGame(c)}," View Details ",8,ie),t("button",{class:"text-red-500 hover:underline ml-2",onClick:$=>G(c)}," Delete ",8,ne)])]))),128))])])])])])])]))]))]),l(E,{modalOpen:m.value,onCloseModal:v},{modal_header:i(()=>[n(" Are you sure? ")]),body:i(()=>[re]),modal_footer:i(()=>[l(D,{onClick:v},{default:i(()=>[n(" Close ")]),_:1}),l(T,{onClick:r[2]||(r[2]=s=>M()),deleteButton:!0},{default:i(()=>[n(" Delete ")]),_:1})]),_:1},8,["modalOpen"])],64))}});export{we as _};
