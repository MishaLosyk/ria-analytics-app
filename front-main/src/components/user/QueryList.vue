<template>
<div>
  <link rel="stylesheet" 
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" 
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" 
        crossorigin="anonymous">
    <div class="block">
        <p id='users'>Список запитів</p>
        <!-- {{queryList}} -->
        <!-- <Query v-for="(query,index) in queryList" :key="index" :query="query"/> -->
        <div class="queries-container">

          <div class="query-list">
            <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME 


                  
                </th>
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
                @click="doRunQuery" 
                :disabled="isRunQueryBtnDisabled">Виконати</button>
                <button 
                class="query__delete-button" 
                @click="doDeleteQuery"
                :disabled="isRunQueryBtnDisabled">
                <i class="fas fa-trash-alt"></i>
              </button>
              </div>
              
              <p>{{currebtQueryText}}</p>
            </div>

            <div class="share-query-block">
              <p>Поділитися:</p>
              <input 
              class="share-input" 
              type="text" 
              placeholder="введіть логін"
              v-model="shareToEmail">
              <button 
              @click="() => {doShareQuery(currentQueryId)}" 
              :disabled="shareBtnDisabled">
              =>
              <!-- <img src="@/assets/paper-plane-regular.svg" alt="" srcset=""> -->
               </button>       
            </div>

          </div>
          
        </div>


    </div>

</div>
</template>

<script>
import axios from 'axios';
import Query from '@/components/user/Query'


export default {
    name:"QueryList",
    props: ["query-list"],
    components:{
        Query,
        // UserList
    },
    data(){
      return {
        user_id: "userd_id",
        user_email: "user_email",
        currebtQueryText: '',
        currentQueryId: '',
        // shareBtnDisabled: true,
        shareToEmail: ''
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
        const response = await axios.post(this.storageIp+':8081/share',
        {
        query_id: queryId, 
        email: this.shareToEmail
      }, {headers: {token: this.storageToken}});
      //   If(response.statusText !== "OK")
      // console.log(this.shareToEmail)
      },
      doRunQuery () {
        //Надіслати 
      },
      doDeleteQuery(){
        console.log(this.storageIp+':8081/query/' + this.currentQueryId)
        axios.delete(this.storageIp+':8081/query/' + this.currentQueryId, {headers: {token: this.storageToken}});
      }
    },
  
}
</script>



<style scoped>
.sql-item-row:hover {
   background-color: blue;
   cursor: pointer;
}
td {
  width: 100px;
  border: 1px solid yellow;
}
/* td:hover {
  cursor: pointer;
} */
.queries-container {
  /* max-height: 500px; */
  height: 400px;
  display: flex;
}
.query-list {
  margin: 5px;
  padding: 5px;  
  border: 1px solid;
  overflow: auto;
}
.query-details {
  margin: 5px;
  padding: 5px;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid;
}
.query-value {
  display:flex;
  flex-direction: column;
   align-items: flex-start;
  justify-content: left;
}
.query__delete-button {
  width: 35px;
  color:red;
}
.share-query-block {
  border:1px solid white;
  border-radius: 5%;
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
  border: none;
  background-color: white;
  /* background-image: url(../../assets/paper-plane-regular.svg);
  background-repeat: no-repeat;
  background-position: center; */
}
button:hover {
  cursor:pointer;
  outline: rgb(0, 255, 234) solid 2px;
}
.block{
position: absolute;
padding-left: 300px;
padding-top: 30px;
font-size: 14px;
}
#users{
font-size: 50px;
}
</style>