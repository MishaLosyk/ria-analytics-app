<template>
<div id="main-container">
  <link rel="stylesheet" 
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" 
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" 
        crossorigin="anonymous">
    <div class="block">
        <h2 >Список запитів</h2>
        <!-- {{queryList}} -->
        <!-- <Query v-for="(query,index) in queryList" :key="index" :query="query"/> -->
        <div class="queries-container">

          <div class="query-list">
            <table class="query-list__table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME </th>
                <!-- <th>SQL</th> -->
              </tr>
            </thead>
            <tbody>
              <tr 
                class="sql-item-row"
                v-for="(query,index) in queryList" 
                :key="index" 
                :query="query"
                v-on:click.prevent="(event)=> {doQueryClick(query.query,query.query_id)}"
              >
                <td> {{query.query_id}} </td>
                <td> {{query.query_name}} </td>
                <!-- <td> {{query.query}} </td> -->
              </tr>
            </tbody>
            </table>
          </div>
          
          <div class="query-details">
            <div class="query-value">
              <div class="query__controllers">
                <button 
                @click="onRunSave" 
                :disabled="isRunQueryBtnDisabled">Виконати</button>
                <button 
                class="query__delete-button" 
                @click="doDeleteQuery"
                :disabled="isRunQueryBtnDisabled">
                <i class="fas fa-trash-alt"></i>
              </button> 
              <button 
                class="query__rerolad-data" 
                type="button"
                @click="()=> $emit('get-query-list')">
                <i class="fas fa-sync-alt"></i>
              </button>
              
              </div>
              
              <p class="query__text">{{currebtQueryText}}</p>
            </div>

            <div class="share-query-block">
              <div class="share-query-labels">
                <p class="share_label">Поділитися:</p>
                <p class="share-notification-success" v-if="isSent">Отримано</p>
                <p class="share-notification-error" v-if="isUnsent">Помилка!</p>
              </div>
             
              <input 
              class="share-input" 
              type="text" 
              placeholder="введіть логін"
              v-model="shareToEmail">
              <button 
              @click="() => {doShareQuery(currentQueryId)}" 
              :disabled="shareBtnDisabled">
              <i class="fas fa-share"></i>
              <!-- <img src="@/assets/paper-plane-regular.svg" alt="" srcset=""> -->
               </button>  
               <span></span>     
            </div>

          </div>
          
        </div>
        <QueryResultTable 
        :query-data="queryOject"
        />


    </div>

</div>
</template>

<script>
import axios from 'axios';
import Query from '@/components/user/Query';
import QueryResultTable from "@/components/user/QueryResultTable";
 


export default {
    components:{
        Query,
        QueryResultTable,
        // UserList
    },
    props: ["query-list"],
    data(){
      return {
        user_id: "userd_id",
        user_email: "user_email",
        currebtQueryText: '',
        currentQueryId: '',
        // shareBtnDisabled: true,
        shareToEmail: '',
        queryOject: '',
        isSent:false,
        isUnsent: false
      }
    },
    computed: {
      shareBtnDisabled() {
        return this.shareToEmail.length ===0 ? true : false;
      },
      isRunQueryBtnDisabled(){
        return !this.currentQueryId ? true: false;
      },
      storageAuth() {
      return this.$store.state.auth
      },
    storageRole(){
      return this.$store.state.role
    },
    storageIp() {
    return this.$store.state.ip
      },
      storageToken() {
      return this.$store.state.token
      },
    },
    methods: {
      doQueryClick(queryText, queryId) {
        this.currebtQueryText = queryText;
        this.currentQueryId = queryId;
      },
      async doShareQuery(queryId) {
        // console.log("in share")
        try {
        const response = await axios.post(this.storageIp+":8081/share",
          {
            query_id:  this.currentQueryId, 
            email: this.shareToEmail
          },
          {headers: {token: this.storageToken}}); 
          console.log(response.data)
            this.isSent = true;
            setTimeout(()=>{this.isSent = false}, 4000)
          } catch {
              this.isUnsent = true;
              setTimeout(()=>{this.isUnsent = false}, 4000)
          }

          // if(response.data === "OK") {
          //   this.isSent = true;
          //   setTimeout(()=>{this.isSent = false}, 4000)
          // } else {
            
          // }
      // console.log(this.shareToEmail)
      },
      async onRunSave(){
        // console.log("From saved aueries, text=")
        // console.log(this.currebtQueryText)
        const response = await axios.post(this.storageIp+":8081/search", JSON.parse(this.currebtQueryText), {headers: {token: this.storageToken}});
        // console.log("Response")
        // console.log(response.data);
        this.queryOject = response.data;
     },
     
      // doRunQuery () {
        
      // },
      async doDeleteQuery(){
        // console.log("currentQueryIdc",this.currentQueryId)
        // this.$emit("get-query-list",this.currentQueryId );
        const response = await axios.delete(this.storageIp+':8081/query/' + this.currentQueryId, {headers: {token: this.storageToken}});
        
        if(response.status === 200) {
          // console.log("emit")
          this.$emit("get-query-list");
        }
      }
    },
  
}
</script>



