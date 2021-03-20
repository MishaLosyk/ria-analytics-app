<template>
  <div id="app" >
    <div id="icon"> <div id="ria">RIA</div>
      <div id="analyt">analytics</div></div>
      <MakeRequest @submit="onSubmit" v-bind:fieldname="fieldname" v-bind:request="request"/>
      <RecievedData v-bind:recieved="recieved"/>
  </div>
</template>

<script>
import MakeRequest from "@/components/MakeRequest";
import RecievedData from "@/components/RecievedData";
import axios from 'axios';
export default {
  name: 'App',
  components: {
    MakeRequest,
    RecievedData
  },
created() {
  // GET request
  axios.get('http://localhost:8081/')             //замени localhost/getfielnames
    .then(response => this.fieldname = response);
},
    data() { 
	return{
    request:{
      select:[],
      where:[],
      group:[],
      sort:[],
      fromDate:[],
      toDate:[]
    },
fieldname:null,
//["EventDate","HourDate","MinuteDate","SecondDate","web_id","user_id","project_id","marka_id","event_id","owner_id","proposal_id","conversion_value"],
recieved:{
  'meta':[],
  'data':[]
}
  }
    },
methods:{
  async onSubmit(){
  const article = this.request;
  const response = await axios.post('http://localhost:8081/search', article);  //замени localhost/api
    this.recieved = response;
    this.request = {
      select:[],
      where:[],
      group:[],
      sort:[],
      fromDate:[],
      toDate:[]
    }
  }
}
}
</script>

<style>
#app {
  text-align: center;
  font-family: 'Montserrat', sans-serif;
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
