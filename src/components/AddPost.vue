<template>
    <div class="d-flex justify-content-center m-3">
        <div class="card d-flex justify-content-center" style="width: 50rem;">
            <input type="text" v-model="titlePost" class="m-3" placeholder="Enter a title">
            <textarea name="Content" id="" cols="30" rows="10" v-model="contentPost" class="m-3" placeholder="Enter a content"></textarea>
            <input type="submit" @click="AddPost" value="Save" class="m-3" style="width: 10rem;">
        </div>
    </div>
</template>

<script>
    import ApiResult from "@/SubClasses/ApiResult";

    var BlogID = window.location.href.split("/")[4];
    var AccessToken = localStorage.getItem("AccessToken");
    var AccessTokenString = "?access_token=" + AccessToken;

    var UserAddPostLink =
        "https://www.googleapis.com/blogger/v3/blogs/" +
        BlogID +
        "/posts/";

    var jsonAddPost = {
        "kind": "blogger#post",
        "blog": {
            "id": BlogID
        },
        "title": "",
        "content": ""
    }

    export default {
        name: "AddPost",
        data: () => ({
            titlePost: "",
            contentPost: ""
        }),
        methods: {
            AddPost: function () {
                jsonAddPost.title = this.titlePost;
                jsonAddPost.content = this.contentPost;
                ApiResult.ApplyREST("POST", UserAddPostLink + AccessTokenString, jsonAddPost).then(window.location.replace("/Posts/" + BlogID));
            }
        }
    }
</script>

<style scoped>

</style>