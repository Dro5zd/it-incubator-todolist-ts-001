import {todolistAPI, TodolistType} from '../api/todolists-api';
import {Dispatch} from 'redux';
import {addTaskAC} from './tasks-reducer';


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
    todolist: TodolistType
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

type ActionType =
    RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistTitleACType
    | ChangeTodolistFilterACType
    | SetTodolistsACType


const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(f => f.id !== action.id)

        case 'ADD-TODOLIST':
            return [{
                id: '',
                title: action.todolist.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)

        case 'SET-TODOLISTS':
            return action.todolists.map(tl => {
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

export const addTodolistAC = (todolist: TodolistType): AddTodolistACType => {
    return {type: 'ADD-TODOLIST', todolist}
}

export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleACType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: title}
}

export const changeTodolistFilterAC = (filter: FilterValuesType, todolistId: string): ChangeTodolistFilterACType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter, id: todolistId}
}

export const setTodolistsAC = (todolists: TodolistType[]): SetTodolistsACType => {
    return {type: 'SET-TODOLISTS', todolists}
}

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}

export const removeTodolistTC = (id: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTodolist(id)
            .then(res => {
                dispatch(removeTodolistAC(id))
            })
    }
}

export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.updateTodolist(id, title)
            .then(res => {
                dispatch(changeTodolistTitleAC(id, title))
            })
    }
}
