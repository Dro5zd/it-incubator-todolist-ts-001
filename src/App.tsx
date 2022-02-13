import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import {TodoList} from "./components/TodoList";

export type FilterValuesType = "all" | "active" | "completed"

export function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), text: 'Blood sport', isDone: true},
        {id: v1(), text: 'Spider-Man', isDone: true},
        {id: v1(), text: 'Autumn in New York', isDone: false},
        {id: v1(), text: '2012', isDone: true},
        {id: v1(), text: 'Green mile', isDone: true},
        {id: v1(), text: 'Duck Tales', isDone: false},
    ])

    const removeTask = (id: string) => {
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
