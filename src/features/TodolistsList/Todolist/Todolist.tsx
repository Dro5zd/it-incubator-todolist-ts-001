import {TaskStatuses, TaskType} from '../../../api/todolists-api';
import {RequestStatusType} from '../../../state/app-reducer';
import {FilterValuesType, TodolistDomainType} from '../../../state/todolists-reducer';
import React, {memo, useCallback, useEffect} from 'react';
import {useTypedDispatch} from '../../../state/store';
import {fetchTasksTC} from '../../../state/tasks-reducer';
import {EditableSpan} from '../../../components/EditableSpan';
import {Button, ButtonGroup, IconButton} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import {Task} from '../Task/Task';
import {AddItemForm} from '../../../components/AddItemForm';

type TodolistPropsType = {
    todolist: TodolistDomainType
    tasks: TaskType[]
    removeTask: (id: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    entityStatus: RequestStatusType
    ChangeStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    removeTodolist: (id: string) => void
    onChangeTitleHandler: (id: string, newTitle: string, todolistId: string) => void
    onChangeTodolistTitleHandler: (todolistId: string, newTitle: string) => void
}
export const Todolist = memo((props: TodolistPropsType) => {

    const dispatch = useTypedDispatch()
    useEffect(() => {
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todolist.id), [props.changeFilter, props.todolist.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todolist.id), [props.changeFilter, props.todolist.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todolist.id), [props.changeFilter, props.todolist.id])


    const RemoveTodolist = () => {
        props.removeTodolist(props.todolist.id)
    }
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])

    const onChangeTaskTitleHandler = useCallback((newTitle: string) => {
        props.onChangeTodolistTitleHandler(props.todolist.id, newTitle)
    }, [props.onChangeTodolistTitleHandler, props.todolist.id])

    let tasksForTodolist = props.tasks

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    return (
        <div>
            <EditableSpan title={props.todolist.title} onChange={onChangeTaskTitleHandler} disabled={props.todolist.entityStatus === 'loading'}/>
            <IconButton onClick={RemoveTodolist} disabled={props.todolist.entityStatus === 'loading'}
                        style={{cursor: 'pointer'}}>
                <ClearIcon/>
            </IconButton>

            {tasksForTodolist.map(t => <Task
                key={t.id}
                todolistId={props.todolist.id}
                tasks={t}
                ChangeStatus={props.ChangeStatus}
                removeTask={props.removeTask}
                onChangeTitleHandler={props.onChangeTitleHandler}/>)
            }

            <ButtonGroup size="large" aria-label="large button group" disableElevation variant="outlined"
                         color={'inherit'}>
                <Button variant={props.todolist.filter === 'all' ? 'contained' : 'outlined'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button variant={props.todolist.filter === 'active' ? 'contained' : 'outlined'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={props.todolist.filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </ButtonGroup>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
        </div>
    );
});