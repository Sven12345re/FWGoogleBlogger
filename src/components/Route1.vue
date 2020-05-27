<template>
    <div>{{bloggerData.name}}</div>
</template>

<script>
    export default {

        data(){
            return{
                bloggerData: null
            }
        },
        mounted(){
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
            }
        }
    }
</script>