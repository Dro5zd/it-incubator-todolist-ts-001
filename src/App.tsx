import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";

export type FilterValuesType = "all" | "active" | "completed"

export function App() {
    let [tasks, setTasks] = useState([
        {id: 1, text: 'Blood sport', isDone: true},
        {id: 2, text: 'Spider-Man', isDone: true},
        {id: 3, text: 'Autumn in New York', isDone: false},
        {id: 4, text: '2012', isDone: true},
        {id: 5, text: 'Green mile', isDone: true},
        {id: 6, text: 'Duck Tales', isDone: false},
    ])

    const removeTask = (id: number) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    let [filter, setFilter] = useState<FilterValuesType>('all')

    let tasksForTodoList = tasks

    if (filter === 'active') {
        tasksForTodoList = tasks.filter(f => f.isDone)
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(f => !f.isDone)
    }

    let ChangeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    return (
        <div className="App">
            <TodoList
                title={'What To Learn?'}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={ChangeFilter}/>
        </div>
    );
}
