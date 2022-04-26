import React, {useReducer} from 'react';
import { Todolist} from './components/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid, Paper} from '@mui/material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed';

function AppWithReducers() {

    let todolistId1 = v1()
    let todolistId2 = v1()


    let [todolists, dispatchToTodolistReducer] = useReducer(todolistsReducer, [
        {
            id: todolistId1,
            title: 'What to learn?',
            filter: 'all'
        },
        {
            id: todolistId2,
            title: 'What to watch?',
            filter: 'all'
        }
    ])

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Blood sport', isDone: true},
            {id: v1(), title: 'Autumn in New York', isDone: true},
            {id: v1(), title: 'Batman', isDone: false},
            {id: v1(), title: 'Terminator 2', isDone: false},
            {id: v1(), title: 'Duck Tales', isDone: false},
        ]
    })

    function removeTask(id: string, todolistId: string) {
        dispatchToTasksReducer(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatchToTasksReducer(addTaskAC(title, todolistId))
    }

    const ChangeStatus = (id: string, isDone: boolean, todolistId: string) => {
        dispatchToTasksReducer(changeTaskStatusAC(id, isDone, todolistId))
    }

    const onChangeTitleHandler = (id: string, newTitle: string, todolistId: string) => {
        dispatchToTasksReducer(changeTaskTitleAC(id, newTitle, todolistId))
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatchToTodolistReducer(action)
        dispatchToTasksReducer(action)
    }

    function removeTodolist(id: string) {
        dispatchToTodolistReducer(removeTodolistAC(id))
        dispatchToTasksReducer(removeTodolistAC(id))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchToTodolistReducer(changeTodolistFilterAC(value, todolistId))
    }

    const onChangeTodolistTitleHandler = (newTitle: string, todolistId: string) => {
        dispatchToTodolistReducer(changeTodolistTitleAC(newTitle, todolistId))
    }

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
                        let tasksForTodolist = tasksObj[tl.id];

                        if (tl.filter === 'active') {
                            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                        }
                        return <Grid item>
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
                                    removeTodolist={removeTodolist} onChangeTitleHandler={onChangeTitleHandler}
                                    onChangeTodolistTitleHandler={onChangeTodolistTitleHandler}
                                /></Paper>
                        </Grid>
                    })
                    }</Grid>

            </Container>

        </div>
    );
}

export default AppWithReducers;
