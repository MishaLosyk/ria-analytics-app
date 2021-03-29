<template>
  <div>
   <div id="user">
    <div id="icon"> 
        <div id="ria">RIA</div>
        <div id="analyt">analytics</div>
    </div>
      <div class="content">
      <p> Привіт, {{name}} {{surname}}</p>
      <!-- user_id=   = {{user_id}}   -->
      <!-- $route.params.user_id    -якщо в роутах props: false -->
      <QueryList :query-list="queryArray"/>





        
      </div>
    </div>

  </div>
 
</template>



<script>
import axios from 'axios';
import {PATH, PORT} from "@/config/config.js";

import QueryList from "@/components/user/QueryList"
export default {
   name:'User',
  //  props: ['user_id'],
    components: {
      QueryList
    },
    data() {
      return {
        name: "Jack",
        surname: "Smith",
        user_id: 1,
        queryArray: [
          {
            query_id: 1,
            query_name: 'name1',
            query: "query1"
          },
          {
            query_id: 2,
            query_name: 'name2',
            query: "query2"
          },
          {
            query_id: 5,
            query_name: 'name5',
            query: "query5"
          }
        ]
      }
    },
    created () {
      this.getQueryList();
    },
    computed: {
    test() {
      return this.$store.state.name;
      }
    },
    methods: {
       async getQueryList () {
        // console.log("USer_id=" + this.user_id)
        // const response = await axios.post(`${PATH}:${PORT}/query_list`, {user_id: this.user_id})   //! порт  і шлях до сервера
          // .then(response => {
            // if(response.statusText === "OK") {
              // this.queryArray = response.data;
            // }
        //   console.log(response)
        // })
      // const response =  await axios.get(`http://localhost:8081/`)///,{user_id: this.user_id}) 
      // .then(data=> console.log(data))
      // this.queryArray = response.data
        console.log(this.queryArray)

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
  background: linear-gradient(100.63deg, #003B56 -5.27%, #003147 72.85%);
  width: 100vw;
  height: 100vh;
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
</style>