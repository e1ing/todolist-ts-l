import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed";

function App() {
//BLL:
    //local state - локальное хранилище, state устанавливает и перерисовывает

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "React", isDone: false}
    ]);

    const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

//Remove tasks
    function removeTask(taskID: string) {
        const filteredTasks = tasks.filter(t => t.id !== taskID); //новый массив замисыватся фильтруя по условию
        console.log(tasks);
        //тут надо обновлять UI
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        };
        setTasks([newTask, ...tasks]);
    }

    function changeTaskStatus(taskId: string, newIsDoneValue: boolean) {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t))
    }


    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }


//UI:
    //функция
    function getTasksForTodolist() {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks;
        }
    }

    return (
        <div className="App">
            <TodoList
                title={"What to learn"}
                tasks={getTasksForTodolist()}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                filter={filter}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}


export default App;
