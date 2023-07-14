import{d as J,u as Z,r as x,a as G,v as U,o as n,c as d,i as e,j as c,l as t,m as r,C as m,k as p,E as y,J as g,H as f,I as b}from"./index.d3f9d735.js";import{M as K}from"./MyTitle.6a04d441.js";import{a as V,M as L}from"./ModalSecondaryButton.35e6fc49.js";import{c as l,u as O,r as $,m as Q,s as R}from"./index.esm.5d2b6da1.js";import{a as j}from"./axiosUser.c170503f.js";import{_ as B}from"./ModalPrimaryButton.vue_vue_type_script_setup_true_lang.9a8372d0.js";import"./_plugin-vue_export-helper.cdc0426e.js";import"./Flex.vue_vue_type_script_setup_true_lang.812d8e8b.js";const W={class:"w-full overflow-x-auto px-4"},X={class:"flex justify-center mt-10"},Y={class:"lg:w-6/12 w-10-12 bg-dark rounded-lg p-4"},ee={class:"text-white text-center"},se={class:"text-primary"},ae={class:"text-white text-center mt-4"},oe={class:"text-primary"},te=e("div",{class:"text-white text-center mt-4"},[r(" Password: "),e("span",{class:"text-primary"}," ************* ")],-1),re={class:"mt-4 flex"},ne={class:"mb-3"},de=e("label",{for:"username",class:"block text-sm font-medium"},"Username",-1),le={class:"mt-1"},ue={class:"mb-3"},ce=e("label",{for:"old_password",class:"block text-sm font-medium"},"Old Password",-1),ie={class:"mt-1"},me={class:"mb-3"},pe=e("label",{for:"new_password",class:"block text-sm font-medium"},"New Password",-1),we={class:"mt-1"},_e={class:"mb-3"},fe=e("label",{for:"confirm_password",class:"block text-sm font-medium"},"Confirm Password",-1),ve={class:"mt-1"},Pe=J({__name:"SettingsView",setup(he){const i=Z(),v=x(!1),h=x(!1),P=G(),k=U(()=>P.$state.user),w=x({username:""}),o=x({old_password:"",new_password:"",confirm_password:""}),M=()=>{v.value=!1},D=()=>{w.value.username=k.value.username,v.value=!0},N=async()=>{if(await C.value.$validate(),!C.value.$error)try{const u=await j.patch("user/edit/username",{username:w.value.username});if(u.status===200){P.decodeToken(u.data.token),i.success("Username updated successfully"),M();return}i.error("Something went wrong.")}catch(u){i.error(u.response.data.error)}},S=()=>{T(),h.value=!1},A=l.regex(/^(?=.*[A-Z]).*$/),E=l.regex(/^(?=.*[a-z])/),I=l.regex(/^(?=.*[0-9])/),q=l.regex(/[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/),z=U(()=>({old_password:{required:$},new_password:{required:$,minLength:Q(6),passwordUppercase:l.withMessage("The Password must contain at least one Uppercase character.",A),passwordLowercase:l.withMessage("The Password must contain at least one Lowercase character.",E),passwordDigit:l.withMessage("The Password must contain at least one digit.",I),passwordSpecialCharacter:l.withMessage("The Password must have at least one Special Symbol.",q)},confirm_password:{required:$,sameAs:R(o.value.new_password)}})),F=U(()=>({username:{required:$}})),_=O(z,o),C=O(F,w.value),H=async()=>{if(await _.value.$validate(),!_.value.$error){const u={old_password:o.value.old_password,new_password:o.value.new_password};try{const a=await j.patch("user/edit/password",u);T(),a.data.affected===1?i.success("Password updated successfully"):i.error("Something went wrong.")}catch(a){i.error(a.response.data.error)}S()}},T=()=>{o.value.confirm_password="",o.value.new_password="",o.value.old_password=""};return(u,a)=>(n(),d(f,null,[e("div",W,[c(K,null,{default:t(()=>[r("My Personal Info")]),_:1}),e("div",X,[e("div",Y,[e("div",ee,[r(" Username: "),e("span",se,m(p(k).username),1)]),e("div",ae,[r(" Email: "),e("span",oe,m(p(k).email),1)]),te,e("div",re,[e("button",{onClick:D,class:"flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-secondary hover:text-white md:py-2 md:px-10"}," Change Username "),e("button",{onClick:a[0]||(a[0]=s=>h.value=!0),class:"flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-secondary hover:text-white md:py-2 md:px-10 ml-2"}," Change Password ")])])])]),c(L,{modalOpen:v.value,onCloseModal:M},{modal_header:t(()=>[r(" Change Username ")]),body:t(()=>[e("div",ne,[de,e("div",le,[y(e("input",{id:"username",type:"text","onUpdate:modelValue":a[1]||(a[1]=s=>w.value.username=s),class:"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm"},null,512),[[g,w.value.username]])]),(n(!0),d(f,null,b(p(C).username.$errors,s=>(n(),d("div",{key:s.$uid,class:"text-rose-700 text-base font-medium mt-1 px-2"},m(s.$message),1))),128))])]),modal_footer:t(()=>[c(V,{onClick:a[2]||(a[2]=s=>v.value=!1)},{default:t(()=>[r(" Close ")]),_:1}),c(B,{onClick:N},{default:t(()=>[r(" Update Username ")]),_:1})]),_:1},8,["modalOpen"]),c(L,{modalOpen:h.value,onCloseModal:S},{modal_header:t(()=>[r(" Change Password ")]),body:t(()=>[e("div",ue,[ce,e("div",ie,[y(e("input",{id:"old_password",type:"password","onUpdate:modelValue":a[3]||(a[3]=s=>o.value.old_password=s),class:"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm"},null,512),[[g,o.value.old_password]])]),(n(!0),d(f,null,b(p(_).old_password.$errors,s=>(n(),d("div",{key:s.$uid,class:"text-rose-700 text-base font-medium mt-1 px-2"},m(s.$message),1))),128))]),e("div",me,[pe,e("div",we,[y(e("input",{id:"new_password",type:"password","onUpdate:modelValue":a[4]||(a[4]=s=>o.value.new_password=s),class:"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm"},null,512),[[g,o.value.new_password]])]),(n(!0),d(f,null,b(p(_).new_password.$errors,s=>(n(),d("div",{key:s.$uid,class:"text-rose-700 text-base font-medium mt-1 px-2"},m(s.$message),1))),128))]),e("div",_e,[fe,e("div",ve,[y(e("input",{id:"confirm_password",type:"password","onUpdate:modelValue":a[5]||(a[5]=s=>o.value.confirm_password=s),class:"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm"},null,512),[[g,o.value.confirm_password]])]),(n(!0),d(f,null,b(p(_).confirm_password.$errors,s=>(n(),d("div",{key:s.$uid,class:"text-rose-700 text-base font-medium mt-1 px-2"},m(s.$message),1))),128))])]),modal_footer:t(()=>[c(V,{onClick:a[6]||(a[6]=s=>h.value=!1)},{default:t(()=>[r(" Close ")]),_:1}),c(B,{onClick:H},{default:t(()=>[r(" Update Password ")]),_:1})]),_:1},8,["modalOpen"])],64))}});export{Pe as default};