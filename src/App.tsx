import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";



function App() {
    let [tasks, setTasks] = useState([
        {id: 1, text: 'Blood sport', isDone: true},
        {id: 2, text: 'Spider-Man', isDone: true},
        {id: 3, text: 'Autumn in New York', isDone: false},
        {id: 4, text: '2012', isDone: true},
        {id: 5, text: 'Green mile', isDone: true},
        {id: 6, text: 'Duck Tales', isDone: false},
    ])

    const removeTask = (id: number) => {
        const filteredTasks = tasks.filter(i => i.id !== id)
        setTasks(filteredTasks)
    }


    return (
        <div className="App">
            <TodoList
                title={'What To Learn?'}
                task={tasks}
                removeTask={removeTask}
               />
        </div>
    );
}

export default App;
