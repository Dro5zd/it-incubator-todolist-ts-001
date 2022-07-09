import {setAppErrorAC, setAppStatusAC, setAppErrorACType, setAppStatusACType} from '../state/app-reducer';
import {ResponseType} from '../api/todolists-api';
import {Dispatch} from 'redux';
import {AxiosError} from 'axios';

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<setAppErrorACType | setAppStatusACType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    }else {
        dispatch(setAppErrorAC('Some error occurred'))

    }
        dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: AxiosError, dispatch: Dispatch<setAppErrorACType | setAppStatusACType>) => {
    dispatch(setAppStatusAC('failed'))
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
}
