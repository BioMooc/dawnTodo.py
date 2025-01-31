
// 载入所有的页面视图 组件
import Home from "./views/Home.vue.js" //首页
import Task from "./views/Task.vue.js" //任务详情
import About from "./views/About.vue.js" //关于项目
//const About = {template: '<div>About this page</div>',}
//import { createApp } from 'vue';
import TaskList from './components/TaskList.vue.js'; //任务列表

const app = Vue.createApp({
  data(){
    return{
      timestamp: new Date(), //vm.timestamp

      topMenu:[
        {path:'/', caption:'Home'},
        {path:'/tasks/?next_period=uncompleted', caption:'tasks'},
        {path:'/about', caption:'about'},
      ],
    }
  },


  computed:{
    currentRoute(){
      return this.$route.path;
    },
    elapse(){ // 自博客创建以来的天数，保留3位小数
      return ((this.timestamp.getTime() - 1719564446600)/1000/3600/24).toFixed(3);
    }
  },


});


//路由表
const routes = [
  { path: '/', component: Home },
  { path: '/tasks', component: TaskList },
  //{ path: '/tasks/:last_period', component: TaskList },
  { path: '/about', component: About },
  { path: '/tasks/:task_id', component: Task },
]

// 路由
const router = VueRouter.createRouter({
	//mode: 'history',
  history: VueRouter.createWebHashHistory(), 
  routes,
})

app.use(router)
var vm=app.mount("#app");
window.vm=vm