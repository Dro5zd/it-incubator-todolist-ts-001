import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from '@mui/material';
import {Todolist} from './Todolist/Todolist';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC, fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC, TodolistDomainType
} from '../../state/todolists-reducer';
import {AppRootStateType, useTypedDispatch} from '../../state/store';
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from '../../state/tasks-reducer';
import {TaskStatuses} from '../../api/todolists-api';
import {useSelector} from 'react-redux';
import {AddItemForm} from '../../components/AddItemForm';

export const TodolistsList = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const status = useSelector<AppRootStateType>(state => state.app.status)
    const dispatch = useTypedDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [])

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskTC(taskId, todolistId))
    }, [])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(title, todolistId))
    }, [])

    const ChangeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(id, {status}, todolistId))
    }, [])

    const onChangeTitleHandler = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(updateTaskTC(id, {title: newTitle }, todolistId))
    }, [])

    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistTC(id))
    }, [])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(value, todolistId))
    }, [])

    const onChangeTodolistTitleHandler = useCallback((todolistId: string, newTitle: string,) => {
        dispatch(changeTodolistTitleTC(todolistId, newTitle))
    }, [])

    return (
        <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist} disabled={status === 'loading'}/>
        </Grid>
        <Grid container spacing={3}>
            {todolists.map(tl => {
                let tasksForTodolist = tasks[tl.id];
                return <Grid item key={tl.id}>
                    <Paper elevation={3} style={{padding: '10px'}}>
                        <Todolist
                            todolist={tl}
                            key={tl.id}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            entityStatus={tl.entityStatus}
                            ChangeStatus={ChangeStatus}
                            removeTodolist={removeTodolist}
                            onChangeTitleHandler={onChangeTitleHandler}
                            onChangeTodolistTitleHandler={onChangeTodolistTitleHandler}
                        /></Paper>
                </Grid>
            })
            }</Grid>
        </>
    );
};