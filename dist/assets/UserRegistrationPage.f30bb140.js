import{d as i,a as u,r as m,u as l,b as p,e as a,o as d,c as g,j as f}from"./index.31bb550f.js";import{P as h}from"./PreLoader.a049e412.js";import"./_plugin-vue_export-helper.cdc0426e.js";const k={class:"container"},b=i({__name:"UserRegistrationPage",setup(w){const t=u(),r=m({message:0,loading:!1}),o=l();p(async()=>{const e=c();if(!e){a.push({name:"404"});return}const s=await t.userVerify(e);n(s),r.value.loading=!0});const n=e=>{switch(e){case"success":o.success(`Your registration is complete. 
Are you ready to create your own game?`),a.push({name:"login"});break;case"Bad confirmation token":case"Bad Request":o.error("This token is not exists. If you want to login, please create an account!"),a.push({name:"register"});break;case"Email confirmation token expired":o.error("Your Token has expired. A new email has send to your email activate your account."),a.push({name:"login"});break;default:o.error("Something went wrong. Please try again in a few minutes."),a.push({name:"login"});break}},c=()=>{const e=window.location.search;return new URLSearchParams(e).get("token")};return(e,s)=>(d(),g("div",k,[f(h)]))}});export{b as default};
