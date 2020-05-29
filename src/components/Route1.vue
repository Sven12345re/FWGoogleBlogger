<template>
    <div class="hello">
        <div style="display: flex">
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
            <el-button
                    type="primary"
                    @click="getAllBlogs"
                    :disabled="!isInit"
            >Get All Blogs</el-button>
            <i class="fas fa-edit"></i>
            <p>isInit: {{isInit}}</p> |
            <p>isSignIn: {{isSignIn}}</p> |
            <div>Username: {{username}}</div>
        </div>
        <div style="display: flex">
            <ul id="example-1">
                <li v-for="item in allBlogs" :key="item.name">
                    <button @click="postsOfBlog(item.id)">{{ item.name }}</button>
                </li>
            </ul>
            <ul id="example-2" style="margin: 2em" v-if="allPostsOfBlog != 'Keine Posts'">
                <li v-for="item in allPostsOfBlog" :key="item.title">
                    {{ item.title }}
                </li>
            </ul>
            <ul v-else style="margin: 2em">
                <li>Keine Posts</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {

        data(){
            return{
                bloggerData: null,
                isInit: false,
                isSignIn: false,
                accesTokken:0,
                allBlogs: '',
                allPostsOfBlog: '',
                username:''
            }
        },
        mounted() {


        },
        methods:{

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
                        this.accessToken = GoogleUser.getAuthResponse()['access_token'];
                        this.username = GoogleUser.getBasicProfile()['Bd'];
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
            },
            getAllBlogs(){

                const axios = require('axios');
                axios.get('https://www.googleapis.com/blogger/v3/users/self/blogs?access_token=' + this.accessToken)
                    .then(response => {
                        this.allBlogs = response.data['items']
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            },
            postsOfBlog(id){

                const axios = require('axios');
                axios.get('https://www.googleapis.com/blogger/v3/blogs/'+ id +'/posts?key=AIzaSyBjTdt2MEa14lzK0EakTkL4pgRCNg4I7zc')
                    .then(response => {
                        if (response.data.items != undefined){
                            this.allPostsOfBlog = response.data['items']
                        }else {
                            this.allPostsOfBlog = 'Keine Posts'
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
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