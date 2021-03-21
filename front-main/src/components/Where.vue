<template>
 	<div v-if="show">
	<button class="remove" id="removeButton" @click.prevent="show = false"></button>
	<select v-model="selectedItem" id="selectList">
	<option value="" selected disabled hidden>Select field</option>
  	<option v-bind:key="recieved" v-for="name in fieldname[fieldIndex][1]" :value="name.name">{{name.name}}</option>
	</select>
	<select v-model="condition" id="selectListCondition">
	<option value="null" selected disabled hidden>Select condition</option>
    <option value="=">Equal</option>   
  	<option value="!=">Not</option>
 	<option value=">">More</option>
    <option value="<">Less</option>
	</select>
	<input id="inputValueCondition" type="text" placeholder=" Value?" v-model="inputField">
	</div>   
</template>

<script>
export default {
    name:"Where",
    props:["fieldname",'request','fieldIndex', 'recieved'],
    data(){
        return{
            selectedItem: '',
            inputField: null,
            condition: null,
            show: true
        }
    },
    created() {
    this.$bus.$on('throw', (args) => {
        this.submit()
    })
    this.$bus.$on('throwrestore', (args) => {
    this.restore()
    })
},
    methods:{
        submit(){
            if(this.show && this.selectedItem != '' && this.condition != '' && this.inputField != ''){
                this.request.where.push(this.selectedItem + this.condition + this.inputField)
                }
        },
        restore(){
        this.selectedItem = this.condition = this.inputField = '';
		this.show = false
        }
    },
}
</script>

<style scoped>
#removeButton:hover{
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}
.remove {
    transform: scale(var(--ggs,1));
    width: 20px;
    height: 20px;
    border: 2px solid white;
	background-color: transparent;
    border-radius: 22px;
}
.remove::before {
    content: "";
    position: absolute;
    width: 8px;
    height: 2px;
    background: white;
    border-radius: 5px;
    top: 7px;
    left: 4px
}
#removeButton{
position: relative;
bottom: 7.5px;
}

#inputValueCondition{
	border-radius: 4px;
	width: 126px;
	height: 35px;
	margin-left: 16px;
	background-color: transparent;
	border: 1px solid #7DA5B7;
    color: rgba(154, 187, 202, 1);
}
#selectListCondition{
	border-radius: 4px;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 17px;
	letter-spacing: 0em;
	text-align: left;
	height: 35px;
	width: 140px;
	background: rgba(238, 240, 242, 1);
	color: rgba(0, 59, 86, 1);
	margin-top: 15px;
	margin-left: 16px;
}
#selectList{
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
	margin-left: 16px;
}



</style>