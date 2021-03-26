<template>
  <div id="admin">
        <div id="icon"> <div id="ria">RIA</div>
      <div id="analyt">analytics</div></div>
      <div class="content">
      <Users/>
      </div>
      <div>

      </div>

      
  </div>
</template>
<script>
import Users from '@/components/admin/Users'
export default {
  name:'Admin',
  components:{
    Users,
  },
  data(){
    return{
    }
  },
  methods:{
  }

}
</script>

<style scoped>
.content{
text-align: left;

}


#admin {
  font-family: 'Montserrat', sans-serif;
  background: linear-gradient(100.63deg, #003B56 -5.27%, #003147 72.85%);
  width: 100vw;
  height: 100vh;
  color: rgba(154, 187, 202, 1);
}
#icon{
  position: absolute;
  height: 79px;
width: 169px;
left: 35px;
top: 34px;
border-radius: 0px;
background: rgba(0, 47, 68, 1);
}
#ria{
font-size: 28px;
font-style: normal;
font-weight: 800;
line-height: 32px;
letter-spacing: 0.07em;
text-align: left;
padding-left:19px;
color: white;
padding-top: 14px;
}
#analyt{
  position: relative;
  bottom: 10px;
  color: rgb(212, 232, 252);
  text-align: left;
  padding-left:19px;
  font-size: 22px;
}
</style>