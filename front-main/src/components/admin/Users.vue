<template>
<div>
    <div class="block">
        <div id='users'>КОРИСТУВАЧІ</div>
        <NewUser/>
        <UserList/>
    </div>

</div>
</template>

<script>
import NewUser from '@/components/admin/NewUser'
import UserList from '@/components/admin/UserList'
export default {
    name:"Users",
    components:{
        NewUser,
        UserList
    }
}
</script>



<style scoped>
.block{
position: absolute;
padding-left: 300px;
padding-top: 30px;
}
#users{
font-size: 50px;
}
</style>