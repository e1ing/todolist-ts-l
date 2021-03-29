import React from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

function App() {
//BLL:
    const tasksToLearn: Array<TaskType> = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ]

    const tasksToBuy: Array<TaskType> = [
        {id: 4, title: "Milk", isDone: true},
        {id: 5, title: "Beer", isDone: true},
        {id: 6, title: "Water", isDone: false},
    ]

//UI:

    return (
        <div className="App">
            <TodoList title={"What to learn"} tasks={tasksToLearn}/>
            <TodoList title={"What to buy"} tasks={tasksToBuy}/>
        </div>
    );
}
export default App;
