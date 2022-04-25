import {TasksStateType} from '../App';

type ActionType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType | ChangeTaskTitleACType

const InitialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = InitialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return  {...state, [action.todolistId]: state[action.todolistId].filter(t=> t.id !== action.id)}
    }


    return state
};

export type RemoveTaskACType = ReturnType<typeof RemoveTaskAC>

export const RemoveTaskAC = (taskId: string, todolistId: string) =>{
    return {type: 'REMOVE-TASK', id: taskId, todolistId: todolistId} as const
}
