import './App.css'
import Button from './button.jsx'
import Tasklist from "./tasklist.jsx";
import { useReducer } from "react";
import AddTask from "./addtask.jsx";

let nextID = 1

let example_tasklist = [{
    id:0,
    content:"debug",
    completed:false
}]

function App() {
    const [tasks, dispatch] = useReducer(tasksReducer, example_tasklist);

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
}

export default App
