import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed";

function App() {
//BLL:
    //local state - локальное хранилище, state устанавливает и перерисовывает
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "React", isDone: false}
    ]);

    const [filter, setFilter] = useState<"all" | "active" | "completed">("completed")

//Remove tasks
    function removeTask(taskID: number) {
        const filteredTasks = tasks.filter(t => t.id !== taskID); //новый массив замисыватся фильтруя по условию
        console.log(tasks);
        //тут надо обновлять UI
        setTasks(filteredTasks);
    }
    function changeFilter (value: FilterValuesType) {
    setFilter(value);
    }



//UI:
    //функция
    function getTasksForTodolist(){
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
            />
        </div>
    );
}


export default App;
