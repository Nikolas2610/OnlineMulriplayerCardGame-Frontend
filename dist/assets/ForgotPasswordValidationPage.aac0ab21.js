import{d as i,a as u,e as l,u as d,b as m,r as a,o as p,c as g,i as f}from"./index.34df172d.js";import{P as h}from"./PreLoader.075b38d4.js";import"./_plugin-vue_export-helper.cdc0426e.js";const w={class:"container"},b=i({__name:"ForgotPasswordValidationPage",setup(k){const r=u(),t=l({message:0,loading:!1}),o=d();m(async()=>{t.value.loading=!0;const e=c();if(!e){a.push({name:"404"});return}const s=await r.forgotPasswordVerify(e);n(s),t.value.loading=!1});const n=e=>{switch(e){case"success":a.push({name:"reset-password"});break;case"Bad confirmation token":case"Bad Request":o.error("This token is not exists. If you want to login, please create an account!"),a.push({name:"register"});break;case"Forgot password token expired":o.error("Your Token has expired. A new email has send to your email activate your account."),a.push({name:"login"});break;default:o.error("Something went wrong. Please try again in a few minutes."),a.push({name:"login"});break}},c=()=>{const e=window.location.search;return new URLSearchParams(e).get("token")};return(e,s)=>(p(),g("div",w,[f(h)]))}});export{b as default};