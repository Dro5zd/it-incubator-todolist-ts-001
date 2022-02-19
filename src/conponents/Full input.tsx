import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";

type FullInputProps = {
    callback: (title: string) => void
}

export const FullInput = (props: FullInputProps) => {
    let [title, setTitle] = useState("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask();
        }
    }

        const addTask = () => {
            props.callback(title)
            setTitle('')
        }

        return (
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <Button name='+' callback={() => addTask()}/>
            </div>
        );
    };