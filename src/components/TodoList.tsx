import React from "react";
import {FilterValuesType} from "../App";


type TodoListProps = {
    tasks: Array<TodoListPropsType>
    title: string
    removeTask: (id: string)=> void
    changeFilter: (value: FilterValuesType)=> void
}

type TodoListPropsType = {
    id: string,
    text: string,
    isDone: boolean
}

export const TodoList = (props: TodoListProps) => {

    const TodoListItem = props.tasks.map((i, index) => <li>
        <button onClick={() => {props.removeTask(i.id)}}>+</button>
        <input key={index} type={"checkbox"} checked={i.isDone}/>
        <span>{i.text}</span>
    </li>)

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>x</button>
            </div>
            <ul>
                {TodoListItem}
            </ul>
            <div>
                <button onClick={() => {props.changeFilter("all")}}>All</button>
                <button onClick={() => {props.changeFilter("active")}}>Active</button>
                <button onClick={() => {props.changeFilter("completed")}}>Completed</button>
            </div>
        </div>
    )
}