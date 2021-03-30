<template>
  <div>
   <div id="user">
    <div id="icon"> 
        <div id="ria">RIA</div>
        <div id="analyt">analytics</div>
    </div>
      <div id="nav">
        <ul class="user_navigation">
          <li 
            class="user-navigation-item"
            v-bind:class="{ menuItemSelected: isQueryListVisible }"
            @click="isQueryListVisible = true; isApiVisible = false"
            >Запити</li>
          <li 
          class="user-navigation-item"
          :class="{ menuItemSelected: isApiVisible }"
          @click="isQueryListVisible = false; isApiVisible = true"
          >Апі-доступ</li>
        </ul>
      </div>
      <div class="content">

      <QueryList 
      :query-list="queryArray"
      v-on:get-query-list="getQueryList"
      v-if="isQueryListVisible"
      ></QueryList>
      <ApiAccessComponent
      v-if="isApiVisible"
      />
    




        
      </div>
    </div>

  </div>
 
</template>



<script>
import axios from 'axios';
import QueryList from "@/components/user/QueryList"
import ApiAccessComponent from "@/components/user/ApiAccessComponent";

export default {
   name:'User',
  //  props: ['user_id'],
    components: {
      QueryList,
      ApiAccessComponent
    
    },
    data() {
      return {
        name: "Jack",
        surname: "Smith",
        user_id: 1,
        queryArray: [],
        isApiVisible:false,
        isQueryListVisible: true,
      }
    },
    created () {
      this.getQueryList();
    },
    computed: {
    storageAuth() {
      return this.$store.state.auth
      },
    storageIp() {
    return this.$store.state.ip
      },
          storageUser_id() {
  return this.$store.state.user_id
    },
        storageToken() {
      return this.$store.state.token
      },
    },
    methods: {
     
     
       async getQueryList () {
        const response = await axios.post(this.storageIp+":8081/query_list", {user_id: this.storageUser_id}, {headers: {token: this.storageToken}});   //! порт  і шлях до сервера
            if(response.statusText === "OK") {
              this.queryArray = response.data;
            }


       }
    },
    watch: {
      $route(newValue, oldValue) {
        console.log("зробити запит до бази для юзера за запитами")
      }
    },
  
   
}
</script>


<style scoped>
.content{
  background: rgba(0, 47, 68, 1);
  /* linear-gradient(100.63deg, #003B56 -5.27%, #003147 72.85%); */
  width: 100vw;
  height: 150px;
  color: aliceblue;
}

#user {
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  background: rgba(0, 47, 68, 1);
}
#icon{
  position: absolute;
  height: 79px;
width: 169px;
left: 35px;
top: 34px;
border-radius: 0px;
background: rgba(0, 47, 68, 1);
}
#ria{
font-size: 28px;
font-style: normal;
font-weight: 800;
line-height: 32px;
letter-spacing: 0.07em;
text-align: left;
padding-left:19px;
color: white;
padding-top: 14px;
}
#analyt{
  position: relative;
  bottom: 10px;
  color: rgb(212, 232, 252);
  text-align: left;
  padding-left:19px;
  font-size: 22px;
}
#nav{
  position: absolute;
  left: 35px;
  top: 160px;
  height: 120px;
  width: 200px; 
  background:rgba(0, 47, 68, .1);
  color: rgb(0, 0, 0);
  border-radius: 8px;
  text-align: left;
}
.user_navigation {
  list-style: none;
}
.menuItemSelected {
  color:rgba(0, 47, 68, 1);
  font-weight: bold;
  text-decoration: underline;
}
.user-navigation-item:hover {
  cursor: pointer;
  font-weight: bold;
  color:rgba(0, 47, 68, 1);
  text-decoration: underline;
  
  /* box-shadow: 0 0 10px 0 #d8d9da inset, 0 0 10px 4px rgba(0, 47, 68, 1); */

}

</style>