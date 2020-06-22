import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import Home from './components/pages/Home';
import Posts from './components/pages/Posts';
import Post from './components/pages/Post';

const routes = [
    { path: '/', component: Home },     
    { path: '/Posts/:blogid', component: Posts },      
    { path: '/Posts/:blogid/Post/:postid', component: Post },      
       
];
const router = new VueRouter({
    mode: 'history',
    routes
});
export default router;