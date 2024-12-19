import './App.css'
import {useState} from "react";
import {Button, Col, Row, Space} from "antd";
import {useSelector} from "react-redux";
import { Checkbox } from "antd";
import { List } from "antd";
import { Card } from "antd";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons"
import {Typography, Input} from "antd";

function Tasklist({tasks, onChangeTask, onDeleteTask}){
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
function Task({task, onChange, onDelete}) {
    const [isEditing, changeEdit] = useState(false);
    let task_content;
    if (isEditing) {
        task_content = <div><Input.TextArea autoSize={true} maxLength={50} minLength={1} defaultValue={task.content} onChange={(e) => {
            onChange({
                "id": task.id,
                "content": e.target.value,
                "completed": task.completed
            }) //Change mechanisms to get undo and input validation button
        }}></Input.TextArea></div>
    } else {
        task_content = <div style={{marginLeft: "12px"}}>
            <text aria-readonly={'true'}>{task.content}</text>
        </div>
    }
    return (
        <Row align="middle" justify="space-between">
            {/* Checkbox */}
            <Col>
                <Checkbox defaultChecked={task.completed} onChange={(e) => {
                    onChange({
                        "id": task.id,
                        "content": task.content,
                        "completed": e.target.checked
                    })
                }}></Checkbox>
            </Col>

            {/* Task Input */}
            <Col flex="auto" style={{textAlign: "left"}}>
                {task_content}
            </Col>

            {/* Action Buttons */}
            <Col>
                <Space>
                    <Button danger={true} onClick={() => {
                        onDelete(task.id)
                    }}><DeleteOutlined/> Delete</Button>
                    <Button onClick={() => { task.content.length > 0 ?
                        changeEdit(!isEditing) : changeEdit(isEditing)
                    }}><EditOutlined/>{isEditing ? "Save" : "Edit"}</Button>
                </Space>
            </Col>
        </Row>
    )
}

export default Tasklist