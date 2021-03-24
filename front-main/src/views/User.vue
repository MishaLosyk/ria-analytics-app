<template>
    <div id="user">
    <div id="icon"> 
        <div id="ria">RIA</div>
        <div id="analyt">analytics</div>
    </div>
      <div class="content"></div>
    </div>

</template>


<script>
export default {
    name:'User'
}
</script>


<style scoped>
.content{
  background: linear-gradient(100.63deg, #003B56 -5.27%, #003147 72.85%);
  width: 100vw;
  height: 100vh;
}

#user {
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  background: rgba(0, 47, 68, 1);
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