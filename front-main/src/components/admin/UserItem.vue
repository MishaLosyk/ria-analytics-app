<template>
             <tbody v-if="!deleted" class="test">
                <tr>
                    <!-- <th><input id="inputField" disabled v-model="local_user_id"></th> -->
                    <th style="text-align: center">{{local_user_id}}</th>
                    <th><input id="inputField" :disabled='!edit' v-model="local_email"></th>
                    <th><input id="inputField" :disabled='!edit' v-model="local_password"></th>
                    <th><input id="inputField" :disabled='!edit' v-model="local_name"></th>
                    <th><input id="inputField" :disabled='!edit' v-model="local_surname"></th>
                    <th><input id="inputField" :disabled='!edit' v-model="local_api_key"></th>
                    <th><input id="inputField" :disabled='!edit' v-model="local_tables"></th>
                    <th><select class="roleselect" :disabled='!edit' v-model="local_role">
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                        </select>
                        </th>
                                        <th>
                        <button id='query' v-if="!edit && !confirm">Збережені запити</button>
                        <button id="change" v-if="!edit && !confirm" @click="change">Змінити</button>
                        <button id='del' v-if="!edit && !confirm" @click="conf">Видалити</button>
                        <button id='save' v-if="save" @click="saveuser">Зберегти</button>
                        <button id="save" v-if="confirm" @click="delchange">Підтвердити</button>
                        </th>
                    <th></th>
                </tr>
            </tbody>   
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
        this.local_user_id = this.user_id
        this.local_email = this.email  
        this.local_password = this.password
        this.local_name = this.name
        this.local_surname =  this.surname
        this.local_api_key = this.api_key
        this.local_tables = this.tables
        this.local_role = this.role
    },
    name:'UserItem',
    props:['user_id','email','password','name','surname','api_key','tables','role'],
    data(){
        return{
            deleted:false,
            edit:false,
            deleteb:false,
            save:false,
            confirm:false,
            local_user_id:'',
            local_email:'',
            local_password:'',
            local_name:'',
            local_surname:'',
            local_api_key:'',
            local_tables:'',
            local_role:'',
        }
    },
    methods:{
        change(){
            this.edit = true
            this.save = true
        },
        async saveuser(){
            let a = {
                user_id: this.local_user_id,
                email : this.local_email,
                password: this.local_password,
                name: this.local_name,
                surname: this.local_surname,
                tables: this.local_tables,
                api_key: this.local_api_key,
                token: this.storageToken,
                role: this.local_role
            }
            const respons = await axios.post(this.storageIp+":8081/admin/update/", a,{headers: {token: this.storageToken}});
            console.log(a)
            console.log(respons)
            this.edit = false
            this.save = false
        },
        conf(){
            this.confirm = true
            this.deleteb = true
        },
        delchange(){
            console.log('localhost/admin/user/'+ this.local_user_id)
            axios.delete(this.storageIp+":8081/admin/user/"+ this.local_user_id, {headers: {token: this.storageToken}});
            this.confirm = false
            this.deleteb = false
            this.deleted = true
        }
    }
}

</script>

<style scoped>
.roleselect{
    border-radius: 4px;
	font-size: 12px;
	font-style: normal;
	line-height: 17px;
	text-align: left;
	width: 69px;
	height: 35px;
	background: rgb(255, 255, 255);
	color: rgba(0, 59, 86, 1);
} 
.roleselect:disabled{
	background: rgb(255, 255, 255);

}
#query{
    font-size: 14px;
    background: #42b983;
    height: 35px;
    outline: 0px;
    border: 0;
    border-radius: 4px;
        font-size: 12px;
}
#save{
    position: relative;
    background: rgb(202, 252, 195);
    outline: 0px;
    border: 0;
    border-radius: 4px;
    width: 100%;
    font-size: 12px;
    height: 35px;
}
#change{
    background: rgba(121, 190, 0, 1);
    outline: 0px;
    border: 0;
    border-radius: 4px;
    margin-right: 10px;
    font-size: 12px;
    height: 35px;
    margin-left: 10px;
}
#del{
    background: rgb(250, 0, 0);
    outline: 0px;
    border: 0;
    border-radius: 4px;
    font-size: 12px;
    height: 35px;
}
#inputField{
    border-radius: 4px;
	font-size: 12px;
	font-style: normal;
	line-height: 17px;
	letter-spacing: 0em;
	text-align: left;
	width: 120px;
	height: 35px;
	background: rgba(238, 240, 242, 1);
	color: rgba(0, 59, 86, 1);
}
#inputField:disabled{
    border-radius: 4px;
	font-size: 12px;
	font-style: normal;
	line-height: 17px;
	letter-spacing: 0em;
	text-align: left;
	width: 120px;
	height: 35px;
	background: rgba(238, 240, 242, 0.8);
	color: rgba(0, 59, 86, 1);
}
</style>