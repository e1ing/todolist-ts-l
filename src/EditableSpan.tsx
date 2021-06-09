import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {Input, TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)


    const onEditMode = () => {
        setEditMode(true)
        //setTitle(props.title) //костыль
    }
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <Input
                color={"primary"}
                /*variant={"standard"}*/
                value={title}
                         autoFocus
                         onChange={onChangeTitle}
                         onBlur={offEditMode}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
})

