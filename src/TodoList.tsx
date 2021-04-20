import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string) => void //функция, которая перезаписывает массив и ничего не возвращает
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
}


function TodoList(props: TodoListPropsType) {
    // const {filter, tasks, title: tlTitte, addTask, removeTask, changeFilter} = props
    //все переменные-свойства в функции определяем как пропсы - деструктуризаация пропсов
    //также можно сразу вместо пропсов все свойства прописать тут (props: TodoListPropsType)

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const tasksJSXElements = props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id)
        }

        return (
            <li className={t.isDone ? "is-done" : ""}>
                <input
                    onChange={(e) =>
                        props.changeTaskStatus(t.id, e.currentTarget.checked)}
                    type="checkbox"
                    checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })


    const onClickAddTask = () => {
        const trimmedTitle = title.trim() //обрезка пробелов впереди и сзади
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true) //подсвечивает красным, если в строке пусто
        }
        setTitle("")
    }

    const onKeyPressAddTask = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            onClickAddTask()
        }
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false) //убираем ошибку если начинаем печатать в поле
    }
    const onClickAllFilter = () => props.changeFilter("all")
    const onClickActiveFilter = () => props.changeFilter("active")
    const onClickCompletedFilter = () => props.changeFilter("completed")
    const errorMessage = error ? <div className={"error-message"}>Title is required</div> : null //текст под полем


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? "error" : ""}
                    value={title}
                    onChange={onChangeTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={onClickAddTask}>+</button>
                {errorMessage}
            </div>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onClickAllFilter}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onClickActiveFilter}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onClickCompletedFilter}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;