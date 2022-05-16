import {v1} from 'uuid';
import {TodolistType} from '../api/todolists-api';


export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export type RemoveTodolistACType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistACType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
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

export type SetTodolistsACType = {
    type: 'SET-TODOLISTS',
    todolists: Array<TodolistType>
}

type ActionType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | ChangeTodolistFilterACType | SetTodolistsACType


    const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(f => f.id !== action.id)

        case 'ADD-TODOLIST':
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)

        case 'SET-TODOLISTS':
            return action.todolists.map(tl=> {
                return {
                    ...tl,
                    filter: 'all'
                }
            })

        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistACType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (title: string): AddTodolistACType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}

export const changeTodolistTitleAC = (title: string, todolistId: string): ChangeTodolistTitleACType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId}
}

export const changeTodolistFilterAC = (filter: FilterValuesType, todolistId: string): ChangeTodolistFilterACType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter, id: todolistId}
}

export const setTodolistsAC = (todolists: TodolistType[]): SetTodolistsACType => {
    return {type: 'SET-TODOLISTS', todolists: todolists}
}