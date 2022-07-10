import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, LinearProgress} from '@mui/material';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {ErrorSnackbar} from './state/ErrorSnackbar';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {TodolistsList} from './features/TodolistsList/TodolistsList';
import {Login} from './features/Login/Login';


export function App() {
    const status = useSelector<AppRootStateType>(state => state.app.status)
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
                <Routes>
                    <Route path='/' element={<TodolistsList/>}></Route>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='*' element={<Navigate to='/404'/>} />
                    <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>} />
                </Routes>
            </Container>
        </div>
        </BrowserRouter>
    );
}
