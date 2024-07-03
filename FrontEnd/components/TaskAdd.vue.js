import { createTask } from '../api.js';

export default {
  data() {
    return {
      task:{
        user_id: 1,
        title: '',
        description: '',
        priority:'',
        due_date: ''
      }
    };
  },
  methods: {
    addTask() {
        console.log(">> addTask: {url:", createTask(), ", task:", this.task)

        axios.post( createTask(), this.task )
        .then(response => {
          // Emit an event with the new task data
            this.$emit('task-added');
            // Clear the form
            this.title = '';
            this.description = '';
            this.priority = '';
            this.due_date = '';
        })
        .catch(error => {
            console.error('Error adding task:', error);
        });
    },
    cancel(){
      this.$router.push('/');
    }
  },

  template:`
  <div class="add-task">
    <h2>Add a New Task</h2>
    <form @submit.prevent="addTask">

      <div>
        <label for="user_id">user_id</label>
        <input type="text" id="user_id" v-model="task.user_id">
      </div>
    
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
        <input type="text" id="priority" v-model="task.priority" placeholder="low / medium / high">
      </div>

      <div>
        <label for="due_date">due_date</label>
        <input type="text" id="due_date" v-model="task.due_date" placeholder="2024-06-28">
      </div>

      <div class="btn_box">
        <button type="submit">添加任务(Add Task)</button>
        <button type="reset" class='cancel' @click="cancel">取消(Cancel)</button>
      </div>
    </form>
  </div>
  `
};