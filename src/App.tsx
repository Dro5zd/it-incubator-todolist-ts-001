import React from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";

let tasks1 = [
    {id: 1, text: 'HTML&CSS', isDone: true},
    {id: 2, text: 'JS', isDone: true},
    {id: 3, text: 'React', isDone: false},
]

function App() {
    return (
        <div className="App">
            <TodoList title={'What To Learn?'} task={tasks1}/>
        </div>
    );
}

export default App;
