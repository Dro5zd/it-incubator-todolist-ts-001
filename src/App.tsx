import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {
            id: v1(),
            title: 'What to learn?',
            filter: 'all'
        },
        {
            id: v1(),
            title: 'What to watch?',
            filter: 'all'
        }
    ])

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ]);

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks([task, ...tasks]);
    }


    function changeFilter(value: FilterValuesType, todolistId: string) {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
        // let todolist = todolists.find(tl=> tl.id === todolistId)
        // if (todolist){
        //     todolist.filter = value
        //     setTodolists([...todolists])
        // }
    }

    const ChangeStatus = (id: string, isDone: boolean) => {
        setTasks(tasks.map(i => i.id === id ? {...i, isDone} : i))
        // let task = tasks.find(t => t.id === id)
        // if (task) {
        //     task.isDone = isDone
        //     setTasks([...tasks])
        // }
    }


    return (
        <div className="App">

            {todolists.map(tl => {

                let tasksForTodolist = tasks;

                if (tl.filter === 'active') {
                    tasksForTodolist = tasks.filter(t => !t.isDone);
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasks.filter(t => t.isDone);
                }
                return <Todolist
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    ChangeStatus={ChangeStatus}
                    filter={tl.filter}
                />
            })}
        </div>
    );
}

export default App;
