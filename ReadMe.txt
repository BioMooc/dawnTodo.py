Aim: dawnTodo.py is a due date management system based on Flask and Vue3
More docs: docs/

# location
local: @J3_server:/home/wangjl/soft/dawnTodo.py
remote: https://gitee.com/dawnEve/dawnTodo.py
url: http://j3.biomooc.com:8500/

# How to run?
front end: 
* port: $ sudo iptables -I INPUT -p tcp --dport 8500 -j ACCEPT
* run: $ python3 -m http.server 8500  -d FrontEnd/

back end:
* DB: sqlite
* port: $ sudo iptables -I INPUT -p tcp --dport 8501 -j ACCEPT
* run: $ python3 app.py



# How to add data
change sqlite by cmd:
$ cd instance
$ sqlite3 tasks.db 
sqlite> INSERT INTO task (user_id, title, description, priority, due_date) VALUES (1, '明天任务', '明天的会议', 'low', '2024-06-29');
sqlite> .exit

> update task set due_date='2024-12-01' where task_id=2;



# UI 学习
- https://www.microsoft.com/zh-cn/microsoft-365/planner/microsoft-planner



# todo:
[v0.0.5]add/edit page
+ add tags
favicon.ico
定期任务：
去年任务：
完成进度：