import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import classes from './Todolist.module.css'

export type ObjectType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodolistPropsType = {
    id: string
    title: string,
    tasks: ObjectType[]
    removeTask: (id: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    ChangeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
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
            props.addTask(title.trim(), props.id)
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
    const onClickChangeFilterHandler = (value: FilterValuesType, todolistId: string) => {
        props.changeFilter(value, todolistId)

    }
    const onClickRemoveTasksButtonHandler = (iId: string, todolistId:string) => {
        props.removeTask(iId, todolistId)
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

            <ul>
                {
                    props.tasks.map((i) => {

                        const changeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.ChangeStatus(i.id, event.currentTarget.checked, props.id)
                        }
                        return (
                            <li key={i.id}
                                className={i.isDone ? classes.isDone : ''}>
                                <button onClick={() => onClickRemoveTasksButtonHandler(i.id, props.id)}>✘</button>
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
                        onClick={() => onClickChangeFilterHandler('all', props.id)}>All
                </button>
                <button className={props.filter === 'active' ? classes.activeFilter : ''}
                        onClick={() => onClickChangeFilterHandler('active', props.id)}>Active
                </button>
                <button className={props.filter === 'completed' ? classes.activeFilter : ''}
                        onClick={() => onClickChangeFilterHandler('completed', props.id)}>Completed
                </button>
            </div>
        </div>
    );
};
