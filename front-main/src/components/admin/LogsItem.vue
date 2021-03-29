<template>
            
        <li><details><summary><pre style="display:inline;">{{date}}         ID:{{log_id}}                       Ід користувача:{{user_id}} </pre></summary>{{query}}</details></li>


</template>




<script>
export default {
    name:'LogsItem',
    props:['date','log_id','user_id','query'],
}
</script>



<style scoped>
pre{
      font-family: 'Montserrat', sans-serif;
}
</style>