<template>
    		<div v-if="show">
			<button class="remove" id="removeButton" @click.prevent="show = false"></button>
			<select v-model="selectedItem" id="selectList">
	<option value="null" selected disabled hidden>Select field</option>
  	<option v-bind:key="recieved" v-for="name in fieldname[fieldIndex][1]" :value="name.name">{{name.name}}</option>
			</select>
			</div>
</template>

<script>
export default {
    name:'SortBy',
    props:["fieldname",'request',"fieldIndex", "recieved"],
        data(){
        return{
            selectedItem: null,
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
            if(this.selectedItem != '' && this.show){
                this.request.sort.push(this.selectedItem)
                }
        },
        restore(){
            this.selectedItem = null;
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