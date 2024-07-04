import TaskList from '../components/TaskList.vue.js';
import TaskButton from '../components/TaskButton.vue.js';

export default {
    components:{ TaskList, TaskButton },

    methods: {
    },

	template:`
    <div class="container">
        <TaskButton></TaskButton>

        <!--get view-->
        <div class="box">
            <TaskList next_period2="due"></TaskList>
        </div>

        <div class="box">
            <TaskList next_period2="day"></TaskList>
        </div>

        <div class="box">
            <TaskList next_period2="week"></TaskList>
        </div>

        <div class="box">
            <TaskList next_period2="month"></TaskList>
        </div>

        <div class="box">
            <TaskList next_period2="season"></TaskList>
        </div>

    </div>
    `
}

