import React, {ChangeEvent, useState} from 'react';

export type EditableSpanPropsType = {
    title: string
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setNewTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
    }

    function ChangeTitleHandler(e: ChangeEvent<HTMLInputElement>) {
        setNewTitle(e.currentTarget.value)
    }

    return editMode
        ? <input onChange={ChangeTitleHandler} value={newTitle} autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
        ;
};