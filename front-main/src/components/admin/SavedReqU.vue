<template>
            
        <li v-if="!del"><details><summary><pre style="display:inline;">ID:{{qur_id}}    Назва запиту: {{query_name}}</pre>
        </summary><div>{{query}}</div>
        <button id="deleteButton" @click="dele">Видалити</button>
        </details></li>


</template>




<script>
import axios from 'axios';
export default {
    name:'SavedReqU',
    props:['qur_id','user_id','query','query_name'],
        computed: {
    storageAuth() {
      return this.$store.state.auth
      },
     storageRole() {
      return this.$store.state.role
      },
      storageToken(){
      return this.$store.state.token
    },
        storageIp() {
    return this.$store.state.ip
      },
        },
    data(){
        return{
            del:false
        }
    },
    methods:{
      dele(){
          axios.delete(this.storageIp+':8081/query/' + this.qur_id, {headers: {token: this.storageToken}});
          this.del = true
      }  
}
}
</script>



<style scoped>

#deleteButton{
    position: relative;
	margin-top: 10px;   
	background: rgb(190, 0, 0);
	height: 35px;
	width: 206px;
	border-radius: 4px;
	border: 0;
	padding: 0;
	cursor: pointer;
	font-size: 14px;
	line-height: 17px;
	letter-spacing: 0.03em;
	color: #FFFFFF;
    float: right;
}
#deleteButton:hover:active{
	box-shadow: 0 0 10px 0 #d8d9da inset, 0 0 10px 4px #ff0000;
}
pre{
      font-family: 'Montserrat', sans-serif;
}
</style>