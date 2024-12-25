import './App.css'
import TaskList from "./components/TaskList.jsx";
import AddTask from "./components/AddTask.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Button, Col, Row} from "antd"
import { Typography } from "antd";
import {DeleteOutlined, SearchOutlined} from "@ant-design/icons"
import {ADDED, ALL, COMPLETED, EDITED, FETCH_DATA, NOT_COMPLETED, REMOVED, SELECT_COMPLETED} from "./Items.jsx";

function App() {
    const nextID = useSelector((state) => state.root.tasks.length === 0 ? 0 : state.root.tasks[state.root.tasks.length - 1].id + 1);

    console.log(nextID);

    const tasks = useSelector((state) => state.root.tasks);
    const dispatch = useDispatch();

    useEffect(() => {console.log("useEffect triggered")
        dispatch({type:FETCH_DATA})}, [])

    function handleAddTask(text) {
        dispatch({
            type: ADDED,
            id: nextID,
            content: text,
        });
    }

    function handleRemoveTask(taskid){
        dispatch({
            type: REMOVED,
            id: taskid
        })
    }

    function handleRemoveCompleted(){
        dispatch({
            type:COMPLETED
        })
    }

    function handleEditTask(task) {
        dispatch({
            type: EDITED,
            task: task
        })
    }

    function handleSelectAll(){
        dispatch({
            type: ALL
        })
    }

    function handleSelectCompleted(){
        dispatch({
            type: SELECT_COMPLETED
        })
    }

    function handleSelectUncompleted(){
        dispatch({
            type: NOT_COMPLETED
        })
    }

    console.log(tasks);

    return(
        <>
            <Typography.Title>TO-DO List</Typography.Title>
            <div id={"box"}>
                <TaskList
                    tasks={tasks}
                    onChangeTask={handleEditTask}
                    onDeleteTask={handleRemoveTask}
                />
            </div>
            <Row>
                <Col><AddTask onSubmit={handleAddTask}></AddTask></Col>
                <Col><Button danger={true} onClick={() => handleRemoveCompleted()}><DeleteOutlined/> Remove all completed tasks</Button>
                    <Button onClick={() => handleSelectAll()}><SearchOutlined/> Select all tasks</Button>
                    <Button onClick={() => handleSelectCompleted()}><SearchOutlined/> Select all completed tasks</Button>
                    <Button onClick={() => handleSelectUncompleted()}><SearchOutlined/> Select all uncompleted tasks</Button></Col>
            </Row>
        </>
    )
}

export default App
