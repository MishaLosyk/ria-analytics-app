<template>
    <div class="userBlock">
        <div>Додати нового користувача</div>
        <div>
            <input class="input1" type="text" placeholder="Логін" v-model="login"> 
            <input class="inputU" type="text" placeholder="Пароль" v-model="pass">
            <input class="inputU" type="text" placeholder="Ім'я" v-model="name">
            <input class="inputU" type="text" placeholder="Прізвище" v-model="surname">
                        <select id="selectRole" v-model="role">
                <option selected disabled hidden value="">Роль</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
            </select>
        </div>
        <div id="access">Доступ до таблиць</div>
        <div id="accessBody">
        <div>
        <button @click="addTable" :disabled="selectTable == ''" class="add"></button>
        <select v-model="selectTable" id="selectTable" size="3" >
            <option selected hidden disabled value="">Виберіть таблицю</option>
            <option v-for="table of temptables" :key="table"  :value="table">{{table}}</option>
        </select>
        </div>
        <div id="remBlock">
            <div><button class="remove" @click="remTable" :disabled="delTable == ''"></button>
            <div id="remName">
            <select v-model="delTable" id="selectTable" size="3">
            <option selected hidden disabled value="">Виберіть таблицю</option>
            <option v-for="tabl of chosenTables" :key="tabl"  :value="tabl">{{tabl}}</option>
            </select>
            </div>
            </div>
        </div>
        <button @click="submitNewUser" :disabled="login == '' || pass == '' || name == '' || surname == '' || chosenTables.length == 0 || role == ''"  id ='addUserButton'>Додати</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
      computed: {
    storageToken() {
      return this.$store.state.token
      },
    storageIp() {
    return this.$store.state.ip
      },
    },
    created(){
        // GET request
                axios.get(this.storageIp+':8081/', {headers: {token: this.storageToken}})
  .then(response => {console.log(response)
  const a = response.data 
    for(let table of a){
        this.tables.push(table[0])
        this.temptables.push(table[0])
    }}
  );
    },
    name:"NewUser",
    data(){
        return{
            tables:[],
            temptables:[],
            selectTable:'',
            chosenTables:[],
            delTable:'',
            login:'',
            pass:'',
            name:'',
            surname:'',
            role:'',

        }
    },
    methods:{

        addTable(){
            this.chosenTables.push(this.selectTable)
            let i = this.temptables.indexOf(this.selectTable)
            this.temptables.splice(i, 1)
            this.selectTable = ''
        },
        remTable(){
            this.temptables.push(this.delTable)
            let i = this.chosenTables.indexOf(this.delTable)
            this.chosenTables.splice(i,1)
            this.delTable = ''
        },
       async submitNewUser(){
            let a = {
                    email : this.login,
                    password: this.pass,
                    name: this.name,
                    surname: this.surname,
                    tables: this.chosenTables.toString(),
                    role: this.role,
                    }
            console.log(a)
            const responce = await axios.post(this.storageIp+":8081/admin/add_user", a,{headers: {token: this.storageToken}});
            // let responce = {
            //                 user_id: 'user_id',
            //                 email : 'email',
            //                 password: 'password',
            //                 name: 'name',
            //                 surname: 'surname',
            //                 tables: 'tables',
            //                 api_key: 'api_key'     
            //                 }
            alert('Create new user with id '+ responce.data.user_id)
            this.delTable = ''
            this.login = ''
            this.pass = ''
            this.name = ''
            this.surname = ''
            this.chosenTables = []
            this.role = ''
            this.temptables = this.tables
            this.$bus.$emit('newuser', 'Hi')
        }
}
}
</script>

<style scoped>
#addUserButton{
	margin-top: 100px;   
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
	margin-bottom: 30px;
}
#addUserButton:hover:active{
	box-shadow: 0 0 10px 0 #d8d9da inset, 0 0 10px 4px #247e18;
}
#addUserButton:disabled{
	background: rgba(121, 190, 0, 0.6);
}



#remName{
    display: inline;
    position: relative;
}
 .remove {
    background-color: transparent;    
    position: relative;
    transform: scale(var(--ggs,1));
    width: 22px;
    height: 22px;
    border: 2px solid white;
    border-radius: 22px;
    margin-top: 20px;
}

.remove::before {
 content: "";
 position: absolute;
 width: 10px;
 height: 2px;
 background: white;
 border-radius: 5px;
 top: 8px;
 left: 4px
} 


#accessBody{
    display:grid;
    grid-template-columns: 250px 300px;
    grid-column-gap: 30px;
}


.add {
    background-color: transparent;
    box-sizing: border-box;
    width: 22px;
    height: 22px;
    border: 2px solid white;
    transform: scale(var(--ggs,1));
    border-radius: 22px;
    margin-top: 20px;
}
.add::after,
.add::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 10px;
    height: 2px;
    background: white;
    border-radius: 5px;
    top: 8px;
    left: 4px
}
.add::after {
    width: 2px;
    height: 10px;
    top: 4px;
    left: 8px
}

#selectRole{
    border-radius: 4px;
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: 17px;
	letter-spacing: 0em;
	text-align: left;
	width: 69px;
	height: 35px;
	background: rgba(238, 240, 242, 1);
	color: rgba(0, 59, 86, 1);
    margin-left: 15px;
    position: relative; 
}

#selectTable{
    border-radius: 4px;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 17px;
	letter-spacing: 0em;
	text-align: left;
	width: 206px;
	height: 69px;
	background: rgba(238, 240, 242, 1);
	color: rgba(0, 59, 86, 1);
    margin-left: 15px;
    position: relative;
    top: 5px;
}

#access{
    margin-top: 20px;
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
}


.inputU{
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
	margin-left: 20px;
}



</style>