import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import classes from './Todolist.module.css'

export type ObjectType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodolistPropsType = {
    title: string,
    tasks: ObjectType[]
    removeTask: (id: string) => void
    addTask: (title: string) => void
    ChangeStatus: (taskId: string, isDone: boolean) => void
    changeFilter: (filter: FilterValuesType) => void
    filter: FilterValuesType
}

export const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState('')

    const [error, setError] = useState<string | null>(null)

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onClickAddTaskButtonHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Field is require')
        }

    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            onClickAddTaskButtonHandler()
        }
    }
    const onClickChangeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value)
    }
    const onClickRemoveTasksButtonHandler = (iId: string) => {
        props.removeTask(iId)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input onKeyPress={onKeyPressHandler}
                       value={title}
                       onChange={onChangeInputHandler}
                       className={error ? classes.error : ''}
                />
                <button onClick={onClickAddTaskButtonHandler}>+</button>
                {error && <div className={classes.errorMessage}>{error}</div>}
            </div>

            <ul >
                {
                    props.tasks.map((i) => {

                        const changeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.ChangeStatus(i.id, event.currentTarget.checked)
                        }
                        return (
                            <li key={i.id}
                                className={i.isDone ? classes.isDone : ''}>
                                <button onClick={() => onClickRemoveTasksButtonHandler(i.id)}>✘</button>
                                <input type="checkbox"
                                       checked={i.isDone}
                                       onChange={changeStatusHandler}
                                />
                                <span>{i.title}</span>
                            </li>
                        )
                    })
                }
            </ul>

            <div>
                <button className={props.filter === 'all' ? classes.activeFilter : ''}
                        onClick={() => onClickChangeFilterHandler('all')}>All
                </button>
                <button className={props.filter === 'active' ? classes.activeFilter : ''}
                        onClick={() => onClickChangeFilterHandler('active')}>Active
                </button>
                <button className={props.filter === 'completed' ? classes.activeFilter : ''}
                        onClick={() => onClickChangeFilterHandler('completed')}>Completed
                </button>
            </div>
        </div>
    );
};
