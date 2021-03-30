<template>
<div class="query-result-container">
        <hr>
    <h2> Результат запиту:</h2>
 
<!-- <p v-for="(query, index) of queryData.data" :key="index">{{query[0]}}</p> -->
 <div class="query-table-container">
    <table class="table-query-result">
        <thead>
            <tr class="table-row row-head">
                <th v-for="(query, index) of queryData.meta" :key="index">
                    {{
                   query.name
                    }}</th>
            </tr>
            <tr 
            class="table-row row-body"
            v-for="(query, index) of queryData.data" :key="index" >
                    <td class="table-cell"
                     v-for="(query, index) of query" :key="index"  >{{query}}</td>                    
            </tr>
        </thead>
    </table>     
 </div>
    </div>
</template>

<script>
    export default {
        name: "QueryResultTable",
        props:["query-data"]
    }
</script>

<style lang="css" scoped>
.query-result-container {
    /* width: 100vw; */
    /* background: rgba(0, 47, 68, 1); */
}
.query-table-container {
    margin-bottom: 50px;
    max-height: 700px;
    border: 1px solid rgba(0, 47, 68, 1);;
    overflow: auto;
}
.table-query-result {
    /* width: 100vw;
    background: rgba(0, 47, 68, 1); */
}
.table-query-result {
    border: 3px groove white;
    width: 100%;
    color: rgba(0, 47, 68, 1);
}
.table-row  {
    /* border: 1px solid white; */
}
.row-head {

}
.table-cell {
    min-width: 100px ;
    border: 1px solid rgba(0, 47, 68, 1);
}
</style>