<style scoped>
.sql-item-row:hover {
   background-color: grey;
   cursor: pointer;
}
td {
  width: 100px;
  border: 1px solid grey;
}
/* td:hover {
  cursor: pointer;
} */
.queries-container {
  width: 100%;
  /* max-height: 500px; */
  height: 60vh;
  display: flex;
}
.query-list {
  width: 300px;
  margin: 5px;
  padding: 15px;
  min-width: 300px;  
  border: 1px solid;
  overflow: auto;
}
.query-list__table {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  min-width: 250px;
}
.query-list td {
  padding-left: 10px;
  padding-right: 10px;
  width:auto;
}
.query-details {
  /* width:max-content; */
  margin: 5px;
  padding: 5px;
  max-width: 600px;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid;
  overflow: auto;
}
.query-value {
  display:flex;
  flex-direction: column;
   align-items: flex-start;
  justify-content: left;
}
.query__rerolad-data {
  width: 35px;
}
.query__delete-button {
  width: 35px;
  color:red;
  background-color:  grey;;
}
.query__delete-button:hover {
  box-shadow: 0 0 10px 0 #d8d9da inset, 0 0 10px 4px rgba(0, 47, 68, 1);
}

.query__text {
  word-wrap: break-word;
  word-break:break-all;
}
.share-query-block {
  padding: 5px;
  border:1px solid rgba(0, 47, 68, 1);
  border-radius: 5%;
}
.share-query-labels{
  display:flex;
  justify-content: start;
  gap: 40px;
}
.share_label {
  /* text-align: left; */
}
.share-notification-success {
  color: green;
  /* padding-left:25px; */
/* text-align: right; */
}
.share-notification-error {
  color: red;
}
.share-input {
  width: 120px;
  font-size: 0.75rem;;
}
button {
  width: 100px;
  margin:3px;
  /* border-radius: 10%; */
  /* height:20px; */
  /* color:white; */
  /* border: 1px; */
  border: grey solid 2px;
  background-color: grey;
  color:white;
  border-radius: 5px
  /* background-image: url(../../assets/paper-plane-regular.svg);
  background-repeat: no-repeat;
  background-position: center; */
}
button:hover {
  cursor:pointer;
  /* outline: rgb(0, 255, 234) solid 2px; */
   box-shadow: 0 0 10px 0 #d8d9da inset, 0 0 5px 2px rgba(0, 47, 68, 1);
}
.block{
position: absolute;
padding-left: 300px;
padding-top: 170px;
font-size: 14px;
color: rgba(0, 47, 68, 1);
/* background: rgba(0, 47, 68, 1); */
}
#main-container {
   width: 100vw;
  background: rgba(0, 47, 68, 1); 
}
#users{
font-size: 50px;
}
</style>