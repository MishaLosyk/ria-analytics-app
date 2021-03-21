<template>
    <div v-show="show" >
	<button class="remove" id="removeButton" @click.prevent="show = false"></button>
	<select v-model="selectedItem" id="selectList">
	<option value="null" selected disabled hidden>Select field</option>
  	<option v-bind:key="recieved" v-for="name in fieldname[fieldIndex][1]" :value="name">{{name.name}}</option>
	</select>
    <select v-model="func" id="selectList">
    <option value="null">Select function</option>
    <option value="cnt">Count</option>   
  	<option value="avg=">Average</option>
 	<option value="max">Maximum</option>
    <option value="min">Minimum</option>
	</select>
	</div>
</template>

<script>
export default { 
    name:"DatasForView",
    props:["fieldname",'request',"fieldIndex", "recieved"],
    data(){
        return{
            selectedItem: null,
            func:null,
            show: true,
            func: null,
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
            if(this.func == 'null' && this.show){
                let a ={
                    name:this.selectedItem.name,
                    type:this.selectedItem.type,
                    value:this.selectedItem.name
                }
                this.request.select.push(a)
                }
            if(this.func != 'null' && this.show){
                let b ={
                    name:this.selectedItem.name,
                    type:this.selectedItem.type,
                    value:this.func+'('+this.selectedItem.name+")"
                }
                this.request.select.push(b)
            }
                
        },
            restore(){
            this.show = false
            this.selectedItem = this.inputField = null;
        }
    },
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
	margin-left: 16px;
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
#removeButton:hover{
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}
#inputValue{
	border-radius: 4px;
	width: 206px;
	height: 35px;
	margin-left: 16px;
	background-color: transparent;
	border: 1px solid #7DA5B7;
	color: rgba(154, 187, 202, 1);
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