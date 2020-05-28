<template>
    <div class="hello">
        <div>
            <el-button
                    type="primary"
                    @click="handleClickLogin"
                    :disabled="!isInit"
            >get authCode</el-button>
            <el-button
                    type="primary"
                    @click="handleClickSignIn"
                    v-if="!isSignIn"
                    :disabled="!isInit"
            >sign in</el-button>
            <el-button
                    type="primary"
                    @click="handleClickSignOut"
                    v-if="isSignIn"
                    :disabled="!isInit"
            >sign out</el-button>
            <el-button
                    type="primary"
                    @click="handleClickDisconnect"
                    :disabled="!isInit"
            >disconnect</el-button>
            <i class="fas fa-edit"></i>
            <p>isInit: {{isInit}}</p>
            <p>isSignIn: {{isSignIn}}</p>
        </div>
    </div>
</template>

<script>
    export default {

        data(){
            return{
                bloggerData: null,
                isInit: false,
                isSignIn: false
            }
        },
        mounted() {
            var vm = this
            vm.fetchBloggerApi()

        },
        methods:{
            fetchBloggerApi(){
                var vm = this;
                const axios = require('axios');
                axios.get('https://www.googleapis.com/blogger/v3/blogs/1638418377018710180?key=AIzaSyBjTdt2MEa14lzK0EakTkL4pgRCNg4I7zc')
                    .then(function (response) {
                        vm.bloggerData = response.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            handleClickLogin() {
                this.$gAuth
                    .getAuthCode()
                    .then(authCode => {
                        //on success
                        console.log("authCode", authCode);
                    })
                    .catch(error => {
                        //on fail do something
                        console.error(error);
                    });
            },
            handleClickSignIn() {
                this.$gAuth
                    .signIn()
                    .then(GoogleUser => {
                        //on success do something
                        console.log("GoogleUser", GoogleUser);
                        console.log("getId", GoogleUser.getId());
                        console.log("getBasicProfile", GoogleUser.getBasicProfile());
                        console.log("getAuthResponse", GoogleUser.getAuthResponse());
                        console.log(
                            "getAuthResponse",
                            this.$gAuth.GoogleAuth.currentUser.get().getAuthResponse()
                        );
                        this.isSignIn = this.$gAuth.isAuthorized;
                    })
                    .catch(error => {
                        //on fail do something
                        console.error(error);
                    });
            },
            handleClickSignOut() {
                this.$gAuth
                    .signOut()
                    .then(() => {
                        //on success do something
                        this.isSignIn = this.$gAuth.isAuthorized;
                        console.log("isSignIn", this.$gAuth.isAuthorized);
                    })
                    .catch(error => {
                        //on fail do something
                        console.error(error);
                    });
            },
            handleClickDisconnect() {
                window.location.href = `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${window.location.href}`;
            }
        },
        created() {
            let that = this;
            let checkGauthLoad = setInterval(function() {
                that.isInit = that.$gAuth.isInit;
                that.isSignIn = that.$gAuth.isAuthorized;
                if (that.isInit) clearInterval(checkGauthLoad);
            }, 1000);
        }
    }
</script>