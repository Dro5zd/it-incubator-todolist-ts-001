import {v1} from 'uuid';
import {AddTodolistACType, RemoveTodolistACType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, TodolistType} from '../api/todolists-api';

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type RemoveTaskACType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type AddTaskACType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatusACType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    status: TaskStatuses
    todolistId: string
}
export type ChangeTaskTitleACType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string
    title: string
    todolistId: string
}

export type setTodolistsACType = ReturnType<typeof setTodolistsAC>

type ActionType =
    RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistACType
    | RemoveTodolistACType
    | setTodolistsACType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [{
                    id: v1(),
                    title: action.title,
                    status: TaskStatuses.New,
                    description: '',
                    priority: TaskPriorities.Low,
                    startDate: '',
                    deadline: '',
                    todoListId: action.todolistId,
                    order: 0,
                    addedDate: ''
                }, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.status
                } : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case 'ADD-TODOLIST':
            return {[action.todolistId]: [], ...state}

        case 'REMOVE-TODOLIST':{
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        case 'SET-TODOLISTS':
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy

        default:
            return state
    }
};


export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK' as const, taskId, todolistId};
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK' as const, title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS' as const, taskId, status, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE' as const, taskId, title, todolistId}
}
export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {type: 'SET-TODOLISTS' as const, todolists}
}

