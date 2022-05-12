import React, {ChangeEvent} from 'react';
import s from './Todolist.module.css';
import {Checkbox} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {EditableSpan} from './EditableSpan';
import {ObjectType} from './Todolist';
import {FilterValuesType} from '../App';


export type TaskType = {
    id: string
    tasks: ObjectType[]
    filter: FilterValuesType
    removeTask: (id: string, todolistId: string) => void
    ChangeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    onChangeTitleHandler: (id: string, newTitle: string, todolistId: string) => void
}

const Task = (props: TaskType) => {

    const onClickRemoveTasksButtonHandler = (iId: string, todolistId: string) => {
        props.removeTask(iId, todolistId)
    }

    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }

    return (
        <div>
            {tasksForTodolist.map((i) => {
                const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    props.ChangeStatus(i.id, event.currentTarget.checked, props.id)
                }
                const onChangeTitleHandler = (newTitle: string) => {
                    props.onChangeTitleHandler(i.id, newTitle, props.id)
                }
                return (
                    <div key={i.id} className={s.spanContainer}>
                        <Checkbox checked={i.isDone}
                                  onChange={onChangeStatusHandler}/>
                        <DeleteIcon onClick={() => onClickRemoveTasksButtonHandler(i.id, props.id)}/>
                        <EditableSpan title={i.title} onChange={onChangeTitleHandler}/>
                    </div>
                )
            })
            }
        </div>
    );
};

export default Task;