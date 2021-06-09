import React, {ChangeEvent, useCallback} from "react"
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithRedux";


type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId:string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (taskId:string, title: string, todolistId:string) => void
}

export const Task = React.memo(({task, todolistId, changeTaskStatus, changeTaskTitle, removeTask}: TaskPropsType) => {

    const changeTaskStatusH =useCallback((e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked, todolistId),[])
    const changeTaskTitleH = useCallback((title: string) => changeTaskTitle(task.id, title, todolistId), [])
    const removeTaskH = useCallback(() => {
        removeTask(task.id, todolistId)

    },[])

    return <li key={task.id} className={task.isDone ? "is-done" : ""}>

        <Checkbox
            color={"primary"}
            onChange={changeTaskStatusH}
            checked={task.isDone}/>

        <EditableSpan title={task.title} changeTitle={changeTaskTitleH}/>

        <IconButton onClick={removeTaskH}>
            <Delete/>
        </IconButton>
    </li>
})