export default {
    props: {
      task: Object
    },
    // :style="{ 'textDecoration': task.completed ? 'line-through' : 'none'
    //|{{task.completed != null ?'line-through' : 'none'}}|
    template:`
      <li :style="{textDecoration: task.completed ? 'line-through' : 'none'}">
          <span>{{task.due_date}}</span> 
          <a :href="'#/tasks/'+task.task_id">{{ task.title }}</a>
      </li>
    `
};
  