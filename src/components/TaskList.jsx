import '../App.css'
import {useSelector} from "react-redux";
import { List } from "antd";
import { Card } from "antd";
import Task from "./Task.jsx";

function TaskList({tasks, onChangeTask, onDeleteTask}){
    const selected = useSelector((state) => state.root.selected);
    let content;

    if (selected === "all"){
        content = tasks.map((task) => (
            <Card key={task.id}>
                <Task task={task}  onChange={onChangeTask} onDelete={onDeleteTask} />
            </Card>
        ))
    }
    else if (selected === "completed"){
        content = tasks.map((task) => !task.completed ? null : (
            <Card key={task.id}>
                <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
            </Card>
        ))
    }
    else{
        content = tasks.map((task) => task.completed ? null : (
            <Card key={task.id}>
                <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
            </Card>
        ))
    }

    return (
        <List>
            {content}
        </List>
    )
}

export default TaskList