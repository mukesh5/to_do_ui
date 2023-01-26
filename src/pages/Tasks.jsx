import { useState } from "react"
import { AddTask } from "./AddTask"
import { Header } from "./Header"
import { Logout } from "./Logout"
import { TaskList } from "./TaskList"
export const Tasks = (props) => {
    const [updateList, setUpdateList] = useState(false)
    const [editTask, setEditTask] = useState(null)
    const [editTaskFlag, setEditTaskFlag] = useState(false)

    const updateTaskList = (value) => {
        setUpdateList(value)
    }

    const handleEditTask = (task) => {
        setEditTask(task)
        setEditTaskFlag(!editTaskFlag)
    }

    return (
        <>
        <div>
            <Header/>
        </div>
        <div>
            <AddTask updateTaskList={updateTaskList} updateList={updateList} editTask={editTask} editTaskFlag={editTaskFlag} handleEditTask={handleEditTask}/>
        </div>
        <div>
            <TaskList updateTaskList={updateTaskList} updateList={updateList} handleEditTask={handleEditTask}/>
        </div>
        <div>
            <Logout logout={props.logout}></Logout>
        </div>
        </>
    )
}