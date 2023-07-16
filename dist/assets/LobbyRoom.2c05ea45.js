import{_ as ce,D as ve,a as I}from"./DarkTableCell.vue_vue_type_script_setup_true_lang.8106536b.js";import{_ as H}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as n,c as A,M as fe,d as E,L as c,l as e,m as u,j as l,r as _,v as X,k as o,N as ee,h as te,i as m,K as _e,a as we,u as ge,p as ye,q as be,C,D as T,H as q,I as he,G as z,R as K}from"./index.34c63cb3.js";import{_ as Y}from"./PrimaryButton.vue_vue_type_script_setup_true_lang.a5354f07.js";import{_ as M}from"./Flex.vue_vue_type_script_setup_true_lang.afc9e6fc.js";import{_ as D}from"./InputField.vue_vue_type_script_setup_true_lang.97c3a03c.js";import{_ as J,a as $e}from"./GridColItem.vue_vue_type_script_setup_true_lang.a958a6d6.js";import{M as F,a as se,u as xe}from"./ModalSecondaryButton.bf7222f6.js";import{_ as Me,S as Ce}from"./TableForm.vue_vue_type_script_setup_true_lang.50461728.js";import{u as ae}from"./TableStore.e7109c1b.js";import{u as ke,T as S}from"./PlayerStore.79cbd3c7.js";import{b as R,s as Te}from"./helpers.0cfc356a.js";import{R as Se}from"./RemoveButton.131694a8.js";import{u as le,r as oe}from"./index.esm.c8aa7dce.js";import{_ as re}from"./ModalPrimaryButton.vue_vue_type_script_setup_true_lang.0b979b30.js";import{M as Pe}from"./MyTitle.bd37fe65.js";import{_ as Oe}from"./Alert.vue_vue_type_script_setup_true_lang.9caa4906.js";import"./SelectField.vue_vue_type_script_setup_true_lang.e1f78d46.js";import"./CheckBoxField.vue_vue_type_script_setup_true_lang.6074786c.js";import"./PreLoader.eda87eca.js";import"./axiosUser.2076009c.js";const Ae={},Le={class:"container 2xl:w-4/6 px-4 py-4"};function Ie($,k){return n(),A("div",Le,[fe($.$slots,"default")])}const Q=H(Ae,[["render",Ie]]),Re=E({__name:"CreateTableModal",props:{isModalOpen:{type:Boolean,required:!0}},emits:["closeModal"],setup($,{emit:k}){return ae().fetchGames(),(g,y)=>(n(),c(F,{modalOpen:$.isModalOpen,onCloseModal:y[1]||(y[1]=v=>g.$emit("closeModal"))},{modal_header:e(()=>[u(" Create Table ")]),body:e(()=>[l(Me,{onCloseModal:y[0]||(y[0]=v=>g.$emit("closeModal"))})]),_:1},8,["modalOpen"]))}}),Ne=E({__name:"ModalSetGuestUsername",props:{isModalOpen:{type:Boolean,required:!0},username:{type:String,default:""}},emits:["closeModal","registerGuest"],setup($,{emit:k}){const w=$,g=_({username:""});w.username&&(g.value.username=w.username);const y=X(()=>({username:{required:oe}})),v=le(y,g),x=()=>{v.value.$validate(),v.value.$error||k("registerGuest",g.value.username)};return(p,d)=>(n(),c(F,{modalOpen:$.isModalOpen,onCloseModal:d[4]||(d[4]=i=>p.$emit("closeModal")),class:"z-[2147483645]"},{modal_header:e(()=>[u(" Set Nickname ")]),body:e(()=>[l(M,null,{default:e(()=>[l(D,{title:"Nickname",input:g.value.username,onChange:d[0]||(d[0]=i=>g.value.username=i),errors:o(v).username.$errors,onKeyup:d[1]||(d[1]=ee(i=>x(),["enter"]))},null,8,["input","errors"])]),_:1})]),modal_footer:e(()=>[l(se,{onClick:d[2]||(d[2]=i=>p.$emit("closeModal"))},{default:e(()=>[u(" Close ")]),_:1}),l(re,{onClick:d[3]||(d[3]=i=>x())},{default:e(()=>[u(" Submit ")]),_:1})]),_:1},8,["modalOpen"]))}}),Be=E({__name:"ModalSetPasswordTable",props:{isModalOpen:{type:Boolean,required:!0}},emits:["closeModal","setPasswordTable"],setup($,{emit:k}){const w=_({password:""}),g=X(()=>({password:{required:oe}})),y=le(g,w),v=()=>{y.value.$validate(),y.value.$error||k("setPasswordTable",w.value.password)};return(x,p)=>(n(),c(F,{modalOpen:$.isModalOpen,onCloseModal:p[4]||(p[4]=d=>x.$emit("closeModal")),class:"z-[2147483645]"},{modal_header:e(()=>[u(" Password Table ")]),body:e(()=>[l(M,null,{default:e(()=>[l(D,{title:"Table Password",input:w.value.password,onChange:p[0]||(p[0]=d=>w.value.password=d),errors:o(y).password.$errors,onKeyup:p[1]||(p[1]=ee(d=>v(),["enter"]))},null,8,["input","errors"])]),_:1})]),modal_footer:e(()=>[l(se,{onClick:p[2]||(p[2]=d=>x.$emit("closeModal"))},{default:e(()=>[u("Close")]),_:1}),l(re,{onClick:p[3]||(p[3]=d=>v())},{default:e(()=>[u("Submit")]),_:1})]),_:1},8,["modalOpen"]))}}),Ue={},Ze={class:"fixed bottom-0 left-0 w-full bg-primary py-3 px-8 text-white"};function Ve($,k){const w=te("RouterLink");return n(),A("div",Ze,[u(" ***Note: If you would like to create your own game, we kindly ask you to create a "),l(w,{to:{name:"register"},class:"underline"},{default:e(()=>[u("real account")]),_:1}),u(". This will give you full access to all the features and tools you need to bring your game to life. real account. ")])}const Ee=H(Ue,[["render",Ve]]),Ge={},je={type:"button",class:"rounded-md border border-transparent bg-primary text-white px-8 font-medium hover:bg-secondary md:py-1 md:px-3 transition duration-150 text-2xl flex justify-center items-center"},ze=m("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"#FFF",class:"w-7 h-6",viewBox:"0 0 16 16"},[m("path",{"fill-rule":"evenodd",d:"M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"}),m("path",{"fill-rule":"evenodd",d:"M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"})],-1),He=[ze];function De($,k){return n(),A("button",je,He)}const Fe=H(Ge,[["render",De]]),We={class:"text-primary font-bold"},qe=m("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",class:"bi bi-people text-primary h-8 w-8",viewBox:"0 0 16 16"},[m("path",{d:"M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"})],-1),Ke={class:"text-primary"},Ye=m("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",class:"bi bi-people text-[#cc6514] h-8 w-8",viewBox:"0 0 16 16"},[m("path",{d:"M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"})],-1),Je={class:"text-[#cc6514]"},Qe={key:0},Xe=m("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"w-6 h-6 text-red-500",viewBox:"0 0 16 16"},[m("path",{d:"M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"})],-1),et=[Xe],tt={key:1},st=m("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"w-6 h-6 text-primary",viewBox:"0 0 16 16"},[m("path",{d:"M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z"})],-1),at=[st],Ct=E({__name:"LobbyRoom",setup($){const{width:k,height:w}=xe(),g=_(parseInt("600")),y=_(parseInt("1000")),v=_(!1),x=_(!1),p=_(0),d=_e(),i=we(),b=_([]),N=_([]),G=ge(),r=ke(),ne=ae(),Z=_(""),j=_(!1),B=_({countInRoomUsers:0,countOnlineUsers:0});ye(()=>{i.user.id||(v.value=!0),R.emit("getAllOnlineTable",{},a=>{var t;b.value=N.value=(t=a.tables)!=null?t:[],B.value=a.countUsers}),R.on("getLastGame",a=>{r.leaverPlayer.table=r.table={...a}}),R.on("getUsersOnline",a=>{B.value=a}),R.on("getOnlineTable",a=>{a.table_users=[],b.value.unshift(a)}),R.on("getRemoveTable",a=>{b.value=N.value=b.value.filter(t=>t.id!==a)}),R.on("getTableUsers",a=>{var h;const t=b.value.map(s=>s.id).indexOf(a.id);t!==-1&&(b.value[t].table_users=(h=a.table_users)!=null?h:null)}),R.on("getUpdateTable",a=>{const t=b.value.map(h=>h.id).indexOf(a==null?void 0:a.id);t===-1?b.value.push(a):a.status===S.FINISH?b.value.splice(t,1):b.value[t]=a,N.value=b.value.filter(h=>h.name.toLocaleLowerCase().includes(Z.value.toLocaleLowerCase()))})});const W=a=>{var t,h,s,L,U,P;if(r.table=a,!!r.table){if(!i.user.id){v.value=!0;return}if(r.table.private){x.value=!0;return}if(!(!((t=r.table.game)!=null&&t.max_players)||!((h=r.table)!=null&&h.table_users))){if(((L=(s=r.table)==null?void 0:s.table_users)==null?void 0:L.length)<((U=r.table.game)==null?void 0:U.max_players)){r.leaverPlayer.table=null,d.push({name:"room",params:{id:r.table.public_url}});return}if(((P=r.leaverPlayer)==null?void 0:P.table)&&(a==null?void 0:a.table_users)&&(a==null?void 0:a.table_users.find(O=>O.user.id===i.user.id))){r.leaverPlayer.table=null,d.push({name:"room",params:{id:r.table.public_url}});return}G.error("The table is full")}}},ue=async a=>{await r._validateTablePassword(a).then(t=>{t.status===200?r.table&&(x.value=!1,d.push({name:"room",params:{id:r.table.public_url}})):(x.value=!1,G.error("Wrong Password"))})},ie=()=>{ne.games.length===0?G.warning("You have to create a game first"):j.value=!0},de=_(["Table","Game","Players","Private","creator","status"]),V=_(-1),me=a=>{i.registerGuest(a).then(()=>{v.value=!1,Te(i.user.id)})},pe=(a,t)=>{V.value===a?(V.value=-1,r.table=null):(V.value=a,r.table={...t})};return be(()=>Z.value,a=>{N.value=b.value.filter(t=>t.name.toLocaleLowerCase().includes(a.toLocaleLowerCase()))}),(a,t)=>{const h=te("VTooltip");return n(),A(q,null,[o(k)>y.value&&o(w)>g.value?(n(),c(Q,{key:0},{default:e(()=>[l(M,{justify:"between",items:"end",class:"mb-4"},{default:e(()=>[l(Pe,null,{default:e(()=>[u("Lobby")]),_:1}),o(i).user.email===null?(n(),A("button",{key:0,class:"bg-black text-white h-12 px-4 rounded-xl hover:bg-primary transition duration-300",onClick:t[0]||(t[0]=s=>v.value=!0)},C(o(i).user.username?"Change Nickname":"Add Nickname"),1)):T("",!0)]),_:1}),o(r).leaverPlayer.table?(n(),c(M,{key:0,justify:"between",items:"center",class:"p-4 bg-dark text-white rounded-xl mb-6 text-lg"},{default:e(()=>[m("div",null,[u(" Previous game: "),m("span",We,C(o(r).leaverPlayer.table.name),1)]),m("div",null,[o(r).leaverPlayer&&o(r).leaverPlayer.table?(n(),c(Y,{key:0,title:"Resume Game",onClick:t[1]||(t[1]=s=>W(o(r).leaverPlayer.table))})):T("",!0)])]),_:1})):T("",!0),B.value?(n(),c(M,{key:1,justify:"center",class:"mt-3 p-4 text-xl",gap:8},{default:e(()=>[l(M,{items:"center",gap:2},{default:e(()=>[qe,m("div",null,[u(" Users Online: "),m("span",Ke,C(B.value.countOnlineUsers),1)])]),_:1}),l(M,{items:"center",gap:2},{default:e(()=>[Ye,m("div",null,[u(" Users in game: "),m("span",Je,C(B.value.countInRoomUsers),1)])]),_:1})]),_:1})):T("",!0),l($e,{all:2,class:"my-3 px-2"},{default:e(()=>[l(J,{all:1},{default:e(()=>[l(D,{input:Z.value,placeholder:"Search a Table..",onChange:t[2]||(t[2]=s=>Z.value=s)},null,8,["input","placeholder"])]),_:1}),l(J,{all:1},{default:e(()=>[l(M,{justify:"end",gap:2},{default:e(()=>[o(i).user.role!==o(K).guest?(n(),c(Y,{key:0,title:"Create Table",onClick:t[3]||(t[3]=s=>ie())})):T("",!0)]),_:1})]),_:1})]),_:1}),N.value.length>0?(n(),c(ce,{key:2,"table-headers":de.value,class:"max-h-[490px] overflow-x-auto",actions:!0},{default:e(()=>[(n(!0),A(q,null,he(N.value,(s,L)=>{var U;return n(),c(ve,{key:`lobby-row-${s.id}`,class:z(["cursor-pointer transition duration-1000",[V.value===L?"bg-gray-700":"",((U=s.creator)==null?void 0:U.id)===o(i).user.id?"bg-[#222]":""]]),onClick:P=>pe(L,s),onMouseover:P=>p.value=L,onMouseleave:t[4]||(t[4]=P=>p.value=-1)},{default:e(()=>{var P;return[l(I,{class:"w-2/12"},{default:e(()=>[u(C(s.name),1)]),_:2},1024),l(I,{class:"w-2/12"},{default:e(()=>{var f;return[u(C((f=s.game)==null?void 0:f.name),1)]}),_:2},1024),l(I,{class:"w-1/12"},{default:e(()=>{var f,O;return[u(C((f=s.table_users)!=null&&f.length?s.table_users.length:0)+" / "+C((O=s.game)==null?void 0:O.max_players),1)]}),_:2},1024),l(I,{class:"w-1/12"},{default:e(()=>[l(M,null,{default:e(()=>[s.private?(n(),A("div",Qe,et)):(n(),A("div",tt,at))]),_:2},1024)]),_:2},1024),l(I,{class:z(["w-2/12",((P=s.creator)==null?void 0:P.id)===o(i).user.id?"text-primary":""])},{default:e(()=>{var f;return[u(C((f=s.creator)==null?void 0:f.username),1)]}),_:2},1032,["class"]),l(I,{class:z(["w-2/12 capitalize",[s.status===o(S).WAITING?"text-blue-500":"",s.status===o(S).PLAYING?"text-primary":"",s.status===o(S).PLAYER_DISCONNECTED||s.status===o(S).PLAYER_LEAVE?"text-red-500":"",s.status===o(S).PAUSE||s.status===o(S).GAME_MASTER_EDIT?"text-orange-500":""]])},{default:e(()=>{var f;return[u(C(((f=o(Ce).find(O=>O.id===s.status))==null?void 0:f.name)||"Unknown"),1)]}),_:2},1032,["class"]),l(I,{class:"w-2/2"},{default:e(()=>[l(M,{gap:2,class:"w-full",justify:"center"},{default:e(()=>{var f;return[s.status===o(S).WAITING?(n(),c(h,{key:0},{popper:e(()=>[u(" Join Table ")]),default:e(()=>[l(Fe,{onClick:O=>W(s)},null,8,["onClick"])]),_:2},1024)):T("",!0),p.value===L&&((f=s.creator)==null?void 0:f.id)===o(i).user.id&&s.status===o(S).WAITING?(n(),c(h,{key:1},{popper:e(()=>[u(" Remove Table ")]),default:e(()=>[l(Se,{onClick:O=>o(r)._removeTable(s==null?void 0:s.id)},null,8,["onClick"])]),_:2},1024)):T("",!0)]}),_:2},1024)]),_:2},1024)]}),_:2},1032,["onClick","class","onMouseover"])}),128))]),_:1},8,["table-headers"])):(n(),c(Oe,{key:3,class:"mt-10"},{default:e(()=>[u(" No available tables to join. Create a table to start a game! ")]),_:1}))]),_:1})):(n(),c(Q,{key:1},{default:e(()=>[l(M,{class:"bg-red-500 p-4",justify:"center",items:"center"},{default:e(()=>[u(" The game is supported on desktop computers ")]),_:1})]),_:1})),o(i).user.role!==o(K).guest?(n(),c(Re,{key:2,"is-modal-open":j.value,onCloseModal:t[5]||(t[5]=()=>j.value=!1)},null,8,["is-modal-open"])):T("",!0),l(Ne,{"is-modal-open":v.value,username:o(i).user.username?o(i).user.username:"",onCloseModal:t[6]||(t[6]=s=>v.value=!1),onRegisterGuest:t[7]||(t[7]=s=>me(s))},null,8,["is-modal-open","username"]),l(Be,{"is-modal-open":x.value,onCloseModal:t[8]||(t[8]=s=>x.value=!1),onSetPasswordTable:t[9]||(t[9]=s=>ue(s))},null,8,["is-modal-open"]),o(i).isGuest?(n(),c(Ee,{key:3})):T("",!0)],64)}}});export{Ct as default};
