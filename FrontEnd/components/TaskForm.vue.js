import { createTask } from '../api.js';

export default {
  data() {
    return {
      user_id: 1,
      title: '',
      description: '',
      priority:'',
      due_date: ''
    };
  },
  methods: {
    submitForm() {
        const newTask = {
            user_id: this.user_id,
            title: this.title,
            description: this.description,
            priority: this.priority,
            due_date: this.due_date
        };
        console.log(">> submitForm: {url:", createTask(), ", task:", newTask,)

        axios.post( createTask(), newTask )
        .then(response => {
            this.$emit('task-added');
            this.title = '';
            this.description = '';
            this.priority = '';
            this.due_date = '';
        })
        .catch(error => {
            console.error('Error adding task:', error);
        });
    }
  },

  template:`
  <div class="container">
    <form @submit.prevent="submitForm">

      <div>
        <label for="user_id">user_id</label>
        <input type="text" id="user_id" v-model="user_id">
      </div>
    
      <div>
        <label for="title">Title</label>
        <input type="text" id="title" v-model="title" required>
      </div>

      <div>
        <label for="description">Description</label>
        <textarea id="description" v-model="description"></textarea>
      </div>

      <div>
        <label for="priority">priority</label>
        <input type="text" id="priority" v-model="priority" placeholder="low / medium / high">
      </div>

      <div>
        <label for="due_date">due_date</label>
        <input type="text" id="due_date" v-model="due_date" placeholder="2024-06-28">
      </div>

      <button type="submit" class="btn">Add Task</button>
    </form>
  </div>
  `
};