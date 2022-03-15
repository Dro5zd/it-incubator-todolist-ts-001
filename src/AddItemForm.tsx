import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from './Todolist.module.css';
import {TextField} from '@mui/material';


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onClickAddTaskButtonHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Field is require')
        }

    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            onClickAddTaskButtonHandler()
        }
    }

    return (
        <div className={s.addFormCont}>
            <TextField
                id="standard-basic"
                label="Standard"
                variant="standard"
                onKeyPress={onKeyPressHandler}
                value={title}
                onChange={onChangeInputHandler}
                className={error ? s.error : ''}/>
            {/*<input onKeyPress={onKeyPressHandler}*/}
            {/*       value={title}*/}
            {/*       onChange={onChangeInputHandler}*/}
            {/*       className={error ? s.error : ''}*/}
            {/*/>*/}
            <button onClick={onClickAddTaskButtonHandler}>+</button>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    );
};