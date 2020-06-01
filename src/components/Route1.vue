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
                    <button @click="deleteABlog(item.blog.id, item.id)">{{ item.title }}</button>
                </li>
            </ul>
            <ul v-else style="margin: 2em">
                <li>Keine Posts</li>
            </ul>
        </div>
    </div>
</template>

<script>
    var apiKey = 'AIzaSyBjTdt2MEa14lzK0EakTkL4pgRCNg4I7zc'
    export default {

        data(){
            return{
                bloggerData: null,
                isInit: false,
                isSignIn: false,
                accesToken:localStorage.getItem('acces-token'),
                allBlogs: '',
                allPostsOfBlog: '',
                username:localStorage.getItem('username')
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
                        localStorage.setItem('acces-tokken',GoogleUser.getAuthResponse()['access_token'])
                        localStorage.setItem('username', GoogleUser.getBasicProfile()['Bd'])
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
                        localStorage.clear()

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
                axios.get('https://www.googleapis.com/blogger/v3/users/self/blogs?access_token=' + localStorage.getItem('acces-tokken'))
                    .then(response => {
                        this.allBlogs = response.data['items']
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            },
            deleteABlog(id, pid){
                console.log('ID: ' + id + ' Pid: ' + pid)
                const axios = require('axios');

                axios.delete('https://www.googleapis.com/blogger/v3/blogs/' + id + '/posts/' + pid + '?access_token=' + localStorage.getItem('acces-tokken'))
                    .then(response => {
                        console.log(response)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                this.getAllBlogs()
            },
            postsOfBlog(id){

                const axios = require('axios');
                axios.get('https://www.googleapis.com/blogger/v3/blogs/'+ id +'/posts?key=' + apiKey)
                    .then(response => {
                        if (response.data.items != undefined){
                            this.allPostsOfBlog = response.data['items']
                            console.log(this.allPostsOfBlog)
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