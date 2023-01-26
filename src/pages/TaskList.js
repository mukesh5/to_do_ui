import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constants";


export const TaskList = (props) => {
    const [taskList, setTaskList] = useState([]);
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token")
        }
    }

    useEffect(() => {
        axios.get(`${BASE_URL}/tasks/all`, config).then(res => {
            setTaskList(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [props.updateList])

    const markCompleted = (task) => {
        const payload = {
            isCompleted: !task.isCompleted
        }
        axios.patch(`${BASE_URL}/tasks/update/${task.id}`, payload, config).then(res => {
            alert("Congrats on Completing the task!!")
            props.updateTaskList(!props.updateList)
        }).catch(err => {
            console.log(err)
            const errMessage = JSON.parse(err.request.response)
            alert(errMessage)
        })
    }

    const updateTask = (task) => {
        props.handleEditTask(task)
    }

    const deleteTask = (task) => {
        axios.delete(`${BASE_URL}/tasks/delete/${task.id}`, config).then(res =>{
            alert('Task deleted successfully!')
            props.updateTaskList(!props.updateList)
        })
        .catch(err =>{
            console.log(err)
            const errMessage = JSON.parse(err.request.response)
            alert(errMessage)
        })
    }

    return (
        <div>
            {
                taskList.map((task) => (
                    <li key={task.id}>
                        <input type="text" value={task.description} onChange={(event) => event.preventDefault()}/>
                        {!task.isCompleted? <button onClick={() => markCompleted(task)}><i className="fa fa-check-circle"></i></button>: <button><i></i></button>}
                        {!task.isCompleted? <button onClick={() => updateTask(task)}><i className="fa fa-edit"></i></button>: <button><i></i></button>}
                        <button onClick={() => deleteTask(task)}><i className="fa fa-trash"></i></button>
                    </li>
                ))
            }
        </div>
    )
}