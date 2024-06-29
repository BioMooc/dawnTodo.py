//tasks顶部的几个按钮，用在首页，任务详情页
export default {
	template:`
    <h1>#Todo List</h1>
    <a class="btn" href="#/tasks">全部列表</a>
    <a class="btn" href="#/tasks/?next_period=uncompleted">未完成</a>
    <a class="btn" href="#/tasks/?next_period=completed">已完成</a>
    <a class="btn" href="#/tasks/?action=add">添加</a>
    `
}
