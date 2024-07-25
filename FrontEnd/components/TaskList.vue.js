  import TaskItem from './TaskItem.vue.js';
  import TaskAdd from './TaskAdd.vue.js';
  import TaskEdit from './TaskEdit.vue.js';
  import { getTasks, createTask } from '../api.js';

  export default {
    props: {"next_period2":{
      type:String,
      default:""
    } },

    components: { TaskItem, TaskAdd, TaskEdit},

    data() {
      return {
        tasks: [],
        next_period: "",
        action: "",
      };
    },

    computed:{
      title(){
        if(["due", "completed", "uncompleted"].indexOf(this.next_period)>=0){ 
          return this.capitalizeFirstLetter(this.next_period)
        }
        return this.next_period ? ("Current "+this.next_period) : "All tasks"
      }
    },

    methods: {
      // 使用 Axios 获取任务列表
      async fetchTasks() {
        try {
          var url;
          if( this.next_period==undefined ){
            //console.log("if ...")
            url=getTasks();
          }else{
            url=getTasks()+"/?next_period="+this.next_period;
            //console.log("else ...", )
          }
          
          const response = await axios.get(url);
          this.tasks = response.data;
          for(var i=0; i<this.tasks.length; i++){
            var task=this.tasks[i];
            task.completion_percentage=0
            task.title2=""
            if(task.total_steps!=0){
              //console.log(i, ">>[] task=", task)
              task['completion_percentage'] = Math.round(task.current_step/task.total_steps *100)
              task['title2']=task.completion_percentage + "%["+ task.current_step +"/"+ task.total_steps +"]"
            }
          }

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
      
      this.action=this.$route.query.action;

      this.fetchTasks();
    },

    template:`
    <div class="container">
      <template v-if="action=='add'">
        <TaskAdd></TaskAdd>
      </template>
      <template v-if="action=='edit'">
        <TaskEdit></TaskEdit>
      </template>
      <template v-else>
        <h2>{{title}} ({{tasks.length}})</h2>
        <ul class=task>
          <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
        </ul>
      </template>
    </div>
    `
  };
 