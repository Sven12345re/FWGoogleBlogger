<template>
  <div class="container-fluid w-90 mt-3 mb-3">
    <div class="p-3 card bg-light text-dark mb-3">
      <div class="row">
        <div class="col-sm-8 text-left">
          <h4>{{ Post.title }}</h4>
        </div>
        <div class="col-sm-4 text-right text-secondary">
          <span class="text-dark">
            {{ Post.updated | formatDate }}
            <VueFontawesome icon="clock-o" class="ml-1" size="1" />
          </span>
          <br />
          <span class="text-dark">
            {{ Post.author.displayName }}
            <VueFontawesome icon="user" class="ml-1" size="1" />
          </span>
        </div>
      </div>
      <div class="mt-2 mb-4" v-html="Post.content"></div>
      <div>
        <button type="button" class="btn btn-success mr-1 shadow-none">
          <VueFontawesome icon="pencil" class="mr-2" size="1" />Edit
        </button>
        <button type="button" class="btn btn-danger mr-1 shadow-none" @click="DeletePost(Post.id)">
          <VueFontawesome icon="trash" class="mr-2" size="1" />Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ApiResult from "@/SubClasses/ApiResult.js";
var BlogID = window.location.href.split("/")[4];
var PostID = window.location.href.split("/")[6];

var AccessToken = localStorage.getItem("AccessToken");
var AccessTokenString = "?access_token=" + AccessToken;
var UserPostsLink =
  "https://www.googleapis.com/blogger/v3/blogs/" +
  BlogID +
  "/posts/" +
  PostID +
  AccessTokenString;

  var UserOnePostLink =
  "https://www.googleapis.com/blogger/v3/blogs/" +
  BlogID +
  "/posts/";  

export default {
  name: "Post",
  data() {
    return { Post: {} };
  },
  methods: {
    GetPost: function() {
      ApiResult.ApplyREST("GET", UserPostsLink, null).then(Result => {
        this.Post = Result["data"];
      });
    },
    DeletePost: function(KEY) {
      this.$confirm("Are you sure?").then(() => {
        ApiResult.ApplyREST(
          "DELETE",
          UserOnePostLink + KEY + AccessTokenString,
          null
        ).then();
        this.$fire({
          title: "Done",
          text: "Thanks for Adding a New Post .. Refreshing in 5 Seconds",
          type: "success"
        }).then(
          setTimeout(function() {
            window.location.href = "/Posts/" + BlogID;
          }, 5000)
        );
      });      
    }    
  },
  mounted() {
    this.GetPost();
  }
};
</script>

<style scoped></style>
