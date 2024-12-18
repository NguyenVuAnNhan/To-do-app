import './App.css'
import {useState} from "react";
import Button from "./button.jsx";


function Tasklist({tasks, onChangeTask, onDeleteTask}){
    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
                </li>
            ))}
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