import {TodolistType} from '../src/App';

type ActionType = {
    type: string
    [key: string]: any
}

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'CCC':
            return state
        default:
            return state
    }
}