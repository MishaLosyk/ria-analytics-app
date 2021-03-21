<template>
  <div id="global">
    <!-- <Error /> -->

    <form>
<div class="container">
	<div style="margin-left: 36px">Datas for view</div>
	    <select v-model="fieldIndex" id="selectListTable">
		<option value="null" selected disabled hidden>Select table</option>
    <option v-for="(name,index) in fieldname" :value="index">{{name[0]}}</option>   
	</select>
</div>
	<div class="container">
	<DatasForView v-bind:fieldIndex="fieldIndex" v-for="n of countDataField" v-bind:fieldname="fieldname" v-bind:request="request"></DatasForView>
	<button id ="newFieldButton" :disabled="fieldIndex == 'null'" @click.prevent="addDataField">+ Add new field</button>
	<hr id="blockHr">
</div>


<div class="container">
	<div style="margin-left: 36px">Where</div>
	<Where v-bind:fieldIndex="fieldIndex" v-for="n in countWhere" v-bind:fieldname="fieldname" v-bind:request="request" />
	<button id ="newFieldButton" :disabled="fieldIndex == 'null'" @click.prevent="addWhere">+ Add new field</button>
	<hr id="blockHr">
</div>
<div class="containerSplit">
	<div>
		<div class="Rcontainer">
		<div style="margin-left: 36px">Sort by</div>
			<SortBy v-bind:fieldIndex="fieldIndex" v-for="n in countSortBy" v-bind:fieldname="fieldname" v-bind:request="request" />
			<button id ="newFieldButton" :disabled="fieldIndex == 'null'" @click.prevent="addSortBy">+ Add new field</button>
		</div>
	</div>
	<div class="Lcontainer">
		<div style="margin-left: 36px">Group by</div>
			<GroupBy v-bind:fieldIndex="fieldIndex" v-for="n in countGroupBy" v-bind:fieldname="fieldname" v-bind:request="request" />
			<button id ="newFieldButton" :disabled="fieldIndex == 'null'" @click.prevent="addGroupBy">+ Add new field</button>
		</div>
</div>
<div class="container" >
		<hr id="blockHr">
	<div style="margin-left: 36px">Period</div>
	<input type="date" id="inputDate" v-model="fromDate"> - <input type="date" id="inputDate1" v-model="toDate">
</div>
<div>
<button @click.prevent="submit" :disabled="fieldIndex == 'null' || fromDate == ''|| toDate == ''" class="submitButton" >Show result</button>
<button @click.prevent="restore"  class="resetButton"  name="reset" >Restore all</button>
<button @click.prevent="union" :disabled="fieldIndex == 'null' || fromDate == ''|| toDate == ''"   class="submitButton" >Union</button>
<button @click.prevent="unionall" :disabled="fieldIndex == 'null' || fromDate == ''|| toDate == ''"   class="submitButton" >Union All</button>
<button @click.prevent="from" :disabled="fieldIndex == 'null'"  class="submitButton" >From</button>
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
  props:["recieved","request","fieldname",'result','temprequest','tempfield'],
  data() { 
	return{		
countDataField:[],
countWhere:[],
countSortBy:[],
countGroupBy:[],
fromDate:'',
toDate:'',
fieldIndex:'null',
}
  },
methods:{
	submit(e) {
		this.submitform()
		console.log("submit")
		console.log(this.request)
		if(this.temprequest.haveSubRequest){
			this.addLastBranch(this.temprequest)
		}
		console.log("emit submit")
		this.$emit('submit')
		this.restore()
},

union(){
	this.submitform()
			if(this.temprequest.haveSubRequest){
		this.addLastBranch(this.temprequest)
		}
	this.$emit('union')
	this.restore()

},

unionall(){
	this.submitform()
	this.$emit('unionall')
	this.restore()
		if(this.temprequest.haveSubRequest){
		this.addLastBranch(this.temprequest)
		}
},


from(){
	this.$bus.$emit('throw', 'Hi')
	if(this.toDate != '' && this.fromDate != ''){
	this.request.date.push("EventDate <"+"('"+this.toDate+"')"+" AND EventDate >"+"('"+this.fromDate+"')")}
	this.request.from = this.fieldname[this.fieldIndex][0]
	this.$emit('changefield')
	if(!this.temprequest.haveSubRequest){
		this.temprequest.select = this.request.select
		this.temprequest.where = this.request.where
		this.temprequest.group = this.request.group
		this.temprequest.sort = this.request.sort
		this.temprequest.date = this.request.date
		this.temprequest.from = {
      haveSubRequest: false,
      from: '',
      select: [],
      where:  [],
      group:  [],
      sort:   [],
      date:   []       
        }
		this.temprequest.haveSubRequest = true
		this.requestclear()
	// 	this.request={
    //   haveSubRequest: false,
    //   from: '',
    //   select: [],
    //   where:  [],
    //   group:  [],
    //   sort:   [],
    //   date:   []       
	// 	}
		console.log(this.request)
		console.log('if')
	}	
	else{
		this.addNewBranch(this.temprequest)
			this.request={
      haveSubRequest: false,
      from: '',
      select: [],
      where:  [],
      group:  [],
      sort:   [],
      date:   []       
		}
		console.log('else')
	}
this.restore()
},


addLastBranch(obj){
 var that = this
	if(obj.haveSubRequest){
		that.addLastBranch(obj.from)
	}
	else{
		obj.select = this.request.select
		obj.where = this.request.where
		obj.group = this.request.group
		obj.sort = this.request.sort
		obj.date = this.request.date
		obj.from = this.request.from
	}
},

addNewBranch(obj){
var that = this
	console.log(obj.haveSubRequest)
	if(obj.haveSubRequest){
		console.log('икфтсрwork')
		that.addNewBranch(obj.from)
	}
	else{
		console.log('else tree')
		obj.haveSubRequest = true
		obj.select = this.request.select
		obj.where = this.request.where
		obj.group = this.request.group
		obj.sort = this.request.sort
		obj.date = this.request.date
		obj.from = {
      haveSubRequest: false,
      from: '',
      select: [],
      where:  [],
      group:  [],
      sort:   [],
      date:   []       
        }

	}
},

	requestclear(){
		this.request.haveSubRequest = false
		this.request.from = ''
		this.request.select = []
		this.request.where = []
		this.request.group = []
		this.request.sort = []
		this.request.date = []
	},

	submitform(){
		this.$bus.$emit('throw', 'Hi')
		this.request.from = this.fieldname[this.fieldIndex][0]
		this.request.date.push("EventDate <"+"('"+this.toDate+"')"+" AND EventDate >"+"('"+this.fromDate+"')")
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
		this.fieldIndex = 'null'
		this.countDataField = []
	}

}
}
</script>

<style scoped>
#selectListTable{
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
#newFieldButton:hover{
	box-shadow: 0 0 10px 0 #d8d9da inset, 0 0 10px 4px #247e18;
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
	width: 145px;
	border-radius: 4px;
	background: rgba(33, 155, 231, 1);
	color: rgba(255, 255, 255, 1);
	text-align: center;
	margin-bottom: 40px;
	border: 0;
	padding: 0;
	cursor: pointer;
	margin-left: 16px;
}
.submitButton:hover{
	background-color: #2f90d1
}
.submitButton:disabled{
	background-color: rgba(33, 155, 231, .6)
}

.submitButton:disabled:hover{
	background-color: rgba(33, 155, 231, .6);
	cursor: default;
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
	margin-left: 16px;
	cursor: pointer;
}
.resetButton:hover{
	box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}

</style>