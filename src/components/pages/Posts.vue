<template>
  <div class="container-fluid w-90 mt-3 mb-3">
    <div class="p-3 card bg-light text-dark mb-3" v-for="Post in Posts" v-bind:key="Post.id">
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
      <div>
        <button type="button" class="btn btn-danger mr-1 shadow-none" @click="DeletePost(Post.id)">
          <VueFontawesome icon="trash" class="mr-2" size="1" />Delete
        </button>
        <a class="btn btn-warning mr-1 shadow-none" :href="'/Posts/' + Post.blog.id + '/Post/' + Post.id">
          <VueFontawesome icon="arrows" class="mr-2" size="1" />Click for More
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import ApiResult from "../../SubClasses/ApiResult.js";
var BlogID = window.location.href.split("/")[4];
var AccessToken = localStorage.getItem("AccessToken");
var AccessTokenString = "?access_token=" + AccessToken;
var UserPostsLink =
  "https://www.googleapis.com/blogger/v3/blogs/" +
  BlogID +
  "/posts" +
  AccessTokenString;

  var UserOnePostLink =
  "https://www.googleapis.com/blogger/v3/blogs/" +
  BlogID +
  "/posts/";

export default {
  name: "Posts",
  data() {
    return { Posts: {} };
  },
  methods: {
    GetPosts: function() {
      ApiResult.ApplyREST("GET", UserPostsLink, null).then(Result => {
        this.Posts = Result.data["items"].sort(function(a, b) {
          return b.id - a.id;
        });
      });
    },
    DeletePost: function(KEY) {
      ApiResult.ApplyREST("DELETE", UserOnePostLink + KEY + AccessTokenString, null).then(window.location.replace("/Posts/" + BlogID));
    }
  },
  mounted() {
    this.GetPosts();
  }
};
</script>

<style scoped></style>
