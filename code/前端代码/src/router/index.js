import Vue from 'vue'
import VueRouter from 'vue-router'
import UserProfile from "@/views/UserProfile.vue";
import MovieSearch from "@/views/MovieSearch.vue";
import HomeIndex from "@/views/HomeIndex.vue";
import SignUp from "@/views/SignUp.vue";
import LogIn from "@/views/LogIn.vue";
import VisitorHome from "@/views/VisitorHome.vue";
import MovieSearchV from "@/views/MovieSearchV.vue";
import UploadPost from "@/views/UploadPost.vue";
import PostDetails from "@/views/PostDetails.vue";
import MovieDetail from "@/views/MovieDetail.vue";
import SettingView from "@/views/SettingView.vue";
import PostDetailOthers from "@/views/PostDetailOthers.vue";
import SearchLine from "@/views/SearchLine.vue";

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  // 将VisitorHome作为第一个（默认）路由
  {
    path: '/',
    name: 'visitorhome',
    component: VisitorHome,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeIndex
  },
  {
    path: '/profile',
    name: 'profile',
    component: UserProfile
  },
  {
    path: '/movie-search',
    name: 'movie-search',
    component: MovieSearch
  },
  {
    path: '/moviesearchv',
    name: 'moviesearchv',
    component: MovieSearchV
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn
  },
  {
    path: '/uploadpost',
    name: 'uploadpost',
    component: UploadPost
  },
  {
    path: '/postdetails/:id',
    name: 'postdetails',
    component: PostDetails
  },
  {
    path: '/moviedetail/:id',
    name: 'moviedetail',
    component: MovieDetail
  },
  {
    path: '/setting',
    name: 'setting',
    component: SettingView
  },
  {
    path: '/postdetailsothers/:id',
    name: 'postdetalsother',
    component: PostDetailOthers
  },
  {
    path: '/searchline',
    name: 'searchline',
    component: SearchLine
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
