import React, {useCallback} from 'react';
import {AddItemForm} from './components/AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid, LinearProgress} from '@mui/material';
import {addTodolistTC} from './state/todolists-reducer';
import {useSelector} from 'react-redux';
import {AppRootStateType, useTypedDispatch} from './state/store';
import {ErrorSnackbar} from './state/ErrorSnackbar';
import {BrowserRouter} from 'react-router-dom';
import {TodolistsList} from './features/TodolistsList/TodolistsList';


export function App() {
    const status = useSelector<AppRootStateType>(state => state.app.status)

    const dispatch = useTypedDispatch()

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [])

    return (
        <BrowserRouter>
        <div className="App">
            <ErrorSnackbar/>
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
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist} disabled={status === 'loading'}/>
                </Grid>
                <TodolistsList/>
            </Container>
        </div>
        </BrowserRouter>
    );
}
