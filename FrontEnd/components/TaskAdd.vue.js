import { createTask } from '../api.js';

export default {
  //props:[ "showAddTask" ],
  data() {
    return {
      //showAddTask:false,
      task:{
        user_id: 1,
        title: '',
        description: '',
        priority:'low',
        due_date: "",
        total_tasks: 0,
        current_task: 0,
      }
    };
  },
  created(){
    this.task.due_date = this.getDueToday()
  },
  methods: {
    getDueToday(){
      const now = new Date();
      const year = now.getFullYear();
      // 获取月份（需要加1，因为getMonth返回的月份是从0开始计数的）
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      return year+"-"+month+"-"+day;
    },
    addTask() {
      console.log(">> addTask: {url:", createTask(), ", task:", this.task)
      if(this.task.title==""){
        alert("title must NOT be empty.")
        return false;
      }

      axios.post( createTask(), this.task )
      .then(response => {
          // Emit an event with the new task data
          this.$emit('task-added');
          // Clear the form
          this.title = '';
          this.description = '';
          this.priority = 'low';
          this.due_date = '';
          this.total_tasks = 0;
          this.current_task = 0;
        })
        .catch(error => {
          console.error('Error adding task:', error);
          //this.showAddTask=false;
        });
      },
      cancel(){
        this.$router.push('/');
        this.$emit('task-added-cancelled', false);
      }
  },

  template:`
  <div class="add-task">
    <h2>Add a new task(user_id: {{task.user_id}})</h2>
    <form @submit.prevent="addTask">
        <input type="hidden" id="user_id" v-model="task.user_id">
    
      <div>
        <label for="title">Title</label>
        <input type="text" id="title" v-model="task.title" required>
      </div>

      <div>
        <label for="description">Description</label>
        <textarea id="description" v-model="task.description"></textarea>
      </div>

      <div>
        <label for="priority">priority</label>
            <select id="priority" v-model="task.priority">
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
            </select>
      </div>

      <div>
        <label for="due_date">due_date</label>
        <input type="text" id="due_date" v-model="task.due_date" placeholder="2024-06-28">
      </div>

        <div>
            <label for="total_steps">total_steps</label>
            <input type="text" id="total_steps" v-model="task.total_steps">
        </div>

        <div>
            <label for="current_step">current_step</label>
            <input type="text" id="current_step" v-model="task.current_step">
        </div>

      <div class="btn_box">
        <button type="submit">添加任务(Add Task)</button>
        <button type="reset" class='cancel' @click="cancel">取消(Cancel)</button>
      </div>
    </form>
  </div>
  `
};