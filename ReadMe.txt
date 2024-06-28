Aim: dawnTodo.py is a due date management system based on Flask and Vue3

# location
local: @J3_server:/home/wangjl/soft/dawnTodo.py
remote: https://gitee.com/dawnEve/dawnTodo.py

# How to run?
front end: 
* port: $ sudo iptables -I INPUT -p tcp --dport 8500 -j ACCEPT
* run: $ python3 -m http.server 8500  -d FrontEnd/

back end:
* port: $ sudo iptables -I INPUT -p tcp --dport 8501 -j ACCEPT
* run: $ python3 app.py


# How to add data
change sqlite by cmd:
$ cd instance
$ sqlite3 tasks.db 
sqlite> INSERT INTO task (user_id, title, description, priority, due_date) VALUES (1, '明天任务', '明天的会议', 'low', '2024-06-29');
sqlite> .exit


# UI 学习
- https://www.microsoft.com/zh-cn/microsoft-365/planner/microsoft-planner



# todo:
add page
edit page
