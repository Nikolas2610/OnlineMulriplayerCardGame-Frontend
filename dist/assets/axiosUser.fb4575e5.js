import{u as t,a,W as o,r as n}from"./index.7f897f5c.js";const i=t(),s=a(),r=o.create({baseURL:"http://oracle.psillovits.com/api/",headers:{"Content-Type":"application/json"}});r.interceptors.request.use(e=>(e.headers=e.headers||{},e.headers.Authorization=`Bearer ${s.getToken}`,e));r.interceptors.response.use(e=>e,e=>(e.response.status===403&&s.authToken&&(s.resetValues(),i.error("Your session has been expired. Please try to login again!"),n.push({name:"login"})),Promise.reject(e)));export{r as a};
