<template>
    <div v-show="show" >
	<button class="remove" id="removeButton" @click.prevent="show = false"></button>
	<select v-model="selectedItem" id="selectList">
	<option value="none" selected disabled hidden>Select field</option>
  	<option v-bind:key="recieved" v-for="name in fieldname" :value="name">{{name}}</option>
	</select>
    <select v-model="table" id="selectListTable">
    <option value="slon.facts">slon.facts</option>   
  	<option value="slon.r_tags_v2">slon.r_tags_v2</option>
 	<option value="mviews.calltracking">mviews.calltracking</option>
	</select>
	</div>
</template>

<script>
export default { 
    name:"DatasForView",
    props:["fieldname",'request'],
    data(){
        return{
            selectedItem: '',
            table:'',
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
            if(this.selectedItem != '' && this.table != ''&& this.show){
                let temp = []
                temp.push(this.selectedItem)
                temp.push(this.table)
                this.request.select.push(temp)
                temp = []
                }
        },
            restore(){
            this.selectedItem = this.inputField = '';
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