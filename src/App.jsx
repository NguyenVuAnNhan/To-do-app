import './App.css'
import Button from './button.jsx'
import Tasklist from "./tasklist.jsx";
import AddTask from "./addtask.jsx";
import {useDispatch, useSelector} from "react-redux";

let nextID = 1

function App() {
    const tasks = useSelector((state) => state.root.tasks);
    const dispatch = useDispatch();

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

    function handleSelectAll(){
        dispatch({
            type: 'all'
        })
    }

    function handleSelectCompleted(){
        dispatch({
            type: 'select completed'
        })
    }

    function handleSelectUncompleted(){
        dispatch({
            type: 'not completed'
        })
    }

    console.log(tasks);

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
            <Button onPress={() => handleSelectAll()}>Select all tasks</Button>
            <Button onPress={() => handleSelectCompleted()}>Select all completed tasks</Button>
            <Button onPress={() => handleSelectUncompleted()}>Select all uncompleted tasks</Button>
        </>
    )
}

export default App