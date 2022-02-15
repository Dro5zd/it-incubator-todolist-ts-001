import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}


export function Todolist(props: PropsType) {

    let [title, setTitle] = useState('')
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onClickAddTaskButtonHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const onKeyPressAddTaskHandler = ({charCode}: KeyboardEvent<HTMLInputElement>)=> {
        if ( charCode === 13) {
            props.addTask(title)
            setTitle('')
        }
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeInputHandler}
            onKeyPress={onKeyPressAddTaskHandler}/>
            <button onClick={onClickAddTaskButtonHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => {
                        props.removeTask(t.id)
                    }}>x
                    </button>
                </li>)
            }
        </ul>
        <div>
            <button onClick={() => {
                props.changeFilter('all')
            }}>
                All
            </button>
            <button onClick={() => {
                props.changeFilter('active')
            }}>
                Active
            </button>
            <button onClick={() => {
                props.changeFilter('completed')
            }}>
                Completed
            </button>
        </div>
    </div>
}
