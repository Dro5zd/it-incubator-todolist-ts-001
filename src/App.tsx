import React, {useState} from 'react';
import './App.css';
import {ObjectType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: ObjectType[]
}

function App() {

    let todolistId1 = v1()
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
        }
    );

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
        // setTasks(tasks.map(i => i.id === id ? {...i, isDone} : i))
        let todolistTasks = tasksObj[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }


    return (
        <div className="App">
            <AddItemForm
                addItem={addTodolist}
            />
            {todolists.map(tl => {

                let tasksForTodolist = tasksObj[tl.id];

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
                    removeTodolist={removeTodolist}
                />


            })}
        </div>
    );
}

export default App;
