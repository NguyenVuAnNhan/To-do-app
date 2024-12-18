import './App.css'
import Button from "./button.jsx";
import {useState} from "react";

function AddTask({onSubmit}){
    const [content, changeContent] = useState("");
    return(
        <>
            <input maxLength={50} minLength={1} type="text" onChange={(e) => {changeContent(e.target.value)}}></input>
            <Button onPress={() => content.length > 0 ? onSubmit(content) : null}>Add task</Button>
        </>
    )
}

export default AddTask