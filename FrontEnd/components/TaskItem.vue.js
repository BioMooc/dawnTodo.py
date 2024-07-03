import { getTasks, updateTask } from '../api.js';

export default {
    props: {
      task: Object
    },

    methods: {
      updateCompletion(event) {
        const updatedTask = {
          task_id: this.task.task_id,
          completed: event.target.checked
        };
        //console.log(updatedTask,  updateTask(updatedTask.task_id) )
        //console.log(updatedTask,  getTasks() )
        //axios.put(`http://j3.biomooc.com:8501/tasks/${updatedTask.id}`, updatedTask)
        
        axios.put( updateTask(updatedTask.task_id), updatedTask)
        //axios.post( getTasks()+"/?action=put", updatedTask)
          .then(response => {
            // 处理成功响应，可以在此处进行其他操作，比如更新视图状态
            //console.log('Task completion updated successfully:', response.data);
            this.task.completed = response.data.completed
          })
          .catch(error => {
            console.error('Error updating task completion:', error);
          });
      }
    },

    // :style="{ 'textDecoration': task.completed ? 'line-through' : 'none'
    //|{{task.completed != null ?'line-through' : 'none'}}|
    template:`
      <li :style="{textDecoration: task.completed ? 'line-through' : 'none'}">
        <input v-bind:checked="task.completed" type="checkbox" @change="updateCompletion">
        <span>{{task.due_date}}</span>
        <span class="grey">[id:{{task.task_id}}]</span>
        <span :class="'priority priority_'+task.priority">{{task.priority}}</span>
        
        <a :href="'#/tasks/'+task.task_id">{{ task.title }}</a>
      </li>
    `
};
