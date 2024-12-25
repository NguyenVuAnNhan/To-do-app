import '../App.css'
import {useSelector} from "react-redux";
import { List } from "antd";
import { Card } from "antd";
import Task from "./Task.jsx";

function TaskList({tasks, onChangeTask, onDeleteTask}){
    const selected = useSelector((state) => state.root.selected);
    let filteredTasks;

    if (selected === "all"){
        filteredTasks = tasks.filter(task => true);
    }
    else if (selected === "completed"){
        filteredTasks = tasks.filter(task => task.completed);
    }
    else{
        filteredTasks = tasks.filter(task => !task.completed);
    }

    let content = filteredTasks.map((task) => (
        <Card key={task.id}>
            <Task task={task}  onChange={onChangeTask} onDelete={onDeleteTask} />
        </Card>
    ))

    return (
        <List>
            {content}
        </List>
    )
}

export default TaskList