import TaskList from '../components/TaskList.vue.js';

export default {
    components:{ TaskList,  },

	template:`
    <div>
        <h1>#Todo list</h1>
        <!--ul>
            <li><a href="#/tasks">全部列表</a></li>

            <li><a href="#/tasks?next_period=month">最近一月</a></li>
            <li><a href="#/tasks?next_period=week">最近一周</a></li>
            <li><a href="#/tasks?next_period=day">最近一天</a></li>
            <li><a href="#/tasks?next_period=due">已过期</a></li>

            <li><a href="#/tasks?next_period=completed">已完成</a></li>
        </ul-->

        <!--get view-->
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
            <TaskList next_period2="due"></TaskList>
        </div>

        <div class="box">
            <TaskList next_period2="completed"></TaskList>
        </div>

    </div>
    `
}

