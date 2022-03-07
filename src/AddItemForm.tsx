import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import classes from './Todolist.module.css';


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
        <div>
            <div>
                <input onKeyPress={onKeyPressHandler}
                       value={title}
                       onChange={onChangeInputHandler}
                       className={error ? classes.error : ''}
                />
                <button onClick={onClickAddTaskButtonHandler}>+</button>
                {error && <div className={classes.errorMessage}>{error}</div>}
            </div>
        </div>
    );
};