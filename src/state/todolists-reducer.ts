import {todolistAPI, TodolistType} from '../api/todolists-api';
import {Dispatch} from 'redux';
import {ActionsAppType, RequestStatusType, setAppErrorAC, setAppStatusAC, setAppStatusACType} from './app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(f => f.id !== action.id)

        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)

        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))

        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(t => t.id === action.id ? {...t, entityStatus: action.status} : t)

        default:
            return state
    }
}

// actions
export const removeTodolistAC = (todolistId: string) =>
    ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (todolistId: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: title} as const)
export const changeTodolistFilterAC = (filter: FilterValuesType, todolistId: string) =>
    ({type: 'CHANGE-TODOLIST-FILTER', filter, id: todolistId} as const)
export const setTodolistsAC = (todolists: TodolistType[]) =>
    ({type: 'SET-TODOLISTS', todolists} as const)
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status} as const)

//thunks
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<ActionsType | setAppStatusACType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<ActionsType | ActionsAppType>) => {
        dispatch(setAppStatusAC('loading'))

        todolistAPI.createTodolist(title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC(res.data.data.item))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }
}
export const removeTodolistTC = (id: string) => {
    return (dispatch: Dispatch<ActionsType | setAppStatusACType>) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(id, 'loading'))
        todolistAPI.deleteTodolist(id)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodolistAC(id))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {

        todolistAPI.updateTodolist(id, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTodolistTitleAC(id, title))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }
}

//types
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>

type ActionsType =
    | RemoveTodolistACType
    | AddTodolistACType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsACType
    | ChangeTodolistEntityStatusACType

export type FilterValuesType = 'all' | 'active' | 'completed';


export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
