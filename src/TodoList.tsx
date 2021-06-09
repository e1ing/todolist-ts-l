import React, {useState, KeyboardEvent, ChangeEvent, useCallback} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";
import {TodoListType} from "./AppWithRedux";
import {Task} from "./Task";

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

export const TodoList = React.memo((props: TodoListPropsType) => {
    // const {filter, tasks, title: tlTitte, addTask, removeTask, changeFilter} = props
    //все переменные-свойства в функции определяем как пропсы - деструктуризаация пропсов
    //также можно сразу вместо пропсов все свойства прописать тут (props: TodoListPropsType)

    /*  const [title, setTitle] = useState<string>("")
      const [error, setError] = useState<boolean>(false)*/
    console.log("lalala")
    /*const tasksJSXElements = props.tasks.map(t => {
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
    })*/


    const onClickAllFilter = useCallback(() => props.changeFilter("all", props.todoListID), [props.changeFilter,  props.todoListID])
    const onClickActiveFilter = useCallback(() => props.changeFilter("active", props.todoListID), [props.changeFilter, props.todoListID])
    const onClickCompletedFilter = useCallback(() => props.changeFilter("completed", props.todoListID), [props.changeFilter, props.todoListID])
    const onClickRemoveTodoList = useCallback(() => props.removeTodoList(props.todoListID), [props.removeTodoList, props.todoListID])
    const addTask = useCallback((title: string) => props.addTask(title, props.todoListID), [props.addTask, props.todoListID])
    const changeTodoListTitle = useCallback((title: string) => props.changeTodoListTitle(title, props.todoListID), [props.changeTodoListTitle,  props.todoListID])

    const getTasksForTodoList = () => {
        switch (props.filter) {
            case "active":
                return props.tasks.filter((t) => !t.isDone)
            case "completed":
                return props.tasks.filter((t) => t.isDone)
            default:
                return props.tasks
        }
    }

    let newTasks = getTasksForTodoList()


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
                {
                    newTasks.map(t => {
                        return (
                            <Task
                                key={t.id}
                                task={t}
                                todolistId={props.todoListID}
                                changeTaskStatus={props.changeTaskStatus}
                                removeTask={props.removeTask}
                                changeTaskTitle={props.removeTask}
                            />
                        )
                    })
                }
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
})

export default TodoList;