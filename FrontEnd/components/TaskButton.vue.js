//tasks顶部的几个按钮，用在首页，任务详情页
import TaskAdd from './TaskAdd.vue.js';

export default {
    components:{ TaskAdd, },
    data(){
        return{
            showAddTask: false,
        }
    },
    methods:{
        doShowAddTask(){
            this.showAddTask=true;
            console.log("show add task...")
        },
        handleTaskAdd_canceled(boolVal){
            this.showAddTask=boolVal;
        },
        handleTaskAdded(){
            console.log("task added event success.")
            this.$emit('task-added');
            this.showAddTask=false;
        },
    },

	template:`
    <h1>#Todo List</h1>
    <a class="btn" href="#/tasks">全部列表</a>
    <a class="btn" href="#/tasks/?next_period=uncompleted">未完成</a>
    <a class="btn" href="#/tasks/?next_period=completed">已完成</a>
    <a class="btn" @click="doShowAddTask">添加</a>

    <!-- Confirm Dialog 添加对话框 -->
    <div v-if="showAddTask" class="confirm-dialog">
        <TaskAdd @taskAddedCancelled="handleTaskAdd_canceled" @taskAdded="handleTaskAdded"></TaskAdd>
    </div>
    `
}
//<a class="btn" href="#/tasks/?action=add">添加</a>
