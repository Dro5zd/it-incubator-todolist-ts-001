import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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
            <TextField
                id="outlined-basic"
                size={'small'}
                color={'secondary'}
                label="New task"
                variant="outlined"
                onKeyPress={onKeyPressHandler}
                value={title}
                onChange={onChangeInputHandler}
                error={!!error}
                helperText={error}/>
            <IconButton onClick={onClickAddTaskButtonHandler}>
                <AddIcon/>
            </IconButton>
        </div>
    );
};