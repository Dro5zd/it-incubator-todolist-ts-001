import axios from 'axios';
import {RequestStatusType} from '../state/app-reducer';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '398fd428-4e41-4ce9-836c-118b8fdb8983'
    }
})

export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

export type ResponseType< D={} > = {
    resultCode: number
    messages: Array<string>
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type GetTasksResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
    entityStatus: RequestStatusType
}

export type UpdateTaskModelType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}


export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },

    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: title})
    },

    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },

    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
    },

    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title: title})
    },

    updateTask(id: string, model: UpdateTaskModelType, todolistId: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${id}`, model)
    },

    deleteTask(todolistId: string, taskId: string,) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}