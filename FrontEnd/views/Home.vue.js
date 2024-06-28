import TaskList from '../components/TaskList.vue.js';

export default {
    components:{ TaskList,  },

	template:`
    <div class="container">
        <h1>#Todo List</h1>

        <a class="btn" href="#/tasks">全部列表</a>
        <a class="btn" href="#/tasks?next_period=uncompleted">未完成</a>
        <a class="btn" href="#/tasks?next_period=completed">已完成</a>

        <!--
        <ul>
            <li><a href="#/tasks?next_period=month">最近一月</a></li>
            <li><a href="#/tasks?next_period=week">最近一周</a></li>
            <li><a href="#/tasks?next_period=day">最近一天</a></li>
            <li><a href="#/tasks?next_period=due">已过期</a></li>
        </ul>
        -->

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

