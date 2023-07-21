import{a}from"./axiosUser.ec9c9c17.js";import{a as i,u as l,O as o,e as r}from"./index.31bb550f.js";import{b as d}from"./helpers.18e8cb8d.js";import{u as g}from"./PlayerStore.bc49c745.js";const h=i(),s=l(),n=g(),m=o("TableStore",{state:()=>({table:{name:"",private:!1,password:"",game:null},games:[],editTable:!1,loading:!1,edit:{},tables:[],gameSelected:0,selectedTableId:-1,role:"user"}),getters:{loadingStatus:t=>t.loading},actions:{setUserRole(t){this.$state.role=t},toggleLoading(t){t?this.$state.loading=t:this.$state.loading=!this.$state.loading},updateSelectedGame(t){this.$state.editTable?this.$state.gameSelected=t:this.$state.table.game=t},clearFormData(){this.$state.table.game=0,this.$state.table.name="",this.$state.table.private=!1,this.$state.table.password=""},async fetchGames(){try{const{data:t}=await a.get(this.$state.role==="user"?"game/private-public":"admin/games");this.$state.games=t}catch{}},async fetchTables(){this.toggleLoading(!0);try{const t=await a.get(`${this.$state.role}/tables`);this.$state.tables=t.data}catch{}this.toggleLoading(!1)},async _submit(){const t=h.user.id;d.emit("createOnlineTable",{user_id:t,table:this.$state.table},e=>{e.id&&(n.table={...e},this.$state.table.game=null,this.$state.table.name="",this.$state.table.password="",this.$state.table.private=!1,r.push({name:"room",params:{id:e.public_url}}))})},toggleEditTable(t){this.$state.edit={...this.$state.tables[t]},this.$state.editTable=!this.$state.editTable},async _update(){try{this.toggleLoading(null),this.$state.games.forEach(e=>{if(e.id===this.$state.gameSelected){this.$state.edit.game=e;return}});const t=await a.patch(`${this.$state.role}/table`,{table:this.$state.edit});t.status===200&&(this.toggleLoading(null),s.success(t.data.message),this.$state.editTable=!1,this.fetchTables())}catch(t){this.toggleLoading(null),s.error(t)}},async _delete(){try{this.toggleLoading(null);const t=await a.delete(`${this.$state.role}/table`,{data:{id:this.$state.selectedTableId}});t.status===200&&(s.success(t.data.message),this.toggleLoading(null),this.fetchTables())}catch(t){this.toggleLoading(null),s.error(t)}},async _deleteTableDetails(){try{this.toggleLoading(null),(await a.delete(`${this.$state.role}/table/users`,{data:{id:this.$state.edit.id}})).status===200&&(s.success("Table users has been successfully deleted"),this.toggleLoading(null))}catch(t){this.toggleLoading(null),s.error(t)}},unMountedDashboard(){this.$state.games=[],this.$state.tables=[]}}});export{m as u};
