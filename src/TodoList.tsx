import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todoListID: string) => void //функция, которая перезаписывает массив и ничего не возвращает
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

function TodoList(props: TodoListPropsType) {
    // const {filter, tasks, title: tlTitte, addTask, removeTask, changeFilter} = props
    //все переменные-свойства в функции определяем как пропсы - деструктуризаация пропсов
    //также можно сразу вместо пропсов все свойства прописать тут (props: TodoListPropsType)

    /*  const [title, setTitle] = useState<string>("")
      const [error, setError] = useState<boolean>(false)*/

    const tasksJSXElements = props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id, props.todoListID)
        }
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListID)

        return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>

                <Checkbox
                    color={"primary"}
                    onChange={changeTaskStatus}
                    checked={t.isDone}/>

                    <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>

                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })


    const onClickAllFilter = () => props.changeFilter("all", props.todoListID)
    const onClickActiveFilter = () => props.changeFilter("active", props.todoListID)
    const onClickCompletedFilter = () => props.changeFilter("completed", props.todoListID)
    const onClickRemoveTodoList = () => props.removeTodoList(props.todoListID)
    const addTask = (title: string) => props.addTask(title, props.todoListID)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={onClickRemoveTodoList}>
                    <Delete/>
                </IconButton>


            </h3>
            <AddItemForm addItem={addTask}/>

            <ul style={{listStyle: "none", paddingLeft: "0px"}}>
                {tasksJSXElements}
            </ul>
            <div>
                <Button color={"primary"}
                        size={"small"}
                        variant={props.filter === "all" ? "contained" : "outlined"}
                        onClick={onClickAllFilter}>All
                </Button>
                <Button style={{marginLeft: '3px'}}
                        color={"primary"}
                        size={"small"}
                        variant={props.filter === "active" ? "contained" : "outlined"}
                        onClick={onClickActiveFilter}>Active
                </Button>
                <Button style={{marginLeft: '3px'}}
                        color={"primary"}
                        size={"small"}
                        variant={props.filter === "completed" ? "contained" : "outlined"}
                        onClick={onClickCompletedFilter}>Completed
                </Button>
            </div>
        </div>
    )
}

export default TodoList;