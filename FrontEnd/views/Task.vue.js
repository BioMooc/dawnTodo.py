//Task.vue.js
//import PostTags from "./PostTags.vue.js"
//import MyCategory from "./components/MyCategory.js"

import { getTask } from '../api.js';

export default {
    //components:{ PostTags },
	//inject:['categories', 'posts'],
	//inject:['tasks'],

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
    <div>
        <p><a href="/">Back home</a></p>
        <h2>Task information: </h2>
        
        <ul>
            <template v-for="(value, key) in task">
            <li>{{key}}: {{value}}</li>
            </template>
        </ul>
    </div>
    `
}