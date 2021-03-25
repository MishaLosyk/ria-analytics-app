<template>
  <div id="app" >
    <div id="icon"> <div id="ria">RIA</div>
      <div id="analyt">analytics</div></div>
      <MakeRequest v-bind:tempnames="tempnames" @changefield ='onChangefield' @unionall='onUnionAll' @union='onUnion' @submit="onSubmit" v-bind:fieldname="fieldname" v-bind:request="request" v-bind:result="result" v-bind:temprequest="temprequest" v-bind:tempfield="tempfield"/>
      <RecievedData v-bind:recieved="recieved"/>
  </div>
</template>

<script>
import MakeRequest from "@/components/constructor/MakeRequest";
import RecievedData from "@/components/constructor/RecievedData";
import axios from 'axios';
export default {
  name: 'Constructor',
  components: {
    MakeRequest,
    RecievedData
  },
created() {
  // GET request
  axios.get('http://localhost:8081/')   //замени localhost/8081 http://109.108.247.29:8081/
    .then(response => {this.fieldname = response.data; this.startfieldnames = response.data});
},
    data() { 
	return{

    tempnames:[],
    request:{
      haveSubRequest: false,
      from: '',
      select: [],
      where:  [],
      group:  [],
      sort:   [],
      date:   [],
      limit:0     
        },
temprequest:{
      haveSubRequest: false,
      from: '',
      select: [],
      where:  [],
      group:  [],
      sort:   [],
      date:   [],
      limit:0       
        },
startfieldnames:null,
tempfield:[[]],
fieldname:null,
result:[],
recieved:null,
  }
    },
methods:{
onChangefield(){
  console.log(this.request.from)
  this.tempfield[0].push(this.request.from,this.request.select)
  this.fieldname = this.tempfield
},



onUnion(){
  this.fieldname = this.startfieldnames
    if(this.temprequest.haveSubRequest){
     this.fieldname = this.startfieldnames
    this.result.push(this.temprequest,'UNION')
    }
    if(!this.temprequest.haveSubRequest){
      this.result.push(this.request, "UNION")
      }
  console.log(this.result)
       this.temprequest={
      haveSubRequest: false,
      from: '',
      select: [],
      where:  [],
      group:  [],
      sort:   [],
      date:   [],
      limit:0        
       }
      this.request = {
      haveSubRequest: false,
      from: '',
      select: [],
      where:  [],
      group:  [],
      sort:   [],
      date:   [],
      limit:0       
        }
},

onUnionAll(){
    if(this.temprequest.haveSubRequest){
    this.fieldname = this.startfieldnames
    this.result.push(this.temprequest,'UNION ALL')
    }
    if(!this.temprequest.haveSubRequest){
      this.result.push(this.request, "UNION ALL")
      }
       this.temprequest={
      haveSubRequest: false,
      from: '',
      select: [],
      where:  [],
      group:  [],
      sort:   [],
      date:   [],
      limit:0       
       }
      this.request = {
      haveSubRequest: false,
      from: '',
      select: [],
      where:  [],
      group:  [],
      sort:   [],
      date:   [],
      limit:0      
        }

},

  async onSubmit(){
    if(this.temprequest.haveSubRequest){
    this.result.push(this.temprequest)
    this.fieldname = this.startfieldnames
    }
    if(!this.temprequest.haveSubRequest){
      this.result.push(this.request)
      }


  console.log(this.result)
  const article = this.result;
  const response = await axios.post("http://localhost:8081/search", article);  //замени localhost/search    http://109.108.247.29:8081/search
  
    if(response.data.hasOwnProperty('error')){
      console.log("error")
      this.recieved = 'error'
    }
    else{
      this.recieved = response.data;
    }
    this.result = []
    this.temprequest={
      haveSubRequest: false,
      from: '',
      select: [],
      where:  [],
      group:  [],
      sort:   [],
      date:   [],
      limit:0      
       }
    this.request = {
      haveSubRequest: false,
      from: '',
      select: [],
      where:  [],
      group:  [],
      sort:   [],
      date:   [],
      limit:0  
        }
        return
  }
}
}
</script>

<style scoped>
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
