import {useState} from "react";
import {Button, Checkbox, Col, Input, Row, Space} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

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
                    <Button danger={true} onClick={onDelete(task.id)}><DeleteOutlined/> Delete</Button>
                    <Button onClick={() => { task.content.length > 0 ?
                        changeEdit(!isEditing) : changeEdit(isEditing)
                    }}><EditOutlined/>{isEditing ? "Save" : "Edit"}</Button>
                </Space>
            </Col>
        </Row>
    )
}

export default Task