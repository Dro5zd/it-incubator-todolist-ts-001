import React, {memo, useCallback} from 'react';
import {AddItemForm} from './AddItemForm';
import ClearIcon from '@mui/icons-material/Clear';
import {Button, ButtonGroup} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import {Task} from './Task';
import {FilterValuesType} from '../state/todolists-reducer';
import {TaskStatuses, TaskType} from '../api/todolists-api';

type TodolistPropsType = {
    id: string
    title: string,
    tasks: TaskType[]
    removeTask: (id: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    ChangeStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (id: string) => void
    onChangeTitleHandler: (id: string, newTitle: string, todolistId: string) => void
    onChangeTodolistTitleHandler: (newTitle: string, todolistId: string) => void
}

export const Todolist = memo((props: TodolistPropsType) => {

    console.log('Todolist called')

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id])


    const onClickRemoveTodolistHandler = () => {
        props.removeTodolist(props.id)
    }
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const onChangeTaskTitleHandler = useCallback((newTitle: string) => {
        props.onChangeTodolistTitleHandler(newTitle, props.id)
    }, [props.onChangeTodolistTitleHandler , props.id])

    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    return (
        <div>
            <EditableSpan title={props.title} onChange={onChangeTaskTitleHandler}/>
            <ClearIcon onClick={onClickRemoveTodolistHandler}/>

            {tasksForTodolist.map(t => <Task
                key={t.id}
                todolistId={props.id}
                tasks={t}
                ChangeStatus={props.ChangeStatus}
                removeTask={props.removeTask}
                onChangeTitleHandler={props.onChangeTitleHandler}/>)
            }

            <ButtonGroup size="large" aria-label="large button group" disableElevation variant="outlined"
                         color={'inherit'}>
                <Button variant={props.filter === 'all' ? 'contained' : 'outlined'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button variant={props.filter === 'active' ? 'contained' : 'outlined'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </ButtonGroup>
            <AddItemForm addItem={addTask}/>
        </div>
    )
        ;
});
