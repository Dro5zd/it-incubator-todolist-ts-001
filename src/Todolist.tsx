import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import s from './Todolist.module.css'
import {AddItemForm} from './AddItemForm';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button} from '@mui/material';

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
    const onClickRemoveTasksButtonHandler = (iId: string, todolistId: string) => {
        props.removeTask(iId, todolistId)
    }

    const onClickRemoveTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }


    return (
        <div className={s.containerMain}>
            <div className={s.container}>
                <h1>TODO List
                    <span>{props.title}</span>
                    <button onClick={onClickRemoveTodolistHandler}>x</button>
                </h1>

                <div>
                    {props.tasks.map((i) => {
                        const changeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.ChangeStatus(i.id, event.currentTarget.checked, props.id)
                        }
                        return (
                            <div key={i.id}
                                 className={i.isDone ? s.isDone : ''}>
                                <span className={s.title}>
                                    {i.title}
                                    <input type="checkbox"
                                           checked={i.isDone}
                                           onChange={changeStatusHandler}/>

                                    <DeleteIcon onClick={() => onClickRemoveTasksButtonHandler(i.id, props.id)} className={s.del_btn}/></span>
                            </div>
                        )
                    })
                    }
                </div>

            </div>
            <AddItemForm addItem={addTask}/>
            <div className={s.btn_block}>
                <Button size={'small'} disableElevation variant="contained" className={props.filter === 'all' ? s.btnActive : s.btn}
                        onClick={() => onClickChangeFilterHandler('all', props.id)}>All
                </Button>
                <Button size={'small'} variant="contained" className={props.filter === 'active' ? s.btnActive : s.btn}
                        onClick={() => onClickChangeFilterHandler('active', props.id)}>Active
                </Button>
                <Button size={'small'} variant="contained" className={props.filter === 'completed' ? s.btnActive : s.btn}
                        onClick={() => onClickChangeFilterHandler('completed', props.id)}>Completed
                </Button>
            </div>
        </div>
    );
};
