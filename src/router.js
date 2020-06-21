import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import Home from './components/pages/Home';
import Posts from './components/pages/Posts';
import Post from './components/pages/Post';
import AddPost from "@/components/AddPost";

const routes = [
    { path: '/', component: Home },     
    { path: '/Posts/:blogid', component: Posts, name: 'posts' },
    { path: '/Posts/:blogid/Post/:postid', component: Post },
    { path: '/Posts/:blogid/addPost', component: AddPost, name: 'addPost'}
       
];
const router = new VueRouter({
    mode: 'history',
    routes
});
export default router;