<template>
<div>
    <link rel="stylesheet" 
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" 
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" 
        crossorigin="anonymous">
    <div class="main-containiner">
        <h2>API-доступ</h2>
        <div class="api_controls">
        
            <label> Значення: 
                <button  
                    type="button" 
                    class="button api__generate-button"
                    @click="apiKey = Date.now()"
                >Генерувати</button>
                <input 
                    class="api__input-api-key" 
                    type="text" 
                    placeholder="Введіть ключ апі"
                    v-model="apiKey"> 
            </label>
            
        
        <button 
            class="button api__save-button" 
            type="button"
            @click="saveApiKey">
                <i class="far fa-save"></i>
            </button>
        </div>

    </div>
</div>

</template>

<script>
    import axios from 'axios';

    export default {
        name: "ApiAccessComponent",
        data(){
            return {
                apiKey:this.$store.state.api_key,
            }
        },
        methods: {
            async saveApiKey() {
                // console.log(this.storageApiKey)
            const response = await axios.post(this.storageIp+":8081/api",
                {
                api_key:  this.apiKey                
                },
                {headers: {token: this.storageToken}}); 

                if(response.data === "OK") {
                    
                    alert("збережено")
                } else {
                    alertt("Помилка")
                }
            }
        },
        computed: {
            storageAuth() {
                return this.$store.state.auth
            },
            storageIp() {
                return this.$store.state.ip
            },
            storageUser_id() {
                return this.$store.state.user_id
            },
            storageToken() {
                return this.$store.state.token
            },
            storageApiKey() {
                return this.$store.state.api_key
            }
        },
    }
</script>

<style lang="css" scoped>
    .main-containiner {
        margin-top: 0;
        padding-top: 160px;
        color:rgba(0, 47, 68, 1);
    }
    .api_controls {
        margin-left: auto;
        margin-right: auto;

        padding: 40px 20px 40px 20px;
        width: 600px;
        border: 1px solid grey;
        border-radius: 10px;
        display:flex;
        /* flex-direction: column; */
        justify-content: flex-start;
    }
    .api__generate-button {
        margin-right: 20px;
    }
    .api__input-api-key {
        margin-right:5px;
        width: auto;
    }
    .api__save-button {
        color: red;
    }
    .button:hover {
        box-shadow: 0 0 10px 0 #d8d9da inset, 0 0 10px 4px rgba(0, 47, 68, 1);
        cursor:pointer;
    }
</style>