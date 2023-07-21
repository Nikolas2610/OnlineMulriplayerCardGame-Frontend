import{d as R,u as P,r as c,b as F,o as m,c as u,i as e,j as r,l,m as i,H as C,I as S,C as d,G as Y,E as x,J as T,Y as j,Z as z,D as G}from"./index.31bb550f.js";import{a as V,M as A}from"./ModalSecondaryButton.bf18b6b7.js";import{M as H}from"./MyTitle.ce5db6a3.js";import{a as M}from"./axiosUser.ec9c9c17.js";import{_ as O}from"./ModalPrimaryButton.vue_vue_type_script_setup_true_lang.d5f9a0c3.js";import"./Flex.vue_vue_type_script_setup_true_lang.4c56f787.js";import"./_plugin-vue_export-helper.cdc0426e.js";const J={class:"w-full overflow-x-auto px-4"},Z={class:"mx-auto mt-4"},q={class:"flex flex-col"},K={class:"overflow-x-auto shadow-md sm:rounded-lg"},Q={class:"inline-block min-w-full align-middle"},W={class:"overflow-hidden"},X={class:"min-w-full divide-y table-fixed divide-gray-700"},ee={class:"bg-gray-700"},te=e("th",{scope:"col",class:"p-4"},[e("span",{class:"sr-only"},"Edit")],-1),se={class:"divide-y bg-dark divide-gray-700"},oe={class:"py-4 px-6 text-sm font-medium whitespace-nowrap text-white"},ae={class:"py-4 px-6 text-sm font-medium whitespace-nowrap text-white"},le={class:"py-4 px-6 text-sm font-medium whitespace-nowrap text-white"},ne={class:"py-4 px-6 text-sm font-medium whitespace-nowrap text-white"},de={class:"py-4 px-6 text-sm font-medium whitespace-nowrap text-white"},re={class:"py-4 px-6 text-sm font-medium whitespace-nowrap text-white"},ie={class:"py-4 px-6 text-sm font-medium text-right whitespace-nowrap"},ce=["onClick"],me=["onClick"],ue={key:0,class:""},pe={class:"mb-3"},_e=e("label",{for:"username",class:"block text-sm font-medium"},"Username",-1),fe={class:"mt-1"},he={class:"mb-3"},ve=e("label",{for:"email",class:"block text-sm font-medium"},"Email",-1),xe={class:"mt-1"},ye={class:"mb-3"},we=e("label",{for:"role",class:"block text-sm font-medium"},"Role",-1),ge=e("option",{value:"admin"},"Admin",-1),be=e("option",{value:"user"},"User",-1),ke=[ge,be],Ce={class:"mt-1 flex"},Me=e("label",{for:"dealer",class:"block text-sm font-medium mr-2"},"Email Confirmed",-1),Ue=e("div",null," Do you really want to delete this user? This process cannot be undone. ",-1),Ne=R({__name:"UsersView",setup(De){const p=P(),_=c([]),y=c(!1),w=c(!1),s=c(),g=c(null),L=c(["ID","USERNAME","EMAIL","ROLE","EMAIL CONFIRM","CREATED AT","UPDATED AT"]);F(()=>{b()});const f=()=>{y.value=!1},h=()=>{w.value=!1},N=o=>{s.value={..._.value[o]},g.value=_.value[o].id,y.value=!0},$=o=>{g.value=_.value[o].id,w.value=!0},b=async()=>{const o=await M.get("admin/users");_.value=o.data},U=o=>{const a=new Date(o),t=a.toLocaleDateString();return`${a.toLocaleTimeString()} - ${t}`},I=async()=>{try{if((await M.delete("admin/user/delete",{data:{id:g.value}})).data.affected===1){p.success("User deleted successfully"),h(),b();return}p.error("Something went wrong. Please try again later")}catch(o){p.error(`Something went wrong. Please try again later. 
${o.response.data.message}`),h()}},B=async()=>{var o,a,t,n,v,D,E;try{if((await M.patch("admin/user/edit",{id:(o=s.value)==null?void 0:o.id,username:(a=s.value)==null?void 0:a.username,email:(t=s.value)==null?void 0:t.email,email_confirmed:(n=s.value)==null?void 0:n.email_confirmed,role:(v=s.value)==null?void 0:v.role})).data.affected===1){p.success("User updated successfully"),f(),b();return}}catch(k){p.error((E=(D=k.response)==null?void 0:D.data)!=null&&E.message?k.response.data.message:"Something went wrong. Please try again later"),f()}};return(o,a)=>(m(),u(C,null,[e("div",J,[r(H,null,{default:l(()=>[i("Users")]),_:1}),e("div",Z,[e("div",q,[e("div",K,[e("div",Q,[e("div",W,[e("table",X,[e("thead",ee,[e("tr",null,[(m(!0),u(C,null,S(L.value,(t,n)=>(m(),u("th",{scope:"col",key:n,class:"py-3 px-6 text-xs font-medium tracking-wider text-left uppercase text-gray-400"},d(t),1))),128)),te])]),e("tbody",se,[(m(!0),u(C,null,S(_.value,(t,n)=>(m(),u("tr",{class:"hover:bg-gray-700",key:`gamme_${t.id}`},[e("td",oe,d(t.id),1),e("td",ae,d(t.username),1),e("td",le,d(t.email),1),e("td",ne,d(t.role),1),e("td",{class:Y(["py-4 px-6 text-sm font-medium whitespace-nowrap",t.email_confirmed?"text-primary":"text-red-500"])},d(t.email_confirmed?"YES":"NO"),3),e("td",de,d(U(t.created_at)),1),e("td",re,d(U(t.updated_at)),1),e("td",ie,[e("button",{class:"text-blue-500 hover:underline",onClick:v=>N(n)}," View Details ",8,ce),e("button",{class:"text-red-500 hover:underline ml-2",onClick:v=>$(n)}," Delete ",8,me)])]))),128))])])])])])])])]),r(A,{modalOpen:y.value,onCloseModal:f},{modal_header:l(()=>[i(" Edit User ")]),body:l(()=>[s.value?(m(),u("div",ue,[e("div",pe,[_e,e("div",fe,[x(e("input",{id:"username",type:"text","onUpdate:modelValue":a[0]||(a[0]=t=>s.value.username=t),class:"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm"},null,512),[[T,s.value.username]])])]),e("div",he,[ve,e("div",xe,[x(e("input",{id:"email",type:"email","onUpdate:modelValue":a[1]||(a[1]=t=>s.value.email=t),class:"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm"},null,512),[[T,s.value.email]])])]),e("div",ye,[we,x(e("select",{id:"role","onUpdate:modelValue":a[2]||(a[2]=t=>s.value.role=t),class:"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm"},ke,512),[[j,s.value.role]])]),e("div",Ce,[Me,x(e("input",{id:"dealer",type:"checkbox","onUpdate:modelValue":a[3]||(a[3]=t=>s.value.email_confirmed=t),class:""},null,512),[[z,s.value.email_confirmed]])])])):G("",!0)]),modal_footer:l(()=>[r(V,{onClick:f},{default:l(()=>[i(" Close ")]),_:1}),r(O,{onClick:B},{default:l(()=>[i(" Save Changes ")]),_:1})]),_:1},8,["modalOpen"]),r(A,{modalOpen:w.value,onCloseModal:h},{modal_header:l(()=>[i(" Are you sure? ")]),body:l(()=>[Ue]),modal_footer:l(()=>[r(V,{onClick:h},{default:l(()=>[i(" Close ")]),_:1}),r(O,{onClick:I,deleteButton:!0},{default:l(()=>[i(" Delete ")]),_:1})]),_:1},8,["modalOpen"])],64))}});export{Ne as default};
