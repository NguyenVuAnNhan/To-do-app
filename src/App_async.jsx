import './App.css'
import Button from './button.jsx'
import Tasklist from "./tasklist.jsx";
import {useEffect, useReducer, useState} from "react";
import AddTask from "./addtask.jsx";

let nextID = 1

let example_tasklist = [{
    id:0,
    content:"debug",
    completed:false
}]

function App() {
    const [tasks, dispatch] = useReducer(tasksReducer, example_tasklist);

    //TESTING AREA
    // const [data, setData] = useState([]);
    //
    // useEffect(() => {
    //     fetch("http://localhost:3000/api/tasks")
    //         .then((res) => res.json())
    //         .then((data) => setData(data))
    //         .catch((err) => console.error(err));
    // }, []);
    //
    // useEffect(() => {
    //     dispatch({
    //         type: 'set',
    //         data: data
    //     })
    // }, []);
    //
    // console.log(data);
    //TESTING AREA

    function handleAddTask(text) {
        dispatch({
            type: 'added',
            id: nextID++,
            content: text,
        });
    }

    function handleRemoveTask(taskid){
        dispatch({
            type: 'removed',
            id: taskid
        })
    }

    function handleRemoveCompleted(){
        dispatch({
            type:'completed'
        })
    }

    function handleEditTask(task) {
        dispatch({
            type: 'edited',
            task: task
        })
    }

    return(
        <>
            <div>TO-DO List</div>
            <div id={"box"}>
                <Tasklist
                    tasks={tasks}
                    onChangeTask={handleEditTask}
                    onDeleteTask={handleRemoveTask}
                />
            </div>
            <AddTask onSubmit={handleAddTask}></AddTask>
            <Button onPress={() => handleRemoveCompleted()}>Remove all completed tasks</Button>
        </>
    )

    function tasksReducer(tasks, action) {
        switch (action.type) {
            case 'added': {
                return [
                    ...tasks,
                    {
                        id: action.id,
                        content: action.content,
                        done: false,
                    },
                ];
            }
            case 'edited': {
                return tasks.map((t) => {
                    if (t.id === action.task.id) {
                        return action.task;
                    } else {
                        return t;
                    }
                });
            }
            case 'removed': {
                return tasks.filter((t) => t.id !== action.id);
            }
            case 'completed': {
                return tasks.filter((t) => t.completed !== true);
            }
            case 'set': {
                return action.data;
            }
            default: {
                throw Error('Unknown action: ' + action.type);
            }
        }
    }
}

export default App
