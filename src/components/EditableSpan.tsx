import React, {ChangeEvent, memo, useState} from 'react';

export type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string)=>void
}

export const EditableSpan = memo((props: EditableSpanPropsType) => {

    console.log('ESRender')

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    function ChangeTitleHandler(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <input onChange={ChangeTitleHandler} value={title} autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
        ;
});