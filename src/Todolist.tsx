import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./conponents/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = ({charCode}: KeyboardEvent<HTMLInputElement>) => {
        if (charCode === 13) {
            addTask();
        }
    }

    // const onAllClickHandler = () => {
    //     props.changeFilter('all')
    // }
    // const onActiveClickHandler = () => {
    //     props.changeFilter('active')
    // }
    // const onCompletedClickHandler = () => {
    //     props.changeFilter('completed')
    // }

    const changeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value)
    }
    const onClickHandler = (Tid: string) => {
        return props.removeTask(Tid)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            {/*<button onClick={addTask}>+</button>*/}
            <Button name='+' callback={() => addTask()}/>
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    // const onClickHandler = () => props.removeTask(t.id)

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        {/*<button onClick={() => onClickHandler(t.id)}>x</button>*/}
                        <Button name='x' callback={() => onClickHandler(t.id)}/>
                    </li>
                })
            }
        </ul>
        <div>
            {/*<button onClick={ onAllClickHandler }>All</button>*/}
            {/*<button onClick={ onActiveClickHandler }>Active</button>*/}
            {/*<button onClick={ onCompletedClickHandler }>Completed</button>*/}

            {/*<button onClick={() => changeFilterHandler('all')}>All</button>*/}
            {/*<button onClick={() => changeFilterHandler('active')}>Active</button>*/}
            {/*<button onClick={() => changeFilterHandler('completed')}>Completed</button>*/}

            <Button name='All' callback={() => changeFilterHandler('all')}/>
            <Button name='Completed' callback={() => changeFilterHandler('completed')}/>
            <Button name='Active' callback={() => changeFilterHandler('active')}/>


        </div>
    </div>
}
