import React from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";

let tasks1 = [
    {id: 1, text: 'HTML&CSS', isDone: true},
    {id: 2, text: 'JS', isDone: true},
    {id: 3, text: 'React', isDone: false},
]

let tasks2 = [
    {id: 1, text: 'Blood sport', isDone: true},
    {id: 2, text: 'Spider-Man', isDone: true},
    {id: 3, text: 'Autumn in New York', isDone: false},
    {id: 4, text: '2012', isDone: true},
    {id: 5, text: 'Green mile', isDone: true},
    {id: 6, text: 'Duck Tales', isDone: false},
]


function App() {
    return (
        <div className="App">
            <TodoList title={'What To Learn?'} task={tasks1}/>
            <TodoList title={'What To Watch?'} task={tasks2}/>
        </div>
    );
}

export default App;
