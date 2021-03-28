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
left: 300px;
margin-top: 60px;
}
#users{
font-size: 50px;
width: 500px;
}
</style>