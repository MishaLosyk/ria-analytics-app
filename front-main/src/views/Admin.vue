<template>
  <div class="admin">
        <div id="icon"> <div id="ria">RIA</div>
      <div id="analyt">analytics</div>
      </div>
      <div id="nav" v-if="storageAuth && storageRole == 'admin'">
           <div id="text"><button id='navButton' @click="change" :disabled="active">Користувачі</button><br>
            <button @click="change" id='navButton' :disabled="!active">Логи</button>
            </div>
      </div>
      <div class="content" v-if="storageAuth && storageRole == 'admin'">
      <div v-if="active">
      <Users/>
      </div>
      <div v-if="!active">
       <Logs />
      </div>
      </div>
  </div>
</template>
<script>
import Users from '@/components/admin/Users'
import Logs from '@/components/admin/Logs'
export default {
    computed: {
    storageAuth() {
      return this.$store.state.auth
      },
     storageRole() {
      return this.$store.state.role
      },
  },
  name:'Admin',
  components:{
    Users,
    Logs,
  },
  data(){
    return{
      active:true
    }
  },
  methods:{
    change(){
      this.active = !this.active
    }
  }

}
</script>

<style scoped>

#navButton{
  background: transparent;
  border: transparent;
  outline: none;
}
#navButton:hover{
  color: aliceblue;
}
#navButton:disabled{
  color: aliceblue;
}
#nav{
  position: absolute;
  left: 35px;
  top: 140px;
  height: 60px;
  width: 169px; 
  background:rgba(255, 255, 255, 0.6);
  color: rgba(0, 47, 68, 1);
  border-radius: 8px;
  text-align: center;
}
#text{
  position: relative;
  bottom: 26px;
}

.content{
text-align: left;
}


.admin {
  font-family: 'Montserrat', sans-serif;
  background: linear-gradient(100.63deg, #003B56 -5.27%, #003147 72.85%);
  width: 100vw;
  min-height: 100vh;
  height: auto;
  color: rgba(154, 187, 202, 1);
  z-index: 10;
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