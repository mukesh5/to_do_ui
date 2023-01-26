import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants";


export const AddTask = (props) => {
    const [task, setTask] = useState("")
    const [buttonText, setButtonText] = useState('Add')

    useEffect(() => {
        setTask(props.editTask?.description)
        if(props.editTask){
        setButtonText('Update')
        }
        else{
            setButtonText('Add')
        }
    }, [props.editTaskFlag])

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token")
        }
    }
    
    const addTask = (event) => {
        if (task === ""){
            alert("Please enter a valid task description")
        }
        else{
            const payload = {
                description: task
            }
            if(!props.editTask){
                axios.post(`${BASE_URL}/add_task`, payload, config).then(res =>{
                    alert("task added successfully")
                    setTask("")
                    console.log('updating flag to get data')
                    props.updateTaskList(!props.updateList)
                }).catch(err => {
                    console.log(err)
                    const errMessage = JSON.parse(err.request.response)
                    alert(errMessage)
                })
            }
            else{
                axios.patch(`${BASE_URL}/update/${props.editTask?.id}`, payload, config).then(res => {
                    alert("Task updated successfully!")
                    setTask("")
                    props.handleEditTask(null)
                    props.updateTaskList(!props.updateList)
                })
                .catch(err => {
                    console.log(err)
                    const errMessage = JSON.parse(err.request.response)
                    alert(errMessage)
                })
            }
        }
        event.preventDefault();
    }

    return (
        <form onSubmit={addTask}>
            <input type="text" placeholder="Add your task here..." value={task} onChange={(e) => setTask(e.target.value)}></input>
            <button type="submit">{buttonText}</button>
        </form>
    )
}