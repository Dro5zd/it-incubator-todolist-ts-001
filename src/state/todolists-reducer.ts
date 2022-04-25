import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

export type RemoveTodolistACType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistACType = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTodolistTitleACType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterACType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | ChangeTodolistFilterACType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(f => f.id !== action.id)

        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: "all"}]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)

        default:
            return state
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistACType =>{
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodolistAC = (title: string): AddTodolistACType => {
    return {type: 'ADD-TODOLIST', title: title }
}

export const ChangeTodolistTitleAC = (title: string, todolistId: string): ChangeTodolistTitleACType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId}
}

export const ChangeTodolistFilterAC = (filter: FilterValuesType, todolistId: string): ChangeTodolistFilterACType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter, id: todolistId}
}