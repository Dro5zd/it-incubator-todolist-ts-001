import React, {useEffect, useState} from 'react'
import axios from 'axios';

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '398fd428-4e41-4ce9-836c-118b8fdb8983'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)

            .then((res) => {

                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: '12345 Todolist'}, settings)

            .then((res) => {
                debugger
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        axios.delete('https://social-network.samuraijs.com/api/1.1/todo-lists/a1a5a346-b104-42b4-b9bb-76ab8e7b244c', settings)

            .then((res) => {
                debugger
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        axios.put('https://social-network.samuraijs.com/api/1.1/todo-lists/a5da2db1-6dcf-4ec5-b7c6-eff42b408a8f', {title: 'yoyo'}, settings)

            .then((res) => {
                debugger
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

