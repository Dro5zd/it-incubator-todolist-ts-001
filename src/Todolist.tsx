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

    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }




    let [title, setTitle] = useState('')
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onClickAddTaskButtonHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const onKeyPressAddTaskHandler = ({charCode}: KeyboardEvent<HTMLInputElement>) => {
        if (charCode === 13) {
            props.addTask(title)
            setTitle('')
        }
    }

    const onChangeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value)
    }

    // const removeTaskHandler = (Tid: string) => {
    //     props.removeTask(Tid)
    // }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeInputHandler}
                   onKeyPress={onKeyPressAddTaskHandler}/>
            <button onClick={onClickAddTaskButtonHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                        const removeTaskHandler = () => {
                            props.removeTask(t.id)
                        }
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                {/*<button onClick={() =>removeTaskHandler(t.id)}>x*/}
                                {/*</button>*/}
                                <button onClick={removeTaskHandler}>x
                                </button>
                            </li>)
                    }
                )
            }

        </ul>
        <div>
            <button onClick={() => onChangeFilterHandler('all')}>
                All
            </button>
            <button onClick={() => onChangeFilterHandler('active')}>
                Active
            </button>
            <button onClick={() => onChangeFilterHandler('completed')}>
                Completed
            </button>
        </div>
    </div>
}
