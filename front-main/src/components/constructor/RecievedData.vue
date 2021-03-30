<template>
<div>
	<div v-if="recieved == null"><div id="result">Зробіть запит</div></div>
		<div v-if="recieved == 'error'"><div id="result">Відсутні дані</div></div>
	<div v-if="recieved != null && recieved != 'error'">
	<div id="result">Результат:<b>{{recieved.data.length}} рядків</b></div>
				<div id="save">
		<button id="saveButton" @click="saver" :disabled="savename ==''">Зберегти запит</button>
		<input type="text" placeholder="Назва" id="saveInput" v-model="savename">
	</div>
	<div id ='table'>
		<hr>
  <table class="table table-striped table-sm" >
    <thead id="table">
	<tr>
	<th scope="col"  v-for="name in recieved.meta">{{name.name}}</th>
	</tr>
    </thead>
    <tbody id="tableBody">
	<tr v-for="data in recieved.data">
	<th v-for="value in data" >{{value}}</th>
	</tr>
    </tbody>
  </table>
	</div>
	</div>
</div>
</template>

<script>
export default {
name: "RecievedData",
props:['recieved',],
data(){
	return{
		savename:''
	}
},
methods:{
	saver(){
		this.$emit('saver', this.savename)
		this.savename = ''
	}
}

}

</script>

<style scoped>
  #table{
    margin: auto;
	color: rgba(35, 37, 38, 1);
	margin-top: 50px;
	bottom: 130px;
	position: relative;
  }
  #result{
	  margin: auto;
	font-size: 20px;
	line-height: 24px;	
	letter-spacing: 0.07em;
	text-align: left;
	width: 250px;
	margin-top: 50px;
	margin-bottom: 50px;
	color: rgba(0, 59, 86, 1);

  }
  th{
	  padding-top: 18px;
	  padding-bottom: 18px;
  }
#saveButton{
	background: rgba(33, 155, 231, 1);
	height: 35px;
	width: 150px;
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
#saveButton:hover:active{
	box-shadow: 0 0 10px 0 #d8d9da inset, 0 0 10px 4px rgba(33, 155, 231, 1);;
}
#saveButton:disabled{
	background: rgba(33, 155, 231, 0.6);
}
#saveInput{
	margin-left: 16px;
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
#save{
	position: relative;
	flex: left;
	margin-right: 69vw;
	display: inline;
	bottom: 95px;
}
</style>
