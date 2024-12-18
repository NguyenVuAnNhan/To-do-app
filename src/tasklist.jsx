import './App.css'
import {useState} from "react";
import Button from "./button.jsx";
import {useSelector} from "react-redux";


function Tasklist({tasks, onChangeTask, onDeleteTask}){
    const selected = useSelector((state) => state.root.selected);
    let content;

    if (selected === "all"){
        content = tasks.map((task) => (
            <li key={task.id}>
                <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
            </li>
        ))
    }
    else if (selected === "completed"){
        content = tasks.map((task) => !task.completed ? null : (
            <li key={task.id}>
                <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
            </li>
        ))
    }
    else{
        content = tasks.map((task) => task.completed ? null : (
            <li key={task.id}>
                <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
            </li>
        ))
    }

    return (
        <ul>
            {content}
        </ul>
    )
}
function Task({task, onChange, onDelete}) {
    const [isEditing, changeEdit] = useState(false);
    let task_content;
    if (isEditing) {
        task_content = <input maxLength={50} minLength={1} defaultValue={task.content} onChange={(e) => {
            onChange({
                "id": task.id,
                "content": e.target.value,
                "completed": task.completed
            }) //Change mechanisms to get undo and input validation button
        }}></input>
    } else {
        task_content = <>{task.content}</>
    }
    return (
        <>
            <input type={"checkbox"} defaultChecked={task.completed} onChange={(e) => {
                onChange({
                    "id": task.id,
                    "content": task.content,
                    "completed": e.target.checked
                })
            }}></input>
            {task_content}
            <Button onPress={() => {
                onDelete(task.id)
            }}>Delete</Button>
            <Button onPress={() => {
                changeEdit(!isEditing)
            }}>{isEditing ? "Save" : "Edit"}</Button>
        </>
    )
}

export default Tasklist