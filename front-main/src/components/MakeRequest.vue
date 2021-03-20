<template>
  <div id="global">
    <!-- <Error /> -->

    <form>
<div class="container">
	<div style="margin-left: 36px">Datas for view</div>
	<DatasForView v-for="n of countDataField" v-bind:fieldname="fieldname" v-bind:request="request"></DatasForView>
	<button id ="newFieldButton" @click.prevent="addDataField">+ Add new field</button>
	<hr id="blockHr">
</div>


<div class="container">
	<div style="margin-left: 36px">Where</div>
	<Where v-for="n in countWhere" v-bind:fieldname="fieldname" v-bind:request="request" />
	<button id ="newFieldButton" @click.prevent="addWhere">+ Add new field</button>
	<hr id="blockHr">
</div>
<div class="containerSplit">
	<div>
		<div class="Rcontainer">
		<div style="margin-left: 36px">Sort by</div>
			<SortBy v-for="n in countSortBy" v-bind:fieldname="fieldname" v-bind:request="request" />
			<button id ="newFieldButton" @click.prevent="addSortBy">+ Add new field</button>
		</div>
	</div>
	<div class="Lcontainer">
		<div style="margin-left: 36px">Group by</div>
			<GroupBy v-for="n in countGroupBy" v-bind:fieldname="fieldname" v-bind:request="request" />
			<button id ="newFieldButton" @click.prevent="addGroupBy">+ Add new field</button>
		</div>
</div>
<div class="container" >
		<hr id="blockHr">
	<div style="margin-left: 36px">Period</div>
	<input type="date" id="inputDate" v-model="fromDate"> - <input type="date" id="inputDate1" v-model="toDate">
</div>
<div>
<input @click.prevent="submit" class="submitButton" value="Show result">
<input @click.prevent="restore" class="resetButton" type="reset" name="reset" value="Restore all">
</div>
    </form>
  </div>

</template>

<script>
import DatasForView from "@/components/DatasForView";
import Where from "@/components/Where";
import SortBy from "@/components/SortBy";
import GroupBy from "@/components/GroupBy";
export default {
  name: "MakeRequest",
  components: {DatasForView,Where, SortBy,GroupBy},
  props:["recieved","request","fieldname"],
  data() { 
	return{		
countDataField:[],
countWhere:[],
countSortBy:[],
countGroupBy:[],
fromDate:'',
toDate:'',
}
  },
methods:{
	submit(e) {
		this.$bus.$emit('throw', 'Hi')
		console.log("submit")
		if(this.fromDate != ''){
			this.request.fromDate.push(this.fromDate)
			}
		if(this.toDate != ''){
			this.request.toDate.push(this.toDate)
			}
		this.$emit('submit')
},
	addDataField(){
		this.countDataField.push("n")
	},
	addWhere(){
		this.countWhere.push('n')
	},
	addSortBy(){
		this.countSortBy.push('n')
	},
	addGroupBy(){
		this.countGroupBy.push('n')
	},
	restore(){
		this.fromDate = this.toDate = ''
		this.$bus.$emit('throwrestore', 'Hi')
	}

}
}
</script>

<style scoped>
#global{
	background: linear-gradient(100.63deg, #003B56 -5.27%, #003147 72.85%);
	padding: 15px;
}
#inputDate{
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
	margin-top: 15px;
	margin-left: 36px;
}
#inputDate1{
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
	margin-top: 15px;
}
.containerSplit{
	position: relative;
	color: rgba(154, 187, 202, 1);
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	text-align: left;
	line-height: 20px;
	letter-spacing: 0.03em;
	width: 572px;
	margin:auto;
	display: grid;
	grid-gap: 52px;
	grid-template-columns: 242px 242px;
	padding-left: 12px;
	margin-top: 25px;
	margin-bottom: 30px;
}

#newFieldButton{
	margin-left: 36px;
	margin-top: 20px;
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

#blockHr{
	border: 1px solid #1e6c91;
	width: 500px;
	margin-left: 36px;
}
.container{
	position: relative;
	color: rgba(154, 187, 202, 1);
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	text-align: left;
	line-height: 20px;
	letter-spacing: 0.03em;
	width: 572px;
	margin:auto;
	margin-bottom: 30px;
}
.submitButton {	
	font-size: 16px;
	line-height: 20px;
	letter-spacing: 0.03em;
	height: 45px;
	width: 316px;
	border-radius: 4px;
	background: rgba(33, 155, 231, 1);
	color: rgba(255, 255, 255, 1);
	text-align: center;
	margin-bottom: 40px;
	border: 0;
	padding: 0;
	cursor: pointer;
}
.resetButton{
	font-size: 16px;
	line-height: 20px;
	letter-spacing: 0.03em;
	height: 45px;
	width: 145px;
	color: rgba(255, 255, 255, 1);
	background-color: transparent;
	border: 2px solid #407A9D;
	border-radius: 4px;
	margin-left: 40px;
	cursor: pointer;
}
</style>