import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

//this is action type
export type RemoveTodoListAT = {
    type: "REMOVE_TODOLIST"
    todoListID: string
}
export type AddTodoListAT = {
    type: "ADD_TODOLIST"
    title: string
    todoListId: string
}
type ChangeTodoListTitleAT = {
    type: "CHANGE_TODOLIST_TITLE"
    title: string
    todoListID: string
}
type ChangeTodoListFilterAT = {
    type: "CHANGE_TODOLIST_FILTER"
    filter: FilterValuesType
    todoListID: string
}

export type ActionUnionType =  RemoveTodoListAT|AddTodoListAT|ChangeTodoListTitleAT|ChangeTodoListFilterAT


export const todoListsReducer = (todoLists: Array<TodoListType>,
                                 action: ActionUnionType) => {
    switch (action.type) {
        case "REMOVE_TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case "ADD_TODOLIST":
            const newTodoListId = action.todoListId
            const newTodoList: TodoListType = {
                id: newTodoListId, title: action.title, filter: "all"
            }
            return [...todoLists, newTodoList]
        case "CHANGE_TODOLIST_TITLE":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl);
        case "CHANGE_TODOLIST_FILTER":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        default:
            return todoLists
    }
}

export const removeTodoListAC = (todoListID: string): RemoveTodoListAT =>{
    return {type:"REMOVE_TODOLIST", todoListID:  todoListID}
}

export const addTodoListAC = ( title: string):AddTodoListAT =>{
    return {type: "ADD_TODOLIST", title: title, todoListId:v1()}
}

export const changeTodoListAC = ( title: string,  todoListID: string): ChangeTodoListTitleAT =>{
    return {type:  "CHANGE_TODOLIST_TITLE", title: title, todoListID:  todoListID}
}

export const changeTodoListFilterAC = ( filter: FilterValuesType, todoListID: string): ChangeTodoListFilterAT =>{
    return {type: "CHANGE_TODOLIST_FILTER",  filter: filter, todoListID: todoListID}
}

