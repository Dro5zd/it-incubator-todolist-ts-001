import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import {Button, ButtonGroup, Checkbox} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import s from './Todolist.module.css'

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
        <div>
            <span >{props.title}</span>
            <ClearIcon onClick={onClickRemoveTodolistHandler}/>
            <div>
                {props.tasks.map((i) => {
                    const changeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.ChangeStatus(i.id, event.currentTarget.checked, props.id)
                    }
                    return (
                        <div key={i.id} className={s.spanContainer}>
                            <Checkbox checked={i.isDone}
                                      onChange={changeStatusHandler}/>
                            <DeleteIcon onClick={() => onClickRemoveTasksButtonHandler(i.id, props.id)}/>
                            <EditableSpan title={i.title}/>
                        </div>
                    )
                })
                }
            </div>
            <ButtonGroup size="large" aria-label="large button group" disableElevation variant="outlined"
                         color={'inherit'}>
                <Button variant={props.filter === 'all' ? 'contained' : 'outlined'}
                        onClick={() => onClickChangeFilterHandler('all', props.id)}>All
                </Button>
                <Button variant={props.filter === 'active' ? 'contained' : 'outlined'}
                        onClick={() => onClickChangeFilterHandler('active', props.id)}>Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={() => onClickChangeFilterHandler('completed', props.id)}>Completed
                </Button>
            </ButtonGroup>
            <AddItemForm addItem={addTask}/>
        </div>
)
    ;
};
