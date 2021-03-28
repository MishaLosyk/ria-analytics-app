<template>
<div id="sGrid">
   <div id="saveList">
       <div id="sList" v-if="showlist">
           <select id="reqSelect" size="10" v-model="qur">
               <option v-for="query of queryList" :value="query.query">{{query.query_name}}</option>
           </select>
           </div>
            <button class="close" v-if="showlist" @click="Menu"></button>
            <button class="submit" v-if="showlist" @click="submit">Виповнити</button>
           <div v-if="!showlist"><button id="starbutton" :disabled='!storageAuth' @click="Menu">☆</button></div>
       
       
       
    </div> 
</div>
</template>
<script>
import axios from 'axios'
export default {
name:"SavedReq",
computed:{
storageAuth() {
    return this.$store.state.auth
      },
storageUser_id() {
    return this.$store.state.user_id
      },
    storageToken() {
      return this.$store.state.token
      },
    storageIp() {
    return this.$store.state.ip
      },
},
data(){
    return{
        showlist:false,
        queryList:[],
        qur:''
    }
},
methods:{
    Menu(){
        if(!this.showlist){
            let a = {
                user_id: this.storageUser_id,
                token: this.storageToken
            }
            const responce = axios.post(this.storageIp+":8081/query_list", a);
            let tresponse = [{
                			query_id: 'query_id',
                            query_name: 'query_name',
                            query: 'query1'
                            },
                            {
                			query_id: 'query_id',
                            query_name: 'query_name1',
                            query: 'query2'
                            },
                            {
                			query_id: 'query_id',
                            query_name: 'query_name2',
                            query: 'query3'
                            },
                            {
                			query_id: 'query_id',
                            query_name: 'query_name3',
                            query: 'query4'
                            },
                            {
                			query_id: 'query_id',
                            query_name: 'query_name4',
                            query: '[{query5}]'
                            },
                            
                            ]
            this.queryList = responce
        }
        this.showlist = !this.showlist
    },
    submit(){
        let a = this.qur
        console.log(a)
    },
}
}
</script>



<style scoped>
.submit {	
	font-size: 16px;
	line-height: 20px;
	letter-spacing: 0.03em;
	height: 45px;
	width: 145px;
	border-radius: 4px;
	background: rgba(33, 155, 231, 1);
	color: rgba(255, 255, 255, 1);
	text-align: center;
	border: 0;
	padding: 0;
	cursor: pointer;
	margin-left: 16px;
}
.submit:hover{
	background-color: #2f90d1
}
.submit:disabled{
	background-color: rgba(33, 155, 231, .6);
	color: rgba(255, 255, 255, .5);
}

.submit:disabled:hover{
	background-color: rgba(33, 155, 231, .6);
	color: rgba(255, 255, 255, .5);
	cursor: default;
}

#reqSelect{
    overflow:hidden; overflow-y:scroll;
    height:40vh; width:250px;
    color: rgba(0, 59, 86, 1);
    list-style-type:none;
    padding-left: 4px;
}

.close {
    box-sizing: border-box;
    position: relative;
    display: inline;
    transform: scale(var(--ggs,1));
    width: 22px;
    height: 22px;
    border: 2px solid transparent;
    border-radius: 40px;
    left: 250px;
    bottom: 20px;
    background: transparent;
}
.close::after,
.close::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 16px;
    height: 2px;
    background: currentColor;
    transform: rotate(45deg);
    border-radius: 5px;
    top: 8px;
    left: 1px
}
.close::after {
    transform: rotate(-45deg)
}

#sList{
    width: 250px;
    background: transparent;
    min-height: 39vh;
    display: block;
}
#starbutton{
    border-radius: 0% 100% 100% 0%;
    font-size: 20px;
    background: rgb(243, 223, 113);
    outline: 0;
}
#saveList{
    position: absolute;
    top:30%;
    text-align: left;
}
</style>