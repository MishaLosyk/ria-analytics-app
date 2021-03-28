<template>
<div class="userList">
    <div>Пошук</div>
    <div> 
        <div><input type="radio" name="select" @click="selectType" value="all" v-model="radio"> Всіх користувачів</div>
        <div><input type="radio" name="select" @click="selectType" value="one" v-model="radio"> Конкретного користувача</div>
        <div v-if="radio == 'one'">
            <select v-model="field" id="selectField">
                <option selected disabled value hidden="">Виберіть поле</option>
                <option value="user_id=">Ід</option>
                <option value="email=">Логін</option>
                <option value="password=">Пароль</option>
                <option value="name=">Ім'я</option>
                <option value="surname=">Прізвище</option>
            </select>
            <input :disabled='field == ""' id="inputField" type="text" value="" v-model="fieldInput" placeholder="Введіть значення">
        </div>
        <button :disabled="radio == 'one' && fieldInput == ''" id="searchButton" @click="search">Знайти</button>
    </div>
    <div>Список користувачів</div>
    <div v-if=" userlist.length != 0 " class="userTableList">
        <table id="userTable" class="table-striped table-sm" >
            <thead>
                <tr>

                    <th>Ід</th>
                    <th>Логін</th>
                    <th>Пароль</th>
                    <th>Ім'я</th>
                    <th>Прізвище</th>
                    <th>Апі ключ</th>
                    <th>Доступ</th>
                    <th>Роль</th>
                    <th></th>
                    <th></th>
                </tr> 
            </thead>
            <UserItem v-for="item of userlist" :role="item.role" :user_id="item.user_id" :email="item.email"  :password="item.password" :name="item.name" :surname="item.surname" :api_key="item.api_key" :tables="item.tables"/>
        </table>





    </div>
</div>
</template>

<script>
import axios from 'axios';
import UserItem from '@/components/admin/UserItem'
export default {
    name:"UserList",
    components:{UserItem},
          computed: {
    storageToken() {
      return this.$store.state.token
      },
    storageIp() {
    return this.$store.state.ip
      },
    },
    data(){
        return{
            radio:'all',
            field:'',
            fieldInput:'',
            userlist:[]
        }
    },
    methods:{
        selectType(){
            this.field = this.fieldInput = ''
        },
        search(){
            let a = {
                 select: '*',
                 where: '',
                 token: this.storageToken
                }
            if(this.radio == 'one'){
                a.where = this.field + this.fieldInput
            }
            console.log(a)
           const responce = axios.post(this.storageIp+":8081/admin/users", a);
            this.userlist = responce.data
        }
    }
}
</script>

<style scoped>
.userTableList{
    position: absolute;
    left: -300px;
    background: linear-gradient(100.63deg, #003B56 -5.27%, #003147 72.85%);
    background-size: 100%;
    width: 100vw;
    padding-bottom: 50px;
}
#userTable{
    position: relative;
    margin-top: 15px;
    margin-left: 100px;

}

#inputField{
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
	margin-left: 20px;

}


#selectField{
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
    position: relative;
    margin-top: 10px;
}
#searchButton{
	margin-top: 10px;   
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
#searchButton:hover:active{
	box-shadow: 0 0 10px 0 #d8d9da inset, 0 0 10px 4px #247e18;
}
#searchButton:disabled{
	margin-top: 10px;   
	background: rgba(121, 190, 0, 0.6);
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
</style>