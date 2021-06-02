import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListAC,
    changeTodoListFilterAC,
    removeTodoListAC,
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";


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

function AppWithRedux() {
//BLL:
    /* const todoListID_1 = v1()
     const todoListID_2 = v1()*/

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, TodoListType[]>(state =>
        state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state =>
        state.tasks)

    /* const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, ([
         {id: todoListID_1, title: "What to learn", filter: "all"},
         {id: todoListID_2, title: "What to buy", filter: "all"}
     ]))*/


    /*  let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
      )*/

//local state - локальное хранилище, state устанавливает и ренедит

    /*const [filter, setFilter] = useState<"all" | "active" | "completed">("all")*/

//Remove tasks
    function removeTask(taskID: string, todoListID: string) {
        dispatch(removeTaskAC(taskID, todoListID))
    }

    function addTask(title: string, todoListID: string) {
        dispatch(addTaskAC(title, todoListID))
    }

    function changeTaskStatus(taskId: string, newIsDoneValue: boolean, todoListID: string) {
        dispatch(changeTaskStatusAC(taskId, newIsDoneValue, todoListID))
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListID: string) {
        dispatch(changeTaskTitleAC(taskId, newTitle, todoListID))
    }

//todolists function:
    function changeFilter(value: FilterValuesType, todoListID: string) {
        dispatch(changeTodoListFilterAC(value, todoListID))
    }

    function removeTodoList(todoListID: string) {
        dispatch(removeTodoListAC(todoListID))
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        dispatch(changeTodoListAC(title, todoListID))
    }

    function addTodoList(title: string) {
        dispatch(addTodoListAC(title))
    }


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

    const todoListsComponents = todolists.map(tl => {
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
                <Toolbar style={{justifyContent: "space-between"}}>
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


export default AppWithRedux;
