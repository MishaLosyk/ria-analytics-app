<template>
  <div>
      <!-- <p>Query 1 component</p> -->
      <!-- {{query}} -->
      <div class="queries-container">
        <tr>
          <td> {{query.query_id}} </td>
          <td> {{query.query_name}} </td>
          <td> {{query.query}} </td>
        </tr>
      </div>
      
      <details>
        <summary> Тіло запиту</summary>
      <p>{{query.query}} </p>
      </details>
  </div>
</template>

<script>
  export default {
    name: "Query",
    props: ["query"],
    data(){
      return {

      }
    }
    
  }
</script>

<style lang="css" scoped>
   td{
    width: 150px;
    border: 1px solid gold;
  } 
</style>