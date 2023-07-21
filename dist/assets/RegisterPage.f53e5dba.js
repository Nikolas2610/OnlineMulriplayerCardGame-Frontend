import{d as $,a as b,u as C,b as P,e as k,r as M,g as S,o as p,c as w,i as r,w as T,j as n,k as s,m as L}from"./index.31bb550f.js";import{_ as l}from"./InputField.vue_vue_type_script_setup_true_lang.d78a427e.js";import{c as o,u as B,r as u,m as g,e as U,s as V}from"./index.esm.bbb68a33.js";const A={class:"flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-dark one-page"},j={class:"container py-20"},z=r("div",{class:"sm:mx-auto sm:w-full sm:max-w-lg"},[r("h2",{class:"mt-6 text-center text-3xl font-bold tracking-tight text-white"},[L(" Register to Join our "),r("br"),r("span",{class:"text-primary"},"Creative Gave")])],-1),N={class:"mt-8 sm:mx-auto sm:w-full sm:max-w-md"},D={class:"bg-primary py-8 px-4 shadow sm:rounded-lg sm:px-10"},E={class:"mt-6 flex w-full justify-center rounded-md cursor-pointer border border-transparent bg-dark py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary"},q={key:0,class:"animate-spin -ml-1 mr-3 h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},F=r("circle",{class:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4"},null,-1),G=r("path",{class:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"},null,-1),H=[F,G],J={key:1},O=$({__name:"RegisterPage",setup(W){const e=b(),c=C();P(()=>{e.authToken&&k.push({name:"home"})});const m=M(!1),h=o.regex(/^(?=.*[A-Z]).*$/),f=o.regex(/^(?=.*[a-z])/),x=o.regex(/^(?=.*[0-9])/),v=o.regex(/[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/),y=S(()=>({username:{required:u,minLength:g(4)},email:{required:u,email:U},password:{required:u,minLength:g(6),passwordUppercase:o.withMessage("The Password must contain at least one Uppercase character.",h),passwordLowercase:o.withMessage("The Password must contain at least one Lowercase character.",f),passwordDigit:o.withMessage("The Password must contain at least one digit.",x),passwordSpecialCharacter:o.withMessage("The Password must have at least one Special Symbol.",v)},confirmPassword:{required:u,sameAs:V(e.userRegister.password)}})),i=B(y,e.userRegister),_=async()=>{if(m.value=!0,await i.value.$validate(),i.value.$error)c.error("Please complete correct the form");else{const d=await e.register();d==="success"?(i.value.$reset(),c.success(`Registration has been created successfully. We have send an email to ${e.userRegister.email} to verify your email address and activate your account.`,{timeout:1e4}),R()):c.error(`Registration fail. 
${d}`)}m.value=!1},R=()=>{e.userRegister.username="",e.userRegister.email="",e.userRegister.password="",e.userRegister.confirmPassword=""};return(d,t)=>(p(),w("div",A,[r("div",j,[z,r("div",N,[r("div",D,[r("form",{class:"space-y-6",onSubmit:t[4]||(t[4]=T(a=>_(),["prevent"]))},[n(l,{class:"text-white",input:s(e).userRegister.username,errors:s(i).username.$errors,title:"Username",onChange:t[0]||(t[0]=a=>s(e).userRegister.username=a)},null,8,["input","errors"]),n(l,{class:"text-white",input:s(e).userRegister.email,type:"email",errors:s(i).email.$errors,title:"Email",onChange:t[1]||(t[1]=a=>s(e).userRegister.email=a)},null,8,["input","errors"]),n(l,{class:"text-white",input:s(e).userRegister.password,type:"password",errors:s(i).password.$errors,title:"Password",onChange:t[2]||(t[2]=a=>s(e).userRegister.password=a)},null,8,["input","errors"]),n(l,{class:"text-white",input:s(e).userRegister.confirmPassword,type:"password",errors:s(i).confirmPassword.$errors,title:"Confirm password",onChange:t[3]||(t[3]=a=>s(e).userRegister.confirmPassword=a)},null,8,["input","errors"]),r("div",null,[r("button",E,[m.value?(p(),w("svg",q,H)):(p(),w("div",J,"Register"))])])],32)])])])]))}});export{O as default};
