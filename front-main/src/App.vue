<template>
  <div id="app">
    <div id="nav" v-if="storageAuth">
      <router-link style="margin-right:10px" to="/">Конструктор</router-link> 
      <router-link style="margin-right:10px" to="/admin"  v-if="storageRole == 'admin'">Адмін панель</router-link>
      <router-link style="margin-right:10px" to="/user">Кабінет користувача</router-link>
    </div>
    <div id="auth" v-if="!storageAuth">
      <button id="loginButton" @click="author" :disabled="email == ''|| pass == ''">Увійти</button>
      <input id="authinput" type="text" placeholder="Email" v-model="email">
      <input id="authinput" type="password" placeholder="Password" v-model="pass">
    </div>
    <router-view />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  computed: {
    storageAuth() {
      return this.$store.state.auth
      },
    storageRole(){
      return this.$store.state.role
    },
    storageIp() {
    return this.$store.state.ip
      },
    },
  name: 'App',
  data(){
    return{
      email:'',
      pass:'',
      auth:false,
      role:null,
      tables:[],
    }
  },
  methods:{
    author(){
      let a = {
        email: this.email,
        pass: this.pass
      }
      console.log(a)
      const responce = axios.post(this.storageIp+":8081/login", a);
      let testresponce = {
        data:{                      
              auth: true,
              role: 'admin',
              name:'name1',
              surname:'surname1',
              tables:[
        [
            "slon_facts",
            [
                {
                    "name": "EventDate",
                    "type": "Date"
                },
                {
                    "name": "HourDate",
                    "type": "UInt8"
                },
                {
                    "name": "MinuteDate",
                    "type": "UInt8"
                },
                {
                    "name": "SecondDate",
                    "type": "UInt8"
                },
                {
                    "name": "web_id",
                    "type": "UInt32"
                },
                {
                    "name": "user_id",
                    "type": "UInt32"
                },
                {
                    "name": "project_id",
                    "type": "UInt16"
                },
                {
                    "name": "marka_id",
                    "type": "Array(UInt32)"
                },
                {
                    "name": "event_id",
                    "type": "Array(UInt16)"
                },
                {
                    "name": "owner_id",
                    "type": "Array(UInt32)"
                },
                {
                    "name": "proposal_id",
                    "type": "Array(UInt32)"
                },
                {
                    "name": "conversion_value",
                    "type": "UInt16"
                }
            ]
        ],
        [
            "mviews_calltracking",
            [
                {
                    "name": "EventDate",
                    "type": "Date"
                },
                {
                    "name": "date_time",
                    "type": "DateTime"
                },
                {
                    "name": "web_id",
                    "type": "UInt32"
                },
                {
                    "name": "user_id",
                    "type": "UInt32"
                },
                {
                    "name": "event_id",
                    "type": "Array(UInt16)"
                },
                {
                    "name": "calltracking_product_id",
                    "type": "Array(UInt8)"
                },
                {
                    "name": "owner_id",
                    "type": "Array(UInt32)"
                },
                {
                    "name": "proposal_id",
                    "type": "Array(UInt32)"
                },
                {
                    "name": "call_status",
                    "type": "UInt8"
                }
            ]
        ]
    ],
              user_id: '6969',
              },
        headers:{token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJyb2xlIjoidXNlciIsImlhdCI6MTYxNjkzMDE4MH0.Xzm136kuqCcA9NnPAektGoSY-axVdgqqYpV1HMpfOPE'}
      }
      if(responce.data.auth){this.$store.commit('LOGIN', responce);}
      if(!responce.data.auth){alert("Неправильний пароль або email")}
      if(responce.data.role == 'admin' && responce.data.auth){
        this.$router.push('admin')
      }
    }
  }
}
</script>

<style>
#loginButton{ 
	background: rgba(121, 190, 0, 1);
	height: 30px;
	width: 60px;
	border-radius: 4px;
	border: 0;
	padding: 0;
	cursor: pointer;
	font-size: 14px;
	line-height: 17px;
	letter-spacing: 0.03em;
	color: #FFFFFF;
}
#loginButton:hover:active{
	box-shadow: 0 0 10px 0 #d8d9da inset, 0 0 10px 4px #247e18;
}
#loginButton:disabled{
	background: rgba(121, 190, 0, 0.6);
}




#app {
  font-family: Montserrat;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#authinput{
  	border-radius: 4px;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 17px;
	letter-spacing: 0em;
	text-align: left;
	width: 150px;
	height: 30px;
	background: rgba(238, 240, 242, 1);
	color: rgba(0, 59, 86, 1);
	margin-left: 20px;
}
#auth{
  padding: 30px;
  float: right;
  z-index: 100;
}
#nav {
  padding: 30px;
  float: right;
  z-index: 100;
}

#nav a {
  font-weight: bold;
  color: #f3f3f3;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
