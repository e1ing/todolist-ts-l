import {FilterValuesType, TasksStateType, TaskType, TodoListType} from "../App";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";
import {v1} from "uuid";

//this is action type
type RemoveTaskActionType = {
    type: "REMOVE_TASK"
    taskId: string
    todoListId: string
}
type AddTaskActionType = {
    type: "ADD_TASK"
    taskTitle: string
    todoListId: string
}

type ChangeTaskActionType = {
    type: "CHANGE_TASK_STATUS"
    taskId: string,
    isDone: boolean,
    todoListId: string
}

type ChangeTaskTitleActionType = {
    type: "CHANGE_TASK_TITLE"
    taskId: string,
    title: string,
    todoListId: string
}

let initialState: TasksStateType ={} //вариант

/*type initialStateType = typeof initialState *///более гибко

export type ActionUnionType = RemoveTaskActionType|AddTaskActionType|
    ChangeTaskActionType|ChangeTaskTitleActionType|AddTodoListAT|RemoveTodoListAT


export const tasksReducer = (state=initialState,
                             action: ActionUnionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
            }
        case "ADD_TASK":
            const newTask: TaskType = {
                id: v1(),
                title: action.taskTitle,
                isDone: false
            };
            return {
                ...state,
                [action.todoListId]: [newTask, ...state[action.todoListId]]
            }
        case "CHANGE_TASK_STATUS":
            return{
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)

            }
        case "CHANGE_TASK_TITLE":
            return{
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {...t, title: action.title} : t)

            }
        case "ADD_TODOLIST":
            return {
                ...state,
            [action.todoListId]:[]
            }
        case "REMOVE_TODOLIST":
            let copyState = {...state}
            delete copyState[action.todoListID]
            return copyState
        default:
            return state
    }

}

export const removeTaskAC = (taskId: string, todoListId:string): RemoveTaskActionType => {
    return {type: "REMOVE_TASK", taskId, todoListId}
}

export const addTaskAC = (taskTitle: string, todoListId: string): AddTaskActionType => {
    return {type: "ADD_TASK", taskTitle, todoListId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskActionType => {
    return {type: "CHANGE_TASK_STATUS", taskId, isDone, todoListId}
}


export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE_TASK_TITLE", taskId, title, todoListId}
}