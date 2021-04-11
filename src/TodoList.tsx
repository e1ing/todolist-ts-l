import React from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskID: number) => void //функция, которая перезаписывает массив и ничего не возвращает
    changeFilter: (value: FilterValuesType) => void;
}


function TodoList(props: TodoListPropsType) {
    const tasks = props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id)
        }
        return (
            <li>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button onClick={() => props.changeFilter("all")}>All</button>
                <button onClick={() => props.changeFilter("all")}>Active</button>
                <button onClick={() => props.changeFilter("all")}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;