import React from "react";


type TodoListProps = {
    task: Array<TodoListPropsType>
    title: string
}

type TodoListPropsType = {
    id: number,
    text: string,
    isDone: boolean
}

export const TodoList = (props: TodoListProps) => {

    const TodoListItem = props.task.map((i, index) => <li>
        <button>+</button>
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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}