import React, {ChangeEvent, memo, useCallback} from 'react';
import s from './Todolist.module.css';
import {Checkbox} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {EditableSpan} from './EditableSpan';
import {TaskStatuses, TaskType} from '../api/todolists-api';


export type TaskPropsType = {
    todolistId: string
    tasks: TaskType
    removeTask: (id: string, todolistId: string) => void
    ChangeStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    onChangeTitleHandler: (id: string, newTitle: string, todolistId: string) => void
}

export const Task = memo((props: TaskPropsType) => {

    const onClickRemoveTasksButtonHandler = useCallback((iId: string, todolistId: string) => {
        props.removeTask(iId, todolistId)
    },[props.removeTask])

    const onChangeStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {

        props.ChangeStatus(props.tasks.id, event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New , props.todolistId)
    }, [props.ChangeStatus, props.tasks.id, props.todolistId])

    const onChangeTitleHandler = useCallback((newTitle: string) => {
        props.onChangeTitleHandler(props.tasks.id, newTitle, props.todolistId)
    }, [props.onChangeTitleHandler, props.tasks.id, props.todolistId])

    return <div key={props.tasks.id} className={s.spanContainer}>
        <Checkbox checked={props.tasks.status === TaskStatuses.Completed}
                  onChange={onChangeStatusHandler}/>
        <DeleteIcon onClick={() => onClickRemoveTasksButtonHandler(props.tasks.id, props.todolistId)}/>
        <EditableSpan title={props.tasks.title} onChange={onChangeTitleHandler}/>
    </div>
});
