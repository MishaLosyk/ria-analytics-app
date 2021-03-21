<template>
<div>
	<div v-if="recieved == null"><div id="result">No match</div></div>
		<div v-if="recieved == 'error'"><div id="result">No data matching this request</div></div>
	<div v-if="recieved != null && recieved != 'error'">
	<div id="result">Result:<b>{{recieved.data.length +' items'}}</b></div>
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


}

</script>

<style scoped>
  #table{
    margin: auto;
	color: rgba(35, 37, 38, 1);

  }
  #result{
	  margin: auto;
	font-size: 20px;
	line-height: 24px;	
	letter-spacing: 0.07em;
	text-align: left;
	width: 200px;
	margin-top: 50px;
	margin-bottom: 50px;
	color: rgba(0, 59, 86, 1);

  }
  th{
	  padding-top: 18px;
	  padding-bottom: 18px;
  }
</style>
