<template>
  <div class="container-fluid w-90 mt-3 mb-3">
      <div class="p-3 card bg-light text-dark mb-3" v-for="Blog in Blogs" v-bind:key="Blog.id">
        <div class="row">
          <div class="col-sm-8 text-left">
            <h4>{{ Blog.name }}</h4>
          </div>
          <div class="col-sm-4 text-right text-secondary">
            <span class="text-dark mr-2">
            {{ Blog.updated | formatDate }}
            <VueFontawesome icon="clock-o" class="ml-1" size="1" />   
            </span>
          </div>
        </div>
        <div>
          <a class="btn btn-warning mr-1 shadow-none" :href="'/Posts/' + Blog.id">
            <VueFontawesome icon="arrow-right" class="mr-2" size="1" />Show All Posts Of This Blog
          </a>
        </div>
      </div>
    </div>    
</template>

<script>
import ApiResult from "../../SubClasses/ApiResult.js";
var UserBlogsLink = "https://www.googleapis.com/blogger/v3/users/self/blogs?access_token=";
var AccessToken = localStorage.getItem("AccessToken");

export default {
  name: "Home",
  data() {
    return { Blogs: {} };
  },
  methods: {
    GetBlogs: function() {
      ApiResult.GetResult(UserBlogsLink + AccessToken).then(Result => {
        this.Blogs = Result.data["items"].sort(function(a, b) {
          return b.id - a.id;
        });
      });
    },
    CheckUserStatus: function() {
      this.GetBlogs();
    }
  },
  mounted() {
    this.CheckUserStatus();
  }
};
</script>

<style scoped></style>