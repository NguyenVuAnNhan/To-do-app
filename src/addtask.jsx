import './App.css'
import { Button } from "antd";
import {useState} from "react";
import { EditOutlined} from '@ant-design/icons';
import { Input } from "antd";

function AddTask({onSubmit}){
    const [content, changeContent] = useState("");
    return(
        <>
            <Input maxLength={50} minLength={1} type="text" onChange={(e) => {changeContent(e.target.value)}}></Input>
            <Button icon={<EditOutlined />} onClick={() => content.length > 0 ? onSubmit(content) : null}>Add task</Button>
        </>
    )
}

export default AddTask