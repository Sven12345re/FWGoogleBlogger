// plugins/vue-google-oauth2.js
// file name can be changed to whatever you want
import Vue from 'vue'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
    clientId: '798573591477-jmo3vpf1m0k0o3mlggus68nc7bc7jeou.apps.googleusercontent.com',
    scope: 'https://www.blogger.com/feeds/',
    prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)