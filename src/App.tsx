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

    let todolistId1 = v1();
    let todolistId2 = v1()


    let [todolists, setTodolists] = useState<TodolistType[]>([
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

    let [tasks, setTasks] = useState({
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
        }
    );

    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id);
        setTasks({...tasks});
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todolistTasks = tasks[todolistId]
        tasks[todolistId]=[task, ...todolistTasks]
        setTasks({...tasks});
    }


    function changeFilter(value: FilterValuesType, todolistId: string) {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
        // let todolist = todolists.find(tl=> tl.id === todolistId)
        // if (todolist){
        //     todolist.filter = value
        //     setTodolists([...todolists])
        // }
    }

    const ChangeStatus = (id: string, isDone: boolean, todolistId:string) => {
        // setTasks(tasks.map(i => i.id === id ? {...i, isDone} : i))
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }


    return (
        <div className="App">

            {todolists.map(tl => {

                let tasksForTodolist = tasks[tl.id];

                if (tl.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                }
                return <Todolist
                    key={tl.id}
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
