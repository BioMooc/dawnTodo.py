  import TaskItem from './TaskItem.vue.js';
  import { getTasks, createTask } from '../api.js';

  export default {
    props: {"next_period2":{
      type:String,
      default:""
    } },

    components: { TaskItem },

    data() {
      return {
        tasks: [],
        next_period: "",
      };
    },

    computed:{
      title(){
        if(["due", "completed", "uncompleted"].indexOf(this.next_period)>=0){ 
          return this.capitalizeFirstLetter(this.next_period)
        }
        return this.next_period ? ("Next "+this.next_period) : "All tasks"
      }
    },

    methods: {
      // 使用 Axios 获取任务列表
      async fetchTasks() {
        try {
          var url;
          if( this.next_period==undefined ){
            console.log("if ...")
            url=getTasks();
          }else{
            url=getTasks()+"/?next_period="+this.next_period;
            //console.log("else ...", )
          }
          
          //console.log('url:', url);
          const response = await axios.get(url);

          this.tasks = response.data;
        } catch (error) {
          console.error('An error occurred while fetching tasks:', error);
        }
      },
      
      async addTask(taskData) {
        try {
          const response = await axios.post(createTask(), taskData);
          this.tasks.push(response.data);
        } catch (error) {
          console.error('An error occurred while adding a task:', error);
        }
      },

      capitalizeFirstLetter(string) {
        return string.toLowerCase().replace(/\b[a-z]/g, function(match) {
          return match.toUpperCase();
        });
      },
    },
    
    mounted() {
      //获取参数
      //this.next_period=this.$route.query.next_period; 
      this.next_period= this.next_period2==""? this.$route.query.next_period : this.next_period2;
      //console.log("props: >>next_period2=", this.next_period2)
      this.fetchTasks();
    },

    template:`
    <div class="container">
      <h2>{{title}} ({{tasks.length}})</h2>
      <ul class=task>
        <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
      </ul>
    </div>
    `
  };
 