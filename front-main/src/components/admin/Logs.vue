<template>
    <div id="body">
        <div id="Logs">Логи</div>
        <div><input type="date" id="inputDate" v-model="fromDate"> - <input type="date" id="inputDate1" v-model="toDate"><br>
            <input id="check" type="checkbox" v-model="check">Користувач<input class="input1" type="text" placeholder="Ід користувача" v-model="inp"> <br>
        <button id="searchButton" @click="search" :disabled="fromDate == '' || toDate == '' || check && inp ==''">Search</button>
        </div>
        <div id="result">
            <ul id="list">
                <LogsItem v-for="log in logs" :date="log.date" :log_id='log.log_id' :user_id='log.user_id' :query='log.query'/>
            </ul>

        </div>






    </div>
</template>

<script>
import axios from 'axios';
import LogsItem from '@/components/admin/LogsItem'
export default {
          computed: {
    storageToken() {
      return this.$store.state.token
      },
    storageIp() {
    return this.$store.state.ip
      },
    },
    name:"Logs",
    components:{
        LogsItem
    },
    data(){
        return{
            logs:[],
            fromDate:"",
            toDate:"",
            login:"",
            check:false,
            inp:''
        }
    },
    methods:{
        search(){
            let a = {
                    select: '*',
                    where: "date>="+this.fromDate + ' AND ' + 'date<='  + this.toDate,
                    token: this.storageToken
                    }
            if(this.check){
                a.where = a.where + ' AND ' + "user_id" + this.inp
            }
            console.log(a)
            const responce = axios.post(this.storageIp+":8081/admin/logs", a);


            this.logs = responce.data

            // let responce = [    {
            //                     log_id: '1',
            //                     user_id: '7',
            //                     date: '2008-10-23 10:37:22',
            //                     query: 'sql query',
            //                     },
            //                     {
            //                     log_id: '2',
            //                     user_id: '13',
            //                     date: '2008-10-23 10:37:22',
            //                     query: 'sql query',
            //                     },
            //                     {
            //                     log_id: '3',
            //                     user_id: '13',
            //                     date: '2008-10-23 10:37:22',
            //                     query: 'sql query',
            //                     },
            //                     {
            //                     log_id: '4',
            //                     user_id: '13',
            //                     date: '2008-10-23 10:37:22',
            //                     query: 'sql query',
            //                     },
            //                     {
            //                     log_id: '5',
            //                     user_id: '69',
            //                     date: '2008-10-23 10:37:22',
            //                     query: 'sql query',
            //                     },
            //                     {
            //                     log_id: '6',
            //                     user_id: '69',
            //                     date: '2008-10-23 10:37:22',
            //                     query: 'sql query',
            //                     },
            //                     {
            //                     log_id: '7',
            //                     user_id: '69',
            //                     date: '2008-10-23 10:37:22',
            //                     query: 'sql query',
            //                     },
            //                     {
            //                     log_id: '8',
            //                     user_id: '44',
            //                     date: '2008-10-23 10:37:22',
            //                     query: 'sql query',
            //                     },
                                
            //                 ]

            
        }
    }
}
</script>


<style scoped>
#searchButton{
    margin-top: 15px;
	background: rgba(121, 190, 0, 1);
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
}
#searchButton:hover:active{
	box-shadow: 0 0 10px 0 #d8d9da inset, 0 0 10px 4px #247e18;
}
#searchButton:disabled{
	background: rgba(121, 190, 0, 0.6);
}




#result{
    margin-top: 10px;
    width: 70vw;
    height: 58vh;
    background: white
}
#list{
    overflow:hidden; overflow-y:scroll;
    height:58vh; width:70vw;
    color: rgba(0, 59, 86, 1);
    list-style-type:none;
    padding-left: 4px;
}



#check{
margin-right: 10px;
}

.input1{
    border-radius: 4px;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 17px;
	letter-spacing: 0em;
	text-align: left;
	width: 180px;
	height: 35px;
	background: rgba(238, 240, 242, 1);
	color: rgba(0, 59, 86, 1);
	margin-top: 15px;
    margin-left: 10px;
}

#inputDate{
	border-radius: 4px;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 17px;
	letter-spacing: 0em;
	text-align: left;
	width: 206px;
	height: 35px;
	background: rgba(238, 240, 242, 1);
	color: rgba(0, 59, 86, 1);
	margin-top: 15px;
}
#inputDate1{
	border-radius: 4px;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 17px;
	letter-spacing: 0em;
	text-align: left;
	width: 206px;
	height: 35px;
	background: rgba(238, 240, 242, 1);
	color: rgba(0, 59, 86, 1);
	margin-top: 15px;
}
#body{
    position: absolute;
    left: 300px;
    margin-top: 50px;
}
#Logs{
font-size: 50px;
width: 500px;
}
</style>