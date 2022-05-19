import {AddTodolistACType, RemoveTodolistACType} from './todolists-reducer';
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistAPI,
    TodolistType,
    UpdateTaskModelType
} from '../api/todolists-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';

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
    task: TaskType
}

export type SetTasksACType = {
    type: 'SET-TASKS',
    todolistId: string
    tasks: TaskType[]
}

export type UpdateDomainTaskModelType = {
    description?: string
    title?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type setTodolistsACType = ReturnType<typeof setTodolistsAC>
export type updateTasksACType = ReturnType<typeof updateTaskAC>

type ActionType =
    RemoveTaskACType
    | AddTaskACType
    | AddTodolistACType
    | RemoveTodolistACType
    | setTodolistsACType
    | SetTasksACType
    | updateTasksACType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId
                    ? {...t, ...action.model} : t)
            }

        case 'ADD-TODOLIST':
            return {[action.todolist.id]: [], ...state}

        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }

        case 'SET-TASKS':
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy

        default:
            return state
    }
};


export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK' as const, taskId, todolistId};
}
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const updateTaskAC = (taskId: string,model: UpdateDomainTaskModelType, todolistId: string, ) => {
    return {type: 'UPDATE-TASK' as const, taskId, model, todolistId }
}
export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {type: 'SET-TODOLISTS' as const, todolists}
}
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: 'SET-TASKS' as const, todolistId, tasks}
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todolistId)
            .then(res => {
                const tasks = res.data.items
                const action = setTasksAC(todolistId, tasks)
                dispatch(action)
            })
    }
}

export const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then(res => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
}

export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTask(todolistId, title)
            .then(res => {
                const task = res.data.data.item
                dispatch(addTaskAC(task))
            })
    }
}

export const updateTaskTC = (taskId: string,domainModel: UpdateDomainTaskModelType, todolistId: string, ) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)

        if(!task){
            console.warn('Error')
            return
        }

        const apiModel: UpdateTaskModelType = {
            description: task.description,
            title: task.title,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }

            todolistAPI.updateTask(taskId, apiModel, todolistId )
                .then(res => {
                    dispatch(updateTaskAC(taskId, domainModel, todolistId))
                })
        }
    }


