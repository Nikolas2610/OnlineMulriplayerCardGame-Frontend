import{d as i,a as u,r as m,u as l,b as d,e as a,o as g,c as p,j as f}from"./index.6223a65c.js";import{P as h}from"./PreLoader.e3fb3ec5.js";const k={class:"container"},P=i({__name:"UserRegistrationPage",setup(w){const t=u(),r=m({message:0,loading:!1}),o=l();d(async()=>{const e=c();if(!e){a.push({name:"404"});return}const s=await t.userVerify(e);n(s),r.value.loading=!0});const n=e=>{switch(e){case"success":o.success(`Your registration is complete. 
Are you ready to create your own game?`),a.push({name:"login"});break;case"Bad confirmation token":case"Bad Request":o.error("This token is not exists. If you want to login, please create an account!"),a.push({name:"register"});break;case"Email confirmation token expired":o.error("Your Token has expired. A new email has send to your email activate your account."),a.push({name:"login"});break;default:o.error("Something went wrong. Please try again in a few minutes."),a.push({name:"login"});break}},c=()=>{const e=window.location.search;return new URLSearchParams(e).get("token")};return(e,s)=>(g(),p("div",k,[f(h)]))}});export{P as default};