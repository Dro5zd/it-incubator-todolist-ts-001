import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import classes from './Todolist.module.css'
import {AddItemForm} from './AddItemForm';

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
    removeTodolist: (id: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const onClickChangeFilterHandler = (value: FilterValuesType, todolistId: string) => {
        props.changeFilter(value, todolistId)

    }
    const onClickRemoveTasksButtonHandler = (iId: string, todolistId:string) => {
        props.removeTask(iId, todolistId)
    }

    const onClickRemoveTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    const addTask = (title: string)=>{
        props.addTask(title, props.id)
    }


    return (
        <div>

            <h3>{props.title}
                <button onClick={onClickRemoveTodolistHandler}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
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
