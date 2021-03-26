<template>
<div class="userList">
    <div>Пошук</div>
    <div> 
        <div><input type="radio" name="select" @click="selectType" value="all" v-model="radio"> Всіх користувачів</div>
        <div><input type="radio" name="select" @click="selectType" value="one" v-model="radio"> Конкретного користувача</div>
        <div v-if="radio == 'one'">
            <select v-model="field" id="selectField">
                <option selected disabled value="">Виберіть поле</option>
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
</div>
</template>

<script>
export default {
    name:"UserList",
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
                 where: ''
                }
            if(this.radio == 'one'){
                a.where = this.field + this.fieldInput
            }
            console.log(a)
            let responce = [
                    {
                        user_id: 'user_id',
                        email : 'email',
                        password: 'password',
                        name: 'name',
                        surname: 'surname',
                        tables: 'tables',
                        api_key: 'api_key'
                    }
                        ]
            this.userlist = responce
        }
    }
}
</script>

<style scoped>
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

</style>