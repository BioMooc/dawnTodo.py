import { getTask, updateTask } from '../api.js';

export default {
  data() {
    return {
      task:{
        user_id: 1,
        task_id: 1,
        title: '1',
        description: '2',
        priority:'',
        due_date: '',
        total_steps: 0,
        current_step: 0,
      }
    };
  },

  mounted(){
    this.task.task_id=this.$route.query.task_id;
    this.getTask(this.task.task_id)
  },

  methods: {
    getTask(task_id){
        axios.get( getTask(task_id) )
        .then(response => {
            // Emit an event with the new task data
            this.$emit('task-edited');
            this.task=response.data
        })
        .catch(error => {
            console.error('Error editting task:', error);
        });
    },
    
    updateTask() {
        //console.log(">> updateTask: {url:", updateTask(this.task.task_id), ", task:", this.task)
        
        axios.put( updateTask(this.task.task_id), this.task)
        .then(response => {
            // Emit an event with the new task data
            this.$emit('task-added');
            // go back to details
            this.$router.push("/tasks/"+this.task.task_id)
        })
        .catch(error => {
            console.error('Error adding task:', error);
        });
    },
    cancel(){
      this.$router.push('/tasks/'+this.task.task_id);
    }
  },

  template:`
  <div class="add-task">
    <h2>Edit task: </h2>
    <form @submit.prevent="updateTask">
        <input type="hidden" id="task_id" v-model="task.task_id">
        <input type="hidden" id="user_id" v-model="task.user_id">
    
        <div class="grey">
            <label>task_id: {{task.task_id}}</label>
            <label>user_id: {{task.user_id}}</label>
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
            <label for="completed">completed</label>
            <select id="completed" v-model="task.completed">
                <option value="true">true</option>
                <option value="false">false</option>
            </select>
        </div>

        <div>
            <label for="current_step">current_step</label>
            <input type="number" id="current_step" v-model="task.current_step">
        </div>

        <div>
            <label for="total_steps">total_steps</label>
            <input type="number" id="total_steps" v-model="task.total_steps">
        </div>

        <div class="btn_box">
            <button type="submit">更新任务(Update Task)</button>
            <button type="reset" class='cancel' @click="cancel">取消(Cancel)</button>
        </div>
    </form>
  </div>
  `
};