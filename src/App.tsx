import React, {useState} from 'react';
import {ObjectType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid, Paper} from '@mui/material';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: ObjectType[]
}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()


    let [todolists, setTodolists] = useState<Array<TodolistType>>([
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

    let [tasksObj, setTasks] = useState<TasksStateType>({
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
        let todolistTasks = tasksObj[todolistId]
        tasksObj[todolistId] = todolistTasks.filter(t => t.id !== id);
        setTasks({...tasksObj});
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todolistTasks = tasksObj[todolistId]
        tasksObj[todolistId] = [task, ...todolistTasks]
        setTasks({...tasksObj});
    }

    function addTodolist(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(r => r.id !== id))
        delete tasksObj[id]
        setTasks({...tasksObj})
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
    }

    const ChangeStatus = (id: string, isDone: boolean, todolistId: string) => {
        // let todolistTasks = tasksObj[todolistId]
        // let task = todolistTasks.find(t => t.id === id)
        // if (task) {
        //     task.isDone = isDone
        //     setTasks({...tasksObj})
        // }
        setTasks({...tasksObj, [todolistId]: tasksObj[todolistId].map(t => t.id === id ? {...t, isDone} : t)})
    }

    const onChangeTitleHandler = (id: string, newTitle: string, todolistId: string) => {
        // let todolistTasks = tasksObj[todolistId]
        // let task = todolistTasks.find(t => t.id === id)
        // if (task) {
        //     task.title = newTitle
        //     setTasks({...tasksObj})
        // }

        setTasks({...tasksObj, [todolistId]: tasksObj[todolistId].map(t => t.id === id ? {...t, title: newTitle} : t)})
    }

    const onChangeTodolistTitleHandler = (newTitle: string, todolistId: string) => {
        // let title = todolists.find(t => t.id === todolistId)
        // if (title) {
        //     title.title = newTitle
        //     setTodolists([...todolists])
        // }

        setTodolists(todolists.map(t => t.id === todolistId ? {...t, title: newTitle} : t))
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

export default App;
