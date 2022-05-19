import React, {useCallback, useEffect} from 'react';
import {Todolist} from './components/Todolist';
import {AddItemForm} from './components/AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid, Paper} from '@mui/material';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC, fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC, TodolistDomainType,
} from './state/todolists-reducer';
import {
    addTaskTC,
    removeTaskTC,
    TasksStateType, updateTaskTC,
} from './state/tasks-reducer';
import {useSelector} from 'react-redux';
import {AppRootStateType, useTypedDispatch} from './state/store';
import {TaskStatuses} from './api/todolists-api';


export function App() {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useTypedDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
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

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
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
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {
                        let tasksForTodolist = tasks[tl.id];
                        return <Grid item key={tl.id}>
                            <Paper elevation={3} style={{padding: '10px'}}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    ChangeStatus={ChangeStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    onChangeTitleHandler={onChangeTitleHandler}
                                    onChangeTodolistTitleHandler={onChangeTodolistTitleHandler}
                                /></Paper>
                        </Grid>
                    })
                    }</Grid>

            </Container>

        </div>
    );
}
