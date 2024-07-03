// 单个任务详情
import { getTask } from '../api.js';
import TaskButton from '../components/TaskButton.vue.js';

export default {
    components:{ TaskButton },

    data() {
        return {
            task_id: this.$route.params.task_id, //获取路由参数
            task: []
        };
    },

    methods: {
        async fetchTask(task_id) {
            // 使用 Axios 获取任务
            axios.get( getTask(task_id) )
                .then(response => {
                    this.task = response.data;
                    //console.log(">> >>", response.data)
                })
                .catch(error => {
                    console.error('Error fetching tasks:', error);
                });
        },
    },

    mounted() {
        this.fetchTask(this.task_id);
    },

	//props:['caption'],
    //<li><a :href="'/tasks/'+task.task_id">{{ task.title }}</a></li>
	template:`
    <div class="container">
    
        <TaskButton></TaskButton>
        <a class="btn" href="/">首页</a>

        <h2>Task information: </h2>

        <div class="tasks">
            <a class="btn" :href="'#/tasks/?action=del&task_id='+task.task_id">删除</a>
            <a class="btn" :href="'#/tasks/?action=edit&task_id='+task.task_id">编辑</a>

            <div class="info">
                <span>[task_id: {{task.task_id}}]</span>
                <span>due_date: {{task.due_date}}</span>
                <span :class="'priority priority_'+task.priority">Priority: {{task.priority}}</span>
            </div>
            
            <p class="title" :style="{textDecoration: task.completed ? 'line-through' : 'none'}">
                <span :style="{display: task.completed ? 'inline-block' : 'none'}">(已完成)</span>
                <b title="Title">{{task.title}}</b>
            </p>
            <p class="desc" title="Description">
                <span>{{task.description}}</span>
            </p>
            
            <div class="info">
                <span>created_at: {{task.created_at}}</span>
                <span>updated_at: {{task.updated_at}}</span>
                <span>user_id: {{task.user_id}}</span>
            </div>
        </div>

    </div>
    `
}

/*
        <ul>
            <template v-for="(value, key) in task">
            <li>{{key}}: {{value}}</li>
            </template>
        </ul>
*/