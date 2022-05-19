import React, {useEffect, useState} from 'react'
import {todolistAPI} from '../api/todolists-api';

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {

                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistAPI.createTodolist('12345 Todolist')
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'a5da2db1-6dcf-4ec5-b7c6-eff42b408a8f'
        todolistAPI.deleteTodolist(todolistId)

            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '318aa2bc-8e27-4f1f-a9da-588f19387ec4'
        todolistAPI.updateTodolist(todolistId, 'yoyo')

            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '318aa2bc-8e27-4f1f-a9da-588f19387ec4'
        todolistAPI.getTasks(todolistId)
            .then((res) => {

                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '318aa2bc-8e27-4f1f-a9da-588f19387ec4'
        todolistAPI.createTask(todolistId, '123458 Todolist')
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '318aa2bc-8e27-4f1f-a9da-588f19387ec4'
        const id = '68f31ea9-5e8e-4736-b962-4de58b02346a'
        todolistAPI.deleteTask(todolistId, id)

            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '318aa2bc-8e27-4f1f-a9da-588f19387ec4'
        const id = 'b6bf0ad3-3587-4d3b-a57c-c828eb69f04d'
        todolistAPI.updateTask(id, {
            description: 'string',
            title: 'stringNEW',
            status: 2,
            priority: 1,
            startDate: '13:22:21',
            deadline: '12:22:22'}, todolistId)

            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

