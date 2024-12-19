import './App.css'
import Tasklist from "./tasklist.jsx";
import AddTask from "./addtask.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Button, Col, Row} from "antd"
import { Typography } from "antd";
import {DeleteOutlined, SearchOutlined} from "@ant-design/icons"

function App() {
    const nextID = useSelector((state) => state.root.tasks.length === 0 ? 0 : state.root.tasks[state.root.tasks.length - 1].id + 1);

    console.log(nextID);

    const tasks = useSelector((state) => state.root.tasks);
    const dispatch = useDispatch();

    useEffect(() => {console.log("useEffect triggered")
        dispatch({type:'FETCH_DATA'})}, [])

    function handleAddTask(text) {
        dispatch({
            type: 'added',
            id: nextID,
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
            <Typography.Title>TO-DO List</Typography.Title>
            <div id={"box"}>
                <Tasklist
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
