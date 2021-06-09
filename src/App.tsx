import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import { useCallback } from 'react';


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
//BLL:
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"}
    ])


    const [tasks, setTasks] = useState<TasksStateType>({
            [todoListID_1]: [
                {id: v1(), title: "HTML", isDone: false},
                {id: v1(), title: "CSS", isDone: false},
                {id: v1(), title: "React", isDone: true}
            ],
            [todoListID_2]: [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Meat", isDone: true},
                {id: v1(), title: "Bread", isDone: false}
            ],
        }
    )

//local state - локальное хранилище, state устанавливает и ренедит


    const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

//Remove tasks
    function removeTask(taskID: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID);
        setTasks({...tasks})
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        };
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]});
    }

    function changeTaskStatus(taskId: string, newIsDoneValue: boolean, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t)
        setTasks({...tasks})
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].map(t => t.id === taskId ? {...t, title: newTitle} : t)
        setTasks({...tasks})
    }

//todolists function:
    function changeFilter(value: FilterValuesType, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl));
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title: title} : tl));
    }
    const addTodoList = useCallback((title: string) =>{
        const newTodoListId = v1()
        const newTodoList: TodoListType = {
            id: newTodoListId, title, filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListId]: []})
    }, [])


//UI:
//функция
    function getTasksForTodolist(todoList: TodoListType) {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id];
        }
    }

    const todoListsComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
            <Paper elevation={5} style={{padding: "20px"}}>
                <TodoList
                    todoListID={tl.id}
                    title={tl.title}
                    tasks={getTasksForTodolist(tl)}
                    filter={tl.filter}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    removeTodoList={removeTodoList}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoListTitle={changeTodoListTitle}
                />
            </Paper>
            </Grid>
        )
    })

    return (

        <div>
            <AppBar position={"static"}>
                <Toolbar style={{justifyContent:"space-between"}}>
                    <IconButton color={"inherit"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        Todolists
                    </Typography>
                    <Button
                        variant={"outlined"}
                        color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}


export default App;
