<template>
    <div class="case">
        <select @change="selectjoin" v-model="value" id='selectList'>
            <option hidden selected disabled value="">Select join type</option>
            <option value="JOIN">Inner join</option>
            <option value="LEFT JOIN">Left join</option>
            <option value="RIGHT JOIN">Right join</option>
        </select>
        <select v-model="tableindex" @change="selecttable" id='selectList'>
            <option hidden selected disabled value="">Select table</option>
            <option v-for="(table,index) of tablename" :value="index">{{table[0]}}</option>
        </select><br>
        <div style="margin-top:16px">
                    Using<br>
        <select v-model="usingname" id='selectList'>
        <option hidden selected disabled value="">Using</option>
        <option v-for="field of fields" :value="field.name">{{field.name}}</option>
        </select>

        </div>
    </div>
</template>

<script>
export default {
name:'Join',
props:['tablename','fieldIndex','fieldname','request'],
data(){
    return{
        value:'',
        tableindex:'',
        fields: [],
        usingname: '',
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
    selectjoin(){
        this.$emit('selectjoin', this.value)
    },
    selecttable(){
        this.fields = []
        let a = this.tablename[this.tableindex][1].slice()
        let b = this.fieldname.slice()
        for(let fname of a){
            for(let xname of b[this.fieldIndex][1]){
                if(JSON.stringify(fname) == JSON.stringify(xname)){
                    this.fields.push(xname)
                }
            }
        }
    },
    submit(){
        this.$emit('submitjoin',this.request.from +" "+ this.value +" "+ this.tablename[this.tableindex][0] + ' USING('+this.usingname+')')
                                                                                                                //' USING('+this.request.from+'.'+this.usingname +','+this.tablename[this.tableindex][0]+'.'+this.usingname+")")
                                                                                                                ///' USING('+this.request.from+'.'+this.usingname +','+this.tablename[this.tableindex][0]+'.'+this.usingname+")")
        for(let i in this.fieldname){
            if(this.fieldname[i][0] == this.tablename[this.tableindex][0]){
                this.$emit('index', i)
            }
        }
    },
    restore(){

    }

}

}
</script>


<style scoped>
.case{
    margin-left: 36px;
    margin-top: 15px;
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
    margin-right: 16px;

}
</style>